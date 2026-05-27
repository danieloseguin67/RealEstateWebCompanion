<!-- Source: https://adserver.online/site/openapi (OpenAPI v2.4.0 spec) -->

# Adserver.Online API v2.4.0 Reference

## Overview

- **Base URL**: `https://api.adsrv.net/v2`
- **Authentication**: Bearer token (`Authorization: Bearer <token>`)
- **Rate limit**: 100 requests per minute per API token
- **Response format**: JSON
- **Pagination**: Page-based with `X-Pagination-*` headers
- **Plan requirement**: Premium ($199/mo) or higher

## Authentication

Create API tokens in Account > API tokens menu. Three token types:

- **Owner token**: Access to all endpoints (`/user`, `/campaign`, `/ad`, `/site`, `/zone`, `/stats`, `/payment`, `/payout`, `/transaction`, `/referral`, `/dict`)
- **Publisher token**: Access to `/publish/*` endpoints only
- **Advertiser token**: Access to `/advert/*` endpoints only

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.adsrv.net/v2/campaign
```

Owner impersonation: `?asUser={id}` on any owner endpoint.

**No CORS support** — API calls from browsers will fail. Use server-side proxying.

## Rate Limiting

Headers returned with every response:

| Header | Description |
|---|---|
| `X-Rate-Limit-Limit` | Max requests allowed in the current period |
| `X-Rate-Limit-Remaining` | Requests remaining |
| `X-Rate-Limit-Reset` | Seconds until the rate limit resets |

Back off when `X-Rate-Limit-Remaining` approaches 0.

## Pagination

Headers returned with list endpoints:

| Header | Description |
|---|---|
| `X-Pagination-Total-Count` | Total number of records |
| `X-Pagination-Page-Count` | Total number of pages |
| `X-Pagination-Current-Page` | Current page number |
| `X-Pagination-Per-Page` | Records per page |

Request a specific page: `?page=2`

## Error Responses

- **400 Bad Request**: Input validation error

```json
{
  "field": "name",
  "message": "Name cannot be blank"
}
```

- **401 Unauthorized**: Missing or invalid Bearer token
- **404 Not Found**: Resource does not exist

## Owner Endpoints

### Users

| Method | Path | Description |
|---|---|---|
| GET | `/user` | List users (paginated) |
| POST | `/user` | Create user |
| GET | `/user/{id}` | Get user (supports `with_balances` param) |
| PUT | `/user/{id}` | Update user |
| DELETE | `/user/{id}` | Delete user |

### Campaigns

| Method | Path | Description |
|---|---|---|
| GET | `/campaign` | List campaigns (supports `with_pub` param) |
| POST | `/campaign` | Create campaign |
| GET | `/campaign/{id}` | Get campaign |
| PUT | `/campaign/{id}` | Update campaign |
| DELETE | `/campaign/{id}` | Delete campaign |

**Create campaign request:**

```json
{
  "name": "Summer Sale",
  "idadvertiser": 456,
  "idpricemodel": 1,
  "rate": 2.50,
  "budget_total": 5000,
  "budget_daily": 100,
  "start_date": "2026-06-01",
  "finish_date": "2026-08-31",
  "th_mode": 1,
  "fc_counter": 5,
  "fc_mode": 1,
  "fc_limit": 3600,
  "geo": [6252001],
  "os": ["windows", "macos"],
  "tier": 20
}
```

**Price model IDs**: 1=CPM, 2=CPC, 3=CPA, 4=CPUC, 5=CPUM, 6=CPV

**Throttling modes (th_mode)**: 1-5 (spend evenly through unlimited)

**Tier levels**: 10, 14, 16, 18, 20, 30

**Targeting fields**: `os`, `browser`, `device`, `brand` (arrays), `language` (array), `geo`/`geo_bl` (GeoNames IDs include/exclude), `sites`, `zones`, `domains`, `refids` (specific targeting)

**Time targeting (`timetargeting`)**: 2D array — days 1-7, hours 0-23. Set cell to 0 to disable.

**Rate geo adjustments (`rate_geo`)**: Per-country rate overrides.

### Ads

| Method | Path | Description |
|---|---|---|
| GET | `/ad` | List ads (requires `idcampaign`) |
| POST | `/ad` | Create ad (requires `idformat` query param) |
| GET | `/ad/{id}` | Get ad (supports `with_preview`) |
| PUT | `/ad/{id}` | Update ad |
| DELETE | `/ad/{id}` | Delete ad |
| POST | `/ad/assign` | Assign ad to zones |

**Ad format types and `details` field:**

| Format | Key fields |
|---|---|
| `AdBannerImage` | `idsize`, `file` (base64) |
| `AdBannerHtml` | `idsize`, `content_html` |
| `AdBannerZip` | `idsize`, `file` (base64 ZIP) |
| `AdBannerNative` | `idsize`, `headline`, `body`, `button`, `label`, files |
| `AdBannerVideo` | `idsize`, `source_type` (file/vast), `vast_url` |
| `AdVastLinear` | `file` (base64), `skipoffset`, skip settings |
| `AdLink` | `counter_type` (1=impressions, 2=clicks) |
| `AdPopup` | `counter_type` |
| `AdPush` | `headline`, icon (base64) |

**Create image banner ad:**

```bash
curl -X POST "https://api.adsrv.net/v2/ad?idformat=AdBannerImage" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "idcampaign": 123,
    "name": "Banner 728x90",
    "url": "https://example.com/landing",
    "details": {
      "idsize": "728x90",
      "file": "BASE64_ENCODED_IMAGE_DATA"
    }
  }'
