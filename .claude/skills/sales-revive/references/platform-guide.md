# Revive Adserver Platform Reference

## Overview

Revive Adserver is the world's most popular free, open-source ad serving system (GPL v2+). Originally forked from OpenX Source (itself from phpAdsNew), it enables publishers, ad networks, and advertisers to serve, manage, and track ads across websites, apps, and video players. Self-hosted on your own server with zero platform fees. Hosted edition available at revive-adserver.net starting at $10/mo.

## Capabilities & automation surface

| Module | What it does | Automation |
|--------|-------------|------------|
| **Campaign management** | Create advertisers, campaigns, banners with budgets, dates, priorities | XML-RPC API |
| **Zone management** | Define ad placements on publisher sites (banner, interstitial, popup, email) | XML-RPC API |
| **Banner serving** | Serve image, HTML, URL-redirect, and text banners | XML-RPC API (view method) |
| **Email/newsletter zones** | Serve image-only banners in email newsletters (no JS, no cookies) | XML-RPC API (zone management) |
| **Geo-targeting** | Target by continent, country, region, city via MaxMind GeoLite2 | UI + delivery rules |
| **Frequency capping** | Limit impressions per visitor per campaign or per session | UI + delivery rules |
| **URL targeting** | Match page URLs with regex or string patterns | UI + delivery rules |
| **Time/date targeting** | Schedule by day of week, hour, date range | UI + delivery rules |
| **Statistics & reporting** | Impressions, clicks, CTR, conversions, revenue, eCPM — daily/hourly granularity | XML-RPC API |
| **Conversion tracking** | Track post-click and post-view conversions with trackers and variables | XML-RPC API |
| **Multi-advertiser** | Manage multiple advertisers and agencies from one installation | XML-RPC API |
| **Plugin system** | Extend with plugins (geo-targeting, frequency capping, multiple email ads, etc.) | Plugin API |

**Built-in XML-RPC v2 API** at `{your-server}/api/v2/xmlrpc/`. Third-party REST API plugin available (paid). No webhooks, no Zapier/Make, no MCP server.

## Pricing, limits & plan gates

### Self-hosted (free)

| Item | Details |
|------|---------|
| **License** | GPL v2+ — free forever |
| **Cost** | $0 (you pay for hosting) |
| **Limits** | None — limited only by your server capacity |
| **Requirements** | PHP 7.2.5+ (v5.x) or PHP 8+ (v6.x), MySQL/MariaDB/PostgreSQL, Apache/Nginx |
| **Updates** | Manual — download new release and run upgrade wizard |

### Hosted edition (revive-adserver.net)

| Plan | Price | Ad requests/mo | Overage rate |
|------|-------|----------------|-------------|
| **Lite** | $10/mo | 1M | $20/1M |
| **Plus** | $20/mo | 2M | $20/1M |
| **Premium** | $50/mo | 5M | $20/1M |
| **Super** | ~$100/mo | ~10M | $20/1M |
| **Ultimate** | $150/mo | 15M | $10/1M |
| **Elite** | $175/mo min | Custom | $10/1M |

Base rate: $0.01 CPM ($10/1M ad requests) across all plans. All plans include DashiX Dashboard plugin.

### Compared to competitors

| Feature | Revive (self-hosted) | Revive (hosted) | AdButler | Epom | AdPlugg |
|---------|---------------------|-----------------|----------|------|---------|
| Starting price | Free | $10/mo | $179/mo | $149/mo | Free |
| Hosting | Self-managed | Managed | Managed | Managed | Cloud |
| Email ad zones | Yes (image only) | Yes (image only) | Yes (all plans) | Yes (all plans) | Business ($79/mo) |
| API | XML-RPC (built-in) | XML-RPC (built-in) | REST + MCP | REST | No |
| Geo-targeting | Yes (MaxMind) | Yes | Yes | Yes | Business only |
| Frequency capping | Yes | Yes | Yes | Yes | Business only |
| Programmatic/RTB | No | No | Paid add-on | Free for publishers | No |
| Self-serve portal | No | No | Yes | No | No |
| WordPress plugin | Community plugins | Community plugins | No native | No native | Yes (official) |
| Open source | Yes (GPL v2) | No (managed) | No | No | No |

## Data model

### Campaign hierarchy

```
Installation (your Revive server)
  └── Agency (optional — multi-agency management)
        └── Advertiser (the brand buying ads)
              └── Campaign (budget, dates, priority, delivery rules)
                    └── Banner (creative — image, HTML, URL redirect, text)
                          ├── Targeting rules (geo, URL, time, frequency)
                          └── Tracker (conversion tracking)
  └── Publisher (the site showing ads)
        └── Zone (ad placement — banner, interstitial, popup, email)
              └── Linked banners/campaigns
```

### Zone types

