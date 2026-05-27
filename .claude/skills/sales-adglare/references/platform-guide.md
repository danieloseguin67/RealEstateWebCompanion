# AdGlare Platform Reference

## Overview

AdGlare is a cloud-based ad server established in 2013, serving publishers, advertisers, and media agencies. Primary differentiator: premium hosted ad serving with cookieless targeting by design, 220+ serving nodes across 6 data centers, and support for display, native, VAST video, CTV, redirect, and catalog ad formats. GDPR/CCPA compliant, ISO 27001 certified.

**Important limitation**: AdGlare does NOT support email/newsletter ad zones. For email ad serving, use AdButler, AdSpeed, Broadstreet, or Revive Adserver.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| Campaign management | Create campaigns with targeting, flight dates, budgets, pacing | API-accessible (Enterprise) |
| Zone management | Create display, native, VAST, redirect, catalog zones | API-accessible (Enterprise) |
| Creative management | Upload image, HTML5, video, native creatives | API-accessible (Enterprise) |
| Workspace management | Multi-tenant workspaces for agencies | API-accessible (Enterprise) |
| Advertiser management | Create and manage advertiser accounts | API-accessible (Enterprise) |
| Ad targeting | Geo, device, OS, browser, language, time, frequency | Via campaign settings |
| Real-time reporting | Impressions, clicks, conversions, viewability, fill rates | Partial API (Enterprise) |
| Custom metrics | Personalized formulas for custom KPIs | UI-only |
| Custom dimensions | Track custom data points | Enterprise only, UI-only |
| Folders | Organize campaigns and zones | API-accessible (Enterprise) |
| Audit trails | Track all changes and actions | API-accessible (Enterprise) |
| Ad tag generation | JavaScript (async), iframe, JSON, VAST XML | UI — copy from zone settings |

## Zone types

AdGlare supports 5 zone formats:

1. **Display** — Traditional inline banners (sidebar, header, footer). Async JavaScript tags.
2. **VAST** — Video ads via VAST XML for compatible video players (pre/mid/post-roll).
3. **Redirect** — Link ads that redirect users to the landing page via HTTP 302.
4. **Native** — JSON-format ads for custom publisher rendering (title, description, image, CTA).
5. **Catalog** — Auto-generated ads from product catalog (for retail publishers).

**No email/newsletter zone type exists.**

## Pricing, limits & plan gates

<!-- Pricing is best-effort — verify at adglare.com/pricing -->

| Plan | Monthly impressions | Price/mo | Key features |
|---|---|---|---|
| Lite | 1,000,000 | €99 | Display, VAST, redirect, catalog zones |
| Professional | 10,000,000 | €499 | + All Lite features, more volume |
| Enterprise | 10,000,000 | €649 | + API access, native ads, custom dimensions |
| Custom | Up to 10 billion | Contact sales | Custom limits and features |

**Plan-gated features**:
- **API v2**: Enterprise only (€649/mo)
- **Native ads**: Enterprise only
- **Custom dimensions**: Enterprise only

**Free trial**: 14 days on all plans.

## API reference

**Base URL**: `https://{yourname}.api.adglare.app/v2`
**Auth**: Bearer token (`Authorization: Bearer {token}`)
**Format**: JSON request/response
**Plan requirement**: Enterprise (€649/mo)

### Authentication

```bash
curl -X GET "https://yourname.api.adglare.app/v2/workspaces" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Endpoints (CRUD)

| Resource | Endpoints | Key fields |
|---|---|---|
| Workspaces | GET/POST/PUT/DELETE `/workspaces` | name, timezone, currency |
| Campaigns | GET/POST/PUT/DELETE `/campaigns` | name, advertiser_id, delivery (impressions/clicks/conversions), pricing (CPM/CPC/CPA), pacing, targeting, flight dates |
| Zones | GET/POST/PUT/DELETE `/zones` | name, format (display/native/vast/redirect/catalog), data (format-specific config) |
| Creatives | GET/POST/PUT/DELETE `/creatives` | name, campaign_id, ad_type, targeting |
| Advertisers | CRUD available | Details in full API reference |
| Reports | GET available | Details partially documented |
| Folders | CRUD available | Details in full API reference |
| Audit Trails | GET available | Details in full API reference |

### Campaign creation example

```bash
curl -X POST "https://yourname.api.adglare.app/v2/campaigns" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
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
    "end_date": "2026-06-30"
  }'
