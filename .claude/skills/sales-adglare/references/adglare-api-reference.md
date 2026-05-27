<!-- Source: https://www.adglare.com/docs/api -->
<!-- Source: https://www.adglare.com/docs/api/workspaces -->
<!-- Source: https://www.adglare.com/docs/api/campaigns -->
<!-- Source: https://www.adglare.com/docs/api/zones -->
<!-- Source: https://www.adglare.com/docs/api/creatives -->
<!-- Note: Advertisers, Reports, Folders, and Audit Trails endpoint pages were JS-rendered and returned marketing content instead of API docs. Partial info only for those endpoints. -->

# AdGlare API v2 Reference

## Overview

- **Base URL**: `https://{yourname}.api.adglare.app/v2`
- **Authentication**: Bearer token — `Authorization: Bearer {token}`
- **Format**: JSON request and response bodies
- **Plan requirement**: Enterprise plan only (€649/mo)

## Status codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad request — invalid parameters |
| 401 | Unauthorized — invalid or missing token |
| 403 | Forbidden — plan doesn't include API access |
| 404 | Not found |
| 429 | Rate limited |
| 500 | Server error |

## Workspaces

Workspaces provide multi-tenant isolation for agencies managing multiple clients.

### List workspaces

```
GET /workspaces
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "My Workspace",
      "timezone": "Europe/Amsterdam",
      "currency": "EUR"
    }
  ]
}
```

### Create workspace

```
POST /workspaces
```

Request body:
```json
{
  "name": "Client ABC",
  "timezone": "America/New_York",
  "currency": "USD"
}
```

### Update workspace

```
PUT /workspaces/{id}
```

### Delete workspace

```
DELETE /workspaces/{id}
```

## Campaigns

Campaigns contain delivery settings, pricing, pacing, targeting, and flight dates.

### List campaigns

```
GET /campaigns
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Summer Promotion",
      "advertiser_id": 123,
      "delivery": {
        "type": "impressions",
        "quantity": 100000
      },
      "pricing": {
        "model": "CPM",
        "rate": 5.00
      },
      "pacing": "even",
      "start_date": "2026-06-01",
      "end_date": "2026-06-30",
      "status": "active"
    }
  ]
}
```

### Create campaign

```
POST /campaigns
```

Request body:
```json
{
  "name": "Summer Promotion",
  "advertiser_id": 123,
  "delivery": {
    "type": "impressions",
    "quantity": 100000
  },
  "pricing": {
    "model": "CPM",
    "rate": 5.00
  },
  "pacing": "even",
  "start_date": "2026-06-01",
  "end_date": "2026-06-30",
  "targeting": {
    "geo": ["US", "CA"],
    "device": ["desktop", "mobile"],
    "os": ["windows", "macos", "ios", "android"],
    "browser": ["chrome", "firefox", "safari"],
    "language": ["en"],
    "frequency": {
      "cap": 3,
      "period": "day"
    }
  }
}
```

**Delivery types**: `impressions`, `clicks`, `conversions`
**Pricing models**: `CPM`, `CPC`, `CPA`
**Pacing options**: `even`, `asap`

### Update campaign

```
PUT /campaigns/{id}
```

### Delete campaign

```
DELETE /campaigns/{id}
```

## Zones

Zones define where ads appear. Each zone has a format and format-specific data.

### List zones

```
GET /zones
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Homepage Leaderboard",
      "format": "display",
      "data": {
        "width": 728,
        "height": 90
      }
    }
  ]
}
```

### Create zone

```
POST /zones
```

**Display zone**:
```json
{
  "name": "Sidebar Banner",
  "format": "display",
  "data": {
    "width": 300,
    "height": 250
  }
}
```

**Native zone**:
```json
{
  "name": "In-Feed Native",
  "format": "native",
  "data": {
    "title_max_length": 50,
    "description_max_length": 150,
    "image_width": 600,
    "image_height": 400
  }
}
```

**VAST zone**:
```json
{
  "name": "Pre-Roll Video",
  "format": "vast",
  "data": {
    "duration_max": 30,
    "skip_after": 5
  }
}
```

**Redirect zone**:
```json
{
  "name": "Sponsored Link",
  "format": "redirect"
}
```

**Catalog zone**:
```json
{
  "name": "Product Carousel",
  "format": "catalog",
  "data": {
    "products_count": 4
  }
}
```

### Update zone

```
PUT /zones/{id}
```

### Delete zone

```
DELETE /zones/{id}
```

## Creatives

Creatives are linked to campaigns and define the actual ad content.

### List creatives

```
GET /creatives
```

### Create creative

```
POST /creatives
```

**Display creative**:
```json
{
  "name": "Summer Banner 728x90",
  "campaign_id": 1,
  "ad_type": "image",
  "image_url": "https://example.com/banner.jpg",
  "click_url": "https://example.com/landing",
  "width": 728,
  "height": 90
}
```

**Native creative**:
```json
{
  "name": "Sponsored Article",
  "campaign_id": 1,
  "ad_type": "native",
  "title": "10 Tips for Better Sleep",
  "description": "Discover science-backed methods...",
  "image_url": "https://example.com/native-image.jpg",
  "click_url": "https://example.com/article",
  "cta": "Read More"
}
```

**VAST creative**:
```json
{
  "name": "Pre-Roll 15s",
  "campaign_id": 1,
  "ad_type": "vast",
  "video_url": "https://example.com/video.mp4",
  "click_url": "https://example.com/landing",
  "duration": 15
}
```

### Update creative

```
PUT /creatives/{id}
```

### Delete creative

```
DELETE /creatives/{id}
```

## Additional endpoints

The following endpoints exist but their documentation pages were JS-rendered and could not be fetched in full:

- **Advertisers** — CRUD operations for advertiser accounts
- **Reports / Real-time** — Query reporting data (impressions, clicks, conversions, viewability, fill rates)
- **Data Shipping** — Export data
- **Anomalies** — Anomaly detection
- **Folders** — Organize campaigns and zones into folders
- **Audit Trails** — Track changes and actions

## PHP SDK

Official PHP SDK available at `github.com/adglare` (GPL-3.0 license).

```php
$client = new AdGlare\Client('YOUR_API_TOKEN', 'yourname');

// List campaigns
$campaigns = $client->campaigns()->list();

// Create a zone
$zone = $client->zones()->create([
    'name' => 'Header Banner',
    'format' => 'display',
    'data' => ['width' => 728, 'height' => 90]
]);

// Create a creative
$creative = $client->creatives()->create([
    'name' => 'Summer Banner',
    'campaign_id' => 1,
    'ad_type' => 'image',
    'image_url' => 'https://example.com/banner.jpg',
    'click_url' => 'https://example.com/landing',
    'width' => 728,
    'height' => 90
]);
```

## Gaps

- Rate limit specifics (requests per minute/hour) not documented
- Pagination pattern not documented in fetched pages
- Webhook support not documented
- Reports endpoint request/response schema not available (JS-rendered page)
- Advertisers endpoint request/response schema not available (JS-rendered page)
