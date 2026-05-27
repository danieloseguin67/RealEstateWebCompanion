# Epom Platform Reference

## Overview

Epom is a hosted ad server and white-label DSP founded in 2010, serving 350+ clients across 40+ countries. It manages direct ad deals and programmatic inventory across web, mobile, in-app, and CTV channels. Primary differentiator: API, RTB module, white-labeling, and support are included on all plans (competitors charge extra for these).

## Capabilities & automation surface

| Module | What it does | Automation |
|--------|-------------|------------|
| **Ad Server** | Direct campaign management — advertisers, campaigns, banners, zones, targeting | API-accessible (full CRUD) |
| **DSP** | Programmatic buying — 50+ traffic sources, web/app/CTV | API-accessible (campaign management) |
| **SSP/RTB** | Sell inventory programmatically via real-time bidding | API-accessible (zone configuration) |
| **Analytics** | 40+ real-time and historical metrics, custom reports | API-accessible (report generation, export) |
| **Targeting** | Geo, device, browser, OS, channel, cookie, custom rules | API-accessible (rule CRUD) |
| **Auto-optimization** | CPA, CTR, eCPM optimization with eCPM weighting | UI-only (configure optimization goals) |
| **White-labeling** | Full brand customization — domain, logo, colors | UI-only (premium package) |
| **Referral program** | 13% revenue share for referred ad network clients | UI-only |
| **Brand safety** | Pixalate integration for fraud protection | UI-only (toggle in settings) |
| **Rich media templates** | 50+ pre-set templates for display, HTML5, native, video | UI-only (template library) |

## Pricing, limits & plan gates

### Ad Server

| Feature | Included |
|---------|----------|
| Starting price | $250/mo |
| Cost per 10M impressions | ~$224/mo (from comparison data) |
| API access | Included on all plans |
| RTB module | Free for publishers |
| White-labeling | Premium package only |
| Support | Included on all plans (<24hr reply) |
| Free trial | 14 days, 30M monthly impressions |
| Ad formats | Display, HTML5, native, video (VAST 4.3), rich media |
| Compliance | IAB, TCF 2.3 |
| Uptime SLA | 99.95% |
| Avg response time | 13ms |

### DSP

| Plan | Price | Capacity | Extras |
|------|-------|----------|--------|
| Light | $250/mo or 5% spend (whichever higher) | 5,000 QPS | 50+ SSPs, white-label, bidding autopilot, retargeting |
| Pro | $2,000/mo or 5% spend (whichever higher) | 5,000 QPS | + Custom SSP setup, bidstream data export, custom targeting |
| Enterprise | Custom | Unlimited QPS | + Priority support, custom feature development |

One-time $500 setup fee may apply. Recommended minimum ad spend: $2,000/mo for optimal results.

### Compared to competitors

| Feature | Epom | AdButler | Kevel |
|---------|------|----------|-------|
| Price per 10M impressions | ~$224/mo | ~$682/mo | Custom (enterprise) |
| API access | Included | Paid add-on | Included |
| RTB module | Free for publishers | Paid add-on | N/A (API-first) |
| White-labeling | Premium package | Not explicitly offered | N/A |
| Geo-targeting | Included | Paid add-on | Included |
| Support | All plans | Paid add-on on some tiers | Included |
| Self-serve portal | No | Yes | No (you build it) |
| MCP server | No | Yes | No |
| Email ad zones | Yes (image-only) | Yes (image-only) | Yes (image-only) |

## Integrations

- **CRM**: HubSpot, Salesforce (via API data export)
- **BI tools**: Tableau, Looker (via Analytics API export — CSV, XLS, PDF, HTML, JSON)
- **DSP connections**: 50+ SSPs on the DSP side
- **Consent management**: TCF 2.3 compliant
- **Brand safety**: Pixalate integration
- **Audience data**: Lotame (DSP only)
- **No Zapier/Make** — API-only automation
- **No webhooks** documented
- **No MCP server**

## Data model

### Campaign hierarchy

```
Network Account
  └── Advertiser (company buying ads)
        └── Campaign (ad initiative with budget, dates, pricing model)
              └── Banner (creative asset — image, HTML5, video, rich media)

Publisher (site owner selling inventory)
  └── Site (website or app)
        └── Zone (ad placement on a page — header, sidebar, in-content)
              └── Placement (specific zone instance with targeting rules)
```

### Key objects (JSON shapes)

#### Advertiser
<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 12345,
  "name": "Acme Corp",
  "contactName": "Jane Smith",
  "email": "jane@acme.com",
  "status": "active",
  "categoryId": 3,
  "shares": {
    "revenueShare": 0.7
  }
}
```

#### Campaign
<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 67890,
  "advertiserId": 12345,
  "name": "Q1 Display Campaign",
  "status": "active",
  "startDate": "2026-01-01",
  "endDate": "2026-03-31",
  "pricingModel": "CPM",
  "price": 5.00,
  "budget": 10000.00,
  "impressionsLimit": 2000000,
  "clicksLimit": 50000,
  "securitySettings": {
    "enabled": true
  }
}
```

#### Analytics Report Response
<!-- Constructed from docs — verify against live API -->
```json
{
  "data": [
    {
      "date": "2026-01-15",
      "campaignId": 67890,
      "impressions": 45230,
      "clicks": 1205,
      "conversions": 34,
      "spend": 226.15,
      "eCPM": 5.00,
      "ctr": 0.0266,
      "cvr": 0.0282
    }
  ],
  "totals": {
    "impressions": 45230,
    "clicks": 1205,
    "conversions": 34,
    "spend": 226.15
  }
}
```

