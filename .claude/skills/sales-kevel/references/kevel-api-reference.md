<!-- Source: https://dev.kevel.com/reference/getting-started-with-kevel, https://dev.kevel.com/docs/understanding-kevel, https://dev.kevel.com/docs/management-api-tutorial, https://dev.kevel.com/docs/email-ads-overview -->

# Kevel API Reference

## Authentication

- **Method**: API key in HTTP header
- **Header**: `X-Kevel-ApiKey: YOUR_API_KEY` (or `X-Adzerk-ApiKey` — interchangeable)
- All requests MUST use TLS (HTTPS)
- Failed auth returns HTTP 401
- Treat the API key like a password — never expose client-side

```bash
# Auth quick-start — list advertisers
curl https://api.kevel.co/v1/advertiser \
  -H "X-Kevel-ApiKey: YOUR_API_KEY"
```

## Base URLs

| API | Base URL |
|---|---|
| Management APIs (Campaign, Inventory, Reporting) | `https://api.kevel.co/v1/` |
| Decision API | `https://e-{networkId}.adzerk.net/api/v2` |
| UserDB API | `https://e-{networkId}.adzerk.net/udb/{networkId}/` |

## Core APIs

### Decision API

Request an ad decision for a placement.

**POST** `https://e-{networkId}.adzerk.net/api/v2`

```json
{
  "placements": [
    {
      "divName": "div1",
      "networkId": 12345,
      "siteId": 67890,
      "adTypes": [16]
    }
  ],
  "user": {"key": "user123"},
  "keywords": ["saas", "devtools"]
}
```

**Required placement fields**: `divName` (string), `networkId` (integer), `siteId` (integer), `adTypes` (integer array)

**Optional fields**: `zoneIds`, `eventIds`, `properties`, `campaignId`, `flightId`

**Response:**
```json
{
  "decisions": {
    "div1": [
      {
        "adId": 111,
        "creativeId": 222,
        "flightId": 333,
        "campaignId": 444,
        "clickUrl": "https://e-12345.adzerk.net/r?...",
        "impressionUrl": "https://e-12345.adzerk.net/i.gif?...",
        "contents": [
          {
            "type": "raw",
            "data": {
              "imageUrl": "https://static.adzerk.net/...",
              "title": "Try Acme Free",
              "width": 300,
              "height": 250
            },
            "customData": {}
          }
        ],
        "events": []
      }
    ]
  },
  "user": {"key": "user123"}
}
```
<!-- Constructed from docs — verify against live API -->

### Campaign Management API

**Advertisers:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/advertiser` | Create advertiser |
| GET | `/v1/advertiser` | List advertisers |
| GET | `/v1/advertiser/{id}` | Get advertiser |
| PUT | `/v1/advertiser/{id}` | Update advertiser |

**Campaigns:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/campaign` | Create campaign |
| GET | `/v1/campaign` | List campaigns |
| GET | `/v1/campaign/{id}` | Get campaign |
| PUT | `/v1/campaign/{id}` | Update campaign |

**Flights:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/flight` | Create flight |
| GET | `/v1/flight` | List flights |
| GET | `/v1/flight/{id}` | Get flight |
| PUT | `/v1/flight/{id}` | Update flight |

**Creatives:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/creative` | Create creative |
| GET | `/v1/creative/{id}` | Get creative |
| PUT | `/v1/creative/{id}` | Update creative |
| POST | `/v1/creative/{id}/upload` | Upload creative image |

**Ads (Creative-Flight Map):**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/flight/{flightId}/creative` | Create ad (link creative to flight) |
| GET | `/v1/flight/{flightId}/creative` | List ads in flight |
| PUT | `/v1/flight/{flightId}/creative/{adId}` | Update ad |

### Inventory Management API

**Sites:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/site` | Create site |
| GET | `/v1/site` | List sites |
| GET | `/v1/site/{id}` | Get site |

**Zones:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/zone` | Create zone |
| GET | `/v1/zone` | List zones |

**Channels:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/channel` | Create channel |
| GET | `/v1/channel` | List channels |

**Priorities:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/priority` | Create priority |
| GET | `/v1/priority` | List priorities |

**Ad Types:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/adtype` | Create ad type |
| GET | `/v1/adtype` | List ad types |

### Reporting API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/report/queue` | Queue a report |
| GET | `/v1/report/queue/{id}` | Get report status/results |

### UserDB API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/udb/{networkId}/read` | Read user profile |
| POST | `/udb/{networkId}/custom` | Set custom properties |
| POST | `/udb/{networkId}/interest` | Add user interest |
| POST | `/udb/{networkId}/optout` | Opt out user |
| POST | `/udb/{networkId}/retarget` | Add retargeting segment |
| POST | `/udb/{networkId}/consent` | Set GDPR consent |

### Forecast API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/forecast` | Generate forecast report |
| GET | `/v1/forecast/{id}` | Get forecast results |

## Request format

- **Content-Type**: `application/json` for POST/PUT
- Use `--data-binary` in cURL for JSON payloads
- When updating objects, pass the **entire object** — partial PUTs overwrite omitted fields with defaults

## Error responses

- **401**: Invalid or missing API key
- **400**: Malformed request body
- **404**: Object not found

## Pagination

Not documented publicly. List endpoints return `items` arrays. For large datasets, use the Reporting API for bulk data access.

## Rate limits

Not documented publicly. Likely negotiated per contract. The platform handles 3B+ daily API requests globally.

## SDKs

| Language | Repository |
|---|---|
| JavaScript (Decision) | github.com/adzerk/adzerk-decision-sdk-js |
| JavaScript (Management) | github.com/adzerk/adzerk-management-sdk-js |
| Ruby (Management) | github.com/adzerk/adzerk-management-sdk-ruby |
| OpenAPI Spec | github.com/adzerk/adzerk-api-specification |

## Gaps

- Rate limit details not publicly documented
- Pagination mechanism for list endpoints not documented
- Webhook payload schemas for Kevel Audience not publicly available
- Full Reporting API query parameters not captured
