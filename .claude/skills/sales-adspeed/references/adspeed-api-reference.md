<!-- Source: https://www.adspeed.com/Knowledges/830/AdSpeed-API/AdSpeed-API-Overview.html -->
<!-- Additional pages: /1047/Ad.html, /1046/Zone.html, /1050/Campaign.html, /1051/Advertiser.html, /1049/Website.html, /1166/Channels.html, /1045/Publisher.html -->

# AdSpeed API Reference

API Version: 1.5.2 (build 20260514)
Base URL: `https://api.adspeed.com/`
Response Format: XML

## Authentication

### API credentials

Obtain your API key and API secret from **Tools > API for Developers** in the AdSpeed dashboard.

### Request signing (MD5)

Every request must include a `sig` parameter computed as follows:

1. Collect all parameters (excluding `sig`) as `key=value` pairs
2. Sort parameters alphabetically by key name
3. URL-encode special characters in values
4. Join with `&` to form a single string
5. Prepend your API secret to the front of the string
6. Generate a lowercase MD5 hash of the result
7. Append as `&sig=HASH`

### Entity-level token

Methods operating on a specific entity (zone, ad, advertiser, website) require a `token` parameter:
- `token` = lowercase MD5 hash of `[Entity ID][Entity Name]` concatenated

### cURL example (simplest GET)

```bash
# List all zones (AS.Zones.getList)
# Params: key, method
# Sorted string: "key=MYKEY&method=AS.Zones.getList"
# Prepend secret: "MYSECRET" + "key=MYKEY&method=AS.Zones.getList"
# MD5 hash → sig

curl "https://api.adspeed.com/?key=MYKEY&method=AS.Zones.getList&sig=COMPUTED_HASH"
```

## Rate Limits

- 600 requests per hour (across all methods)
- 2,400 requests per 24-hour period (per individual method)
- Create operations (`*.create`): 50 calls/day
- Stats operations (`*.getStats`): 50 calls/day
- Higher limits available upon request

**Retry strategy**: No documented rate limit headers. Implement exponential backoff starting at 1 second when receiving error responses.

## Pagination

List endpoints support:
- `perpage` (optional, default: 10, max: 100) — items per page
- `page` (optional, default: 1) — page number

Response includes `total`, `page`, `numpage`, `perpage` attributes.

---

## Publisher Methods

### AS.Publisher.getStats
Return stats for the publisher. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `metric` | Yes | `impressions`, `clicks`, `revenue`, `expense`, `events` |
| `period` | Yes | `hourly`, `daily`, `weekly`, `monthly` |
| `range` | No | `YYYY.MM.DD|YYYY.MM.DD` |

### AS.Publisher.getBreakdownStats
Return breakdown stats of linked entities. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `subcategory` | Yes | Currently supports `ad` |
| `metric` | Yes | `impressions`, `clicks`, `events`, `impclkctr`, `uniqueimpressions`, `uniqueclicks`, `uniqueimpclkctr` |
| `range` | Yes | `today`, `yesterday`, `last7days`, `lastmonsun`, `lastmonfri`, `last31days`, `thismo`, `lastmo` |

### AS.Publisher.getVisitorStats
Return visitor demographics. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `metric` | Yes | `countries`, `continents`, `areas`, `timezones`, `regions`, `languages`, `browsermajor`, `browserminor`, `platform`, `ua`, `screen`, `cookie` |
| `range` | Yes | `last7days`, `last31days`, `thismo`, `lastmo`, `alltime` |

---

## Zone Methods

### AS.Zones.getCounts
Return counts of active, deleted, and total zones.

No additional parameters required.

```xml
<Zones active="8" deleted="2" total="10" />
```

### AS.Zones.getList
Return the list of zones.

| Parameter | Required | Description |
|---|---|---|
| `perpage` | No (default: 10) | Items per page (max 100) |
| `page` | No (default: 1) | Page number |

```xml
<Zones total="10" page="1" numpage="1" perpage="10">
  <Zone id="1234" name="Homepage Banner" status="active" />
</Zones>
```

