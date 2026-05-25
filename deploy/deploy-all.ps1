#Requires -Version 5.1

<#
.SYNOPSIS
    Full build-and-deploy pipeline for webapi, webcompanion, and montreal4rent.

.DESCRIPTION
    Runs two phases in sequence:
      Phase 1 — Build: compiles all three projects via build-all.ps1
      Phase 2 — Deploy: copies artifacts and (re-)configures IIS via iis-setup.ps1

    Self-elevates to Administrator when necessary (IIS configuration requires admin).

.PARAMETER Environment
    Target environment. Accepted values: local, production.
    Default: local.

    local      — Uses the local SQL Server (localhost, Windows auth), skips DB init,
                 enables IIS Windows features via Enable-WindowsOptionalFeature (desktop).
    production — Full setup: SQL init, IIS feature install, production hostnames.

.PARAMETER BuildRoot
    Folder where build artifacts are staged before IIS copy.
    local default      : C:\deploy\build
    production default : <repo>\deploy\build

.PARAMETER SkipBuild
    Skip Phase 1 entirely and use whatever is already in BuildRoot.

.PARAMETER SkipWebApi
    Skip building the ASP.NET Core WebAPI (build phase only).

.PARAMETER SkipWebCompanionApp
    Skip building the WebCompanion Angular admin app (build phase only).

.PARAMETER SkipMontreal4Rent
    Skip building and deploying the Montreal4Rent Angular public site.

.PARAMETER SkipDatabaseInit
    (production only) Skip the sqlcmd database initialisation step.

.PARAMETER SkipIisFeatures
    Skip the IIS Windows feature installation step.

.PARAMETER WebCompanionAppHostname
    (production) Public hostname for the Angular admin app.
    Default: realestatewebcompanion.seguin.dev

.PARAMETER Montreal4RentHostname
    (production) Primary hostname for the public site. Default: montreal4rent.com

.PARAMETER Montreal4RentHostnameWww
    (production) www alias for the public site. Default: www.montreal4rent.com

.PARAMETER SqlServer
    (production) SQL Server instance address. Default: localhost

.PARAMETER DbName
    (production) SQL Server database name. Default: realestatewebcompanion

.PARAMETER DbUser
    (production) SQL Server login. Default: webcompanion_user

.PARAMETER DbPassword
    (production) SQL Server password. Prompted securely if not supplied.

