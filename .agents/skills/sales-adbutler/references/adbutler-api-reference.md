<!-- Source: https://www.adbutler.com/docs/api/ (JS-rendered Redoc — partial extraction) -->
<!-- Source: https://www.adbutler.com/help/article/json-ad-tag-api -->
<!-- Source: https://www.adbutler.com/help/article/reports-api -->
<!-- Source: https://www.adbutler.com/help/article/accessing-adbutler-api -->
<!-- Source: https://adbutler.com/mcp/ -->

# AdButler API Reference

## Authentication

**Management API:** Bearer token authentication.

```
Authorization: Bearer YOUR_API_KEY
```

**How to get an API key:**
1. Add the **API Access add-on** to your subscription (paid add-on on all plans)
2. Navigate to Settings > API in your dashboard
3. Create a new API key
4. Optionally whitelist specific IP addresses

**Client libraries:** PHP (`adbutler/adbutler-php`), Node.js (`adbutler/adbutler-node`)

**Ad Serving API:** No authentication required — access controlled via zone configuration.

---

## Management API

**Base URL:** `https://api.adbutler.com/v2/`

### Endpoints (known)

The full endpoint list is rendered via Redoc (JS) and could not be fully extracted. The following are confirmed from documentation and help articles:

| Method | Path | Description |
|---|---|---|
| GET | `/v2/reports` | Pull performance reports |
| GET | `/v2/reports?type=overview` | Overview report with summary stats |
| GET | `/v2/reports?type=zone` | Zone-level report |
| POST | `/v2/self-serve/customers` | Create a self-serve customer |
| Various | `/v2/publishers/...` | Publisher CRUD |
| Various | `/v2/zones/...` | Zone CRUD |
| Various | `/v2/advertisers/...` | Advertiser CRUD |
| Various | `/v2/campaigns/...` | Campaign CRUD |
| Various | `/v2/banners/...` | Banner/ad item CRUD |

### Reporting API

**Endpoint:** `GET https://api.adbutler.com/v2/reports`

**Required parameters:**
- `type` — Data subject: `"overview"`, `"zone"`, `"advertiser"`, `"campaign"`, etc.

**Optional parameters:**
- `summary` — Boolean, include impressions/clicks/revenue summary
- `details` — Boolean, include backend setup info
- `breakdown` — Boolean, separate data per ad item
- `financials` — Boolean, include cost/profit metrics (Standard+ plan)
- `limit` — Records per request (default: 10)
- `offset` — Skip records for pagination
- `period` — Time period filter
- `preset` — Preset time range
- `timezone` — Timezone for report data

**Response shape:**
```json
{
  "object": "report",
  "url": "/v2/reports",
  "data": [
    {
      "id": 12345,
      "name": "Zone Name",
      "impressions": 45200,
      "clicks": 892,
      "ctr": 1.97,
      "ecpm": 12.50,
      "conversions": 15,
      "revenue": 565.00
    }
  ],
  "meta": {
    "total": 1
  }
}
```

### Pagination

Offset-based: use `limit` and `offset` parameters.

```
GET /v2/reports?type=zone&limit=25&offset=50
```

### Rate limits

Not publicly documented. No rate limit headers confirmed.

### Error responses

Not fully documented. Standard HTTP status codes expected (401 Unauthorized, 403 Forbidden, 404 Not Found).

---

## Ad Serving API (JSON)

**Base URL:** `https://servedbyadbutler.com/adserve`

Supports both GET and POST. No authentication required.

### GET request

```
GET https://servedbyadbutler.com/adserve/;ID={zoneID};size={WxH};setID={setID};type=json
```

### POST request

```bash
curl -X POST https://servedbyadbutler.com/adserve \
  -H "Content-Type: application/json" \
  -d '{
    "ID": 171230,
    "size": "300x250",
    "setID": 373469,
    "type": "json",
    "pid": "123456",
    "place": 0
  }'
```

### Request parameters

| Parameter | Required | Description |
|---|---|---|
| `ID` | Yes | Zone identifier |
| `size` | Yes | Ad dimensions (e.g., "300x250") |
| `setID` | Yes | Set identifier |
| `type` | Yes | Must be `"json"` |
| `pid` | No | Page ID for unique delivery tracking |
| `place` | No | Position count (for multiple zones on same page) |
| `kw` | No | Keywords for targeting (comma-separated) |
| `referrer` | No | URL-encoded page URL |
| `ip` | No | IPv4 for geographic targeting |
| `ua` | No | User agent string (URL-encoded) |
| `sw` | No | Screen width |
| `sh` | No | Screen height |
| `spr` | No | Screen pixel ratio |
| `rf` | No | Include `is_redirectable` (use `;rf=1`) |
| `click` | No | Click tracking macro (must be last param) |
| `_abdk[]` | No | Data keys for targeting (GET) |
| `_abdk_json` | No | Data keys for targeting (POST, JSON object) |
| `clickmode` | No | Set to `callback` for callback-based click tracking |

### Response format

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

**Key fields:**
- `image_url` + `redirect_url` — for basic clickable image ad
- `body` — contains markup for Rich Media or Custom HTML ads
- `accupixel_url` — **MUST be called** before AdButler records an impression
- `tracking_pixel` — optional additional tracking
- `refresh_url` — URL to request next ad (for rotation)

---

## Self-Serve API

**Base URL:** `https://api.adbutler.com/v2/self-serve/`

Uses draft versioning system for campaign management. Customer endpoint:

```
POST https://api.adbutler.com/v2/self-serve/customers
```

Full Self-Serve API rendered via Redoc — endpoints could not be fully extracted.

---

## MCP Server

**Package:** `@adbutler/mcp-server`
**GitHub:** https://github.com/adbutler/mcp-server

### Setup

```bash
# Claude Code
claude mcp add adbutler -- npx -y @adbutler/mcp-server

# Cursor — add to .cursor/mcp.json
{
  "mcpServers": {
    "adbutler": {
      "command": "npx",
      "args": ["-y", "@adbutler/mcp-server"]
    }
  }
}
```

### Capabilities

- Run performance reports
- Update campaigns (pause, adjust budgets)
- Manage zones and creatives
- Query performance data
- Build custom analytics

### Authentication

Token-based — uses your AdButler API key. Account-level permissions enforced.

### Compatible clients

Claude Code, Cursor, CLI tools, custom AI agents, internal LLM platforms.

---

## SDKs

| SDK | Repository | Notes |
|---|---|---|
| PHP | `github.com/adbutler/adbutler-php` | Management API bindings |
| Node.js | `github.com/adbutler/adbutler-node` | Management API bindings |
| iOS (MRAID) | `github.com/adbutler/adbutler-ios-mraid-sdk` | Mobile ad rendering |
| Android (MRAID) | `github.com/adbutler/adbutler-android-mraid-sdk` | Mobile ad rendering |
| iOS | `github.com/adbutler/adbutler-ios-sdk` | Basic iOS SDK |
| Android | `github.com/adbutler/adbutler-android-sdk` | Basic Android SDK |
| WordPress | `wp-plugins/adbutler` | Plugin for zone tag insertion |

## Gaps

- Full management API endpoint list unavailable (Redoc JS-rendered)
- No webhook documentation found
- No Zapier or Make integration available
- Rate limits not publicly documented
- Self-Serve API endpoints not fully extractable
- Error response shapes not documented