### AS.Zones.create
Create a new zone. Submit via POST. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `name` | Yes | Zone name (max 50 chars) |
| `secondary` | No | Secondary zone ID |
| `description` | No | Zone description |
| `type` | No | `display`, `email`, `video` |

### AS.Zone.getInfo
Return linked ads for this zone.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |

### AS.Zone.getRates
Return rates from zone media kit.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |

### AS.Zone.edit
Modify zone settings. Submit via POST.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |
| `name` | No | New name |
| `secondary` | No | Secondary zone ID |
| `optimizer` | No | `none`, `click`, `revenue`, `conversion`, `ctr` |
| `description` | No | Description |

### AS.Zone.setRate
Set/edit zone rates. BETA. Submit via POST.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |
| `dimensions` | Yes | Ad dimensions (e.g., `728x90`) |
| `ratetype` | Yes | `grosscpm`, `uniquecpm`, `grosscpc`, `uniquecpc`, `perday`, `perweek`, `permonth`, `peryear` |
| `from` | Yes | Quantity range start |
| `to` | Yes | Quantity range end |
| `rate` | Yes | Rate value |

### AS.Zone.addRestriction
Add geo/time/keyword restriction.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |
| `logic` | Yes | `and`, `or` |
| `comparison` | Yes | `show`, `hide` |

### AS.Zone.getAdTag
Return static ad serving code.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |
| `format` | No | `comprehensive`, `iframe`, `javascript`, `simplified` |

### AS.Zone.getStats
Return stats for this zone. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |
| `metric` | Yes | `impressions`, `clicks`, `revenue`, `expense`, `events` |
| `period` | Yes | `hourly`, `daily`, `weekly`, `monthly` |
| `range` | No | `YYYY.MM.DD|YYYY.MM.DD` |

### AS.Zone.getBreakdownStats
Breakdown stats by linked ads.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |
| `metric` | Yes | Same as `getStats` |
| `range` | No | `today`, `yesterday`, `last7days`, `thismo`, `lastmo` |

### AS.Zone.getVisitorStats
Visitor demographics by zone.

| Parameter | Required | Description |
|---|---|---|
| `zone` | Yes | Zone ID |
| `token` | Yes | MD5 of `[Zone ID][Zone Name]` |
| `metric` | Yes | Same as Publisher `getVisitorStats` |
| `range` | Yes | Same as Publisher `getVisitorStats` |

---

## Ad Methods

### AS.Ads.getCounts
Return counts of active, pending, deleted, and total ads.

### AS.Ads.getList
Return list of ads.

| Parameter | Required | Description |
|---|---|---|
| `perpage` | No (default: 10) | Items per page (max 100) |
| `page` | No (default: 1) | Page number |
| `status` | No | Filter by status |

### AS.Ads.createBanner
Create a banner ad. Submit via POST. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `name` | Yes | Ad name |
| `imageurl` | Yes | URL to banner image |
| `clickurl` | No | Destination URL on click |
| `width` | No | Width in pixels |
| `height` | No | Height in pixels |

### AS.Ads.createVideo
Create a VAST video ad. Submit via POST. Limit 50 calls/day.

### AS.Ads.createVASTWrapper
Create a VAST wrapper video ad. Submit via POST. Limit 50 calls/day.

### AS.Ads.createHTML
Create a rich-media/HTML ad. Submit via POST. Limit 50 calls/day.

### AS.Ads.createText
Create a text-link ad. Submit via POST. Limit 50 calls/day.

### AS.Ad.edit
Edit ad settings. Submit via POST.

| Parameter | Required | Description |
|---|---|---|
| `ad` | Yes | Ad ID |
| `token` | Yes | MD5 of `[Ad ID][Ad Name]` |
| `name` | No | New name |
| `clickurl` | No | New click URL |
| `width` | No | Width |
| `height` | No | Height |
| `status` | No | New status |
| `optimizer` | No | Optimizer type |

### AS.Ad.getAdTag
Retrieve ad serving tags for specific dimensions.

### AS.Ad.linkToZone / AS.Ad.unlinkFromZone
Associate/disassociate an ad with a zone.

