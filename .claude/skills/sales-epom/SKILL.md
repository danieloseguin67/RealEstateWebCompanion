---
name: sales-epom
description: "Epom platform help — hosted ad server and white-label DSP for managing direct and programmatic advertising across web, mobile, and CTV with 40+ analytics metrics, auto-optimization, and REST API included on all plans. Use when setting up Epom Ad Server to monetize your website or newsletter with display ads, white-label DSP campaigns aren't delivering or spend is off target, Epom analytics reports don't match third-party tracking numbers, API calls to campaign or advertiser endpoints are failing with auth errors, ad targeting rules aren't applying correctly or geo-targeting is inaccurate, trying to decide between Epom and AdButler or Kevel for your ad server, or setting up the RTB module to sell inventory programmatically. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved or /sales-hecto)."
argument-hint: "[describe your Epom question or ad serving goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, advertising, ad-server, platform]
github: "https://github.com/epom"
---

# Epom Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up Epom Ad Server to serve ads on my website or newsletter
   - B) Configure the white-label DSP for programmatic buying
   - C) Integrate via the REST API (campaigns, analytics, targeting)
   - D) Troubleshoot ad delivery, targeting, or reporting issues
   - E) Compare Epom to other ad servers (AdButler, Kevel, GAM)
   - F) Set up the RTB/SSP module to sell inventory programmatically

2. **Which product are you using?**
   - A) Epom Ad Server (publisher/network — managing your own inventory)
   - B) Epom DSP (advertiser — buying programmatic traffic)
   - C) Both (white-label ad server + DSP stack)

3. **Current setup** (if applicable): monthly impressions, current ad server, direct vs programmatic split

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace (finding sponsors) | `/sales-paved [question]` or `/sales-hecto [question]` |
| Sponsor intelligence (brands that sponsor newsletters) | `/sales-sponsorgap [question]` |
| Building a custom ad platform from scratch (API-first) | `/sales-kevel [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |
| Managed ad server with self-serve portal and MCP | `/sales-adbutler [question]` |

If the question is Epom-specific, continue to Step 3.

## Step 3 — Epom platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, code examples.

**Read `references/epom-api-reference.md`** for API endpoint details, authentication, and working examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Create advertisers, campaigns, and banners. Set up zones on your site or newsletter. Configure targeting rules. Start with direct-sold campaigns, then add RTB for backfill.
- **Email newsletters**: Create zones for email placement — image-only ads. Generate ad tags and paste into your ESP template. Monitor impressions via Analytics API.
- **White-label DSP**: Start with Light plan ($250/mo or 5% spend). Connect SSPs, set up audience targeting with Lotame data, configure bidding autopilot. Brand the interface with your domain and logo.
- **API integration**: API is included on all plans (no add-on fee). Auth uses username + hash + timestamp. Use the Analytics API for custom dashboards, Campaign API for automation, Targeting API for rule management.
- **Choosing Epom vs alternatives**: Epom includes API, RTB, white-labeling, and support on all plans (competitors charge extra). Best for mid-market publishers/networks wanting customization. For API-first custom builds, use Kevel. For managed self-serve portal with MCP, use AdButler. For free/open-source, use Revive Adserver.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **UI is complex for newcomers** — the admin console has 800+ features and can feel overwhelming. Ask Epom support for a guided setup session (included on all plans) to identify which features matter for your use case.
2. **Auth uses HMAC, not Bearer tokens** — API auth requires `username`, `hash` (HMAC signature), and `timestamp` in request parameters. Not a simple API key — see the API reference for the signing pattern.
3. **DSP minimum spend** — while the Light plan starts at $250/mo, Epom recommends $2,000+/mo ad spend for optimal programmatic results. Below that, you won't get enough data for auto-optimization.
4. **Email ads are image-only** — like all ad servers, email zones only support image creatives (no HTML/JS). Gmail caches images across recipients — append unique subscriber IDs to image URLs.
5. **14-day trial caps at 30M impressions** — generous for testing but verify your production volume fits your plan before trial ends.
6. **White-label requires premium package** — basic ad server plans don't include full white-labeling. Confirm your plan tier includes branding customization.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-adbutler` — AdButler full-stack ad server (managed dashboard, self-serve portal, email ad zones, REST API + MCP)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-admailr` — Admailr programmatic email ad server (automated ad insertion, CPM+CPC, no setup)
- `/sales-passendo` — Passendo email ad server + SSP (programmatic exchange, direct-sold campaigns)
- `/sales-postapex` — PostApex newsletter ad network (500+ publishers, CPC, free for publishers)
- `/sales-buysellads` — BuySellAds contextual advertising marketplace (managed ad sales, Carbon Ads)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Publisher setting up ad server
**User says**: "I run a niche tech blog with 2M monthly pageviews. How do I set up Epom to serve display ads?"
**Skill does**: Walks through creating a publisher account, setting up zones for different ad placements (header, sidebar, in-content), creating advertisers and campaigns with CPM pricing, configuring geo and device targeting, and enabling the RTB module for programmatic backfill
**Result**: User has Epom ad server running with direct-sold campaigns and programmatic demand

### Example 2: API integration for automated reporting
**User says**: "How do I pull campaign analytics from Epom's API into my custom dashboard?"
**Skill does**: Shows the Analytics API endpoint with HMAC auth, required parameters (date range, metrics, filters), response format with 40+ metrics, and a working cURL + Python example
**Result**: User has working API scripts to pull ad performance data programmatically

### Example 3: Choosing between ad servers
**User says**: "Should I use Epom, AdButler, or Kevel for my ad network? I have 10M monthly impressions."
**Skill does**: Compares all three: Epom ($224/mo for 10M, API+RTB+white-label included, 40+ metrics), AdButler ($682/mo for 10M, API is paid add-on, self-serve portal), Kevel (custom pricing, API-only, requires engineering). Notes Epom includes features that competitors charge extra for.
**Result**: User has a clear comparison with pricing and feature trade-offs for their scale

## Troubleshooting

### Complex UI — don't know where to start
**Symptom**: Admin console feels overwhelming with too many features and menus
**Cause**: Epom has 800+ customizable features designed for ad networks — most publishers don't need all of them
**Solution**: Contact Epom support (included on all plans, <24hr reply) for a guided setup session. Focus on: Advertisers > Campaigns > Banners > Zones. Ignore the DSP, RTB, and advanced targeting modules until you need them.

### API auth errors (401/403)
**Symptom**: API calls return 401 Unauthorized or 403 Forbidden
**Cause**: HMAC signature computed incorrectly, timestamp drift, or insufficient permissions
**Solution**: Verify your hash computation: `hash = HMAC-SHA256(timestamp, password)`. Ensure the timestamp is current (within 5 minutes). Check that your account role has API access permissions. Test with the simplest GET endpoint first (e.g., Get all Advertisers).

### Analytics numbers don't match third-party tracking
**Symptom**: Epom reports different impression/click counts than Google Analytics or your ESP
**Cause**: Different counting methodologies — Epom counts server-side ad requests, GA counts page loads, ESPs count email opens
**Solution**: Use Epom's pixel tracking for conversion attribution. For email ads, note that cached images don't re-trigger impressions. Compare click counts (more reliable than impressions) across platforms. Use the Analytics API to export raw data for reconciliation.