| Zone type | Description | Use case |
|-----------|-------------|----------|
| **Banner** | Standard display ad zone | Website sidebar, header, in-article |
| **Interstitial** | Full-page ad between page loads | High-impact branding |
| **Popup** | Opens in a new window | Legacy format |
| **Email/Newsletter** | Image-only, no JS/cookies | Newsletter ad placement |

### Email zone invocation code

<!-- Constructed from documentation and forum posts — verify against live installation -->
```html
<!-- Revive Adserver Email Zone Tag -->
<a href="{REVIVE_URL}/ck.php?n={ZONE_ID}" target="_blank">
  <img src="{REVIVE_URL}/avw.php?zoneid={ZONE_ID}&n={RANDOM}" border="0" alt="" />
</a>
```

**Key constraints:**
- Only one active banner per email zone (without Multiple Ads plugin)
- Image banners only — no text, no HTML banners
- No JavaScript, no cookies — tracking by image pixel only
- Click tracking via `ck.php` redirect
- Use `&n={RANDOM}` or `&cb={CACHEBUSTER}` to prevent email client caching

## API reference

### Built-in XML-RPC v2 API

**Endpoint**: `https://{your-server}/api/v2/xmlrpc/`
**Auth**: Base64-encoded `username:password` in XML-RPC struct
**Protocol**: XML-RPC (not REST)

#### Authentication

```
Method: ox.logon
Parameters: { username: string, password: string }
Returns: sessionId (string)

Method: ox.logoff
Parameters: { sessionId: string }
Returns: boolean
```

#### Services (11 total, ~80+ methods)

| Service | Key methods |
|---------|------------|
| **Advertiser** | addAdvertiser, modifyAdvertiser, deleteAdvertiser, getAdvertiser, getAdvertiserListByAgencyId, advertiserDailyStatistics, advertiserHourlyStatistics, advertiserCampaignStatistics, advertiserBannerStatistics, advertiserPublisherStatistics, advertiserZoneStatistics |
| **Agency** | addAgency, modifyAgency, deleteAgency, getAgency, getAgencyList, agencyDailyStatistics, agencyHourlyStatistics, agencyAdvertiserStatistics, agencyCampaignStatistics, agencyBannerStatistics, agencyPublisherStatistics, agencyZoneStatistics |
| **Banner** | addBanner, modifyBanner, deleteBanner, getBanner, getBannerListByCampaignId, getBannerTargeting, setBannerTargeting, bannerDailyStatistics, bannerHourlyStatistics, bannerPublisherStatistics, bannerZoneStatistics |
| **Campaign** | addCampaign, modifyCampaign, deleteCampaign, getCampaign, getCampaignListByAdvertiserId, campaignDailyStatistics, campaignHourlyStatistics, campaignBannerStatistics, campaignPublisherStatistics, campaignZoneStatistics, campaignConversionStatistics |
| **Channel** | addChannel, modifyChannel, deleteChannel, getChannel, getChannelListByAgencyId, getChannelListByWebsiteId, getChannelTargeting, setChannelTargeting |
| **Logon** | logon, logoff |
| **Publisher** | addPublisher, modifyPublisher, deletePublisher, getPublisher, getPublisherListByAgencyId, publisherDailyStatistics, publisherHourlyStatistics, publisherAdvertiserStatistics, publisherCampaignStatistics, publisherBannerStatistics, publisherZoneStatistics |
| **Tracker** | addTracker, modifyTracker, deleteTracker, getTracker, getTrackerListByAccountId |
| **User** | addUser, modifyUser, deleteUser, getUser, getUserListByAccountId, updateSsoUserId, updateUserEmailBySsoId |
| **Variable** | addVariable, modifyVariable, deleteVariable, getVariable, getVariableListByTrackerId |
| **Zone** | addZone, modifyZone, deleteZone, getZone, getZoneListByPublisherId, linkBanner, linkCampaign, unlinkBanner, unlinkCampaign, generateTags, zoneDailyStatistics, zoneHourlyStatistics, zoneAdvertiserStatistics, zoneCampaignStatistics, zoneBannerStatistics |

#### Statistics response structure

All statistics methods return arrays of structs with these fields:
- `day` (date), `hour` (int, hourly only)
- `requests` (int), `impressions` (int), `clicks` (int)
- `revenue` (float), `conversions` (int, where applicable)

#### PHP example (using Packagist wrapper)

```bash
composer require tafoyaventures/revive-xmlrpc
```

