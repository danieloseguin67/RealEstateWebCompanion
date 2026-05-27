---
name: sales-passionfroot
description: "Passionfroot platform help — AI-powered creator marketing platform for B2B brands with Zest AI agent, creator discovery, campaign management, storefront booking, FrootWallet payments, and cross-platform analytics. Use when managing creator sponsorships across spreadsheets is unsustainable, need to discover creators for B2B newsletter or social sponsorships, want AI-generated GTM campaign briefs and creator recommendations, creators need a storefront to manage brand deal bookings, or need compliant bulk payments to multiple creators without individual vendor approvals. Do NOT use for general influencer marketing strategy (use /sales-influencer-marketing) or general newsletter monetization strategy (use /sales-newsletter)."
argument-hint: "[describe your Passionfroot question or creator marketing challenge]"
license: MIT
version: 1.0.0
tags: [sales, influencer-marketing, creator, sponsorship, platform]
github: "https://github.com/Passionfroot"
---

# Passionfroot Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What's your role?**
   - A) Brand/marketer — looking for creators to sponsor
   - B) Creator — managing inbound sponsorship requests
   - C) Agency — running creator campaigns for clients

2. **What's your primary challenge?**
   - A) Finding the right creators for my B2B audience
   - B) Managing multiple creator campaigns and deadlines
   - C) Setting up a storefront to receive sponsorship requests
   - D) Paying creators compliantly at scale
   - E) Tracking campaign ROI across platforms
   - F) Something else (describe)

3. **What platforms do your creators publish on?**
   - A) Newsletters (Beehiiv, Substack)
   - B) Social (Twitter/X, LinkedIn, YouTube, Instagram, TikTok)
   - C) Both newsletters and social
   - D) Not sure yet

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Influencer marketing strategy (platform selection, campaign structure) | `/sales-influencer-marketing [question]` |
| Newsletter monetization (pricing, revenue models) | `/sales-newsletter [question]` |
| Finding newsletter sponsors via databases | `/sales-sponsorgap [question]` |
| Sponsorship operations (inventory calendars, CRM) | `/sales-sponsy [question]` |
| Specific creator platform features (GRIN, Aspire, etc.) | Route to the appropriate platform skill |

If the question is Passionfroot-specific, continue to Step 3.

## Step 3 — Passionfroot platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing model, commission structure, workflows, and competitive positioning.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Brand discovering creators**: Use Zest AI agent to generate ICP-matched creator recommendations. Discovery covers Twitter/X, LinkedIn, YouTube, Instagram, TikTok, Beehiiv, Substack.
- **Brand managing campaigns**: Use the centralized action center for deadline tracking, approvals, and status monitoring. Analytics sync automatically across platforms.
- **Creator setting up storefront**: Build a booking page with pricing tiers, manage inbound requests through the dashboard. Self-sourced deals incur 0% creator fee.
- **Paying creators**: FrootWallet handles compliant bulk payments — single onboarding, no per-creator vendor approvals.
- **Choosing between Passionfroot and alternatives**: Passionfroot is strongest for B2B creator-led GTM. For e-commerce influencer marketing, consider GRIN or Aspire. For pure discovery, consider Modash.

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **15% commission on network-sourced deals** — deals from the Partner Network (Discovery matches, Ad Network) charge 15% to the creator (includes Stripe fees). Self-sourced deals through your storefront are 0% to the creator (5% fee to the brand instead).
2. **No API or automation** — no public API, no Zapier, no Make, no webhooks. All campaign management is through the web dashboard.
3. **Must keep payments on-platform for network deals** — creators who route payments off-platform lose preferential ranking in Discovery.
4. **B2B-focused** — strongest for B2B SaaS creator marketing. E-commerce brands with Shopify integration needs are better served by GRIN or Aspire.
5. **Brand pricing is opaque** — the help center shows creator pricing (free + commission), but brand/partner pricing beyond the 5% fee isn't publicly documented. Contact sales for enterprise pricing.
6. **Creator storefronts are the original product** — Passionfroot pivoted from a creator storefront tool to an AI-powered brand GTM platform. Both surfaces still exist.

## Related skills

- `/sales-influencer-marketing` — Influencer marketing strategy (platform selection, campaign structure, ROI)
- `/sales-newsletter` — Newsletter monetization strategy (sponsorships, paid subscriptions)
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory, CRM, customer portals)
- `/sales-ohmynewst` — OhMyNewst newsletter sponsorship marketplace (Spain & LATAM)
- `/sales-grin` — GRIN platform help (e-commerce creator management, Shopify, affiliate hub)
- `/sales-aspire` — Aspire platform help (word-of-mouth commerce, product seeding, UGC)
- `/sales-modash` — Modash platform help (creator discovery, 250M+ profiles, analytics)
- `/sales-creatoriq` — CreatorIQ platform help (enterprise influencer OS)
- `/sales-collabstr` — Collabstr platform help (influencer and UGC marketplace)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Setting up creator discovery for B2B SaaS
**User says**: "I need to find creators who talk about developer tools for a sponsorship campaign"
**Skill does**: Reads platform guide, explains Zest AI agent for ICP-matched creator recommendations across Twitter/X, LinkedIn, YouTube, Beehiiv, Substack. Notes the Discovery feature and how to filter by niche.
**Result**: User has a workflow for finding and vetting B2B-relevant creators

### Example 2: Creator storefront setup for newsletter sponsorships
**User says**: "I run a newsletter and want brands to book sponsorships through Passionfroot"
**Skill does**: Reads platform guide, walks through storefront setup with booking pages, pricing tiers, and calendar integration. Notes 0% fee on self-sourced deals vs 15% on network deals.
**Result**: Creator has a professional storefront for inbound sponsor requests

### Example 3: Comparing Passionfroot to GRIN for campaign automation
**User says**: "Should I use Passionfroot or GRIN for managing creator campaigns? I need API access."
**Skill does**: Reads platform guide competitive positioning, explains Passionfroot has no API while GRIN has integrations. Notes Passionfroot is B2B-focused while GRIN is e-commerce-focused. Recommends based on use case.
**Result**: User chooses the right platform based on their integration needs and target market

## Troubleshooting

### Creators not appearing in Discovery
**Symptom**: Searched for creators but results are limited or irrelevant
**Cause**: Discovery depends on creator profiles being on the platform and matching your ICP criteria
**Solution**: Use Zest AI agent with a detailed prompt about your target audience. Broaden platform filters (include both newsletter and social creators). If Discovery is too narrow, supplement with dedicated discovery tools like Modash (`/sales-modash`) or SparkToro (`/sales-sparktoro`).

### Confusion about which deals incur the 15% fee
**Symptom**: Creator unsure why some deals have commission and others don't
**Cause**: Network-sourced deals (Discovery matches, Ad Network) charge 15%; self-sourced deals through your storefront are 0%
**Solution**: Check the "PF badge" tag on deals — deals with this badge are network-sourced (15%). Deals from your storefront link or direct proposals are commission-free. Keep payments on-platform to maintain Discovery ranking.

### Campaign metrics not syncing
**Symptom**: Analytics dashboard showing zero or outdated performance data
**Cause**: Cross-platform metrics require proper account connections and may have sync delays
**Solution**: Verify that all creator social accounts are connected in the campaign setup. Metrics typically sync within 24-48 hours of content going live. If data is still missing, check that the creator published on the agreed platform (not a different one).
