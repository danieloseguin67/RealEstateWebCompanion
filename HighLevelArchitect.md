# High-Level Architecture Diagram

```mermaid
graph TB
    subgraph "Admin Layer"
        WC["🖥️ RealEstateWebCompanion\n──────────────────────\nAngular (standalone)\nAdmin Dashboard\nlistings / areas / SEO / images\nseguin.dev"]
    end

    subgraph "Public Layer"
        M4R["🌐 Montreal4Rent\n──────────────────────\nAngular (NgModule)\nPublic Rental Website\nBilingual FR/EN\nmontreal4rent.ca\n\n⚡ TODAY: static JSON\n🔜 SOON: REST API calls"]
    end

    subgraph "API Layer"
        API["⚙️ WebCompanion API\n──────────────────────\nASP.NET Core Web API\nPort :5234 / /api\n\nApartments · Areas\nUnit Types · Features\nSEO · Preferences\nImages · Customers"]
    end

    subgraph "Data Layer"
        SQL[("🗄️ SQL Server\n──────────────────────\nrealestatewebcompanion\n\nApartments · Areas\nUnitTypes · Features\nSEO · Customers\nPreferences")]
        FS["📁 File System\n──────────────────────\nIIS Static Files\nC:\\inetpub\\montreal4rent\n\\assets\\images\\"]
    end

    subgraph "Services"
        PHP["📧 PHP Mail Script\nContact Form Emails"]
        JSON["📄 Static JSON\nassets/data/*.json\napartments · areas\nunit-types · features"]
    end

    WC -->|"HTTPS REST /api\n(CRUD + image uploads)"| API
    API -->|"Entity Framework Core\nSQL Auth (prod)\nWindows Auth (dev)"| SQL
    API -->|"Writes image files\nphysical path"| FS

    M4R -.->|"TODAY\nreads static files"| JSON
    M4R -.->|"SOON\nHTTPS REST /api"| API
    M4R -->|"Contact form"| PHP
    M4R -->|"Reads images"| FS

    style WC fill:#1565C0,color:#fff
    style M4R fill:#2E7D32,color:#fff
    style API fill:#6A1B9A,color:#fff
    style SQL fill:#37474F,color:#fff
    style FS fill:#4E342E,color:#fff
    style PHP fill:#BF360C,color:#fff
    style JSON fill:#F57F17,color:#fff
```

## Key Architectural Notes

- **WebCompanion → WebAPI**: Full CRUD admin flow. All data mutations go through the REST API, which persists to SQL Server. Images are uploaded via multipart POST and written directly to the IIS static folder.

- **The image bridge**: The API writes physical image files into `C:\inetpub\montreal4rent\assets\images\` — so uploaded images appear on the public site immediately without a redeploy.

- **Montreal4Rent today**: Decoupled from live data. It reads exported static JSON files — changes made via the admin don't appear until the JSON is regenerated and redeployed.

- **Montreal4Rent soon**: Once wired to the API, it will get live data directly — eliminating the static JSON pipeline and making listing changes appear instantly on the public site.
