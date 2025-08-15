$ScriptLocation = $PSScriptRoot

$key = (New-Guid).ToString().Replace("-", "").Substring(0, 10)
$value = (Get-Content "$ScriptLocation/../client/tests/react/reducer/testData/data.json" -Raw) -replace "'", ""

$db = "$ScriptLocation/../server/database/db.sqlite"
Write-Output "INSERT INTO KeyValuePairs (key, value) VALUES ('$key', '$value');" | sqlite3 $db

Write-Host "http://localhost:4000?importKey=$key"
