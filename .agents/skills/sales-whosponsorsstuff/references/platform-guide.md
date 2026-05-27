# Who Sponsors Stuff Platform Reference

## Overview

Who Sponsors Stuff is a newsletter sponsor intelligence platform that tracks 500+ email newsletters to surface 8,000+ active sponsors with decision-maker contacts and ad creative screenshots. It serves newsletter publishers and ad sales teams who need to identify, research, and cold-pitch potential sponsors. The core differentiator is visual ad intelligence — seeing actual ad creatives that sponsors are running in other newsletters.

## Capabilities & automation surface

| Module | Description | Access |
|---|---|---|
| Sponsor database | 8,000+ sponsors searchable by keyword and vertical | UI-only (web dashboard) |
| Ad creative library | Screenshots of actual ads running in tracked newsletters | UI-only |
| Decision-maker contacts | Direct contact info for ad buyers and marketing leads | UI-only |
| CSV export | Download filtered sponsor lists for CRM/outreach import | UI-only (manual download) |
| Email alerts | Custom daily or weekly notifications of new sponsors | Email delivery |
| Email Intelligence newsletter | Weekly curated newsletter with 10 new sponsors + ad market insights | Email delivery |

**No API. No webhooks. No Zapier/Make/MCP integration.** All programmatic access is limited to CSV exports and email alert subscriptions.

## Pricing, limits & plan gates

<!-- Pricing best-effort from research — verify with vendor -->

| Tier | Access | Key features |
|---|---|---|
| **Free** | ~10% of sponsor database | Weekly Email Intelligence newsletter, limited search, CSV export |
| **Sales Pro** | Full database (8,000+ sponsors) | Full search, daily/weekly alerts, ad creative library, unlimited team seats, CSV export |
| **Enterprise** | Custom | Custom solutions, contact hello@whosponsorsstuff.com |

**Pricing transparency**: Sales Pro pricing is not publicly listed. Contact hello@whosponsorsstuff.com for quotes. Enterprise is fully custom.

**Alert volume**: ~20 new sponsors tracked per day, ~100 per week across all verticals.

**Team seats**: Sales Pro includes unlimited seats at no extra cost — a key advantage over per-seat-priced competitors. 50+ publisher sales teams use the platform.

## Data coverage

- **500+ newsletters tracked** across verticals: tech, finance, entrepreneurship, education, podcasting, and more
- **8,000+ sponsors** with contact information
- **Sponsorship types monitored**: primary logo sponsorships, secondary sponsorships, sponsored links
- **Ad creative tracking**: images of sponsors' actual ads as they appear in newsletters, including landing pages and tracking codes

## Integrations

No native integrations. The only data export path is:

1. **CSV export** → import into any CRM or outreach tool (HubSpot, Pipedrive, Lemlist, Mailshake, etc.)
2. **Email alerts** → forward to Slack/Teams via email-to-channel integrations
3. **Manual workflow** → copy sponsor data from dashboard to your tools

## Data model

No API means no structured data objects. The database contains records with approximately these fields (based on UI observation):

```json
// Sponsor record (representative — no API to verify)
{
  "company_name": "Stripe",
  "vertical": "fintech",
  "contact_name": "Jane Doe",
  "contact_email": "jane@stripe.com",
  "contact_title": "Head of Partnerships",
  "newsletters_sponsored": ["The Hustle", "Morning Brew", "TLDR"],
  "ad_creative_url": "https://...",
  "landing_page_url": "https://...",
  "first_seen": "2025-03-15",
  "last_seen": "2026-05-01"
}
```
<!-- Constructed from UI observation — no API to verify -->

## Quick-start recipes

### Recipe 1: Build a sponsor prospect list from scratch

**Trigger**: New newsletter publisher wants to start selling sponsorships

1. Sign up for the free Email Intelligence newsletter
2. Use free-tier search to explore sponsor verticals adjacent to your niche
3. Upgrade to Sales Pro for full database access
4. Filter sponsors by vertical keyword (e.g., "developer tools", "fintech", "marketing")
5. Review ad creative screenshots to understand what formats sponsors expect
6. Export filtered results as CSV
7. Import into your outreach tool (Lemlist, Mailshake, etc.)

**No code required** — this is a UI-only workflow.

### Recipe 2: Daily new-sponsor alert pipeline

**Trigger**: Need to stay on top of new sponsors entering the market

1. In Sales Pro, configure a custom daily email alert for your vertical
2. Each morning, review the alert for new sponsors
3. For promising sponsors, check their ad creative in the dashboard
4. Export new additions to your running prospect CSV
5. Add to your outreach sequence

**Workaround for automation**: Since there's no API or webhook, set up a Gmail/Outlook filter to forward WSS alert emails to a Slack channel (via email-to-Slack) for team visibility.

### Recipe 3: Competitive intelligence for sponsor pitches

**Trigger**: Need to show potential sponsors that competitors advertise in newsletters

1. Search for competitor brands in the WSS database
2. Note which newsletters they sponsor and their ad creative
3. In your pitch, reference: "Companies like [Competitor] are already reaching [niche] audiences through newsletters like [Newsletter A] and [Newsletter B]"
4. Include screenshots from WSS showing competitor ad placements
5. Position your newsletter as a complementary or better-targeted placement

## Comparison with alternatives

| Feature | Who Sponsors Stuff | SponsorGap | SponsorLeads | Paved |
|---|---|---|---|---|
| **Sponsor database size** | 8,000+ | 38,000+ | 4,318+ | N/A (marketplace) |
| **Ad creative screenshots** | Yes | No | No | No |
| **Decision-maker contacts** | Yes | Yes (verified) | Yes (with LinkedIn) | N/A |
| **API access** | No | Yes (REST API) | No (Airtable) | No |
| **Competitor monitoring** | Manual (search) | Automated alerts | No | No |
| **Spend trend data** | No | Yes | No | No |
| **Pricing** | Contact sales | $39-$199/mo | $97/mo | 30% commission |
| **Team seats** | Unlimited | Per-plan limits | Airtable-based | N/A |
| **Free tier** | ~10% of database | Free Starter | No free tier | Free to list |

**When to choose Who Sponsors Stuff**: You want visual competitive intelligence (ad screenshots), need unlimited team seats, and prefer a curated database with ad creative context.

**When to choose SponsorGap**: You need API access for programmatic workflows, automated competitor monitoring, or spend trend data.

**When to choose SponsorLeads**: You want a simple curated list at transparent pricing ($97/mo) without needing ad creative or competitor monitoring.

**When to choose Paved**: You want inbound sponsor deals through a marketplace rather than outbound prospecting.

## Integration patterns

### CSV-to-CRM pipeline

1. Export sponsors from WSS dashboard (filtered by vertical)
2. Map CSV columns to CRM fields:
   - `company_name` → Company
   - `contact_name` → Contact Name (split first/last if needed)
   - `contact_email` → Email
   - `contact_title` → Job Title
3. Verify emails before import (ZeroBounce, SafetyMails)
4. Import into CRM with a "Source: Who Sponsors Stuff" tag
5. Add to your sponsor outreach sequence

### Alert-to-Slack workaround

1. Configure daily WSS email alerts in Sales Pro
2. In Gmail: create a filter for "from:whosponsorsstuff.com" → forward to your Slack channel's email address
3. In Slack: the alert arrives as a message your team can act on

No native webhook or API integration is available. All automation must go through email forwarding or manual CSV workflows.
