---
name: sales-socialpresence
description: "Social Presence platform help — AI-powered newsletter advertising marketplace connecting advertisers with publishers via discovery dashboard, ad library, campaign management, and publisher storefronts. Use when you want to list your newsletter on Social Presence to attract sponsors, need help setting up your publisher storefront with ad inventory, want to find and sponsor newsletters as an advertiser, trying to monitor competitor newsletter ad campaigns, or wondering how Social Presence compares to Paved or Hecto for newsletter advertising. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or sponsor intelligence databases (use /sales-sponsorgap or /sales-whosponsorsstuff)."
argument-hint: "[describe your Social Presence question or newsletter advertising goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, marketplace, platform]
---

# Social Presence Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) List my newsletter on Social Presence to attract sponsors
   - B) Find and sponsor newsletters as an advertiser
   - C) Monitor competitor newsletter ad campaigns
   - D) Compare Social Presence to other newsletter ad marketplaces
   - E) Manage campaigns in the Ad Centre

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
| Sponsor intelligence with verified contacts and spend trends | `/sales-sponsorgap [question]` |
| Sponsor intelligence with ad creative screenshots | `/sales-whosponsorsstuff [question]` |
| Managing sponsor operations (invoices, CRM, reporting) | `/sales-sponsy [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |

If the question is Social Presence-specific, continue to Step 3.

## Step 3 — Social Presence platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, comparison with alternatives, workflows for publishers and advertisers.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Build your storefront, set ad formats (dedicated, main sponsor, secondary), and let Social Presence's category expert handle sales outreach. The platform's discovery system uses 26 data points so make your audience demographics and talking points specific.
- **Advertiser finding newsletters**: Use the Discovery Dashboard to filter by talking points, demographics, and firmographics. Check the Ad Library to see what competitors are running before committing. Start with a test placement.
- **Choosing Social Presence vs alternatives**: Social Presence is best for advertisers wanting AI-powered discovery across 5,000+ publishers. For self-serve transparent pricing, try Hecto. For programmatic + marketplace, try Paved.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **No API, no webhooks, no Zapier/Make**: All operations are through the web interface only. No programmatic access to listings, campaigns, or data.
2. **Commission rate not publicly disclosed**: Social Presence charges "commission only fees" but the exact percentage is not stated. Ask before listing.
3. **Niche startup with limited reviews**: No G2 or Capterra reviews found as of research date. Hard to validate marketplace claims (5,000+ publishers, 50,000+ brands) independently.
4. **No pricing transparency for advertisers**: Unlike Hecto (transparent upfront pricing), Social Presence requires engagement with the platform to see costs.
5. **Backlog URL note**: The original socialpresence.co domain redirects to an unrelated LinkedIn Chrome extension. The actual platform is at socialpresence.io.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-hecto` — Hecto self-serve newsletter advertising marketplace (transparent pricing, direct creator messaging)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring, spend trends, API)
- `/sales-whosponsorsstuff` — Who Sponsors Stuff sponsor intelligence (8,000+ sponsors, ad creative screenshots, email alerts)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts, Airtable database)
- `/sales-openrates` — Open Rates sponsor prospecting database (10,000+ active sponsors, decision-maker contacts)
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory calendar, sponsor CRM, customer portals, reporting)
- `/sales-buysellads` — BuySellAds contextual advertising marketplace (managed ad sales, Carbon Ads, Ad Serving API)
- `/sales-megahit` — Megahit subscriber enrichment (LinkedIn data enrichment to find sponsors in your subscriber list)
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts, API)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Publisher listing their newsletter
**User says**: "I have a 10,000-subscriber B2B newsletter and want to list it on Social Presence. How do I get started?"
**Skill does**: Walks through building a storefront, defining ad formats (dedicated email, main sponsor, secondary sponsor), writing talking points that match advertiser searches, and leveraging the assigned category expert for sales
**Result**: User has a live Social Presence storefront attracting AI-matched advertiser interest

### Example 2: Advertiser finding newsletters
**User says**: "I want to find newsletters to advertise my developer tool on Social Presence"
**Skill does**: Explains Discovery Dashboard filtering by talking points and firmographics, using the Ad Library to research competitor campaigns, building publisher lists, and launching campaigns through the Ad Centre
**Result**: User has a workflow for discovering, evaluating, and booking newsletter ad placements

### Example 3: Comparing Social Presence to alternatives
**User says**: "Should I use Social Presence or Paved for newsletter advertising?"
**Skill does**: Compares marketplace approach (Social Presence AI-powered discovery vs Paved programmatic + marketplace), features (Ad Library competitor monitoring vs Paved Radar lead enrichment), publisher networks, and pricing models
**Result**: User picks the right platform based on their needs — Social Presence for AI discovery, Paved for programmatic scale

## Troubleshooting

### Can't find relevant newsletters for my niche
**Symptom**: Discovery Dashboard shows few results matching your target audience
**Cause**: Marketplace may have limited coverage in your specific niche despite claiming 5,000+ publishers
**Solution**: Try Paved (3,000+ verified publishers) or use Reletter to search 7M+ newsletters by topic and reach out directly. For finding who already sponsors newsletters in your niche, use SponsorGap or Who Sponsors Stuff.

### Not getting advertiser interest as a publisher
**Symptom**: Listed your newsletter but no sponsors are reaching out
**Cause**: Storefront talking points may not match what advertisers search for, or audience metrics aren't compelling enough
**Solution**: Refine your talking points to match advertiser intent (use problem-language, not feature-language). Add specific audience demographics and firmographics. If Social Presence's managed sales isn't generating leads, try Paved Marketplace or list on Hecto for self-serve bookings.

### No way to automate campaign workflows
**Symptom**: Want to sync campaign data to CRM or automate reporting
**Cause**: Social Presence has no API, webhooks, or integration support
**Solution**: For automated sponsor operations, use Sponsy (Zapier integration, sponsor CRM, automated reporting). For API-accessible sponsor data, use SponsorGap.
