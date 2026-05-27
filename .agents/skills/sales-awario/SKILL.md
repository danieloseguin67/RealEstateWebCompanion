---
name: sales-awario
description: "Awario platform help — social listening, brand monitoring, Boolean search, Awario Leads social selling, sentiment analysis, competitive Share of Voice, Reddit monitoring. Use when Awario mentions are full of irrelevant noise and you need to tighten Boolean queries, mention quota is filling up before the month ends, Awario Leads isn't surfacing good prospects, sentiment analysis results seem inaccurate for your industry, you want to compare your brand's Share of Voice against competitors, you need to pull Awario data into another tool via the API or Zapier, or Awario alerts aren't catching mentions you know exist. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Awario — e.g., 'my mentions are too noisy' or 'how do I use the API to export mentions']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, platform]
---
# Awario Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (keywords, Boolean queries, sources)
   - B) Reducing noise / tightening mention quality
   - C) Awario Leads (finding prospects via social selling)
   - D) Competitive monitoring / Share of Voice
   - E) Sentiment analysis and brand health
   - F) API integration or Zapier automation
   - G) Reporting (PDF, white-label, stakeholder reports)
   - H) Something else — describe it

2. **Which Awario plan are you on?**
   - A) Starter (3 topics, 30K mentions/mo)
   - B) Pro (15 topics, 300K mentions/mo)
   - C) Enterprise (100 topics, 1M mentions/mo)
   - D) Free trial / not sure

3. **What are you monitoring?**
   - A) My own brand
   - B) Competitors
   - C) Industry keywords / trends
   - D) Prospects and leads (Awario Leads)
   - E) Multiple of the above

**If the user's request already provides most of this context, skip directly to Step 2.**

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Influencer discovery → `/sales-influencer-marketing [question]`
- Intent signals from social → `/sales-intent [question]`
- Email deliverability → `/sales-deliverability [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Awario platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API details, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Monitoring setup** — design keyword strategy with Boolean operators, configure sources, set up alerts
2. **Noise reduction** — audit top mentions, add NOT exclusions, narrow source filters, use language/country filters
3. **Awario Leads** — configure prospecting queries, set competitor/industry terms, review lead quality
4. **Competitive intel** — build competitor alerts, configure Share of Voice dashboard, track sentiment trends
5. **API/automation** — guide integration using Enterprise API or Zapier triggers

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **API access is Enterprise-only despite pricing page claims.** The pricing page lists "API access" on all plans, but API docs require Enterprise or custom. Verify with Awario support before building integrations on lower plans.
- **Twitter/X data not available via API.** Even on Enterprise, the API cannot return X/Twitter mentions. You can see them in the UI but can't export programmatically.
- **No TikTok monitoring.** Awario does not crawl TikTok. If TikTok is critical, supplement with another tool.
- **Mention quota burns fast with broad queries.** A single broad keyword on Starter (30K/mo) can exhaust the quota in days. Use Boolean NOT exclusions aggressively from day one.
- **No native Reddit search operators.** You can monitor Reddit, but can't use Reddit-specific search syntax — only Awario's built-in filters and Boolean queries.
- **No refunds on annual plans.** Awario does not offer refunds once billed. Start with monthly if evaluating.
- **Stored mentions limit is separate from monthly quota.** Starter stores only 5K mentions per topic — older mentions get purged even if you haven't hit the monthly limit.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, sentiment analysis, competitive intelligence, crisis detection
- `/sales-brand24` — Brand24 platform help — affordable alternative with Storm Alerts and MCP server
- `/sales-mention` — Mention platform help — another budget social listening option
- `/sales-meltwater` — Meltwater platform help — enterprise social listening with media relations
- `/sales-brandwatch` — Brandwatch platform help — enterprise consumer intelligence
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Reduce mention noise
**User says**: "I'm tracking my brand name but Awario is returning thousands of irrelevant mentions from spam blogs and unrelated sites"
**Skill does**:
1. Reads platform-guide.md for Boolean query best practices
2. Audits current query — identifies missing NOT exclusions
3. Suggests adding domain exclusions, language filters, and minimum reach thresholds
4. Recommends reviewing top 50 mentions weekly to catch new noise patterns
**Result**: Refined Boolean query with NOT exclusions that cuts noise by 60-80%

### Example 2: Pull mentions into a dashboard via the API
**User says**: "I want to build a custom brand health dashboard that pulls Awario mention and sentiment data"
**Skill does**:
1. Confirms Enterprise plan is required for API access
2. Walks through authentication setup and API key generation
3. Shows how to use the insights/total endpoint for sentiment and reach aggregates
4. Provides cURL + Python code for fetching time series data
**Result**: Working API integration that feeds a custom dashboard

### Example 3: Set up Awario Leads for social selling
**User says**: "I want to find people on Reddit and Twitter asking for recommendations in my niche so I can respond with my product"
**Skill does**:
1. Explains Awario Leads alert type vs regular Mention alerts
2. Helps configure competitor names and industry keywords as Leads queries
3. Sets up Slack notifications for new leads
4. Warns that X/Twitter leads are UI-only (can't export via API)
**Result**: Awario Leads alert surfacing prospects asking for recommendations

## Troubleshooting

### Mention quota exhausted mid-month
**Symptom**: "Mentions limit reached" warning and monitoring stops before the billing cycle resets
**Cause**: Queries are too broad, pulling in high-volume irrelevant mentions that count against the quota
**Solution**: Add NOT exclusions for high-volume noise sources. Use the `source` filter to limit to relevant platforms. Consider upgrading from Starter (30K) to Pro (300K) if your brand genuinely generates high volume. Check the Mentions Feed for patterns — spam domains, common-word collisions, and foreign-language false positives are the top quota burners.

### Awario Leads returning low-quality prospects
**Symptom**: Leads alert shows mentions that aren't real buying signals — just general discussion or complaints
**Cause**: Leads queries are too broad or using generic industry terms instead of buying-intent phrases
**Solution**: Use phrases that signal purchase intent: "looking for", "recommend a", "alternative to [competitor]", "best tool for". Add NOT exclusions for complaint/review terms. Filter by language and country to match your target market.

### API returns empty results for alerts with known mentions
**Symptom**: GET /mentions returns an empty array even though the UI shows mentions for that alert
**Cause**: Common causes — wrong alert ID, date range mismatch (API uses UTC timestamps in milliseconds for mentions but YYYY-MM-DD for insights), or X/Twitter mentions (not available via API)
**Solution**: Verify alert ID with the get-alerts endpoint first. Check date format — mentions endpoint uses millisecond timestamps, insights endpoint uses YYYY-MM-DD. Confirm the mentions you see in UI aren't X/Twitter (excluded from API). Test with no date filters first to confirm data access works.
