# AdSpeed Platform Reference

## Overview

AdSpeed is a hosted ad server established in 2000, serving publishers, advertisers, agencies, and ad networks. Primary differentiator: affordable hosted ad serving with built-in email/newsletter zone support and a REST API — starting at $9.95/mo for 100K impressions.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| Zone management | Create display, email, and video ad zones | API-accessible (`AS.Zones.*`, `AS.Zone.*`) |
| Ad management | Create banner, rich-media, video, HTML, text ads | API-accessible (`AS.Ads.*`, `AS.Ad.*`) |
| Campaign management | Group ads into campaigns with budgets | API-accessible (`AS.Campaigns.*`) |
| Advertiser management | Create and manage advertiser accounts | API-accessible (`AS.Advertisers.*`, `AS.Advertiser.*`) |
| Website management | Organize zones by website/property | API-accessible (`AS.Websites.*`, `AS.Website.*`) |
| Channel management | Group zones into channels | API-accessible (`AS.Channels.*`) |
| Ad targeting | Geo, time-of-day, keyword, competitive/companion | API-accessible (`AS.Ad.addRestriction`, `AS.Zone.addRestriction`) |
| Ad optimization | Auto-optimize by CTR, revenue, conversion, or eCPM | API-accessible (`AS.Zone.edit` optimizer field) |
| Reporting & analytics | Impressions, clicks, CTR, revenue, conversions, visitor demographics | API-accessible (`*.getStats`, `*.getVisitorStats`) |
| Self-service advertising | Advertisers self-book campaigns | UI-only |
| Invoice management | Generate invoices for advertisers | UI-only |
| White label / private branding | Remove AdSpeed branding | UI-only (add-on $60/mo) |
| Ad network | Manage up to 200 publisher partners | UI-only (add-on $100/mo) |
| Email/newsletter ad serving | Serve image ads in HTML emails | API-accessible (zone type: email) |
| WordPress plugin | Serve AdSpeed ads on WordPress sites | Plugin — no API needed |

## Pricing, limits & plan gates

<!-- Pricing is slider-based and best-effort — verify at adspeed.com/Plans.html -->

| Plan | Monthly impressions | Price/mo | CPM |
|---|---|---|---|
| Premium 100 | 100,000 | $9.95 | ~$0.10 |
| Premium 300 | 300,000 | ~$19.95 | ~$0.07 |
| Premium 500 | 500,000 | ~$29.95 | ~$0.06 |
| Premium 1M+ | 1,000,000+ | Slider-based | Decreasing CPM |
| Custom | 30M+ | Contact sales | Custom |

**Discounts**: Up to 20% off with annual prepayment. Quarterly and semi-annual options also available.

**Add-ons** (monthly):
- Fast Delivery (1200 GB bandwidth): $60
- Private Branding / White Label: $60
- Ad Network (up to 200 partners): $100

**Free trial**: 10 days. **Money-back guarantee**: 30 days.

**All plans include**: Email newsletter zones, REST API access, real-time reporting, ad targeting, ad optimization, SSL ad serving, WordPress plugin.

**API rate limits**:
- 600 requests/hour (across all methods)
- 2,400 requests/24 hours (per individual method)
- Create operations: 50 calls/day
- Higher limits available on request

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| WordPress plugin | Reads from AdSpeed | Install plugin, enter account ID, place zones via widgets or shortcodes |
| REST API | Bidirectional | Manage all objects, pull stats, create ads |
| Any ESP (MailChimp, etc.) | One-way (embed) | Paste email zone ad tag into HTML email template |
| Zapier / Make | Not available | No native iPaaS integration |
| Webhooks | Not available | No webhook support |
| MCP server | Not available | No MCP server |

## Data model

### Zone (XML response)
```xml
<!-- Source: adspeed.com API docs -->
<Zones total="10" active="8" deleted="2">
  <Zone id="1234" name="Homepage Banner" status="active" />
  <Zone id="1235" name="Newsletter Top" status="active" />
</Zones>
```

### Ad (XML response)
<!-- Constructed from docs — verify against live API -->
```xml
<Ads total="5" active="3" pending="1" deleted="1">
  <Ad id="5678" name="Summer Sale Banner" status="active" weight="1"
       width="728" height="90" />
</Ads>
```

