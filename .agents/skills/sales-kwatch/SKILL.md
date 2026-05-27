---
name: sales-kwatch
description: "KWatch.io platform help — multi-platform keyword monitoring across Reddit, Hacker News, X, LinkedIn, Facebook, YouTube with real-time email/Slack/webhook alerts, AI sentiment analysis, conversation tracking, REST API, bulk keyword import. Use when KWatch keyword alerts are returning too much noise and you need to tighten keyword filters or exclusions, you want to set up KWatch webhooks to push alerts to your CRM or dashboard, AI sentiment analysis results don't match what you see in conversations, you're not getting alerts for mentions you know exist on Reddit or LinkedIn, keyword quota is filling up before the month ends, you need to monitor LinkedIn posts alongside Reddit and HN on a budget, or you're comparing KWatch vs Syften vs F5Bot vs Brand24 for keyword monitoring. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in KWatch — e.g., 'too many irrelevant alerts' or 'how do I use the API to create keyword alerts']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, keyword-monitoring, platform]
---

# KWatch.io Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, platforms, filters)
   - B) Reducing noise / too many irrelevant alerts
   - C) Configuring notifications (email, Slack, webhooks)
   - D) Using the API to manage alerts programmatically
   - E) Conversation tracking (monitoring specific threads)
   - F) AI sentiment analysis setup or accuracy
   - G) Plan limits and upgrade decision
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Free (2 Reddit/HN keywords, email only, no AI)
   - B) Essential ($19/mo — 20 Reddit/HN, 2 X/YouTube, 1 FB/LinkedIn, AI sentiment)
   - C) Business ($79/mo — 100 Reddit/HN, API/webhooks/Slack, bulk import)
   - D) Enterprise ($199/mo — 500 Reddit/HN, team management)
   - E) Not sure / haven't signed up yet

3. **What's your goal?**
   - A) Brand monitoring (track mentions of my product)
   - B) Lead generation (find people asking for solutions)
   - C) Competitor monitoring
   - D) Customer research / market trends

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring with AI comment generation → `/sales-keymentions [question]`
- Reddit monitoring with competitive intelligence → `/sales-threadlytics [question]`
- Developer-first monitoring with MCP server → `/sales-octolens [question]`
- Community monitoring across 15+ platforms with API → `/sales-syften [question]`
- Free Reddit monitoring with most keywords → `/sales-f5bot [question]`
- Cheapest Reddit-only alerts → `/sales-redditmentions [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — KWatch platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API endpoints, webhook payload, integration recipes, and code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Noise reduction** — use `excluded_keywords` to remove false positives, restrict to specific subreddits with `included_subreddits`, enable `whole_words_only`, use `case_sensitive` for acronyms
2. **Quota management** — monitor `monthly_count` per alert via API, disable low-value alerts, consolidate overlapping keywords
3. **Integration** — API and webhooks require Business plan ($79/mo). For cheaper API access, consider Syften (API at EUR 39.95/mo) or RedShip (API at $19/mo) or F5Bot (API at $58.33/mo)
4. **LinkedIn coverage** — KWatch is one of the few budget tools monitoring LinkedIn posts ($19/mo vs Meltwater/Brandwatch enterprise pricing)

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and pricing that may change.*

- **API and webhooks are Business-only ($79/mo).** Free and Essential users have no programmatic access. If you need API access at a lower price, F5Bot Ultra ($58.33/mo), Syften (EUR 39.95/mo), or RedShip ($19/mo) all offer REST APIs.
- **No dashboard or feed view.** KWatch is alerts-only — there is no mention feed, timeline, or analytics dashboard. You see mentions only when they arrive via email, Slack, or webhook.
- **LinkedIn monitors posts only, not comments.** You will miss conversations happening in comment threads under LinkedIn posts.
- **Free plan is severely limited.** Only 2 Reddit/HN keywords with no AI analysis, no Slack, and no webhook support. Useful for testing, not production monitoring.
- **No Instagram or TikTok coverage.** If you need visual platform monitoring, consider YouScan or Buzzabout.
- **Keyword alerts match up to 3 independent words that must ALL appear.** This is an AND match, not OR. For OR matching, create separate alerts per keyword.
- **Email alerts truncate large content.** Use Slack or API webhooks to receive full mention content without truncation.
- **Bulk import requires Business plan.** Essential users must add keywords one by one.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-syften` — Syften platform help — fast community monitoring across 15+ platforms with API/webhooks
- `/sales-f5bot` — F5Bot — free Reddit/HN/Lobsters keyword monitoring, 200 free keywords, REST API + webhooks (Ultra)
- `/sales-redditmentions` — RedditMentions — cheapest paid Reddit monitoring at EUR 4.49/mo
- `/sales-octolens` — Octolens — developer-first social listening with API/MCP on all plans
- `/sales-brand24` — Brand24 — affordable social listening with Storm Alerts and MCP server
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up multi-platform brand monitoring on Essential
**User says**: "I want to monitor my SaaS product name across Reddit, LinkedIn, and X — I'm on the Essential plan"
**Skill does**:
1. Reads platform guide for keyword strategy and platform quotas
2. Creates keyword alerts: product name on Reddit (uses 1 of 20 slots), X (1 of 2), LinkedIn (1 of 1)
3. Adds competitor names on Reddit with remaining quota
4. Sets `excluded_keywords` for common false positive words
5. Configures Slack webhook for real-time team notifications
**Result**: Multi-platform monitoring set up within Essential plan limits

