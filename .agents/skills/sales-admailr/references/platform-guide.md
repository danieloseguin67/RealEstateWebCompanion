# Admailr Platform Reference

## Overview

Admailr is a programmatic email ad server that inserts display and native advertisements into newsletter emails. Founded in 2013, it serves as a DFP (DoubleClick for Publishers) equivalent for email channels. No subscriber minimum — works with newsletters of any size. Best for small-to-mid publishers wanting automated monetization.

**Website**: https://www.admailr.com
**API docs**: https://api.admailr.com/docs/

## Capabilities & automation surface

| Capability | Available | Access method |
|---|---|---|
| Automated ad insertion | Yes | HTML snippet in ESP template |
| Campaign management | Yes | API + UI |
| Banner upload/management | Yes | API + UI (multipart upload) |
| Campaign lifecycle (start/run/pause/cancel) | Yes | API |
| Performance tracking (CPM + CPC) | Yes | UI |
| Audience category targeting | Yes | API (categories endpoint) |
| Device targeting | Yes | API (devices endpoint) |
| Direct-sold ad management | Yes | UI |
| Backfilling | Yes | UI |
| Webhooks | No | — |
| Zapier / Make | No | — |
| MCP server | No | — |

## Pricing, limits & plan gates

- **Revenue model**: CPM + CPC hybrid — publishers earn from both impressions and clicks
- **Publisher commission**: Admailr takes a cut (exact % not publicly disclosed). Publishers receive the remainder.
- **Minimum payout**: $100 threshold before payment is issued
- **Payment schedule**: Monthly on the 20th
- **Payment methods**: PayPal, ACH, check (PIN required for check payments; not required for PayPal/ACH)
- **No subscriber minimum**: Any newsletter size can join
- **No setup fees**: Free to start
- **API access**: Available to all publishers (no plan gate mentioned)

## Integrations

**ESP integrations** (ad tag insertion):
- ActiveCampaign (documented integration — partner app)
- Mailchimp
- Constant Contact
- AWeber

**Integration method**: Insert an HTML snippet (ad tag) into your ESP email template. The snippet loads a dynamic ad image at send time. No JavaScript required — pure HTML/image based for email client compatibility.

## Data model

### Campaign object
<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 1234,
  "name": "Q3 Tech Newsletter Campaign",
  "status": "running",
  "category": "technology",
  "device": "all",
  "created_at": "2026-05-01T12:00:00Z",
  "updated_at": "2026-05-13T08:30:00Z"
}
```

### Banner object
<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 5678,
  "campaign_id": 1234,
  "size": "300x250",
  "file_url": "https://cdn.admailr.com/banners/5678.png",
  "alt_text": "Try DevTool Pro free",
  "click_url": "https://devtool.pro/signup",
  "status": "active",
  "created_at": "2026-05-02T10:00:00Z"
}
```

### Pagination envelope
```json
{
  "data": [...],
  "links": {
    "first": "https://api.admailr.com/api/campaigns?page=1",
    "last": "https://api.admailr.com/api/campaigns?page=5",
    "prev": null,
    "next": "https://api.admailr.com/api/campaigns?page=2"
  },
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 72
  }
}
```

## Quick-start recipes

### Recipe 1: List campaigns and check status (cURL + Python)

**Use case**: Monitor all your active campaigns programmatically.

```bash
# cURL — list all campaigns
curl -X GET "https://api.admailr.com/api/campaigns" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

```python
import requests

API_KEY = "your-api-key"
BASE = "https://api.admailr.com"

resp = requests.get(
    f"{BASE}/api/campaigns",
    headers={
        "ADMAILR-ADS-API-KEY": API_KEY,
        "Accept": "application/json",
    },
)
campaigns = resp.json()["data"]
for c in campaigns:
    print(f"{c['id']}: {c['name']} — {c['status']}")
```

**Gotcha**: Pagination defaults to 15 per page. Use `?page=2` to get subsequent pages.

### Recipe 2: Create a campaign and upload a banner

**Use case**: Programmatically set up a new ad campaign with creative.

```bash
# Step 1: Create campaign
curl -X POST "https://api.admailr.com/api/campaigns" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name": "Summer Promo", "category": "technology"}'

# Step 2: Upload banner (multipart)
curl -X POST "https://api.admailr.com/api/campaigns/1234/banners" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json" \
  -F "file=@banner-300x250.png" \
  -F "alt_text=Summer sale — 50% off" \
  -F "click_url=https://example.com/summer"
```

```python
import requests

API_KEY = "your-api-key"
BASE = "https://api.admailr.com"
HEADERS = {"ADMAILR-ADS-API-KEY": API_KEY, "Accept": "application/json"}

# Create campaign
campaign = requests.post(
    f"{BASE}/api/campaigns",
    headers={**HEADERS, "Content-Type": "application/json"},
    json={"name": "Summer Promo", "category": "technology"},
).json()

campaign_id = campaign["data"]["id"]

# Upload banner
with open("banner-300x250.png", "rb") as f:
    requests.post(
        f"{BASE}/api/campaigns/{campaign_id}/banners",
        headers=HEADERS,
        files={"file": f},
        data={"alt_text": "Summer sale", "click_url": "https://example.com/summer"},
    )
```

**Gotcha**: Banner upload requires `multipart/form-data` — don't set `Content-Type: application/json` for this endpoint.

### Recipe 3: Pause and resume a campaign

```bash
# Pause
curl -X PATCH "https://api.admailr.com/api/campaigns/1234/pause" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"

# Resume
curl -X PATCH "https://api.admailr.com/api/campaigns/1234/run" \
  -H "ADMAILR-ADS-API-KEY: your-api-key" \
  -H "Accept: application/json"
```

## Integration patterns

### ESP ad tag insertion

1. Get your ad tag code from the Admailr publisher dashboard
2. In your ESP template editor, paste the HTML snippet where you want the ad to appear
3. The snippet contains an `<img>` tag pointing to Admailr's ad server — the image is dynamically generated per recipient
4. No JavaScript needed — works in all email clients that render images

**ActiveCampaign**: Admailr has a native partner app. Install from the ActiveCampaign App Marketplace, then drag the Admailr block into your email template.

**Mailchimp/Constant Contact/AWeber**: Paste the ad tag HTML into a "Code" or "HTML" content block in your template editor.

### Backfill strategy

When Admailr has no matching ad for a send, the ad zone shows blank space. Mitigate with:

1. **House ads**: Configure your own promotional banner as a fallback
2. **Multi-network stacking**: Use Admailr as primary, Paved Ad Network as secondary fill
3. **Affiliate links**: Insert a static affiliate banner when no programmatic ad fills

## Comparison with alternatives

| Feature | Admailr | Paved | Jeeng | LiveIntent | BuySellAds |
|---|---|---|---|---|---|
| **Type** | Ad server | Marketplace + Ad Network | AI ad server | Programmatic | Managed marketplace |
| **Min subscribers** | None | 50K (network) | None | None stated | None |
| **Revenue model** | CPM + CPC | 30-40% commission | 15-30% take | Undisclosed | 25% take |
| **API** | Yes (~15 endpoints) | No | No | Yes | Yes (read-only) |
| **Automation** | API only | None | None | Programmatic | Zapier triggers |
| **Best for** | Small-mid automated | Direct + programmatic | AI personalization | Enterprise | Dev/design niches |
| **Payment min** | $100 | Not stated | Not stated | Not stated | Not stated |
