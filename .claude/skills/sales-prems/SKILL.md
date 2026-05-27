---
name: sales-prems
description: "Prems AI platform help — multi-platform social listening and lead generation across 15 platforms (Reddit, X, LinkedIn, HN, Quora, Facebook, Indie Hackers, Dev.to, Stack Overflow, YouTube, Product Hunt, Bluesky, Medium, GitHub, Substack) with AI intent scoring (0-100) and personalized reply drafts. Use when Prems AI intent scores feel inaccurate and you're getting too many false positives, AI reply drafts sound generic and need rewriting before posting, you hit the 100 leads/mo cap and need to optimize keyword selection, you want to push Prems leads to your CRM but there's no API, you need to set up multi-platform monitoring for a product launch, auto-pilot scans aren't surfacing the right conversations, or you're comparing Prems vs CatchIntent vs Syften vs Octolens for multi-platform social listening. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Prems AI]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, lead-generation, intent-signals, platform]
---

# Prems AI Platform Help

Helps the user with Prems AI platform questions — from keyword setup and intent score tuning through multi-platform monitoring, auto-pilot configuration, and webhook integrations.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Prems AI do you need help with?**
   - A) Keywords — setting up, tuning for relevance, reducing noise
   - B) Intent scoring — understanding scores, filtering false positives
   - C) AI Pitcher — improving reply draft quality, customizing tone
   - D) Auto-pilot — configuring scan schedules, notification preferences
   - E) Integrations — Slack, Discord, Notion, webhooks
   - F) Platform coverage — which of the 15 platforms to prioritize
   - G) Lead management — CRM pipeline view, exporting leads
   - H) Billing — plan limits, upgrading from founder pricing
   - I) Something else — describe it

2. **What's your goal?** (describe your specific question or problem)

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit-specific monitoring (depth over breadth) → `/sales-threadlytics [question]` or `/sales-syften [question]`
- Buyer intent signals and prioritization → `/sales-intent [question]`
- Contact enrichment → `/sales-enrich [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Prems AI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration patterns, webhook setup.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Keyword tuning** — start with specific buyer-language phrases ("looking for a tool", "alternative to X"), avoid single generic words
2. **Intent threshold** — focus on leads scoring 70+ for outreach, review 50-69 for nurture
3. **Platform prioritization** — pick 3-5 platforms where your audience is most active, don't spread across all 15
4. **Reply quality** — always edit AI Pitcher drafts before posting; add personal context and avoid templated language
5. **Webhook routing** — use webhooks to push high-intent leads to Slack channels or CRM via middleware (Zapier/Make/n8n)

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **100 leads/mo is a hard cap.** No rollover. Broad keywords can exhaust your monthly quota in the first week. Prioritize high-intent phrases and specific platforms to maximize lead quality.
- **No REST API.** Prems offers webhooks, Slack, Discord, and Notion integrations but no programmatic API. For CRM sync, route webhooks through Zapier/Make/n8n middleware.
- **Founder pricing is temporary.** Current $49/mo price is for the next 100 clients — will increase to $79/mo. Lock in annual ($490/yr) to keep the lower rate.
- **15-platform coverage is breadth, not depth.** Each platform gets lighter coverage than Reddit-only tools. If Reddit is your primary channel, a specialist tool (Syften, KeyMentions, CatchIntent) may surface more leads.
- **Auto-pilot runs on schedule, not real-time.** Scans happen hourly or daily based on your setting — not instant like Syften's sub-minute Reddit monitoring. Time-sensitive threads may be stale by the time you see them.
- **AI Pitcher drafts need editing.** Reply quality varies — expect to rewrite 30-50% of suggestions. The drafts are a starting point, not a final message.
- **Free trial has no card requirement.** Good for testing, but limited to evaluating the interface — serious lead gen requires the paid plan.

## Related skills

- `/sales-social-listening` — Social listening strategy — monitoring setup, tool comparison, sentiment analysis, competitive intelligence, crisis detection
- `/sales-catchintent` — CatchIntent — AI intent detection across Reddit, X, HN, Bluesky with CRM integrations, MCP server, webhooks
- `/sales-syften` — Syften — AI-filtered keyword monitoring across 15+ community platforms, sub-minute alerts, REST API, webhooks
- `/sales-octolens` — Octolens — developer-first social listening with MCP server, REST API, webhooks across Reddit, GitHub, HN, X, LinkedIn
- `/sales-reddinbox` — Reddinbox — AI audience intelligence with intent scoring across Reddit, X, Bluesky, HN
- `/sales-parsestream` — ParseStream — multi-platform monitoring (Reddit, X, LinkedIn, Quora, HN) with AI reply drafts and auto-reply
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up monitoring for a SaaS product launch
**User says**: "I'm launching a project management tool next week and want to find people discussing PM pain points across Reddit, HN, and LinkedIn"
**Skill does**:
1. Configures keywords matching PM pain language ("tired of Jira", "need a simpler PM tool", "alternative to Asana")
2. Sets auto-pilot to hourly scans on Reddit, HN, and LinkedIn
3. Recommends focusing on leads scoring 70+ for immediate outreach
4. Sets up Slack webhook for real-time notification of high-intent leads
**Result**: Multi-platform monitoring running with intent-filtered lead feed

### Example 2: Push Prems leads to HubSpot via webhook
**User says**: "How do I get Prems AI leads into my HubSpot CRM automatically?"
**Skill does**:
1. Notes Prems has no native CRM integration — recommends webhook → Zapier/Make → HubSpot pipeline
2. Walks through setting up the Prems webhook endpoint
3. Configures Zapier to parse the webhook payload and create HubSpot contacts
4. Maps intent score to a custom HubSpot property for lead prioritization
**Result**: High-intent leads auto-create in HubSpot with intent context

### Example 3: Reduce false positives in intent scoring
**User says**: "Half the leads Prems surfaces are people just venting about tools, not actually looking to buy"
**Skill does**:
1. Reviews current keyword list for overly broad terms
2. Recommends adding buyer-intent modifiers ("looking for", "recommend", "switch from")
3. Suggests filtering dashboard to 70+ intent score only
4. Recommends using brand relevance filter to eliminate off-topic matches
**Result**: Lead feed filtered to high-intent conversations with fewer false positives

## Troubleshooting

### Intent scores don't match actual buyer intent
**Symptom**: Posts scoring 80+ are casual discussions, while genuinely interested buyers score below 50
**Cause**: Keywords are too generic, causing the intent model to match on topic rather than buying language
**Solution**: Replace generic product category keywords with specific buyer-language phrases ("looking for", "need a tool that", "alternative to [competitor]"). Review 20 recent leads to calibrate your sense of what Prems scores highly, then adjust keywords to match.

### Monthly lead quota exhausted too early
**Symptom**: "Lead limit reached" message appears in the first 2 weeks
**Cause**: Monitoring too many platforms with broad keywords, generating high-volume but low-value leads
**Solution**: Narrow to 3-5 platforms where your audience is most active. Remove single-word keywords. Add negative keywords if available. Focus on phrases with buying intent, not general discussion terms.

### Webhook notifications not arriving
**Symptom**: Leads appear in the Prems dashboard but webhook endpoint receives nothing
**Cause**: Webhook URL misconfigured, endpoint not publicly accessible, or payload format mismatch
**Solution**: Verify the webhook URL is correct and publicly reachable (not localhost). Test with a simple endpoint like webhook.site first. Check that your middleware (Zapier/Make/n8n) is parsing the incoming payload format correctly. Ensure Prems webhook is enabled in settings and connected to the correct notification trigger.
