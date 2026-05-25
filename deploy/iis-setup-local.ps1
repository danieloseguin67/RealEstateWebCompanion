#Requires -RunAsAdministrator

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Install-WindowsFeature is Windows Server only.
# On Windows 10/11 use Enable-WindowsOptionalFeature instead.
Write-Host "`n==> Enabling IIS Windows features (desktop edition)" -ForegroundColor Cyan

$features = @(
    "IIS-WebServerRole",
    "IIS-WebServer",
    "IIS-CommonHttpFeatures",
    "IIS-StaticContent",
    "IIS-DefaultDocument",
    "IIS-HttpErrors",
    "IIS-HttpRedirect",
    "IIS-ApplicationDevelopment",
    "IIS-CGI",
    "IIS-ISAPIExtensions",
    "IIS-ISAPIFilter",
    "IIS-NetFxExtensibility45",
    "IIS-ASPNET45",
    "IIS-HealthAndDiagnostics",
    "IIS-HttpLogging",
    "IIS-Security",
    "IIS-RequestFiltering",
    "IIS-Performance",
    "IIS-HttpCompressionStatic",
    "IIS-ManagementConsole",
    "IIS-ManagementScriptingTools",
    "NetFx4Extended-ASPNET45",
    "WAS-WindowsActivationService",
    "WAS-ProcessModel",
    "WAS-ConfigurationAPI"
)

foreach ($f in $features) {
    $state = (Get-WindowsOptionalFeature -Online -FeatureName $f -ErrorAction SilentlyContinue).State
    if ($state -eq "Enabled") {
        Write-Host "    [OK] Already enabled: $f" -ForegroundColor Green
    } elseif ($null -eq $state) {
        Write-Host "    [SKIP] Not available on this edition: $f" -ForegroundColor Yellow
    } else {
        Write-Host "    Enabling: $f ..." -ForegroundColor Gray
        Enable-WindowsOptionalFeature -Online -FeatureName $f -All -NoRestart -ErrorAction SilentlyContinue | Out-Null
        Write-Host "    [OK] Enabled: $f" -ForegroundColor Green
    }
}

# Import WebAdministration now that IIS is guaranteed to be present
Import-Module WebAdministration -ErrorAction Stop
Write-Host "    [OK] WebAdministration module loaded." -ForegroundColor Green

# ---------------------------------------------------------------------------
# Load credentials from webapi/.env
# ---------------------------------------------------------------------------
Write-Host "`n==> Loading credentials from webapi/.env" -ForegroundColor Cyan

$envFile = Join-Path (Split-Path $scriptDir -Parent) "webapi\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "    [FAIL] .env file not found: $envFile" -ForegroundColor Red
    Write-Host "           Copy webapi\.env.example to webapi\.env and fill in values." -ForegroundColor Yellow
    exit 1
}

$dbUser     = ""
$dbPassword = ""
foreach ($line in Get-Content $envFile) {
    if ($line -match '^\s*#' -or $line -notmatch '=') { continue }
    $key, $val = $line -split '=', 2
    switch ($key.Trim()) {
        'DB_USER'     { $dbUser     = $val.Trim() }
        'DB_PASSWORD' { $dbPassword = $val.Trim() }
    }
}

if (-not $dbUser -or -not $dbPassword) {
    Write-Host "    [FAIL] DB_USER and DB_PASSWORD must be set in webapi\.env" -ForegroundColor Red
    exit 1
}
Write-Host "    [OK] Loaded DB_USER=$dbUser from .env" -ForegroundColor Green

& "$scriptDir\iis-setup.ps1" `
    -BuildRoot               (Join-Path $scriptDir "build") `
    -SqlServer               "localhost" `
    -DbUser                  $dbUser `
    -WebCompanionAppHostname "localhost" `
    -SkipDatabaseInit `
    -SkipIisFeatures `
    -SkipMontreal4Rent

# ---------------------------------------------------------------------------
# Write local appsettings.Production.json (no credentials — they go on App Pool)
# ---------------------------------------------------------------------------
Write-Host "`n==> Writing local appsettings.Production.json" -ForegroundColor Cyan

$localSettings = @{
    Logging = @{
        LogLevel = @{
            Default                = "Information"
            "Microsoft.AspNetCore" = "Warning"
        }
    }
    ConnectionStrings = @{
        DefaultConnection = "Server=localhost;Database=realestatewebcompanion;TrustServerCertificate=True;Encrypt=False;"
    }
    AllowedCorsOrigins = @("http://localhost", "http://localhost:4200")
    ImagesPhysicalPath = "C:\inetpub\montreal4rent\assets\images"
} | ConvertTo-Json -Depth 5

$settingsPath = "C:\inetpub\webcompanion-api\appsettings.Production.json"
$localSettings | Set-Content -Path $settingsPath -Encoding UTF8
Write-Host "    [OK] Written: $settingsPath" -ForegroundColor Green

# ---------------------------------------------------------------------------
# Set DB_USER and DB_PASSWORD as env vars on the IIS App Pool
# (ANCM passes App Pool env vars into the ASP.NET Core process)
# ---------------------------------------------------------------------------
Write-Host "`n==> Setting DB_USER / DB_PASSWORD on WebCompanionApiPool" -ForegroundColor Cyan

function Set-AppPoolEnvVar([string]$pool, [string]$name, [string]$value) {
    $filter = "system.applicationHost/applicationPools/add[@name='$pool']/environmentVariables/add[@name='$name']"
    $existing = Get-WebConfiguration $filter
    if ($existing) {
        Set-WebConfiguration $filter -Value @{ name = $name; value = $value }
    } else {
        Add-WebConfiguration "system.applicationHost/applicationPools/add[@name='$pool']/environmentVariables" `
            -Value @{ name = $name; value = $value }
    }
    Write-Host "    [OK] $name set on WebCompanionApiPool" -ForegroundColor Green
}

if (Test-Path "IIS:\AppPools\WebCompanionApiPool") {
    Set-AppPoolEnvVar "WebCompanionApiPool" "DB_USER"     $dbUser
    Set-AppPoolEnvVar "WebCompanionApiPool" "DB_PASSWORD" $dbPassword
}

# Recycle the app pool so it picks up the new settings
if (Test-Path "IIS:\AppPools\WebCompanionApiPool") {
    Restart-WebAppPool -Name "WebCompanionApiPool"
    Write-Host "    [OK] WebCompanionApiPool recycled." -ForegroundColor Green
}
