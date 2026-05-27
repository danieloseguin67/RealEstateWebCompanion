---
name: sales-buysellads
description: "BuySellAds platform help — contextual advertising marketplace for websites, newsletters, and podcasts with Ad Serving API, Advertiser API, JS Monetization Framework, Carbon Ads, and Zapier triggers. Use when newsletter ads aren't filling or revenue is low on BuySellAds, ad serving API returns empty responses, Advertiser API stats don't match dashboard numbers, integrating BuySellAds ads into your ESP newsletter template, setting up Carbon Ads for a developer-focused site, or comparing BuySellAds commission rate to alternatives like Paved or LiveIntent. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or finding sponsors via intelligence databases (use /sales-sponsorgap or /sales-whosponsorsstuff)."
argument-hint: "[describe your BuySellAds question — ad serving, publisher setup, API integration, or campaign stats]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, advertising, platform]
github: "https://github.com/buysellads"
---

# BuySellAds Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **Are you a publisher or advertiser?**
   - A) Publisher — monetizing my website, newsletter, or podcast with ads
   - B) Advertiser — running campaigns to reach specific audiences
   - C) Developer — integrating the Ad Serving API or Monetization Framework

2. **What do you need help with?**
   - A) Setting up ad zones and integrating ad code
   - B) Email/newsletter ad integration (ESP template setup)
   - C) Advertiser API — pulling campaign stats programmatically
   - D) Low fill rate / no ads showing / revenue optimization
   - E) Carbon Ads or Coin.Network sub-network setup
   - F) Zapier automation (deal triggers, spot sold notifications)

3. **Current setup** (if applicable):
   - Platform type (website, newsletter, podcast)
   - Current ESP (if newsletter)
   - Traffic/subscriber count

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (not BSA-specific) | `/sales-newsletter [question]` |
| Finding sponsors to pitch | `/sales-sponsorgap [question]` or `/sales-paved [question]` |
| Email deliverability | `/sales-deliverability [question]` |
| Newsletter sponsorship operations | `/sales-sponsy [question]` |
| Email marketing campaigns | `/sales-email-marketing [question]` |

When routing, provide the exact command: "This is a {problem domain} question — run: `/sales-{skill} {user's original question}`"

## Step 3 — BuySellAds platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, APIs, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

**For publishers:**
- Start with the Monetization Framework (JS) for websites — lowest setup effort
- For newsletters, use the Ad Serving API with your ESP's template system
- Set floor CPMs conservatively, then raise as demand increases
- Use both self-serve marketplace AND managed sales for maximum fill rate

**For advertisers:**
- Use the Advertiser API to pull daily stats into your analytics pipeline
- Filter by `startDate`/`endDate` to avoid pulling all-time data
- Export to CSV with `type=csv` for quick reporting

**For developers:**
- Always check for `statlink` before rendering — missing means no ad available
- Use `ignore=yes` parameter during development to avoid counting test impressions
- Handle the pixel tracking array (split on `||`, replace `[timestamp]`)

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **25% commission on managed sales** — BuySellAds takes 25% of each ad sale (publisher keeps 75%). Self-serve shopping cart reduces this to 15% (publisher keeps 85%).
2. **No guaranteed fill rate** — BuySellAds does not guarantee any fill rate. Niche sites with low traffic may see significant unsold inventory.
3. **API key requires account manager** — you cannot self-generate an API key. Contact your account manager or support@buysellads.com.
4. **Click discrepancy is common** — advertisers report Google Analytics showing fewer clicks than BSA dashboard. Use UTM parameters and compare carefully.
5. **Wire transfer minimum $500 with $35 fee** — PayPal is available but also has fees. Factor payout costs into your revenue calculations.
6. **Email integration only documented for Buttondown** — other ESPs require custom implementation using the Ad Serving API JSON endpoint.
7. **Advertiser API is read-only** — you can pull stats but cannot create or modify campaigns via API.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-paved` — Paved newsletter sponsorship marketplace (alternative ad network and marketplace)
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory, sponsor CRM, reporting)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (find brands sponsoring newsletters)
- `/sales-whosponsorsstuff` — Who Sponsors Stuff sponsor intelligence (ad creative tracking)
- `/sales-hecto` — Hecto self-serve newsletter advertising marketplace
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Newsletter ad integration
**User says**: "How do I integrate BuySellAds ads into my Beehiiv newsletter?"
**Skill does**: Reads platform-guide.md for Ad Serving API details, explains the JSON endpoint pattern with zone key, shows how to fetch ad data server-side and insert into ESP template, notes that only Buttondown has documented native integration
**Result**: User has working code to fetch and render BSA ads in their newsletter template

### Example 2: Campaign stats pipeline
**User says**: "I want to pull my BuySellAds campaign stats into a spreadsheet daily"
**Skill does**: Reads platform-guide.md for Advertiser API endpoints, provides cURL and Python examples for `/daily-stats`, shows CSV export option with `type=csv`, suggests Zapier trigger for automation
**Result**: User has a working script to export campaign performance data

### Example 3: Low ad revenue
**User says**: "My BuySellAds revenue is way lower than what I made with AdSense"
**Skill does**: Explains contextual vs programmatic model differences, reviews CPM optimization (floor pricing, niche targeting, multiple ad zones), recommends combining BSA with other monetization (direct sponsors via Paved, paid recommendations via SparkLoop)
**Result**: User has a multi-channel monetization strategy instead of relying solely on BSA

## Troubleshooting

### Ads not showing / empty responses
**Symptom**: Ad Serving API returns empty `ads` array or no `statlink` field
**Cause**: No ads available for your zone, or zone not approved yet, or using wrong zone key
**Solution**: Test with zone key `CVADC53U` (BSA test zone). Check your zone is active in the dashboard. Implement fallback content for when no ads are available. Use `ignore=yes` to test without counting impressions.

### Click count mismatch between BSA and Google Analytics
**Symptom**: BSA dashboard shows 250 clicks but GA shows only 75
**Cause**: Bot traffic, ad blockers, redirects dropping UTM parameters, or BSA counting redirects before page load
**Solution**: Add UTM parameters to all ad links. Compare BSA clicks vs GA sessions with UTM source=buysellads. Report significant discrepancies to support@buysellads.com.

### Revenue dropped after changing floor CPM
**Symptom**: Raised floor CPM and now ads aren't filling
**Cause**: Floor price exceeds what advertisers are willing to pay for your inventory
**Solution**: Lower floor CPM gradually. BuySellAds does not auto-optimize — you must manually adjust. Start low and increase in small increments. Monitor fill rate after each change.
