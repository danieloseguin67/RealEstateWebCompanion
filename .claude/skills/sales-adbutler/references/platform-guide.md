# AdButler Platform Reference

## Overview

AdButler is a full-stack ad tech platform for publishers, retailers, and ad networks — serving display, video, mobile, native, email, and DOOH ads with a self-serve advertiser portal and programmatic SSP. Founded in 2000, 25+ years in business, 1,000+ clients. Independent alternative to Google Ad Manager with transparent pricing and data ownership.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Display/Video/Mobile ad serving** | Standard IAB ad formats, VAST/VPAID video, MRAID mobile | API-accessible |
| **Email ad server** | Image-only ads in newsletters, real-time updates after send | API-accessible (zone tags) |
| **Self-serve portal** | Advertisers create/manage/pay for campaigns directly | UI + Self-Serve API |
| **Programmatic SSP** | Real-time auctions, header bidding | UI-only config |
| **Reporting & analytics** | Impressions, clicks, CTR, revenue, eCPM, conversions | API-accessible |
| **Campaign management** | Advertisers, campaigns, flights, ad items, scheduling | API-accessible |
| **Publisher/zone management** | Publishers, zones, zone tags | API-accessible |
| **Targeting** | Geo, platform, data keys (key-value), contextual | API-accessible (paid add-on) |
| **AI optimization** | Automated ad delivery optimization | UI-only |
| **MCP server** | Natural language ad ops via Claude/Cursor | MCP-accessible |
| **Financial reporting** | Cost, profit, revenue breakdowns | API-accessible (Standard+) |

## Pricing, limits & plan gates

| Feature | Essentials ($179/mo) | Standard ($682/mo) | Advanced/Enterprise |
|---|---|---|---|
| Ad requests | 1M | 10M | Custom |
| Zones | 10 | 100 | Custom |
| Advertisers | 10 | 50 | Custom |
| Users | 1 | 5 | Role-based |
| Ad formats | Display, mobile, in-app | + Video | + All |
| API Access | **Paid add-on** | **Paid add-on** | Included |
| Targeting | **Paid add-on** | **Paid add-on** | Included |
| Programmatic | **Paid add-on** | **Paid add-on** | Included |
| Financial reporting | No | Yes | Yes |
| Mobile SDK | No | Yes | Yes |
| Sandbox account | No | No | Yes |

**Key gate:** API Access is a paid add-on on Essentials and Standard. You cannot use the management API without it.

**Overage behavior:** Not publicly documented — check your contract terms. G2 reviewers flag hidden overage costs.

**Free trial:** Available.

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| **Mailchimp** | AdButler → Email | Zone tag HTML with EUID macro |
| **SendGrid** | AdButler → Email | Zone tag HTML |
| **Any ESP** | AdButler → Email | Generic zone tag — insert EUID macro for your ESP |
| **WordPress** | Bidirectional | Official plugin (wp-plugins/adbutler on GitHub) |
| **iOS apps** | AdButler → App | MRAID SDK (github.com/adbutler/adbutler-ios-mraid-sdk) |
| **Android apps** | AdButler → App | MRAID SDK (github.com/adbutler/adbutler-android-mraid-sdk) |
| **MCP (Claude/Cursor)** | Bidirectional | `@adbutler/mcp-server` — manage campaigns, pull reports |
| **Zapier** | Not available | — |
| **Make** | Not available | — |

## Data model

### Zone (ad placement)

```json
{
  "id": 373469,
  "name": "Newsletter Header Banner",
  "type": "email",
  "width": 600,
  "height": 200,
  "publisher_id": 171230
}
```
<!-- Constructed from docs — verify against live API -->

### Ad Item (creative)

```json
{
  "id": 84521,
  "name": "Product Launch Banner",
  "zone_id": 373469,
  "width": "600",
  "height": "200",
  "image_url": "https://servedbyadbutler.com/image/...",
  "redirect_url": "https://example.com/landing",
  "tracking_pixel": "https://servedbyadbutler.com/pixel/..."
}
```
<!-- Constructed from docs — verify against live API -->

### Ad Serve Response (JSON API)

```json
{
  "status": "SUCCESS",
  "placements": {
    "placement_1": {
      "banner_id": "84521",
      "width": "600",
      "height": "200",
      "alt_text": "Product Launch",
      "accompanied_html": "",
      "target": "_blank",
      "tracking_pixel": "https://servedbyadbutler.com/...",
      "body": "",
      "redirect_url": "https://servedbyadbutler.com/redirect.spark?...",
      "refresh_url": "https://servedbyadbutler.com/adserve/...",
      "refresh_time": "0",
      "image_url": "https://servedbyadbutler.com/image/...",
      "accupixel_url": "https://servedbyadbutler.com/acc/..."
    }
  }
}
```

**Important:** You must call `accupixel_url` before AdButler records an impression.

### Report Response

