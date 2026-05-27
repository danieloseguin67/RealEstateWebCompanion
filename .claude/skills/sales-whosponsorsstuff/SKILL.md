---
name: sales-whosponsorsstuff
description: "Who Sponsors Stuff platform help — newsletter sponsor intelligence database tracking 500+ newsletters and 8,000+ sponsors with decision-maker contacts, ad creative screenshots, CSV exports, and email alerts. Use when you need to find brands actively sponsoring newsletters in your niche, want to see what ads sponsors are running in competitor newsletters, need verified decision-maker contacts for sponsor outreach, trying to decide between Who Sponsors Stuff Sales Pro and alternatives like SponsorGap or SponsorLeads, or want daily alerts when new sponsors enter the market. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved)."
argument-hint: "[describe your newsletter sponsor prospecting question]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, platform]
---

# Who Sponsors Stuff Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Find companies that sponsor newsletters in my niche
   - B) See what ads sponsors are running in other newsletters
   - C) Get contact info for sponsor decision-makers
   - D) Compare Who Sponsors Stuff to alternatives (SponsorGap, SponsorLeads, Paved)
   - E) Set up alerts for new sponsors entering the market

2. **What's your newsletter niche?** (e.g., fintech, marketing, health, tech, education)

3. **Current subscriber count and open rate?** (affects sponsor targeting)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, ads, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace / programmatic ad network | `/sales-paved [question]` |
| Sponsor intelligence with API access, competitor monitoring, spend trends | `/sales-sponsorgap [question]` |
| Curated sponsor lead list in Airtable with weekly updates | `/sales-sponsorleads [question]` |
| Finding newsletters to sponsor (brand side) | `/sales-reletter [question]` |
| Managing sponsor operations (invoices, portals, reporting) | `/sales-sponsy [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |

If the question is Who Sponsors Stuff-specific, continue to Step 3.

## Step 3 — Who Sponsors Stuff platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, alerting workflows, and comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Just starting out (<5K subs)**: Use the free tier to research which brands sponsor newsletters similar to yours. Build a target sponsor list even before you have enough reach to pitch.
- **Ready to sell (5K-25K subs)**: Upgrade to Sales Pro for full database access. Filter by vertical, download CSV, and build a cold outreach pipeline. Set up daily alerts for new sponsors.
- **Scaling ad sales (25K+ subs)**: Use Sales Pro to monitor competitive landscape — see who's advertising where. Combine with SponsorGap (for spend trends and API) or Paved (for inbound marketplace deals).
- **Team selling**: Sales Pro includes unlimited seats — give your whole sales team access without per-seat costs.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **No API, no webhooks, no Zapier/Make**: All data access is through the web interface. CSV export is the only way to get data into external tools.
2. **Sales Pro pricing not public**: You must contact the team (hello@whosponsorsstuff.com) for pricing. No self-serve checkout.
3. **Free tier is severely limited**: Only ~10% of the sponsor database is searchable on the free plan. The weekly newsletter with 10 sponsors is free, but the full database requires Sales Pro.
4. **Ad creative visibility is a differentiator**: Unlike SponsorGap or SponsorLeads, you can see the actual ad images sponsors are running in other newsletters — useful for crafting your pitch.
5. **Data freshness depends on alert cadence**: ~20 new sponsors tracked daily, ~100/week. Set daily alerts to catch new entrants early.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring, spend trends, API)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts, Airtable database)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts, API)
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory calendar, sponsor CRM, customer portals, reporting)
- `/sales-ohmynewst` — OhMyNewst newsletter sponsorship marketplace for Spain & LATAM
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Finding sponsors for a tech newsletter
**User says**: "I run a developer tools newsletter with 15,000 subscribers. How do I use Who Sponsors Stuff to find sponsors?"
**Skill does**: Explains filtering by tech/developer vertical, how to use ad creative screenshots to understand what sponsors expect, suggests CSV export workflow into outreach tool, recommends daily alerts for new tech sponsors
**Result**: User has a targeted sponsor prospecting workflow with visual competitive intelligence

### Example 2: Comparing Who Sponsors Stuff to alternatives
**User says**: "Should I use Who Sponsors Stuff or SponsorGap for finding newsletter sponsors?"
**Skill does**: Compares data coverage (WSS 8K+ sponsors with ad creative vs SponsorGap 38K+ brands with API), pricing transparency (WSS requires contact vs SponsorGap $39-$199/mo), differentiators (WSS has ad screenshots, SponsorGap has competitor monitoring and API)
**Result**: User picks the right tool — WSS for visual competitive intel, SponsorGap for programmatic workflows

### Example 3: Setting up a sponsor alert pipeline
**User says**: "How do I automate getting notified when new sponsors start advertising in fintech newsletters?"
**Skill does**: Walks through setting up custom email alerts by vertical, explains ~20 new sponsors/day cadence, suggests combining with CSV export workflow to maintain a running prospect list, notes no API/webhook workaround
**Result**: User has a daily alert → CSV export → outreach pipeline despite no API

## Troubleshooting

### Free tier doesn't show sponsors in my niche
**Symptom**: Searching the free database returns few or no relevant sponsors
**Cause**: The free tier only exposes ~10% of the full database — your niche may not be in the free subset
**Solution**: The weekly Email Intelligence newsletter (free) surfaces 10 new sponsors/week across all verticals. Subscribe to gauge sponsor quality before upgrading to Sales Pro.

### Can't figure out Sales Pro pricing
**Symptom**: No public pricing page, unsure what it costs
**Cause**: Who Sponsors Stuff uses a contact-based sales process for Sales Pro
**Solution**: Email hello@whosponsorsstuff.com or use the "Get in Touch" form. For budgeting, comparable tools range from $39-$200/mo. If price sensitivity is a concern, start with SponsorGap Starter ($39/mo) or SponsorLeads ($97/mo) which have transparent pricing.

### Exported CSV contacts bouncing
**Symptom**: Outreach emails to exported contacts bounce or go unanswered
**Cause**: Decision-makers change roles; contact data has a shelf life
**Solution**: Verify emails with a tool like ZeroBounce before loading into your outreach tool. Cross-reference contacts with LinkedIn. Focus on sponsors who entered the database recently (use date filters or recent alerts).
