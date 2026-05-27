---
name: sales-ohmynewst
description: "OhMyNewst platform help — newsletter sponsorship marketplace for Spain and Latin America with 400+ newsletters across 50+ categories, centralized campaign management, and unified payments. Use when you need sponsors for a Spanish-language newsletter, want to advertise in newsletters targeting Spanish or LATAM audiences, existing US-centric marketplaces like Paved don't have newsletters in your market, need a marketplace with zero platform fee for advertisers, or want to manage multiple newsletter sponsorships from one dashboard. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or finding sponsors via intelligence databases (use /sales-sponsorgap)."
argument-hint: "[describe your OhMyNewst question or newsletter sponsorship need]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, marketplace, platform]
---

# OhMyNewst Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What's your role?**
   - A) Newsletter creator — looking for sponsors
   - B) Advertiser — looking for newsletters to sponsor
   - C) Agency — managing sponsorship campaigns for clients

2. **What market do you target?**
   - A) Spain
   - B) Latin America
   - C) Global Spanish-speaking audiences
   - D) English-speaking audiences (OhMyNewst may not be the best fit)

3. **What's your primary challenge?**
   - A) Finding the right newsletters to sponsor
   - B) Getting sponsors for my newsletter
   - C) Managing multiple sponsorship campaigns
   - D) Understanding pricing and ROI
   - E) Something else (describe)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (pricing models, revenue mix) | `/sales-newsletter [question]` |
| Sponsor intelligence (finding brands that sponsor newsletters) | `/sales-sponsorgap [question]` |
| Sponsor lead databases | `/sales-sponsorleads [question]` |
| Sponsorship operations (inventory, CRM, reporting) | `/sales-sponsy [question]` |
| US/English-language newsletter marketplace | `/sales-paved [question]` |
| Email marketing strategy | `/sales-email-marketing [question]` |

If the question is OhMyNewst-specific, continue to Step 3.

## Step 3 — OhMyNewst platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing model, newsletter categories, and marketplace mechanics.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Newsletter creator**: List your newsletter for free, set your sponsorship price based on subscriber count and open rate. OhMyNewst handles sponsor matching, communication, and payments.
- **Advertiser**: Browse 400+ newsletters by category, request sponsorships directly. No platform fee — you only pay the newsletter's listed price. Placements range €220–€3,100+ depending on newsletter size and format.
- **Agency**: Use centralized dashboard to manage multiple campaigns. Partner program available for recurring commissions on referred clients.
- **Market fit**: OhMyNewst is strongest for Spain and LATAM markets. For US/English-language newsletters, consider Paved (`/sales-paved`) or beehiiv Ad Network (`/sales-beehiiv`).

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **No API or automation** — OhMyNewst is UI-only. No API, no Zapier, no Make, no webhooks. All campaign management must be done manually through the dashboard.
2. **Spain/LATAM focus** — the marketplace is strongest for Spanish-language newsletters. English-language coverage is limited. For US/global English audiences, use Paved or beehiiv Ad Network instead.
3. **Manual ad insertion** — unlike programmatic ad networks (Paved Ad Network, beehiiv), you must manually place and format the sponsorship ad within your newsletter template. The upside is a more natural, native feel.
4. **Fixed pricing model** — OhMyNewst uses pay-per-display pricing set by the newsletter. No CPC or CPA options. Advertisers pay the listed price regardless of campaign performance.
5. **Payment methods are region-specific** — Stripe, bank transfer, and Bizum (Spain-specific). No PayPal option documented.
6. **Commission structure is opaque** — OhMyNewst takes ~15% from the newsletter side. This is built into the pricing but not prominently disclosed.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (pricing, models, platform-specific guidance)
- `/sales-paved` — Paved newsletter sponsorship marketplace (US/global, Ad Network, Booker, Radar)
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory, CRM, customer portals, reporting)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts)
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts)
- `/sales-beehiiv` — Beehiiv platform help (includes Ad Network and sponsorship storefront)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Finding sponsors for a Spanish newsletter
**User says**: "I run a tech newsletter in Spanish with 15,000 subscribers. How do I get sponsors through OhMyNewst?"
**Skill does**: Reads platform guide, explains free registration process, recommends pricing based on subscriber count and engagement, notes that OhMyNewst matches sponsors to newsletters in the platform
**Result**: User knows how to list their newsletter and set competitive pricing

### Example 2: Advertising in LATAM newsletters
**User says**: "I want to reach Spanish-speaking SaaS buyers through newsletter ads. Can OhMyNewst help?"
**Skill does**: Reads platform guide, explains OhMyNewst's 400+ newsletters across 50+ categories with 3M+ reach, notes zero advertiser platform fee, shows pricing range and placement options
**Result**: User understands the marketplace model and can start browsing newsletters

### Example 3: Comparing OhMyNewst to Paved for automation
**User says**: "I'm managing 10+ newsletter sponsorships. Should I use OhMyNewst or Paved?"
**Skill does**: Compares both — OhMyNewst is UI-only with no API/automation vs Paved's programmatic Ad Network and Zapier support, notes OhMyNewst is best for Spain/LATAM while Paved is best for US/global, recommends Sponsy for operations management
**Result**: User chooses the right marketplace for their market and gets a tool recommendation for managing at scale

## Troubleshooting

### No sponsors responding to my listing
**Symptom**: Newsletter listed on OhMyNewst but no sponsor inquiries
**Cause**: Pricing may be too high for subscriber count, or newsletter category has low advertiser demand
**Solution**: Review comparable newsletters in your category on OhMyNewst to benchmark pricing. Ensure your listing highlights open rates and audience demographics, not just subscriber count. Consider lowering price for initial placements to build a track record with performance data.

### Sponsorship ROI unclear for advertisers
**Symptom**: Advertisers asking for performance guarantees or CPC pricing
**Cause**: OhMyNewst uses fixed pay-per-display pricing with no performance guarantees
**Solution**: Set expectations upfront that newsletter sponsorships are brand-awareness placements with click-through as a bonus metric. Provide past campaign data (open rates, CTR) as a track record. Suggest a test campaign with a smaller placement to prove value before committing to larger packages.

### Payment not received after campaign
**Symptom**: Campaign completed but newsletter creator hasn't been paid
**Cause**: Payment processing delay or missing payment method configuration
**Solution**: Check that your payment method (Stripe, bank transfer, or Bizum) is correctly configured in your OhMyNewst account. Contact OhMyNewst support if payment is delayed beyond the expected window. Note that payment timing may vary by method — bank transfers take longer than Stripe.
