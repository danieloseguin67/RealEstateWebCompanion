# Broadstreet Platform Reference

## Overview

Broadstreet is an ad manager built for local news, regional magazines, and B2B publishers who sell ads directly to advertisers. Founded in Red Bank, NJ, it's rated #1 on G2 for local/B2B publisher ad servers. Primary differentiator: purpose-built for direct-sold advertising with newsletter integration, automated reports, and sponsored content tracking — no programmatic/RTB.

## Capabilities & automation surface

| Module | What it does | Automation |
|--------|-------------|------------|
| **Display ads** | HTML5 ad templates, social content pulling (FB/IG/YouTube), zone management | API-accessible (create ads, manage zones) |
| **Newsletter ads** | Email ad zones via static code or RSS merge for MailChimp, ActiveCampaign, ConstantContact, HubSpot | UI-only (zone code generation, manual paste) |
| **Sponsored content** | Click tracking with timestamp and location data on WordPress and other platforms | WordPress plugin (auto-tracking) |
| **Reporting** | Automated client-ready PDF reports, scheduled delivery | API-accessible (data export), UI for scheduling |
| **Client dashboard** | Advertisers view their own campaign performance | UI-only |
| **WordPress plugin** | Ad placement, zone management, sponsored content tracking | Plugin-accessible |
| **CMS integrations** | WordPress, Web Publisher Pro, MetroPublisher, Newspack, Locable, January Spring, TownNews | Plugin/integration-accessible |

## Pricing, limits & plan gates

| Plan | Price | Users | Premium Ad Formats | Support | Key Features |
|------|-------|-------|-------------------|---------|-------------|
| Manual | $299/mo | 1-2 | 3 | Standard | Reporting, core ad management |
| Automatic | $399/mo | Not specified | 5 | Priority | Automated reporting |
| Enterprise | Custom | Unlimited | All | Priority SLA | Multi-tenancy, Service SLA |
| Premier | $2,999/mo | Unlimited | All | Priority SLA | Enterprise-grade continuity |

- No free plan or trial documented
- Annual discount available (amount not published)
- Valet service: $10 per 15 minutes for hands-on help

### Compared to competitors

| Feature | Broadstreet | AdButler | Epom |
|---------|------------|----------|------|
| Starting price | $299/mo | $179/mo | $250/mo |
| Target audience | Local/B2B publishers | Any publisher | Mid-market networks |
| Newsletter integration | Native (MailChimp, AC, CC, HubSpot) | Zone tags with EUID macros | Zone tags (manual) |
| RTB/Programmatic | No | Paid add-on | Free for publishers |
| Self-serve portal | No (client dashboard only) | Yes | No |
| API | Access token auth | Bearer token (paid add-on) | HMAC (included) |
| WordPress plugin | Yes (dedicated) | No native plugin | No |
| Sponsored content tracking | Yes (native) | No | No |
| Automated PDF reports | Yes | No | CSV/XLS/JSON export |

## Integrations

- **ESPs**: MailChimp, ActiveCampaign, ConstantContact, HubSpot (newsletter ad zones)
- **CMS**: WordPress (dedicated plugin), Web Publisher Pro, MetroPublisher, Newspack, Locable, January Spring, TownNews
- **Ad sales CRM**: MediaOS (integration panel)
- **No Zapier/Make** — API-only automation
- **No webhooks** documented
- **No MCP server**

## Data model

### Campaign hierarchy

```
Network (your publisher account)
  └── Advertiser (company buying ads)
        └── Campaign (ad initiative with dates, targeting)
              └── Advertisement (creative — image, HTML5, text, social pull)

Zone (ad placement on your site or newsletter)
  └── Linked to campaigns via targeting rules
```

### Key objects (JSON shapes)

#### Advertisement (from PHP SDK)
<!-- Constructed from PHP SDK docs — verify against live API -->
```json
{
  "id": 12345,
  "network_id": 100,
  "advertiser_id": 200,
  "name": "Spring Sale Banner",
  "type": "image",
  "html": "<a href='https://click.broadstreetads.com/...'><img src='https://cdn.broadstreetads.com/...' /></a>",
  "options": {
    "default_text": "",
    "image_url": "https://cdn.broadstreetads.com/ads/12345.jpg",
    "click_url": "https://advertiser.com/landing"
  }
}
```

#### Zone code (newsletter static)
```html
<!-- Broadstreet newsletter zone — position 0 -->
<a href="https://ad.broadstreetads.com/zone/ZONE_ID/click/0?*|CAMPAIGN_UID|**|UNIQID|*">
  <img src="https://ad.broadstreetads.com/zone/ZONE_ID/image/0?*|CAMPAIGN_UID|**|UNIQID|*" />
</a>

<!-- Position 1 (second ad in same newsletter) -->
<a href="https://ad.broadstreetads.com/zone/ZONE_ID/click/1?*|CAMPAIGN_UID|**|UNIQID|*">
  <img src="https://ad.broadstreetads.com/zone/ZONE_ID/image/1?*|CAMPAIGN_UID|**|UNIQID|*" />
</a>
```

