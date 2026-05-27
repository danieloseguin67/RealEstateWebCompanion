# Passendo Platform Reference

## Overview

Passendo is a European email ad server and SSP (supply-side platform) built specifically for newsletter advertising. Founded in 2016, it serves 250M+ monthly email ad impressions across 150+ premium international publishers. Unlike generic ad servers adapted for email (like Google Ad Manager), Passendo was designed from the ground up for the constraints of the email channel — cookie-free, first-party data targeting, image-only creatives, and deliverability preservation via CNAME integration.

## Capabilities & automation surface

### Passendo Ad Server (direct-sold campaigns)
Manage direct advertiser relationships with full campaign controls: A/B testing, CPM/CPC/CPA pricing models, sponsorship deals, Share of Voice (SOV) delivery, inclusion/exclusion filters, and scheduling. **UI-accessible** — primary interface for campaign management.

### Emperor (next-gen ad server)
Streamlined next-generation interface for email ad monetization. Enhanced workflow automation and reporting. **UI-accessible.**

### Passendo SSP/Exchange (programmatic)
Email-native ad exchange providing open programmatic demand from 15+ native demand integration partners. Handles the sell-side of programmatic transactions — publishers connect inventory, DSPs bid on impressions. **UI-accessible** — SSP configuration through Passendo dashboard.

### Passendo DSP (demand-side)
Programmatic campaign management for advertisers/agencies buying newsletter ad inventory. Target by first-party data, newsletter category, geography, and language. **UI-accessible.**

### Priority Waterfall
Automated ad decisioning hierarchy: guaranteed direct deals fill first, then programmatic exchange demand, then house ads. This commercial order maximizes revenue by prioritizing highest-paying inventory commitments. **UI-accessible** — configured during onboarding.

### The Monetization Club
Exclusive premium advertising opportunities for qualifying publishers. Invitation/application-based. **UI-accessible.**

### REST API
Passendo provides a REST API at api.hsttrckr.com. Documentation is not publicly accessible (JS-rendered). API enables programmatic campaign management and reporting. **API-accessible** — requires Passendo account and credentials.

### Reporting
Campaign-level and placement-level reporting: impressions, clicks, CTR, revenue. Advertiser performance reports. Detailed reports noted in G2 reviews as a strength. **UI-accessible.**

## Pricing, limits & plan gates

- **Volume-based CPM tiers**: Pricing scales with monthly email ad impressions. More impressions = lower per-CPM cost. No published price points — all custom quotes.
- **Minimum monthly commitment**: Required on all plans.
- **One-time onboarding fee**: Covers integration support, training, and CNAME setup.
- **Impression calculation**: Opened emails/month x ad placements per email. Example: 500K opens x 3 placements = 1.5M impressions.
- **Free tier**: Reportedly available for exchange-only usage (Passendo branding appears on exchange-sourced ads). Self-served campaigns have no Passendo branding.
- **Onboarding timeline**: 1-4 weeks (average 2-4 weeks).

<!-- Pricing is custom/not published — verify current rates with Passendo sales -->

## Integrations

### ESP integrations
Passendo integrates with any ESP that supports custom HTML in email templates. Integration is via a lightweight HTML tag snippet — the Passendo Tag. CNAME DNS records are configured on the publisher's domain to route ad requests through the publisher's domain (preserving deliverability).

**Known ESP integrations**: MailUp (native integration via integrations.mailup.com). Most ESPs require no special configuration beyond inserting the HTML tag. Some ESPs may need adjustments for optimal ad delivery.

**Data flow**: Passendo Tag maps ESP-specific variables (email address, campaign ID) to targeting parameters. One-way: ESP → Passendo (subscriber data for targeting). Ad creative served back to the email client at render time.

### Demand partners
15+ native demand integration partners connected via the SSP. Publisher controls which demand sources fill their inventory.

### No iPaaS
No Zapier triggers/actions. No Make modules. No MCP server. No native CRM connectors. All management is through the Passendo dashboard or API.

## Data model

Passendo's campaign hierarchy follows standard ad server conventions:

```json
<!-- Constructed from docs and G2 reviews — verify against live platform -->
{
  "campaign": {
    "id": "camp_123",
    "name": "Q1 Finance Campaign",
    "advertiser": "Acme Corp",
    "type": "direct_sold | exchange | house",
    "pricing_model": "CPM | CPC | CPA",
    "budget": 5000.00,
    "start_date": "2026-01-01",
    "end_date": "2026-03-31",
    "targeting": {
      "newsletters": ["nl_456"],
      "categories": ["finance", "B2B"],
      "geo": ["US", "UK"],
      "language": ["en"]
    }
  },
  "placement": {
    "id": "pl_789",
    "newsletter_id": "nl_456",
    "position": "top | mid | bottom",
    "dimensions": "600x200",
    "passendo_tag": "<img src='https://your-cname.example.com/...' />"
  },
  "impression": {
    "timestamp": "2026-01-15T10:30:00Z",
    "campaign_id": "camp_123",
    "placement_id": "pl_789",
    "email_hash": "abc123",
    "clicked": false
  }
}
```

