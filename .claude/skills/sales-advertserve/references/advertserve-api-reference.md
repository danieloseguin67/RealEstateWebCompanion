<!-- Source: https://www.advertserve.com/docs/latest/html/manual/api.html -->
<!-- Source: https://www.advertserve.com/docs/latest/html/manual/api_zones_create.html -->
<!-- Source: https://www.advertserve.com/docs/latest/html/manual/api_campaigns_create.html -->
<!-- Source: https://www.advertserve.com/docs/latest/html/manual/api_zones_query.html -->
<!-- Source: https://www.advertserve.com/docs/latest/html/manual/api_advertisers_create.html -->
<!-- Source: https://www.advertserve.com/developers.html -->

# AdvertServe API v5.0 Reference

## Overview

The AdvertServe API enables programmatic data manipulation and retrieval through HTTP GET/POST requests returning JSON or XML responses. It can do just about anything you can do in the control panel.

## Setup

1. Enable API: Settings > Basic > API > set "API Usage" to Enabled
2. Copy your **Secret Key** (32 characters)
3. Use HTTPS for encrypted transmission
4. Configure IP-based firewall for additional security (recommended)

## Authentication

All private API modules require a `secret` parameter containing your API key.

**Security**: Never expose the API key in client-side code. Use server-side calls only.

## Base URL Pattern

```
https://{your-server}.advertserve.com/servlet/control/api/{module}/{action}
```

## Response Formats

**XML (default)**:
```xml
<id>123</id>
```

**JSON** (add `output=json` parameter):
```json
{ "id": 123 }
```

**Error responses** return HTTP 500:
```xml
<error>The <i>Name</i> field must contain a unique value.</error>
```

## API Modules

### Public (no key required)
- **Prefetch** — ad prefetching

### Private (API key required)

| Module | Operations | Description |
|---|---|---|
| **Administrators** | Query, Create, Retrieve, Update, Delete, Recycle | Manage admin accounts |
| **Advertisers** | Authenticate, Query, Create, Retrieve, Update, Delete, Recycle + Payments (Query, Add, Update, Remove) | Manage advertiser accounts and payments |
| **Campaigns** | Query, Create, Retrieve, Update, Reset, Delete, Recycle + Media Assignments (Add, Update, Remove) | Manage campaigns and media assignments |
| **Code Wizard** | Banner (AJAX/AMP/DFP/E-mail/HTML/JS/JSP/Pixel/Prebid/Third-Party/URL/XHTML), Text, Window, Dynamic, Page Peel, Wallpaper, VAST (2.0/3.0/4.0), Action, Privacy Shield, Retargeting | Generate ad serving tags |
| **Files** | Query, Create, Retrieve, Update, Delete, Recycle | Manage creative asset files |
| **Groups** | Query, Create, Retrieve, Update, Delete, Recycle | Organize zones into groups |
| **Media** | Query, Create, Retrieve, Preview, Update, Reset, Delete, Recycle + Assets (Download, Update) | Manage creatives and asset files |
| **Publishers** | Query, Create, Retrieve, Update, Delete, Recycle | Manage publisher accounts |
| **Reports** | Accounting (Income/Expense/Profit/Summary), Executive (Custom/Forensiq/ROI/Summary), + 7 entity types × 17 report types each, Inventory (12 types) | Generate reports in XML/CSV/Excel/HTML/PDF/Text |
| **Pixels** | Query, Create, Retrieve, Update, Delete, Recycle | Manage tracking pixels |
| **Segments** | Query, Create, Retrieve, Update, Delete, Recycle | Manage audience segments |
| **Sizes** | Query, Create, Retrieve, Update, Delete, Recycle | Manage ad size definitions |
| **Stacks** | Query, Create, Retrieve, Update, Delete, Recycle | Manage stacks |
| **Themes** | Query, Create, Retrieve, Update, Delete, Recycle | Manage text ad themes |
| **Videos** | Query, Create, Retrieve, Update, Delete, Recycle | Manage video assets |
| **Zones** | Query, Create, Retrieve, Update, Delete, Recycle + Campaign Assignments (Add, Update, Remove) | Manage zones and campaign assignments |

## Key Endpoint Details

### Zones — Create

**Endpoint**: `/servlet/control/api/zones/create`

**Required parameters**:
| Parameter | Type | Rules |
|---|---|---|
| `secret` | String | Max 32 characters |
| `name` | String | Max 255 characters, must be unique |
| `group` | Integer | Existing group ID |
| `type` | Integer | 1=Banner, 2=Text, 3=Window, 4=Dynamic, 5=Page Peel, 6=Wallpaper, 7=VAST Video, 8=VAST Overlay |

**Optional parameters** (selection):
- `size` (Integer): Required for banner type; existing size ID
- `desktop` (Boolean): Default true
- `phone`, `tablet` (Integer): Responsive zone overrides (0 or existing zone ID)
- `targeting` (CSV Integer): Targeting codes 1-11
- `browsers` (CSV Integer): Browser type codes 0-28
- `view_limit`, `view_timeout` (Integer): Frequency capping
- `refresh`, `refresh_interval`, `refresh_limit` (Boolean/Integer): Auto-refresh settings
- `bidding_header` (Boolean): Enable Prebid.js header bidding
- `bidding_category` (String): IAB OpenRTB category
- `status` (Boolean): Default true
- `notes` (String): Max 65,535 characters
- `publishers` (CSV Integer): Existing publisher IDs
- `output` (String): "xml" or "json"

**Example**:
```
GET /servlet/control/api/zones/create?secret=KEY&name=Homepage+728x90&group=1&type=1&size=3&output=json
```

**Response**: `{ "id": 123 }`

### Zones — Query

**Endpoint**: `/servlet/control/api/zones/query`

**Required**: `secret`

