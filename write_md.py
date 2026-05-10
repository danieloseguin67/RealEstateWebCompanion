content = r"""# Upgrade Architecture

## Table of Contents

1. [High-Level Architecture Overview](#1-high-level-architecture-overview)
2. [Purpose of Each Component](#2-purpose-of-each-component)
   - 2.1 [WebCompanion Angular (Admin Tool)](#21-webcompanion-angular-admin-tool)
   - 2.2 [API Service (Middle Tier)](#22-api-service-middle-tier)
   - 2.3 [SQL Server Database](#23-sql-server-database)
   - 2.4 [Montreal4Rent.com Angular (Public Site)](#24-montreal4rentcom-angular-public-site)
3. [Deployment on GoDaddy Private Server](#3-deployment-on-godaddy-private-server)
   - 3.1 [Server Structure](#31-server-structure)
   - 3.2 [Deployment Flow](#32-deployment-flow)
4. [Data Flow (End-to-End)](#4-data-flow-end-to-end)
   - 4.1 [Adding a Rental Listing (Admin Flow)](#41-adding-a-rental-listing-admin-flow)
   - 4.2 [Displaying Listings (Public Flow)](#42-displaying-listings-on-montreal4rentcom-public-flow)
5. [Why This Architecture Is Correct](#5-why-this-architecture-is-correct)
6. [Future Improvements](#6-future-improvements)
7. [Executive Summary](#7-executive-summary)
8. [Next Steps](#8-next-steps)

---

## 1. High-Level Architecture Overview

The solution uses three clearly separated layers:

```
[ WebCompanion Angular (Admin) ]
              |
              | REST API (Secure, JWT)
              |
    [ API Service (.NET / Node / Java) ]
              |
              | SQL Connection (internal only)
              |
       [ SQL Server Database ]
              |
              | Read-only endpoints
              |
[ Montreal4Rent.com Angular (Public) ]
```

---

## 2. Purpose of Each Component

### 2.1 WebCompanion Angular (Admin Tool)

**Role:** Internal administration site used by staff to manage listings.

**Responsibilities:**
- Add, edit, and delete rental listings
- Upload and manage photos
- Set availability, pricing, and descriptions
- Manage users and permissions

**Key Characteristics:**
- Angular SPA (Single-Page Application)
- Requires authentication (login required)
- Communicates exclusively through the API — never directly with SQL Server

> Note: This separation is critical for security.

---

### 2.2 API Service (Middle Tier)

**Role:** The heart of the system — all business logic lives here.

**Responsibilities:**
- Exposes REST endpoints (JSON)
- Validates security and permissions
- Handles all SQL Server interactions
- Enforces business rules

**Tech Stack Options:**

| Option | Notes |
|---|---|
| ASP.NET Core Web API | Most common with SQL Server |
| Node.js (Express) | Lightweight alternative |
| Java / Spring Boot | Enterprise option |

**Example Endpoints:**

```
POST   /api/listings          -> Create rental
PUT    /api/listings/{id}     -> Update rental
GET    /api/listings          -> List all (admin)
GET    /api/public/listings   -> List all (public, read-only)
GET    /api/listings/{id}     -> Listing details
```

**Security:**
- JWT authentication for WebCompanion
- Read-only endpoints for the public site
- HTTPS only

> Note: SQL Server is **never** exposed to the internet directly.

---

### 2.3 SQL Server Database

**Role:** Central source of truth for all application data.

**Stores:**
- Listings and photos metadata
- Availability and pricing
- Locations and boroughs
- Audit data

**Hosting Options:**

| Option | Notes |
|---|---|
| SQL Server on GoDaddy private server | Simplest setup |
| Separate SQL Server VM | Better isolation |
| Managed SQL | If provider supports it |

**Schema Tables:**
- `Listings`
- `ListingPhotos`
- `Amenities`
- `Availability`
- `Cities / Boroughs`

> Note: Only the API connects to SQL Server.

---

### 2.4 Montreal4Rent.com Angular (Public Site)

**Role:** Public-facing website for browsing rental listings.

**Responsibilities:**
- Display rental listings
- Support search, filter, and browse
- No admin access or write operations

**Key Characteristics:**
- Angular SPA
- Anonymous access (no login required)
- Calls read-only API endpoints only

> Note: Montreal4Rent.com **never writes** to the database — this prevents vandalism, scraping damage, or accidental data corruption.

---

## 3. Deployment on GoDaddy Private Server

### 3.1 Server Structure

```
GoDaddy Private Server
|
+-- IIS / Nginx / Apache
|   +-- api.montreal4rent.com
|   |    +-- API Service
|   |
|   +-- webcompanion.montreal4rent.com
|   |    +-- Angular Admin Build
|   |
|   +-- montreal4rent.com
|        +-- Angular Public Build
|
+-- SQL Server (internal, not exposed)
```

---

### 3.2 Deployment Flow

**Step 1 — Build Angular Applications**

Run on your dev machine or CI pipeline:

```sh
ng build --configuration production
```

Output (static files — HTML, JS, CSS):
```
/dist/webcompanion
/dist/montreal4rent
```

**Step 2 — Deploy API Service**

- Host under IIS (ASP.NET Core) or behind a reverse proxy (Node)
- Set environment variables:
  - `SQL_CONNECTION_STRING`
  - `JWT_SECRET`
  - `API_BASE_URL`
- Accessible at: `https://api.montreal4rent.com`

**Step 3 — Deploy WebCompanion Angular App**

- Copy compiled files to: `https://webcompanion.montreal4rent.com`
- Configure API base URL: `https://api.montreal4rent.com`

**Step 4 — Deploy Montreal4Rent Angular App**

- Copy compiled files to: `https://www.montreal4rent.com`
- Configure API base URL: `https://api.montreal4rent.com/public`

---

## 4. Data Flow (End-to-End)

### 4.1 Adding a Rental Listing (Admin Flow)

1. Admin logs into WebCompanion
2. Fills out the listing form
3. Angular sends JSON payload to the API
4. API validates the JWT token
5. API saves the data to SQL Server
6. Listing is now live

> Note: No direct database access from the UI.

---

### 4.2 Displaying Listings on Montreal4Rent.com (Public Flow)

1. Visitor opens Montreal4Rent.com
2. Angular SPA loads in the browser
3. App calls `GET /api/public/listings`
4. API reads from SQL Server and returns JSON
5. Listings are rendered in the browser

> Note: Clean, fast, and secure.

---

## 5. Why This Architecture Is Correct

| Principle | Benefit |
|---|---|
| **Security** | SQL Server never exposed; write access restricted to admin API; public site is read-only |
| **Scalability** | API can be extended; future mobile app reuses the same API; public endpoints can be cached |
| **Maintainability** | Clear separation of concerns; frontend and backend evolve independently; easy to add features |

---

## 6. Future Improvements

- [ ] CDN for image delivery
- [ ] Redis cache for public listings
- [ ] Elasticsearch for advanced search
- [ ] Admin audit trail
- [ ] Role-based access control (RBAC)
- [ ] Automated CI/CD pipeline

---

## 7. Executive Summary

> WebCompanion manages rental data through a secure API connected to SQL Server, while Montreal4Rent.com reads the same listings via read-only API endpoints hosted on a GoDaddy private server — ensuring security, scalability, and clean separation of responsibilities.

---

## 8. Next Steps

Possible follow-up documentation:
- Deployment diagram (visual)
- Sample API contract / OpenAPI spec
- Recommended folder structure
- IIS / GoDaddy configuration guide
"""

target = r"c:\local\angulardev\RealEstateWebCompanion\RealEstateWebCompanion\src\app\UpgradeArchitecture.md"

with open(target, "w", encoding="utf-8") as f:
    f.write(content)

print("Done - wrote", len(content), "bytes")
