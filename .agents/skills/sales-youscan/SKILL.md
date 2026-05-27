---
name: sales-youscan
description: "YouScan platform help — AI-powered social listening with visual analytics, logo/scene/object detection in images, Insights Copilot AI agent, sentiment analysis, audience demographics, competitive benchmarking. Use when YouScan monitoring returns too many irrelevant mentions and you need to tighten queries, Visual Insights isn't detecting your logo in user-generated photos, Insights Copilot responses aren't answering the question you asked, mention quota is filling up before the month ends on Starter plan, API calls are failing or returning incomplete data on the Unlimited plan, you need to send YouScan mentions to your CRM or BI tool via webhook, or you're unsure whether YouScan's $499/mo starting price is worth it vs cheaper alternatives. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in YouScan — e.g., 'Visual Insights not finding my logo' or 'how to set up webhooks']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, visual-analytics, platform]
---

# YouScan Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring topics and queries
   - B) Visual Insights (logo detection, image analysis)
   - C) Insights Copilot (AI agent for querying data)
   - D) API or webhook integration
   - E) Sentiment analysis or audience insights
   - F) Competitive benchmarking / Share of Voice
   - G) Alerts and notifications
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Starter 3 ($499/mo — 3 topics, 15K mentions/mo)
   - B) Unlimited (custom pricing — unlimited topics + Visual Insights + API)
   - C) Evaluating / haven't signed up yet
   - D) Not sure

3. **Current setup?**
   - A) Just getting started with YouScan
   - B) Have topics set up but results aren't useful
   - C) Need to integrate YouScan with other tools
   - D) Comparing YouScan with other social listening tools

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer, then ask only the most critical 1-2 clarifying questions.

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Choosing between social listening tools → `/sales-social-listening [question]`
- Influencer discovery or campaign tracking → `/sales-influencer-marketing`
- Media relations or journalist outreach → `/sales-media-relations`
- SEO keyword research → `/sales-seo`
- AI visibility in LLM answers → `/sales-ai-visibility`

Otherwise, answer directly from the platform reference below.

## Step 3 — YouScan platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API endpoints, webhook setup, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Query tuning** — review keywords, add exclusions, check source filters
2. **Visual Insights** — verify logo image quality, check supported image sources
3. **API/webhooks** — confirm plan access, test endpoints, validate payload handling
4. **Alerts** — configure rules for volume spikes, negative sentiment, crisis keywords
5. **Copilot** — frame questions clearly, use specific date ranges and topics

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **API requires Unlimited plan.** The Starter 3 plan ($499/mo) has no API access. If you need programmatic data access, you must upgrade to custom-priced Unlimited. Webhooks are available on all plans as a workaround for pushing mention data to other tools.
- **Visual Insights is Unlimited-only.** Logo detection, scene recognition, and image demographics are not included in Starter. You get text-based social listening only on Starter 3.
- **Insights Copilot has a 10-question/mo limit on Starter.** Unlimited plans get unlimited questions. Phrase questions carefully to avoid wasting quota.
- **Reddit and Twitter/X data are restricted.** Reddit API returns only mention URLs and YouScan metrics — no text, titles, or author info. Twitter/X removes mention text, URLs, and author details. You get Post ID and Profile ID only.
- **Quora data is not available via API at all.** Even on Unlimited plans.
- **No Zapier, Make, or MCP integration.** The only automation paths are REST API (Unlimited) and webhooks (all plans). For Starter plan users, webhooks are the sole integration option.
- **No mobile app.** YouScan is desktop/web only. No on-the-go monitoring.
- **Starter plan has a hard 15K mention/mo cap.** No overage — mentions stop being collected once the limit is hit.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy across tools — platform comparison, monitoring setup, Boolean queries, competitive intelligence
- `/sales-talkwalker` — Talkwalker platform help — enterprise social listening with image/logo recognition (YouScan's closest competitor for visual analytics)
- `/sales-brand24` — Brand24 platform help — affordable alternative starting at $79/mo
- `/sales-brandwatch` — Brandwatch platform help — enterprise consumer intelligence
- `/sales-meltwater` — Meltwater platform help — enterprise media monitoring
- `/sales-awario` — Awario platform help — budget social listening with Boolean search
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Visual Insights not finding logos
**User says**: "I uploaded my logo to YouScan but it's barely finding any visual mentions — way fewer than I expected"
**Skill does**:
1. Reads platform-guide.md for Visual Insights requirements
2. Checks if user is on Unlimited plan (Visual Insights is Unlimited-only)
3. Advises on logo image quality requirements (high-contrast, multiple variations)
4. Suggests checking supported image sources (some platforms restrict image access)
**Result**: Clear diagnosis of why logo detection coverage may be low

### Example 2: Send mentions to Slack via webhook
**User says**: "How do I get YouScan to send new negative mentions to my Slack channel automatically?"
**Skill does**:
1. Reads platform-guide.md for webhook setup and payload format
2. Walks through topic Settings → Integrations → Add Webhook
3. Provides Slack incoming webhook URL setup
4. Shows how to use Rules to filter for negative sentiment before sending
5. Notes Reddit/Twitter data restrictions in webhook payload
**Result**: Working webhook pipeline from YouScan to Slack with sentiment filtering

### Example 3: Comparing YouScan pricing vs alternatives
**User says**: "Is YouScan worth $499/mo when Brand24 is $79? What am I getting for the extra cost?"
**Skill does**:
1. Routes to `/sales-social-listening` for cross-platform comparison
2. Notes: "This is a tool selection question — run: `/sales-social-listening compare YouScan vs Brand24 for visual analytics use case`"
**Result**: User routed to the strategy skill for unbiased comparison

## Troubleshooting

### Too many irrelevant mentions
**Symptom**: Monitoring topics return thousands of mentions that aren't about your brand
**Cause**: Queries are too broad, missing exclusions, or brand name is a common word
**Solution**: Add NOT exclusions for common false positives. Use exact phrases in quotes. Review the first 50 mentions to identify recurring noise patterns. If your brand name is generic, combine with product terms or industry context. Narrow source filters if specific channels are noisy.

### Insights Copilot gives vague answers
**Symptom**: Copilot responses are generic summaries instead of specific insights
**Cause**: Questions are too broad, or topic data is too sparse for meaningful analysis
**Solution**: Be specific — include date ranges, sentiment direction, and comparison targets. Instead of "What are people saying about us?" try "What negative sentiment themes appeared about [brand] in the last 7 days compared to the previous week?" Ensure the topic has enough mention volume for statistical significance.

### Webhook not delivering mentions
**Symptom**: Configured a webhook URL but no POST requests are arriving
**Cause**: Webhook URL is incorrect, receiving server rejects the payload, or no Rules are configured to trigger the webhook
**Solution**: Verify the callback URL is publicly accessible (not localhost). Check that Basic Auth credentials in the URL are correct if used. Ensure you've created a Rule in the topic to trigger the webhook — webhooks don't fire automatically on all mentions without a Rule. Test with a simple endpoint like webhook.site first.
