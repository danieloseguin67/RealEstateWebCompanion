---
name: sales-passendo
description: "Passendo platform help — European email ad server and SSP for newsletter publishers with programmatic exchange, direct-sold campaigns, first-party data targeting, priority waterfall (guaranteed deals, exchange, house ads), and 15+ demand partners. Use when setting up Passendo to monetize your newsletter with programmatic or direct-sold ads, fill rates are low and you need to optimize demand strategy, ad tags are breaking email deliverability or not rendering, trying to decide between Passendo and alternatives like Admailr or LiveIntent for email ad serving, or need help integrating Passendo ad tags into your ESP template. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved or /sales-hecto)."
argument-hint: "[describe your Passendo question or newsletter ad serving goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, advertising, ad-server, platform]
---

# Passendo Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up Passendo to monetize my newsletter with ads
   - B) Optimize ad revenue (fill rates, CPM, demand partners)
   - C) Troubleshoot ad tag rendering or deliverability issues
   - D) Compare Passendo to other email ad servers
   - E) Set up programmatic demand via the exchange/SSP

2. **Which side are you on?**
   - A) Publisher (I have a newsletter and want ad revenue)
   - B) Advertiser (I want to place ads in newsletters via Passendo DSP)

3. **Newsletter details** (if publisher): ESP, subscriber count, monthly opens, current ad setup

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace (self-serve sponsor deals) | `/sales-paved [question]` or `/sales-hecto [question]` |
| Sponsor intelligence (finding brands that sponsor newsletters) | `/sales-sponsorgap [question]` |
| Managing sponsor operations (invoices, CRM, reporting) | `/sales-sponsy [question]` |
| Building a custom ad server from APIs | `/sales-kevel [question]` |
| Simple automated newsletter ads (no minimum) | `/sales-admailr [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |

If the question is Passendo-specific, continue to Step 3.

## Step 3 — Passendo platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration details, comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Contact Passendo for onboarding (2-4 weeks typical). They set up CNAME records, configure ad tags for your ESP, and connect demand partners. Not self-serve.
- **Optimizing revenue**: Use the priority waterfall — fill premium inventory with direct-sold campaigns first, then let programmatic exchange fill remaining. Configure house ads as fallback to avoid blank slots.
- **Choosing Passendo vs alternatives**: Passendo is best for mid-to-large publishers wanting a full-stack email ad server with programmatic demand. For small publishers wanting plug-and-play, use Admailr. For direct sponsor marketplace, use Paved. For building a custom ad platform, use Kevel.
- **DSP/advertiser side**: Use Passendo DSP to buy newsletter inventory programmatically. Target by first-party data, newsletter category, and geography.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Not self-serve**: Passendo requires human onboarding — you can't sign up and start immediately. Budget 2-4 weeks for integration and tag setup.
2. **Volume-based pricing**: Pricing scales with monthly email ad impressions. Higher volume = lower CPM tier. Minimum monthly commitment required plus one-time onboarding fee.
3. **Image size upload limits**: G2 reviewers report restrictive image file size limits for ad creatives. Test creative sizes before committing to a campaign.
4. **No HTML/CSS ad customization**: Ad creatives are image-only — you cannot use custom HTML or CSS for minor styling adjustments within the ad unit.
5. **Gmail image caching**: Gmail caches identical image URLs, which can affect impression counting. Passendo handles this via unique URL parameters, but verify with your account manager.
6. **CNAME setup required**: All integrations use CNAME DNS records to preserve email deliverability. Your DNS must support this.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-admailr` — Admailr programmatic email ad server (automated ad insertion, CPM+CPC, no subscriber minimum)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-buysellads` — BuySellAds contextual advertising marketplace (managed ad sales, Carbon Ads, Ad Serving API)
- `/sales-paved` — Paved newsletter sponsorship marketplace, Ad Network, Booker, Radar
- `/sales-hecto` — Hecto newsletter advertising marketplace (self-serve, transparent pricing)
- `/sales-socialpresence` — Social Presence AI-powered newsletter advertising marketplace
- `/sales-sponsy` — Sponsy sponsorship operations (ad inventory calendar, sponsor CRM, reporting)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Publisher evaluating Passendo
**User says**: "I have a 50,000-subscriber B2B finance newsletter on Mailchimp. Should I use Passendo or Admailr for ad monetization?"
**Skill does**: Compares both — Passendo is better for mid-to-large publishers wanting managed onboarding, programmatic exchange demand, and direct-sold campaign management. Admailr is better for small publishers wanting plug-and-play with no minimum. At 50K subscribers, Passendo's exchange demand and priority waterfall will likely generate higher CPMs.
**Result**: User understands which platform fits their scale and gets next steps for Passendo onboarding

### Example 2: Integrating Passendo ad tags
**User says**: "How do I add Passendo ad tags to my ActiveCampaign newsletter template?"
**Skill does**: Explains the Passendo tag is a lightweight HTML snippet inserted into the ESP template. CNAME records must be set up first. Maps ESP variables (email address, campaign ID) to Passendo tag parameters. Notes that Passendo's team handles this during onboarding.
**Result**: User understands the integration process and knows to work with Passendo's onboarding team

### Example 3: Low fill rates
**User says**: "My Passendo fill rate is only 40% — how do I get more ads filling?"
**Skill does**: Recommends enabling more demand partners in the SSP settings, configuring house ads as backfill, reviewing audience targeting data quality, and considering supplementing with direct-sold campaigns. Checks if newsletter category and language targeting are correctly configured.
**Result**: User has a fill rate optimization plan with specific actions

## Troubleshooting

### Ad tags not rendering in email
**Symptom**: Passendo ad slots show blank space or broken images in subscriber inboxes
**Cause**: CNAME not configured, ESP stripping HTML, or image hosting issue
**Solution**: Verify CNAME DNS records are active. Check that your ESP isn't stripping or modifying the Passendo tag HTML. Contact Passendo support to validate the tag configuration for your specific ESP.

### Impressions not counting correctly
**Symptom**: Dashboard impressions don't match expected email opens
**Cause**: Gmail and Apple Mail image proxying/caching skews impression counts
**Solution**: Passendo uses unique URL parameters to mitigate Gmail caching, but Apple MPP pre-fetches images, inflating open-based metrics. Focus on click metrics for accurate engagement measurement. Ask your account manager about their MPP handling.

### Deliverability drop after adding ads
**Symptom**: Email open rates decreased after adding Passendo ad tags
**Cause**: Ad images loading from untrusted domains, missing CNAME, or increased email weight
**Solution**: Verify CNAME is properly configured (ads should load from your domain, not a third-party). Check total email size — newsletters with many large ad images may load slower. Passendo's CNAME setup is specifically designed to preserve deliverability — if it's degrading, the CNAME is likely misconfigured.
