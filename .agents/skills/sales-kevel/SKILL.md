---
name: sales-kevel
description: "Kevel platform help — API-first ad server infrastructure for building custom ad platforms (sponsored listings, native ads, email ads, retail media networks), Decision API, Campaign Management API, Inventory API, UserDB, Audience segmentation, Forecast API. Use when setting up Kevel to serve ads in your newsletter or app, Decision API requests are returning empty or wrong ads, campaign management API calls are failing or flights aren't pacing correctly, email ad impressions are inaccurate due to Gmail caching or image proxying, ad reporting is too basic and you need custom analytics from raw logs, or building a custom ad server for your marketplace or publisher network. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or programmatic email ads without engineering resources (use /sales-admailr or /sales-paved)."
argument-hint: "[describe your Kevel ad server question or custom ad platform goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, advertising, ad-server, retail-media, platform]
github: "https://github.com/adzerk"
---

# Kevel Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Build a custom ad server for my app, marketplace, or publisher network
   - B) Serve ads in email newsletters via Kevel
   - C) Integrate the Decision API to request and render ads
   - D) Manage campaigns, flights, and creatives via the API
   - E) Set up audience segmentation and targeting
   - F) Troubleshoot ad serving, reporting, or pacing issues

2. **What type of ads are you serving?**
   - A) Sponsored listings / native ads (marketplace, ecommerce)
   - B) Display ads (banners, image ads)
   - C) Email ads (newsletter ad insertion)
   - D) Video / DOOH / audio ads
   - E) Internal promotions / house ads

3. **Technical context**: Language/framework, current ad serving setup (if any), scale (daily requests)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (not ad serving infra) | `/sales-newsletter [question]` |
| Programmatic email ads without building a custom server | `/sales-admailr [question]` or `/sales-paved [question]` |
| Email deliverability (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |
| CRM integration patterns | `/sales-integration [question]` |

If the question is Kevel-specific, continue to Step 3.

## Step 3 — Kevel platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, email ad setup, integration recipes, code examples.

**Read `references/kevel-api-reference.md`** for API endpoint details, authentication, request/response formats, and SDK links.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Building a custom ad server**: Start with the Management API tutorial — create Advertiser → Campaign → Flight → Ad. Use the Decision API to request ads server-side. Start with the default "House" priority for testing.
- **Email ad serving**: Image-only creatives. Append unique cache-busting keys to each send to prevent Gmail caching issues. Pass `?key={userKey}` to fix Gmail proxy IP tracking.
- **Scaling**: Kevel handles 3B+ daily API requests. Use eCPM optimization for auction-based ad selection. Implement frequency capping and ad pacing at the flight level.
- **Analytics**: Built-in reporting is basic — for custom analytics, ingest raw Kevel event logs and build your own dashboards.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Gmail caches email ad images**: When the same image URL goes to multiple recipients, Gmail hosts it on their servers. This breaks impression tracking. Fix: append a unique segment (date/time or subscriber ID) to the image URL for each send.
2. **Gmail proxies IP addresses**: Google uses its own IP for image requests, breaking geo-targeting and unique user tracking. Fix: pass `?key={userKey}` on both the click and image URLs.
3. **Email ads are image-only**: No JavaScript, iFrames, or HTML creatives in email. Only static image tags with click-through links.
4. **Reporting is basic out of the box**: G2 reviewers consistently note limited reporting customization. For deeper analytics, ingest raw event logs into your own data warehouse.
5. **UI and API can be disconnected**: Some settings changed in the UI don't immediately reflect in API responses, and vice versa. Always GET the current object state before PUTting updates.
6. **Custom pricing only**: No published pricing tiers. Pricing is based on features + monthly request volume. Contact sales for a quote.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, ad sales, pricing)
- `/sales-admailr` — Admailr programmatic email ad server (automated ad insertion, CPM+CPC, no subscriber minimum)
- `/sales-buysellads` — BuySellAds contextual advertising marketplace (managed ad sales, Carbon Ads, Ad Serving API)
- `/sales-paved` — Paved newsletter sponsorship marketplace (Ad Network, Booker, Radar)
- `/sales-integration` — Tool integration strategy (API pipelines, webhooks, iPaaS)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Newsletter email ad setup
**User says**: "I want to serve targeted ads in my newsletter using Kevel. How do I set up email ad serving?"
**Skill does**: Walks through creating an advertiser, campaign, and flight with image-only creatives. Shows how to generate email ad code with cache-busting and user key parameters. Explains targeting options (geo, keyword, user-level).
**Result**: User has working email ad tags ready to insert into their ESP template

### Example 2: Decision API integration
**User says**: "How do I call the Kevel Decision API to get an ad for a sponsored listing in my marketplace?"
**Skill does**: Shows the POST request to `https://e-{networkId}.adzerk.net/api/v2` with placement JSON, explains required fields (divName, networkId, siteId, adTypes), walks through parsing the response (clickUrl, impressionUrl, contents array)
**Result**: User has working Decision API integration with proper impression/click tracking

### Example 3: Inaccurate email impressions
**User says**: "My Kevel email ad impression counts are way too low — they don't match my send volume"
**Skill does**: Diagnoses Gmail caching (identical image URLs cached across recipients) and Gmail proxy (IPs masked). Shows the fix: unique URL segment per send + `?key={userKey}` parameter. Recommends CPC over CPM billing for email ads.
**Result**: User has accurate impression tracking with cache-busting implemented

## Troubleshooting

### Email ad impressions don't match send volume
**Symptom**: Impression counts are far lower than emails sent
**Cause**: Gmail and other email clients cache identical image URLs across recipients, counting multiple opens as one impression. Gmail also proxies image requests through their own IPs.
**Solution**: Append a unique value to the image URL's final segment for each send (e.g., date/time stamp or subscriber ID). Add `?key={subscriberEmail}` to both click and image URLs. For UserDB-enabled accounts, use the subscriber's `userKey`.

### Decision API returns no ads
**Symptom**: API response has empty decisions
**Cause**: No active flights match the placement criteria (wrong adType, no matching priority, flight budget exhausted, targeting mismatch)
**Solution**: Verify the placement's `siteId` and `adTypes` match your inventory setup. Check that at least one flight is active with remaining budget. Ensure the flight's priority is assigned to the correct channel/site. Test with a "House" priority flight first.

### Campaign changes in UI not reflected in API
**Symptom**: Updated a campaign in the Kevel UI but API GET returns old data
**Cause**: UI and API can have sync delays; also, partial PUTs can overwrite fields
**Solution**: Always GET the full object before updating via PUT. Pass the entire object contents as the payload, not just changed fields. Wait 30-60 seconds for UI changes to propagate to the API.
