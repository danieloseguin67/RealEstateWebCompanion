# AdvertServe Platform Guide

## Overview

AdvertServe is a cloud-hosted ad management platform operating since 1998, serving 30,000+ sites across 60+ countries. It provides unified ad serving for web, mobile, email, and video, targeting B2B and niche publishers with direct sales teams.

## Core Capabilities

### Ad Formats
- **Display**: banners, text ads, carousels, crawlers, expandables, flips, HTML5, lightboxes, overlays, page peels, pushdowns, shoutboxes, smoke screens, wallpapers
- **Video**: VAST 2.0/3.0/4.0 and VPAID 2.0 — pre-roll, mid-roll, post-roll, companion banners, non-linear overlays. Compatible with Brightcove, JW Player, Kaltura, Video.js
- **Mobile**: Native support for Android/iPhone apps, AMP ad tags via Code Wizard
- **Email**: Static IMG-based tags via Code Wizard "E-mail" code type — no JavaScript, works in any ESP
- **Dynamic**: HTML5 creatives with JavaScript API (3KB) — expandables, pushdowns, lightbox/fullpage takeovers, custom counters, visibility detection, mouse proximity

### Zone Types
| Type ID | Name | Use case |
|---|---|---|
| 1 | Banner | Standard display ads |
| 2 | Text | Text-based ads |
| 3 | Window | Pop-up/pop-under |
| 4 | Dynamic | HTML5 rich media |
| 5 | Page Peel | Corner peel ads |
| 6 | Wallpaper | Background skin ads |
| 7 | VAST Video (Linear) | Pre/mid/post-roll |
| 8 | VAST Overlay (Non-Linear) | Video overlay banners |

### Zone Tier System
Each zone supports **101 tiers** (0-100). Higher-paying campaigns go in higher tiers. Tiers function as priority percentages:
- Tier 100: Premium direct-sold campaigns
- Tier 50-99: Standard campaigns
- Tier 10-49: Third-party ad tags, header bidding backfill
- Tier 1-9: In-house/remnant ads
- Tier 0: Default fallback

### Targeting
- **Geographic**: continent, country, state/province, city, zip code, DMA, timezone
- **Technical**: OS, browser, device type, ISP/organization, IP address, hostname
- **Content**: keywords, page URLs, contextual targeting with full-text indexing
- **Weather**: conditions-based targeting
- **Custom fields**: up to 10 custom targeting dimensions
- **Frequency capping**: view/click/action limits with timeout windows
- **Day/hour parting**: weekday and hourly restrictions

### Reporting
58 distinct metrics including:
- Standard: views, clicks, CTR, actions
- Conversion: view-through and click-through
- Interactive: engagement rates, expanded views
- Inventory: utilization, missed opportunities
- Video: play events, quartile tracking (25/50/75/100%)
- Viewability: viewable impressions and rates

Reports update in real time (once per minute). Export to CSV, Excel, HTML, JSON, PDF, TXT, XML.

### IVT Filtering
Built-in invalid traffic filtering using collaborative blacklists. Optional Forensiq integration for advanced fraud detection.

### Header Bidding
Prebid.js integration for programmatic demand. Configure in zone settings:
- `bidding_header`: enable/disable
- `bidding_category`: IAB OpenRTB category
- `bidding_position`: ad position code
- `bidding_consent_api`: IAB consent framework
- `bidding_floor`: minimum bid price

## Pricing

Single **ONE** plan — all features included on all tiers.

| Impressions/mo | Monthly cost | Effective CPM |
|---|---|---|
| 2M | $299 | $0.15 |
| 5M | $449 | $0.09 |
| 10M | $574 | $0.06 |
| 25M | $949 | $0.04 |
| 50M | $1,574 | $0.03 |
| 100M | $2,074 | $0.02 |
| 500M | $6,074 | $0.01 |
| 1B | $8,574 | $0.009 |

