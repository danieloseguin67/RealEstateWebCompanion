---
name: sales-mentiondrop
description: "MentionDrop platform help — web and Reddit mention monitoring with AI summaries, sentiment analysis, relevance scoring, suggested actions, Slack/webhook alerts, read-only REST API. Use when MentionDrop alerts are returning too many irrelevant mentions and you need to tune keyword filtering, you're not sure how to set up keyword context to reduce noise for ambiguous brand names, AI summaries aren't capturing the sentiment or context you expected, webhook notifications aren't firing or the payload format is unclear, you want to pull MentionDrop mentions into your CRM or dashboard via the API, the free plan's 1-keyword limit feels too restrictive and you need to decide whether to upgrade, you want to compare MentionDrop vs F5Bot vs Syften vs Octolens for web and Reddit monitoring, or Slack notifications aren't arriving for new mentions. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in MentionDrop — e.g., 'too much noise in my alerts' or 'how do I use the API to pull mentions']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, platform]
---

# MentionDrop Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, adding context)
   - B) Reducing noise / too many irrelevant mentions
   - C) Understanding AI summaries, sentiment, or relevance scores
   - D) Webhook or Slack integration setup
   - E) Using the API to pull mentions into another tool
   - F) Plan limits and upgrade decision
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Free (1 keyword)
   - B) Starter ($29/mo — 5 keywords)
   - C) Pro ($59/mo — 20 keywords)
   - D) Not sure / haven't signed up yet

3. **What's your goal?**
   - A) Brand monitoring (track what people say about us)
   - B) Competitor monitoring (track competitor mentions)
   - C) Lead generation (find people asking for solutions like mine)
   - D) PR / crisis detection (catch negative mentions fast)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Developer-first monitoring with MCP + API on all plans → `/sales-octolens [question]`
- Free Reddit/HN monitoring with more keywords → `/sales-f5bot [question]`
- Multi-platform monitoring with AI filtering → `/sales-syften [question]`
- Audience intelligence (where audiences spend attention) → `/sales-sparktoro [question]`
- Reddit lead generation with intent scoring → `/sales-buska [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — MentionDrop platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API details, integration recipes, and workflow examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Noise reduction** — add keyword context to help MentionDrop distinguish your brand from common words, use sentiment filters to focus on negative or positive mentions, adjust relevance scoring thresholds
2. **Keyword strategy** — use exact brand name, product names, and competitor names; add context descriptions so the AI understands what you mean by ambiguous terms
3. **Alert routing** — use Slack for real-time team awareness, webhooks for CRM/automation pipelines, email digests for daily review
4. **API integration** — the API is read-only; use it to pull processed mentions into dashboards or data pipelines; filter by keyword, sentiment, content_type, and date range
5. **Plan selection** — Free is fine for testing; $29/mo covers most solo founders (5 keywords); $59/mo for teams monitoring multiple brands/competitors

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and pricing that may change.*

- **API is read-only.** You can pull mentions but can't create keywords or manage settings via API. Use the dashboard for configuration.
- **Free plan is extremely limited.** Only 1 keyword — useful for testing but not for real monitoring. Upgrade to $29/mo for 5 keywords.
- **Keyword context is critical for noise reduction.** MentionDrop uses AI to filter relevance, but ambiguous brand names (e.g., "Mercury", "Notion") need explicit context like "Mercury is a banking app for startups" to avoid false positives.
- **Web monitoring depends on Ahrefs Firehose.** Coverage is broad but not exhaustive — niche forums or gated communities may not appear. Reddit coverage is direct.
- **Webhook payload format is not fully documented.** Test with webhook.site first to see the actual payload structure before building integrations.
- **No native Zapier/Make app.** Use webhooks to trigger Zapier/Make/n8n workflows. For iPaaS-native monitoring, consider Brand24 or Octolens.
- **Detection time averages ~4 minutes.** Faster than Google Alerts (2-3 days) but not truly real-time. For sub-minute alerts, consider Syften or Octolens.
- **No historical data backfill.** Monitoring starts from when you add a keyword — no retroactive mention discovery.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-octolens` — Octolens — developer-first social listening with API/MCP on all plans from $25/mo
- `/sales-f5bot` — F5Bot — free Reddit/HN/Lobsters keyword monitoring with 200 free keywords
- `/sales-syften` — Syften — AI-filtered keyword monitoring across Reddit, HN, X, Bluesky, GitHub, sub-minute alerts
- `/sales-buska` — Buska — AI social listening for lead gen across 30+ platforms, intent scoring, MCP server
- `/sales-brand24` — Brand24 — affordable social listening with Storm Alerts and MCP server
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up brand monitoring for a SaaS product
**User says**: "I just launched a project management tool called TaskFlow and want to know when people mention it online"
**Skill does**:
1. Reads platform guide for keyword setup and context configuration
2. Creates keyword "TaskFlow" with context: "TaskFlow is a project management SaaS tool for remote teams"
3. Adds competitor keywords: "Asana", "Monday.com", "ClickUp" for competitive monitoring
4. Configures Slack for real-time alerts and email for daily digests
5. Recommends $29/mo plan for 5 keywords covering brand + top competitors
**Result**: Brand monitoring live within minutes, AI-summarized alerts with sentiment

