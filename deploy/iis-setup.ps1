#Requires -RunAsAdministrator
#Requires -Modules WebAdministration

<#
.SYNOPSIS
    Provisions IIS, App Pools, and all three application sites on Windows Server.

.DESCRIPTION
    Configures the following on a fresh Windows Server 2022:
      1. IIS features (Static Content, URL Rewrite, ARR, CGI/FastCGI, ANCM)
      2. SQL Server database initialisation
      3. WebCompanionAPI      — IIS site on localhost:6003 (ASP.NET Core 9 via ANCM, internal only)
      4. WebCompanionApp      — IIS site on port 80/443 (Angular SPA + ARR proxy to /api/*)
      5. Montreal4Rent        — IIS site on port 80/443 (Angular SPA + PHP FastCGI contact forms)

.PARAMETER BuildRoot
    Folder that contains the compiled artifacts produced by the build phase:
      BuildRoot\
        webcompanion-api\       <- output of: dotnet publish webcompanionapi.csproj -c Release -o ...
        webcompanion-app\       <- output of: ng build --configuration production (browser/ sub-folder)
        montreal4rent\          <- output of: ng build --configuration production (dist/montreal4rent/)

.PARAMETER WebCompanionAppHostname
    Public hostname for the WebCompanion admin Angular app (e.g. realestatewebcompanion.seguin.dev).

.PARAMETER Montreal4RentHostname
    Primary hostname for the public site (e.g. montreal4rent.com).

.PARAMETER Montreal4RentHostnameWww
    www alias for the public site (e.g. www.montreal4rent.com).

.PARAMETER SqlServer
    SQL Server instance name/address visible from the Windows Server host. Default: localhost.

.PARAMETER DbName
    Name of the SQL Server database. Default: realestatewebcompanion.

.PARAMETER DbUser
    SQL Server login username the WebAPI will use.

.PARAMETER DbPassword
    Password for DbUser. Will be prompted securely if not supplied.

.PARAMETER SqlScriptPath
    Path to the create-database.sql script. Defaults to relative location inside BuildRoot.

.PARAMETER PhpCgiPath
    Full path to php-cgi.exe on the target server.
    Default: C:\PHP\php-cgi.exe (manual install).
    Web Platform Installer puts it at: C:\Program Files\PHP\v8.x\php-cgi.exe

.PARAMETER InetpubRoot
    Root under which site folders are created. Default: C:\inetpub.

.PARAMETER SkipDatabaseInit
    Switch: skip the SQL Server database creation step.

.PARAMETER SkipIisFeatures
    Switch: skip the Install-WindowsFeature step (if IIS is already fully configured).

.EXAMPLE
    .\iis-setup.ps1 `
        -BuildRoot "C:\deploy\build" `
        -WebCompanionAppHostname "realestatewebcompanion.seguin.dev" `
        -Montreal4RentHostname "montreal4rent.com" `
        -Montreal4RentHostnameWww "www.montreal4rent.com" `
        -DbUser "webcompanion_user" `
        -DbPassword "YourSecurePassword"
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)]
    [string]$BuildRoot,

    [string]$WebCompanionAppHostname  = "realestatewebcompanion.seguin.dev",
    [string]$Montreal4RentHostname    = "montreal4rent.com",
    [string]$Montreal4RentHostnameWww = "www.montreal4rent.com",
    [string]$SqlServer                = "localhost",
    [string]$DbName                   = "realestatewebcompanion",
    [string]$DbUser                   = "webcompanion_user",
    [string]$DbPassword               = "",
    [string]$SqlScriptPath            = "",
    [string]$PhpCgiPath               = "C:\PHP\php-cgi.exe",
    [string]$InetpubRoot              = "C:\inetpub",
    [switch]$SkipDatabaseInit,
    [switch]$SkipIisFeatures,
    [switch]$SkipMontreal4Rent
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
function Write-Step([string]$msg) {
    Write-Host "`n==> $msg" -ForegroundColor Cyan
}
function Write-Ok([string]$msg) {
    Write-Host "    [OK] $msg" -ForegroundColor Green
}
function Write-Warn([string]$msg) {
    Write-Host "    [WARN] $msg" -ForegroundColor Yellow
}
function Write-Fail([string]$msg) {
    Write-Host "    [FAIL] $msg" -ForegroundColor Red
}

# Idempotent App Pool creation
function Ensure-AppPool([string]$name, [string]$envVarName = "", [string]$envVarValue = "") {
    if (-not (Test-Path "IIS:\AppPools\$name")) {
        New-WebAppPool -Name $name | Out-Null
        Write-Ok "Created App Pool: $name"
    } else {
        Write-Ok "App Pool already exists: $name"
    }
    # No Managed Code — required for static-file-only or ANCM-hosted sites
    Set-ItemProperty "IIS:\AppPools\$name" managedRuntimeVersion ""
    # Set environment variable on the App Pool (used by ANCM / ASP.NET Core)
    if ($envVarName -ne "") {
        $envPath = "IIS:\AppPools\$name\environmentVariables"
        $existing = Get-WebConfiguration "system.applicationHost/applicationPools/add[@name='$name']/environmentVariables/add[@name='$envVarName']"
        if (-not $existing) {
            Add-WebConfiguration "system.applicationHost/applicationPools/add[@name='$name']/environmentVariables" `
                -Value @{ name = $envVarName; value = $envVarValue }
            Write-Ok "  Set env $envVarName=$envVarValue on $name"
        }
    }
}

# Idempotent IIS Site creation
function Ensure-Site([string]$name, [string]$physicalPath, [string]$appPool, [string]$binding) {
    # Parse binding string "ip:port:hostheader" into individual parts
    $parts      = $binding -split ":"
    $ipAddress  = $parts[0]
    $port       = [int]$parts[1]
    $hostHeader = if ($parts.Count -gt 2) { $parts[2] } else { "" }

    if (-not (Test-Path "IIS:\Sites\$name")) {
        New-Website -Name $name `
                    -PhysicalPath $physicalPath `
                    -ApplicationPool $appPool `
                    -IPAddress $ipAddress `
                    -Port $port `
                    -HostHeader $hostHeader | Out-Null
        Write-Ok "Created IIS Site: $name  ($binding)"
    } else {
        Set-ItemProperty "IIS:\Sites\$name" -Name physicalPath -Value $physicalPath
        Set-ItemProperty "IIS:\Sites\$name" -Name applicationPool -Value $appPool

        # Ensure the desired binding exists (add it if missing)
        $bindingInfo = "$ipAddress`:$port`:$hostHeader"
        $existingBinding = Get-WebBinding -Name $name | Where-Object { $_.bindingInformation -eq $bindingInfo }
        if (-not $existingBinding) {
            New-WebBinding -Name $name -Protocol "http" -IPAddress $ipAddress -Port $port -HostHeader $hostHeader
            Write-Ok "Added binding to IIS Site: $name  ($binding)"
        }
        Write-Ok "Updated IIS Site: $name"
    }
}

# ---------------------------------------------------------------------------
# Pre-flight checks
# ---------------------------------------------------------------------------
Write-Step "Pre-flight checks"

# Resolved paths for build artifacts
$apiSrc  = Join-Path $BuildRoot "webcompanion-api"
$appSrc  = Join-Path $BuildRoot "webcompanion-app"
$m4rSrc  = Join-Path $BuildRoot "montreal4rent"
$repoRoot = Split-Path $PSScriptRoot -Parent
$m4rSourceImages = Join-Path $repoRoot "montreal4rent\website\src\assets\images"

$dirsToCheck = @($apiSrc, $appSrc)
if (-not $SkipMontreal4Rent) { $dirsToCheck += $m4rSrc }
foreach ($dir in $dirsToCheck) {
    if (-not (Test-Path $dir)) {
        Write-Fail "Build artifact folder not found: $dir"
        Write-Host "       Run the build phase first, then retry." -ForegroundColor Yellow
        exit 1
    }
}
Write-Ok "All build artifact folders present."

# Secure prompt for DB password if not supplied
if (-not $SkipDatabaseInit -and $DbPassword -eq "") {
    $secPwd = Read-Host "Enter SQL Server password for '$DbUser'" -AsSecureString
    $DbPassword = [System.Net.NetworkCredential]::new("", $secPwd).Password
}

# Resolve SQL script path
if ($SqlScriptPath -eq "") {
    # Expect the script next to the API artifacts (copied from repo at build time)
    $SqlScriptPath = Join-Path $apiSrc "Scripts\create-database.sql"
}

# ---------------------------------------------------------------------------
# Phase 1 — IIS Features
# ---------------------------------------------------------------------------
if (-not $SkipIisFeatures) {
    Write-Step "Phase 1: Installing IIS features"

    $features = @(
        "Web-Server",
        "Web-Common-Http",          # Static Content, Default Doc, HTTP Errors
        "Web-Static-Content",
        "Web-Default-Doc",
        "Web-Http-Errors",
        "Web-Http-Redirect",
        "Web-Health",
        "Web-Http-Logging",
        "Web-Security",
        "Web-Windows-Auth",
        "Web-Filtering",
        "Web-Performance",
        "Web-Stat-Compression",
        "Web-Dyn-Compression",
        "Web-CGI",                  # Required for PHP FastCGI
        "Web-ISAPI-Ext",
        "Web-ISAPI-Filter",
        "Web-Mgmt-Console",         # IIS Manager GUI
        "Web-Scripting-Tools"
    )

    $result = Install-WindowsFeature -Name $features -IncludeManagementTools
    if ($result.Success) {
        Write-Ok "IIS features installed. Restart required: $($result.RestartNeeded)"
        if ($result.RestartNeeded -eq "Yes") {
            Write-Warn "A server restart is required before continuing. Restart and re-run this script with -SkipIisFeatures."
            exit 0
        }
    } else {
        Write-Fail "Install-WindowsFeature failed."
        exit 1
    }

    # Import the WebAdministration module after IIS is installed
    Import-Module WebAdministration -ErrorAction Stop
} else {
    Write-Ok "Skipping IIS feature installation (-SkipIisFeatures)."
    Import-Module WebAdministration -ErrorAction Stop
}

# ---------------------------------------------------------------------------
# Check for IIS ARR and URL Rewrite modules
# ---------------------------------------------------------------------------
Write-Step "Checking IIS extension modules (ARR + URL Rewrite)"

$arrInstalled = Get-Command "C:\Windows\system32\inetsrv\arr.dll" -ErrorAction SilentlyContinue
$rwInstalled  = Test-Path "C:\Windows\system32\inetsrv\rewrite.dll"

if (-not $rwInstalled) {
    Write-Fail "IIS URL Rewrite module NOT found."
    Write-Host @"
    Install it before continuing:
      1. Download: https://www.iis.net/downloads/microsoft/url-rewrite
      2. Or via Web Platform Installer (WebPI): webpicmd /Install /Products:UrlRewrite2
    Then re-run this script.
"@ -ForegroundColor Yellow
    exit 1
}
Write-Ok "URL Rewrite module found."

if (-not $arrInstalled) {
    Write-Warn "IIS ARR (Application Request Routing) module NOT found."
    Write-Host @"
    The WebCompanion Angular app proxies /api/* via ARR. Install ARR before the app site will work:
      1. Download: https://www.iis.net/downloads/microsoft/application-request-routing
      2. Or via WebPI: webpicmd /Install /Products:ARRv3_0
    Continuing setup — ARR can be installed after this script completes.
"@ -ForegroundColor Yellow
} else {
    Write-Ok "ARR module found."
}

# Enable ARR global proxy (required for reverse-proxy rewrites to http:// URLs)
try {
    Set-WebConfigurationProperty `
        -pspath "MACHINE/WEBROOT/APPHOST" `
        -filter "system.webServer/proxy" `
        -name "enabled" `
        -value $true
    Write-Ok "ARR global proxy enabled in applicationHost.config."
} catch {
    Write-Warn "Could not enable ARR global proxy (ARR may not be installed yet): $_"
}

# ---------------------------------------------------------------------------
# Check for .NET 9 ASP.NET Core Hosting Bundle
# ---------------------------------------------------------------------------
Write-Step "Checking ASP.NET Core Hosting Bundle"

$ancmDll = Get-ChildItem "C:\Program Files\IIS\Asp.Net Core Module\V2\aspnetcorev2.dll" -ErrorAction SilentlyContinue
if (-not $ancmDll) {
    Write-Fail "ASP.NET Core Module (ANCM) NOT found."
    Write-Host @"
    Install the .NET 9 ASP.NET Core Hosting Bundle before continuing:
      Download: https://dotnet.microsoft.com/en-us/download/dotnet/9.0
      Choose: "Hosting Bundle" (not SDK or Runtime alone)
    Then re-run this script.
"@ -ForegroundColor Yellow
    exit 1
}
Write-Ok ".NET ASP.NET Core Module found: $($ancmDll.FullName)"

# ---------------------------------------------------------------------------
# Check for PHP
# ---------------------------------------------------------------------------
Write-Step "Checking PHP FastCGI"

if (-not (Test-Path $PhpCgiPath)) {
    Write-Warn "php-cgi.exe NOT found at '$PhpCgiPath'."
    Write-Host @"
    montreal4rent.com requires PHP for its contact/email forms.
    Install PHP 8.x:
      Option A — Web Platform Installer (recommended):
        webpicmd /Install /Products:PHPLatest
      Option B — Manual:
        1. Download: https://windows.php.net/download/ (Non-Thread-Safe x64)
        2. Extract to C:\PHP
        3. Copy php.ini-production to php.ini
        4. Enable php_mbstring, php_openssl in php.ini
    Update -PhpCgiPath parameter if you install to a different location.
    Continuing — PHP can be installed after this script.
"@ -ForegroundColor Yellow
} else {
    Write-Ok "PHP found: $PhpCgiPath"
    # Register PHP with IIS FastCGI globally if not already registered
    $fcgiSection = Get-WebConfiguration "system.webServer/fastCgi/application[@fullPath='$PhpCgiPath']"
    if (-not $fcgiSection) {
        Add-WebConfiguration "system.webServer/fastCgi" `
            -PSPath "MACHINE/WEBROOT/APPHOST" `
            -Value @{ fullPath = $PhpCgiPath; arguments = ""; maxInstances = 4; idleTimeout = 300; activityTimeout = 30; requestTimeout = 90 }
        Write-Ok "Registered PHP FastCGI handler globally in IIS."
    } else {
        Write-Ok "PHP FastCGI already registered globally."
    }
}

# ---------------------------------------------------------------------------
# Phase 2 — Folder Structure
# ---------------------------------------------------------------------------
Write-Step "Phase 2: Creating site folders under $InetpubRoot"

$apiDest = Join-Path $InetpubRoot "webcompanion-api"
$appDest = Join-Path $InetpubRoot "webcompanion-app"
$m4rDest = Join-Path $InetpubRoot "montreal4rent"

$foldersToCreate = @($apiDest, $appDest)
if (-not $SkipMontreal4Rent) { $foldersToCreate += $m4rDest }
foreach ($folder in $foldersToCreate) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Ok "Created: $folder"
    } else {
        Write-Ok "Exists:  $folder"
    }
}

if (-not $SkipMontreal4Rent) {
    # Email history folder for PHP logger (must be writable by App Pool)
    $emailHistoryDir = Join-Path $m4rDest "history\emails"
    if (-not (Test-Path $emailHistoryDir)) {
        New-Item -ItemType Directory -Path $emailHistoryDir -Force | Out-Null
        Write-Ok "Created email history folder: $emailHistoryDir"
    }
}

# ---------------------------------------------------------------------------
# Phase 3 — Copy Build Artifacts
# ---------------------------------------------------------------------------
Write-Step "Phase 3: Deploying build artifacts"

function Sync-Dir([string]$src, [string]$dest) {
    Write-Host "    Copying: $src -> $dest" -ForegroundColor Gray
    robocopy $src $dest /MIR /NP /NFL /NDL /R:3 /W:2
    if ($LASTEXITCODE -gt 7) {
        Write-Fail "robocopy failed (exit $LASTEXITCODE) copying $src -> $dest"
        exit 1
    }
    Write-Ok "Synced: $src  ->  $dest"
}

# Stop the API app pool and kill any lingering worker processes before copying
$apiPoolName = "WebCompanionApiPool"
$apiPoolExists = Test-Path "IIS:\AppPools\$apiPoolName"
if ($apiPoolExists) {
    $poolState = (Get-WebAppPoolState -Name $apiPoolName).Value
    if ($poolState -eq "Started") {
        Stop-WebAppPool -Name $apiPoolName
        Write-Ok "Stopped app pool: $apiPoolName"
    }
    # Wait for pool to reach Stopped state
    $waited = 0
    while ((Get-WebAppPoolState -Name $apiPoolName).Value -ne "Stopped" -and $waited -lt 15) {
        Start-Sleep -Seconds 1
        $waited++
    }
    # Force-kill any w3wp.exe workers still holding file handles for this pool
    Get-Process -Name "w3wp" -ErrorAction SilentlyContinue | ForEach-Object {
        $cmdLine = (Get-WmiObject Win32_Process -Filter "ProcessId=$($_.Id)" -ErrorAction SilentlyContinue).CommandLine
        if ($cmdLine -like "*$apiPoolName*") {
            $_ | Stop-Process -Force
            Write-Ok "Killed lingering w3wp worker (PID $($_.Id))."
        }
    }
    Start-Sleep -Seconds 1
}

Sync-Dir $apiSrc  $apiDest
Sync-Dir $appSrc  $appDest
if (-not $SkipMontreal4Rent) {
    Sync-Dir $m4rSrc  $m4rDest

    if (Test-Path $m4rSourceImages) {
        Sync-Dir $m4rSourceImages (Join-Path $m4rDest "assets\images")
        Write-Ok "Synced Montreal4Rent source images into deployed assets/images."
    }
}

# Restart the API app pool after copy
if ($apiPoolExists) {
    Start-WebAppPool -Name $apiPoolName
    Write-Ok "Started app pool: $apiPoolName"
}

# Copy SQL init script alongside API artifacts (if not already there)
if (Test-Path $SqlScriptPath) {
    Write-Ok "SQL script located: $SqlScriptPath"
}

# ---------------------------------------------------------------------------
# Phase 4 — SQL Server Database Initialisation
# ---------------------------------------------------------------------------
if (-not $SkipDatabaseInit) {
    Write-Step "Phase 4: SQL Server database initialisation"

    if (-not (Test-Path $SqlScriptPath)) {
        Write-Fail "SQL script not found: $SqlScriptPath"
        Write-Host "       Copy create-database.sql to the build artifacts folder and retry, or use -SkipDatabaseInit." -ForegroundColor Yellow
        exit 1
    }

    $sqlcmd = Get-Command sqlcmd.exe -ErrorAction SilentlyContinue
    if (-not $sqlcmd) {
        Write-Fail "sqlcmd.exe not found in PATH."
        Write-Host "       Install SSMS or the standalone sqlcmd utility, then re-run." -ForegroundColor Yellow
        exit 1
    }

    Write-Host "    Running $SqlScriptPath against $SqlServer ..." -ForegroundColor Gray
    sqlcmd.exe -S $SqlServer -U sa -P $DbPassword -i $SqlScriptPath
    if ($LASTEXITCODE -ne 0) {
        Write-Fail "sqlcmd exited with code $LASTEXITCODE. Check the script output above."
        exit 1
    }
    Write-Ok "Database schema created/verified."

    # Create the application SQL login if it does not already exist
    $createLoginSql = @"
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = '$DbUser')
BEGIN
    CREATE LOGIN [$DbUser] WITH PASSWORD = '$DbPassword', CHECK_POLICY = OFF;
    PRINT 'Login $DbUser created.'
END
ELSE
    PRINT 'Login $DbUser already exists.'

USE [$DbName];
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = '$DbUser')
BEGIN
    CREATE USER [$DbUser] FOR LOGIN [$DbUser];
    ALTER ROLE db_datareader ADD MEMBER [$DbUser];
    ALTER ROLE db_datawriter ADD MEMBER [$DbUser];
    PRINT 'Database user $DbUser created and granted read/write.'
END
ELSE
    PRINT 'Database user $DbUser already exists.'
"@

    $tmpSql = [System.IO.Path]::GetTempFileName() + ".sql"
    $createLoginSql | Set-Content -Path $tmpSql -Encoding UTF8
    sqlcmd.exe -S $SqlServer -U sa -P $DbPassword -i $tmpSql
    Remove-Item $tmpSql -Force
    Write-Ok "SQL login '$DbUser' provisioned."

    # Write the production appsettings with the real password into the deployed API folder
    $prodSettings = @{
        Logging = @{
            LogLevel = @{
                Default                = "Warning"
                "Microsoft.AspNetCore" = "Warning"
            }
        }
        ConnectionStrings = @{
            DefaultConnection = "Server=$SqlServer;Database=$DbName;User Id=$DbUser;Password=$DbPassword;TrustServerCertificate=True;Encrypt=False;"
        }
        AllowedCorsOrigins = @(
            "https://$WebCompanionAppHostname",
            "http://$WebCompanionAppHostname"
        )
    } | ConvertTo-Json -Depth 5

    $prodSettingsPath = Join-Path $apiDest "appsettings.Production.json"
    $prodSettings | Set-Content -Path $prodSettingsPath -Encoding UTF8
    Write-Ok "appsettings.Production.json written to: $prodSettingsPath"
} else {
    Write-Ok "Skipping database initialisation (-SkipDatabaseInit)."
    Write-Warn "Ensure appsettings.Production.json in $apiDest has the correct connection string and password."
}

# ---------------------------------------------------------------------------
# Phase 5 — App Pools
# ---------------------------------------------------------------------------
Write-Step "Phase 5: Creating IIS Application Pools"

# WebCompanionAPI — ASP.NET Core 9, ASPNETCORE_ENVIRONMENT=Production
Ensure-AppPool -name "WebCompanionApiPool" `
               -envVarName "ASPNETCORE_ENVIRONMENT" `
               -envVarValue "Production"

# WebCompanionApp — Static files only (Angular SPA + ARR proxy)
Ensure-AppPool -name "WebCompanionAppPool"

if (-not $SkipMontreal4Rent) {
    # Montreal4Rent — Static files + PHP FastCGI
    Ensure-AppPool -name "Montreal4RentPool"
}

# ---------------------------------------------------------------------------
# Phase 6 — IIS Sites
# ---------------------------------------------------------------------------
Write-Step "Phase 6: Creating IIS Sites"

#
# Site 1: WebCompanionAPI — internal only, bound to localhost:6003
# ASP.NET Core Module (ANCM) hosts the .NET process in-process.
# NOT publicly accessible; the WebCompanionApp ARR proxy calls it.
#
Ensure-Site `
    -name "WebCompanionAPI" `
    -physicalPath $apiDest `
    -appPool "WebCompanionApiPool" `
    -binding "*:6003:localhost"

#
# Site 2: WebCompanionApp — Angular admin SPA + ARR proxy to /api/*
# Bind to the public hostname on ports 80 (and 443 added after SSL cert install).
#
Ensure-Site `
    -name "WebCompanionApp" `
    -physicalPath $appDest `
    -appPool "WebCompanionAppPool" `
    -binding "*:80:$WebCompanionAppHostname"

if (-not $SkipMontreal4Rent) {
    #
    # Site 3: Montreal4Rent — public Angular SPA + PHP contact forms
    # Binds to both the bare domain and the www alias.
    #
    Ensure-Site `
        -name "Montreal4Rent" `
        -physicalPath $m4rDest `
        -appPool "Montreal4RentPool" `
        -binding "*:80:$Montreal4RentHostname"

    # Add www alias binding if it differs from the primary hostname
    if ($Montreal4RentHostnameWww -ne $Montreal4RentHostname) {
        $existingWww = Get-WebBinding -Name "Montreal4Rent" | Where-Object { $_.bindingInformation -like "*$Montreal4RentHostnameWww*" }
        if (-not $existingWww) {
            New-WebBinding -Name "Montreal4Rent" -IPAddress "*" -Port 80 -HostHeader $Montreal4RentHostnameWww
            Write-Ok "Added www binding: $Montreal4RentHostnameWww:80"
        }
    }
}

# ---------------------------------------------------------------------------
# Phase 7 — File System Permissions
# ---------------------------------------------------------------------------
Write-Step "Phase 7: Setting file system permissions"

function Grant-IisPoolRead([string]$path, [string]$poolName) {
    icacls $path /grant "IIS AppPool\${poolName}:(OI)(CI)RX" /T /Q | Out-Null
    Write-Ok "Granted RX to IIS AppPool\$poolName on: $path"
}
function Grant-IisPoolWrite([string]$path, [string]$poolName) {
    icacls $path /grant "IIS AppPool\${poolName}:(OI)(CI)W" /T /Q | Out-Null
    Write-Ok "Granted W  to IIS AppPool\$poolName on: $path"
}

# API — read access for the App Pool; write not needed (app writes to SQL only)
Grant-IisPoolRead  $apiDest "WebCompanionApiPool"

# WebCompanionApp — read-only static files
Grant-IisPoolRead  $appDest "WebCompanionAppPool"

if (-not $SkipMontreal4Rent) {
    # Montreal4Rent — read-only for app files
    Grant-IisPoolRead  $m4rDest "Montreal4RentPool"

    # PHP email history folder — needs write access for the PHP logger
    Grant-IisPoolWrite $emailHistoryDir "Montreal4RentPool"
}

# ---------------------------------------------------------------------------
# Phase 8 — Default Document & Verify
# ---------------------------------------------------------------------------
Write-Step "Phase 8: Configuring default documents"

$sitesForDefaultDoc = @("WebCompanionApp")
if (-not $SkipMontreal4Rent) { $sitesForDefaultDoc += "Montreal4Rent" }
foreach ($siteName in $sitesForDefaultDoc) {
    $hasIndex = Get-WebConfiguration "system.webServer/defaultDocument/files/add[@value='index.html']" -PSPath "IIS:\Sites\$siteName"
    if (-not $hasIndex) {
        Add-WebConfiguration "system.webServer/defaultDocument/files" `
            -PSPath "IIS:\Sites\$siteName" `
            -Value @{ value = "index.html" }
        Write-Ok "$siteName : added index.html as default document."
    }
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host "`n" + ("=" * 70) -ForegroundColor Cyan
Write-Host "  Deployment complete!" -ForegroundColor Green
Write-Host ("=" * 70) -ForegroundColor Cyan

Write-Host @"

  Sites deployed:
    WebCompanionAPI  ->  http://localhost:6003          (internal only)
    WebCompanionApp  ->  http://$WebCompanionAppHostname
    Montreal4Rent    ->  http://$Montreal4RentHostname
                         http://$Montreal4RentHostnameWww

  Next steps:
    1. HTTPS / SSL certificates
       Install win-acme (Let's Encrypt for IIS):
         https://github.com/win-acme/win-acme
       Then run:
         wacs --target iis --host $WebCompanionAppHostname
         wacs --target iis --host $Montreal4RentHostname,$Montreal4RentHostnameWww

    2. PHP SMTP credentials
       Edit the SMTP config deployed to montreal4rent:
         $m4rDest\php\config-smtp.php
       Update SMTP host/port/credentials if the server is no longer on GoDaddy hosting.
       Test with: http://$Montreal4RentHostname/php/test-php-config.php

    3. Smoke-test the API
         Invoke-RestMethod http://localhost:6003/api/apartments
         Invoke-RestMethod http://$WebCompanionAppHostname/api/apartments

    4. Smoke-test Angular SPA routing (deep links must return index.html):
         Invoke-WebRequest http://$WebCompanionAppHostname/listings
         Invoke-WebRequest http://$Montreal4RentHostname/apartments

    5. Smoke-test PHP contact form:
         Invoke-RestMethod -Method POST http://$Montreal4RentHostname/php/test-email.php?test=send

"@ -ForegroundColor White
