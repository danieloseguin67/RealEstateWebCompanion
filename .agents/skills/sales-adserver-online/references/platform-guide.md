# Adserver.Online Platform Reference

## Overview

Adserver.Online is a cloud-hosted ad tech platform for building and running ad networks, ad serving, and ad tracking. Targets publishers, advertisers, and ad network operators. Key differentiator: competitive pricing ($199/mo for 10M requests with RTB, email, video, and API access), multicurrency bidding, and ad network builder features.

## Capabilities & automation surface

| Module | Description | Access |
|---|---|---|
| Campaigns | CPM/CPC/CPA/CPUC/CPUM pricing, budget limits, scheduling, frequency capping, throttling | API-accessible |
| Ads (Banners) | Image, HTML5 ZIP, native, video (VAST), popup, direct link, web-push, email banners | API-accessible |
| Zones | Display, email, video zone types, auction types, floor rates, revenue models | API-accessible |
| Sites | Publisher site management, URL verification, category assignment | API-accessible |
| Users | Publisher/advertiser/manager accounts, balances, role management | API-accessible |
| Targeting | Geo (country/region/city), device/OS/browser, carrier/ISP, language, custom targeting, retargeting | API-accessible (campaign fields) |
| Programmatic (RTB) | OpenRTB decisioning endpoints, Prebid adapter, XML/JSON feed support | Premium+ plan, UI + API |
| Statistics | 30+ grouping dimensions, date range queries, advertiser/publisher/campaign/zone breakdowns | API-accessible |
| Payments/Payouts | Publisher payouts, advertiser payments, transaction management | API-accessible |
| White-label | Custom domains, UI branding, data center selection (EU/US) | Ultimate plan, UI-only |
| Email ads | Image-only banners in newsletters, ESP macro support | Premium+ plan, UI + API |
| Retargeting | Audience segments, pixel-based tracking | Premium+ plan, UI-only setup |
| Auto-optimization | Traffic quality filters, lazy loading, delivery pacing, zone refreshing | Premium+ plan, UI-only |
| Conversion tracking | Conversion pixels, CPA optimization | API-accessible |
| Power BI | Data warehouse integration | Ultimate plan, UI-only |

## Pricing, limits & plan gates

| Feature | Starter ($49/mo) | Premium ($199/mo) | Ultimate ($599/mo) |
|---|---|---|---|
| Ad requests included | 1M | 10M | 50M |
| Image banners | Yes | Yes | Yes |
| HTML5 ZIP banners | Yes | Yes | Yes |
| Native ads | Yes | Yes | Yes |
| Video banners (VAST) | No | Yes | Yes |
| Email banners | No | Yes | Yes |
| Web-push notifications | No | Yes | Yes |
| Programmatic (OpenRTB) | No | Yes | Yes |
| Prebid adapters | No | No | Yes |
| Google RTB | No | No | Yes |
| API access | No | Yes | Yes |
| Custom targeting | No | Yes | Yes |
| Retargeting | No | Yes | Yes |
| Auto-optimization | No | Yes | Yes |
| Traffic quality filters | No | Yes | Yes |
| White-label | No | No | Yes |
| Manager accounts | No | No | Yes |
| Data center selection | No | No | Yes |
| SLA | None | None | 99.99% |
| File storage | 0.5GB | 5GB | 10GB |
| User accounts | 100 | 3,000 | Unlimited |
| Data retention | 12 months | 18 months | 30 months |

**Rate limit**: 100 requests per minute per API token (Premium+ only).

**Free trial**: 14 days, no credit card required.

**Overage**: Not documented — contact support for overage pricing.

## Integrations

- **Programmatic**: OpenRTB endpoints (Premium+), Prebid adapter (Ultimate), XML/JSON feed support
- **ESPs**: Email ad code generator supports popular ESPs with built-in macros. Custom option available for in-house systems.
- **Analytics**: Power BI integration (Ultimate). Report export via API.
- **No iPaaS**: No native Zapier, Make, or n8n connectors. No webhooks. API-only automation.
- **No MCP server**: No Claude/Cursor integration.

## Data model

### Campaign object

