# Social Presence Platform Reference

## Overview

Social Presence (socialpresence.io) is an AI-powered newsletter advertising marketplace that connects advertisers with publishers through a discovery-first approach. The platform uses 26 data points to match brands with relevant newsletters. Founded by Erfan Mohammadi. Contact: support@socialpresence.io.

**Important**: The original socialpresence.co domain redirects to an unrelated LinkedIn Chrome extension. The actual platform is at socialpresence.io with dashboard at dashboard.socialpresence.io.

## Capabilities & automation surface

### Discovery Dashboard — UI-only
Search and filter publishers using 26 data points including talking points, demographics, and firmographics. View publisher profiles with audience metrics and content themes.

### Ad Library — UI-only
Monitor competitor newsletter ad campaigns through a live feed. Identify trends and refine positioning strategies.

### Ad Centre — UI-only
Campaign management hub for organizing, scheduling, and tracking campaigns. Includes direct publisher messaging and pre-built creative briefs with customizable dates and formats.

### Publisher Storefront — UI-only
Publishers build a discoverable listing with ad inventory, audience metrics, and talking points. Three ad format types: Dedicated email (full issue sponsorship), Main Sponsor (prominent placement), Secondary Sponsor (native integration).

### Managed Sales — UI-only
Each publisher gets a dedicated category expert who handles sales outreach. Includes automated sales admin support.

**No API, no webhooks, no Zapier/Make/MCP integration.** All operations require the web interface.

## Pricing, limits & plan gates

- **Commission-only model**: Social Presence takes a commission on transactions. The exact percentage is not publicly disclosed.
- **No subscription fees**: Publishers list for free; commission applies only when campaigns are booked.
- **No published pricing tiers**: Contact the platform for commission details before listing.
- **No free trial mentioned**: The platform appears open for publishers to join but advertiser pricing is not transparent.

## Integrations

**None documented.** No native CRM connectors, no ESP integrations, no Zapier triggers/actions, no Make modules.

Data flow: Advertisers discover publishers on-platform → campaigns are managed on-platform → payments processed on-platform. No external data sync.

## Data model

No API exists, so no data model is available. The platform's internal objects likely include:

- **Publisher profiles**: Newsletter name, audience size, talking points, demographics, firmographics, ad formats, pricing
- **Campaigns**: Advertiser, publisher, ad format, dates, creative brief, status, performance metrics
- **Ad Library entries**: Advertiser, publisher, ad creative, dates

<!-- No API — data model is inferred from UI description, not from actual endpoints -->

## Quick-start recipes

Since Social Presence has no API, quick-start recipes cover UI workflows:

### Recipe 1: Publisher — Set up your storefront

1. Go to socialpresence.io/join-now and select "Publisher"
2. Build your storefront:
   - Write specific talking points (not generic — think "SaaS growth for bootstrapped founders" not "business")
   - Add audience demographics and firmographics
   - Configure ad formats: Dedicated email, Main Sponsor, Secondary Sponsor
3. Set pricing for each format (use CPM benchmarks — see /sales-newsletter for guidance)
4. Publish and let the managed sales team work with matched advertisers

### Recipe 2: Advertiser — Find and book newsletters

1. Go to socialpresence.io/join-now and select "Advertiser"
2. Use Discovery Dashboard to filter publishers by:
   - Talking points (content themes that match your product)
   - Audience demographics and firmographics
3. Check the Ad Library to see competitor campaigns in your niche
4. Build a publisher list and launch a campaign through the Ad Centre

### Recipe 3: Competitor monitoring via Ad Library

1. Open the Ad Library in your Social Presence dashboard
2. Search for competitors by brand name or category
3. Review live feed of competitor newsletter ad campaigns
4. Note which publishers competitors are sponsoring and the ad formats used
5. Use insights to inform your own publisher targeting strategy

## Integration patterns

**No integration patterns available.** Social Presence is a closed platform with no programmatic access.

**Workarounds for automation needs:**

| Need | Workaround |
|---|---|
| Sync campaign data to CRM | Manual export (if available) or screenshot-based tracking |
| Automate reporting | Use Sponsy for sponsor operations with Zapier integration |
| Programmatic campaign management | Switch to Paved (Ad Network with API) or BuySellAds (Ad Serving + Advertiser APIs) |
| Sponsor intelligence via API | Use SponsorGap (REST API with sponsor data) |

## Comparison with alternatives

| Feature | Social Presence | Paved | Hecto | BuySellAds |
|---|---|---|---|---|
| **Type** | AI discovery marketplace | Marketplace + programmatic Ad Network | Self-serve marketplace | Managed ad network |
| **Publisher network** | 5,000+ (claimed) | 3,000+ (verified) | ~40 newsletters | 200+ publishers |
| **Discovery** | AI-powered, 26 data points | Search + filters | Browse by niche | Curated by category |
| **Competitor monitoring** | Ad Library | Radar (lead enrichment) | None | None |
| **API** | None | None | None | Ad Serving + Advertiser APIs |
| **Commission** | Undisclosed | 30% | Undisclosed | 25% (15% self-serve) |
| **Managed sales** | Yes (category expert) | Yes (Premier Partner) | No | Yes (account manager) |
| **Best for** | Advertisers wanting AI discovery | Publishers wanting programmatic + direct | Indie publishers wanting simplicity | Dev/design publishers wanting managed sales |
