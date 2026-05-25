@echo off
setlocal enableextensions enabledelayedexpansion
REM Montreal4Rent - Production Deploy Helper (GoDaddy)
REM - Builds production
REM - Packages dist into a timestamped ZIP
REM - Optional: uploads via WinSCP if env vars are set

REM Move to script directory (website root)
pushd "%~dp0"

if not exist package.json (
  echo [ERROR] This script must be placed in the website folder containing package.json.
  echo Current: %CD%
  goto :error
)

REM Determine BASE_HREF for subfolder deployments (arg1 or SUBDIR env var)
set "BASE_HREF=%~1"
if "%BASE_HREF%"=="" set "BASE_HREF=%SUBDIR%"
if "%BASE_HREF%"=="" set "BASE_HREF=/"

REM Normalize: ensure leading and trailing slashes
if not "%BASE_HREF:~0,1%"=="/" set "BASE_HREF=/%BASE_HREF%"
set "_LASTCHAR=%BASE_HREF:~-1%"
if not "%_LASTCHAR%"=="/" set "BASE_HREF=%BASE_HREF%/"
set "_LASTCHAR="

echo [1/4] Building Angular production for base-href: %BASE_HREF%
REM Also set deploy-url to ensure asset and chunk paths work in subfolders
call npx ng build --configuration production --base-href %BASE_HREF% --deploy-url %BASE_HREF%
if errorlevel 1 goto :error

REM Ensure .htaccess exists (directory-relative rules safe for subfolders)
if exist "dist\montreal4rent\.htaccess" (
  echo [.htaccess] Found in dist.
) else (
  echo [.htaccess] Not found. Creating minimal routing rules...
  > "dist\montreal4rent\.htaccess" echo RewriteEngine On
  >> "dist\montreal4rent\.htaccess" echo RewriteCond %%{REQUEST_FILENAME} !-f
  >> "dist\montreal4rent\.htaccess" echo RewriteCond %%{REQUEST_FILENAME} !-d
  >> "dist\montreal4rent\.htaccess" echo RewriteRule . index.html [L]
)

echo [2/4] Packaging build to ZIP...
for /f %%I in ("%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe") do set PS=%%~fI
set "PS_SCRIPT=%TEMP%\m4r-deploy-zip.ps1"
>  "%PS_SCRIPT%" echo $ErrorActionPreference = 'Continue'
>> "%PS_SCRIPT%" echo $out='deploy'
>> "%PS_SCRIPT%" echo if(!(Test-Path $out)){ New-Item -ItemType Directory -Path $out -ErrorAction SilentlyContinue ^| Out-Null }
>> "%PS_SCRIPT%" echo $stamp=Get-Date -Format 'yyyyMMdd-HHmm'
>> "%PS_SCRIPT%" echo $zip=Join-Path $out ('montreal4rent-prod-'+$stamp+'.zip')
>> "%PS_SCRIPT%" echo if(Test-Path $zip){ Remove-Item $zip -Force }
>> "%PS_SCRIPT%" echo Compress-Archive -Path 'dist\montreal4rent\*' -DestinationPath $zip -ErrorAction Continue
>> "%PS_SCRIPT%" echo Write-Output ('Created: ' + $zip)
"%PS%" -NoProfile -File "%PS_SCRIPT%"
if exist "%PS_SCRIPT%" del "%PS_SCRIPT%" >nul 2>nul
if errorlevel 1 goto :error

REM Optional FTP upload via WinSCP
IF /I "%USE_WINSCP%"=="1" GOTO upload
echo [3/4] Skipping FTP upload (set USE_WINSCP=1 to enable).
GOTO done

:upload
set "WINSCP_BIN=WinSCP.com"
if defined WINSCP_PATH set "WINSCP_BIN=%WINSCP_PATH%\WinSCP.com"
where %WINSCP_BIN% >nul 2>nul || (
  echo [WARN] WinSCP.com not found. Set WINSCP_PATH or add WinSCP to PATH.
  goto done
)

if "%FTP_HOST%"=="" (
  echo [WARN] FTP_HOST not set. Skipping upload.
  goto done
)
if "%FTP_USER%"=="" (
  echo [WARN] FTP_USER not set. Skipping upload.
  goto done
)
if "%FTP_PASS%"=="" (
  echo [WARN] FTP_PASS not set. Skipping upload.
  goto done
)
REM Default remote target to public_html + BASE_HREF (e.g., /public_html/test/)
if "%FTP_TARGET%"=="" set "FTP_TARGET=/public_html%BASE_HREF%"

set "SCRIPT_FILE=%TEMP%\winscp-deploy.txt"
>  "%SCRIPT_FILE%" echo option batch on
>> "%SCRIPT_FILE%" echo option confirm off
>> "%SCRIPT_FILE%" echo open ftp://%FTP_USER%:%FTP_PASS%@%FTP_HOST%
>> "%SCRIPT_FILE%" echo cd %FTP_TARGET%
>> "%SCRIPT_FILE%" echo lcd dist\montreal4rent
>> "%SCRIPT_FILE%" echo synchronize remote -delete
>> "%SCRIPT_FILE%" echo exit

echo [3/4] Uploading via WinSCP to %FTP_HOST%%FTP_TARGET% ...
%WINSCP_BIN% /script="%SCRIPT_FILE%"
if errorlevel 1 (
  echo [WARN] Upload reported an error.
) else (
  echo [OK] Upload completed.
)

if exist "%SCRIPT_FILE%" del "%SCRIPT_FILE%" >nul 2>nul

:done
echo [4/4] Done. Production build packaged in .\deploy
popd
exit /b 0

:error
echo [ERROR] Deployment script aborted.
popd
exit /b 1
