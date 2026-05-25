$f = "c:\local\angulardev\RealEstateWebCompanion\webapi\webcompanionapi\Scripts\create-database.sql"
$b = [System.IO.File]::ReadAllBytes($f)
$s = [System.Text.Encoding]::UTF8.GetString($b)
$i = $s.IndexOf("N'[]', N'[]'")
Write-Host "Found at: $i"

if ($i -ge 0) {
    for ($j = $i+12; $j -lt [Math]::Min($i+50, $s.Length); $j++) {
        $c = [int][char]$s[$j]
        Write-Host "$j -> code:$c"
        if ($j -gt $i+30) { break }
    }
}

# Count all remaining patterns
$count = 0
$pos = 0
while ($true) {
    $found = $s.IndexOf("N'[]', N'[]'", $pos)
    if ($found -lt 0) { break }
    $count++
    $pos = $found + 1
}
Write-Host "Total remaining: $count"

# Try to fix - replace with LF only
$fixed = $s -replace "N'\[\]', N'\[\]',\r?\n    (N'\[[^\]]*\]'),\r?\n    (N'\[[\d,]+\]')", '$2,`n    $1'

$count2 = 0
$pos2 = 0
while ($true) {
    $found = $fixed.IndexOf("N'[]', N'[]'", $pos2)
    if ($found -lt 0) { break }
    $count2++
    $pos2 = $found + 1
}
Write-Host "After fix: $count2"

if ($count2 -lt $count) {
    [System.IO.File]::WriteAllText($f, $fixed, [System.Text.Encoding]::UTF8)
    Write-Host "Saved!"
} else {
    Write-Host "Fix didn't help, trying inline..."
    # Try inline without newlines first
    $fixed2 = $s -replace "N'\[\]', N'\[\]', (N'\[[^\]]*\]'), (N'\[[\d,]+\]')", '$2, $1'
    $count3 = ($fixed2 | Select-String -AllMatches "N'\[\]', N'\[\]'" | ForEach-Object { $_.Matches.Count } | Measure-Object -Sum).Sum
    Write-Host "Inline fix count: $count3"
}
