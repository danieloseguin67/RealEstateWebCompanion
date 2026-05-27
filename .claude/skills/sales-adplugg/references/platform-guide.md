# AdPlugg Platform Reference

## Overview

AdPlugg is a cloud-based ad server and ad manager combined with plugins for WordPress, Ghost, Drupal, Joomla, Squarespace, Wix, Weebly, and Blogger. Founded in 2013, it targets bloggers and small publishers who want to manage, rotate, schedule, and track their own display and email newsletter ads without complex ad server setups. Key differentiator: budget-friendly ($0-$79/mo) with email newsletter ad support on the Business plan.

## Capabilities & automation surface

| Module | What it does | Automation |
|--------|-------------|------------|
| **Ad management** | Create, edit, schedule, and rotate ads (image, text, HTML5, bar, dialog, slide-in, interstitial, video) | UI-only (no API) |
| **Zone targeting** | Assign ads to named zones on your site | UI-only |
| **Page targeting** | Target ads to specific URLs or Open Graph tags (Pro+) | UI-only |
| **Email ad tags** | Generate email-safe ad tags for Ghost newsletters and other ESPs (Business+) | UI-only |
| **Scheduling** | Set start/end dates and times for ad campaigns | UI-only |
| **A/B testing** | Split traffic between ad variants (Business+) | UI-only |
| **Geotargeting** | Country, region, city-level targeting (Business+) | UI-only |
| **Frequency capping** | Limit ad views per visitor (Business+) | UI-only |
| **Reporting** | View tracking, click tracking, charts. Downloadable PDF/XLSX/CSV (Pro+). Automated email reports (Business+) | UI-only |
| **AdPlugg Network** | Opt in to receive ads from AdPlugg's network advertisers | UI-only |

**No API, no webhooks, no Zapier/Make, no MCP server.** All management is through the web dashboard at adplugg.com.

## Pricing, limits & plan gates

| Plan | Price | Impressions | Ad formats | Targeting | Reporting | Email ads |
|------|-------|-------------|------------|-----------|-----------|-----------|
| **Free** | $0/mo | 100K/mo | Image only | Zone, path | Charts only | No |
| **Pro** | $10/mo + usage | Billions | Image, bar, HTML5, text, dialog, slide-in, interstitial, video | Zone, path, OG tags | Downloadable (PDF/XLSX/CSV) | No |
| **Business** | $79/mo + usage | Billions | All Pro formats + in-stream video, email/newsletter ads | Zone, path, OG tags, geotargeting, frequency capping, ad groups | Downloadable + automated email reports | Yes |
| **Custom** | Contact sales | Custom | Custom | Custom | Custom | Custom |

- Usage fees apply on Pro and Business beyond included impressions (rates page at adplugg.com/plans)
- 30-day money-back guarantee on paid plans
- 14-day free trial (no credit card required)
- All plans include ad rotation, scheduling, and click tracking

### Compared to competitors

| Feature | AdPlugg | AdButler | Broadstreet | Google AdSense |
|---------|---------|----------|-------------|----------------|
| Starting price | Free | $179/mo | $299/mo | Free (revenue share) |
| Target audience | Bloggers, small publishers | Mid-large publishers | Local/B2B publishers | Any publisher |
| Email ad support | Business ($79/mo) | All plans (zone tags) | All plans (zone code) | No |
| Self-serve portal | No | Yes | No (client dashboard) | N/A (Google controls) |
| Programmatic/RTB | No | Paid add-on | No | Yes (Google controls) |
| API | No | REST API + MCP | REST API (limited) | No |
| WordPress plugin | Yes | No native plugin | Yes | No (manual code) |
| Ghost integration | Yes (email tags) | Zone tags | No native | No |
| A/B testing | Business plan | All plans | No | Google-controlled |
| Geotargeting | Business plan | All plans | No | Google-controlled |

## Integrations

- **WordPress**: Official plugin at wordpress.org/plugins/adplugg/ — add zones via widgets, shortcodes, or template tags
- **Ghost**: Email ad tags work in Ghost HTML cards and newsletters. Save as Ghost Snippets for reuse.
- **Drupal**: Module available
- **Joomla**: Extension available
- **Squarespace / Wix / Weebly / Blogger**: Code snippet integration (paste ad tag into HTML embed block)
- **AMP pages**: Supported on all plans
- **Facebook Instant Articles**: Supported
- **No Zapier/Make/API** — all ad management is manual through the dashboard