CDN bandwidth: $0.03/GB (NA/EU), $0.07/GB (SA/Asia/Oceania). No contracts. 45-day free trial. No setup fees.

**All plans include**: API access, white-label, custom domains, HTTPS/SSL, CDN, contextual targeting, geo-targeting, weather targeting, VAST/VPAID, video streaming, IVT filtering.

## Email Newsletter Ad Setup

### Step-by-step
1. **Create a Banner zone** — Zones > Create > Type: Banner, set size (e.g., 728x90, 300x250)
2. **Create a campaign** — Campaigns > Create > Type: Banner, assign to advertiser, set scheduling
3. **Upload media** — Media > Create > upload image creative (JPEG, GIF, PNG only — no code-based images)
4. **Assign media to campaign** — link the creative to your campaign
5. **Assign campaign to zone** — set the tier priority (higher = higher priority)
6. **Generate E-mail code** — Code Wizard > Banner > E-mail > select your zone

### Email code output
The Code Wizard generates a static `<a>` + `<img>` tag pair:
```html
<a href="https://your-server.advertserve.com/servlet/click/zone?zid=123">
  <img src="https://your-server.advertserve.com/servlet/view/banner/zone?zid=123&pid=0"
       width="728" height="90" border="0" alt="" />
</a>
```

### Email limitations
- **Image-only** — no JavaScript, no HTML5, no rich media in email
- **No frequency capping** — email clients don't support cookies
- **No device targeting** — no client-side detection in email
- Works with any ESP that supports raw HTML (Mailchimp, ActiveCampaign, etc.)

## Data Model

### Entity hierarchy
```
Publisher (your site/newsletter)
  └── Zone (ad placement)
       └── Campaign assignments (with tier priority)
            └── Campaign (advertiser's buy)
                 └── Media (creative assets)
                      └── Files (image/HTML5 assets)

Advertiser (the buyer)
  └── Campaigns
       └── Media
```

### Key entities
| Entity | API module | Description |
|---|---|---|
| Zone | `zones` | Ad placement with type, size, targeting, tier assignments |
| Campaign | `campaigns` | Ad buy with schedule, limits, targeting, media assignments |
| Advertiser | `advertisers` | Account with contact info, permissions, payment settings |
| Media | `media` | Creative unit with files, click URL, tracking |
| Publisher | `publishers` | Site/newsletter owner account |
| Group | `groups` | Organizational grouping for zones |
| Size | `sizes` | Width × height dimension definition |
| Theme | `themes` | Visual template for text ads |

## API Overview

**For detailed API documentation including all module endpoints, parameters, and examples, see `references/advertserve-api-reference.md`.**

### Quick reference
- **Base URL**: `https://{your-server}.advertserve.com/servlet/control/api/{module}/{action}`
- **Auth**: Secret key via `secret` parameter (32 chars max)
- **Response format**: XML default, JSON with `output=json`
- **Modules**: Administrators, Advertisers, Campaigns, Code Wizard, Files, Groups, Media, Prefetch (public), Publishers, Reports, Pixels, Segments, Sizes, Stacks, Themes, Videos, Zones
- **Operations per module**: Query, Create, Retrieve, Update, Delete, Recycle (most modules)
- **No webhooks** — poll API for changes
- **No rate limit documented** — but use HTTPS and IP firewall

### Quick-start: create a zone via API

```bash
curl "https://your-server.advertserve.com/servlet/control/api/zones/create?\
secret=YOUR_API_KEY&\
name=Homepage+Leaderboard+728x90&\
group=1&\
type=1&\
size=3&\
output=json"
```

Response:
```json
{ "id": 456 }
```

### Quick-start: create a campaign via API

```bash
curl "https://your-server.advertserve.com/servlet/control/api/campaigns/create?\
secret=YOUR_API_KEY&\
name=ACME+Q1+Banner&\
advertiser=123&\
type=1&\
schedule_start_date=2026-06-01&\
output=json"
```

Response:
```json
{ "id": 789 }
```

