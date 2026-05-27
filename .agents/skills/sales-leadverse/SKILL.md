---
name: sales-leadverse
description: "Leadverse platform help — AI-powered lead discovery across Reddit, X, and LinkedIn with keyword tracking, lead scoring, AI reply suggestions, competitor analysis, and Slack/email alerts. Use when Leadverse lead scoring shows too many irrelevant matches and you need to tune keywords, AI reply suggestions are hard to find or sound generic, the 7-day date range feels too short for historical prospecting, you want to set up multi-platform monitoring but aren't sure which platforms to prioritize, leads aren't converting and you need to improve outreach quality, you're comparing Leadverse vs Prems vs CatchIntent vs ParseStream for multi-platform lead generation, or you want to optimize keyword selection to find higher-intent prospects. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Leadverse]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, lead-generation, platform]
---

# Leadverse Platform Help

Helps the user with Leadverse platform questions — from keyword setup and lead scoring through AI reply optimization, multi-platform monitoring, and alert configuration.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Leadverse do you need help with?**
   - A) Keywords — setting up, tuning for relevance, reducing noise
   - B) Lead scoring — understanding scores, filtering irrelevant matches
   - C) AI replies — finding AI suggestions, improving quality
   - D) Platform coverage — Reddit vs X vs LinkedIn prioritization
   - E) Alerts — Slack or email notification setup
   - F) Competitor analysis — tracking competitors on social
   - G) Billing — plan differences, upgrading from Explorer
   - H) Something else — describe it

2. **What's your goal?** (describe your specific question or problem)

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit-specific monitoring (depth over breadth) → `/sales-threadlytics [question]` or `/sales-syften [question]`
- Buyer intent signals and prioritization → `/sales-intent [question]`
- Contact enrichment → `/sales-enrich [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Leadverse platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, keyword strategy, alert setup, and comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Keyword tuning** — use the AI keyword generator first, then refine with buyer-intent phrases ("looking for", "alternative to", "recommend")
2. **Lead scoring** — focus on high-relevance matches first; Leadverse scores by product-description match, not explicit intent scoring
3. **Platform prioritization** — start with Reddit (Explorer tier), add X and LinkedIn only when Reddit proves your ICP is active there
4. **Reply quality** — AI reply suggestions exist but are not prominently displayed; always edit before posting
5. **Alert routing** — use Slack for real-time lead notifications, email for daily digests

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Explorer ($19/mo) is Reddit-only.** X and LinkedIn require Founder ($29/mo) or Business ($39/mo). If you need multi-platform from day one, start on Founder.
- **No API, no webhooks, no Zapier/Make.** Leadverse is entirely UI-driven with Slack and email alerts only. No way to push leads to a CRM programmatically — manual export or copy-paste.
- **7-day default date range.** The search window defaults to 7 days, which misses older validated threads. Adjust the date range manually for deeper historical prospecting.
- **AI reply suggestions are hidden.** The feature exists but isn't prominently surfaced in the UI. Look for it in the lead detail view after selecting a match.
- **Lead scoring is relevance-based, not intent-based.** Leadverse scores how well a post matches your product description, not whether the poster is actively looking to buy. High scores can include casual discussions, not just purchase-ready leads.
- **No auto-reply or auto-publish.** All engagement is manual — Leadverse finds leads and suggests replies, but you post from your own Reddit/X/LinkedIn account.

## Related skills

- `/sales-social-listening` — Social listening strategy — monitoring setup, tool comparison, sentiment analysis, competitive intelligence, crisis detection
- `/sales-prems` — Prems AI — 15-platform lead generation with AI intent scoring, wider platform coverage
- `/sales-catchintent` — CatchIntent — AI intent detection across Reddit, X, HN, Bluesky with CRM integrations, MCP server, webhooks
- `/sales-parsestream` — ParseStream — multi-platform monitoring (Reddit, X, LinkedIn, Quora, HN) with AI reply drafts and auto-reply
- `/sales-syften` — Syften — AI-filtered keyword monitoring across 15+ community platforms, sub-minute alerts, REST API, webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up monitoring for a new SaaS product
**User says**: "I just launched a project management tool and want to find people on Reddit asking for PM alternatives"
**Skill does**:
1. Recommends starting on Explorer ($19/mo) since Reddit-only is sufficient initially
2. Uses AI keyword generator with the product description to generate initial keyword set
3. Refines keywords with buyer-intent phrases ("alternative to Asana", "looking for PM tool", "recommend project management")
4. Sets up Slack alerts for real-time lead notifications
**Result**: Reddit monitoring running with targeted keywords and Slack alerts

### Example 2: Improve lead relevance
**User says**: "Half the leads Leadverse shows me are people just complaining about tools, not actually looking to switch"
**Skill does**:
1. Reviews current keyword list for overly broad terms
2. Adds buyer-intent modifiers ("looking for", "switch from", "anyone tried")
3. Recommends adjusting date range to focus on recent active discussions
4. Suggests reviewing AI-generated keywords and pruning generic ones
**Result**: Lead feed filtered to higher-relevance conversations

### Example 3: Push Leadverse leads to a CRM
**User says**: "How do I get Leadverse leads into HubSpot automatically?"
**Skill does**:
1. Notes Leadverse has no API, webhooks, or Zapier — no direct CRM integration
2. Recommends workaround: Slack alert → Zapier/Make trigger on Slack message → parse lead details → create HubSpot contact
3. Walks through Slack-to-HubSpot Zapier setup
4. Notes this is lossy — only gets the alert text, not structured lead data
**Result**: Partial automation via Slack middleware, with caveat about data quality

## Troubleshooting

### Leads are mostly irrelevant discussions
**Symptom**: High volume of leads but most are casual conversations, not people looking to buy
**Cause**: Keywords are too generic or product description is too broad
**Solution**: Refine keywords with buyer-intent language ("looking for", "recommend", "alternative to [competitor]"). Remove single-word keywords. Narrow to specific subreddits if possible. Review the AI-generated keyword suggestions and prune the ones that are topically related but not purchase-intent related.

### AI reply suggestions not appearing
**Symptom**: Can see leads but no AI reply drafts
**Cause**: Reply suggestions are not prominently displayed in the UI — they exist but are easy to miss
**Solution**: Click into the individual lead detail view. Look for the AI reply/suggestion option — it may be behind a secondary button or expandable section. If still not visible, ensure your plan supports AI replies (Founder plan includes 300 auto-replies/mo).

### Slack alerts not firing
**Symptom**: Leads appear in the Leadverse dashboard but Slack notifications don't arrive
**Cause**: Slack integration not properly connected or alert preferences not configured
**Solution**: Verify the Slack workspace connection in Leadverse settings. Check that the correct Slack channel is selected. Ensure real-time alerts are enabled (Founder plan required for real-time alerts — Explorer may not include them). Test with a new keyword that should match immediately.
