@echo off
:: Launches deploy-all.ps1 elevated.
:: Usage examples:
::   deploy-all.bat                          -> local, build all, deploy all
::   deploy-all.bat -SkipBuild               -> local, skip build, deploy existing artifacts
::   deploy-all.bat -SkipMontreal4Rent       -> local, skip montreal4rent
::   deploy-all.bat -Environment production  -> production deploy (full)

set "ARGS=-NoExit -NoProfile -ExecutionPolicy Bypass -File ""%~dp0deploy-all.ps1"" %*"
powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '%ARGS%'"
