---
name: sales-adplugg
description: "AdPlugg platform help — budget ad server and ad manager with WordPress/Ghost/Drupal plugins for serving, rotating, scheduling, and tracking display and email newsletter ads on blogs and websites. Use when setting up AdPlugg to serve ads on your WordPress blog or Ghost newsletter, ads aren't rotating or showing the correct creative in the right zone, email ad tags aren't rendering in your Ghost or Mailchimp newsletter, free plan hit the 100K impression limit and you need to decide whether to upgrade, ad click tracking numbers don't match your Google Analytics, trying to decide between AdPlugg and AdButler or Google Ad Manager for a small publisher site, or geotargeting or frequency capping isn't working on your ads. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or programmatic ad serving with RTB (use /sales-epom or /sales-adbutler)."
argument-hint: "[describe your AdPlugg question or ad management goal]"
license: MIT
version: 1.0.0
tags: [sales, advertising, ad-server, platform]
github: "https://github.com/adplugg"
---

# AdPlugg Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up AdPlugg to serve ads on my website or blog
   - B) Add ad zones to my email newsletter
   - C) Track ad performance and generate reports
   - D) Configure targeting (geo, page, zone)
   - E) Compare AdPlugg to other ad management options

2. **What platform is your site on?**
   - A) WordPress
   - B) Ghost
   - C) Drupal / Joomla / Squarespace / Wix
   - D) Custom HTML site
   - E) Blogger

3. **Current plan**: Free, Pro ($10/mo), or Business ($79/mo)?

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Programmatic/RTB ad serving | `/sales-epom [question]` or `/sales-adbutler [question]` |
| Managed ad server with self-serve portal | `/sales-adbutler [question]` |
| Direct-sold ad management for local publishers | `/sales-broadstreet [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |

If the question is AdPlugg-specific, continue to Step 3.

## Step 3 — AdPlugg platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, ad formats, email ad setup, integration recipes.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Blogger getting started**: Install the WordPress plugin or paste the code snippet into your site. Create zones in the AdPlugg dashboard, then create ads with images and assign them to zones. Ads rotate automatically.
- **Newsletter ads**: Requires Business plan ($79/mo). Create an ad, get the Email Tag (not the regular tag), paste into your Ghost HTML card or ESP template. Email tags work on both web and email.
- **Upgrading from free**: Free plan caps at 100K impressions/month. Pro ($10/mo) adds more ad formats and downloadable reports. Business ($79/mo) adds email ads, geotargeting, frequency capping, and A/B testing.
- **Choosing AdPlugg vs alternatives**: AdPlugg is best for bloggers and small publishers wanting simple ad management at low cost. For self-serve advertiser portals, use AdButler. For direct-sold local publisher ad management, use Broadstreet. For programmatic, use Epom.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Email ads require Business plan** — the $79/mo plan, not Free or Pro. Email Ad Tags are different from regular ad tags and won't work on lower plans.
2. **No API** — all ad management is through the web dashboard only. No REST API, no webhooks, no Zapier/Make. You cannot automate ad creation or reporting.
3. **Free plan caps at 100K impressions** — after that, ads stop serving until the next month. Monitor usage in the dashboard.
4. **Geotargeting and frequency capping are Business-only** — Pro plan doesn't include these features.
5. **Flash ads are deprecated** — listed in Pro features but Flash is dead in modern browsers. Use HTML5 or image ads instead.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-adbutler` — AdButler full-stack ad server (self-serve portal, email ad zones, REST API + MCP)
- `/sales-broadstreet` — Broadstreet ad manager for local/B2B publishers (newsletter ad zones, sponsored content, WordPress plugin)
- `/sales-epom` — Epom hosted ad server + white-label DSP (API included, RTB free for publishers)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Setting up ads on a WordPress blog
**User says**: "I have a WordPress blog and want to start showing ads. How do I set up AdPlugg?"
**Skill does**: Walks through installing the WordPress plugin, creating an AdPlugg account, setting up zones in the dashboard, creating image ads, and placing zones in widget areas or using shortcodes
**Result**: User has AdPlugg ads running on their WordPress site with rotation and tracking

### Example 2: Adding ads to a Ghost newsletter
**User says**: "How do I add AdPlugg ads to my Ghost newsletter?"
**Skill does**: Explains that email ads require the Business plan ($79/mo), shows how to create an ad, get the Email Tag, paste it into a Ghost HTML card, save as a reusable snippet, and test delivery
**Result**: User has newsletter ads serving in their Ghost emails

### Example 3: Choosing between ad management options
**User says**: "I'm a food blogger with 50K monthly pageviews. Should I use AdPlugg, Google AdSense, or AdButler?"
**Skill does**: Compares all three: AdPlugg (free-$79/mo, simple rotation, no programmatic), AdSense (free but Google controls ad selection, revenue share), AdButler ($179/mo, self-serve portal, programmatic SSP). Recommends AdPlugg free plan for direct-sold ads or AdSense for passive income.
**Result**: User picks the right ad solution for their blog size and monetization model

## Troubleshooting

### Ads not showing on site
**Symptom**: AdPlugg zones are placed but no ads appear
**Cause**: No active ads assigned to the zone, or ad scheduling dates haven't started yet
**Solution**: Check that ads are assigned to the correct zone in the AdPlugg dashboard. Verify start/end dates include today. Check that the zone name in your site code matches the zone name in AdPlugg exactly (case-sensitive).

### Email ad tags not rendering in newsletter
**Symptom**: Email Tag shows broken image or nothing in the newsletter
**Cause**: Using a regular ad tag instead of an Email Tag, or on Free/Pro plan
**Solution**: Email ads require the Business plan ($79/mo). Make sure you're copying the "Email Tag" (not the regular "Tag") from the Ads list. Test with a preview email before sending to your list.

### Site loading slowly after adding AdPlugg
**Symptom**: Page load time increased after installing AdPlugg plugin
**Cause**: Third-party ad network scripts loaded alongside AdPlugg (adexite.com, adnxs.com are NOT AdPlugg services)
**Solution**: Check browser dev tools Network tab — AdPlugg scripts load from adplugg.com only. If you see slow requests to other domains, those are from other plugins or ad networks, not AdPlugg.
