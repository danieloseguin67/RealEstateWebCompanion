---
name: sales-communitytracker
description: "CommunityTracker platform help — community intelligence for GTM teams finding buyer signals across Reddit, Slack, Discord, LinkedIn, X, GitHub, HN with AI intent scoring, share of voice, unified inbox, team workflows, REST API, webhooks. Use when alerts return too many irrelevant signals, intent scoring misses buying conversations, you want to push signals to CRM via API or webhooks, keyword quota fills up before month end, share of voice tracking needs setup, AI summaries aren't actionable, or you're comparing CommunityTracker vs Buska vs Octolens vs Syften. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in CommunityTracker — e.g., 'too many noisy alerts' or 'how do I push signals to HubSpot via webhook']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, community-monitoring, lead-generation, platform]
---

# CommunityTracker Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, communities, filters)
   - B) Reducing noise / too many irrelevant signals
   - C) Tuning intent scoring to find real buying conversations
   - D) Competitor tracking and share of voice
   - E) Connecting CommunityTracker to CRM/tools via API or webhooks
   - F) Team workflows (assignment, notes, collaboration)
   - G) AI summaries and content generation
   - H) Plan limits and upgrade decision
   - I) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($29/mo — 3 keywords, Reddit + LinkedIn + HN + GitHub, daily alerts)
   - B) Pro ($99/mo — 10 keywords, all platforms, real-time alerts, Slack, API 1K/day)
   - C) Advanced ($199/mo — 20 keywords, full intelligence, API 5K/day)
   - D) Not sure / haven't signed up yet

3. **What's your goal?**
   - A) Lead generation (find people looking for solutions like mine)
   - B) Brand monitoring (track what people say about us)
   - C) Competitor monitoring (track competitor share of voice)
   - D) Market research (understand community trends and pain points)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Intent detection with CRM push and MCP server → `/sales-catchintent [question]`
- Developer-first monitoring with MCP on all plans → `/sales-octolens [question]`
- Widest platform coverage (30+) with ICP matching → `/sales-buska [question]`
- Multi-platform lead gen with auto-pilot mode → `/sales-prems [question]`
- Fast community monitoring with Boolean search → `/sales-syften [question]`
- Audience intelligence (where audiences spend attention) → `/sales-sparktoro [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — CommunityTracker platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, and workflow examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Noise reduction** — start with 3-5 high-intent keywords (problem phrases like "looking for a tool" or competitor names), use intent filtering to suppress generic mentions, review first 50 signals and add exclusion patterns
2. **Quota management** — consolidate overlapping keywords, disable keywords with low signal-to-noise, use broader terms with intent filters instead of many narrow keywords
3. **Competitor tracking** — set up share of voice dashboards tracking brand vs competitor mentions, monitor "vs" and "alternative to" conversations
4. **Integration** — API requires Pro ($99/mo). For cheaper API access, consider Octolens (API on all plans from $119/mo) or RedShip ($19/mo)
5. **Team workflows** — assign signals to team members, add notes for context, use Slack channels per signal type

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and pricing that may change.*

- **API and Slack are Pro-only ($99/mo).** Starter users get daily email alerts only. If you need programmatic access at a lower price, Octolens (from $119/mo) or RedShip ($19/mo) both offer REST APIs.
- **3-keyword limit on Starter is very tight.** Most users need at least brand name + competitor + problem phrase. If you hit the cap, consolidate with broader terms or upgrade to Pro (10 keywords).
- **Slack/Discord monitoring requires the communities to be public or you to be a member.** CommunityTracker cannot monitor private Slack workspaces or Discord servers you haven't joined.
- **Pricing discrepancies between homepage and blog.** The homepage lists 20 keywords / 5 communities on Starter; comparison blogs say 3 keywords. Verify current limits in your dashboard.
- **Intent scoring is AI-based and imperfect.** High-priority signals may include generic discussions. Always review before engaging — don't auto-act on every alert.
- **Daily alerts on Starter means you miss time-sensitive conversations.** If real-time engagement matters, upgrade to Pro for instant alerts.
- **No native Zapier app.** Use webhooks to trigger Zapier/Make/n8n workflows.
- **Share of voice only works with enough mention volume.** If your brand/competitors get <10 mentions/week in communities, the metric won't be statistically meaningful.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-buska` — Buska — AI social listening for lead gen across 30+ platforms with intent scoring, ICP matching, Reply Studio, MCP server
- `/sales-octolens` — Octolens — developer-first social listening with API/MCP on all plans from $119/mo
- `/sales-catchintent` — CatchIntent — AI intent detection across Reddit, X, HN, Bluesky with CRM push, MCP server, webhooks
- `/sales-syften` — Syften — fast community monitoring across 15+ platforms with Boolean search, AI filtering, API, webhooks
- `/sales-prems` — Prems AI — multi-platform lead generation with AI intent scoring, auto-pilot, webhooks
- `/sales-sparktoro` — SparkToro — audience intelligence, channel discovery, persona development
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up community monitoring for a dev tool
**User says**: "I sell a CI/CD tool and want to find people on Reddit and HN asking for recommendations"
**Skill does**:
1. Reads platform guide for keyword strategy and community selection
2. Creates keywords: "CI/CD tool", "looking for CI pipeline", competitor names
3. Selects communities: Reddit (r/devops, r/programming), HN, GitHub, Stack Overflow
4. Configures intent filter to prioritize buyer signals over general discussions
5. Sets up Slack notifications for high-priority signals
**Result**: Signal pipeline generating qualified conversations from developer communities

