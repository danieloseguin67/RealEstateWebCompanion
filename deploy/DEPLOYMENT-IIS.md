# IIS Deployment Guide — Windows Server

Deploys three applications on a single Windows Server instance:

| Application | Description | Hostname |
|---|---|---|
| **WebCompanionAPI** | ASP.NET Core 9 REST API | `localhost:5000` (internal) |
| **WebCompanionApp** | Angular admin SPA | `realestatewebcompanion.seguin.dev` |
| **Montreal4Rent** | Angular public SPA + PHP contact forms | `montreal4rent.com` |

SQL Server 2022 runs natively on the same machine in production and local development.

> **Local development?** See [Local Dev Setup (IIS + Local SQL Server)](#local-dev-setup-iis--local-sql-server) below for a faster path that skips Montreal4Rent.

---

## Architecture

```
Internet
    │
    ├─ montreal4rent.com (:80/:443)
    │      IIS Site: Montreal4Rent
    │      C:\inetpub\montreal4rent\
    │      App Pool: Montreal4RentPool (No Managed Code)
    │      ├── Angular static files (SPA, index.html fallback)
    │      └── /php/*.php  →  PHP 8.x FastCGI (contact/email forms)
    │
    └─ realestatewebcompanion.seguin.dev (:80/:443)
           IIS Site: WebCompanionApp
           C:\inetpub\webcompanion-app\
           App Pool: WebCompanionAppPool (No Managed Code)
           ├── Angular static files (SPA, index.html fallback)
           └── /api/*  →  ARR reverse proxy  →  localhost:5000

localhost:5000 (not public)
    IIS Site: WebCompanionAPI
    C:\inetpub\webcompanion-api\
    App Pool: WebCompanionApiPool (No Managed Code, ANCM in-process)
    ASP.NET Core 9 via ASP.NET Core Module (ANCM)
    └── SQL Server (localhost, Windows Auth)
```

---

## Local Dev Setup (IIS + Local SQL Server)

Use this path when you want to test the full IIS-hosted stack on your **development machine** without needing Montreal4Rent. The local SQL Server instance is used with Windows Authentication.

### Prerequisites (local dev only)

Before running the setup, install these manually — the script cannot do them for you.

> **Tip:** Run all `winget install` commands in an **Administrator** PowerShell terminal, then run `iisreset` once after all installs complete.

#### 1. .NET 9 ASP.NET Core Hosting Bundle *(required — script will fail without it)*
This installs the **ASP.NET Core Module (ANCM)** into IIS. The SDK and Runtime-only installers are **not** sufficient — ANCM only ships with the Hosting Bundle.

```powershell
winget install Microsoft.DotNet.HostingBundle.9
```

Alternatively, download manually from: https://dotnet.microsoft.com/en-us/download/dotnet/9.0  
On that page: **.NET 9.0** → **ASP.NET Core Runtime** column → **Hosting Bundle** (Windows x64).

> Verify installation: `Test-Path "C:\Program Files\IIS\Asp.Net Core Module\V2\aspnetcorev2.dll"` should return `True`.

#### 2. IIS URL Rewrite Module 2.1 *(required for SPA routing)*

```powershell
winget install Microsoft.IIS.URLRewrite
```

#### 3. IIS Application Request Routing (ARR) 3.0 *(required for /api/* proxy)*

```powershell
winget install Microsoft.IIS.ApplicationRequestRouting
```

After installing ARR and URL Rewrite, run:
```powershell
iisreset
```

#### 4. Local SQL Server running with the `realestatewebcompanion` database

Run the setup script against your local instance if not already done:

```powershell
sqlcmd -S localhost -E -i "C:\local\angulardev\RealEstateWebCompanion\webapi\webcompanionapi\Scripts\create-database.sql"
```

#### 5. `webapi/.env` credential file *(required — script will fail without it)*

`iis-setup-local.ps1` reads `DB_USER` and `DB_PASSWORD` from `webapi/.env` and injects them as environment variables on the IIS App Pool so the ASP.NET Core process can use SQL Server authentication at runtime.

Create the file from the provided example:

```powershell
Copy-Item "C:\local\angulardev\RealEstateWebCompanion\webapi\.env.example" `
          "C:\local\angulardev\RealEstateWebCompanion\webapi\.env"
```

Then open `webapi/.env` and set your values:

```env
DB_USER=webcompanion_user
DB_PASSWORD=YourSecure!Password1
```

> **Security note:** `webapi/.env` is listed in `.gitignore` and must **never** be committed. The `.env.example` file is the safe, committed template.

### 1. Build

From a **PowerShell** terminal (not bash):

```powershell
cd C:\local\angulardev\RealEstateWebCompanion\deploy
.\build-all.ps1 -OutputRoot "C:\deploy\build"
```

To skip Montreal4Rent (faster iteration when only working on the API or admin app):

```powershell
.\build-all.ps1 -OutputRoot "C:\deploy\build" -SkipMontreal4Rent
```

### 2. Run the local IIS setup

Run from the **CloudSmith Terminal** (already elevated) or any **Admin PowerShell**:

```
deploy\iis-setup-local.bat
```

**What `iis-setup-local.bat` does:**
1. Launches `iis-setup-local.ps1` as Administrator via UAC
2. Enables all required IIS Windows features using `Enable-WindowsOptionalFeature` (the Windows 10/11 equivalent of the Server-only `Install-WindowsFeature`)
3. Calls `iis-setup.ps1` with these local dev flags:

| Flag | Value | Reason |
|---|---|---|
| `-SqlServer` | `localhost` | Local SQL Server default instance |
| `-WebCompanionAppHostname` | `localhost` | Binds Angular app to `localhost:80` — no `hosts` file edit needed |
| `-SkipDatabaseInit` | — | DB and tables already exist |
| `-SkipIisFeatures` | — | IIS features already handled by the local script above |

### 3. Credential injection and `appsettings.Production.json`

`iis-setup-local.ps1` handles this automatically — no manual step is needed after a clean run of `iis-setup-local.bat`. The script:

1. Reads `DB_USER` and `DB_PASSWORD` from `webapi/.env`
2. Writes `C:\inetpub\webcompanion-api\appsettings.Production.json` with a **credential-free** connection string:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=realestatewebcompanion;TrustServerCertificate=True;Encrypt=False;"
     },
     "AllowedCorsOrigins": ["http://localhost", "http://localhost:4200"]
   }
   ```
3. Sets `DB_USER` and `DB_PASSWORD` as **IIS App Pool environment variables** on `WebCompanionApiPool`. ASP.NET Core (`Program.cs`) picks them up at startup and injects them into the connection string at runtime — keeping credentials out of config files on disk.
4. Recycles `WebCompanionApiPool` so the new settings take effect immediately.

#### Subsequent rebuilds — `fix-local-appsettings.bat`

If you rebuild and redeploy the API without running the full setup again (e.g. after a code change), use the fast rebuild helper instead of re-running the full setup:

```powershell
cd C:\local\angulardev\RealEstateWebCompanion\deploy
.\fix-local-appsettings.bat
```

This helper stops the pool, robocopy-syncs the build output to `C:\inetpub\webcompanion-api\`, re-writes `appsettings.Production.json` (using Windows Authentication / `Trusted_Connection=True`), and restarts the pool. It also sets the app pool identity to **ApplicationPoolIdentity** (`IIS APPPOOL\WebCompanionApiPool`).

You need to grant that identity a SQL Server login once (run in SSMS or sqlcmd as sysadmin):

```sql
CREATE LOGIN [IIS APPPOOL\WebCompanionApiPool] FROM WINDOWS;
USE [realestatewebcompanion];
CREATE USER [IIS APPPOOL\WebCompanionApiPool] FOR LOGIN [IIS APPPOOL\WebCompanionApiPool];
ALTER ROLE db_datareader ADD MEMBER [IIS APPPOOL\WebCompanionApiPool];
ALTER ROLE db_datawriter ADD MEMBER [IIS APPPOOL\WebCompanionApiPool];
```

### 4. Smoke test

```powershell
Invoke-RestMethod http://localhost:5000/api/apartments   # WebAPI direct
Invoke-RestMethod http://localhost/api/apartments        # via ARR proxy
Start-Process "http://localhost:5000/swagger"            # Swagger UI
Start-Process "http://localhost"                         # Angular admin app
```

---

## Prerequisites

### Required Software

Install the following on the Windows Server **before** running the setup script. All are free downloads.

#### 1. IIS (Windows Server — handled by `iis-setup.ps1`)
The setup script calls `Install-WindowsFeature` automatically on Windows Server. If IIS is already installed, pass `-SkipIisFeatures` to the script.

> **Windows 10/11 (local dev):** `Install-WindowsFeature` is not available. Use `iis-setup-local.bat` instead — it runs `Enable-WindowsOptionalFeature` automatically before calling `iis-setup.ps1 -SkipIisFeatures`.

#### 2. IIS URL Rewrite Module 2.1
Required for Angular SPA routing (`index.html` fallback) on all three sites.

```
https://www.iis.net/downloads/microsoft/url-rewrite
```

Or via Web Platform Installer:
```powershell
webpicmd /Install /Products:UrlRewrite2
```

#### 3. IIS Application Request Routing (ARR) 3.0
Required for the `/api/*` reverse proxy on the WebCompanionApp site.

```powershell
winget install Microsoft.IIS.ApplicationRequestRouting
```

Or download manually from: https://www.iis.net/downloads/microsoft/application-request-routing

#### 4. .NET 9 ASP.NET Core Hosting Bundle *(required on both Windows Server and Windows 10/11)*
Installs the ASP.NET Core Module (ANCM) and .NET 9 runtime into IIS.
Choose **Hosting Bundle** — not the SDK or Runtime-only installer. The SDK alone does **not** install ANCM and the script will fail without it.

```powershell
winget install Microsoft.DotNet.HostingBundle.9
```

Or download manually from: https://dotnet.microsoft.com/en-us/download/dotnet/9.0  
On that page: **.NET 9.0** → **ASP.NET Core Runtime** column → **Hosting Bundle** (Windows x64).

> After installing ARR and the Hosting Bundle, always run `iisreset` before proceeding.

#### 5. PHP 8.x (Non-Thread-Safe x64)
Required for montreal4rent.com contact and email-sharing forms.

**Option A — Web Platform Installer (recommended):**
```powershell
webpicmd /Install /Products:PHPLatest
```

**Option B — Manual:**
1. Download NTS x64 zip from https://windows.php.net/download/
2. Extract to `C:\PHP`
3. Copy `php.ini-production` → `php.ini`
4. In `php.ini` enable these extensions (remove the leading `;`):
   ```ini
   extension=mbstring
   extension=openssl
   extension=curl
   ```
5. The `iis-setup.ps1` script registers `C:\PHP\php-cgi.exe` as a global FastCGI handler. If you install to a different path, pass `-PhpCgiPath "C:\your\path\php-cgi.exe"` to the script.

#### 6. SQL Server 2022
Express edition is free and sufficient for this application.

```
https://www.microsoft.com/en-us/sql-server/sql-server-downloads
```

During installation, choose **Mixed Mode** authentication (enables both Windows and SQL Server logins). Set a strong `sa` password — the setup script uses this to run the database init script and create the application login.

After installation, note the instance name (default: `MSSQLSERVER`, connect as `localhost`).

---

## Step 1 — Build Artifacts

Run on your **development machine** (or a CI agent), not the production server.

### Option A — PowerShell (Windows)

> **Note:** `build-all.ps1` uses `Set-StrictMode -Version Latest`, which conflicts with the Node.js `npm.ps1` wrapper. The script calls `npm.cmd` directly to avoid this — always run it from a **PowerShell** terminal, not bash.

```powershell
cd C:\local\angulardev\RealEstateWebCompanion\deploy
.\build-all.ps1 -OutputRoot "C:\deploy\build"
```

To skip Montreal4Rent (e.g. local dev or when that repo is not present):

```powershell
.\build-all.ps1 -OutputRoot "C:\deploy\build" -SkipMontreal4Rent
```

### Option B — Manual builds

```powershell
# WebCompanionAPI
cd C:\local\angulardev\RealEstateWebCompanion\webapi\webcompanionapi
dotnet publish webcompanionapi.csproj -c Release -o C:\deploy\build\webcompanion-api /p:UseAppHost=false

# Copy SQL init script
mkdir C:\deploy\build\webcompanion-api\Scripts
copy Scripts\create-database.sql C:\deploy\build\webcompanion-api\Scripts\

# WebCompanionApp (Angular admin)
cd C:\local\angulardev\RealEstateWebCompanion\RealEstateWebCompanion
npm run build -- --configuration production
robocopy dist\real-estate-web-companion\browser C:\deploy\build\webcompanion-app /MIR

# Montreal4Rent (Angular public)
cd C:\local\angulardev\RealEstateWebCompanion\montreal4rent\website
npm run build:prod
robocopy dist\montreal4rent C:\deploy\build\montreal4rent /MIR
```

After building, the output folder should look like:

```
C:\deploy\build\
├── webcompanion-api\        ← dotnet publish output
│   ├── webcompanionapi.dll
│   ├── appsettings.json
│   ├── appsettings.Production.json
│   └── Scripts\
│       └── create-database.sql
├── webcompanion-app\        ← Angular browser output
│   ├── index.html
│   ├── web.config
│   └── ...
└── montreal4rent\           ← Angular browser output + PHP
    ├── index.html
    ├── web.config
    ├── php\
    │   ├── contact.php
    │   ├── share-listing.php
    │   ├── email-history.php
    │   ├── PHPMailer.php
    │   └── config-smtp.php
    └── ...
```

---

## Step 2 — Copy Artifacts to Server

> **Local dev / same-machine IIS:** Skip this step entirely. The build output is already at `C:\deploy\build\` on the same machine where IIS will be configured. Proceed directly to Step 3.

For remote deployments, transfer the `C:\deploy\build\` folder to the Windows Server using one of these options:

- **Shared folder / network drive**: `robocopy \\server\share\build C:\deploy\build /MIR`
- **WinSCP / SFTP**
- **USB / file copy**
- **CI pipeline artefact upload** (GitHub Actions, Azure DevOps)

---

## Step 3 — Run the IIS Setup Script

On the **Windows Server**, open **PowerShell as Administrator** and run:

```powershell
cd C:\deploy
.\iis-setup.ps1 `
    -BuildRoot "C:\deploy\build" `
    -WebCompanionAppHostname "realestatewebcompanion.seguin.dev" `
    -Montreal4RentHostname   "montreal4rent.com" `
    -Montreal4RentHostnameWww "www.montreal4rent.com" `
    -DbUser "webcompanion_user"
```

The script will prompt for the `webcompanion_user` SQL password securely. It will:

1. Install required IIS Windows features
2. Verify URL Rewrite, ARR, .NET Hosting Bundle, and PHP are present
3. Create `C:\inetpub\webcompanion-api\`, `webcompanion-app\`, `montreal4rent\`
4. Copy all build artifacts into those folders
5. Initialise the SQL Server database and create the application SQL login
6. Write `appsettings.Production.json` with the real connection string and CORS origins
7. Create IIS Application Pools and Sites with correct bindings
8. Grant least-privilege file system permissions to each App Pool identity
9. Configure `index.html` as the default document on the SPA sites

### Script Parameters

| Parameter | Default | Description |
|---|---|---|
| `-BuildRoot` | *(required)* | Folder containing the staged build artifacts (Step 1) |
| `-WebCompanionAppHostname` | `realestatewebcompanion.seguin.dev` | Public hostname for the admin Angular app |
| `-Montreal4RentHostname` | `montreal4rent.com` | Primary hostname for the public site |
| `-Montreal4RentHostnameWww` | `www.montreal4rent.com` | www alias for the public site |
| `-SqlServer` | `localhost` | SQL Server instance address |
| `-DbName` | `realestatewebcompanion` | Database name |
| `-DbUser` | `webcompanion_user` | SQL login the WebAPI uses |
| `-DbPassword` | *(prompted)* | SQL login password |
| `-PhpCgiPath` | `C:\PHP\php-cgi.exe` | Full path to `php-cgi.exe` |
| `-InetpubRoot` | `C:\inetpub` | Root for IIS site folders |
| `-SkipDatabaseInit` | — | Skip SQL Server DB creation (safe to re-run; required when DB already exists) |
| `-SkipIisFeatures` | — | Skip `Install-WindowsFeature` (IIS already set up) |
| `-SkipMontreal4Rent` | — | Skip Montreal4Rent site entirely (local dev or single-site deploys) |

---

## Step 4 — Configure PHP SMTP (montreal4rent.com)

The PHP contact and listing-share forms send email via SMTP. The config file is copied to the server during deployment:

```
C:\inetpub\montreal4rent\php\config-smtp.php
```

Open the file and update the SMTP settings for your mail relay. The default is configured for GoDaddy's relay (`relay-hosting.secureserver.net`). If the Windows Server is not on GoDaddy hosting, update to your relay (Office 365, SendGrid, your ISP, etc.):

```php
// Example — Office 365
define('SMTP_HOST',     'smtp.office365.com');
define('SMTP_PORT',     587);
define('SMTP_USERNAME', 'noreply@montreal4rent.com');
define('SMTP_PASSWORD', 'your-smtp-password');
define('SMTP_FROM',     'noreply@montreal4rent.com');
```

Test the configuration:

```
http://montreal4rent.com/php/test-php-config.php
http://montreal4rent.com/php/test-email.php?test=send
```

---

## Step 5 — Install SSL Certificates

### Using win-acme (Let's Encrypt — free)

1. Download win-acme from https://github.com/win-acme/win-acme/releases
2. Extract to `C:\tools\win-acme\`
3. Run as Administrator:

```powershell
# montreal4rent.com + www redirect
C:\tools\win-acme\wacs.exe --target iis --host montreal4rent.com,www.montreal4rent.com

# WebCompanion admin app
C:\tools\win-acme\wacs.exe --target iis --host realestatewebcompanion.seguin.dev
```

win-acme automatically:
- Creates HTTPS bindings on the IIS sites
- Adds an HTTP→HTTPS redirect rule
- Schedules automatic certificate renewal via Windows Task Scheduler

### Using a commercial/CA-issued certificate (manual)

1. Import the `.pfx` certificate into the Windows Certificate Store (Local Machine → Personal)
2. In IIS Manager → site → Bindings → Add → HTTPS, select your certificate
3. Add an HTTP→HTTPS redirect in `web.config`:

```xml
<rule name="HTTP to HTTPS" stopProcessing="true">
  <match url="(.*)" />
  <conditions>
    <add input="{HTTPS}" pattern="off" ignoreCase="true" />
  </conditions>
  <action type="Redirect" url="https://{HTTP_HOST}/{R:0}" redirectType="Permanent" />
</rule>
```

---

## Step 6 — Smoke Tests

Run from PowerShell on the server after all steps are complete.

```powershell
# 1. WebAPI responds internally
Invoke-RestMethod http://localhost:5000/api/apartments

# 2. ARR proxy routes /api/* through the Angular app site
Invoke-RestMethod http://realestatewebcompanion.seguin.dev/api/apartments

# 3. Angular SPA deep-link routing (must return 200 with index.html, not 404)
(Invoke-WebRequest http://realestatewebcompanion.seguin.dev/listings).StatusCode   # → 200
(Invoke-WebRequest http://montreal4rent.com/apartments).StatusCode                 # → 200

# 4. PHP contact form endpoint reachable
(Invoke-WebRequest http://montreal4rent.com/php/contact.php -Method POST).StatusCode   # → 400 or 200 (not 404)

# 5. PHP config diagnostic
Invoke-RestMethod http://montreal4rent.com/php/test-php-config.php
```

---

## Re-deploying (Updates)

After code changes, re-run the build and then run `iis-setup.ps1` again — it is **idempotent** (safe to re-run without side effects). Use the `-Skip*` flags to deploy only one component.

```powershell
# Example: redeploy only the WebAPI after a code change
.\build-all.ps1  -OutputRoot "C:\deploy\build" -SkipWebCompanionApp -SkipMontreal4Rent
.\iis-setup.ps1  -BuildRoot  "C:\deploy\build" -SkipDatabaseInit -SkipIisFeatures -SkipMontreal4Rent
```

---

## Credential Flow

Understanding how database credentials travel from source to runtime:

```
webapi/.env
  DB_USER=webcompanion_user       (not committed — gitignored)
  DB_PASSWORD=YourSecure!Password
        │
        ▼
iis-setup-local.ps1
  reads .env → sets as IIS App Pool environment variables
        │
        ▼
IIS App Pool: WebCompanionApiPool
  environmentVariables:
    DB_USER=webcompanion_user
    DB_PASSWORD=YourSecure!Password
        │
        ▼  (ANCM passes env vars into the hosted process)
ASP.NET Core — Program.cs
  reads env vars → injects into connection string at startup
  "Server=localhost;Database=realestatewebcompanion;
   User Id=<DB_USER>;Password=<DB_PASSWORD>;
   TrustServerCertificate=True;Encrypt=False;"
        │
        ▼
appsettings.Production.json on disk
  (credential-free — safe to inspect, no secrets)
```

**Why this pattern?**
- Credentials never appear in files on disk inside `C:\inetpub\`
- No secrets in source control (`.env` is gitignored)
- App Pool env vars are stored encrypted in IIS `applicationHost.config`
- Easy to rotate: update `.env`, re-run `iis-setup-local.ps1` or set the env var directly in IIS Manager

---

## Folder Reference

| Path | Contents |
|---|---|
| `C:\inetpub\webcompanion-api\` | Published ASP.NET Core WebAPI + `appsettings.Production.json` |
| `C:\inetpub\webcompanion-app\` | Angular admin SPA static files + `web.config` (ARR + SPA routing) |
| `C:\inetpub\montreal4rent\` | Angular public SPA + `php/` folder |
| `C:\inetpub\montreal4rent\history\emails\` | PHP email log files (writable by App Pool) |
| `webapi/.env` | **Local dev only** — `DB_USER` + `DB_PASSWORD` secrets (gitignored, never committed) |
| `webapi/.env.example` | Safe committed template; copy to `.env` and fill in values |
| `deploy\build-all.ps1` | Build script (run on dev machine) |
| `deploy\iis-setup.ps1` | IIS provisioning script (run on server as Administrator) |
| `deploy\iis-setup-local.ps1` | Local dev wrapper — enables Windows features, reads `webapi/.env`, calls `iis-setup.ps1`, writes `appsettings.Production.json`, injects App Pool env vars |
| `deploy\iis-setup-local.bat` | Launches `iis-setup-local.ps1` elevated via UAC |
| `deploy\fix-local-appsettings.bat` | Fast rebuild helper — stops pool, syncs build output, writes `appsettings.Production.json` (Windows Auth), restarts pool |
| `webapi\webcompanionapi\appsettings.Production.json` | Template — overwritten (credential-free) by `iis-setup-local.ps1`; credentials come from App Pool env vars |
| `RealEstateWebCompanion\public\web.config` | WebCompanionApp IIS config (included in `ng build` output) |
| `montreal4rent\website\src\web.config` | montreal4rent IIS config (included in `ng build` output) |

---

## Troubleshooting

### Swagger shows a blank/white page
- Swagger is always enabled in this build (no environment check). If you get a blank page, the old DLL is likely still deployed.
- Rebuild and redeploy: `cd deploy; .\build-all.ps1 -OutputRoot "C:\deploy\build"; .\iis-setup-local.bat`
- Access Swagger at: **http://localhost:5000/swagger/index.html** (not `/swagger` — some browsers need the full path)
- Check the app pool is running: IIS Manager → Application Pools → WebCompanionApiPool → State = Started

### 502 Bad Gateway on `/api/*`
- Confirm the WebCompanionAPI site is running: `Invoke-RestMethod http://localhost:5000/api/apartments`
- Confirm ARR is installed and the global proxy is enabled (IIS Manager → server node → Application Request Routing Cache → Server Proxy Settings → Enable proxy)
- Check the Windows Event Log → Application for ANCM startup errors
- Verify ANCM DLL exists: `Test-Path "C:\Program Files\IIS\Asp.Net Core Module\V2\aspnetcorev2.dll"` — if `False`, install the Hosting Bundle and run `iisreset`

### 404 on Angular deep links (e.g. `/listings`, `/apartments`)
- Confirm the `web.config` with the SPA rewrite rule was copied to the site root
- Confirm URL Rewrite module is installed: `Get-WebGlobalModule | Where-Object { $_.Name -like '*Rewrite*' }`

### PHP returning 404 or 500
- Confirm `C:\PHP\php-cgi.exe` exists (or update `-PhpCgiPath`)
- Check the FastCGI handler is registered: IIS Manager → server node → Handler Mappings → look for `PHP_FastCGI`
- Check PHP error log: `C:\PHP\logs\php_errors.log` (set `error_log` in `php.ini` if not already configured)
- Run the diagnostic: `http://montreal4rent.com/php/test-php-config.php`

### SQL Server connection errors (500 from the API)
- Confirm SQL Server is running: `Get-Service -Name MSSQLSERVER`
- Confirm the login was created: connect with SSMS and check Security → Logins
- Check `C:\inetpub\webcompanion-api\appsettings.Production.json` has the correct connection string (this file is **not** written when `-SkipDatabaseInit` is used — run `fix-local-appsettings.bat` to create it)
- For Windows Auth (`Trusted_Connection=True`): confirm the IIS app pool identity is **LocalSystem** (set by `fix-local-appsettings.bat`) or has a SQL Server login
- Confirm TCP/IP is enabled in SQL Server Configuration Manager (required when connecting via `localhost` with SQL auth)