```json
{
  "object": "report",
  "url": "/v2/reports",
  "data": [
    {
      "id": 12345,
      "name": "Newsletter Header",
      "impressions": 45200,
      "clicks": 892,
      "ctr": 1.97,
      "ecpm": 12.50,
      "revenue": 565.00
    }
  ],
  "meta": {
    "total": 1,
    "period": "last_30_days"
  }
}
```
<!-- Constructed from docs — verify against live API -->

## Email ad serving setup

### How it works

1. **Create an email zone** — Publisher section > Add Zone > select "Email" type > set dimensions
2. **Add image ad items** — only image creatives work in email (HTML/Rich Media blocked by email clients)
3. **Generate zone tag** — Get Zone Tags > enter ESP's Email User ID (EUID) macro > select protocol > copy
4. **Paste into ESP template** — add the generated HTML to your email template body

### ESP EUID macros

| ESP | EUID macro |
|---|---|
| Mailchimp | `*|CAMPAIGN_UID|*-*|UNIQID|*` |
| Others | Check your ESP docs for unique subscriber ID merge tag |

### Key constraints

- **Image-only**: No Rich Media, Custom HTML, or video in email zones
- **Cached images**: Impressions only count on first load; cached opens don't re-trigger
- **Ad rotation**: Possible but may cause click redirect errors — test before enabling
- **Real-time changes**: You can update/swap ad creatives after the email is sent (the image URL resolves dynamically)
- **iOS 15 MPP**: Mail Privacy Protection pre-fetches images, inflating open/impression counts. CPC is more reliable.

## Quick-start recipes

### Recipe 1: Serve a JSON ad (server-side)

**Use case:** Request an ad from your backend and render it in your app or email template.

```bash
# cURL — GET request
curl "https://servedbyadbutler.com/adserve/;ID=171230;size=300x250;setID=373469;type=json"
```

```python
# Python
import requests

resp = requests.get("https://servedbyadbutler.com/adserve/", params={
    "ID": 171230,
    "size": "300x250",
    "setID": 373469,
    "type": "json"
})
data = resp.json()
placement = data["placements"]["placement_1"]

# Render the ad
img_url = placement["image_url"]
click_url = placement["redirect_url"]
pixel_url = placement["accupixel_url"]

# IMPORTANT: Fire the accupixel to record the impression
requests.get(pixel_url)

print(f'<a href="{click_url}"><img src="{img_url}"></a>')
```

**Gotcha:** Always fire `accupixel_url` — impressions aren't counted until you do.

### Recipe 2: Pull a performance report

**Use case:** Build a custom dashboard or export ad stats to your data warehouse.

```bash
# cURL — requires API Access add-on
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.adbutler.com/v2/reports?type=overview&summary=true&period=last_30_days"
```

```python
import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
resp = requests.get("https://api.adbutler.com/v2/reports", headers=headers, params={
    "type": "overview",
    "summary": True,
    "period": "last_30_days",
    "limit": 50
})
report = resp.json()
for row in report["data"]:
    print(f"{row['name']}: {row['impressions']} impressions, {row['clicks']} clicks, ${row['revenue']}")
```

**Gotcha:** API Access is a paid add-on. This won't work on a base plan without it.

### Recipe 3: Set up AdButler MCP for AI ad ops

**Use case:** Manage campaigns, pull reports, and automate ad operations via Claude or Cursor.

```bash
# Claude Code
claude mcp add adbutler -- npx -y @adbutler/mcp-server
```

```json
// Cursor — .cursor/mcp.json
{
  "mcpServers": {
    "adbutler": {
      "command": "npx",
      "args": ["-y", "@adbutler/mcp-server"]
    }
  }
}
```

**After setup**, use natural language:
- "Show top campaigns last 30 days"
- "Pause campaign 45291"
- "Create report for zone 1024 this week"

**Auth:** Token-based — uses your AdButler API key. Account-level permissions enforced.

## Integration patterns

### Email ad serving pattern
1. Create email zone in AdButler dashboard
2. Upload image creatives (check dimensions match zone)
3. Generate zone tag with ESP's EUID macro
4. Paste zone tag HTML into ESP template
5. Send newsletter — ads render dynamically from AdButler CDN
6. Monitor via Reporting API or dashboard

### Server-side ad serving pattern
1. Request ad via JSON API (GET or POST to `servedbyadbutler.com/adserve`)
2. Parse response — extract `image_url`, `redirect_url`, `accupixel_url`
3. Render ad in your application
4. Fire `accupixel_url` to record impression
5. Wrap image in `redirect_url` link for click tracking

### Self-serve portal pattern
1. Enable self-serve module in AdButler dashboard
2. Configure advertiser registration flow and approval workflow
3. Set up payment processing (Stripe integration)
4. Advertisers sign up, create campaigns, upload creatives
5. Publisher approves/rejects via dashboard
6. Campaigns go live on approved zones
