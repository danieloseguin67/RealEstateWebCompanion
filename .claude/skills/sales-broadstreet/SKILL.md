---
name: sales-broadstreet
description: "Broadstreet platform help — ad manager built for local news, regional magazines, and B2B publishers who sell ads directly to advertisers, with newsletter ad zones, sponsored content tracking, automated client-ready reports, HTML5 ad templates, and WordPress plugin. Use when setting up Broadstreet to serve ads on your local news site or newsletter, newsletter ads are duplicating because the same campaign appears in multiple zones, automated reports aren't generating or look wrong, trying to integrate Broadstreet ad zones into MailChimp or ActiveCampaign newsletters, sponsored content click tracking isn't working on WordPress, trying to decide between Broadstreet and AdButler or Google Ad Manager for direct ad sales, or need help with Broadstreet's REST API or WordPress plugin. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or programmatic ad serving (use /sales-epom or /sales-adbutler)."
argument-hint: "[describe your Broadstreet question or ad management goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, advertising, ad-server, platform]
github: "https://github.com/broadstreetads"
---

# Broadstreet Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up Broadstreet to serve ads on my website
   - B) Add ad zones to my email newsletter
   - C) Track sponsored content performance
   - D) Generate client-ready reports
   - E) Integrate via the REST API or WordPress plugin
   - F) Compare Broadstreet to other ad servers

2. **What type of publisher are you?**
   - A) Local news website
   - B) Regional magazine
   - C) B2B/trade journal
   - D) Newsletter publisher
   - E) Radio broadcaster

3. **Current setup** (if applicable): CMS platform, newsletter ESP, number of advertisers

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Sponsorship marketplace (finding sponsors) | `/sales-paved [question]` or `/sales-hecto [question]` |
| Programmatic/RTB ad serving | `/sales-epom [question]` or `/sales-adbutler [question]` |
| API-first custom ad platform | `/sales-kevel [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |

If the question is Broadstreet-specific, continue to Step 3.

## Step 3 — Broadstreet platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, newsletter setup, integration recipes, code examples.

**Read `references/broadstreet-api-reference.md`** for API endpoint details, authentication, and SDK usage.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Create advertisers, campaigns, and zones. Install the WordPress plugin or paste zone tags into your site template. Start with display ads, add sponsored content tracking later.
- **Newsletter ads**: Use static zone code (preferred over RSS merge). Create zones, get zone code, paste into your ESP template. Add MailChimp cachebust macros to prevent image deduplication. Use `overflow=0` for empty zones.
- **Sponsored content**: Enable click tracking on WordPress posts. Broadstreet tracks clicks with timestamp and location data — no Google Analytics access needed for advertisers.
- **Reports**: Set up automated weekly/monthly reports. Broadstreet pulls data from web, newsletter, and sponsored content into client-ready PDFs.
- **API integration**: Get access token from my.broadstreetads.com/access-token. Use PHP or Ruby SDK. API docs at api.broadstreetads.com/docs/v1/.
- **Choosing Broadstreet vs alternatives**: Broadstreet is best for local/B2B publishers with direct sales teams. No RTB/programmatic — purely direct-sold. For programmatic, use Epom or AdButler. For self-serve portal, use AdButler. For free/open-source, use Revive Adserver.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **No programmatic/RTB** — Broadstreet is direct-sold only. If you need programmatic demand, use Epom (RTB free for publishers) or AdButler (RTB add-on).
2. **Newsletter ads can duplicate** — campaign de-duplication doesn't work in email (requires JS). Avoid targeting the same campaign to multiple newsletter zones.
3. **No zone rotation in email** — JavaScript-based rotation doesn't work in email clients. Each zone shows one fixed ad per send.
4. **Dynamic ad formats don't work in newsletters** — Amazing Cube, video ads, etc. require JS. Use only static image ads in email zones.
5. **Valet service costs add up** — Broadstreet Valet charges $10 per 15 minutes. For frequent changes, learn the dashboard yourself or use the API.
6. **Automatic plan has limited availability** — the $399/mo plan isn't always open. Check with Broadstreet sales for current availability.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-epom` — Epom hosted ad server + white-label DSP (API included, RTB free, 40+ metrics)
- `/sales-adbutler` — AdButler full-stack ad server (self-serve portal, email ad zones, REST API + MCP)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-admailr` — Admailr programmatic email ad server (automated ad insertion, CPM+CPC, no setup)
- `/sales-passendo` — Passendo email ad server + SSP (programmatic exchange, direct-sold campaigns)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Setting up newsletter ad zones in MailChimp
**User says**: "I publish a weekly local news newsletter on MailChimp with 15K subscribers. How do I add Broadstreet ads?"
**Skill does**: Walks through creating newsletter zones in Broadstreet, getting the static zone code, adding MailChimp cachebust macros (`?*|CAMPAIGN_UID|**|UNIQID|*`), pasting into the MailChimp template, and using `overflow=0` to handle empty zones gracefully
**Result**: User has Broadstreet ads running in their MailChimp newsletter with proper cachebusting

### Example 2: API integration for campaign creation
**User says**: "How do I use the Broadstreet API to programmatically create campaigns for new advertisers?"
**Skill does**: Shows access token setup, PHP SDK installation, and `createAdvertisement()` method with network_id, advertiser_id, name, type, and options parameters
**Result**: User can automate campaign creation via the API

### Example 3: Choosing between ad servers
**User says**: "I run a regional magazine website. Should I use Broadstreet, AdButler, or Google Ad Manager?"
**Skill does**: Compares all three: Broadstreet ($299/mo, built for local/B2B direct sales, newsletter integration, WordPress plugin, no RTB), AdButler ($179/mo, self-serve portal, programmatic SSP, API add-on), GAM (free but complex, Google lock-in). Recommends Broadstreet for direct-sold publishers who don't need programmatic.
**Result**: User has a clear comparison for their direct-sold publishing model

## Troubleshooting

### Newsletter ads showing the same ad in every zone
**Symptom**: Multiple newsletter zones display identical ads instead of different campaigns
**Cause**: Campaign de-duplication requires JavaScript, which doesn't work in email clients
**Solution**: Assign different campaigns to different zones manually. Avoid targeting the same advertiser/campaign to multiple newsletter zones. Use the trailing number in zone codes (0, 1, 2) to differentiate placements.

### Automated reports not generating
**Symptom**: Scheduled reports aren't arriving by email
**Cause**: Report scheduling misconfigured or email delivery issues
**Solution**: Check report schedule settings in Broadstreet dashboard. Verify the recipient email address. Check spam folders. If reports still don't arrive, contact Broadstreet support (included on all plans).

### Sponsored content clicks not tracking on WordPress
**Symptom**: Sponsored content shows zero clicks despite known traffic
**Cause**: WordPress plugin not installed or Broadstreet tracking code not on the sponsored post
**Solution**: Verify the Broadstreet WordPress plugin is installed and activated. Check that the sponsored content post has Broadstreet tracking enabled. Broadstreet tracks clicks independently of Google Analytics — check the Broadstreet dashboard, not GA.
