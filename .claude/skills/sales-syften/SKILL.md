---
name: sales-syften
description: "Syften platform help — AI-filtered keyword monitoring across Reddit, Hacker News, X, Bluesky, Mastodon, GitHub, YouTube, Stack Exchange, Dev.to, Lobste.rs, Indie Hackers, Slack communities, newsletters, podcasts. Sub-minute Reddit alerts, Boolean search, AI noise filtering, tag-based routing, Slack integration, webhooks (PRO), REST API (Standard+), Zapier (1 trigger). Use when Syften keyword alerts are returning too much noise and you need to tune filters or exclusions, you're not getting alerts fast enough and need to understand monitoring latency, AI filtering is suppressing mentions you actually want to see, you want to push Syften mentions to your CRM or dashboard via API or webhooks, tag routing isn't sending results to the right Slack channel, or you need a GummySearch replacement that covers Reddit plus other developer communities. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Syften — e.g., 'alerts have too much noise' or 'how do I use the API to pull mentions']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit-monitoring, community-monitoring, platform]
github: "https://github.com/syften"
---

# Syften Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (filters, sources, exclusions)
   - B) Reducing noise / tuning AI filtering
   - C) Configuring alerts (Slack, email, RSS, webhooks)
   - D) Using the API to pull mentions programmatically
   - E) Tag routing (different matches to different destinations)
   - F) Understanding pricing / plan limits
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Entry (€19.95/mo — 3 filters, 100/day)
   - B) Standard (€39.95/mo — 20 filters, 200/day, API, Slack, AI filtering)
   - C) PRO (€99.95/mo — 100 filters, 500/day, webhooks, unlimited archive)
   - D) Custom / not sure

3. **What platforms are you monitoring?**
   - A) Reddit primarily
   - B) Multiple platforms (Reddit + HN + X + others)
   - C) Developer communities (GitHub, Stack Exchange, Dev.to)
   - D) All available sources

**If the user's request already provides most of this context, skip directly to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Influencer discovery → `/sales-influencer-marketing`
- SEO keyword research → `/sales-semrush`
- Intent signals from social → `/sales-intent`

Otherwise, answer directly from the platform reference below.

## Step 3 — Syften platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

- **Noise reduction**: Start narrow (3-5 keywords), add NOT exclusions for recurring false positives, use AI filtering (Standard+), use tags to separate signal streams
- **Speed optimization**: Reddit is sub-minute; X is ~15 minutes. If speed matters, prioritize Reddit-heavy monitoring
- **Integration**: API on Standard+, webhooks on PRO only. For Standard users needing push delivery, use Zapier "New Mention" trigger as a workaround
- **Scaling**: If hitting daily result limits, split broad keywords into focused filters with exclusions rather than upgrading

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No LinkedIn monitoring.** Syften does not monitor LinkedIn. If LinkedIn is critical, supplement with another tool.
- **API requires Standard plan (€39.95/mo).** Entry plan has no API access. Webhooks require PRO (€99.95/mo).
- **AI filtering is Standard+ only.** Entry plan gets raw keyword matches without AI noise suppression.
- **Daily result limits are hard caps.** Entry: 100/day, Standard: 200/day, PRO: 500/day. Exceeding means missed mentions until the next day.
- **Filter limits constrain monitoring breadth.** Entry: 3 filters, Standard: 20, PRO: 100. Each keyword variation or platform combo uses a filter slot.
- **No scheduling for daily email digests.** You cannot choose what time daily emails arrive.
- **Thread aggregation is basic.** High-volume keywords may surface duplicate threads from the same conversation.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, Boolean queries, sentiment, competitive intel, crisis detection
- `/sales-octolens` — Octolens — developer-first social listening (Reddit, GitHub, HN, X, LinkedIn, Bluesky, Stack Overflow, DEV.to), MCP server, REST API
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-threadlytics` — Threadlytics — Reddit-specific monitoring with 500M+ indexed conversations, opportunity scoring
- `/sales-brand24` — Brand24 — AI social listening, brand monitoring, sentiment analysis, Storm Alerts, MCP server
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up monitoring for a SaaS product
**User says**: "I just launched a dev tool and want to know when people mention it on Reddit and Hacker News"
**Skill does**:
1. Recommends creating filters for product name + common misspellings
2. Configures Reddit + HN sources
3. Sets up Slack delivery for real-time awareness
4. Suggests adding competitor names and problem keywords as separate tagged filters
**Result**: Monitoring live within 5 minutes, organized by tag

### Example 2: Pull mentions into a custom dashboard via API
**User says**: "How do I use the Syften API to feed mentions into my internal tool?"
**Skill does**:
1. Confirms Standard plan or above (API required)
2. Provides API authentication setup
3. Shows how to poll for new mentions with the REST endpoint
4. Suggests webhook approach if on PRO for push-based delivery
**Result**: Working integration pulling mentions into user's pipeline

### Example 3: Reduce noise from broad keywords
**User says**: "I'm monitoring 'automation' but getting tons of irrelevant results about home automation and industrial automation"
**Skill does**:
1. Reviews current filter setup
2. Adds NOT exclusions: "home automation", "industrial", "factory", "IoT"
3. Enables AI filtering (Standard+) to suppress spam and weak matches
4. Suggests narrowing with site-specific filters or combining with product context keywords
**Result**: Relevant mentions only, noise eliminated

## Troubleshooting

### Alerts have too much noise
**Symptom**: Daily digest or Slack is full of irrelevant mentions
**Cause**: Keywords too broad, missing NOT exclusions, AI filtering not enabled (Entry plan)
**Solution**: Add NOT exclusions for recurring false positive patterns. Use exact phrases in quotes. Enable AI filtering (requires Standard plan). Use `$tag:` operators to separate high-signal from exploratory filters. Review first 20 results and add exclusions for every irrelevant pattern.

### Mentions arriving late or missing
**Symptom**: You find mentions manually that Syften didn't alert on, or alerts come hours later
**Cause**: Platform-specific latency varies; some sources have longer crawl cycles
**Solution**: Reddit targets <1 minute, X ~15 minutes, other sources may be slower. Check if the mention's platform is in Syften's supported list. Use Archive Search to verify the mention was captured (it may have been filtered by AI). If a source is consistently slow, contact support.

### Daily result limit hit before end of day
**Symptom**: Stop receiving alerts partway through the day
**Cause**: High-volume keywords exhausting daily quota (Entry: 100, Standard: 200, PRO: 500)
**Solution**: Split broad filters into focused ones with tighter exclusions. Prioritize high-value sources only. Consider upgrading if legitimate mention volume exceeds quota. Use tags to identify which filters consume the most quota and optimize those first.
