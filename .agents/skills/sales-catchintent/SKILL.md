---
name: sales-catchintent
description: "CatchIntent platform help — AI-powered social listening with buyer intent detection across Reddit, X, Hacker News, Bluesky, LinkedIn, relevance scoring (0-100), CRM integrations (HubSpot, Pipedrive, Close), MCP server for Claude/Cursor, webhooks, lead enrichment with verified emails. Use when CatchIntent listeners are returning too many irrelevant mentions and you need to tune relevance thresholds, signal quota is running out before the month ends, webhook notifications aren't firing to your endpoint, CRM integration isn't pushing leads to HubSpot or Pipedrive, MCP server connection isn't working with Claude or Cursor, AI response suggestions sound generic, you want to set up multi-platform monitoring across Reddit and Hacker News, or you're comparing CatchIntent vs Octolens vs Syften vs Brand24 for intent-based social listening. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in CatchIntent]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, intent-signals, lead-generation, platform]
github: "https://github.com/CatchIntent"
---

# CatchIntent Platform Help

Helps the user with CatchIntent platform questions — from listener setup and intent tuning through CRM integrations, MCP server, webhooks, and lead enrichment.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of CatchIntent do you need help with?**
   - A) Listeners — creating, tuning keywords, relevance thresholds
   - B) Signals — understanding scores, filtering, managing quota
   - C) AI response suggestions — improving quality, customizing tone
   - D) CRM integrations — HubSpot, Pipedrive, Close, Lemlist, Apollo, Instantly
   - E) Webhooks — setting up, payload issues, debugging
   - F) MCP server — connecting to Claude, Cursor, or ChatGPT
   - G) LinkedIn Intelligence — Agentic Search, buyer identification
   - H) Alerts — Slack, Discord, Telegram, email notification setup
   - I) Team & billing — plan features, quota management, team members
   - J) Something else — describe it

2. **What's your goal?** (describe your specific question or problem)

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Buyer intent signals and prioritization → `/sales-intent [question]`
- Contact enrichment → `/sales-enrich [question]`
- CRM selection → `/sales-crm-selection [question]`
- HubSpot-specific config → `/sales-hubspot [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — CatchIntent platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, MCP setup.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Listener tuning** — start threshold at 70-75%, lower if too few signals, raise if too noisy
2. **Quota management** — prioritize high-intent keywords, remove broad terms eating quota
3. **CRM sync** — verify plan supports CRM integrations (Pro+ only), check field mapping
4. **MCP setup** — use OAuth flow, no API key needed
5. **Alert routing** — match channels to urgency (Slack for immediate, email for digests)

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **CRM integrations are Pro+ only.** Basic plan ($49/mo) gets monitoring and alerts but no CRM push. Upgrade to Pro ($69/mo) for HubSpot, Pipedrive, Close integrations.
- **Webhooks are Pro+ only.** Basic plan supports email and Slack alerts but not webhooks.
- **Signal quota is hard-capped.** 150 signals/mo on Basic, 500 on Pro. No rollover. Broad keywords can eat quota fast — tune relevance thresholds aggressively.
- **No traditional REST API.** CatchIntent exposes an MCP server (OAuth-based) rather than a REST API. Use the MCP server for programmatic access from Claude, Cursor, or ChatGPT.
- **LinkedIn Intelligence is a separate product.** Starts at $69/mo on top of social listening. Not included in Basic or Pro social listening plans.
- **AI response suggestions are Pro+ only.** Basic plan surfaces signals but doesn't draft replies.
- **7-day trial requires card on file.** Cancel before day 7 to avoid charges. 14-day refund policy after that.

## Related skills

- `/sales-social-listening` — Social listening strategy — monitoring setup, Boolean queries, sentiment analysis, competitive intelligence, crisis detection, tool comparison
- `/sales-octolens` — Octolens — developer-first social listening with MCP server, REST API, webhooks across Reddit, GitHub, HN, X, LinkedIn, Bluesky
- `/sales-syften` — Syften — AI-filtered keyword monitoring across Reddit, HN, X, Bluesky, 15+ platforms, sub-minute alerts, REST API, webhooks
- `/sales-brand24` — Brand24 — social listening with MCP server, sentiment analysis, Share of Voice
- `/sales-reddinbox` — Reddinbox — AI audience intelligence with intent scoring across Reddit, X, Bluesky, HN
- `/sales-intent` — Buyer intent signals and prioritization from monitoring data
- `/sales-enrich` — Contact enrichment strategy across tools
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up multi-platform monitoring
**User says**: "I want to monitor Reddit and Hacker News for people looking for a project management tool like mine"
**Skill does**:
1. Creates a listener with keywords matching project management pain language
2. Sets relevance threshold to 70% for broad initial coverage
3. Configures Slack alerts for immediate notification
4. Recommends reviewing first 20 signals and adjusting threshold based on noise level
**Result**: Listener running with tuned intent detection across both platforms

### Example 2: Connect CatchIntent to HubSpot CRM
**User says**: "How do I push CatchIntent leads into my HubSpot pipeline automatically?"
**Skill does**:
1. Confirms user is on Pro plan (CRM integrations require Pro+)
2. Walks through HubSpot native integration setup
3. Maps CatchIntent signal fields to HubSpot contact/deal properties
4. Sets up webhook as backup for custom field mapping
**Result**: Qualified signals automatically create contacts in HubSpot with intent context

### Example 3: MCP server integration
**User says**: "I want to use CatchIntent from Claude Code to check my latest signals"
**Skill does**:
1. Points to the CatchIntent MCP server (OAuth-based, no API key needed)
2. Walks through connecting the MCP server in Claude settings
3. Shows example natural language queries: "Show me today's high-intent signals" or "Find Reddit threads about CRM alternatives"
**Result**: CatchIntent data accessible directly from Claude via MCP

## Troubleshooting

### Listeners returning too much noise
**Symptom**: Most signals are irrelevant — casual mentions, jokes, or unrelated discussions
**Cause**: Relevance threshold set too low or keywords too broad
**Solution**: Raise the relevance threshold from default to 80-85%. Remove generic keywords and use more specific phrases that match buyer language ("looking for", "need a tool", "alternative to"). Review the top 20 signals to identify patterns in false positives.

### Signal quota exhausted mid-month
**Symptom**: "Signal limit reached" before your billing cycle resets
**Cause**: Broad keywords generating too many low-value signals
**Solution**: Audit your listeners — remove keywords that generate high volume but low relevance. Increase the relevance threshold to only capture high-intent signals. Consider upgrading from Basic (150) to Pro (500) if you genuinely need more coverage.

### CRM integration not syncing leads
**Symptom**: Signals appear in CatchIntent dashboard but don't show up in HubSpot/Pipedrive
**Cause**: Plan doesn't support CRM integrations, or integration not properly authorized
**Solution**: Verify you're on Pro plan or higher (Basic doesn't include CRM integrations). Re-authorize the CRM connection in Settings > Integrations. Check that the target pipeline/list exists in your CRM. Test with a single manual push before enabling auto-sync.
