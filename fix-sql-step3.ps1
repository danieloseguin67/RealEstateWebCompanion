$f = "c:\local\angulardev\RealEstateWebCompanion\webapi\webcompanionapi\Scripts\create-database.sql"
$content = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

# Step 1: Fix column order - swap FeaturesJson, ImagesJson to ImagesJson, FeaturesJson
# This matches the actual value order (images appear before feature IDs in the data)
$content = $content.Replace('[FeaturesJson], [ImagesJson]', '[ImagesJson], [FeaturesJson]')

# Step 2: Remove the "    N'[]', N'[]'," lines (with CRLF or LF)
$content = $content -replace "    N'\[\]', N'\[\]',\r?\n", ""

[System.IO.File]::WriteAllText($f, $content, [System.Text.Encoding]::UTF8)

# Verify
$verify = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
$remaining = ([regex]::Matches($verify, "N'\[\]'")).Count
$newCols = ([regex]::Matches($verify, '\[ImagesJson\], \[FeaturesJson\]')).Count
Write-Host "Remaining N'[]' occurrences: $remaining"
Write-Host "[ImagesJson], [FeaturesJson] column occurrences: $newCols"
Write-Host "Done!"
