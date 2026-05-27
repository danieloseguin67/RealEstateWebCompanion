---
name: sales-openrates
description: "Open Rates platform help — real-time database of 10,000+ companies actively advertising in newsletters, with decision-maker contacts and niche filtering for sponsor prospecting. Use when you need to find brands that are actively buying newsletter ad placements, want contact info for sponsor decision-makers in your niche, trying to build a list of potential sponsors to pitch, comparing Open Rates to alternatives like SponsorGap or Who Sponsors Stuff, or need a larger sponsor database than SponsorLeads offers. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved)."
argument-hint: "[describe your newsletter sponsor prospecting question]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, platform]
---

# Open Rates Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Find companies that sponsor newsletters in my niche
   - B) Get contact info for sponsor decision-makers
   - C) Compare Open Rates to alternatives (SponsorGap, Who Sponsors Stuff, SponsorLeads)
   - D) Build a sponsor outreach list for cold pitching
   - E) Understand what sponsors are actively buying in my vertical

2. **What's your newsletter niche?** (e.g., fintech, marketing, health, tech, education)

3. **Current subscriber count and open rate?** (affects sponsor targeting)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, ads, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace / programmatic ad network | `/sales-paved [question]` |
| Sponsor intelligence with API access, competitor monitoring, spend trends | `/sales-sponsorgap [question]` |
| Sponsor intelligence with ad creative screenshots | `/sales-whosponsorsstuff [question]` |
| Curated sponsor lead list in Airtable with weekly updates | `/sales-sponsorleads [question]` |
| Managing sponsor operations (invoices, portals, reporting) | `/sales-sponsy [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |

If the question is Open Rates-specific, continue to Step 3.

## Step 3 — Open Rates platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, data coverage, comparison with alternatives, and prospecting workflows.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Small list (<5K subs)**: Use Open Rates to research which brands sponsor newsletters in your niche. Build a target sponsor list for when you're ready to pitch.
- **Mid-size (5K-25K subs)**: Filter sponsors by your vertical, export contacts, and run a cold outreach campaign. Focus on brands already advertising in similar-sized newsletters.
- **Larger (25K+ subs)**: Use the 10K+ sponsor database to identify patterns — which industries are most active, which brands are scaling spend. Combine with SponsorGap (for trend data and API) or Who Sponsors Stuff (for ad creative intel).
- **Budget-conscious**: Compare with SponsorGap Starter ($39/mo) and SponsorLeads ($97/mo) which have transparent pricing. Open Rates pricing requires contacting the team.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **No API, no webhooks, no Zapier/Make**: All data access is through the web interface only. No programmatic access.
2. **Pricing not publicly disclosed**: You must contact the Open Rates team for pricing. No self-serve checkout visible.
3. **Database size is the main differentiator**: 10,000+ sponsors is larger than SponsorLeads (~4,318) but smaller than SponsorGap (~38,000). The value depends on niche coverage and data freshness.
4. **No ad creative visibility**: Unlike Who Sponsors Stuff, you can't see the actual ads sponsors are running. Focus is on contact data and sponsor activity.
5. **Website may have connectivity issues**: The openrates.co domain has shown intermittent TLS errors — if the site is unreachable, try again later or contact support.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring, spend trends, API)
- `/sales-whosponsorsstuff` — Who Sponsors Stuff sponsor intelligence (8,000+ sponsors, ad creative screenshots, email alerts)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts, Airtable database)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts, API)
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory calendar, sponsor CRM, customer portals, reporting)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Finding sponsors for a health newsletter
**User says**: "I run a health and wellness newsletter with 10,000 subscribers. How do I use Open Rates to find sponsors?"
**Skill does**: Explains how to filter the 10K+ sponsor database by health/wellness vertical, suggests building a shortlist of 20-30 actively sponsoring brands, recommends exporting contacts and verifying before cold outreach
**Result**: User has a targeted sponsor prospect list ready for outreach

### Example 2: Comparing Open Rates to alternatives
**User says**: "Should I use Open Rates or SponsorGap for finding newsletter sponsors?"
**Skill does**: Compares database size (Open Rates 10K+ vs SponsorGap 38K+), features (Open Rates is simpler prospecting tool vs SponsorGap has API, competitor monitoring, spend trends), pricing (both require contacting sales or have tiered pricing)
**Result**: User picks the right tool — Open Rates for simple prospecting, SponsorGap for intelligence-driven workflows

### Example 3: Automating sponsor data into outreach tools
**User says**: "Can I automatically sync Open Rates data into my CRM?"
**Skill does**: Explains no API or native integrations exist, walks through manual export workflow, suggests SponsorGap as an alternative if API access is required for automated pipelines
**Result**: User understands the manual workflow and can decide if that's sufficient or if they need a more automated tool

## Troubleshooting

### Database doesn't cover my niche
**Symptom**: Searching for sponsors in your vertical returns too few results
**Cause**: The 10K+ sponsors may skew toward popular verticals (tech, business, marketing); smaller niches may have less coverage
**Solution**: Try broader search terms (e.g., "technology" instead of "developer tools"). If coverage is truly insufficient, try SponsorGap (38K+ brands) or Who Sponsors Stuff (500+ newsletters tracked) for broader coverage.

### Can't determine pricing before committing
**Symptom**: No public pricing page, unsure about cost
**Cause**: Open Rates uses a contact-based sales process
**Solution**: Reach out directly through their website. For comparison: SponsorGap Starter is $39/mo, SponsorLeads Pro is $97/mo. If transparent pricing matters, start with one of those.

### Contact data is stale or bouncing
**Symptom**: Emails to Open Rates contacts bounce or get no response
**Cause**: Decision-makers change roles; contact databases have a natural decay rate
**Solution**: Always verify emails before sending (ZeroBounce, SafetyMails). Cross-reference contacts with LinkedIn for current role. Focus outreach on the most recently active sponsors.
