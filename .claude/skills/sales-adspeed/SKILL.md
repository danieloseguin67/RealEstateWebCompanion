---
name: sales-adspeed
description: "AdSpeed platform help — hosted ad server for publishers, advertisers, agencies, and ad networks with display, video, mobile, and email/newsletter ad serving, zone management, ad targeting, optimization, and REST API. Use when setting up AdSpeed to serve ads on your website or email newsletter, ads aren't showing and you suspect DNS or zone configuration issues, email newsletter zone clicks don't match impressions because of cookie-less tracking, ad costs are growing as your impression volume scales and you need to optimize your plan, trying to configure MailChimp merge tags for unique ad pair matching in email zones, or comparing AdSpeed to AdButler, Revive Adserver, or Google Ad Manager. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or programmatic RTB ad serving (use /sales-epom or /sales-adbutler)."
argument-hint: "[describe your AdSpeed question or ad serving goal]"
license: MIT
version: 1.0.0
tags: [sales, advertising, ad-server, platform]
---

# AdSpeed Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Set up AdSpeed to serve ads on my website
   - B) Serve ads in my email newsletter
   - C) Manage campaigns and advertisers via the API
   - D) Configure ad targeting (geo, time, keyword)
   - E) Compare AdSpeed to other ad servers

2. **Your role?**
   - A) Publisher (monetizing my own site/newsletter)
   - B) Advertiser (placing ads on publisher sites)
   - C) Ad agency (managing multiple clients)
   - D) Ad network operator

3. **Current plan**: Free trial, Premium 100 ($9.95/mo), or higher?

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

If the question is AdSpeed-specific, continue to Step 3.

## Step 3 — AdSpeed platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, email zone setup, API overview, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Publisher getting started**: Create zones (display or email type), create ads with image URLs, link ads to zones, get the ad tag code, paste into your site template. Ads rotate automatically based on optimizer settings.
- **Email newsletter ads**: Create an Email/Newsletter zone, link image-only ads, get the ad tag (static `<a>` + `<img>` — no JavaScript). Add `&pair=em@{MERGE_TAG}` for unique matching if your ESP supports merge tags.
- **API automation**: Get API key/secret from Tools > API for Developers. Sign requests with MD5 hash. XML responses. 600 req/hr limit.
- **Choosing AdSpeed vs alternatives**: AdSpeed is best for budget-conscious publishers needing hosted ad serving with email support. For self-hosted free, use Revive. For self-serve portal, use AdButler. For direct-sold local, use Broadstreet.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Email zones only support image banner ads** — no HTML, no rich media, no video. If your newsletter ad needs animated content, you'll need a GIF.
2. **Cookie-less email tracking** — email clients block cookies, so impression-to-click matching requires the `&pair=` parameter with ESP merge tags. Without it, only one ad can be active per zone at a time.
3. **API responses are XML, not JSON** — the REST API returns XML. You'll need an XML parser in your integration code.
4. **API rate limits are strict** — 600 requests/hour across all methods, 2400/day per method, and create operations are capped at 50/day.
5. **Costs scale with impressions** — the slider-based pricing means your bill grows with traffic. Monitor your impression usage and consider annual prepayment (up to 20% discount).

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-adbutler` — AdButler full-stack ad server (self-serve portal, email ad zones, REST API + MCP)
- `/sales-broadstreet` — Broadstreet ad manager for local/B2B publishers (newsletter ad zones, sponsored content, WordPress plugin)
- `/sales-epom` — Epom hosted ad server + white-label DSP (API included, RTB free for publishers)
- `/sales-revive` — Revive Adserver free open-source self-hosted ad server (email zones, XML-RPC API)
- `/sales-adplugg` — AdPlugg budget ad server (free-$79/mo, WordPress/Ghost plugins, email ad tags)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, Decision API)
- `/sales-deliverability` — Email deliverability strategy (SPF, DKIM, DMARC, warmup)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Setting up email newsletter ads
**User says**: "I want to serve ads in my weekly newsletter using AdSpeed. How do I set it up?"
**Skill does**: Walks through creating an Email/Newsletter zone, linking image banner ads, getting the ad tag code, inserting into the ESP template, and configuring merge tag pair matching for multi-ad zones
**Result**: User has newsletter ads serving with proper impression-to-click tracking

### Example 2: Automating ad management via the API
**User says**: "How do I use the AdSpeed API to create zones and pull stats programmatically?"
**Skill does**: Shows API authentication (key + secret + MD5 signing), demonstrates `AS.Zones.create` and `AS.Zone.getStats` endpoints with cURL examples, explains rate limits and XML response parsing
**Result**: User has working API integration for automated zone management and reporting

### Example 3: Choosing between ad servers
**User says**: "I'm a small publisher with 200K monthly pageviews. Should I use AdSpeed, AdButler, or Revive Adserver?"
**Skill does**: Compares all three: AdSpeed ($9.95/mo for 100K, hosted, email zones, API), AdButler ($179/mo, self-serve portal, MCP, programmatic SSP), Revive (free self-hosted, needs server management). Recommends AdSpeed for budget hosted ad serving without ops burden.
**Result**: User picks the right ad server for their traffic and budget

## Troubleshooting

### Ads not showing on site
**Symptom**: Zone ad tags placed on the page but no ads appear
**Cause**: DNS/ISP blocking the ad server domain, no active ads linked to the zone, or ad scheduling dates not started
**Solution**: Check the Serving Errors report (Reports > Advanced > Serving Errors). Verify ads are linked to the correct zone and have active status. Try accessing AdSpeed's ad server domain directly to rule out DNS blocking. Check ad scheduling dates include today.

### Email ad clicks not matching impressions
**Symptom**: Newsletter ads show impressions but very few or zero clicks are tracked
**Cause**: The `<a href>` and `<img src>` tags have mismatched parameters, or the `&pair=` value isn't being populated by the ESP
**Solution**: Ensure both the click URL and image URL use identical parameters (zone ID, dimensions, pair value). If using merge tags like `*|EMAIL_UID|*`, verify the ESP is replacing them in the sent email. Test with a preview email first.

### API authentication failing
**Symptom**: API requests return authentication errors
**Cause**: Incorrect MD5 signature generation — parameters not sorted alphabetically, API secret not prepended correctly, or hash not lowercase
**Solution**: Sort all parameters alphabetically, URL-encode special characters, prepend the API secret to the sorted string, generate a lowercase MD5 hash, and append as `&sig=`. See the platform guide for a working cURL example.
