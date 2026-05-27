# PostApex Platform Reference

## Overview

PostApex is an email newsletter ad network that connects advertisers with 500+ publishers reaching 100M+ subscribers across 50+ categories. CPC-based revenue model where publishers manually select and insert ads. London-based, founded 2022.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Publisher dashboard | Browse approved ads, select campaigns, view analytics | UI-only |
| Ad insertion | Copy tracking links and style ad copy into ESP templates | UI-only (manual) |
| Click tracking | Real-time click and revenue tracking per campaign | UI-only |
| Device/geo analytics | Subscriber device type and anonymized geolocation | UI-only |
| Wallet & payments | Earnings accumulate in wallet for withdrawal | UI-only |
| Campaign creation (advertiser) | Create campaigns, set CPC bids, target categories | UI-only |
| Affiliate ads (beta) | Performance-based ads with action-based payouts | UI-only |
| Programmatic ads | Automated banner ads (Coming Soon — not yet available) | Not available |

**No API. No webhooks. No Zapier/Make/MCP integration.** All operations are manual through the web dashboard at app.postapex.com.

## Pricing, limits & plan gates

**PostApex is completely free** for both publishers and advertisers:
- No signup fees, no platform fees, no withdrawal charges
- Publishers earn CPC revenue when subscribers click ads
- Advertisers set their own CPC bid price — pay only for clicks
- PostApex revenue: $0.05–$0.30 spread per dollar between advertiser CPC and publisher payout

### Publisher economics

Earnings formula: `[total subscribers] × [CTR] × [average CPC]`

Example: 10,000 subscribers × 5% CTR × $1.50 avg CPC = **$750 per campaign**

Revenue factors:
- **List size**: More subscribers = more potential clicks
- **CTR**: Engaged readers who click earn more
- **Ad placement**: Top-of-newsletter outperforms footer
- **CPC rates**: Vary by advertiser and category — $0.50 to $3.00+ typical range

<!-- Pricing best-effort from research — verify current rates on postapex.com -->

### Payment details

- Earnings tracked in real-time wallet
- Minimum payout threshold: ~$100 (reported by users — verify in dashboard)
- Payment methods: Not publicly documented — likely PayPal and bank transfer
- Payment schedule: Not publicly documented — monthly reported by users

## Ad formats

### Native ads (available)
Ads styled to blend with regular newsletter content. Publisher receives ad copy and tracking link, then styles it to match their template. Highest engagement format.

### Affiliate ads (beta)
Performance-based ads where advertisers define a specific action (purchase, signup) for payout. Earn per conversion rather than per click.

### Programmatic ads (coming soon)
Automated banner ads that refresh with new creatives. Not yet available — currently in development.

## Publisher workflow

1. **Sign up** at app.postapex.com and add your newsletter
2. **Browse approved ads** — view a list of campaigns available for your newsletter categories
3. **Select ads** — choose ads that fit your audience and content
4. **Insert & customize** — copy tracking links and style the ad copy/creatives into your ESP template
5. **Deploy & track** — send your newsletter; real-time tracking updates in dashboard
6. **Receive payment** — earnings accumulate in wallet; withdraw when threshold met

## Advertiser workflow

1. **Create account** and set up advertiser profile
2. **Create campaign** — set targeting categories, CPC bid, budget
3. **Submit ad creatives** — ad copy, images, tracking URLs
4. **Monitor performance** — analytics dashboard with click and conversion data

## Network details

- **500+ newsletters** across 50+ categories
- **100M+ subscribers** total network reach
- **Categories include**: Marketing & Sales, Finance & Business, Technology, Crypto & Blockchain, Fitness & Wellness, Science & Medicine, Travel, News & Media
- **Notable advertisers**: Apollo, Babbel, Hired, Monday.com
- **Newsletter size range**: 2,000 subscribers (niche) to 12M+ (Brad's Deals Daily)

## Integrations

**None.** PostApex has no native integrations, API, webhooks, or iPaaS connectors. All ad management is manual through the web dashboard.

**Workaround for automation**: Since ads are manually inserted, the only automation option is templating your ad zone in your ESP and swapping the PostApex tracking link each issue. Some publishers create a standard ad block in their ESP template with placeholder text/image that they update per issue.

## Data model

PostApex does not expose a public API, so no data model is documented. Key entities visible in the UI:

- **Newsletter**: Publisher's newsletter with categories, subscriber count, engagement metrics
- **Campaign**: Advertiser's campaign with CPC bid, targeting, creatives
- **Ad**: Individual ad unit with tracking link, copy, and creative assets
- **Wallet**: Publisher earnings balance with click/revenue history

<!-- No API — data model constructed from UI descriptions -->

## Quick-start recipes

Since PostApex has no API, these are manual workflow recipes rather than code examples.

### Recipe 1: Add PostApex native ad to a Mailchimp template

1. Log into app.postapex.com → browse available ads
2. Select a native ad relevant to your audience
3. Copy the ad headline, body text, and tracking URL
4. In Mailchimp, edit your campaign template
5. Add a content block where you want the ad (mid-content recommended)
6. Paste the ad copy and link the CTA to the PostApex tracking URL
7. Add `?utm_source=postapex&utm_medium=newsletter&utm_campaign={ad_name}` to the tracking URL for your own analytics
8. Send and monitor clicks in both PostApex dashboard and Mailchimp reports

### Recipe 2: Revenue optimization checklist

1. **Audit placement**: Move ad from footer to mid-content (above the fold)
2. **Match categories**: Ensure your PostApex newsletter categories accurately reflect your content
3. **Test native vs display**: Native ads consistently outperform banners in email
4. **Cherry-pick high-CPC ads**: Choose ads with higher CPC bids when multiple are available
5. **Track discrepancies**: Compare PostApex click counts against your ESP stats weekly
6. **Diversify**: Use PostApex for easy fills + Paved/Hecto for premium direct sponsors

## Integration patterns

### ESP template pattern
Create a standard "sponsored" section in your ESP template with:
- Consistent visual styling (border, "Sponsored" label)
- Placeholder image/text that you swap each issue
- PostApex tracking URL as the primary link
- UTM parameters appended for independent tracking

### Multi-network strategy
Run PostApex alongside other ad networks/marketplaces:
- **Primary**: Direct sponsors via Paved or Hecto (highest CPM/revenue)
- **Backfill**: PostApex native ads for unsold inventory (zero cost, CPC upside)
- **Programmatic**: Admailr for automated ad insertion when you want hands-off revenue
- **Intelligence**: SponsorGap or Who Sponsors Stuff to find and pitch direct sponsors
