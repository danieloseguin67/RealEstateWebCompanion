# adly.news Platform Reference

## Overview

adly.news is a two-sided newsletter advertising marketplace connecting newsletter publishers with advertisers. It differentiates from competitors like Hecto with verified ESP metrics (auto-pulled from Beehiiv, Kit), a bidding/negotiation system, and dual discovery modes (publishers list ad slots, advertisers create campaigns). Built by Phil, a full-stack software engineer.

**Website**: https://adly.news
**Docs**: https://adly-news.gitbook.io/adly.news-docs

## Capabilities & automation surface

| Capability | Available | Access method |
|---|---|---|
| Newsletter listing (publishers) | Yes | UI only |
| Ad slot creation with pricing | Yes | UI only |
| Campaign creation (advertisers) | Yes | UI only |
| Verified ESP metrics | Yes | Auto-pulled (Beehiiv, Kit) |
| Bidding and negotiation | Yes | UI only |
| In-platform messaging | Yes | UI only |
| Stripe payments & payouts | Yes | Stripe |
| Newsletter browsing directory | Yes | UI only |
| Blog & guides | Yes | Public |
| API | No | — |
| Webhooks | No | — |
| Zapier / Make | No | — |
| MCP server | No | — |
| Mobile app | No | — |

## Pricing, limits & plan gates

- **Publishers**: Free to list. Commission on successful transactions (exact percentage not publicly disclosed).
- **Advertisers**: No upfront costs, no minimum budget, no monthly commitment. Pay only when booking a campaign. Ad prices start as low as $50 for smaller newsletters.
- **Payments**: All processed through Stripe. Funds held until the ad runs.
- **No plan tiers**: Single free tier for both sides.

## How it works

### Two discovery modes

1. **Ad Slot Browsing**: Publishers create ad slots with pricing. Advertisers browse, book directly, or make offers.
2. **Campaign Recruitment**: Advertisers create campaigns describing their ideal audience. Newsletters browse campaigns and apply. Advertisers select the best fits.

### For Publishers

1. Create your listing — newsletter name, description, niche, audience demographics
2. Connect your ESP — metrics (subscriber count, open rate, CTR) are pulled automatically and verified
3. Set up ad slots — define placement types, pricing, and availability
4. Get discovered — sponsors browse your listing or you apply to their campaigns
5. Negotiate — accept, reject, or counter offers from advertisers
6. Get paid — automated Stripe payouts after the ad runs

### For Advertisers

1. Browse newsletters — filter by niche, verified audience metrics
2. Create campaigns — describe your target audience and budget
3. Book or negotiate — pay listed prices or make offers
4. Coordinate — use in-app messaging to share ad copy, images, and links
5. Track — monitor campaign performance via dashboard

## Data model

### Newsletter listing
<!-- Constructed from docs — verify against live API -->
```json
{
  "newsletter_name": "DevTools Weekly",
  "niche": "developer-tools",
  "subscribers": 5000,
  "open_rate": 0.42,
  "click_through_rate": 0.08,
  "verified": true,
  "esp": "beehiiv",
  "ad_slots": [
    {
      "type": "primary_sponsor",
      "price": 200,
      "format": "native content block",
      "available_dates": ["2026-05-20", "2026-06-03"]
    },
    {
      "type": "secondary_sponsor",
      "price": 75,
      "format": "short blurb",
      "available_dates": ["2026-05-20", "2026-05-27", "2026-06-03"]
    }
  ]
}
```

### Campaign (advertiser-created)
<!-- Constructed from docs — verify against live API -->
```json
{
  "campaign_name": "DevTools Q3 Newsletter Push",
  "advertiser": "SaaS Corp",
  "target_audience": "software developers, DevOps engineers",
  "budget_range": "$200-$500 per placement",
  "applications": [
    {
      "newsletter": "DevTools Weekly",
      "subscribers": 5000,
      "open_rate": 0.42,
      "proposed_price": 200,
      "status": "pending"
    }
  ]
}
```

## Comparison with alternatives

| Feature | adly.news | Hecto | Paved | Social Presence |
|---|---|---|---|---|
| **Type** | Marketplace | Marketplace | Marketplace + Ad Network | AI marketplace |
| **Discovery** | Dual (list + campaigns) | List only | List + programmatic | AI-matched |
| **Verified metrics** | Auto from ESP | Manual | ESP-verified badge | Claimed |
| **Negotiation** | Built-in bidding | Direct messaging | Platform-managed | Managed sales |
| **Network size** | Small (new) | ~40 newsletters | 3,000+ publishers | 5,000+ claimed |
| **Commission** | Undisclosed | Undisclosed | 30% | Undisclosed |
| **API** | No | No | No | No |
| **Min ad price** | ~$50 | Varies | CPM-based | Varies |
| **Best for** | Indie publishers wanting negotiation | Simple self-serve | Scale + programmatic | AI-driven discovery |

## Recipes

### Recipe 1: List your newsletter and attract sponsors

1. Sign up at https://adly.news
2. Create your newsletter listing:
   - Name, description, niche category
   - Connect your ESP (Beehiiv, Kit) for verified metrics
   - Write a compelling audience description (demographics, interests, professional profile)
3. Configure ad slots:
   - **Primary sponsor**: Full section, highest rate. Price using CPM: `(subscribers x open_rate x CPM) / 1000`. Start at $50 CPM for B2B.
   - **Secondary sponsor**: Short blurb, 1/3 to 1/2 of primary rate.
4. Set available dates for each ad slot
5. Browse active campaigns from advertisers and apply to relevant ones

### Recipe 2: Find and book newsletter ads as an advertiser

1. Browse newsletters at adly.news — filter by niche
2. Check verified metrics (subscriber count, open rate, CTR)
3. Either book at listed price or make an offer to negotiate
4. Use in-app messaging to coordinate ad copy, images, and links
5. Alternatively, create a campaign describing your ideal audience and wait for newsletters to apply

### Recipe 3: Multi-tool sponsor pipeline with adly.news

Since adly.news has no API, combine it with other tools for a full workflow:

1. **Discover sponsors to pitch**: Use SponsorGap or Who Sponsors Stuff to find brands actively sponsoring newsletters in your niche
2. **List on marketplace**: Set up your adly.news listing so sponsors can find you + apply to advertiser campaigns
3. **Manage operations**: Use Sponsy for sponsor CRM, automated reporting, and invoicing for direct deals
4. **Scale with programmatic**: Add Paved Ad Network for automated fill of remaining inventory

## Integration patterns

adly.news has no API, webhooks, or native integrations beyond Stripe payments. All data management is through the web interface.

**Workaround for CRM sync**: Manually export sponsor contact info from adly.news messages and import into your CRM. For automated sponsor operations, consider Sponsy (Zapier integration).

**Workaround for reporting**: Track campaign metrics manually. For automated sponsor reporting, Sponsy provides this natively.
