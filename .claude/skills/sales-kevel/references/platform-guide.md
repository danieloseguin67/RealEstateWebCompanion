# Kevel Platform Reference

## Overview

Kevel (formerly Adzerk) is an API-first ad server infrastructure platform that lets engineers build custom, white-label ad platforms. It's used by Home Depot, PayPal, Lyft, Edmunds, and iFood. 3B+ daily API requests. Differentiated by server-to-server architecture (no client-side ad tags), full data ownership (you remain data controller), and format flexibility (sponsored listings, native, display, email, video, DOOH).

## Capabilities & automation surface

| Capability | Description | Surface |
|---|---|---|
| **Decision API** | Serves ad decisions — post a placement request, get back a winning ad with tracking URLs | API-accessible |
| **Campaign Management API** | CRUD for advertisers, campaigns, flights, ads, creatives | API-accessible |
| **Inventory Management API** | CRUD for sites, zones, channels, ad types, priorities | API-accessible |
| **Reporting API** | Pull reporting data programmatically | API-accessible |
| **UserDB API** | Server-side user interest/keyword storage for targeting | API-accessible |
| **Content DB API** | Contextual targeting metadata storage | API-accessible |
| **Forecast API** | ML-based delivery and performance predictions | API-accessible |
| **Kevel Audience** | AI audience segmentation, first-party data unification | API-accessible + webhooks |
| **Kevel Console** | Campaign management UI with AI automation | UI-only |
| **Email ad serving** | Image-based ad tags for newsletter insertion | API-accessible (static tags) |

## Pricing, limits & plan gates

- **Custom pricing only** — based on features needed + monthly request volume
- **Free trial available** — test the API before committing
- No published tiers, no self-serve signup for paid plans
- No documented rate limits (likely negotiated per contract)
- All APIs appear available on all plans (no feature gating documented)
- SOC 1, SOC 2, GDPR, CCPA compliant

## Integrations

- **No native Zapier app** — use Zapier webhooks for event-driven automation
- **No native Make app** — use Make HTTP modules
- **No MCP server**
- **SDKs**: JavaScript (Decision + Management), Ruby (Management), plus community SDKs
- **OpenAPI spec**: github.com/adzerk/adzerk-api-specification
- **Data flow**: Server-to-server only — Kevel never touches the end user's browser directly

## Data model

### Campaign hierarchy

```
Advertiser (top level)
  └── Campaign
        └── Flight (budget, schedule, targeting, pacing)
              └── Ad (creative + flight association)
                    └── Creative (image, text, metadata)
```

### Key objects

**Advertiser:**
```json
{
  "Id": 12345,
  "Title": "Acme Corp",
  "IsActive": true,
  "IsDeleted": false
}
```

**Campaign:**
```json
{
  "Id": 34567,
  "AdvertiserId": 12345,
  "Name": "Q1 Product Launch",
  "IsActive": true
}
```

**Flight:**
```json
{
  "Id": 56789,
  "Name": "Homepage Banner Flight",
  "CampaignId": 34567,
  "PriorityId": 7654,
  "StartDateISO": "2026-01-01",
  "EndDateISO": "2026-03-31",
  "GoalType": 2,
  "Impressions": 100000,
  "IsActive": true
}
```
<!-- Constructed from docs — verify against live API -->

**Creative:**
```json
{
  "Id": 89012,
  "AdvertiserId": 12345,
  "Title": "Product Banner 300x250",
  "AdTypeId": 16,
  "Url": "https://example.com/landing",
  "IsActive": true,
  "Body": "",
  "Metadata": "{\"headline\":\"Try Acme Free\"}"
}
```

**Ad (Creative-Flight Map):**
```json
{
  "Creative": {"Id": 89012},
  "FlightId": 56789,
  "IsActive": true
}
```

### Inventory structure

```
Network (your account container)
  └── Channel (content category)
        └── Site (publisher property — e.g., "Web", "iOS", "Email")
              └── Zone (ad placement within site)
                    └── Ad Type (format + dimensions)
```

