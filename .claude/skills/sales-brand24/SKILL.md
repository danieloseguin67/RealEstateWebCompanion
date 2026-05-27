---
name: sales-brand24
description: "Brand24 platform help — AI social listening, brand monitoring, sentiment analysis, share of voice, Storm Alerts, MCP server for AI assistants. Use when Brand24 mentions are full of irrelevant noise, keyword queries need tuning for common words, sentiment analysis results seem wrong, Storm Alerts aren't catching volume spikes, you want to connect Brand24 to Claude or ChatGPT via MCP, Share of Voice dashboard isn't reflecting real competitive position, or you need to pull Brand24 data into another tool via API or Zapier. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe your Brand24 question — e.g., 'how do I reduce false positives in my monitoring' or 'set up MCP with Claude']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, platform]
github: "https://github.com/Brand24-ai"
---

# Brand24 Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring projects (keywords, sources, filters)
   - B) Reducing noise / improving mention quality
   - C) Sentiment analysis or Brand Assistant AI features
   - D) Storm Alerts or crisis detection configuration
   - E) Share of Voice / competitive benchmarking
   - F) Integrations (Slack, Teams, Zapier, API, MCP)
   - G) Reporting and analytics
   - H) Something else — describe it

2. **Which Brand24 plan are you on?**
   - A) Individual ($199/mo — 3 keywords, 2K mentions/mo)
   - B) Team ($299/mo — 7 keywords, 10K mentions/mo)
   - C) Pro ($399/mo — 12 keywords, 40K mentions/mo, real-time)
   - D) Business ($599/mo — 25 keywords, 100K mentions/mo)
   - E) Enterprise (custom)
   - F) Trial / not sure

**If the user's request already provides most of this context, skip directly to the relevant step.**

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Social listening tool comparison or strategy → `/sales-social-listening [question]`
- Competitive intelligence methodology → `/sales-compete [question]`
- Crisis communication strategy → `/sales-media-relations [question]`
- AI visibility in LLMs → `/sales-ai-visibility [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Brand24 platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing tiers, plan-gated features, MCP setup, API surface, integration recipes, and data model.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Monitoring setup** — design keyword strategy, configure sources, reduce noise
2. **Sentiment tuning** — review AI accuracy, create custom rules
3. **Competitive tracking** — set up SOV dashboards, configure comparison projects
4. **Integrations** — connect Slack/Teams/Zapier, set up MCP for AI assistants
5. **Reporting** — design dashboards for stakeholders, automate exports

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Individual plan is severely limited.** Only 3 keywords, 2K mentions/mo, 12-hour update delay, and 1 user. Most real monitoring needs at least Team ($299/mo) for hourly updates and 10K mentions.
- **AI features are plan-gated.** AI Insights and AI Topics are limited to 2 projects on Pro, 5 on Business. Smart Context Search is a paid add-on even on Pro. Individual and Team get basic AI Sentiment only.
- **Historical data is limited.** Lower plans have restricted historical data access (typically 12 months). If you need deep historical analysis, confirm your plan covers the timeframe.
- **Keyword tuning is tricky for common words.** If your brand name is a common English word, you'll get massive noise. Use exact-match phrases, add NOT exclusions aggressively, and consider project-level source filters.
- **API docs are not publicly available.** The REST API exists but documentation requires contacting Brand24 or having an active subscription. The MCP server is the easiest programmatic access path for AI assistant integrations.
- **AI summary quality varies.** Users report AI summaries can be overly statistical with less substantive analysis. Review AI-generated insights manually for stakeholder reports.
- **No Boolean NEAR/n operator.** Unlike Meltwater or Brandwatch, Brand24 uses basic keyword matching — no proximity search. Work around this with more specific exact-match phrases.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Before recommending a specific platform skill

This skill covers a strategy domain across many platforms. **Before pointing the user to any specific platform skill** (any `/sales-{platform}` listed in `## Related skills`, e.g., `/sales-mailshake`, `/sales-klaviyo`, `/sales-apollo`), read that platform skill's actual `SKILL.md` first. The 1-line description in `## Related skills` is enough to *identify* a candidate — it's not enough to *commit* to it or to write a prompt that invokes it well.