```php
<?php
require 'vendor/autoload.php';

use OpenAdsV2ApiXmlRpc;

$api = new OpenAdsV2ApiXmlRpc('https://ads.example.com/api/v2/xmlrpc/', 'admin', 'password');

// Create an advertiser
$advertiserId = $api->addAdvertiser([
    'agencyId' => 1,
    'advertiserName' => 'Acme Corp',
    'emailAddress' => 'ads@acme.com',
]);

// Create a campaign
$campaignId = $api->addCampaign([
    'advertiserId' => $advertiserId,
    'campaignName' => 'Q1 Newsletter Ads',
    'startDate' => '2026-01-01',
    'endDate' => '2026-03-31',
    'impressions' => 100000,
    'priority' => 5,
]);

// Pull daily stats for a zone
$stats = $api->zoneDailyStatistics(42, '2026-01-01', '2026-01-31');
foreach ($stats as $day) {
    echo "{$day['day']}: {$day['impressions']} imps, {$day['clicks']} clicks\n";
}
```

### Third-party REST API plugin

Available at reviveadserverrestapi.com (paid plugin, ~$49+). Compatible with Revive v4.x, v5.x, v6.0.

- **Auth**: Base64 `user:password` in Authorization header
- **Format**: JSON request/response
- **Coverage**: Same management + statistics functions as XML-RPC but via REST endpoints
- **Latest version**: v5.2.0 (April 2024)

## Quick-start recipes

### Recipe 1: Install Revive Adserver on a VPS

**Use case**: Set up your own ad server to manage ads across your websites.

1. **Server requirements**: PHP 8.0+ (for v6.x), MySQL 5.7+ or MariaDB 10.2+, Apache or Nginx
2. Download the latest release from revive-adserver.com/download (NOT from GitHub)
3. Extract to your web server document root (e.g., `/var/www/ads.example.com/`)
4. Create a MySQL database and user for Revive
5. Point your browser to `https://ads.example.com/` and follow the web installer
6. Enter database credentials, create admin account, complete setup
7. Log in to the dashboard and create your first Advertiser > Campaign > Banner > Zone

**Gotcha**: Don't use the GitHub ZIP — it contains development files that will cause issues. Always use official releases.

### Recipe 2: Serve ads in an email newsletter

**Use case**: Add a trackable ad placement to your email newsletter.

1. In the Revive dashboard, go to Inventory > Publishers > your site > Add Zone
2. Set the zone type to **Email/Newsletter**
3. Create a Campaign with a Banner (must be an **image** banner — no text or HTML)
4. Link the banner to the email zone
5. Go to the zone settings and click "Invocation code"
6. Copy the email zone tag (uses `avw.php` for image and `ck.php` for click tracking)
7. Paste into your newsletter template where you want the ad to appear

**Gotcha**: Only one active banner per email zone. To rotate multiple banners, purchase the "Multiple Ads in an Email Zone" plugin from reviveadservermod.com.

### Recipe 3: Pull campaign statistics via XML-RPC API

**Use case**: Automate reporting by pulling stats programmatically.

```bash
# Using curl with XML-RPC (logon first, then query)
curl -X POST https://ads.example.com/api/v2/xmlrpc/ \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0"?>
<methodCall>
  <methodName>ox.logon</methodName>
  <params>
    <param><value><string>admin</string></value></param>
    <param><value><string>yourpassword</string></value></param>
  </params>
</methodCall>'
```

The response returns a `sessionId` string. Use it in subsequent calls:

```bash
# Get daily stats for zone 42
curl -X POST https://ads.example.com/api/v2/xmlrpc/ \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0"?>
<methodCall>
  <methodName>ox.zoneDailyStatistics</methodName>
  <params>
    <param><value><string>{SESSION_ID}</string></value></param>
    <param><value><int>42</int></value></param>
    <param><value><dateTime.iso8601>20260101T00:00:00</dateTime.iso8601></value></param>
    <param><value><dateTime.iso8601>20260131T00:00:00</dateTime.iso8601></value></param>
  </params>
</methodCall>'
```

**Gotcha**: Sessions expire. Always call `ox.logon` before a batch of API calls and handle session timeout errors.

## Integration patterns

### PHP integration (Packagist)

```bash
composer require tafoyaventures/revive-xmlrpc
# or
composer require szeidler/revive-xmlrpc
```

Both packages wrap the XML-RPC API in PHP classes with typed methods for all 11 services.

### WordPress integration

No official plugin. Community options:
1. Use the zone invocation JavaScript tag in a Custom HTML widget
2. Use a generic ad management plugin (e.g., Ad Inserter) with Revive's zone tags
3. For programmatic control, use the XML-RPC API from a custom plugin

### Email ESP integration

1. Generate the email zone invocation code from the Revive dashboard
2. Paste the `<a href="...ck.php..."><img src="...avw.php..."></a>` tag into your ESP template
3. Works with any ESP that supports raw HTML blocks (Mailchimp, Kit, Ghost, Buttondown, etc.)
4. Add `&cb={RANDOM}` or your ESP's cachebuster macro to prevent image caching
