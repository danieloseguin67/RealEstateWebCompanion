@echo off
powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-NoExit -NoProfile -ExecutionPolicy Bypass -File ""C:\local\angulardev\RealEstateWebCompanion\deploy\iis-setup-local.ps1""'"