## Quick-start recipes

### Recipe 1: Create an advertiser and campaign via API

**Use case**: Automate campaign setup when a new sponsor signs up.

**cURL**:
```bash
# Step 1: Create advertiser
curl -X POST "https://your-adserver.epom.com/rest-api/advertisers-update" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "hash": "HMAC_SHA256_HASH",
    "timestamp": "1716000000",
    "name": "Acme Corp",
    "contactName": "Jane Smith",
    "email": "jane@acme.com"
  }'

# Step 2: Create campaign for that advertiser
curl -X POST "https://your-adserver.epom.com/rest-api/campaign-create" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "hash": "HMAC_SHA256_HASH",
    "timestamp": "1716000000",
    "advertiserId": 12345,
    "name": "Q1 Display Campaign",
    "pricingModel": "CPM",
    "price": 5.00,
    "startDate": "2026-01-01",
    "endDate": "2026-03-31"
  }'
```

**Python**:
```python
import hashlib, hmac, time, requests

BASE = "https://your-adserver.epom.com/rest-api"
USERNAME = "your_username"
PASSWORD = "your_password"

def epom_auth():
    ts = str(int(time.time()))
    h = hmac.new(PASSWORD.encode(), ts.encode(), hashlib.sha256).hexdigest()
    return {"username": USERNAME, "hash": h, "timestamp": ts}

# Create advertiser
resp = requests.post(f"{BASE}/advertisers-update", json={
    **epom_auth(),
    "name": "Acme Corp",
    "contactName": "Jane Smith",
    "email": "jane@acme.com"
})
advertiser_id = resp.json()["id"]

# Create campaign
resp = requests.post(f"{BASE}/campaign-create", json={
    **epom_auth(),
    "advertiserId": advertiser_id,
    "name": "Q1 Display Campaign",
    "pricingModel": "CPM",
    "price": 5.00,
    "startDate": "2026-01-01",
    "endDate": "2026-03-31"
})
print(resp.json())
```

**Gotcha**: The `hash` must be recomputed for every request — timestamps older than ~5 minutes are rejected.

### Recipe 2: Pull analytics report into a dashboard

**Use case**: Export campaign metrics to Tableau, Looker, or a custom dashboard.

**cURL**:
```bash
curl "https://your-adserver.epom.com/rest-api/analytics?\
username=your_username&hash=HMAC_SHA256_HASH&timestamp=1716000000&\
dateFrom=2026-01-01&dateTo=2026-01-31&\
groupBy=campaign&\
metrics=impressions,clicks,conversions,spend,eCPM,ctr"
```

**Python**:
```python
resp = requests.get(f"{BASE}/analytics", params={
    **epom_auth(),
    "dateFrom": "2026-01-01",
    "dateTo": "2026-01-31",
    "groupBy": "campaign",
    "metrics": "impressions,clicks,conversions,spend,eCPM,ctr"
})
for row in resp.json()["data"]:
    print(f"Campaign {row['campaignId']}: {row['impressions']} impr, {row['clicks']} clicks, ${row['spend']:.2f}")
```

**Gotcha**: Analytics API returns up to 40+ metric columns. Only request the ones you need to keep response size manageable.

### Recipe 3: Serve an ad via placement API (email/web)

**Use case**: Request an ad for a newsletter or web placement.

**cURL**:
```bash
curl "https://your-adserver.epom.com/ads-api-v3?\
key=PLACEMENT_KEY&\
clientIp=203.0.113.42&\
requestUrl=https://myblog.com/article-1&\
format=json"
```

**Python**:
```python
resp = requests.get("https://your-adserver.epom.com/ads-api-v3", params={
    "key": "PLACEMENT_KEY",
    "clientIp": "203.0.113.42",
    "requestUrl": "https://myblog.com/article-1",
    "format": "json"
})
ad = resp.json()
# Insert ad["html"] or ad["imageUrl"] into your template
print(ad)
```

**Gotcha**: For email ads, use `format=json` and extract the image URL. Append a unique subscriber ID to the image URL to prevent Gmail from caching the same image across recipients.

## Integration patterns

### CRM/BI sync architecture

1. **Pull pattern**: Schedule Analytics API calls (hourly/daily) to export metrics. Filter by campaign, advertiser, geo, device, or date range.
2. **Export formats**: CSV, XLS, PDF, HTML, JSON — choose based on your BI tool's import capabilities.
3. **Field mapping**: Map Epom's `advertiserId` to your CRM's company record. Map `campaignId` to deal or opportunity.
4. **No webhooks**: Epom doesn't support push-based notifications. All integrations must poll the API.

### Batch pipeline pattern

1. **Pagination**: API responses may be paginated for large datasets. Check response for pagination metadata.
2. **Rate limits**: "High-frequency usage with generous rate thresholds" — specific limits adjustable per use case. Contact Epom support if you hit limits.
3. **Error handling**: 401 = auth error (recompute hash), 403 = permissions (check role), 200 = success.
4. **Retry strategy**: On 5xx errors, retry with exponential backoff (1s, 2s, 4s). On 401, recompute HMAC with fresh timestamp.