.EXAMPLE
    # Local dev — build everything and push to IIS
    .\deploy-all.ps1

    # Local — skip build, just re-deploy existing artifacts
    .\deploy-all.ps1 -SkipBuild

    # Local — build only webapi and webcompanion, skip montreal4rent
    .\deploy-all.ps1 -SkipMontreal4Rent

    # Production — full build + DB init + IIS setup
    .\deploy-all.ps1 -Environment production `
        -WebCompanionAppHostname "realestatewebcompanion.seguin.dev" `
        -Montreal4RentHostname "montreal4rent.com" `
        -Montreal4RentHostnameWww "www.montreal4rent.com" `
        -DbUser "webcompanion_user" `
        -DbPassword "YourSecurePassword"
#>

param(
    [ValidateSet("local", "production")]
    [string]$Environment              = "local",

    [string]$BuildRoot                = "",

    [switch]$SkipBuild,
    [switch]$SkipWebApi,
    [switch]$SkipWebCompanionApp,
    [switch]$SkipMontreal4Rent,

    # --- Production / IIS options ---
    [switch]$SkipDatabaseInit,
    [switch]$SkipIisFeatures,
    [string]$WebCompanionAppHostname  = "realestatewebcompanion.seguin.dev",
    [string]$Montreal4RentHostname    = "montreal4rent.com",
    [string]$Montreal4RentHostnameWww = "www.montreal4rent.com",
    [string]$SqlServer                = "localhost",
    [string]$DbName                   = "realestatewebcompanion",
    [string]$DbUser                   = "webcompanion_user",
    [string]$DbPassword               = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptDir = $PSScriptRoot

# ---------------------------------------------------------------------------
# Resolve BuildRoot
# ---------------------------------------------------------------------------
if ($BuildRoot -eq "") {
    $BuildRoot = if ($Environment -eq "local") { "C:\deploy\build" } else { Join-Path $scriptDir "build" }
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
function Write-Step([string]$msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok([string]$msg)   { Write-Host "    [OK] $msg" -ForegroundColor Green }
function Write-Warn([string]$msg) { Write-Host "    [WARN] $msg" -ForegroundColor Yellow }
function Write-Fail([string]$msg) { Write-Host "    [FAIL] $msg" -ForegroundColor Red ; exit 1 }

# ---------------------------------------------------------------------------
# Self-elevate to Administrator (IIS setup requires admin rights)
# ---------------------------------------------------------------------------
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
               [Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "`nAdministrator privileges required for IIS configuration." -ForegroundColor Yellow
    Write-Host "Relaunching as Administrator..." -ForegroundColor Yellow

    # Reconstruct argument list, forwarding all supplied parameters
    $fwdArgs  = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    $fwdArgs += " -Environment $Environment"
    $fwdArgs += " -BuildRoot `"$BuildRoot`""
    $fwdArgs += " -WebCompanionAppHostname `"$WebCompanionAppHostname`""
    $fwdArgs += " -Montreal4RentHostname `"$Montreal4RentHostname`""
    $fwdArgs += " -Montreal4RentHostnameWww `"$Montreal4RentHostnameWww`""
    $fwdArgs += " -SqlServer `"$SqlServer`""
    $fwdArgs += " -DbName `"$DbName`""
    $fwdArgs += " -DbUser `"$DbUser`""
    if ($DbPassword -ne "")     { $fwdArgs += " -DbPassword `"$DbPassword`"" }
    if ($SkipBuild)             { $fwdArgs += " -SkipBuild" }
    if ($SkipWebApi)            { $fwdArgs += " -SkipWebApi" }
    if ($SkipWebCompanionApp)   { $fwdArgs += " -SkipWebCompanionApp" }
    if ($SkipMontreal4Rent)     { $fwdArgs += " -SkipMontreal4Rent" }
    if ($SkipDatabaseInit)      { $fwdArgs += " -SkipDatabaseInit" }
    if ($SkipIisFeatures)       { $fwdArgs += " -SkipIisFeatures" }

    Start-Process powershell -Verb RunAs -ArgumentList $fwdArgs -Wait
    exit $LASTEXITCODE
}

# ---------------------------------------------------------------------------
# Phase 1 — Build
# ---------------------------------------------------------------------------
if (-not $SkipBuild) {
    Write-Step "Phase 1: Building all projects -> $BuildRoot"

    $buildScript = Join-Path $scriptDir "build-all.ps1"
    $buildArgs   = @{ OutputRoot = $BuildRoot }
    if ($SkipWebApi)          { $buildArgs["SkipWebApi"]          = $true }
    if ($SkipWebCompanionApp) { $buildArgs["SkipWebCompanionApp"] = $true }
    if ($SkipMontreal4Rent)   { $buildArgs["SkipMontreal4Rent"]   = $true }

    & $buildScript @buildArgs
    if ($LASTEXITCODE -ne 0) { Write-Fail "Build phase failed (exit $LASTEXITCODE)." }
    Write-Ok "Build phase complete."
} else {
    Write-Step "Phase 1: Skipped (using existing artifacts in $BuildRoot)"
}

# ---------------------------------------------------------------------------
# Phase 2 — Deploy to IIS
# ---------------------------------------------------------------------------
Write-Step "Phase 2: Deploying to IIS  [environment: $Environment]"