```json
{
  "id": 123,
  "name": "Summer Sale Banner",
  "idadvertiser": 456,
  "idpricemodel": 1,
  "rate": 2.50,
  "budget_total": 5000,
  "budget_daily": 100,
  "start_date": "2026-06-01",
  "finish_date": "2026-08-31",
  "th_mode": 1,
  "fc_counter": 5,
  "fc_mode": 1,
  "fc_limit": 3600,
  "geo": [6252001],
  "os": ["windows", "macos"],
  "tier": 20
}
```
<!-- Constructed from docs — verify against live API -->

**Price model IDs**: 1=CPM, 2=CPC, 3=CPA, 4=CPUC, 5=CPUM, 6=CPV

**Throttling modes**: 1=spend evenly, 2=front-loaded, 3=back-loaded, 4=accelerated, 5=unlimited

### Ad object

```json
{
  "id": 789,
  "idcampaign": 123,
  "idformat": "AdBannerImage",
  "details": {
    "idsize": "728x90",
    "file": "base64-encoded-image-data"
  },
  "url": "https://example.com/landing"
}
```
<!-- Constructed from docs — verify against live API -->

**Ad formats**: AdBannerImage, AdBannerHtml, AdBannerZip, AdBannerNative, AdBannerVideo, AdVastLinear, AdLink, AdPopup, AdPush

### Zone object

```json
{
  "id": 101,
  "idsite": 50,
  "idformat": "display",
  "name": "Header Banner",
  "idsize": "728x90",
  "idauctiontype": 1,
  "idrevenuemodel": 1,
  "revenue_rate": 1.50
}
```
<!-- Constructed from docs — verify against live API -->

**Auction types**: 0=none, 1=first-price, 2=second-price, 3=fixed

**Revenue models**: 1=CPM, 2=CPC, 3=CPA, 4=flat

### Stats response

```json
{
  "date": "2026-05-20",
  "impressions": 15000,
  "clicks": 250,
  "ctr": 1.67,
  "revenue": 37.50,
  "cost": 25.00
}
```
<!-- Constructed from docs — verify against live API -->

## Email newsletter ad setup

### Requirements
- Premium plan ($199/mo) or higher
- Image-only banners (JPG, GIF, PNG)
- ESP that supports merge tags for unique message IDs

### Step-by-step

1. **Create a campaign** with an image banner creative
2. **Create a banner zone** for the newsletter placement
3. **Select "Email" code type** on the zone page
4. **Choose your ESP** from the dropdown (or Custom for in-house)
5. **Copy the generated code** into your newsletter template

### Generated email ad code

```html
<a href="https://track.domain/email/clk?uid=&zid=xxx&cs=asd">
  <img src="https://srv.domain/email/img?uid=&zid=xxx&cs=asd">
</a>
```

The `uid=` parameter must contain a unique per-message ID via your ESP's merge tag macro.

### Custom attributes for targeting

Append custom attributes to the image URL for segment-based ad selection:

```html
<img src="https://srv.domain/email/img?uid={MERGE_TAG}&zid=xxx&cs=asd&attr[zipcode]=10001&attr[tier]=premium">
```

Use `{attr.x}` placeholders in ad landing page URLs to pass attributes through.

