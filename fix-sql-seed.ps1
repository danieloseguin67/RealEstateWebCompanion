$sqlPath = "c:\local\angulardev\RealEstateWebCompanion\webapi\webcompanionapi\Scripts\create-database.sql"
$content = [System.IO.File]::ReadAllText($sqlPath, [System.Text.Encoding]::UTF8)

# Step 1: Replace INSERT column list
$content = $content -replace '\[FeaturesJson\], \[FeaturesEnJson\], \[ImagesJson\], \[ToggleNamesJson\]', '[FeaturesJson], [ImagesJson]'

# Step 2: Replace toggle name arrays with feature ID arrays
$replacements = @(
    @("N'[""Car wash"",""Pet Friendly"",""Parking Available"",""Elevator"",""Gym""]'", "N'[8,1,2,3,5]'"),
    @("N'[""Parking Available"",""Washer/Dryer in Unit"",""Roof top patio"",""Gym"",""Elevator"",""Pet Friendly""]'", "N'[2,4,7,5,3,1]'"),
    @("N'[""Parking Available"",""Washer/Dryer in Unit"",""Pet Friendly"",""Gym"",""Elevator"",""Roof top patio""]'", "N'[2,4,1,5,3,7]'"),
    @("N'[""Parking Available"",""Washer/Dryer in Unit"",""Pet Friendly"",""Roof top patio"",""Gym"",""Elevator""]'", "N'[2,4,1,7,5,3]'"),
    @("N'[""Parking Available"",""Elevator"",""Gym""]'", "N'[2,3,5]'"),
    @("N'[""Elevator"",""Gym"",""Parking Available""]'", "N'[3,5,2]'"),
    @("N'[""Parking Available"",""Gym"",""Elevator""]'", "N'[2,5,3]'"),
    @("N'[""Parking Available"",""Elevator""]'", "N'[2,3]'"),
    @("N'[""Elevator"",""Gym""]'", "N'[3,5]'"),
    @("N'[""Pet Friendly"",""Parking Available""]'", "N'[1,2]'"),
    @("N'[""Parking Available""]'", "N'[2]'")
)

foreach ($pair in $replacements) {
    $content = $content.Replace($pair[0], $pair[1])
}

# Step 3: Remove "N'[]', N'[]', \r\n    " before the images JSON
# After column rename, pattern is: N'[]', N'[]', \r\n    N'[feature_ids]',\r\n    N'[images]'
# We want: N'[feature_ids]',\r\n    N'[images]'
# But actually the order in the VALUES clause was: FeaturesJson='[]', FeaturesEnJson='[]', ImagesJson='[imgs]', ToggleNamesJson='[names]'
# After replacement of names with IDs, we have: '[]', '[]', '[imgs]', '[ids]'
# After column rename to FeaturesJson, ImagesJson: we want values to be '[ids]', '[imgs]'
# So we need to remove: N'[]', N'[]', NEWLINE+SPACES and move [ids] to front, then [imgs]
# This is complex due to ordering - let me just remove N'[]', N'[]', from before images and 
# swap the last two values.

# Actually the old order was: FeaturesJson(French)='[]', FeaturesEnJson(English)='[]', ImagesJson='[imgs]', ToggleNamesJson='[ids]'
# New order should be: FeaturesJson(IDs)='[ids]', ImagesJson='[imgs]'
# So I need to convert:  N'[]', N'[]', \n    N'[imgs]',\n    N'[ids]');
# to:                    N'[ids]',\n    N'[imgs]');

# Use regex: match "N'[]', N'[]', " + CRLF + spaces + "(N'[imgs]')," + CRLF + spaces + "(N'[ids]')"
# and replace with "[ids]" + CRLF + spaces + "[imgs]"

$content = $content -replace "N'\[\]', N'\[\]', `r`n    (N'\[(?:[^\]]*)\]'),`r`n    (N'\[(?:\d+(?:,\d+)*)\]')", '$2,$1'
# Remove remaining N'[]', N'[]', patterns (in case newline style differs)
$content = $content -replace "N'\[\]', N'\[\]', `n    (N'\[(?:[^\]]*)\]'),`n    (N'\[(?:\d+(?:,\d+)*)\]')", '$2,$1'

[System.IO.File]::WriteAllText($sqlPath, $content, [System.Text.Encoding]::UTF8)

Write-Host "Done."
$verify = [System.IO.File]::ReadAllText($sqlPath, [System.Text.Encoding]::UTF8)
$oldColCount = ([regex]::Matches($verify, 'FeaturesEnJson')).Count
$newColCount = ([regex]::Matches($verify, '\[FeaturesJson\], \[ImagesJson\]')).Count
$emptyArrCount = ([regex]::Matches($verify, "N'\[\]', N'\[\]'")).Count
Write-Host "Remaining FeaturesEnJson occurrences: $oldColCount"
Write-Host "New column pattern [FeaturesJson], [ImagesJson] occurrences: $newColCount"
Write-Host "Remaining N'[]', N'[]' occurrences: $emptyArrCount"