### Example 2: Push CommunityTracker signals to HubSpot via webhook
**User says**: "How do I automatically create HubSpot contacts from CommunityTracker signals?"
**Skill does**:
1. Confirms Pro plan required for webhooks
2. Reads platform guide for webhook payload format
3. Sets up webhook URL pointing to a Make/n8n workflow
4. Maps signal fields (platform, title, body, intent_score, url) to HubSpot contact properties
5. Adds a filter: only push high-priority intent signals
**Result**: Automated pipeline from community signals to CRM

### Example 3: Competitor share of voice is flat
**User says**: "I set up competitor tracking but the share of voice dashboard isn't showing useful data"
**Skill does**:
1. Checks keyword coverage — are competitor names + variations all tracked?
2. Verifies community selection covers where competitors are discussed
3. Suggests adding "vs" and "alternative to" keywords for comparison threads
4. Recommends weekly review cadence and manual spot-checks
5. Notes that share of voice needs sufficient mention volume to be meaningful
**Result**: Improved competitor intelligence with actionable share of voice data

## Troubleshooting

### Signals are mostly noise
**Symptom**: Dashboard full of irrelevant mentions that aren't buying signals
**Cause**: Keywords too broad, intent filters not applied, or monitoring too many low-signal communities
**Solution**: Review the top 50 signals. Identify recurring false-positive patterns (common words used in unrelated contexts, spam). Tighten keywords to problem-language phrases ("looking for a tool that..." instead of just product categories). Enable intent filtering to suppress generic mentions. Remove low-signal communities temporarily to see if quality improves.

### Not getting enough signals
**Symptom**: Set up keywords but signal count is much lower than expected
**Cause**: Keywords too narrow, monitoring only a subset of available platforms, or Starter plan limits community coverage
**Solution**: Broaden keywords — use problem language ("how do I automate X") not just tool names. Check which platforms are active on your plan tier (Starter is Reddit + LinkedIn + HN + GitHub only). Add competitor names and "alternative to" phrases. If on Starter, upgrade to Pro for all community platforms.

### API rate limit exhausted
**Symptom**: API calls returning 429 errors before you've processed all signals
**Cause**: Pro plan limits to 1,000 calls/day, and polling-based integrations burn through limits quickly
**Solution**: Switch from polling to webhooks — let CommunityTracker push signals to your endpoint instead of pulling. If you must poll, use larger page sizes to reduce call count. Cache results locally. If 1K/day isn't enough, upgrade to Advanced (5K/day) or batch-process during off-peak hours.
