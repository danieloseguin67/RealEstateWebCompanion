# SponsorLeads Platform Reference

## Overview

SponsorLeads is a curated database of companies actively sponsoring newsletters, delivered via an Airtable-powered interface. It provides decision-maker contact details (email + LinkedIn) for sponsor outreach. Primary differentiator: simplicity — it's a ready-to-use lead list, not an intelligence platform.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Sponsor database** | 4,318+ companies tracked across 41,737+ sponsorship placements | UI — all plans |
| **Decision-maker contacts** | Email + LinkedIn for CMOs, growth directors, demand gen leads | UI — all plans |
| **Weekly new leads** | ~24 new companies added weekly via daily updates | UI — Pro plan |
| **Airtable filtering** | Filter, group, and sort leads by industry, company, niche | UI — all plans |
| **Data export** | Export leads via Airtable's native CSV/export | Export — all plans |
| **Team access** | Invite team members for collaborative prospecting | UI — all plans |
| **Unlimited reports** | Create unlimited saved views and reports in Airtable | UI — all plans |
| **Historical archive** | Full archive of all 4,318+ companies and 3,894+ emails | UI — Yearly Pro or Boost |

**Not available**: API, webhooks, Zapier/Make, MCP server, competitor monitoring, spend trends, AI matching. For these features, see SponsorGap (`/sales-sponsorgap`).

## Pricing, limits & plan gates

| Feature | Pro Monthly ($97/mo) | Pro Yearly ($970/yr) | Boost ($997 one-time) |
|---|---|---|---|
| Past month's leads (~493 companies) | Yes | Yes | N/A |
| Full historical archive (4,318+ companies) | No | **Yes** | **Yes** |
| Daily new lead additions | Yes | Yes | **No** |
| ~24 new companies/week | Yes | Yes | **No** |
| Decision-maker emails (3,894+) | Yes | Yes | Yes |
| Decision-maker LinkedIn profiles | Yes | Yes | Yes |
| Airtable filtering & sorting | Yes | Yes | Yes |
| Data export (CSV via Airtable) | Yes | Yes | Yes |
| Team member invitations | Yes | Yes | Yes |
| Unlimited reports | Yes | Yes | Yes |

**Key decision**: Monthly ($97/mo) gives only the last month of leads. Yearly ($970/yr) unlocks the full archive — effectively a 2-month discount plus massively more data. Boost ($997) is a one-time snapshot with no updates.

**No free tier**: Unlike SponsorGap (free search) or Paved (free marketplace listing), SponsorLeads is paid-only.

## Integrations

SponsorLeads has **no programmatic integrations**:

- **No API**: No endpoints, no auth, no programmatic access
- **No webhooks**: No event notifications
- **No Zapier/Make**: No iPaaS modules
- **No MCP server**: No LLM integration

**Workaround — Airtable export pipeline**:
1. Open SponsorLeads Airtable workspace
2. Filter leads by your target criteria
3. Export as CSV via Airtable's "Download CSV" or share view
4. Import CSV into your outreach tool or CRM

If you need the Airtable API for automation, you may be able to use Airtable's own API on the shared base (if the workspace permissions allow it), but this is not officially supported by SponsorLeads.

## Data model

### Sponsor lead object (Airtable row)
```json
<!-- Constructed from product description — verify against actual Airtable view -->
{
  "company_name": "Notion",
  "industry": "software",
  "newsletter_sponsored": "The Hustle",
  "sponsorship_date": "2026-04-15",
  "contact_name": "Jane Smith",
  "contact_title": "Head of Growth Marketing",
  "contact_email": "jane@notion.so",
  "contact_linkedin": "https://linkedin.com/in/janesmith",
  "alternative_contact_email": "marketing@notion.so"
}
```

**Notes on data shape**:
- Each row represents a company-newsletter sponsorship instance
- A company may appear in multiple rows if it sponsors multiple newsletters
- Contact details target decision-makers (CMOs, growth directors, demand gen)
- Alternative contacts provided when primary email is unavailable

## Quick-start recipes

### Recipe 1: Build a sponsor prospect list

**Trigger**: You need a list of potential sponsors for cold outreach.

**Steps**:
1. Open SponsorLeads Airtable workspace
2. Group by industry or filter by your newsletter's niche
3. Sort by most recent sponsorship date (prioritize active spenders)
4. Select 20-30 companies that match your audience
5. Export as CSV

**Import into outreach tool (Lemlist example)**:
```
CSV field mapping:
  company_name     → Company
  contact_name     → First Name + Last Name (split manually or with formula)
  contact_email    → Email
  contact_linkedin → LinkedIn URL (for personalization)
  contact_title    → Job Title (for subject line personalization)
```

**Gotcha**: Always verify emails before sending. Decision-makers change roles — run the CSV through ZeroBounce or SafetyMails first.

### Recipe 2: Weekly sponsor outreach cadence

**Trigger**: You want a repeatable weekly workflow for finding and contacting new sponsors.

**Steps**:
1. **Monday**: Check SponsorLeads for new leads added that week (daily additions)
2. **Tuesday**: Filter new leads by your niche, export top 5-10 new companies
3. **Wednesday**: Verify contacts on LinkedIn — confirm they're still at the company
4. **Thursday**: Import verified leads into your outreach sequence
5. **Friday**: Review responses and follow-up queue

**Pitch template starting point**:
```
Subject: Sponsoring {your newsletter name} — {subscriber count} {niche} subscribers

Hi {contact_name},

I saw {company_name} is sponsoring newsletters in {niche}. I run {your newsletter}
with {subscriber count} subscribers and a {open rate}% open rate.

Would you be open to a quick chat about a sponsorship placement?

[link to media kit]
```

**Gotcha**: Reference specific newsletters they've sponsored (SponsorLeads shows this) to prove you've done your homework.

### Recipe 3: Yearly archive deep-dive

**Trigger**: You want to analyze the full sponsorship landscape in your niche.

**Steps**:
1. Subscribe to the yearly plan ($970) or Boost ($997) for the full archive
2. Filter the full 4,318+ companies by your niche
3. Create an Airtable view grouped by company with count of sponsorships
4. Companies with the most sponsorships are the most active spenders — prioritize them
5. Cross-reference with SponsorGap's spend trends for budget trajectory data
6. Build a tiered prospect list: Tier 1 (active, niche match), Tier 2 (adjacent niche), Tier 3 (broad match)

**Gotcha**: Historical data includes companies that may have stopped sponsoring. Check the most recent sponsorship date before outreach.

## Comparison with alternatives

| Feature | SponsorLeads | SponsorGap | Paved | Who Sponsors Stuff |
|---|---|---|---|---|
| **Data type** | Curated lead list | Intelligence platform | Marketplace + ad network | Tracking database |
| **Database size** | 4,318+ companies | 38,000+ brands | 3,000+ publishers | 500+ newsletters tracked |
| **Decision-maker contacts** | Yes (all plans) | Yes (Pro+ $89/mo) | No (marketplace model) | Yes (Sales Pro) |
| **API** | No | Yes (Business $199/mo) | Yes | No |
| **Competitor monitoring** | No | Yes (Pro+) | No | Limited |
| **Spend trends** | No | Yes (Pro+) | No | No |
| **AI matching** | No | GPT-powered | Algorithmic | No |
| **Starting price** | $97/mo | $39/mo (Starter) | Free (publisher listing) | $99/mo |
| **Best for** | Simple lead lists | Intelligence + automation | Inbound sponsorship deals | Newsletter ad tracking |
