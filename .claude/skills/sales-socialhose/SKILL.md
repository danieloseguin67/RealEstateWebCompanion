---
name: sales-socialhose
description: "Socialhose platform help — social listening and media monitoring with real-time and high-frequency monitoring modes, crisis detection, competitor analysis, webhook integrations (Pro+), no annual contracts. Use when Socialhose mentions are full of irrelevant noise and you need to tighten keyword queries, mention quota is filling up before the month ends, smart alerts aren't catching the spikes you care about, webhook integrations aren't delivering payloads to your endpoint, high-frequency monitoring seems delayed or inconsistent, you want to upgrade from Starter to Pro or Agency and need to understand feature differences, or crisis mode isn't activating when it should. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Socialhose]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, platform]
github: "https://github.com/SOCIALHOSE"
---

# Socialhose Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (keywords, sources, alerts)
   - B) Webhook integrations (connecting to CRM, Slack, etc.)
   - C) Understanding pricing / plan differences
   - D) High-frequency or crisis mode monitoring
   - E) Reducing noise / tuning keyword queries
   - F) Analytics dashboard and reporting
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($149/mo — 5K mentions, 50 keywords, 1 seat)
   - B) Pro ($399/mo — 25K mentions, 100 keywords, webhooks)
   - C) Agency ($999/mo — 100K mentions, unlimited keywords, crisis mode)
   - D) Not sure / evaluating

**If the user's request already provides most of this context, skip directly to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Influencer discovery strategy → `/sales-influencer-marketing [question]`
- CRM integration architecture → `/sales-integration [question]`
- Media relations / PR outreach → `/sales-media-relations [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Socialhose platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, webhook setup, integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific situation:

1. **Monitoring setup** — design keyword strategy, configure sources, set alert thresholds
2. **Webhook integration** — set up endpoints, verify payloads, handle retries
3. **Plan optimization** — maximize mention budget, choose right monitoring speed
4. **Crisis readiness** — configure crisis mode triggers and escalation (Agency only)
5. **Noise reduction** — refine queries, use exclusion keywords, adjust source filters

If you discover a gotcha or tip not in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No public REST API.** Socialhose does not expose a documented REST API for the hosted service. Webhooks (Pro+) are the only programmatic integration path. If you need full API access, consider the open-source self-hosted PHP version on GitHub (BSD-3-Clause).
- **Webhook limits are strict.** Pro gets 3 webhook integrations, Agency gets 5. You cannot split data across more endpoints without upgrading or consolidating.
- **Mention overages are expensive.** $29 per 1,000 mentions adds up fast. Monitor usage weekly and set internal alerts at 80% consumption.
- **Crisis mode is Agency-only.** There's no way to get real-time escalation monitoring on Starter or Pro. The crisis upgrade add-on costs $950/search/month.
- **High-frequency monitoring requires Pro+.** Starter only gets daily monitoring cadence. If you need faster refresh, budget for Pro ($399/mo) minimum.
- **No Zapier/Make/MCP support.** Webhooks are the only automation surface — no iPaaS connectors available.

## Related skills

- `/sales-social-listening` — Social listening strategy — monitoring setup, tool comparison, sentiment, crisis detection, competitive intel
- `/sales-brand24` — Brand24 platform help — affordable alternative with MCP server and Zapier
- `/sales-awario` — Awario platform help — budget alternative with Boolean search and social selling
- `/sales-mention` — Mention platform help — simple affordable monitoring, REST API
- `/sales-octolens` — Octolens platform help — developer-first monitoring with MCP server and REST API
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Reduce monitoring noise
**User says**: "My Socialhose dashboard is showing thousands of mentions but most are irrelevant spam. How do I clean this up?"
**Skill does**:
1. Reads platform guide for keyword query refinement techniques
2. Suggests adding NOT exclusion keywords for common false positives
3. Recommends narrowing source filters and using language/geography filters
4. Proposes weekly noise audit process
**Result**: Focused monitoring with actionable mentions only

### Example 2: Set up webhook to Slack
**User says**: "I want to get notified in Slack when there's a mention spike. I'm on the Pro plan."
**Skill does**:
1. Confirms Pro plan has 3 webhook integrations available
2. Walks through webhook endpoint setup pointing to Slack incoming webhook URL
3. Configures smart alert threshold for volume spikes
4. Tests webhook delivery with a sample mention
**Result**: Real-time Slack notifications on mention spikes

### Example 3: Evaluate plan upgrade
**User says**: "I'm on Starter and my mentions run out by mid-month. Should I upgrade to Pro?"
**Skill does**:
1. Reads platform guide for plan comparison
2. Calculates current overage cost vs Pro plan price
3. Highlights additional Pro features (high-frequency monitoring, webhooks, analytics dashboard)
4. Recommends Pro if overage costs exceed $250/mo or if webhook integrations are needed
**Result**: Clear upgrade decision with cost comparison

## Troubleshooting

### Mentions running out before month end
**Symptom**: Mention quota depleted by mid-month, missing important brand conversations
**Cause**: Queries are too broad or tracking too many keywords relative to plan limits
**Solution**: Audit top mention-consuming queries. Remove low-value keywords. Add NOT exclusions for spam patterns. If mentions are genuinely needed, calculate whether overage ($29/1K) or upgrading plans is cheaper. Set internal alerts at 60% and 80% consumption.

### Webhooks not delivering payloads
**Symptom**: Webhook endpoint configured but not receiving data from Socialhose
**Cause**: Endpoint URL may be incorrect, server may not be responding with 200 OK, or integration limit reached
**Solution**: Verify endpoint URL is publicly accessible and returns 200. Check that you haven't exceeded your plan's webhook integration limit (Pro: 3, Agency: 5). Test with a simple endpoint like webhook.site first. Ensure HTTPS is configured correctly on your receiving server.

### Smart alerts not triggering on spikes
**Symptom**: Volume increases but smart alert doesn't fire
**Cause**: Alert threshold may be set too high, or alert is misconfigured for wrong keyword group
**Solution**: Review smart alert configuration — verify the threshold matches your expected spike pattern. Check that the alert is connected to the correct live search. On Starter, you only get 1 smart alert — ensure it's on your highest-priority monitoring query. Consider upgrading for more alert slots.