if ($Environment -eq "local") {
    # ----- Enable IIS Windows optional features (Windows 10/11 desktop) -----
    if (-not $SkipIisFeatures) {
        Write-Step "Enabling IIS Windows features (desktop edition)"

        $iisFeatures = @(
            "IIS-WebServerRole", "IIS-WebServer", "IIS-CommonHttpFeatures",
            "IIS-StaticContent", "IIS-DefaultDocument", "IIS-HttpErrors",
            "IIS-HttpRedirect", "IIS-ApplicationDevelopment", "IIS-CGI",
            "IIS-ISAPIExtensions", "IIS-ISAPIFilter", "IIS-NetFxExtensibility45",
            "IIS-ASPNET45", "IIS-HealthAndDiagnostics", "IIS-HttpLogging",
            "IIS-Security", "IIS-RequestFiltering", "IIS-Performance",
            "IIS-HttpCompressionStatic", "IIS-ManagementConsole",
            "IIS-ManagementScriptingTools", "NetFx4Extended-ASPNET45",
            "WAS-WindowsActivationService", "WAS-ProcessModel", "WAS-ConfigurationAPI"
        )

        foreach ($f in $iisFeatures) {
            $state = (Get-WindowsOptionalFeature -Online -FeatureName $f -ErrorAction SilentlyContinue).State
            if ($state -eq "Enabled") {
                Write-Host "    [OK]   Already enabled: $f" -ForegroundColor Green
            } elseif ($null -eq $state) {
                Write-Host "    [SKIP] Not available on this edition: $f" -ForegroundColor Yellow
            } else {
                Write-Host "    Enabling: $f ..." -ForegroundColor Gray
                Enable-WindowsOptionalFeature -Online -FeatureName $f -All -NoRestart -ErrorAction SilentlyContinue | Out-Null
                Write-Host "    [OK]   Enabled: $f" -ForegroundColor Green
            }
        }
    }

    Import-Module WebAdministration -ErrorAction Stop
    Write-Ok "WebAdministration module loaded."

    # Call iis-setup.ps1 with local settings (local SQL Server, Windows auth, skip DB init & IIS features)
    $iisArgs = @{
        BuildRoot               = $BuildRoot
        SqlServer               = "localhost"
        WebCompanionAppHostname = "localhost"
        SkipDatabaseInit        = $true
        SkipIisFeatures         = $true          # already handled above
    }
    if ($SkipMontreal4Rent) { $iisArgs["SkipMontreal4Rent"] = $true }

    & (Join-Path $scriptDir "iis-setup.ps1") @iisArgs

} else {
    # ----- Production -----
    $iisArgs = @{
        BuildRoot                = $BuildRoot
        WebCompanionAppHostname  = $WebCompanionAppHostname
        Montreal4RentHostname    = $Montreal4RentHostname
        Montreal4RentHostnameWww = $Montreal4RentHostnameWww
        SqlServer                = $SqlServer
        DbName                   = $DbName
        DbUser                   = $DbUser
        SkipDatabaseInit         = $SkipDatabaseInit.IsPresent
        SkipIisFeatures          = $SkipIisFeatures.IsPresent
    }
    if ($DbPassword -ne "")  { $iisArgs["DbPassword"]        = $DbPassword }
    if ($SkipMontreal4Rent)  { $iisArgs["SkipMontreal4Rent"] = $true }

    & (Join-Path $scriptDir "iis-setup.ps1") @iisArgs
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host "`n$('=' * 70)" -ForegroundColor Cyan
Write-Host "  Deploy complete!  Environment: $Environment" -ForegroundColor Green
Write-Host "$('=' * 70)" -ForegroundColor Cyan

if ($Environment -eq "local") {
    Write-Host @"

  WebCompanionAPI  -> http://localhost:5000
  WebCompanionApp  -> http://localhost
  Montreal4Rent    -> http://montreal4rent.localhost  (if not skipped)

  If appsettings need updating, run:
    deploy\fix-local-appsettings.bat

"@ -ForegroundColor White
} else {
    Write-Host @"

  WebCompanionAPI  -> http://localhost:5000  (internal / ARR proxy)
  WebCompanionApp  -> https://$WebCompanionAppHostname
  Montreal4Rent    -> https://$Montreal4RentHostname

"@ -ForegroundColor White
}
