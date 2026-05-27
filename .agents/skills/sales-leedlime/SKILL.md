---
name: sales-leedlime
description: "Leedlime platform help — AI-powered Reddit lead generation with intent scoring, lead management dashboard, AI reply suggestions, credit-based pricing (pay per lead, not subscription), Slack/Discord alerts, Chrome extension. Use when Leedlime credits are running out too fast and you need to optimize keyword targeting, AI-generated replies sound generic or aren't matching your brand voice, you want to track lead status from discovery through conversion, Slack/Discord alerts are too noisy or missing high-intent conversations, you can't figure out how to export leads to your CRM since there's no direct integration, competitor alerts aren't surfacing the right mentions, or you're comparing Leedlime vs Leadlee vs Bazzly vs Subreddit Signals for Reddit lead gen on a budget. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit marketing with managed accounts (use /sales-replyagent or /sales-leadmore)."
argument-hint: "[describe what you need help with in Leedlime — e.g., 'credits running out too fast' or 'AI replies sound generic']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit-lead-gen, platform]
---

# Leedlime Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Keyword/targeting setup — getting relevant leads
   - B) AI reply quality — drafts sound generic
   - C) Credit optimization — running out too fast
   - D) Lead management — tracking and exporting
   - E) Alert configuration — Slack/Discord noise
   - F) Competitor monitoring setup
   - G) Something else — describe it

2. **Current setup?**
   - A) Just signed up / haven't configured yet
   - B) Running but getting too much noise
   - C) Running but credits burning too fast
   - D) Need to integrate with other tools

**If the user's request already provides enough context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit marketing with managed/high-karma accounts → `/sales-leadmore [question]`
- Reddit lead gen with auto-reply features → `/sales-leadlee [question]`
- Reddit monitoring with API/webhook access → `/sales-redship [question]` or `/sales-syften [question]`
- AI search visibility on Reddit → `/sales-reddgrow [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Leedlime platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, credit math, lead management workflow, integration workarounds.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

1. **Credit optimization** — tighten keywords, use competitor URLs to improve AI targeting, focus on high-intent signals
2. **Reply quality** — customize brand voice settings, edit AI drafts before posting, match subreddit tone
3. **Lead workflow** — use status tracking (contacted → interested → converted), export CSV regularly for CRM import
4. **Alert tuning** — adjust keyword specificity to reduce noise in Slack/Discord

If you discover a tip not in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No API or direct CRM integration.** Despite schema mentions of HubSpot/Salesforce/Zapier/Clay, the only data export is manual CSV. Plan for manual lead import to your CRM.
- **Credit-based, not subscription.** 1 credit = 1 lead surfaced. Credits are one-time purchases that don't expire (verify current policy). Budget based on expected lead volume.
- **AI replies need editing.** Never post AI-generated replies verbatim — Reddit communities detect and downvote obvious AI/marketing content. Use drafts as starting points.
- **Reddit-only coverage.** No X, LinkedIn, HN, or other platforms. If you need multi-platform monitoring, pair with another tool or use a broader solution.
- **Competitor URL setup is key.** Connecting competitor URLs (up to 3) significantly improves AI's understanding of your positioning and relevance scoring.
- **No webhook or automation surface.** You cannot trigger workflows when leads are found — must check dashboard or wait for Slack/Discord notifications.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence
- `/sales-leadlee` — Cheapest Reddit lead gen with AI replies ($12/mo), quality scoring, Chrome extension
- `/sales-bazzly` — AI Reddit lead gen with intent scoring, Chrome extension, Reply Boost
- `/sales-subredditsignals` — Reddit lead gen with 7-dimension buyer intent classification
- `/sales-soclistener` — Reddit lead gen with AI context matching, DM drafting
- `/sales-redship` — AI-scored Reddit monitoring with REST API + webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Credits burning too fast
**User says**: "I bought the Growth pack but burned through 200 credits in a week — most leads aren't relevant"
**Skill does**:
1. Reads platform-guide.md for credit optimization strategies
2. Diagnoses: keywords likely too broad, competitor URLs may not be set
3. Recommends tightening keyword specificity, adding all 3 competitor URLs, using intent score threshold to mentally filter
**Result**: Reduced noise, credits last longer by focusing on high-intent only

### Example 2: Exporting leads to HubSpot
**User says**: "How do I get my Leedlime leads into HubSpot automatically?"
**Skill does**:
1. Reads platform-guide.md integration section
2. Explains no direct API/webhook exists — CSV export is the only path
3. Suggests workflow: export CSV weekly → import to HubSpot via native CSV import or use a file-watching Zapier trigger on Google Drive
**Result**: Manual but workable CRM sync workflow

### Example 3: AI replies getting downvoted
**User says**: "My replies based on Leedlime suggestions keep getting removed by mods"
**Skill does**:
1. Reads platform-guide.md reply quality section
2. Explains Reddit community norms — never post AI verbatim, add personal experience, match subreddit culture
3. Recommends using AI draft as structure only, rewriting in your voice, building karma in subreddits before promoting
**Result**: Improved reply survival rate with community-appropriate engagement

## Troubleshooting

### Credits disappearing on irrelevant leads
**Symptom**: Most surfaced leads have nothing to do with your product
**Cause**: Website URL not descriptive enough for AI to map your value proposition, or keywords too generic
**Solution**: Ensure your connected URL has clear product descriptions. Add all 3 competitor URLs to help AI understand your niche. Use more specific long-tail keywords instead of broad category terms.

### Slack/Discord alerts overwhelming
**Symptom**: Getting dozens of notifications daily, most not actionable
**Cause**: Keyword set is too broad, picking up tangential conversations
**Solution**: Narrow keywords to product-specific terms. Add competitor brand names for targeted alerts. Review and remove keywords that consistently surface irrelevant threads.

### Lead status not persisting
**Symptom**: Marked a lead as "contacted" but it reverts or can't find it later
**Cause**: Browser cache or session issues with the dashboard
**Solution**: Hard refresh the dashboard. Ensure you're logged into the correct workspace (if using multiple). Try the Chrome extension for more reliable status tracking.