```

### Zone creation example

```bash
curl -X POST "https://yourname.api.adglare.app/v2/zones" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Homepage Leaderboard",
    "format": "display",
    "data": {
      "width": 728,
      "height": 90
    }
  }'
```

### Python quick-start

```python
import requests

BASE = "https://yourname.api.adglare.app/v2"
HEADERS = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "Content-Type": "application/json"
}

# List all campaigns
resp = requests.get(f"{BASE}/campaigns", headers=HEADERS)
campaigns = resp.json()

# Create a display zone
zone = requests.post(f"{BASE}/zones", headers=HEADERS, json={
    "name": "Sidebar 300x250",
    "format": "display",
    "data": {"width": 300, "height": 250}
})
print(zone.json())
```

### PHP SDK

AdGlare provides an official PHP SDK on GitHub (`github.com/adglare`, GPL-3.0):

```php
// Install via Composer or clone from GitHub
$client = new AdGlare\Client('YOUR_API_TOKEN', 'yourname');

// List campaigns
$campaigns = $client->campaigns()->list();

// Create a zone
$zone = $client->zones()->create([
    'name' => 'Header Banner',
    'format' => 'display',
    'data' => ['width' => 728, 'height' => 90]
]);
```

## Ad tag integration

### Display ad tag (async JavaScript)

```html
<!-- AdGlare async ad tag -->
<div id="adglare-zone-123"></div>
<script async src="https://yourname.adglare.app/zone/123.js"></script>
```

### Native ad (JSON endpoint)

Fetch JSON and render with your own template:

```javascript
fetch('https://yourname.adglare.app/zone/456/native')
  .then(r => r.json())
  .then(ad => {
    document.getElementById('native-ad').innerHTML = `
      <a href="${ad.click_url}">
        <img src="${ad.image}" alt="${ad.title}">
        <h3>${ad.title}</h3>
        <p>${ad.description}</p>
        <span>${ad.cta}</span>
      </a>
    `;
  });
```

### VAST video tag

Configure your video player with the VAST endpoint:

```html
<!-- JW Player example -->
<script>
jwplayer("player").setup({
  file: "https://example.com/video.mp4",
  advertising: {
    client: "vast",
    schedule: {
      preroll: { tag: "https://yourname.adglare.app/zone/789/vast" }
    }
  }
});
</script>
```

## Targeting options

- **Geo**: Country, region, city, postal code
- **Device**: Desktop, mobile, tablet
- **OS**: Windows, macOS, iOS, Android, Linux
- **Browser**: Chrome, Firefox, Safari, Edge
- **Language**: Browser language setting
- **Time**: Day-of-week, hour-of-day scheduling
- **Frequency**: Cap impressions per user per time period
- **Keywords**: Contextual keyword targeting

## Key differentiators

- **Cookieless by design** — GDPR/CCPA compliant without relying on third-party cookies
- **220+ serving nodes, 6 data centers** — low-latency global delivery
- **ISO 27001 certified** — enterprise-grade security
- **White-label capable** — custom branding for agencies
- **No email zones** — web, app, and video only (unlike AdButler, AdSpeed, Revive)

## Comparison with alternatives

| Feature | AdGlare | AdButler | AdSpeed | Revive |
|---|---|---|---|---|
| Starting price | €99/mo | $179/mo | $9.95/mo | Free (self-hosted) |
| Email newsletter zones | No | Yes | Yes | Yes |
| API access | Enterprise (€649/mo) | All plans | All plans | All (XML-RPC) |
| Native ads | Enterprise | Yes | No | No |
| VAST video | Yes | Yes | Yes | Via plugin |
| Self-serve portal | No | Yes | Yes | No |
| Cookieless | Yes (by design) | Optional | No | No |
| MCP server | No | Yes | No | No |
