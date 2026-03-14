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

## Running with Docker

This repo includes a Dockerfile for the API and a `docker-compose.yml` that runs:

- `api` (ASP.NET Core)
- `db` (SQL Server 2022)

### Prerequisites

- Docker Desktop (Windows)

### 1) Set the SQL Server password

Create `webapi/.env` (you can copy from `webapi/.env.example`) and set `SA_PASSWORD`.

### 2) Start the stack

From the repo root:

```bash
cd webapi
docker compose --env-file .env up --build
```

Optional (recommended on first run): initialize the database automatically via the one-shot `db-init` service:

```bash
cd webapi
docker compose --profile init --env-file .env up --build
```

API will be available at:

- `http://localhost:8081`
- Swagger UI (Development): `http://localhost:8081/swagger`

### 3) Initialize the database schema/data

The API expects the schema from:

```
webapi/webcompanionapi/Scripts/create-database.sql
```

Run it against the SQL Server container using your preferred SQL client.

If you used the `--profile init` command above, this step is already done.

Notes:

- The compose file exposes SQL Server on `localhost:14330`.
- Login is `sa` and the password is your `SA_PASSWORD`.

### HTTPS redirection in containers

By default, HTTPS redirection is disabled when running inside a container (to support HTTP-only local Docker runs). You can re-enable it by setting `EnableHttpsRedirection=true` (e.g., via environment variable).

## Swagger/OpenAPI Documentation

Interactive API documentation is available via Swagger UI when running in Development mode:

**Swagger UI:** [http://localhost:5234/swagger](http://localhost:5234/swagger)

This provides a complete reference of all endpoints with request/response schemas and allows you to test API calls directly from the browser.

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
| GET | `/api/areas` | List all areas |
| GET | `/api/areas/{id}` | Get area by ID |
| POST | `/api/areas` | Create area |
| PUT | `/api/areas/{id}` | Update area |
| DELETE | `/api/areas/{id}` | Delete area |
| GET | `/api/apartmentfeatures` | List all apartment features |
| GET | `/api/apartmentfeatures/apartment/{apartmentId}` | Get all features for an apartment |
| GET | `/api/apartmentfeatures/{id}` | Get apartment feature by ID |
| POST | `/api/apartmentfeatures` | Create apartment feature |
| PUT | `/api/apartmentfeatures/{id}` | Update apartment feature |
| DELETE | `/api/apartmentfeatures/{id}` | Delete apartment feature |

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