### Key objects
- **Campaign**: Container for an advertising buy — has targeting, budget, schedule, pricing model
- **Placement**: An ad slot within a specific newsletter template (position + dimensions)
- **Creative**: Image-only ad asset uploaded for a campaign
- **Newsletter**: Publisher's email property with subscriber data
- **Demand source**: SSP connection to a demand partner or exchange

## Passendo Tag (integration snippet)

The Passendo Tag is a lightweight HTML snippet that creates an ad placement in a newsletter. For most ESPs, no additional configuration is needed.

```html
<!-- Example Passendo Tag structure (simplified) -->
<a href="https://your-cname.example.com/click?...">
  <img src="https://your-cname.example.com/ad?placement=pl_789&email=%%EMAIL%%&campaign=%%CAMPAIGN_ID%%"
       alt="Advertisement"
       width="600" height="200"
       style="display:block;" />
</a>
```

<!-- Tag structure constructed from support docs — actual tag is generated by Passendo during onboarding -->

**ESP variable mapping**: Replace `%%EMAIL%%` and `%%CAMPAIGN_ID%%` with your ESP's merge tags (e.g., `*|EMAIL|*` for Mailchimp, `{{ subscriber.email_address }}` for Kit).

## Quick-start recipes

### Recipe 1: Evaluate Passendo for your newsletter

**Trigger**: You want to know if Passendo is right for your newsletter size and audience.

**Steps**:
1. Calculate your monthly impressions: `monthly_opens x ad_placements_per_email`
2. Check minimum thresholds — Passendo targets mid-to-large publishers (typically 100K+ monthly opens)
3. Contact Passendo via their website to request a quote and onboarding timeline
4. During evaluation, ask about: demand partner coverage for your niche, expected CPM range, and whether exchange-only (free tier) is an option

**Gotchas**: Passendo's sweet spot is established publishers with significant volume. If you have <10K subscribers, consider Admailr (no minimum) or Paved Ad Network (lower barrier) instead.

### Recipe 2: Optimize fill rates after setup

**Trigger**: You've integrated Passendo but ad slots are often empty.

**Steps**:
1. Review demand partner configuration — enable all relevant SSP connections
2. Check targeting data quality — ensure newsletter categories, language, and geo are accurate
3. Configure house ads as backfill (never show blank space)
4. Consider supplementing with direct-sold campaigns for premium placements
5. Review the priority waterfall order — ensure it's: direct-sold → exchange → house

**Gotchas**: Niche newsletters in non-English markets may have lower programmatic fill. Use direct sales to fill the gap.

### Recipe 3: Set up direct-sold campaigns

**Trigger**: You have advertisers who want to buy placements directly (not through the exchange).

**Steps**:
1. Create a campaign in Passendo Ad Server with the advertiser's details
2. Set pricing model (CPM for brand awareness, CPC for performance)
3. Configure targeting: specific newsletters, dates, SOV if sponsorship
4. Upload image creatives (check size limits before uploading)
5. Set campaign as "guaranteed" to ensure it fills before exchange demand

**Gotchas**: SOV campaigns guarantee a share of impressions but may leave remaining inventory unfilled if exchange demand is low. Always have house ads as fallback.

## Integration patterns

### CNAME-based ad serving
All Passendo integrations use CNAME DNS records. This routes ad image requests through the publisher's own domain, so email clients see first-party image URLs rather than third-party ad server domains. This is critical for deliverability — emails with third-party image URLs are more likely to be flagged as promotional or spam.

**Setup**: Add a CNAME record pointing a subdomain (e.g., `ads.yournewsletter.com`) to Passendo's servers. Passendo's onboarding team handles this configuration.

### Gmail caching mitigation
Gmail caches identical image URLs across recipients, which breaks per-recipient impression counting. Passendo mitigates this by appending unique per-subscriber parameters to image URLs in the tag. Verify this is working by checking that impression counts roughly match your open rates.

### Apple MPP handling
Apple Mail Privacy Protection pre-fetches all images (including ad images) regardless of whether the recipient opens the email. This inflates impression counts. Passendo's reporting may or may not filter MPP-inflated impressions — confirm with your account manager. For accurate engagement metrics, rely on click data rather than impressions.

## Passendo vs alternatives

| Feature | Passendo | Admailr | Kevel | Paved Ad Network | BuySellAds |
|---|---|---|---|---|---|
| **Type** | Full ad server + SSP | Programmatic ad server | API infrastructure | CPC ad network | Managed marketplace |
| **Best for** | Mid-to-large publishers | Small-to-mid publishers | Engineering teams | Any newsletter | Dev/design/crypto |
| **Self-serve** | No (managed onboarding) | Yes | Yes (API-only) | Yes | Yes |
| **Min. subscribers** | ~100K+ monthly opens | None | None | 5,000+ | ~10K+ |
| **Programmatic demand** | Yes (15+ partners) | Yes (limited) | No (you build it) | CPC only | No |
| **Direct-sold** | Yes (full campaign mgmt) | Limited | Yes (full API) | Via Booker | Via dashboard |
| **Pricing** | Custom volume-based | Revenue share | Custom volume-based | CPC (~$1.45/click) | 25% commission |
| **Integration** | CNAME + HTML tag | HTML tag | API calls | Code snippet | JSON API |
