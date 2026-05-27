# Hecto Platform Guide

## Overview

Hecto is a self-serve newsletter advertising marketplace that connects newsletter publishers with sponsors/advertisers. Founded by Simon (@thedudlian), it targets independent businesses, freelancers, startups, and side projects. The platform launched on Product Hunt in March 2021 (Hecto 2.0).

**Website**: https://hecto.io
**Built on**: Bubble.io (no-code platform)

## Capabilities

| Capability | Available | Access method |
|---|---|---|
| Newsletter listing (publishers) | Yes | UI only |
| Ad slot browsing (advertisers) | Yes | UI only |
| Transparent pricing display | Yes | UI only |
| Direct in-platform messaging | Yes | UI only |
| Inventory management (date-specific) | Yes | UI only |
| Campaign management (multi-newsletter) | Yes | UI only |
| Newsletter quality vetting | Yes | Platform-managed |
| Payment processing | Yes | Stripe |
| API | No | — |
| Webhooks | No | — |
| Zapier / Make | No | — |
| MCP server | No | — |
| Mobile app | No | — |

## How It Works

### For Publishers (Newsletter Creators)

1. **Create your Hecto page** — list your newsletter with audience size, niche, engagement metrics
2. **Set up ad inventory** — define ad placement types, pricing, and date-specific availability
3. **Get discovered** — sponsors browse the marketplace and see your pricing upfront
4. **Receive messages** — sponsors contact you directly on-platform (no email sharing required)
5. **Manage campaigns** — track bookings and fulfill ad placements

### For Advertisers (Sponsors)

1. **Browse newsletters** — filter by niche and engagement metrics
2. **See transparent pricing** — ad package costs are visible before contacting publishers
3. **Message creators directly** — reach out on-platform without providing contact details first
4. **Book placements** — streamlined checkout process via Stripe
5. **Manage campaigns** — track placements across multiple newsletters

## Pricing Model

- **Publishers**: Free to list. Hecto takes a commission on successful transactions (exact percentage not publicly disclosed).
- **Advertisers**: Pay newsletter-set prices. Individual publishers set their own ad rates.
- **Payments**: Processed through Stripe.

## Data Model

### Newsletter Listing (conceptual)

```json
{
  "newsletter_name": "The Marketing Weekly",
  "niche": "marketing",
  "subscribers": 8000,
  "open_rate": 0.42,
  "ad_slots": [
    {
      "type": "primary_sponsor",
      "price": 225,
      "available_dates": ["2026-05-20", "2026-05-27", "2026-06-03"],
      "character_limit": 500
    },
    {
      "type": "classified",
      "price": 75,
      "available_dates": ["2026-05-20", "2026-05-27"],
      "character_limit": 150
    }
  ]
}
```

### Campaign (conceptual)

```json
{
  "advertiser": "SaaS Corp",
  "newsletters": ["The Marketing Weekly", "Growth Hacker Daily"],
  "total_spend": 450,
  "status": "active",
  "placements": [
    {
      "newsletter": "The Marketing Weekly",
      "slot_type": "primary_sponsor",
      "date": "2026-05-20",
      "ad_copy": "Grow your SaaS revenue...",
      "status": "confirmed"
    }
  ]
}
```

## Comparison with Alternatives

| Feature | Hecto | Paved | SponsorGap | Who Sponsors Stuff | Sponsy |
|---|---|---|---|---|---|
| **Type** | Marketplace | Marketplace + Ad Network | Intelligence database | Intelligence database | Operations tool |
| **For publishers** | List & sell | List, sell, programmatic ads | Find sponsors to pitch | Find sponsors to pitch | Manage existing sponsors |
| **For advertisers** | Browse & buy | Browse, buy, programmatic | Research sponsors | Research sponsors | — |
| **Newsletters** | ~40 | 3,000+ | N/A | 500+ tracked | N/A |
| **Sponsors in DB** | N/A | N/A | 38,000+ | 8,000+ | N/A |
| **Transparent pricing** | Yes (publisher-set) | Yes (CPM-based) | N/A | N/A | N/A |
| **Direct messaging** | Yes | Via platform | N/A | N/A | N/A |
| **API** | No | No | Yes | No | Zapier triggers |
| **Commission** | Undisclosed % | 30% | N/A | N/A | N/A |
| **Best for** | Indie publishers | Scale + programmatic | Prospecting sponsors | Competitive intel | Sponsor ops |

## Recipes

### Recipe 1: List your newsletter and attract sponsors

1. Go to https://app.hecto.io and create an account
2. Set up your newsletter profile:
   - Name, description, niche category
   - Subscriber count, open rate, click-through rate
   - Audience demographics (industry, seniority, geography)
3. Configure ad slots:
   - **Primary sponsor**: Full section, highest rate. Price using CPM formula: `(subscribers × open_rate × CPM) / 1000`. Start at $50 CPM for B2B.
   - **Classified/secondary**: Short blurb, 1/3 to 1/4 of primary rate
   - **Dedicated send**: Full email from sponsor (premium rate, use sparingly)
4. Set date-specific availability — mark which issue dates have open slots
5. Write a compelling description highlighting what makes your audience unique

### Recipe 2: Find and book newsletter ads as an advertiser

1. Browse newsletters at https://app.hecto.io/newsletter-creators
2. Filter by niche, audience size, and engagement metrics
3. Compare pricing across listings (all prices visible upfront)
4. Message creators directly to discuss fit and negotiate packages
5. Book through the platform (Stripe checkout)
6. Track campaign performance across all booked newsletters

### Recipe 3: Multi-tool sponsor pipeline with Hecto

Since Hecto has no API, combine it with other tools for a full workflow:

1. **Discover sponsors to pitch**: Use SponsorGap or Who Sponsors Stuff to find brands actively sponsoring newsletters in your niche
2. **List on marketplace**: Set up your Hecto page so sponsors can find and book you
3. **Manage operations**: Use Sponsy for sponsor CRM, automated reporting, and invoicing for direct deals
4. **Scale with programmatic**: Add Paved Ad Network for automated fill of remaining inventory

This hybrid approach lets you use Hecto's self-serve marketplace alongside more sophisticated tools for different parts of the sponsor workflow.

## Integration Patterns

Hecto has no API, webhooks, or native integrations beyond Stripe payments. All data management is manual through the web interface.

**Workaround for CRM sync**: Manually export sponsor contact info and import into your CRM. For automated sponsor operations, consider Sponsy (Zapier integration) or Paved (ESP integrations for ad insertion).

**Workaround for reporting**: Track campaign metrics manually. For automated sponsor reporting, Sponsy provides this natively.