### Example 2: Pull MentionDrop mentions into a dashboard via API
**User says**: "How do I get my MentionDrop mentions into a Google Sheet or dashboard?"
**Skill does**:
1. Reads API reference for authentication and endpoint details
2. Shows how to create an API key in the dashboard Settings
3. Provides cURL example: `GET /api/v1/mentions?sentiment=negative&limit=50`
4. Builds a Python script to fetch mentions and write to Google Sheets via gspread
5. Sets up a cron job or n8n workflow to run the script hourly
**Result**: Automated pipeline from MentionDrop mentions to spreadsheet dashboard

### Example 3: Too many irrelevant mentions
**User says**: "I'm monitoring 'Mercury' but getting tons of mentions about the planet and the car brand"
**Skill does**:
1. Explains keyword context feature — add a description like "Mercury is a banking platform for startups"
2. Recommends using sentiment filter to focus on relevant business mentions
3. Suggests adding more specific keywords: "Mercury banking", "Mercury startup bank"
4. Notes that the AI relevance scoring should deprioritize off-topic mentions over time
**Result**: Cleaner mention feed focused on the actual brand

## Troubleshooting

### Mentions arriving late or missing
**Symptom**: You see a Reddit post about your brand but MentionDrop didn't catch it, or it appeared hours later
**Cause**: Average detection time is ~4 minutes for indexed sources, but niche forums or low-traffic subreddits may take longer. Some web sources depend on Ahrefs Firehose crawl frequency.
**Solution**: Check if the source is within MentionDrop's coverage (web via Ahrefs + Reddit). For niche forums, consider adding ForumScout or Syften as supplementary monitoring. For Reddit-specific speed, Syften offers sub-minute alerts.

### Webhook not delivering payloads
**Symptom**: Webhook URL is configured but your endpoint never receives data
**Cause**: Endpoint may be returning non-2xx status, URL may be incorrect, or no new mentions match your filters
**Solution**: Test with webhook.site first to verify MentionDrop sends payloads. Check that your endpoint accepts POST requests and returns 200. Lower any filters temporarily to trigger a test mention. Verify the webhook URL in your MentionDrop dashboard settings.

### AI summaries seem inaccurate
**Symptom**: Sentiment says "positive" but the mention is clearly negative, or the summary misses the key point
**Cause**: AI summarization (Gemini Flash-Lite) can struggle with sarcasm, industry jargon, or multi-language content
**Solution**: Use summaries as a quick filter, not a final judgment. Click through to the original mention for important conversations. If sentiment is consistently wrong for your industry, rely more on relevance scoring and manual review for high-impact mentions.
