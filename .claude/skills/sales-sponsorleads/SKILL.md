---
name: sales-sponsorleads
description: "SponsorLeads platform help — curated Airtable database of companies actively sponsoring newsletters, with decision-maker emails and LinkedIn profiles, weekly new leads, filtering and export. Use when you need a list of companies that sponsor newsletters, want decision-maker contacts for sponsor outreach, trying to figure out which brands are spending on newsletter ads, unsure whether SponsorLeads is worth $97/mo vs free alternatives like SponsorGap or Paved, or need to export sponsor leads into your outreach tool. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved)."
argument-hint: "[describe your newsletter sponsor prospecting question]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, platform]
---

# SponsorLeads Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Find companies that sponsor newsletters in my niche
   - B) Get contact info for sponsor decision-makers
   - C) Compare SponsorLeads to alternatives (SponsorGap, Paved, Who Sponsors Stuff)
   - D) Export sponsor leads to my outreach tool or CRM
   - E) Decide if SponsorLeads is worth the price

2. **What's your newsletter niche?** (e.g., fintech, marketing, health, crypto)

3. **Current subscriber count and open rate?** (affects sponsor targeting)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, ads, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace / programmatic ad network | `/sales-paved [question]` |
| Sponsor intelligence with API access, competitor monitoring, spend trends | `/sales-sponsorgap [question]` |
| Finding newsletters to sponsor (brand side) | `/sales-reletter [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |

If the question is SponsorLeads-specific, continue to Step 3.

## Step 3 — SponsorLeads platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, export workflows, and comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Small list (<5K subs)**: Use SponsorLeads to research which brands sponsor similar newsletters. Even before you have enough subs for direct sponsorships, build a target list for when you're ready.
- **Mid-size (5K-25K subs)**: Filter for brands sponsoring newsletters of similar size. Export contacts and run a cold outreach sequence using your outreach tool.
- **Larger (25K+ subs)**: Use the full archive to identify patterns — which industries sponsor most, which brands are increasing spend. Combine with SponsorGap (for competitor monitoring) or Paved (for marketplace inbound).
- **Budget-conscious**: Compare yearly plan ($970) vs monthly ($97) — yearly includes full historical archive. Consider SponsorGap Starter ($39/mo) for lower-cost alternative with different features.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **No API — Airtable-only interface**: All data access is through the Airtable UI. You can export data using Airtable's native features but there's no programmatic API, no webhooks, no Zapier/Make.
2. **Monthly plan excludes historical archive**: The $97/mo Pro plan only gives access to the past month's leads (~493 companies). The full archive (4,318+ companies) requires the yearly plan ($970) or Boost ($997 one-time).
3. **Boost plan has no ongoing updates**: The $997 one-time Boost gives you the full archive at signup but no new weekly leads after that. If you need fresh leads, you need Pro.
4. **Contact data has a shelf life**: Decision-makers change roles. Cross-reference SponsorLeads contacts with LinkedIn before outreach.
5. **No competitor monitoring or spend trends**: Unlike SponsorGap, SponsorLeads doesn't track which brands sponsor your competitors or show spending trajectories.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring, spend trends, API)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts, API)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Finding sponsors for a niche newsletter
**User says**: "I run a fintech newsletter with 12,000 subscribers. How do I use SponsorLeads to find sponsors?"
**Skill does**: Explains Airtable filtering by niche, how to sort for active sponsors, suggests exporting top 20-30 leads and importing into outreach tool, recommends yearly plan for full archive access
**Result**: User has a sponsor prospecting workflow with a concrete target list

### Example 2: Comparing SponsorLeads to alternatives
**User says**: "Is SponsorLeads worth it or should I use SponsorGap?"
**Skill does**: Compares data model (curated leads vs intelligence platform), pricing (SponsorLeads $97/mo vs SponsorGap $39-$199/mo), feature gaps (no API, no competitor monitoring in SponsorLeads), recommends based on user's needs
**Result**: User picks the right tool for their budget and workflow

### Example 3: Exporting leads to an outreach tool
**User says**: "How do I get SponsorLeads data into Lemlist for a cold email campaign?"
**Skill does**: Walks through Airtable CSV export, field mapping (company → company, contact email → email, contact name → first/last name), import into Lemlist, suggests sequence structure for sponsor pitches
**Result**: User has a working pipeline from SponsorLeads to outreach

## Troubleshooting

### Leads don't match my niche
**Symptom**: Filtering in Airtable returns irrelevant sponsors
**Cause**: Niche categories may not match your exact vertical, or your niche is too narrow
**Solution**: Broaden your filter terms. Search by adjacent niches (e.g., "B2B" instead of "developer tools"). Try filtering by newsletter names you recognize that are similar to yours.

### Contact emails bouncing
**Symptom**: Outreach emails to SponsorLeads contacts bounce
**Cause**: Decision-maker changed roles or company since the data was captured
**Solution**: Cross-reference every contact with their LinkedIn profile before emailing. Use an email verification tool (ZeroBounce, SafetyMails) on your export before loading into your outreach tool.

### Unsure if the price is justified
**Symptom**: $97/mo feels expensive for a database of leads
**Cause**: Unclear ROI — depends on whether you close sponsors from the leads
**Solution**: Calculate: one $200 sponsorship placement closes from SponsorLeads leads = 2 months paid for. Start with one month to test, track how many leads convert to conversations. If conversion is too low, try SponsorGap ($39/mo Starter) or free options like Paved's Radar.