```

### Sites

| Method | Path | Description |
|---|---|---|
| GET | `/site` | List sites (supports `with_zones`) |
| POST | `/site` | Create site |
| GET | `/site/{id}` | Get site |
| PUT | `/site/{id}` | Update site |
| DELETE | `/site/{id}` | Delete site |

### Zones

| Method | Path | Description |
|---|---|---|
| GET | `/zone` | List zones (requires `idsite`) |
| POST | `/zone` | Create zone (requires `idsite`, `idformat` query params) |
| GET | `/zone/{id}` | Get zone |
| PUT | `/zone/{id}` | Update zone |
| DELETE | `/zone/{id}` | Delete zone |
| POST | `/zone/assign` | Assign zone to ads |

**Zone request fields**: `name`, `idstatus`, `idsize`, `idauctiontype` (0-3), `idrevenuemodel` (1-4), `revenue_rate`, floor rates

### Statistics

| Method | Path | Description |
|---|---|---|
| GET | `/stats` | Statistics (requires `dateBegin`, `dateEnd`, `group`) |
| GET | `/events` | Video events (requires `report` type) |
| GET | `/conversion` | Conversions (paginated) |
| GET | `/statement` | Statements (paginated) |

**Group options**: day, month, year, hour, dof, dom, advertiser, campaign, price_model, campaign_category, campaign_group, ad, format, size, publisher, site, site_category, zone, zone_format, zone_size, country, country_code, postal_code, os, browser, device, brand, language, domain, domain1, referrer, ref, refid1

**Filters**: `idadvertiser`, `idcampaign`, `idgroup`, `idad[]`, `idpublisher`, `idsite`, `idzone[]`, `idcountry`, `iddevice[]`, `idos[]`, `idbrowser[]`, `idadsize[]`, `idadformat[]`, `idzoneformat[]`, `idcampaigncategory[]`, `idsitecategory[]`, `language[]`, `refid`, `with_trafq`, `with_pub_metrics`

**Example: Daily stats by campaign:**

```bash
curl -G https://api.adsrv.net/v2/stats \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --data-urlencode "dateBegin=2026-05-01" \
  --data-urlencode "dateEnd=2026-05-25" \
  --data-urlencode "group=campaign"
```

### Payments & Payouts

| Method | Path | Description |
|---|---|---|
| GET | `/payment` | List payments |
| POST | `/payment` | Create payment |
| GET | `/payout` | List payouts |
| POST | `/payout` | Create payout (supports `check_amount`) |
| GET | `/transaction` | List transactions |
| POST | `/transaction` | Create transaction |
| GET | `/transaction/{id}` | Get transaction |
| GET | `/referral` | List referrals |

### Dictionary

| Method | Path | Description |
|---|---|---|
| GET | `/dict` | Data dictionaries (ad/zone formats, price models, sizes, categories, etc.) |

## Publisher Endpoints (`/publish/*`)

| Method | Path | Description |
|---|---|---|
| GET | `/publish/site` | List publisher's sites |
| POST | `/publish/site` | Create site |
| GET | `/publish/site/{id}` | Get site |
| PUT | `/publish/site/{id}` | Update site |
| DELETE | `/publish/site/{id}` | Delete site |
| GET | `/publish/verify/{id}` | Get site verification methods |
| PUT | `/publish/verify/{id}` | Check verification |
| GET | `/publish/zone` | List zones |
| POST | `/publish/zone` | Create zone |
| GET | `/publish/zone/{id}` | Get zone |
| PUT | `/publish/zone/{id}` | Update zone |
| DELETE | `/publish/zone/{id}` | Delete zone |
| GET | `/publish/transaction` | List transactions |
| GET | `/publish/payout` | List payouts |
| POST | `/publish/payout` | Create payout |
| GET | `/publish/stats` | Publisher statistics |
| GET | `/publish/dict` | Publisher dictionaries |

## Advertiser Endpoints (`/advert/*`)

| Method | Path | Description |
|---|---|---|
| GET | `/advert/campaign` | List campaigns |
| POST | `/advert/campaign` | Create campaign |
| GET | `/advert/campaign/{id}` | Get campaign |
| PUT | `/advert/campaign/{id}` | Update campaign |
| DELETE | `/advert/campaign/{id}` | Delete campaign |
| GET | `/advert/ad` | List ads |
| POST | `/advert/ad` | Create ad |
| GET | `/advert/ad/{id}` | Get ad |
| PUT | `/advert/ad/{id}` | Update ad |
| DELETE | `/advert/ad/{id}` | Delete ad |
| GET | `/advert/stats` | Advertiser statistics |
| GET | `/advert/dict` | Advertiser dictionaries |

## Version History

| Version | Date | Changes |
|---|---|---|
| 2.4.0 | 2025-08-01 | Added `GET /publish/zone`, `/publish/payout`, `/publish/transaction` |
| 2.3.2 | 2024-08-06 | AdDirectLink renamed to AdLink; counter type as integer |
| 2.3.0 | 2024-04-19 | Renamed `iddimension` to `idsize`; `dimensions` to `sizes` |
| 2.2.7 | 2023-12-07 | Added `/publish/site` and `/advert/campaign` methods |
