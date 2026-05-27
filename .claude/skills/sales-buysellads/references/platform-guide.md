# BuySellAds Platform Reference

## Overview

BuySellAds is a contextual advertising marketplace connecting advertisers with 200+ publishers across websites, newsletters, and podcasts. Unlike programmatic ad networks, BSA emphasizes human-curated placements with dedicated account management. Includes sub-networks Carbon Ads (developers/designers) and Coin.Network (crypto).

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Ad Marketplace** | Advertisers browse and purchase placements across publisher network | UI-only (managed by BSA team) |
| **Ad Serving API** | Serve ads in websites and newsletters via JSON endpoint | **API-accessible** |
| **Monetization Framework** | JS snippets for website ad integration | **JS API** (client-side) |
| **Advertiser API** | Pull campaign stats (line items, daily stats, creatives) | **API-accessible** (read-only) |
| **Carbon Ads** | Developer/designer/creator-focused ad sub-network | UI-only (publisher applies) |
| **Coin.Network** | Crypto-focused ad sub-network | UI-only |
| **Optimize** | Programmatic publisher solution (header bidding, 25+ demand sources) | UI-only |
| **Zapier** | Triggers for deal events and spot sales | **Zapier triggers** |
| **Publisher Dashboard** | Revenue tracking, performance reports, ad approval | UI-only |
| **Advertiser Dashboard** | Campaign management, creative upload, reporting | UI-only |

## Pricing, limits & plan gates

**Publisher commission:**
- Managed sales: BSA takes **25%**, publisher keeps **75%**
- Self-serve shopping cart: BSA takes **15%**, publisher keeps **85%**
- No upfront cost to join as publisher

**Advertiser pricing:**
- Not publicly listed — contact BSA sales team
- Upfront payment required before campaigns run
- CPM varies by niche: B2B/finance $50-100+, general interest $10-25

**Payout:**
- PayPal: available, standard PayPal fees apply
- Wire transfer: **$500 minimum**, **$35 fee** per transfer
- Payment schedule: monthly (specific day not documented)

**API rate limits:** Not documented. The Advertiser API returns all matching records per request (no pagination) — use `startDate`/`endDate` to scope queries.

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| **Zapier** | BSA → external | Triggers: deal sent, deal won, spot sold via self-serve |
| **Buttondown** | BSA → ESP | Native integration — contact Buttondown support to enable |
| **Any ESP** | BSA → ESP (custom) | Use Ad Serving API JSON endpoint, render in template |
| **Okta** | SSO | SAML single sign-on for enterprise |

No native Make, n8n, or webhook integrations found.

## Data model

### Ad Serving API response

<!-- Source: https://docs.buysellads.com/ad-serving-api -->

```json
{
  "ads": [
    {
      "statlink": "https://srv.buysellads.com/ads/click/...",
      "statimp": "https://srv.buysellads.com/ads/imp/...",
      "longlink": "abc123...",
      "longimp": "def456...",
      "description": "Build faster with our SDK. Ship production-ready code in minutes.",
      "company": "Acme Dev Tools",
      "callToAction": "Try Free",
      "image": "https://cdn.buysellads.com/...",
      "logo": "https://cdn.buysellads.com/...",
      "backgroundColor": "#ffffff",
      "textColor": "#333333",
      "pixel": "https://tracker.example.com/pixel?ts=[timestamp]||https://other.example.com/pixel"
    }
  ]
}
```

**Key fields:**
- `statlink` — click tracking URL. **Always check this exists before rendering.** If missing, no ad is available.
- `statimp` — impression tracking URL. Render as invisible `<img>`.
- `longlink` / `longimp` — used in email templates (prefix with `https://srv.buysellads.com/ads/long/x/`)
- `pixel` — third-party tracking pixels, separated by `||`. Replace `[timestamp]` with current epoch time.

### Advertiser API — Line Items

