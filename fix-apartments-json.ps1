$jsonPath = "c:\local\angulardev\RealEstateWebCompanion\RealEstateWebCompanion\src\assets\data\apartments.json"
$content = Get-Content $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

$idMap = @{
    'Pet Friendly' = 1; 'Parking Available' = 2; 'Elevator' = 3
    'Washer/Dryer in Unit' = 4; 'Gym' = 5; 'Pool' = 6
    'Roof top patio' = 7; 'Car wash' = 8
}

$updated = $content | ForEach-Object {
    $apt = $_
    # Convert toggle_names to feature_ids
    $featureIds = @()
    if ($apt.PSObject.Properties.Name -contains 'toggle_names' -and $apt.toggle_names) {
        $featureIds = $apt.toggle_names | ForEach-Object {
            if ($idMap.ContainsKey($_)) { $idMap[$_] } else { Write-Warning "Unknown: $_"; 0 }
        } | Where-Object { $_ -ne 0 }
    }
    
    [PSCustomObject]@{
        id            = $apt.id
        title         = $apt.title
        titleEn       = $apt.titleEn
        unit_type_name= $apt.unit_type_name
        bathrooms     = $apt.bathrooms
        squareFootage = $apt.squareFootage
        price         = $apt.price
        area          = $apt.area
        furnished     = $apt.furnished
        roomtorent    = $apt.roomtorent
        condorentals  = $apt.condorentals
        available     = $apt.available
        description   = $apt.description
        descriptionEn = $apt.descriptionEn
        feature_ids   = @($featureIds)
        images        = @($apt.images)
    }
}

$updated | ConvertTo-Json -Depth 10 | Set-Content $jsonPath -Encoding UTF8
Write-Host "Updated $($updated.Count) apartments in apartments.json"
