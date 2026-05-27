---
name: sales-pluggo
description: "Pluggo platform help — AI-powered multi-platform social listening with Slack-delivered opportunities across Reddit, X, HN, Bluesky, Facebook, LinkedIn, automatic community discovery, AI opportunity scoring, smart reply templates. Use when Pluggo Slack alerts are too noisy and surfacing irrelevant conversations, AI copilot isn't improving recommendation quality after feedback, you need to tune keywords or community targeting for better lead matches, reply templates sound too generic for Reddit or HN communities, you want to understand how Pluggo's AI scoring decides what's a high-intent conversation, or you're comparing Pluggo vs Octolens vs Buska vs Syften for multi-platform social monitoring. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit-only lead generation (use /sales-redreach or /sales-leedlime)."
argument-hint: "[describe what you need help with in Pluggo — e.g., 'Slack alerts are too noisy' or 'reply suggestions not relevant']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, platform]
---

# Pluggo Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Alert noise — too many irrelevant Slack notifications
   - B) Reply quality — suggested responses sound generic
   - C) Community/keyword targeting — not finding the right conversations
   - D) AI copilot feedback loop — not improving over time
   - E) Comparing Pluggo to other social listening tools
   - F) Something else — describe it

2. **Current setup?**
   - A) Just signed up / configuring
   - B) Running but too much noise
   - C) Running but leads aren't relevant
   - D) Evaluating vs other tools

**If the user's request already provides enough context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit-only lead gen with AI replies → `/sales-redreach [question]` or `/sales-leedlime [question]`
- Multi-platform monitoring with API access → `/sales-octolens [question]` or `/sales-buska [question]`
- AI search visibility tracking → `/sales-ai-visibility [question]`
- LinkedIn signal intelligence → `/sales-trigify [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Pluggo platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, Slack integration, community discovery, reply templates.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

1. **Reduce noise** — provide negative feedback on irrelevant Slack alerts to train the AI copilot, tighten keyword specificity
2. **Improve replies** — never post smart reply templates verbatim, personalize with experience, match community tone
3. **Community targeting** — let auto-discovery run first, then prune low-quality communities after reviewing initial results
4. **Feedback loop** — use Slack one-click feedback consistently to improve AI recommendations over time

If you discover a tip not in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **New signups are currently paused.** Pluggo is in maintenance mode. Contact hello@pluggo.ai for custom solutions. If evaluating tools, consider alternatives like Octolens, Buska, or Syften.
- **No API, no webhooks, no MCP server.** Pluggo is Slack + dashboard only. No programmatic access to leads or data.
- **No Zapier/Make integration.** Cannot trigger automations from discovered opportunities. Manual workflow only beyond Slack alerts.
- **Slack is the only delivery channel.** If your team doesn't use Slack, Pluggo has no alternative notification method.
- **AI replies need heavy editing.** Smart reply templates are starting points, not ready-to-post content. Reddit and HN communities will flag promotional replies.
- **Free tier refreshes weekly only.** Real-time monitoring requires a paid plan. Weekly refreshes miss time-sensitive buying conversations.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence
- `/sales-octolens` — Developer-first social listening with API, MCP server, webhooks
- `/sales-buska` — Multi-platform social listening with intent scoring, API, MCP, webhooks
- `/sales-syften` — AI-filtered keyword monitoring across Reddit, HN, X, Bluesky, 15+ platforms
- `/sales-redreach` — AI Reddit lead gen with keyword auto-discovery, Google-ranking posts
- `/sales-leedlime` — Credit-based Reddit lead gen with intent scoring, Slack/Discord alerts
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Slack alerts too noisy
**User says**: "Pluggo sends me 30+ Slack messages a day and most are irrelevant conversations"
**Skill does**:
1. Reads platform-guide.md for feedback loop and keyword tuning
2. Recommends using one-click negative feedback in Slack on every irrelevant alert to train the AI copilot
3. Suggests narrowing keywords from broad terms to specific pain-point phrases
4. Advises reviewing auto-discovered communities and removing low-quality ones
**Result**: Reduced alert volume with higher relevance through AI training and keyword refinement

### Example 2: Integrating Pluggo leads into a CRM
**User says**: "How do I get Pluggo opportunities into HubSpot?"
**Skill does**:
1. Reads platform-guide.md integration section
2. Explains no API, webhooks, or Zapier exist — Slack is the only output
3. Suggests manual workflow: bookmark high-intent Slack alerts, batch-enter into CRM weekly
4. For volume needs, recommends evaluating Buska or Octolens which have API/webhook access
**Result**: Manual workaround established, with API-capable alternatives flagged

### Example 3: Reply templates getting downvoted on Reddit
**User says**: "Every time I use Pluggo's suggested reply on Reddit, it gets downvoted or removed"
**Skill does**:
1. Reads platform-guide.md reply quality section
2. Explains Reddit norms: never post templates verbatim, lead with genuine value
3. Recommends rewriting in first person, adding personal experience, checking subreddit rules
4. Suggests building karma in target subreddits before engaging
**Result**: Improved reply survival through community-appropriate engagement

## Troubleshooting

### Slack alerts contain mostly irrelevant conversations
**Symptom**: High volume of alerts about topics unrelated to your product
**Cause**: Keywords too broad, AI copilot not yet trained, or auto-discovered communities include irrelevant ones
**Solution**: Use one-click negative feedback on every irrelevant alert in Slack — this trains the AI copilot. Review your keyword list and remove generic terms. Check auto-discovered communities and manually remove irrelevant ones. Start with 3-5 specific pain-point keywords rather than category terms.

### AI copilot not improving despite feedback
**Symptom**: Recommendation quality stays flat after weeks of providing feedback
**Cause**: Inconsistent feedback (skipping alerts), or keywords are so broad that even refined AI can't filter well
**Solution**: Provide feedback on every single alert (positive or negative), not just occasional ones. Tighten keywords to be more specific. If quality doesn't improve after 2-3 weeks of consistent feedback, the AI may not have enough signal — try more distinctive keywords.

### Can't sign up — new plans paused
**Symptom**: Pluggo website says new signups are paused
**Cause**: Platform is in maintenance mode
**Solution**: Email hello@pluggo.ai for custom access. If you need a tool now, evaluate alternatives: Octolens ($25/mo, API + MCP), Buska ($19/mo, 30+ platforms, API), or Syften ($9/mo, AI filtering, API).
