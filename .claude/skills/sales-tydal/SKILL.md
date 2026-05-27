---
name: sales-tydal
description: "Tydal platform help — AI-powered Reddit lead generation with auto-posting, AI comment drafts, 50+ viral post templates, intent scoring, subreddit targeting. Use when Tydal isn't finding relevant Reddit threads for your product, auto-replies are getting flagged or removed by moderators, you want to optimize subreddit targeting but are limited to 5 subreddits, the 48-hour scan interval is missing time-sensitive conversations, you're comparing Tydal vs Leadlee vs Reppit vs Leado for Reddit lead gen, or you need help deciding whether auto-posting is safe for your Reddit account. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit marketing with managed accounts (use /sales-replyagent or /sales-leadmore)."
argument-hint: "[describe what you need help with in Tydal — e.g., 'auto-replies keep getting removed' or 'not finding the right subreddits']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, platform]
---

# Tydal Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Lead quality — threads found aren't relevant to my product
   - B) Auto-reply safety — posts getting flagged, removed, or account at risk
   - C) Subreddit targeting — limited to 5, not sure which ones to pick
   - D) Reply quality — AI drafts sound generic or promotional
   - E) Setup — just getting started with Tydal
   - F) Comparing Tydal to other Reddit lead gen tools
   - G) Something else — describe it

2. **Current setup?**
   - A) Just signed up / configuring
   - B) Running but too much noise
   - C) Running but auto-replies underperforming
   - D) Evaluating vs other tools

**If the user's request already provides enough context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit lead gen with managed accounts → `/sales-replyagent [question]` or `/sales-leadmore [question]`
- Reddit monitoring with API/webhooks → `/sales-redship [question]` or `/sales-octolens [question]`
- Reddit thread analysis for market research → `/sales-reddily [question]`
- AI search visibility via Reddit → `/sales-reddgrow [question]`
- Manual-only Reddit lead gen (safer) → `/sales-reppit [question]` or `/sales-leado [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Tydal platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, auto-posting mechanics, subreddit targeting, viral templates.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

1. **Improve lead quality** — use specific pain-point keywords, not broad terms; prioritize subreddits where people ask for solutions, not general discussion subs
2. **Auto-reply safety** — Tydal auto-posts on your behalf, which carries real ban risk; monitor daily for removals and mod warnings; consider switching to manual posting tools if your account is flagged
3. **Subreddit selection** — with only 5 slots, pick high-intent communities; rotate low-performers weekly
4. **Reply quality** — review AI drafts even if auto-posted; adjust brand voice settings to reduce promotional tone
5. **48-hour scan gap** — Tydal scans every 48 hours, so time-sensitive buying conversations may be missed; consider pairing with a real-time monitor like F5Bot or Syften

If you discover a tip not in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Auto-posting carries real ban risk.** Tydal auto-posts replies to Reddit, which violates many subreddits' rules on bot-generated content. Monitor for removals daily. Manual-posting tools (Reppit, Leado) are safer.
- **Only 5 subreddits.** You can only target 5 subreddits at a time. Choose carefully and rotate based on performance.
- **48-hour scan interval.** Scans run every 48 hours, not real-time. Time-sensitive buying conversations will be missed. Not suitable if freshness matters.
- **No API, no webhooks, no MCP server.** Tydal is dashboard-only. No programmatic access to leads or data.
- **No Zapier/Make integration.** Cannot trigger automations from discovered leads. Manual export only.
- **No CRM export.** No bulk-export of discovered leads. Manual copy-paste required.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence
- `/sales-reppit` — Reddit lead gen with AI keyword discovery, intent scoring, manual posting (safer), ~$25-29/mo
- `/sales-leado` — Reddit lead gen with Karma Builder, Viral Template Library, $0-29.99/mo
- `/sales-leadlee` — Cheapest Reddit lead gen with AI replies ($12/mo), quality scoring
- `/sales-subredditsignals` — Reddit lead gen with 7-dimension buyer intent classification, voice training
- `/sales-redreach` — AI Reddit lead gen with keyword auto-discovery, Google-ranking posts, webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Auto-replies getting removed by moderators
**User says**: "My Tydal auto-replies keep getting removed from subreddits. Some posts are even getting me temp-banned."
**Skill does**:
1. Reads platform-guide.md for auto-posting risks and safety
2. Explains that auto-posting triggers mod scrutiny, especially in strict communities
3. Recommends reviewing which subreddits have strict self-promotion rules and removing them from targeting
4. Suggests considering manual-posting alternatives like Reppit or Leado for high-value subreddits
**Result**: Reduced removal rate through better subreddit selection and awareness of auto-posting risks

### Example 2: Getting leads into a CRM
**User says**: "How do I sync Tydal leads to my HubSpot?"
**Skill does**:
1. Reads platform-guide.md integration section
2. Explains no API, webhooks, or Zapier exist — dashboard is the only interface
3. Suggests manual workflow: review leads daily, batch-enter thread URLs into CRM
4. For automation needs, recommends evaluating RedShip or Buska which have API/webhook access
**Result**: Manual workaround established, API-capable alternatives flagged

### Example 3: Only 5 subreddits — which ones to pick
**User says**: "I can only monitor 5 subreddits. How do I choose the best ones for my SaaS product?"
**Skill does**:
1. Reads platform-guide.md subreddit targeting section
2. Recommends starting with the top 5 subreddits by buying-intent density, not subscriber count
3. Suggests testing for 1-2 weeks, then rotating the lowest-performing subreddit
4. Notes that if 5 isn't enough, tools like ForumScout or Buska offer unlimited monitoring
**Result**: Data-driven subreddit rotation strategy within Tydal's 5-slot limit

## Troubleshooting

### Auto-posted replies sound robotic and get downvoted
**Symptom**: Tydal's auto-replies read like sales pitches and accumulate downvotes or removals
**Cause**: AI optimizes for product mention rather than community value; auto-posting removes the human editing step
**Solution**: Review auto-posted replies daily in the dashboard. If quality is consistently poor, consider disabling auto-post and using Tydal for lead discovery only, posting manually. Adjust brand voice settings to be more conversational. For subreddits with strict rules, switch to manual-only tools.

### 48-hour scan missing time-sensitive threads
**Symptom**: By the time Tydal surfaces a buying conversation, the thread is already 2 days old and the poster has moved on
**Cause**: Tydal scans every 48 hours, not in real-time
**Solution**: Pair Tydal with a real-time monitoring tool like F5Bot (free) or Syften ($7/mo) for immediate alerts on high-priority keywords. Use Tydal for batch lead discovery and the real-time tool for time-sensitive conversations.

### Low lead volume despite broad keywords
**Symptom**: Few leads surfaced even with keywords that should match many Reddit conversations
**Cause**: 5-subreddit limit restricts coverage; scan frequency reduces total posts analyzed
**Solution**: Verify your 5 subreddits are active communities with daily posts, not low-traffic niche subs. Ensure keywords match the exact phrases Redditors use, not marketing jargon. If volume is still too low, evaluate tools with unlimited subreddit monitoring like Buska or ForumScout.