**How to read it:**
- If `~/.claude/skills/{skill-name}/SKILL.md` exists locally, `Read` it.
- For `sales-*` skills, `WebFetch` directly from this repo: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/{skill-name}/SKILL.md` — e.g., for `sales-mailshake`: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/sales-mailshake/SKILL.md`.
- For non-`sales-*` skills (third-party), look up `{org}/{repo}` in `~/.claude/skills/sales-do/references/skill-sources.md` if installed and fetch the same `skills/{skill-name}/SKILL.md` path under that repo.

**After reading,** ground your recommendation in something concrete from the SKILL.md (its scope, a sub-flow, its `argument-hint` shape, or a "Do NOT use for..." negative trigger). Align any generated invocation with the platform skill's `argument-hint`. If the platform skill turns out not to fit the user's situation, swap to another or handle the question here directly rather than recommending a poor fit.

## Related skills

- `/sales-social-listening` — Social listening strategy across tools — monitoring, Boolean queries, sentiment, competitive intel, crisis detection
- `/sales-brandwatch` — Brandwatch platform help — Consumer Intelligence, Social Media Management, Influence, API
- `/sales-meltwater` — Meltwater platform help — monitoring, media relations, API, integrations
- `/sales-ai-visibility` — AI visibility monitoring — track brand mentions in ChatGPT, Claude, Perplexity, Gemini
- `/sales-media-relations` — Media relations strategy — journalist databases, PR pitching, coverage tracking
- `/sales-social-media-management` — Social media management strategy — publishing, scheduling, analytics
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Reduce monitoring noise
**User says**: "My Brand24 project for 'Notion' returns thousands of irrelevant mentions about the English word 'notion'. How do I fix this?"
**Skill does**:
1. Reviews current keyword setup and identifies the common-word problem
2. Recommends switching to exact-match phrases: "Notion app", "Notion.so", "@NotionHQ"
3. Adds NOT exclusions for common false positives: NOT "general notion" NOT "preconceived notion"
4. Suggests source filters to exclude low-relevance domains
**Result**: Mention quality improves dramatically, relevant mention count drops from 10K noise to 200 real mentions

### Example 2: Connect Brand24 to Claude via MCP
**User says**: "I want my Claude assistant to access my Brand24 monitoring data. How do I set this up?"
**Skill does**:
1. Reads platform guide for MCP setup instructions
2. Walks through connecting MCP server URL with OAuth authentication
3. Shows example queries Claude can answer with Brand24 data
4. Notes that MCP requires an active Brand24 subscription
**Result**: Claude can now answer "what are people saying about my brand this week?" using real-time Brand24 data

### Example 3: Set up competitive share of voice
**User says**: "I need to compare our brand mentions against two competitors. What's the best way to set this up in Brand24?"
**Skill does**:
1. Creates separate monitoring projects for each brand (user's + 2 competitors)
2. Configures matching keyword strategies across all three
3. Sets up the Comparison tab for Share of Voice tracking
4. Designs a weekly competitive report template
**Result**: Automated competitive intelligence dashboard showing SOV trends

## Troubleshooting

### Mentions seem inaccurate or irrelevant
**Symptom**: Project returns mentions that have nothing to do with your brand
**Cause**: Keywords too broad, missing NOT exclusions, or brand name is a common word
**Solution**: Review top 50 mentions. Identify recurring false positive patterns. Add NOT exclusions for each pattern. Use exact-match phrases in quotes. Apply source filters to exclude spam domains. If your brand name is a common word, always pair it with a qualifier ("Notion app" not just "Notion").

### Storm Alerts not triggering during spikes
**Symptom**: A viral mention or PR crisis happened but Storm Alert didn't fire
**Cause**: Alert thresholds may be too high, or mention volume didn't cross the anomaly detection threshold relative to your baseline
**Solution**: Check that Storm Alerts are enabled in project settings. Review the baseline mention volume — if your brand gets very few mentions, even a small spike should trigger. Contact Brand24 support if alerts seem miscalibrated. Set up supplementary email/Slack alerts with lower thresholds as backup.

### Sentiment analysis seems wrong
**Symptom**: Positive mentions marked negative, or neutral mentions marked positive
**Cause**: AI sentiment has ~80% accuracy ceiling. Sarcasm, industry jargon, and non-English content degrade accuracy further.
**Solution**: Manually correct high-impact mentions (this trains the system on some tools, but Brand24's correction impact is limited). Focus on sentiment trends over time rather than individual mention accuracy. For stakeholder reports, manually review the top 10 mentions before including sentiment stats.