### Limitations in email
- No frequency capping (email clients don't support cookies)
- No location/device targeting (image proxying hides user data)
- No visitor-based features
- Requires external ESP — not for standard email clients (Gmail compose, Outlook)

## Quick-start recipes

### Recipe 1: Create a campaign with an image banner via API

```bash
# Create a campaign
curl -X POST https://api.adsrv.net/v2/campaign \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Newsletter Banner Q3",
    "idadvertiser": 456,
    "idpricemodel": 1,
    "rate": 3.00,
    "budget_daily": 50,
    "start_date": "2026-07-01",
    "finish_date": "2026-09-30"
  }'

# Create an image banner ad for the campaign
curl -X POST "https://api.adsrv.net/v2/ad?idformat=AdBannerImage" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "idcampaign": 123,
    "name": "Summer Banner 728x90",
    "url": "https://example.com/promo",
    "details": {
      "idsize": "728x90",
      "file": "BASE64_ENCODED_IMAGE"
    }
  }'
```

```python
import requests
import base64

API = "https://api.adsrv.net/v2"
HEADERS = {"Authorization": "Bearer YOUR_TOKEN"}

# Create campaign
campaign = requests.post(f"{API}/campaign", headers=HEADERS, json={
    "name": "Newsletter Banner Q3",
    "idadvertiser": 456,
    "idpricemodel": 1,  # CPM
    "rate": 3.00,
    "budget_daily": 50,
    "start_date": "2026-07-01",
    "finish_date": "2026-09-30",
}).json()

# Create image banner ad
with open("banner_728x90.png", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode()

ad = requests.post(f"{API}/ad", headers=HEADERS, params={"idformat": "AdBannerImage"}, json={
    "idcampaign": campaign["id"],
    "name": "Summer Banner 728x90",
    "url": "https://example.com/promo",
    "details": {"idsize": "728x90", "file": img_b64},
}).json()

print(f"Campaign {campaign['id']}, Ad {ad['id']} created")
```

### Recipe 2: Pull daily stats for all campaigns

```bash
curl -G https://api.adsrv.net/v2/stats \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --data-urlencode "dateBegin=2026-05-01" \
  --data-urlencode "dateEnd=2026-05-25" \
  --data-urlencode "group=campaign"
```

```python
import requests

API = "https://api.adsrv.net/v2"
HEADERS = {"Authorization": "Bearer YOUR_TOKEN"}

stats = requests.get(f"{API}/stats", headers=HEADERS, params={
    "dateBegin": "2026-05-01",
    "dateEnd": "2026-05-25",
    "group": "campaign",
}).json()

for row in stats:
    print(f"Campaign {row.get('campaign')}: {row.get('impressions')} imps, "
          f"{row.get('clicks')} clicks, ${row.get('revenue', 0):.2f} revenue")
```

**Pagination**: Check `X-Pagination-Total-Count` and `X-Pagination-Page-Count` response headers. Request next page with `?page=2`.

**Rate limits**: 100 req/min. Check `X-Rate-Limit-Remaining` header. Back off when near zero.

### Recipe 3: Create a zone and assign ads

```bash
# Create a zone
curl -X POST "https://api.adsrv.net/v2/zone?idsite=50&idformat=display" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Header Leaderboard",
    "idsize": "728x90",
    "idauctiontype": 1,
    "idrevenuemodel": 1,
    "revenue_rate": 2.00
  }'

# Assign ad to zone
curl -X POST https://api.adsrv.net/v2/ad/assign \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"idad": 789, "idzone": 101}'
```

## Integration patterns

### API token scopes

Adserver.Online uses three token types with different endpoint access:

| Token type | Accessible endpoints | Use case |
|---|---|---|
| Owner | `/user`, `/campaign`, `/ad`, `/site`, `/zone`, `/stats`, `/payment`, `/payout`, `/transaction`, `/referral`, `/dict` | Full platform management |
| Publisher | `/publish/site`, `/publish/zone`, `/publish/stats`, `/publish/payout`, `/publish/transaction`, `/publish/dict` | Publisher self-service |
| Advertiser | `/advert/campaign`, `/advert/ad`, `/advert/stats`, `/advert/dict` | Advertiser self-service |

**Owner impersonation**: Add `?asUser={id}` to any owner endpoint to act on behalf of a specific user.

### Batch data pipeline

1. Pull stats daily via `GET /stats` with `group=day`
2. Paginate using `X-Pagination-*` headers
3. Store in your data warehouse
4. Rate limit: 100/min — for large date ranges, batch into weekly chunks with 1-second delays

### Error handling

- `400`: Input validation error — check `FormErrorResponse` body for field-level errors
- `401`: Invalid or missing Bearer token
- `404`: Resource not found
- `429`: Rate limit exceeded — back off and retry after `X-Rate-Limit-Reset` seconds

## Competitor comparison

| Feature | Adserver.Online | AdButler | Epom | AdvertServe |
|---|---|---|---|---|
| Starting price | $49/mo (1M) | $179/mo (1M) | $250/mo | $299/mo (2M) |
| Price per 10M | $199/mo | $682/mo | ~$250/mo | ~$449/mo |
| Email ad zones | Yes (Premium+) | Yes (all plans) | Yes (all plans) | Yes (all plans) |
| API access | Premium+ | Paid add-on | All plans | All plans |
| RTB/Programmatic | Premium+ | Yes | Yes (free for pubs) | Via Prebid |
| Self-serve portal | No | Yes | No | No |
| White-label | Ultimate ($599) | Paid add-on | Premium package | All plans |
| MCP server | No | Yes | No | No |
| Webhooks | No | No | No | No |
| Video ads (VAST) | Premium+ | Yes | Yes | Yes |
| Free trial | 14 days | 14 days | 14 days | 45 days |
