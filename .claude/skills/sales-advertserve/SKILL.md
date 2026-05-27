---
name: sales-advertserve
description: "AdvertServe platform help — cloud-hosted ad server since 1998 for B2B and niche publishers with display, video, mobile, and email ad serving, 101-tier zone prioritization, campaign management, geo/keyword/weather targeting, IVT filtering, header bidding via Prebid.js, white-label branding, and full REST API (17 modules, JSON/XML). Use when setting up AdvertServe to serve ads on your website or email newsletter, campaigns aren't delivering impressions or zone tiers aren't prioritizing correctly, email ad tags aren't rendering because you used JavaScript instead of the E-mail code format, trying to automate ad ops with the AdvertServe API but authentication is failing, weather or contextual targeting isn't matching, or comparing AdvertServe to AdButler, Epom, or Google Ad Manager. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or programmatic-only RTB ad serving (use /sales-epom or /sales-adbutler)."
argument-hint: "[describe your AdvertServe question or ad serving goal]"
license: MIT
version: 1.0.0
tags: [sales, advertising, ad-server, platform]
github: "https://github.com/AdvertServe"
---
# AdvertServe Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up AdvertServe to serve ads on my website
   - B) Serve ads in my email newsletter
   - C) Manage campaigns and advertisers via the API
   - D) Configure targeting (geo, keyword, weather, contextual)
   - E) Set up header bidding with Prebid.js
   - F) Compare AdvertServe to other ad servers

2. **Your role?**
   - A) Publisher (monetizing my own site/newsletter)
   - B) Advertiser (placing ads on publisher sites)
   - C) Ad agency (managing multiple clients)
   - D) Ad network operator

3. **Current plan**: 45-day free trial or paid ($299/mo base)?

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Programmatic/RTB ad serving | `/sales-epom [question]` or `/sales-adbutler [question]` |
| Self-serve advertiser portal | `/sales-adbutler [question]` |
| Direct-sold ad management for local publishers | `/sales-broadstreet [question]` |
| Free self-hosted ad server | `/sales-revive [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |

If the question is AdvertServe-specific, continue to Step 3.

## Step 3 — AdvertServe platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, email ad setup, API overview, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Create zones (Banner/Text/VAST Video/Dynamic), create campaigns with media, assign campaigns to zones via tiers (1-100 priority), generate ad tags via Code Wizard, paste into your site. Ads rotate automatically.
- **Email newsletter ads**: Use the Code Wizard to generate "E-mail" code (Banner type). This produces a static `<a>` + `<img>` tag (no JavaScript). Paste into your ESP template. Image-only creatives — no HTML5 or rich media in email.
- **API automation**: Enable API in Settings > Basic > API. Get your secret key. Make HTTP GET/POST requests to `/servlet/control/api/{module}/{action}` with the `secret` parameter. Responses in JSON (`output=json`) or XML (default).
- **Choosing AdvertServe vs alternatives**: AdvertServe is best for mid-to-large publishers wanting a feature-rich hosted ad server with video, header bidding, and white-label. For budget hosting, use AdSpeed ($9.95/mo). For self-hosted free, use Revive. For self-serve portal, use AdButler.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about integration gotchas that may be outdated.*

1. **Email ads must use the E-mail code format** — the Code Wizard generates JavaScript tags by default. For newsletters, explicitly select the "E-mail" code type to get static IMG tags. JavaScript won't render in email clients.
2. **Image format restrictions** — code-based images are not accepted. Creatives must be JPEG, GIF, or PNG files. If a client provides HTML5 or code-based images, you'll need to convert them.
3. **Click tags can be confusing** — understanding how to use tracking pixels and click tags has a learning curve. Use the Code Wizard's generated tags rather than building manually.
4. **API documentation is technical** — the docs assume familiarity with HTTP APIs and programming. Non-technical users should use the web dashboard instead.
5. **No webhooks** — AdvertServe has no webhook or push notification system. You must poll the API for changes.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-adbutler` — AdButler full-stack ad server (self-serve portal, email ad zones, REST API + MCP)
- `/sales-broadstreet` — Broadstreet ad manager for local/B2B publishers (newsletter ad zones, sponsored content, WordPress plugin)
- `/sales-epom` — Epom hosted ad server + white-label DSP (API included, RTB free for publishers)
- `/sales-revive` — Revive Adserver free open-source self-hosted ad server (email zones, XML-RPC API)
- `/sales-adspeed` — AdSpeed affordable hosted ad server (email newsletter zones, REST API, from $9.95/mo)
- `/sales-adplugg` — AdPlugg budget ad server (free-$79/mo, WordPress/Ghost plugins, email ad tags)
- `/sales-adglare` — AdGlare cloud-based ad server (display/native/VAST video/CTV, REST API v2)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Setting up email newsletter ads
**User says**: "I want to serve ads in my newsletter using AdvertServe. How do I set it up?"
**Skill does**: Walks through creating a Banner zone, uploading image creatives, linking campaigns to the zone, using the Code Wizard to generate E-mail code (not JavaScript), and pasting the static IMG tag into the ESP template
**Result**: User has newsletter ads serving with proper click tracking via static tags

### Example 2: Automating ad management via the API
**User says**: "How do I use the AdvertServe API to create zones and pull reports?"
**Skill does**: Shows API setup (Settings > Basic > API), secret key auth, demonstrates `/servlet/control/api/zones/create` and `/servlet/control/api/reports/general/summary` endpoints with cURL examples, explains JSON output option
**Result**: User has working API integration for automated zone management and reporting

### Example 3: Choosing between ad servers
**User says**: "I'm a publisher with 5M monthly impressions. Should I use AdvertServe, AdButler, or Epom?"
**Skill does**: Compares all three: AdvertServe ($449/mo for 5M, feature-rich, header bidding, white-label), AdButler ($682/mo, self-serve portal, MCP, programmatic SSP), Epom ($250/mo, white-label DSP, RTB included). Recommends based on whether the publisher needs header bidding (AdvertServe), self-serve portal (AdButler), or white-label DSP (Epom).
**Result**: User picks the right ad server for their needs and budget

## Troubleshooting

### Ads not showing on site
**Symptom**: Zone ad tags placed on the page but no ads appear
**Cause**: No active campaigns assigned to the zone, campaign scheduling dates not started, or ad blocker interfering
**Solution**: Check the zone has campaigns assigned at active tiers (1-100). Verify campaign scheduling includes today. Test with ad blockers disabled. Check the Code Wizard generated the correct code type (JavaScript for web, not E-mail).

### Email ad tags not rendering
**Symptom**: Newsletter ads show broken images or nothing
**Cause**: Used JavaScript or IFRAME code instead of E-mail code format
**Solution**: In the Code Wizard, select "E-mail" under the Banner module. This generates a static `<a href>` + `<img src>` tag that works in all email clients. JavaScript and IFRAME tags will not render in email.

### API authentication failing
**Symptom**: API requests return 500 error with authentication message
**Cause**: Missing or incorrect `secret` parameter, or API not enabled
**Solution**: Enable API in Settings > Basic > API. Copy the secret key. Pass it as the `secret` parameter in every private API request. Use HTTPS. Configure IP firewall if needed.
