---
name: sales-mentionlytics
description: "Mentionlytics platform help — AI social listening, brand monitoring, sentiment analysis, SIA advisor, Boolean queries, Share of Voice, competitor tracking, REST API (read-only). Use when Mentionlytics mentions are full of irrelevant noise and you need to tighten keyword queries, mention quota is filling up before the month ends, sentiment analysis results seem inaccurate for your industry, SIA (Social Intelligence Advisor) recommendations don't seem actionable, you want to compare your brand's Share of Voice against competitors, you need to pull Mentionlytics data into a dashboard or CRM via the API, or Mentionlytics alerts aren't catching mentions you know exist. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Mentionlytics — e.g., 'my mentions are too noisy' or 'how do I use the API to export data']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, platform]
---
# Mentionlytics Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (keywords, sources, alerts)
   - B) Reducing noise / tightening mention quality
   - C) Competitor tracking / Share of Voice
   - D) Sentiment analysis and brand health
   - E) SIA (Social Intelligence Advisor) recommendations
   - F) API integration or data export
   - G) Reporting (PDF, white-label, email reports)
   - H) Something else — describe it

2. **Which Mentionlytics plan are you on?**
   - A) Basic ($69/mo)
   - B) Essential ($139/mo)
   - C) Advanced ($249/mo)
   - D) Pro ($399/mo — API access)
   - E) Agency ($599/mo)
   - F) Enterprise ($950/mo)
   - G) Free trial / not sure

3. **What are you monitoring?**
   - A) My own brand
   - B) Competitors
   - C) Industry keywords / trends
   - D) Multiple of the above

**If the user's request already provides most of this context, skip directly to Step 2.**

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Influencer discovery → `/sales-influencer-marketing [question]`
- Intent signals from social → `/sales-intent [question]`
- Social media publishing/scheduling → `/sales-social-media-management [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Mentionlytics platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API details, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Monitoring setup** — design keyword strategy, configure sources, set up email alerts
2. **Noise reduction** — audit top mentions, add Boolean exclusions, narrow channel/language/country filters
3. **Competitive intel** — build competitor keyword trackers, configure Share of Voice, track sentiment trends
4. **API/data export** — guide integration using Pro+ API (read-only), Looker Studio, or Hootsuite
5. **Reporting** — configure automated reports, white-label for clients, stakeholder dashboards

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **API is read-only.** You can pull data out but cannot create keywords, update mentions, or write back. All setup must happen in the dashboard UI.
- **API access requires Pro plan ($399/mo) or higher.** Basic through Advanced plans have no API access. Verify your plan before building integrations.
- **Mentions can take up to 24 hours to appear.** Mentionlytics is not truly real-time for all sources. Web mentions especially can be delayed. Higher plans reportedly get faster scanning.
- **No Zapier or Make integration.** Unlike competitors (Brand24, Mention, Awario), Mentionlytics has no native iPaaS connector. Your only automation options are the REST API (Pro+) or Hootsuite.
- **X/Twitter and LinkedIn data may differ from dashboard.** Platform-imposed API restrictions mean some social mentions accessible in the UI may not appear in API responses.
- **All features are available on all plans.** Unlike competitors that lock sentiment or Boolean behind premium tiers, Mentionlytics gives full features on every plan — the difference is keyword count and mention volume.
- **Bearer tokens expire every hour.** Your integration must handle token refresh automatically or API calls will start failing after 60 minutes.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, sentiment analysis, competitive intelligence, crisis detection
- `/sales-brand24` — Brand24 platform help — affordable alternative with Storm Alerts and MCP server
- `/sales-awario` — Awario platform help — budget social listening with Boolean search and Awario Leads
- `/sales-mention` — Mention platform help — simple affordable monitoring (acquired by Agorapulse)
- `/sales-talkwalker` — Talkwalker platform help — enterprise social listening with image recognition
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Reduce mention noise
**User says**: "I'm getting thousands of irrelevant mentions for my brand name which is a common word"
**Skill does**:
1. Reads platform-guide.md for Boolean query guidance
2. Suggests adding NOT exclusions for common false-positive contexts
3. Recommends using channel, language, and country filters to narrow results
4. Shows how to use the `commtracks` parameter to separate brand vs competitor mentions
**Result**: Refined keyword setup that cuts noise significantly

### Example 2: Pull mention data into a custom dashboard via the API
**User says**: "I want to build a brand health dashboard that shows mention volume and sentiment over time"
**Skill does**:
1. Confirms Pro plan required for API access
2. Walks through Bearer token generation and refresh flow
3. Shows `/api/aggregation` endpoint for sentiment and reach time-series data
4. Provides cURL + Python code for fetching and visualizing data
**Result**: Working API integration feeding a custom dashboard

### Example 3: Set up competitor Share of Voice tracking
**User says**: "I want to compare how often my brand gets mentioned vs three competitors"
**Skill does**:
1. Guides creating separate keyword trackers for each competitor
2. Shows how to use the `commtracks=competitors` filter in the API
3. Configures Share of Voice comparison in the dashboard
4. Sets up weekly email report for stakeholders
**Result**: Competitive monitoring with automated Share of Voice reporting

## Troubleshooting

### Mentions not appearing for known brand conversations
**Symptom**: You see people discussing your brand on social media, but Mentionlytics isn't picking it up
**Cause**: Source coverage gaps (some platforms limit API access), keyword tracking setup too narrow, or 24hr delay hasn't elapsed
**Solution**: Check which channels are enabled for your keyword tracker. Verify exact brand name spelling and variations. Wait 24 hours for web sources. If mentions consistently miss a specific platform, check Mentionlytics' current source coverage for that channel.

### Sentiment analysis marking neutral mentions as negative
**Symptom**: Many mentions flagged negative that are clearly neutral or mixed
**Cause**: Mentionlytics' AI sentiment struggles with sarcasm, industry jargon, and mixed-sentiment posts
**Solution**: Use manual sentiment correction for high-priority mentions. Filter reports by confidence level if available. For reporting, acknowledge ~85% accuracy ceiling and note that manual review is required for borderline cases.

### API token expires and integration stops working
**Symptom**: API calls return 401 Unauthorized after working for about an hour
**Cause**: Bearer tokens expire after 1 hour — integration isn't handling token refresh
**Solution**: Implement automatic token refresh using the Refresh Token endpoint. Store both Bearer and Refresh tokens, check for 401 responses, and automatically request a new Bearer token before retrying the failed request.
