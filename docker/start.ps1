$SqliteFile = "$PSScriptRoot/../server/database/db.sqlite"

if (-not (Test-Path $SqliteFile)) {
    New-Item -ItemType Directory -Path (Split-Path $SqliteFile) -Force | Out-Null
    New-Item -ItemType File -Path $SqliteFile -Force | Out-Null
}

docker compose up -d
