param(
  [string]$Message = "Update $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$remoteUrl = 'https://github.com/nandita-d/BajajInsurenceApp.git'

# OneDrive can block writing `.git` metadata. Work around by syncing to a normal folder and pushing from there.
$sourceDir = (Get-Location).Path
$targetDir = Join-Path $env:USERPROFILE '.codex\memories\BajajInsurenceApp_push'

if (-not (Test-Path $targetDir)) {
  New-Item -ItemType Directory -Path $targetDir | Out-Null
  git clone $remoteUrl $targetDir
}

robocopy $sourceDir $targetDir /MIR `
  /XD .git node_modules build dist out `
      BajajInsurenceApp _github_repo _pushrepo2 .vscode `
  /XF package-lock.json yarn.lock npm-debug.log yarn-error.log `
  /R:1 /W:1 /NJH /NJS /NP /NFL /NDL | Out-Null

Push-Location $targetDir
try {
  git fetch origin | Out-Null
  git add -A
  if (git status --porcelain) {
    git commit -m $Message
    git push origin main
  } else {
    Write-Host "No changes to push."
  }
} finally {
  Pop-Location
}
