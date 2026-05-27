---
name: sales-megahit
description: "Megahit platform help — B2B newsletter subscriber enrichment with LinkedIn data to identify sponsorship decision-makers, auto-enrichment of new subscribers, privacy-first architecture on customer-controlled servers, ESP integrations with Beehiiv, Kit, Ghost, Substack, Mailchimp, and more. Use when you want to find potential sponsors hiding in your subscriber list, need to enrich newsletter subscribers with job titles and company data, trying to build a targeted sponsor outreach list from your own audience, wondering how Megahit compares to SponsorGap or Who Sponsors Stuff for finding sponsors, or need help connecting Megahit to your ESP. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved or /sales-hecto)."
argument-hint: "[describe your Megahit question or subscriber enrichment goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, enrichment, platform]
github: "https://github.com/nikwen"
---

# Megahit Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Enrich my subscriber list to identify potential sponsors
   - B) Filter enriched data for decision-makers (marketers, founders, CEOs)
   - C) Compare Megahit to other sponsor discovery tools
   - D) Connect Megahit to my ESP
   - E) Use enriched data for outreach

2. **Newsletter details**: subscriber count, ESP, niche/topic

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing, ad revenue models) | `/sales-newsletter [question]` |
| Finding sponsors via intelligence database (not from your own list) | `/sales-sponsorgap [question]` or `/sales-whosponsorsstuff [question]` |
| Buying/selling newsletter ad placements on a marketplace | `/sales-paved [question]` or `/sales-hecto [question]` |
| Managing sponsor operations (invoices, CRM, reporting) | `/sales-sponsy [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |
| Contact enrichment for prospecting (not newsletter subscribers) | `/sales-enrich [question]` |

If the question is Megahit-specific, continue to Step 3.

## Step 3 — Megahit platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, enrichment workflow, ESP integrations, comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Getting started**: Connect your ESP, run an enrichment on your existing list, then filter by job title or company to find marketing decision-makers who could become sponsors. The "inside-out" approach (finding sponsors in your own audience) yields higher reply rates than cold outreach because these people already read your newsletter.
- **Building a sponsor pitch list**: After enrichment, filter for titles like "Head of Marketing," "Growth Lead," "CMO," "Founder" at companies that advertise in newsletters. Cross-reference with SponsorGap or Who Sponsors Stuff to confirm active sponsor budgets.
- **Choosing Megahit vs alternatives**: Megahit finds sponsors *within* your existing audience (inside-out). SponsorGap, Who Sponsors Stuff, and Open Rates find sponsors *outside* your audience (outside-in). Both approaches complement each other — use Megahit first (warm leads), then outside-in tools for cold outreach.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about pricing and integration details that may change.*

1. **$600 one-time fee with no free trial**: No way to test before buying. Ask for a demo to see enrichment quality on a sample of your list before committing.
2. **No API, no webhooks, no Zapier/Make/MCP**: All operations are through the web interface only. No programmatic access to enriched data.
3. **Privacy-first but requires your subscriber list**: Megahit runs on customer-controlled servers and claims never to share email lists. Verify their privacy policy and data processing agreement before uploading subscriber data.
4. **Enrichment quality depends on email types**: LinkedIn data enrichment works best on work emails. Gmail/Yahoo subscribers will have lower match rates.
5. **Limited ESP integrations**: Supports Beehiiv, Kit, Campaign Monitor, EmailOctopus, Ghost, HubSpot, Mailchimp, SendGrid, and Substack. If your ESP isn't listed, you may need to export/import CSV manually.
6. **Solo founder product**: Built and maintained by a single developer (Niklas Wenzel). Consider the bus-factor risk for a $600 investment.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring, spend trends, API)
- `/sales-whosponsorsstuff` — Who Sponsors Stuff sponsor intelligence (8,000+ sponsors, ad creative screenshots, email alerts)
- `/sales-openrates` — Open Rates sponsor prospecting database (10,000+ active sponsors, decision-maker contacts)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts, Airtable database)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-hecto` — Hecto self-serve newsletter advertising marketplace
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts, API)
- `/sales-enrich` — Contact enrichment strategy (Apollo, ZoomInfo, Clearbit, Clay, Hunter)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Finding sponsors in your subscriber list
**User says**: "I have a 12,000-subscriber B2B marketing newsletter on Beehiiv. How do I find potential sponsors among my subscribers?"
**Skill does**: Walks through connecting Beehiiv to Megahit, running enrichment, filtering for marketing decision-makers at companies with ad budgets, building a prioritized outreach list
**Result**: User has a targeted list of warm sponsor leads who already read their newsletter

### Example 2: Comparing Megahit to sponsor intelligence tools
**User says**: "Should I use Megahit or SponsorGap to find newsletter sponsors?"
**Skill does**: Explains the key difference — Megahit finds sponsors *inside* your audience (warm leads, higher reply rates) while SponsorGap finds sponsors *outside* your audience (larger database, verified contacts, API). Recommends using both: Megahit first for warm outreach, then SponsorGap for cold prospecting.
**Result**: User understands the complementary approaches and picks the right tool for their stage

### Example 3: Enrichment quality concerns
**User says**: "Will Megahit work if most of my subscribers use Gmail addresses?"
**Skill does**: Explains LinkedIn enrichment match rates, notes that work emails yield better results, suggests strategies to improve enrichment coverage (ask subscribers for work email at signup, use progressive profiling)
**Result**: User understands enrichment limitations and has a plan to maximize match rates

## Troubleshooting

### Low enrichment match rate
**Symptom**: Megahit only matched a small percentage of subscribers with LinkedIn data
**Cause**: Many subscribers use personal email addresses (Gmail, Yahoo) that are harder to match
**Solution**: Focus outreach on the subscribers that did match — even a 20% match rate on a 10K list gives 2,000 enriched contacts. For unmatched subscribers, consider asking for work email in a survey or progressive profile form.

### Not sure which subscribers to target for sponsorship outreach
**Symptom**: Have enriched data but don't know who to pitch
**Cause**: Need to filter by the right job titles and company types
**Solution**: Filter for titles containing "Marketing," "Growth," "Brand," "Partnerships," "CMO," "VP Marketing," or "Founder" at companies with 50+ employees. Cross-reference with SponsorGap to confirm they have active newsletter ad budgets.

### ESP not supported
**Symptom**: Your email service provider isn't in Megahit's integration list
**Cause**: Megahit supports 9 ESPs — yours may not be included
**Solution**: Export subscribers as CSV from your ESP and import into Megahit manually. Check Megahit's website for integration updates.
