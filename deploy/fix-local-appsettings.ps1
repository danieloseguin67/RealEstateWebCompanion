#Requires -RunAsAdministrator
Import-Module WebAdministration -ErrorAction Stop
$poolName = "WebCompanionApiPool"
if (Test-Path "IIS:\AppPools\$poolName") {
    Write-Host "Stopping $poolName..." -ForegroundColor Cyan
    Stop-WebAppPool -Name $poolName
    $waited = 0
    while ((Get-WebAppPoolState -Name $poolName).Value -ne "Stopped" -and $waited -lt 15) {
        Start-Sleep -Seconds 1; $waited++
    }
    Write-Host "[OK] Pool stopped." -ForegroundColor Green
}
Write-Host "Copying build artifacts..." -ForegroundColor Cyan
robocopy "C:\deploy\build\webcompanion-api" "C:\inetpub\webcompanion-api" /MIR /NP /NFL /NDL /NJH /NJS /R:3 /W:2
if ($LASTEXITCODE -gt 7) { Write-Host "[FAIL] robocopy exit $LASTEXITCODE" -ForegroundColor Red; exit 1 }
Write-Host "[OK] Artifacts copied." -ForegroundColor Green
Write-Host "Writing appsettings.Production.json..." -ForegroundColor Cyan
$settings = @{
    Logging = @{ LogLevel = @{ Default = "Information"; "Microsoft.AspNetCore" = "Warning" } }
    ConnectionStrings = @{ DefaultConnection = "Server=localhost;Database=realestatewebcompanion;Trusted_Connection=True;TrustServerCertificate=True;" }
    AllowedCorsOrigins = @("http://localhost", "http://localhost:4200")
} | ConvertTo-Json -Depth 5
$settingsPath = "C:\inetpub\webcompanion-api\appsettings.Production.json"
$settings | Set-Content -Path $settingsPath -Encoding UTF8
Write-Host "[OK] Written: $settingsPath" -ForegroundColor Green
# Set app pool identity to ApplicationPoolIdentity (runs as IIS APPPOOL\WebCompanionApiPool)
# which already has a SQL Server login and database user in realestatewebcompanion
if (Test-Path "IIS:\AppPools\$poolName") {
    Set-ItemProperty "IIS:\AppPools\$poolName" -Name processModel.identityType -Value 4
    Write-Host "[OK] App pool identity set to ApplicationPoolIdentity." -ForegroundColor Green
}
Write-Host "Starting $poolName..." -ForegroundColor Cyan
if (Test-Path "IIS:\AppPools\$poolName") {
    Start-WebAppPool -Name $poolName
    Write-Host "[OK] Pool started." -ForegroundColor Green
}
Write-Host "Waiting for API to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 4
Write-Host "Testing API..." -ForegroundColor Cyan
try {
    $resp = Invoke-WebRequest -Uri "http://localhost:6003/api/apartments" -UseBasicParsing -TimeoutSec 10
    Write-Host "[OK] HTTP $($resp.StatusCode)" -ForegroundColor Green
    $resp.Content | ConvertFrom-Json | Select-Object -First 3 | Format-List
} catch {
    Write-Host "[FAIL] $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host "`nDone. Press any key to close." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