<!-- Source: https://docs.buysellads.com/advertiser-api/endpoints -->

```json
{
  "lineitem_id": 12345,
  "lineitem_name": "Q1 Developer Campaign",
  "order_id": 6789,
  "order_name": "Acme Dev Tools 2026",
  "placements": "Carbon Ads - Homepage",
  "paused": false,
  "goal_unit": "impressions",
  "goal_quantity": 500000,
  "unit_cost": 5.00,
  "ratified": true,
  "budget": 2500.00,
  "notes": "",
  "scheduled_start": "01/15/2026",
  "scheduled_end": "02/15/2026",
  "scheduled_start_iso": "2026-01-15",
  "scheduled_end_iso": "2026-02-15"
}
```

### Advertiser API — Daily Stats

```json
{
  "lineitem_id": 12345,
  "lineitem_name": "Q1 Developer Campaign",
  "order_id": 6789,
  "order_name": "Acme Dev Tools 2026",
  "placements": "Carbon Ads - Homepage",
  "date": "2026-01-20",
  "impressions": 15234,
  "clicks": 89,
  "ctr": 0.0058,
  "spend": 76.17,
  "notes": ""
}
```

### Advertiser API — Creatives

```json
{
  "order_name": "Acme Dev Tools 2026",
  "order_id": 6789,
  "lineitem_id": 12345,
  "lineitem_name": "Q1 Developer Campaign",
  "creative_id": 99001,
  "link": "https://acmedev.com/try",
  "weight": 50,
  "impressions": 250000,
  "clicks": 1450,
  "ctr": 0.0058,
  "spend": 1250.00,
  "image": "https://cdn.buysellads.com/...",
  "small_image": "https://cdn.buysellads.com/...",
  "description": "Build faster with our SDK",
  "company_tagline": "Ship production-ready code",
  "tracking_pixel": "https://tracker.example.com/pixel"
}
```

## Quick-start recipes

### Recipe 1: Fetch and render a newsletter ad (Python)

**Use case:** Pull a BuySellAds ad for insertion into your newsletter template before sending.

```bash
# cURL — fetch ad for zone CWYDL53W (test mode)
curl "https://srv.buysellads.com/ads/CWYDL53W.json?ignore=yes&forwardedip=1.2.3.4&useragent=Mozilla%2F5.0"
```

```python
import requests
import urllib.parse

ZONE_KEY = "CWYDL53W"  # Replace with your zone key
BASE_URL = f"https://srv.buysellads.com/ads/{ZONE_KEY}.json"

def fetch_newsletter_ad(subscriber_ip="1.2.3.4"):
    """Fetch an ad from BuySellAds for newsletter insertion."""
    params = {
        "forwardedip": subscriber_ip,
        "useragent": urllib.parse.quote("Newsletter Client"),
        # "ignore": "yes",  # Uncomment for testing (won't count impressions)
    }
    resp = requests.get(BASE_URL, params=params)
    data = resp.json()

    for ad in data.get("ads", []):
        if ad.get("statlink"):  # Only render if ad is available
            return {
                "headline": ad["description"],
                "cta": ad["callToAction"],
                "click_url": f"https://srv.buysellads.com/ads/long/x/{ad['longlink']}",
                "impression_pixel": f"https://srv.buysellads.com/ads/long/x/{ad['longimp']}",
                "logo": ad.get("logo"),
            }
    return None  # No ad available — show fallback content
```

**Gotcha:** Use `longlink` and `longimp` (not `statlink`/`statimp`) for email — they produce redirect URLs that work in email clients.

### Recipe 2: Export daily campaign stats to CSV (Advertiser API)

**Use case:** Pull yesterday's campaign performance into a spreadsheet or data warehouse.

```bash
# cURL — get daily stats for last 30 days as CSV
curl "https://papi.buysellads.com/daily-stats?key=YOUR_API_KEY&startDate=2026-04-13&endDate=2026-05-13&type=csv" \
  -o campaign_stats.csv
```