### Campaign (XML response)
```xml
<!-- Source: adspeed.com API docs -->
<Campaigns total="1" page="1" numpage="1" perpage="4">
  <Campaign id="3526" name="Sample Campaign" status="active" />
</Campaigns>
```

### Advertiser (XML response)
<!-- Constructed from docs — verify against live API -->
```xml
<Advertisers total="3" active="2" pending="1" deleted="0">
  <Advertiser id="100" username="acme_corp" status="active" />
</Advertisers>
```

### Stats (XML response)
<!-- Constructed from docs — verify against live API -->
```xml
<StatRows metric="impressions" period="daily">
  <StatRow date="2026-05-20" value="1523" />
  <StatRow date="2026-05-21" value="1891" />
</StatRows>
```

## Email newsletter zone setup

### How it works

1. Create a zone with type **Email/Newsletter** in the AdSpeed dashboard
2. Link at least one **image banner ad** to the zone (email zones only support images)
3. Get the zone ad tag — a static `<a>` + `<img>` pair (no JavaScript, no iframe)
4. Paste the ad tag into your ESP HTML email template

### Ad tag format

```html
<a href="https://g.adspeed.net/ad.php?do=clk&zid=ZONE_ID&wd=WIDTH&ht=HEIGHT&pair=PAIR_VALUE">
<img src="https://g.adspeed.net/ad.php?do=img&zid=ZONE_ID&wd=WIDTH&ht=HEIGHT&pair=PAIR_VALUE" width="WIDTH" height="HEIGHT" border="0" />
</a>
```

Both `href` and `img src` **must** contain identical parameters for proper click tracking.

### Option 1: Unique pair matching (recommended)

If your ESP supports merge tags, add a unique identifier per recipient:

**MailChimp**: `&pair=em@*|EMAIL_UID|**|DATE:mdyu|*`
**Generic**: `&pair=em@{UNIQUE_SUBSCRIBER_ID}`

This enables:
- Multiple active ads in one zone (AdSpeed rotates them)
- Accurate impression-to-click attribution per recipient

### Option 2: Single-ad switching (no merge tags)

If your ESP doesn't support dynamic merge tags:
- Keep only **one active ad** per zone at a time
- Switch ads by deactivating/unlinking the current one and activating another
- Or use start/end date scheduling on individual ads
- Or use day-parting restrictions

### Keyword targeting in email

Add `&keywords=jetblue` to serve a specific ad from a multi-ad zone based on subscriber segment:

```html
<img src="https://g.adspeed.net/ad.php?do=img&zid=123&wd=728&ht=90&keywords=jetblue" />
```

## Quick-start recipes

### Recipe 1: Create a zone and get its ad tag via API

**Use case**: Automate zone creation for new newsletter properties.

**cURL**:
```bash
# Step 1: Generate signature
# Sort params: key, method, name, type
# String: "key=YOUR_KEY&method=AS.Zones.create&name=Newsletter+Top&type=email"
# Prepend secret: "YOUR_SECRET" + sorted_string
# MD5 hash (lowercase)

curl -X POST "https://api.adspeed.com/" \
  -d "key=YOUR_API_KEY" \
  -d "method=AS.Zones.create" \
  -d "name=Newsletter Top" \
  -d "type=email" \
  -d "sig=COMPUTED_MD5_HASH"
```

**Python**:
```python
import hashlib
import requests

API_KEY = "YOUR_API_KEY"
API_SECRET = "YOUR_API_SECRET"

params = {
    "key": API_KEY,
    "method": "AS.Zones.create",
    "name": "Newsletter Top",
    "type": "email",
}

# Sort params alphabetically and build query string
sorted_str = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
# Prepend secret and hash
sig = hashlib.md5((API_SECRET + sorted_str).encode()).hexdigest()
params["sig"] = sig

resp = requests.post("https://api.adspeed.com/", data=params)
print(resp.text)  # XML response with new zone ID
```

**Response** (XML):
```xml
<Response version="1.0.0">
  <Zone id="5678" name="Newsletter Top" status="active" type="email" />
</Response>
```

### Recipe 2: Pull daily stats for a zone

**Use case**: Build a reporting dashboard or sync stats to a spreadsheet.