| Parameter | Required | Description |
|---|---|---|
| `ad` | Yes | Ad ID |
| `token` | Yes | MD5 of `[Ad ID][Ad Name]` |
| `zone` | Yes | Zone ID |

### AS.Ad.linkToGroup / AS.Ad.unlinkFromGroup
Associate/disassociate an ad with a group.

### AS.Ad.linkToAdvertiser
Link an ad to an advertiser account.

### AS.Ad.getLinkedZones
List zones where an ad is deployed.

### AS.Ad.getRestrictions
View ad targeting rules.

### AS.Ad.addRestriction
Add geo, temporal, or keyword restrictions.

### AS.Ad.deleteRestriction
Remove targeting rules.

### AS.Ad.placeOrder
Place an advertising order. BETA.

### AS.Ad.getStats
Return impression, click, revenue metrics. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `ad` | Yes | Ad ID |
| `token` | Yes | MD5 of `[Ad ID][Ad Name]` |
| `metric` | Yes | `impressions`, `clicks`, `revenue`, `expense`, `events` |
| `period` | Yes | `hourly`, `daily`, `weekly`, `monthly` |
| `range` | No | `YYYY.MM.DD|YYYY.MM.DD` |

### AS.Ad.getVisitorStats
Visitor demographics for an ad.

### AS.Ad.getAdTagForLinkedZones
Return serving tags for all linked zones.

---

## Campaign Methods

### AS.Campaigns.getCounts
Return counts of active, deleted, and total campaigns.

```xml
<Campaigns total="1" active="1" deleted="0" />
```

### AS.Campaigns.getList
Return list of campaigns.

```xml
<Campaigns total="1" page="1" numpage="1" perpage="4">
  <Campaign id="3526" name="Sample Campaign" status="active" />
</Campaigns>
```

---

## Advertiser Methods

### AS.Advertisers.getCounts
Return counts of active, pending, deleted, and total advertisers.

### AS.Advertisers.getList
Return list of linked advertisers.

### AS.Advertisers.create
Create new advertiser. Submit via POST. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `username` | Yes | Advertiser username |
| `password` | Yes | Password |
| `fullname` | Yes | Full name |
| `email` | Yes | Email address |
| `company` | Yes | Company name |
| `companyurl` | Yes | Company website |

### AS.Advertisers.checkUsernamePassword
Validate advertiser credentials.

### AS.Advertiser.getInfo
Retrieve advertiser details.

| Parameter | Required | Description |
|---|---|---|
| `advertiser` | Yes | Advertiser ID |
| `token` | Yes | MD5 of `[Advertiser ID][Advertiser Username]` |

### AS.Advertiser.getLinkedAds
List ads associated with advertiser.

### AS.Advertiser.changePassword
Update password.

### AS.Advertiser.editContact
Modify contact information.

### AS.Advertiser.getStats
Return performance metrics. Limit 50 calls/day.

---

## Website Methods

### AS.Websites.getCounts
Return counts of websites.

### AS.Websites.getList
Return list of websites.

### AS.Website.getInfo
Return linked zones, ads, and users for a website.

| Parameter | Required | Description |
|---|---|---|
| `site` | Yes | Website ID |
| `token` | Yes | MD5 of `[Site ID][Site Name]` |

### AS.Website.getStats
Return stats for a website. Limit 50 calls/day.

| Parameter | Required | Description |
|---|---|---|
| `site` | Yes | Website ID |
| `token` | Yes | MD5 of `[Site ID][Site Name]` |
| `metric` | Yes | `impressions`, `clicks`, `revenue`, `expense`, `events` |
| `period` | Yes | `hourly`, `daily`, `weekly`, `monthly` |
| `range` | No | `YYYY.MM.DD|YYYY.MM.DD` |

---

## Channel Methods

### AS.Channels.getCounts
Return counts of channels.

### AS.Channels.getList
Return list of channels.

---

## Gaps

- No documented error response schema — error shapes unknown
- No webhook support — polling required for real-time updates
- No JSON response option — XML only
- Campaign create/edit/delete methods not documented (only getCounts and getList visible)
- Publisher-level methods limited to stats (no account management)
- Rate limit exceeded response format not documented
