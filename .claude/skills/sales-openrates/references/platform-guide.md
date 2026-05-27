# Open Rates Platform Reference

## Overview

Open Rates is a newsletter sponsor prospecting database tracking 10,000+ companies actively advertising in newsletters. It provides decision-maker contact information and niche filtering for newsletter publishers looking to sell sponsorships. The platform's primary use case is building cold outreach lists of brands that are already buying newsletter ad placements.

## Capabilities & automation surface

| Module | Description | Access |
|---|---|---|
| Sponsor database | 10,000+ active newsletter sponsors searchable by niche/vertical | UI-only (web dashboard) |
| Contact directory | Decision-maker contact info for sponsor outreach | UI-only |
| Niche filtering | Filter sponsors by vertical/industry to find relevant brands | UI-only |
| Sponsor activity tracking | Shows which companies are actively advertising in newsletters | UI-only |

**No API. No webhooks. No Zapier/Make/MCP integration.** All access is through the web interface.

## Pricing, limits & plan gates

<!-- Pricing best-effort from research — verify with vendor -->

Pricing is not publicly disclosed. Contact the Open Rates team through their website for quotes.

**For reference, comparable tools:**
| Tool | Pricing | Database size |
|---|---|---|
| Open Rates | Contact sales | 10,000+ sponsors |
| SponsorGap | $39-$199/mo | 38,000+ brands |
| SponsorLeads | $97/mo or $970/yr | 4,318+ companies |
| Who Sponsors Stuff | Contact sales | 8,000+ sponsors |

## Data coverage

- **10,000+ active sponsors** tracked in real-time
- Sponsors are companies actively buying newsletter ad placements
- Coverage spans multiple verticals and newsletter niches
- Contact information for decision-makers included

## Integrations

No native integrations. Data export workflow:

1. Search and filter sponsors in the web dashboard
2. Copy/export contact data manually
3. Import into your CRM or outreach tool

## Data model

No API — data model inferred from platform description:

```json
// Sponsor record (representative — no API to verify)
{
  "company_name": "Acme Corp",
  "vertical": "marketing",
  "contact_name": "John Smith",
  "contact_email": "john@acmecorp.com",
  "contact_title": "Marketing Director",
  "active_sponsor": true,
  "newsletters_sponsoring": ["Newsletter A", "Newsletter B"]
}
```
<!-- Constructed from product description — no API to verify -->

## Quick-start recipes

### Recipe 1: Build a sponsor outreach list

**Trigger**: Newsletter publisher wants to find and pitch potential sponsors

1. Sign up at openrates.co
2. Search/filter for sponsors in your newsletter's vertical
3. Build a shortlist of 20-30 actively sponsoring companies
4. Export contact info (manual copy or export if available)
5. Verify emails with ZeroBounce or SafetyMails before loading into outreach
6. Import into Lemlist, Mailshake, or your outreach tool of choice
7. Personalize pitches referencing the sponsor's existing newsletter ad activity

**No code required** — entirely UI-based workflow.

### Recipe 2: Competitive sponsor research

**Trigger**: Need to understand what brands are spending on newsletter ads in your space

1. Search Open Rates for your niche vertical
2. Identify the most active sponsors (companies appearing across multiple newsletters)
3. Note which types of companies are investing (SaaS, fintech, health, etc.)
4. Use this intelligence to:
   - Approach similar companies not yet in your newsletter
   - Set competitive pricing based on market activity
   - Build a pitch deck showing category sponsor activity

### Recipe 3: Combine with other sponsor tools

**Trigger**: Need a comprehensive sponsor prospecting stack

Open Rates works best as one layer in a multi-tool approach:

1. **Open Rates** (10K+ sponsors) — broad database for initial prospecting
2. **SponsorGap** (38K+ brands) — deeper intelligence with API access, competitor monitoring, spend trends
3. **Who Sponsors Stuff** (8K+ sponsors) — ad creative screenshots for pitch preparation
4. **SponsorLeads** (4K+ companies) — curated leads with LinkedIn profiles
5. **Paved** (marketplace) — inbound sponsor deals for passive monetization

Start with Open Rates for breadth, layer SponsorGap for depth, use Paved for inbound.

## Comparison with alternatives

| Feature | Open Rates | SponsorGap | Who Sponsors Stuff | SponsorLeads | Paved |
|---|---|---|---|---|---|
| **Database size** | 10,000+ | 38,000+ | 8,000+ | 4,318+ | N/A (marketplace) |
| **Decision-maker contacts** | Yes | Yes (verified) | Yes | Yes (+ LinkedIn) | N/A |
| **Ad creative screenshots** | No | No | Yes | No | No |
| **API access** | No | Yes (REST) | No | No (Airtable) | No |
| **Competitor monitoring** | No | Yes (automated) | Manual | No | No |
| **Spend trend data** | No | Yes | No | No | No |
| **Pricing** | Contact sales | $39-$199/mo | Contact sales | $97/mo | 30% commission |
| **Best for** | Broad prospecting | Intelligence workflows | Visual competitor intel | Simple curated lists | Inbound deals |

## Integration patterns

### Manual export pipeline

Since there's no API:

1. Filter sponsors in the Open Rates dashboard
2. Copy/export contact data
3. Clean and verify emails (ZeroBounce, SafetyMails)
4. Map fields to your CRM/outreach tool:
   - Company name → Company
   - Contact name → Name (split first/last)
   - Contact email → Email
   - Job title → Title
5. Tag imported contacts as "Source: Open Rates"
6. Add to your sponsor outreach sequence

If you need automated data pipelines, consider SponsorGap which offers a REST API for programmatic access.