### Quick-start: pull a report

```bash
curl "https://your-server.advertserve.com/servlet/control/api/reports/general/summary?\
secret=YOUR_API_KEY&\
start=2026-05-01&\
end=2026-05-31&\
output=json"
```

## Integration Recipes

### Recipe 1: Automate zone + campaign creation (Python)

```python
import requests

BASE = "https://your-server.advertserve.com/servlet/control/api"
SECRET = "your-api-key"

# Create a zone
zone = requests.get(f"{BASE}/zones/create", params={
    "secret": SECRET,
    "name": "Newsletter 300x250",
    "group": 1,
    "type": 1,
    "size": 5,
    "output": "json"
}).json()
print(f"Zone created: {zone['id']}")

# Create a campaign
campaign = requests.get(f"{BASE}/campaigns/create", params={
    "secret": SECRET,
    "name": "Sponsor A Newsletter Banner",
    "advertiser": 10,
    "type": 1,
    "schedule_start_date": "2026-06-01",
    "schedule_stop_date": "2026-06-30",
    "output": "json"
}).json()
print(f"Campaign created: {campaign['id']}")

# Assign campaign to zone
requests.get(f"{BASE}/zones/campaigns/add", params={
    "secret": SECRET,
    "id": zone["id"],
    "campaign": campaign["id"],
    "tier": 90,
    "output": "json"
})
print("Campaign assigned to zone at tier 90")
```

### Recipe 2: Export daily stats to CSV (Python)

```python
import requests
import csv
from datetime import date, timedelta

BASE = "https://your-server.advertserve.com/servlet/control/api"
SECRET = "your-api-key"

yesterday = (date.today() - timedelta(days=1)).isoformat()

report = requests.get(f"{BASE}/reports/zones/daily", params={
    "secret": SECRET,
    "start": yesterday,
    "end": yesterday,
    "output": "json"
}).json()

with open(f"report_{yesterday}.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["zone", "views", "clicks", "ctr"])
    for row in report.get("rows", []):
        writer.writerow([row["name"], row["views"], row["clicks"], row["ctr"]])
```

## Competitor Comparison

| Feature | AdvertServe | AdButler | Epom | AdSpeed | Revive |
|---|---|---|---|---|---|
| **Starting price** | $299/mo | $179/mo | $250/mo | $9.95/mo | Free (self-hosted) |
| **Email ad serving** | Yes (IMG tags) | Yes (email zones) | Yes (email zones) | Yes (email zones) | Yes (email zones) |
| **Video (VAST/VPAID)** | Yes | Yes | Yes | Limited | Plugin |
| **Header bidding** | Prebid.js native | SSP add-on | RTB module | No | No |
| **API** | 17 modules, JSON/XML | REST + MCP | 60+ endpoints | 50+ endpoints, XML | XML-RPC, 80+ methods |
| **Self-serve portal** | No | Yes | No | No | No |
| **White-label** | Included | Paid add-on | Included | Paid add-on | N/A (self-hosted) |
| **IVT filtering** | Built-in + Forensiq | Basic | Basic | Basic | No |
| **Weather targeting** | Yes | No | No | No | No |
| **Uptime SLA** | 99.995% | 99.99% | 99.9% | Not published | N/A |
| **Webhooks** | No | No | No | No | No |

### When to choose AdvertServe
- You need **video + display + email** in one platform
- You want **header bidding** (Prebid.js) built in
- You need **weather targeting** for location-based advertisers
- You want **white-label** included at no extra cost
- You have 2M+ monthly impressions (below that, AdSpeed or Revive are more cost-effective)

### When NOT to choose AdvertServe
- You need a **self-serve advertiser portal** → use AdButler
- You want **programmatic exchange** (RTB) → use Epom
- You're under 100K impressions/mo → use AdSpeed ($9.95/mo) or Revive (free)
- You need **webhooks** or event-driven automation → none of these ad servers support webhooks
