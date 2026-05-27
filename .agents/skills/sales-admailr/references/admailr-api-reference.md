<!-- Source: https://api.admailr.com/docs/ -->

# Admailr API Reference

## Base URL

```
https://api.admailr.com
```

## Authentication

All endpoints require API key authentication via one of three methods:

1. **Custom Header (recommended)**:
   ```
   ADMAILR-ADS-API-KEY: your-api-key-here
   ```

2. **Bearer Token**:
   ```
   Authorization: Bearer your-api-key-here
   ```

3. **Query Parameter**:
   ```
   ?admailr-ads-api-key=your-api-key-here
   ```

### Auth quick-start

```bash
# Simplest GET — list your campaigns
curl -X GET "https://api.admailr.com/api/campaigns" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

## Endpoints

### Campaigns

| Method | Path | Description |
|---|---|---|
| GET | `/api/campaigns` | List user's campaigns (paginated) |
| POST | `/api/campaigns` | Create new campaign |
| GET | `/api/campaigns/{id}` | Show campaign details |
| PUT/PATCH | `/api/campaigns/{id}` | Update campaign |

### Campaign Lifecycle

| Method | Path | Description |
|---|---|---|
| PATCH | `/api/campaigns/{campaign_id}/start` | Initialize new campaign |
| PATCH | `/api/campaigns/{campaign_id}/run` | Queue paused campaign for delivery |
| PATCH | `/api/campaigns/{campaign_id}/pause` | Pause active campaign |
| PATCH | `/api/campaigns/{campaign_id}/cancel` | Cancel campaign |

### Banners

| Method | Path | Description |
|---|---|---|
| GET | `/api/campaigns/banner-sizes` | Available creative dimensions |
| GET | `/api/campaigns/{campaign_id}/banners` | List campaign banners (paginated) |
| POST | `/api/campaigns/{campaign_id}/banners` | Upload new banner (multipart/form-data) |
| GET | `/api/campaigns/{campaign_id}/banners/{id}` | Show banner details |
| PUT/PATCH | `/api/campaigns/{campaign_id}/banners/{id}` | Update banner |
| DELETE | `/api/campaigns/{campaign_id}/banners/{id}` | Delete banner |

### Configuration

| Method | Path | Description |
|---|---|---|
| GET | `/api/campaigns/categories` | Available audience categories |
| GET | `/api/campaigns/devices` | Supported device types |

## Request/Response Examples

### List campaigns

```bash
curl -X GET "https://api.admailr.com/api/campaigns?page=1" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

<!-- Constructed from docs — verify against live API -->
```json
{
  "data": [
    {
      "id": 1234,
      "name": "Q3 Tech Newsletter",
      "status": "running",
      "created_at": "2026-05-01T12:00:00Z"
    }
  ],
  "links": {
    "first": "https://api.admailr.com/api/campaigns?page=1",
    "last": "https://api.admailr.com/api/campaigns?page=3",
    "prev": null,
    "next": "https://api.admailr.com/api/campaigns?page=2"
  },
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 42
  }
}
```

### Create campaign

```bash
curl -X POST "https://api.admailr.com/api/campaigns" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Summer Promo",
    "category": "technology"
  }'
```

<!-- Constructed from docs — verify against live API -->
```json
{
  "data": {
    "id": 1235,
    "name": "Summer Promo",
    "status": "draft",
    "category": "technology",
    "created_at": "2026-05-13T10:00:00Z"
  },
  "success": true,
  "message": "Campaign created successfully"
}
```

### Upload banner (multipart)

```bash
curl -X POST "https://api.admailr.com/api/campaigns/1235/banners" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json" \
  -F "file=@banner-300x250.png" \
  -F "alt_text=Try our product free" \
  -F "click_url=https://example.com/signup"
```

<!-- Constructed from docs — verify against live API -->
```json
{
  "data": {
    "id": 5678,
    "campaign_id": 1235,
    "size": "300x250",
    "file_url": "https://cdn.admailr.com/banners/5678.png",
    "alt_text": "Try our product free",
    "click_url": "https://example.com/signup",
    "status": "pending_review",
    "created_at": "2026-05-13T10:05:00Z"
  },
  "success": true
}
```

### Delete banner

```bash
curl -X DELETE "https://api.admailr.com/api/campaigns/1235/banners/5678" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

### Pause / Resume campaign

```bash
# Pause
curl -X PATCH "https://api.admailr.com/api/campaigns/1235/pause" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"

# Resume
curl -X PATCH "https://api.admailr.com/api/campaigns/1235/run" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

## Pagination

All list endpoints use page-based pagination:

- **Default**: 15 items per page
- **Params**: `?page=1&per_page=25`
- **Response includes**: `links` (first, last, prev, next) and `meta` (current_page, per_page, total)

```python
# Paginate through all campaigns
import requests

API_KEY = "your-api-key"
page = 1
all_campaigns = []

while True:
    resp = requests.get(
        f"https://api.admailr.com/api/campaigns?page={page}",
        headers={"ADMAILR-ADS-API-KEY": API_KEY, "Accept": "application/json"},
    )
    data = resp.json()
    all_campaigns.extend(data["data"])
    if data["links"]["next"] is None:
        break
    page += 1
```

## Rate Limits

Rate limit details are not documented in the public API docs. If you encounter `429 Too Many Requests`, implement exponential backoff:

```python
import time
import requests

def api_get(url, headers, max_retries=3):
    for attempt in range(max_retries):
        resp = requests.get(url, headers=headers)
        if resp.status_code == 429:
            wait = 2 ** attempt
            time.sleep(wait)
            continue
        return resp
    raise Exception("Rate limited after retries")
```

## Gaps

- Webhook support: Not available. No event notifications for campaign status changes, banner approvals, or payment events.
- Reporting API: No endpoints for revenue/earnings data — analytics are UI-only.
- Publisher-side endpoints: The documented API appears advertiser/campaign-focused. Publisher ad tag management is UI-only.
- Rate limits: Not publicly documented.
- Error response shape: Not documented in detail — standard HTTP status codes assumed.