### Priority system

| Priority | Default Value | Use case |
|---|---|---|
| Sponsorship | 1 (highest) | Direct-sold, guaranteed delivery |
| Premium | 5 | High-value programmatic |
| Networks | 10 | Third-party demand |
| House | 20 (lowest) | Internal promotions, backfill |

## Quick-start recipes

### Recipe 1: Create a campaign and serve an ad (cURL)

**Use case**: Set up a basic campaign and verify it serves via the Decision API.

```bash
# 1. Create an advertiser
curl -X POST https://api.kevel.co/v1/advertiser \
  -H "X-Kevel-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary '{
    "Title": "Test Advertiser",
    "IsActive": true
  }'
# Save the returned Id (e.g., 12345)

# 2. Create a campaign (inactive initially)
curl -X POST https://api.kevel.co/v1/campaign \
  -H "X-Kevel-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary '{
    "AdvertiserId": 12345,
    "Name": "Test Campaign",
    "IsActive": false
  }'
# Save the returned Id (e.g., 34567)

# 3. Get priority ID (use "House" for testing)
curl https://api.kevel.co/v1/priority \
  -H "X-Kevel-ApiKey: YOUR_API_KEY"
# Find the House priority Id in the response

# 4. Create a flight
curl -X POST https://api.kevel.co/v1/flight \
  -H "X-Kevel-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary '{
    "Name": "Test Flight",
    "CampaignId": 34567,
    "PriorityId": 7654,
    "StartDateISO": "2026-01-01",
    "GoalType": 2,
    "Impressions": 1000,
    "IsActive": true
  }'
# Save the returned Id

# 5. Create a creative
curl -X POST https://api.kevel.co/v1/creative \
  -H "X-Kevel-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary '{
    "AdvertiserId": 12345,
    "Title": "Test Banner",
    "AdTypeId": 16,
    "Url": "https://example.com",
    "IsActive": true,
    "Metadata": "{\"headline\":\"Test Ad\"}"
  }'

# 6. Activate the campaign
curl -X PUT https://api.kevel.co/v1/campaign/34567 \
  -H "X-Kevel-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary '{
    "Id": 34567,
    "AdvertiserId": 12345,
    "Name": "Test Campaign",
    "IsActive": true
  }'

# 7. Request an ad via Decision API
curl -X POST https://e-YOUR_NETWORK_ID.adzerk.net/api/v2 \
  -H "Content-Type: application/json" \
  --data-binary '{
    "placements": [{
      "divName": "div1",
      "networkId": YOUR_NETWORK_ID,
      "siteId": YOUR_SITE_ID,
      "adTypes": [16]
    }]
  }'
```

### Recipe 2: Email ad serving with cache-busting (Python)

**Use case**: Generate email ad tags with per-subscriber cache-busting to fix Gmail impression tracking.

```python
import hashlib
from datetime import datetime

NETWORK_ID = "YOUR_NETWORK_ID"
FLIGHT_ID = "YOUR_FLIGHT_ID"
AD_SIZE_ID = "YOUR_AD_SIZE_ID"

def generate_email_ad_tag(subscriber_email: str, send_date: str = None) -> str:
    """Generate a Kevel email ad tag with cache-busting for accurate tracking."""
    if send_date is None:
        send_date = datetime.now().strftime("%Y%m%d%H%M")

    # Use subscriber email hash as unique key for UserDB tracking
    user_key = hashlib.md5(subscriber_email.encode()).hexdigest()[:12]

    # Unique segment prevents Gmail from caching the image
    unique_segment = f"{send_date}_{user_key}"

    base_url = f"https://e-{NETWORK_ID}.adzerk.net/s"
    redirect_url = f"{base_url}/redirect/{FLIGHT_ID}/0/{AD_SIZE_ID}/{unique_segment}"
    image_url = f"{base_url}/{FLIGHT_ID}/0/{AD_SIZE_ID}/{unique_segment}"

    # Add key param for Gmail proxy IP fix
    html = (
        f'<a href="{redirect_url}?key={user_key}">'
        f'<img border="0" src="{image_url}?key={user_key}" '
        f'alt="Sponsored" /></a>'
    )
    return html

# Generate for each subscriber in your list
subscribers = ["alice@example.com", "bob@example.com"]
for email in subscribers:
    tag = generate_email_ad_tag(email)
    print(f"{email}: {tag}\n")
```

