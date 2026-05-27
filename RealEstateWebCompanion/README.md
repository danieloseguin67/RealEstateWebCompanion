# Real Estate Web Companion

Angular 19 admin application for managing apartment listings, lookup data, SEO pages, customer records, feature toggles, and support workflows for the Real Estate Web Companion platform.

This frontend is no longer a standalone local-JSON app. It now works with the ASP.NET Core REST API in `webapi/webcompanionapi`, backed by SQL Server.

## Repository Layout

This repository contains more than one application. The main pieces relevant to this app are:

```text
RealEstateWebCompanion/
  src/                     Angular frontend source
  public/web.config        IIS rewrite rules for /api proxying
webapi/webcompanionapi/
  Controllers/             REST API controllers
  Data/                    EF Core DbContext and data access
  Scripts/                 SQL setup and migration scripts
deploy/
  iis-setup.ps1            Local IIS provisioning script
  DEPLOYMENT-IIS.md        IIS deployment guide
```

## Tech Stack

- Angular 19
- TypeScript 5
- SCSS
- AG Grid
- ASP.NET Core 9 Web API
- Entity Framework Core 9
- SQL Server

## What The App Manages

- Apartments and apartment images
- Areas and unit types
- Feature toggles and apartment features
- SEO pages and sitemap-related metadata
- Customer records and app preferences
- App version information
- Support email submission through the API

## Prerequisites

Before running locally, make sure you have:

- Node.js and npm
- Angular CLI compatible with Angular 19
- .NET 9 SDK
- SQL Server available locally

## Local Development

The frontend and API run as separate applications during development.

### 1. Install frontend dependencies

```bash
cd RealEstateWebCompanion
npm install
```

### 2. Create the database

Run the SQL setup script in your local SQL Server instance:

```text
webapi/webcompanionapi/Scripts/create-database.sql
```

This creates the `realestatewebcompanion` database and seeds the base tables.

### 3. Configure the API connection string if needed

Default local settings are in:

- `webapi/webcompanionapi/appsettings.json`
- `webapi/webcompanionapi/appsettings.Development.json`

By default the API expects SQL Server on localhost using Windows authentication.

### 4. Start the API

The Angular development environment is configured to call:

```text
http://localhost:6003/api
```

So the simplest local setup is to run the API on port `6003`:

```bash
cd webapi/webcompanionapi
dotnet run --urls http://localhost:6003
```

Alternative:

- The API project launch profile uses `http://localhost:5234` by default.
- If you use that default, update `src/environments/environment.ts` to match.

Swagger is available at:

```text
http://localhost:6003/swagger
```

### 5. Start the Angular frontend

```bash
cd RealEstateWebCompanion
npm start
```

The Angular dev server runs on:

```text
http://localhost:4300/
```

## Frontend Scripts

Run these from `RealEstateWebCompanion/`:

```bash
npm start        # ng serve on port 4300
npm run build    # production build
npm run watch    # development build in watch mode
npm test         # Karma unit tests
```

## Environment Configuration

Environment files:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Current defaults:

- Development API base: `http://localhost:6003/api`
- Production API base: `/api`

In production/IIS, the frontend expects `/api/*` to be reverse proxied to the internal API site. The rewrite rules for that live in `public/web.config`.

## API Notes

The frontend talks to the REST API for data operations, including:

- `/api/apartments`
- `/api/areas`
- `/api/unittypes`
- `/api/features`
- `/api/preferences`
- `/api/customer`
- `/api/seo`
- `/api/appversion`
- `/api/support/email`

Some frontend services still contain local fallback behavior for certain resources, but the intended runtime model is API-first.

## Building For Production

```bash
cd RealEstateWebCompanion
npm run build
```

Build output is written to:

```text
dist/real-estate-web-companion/
```

## IIS Deployment

For the local IIS-based deployment model used in this repository, see:

- `deploy/DEPLOYMENT-IIS.md`
- `deploy/iis-setup.ps1`

That setup provisions:

- an Angular site
- an internal API site on `localhost:6003`
- rewrite/proxy behavior from `/api/*` to the API

## Troubleshooting

### Frontend loads but API calls fail

Check that the API is reachable:

```bash
Invoke-RestMethod http://localhost:6003/api/apartments
```

If that fails:

- confirm SQL Server is running
- confirm the database exists
- confirm the API is listening on the same port as `environment.ts`

### Swagger works on 5234 but the Angular app still fails

Your Angular app is likely still targeting port `6003`. Either:

- run the API with `--urls http://localhost:6003`, or
- change `src/environments/environment.ts`

### IIS local setup fails

Use the deployment docs and scripts under `deploy/`:

- `deploy/iis-setup.ps1`
- `deploy/fix-iis-local.ps1`
- `deploy/fix-local-appsettings.ps1`

## Related Docs

- `SETUP.md`
- `DEPLOYMENT.md`
- `webapi/README.md`
- `deploy/DEPLOYMENT-IIS.md`