**Optional filters**: `id`, `name` (max 80 chars), `group`, `type`, `size`, `status`, `campaign`, `publisher`, `recycle`

**Example**:
```
GET /servlet/control/api/zones/query?secret=KEY&output=json&name=example
```

### Zones — Campaign Assignments

**Add**: `/servlet/control/api/zones/campaigns/add` — links a campaign to a zone at a specific tier
**Update**: `/servlet/control/api/zones/campaigns/update` — changes assignment settings
**Remove**: `/servlet/control/api/zones/campaigns/remove` — unlinks a campaign from a zone

### Campaigns — Create

**Endpoint**: `/servlet/control/api/campaigns/create`

**Required parameters**:
| Parameter | Type | Example |
|---|---|---|
| `secret` | String | a78bf24c5a23581aceba1c5f51ac4cad |
| `name` | String | ACME 468x60 Banner |
| `advertiser` | Integer | 123 (existing advertiser ID) |
| `type` | Integer | 1=Banner, 2=Text, 3=Window, 4=Dynamic, 5=Page Peel, 6=Wallpaper, 7=VAST Video, 8=VAST Overlay |
| `schedule_start_date` | Date | 2026-06-01 (yyyy-MM-dd) |

**Optional parameters** (selection):
- Schedule: `start_hour`, `start_minute`, `stop_date`, `stop_hour`, `stop_minute`, `weekdays` (CSV), `hours` (CSV)
- Limits: `limits_maxviews`, `limits_maxclicks`, `limits_maxactions`, `limits_daily_views`, `limits_daily_clicks`, `limits_daily_actions`
- Capping: `capping_view_limit`, `capping_view_timeout`, `capping_click_limit`, `capping_click_timeout`
- Targeting: `geography_*` (continent/country/state/city/postal/dma/timezone), `keywords_target`, `keywords_block`, `software_*` (browser/OS/devices)
- Media: `media` (CSV Integer), `zones` (CSV Integer)
- Rates: `rates_*` (advertiser/publisher CPM/CPC/CPA/flat)
- Alerts: email alert configuration for performance triggers

**Example**:
```
GET /servlet/control/api/campaigns/create?secret=KEY&name=Sponsor+Banner&advertiser=10&type=1&schedule_start_date=2026-06-01&output=json
```

**Response**: `{ "id": 789 }`

### Advertisers — Create

**Endpoint**: `/servlet/control/api/advertisers/create`

**Required parameters**:
| Parameter | Type | Rules |
|---|---|---|
| `secret` | String | Max 32 chars |
| `name` | String | Max 80 chars |
| `username` | String | Max 16 alphanumeric |
| `password` | String | 6-16 chars |
| `info_name` | String | Max 48 chars (contact name) |
| `info_email` | Email | Max 64 chars (contact email) |

**Optional parameters** (selection):
- `basis` (String): "standard" or "budget"
- `status`, `reminders` (Boolean)
- Contact info: `info_company`, `info_title`, `info_website`, `info_phone`, `info_mobile`
- Additional contacts: `contacts_name[1-5]`, `contacts_email[1-5]`, `contacts_phone[1-5]`
- Permissions: CSV list of specific access rights
- Prebid: `prebid_adapter`, `prebid_adjustment`, `prebid_floor`
- Google Analytics: `ga`, `ga_source`, `ga_medium`

**Response**: `{ "id": 456 }`

### Reports

10 report categories, each with multiple sub-types:
- **Accounting**: Income, Expense, Profit, Summary
- **Executive**: Custom, Forensiq, ROI, Summary
- **Entity reports** (Advertisers, Campaigns, General, Groups, Media, Publishers, Zones): 17 sub-types each including Conversions, Daily, Geography, Keywords, Viewability
- **Inventory**: 12 types (Advertiser, Auction, Campaign, Daily, Hourly, Media, Pageviews, Publisher, Refresh, Size, Video, Zone)

Export formats: XML, CSV, Excel, HTML, PDF, Text

### Code Wizard — Banner — E-mail

**Module**: Code Wizard > Banner > E-mail

Generates static IMG-based ad tags for email newsletters. No JavaScript — compatible with all email clients and ESPs.

**Available code types per ad format**:
- **Banner**: AJAX, AMP, DFP, **E-mail**, HTML, JavaScript, JSP, Pixel, Prebid, Third-Party, URL, XHTML
- **Text**: AJAX, HTML, JavaScript, JSP, Third-Party, URL, XHTML
- **VAST**: VAST 2.0, 3.0, 4.0 tags
- **Action**: AJAX, HTML, URL, XHTML
- **Dynamic/Page Peel/Wallpaper/Window**: AJAX, HTML, JavaScript, JSP, Third-Party, URL, XHTML

## Compatible Languages

C#, ColdFusion, Java, JavaScript, .NET, Perl, PHP, Python, Ruby, Scala — any language that can make HTTP requests and parse JSON/XML.

## Bulk Operations Example (Perl)

From the official docs — reading themes from a file and creating them in bulk:
```perl
#!/usr/bin/perl
use LWP::Simple;

open(FILE, "themes.txt") || die("Could not open file!");
my @data = <FILE>;
close(FILE);

foreach my $line (@data) {
    chomp($line);
    my @fields = split(/\t/, $line);
    my $url = "https://your-server.advertserve.com/servlet/control/api/themes/create?" .
              "secret=YOUR_KEY&name=" . $fields[0] . "&font=" . $fields[1];
    my $response = get($url);
    print "Created: $fields[0] -> $response\n";
}
```

## Limitations

- No webhooks or push notifications — must poll for changes
- No rate limit published in documentation (use reasonable request pacing)
- No SDK provided — use raw HTTP requests
- No MCP server
- No Zapier/Make integration
- API key must be kept server-side only
