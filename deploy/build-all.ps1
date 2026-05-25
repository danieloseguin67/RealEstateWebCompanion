#Requires -Version 5.1

<#
.SYNOPSIS
    Builds all three projects and stages artifacts into a single output folder
    ready for iis-setup.ps1.

.PARAMETER OutputRoot
    Folder where staged artifacts will be written.
    Default: <repo-root>\deploy\build

.PARAMETER SkipWebApi
    Skip building the ASP.NET Core WebAPI.

.PARAMETER SkipWebCompanionApp
    Skip building the WebCompanion Angular admin app.

.PARAMETER SkipMontreal4Rent
    Skip building the montreal4rent Angular public site.

.EXAMPLE
    .\build-all.ps1 -OutputRoot "C:\deploy\build"
#>

param(
    [string]$OutputRoot         = (Join-Path $PSScriptRoot "build"),
    [switch]$SkipWebApi,
    [switch]$SkipWebCompanionApp,
    [switch]$SkipMontreal4Rent
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot      = Split-Path $PSScriptRoot -Parent                    # <repo-root>
$webapiSrc     = Join-Path $repoRoot "webapi\webcompanionapi"
$webAppSrc     = Join-Path $repoRoot "RealEstateWebCompanion"
$montreal4Src  = Join-Path $repoRoot "montreal4rent\website"         # now lives inside this repo

function Write-Step([string]$msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok([string]$msg)   { Write-Host "    [OK] $msg" -ForegroundColor Green }
function Write-Fail([string]$msg) { Write-Host "    [FAIL] $msg" -ForegroundColor Red }

function Assert-Exit([string]$label) {
    if ($LASTEXITCODE -ne 0) {
        Write-Fail "$label failed (exit $LASTEXITCODE)."
        exit 1
    }
}

# ---------------------------------------------------------------------------
# 1. WebCompanionAPI  (dotnet publish)
# ---------------------------------------------------------------------------
if (-not $SkipWebApi) {
    Write-Step "Building WebCompanionAPI (dotnet publish -c Release)"

    $apiOut = Join-Path $OutputRoot "webcompanion-api"
    Push-Location $webapiSrc
    try {
        dotnet publish webcompanionapi.csproj -c Release -o $apiOut /p:UseAppHost=false
        Assert-Exit "dotnet publish"
    } finally {
        Pop-Location
    }

    # Copy the SQL init script alongside the API artifacts
    $sqlSrc = Join-Path $webapiSrc "Scripts\create-database.sql"
    $sqlDst = Join-Path $apiOut    "Scripts\create-database.sql"
    New-Item -ItemType Directory -Path (Split-Path $sqlDst) -Force | Out-Null
    Copy-Item $sqlSrc $sqlDst -Force
    Write-Ok "SQL script copied to: $sqlDst"

    Write-Ok "WebCompanionAPI -> $apiOut"
}

# ---------------------------------------------------------------------------
# 2. WebCompanionApp  (ng build --configuration production)
# ---------------------------------------------------------------------------
if (-not $SkipWebCompanionApp) {
    Write-Step "Building WebCompanionApp (ng build --configuration production)"

    $appOut = Join-Path $OutputRoot "webcompanion-app"
    Push-Location $webAppSrc
    try {
        npm.cmd run build -- --configuration production
        Assert-Exit "ng build (WebCompanionApp)"
    } finally {
        Pop-Location
    }

    # Angular 17+ outputs to dist/<project>/browser/
    $ngDist = Join-Path $webAppSrc "dist\real-estate-web-companion\browser"
    if (-not (Test-Path $ngDist)) {
        # Fallback: some versions output directly to dist/<project>
        $ngDist = Join-Path $webAppSrc "dist\real-estate-web-companion"
    }

    robocopy $ngDist $appOut /MIR /NP /NFL /NDL /NJH /NJS | Out-Null
    Write-Ok "WebCompanionApp -> $appOut"
}

# ---------------------------------------------------------------------------
# 3. Montreal4Rent  (ng build --configuration production)
# ---------------------------------------------------------------------------
if (-not $SkipMontreal4Rent) {
    Write-Step "Building Montreal4Rent (ng build --configuration production)"

    if (-not (Test-Path $montreal4Src)) {
        Write-Fail "montreal4rent source not found at: $montreal4Src"
        Write-Host "       Update the `$montreal4Src variable in this script to match your environment." -ForegroundColor Yellow
        exit 1
    }

    $m4rOut = Join-Path $OutputRoot "montreal4rent"
    Push-Location $montreal4Src
    try {
        npm.cmd run build:prod
        Assert-Exit "ng build (Montreal4Rent)"
    } finally {
        Pop-Location
    }

    $ngDist = Join-Path $montreal4Src "dist\montreal4rent\browser"
    if (-not (Test-Path $ngDist)) {
        $ngDist = Join-Path $montreal4Src "dist\montreal4rent"
    }
    robocopy $ngDist $m4rOut /MIR /NP /NFL /NDL /NJH /NJS | Out-Null
    Write-Ok "Montreal4Rent -> $m4rOut"
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host "`nAll builds complete. Artifacts staged in:" -ForegroundColor Green
Write-Host "  $OutputRoot" -ForegroundColor White
Write-Host "`nRun the IIS setup script next:" -ForegroundColor Cyan
Write-Host "  .\iis-setup.ps1 -BuildRoot `"$OutputRoot`" -DbUser `"webcompanion_user`"`n" -ForegroundColor White
exit 0