## Data model

### Campaign hierarchy

```
Account (your AdPlugg account)
  └── Zone (named ad placement on your site, e.g., "sidebar-top")
        └── Ad (creative — image, text, HTML5, video)
              ├── Media (uploaded image or HTML5 asset)
              ├── Schedule (start/end dates)
              ├── Targeting (zone, page, geo, frequency)
              └── Tracking (impressions, clicks)
```

### Ad tag (web — regular)
<!-- Constructed from docs — verify against live API -->
```html
<!-- AdPlugg Ad Tag -->
<div data-adplugg-zone="sidebar-top"></div>
<script async src="https://www.adplugg.com/serve/{ACCOUNT_ID}/js/ad.js"></script>
```

### Ad tag (email — Business plan only)
<!-- Constructed from docs — verify against live API -->
```html
<!-- AdPlugg Email Ad Tag -->
<a href="https://www.adplugg.com/track/click/{AD_ID}">
  <img src="https://www.adplugg.com/serve/{ACCOUNT_ID}/img/{AD_ID}" alt="Ad" style="max-width:100%;" />
</a>
```

**Key difference**: Email tags use static image URLs (no JavaScript) and resolve server-side. Regular tags use JavaScript for rotation and tracking.

## Quick-start recipes

### Recipe 1: Add ads to a WordPress blog

**Use case**: Serve rotating display ads on your WordPress site.

1. Install the AdPlugg WordPress plugin from wordpress.org
2. In the AdPlugg dashboard, create a Zone (e.g., "sidebar-top")
3. Create an Ad — upload an image, set click-through URL, assign to the zone
4. In WordPress, go to Appearance > Widgets and add the "AdPlugg" widget to your sidebar
5. Enter the zone name "sidebar-top" in the widget settings
6. Save — ads now rotate in that position

**Shortcode alternative** (for in-post placement):
```
[adplugg zone="sidebar-top"]
```

**Gotcha**: Zone names are case-sensitive. "Sidebar-Top" and "sidebar-top" are different zones.

### Recipe 2: Serve ads in a Ghost newsletter

**Use case**: Show ads in your Ghost email newsletter.

**Requires**: Business plan ($79/mo)

1. In the AdPlugg dashboard, create an Ad and upload the image
2. From the Ads list, click "Get Tag" on your ad
3. Select the "Email Tag" tab (not the regular tag)
4. Copy the Email Tag HTML to your clipboard
5. In Ghost, open the post/newsletter and add an HTML card where you want the ad
6. Paste the Email Tag into the HTML card
7. Optional: Click the edge of the HTML card → "Create Snippet" → name it "Sponsor 1" for reuse
8. Preview and send a test email to verify rendering

**Gotcha**: Regular ad tags (JavaScript-based) don't work in email. You must use the Email Tag, which uses static image URLs.

### Recipe 3: Set up A/B testing for ads

**Use case**: Test two ad creatives to see which gets more clicks.

**Requires**: Business plan ($79/mo)

1. Create two Ads with different creatives (e.g., "Banner A" and "Banner B")
2. Assign both ads to the same Zone
3. AdPlugg automatically rotates between them, splitting traffic
4. After 1-2 weeks, check the Reports section for click-through rates
5. Pause the lower-performing ad

**Gotcha**: A/B testing requires enough traffic for statistical significance. With 100 daily impressions, wait at least 2 weeks.

## Integration patterns

### WordPress integration

1. Install and activate the AdPlugg plugin
2. Go to Settings > AdPlugg and enter your AdPlugg Access Code (from your AdPlugg dashboard)
3. Add zones via widgets, shortcodes (`[adplugg zone="name"]`), or template tags
4. All ad management happens in the AdPlugg dashboard, not WordPress

### Ghost integration

1. Create ads in the AdPlugg dashboard
2. Get Email Tags for newsletter use or regular tags for website use
3. Paste into Ghost HTML cards
4. Save as Ghost Snippets for reuse across posts

### Any site (code snippet)

1. Copy the AdPlugg JavaScript tag from your dashboard
2. Place the zone div where you want ads: `<div data-adplugg-zone="zone-name"></div>`
3. Add the AdPlugg script tag once before `</body>`
4. Ads load asynchronously and don't block page rendering