### Example 2: Push KWatch alerts to a CRM via API webhook
**User says**: "How do I automatically send KWatch mentions to my Notion database?"
**Skill does**:
1. Confirms Business plan required for webhooks
2. Reads API reference for webhook payload format
3. Shows webhook setup: set `api_webhook_url` on each alert via API or dashboard
4. Provides example payload with `platform`, `query`, `content`, `sentiment`, `link` fields
5. Suggests using a middleware (Make/n8n) to receive the webhook POST and write to Notion
**Result**: Working webhook pipeline from KWatch to Notion

### Example 3: Too many irrelevant Reddit alerts
**User says**: "I'm tracking 'CRM' on KWatch but getting flooded with irrelevant mentions from gaming subreddits"
**Skill does**:
1. Explains that single common words generate high volume
2. Suggests multi-word keywords: "best CRM for", "CRM recommendation", "looking for CRM"
3. Adds `excluded_subreddits` for gaming/unrelated communities
4. Enables `whole_words_only` to avoid partial matches
5. Adds `excluded_keywords` for recurring false positives like "game", "mod"
**Result**: Noise reduced, relevant mentions surfaced

## Troubleshooting

### Alerts not arriving
**Symptom**: Set up keywords but no alerts received via email or Slack
**Cause**: No matches yet (KWatch only sends alerts when matches occur), keyword is too specific, or email going to spam
**Solution**: Test with a very common keyword temporarily to confirm alerts work. Check spam/promotions folder for email alerts. If using Slack, verify the webhook URL is correct and the channel exists. Check that the alert is enabled (`enabled: true`).

### Keyword quota filling up too fast
**Symptom**: Hit the 20 Reddit/HN keyword limit on Essential and still need to track more terms
**Cause**: Monitoring too many variations separately or tracking competitors individually
**Solution**: Consolidate keywords — KWatch matches up to 3 words per alert that must ALL appear. Use broader terms with `excluded_keywords` to filter noise instead of creating narrow separate alerts. If legitimately need more, upgrade to Business (100 Reddit/HN keywords).

### Webhook not receiving payloads
**Symptom**: API webhook URL configured but your endpoint never receives POST requests
**Cause**: Endpoint returning non-2xx, SSL issues, or per-alert webhook overriding global webhook
**Solution**: Verify endpoint accepts POST with JSON body and returns 200. Check if you have both a global webhook and per-alert webhook set — per-alert takes priority. Test with a simple endpoint (webhook.site) first. Ensure you're on Business plan or above (webhooks are plan-gated).