**cURL**:
```bash
# Token = MD5 of [Zone ID][Zone Name]
# e.g., MD5("5678Newsletter Top") = "abc123..."

curl "https://api.adspeed.com/?key=YOUR_API_KEY&method=AS.Zone.getStats&zone=5678&token=ZONE_TOKEN&metric=impressions&period=daily&range=2026.05.01|2026.05.24&sig=COMPUTED_SIG"
```

**Python**:
```python
import hashlib
import requests
from xml.etree import ElementTree

API_KEY = "YOUR_API_KEY"
API_SECRET = "YOUR_API_SECRET"
ZONE_ID = "5678"
ZONE_NAME = "Newsletter Top"

# Auth token for zone-level operations
token = hashlib.md5(f"{ZONE_ID}{ZONE_NAME}".encode()).hexdigest()

params = {
    "key": API_KEY,
    "method": "AS.Zone.getStats",
    "zone": ZONE_ID,
    "token": token,
    "metric": "impressions",
    "period": "daily",
    "range": "2026.05.01|2026.05.24",
}

sorted_str = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
sig = hashlib.md5((API_SECRET + sorted_str).encode()).hexdigest()
params["sig"] = sig

resp = requests.get("https://api.adspeed.com/", params=params)
root = ElementTree.fromstring(resp.text)
for row in root.findall(".//StatRow"):
    print(f"{row.get('date')}: {row.get('value')} impressions")
```

### Recipe 3: Create an image banner ad and link it to a zone

**Use case**: Automate ad creative upload for a new sponsor campaign.

**Python**:
```python
import hashlib
import base64
import requests

API_KEY = "YOUR_API_KEY"
API_SECRET = "YOUR_API_SECRET"

# Step 1: Create the banner ad
params = {
    "key": API_KEY,
    "method": "AS.Ads.createBanner",
    "name": "Sponsor Q3 Banner",
    "imageurl": "https://example.com/ads/sponsor-q3-728x90.png",
    "clickurl": "https://sponsor.example.com/landing?utm_source=newsletter",
    "width": "728",
    "height": "90",
}

sorted_str = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
sig = hashlib.md5((API_SECRET + sorted_str).encode()).hexdigest()
params["sig"] = sig

resp = requests.post("https://api.adspeed.com/", data=params)
# Parse ad ID from response XML
# ad_id = "9999"

# Step 2: Link ad to zone
ad_id = "9999"
ad_name = "Sponsor Q3 Banner"
token = hashlib.md5(f"{ad_id}{ad_name}".encode()).hexdigest()

link_params = {
    "key": API_KEY,
    "method": "AS.Ad.linkToZone",
    "ad": ad_id,
    "token": token,
    "zone": "5678",  # Newsletter Top zone
}

sorted_str = "&".join(f"{k}={v}" for k, v in sorted(link_params.items()))
sig = hashlib.md5((API_SECRET + sorted_str).encode()).hexdigest()
link_params["sig"] = sig

resp = requests.post("https://api.adspeed.com/", data=link_params)
print(resp.text)
```

## Integration patterns

### API authentication pattern

All API requests require three auth components:
1. **API key** (`key` parameter) — identifies your account
2. **API secret** — used to sign requests (never sent directly)
3. **MD5 signature** (`sig` parameter) — computed from secret + sorted params

For entity-level operations (zone, ad, advertiser), an additional `token` parameter is required:
- Token = MD5 hash of `[Entity ID][Entity Name]` (concatenated, no separator)
- This prevents unauthorized access to specific resources

### Pagination pattern

List endpoints use `perpage` + `page` parameters:
```
?method=AS.Zones.getList&perpage=100&page=1
```
- Max `perpage`: 100
- Response includes `total`, `page`, `numpage` attributes for calculating remaining pages

### Error handling

No documented error response schema. Monitor HTTP status codes and check XML response for error elements. API rate limit exceeded returns an error — implement exponential backoff with 1-second minimum delay.

### Reporting sync architecture

For daily reporting sync:
1. Call `getStats` with `period=daily` and `range=YESTERDAY|YESTERDAY`
2. Parse XML response into your analytics store
3. Respect the 50 calls/day limit on stats endpoints — batch by zone
4. Schedule via cron at low-traffic hours to avoid rate limits
