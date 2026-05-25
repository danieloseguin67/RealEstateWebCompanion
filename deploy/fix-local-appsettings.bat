@echo off
:: Re-launch as administrator if not already elevated
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-NoExit -NoProfile -ExecutionPolicy Bypass -File ""%~dp0fix-local-appsettings.ps1""'"
    exit /b
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0fix-local-appsettings.ps1"
