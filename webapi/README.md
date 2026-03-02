# webcompanionapi

ASP.NET Core Web API for Real Estate Web Companion v2. Provides a REST API backed by SQL Server that replaces the static JSON files used by the Angular front-end.

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- SQL Server (local instance on `localhost`)

## Database Setup

1. Open SQL Server Management Studio (SSMS) or any SQL client connected to your `localhost` instance.
2. Run the setup script to create the database and tables:

   ```
   webcompanionapi/Scripts/create-database.sql
   ```

   This script creates the `realestatewebcompanion` database and all required tables with seed data.

## Running the API

```bash
cd webapi/webcompanionapi
dotnet run
```

The API starts on `http://localhost:5234` by default (HTTP) or `https://localhost:7264` (HTTPS).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/apartments` | List all apartments |
| GET | `/api/apartments/{id}` | Get apartment by ID |
| POST | `/api/apartments` | Create apartment |
| PUT | `/api/apartments/{id}` | Update apartment |
| DELETE | `/api/apartments/{id}` | Delete apartment |
| GET | `/api/appversion` | Get app version |
| PUT | `/api/appversion` | Update app version |
| GET | `/api/customer` | List all customers (wrapped in `{ customers: [...] }`) |
| GET | `/api/customer/{id}` | Get customer by ID |
| POST | `/api/customer` | Create customer |
| PUT | `/api/customer/{id}` | Update customer |
| DELETE | `/api/customer/{id}` | Delete customer |
| GET | `/api/preferences` | Get preferences |
| PUT | `/api/preferences` | Update preferences |
| GET | `/api/seo` | List all SEO pages |
| GET | `/api/seo/{id}` | Get SEO page by ID |
| POST | `/api/seo` | Create SEO page |
| PUT | `/api/seo/{id}` | Update SEO page |
| DELETE | `/api/seo/{id}` | Delete SEO page |
| GET | `/api/features` | List all features/toggles |
| GET | `/api/features/{id}` | Get feature by ID |
| POST | `/api/features` | Create feature |
| PUT | `/api/features/{id}` | Update feature |
| DELETE | `/api/features/{id}` | Delete feature |
| GET | `/api/unittypes` | List all unit types |
| GET | `/api/unittypes/{id}` | Get unit type by ID |
| POST | `/api/unittypes` | Create unit type |
| PUT | `/api/unittypes/{id}` | Update unit type |
| DELETE | `/api/unittypes/{id}` | Delete unit type |

## Connection String

The default connection string in `appsettings.json` connects to SQL Server on `localhost` using Windows Authentication:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=realestatewebcompanion;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

For SQL Server Authentication, update the connection string to:

```
Server=localhost;Database=realestatewebcompanion;User Id=<username>;Password=<password>;TrustServerCertificate=True;
```