```python
import requests
from datetime import datetime, timedelta

API_KEY = "YOUR_API_KEY"  # Request from your account manager
BASE_URL = "https://papi.buysellads.com"

def get_daily_stats(days_back=30):
    """Pull daily campaign stats from BuySellAds Advertiser API."""
    end = datetime.utcnow().strftime("%Y-%m-%d")
    start = (datetime.utcnow() - timedelta(days=days_back)).strftime("%Y-%m-%d")

    resp = requests.get(f"{BASE_URL}/daily-stats", params={
        "key": API_KEY,
        "startDate": start,
        "endDate": end,
    })
    resp.raise_for_status()
    return resp.json()

# For CSV export, add type=csv:
# requests.get(f"{BASE_URL}/daily-stats", params={..., "type": "csv"})
```

**Gotcha:** The API returns ALL matching records — no pagination. Always use date filters to avoid pulling months of data.

### Recipe 3: Buttondown newsletter integration (Liquid template)

**Use case:** Render BuySellAds ads natively in a Buttondown newsletter.

1. Contact Buttondown support to enable the BuySellAds integration
2. Add your zone endpoint URL in Buttondown Miscellaneous Settings:
   `https://srv.buysellads.com/ads/get/ids/CWYDL53W.json?ignore=yes`
3. Insert this Liquid template code in your newsletter:

```liquid
{% load md %}
{% for ad in newsletter.metadata.ads.CWYDL53W.ads %}
  {% if ad.statlink %}
    ---
    ## Sponsor
    {{ ad.description|md:newsletter|safe }}
    [{{ ad.callToAction }}](https://srv.buysellads.com/ads/long/x/{{ ad.longlink }})
    ![](https://srv.buysellads.com/ads/long/x/{{ ad.longimp }})
  {% endif %}
{% endfor %}
```

**Gotcha:** Replace `CWYDL53W` with your actual zone key. The `for` loop requires your specific zone key.

## Integration patterns

### Website integration (Monetization Framework)

The JS Monetization Framework provides a `_bsa` global object:

```html
<script src="https://cdn.buysellads.com/pub/your-zone.js"></script>
<script>
  _bsa.init('default', 'CWYDL53W', 'placement:yoursite');
</script>
```

**Methods:**
- `_bsa.init(type, zoneKey, options)` — load a single ad unit
- `_bsa.initBatch(type, zoneKey, options)` — queue for batch loading
- `_bsa.loadBatch()` — execute all queued batch requests as one network call
- `_bsa.reload('#containerId')` — refresh a specific ad
- `_bsa.close('containerId', timeInMs)` — hide ad for duration (default 6 hours)

### Email integration (generic ESP)

For ESPs without native BSA integration, use the Ad Serving API server-side:

1. Before sending, call `GET https://srv.buysellads.com/ads/{zonekey}.json`
2. Parse the JSON response and extract ad fields
3. Insert into your email template (use `longlink`/`longimp` for email URLs)
4. Render impression pixel as `<img src="..." width="1" height="1" style="display:none">`

**Important:** Pass subscriber IP as `forwardedip` for geo-targeting accuracy. Pass a representative user agent as `useragent`.

### Advertiser reporting pipeline

Base URL: `https://papi.buysellads.com`

| Endpoint | Returns | Use for |
|---|---|---|
| `/lineitems` | Active line items with goals and budgets | Campaign inventory overview |
| `/daily-stats` | Day-by-day impressions, clicks, CTR, spend | Performance trending |
| `/creatives` | Per-creative performance with images and copy | Creative A/B analysis |
| `/creatives-daily-stats` | Per-creative per-day breakdown | Granular creative optimization |

All endpoints: `GET`, auth via `?key=API_KEY`, optional `startDate`/`endDate` (yyyy-mm-dd), optional `type=csv`.
