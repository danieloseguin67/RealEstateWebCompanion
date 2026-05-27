---
name: sales-octolens
description: "Octolens platform help — developer-first social listening across Reddit, GitHub, Hacker News, X, LinkedIn, Bluesky, Stack Overflow, DEV.to, podcasts, newsletters, TikTok, YouTube, and news. AI relevance scoring, sentiment analysis, MCP server for Claude/Cursor, REST API, webhooks. Use when Octolens keyword limits feel too restrictive and you need to optimize keyword strategy, mentions are running out before month end and you need to reduce noise, webhook or API calls aren't delivering mention data to your system, MCP server connection to Claude Code isn't working, you want to build a custom dashboard or alert pipeline from Octolens data, AI relevance tags are miscategorizing mentions, or you need to monitor multiple projects but only have one workspace. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Octolens — e.g., 'my mentions are running out too fast' or 'how do I set up the MCP server']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, developer-tools, platform]
github: "https://github.com/octolens"
---

# Octolens Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (keywords, sources, alerts)
   - B) API or webhook integration
   - C) MCP server setup for Claude/Cursor/Windsurf
   - D) Mention quota management (running out too fast)
   - E) AI relevance scoring or sentiment issues
   - F) Multi-project or team configuration
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial (Pro features, 1K mentions)
   - B) Pro ($119/mo — 15K mentions, 10 keywords)
   - C) Scale ($319/mo — 50K mentions, 15 keywords)
   - D) Enterprise (custom)
   - E) Not sure / evaluating

**If the user's request already provides enough context, skip directly to Step 2.**

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Social listening tool comparison or strategy → `/sales-social-listening [question]`
- Reddit-specific deep monitoring (subreddit analysis, SERP tracking) → `/sales-threadlytics [question]`
- AI visibility monitoring (LLM brand mentions) → `/sales-ai-visibility [question]`
- Buyer intent signals from social mentions → `/sales-intent [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Octolens platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API details, MCP setup, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword optimization** — maximize coverage within limits using variations and Boolean-like strategies
2. **Mention budget** — configure filtered views, use AI scoring to reduce noise
3. **Integration** — API, webhooks, MCP, or Zapier/Make/n8n setup
4. **Team workflow** — filtered views, Slack routing, escalation rules

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **10-15 keyword limit is hard.** Pro gives 10, Scale gives 15. Use compound keywords and variations within a single keyword slot rather than burning one per variation. Extra keywords cost $5-10/mo each.
- **Mentions are consumed on match, not on view.** Even irrelevant matches count against your quota. Tight keyword context and filtered views reduce waste but don't prevent consumption.
- **Hourly vs real-time refresh.** Pro plan refreshes hourly. Scale refreshes in real-time. If you need instant alerts for crisis detection, you need Scale.
- **No LinkedIn engagement intelligence.** Octolens tracks LinkedIn mentions (keyword matches in posts) but doesn't provide engagement analytics, profile changes, or competitor content interaction data.
- **MCP key is different from API key.** Generate MCP keys at Settings > MCP, not Settings > API. Using the wrong key type causes silent auth failures.
- **Links in content trigger false positives.** If your keyword appears inside a URL in a post, it may match even though the post isn't about your brand.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, crisis detection, tool comparison
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring with 500M+ conversations, opportunity scoring, SERP tracking
- `/sales-brand24` — Brand24 platform help — affordable social listening with MCP server, Storm Alerts
- `/sales-awario` — Awario platform help — budget social listening with Boolean search, Awario Leads
- `/sales-ai-visibility` — AI visibility monitoring — track what LLMs say about your brand
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Optimize keyword strategy within limits
**User says**: "I'm on the Pro plan with 10 keywords. I want to track my brand, 3 competitors, and industry terms but that's already 5+ keywords."
**Skill does**:
1. Reads platform guide for keyword optimization patterns
2. Suggests compound keyword strategies (brand + variations in one slot)
3. Recommends using filtered views to segment without extra keywords
4. Notes the $5/mo add-on keyword option if optimization isn't enough
**Result**: Maximized monitoring coverage within the 10-keyword limit

### Example 2: Set up MCP server for Claude Code
**User says**: "How do I connect Octolens to Claude Code so I can query mentions from my terminal?"
**Skill does**:
1. Reads platform guide MCP setup section
2. Provides the `claude mcp add` command with SSE transport
3. Explains team key vs personal key choice
4. Suggests test query to verify connection
**Result**: Working MCP connection with example queries

### Example 3: Build a webhook pipeline to Slack
**User says**: "I want high-relevance mentions pushed to a Slack channel in real-time instead of checking the dashboard"
**Skill does**:
1. Reads platform guide webhook and integration patterns
2. Outlines webhook endpoint setup for mention push
3. Provides code for filtering by AI relevance tag before forwarding to Slack
4. Notes hourly vs real-time refresh plan differences
**Result**: Webhook pipeline filtering high-signal mentions to Slack

## Troubleshooting

### Mentions running out before month end
**Symptom**: 70%+ of mention quota consumed in first week
**Cause**: Keywords too broad, matching common terms in irrelevant contexts
**Solution**: Review top mentions — identify recurring false positives. Add context keywords in Octolens to narrow matches. Use filtered views to focus on high-relevance AI tags only. Consider removing low-value keywords and replacing with more specific ones.

### MCP server not responding in Claude Code
**Symptom**: `@octolens list my keywords` returns no results or connection error
**Cause**: Wrong key type, expired key, or firewall blocking app.octolens.com
**Solution**: Verify you're using an MCP key (Settings > MCP), not an API key. Check key expiration date. Ensure outbound connections to app.octolens.com are allowed. Restart Claude Code completely after adding the MCP config.

### Webhook not delivering mentions
**Symptom**: Configured webhook endpoint but no POST requests arriving
**Cause**: Endpoint not publicly reachable, wrong URL, or plan refresh interval
**Solution**: Test endpoint reachability from outside your network. Verify URL in Octolens webhook settings (must be HTTPS). Note that Pro plan refreshes hourly — mentions won't push until the next refresh cycle. Check Octolens webhook delivery logs if available.
