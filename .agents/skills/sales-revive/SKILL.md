---
name: sales-revive
description: "Revive Adserver platform help — free open-source self-hosted ad server for managing display and email newsletter ads across websites, apps, and video players. Use when setting up Revive Adserver on your own server to manage ad campaigns, email newsletter zone only shows one banner and you need multiple ads rotating, ads not displaying after installation or PHP upgrade, geo-targeting rules aren't matching the right countries or cities, XML-RPC API calls failing with authentication errors, campaign statistics not tracking impressions or clicks correctly, trying to decide between self-hosted Revive and hosted alternatives like AdButler or Epom, or need to integrate Revive ad zones into your email newsletter. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or managed hosted ad serving without self-hosting (use /sales-adbutler or /sales-epom)."
argument-hint: "[describe your Revive Adserver question or ad serving goal]"
license: MIT
version: 1.0.0
tags: [sales, advertising, ad-server, open-source, platform]
github: "https://github.com/revive-adserver"
---

# Revive Adserver Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Install and set up Revive Adserver on my server
   - B) Create and manage ad campaigns
   - C) Set up email/newsletter ad zones
   - D) Configure targeting (geo, frequency, URL, time)
   - E) Use the XML-RPC API for automation
   - F) Compare Revive to other ad server options

2. **Hosting setup**:
   - A) Self-hosted on my own server
   - B) Using the hosted edition (revive-adserver.net)
   - C) Haven't decided yet

3. **Current version**: Revive v4.x, v5.x, or v6.x?

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Managed hosted ad serving (no self-hosting) | `/sales-adbutler [question]` or `/sales-epom [question]` |
| Direct-sold ad management for local publishers | `/sales-broadstreet [question]` |
| Budget ad serving for bloggers (no server required) | `/sales-adplugg [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |

If the question is Revive-specific, continue to Step 3.

## Step 3 — Revive Adserver platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API overview, email zone setup, integration recipes.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **First-time setup**: Download from revive-adserver.com/download (not GitHub ZIP). Requires PHP 7.2.5+ (v5.x) or PHP 8+ (v6.x), MySQL/MariaDB/PostgreSQL, Apache/Nginx. Run the web installer, create your first advertiser, campaign, banner, and zone.
- **Email newsletter ads**: Create a zone with type "Email/Newsletter". Only one active banner can serve per email zone (no JavaScript, no cookies). For multiple ads, install the "Multiple Ads in an Email Zone" plugin. Only image banners work in email zones.
- **API automation**: Built-in XML-RPC v2 API at `/api/v2/xmlrpc/`. Auth with base64 user:password. Manage advertisers, campaigns, banners, zones, and pull statistics programmatically. Third-party REST API plugin available for purchase.
- **Choosing Revive vs alternatives**: Revive is best when you need full control, zero platform fees, and can manage your own server. For managed hosting with less ops burden, use AdButler ($179/mo) or Epom ($149/mo). For budget no-code, use AdPlugg (free-$79/mo).

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about version compatibility and email zone limitations that may be outdated.*

1. **Email zones support only one active banner** — without the paid "Multiple Ads in an Email Zone" plugin, only one banner can be active per email/newsletter zone at a time. No JavaScript or cookies in email.
2. **PHP version compatibility is strict** — v5.x requires PHP 7.2.5+, v6.x requires PHP 8+. Versions before v5.3.0 don't work with PHP 8. Upgrading PHP can break your installation.
3. **Don't download from GitHub** — GitHub ZIP contains development files. Always download releases from revive-adserver.com/download.
4. **Email zones only support image banners** — text banners and HTML banners don't work in email/newsletter zones. Use image creatives only.
5. **Geo-targeting requires MaxMind GeoLite2** — you must download and configure the GeoLite2 database separately. Requires a free MaxMind account.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-adbutler` — AdButler full-stack ad server (managed hosting, self-serve portal, email ad zones, REST API + MCP)
- `/sales-epom` — Epom hosted ad server + white-label DSP (API included, RTB free for publishers, auto-optimization)
- `/sales-broadstreet` — Broadstreet ad manager for local/B2B publishers (newsletter ad zones, sponsored content, WordPress plugin)
- `/sales-adplugg` — AdPlugg budget ad server (free-$79/mo, WordPress/Ghost plugins, email ad tags)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-passendo` — Passendo email ad server + SSP (programmatic exchange, direct-sold campaigns)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Installing Revive Adserver for the first time
**User says**: "I want to set up my own ad server on my VPS to manage newsletter ads. How do I install Revive?"
**Skill does**: Walks through server requirements (PHP 8+, MySQL/MariaDB, Apache/Nginx), downloading from official site, running the web installer, creating the admin account, and setting up the first advertiser/campaign/zone
**Result**: User has a working Revive Adserver installation ready to serve ads

### Example 2: Setting up email newsletter ad zones
**User says**: "How do I add Revive ads to my email newsletter?"
**Skill does**: Explains creating an Email/Newsletter zone type, the one-active-banner limitation, image-only requirement, how to get the zone invocation code, and the Multiple Ads plugin for rotating multiple banners
**Result**: User has email ad zones generating trackable ad tags for their newsletter

### Example 3: Automating campaign management via API
**User says**: "I want to create campaigns and pull stats from Revive programmatically"
**Skill does**: Shows the XML-RPC v2 API at /api/v2/xmlrpc/, authentication with base64 credentials, creating a campaign via ox.addCampaign, pulling daily statistics, and available PHP wrapper packages on Packagist
**Result**: User can programmatically manage their Revive installation

## Troubleshooting

### Ads not displaying on website
**Symptom**: Zone invocation code is placed but no ads appear
**Cause**: No active banners linked to the zone, campaign dates haven't started, or delivery rules exclude the current visitor
**Solution**: Check that banners are linked to the zone and campaign dates include today. Test with delivery rules temporarily disabled. Check browser console for JavaScript errors in the zone invocation code.

### Email zone shows broken image
**Symptom**: Email/newsletter zone tag shows a broken image icon in the email client
**Cause**: The Revive server is unreachable from the email client, or the banner URL has changed
**Solution**: Verify the Revive server URL is publicly accessible (not localhost). Check that the banner image still exists. Test the image URL directly in a browser. Ensure your server's SSL certificate is valid — many email clients block mixed content.

### Installation fails after PHP upgrade
**Symptom**: Revive dashboard shows errors or blank page after upgrading PHP
**Cause**: PHP version incompatibility — v5.x doesn't support PHP 8, v6.x requires PHP 8+
**Solution**: Check the compatibility matrix: Revive v5.3.0+ supports PHP 7.2.5-7.4, Revive v6.x requires PHP 8.0+. Either downgrade PHP or upgrade Revive to a compatible version.