**Gotchas:**
- Email creatives MUST be images — no JS/iFrame/HTML
- Test across email clients (Outlook, Apple Mail, Gmail) before launch
- For UserDB-enabled accounts, the `key` value must match the user's `userKey`

### Recipe 3: Decision API with keyword targeting (Python)

**Use case**: Request targeted ads based on page context (keywords).

```python
import requests

NETWORK_ID = 12345
SITE_ID = 67890

def get_ad(keywords: list, ad_types: list = None, user_key: str = None) -> dict:
    """Request a targeted ad from Kevel Decision API."""
    if ad_types is None:
        ad_types = [16]  # Default: Square Button

    payload = {
        "placements": [{
            "divName": "main-ad",
            "networkId": NETWORK_ID,
            "siteId": SITE_ID,
            "adTypes": ad_types
        }],
        "keywords": keywords
    }

    if user_key:
        payload["user"] = {"key": user_key}

    resp = requests.post(
        f"https://e-{NETWORK_ID}.adzerk.net/api/v2",
        json=payload
    )
    resp.raise_for_status()
    data = resp.json()

    decision = data.get("decisions", {}).get("main-ad")
    if not decision:
        return {"served": False}

    ad = decision[0] if isinstance(decision, list) else decision
    return {
        "served": True,
        "click_url": ad.get("clickUrl"),
        "impression_url": ad.get("impressionUrl"),
        "image_url": ad["contents"][0].get("data", {}).get("imageUrl") if ad.get("contents") else None,
        "title": ad["contents"][0].get("data", {}).get("title") if ad.get("contents") else None,
        "custom_data": ad.get("contents", [{}])[0].get("customData", {})
    }

# Example: get ad for a tech article
result = get_ad(keywords=["python", "devtools", "saas"])
if result["served"]:
    print(f"Ad: {result['title']}")
    print(f"Click: {result['click_url']}")
```

## Integration patterns

### Server-side rendering flow

```
Your Server                    Kevel
    |                            |
    |-- POST /api/v2 ----------->|  (Decision request with placement)
    |<-- JSON response ----------|  (Ad data: URLs, creative, metadata)
    |                            |
    |-- Render ad in HTML ------>|  (Your server inserts ad into page/email)
    |                            |
User clicks ad                   |
    |-- GET /redirect/... ------>|  (Click tracking)
    |<-- 302 to landing page ----|
    |                            |
Browser loads image              |
    |-- GET /s/... ------------->|  (Impression tracking)
```

### Email ad integration pattern

1. **Campaign setup**: Create advertiser → campaign → flight (image creative only)
2. **Tag generation**: Get email ad code from Inventory → Site → Ad Code → Email tab
3. **Cache-busting**: Replace the static URL segment with a per-subscriber unique value
4. **Gmail fix**: Append `?key={subscriberKey}` to both click and image URLs
5. **ESP insertion**: Paste the modified HTML into your ESP template
6. **Billing**: Use CPC over CPM for email — impression counts will always be inaccurate due to client caching

### Campaign management pattern

- Always create campaigns as **inactive** initially — prevents serving unfinished ads
- Always **GET the full object before PUT updates** — partial PUTs overwrite fields with defaults
- Use the Priority system (1-100) to control ad precedence: direct-sold (1-5) > programmatic (10) > house/backfill (20+)
- Set `GoalType: 2` for impression-based goals, `GoalType: 1` for percentage-based