**URL parameters for newsletter zones:**
- `ds=true` — daily shuffle (randomize rotation daily)
- `seed=UNIQUE_ID` — per-user shuffle (vary by subscriber, maintain consistency)
- `kw=keyword1,keyword2` + `skw=true` — soft keyword targeting
- `overflow=0` — show blank pixel instead of duplicating when zone is empty

## Quick-start recipes

### Recipe 1: Add newsletter ad zones to MailChimp

**Use case**: Serve Broadstreet ads in your MailChimp newsletter.

1. In Broadstreet dashboard, create a Zone for newsletter placement
2. Click "Get Zone Code" > select "Static" tab
3. Copy the zone code HTML
4. Add MailChimp cachebust macros to prevent Gmail image caching
5. Paste into your MailChimp template

**HTML to paste into MailChimp template:**
```html
<!-- Ad zone 1 -->
<a href="https://ad.broadstreetads.com/zone/YOUR_ZONE_ID/click/0?*|CAMPAIGN_UID|**|UNIQID|*">
  <img src="https://ad.broadstreetads.com/zone/YOUR_ZONE_ID/image/0?*|CAMPAIGN_UID|**|UNIQID|*"
       style="max-width:100%; height:auto;" />
</a>

<!-- Ad zone 2 (different zone or position 1) -->
<a href="https://ad.broadstreetads.com/zone/YOUR_ZONE_ID/click/1?overflow=0&*|CAMPAIGN_UID|**|UNIQID|*">
  <img src="https://ad.broadstreetads.com/zone/YOUR_ZONE_ID/image/1?overflow=0&*|CAMPAIGN_UID|**|UNIQID|*"
       style="max-width:100%; height:auto;" />
</a>
```

**Gotcha**: Use different position numbers (0, 1, 2) for each zone in the same newsletter. Without MailChimp merge tags for cachebusting, Gmail may cache the same image for all subscribers.

### Recipe 2: Create an advertisement via PHP SDK

**Use case**: Automate ad creation when a new sponsor signs up.

```php
<?php
require_once 'vendor/autoload.php';

// Get access token from https://my.broadstreetads.com/access-token
$access_token = 'YOUR_ACCESS_TOKEN';
$client = new Broadstreet($access_token);

$network_id = 100;       // Your network ID
$advertiser_id = 200;    // Advertiser ID

try {
    // Create an image ad
    $ad = $client->createAdvertisement(
        $network_id,
        $advertiser_id,
        'Spring Sale Banner',
        'image',
        array(
            'image_url' => 'https://cdn.example.com/spring-sale.jpg',
            'click_url' => 'https://advertiser.com/spring-sale'
        )
    );
    echo "Created ad: " . $ad->id . "\n";
    echo "HTML: " . $ad->html . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
```

**Gotcha**: The PHP SDK only documents `createAdvertisement()` in the README. Other methods exist but aren't documented — check the source code at github.com/broadstreetads/broadstreet-api-php or the full API docs at api.broadstreetads.com/docs/v1/.

### Recipe 3: Set up keyword-targeted newsletter zones

**Use case**: Show different ads based on newsletter topic.

```html
<!-- Tech section ads -->
<a href="https://ad.broadstreetads.com/zone/ZONE_ID/click/0?kw=tech,software&skw=true&*|CAMPAIGN_UID|**|UNIQID|*">
  <img src="https://ad.broadstreetads.com/zone/ZONE_ID/image/0?kw=tech,software&skw=true&*|CAMPAIGN_UID|**|UNIQID|*" />
</a>

<!-- Food section ads -->
<a href="https://ad.broadstreetads.com/zone/ZONE_ID/click/1?kw=food,restaurant&skw=true&*|CAMPAIGN_UID|**|UNIQID|*">
  <img src="https://ad.broadstreetads.com/zone/ZONE_ID/image/1?kw=food,restaurant&skw=true&*|CAMPAIGN_UID|**|UNIQID|*" />
</a>
```

**Parameters**: `kw=` sets keywords, `skw=true` enables soft matching (ads without keywords also eligible). Without `skw=true`, only ads explicitly tagged with those keywords will show.

## Integration patterns

### WordPress integration

1. Install the Broadstreet WordPress plugin from wordpress.org
2. Activate and connect to your Broadstreet account
3. Add zones via widgets, shortcodes, or template tags
4. Sponsored content tracking is automatic once the plugin is active

### Newsletter ESP integration

1. **Static code** (preferred): Get zone code from dashboard, add ESP cachebust macros, paste into template
2. **RSS merge**: Get RSS URL for zone, integrate into newsletter template (requires developer)
3. **Supported ESPs**: MailChimp, ActiveCampaign, ConstantContact, HubSpot

### API integration

- **Auth**: Access token from my.broadstreetads.com/access-token
- **Base URL**: api.broadstreetads.com/v1/ (inferred from PHP SDK and docs)
- **SDKs**: PHP (broadstreet-api-php), Ruby (broadstreet-ruby) on GitHub
- **Docs**: api.broadstreetads.com/docs/v1/ (JS-rendered — may need browser access)
