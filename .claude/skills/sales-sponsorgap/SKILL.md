---
name: sales-sponsorgap
description: "SponsorGap platform help — newsletter sponsorship intelligence with 38K+ brand database, GPT-powered sponsor matching, verified decision-maker contacts, competitor monitoring, spend trends, and API. Use when you can't find brands that sponsor newsletters in your niche, need verified email contacts for sponsor decision-makers, want to monitor which brands are sponsoring competitor newsletters, unsure how to price your newsletter sponsorships, need sponsor spend trend data to time your outreach, or want to build a sponsor prospecting pipeline with outreach tracking. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved)."
argument-hint: "[describe your newsletter sponsor search or outreach question]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, platform]
---

# SponsorGap Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Find brands that sponsor newsletters in my niche
   - B) Get contact info for sponsor decision-makers
   - C) Monitor competitor sponsorship activity
   - D) Price my newsletter sponsorships
   - E) Track sponsor outreach pipeline
   - F) Use the SponsorGap API to automate sponsor research

2. **What's your newsletter niche?** (e.g., fintech, marketing, health, crypto)

3. **Current subscriber count and open rate?** (affects sponsor targeting)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, ads, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace / programmatic ad network | `/sales-paved [question]` |
| Finding newsletters to sponsor (brand side) | `/sales-reletter [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |
| Email deliverability | `/sales-deliverability [question]` |

If the question is SponsorGap-specific, continue to Step 3.

## Step 3 — SponsorGap platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Small list (<5K subs)**: Use SponsorGap's free search to research which brands sponsor similar-sized newsletters. Focus on niche-specific sponsors where your audience alignment matters more than list size.
- **Mid-size (5K-25K subs)**: Use Pro tier for verified contacts and competitor monitoring. Build a target list of 20-30 brands, then cold email decision-makers using the verified contacts.
- **Larger (25K+ subs)**: Business tier's API and bulk export let you systematize sponsor prospecting. Combine with Paved marketplace for inbound deals.
- **Timing outreach**: Use spend trend data to contact brands when their sponsorship spending is increasing, not declining.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Verified contacts require Pro ($89/mo)** — Starter plan gives you brand data but not decision-maker emails or LinkedIn profiles. You'll need to find contacts elsewhere on the free/Starter tier.
2. **API is Business-only ($199/mo)** — no programmatic access on Starter or Pro. If you need to automate sponsor research, budget for the Business tier.
3. **No Zapier/Make integration** — you can't connect SponsorGap to your CRM or outreach tool via iPaaS. Use CSV export (Pro+) or API (Business) to move data.
4. **Contact data accuracy varies** — verified contacts are best-effort. Always cross-reference with LinkedIn before outreach. Decision-makers change roles.
5. **Spend trends ≠ budget availability** — a brand increasing sponsorship spend may already be fully booked. Use trends to identify momentum, then verify availability directly.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts, Airtable database)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts, API)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Finding sponsors for a niche newsletter
**User says**: "I run a fintech newsletter with 8,000 subscribers. How do I find sponsors on SponsorGap?"
**Skill does**: Walks through niche filtering, explains Pro tier verified contacts, suggests building a 20-brand target list using competitor monitoring to see who sponsors similar fintech newsletters
**Result**: User has a targeted sponsor prospecting workflow

### Example 2: Automating sponsor research via API
**User says**: "How do I use SponsorGap's API to pull sponsor data into my CRM?"
**Skill does**: References API docs (Business tier required), shows how to query brands by niche, extract contact data, and push to CRM via CSV or API integration
**Result**: User understands API access requirements and data flow

### Example 3: Competitor sponsorship monitoring
**User says**: "I want to know who's sponsoring my competitor's newsletter"
**Skill does**: Explains competitor monitoring feature (Pro+), real-time alerts, how to use ad copy library to see actual sponsor placements, and how to time outreach based on competitor sponsor churn
**Result**: User sets up competitor monitoring and has an outreach strategy

## Troubleshooting

### Can't find sponsors in my niche
**Symptom**: Searching SponsorGap returns few or irrelevant brands
**Cause**: Niche is too narrow, or brands in your space use different category labels
**Solution**: Broaden your search terms. Search by adjacent niches (e.g., "SaaS" instead of "developer tools"). Check competitor newsletters to see who sponsors them, then search those brand names directly.

### Verified contacts are outdated
**Symptom**: Emails bounce or LinkedIn profiles show the person left the company
**Cause**: Contact data has a shelf life — people change roles
**Solution**: Cross-reference SponsorGap contacts with current LinkedIn profiles before outreach. Use the funding radar to focus on companies with recent funding (more likely to have active marketing teams).

### Not sure what to charge sponsors
**Symptom**: Brands are interested but you don't know your rate
**Cause**: No pricing benchmark for your niche and list size
**Solution**: Use SponsorGap's rate calculator and sponsor trend data to benchmark CPM rates in your niche. Start with $25-$50 CPM for general audiences, $50-$100+ for B2B/finance. Check what competitors charge by looking at their media kits.
