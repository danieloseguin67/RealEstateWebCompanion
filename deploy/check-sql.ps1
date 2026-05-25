$instances = @("localhost", "localhost\MSSQLSERVER01")
foreach ($srv in $instances) {
    $csb = New-Object System.Data.SqlClient.SqlConnectionStringBuilder
    $csb.DataSource = $srv
    $csb.InitialCatalog = "master"
    $csb.IntegratedSecurity = $true
    $csb.TrustServerCertificate = $true
    $csb.ConnectTimeout = 5
    $conn = New-Object System.Data.SqlClient.SqlConnection $csb.ConnectionString
    try {
        $conn.Open()
        $cmd = $conn.CreateCommand()
        $cmd.CommandText = "SELECT name FROM sys.databases WHERE name='realestatewebcompanion'"
        $result = $cmd.ExecuteScalar()
        if ($result) {
            Write-Host "[$srv] Found DB: $result" -ForegroundColor Green
        } else {
            Write-Host "[$srv] Connected but DB not found" -ForegroundColor Yellow
        }
        $conn.Close()
    } catch {
        Write-Host "[$srv] FAIL: $($_.Exception.Message)" -ForegroundColor Red
    }
}
