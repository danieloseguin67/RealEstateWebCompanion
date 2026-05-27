---
name: sales-adserver-online
description: "Adserver.Online platform help — cloud-hosted ad server for building ad networks with display, video, native, email, and programmatic (OpenRTB/Prebid) ad serving, multicurrency bidding, retargeting, white-label customization, and REST API v2 at api.adsrv.net/v2 with Bearer token auth. Use when setting up Adserver.Online to serve ads on your website or email newsletter, campaigns aren't delivering or pacing is off and you need to check budget or throttling settings, email ad tags aren't rendering because you used the wrong code type instead of the Email format, trying to automate ad ops with the Adserver.Online API but Bearer token auth isn't working, programmatic RTB or Prebid adapter setup isn't filling inventory, or comparing Adserver.Online to AdButler, Epom, or Kevel for a publisher ad server. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or free self-hosted ad server setup (use /sales-revive)."
argument-hint: "[describe your Adserver.Online question or ad serving goal]"
license: MIT
version: 1.0.0
tags: [sales, advertising, ad-server, platform]
github: "https://github.com/adserver-online"
---
# Adserver.Online Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up Adserver.Online to serve ads on my website
   - B) Serve ads in my email newsletter
   - C) Manage campaigns, ads, or zones via the API
   - D) Set up programmatic RTB (OpenRTB / Prebid)
   - E) Configure targeting (geo, device, retargeting, custom)
   - F) Compare Adserver.Online to other ad servers

2. **Your role?**
   - A) Publisher (monetizing my own site/newsletter)
   - B) Advertiser (placing ads on publisher sites)
   - C) Ad network operator (managing publishers + advertisers)

3. **Current plan**: Free trial, Starter ($49/mo), Premium ($199/mo), or Ultimate ($599/mo)?

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (subscriptions, pricing models) | `/sales-newsletter [question]` |
| Self-serve advertiser portal | `/sales-adbutler [question]` |
| Direct-sold ad management for local publishers | `/sales-broadstreet [question]` |
| Free self-hosted ad server | `/sales-revive [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |
| API-first custom ad platform | `/sales-kevel [question]` |

If the question is Adserver.Online-specific, continue to Step 3.

## Step 3 — Adserver.Online platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, email ad setup, API overview, data model, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Create a site and zones (display/email/video), create campaigns with ads, assign ads to zones, generate ad code and paste into your site. Ads rotate automatically.
- **Email newsletter ads**: Requires Premium plan ($199/mo). On the zone page, select "Email" as the code type, choose your ESP, copy the generated `<a>` + `<img>` tag into your template. Image banners only — no JavaScript in email. Each message needs a unique ID via ESP macro.
- **API automation**: Create a Bearer token in Account > API tokens. Make requests to `https://api.adsrv.net/v2/{endpoint}`. Owner, publisher, and advertiser tokens access different endpoint sets. 100 req/min rate limit.
- **Choosing Adserver.Online vs alternatives**: Best for ad network operators and publishers wanting RTB + email + video in one platform at competitive pricing ($199/mo for 10M). For self-serve portal, use AdButler. For API-first custom builds, use Kevel. For free self-hosted, use Revive.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Email ads require Premium plan** — Starter ($49/mo) does not include email banner support, video, or API access. You need Premium ($199/mo) minimum.
2. **Image banners only in email** — no JavaScript, iframes, or HTML5 in email zones. Use JPG/GIF/PNG image banners.
3. **Unique message ID is mandatory** — each email send must include a unique per-message identifier via your ESP's merge tag. Without it, impression/click tracking breaks.
4. **No webhooks** — Adserver.Online has no webhook or push notification system. Poll the API for data changes.
5. **Free plan discontinued** — previously offered a free tier, but it has been removed. New users get a 14-day free trial.
6. **No CORS support** — API calls from browsers will fail. Use server-side proxying or backend integrations.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-adbutler` — AdButler full-stack ad server (self-serve portal, email ad zones, REST API + MCP)
- `/sales-epom` — Epom hosted ad server + white-label DSP (API included, RTB free for publishers)
- `/sales-revive` — Revive Adserver free open-source self-hosted ad server (email zones, XML-RPC API)
- `/sales-adspeed` — AdSpeed affordable hosted ad server (email newsletter zones, REST API, from $9.95/mo)
- `/sales-advertserve` — AdvertServe hosted ad server (email IMG tags, video + display, header bidding, white-label, API)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-adglare` — AdGlare cloud-based ad server (display/native/VAST video/CTV, REST API v2)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Setting up email newsletter ads
**User says**: "I want to serve ads in my email newsletter using Adserver.Online. How do I set it up?"
**Skill does**: Confirms Premium plan is required, walks through creating a campaign with an image banner, creating a banner zone, selecting "Email" code type on the zone page, choosing the ESP, and pasting the generated `<a>` + `<img>` tag into the template. Explains the unique message ID requirement.
**Result**: User has newsletter ads serving with proper click and impression tracking via static tags

### Example 2: Automating ad management via the API
**User says**: "How do I use the Adserver.Online API to create campaigns and pull stats?"
**Skill does**: Shows Bearer token creation in Account > API tokens, demonstrates `POST /campaign` and `GET /stats` endpoints with cURL examples, explains owner vs publisher vs advertiser token scopes, pagination headers, and rate limits
**Result**: User has working API integration for campaign management and reporting

### Example 3: Choosing between ad servers
**User says**: "I'm building an ad network. Should I use Adserver.Online, AdButler, or Epom?"
**Skill does**: Compares all three: Adserver.Online ($199/mo for 10M, RTB + email + video, multicurrency, white-label on Ultimate), AdButler ($682/mo for 10M, self-serve portal, MCP, programmatic SSP), Epom ($250/mo, white-label DSP, RTB included on all plans). Notes Adserver.Online's competitive pricing and ad network builder focus.
**Result**: User picks the right ad server based on budget, self-serve needs, and RTB requirements

## Troubleshooting

### Email ad tags not rendering
**Symptom**: Newsletter ads show broken images or nothing
**Cause**: Used JavaScript or iframe zone code instead of Email code type, or missing unique message ID
**Solution**: On the zone page, select "Email" as the code type. Choose your ESP from the dropdown (or Custom). The generated code is a static `<a>` + `<img>` tag. Ensure the unique message ID macro from your ESP is included — without it, tracking won't work.

### API authentication failing
**Symptom**: API requests return 401 Unauthorized
**Cause**: Missing or invalid Bearer token, or using the wrong token scope
**Solution**: Create a new API token in Account > API tokens. Include it as `Authorization: Bearer <token>` in the header. Owner tokens access `/user`, `/campaign`, `/ad`, etc. Publisher tokens only access `/publish/*` endpoints. Advertiser tokens only access `/advert/*` endpoints.

### Campaigns not delivering
**Symptom**: Campaign is active but ads aren't showing
**Cause**: Budget exhausted, scheduling dates not started, no zones assigned, or throttling mode too aggressive
**Solution**: Check `budget_daily` and `budget_total` haven't been reached. Verify `start_date`/`finish_date` include today. Ensure ads are assigned to zones (`POST /ad/assign`). Check `th_mode` — mode 1 (spend evenly) may restrict delivery during low-traffic hours.
