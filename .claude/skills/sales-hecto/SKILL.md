---
name: sales-hecto
description: "Hecto platform help — self-serve newsletter advertising marketplace for buying, selling, and managing ad placements with transparent pricing, direct creator messaging, and date-specific inventory management. Use when you want to list your newsletter on Hecto to attract sponsors, need help setting up ad inventory with pricing and availability dates, want to browse and buy newsletter ad placements as an advertiser, trying to decide between Hecto and alternatives like Paved or SponsorGap for newsletter sponsorship, or wondering how to manage campaigns across multiple newsletters on Hecto. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or sponsor intelligence and prospecting databases (use /sales-sponsorgap or /sales-whosponsorsstuff)."
argument-hint: "[describe your Hecto question or newsletter advertising goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, marketplace, platform]
---

# Hecto Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) List my newsletter on Hecto to attract sponsors
   - B) Buy ad placements in newsletters as an advertiser
   - C) Manage my ad inventory (pricing, dates, availability)
   - D) Compare Hecto to other newsletter sponsorship platforms
   - E) Run campaigns across multiple newsletters

2. **Which side of the marketplace are you on?**
   - A) Publisher (I have a newsletter and want sponsors)
   - B) Advertiser (I want to buy newsletter ad placements)

3. **Newsletter size** (if publisher): subscriber count and open rate

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing, ad revenue models) | `/sales-newsletter [question]` |
| Programmatic ad network or large publisher marketplace | `/sales-paved [question]` |
| Sponsor intelligence with API, competitor monitoring, spend trends | `/sales-sponsorgap [question]` |
| Sponsor intelligence with ad creative screenshots | `/sales-whosponsorsstuff [question]` |
| Curated sponsor lead list with weekly updates | `/sales-sponsorleads [question]` |
| Managing sponsor operations (invoices, CRM, reporting) | `/sales-sponsy [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |

If the question is Hecto-specific, continue to Step 3.

## Step 3 — Hecto platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, comparison with alternatives, workflows for publishers and advertisers.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Set up your Hecto page, configure ad slots with clear pricing, write descriptions that highlight your audience demographics and engagement rates. The transparent pricing model means sponsors can self-serve without back-and-forth negotiations.
- **Advertiser finding newsletters**: Browse by niche, check audience metrics before committing, message creators directly on-platform. Start with small test placements before committing to packages.
- **Choosing Hecto vs alternatives**: Hecto is best for indie publishers wanting a simple self-serve marketplace. For larger operations, Paved (programmatic + marketplace) or Sponsy (operations management) may be better fits. For prospecting sponsor contacts without a marketplace, use SponsorGap or Who Sponsors Stuff instead.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **No API, no webhooks, no Zapier/Make**: All operations are through the web interface only. No programmatic access to listings, campaigns, or data.
2. **Small marketplace**: ~40 newsletters listed on InboxReads — significantly smaller than Paved (3,000+ publishers). Inventory quality and audience size vary significantly between listings.
3. **Commission-based pricing not publicly disclosed**: Hecto takes a cut of transactions but the exact percentage is not stated on the website. Ask before listing.
4. **Built on Bubble.io**: The platform is built with no-code tools. There is no developer ecosystem, no SDKs, and no way to extend functionality.
5. **Stripe-only payments**: Payment processing goes through Stripe. No alternative payment methods.
6. **Best for smaller/indie publishers**: The platform targets independent businesses, freelancers, startups, and side projects. Larger publishers with established audiences may find Paved or direct sales more effective.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring, spend trends, API)
- `/sales-whosponsorsstuff` — Who Sponsors Stuff sponsor intelligence (8,000+ sponsors, ad creative screenshots, email alerts)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts, Airtable database)
- `/sales-openrates` — Open Rates sponsor prospecting database (10,000+ active sponsors, decision-maker contacts)
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory calendar, sponsor CRM, customer portals, reporting)
- `/sales-ohmynewst` — OhMyNewst newsletter sponsorship marketplace (Spain & LATAM, 400+ newsletters)
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts, API)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Publisher listing their newsletter
**User says**: "I have a 5,000-subscriber marketing newsletter with 42% open rate. How do I get sponsors through Hecto?"
**Skill does**: Walks through setting up a Hecto page, configuring ad slot types (primary sponsor, classified, dedicated), pricing based on CPM benchmarks, writing compelling audience descriptions
**Result**: User has a live Hecto listing attracting self-serve sponsor bookings

### Example 2: Comparing Hecto to alternatives
**User says**: "Should I use Hecto or Paved to sell newsletter sponsorships?"
**Skill does**: Compares marketplace size (Hecto ~40 newsletters vs Paved 3,000+), features (Hecto is simpler self-serve vs Paved has programmatic Ad Network + Booker + Radar), pricing model (Hecto commission vs Paved 30% commission), best fit by publisher size
**Result**: User picks the right platform — Hecto for indie simplicity, Paved for scale and programmatic revenue

### Example 3: Advertiser buying newsletter placements
**User says**: "I want to advertise my SaaS product in tech newsletters. Can I use Hecto?"
**Skill does**: Explains how to browse newsletters by niche, check engagement metrics, compare pricing across listings, use direct messaging to negotiate, and manage campaigns across multiple newsletters
**Result**: User has a workflow for discovering, evaluating, and booking newsletter ad placements

## Troubleshooting

### Not enough newsletters in my niche
**Symptom**: Browsing Hecto shows few or no relevant newsletters
**Cause**: The marketplace is smaller than Paved or beehiiv's Ad Network
**Solution**: Try Paved (3,000+ publishers) or use Reletter to search 7M+ newsletters and reach out directly. For sponsor intelligence without a marketplace, use SponsorGap or Who Sponsors Stuff.

### Unsure about pricing as a publisher
**Symptom**: Don't know what to charge for ad placements
**Cause**: Hecto shows transparent pricing but you need to set your own rates
**Solution**: Calculate using CPM: subscribers x open rate x CPM / 1000. Start at $25-$50 CPM for general interest, $50-$100+ for B2B/finance niches. See `/sales-newsletter` for detailed pricing guidance.

### No way to automate sponsor workflows
**Symptom**: Want to sync sponsor data to CRM or automate reporting
**Cause**: Hecto has no API, webhooks, or integration support
**Solution**: For automated sponsor operations, use Sponsy (Zapier integration, sponsor CRM, automated reporting). For API-accessible sponsor data, use SponsorGap.
