---
name: sales-postapex
description: "PostApex platform help — email newsletter ad network connecting advertisers with 500+ publishers across 50+ categories, native ads, affiliate ads (beta), CPC-based revenue model, publisher analytics dashboard. Use when you want to monetize your newsletter with PostApex ads but aren't getting fill, PostApex clicks seem underreported compared to your ESP stats, payments aren't arriving or earnings are stuck below the payout threshold, trying to decide between PostApex and alternatives like Paved or Admailr for newsletter ad revenue, or need help optimizing ad placement and CPC earnings in your newsletter. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved or /sales-hecto)."
argument-hint: "[describe your PostApex question or newsletter ad monetization goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, advertising, ad-network, platform]
---

# PostApex Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up PostApex to monetize my newsletter
   - B) Troubleshoot low earnings or missing clicks
   - C) Resolve payment or payout issues
   - D) Compare PostApex to other newsletter ad networks
   - E) Optimize ad placement for better CPC revenue

2. **Which side are you on?**
   - A) Publisher (I have a newsletter and want ad revenue)
   - B) Advertiser (I want to place ads in newsletters)

3. **Newsletter details** (if publisher): ESP, subscriber count, niche, current monetization

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace (direct sponsor deals) | `/sales-paved [question]` or `/sales-hecto [question]` |
| Sponsor intelligence (finding brands that sponsor newsletters) | `/sales-sponsorgap [question]` |
| Managing sponsor operations (invoices, CRM, reporting) | `/sales-sponsy [question]` |
| Growing your subscriber list | `/sales-audience-growth [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |
| Programmatic ad server with API | `/sales-admailr [question]` or `/sales-kevel [question]` |

If the question is PostApex-specific, continue to Step 3.

## Step 3 — PostApex platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, ad formats, publisher workflow, and optimization tips.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Sign up at app.postapex.com, add your newsletter, browse approved ads, insert tracking links and style creatives into your template, deploy and track performance.
- **Optimizing revenue**: Place ads above the fold for higher CTR. Native ads outperform banners in email. Target high-CPC categories relevant to your audience. Track per-ad performance and drop low performers.
- **Choosing PostApex vs alternatives**: PostApex is free with no subscriber minimum — good for small publishers testing ad revenue. For programmatic automation, Admailr offers API-based ad insertion. For premium direct sponsors, use Paved or Hecto. For enterprise-scale, consider LiveIntent.
- **Payment issues**: Earnings require reaching the payout threshold. Check your wallet balance in the dashboard. If payment is late, contact support through the platform.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **$100 minimum payout**: Earnings must reach $100 before withdrawal. Small newsletters may take months to hit this threshold.
2. **Click tracking discrepancies**: Users report PostApex underreporting clicks compared to ESP tracking. Use UTM parameters as a second source of truth.
3. **Manual ad insertion**: No API or programmatic ad injection — you manually select ads from the dashboard and paste tracking links into your ESP template each issue.
4. **CPC-only revenue model**: You earn per click, not per impression. Highly engaged audiences with high CTR earn more; large but passive lists earn less.
5. **Support responsiveness varies**: Multiple reviews note slow or unresponsive support. Keep records of payment requests and click data.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-admailr` — Admailr programmatic email ad server (automated ad insertion, API, CPM+CPC)
- `/sales-buysellads` — BuySellAds contextual advertising marketplace (managed ad sales, Carbon Ads)
- `/sales-hecto` — Hecto newsletter advertising marketplace (self-serve, transparent pricing)
- `/sales-adlynews` — adly.news newsletter advertising marketplace (verified ESP metrics, bidding/negotiation)
- `/sales-socialpresence` — Social Presence AI-powered newsletter advertising marketplace
- `/sales-passendo` — Passendo email ad server + SSP (programmatic exchange, direct-sold campaigns)
- `/sales-kevel` — Kevel API-first ad server infrastructure (custom ad platforms, Decision API)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Publisher setting up PostApex
**User says**: "I have a 3,000-subscriber marketing newsletter on Mailchimp. How do I start earning with PostApex?"
**Skill does**: Walks through signing up at app.postapex.com, adding the newsletter, browsing approved ads in the dashboard, selecting relevant native ads, inserting tracking links into the Mailchimp template, and setting realistic revenue expectations for a 3K list
**Result**: User has PostApex ads in their newsletter with clear expectations on CPC earnings

### Example 2: Click tracking issues
**User says**: "PostApex says I got 12 clicks last week but my Mailchimp stats show 45 clicks on that same ad link"
**Skill does**: Explains PostApex tracks clicks through its own redirect — discrepancies happen when bot clicks, pre-fetchers, or Apple MPP inflate ESP counts while PostApex filters them. Recommends adding UTM parameters alongside PostApex tracking to compare data sources, and filing a support ticket if the gap is extreme
**Result**: User understands the tracking difference and has a method to reconcile click data

### Example 3: Comparing ad networks
**User says**: "Should I use PostApex or Paved for my tech newsletter with 8,000 subscribers?"
**Skill does**: Compares PostApex (free, CPC, manual ad selection, no minimum) vs Paved (marketplace + ad network, CPM, direct sponsor relationships, higher revenue ceiling). Recommends trying both — PostApex for backfill/autopilot and Paved for premium direct sponsors. Notes Admailr as another option for automated programmatic ads with API.
**Result**: User has a clear comparison and a dual-strategy to maximize newsletter ad revenue

## Troubleshooting

### Low earnings despite decent subscriber count
**Symptom**: Running PostApex ads for months but earning under $20/month on a 5,000+ subscriber list
**Cause**: Low click-through rate on ads, poor ad placement (footer instead of mid-content), or audience mismatch with available advertisers
**Solution**: Move ads above the fold or mid-content. Choose native ad format over banners. Select ads closely aligned with your audience's interests. If your niche is underserved by PostApex advertisers, supplement with Paved or direct sponsorships.

### Payment not received
**Symptom**: Wallet shows earnings but withdrawal hasn't arrived
**Cause**: Earnings may be below the payout threshold, or payment processing is delayed
**Solution**: Verify your wallet balance exceeds the minimum payout. Check that payment details (PayPal/bank) are correctly configured in account settings. Contact PostApex support with your publisher ID and withdrawal request date. Consider switching to Paved or Hecto if payment issues persist.

### Ad inventory is empty
**Symptom**: No ads available to select in the publisher dashboard
**Cause**: Your newsletter niche or audience category doesn't match current advertiser campaigns
**Solution**: Ensure your newsletter categories are accurately set in your PostApex profile. Check back regularly — ad inventory varies by season and advertiser budgets. Use a house ad or affiliate link as fallback for issues with no PostApex ads available.
