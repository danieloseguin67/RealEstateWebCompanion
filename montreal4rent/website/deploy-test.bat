@echo off
REM Montreal4Rent - Deploy to /test/ subfolder on GoDaddy
REM This wrapper ensures the build always uses base-href=/test/
REM preventing white pages caused by incorrect asset paths

echo ========================================
echo Deploying to https://montreal4rent.com/test/
echo ========================================
echo.

REM Call the main deploy script with "test" argument
call "%~dp0deploy-prod.bat" test

if errorlevel 1 (
  echo.
  echo [ERROR] Deployment failed. Check output above.
  pause
  exit /b 1
)

echo.
echo ========================================
echo Build complete for /test/ deployment
echo ========================================
echo.
echo Upload contents of dist\montreal4rent\ to:
echo   public_html/test/
echo.
echo Also upload PHP endpoints to public_html root:
echo   - php/contact.php
echo   - php/email-history.php
echo.
echo Create folder: public_html/history/emails/
echo ========================================
pause
