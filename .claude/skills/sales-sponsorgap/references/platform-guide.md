# SponsorGap Platform Reference

## Overview

SponsorGap is a newsletter sponsorship intelligence platform with a database of 38,000+ brands. It helps newsletter creators find, research, and contact brands that actively sponsor newsletters. Founded by Tobi Hikari, launched February 2021. Primary differentiator: GPT-powered sponsor matching with verified decision-maker contacts and real-time spend trend data.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Sponsor search** | Search 38K+ brands by niche, industry, company name | UI — free tier |
| **GPT-powered matching** | AI recommends sponsors based on your newsletter niche | UI — Starter+ |
| **Niche filters** | Filter sponsors by industry (finance, tech, marketing, health, etc.) | UI — Starter+ |
| **Activity feed** | Real-time feed of sponsorship deals happening across newsletters | UI — Starter+ |
| **Verified contacts** | Decision-maker email + LinkedIn for sponsor outreach | UI — Pro+ |
| **Competitor monitoring** | Track which brands sponsor competitor newsletters, real-time alerts | UI — Pro+ |
| **Spend trends** | Brand sponsorship spending trajectory over time | UI — Pro+ |
| **Ad copy library** | Real newsletter ad examples from sponsors | UI — Pro+ |
| **Funding radar** | Recently-funded companies (higher sponsorship budget likelihood) | UI — Pro+ |
| **Rate calculator** | Benchmark sponsorship pricing by niche and list size | UI — free |
| **Outreach pipeline** | Track sponsor outreach status (contacted, replied, booked) | UI — Business |
| **CSV export** | Bulk export sponsor data | Export — Pro+ |
| **Bulk export** | Large-scale data export | Export — Business |
| **Full API** | Programmatic access to sponsor database | API — Business |
| **Sponsor calendar** | View open ad slots and scheduling | UI — Starter+ |
| **Watchlist** | Save and monitor specific brands | UI — Starter+ |
| **Custom reports** | Generate sponsor intelligence reports | UI — Business |
| **Weekly digest** | Email digest of sponsorship activity in your niche | Email — all tiers |

## Pricing, limits & plan gates

| Feature | Starter ($39/mo) | Pro ($89/mo) | Business ($199/mo) |
|---|---|---|---|
| Brand database access | Yes | Yes | Yes |
| Niche filters & search | Yes | Yes | Yes |
| Activity feed | Yes | Yes | Yes |
| Sponsor calendar | Yes | Yes | Yes |
| Watchlist | Yes | Yes | Yes |
| Weekly digest | Yes | Yes | Yes |
| **Verified contacts** | No | **Yes** | **Yes** |
| **Competitor monitoring** | No | **Yes** | **Yes** |
| **Spend trends** | No | **Yes** | **Yes** |
| **Ad copy library** | No | **Yes** | **Yes** |
| **Funding radar** | No | **Yes** | **Yes** |
| **CSV export** | No | **Yes** | **Yes** |
| **Team members** | 1 | 1 | **5** |
| **Outreach pipeline** | No | No | **Yes** |
| **Bulk export** | No | No | **Yes** |
| **Full API** | No | No | **Yes** |
| **Custom reports** | No | No | **Yes** |
| **Priority support** | No | No | **Yes** |
| Free trial | 7-day | 7-day | 7-day |

**Key gate**: The jump from Starter to Pro unlocks the most critical features for active prospecting (verified contacts, competitor monitoring, spend trends). The jump from Pro to Business is mainly for automation (API, pipeline, bulk export).

## Integrations

- **API** (Business tier): Programmatic access to the sponsor database. No public documentation found — contact SponsorGap support for API docs.
- **CSV export** (Pro+): Export sponsor lists for import into CRM, outreach tools, or spreadsheets.
- **No Zapier/Make integration**: Data movement requires manual CSV export or API.
- **No webhooks**: No event-driven notifications available.
- **No MCP server**: No Claude Code / LLM integration available.
- **Possible Airtable integration**: Referenced in some sources but not confirmed on the platform.

## Data model

SponsorGap's core objects based on the platform's features:

### Brand/Sponsor object
```json
<!-- Constructed from docs — verify against live API -->
{
  "brand_name": "Notion",
  "industry": "software",
  "niche_tags": ["productivity", "project-management", "SaaS"],
  "sponsorship_count": 42,
  "spend_trend": "increasing",
  "last_sponsored": "2026-05-01",
  "newsletters_sponsored": ["The Hustle", "Morning Brew", "TLDR"],
  "contacts": [
    {
      "name": "Jane Smith",
      "title": "Head of Growth Marketing",
      "email": "jane@notion.so",
      "linkedin": "https://linkedin.com/in/janesmith"
    }
  ],
  "funding": {
    "last_round": "Series C",
    "amount": "$275M",
    "date": "2024-04-15"
  }
}
```

### Newsletter object (for brand-side search)
```json
<!-- Constructed from docs — verify against live API -->
{
  "newsletter_name": "TLDR",
  "niche": "technology",
  "subscriber_count": 1200000,
  "open_rate": 0.52,
  "geography": "US",
  "sponsors": ["Notion", "LinearB", "Neon"],
  "cpm_range": "$50-$80"
}
```

## Quick-start recipes

### Recipe 1: Build a sponsor target list (UI workflow)

**Trigger**: You're launching sponsorship sales and need a prospect list.

**Steps**:
1. Log in to SponsorGap → Go to sponsor search
2. Filter by your newsletter's niche (e.g., "fintech")
3. Sort by spend trend ("increasing") to find brands actively expanding sponsorship budgets
4. Add top 20-30 brands to your watchlist
5. Upgrade to Pro to unlock verified contacts
6. Export to CSV → import into your outreach tool (Mailshake, Lemlist, etc.)

**Gotcha**: Start with brands sponsoring similar-sized newsletters. Fortune 500 brands in your niche may have minimum audience requirements of 50K+.

### Recipe 2: Monitor competitor sponsorships (Pro tier)

**Trigger**: You want to know who sponsors competitor newsletters to pitch the same brands.

**Steps**:
1. Go to competitor monitoring → Add competitor newsletter names
2. Enable real-time alerts for new sponsor placements
3. When a new sponsor appears, check the ad copy library for the actual ad they ran
4. Use the brand's verified contact to reach out with a pitch that references their competitor placement
5. Use the rate calculator to price competitively

**Gotcha**: Don't copy competitor pricing blindly — your audience demographics and engagement rates determine your rate, not theirs.

### Recipe 3: API-based sponsor pipeline (Business tier)

**Trigger**: You want to automate sponsor discovery and feed data into your CRM.

**Steps**:
1. Contact SponsorGap support for API documentation and credentials
2. Query the API for brands in your niche with "increasing" spend trends
3. Filter for brands with recent funding (higher budget likelihood)
4. Push brand + contact data to your CRM (HubSpot, Attio, etc.)
5. Use outreach pipeline to track deal stages

**Note**: API documentation is not publicly available. Request access at Business tier signup or via support.

## Integration patterns

### CRM sync (manual)
1. Export sponsors as CSV from SponsorGap (Pro+)
2. Map fields: brand name → company, contact email → email, contact name → contact, industry → custom field
3. Import into CRM
4. Set up a weekly export cadence to catch new sponsors

### Outreach tool pipeline
1. Export target sponsors with verified contacts
2. Import into cold email tool (Mailshake, Lemlist, Smartlead)
3. Create a sequence: pitch email → follow-up → break-up
4. Track responses in SponsorGap's outreach pipeline (Business) or in your CRM
5. Use ad copy library examples to personalize your pitch ("I saw your ad in {competitor newsletter}")
