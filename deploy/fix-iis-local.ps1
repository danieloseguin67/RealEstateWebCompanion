<#
.SYNOPSIS
    Quick-fix: ensures WebCompanionAPI and WebCompanionApp IIS sites exist,
    are bound correctly, and their app pools are started.
    Run this in an ELEVATED PowerShell when the API is not listening on :6003.
#>

# WebAdministration requires Windows PowerShell — relaunch in powershell.exe if running in PS Core
if ($PSVersionTable.PSEdition -eq 'Core') {
    Write-Host "Relaunching in Windows PowerShell (WebAdministration requires it)..." -ForegroundColor Yellow
    $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    $psArgs  = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    if ($isAdmin) {
        & powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$PSCommandPath"
    } else {
        Start-Process powershell.exe -Verb RunAs -Wait -ArgumentList $psArgs
    }
    exit
}

# Self-elevate if not running as Administrator
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Not elevated — relaunching as Administrator (UAC prompt will appear)..." -ForegroundColor Yellow
    Start-Process powershell.exe -Verb RunAs -Wait -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    exit
}

Import-Module WebAdministration -ErrorAction Stop

$apiDest = "C:\inetpub\webcompanion-api"
$appDest = "C:\inetpub\webcompanion-app"

# ── App Pools ──────────────────────────────────────────────────────────────
foreach ($pool in @("WebCompanionApiPool", "WebCompanionAppPool")) {
    if (-not (Test-Path "IIS:\AppPools\$pool")) {
        New-WebAppPool -Name $pool | Out-Null
        Write-Host "[CREATED] App pool: $pool" -ForegroundColor Green
    } else {
        Write-Host "[EXISTS]  App pool: $pool" -ForegroundColor Gray
    }
    Set-ItemProperty "IIS:\AppPools\$pool" managedRuntimeVersion ""
}

# Set ASPNETCORE_ENVIRONMENT=Production on the API pool
$existing = Get-WebConfiguration "system.applicationHost/applicationPools/add[@name='WebCompanionApiPool']/environmentVariables/add[@name='ASPNETCORE_ENVIRONMENT']"
if (-not $existing) {
    Add-WebConfiguration "system.applicationHost/applicationPools/add[@name='WebCompanionApiPool']/environmentVariables" `
        -Value @{ name = "ASPNETCORE_ENVIRONMENT"; value = "Production" }
    Write-Host "[SET]     ASPNETCORE_ENVIRONMENT=Production on WebCompanionApiPool" -ForegroundColor Green
}

# ── Sites ──────────────────────────────────────────────────────────────────
if (-not (Test-Path "IIS:\Sites\WebCompanionAPI")) {
    New-Website -Name "WebCompanionAPI" `
                -PhysicalPath $apiDest `
                -ApplicationPool "WebCompanionApiPool" `
                -IPAddress "*" -Port 6003 -HostHeader "localhost" | Out-Null
    Write-Host "[CREATED] Site: WebCompanionAPI  (*:6003:localhost)" -ForegroundColor Green
} else {
    Set-ItemProperty "IIS:\Sites\WebCompanionAPI" physicalPath $apiDest
    Set-ItemProperty "IIS:\Sites\WebCompanionAPI" applicationPool "WebCompanionApiPool"
    $b = Get-WebBinding -Name "WebCompanionAPI" | Where-Object { $_.bindingInformation -eq "*:6003:localhost" }
    if (-not $b) {
        # Remove stale bindings and re-add correct one
        Get-WebBinding -Name "WebCompanionAPI" | Remove-WebBinding
        New-WebBinding -Name "WebCompanionAPI" -Protocol "http" -IPAddress "*" -Port 6003 -HostHeader "localhost"
        Write-Host "[FIXED]   Binding updated to *:6003:localhost" -ForegroundColor Yellow
    }
    Write-Host "[EXISTS]  Site: WebCompanionAPI" -ForegroundColor Gray
}

if (-not (Test-Path "IIS:\Sites\WebCompanionApp")) {
    New-Website -Name "WebCompanionApp" `
                -PhysicalPath $appDest `
                -ApplicationPool "WebCompanionAppPool" `
                -IPAddress "*" -Port 80 -HostHeader "localhost" | Out-Null
    Write-Host "[CREATED] Site: WebCompanionApp  (*:80:localhost)" -ForegroundColor Green
} else {
    Write-Host "[EXISTS]  Site: WebCompanionApp" -ForegroundColor Gray
}

# ── Enable ARR global proxy (needed for /api/* rewrite) ───────────────────
try {
    Set-WebConfigurationProperty -pspath "MACHINE/WEBROOT/APPHOST" `
        -filter "system.webServer/proxy" -name "enabled" -value $true
    Write-Host "[SET]     ARR global proxy enabled" -ForegroundColor Green
} catch {
    Write-Host "[WARN]    Could not enable ARR proxy (may not be installed): $_" -ForegroundColor Yellow
}

# ── Start everything ───────────────────────────────────────────────────────
Start-WebAppPool -Name "WebCompanionApiPool"  -ErrorAction SilentlyContinue
Start-WebAppPool -Name "WebCompanionAppPool"  -ErrorAction SilentlyContinue
Start-Website    -Name "WebCompanionAPI"      -ErrorAction SilentlyContinue
Start-Website    -Name "WebCompanionApp"      -ErrorAction SilentlyContinue

Start-Sleep -Seconds 3

# ── Verify ─────────────────────────────────────────────────────────────────
Write-Host "`n── IIS Sites ──" -ForegroundColor Cyan
Get-Website | Where-Object { $_.Name -like "WebCompanion*" } |
    Select-Object Name, State, @{N='Bindings';E={($_.Bindings.Collection | ForEach-Object { $_.bindingInformation }) -join ', '}} |
    Format-Table -AutoSize

Write-Host "── App Pools ──" -ForegroundColor Cyan
foreach ($pool in @("WebCompanionApiPool", "WebCompanionAppPool")) {
    $state = (Get-WebAppPoolState -Name $pool -ErrorAction SilentlyContinue).Value
    Write-Host "  $pool : $state"
}

Write-Host "`n── Port 6003 listener ──" -ForegroundColor Cyan
$listener = netstat -ano | Select-String ":6003\s"
if ($listener) {
    Write-Host $listener -ForegroundColor Green
} else {
    Write-Host "  NOT listening — app pool may be crashing. Check Event Viewer > Windows Logs > Application" -ForegroundColor Red
}

Write-Host "`n── Quick API test ──" -ForegroundColor Cyan
try {
    $r = Invoke-WebRequest -Uri "http://localhost:6003/api/apartments" -UseBasicParsing -TimeoutSec 10
    Write-Host "  HTTP $($r.StatusCode) — API is responding!" -ForegroundColor Green
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Check: Event Viewer > Windows Logs > Application (source: IIS AspNetCore Module)" -ForegroundColor Yellow
}
