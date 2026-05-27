---
name: sales-buzzabout
description: "Buzzabout platform help — AI-powered social media intelligence that analyzes billions of conversations across Reddit, TikTok, YouTube, Instagram, LinkedIn, and X to generate audience insights, sentiment analysis, trend tracking, competitive research, and synthetic audience segments. Use when Buzzabout research credits (RH) are running out too fast and you need to optimize credit usage, AI analysis isn't surfacing the pain points or trends you expected, you want to set up narrative tracking with Slack alerts for emerging topics, synthetic audience segments feel too broad and don't match your actual customers, you need to reverse-engineer a competitor's content strategy using social conversations, you want to automate content ideas from trending discussions via Zapier webhook, or you're comparing Buzzabout vs SparkToro vs Reddinbox vs BuzzSumo for audience intelligence. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Buzzabout]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, audience-intelligence, platform]
---

# Buzzabout Platform Help

Helps the user with Buzzabout platform questions — from research setup and credit optimization through AI analysis, narrative tracking, audience segmentation, and competitive intelligence.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Buzzabout do you need help with?**
   - A) Research setup — topics, keywords, language filters
   - B) Credit management — optimizing RH usage, understanding overage costs
   - C) AI analysis — interpreting sentiment, trends, pain points
   - D) Narrative tracking — setting up Slack alerts for topic shifts
   - E) Audience segmentation — creating and refining synthetic audiences
   - F) Competitive research — reverse-engineering competitor strategies
   - G) Integrations — Zapier webhook, Slack alerts, API (Enterprise)
   - H) Billing — Pro vs Business vs Enterprise plan differences
   - I) Something else — describe it

2. **What's your goal?** (describe your specific question or problem)

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Audience intelligence (where audiences spend attention) → `/sales-sparktoro [question]`
- Content intelligence and trending content → `/sales-buzzsumo [question]`
- Reddit-specific monitoring or lead gen → `/sales-social-listening [question]`
- Buyer intent signals and prioritization → `/sales-intent [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Buzzabout platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, credit system, integration recipes, and comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Research setup** — start with narrow topics, expand after reviewing initial results; use language filters to reduce noise
2. **Credit optimization** — batch related queries; use custom date ranges to avoid scanning irrelevant timeframes; credit rollovers help if usage is uneven month-to-month
3. **Narrative tracking** — set up Slack alerts for emerging narratives so you catch trend shifts early
4. **Audience segmentation** — refine synthetic audiences by cross-referencing with actual customer profiles; segments are starting points, not final targeting
5. **Competitive research** — analyze competitor brand mentions alongside your own; focus on sentiment differences and unmet needs

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Credit-based pricing is unpredictable.** Research Hours (RH) consumption varies by query complexity and data volume. A broad topic scan burns more credits than a narrow one. Monitor usage in the dashboard and set overage alerts ($0.25/RH overage adds up fast).
- **API is Enterprise-only.** Pro and Business plans have no programmatic access except via the Zapier webhook digest workaround. If you need API access, you must contact sales for Enterprise pricing.
- **Zapier webhook is the only automation path on Pro/Business.** Insert Zapier's webhook URL as a digest destination to route topic alerts to Slack, email, or other tools. There is no native REST API endpoint.
- **Synthetic audiences are AI-generated, not tracked cohorts.** They're derived from conversation patterns, not actual user profiles. Useful for messaging direction, not for targeting.
- **Data sources are broad but depth varies.** Reddit and TikTok analysis is strongest. Instagram, LinkedIn, and X coverage depends on public data access, which platforms restrict periodically.
- **Free trial is limited.** Evaluate whether the credit allocation covers your research scope before committing to a paid plan.

## Related skills

- `/sales-social-listening` — Social listening strategy — monitoring setup, tool comparison, sentiment analysis, competitive intelligence, crisis detection
- `/sales-sparktoro` — SparkToro — audience intelligence revealing where audiences spend attention (websites, podcasts, YouTube, subreddits)
- `/sales-buzzsumo` — BuzzSumo — content intelligence, trending topics, journalist database, backlinks API
- `/sales-reddinbox` — Reddinbox — AI audience intelligence across Reddit, X, HN with intent scoring and market briefs
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Optimize credit usage for market research
**User says**: "I'm burning through my 200 RH in the first week doing competitor research — how do I make credits last?"
**Skill does**:
1. Reviews how RH consumption works — broader queries and longer date ranges consume more
2. Recommends narrowing date ranges to last 30 days instead of all-time
3. Suggests batching related competitor queries into single research sessions
4. Notes credit rollovers mean unused credits carry over — consider spreading research across weeks
**Result**: Practical credit optimization strategy to stretch 200 RH across a full month

### Example 2: Set up automated content ideas via Zapier
**User says**: "How do I get Buzzabout to send me trending topic ideas in Slack every morning?"
**Skill does**:
1. Explains the Zapier webhook integration — insert webhook URL as digest destination
2. Walks through setting up a Zapier workflow: Buzzabout digest → Zapier webhook trigger → OpenAI action (generate content ideas) → Slack message
3. Notes this is the only automation path on Pro/Business — no native API
4. Suggests daily digest frequency to avoid credit overconsumption
**Result**: Working Zapier automation pipeline from Buzzabout to Slack with AI content generation

### Example 3: Compare Buzzabout vs SparkToro for audience research
**User says**: "Should I use Buzzabout or SparkToro to understand my target audience?"
**Skill does**:
1. Explains the fundamental difference: Buzzabout analyzes what audiences say (conversations, sentiment, pain points); SparkToro reveals where audiences spend attention (websites, podcasts, channels)
2. Notes Buzzabout is better for understanding motivations and trending narratives; SparkToro is better for channel discovery and ad placement
3. Suggests using both if budget allows — SparkToro for finding channels, Buzzabout for understanding what resonates
4. Compares pricing: Buzzabout Pro $49/mo vs SparkToro Personal $50/mo
**Result**: Clear comparison based on user's specific research goals

## Troubleshooting

### AI analysis results feel generic or shallow
**Symptom**: Buzzabout returns insights that seem obvious or don't match what you see in actual conversations
**Cause**: Topic query is too broad, covering millions of conversations without specificity
**Solution**: Narrow the research topic with specific keywords, competitor names, or product categories. Use language filters if your market is non-English. Try the AI Chat interface to ask follow-up questions that drill into specific themes. Reduce the date range to focus on recent conversations where trends are clearer.

### Research credits depleting too fast
**Symptom**: Running out of 200 RH (Pro) or 600 RH (Business) well before month end
**Cause**: Running broad queries, long date ranges, or too many parallel research sessions
**Solution**: Check credit usage in the dashboard. Batch related queries into fewer sessions. Use custom date ranges (last 30 days) instead of all-time scans. Consider the one-time top-up option for spike months rather than upgrading plans. Credits roll over, so light months offset heavy ones.

### Slack alerts aren't arriving for narrative tracking
**Symptom**: You set up narrative tracking but Slack notifications aren't coming through
**Cause**: Slack integration may not be properly connected, or alert thresholds are set too high
**Solution**: Verify the Slack connection in Buzzabout settings. Check that narrative tracking topics have alert thresholds that match realistic conversation volumes. Test with a known trending topic first to confirm the pipeline works. If using Zapier webhook instead of native Slack, verify the webhook URL is correctly pasted as the digest destination.
