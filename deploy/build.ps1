#Requires -Version 5.1

<#
.SYNOPSIS
    Builds a single project and stages artifacts into the output folder.

.PARAMETER Target
    Which project to build. Accepted values: webapi, webcompanion, montreal4rent

.PARAMETER OutputRoot
    Folder where staged artifacts will be written.
    Default: <repo-root>\deploy\build

.EXAMPLE
    .\build.ps1 -Target webapi
    .\build.ps1 -Target webcompanion -OutputRoot "C:\deploy\build"
    .\build.ps1 -Target montreal4rent
#>

param(
    [Parameter(Mandatory)]
    [ValidateSet("webapi", "webcompanion", "montreal4rent")]
    [string]$Target,

    [string]$OutputRoot = (Join-Path $PSScriptRoot "build")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot     = Split-Path $PSScriptRoot -Parent
$webapiSrc    = Join-Path $repoRoot "webapi\webcompanionapi"
$webAppSrc    = Join-Path $repoRoot "RealEstateWebCompanion"
$montreal4Src = Join-Path $repoRoot "montreal4rent\website"

function Write-Step([string]$msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok([string]$msg)   { Write-Host "    [OK] $msg" -ForegroundColor Green }
function Write-Fail([string]$msg) { Write-Host "    [FAIL] $msg" -ForegroundColor Red }

function Assert-Exit([string]$label) {
    if ($LASTEXITCODE -ne 0) {
        Write-Fail "$label failed (exit $LASTEXITCODE)."
        exit 1
    }
}

switch ($Target) {

    # -----------------------------------------------------------------------
    # webapi  (dotnet publish)
    # -----------------------------------------------------------------------
    "webapi" {
        Write-Step "Building WebCompanionAPI (dotnet publish -c Release)"

        $apiOut = Join-Path $OutputRoot "webcompanion-api"
        Push-Location $webapiSrc
        try {
            dotnet publish webcompanionapi.csproj -c Release -o $apiOut /p:UseAppHost=false
            Assert-Exit "dotnet publish"
        } finally {
            Pop-Location
        }

        # Copy SQL scripts alongside the API artifacts
        $scriptsDir = Join-Path $webapiSrc "Scripts"
        $outScripts = Join-Path $apiOut "Scripts"
        New-Item -ItemType Directory -Path $outScripts -Force | Out-Null
        Copy-Item "$scriptsDir\*.sql" $outScripts -Force
        Write-Ok "SQL scripts copied to: $outScripts"

        Write-Ok "WebCompanionAPI staged -> $apiOut"
    }

    # -----------------------------------------------------------------------
    # webcompanion  (Angular admin app)
    # -----------------------------------------------------------------------
    "webcompanion" {
        Write-Step "Building WebCompanionApp (ng build --configuration production)"

        $appOut = Join-Path $OutputRoot "webcompanion-app"
        Push-Location $webAppSrc
        try {
            npm.cmd run build -- --configuration production
            Assert-Exit "ng build (WebCompanionApp)"
        } finally {
            Pop-Location
        }

        $ngDist = Join-Path $webAppSrc "dist\real-estate-web-companion\browser"
        if (-not (Test-Path $ngDist)) {
            $ngDist = Join-Path $webAppSrc "dist\real-estate-web-companion"
        }
        if (-not (Test-Path $ngDist)) {
            Write-Fail "Could not find ng build output under dist\. Check angular.json outputPath."
            exit 1
        }

        robocopy $ngDist $appOut /MIR /NP /NFL /NDL /NJH /NJS | Out-Null
        Write-Ok "WebCompanionApp staged -> $appOut"
    }

    # -----------------------------------------------------------------------
    # montreal4rent  (Angular public site)
    # -----------------------------------------------------------------------
    "montreal4rent" {
        Write-Step "Building Montreal4Rent (ng build --configuration production)"

        if (-not (Test-Path $montreal4Src)) {
            Write-Fail "montreal4rent source not found at: $montreal4Src"
            exit 1
        }

        $m4rOut = Join-Path $OutputRoot "montreal4rent"
        Push-Location $montreal4Src
        try {
            npm.cmd run build:prod
            Assert-Exit "ng build (Montreal4Rent)"
        } finally {
            Pop-Location
        }

        $ngDist = Join-Path $montreal4Src "dist\montreal4rent\browser"
        if (-not (Test-Path $ngDist)) {
            $ngDist = Join-Path $montreal4Src "dist\montreal4rent"
        }
        if (-not (Test-Path $ngDist)) {
            Write-Fail "Could not find ng build output under dist\. Check angular.json outputPath."
            exit 1
        }

        robocopy $ngDist $m4rOut /MIR /NP /NFL /NDL /NJH /NJS | Out-Null
        Write-Ok "Montreal4Rent staged -> $m4rOut"
    }
}

Write-Host "`nBuild complete. Artifacts staged in:" -ForegroundColor Green
Write-Host "  $OutputRoot" -ForegroundColor White
Write-Host "`nRun the IIS setup script next:" -ForegroundColor Cyan
Write-Host "  .\iis-setup.ps1 -BuildRoot `"$OutputRoot`"`n" -ForegroundColor White
