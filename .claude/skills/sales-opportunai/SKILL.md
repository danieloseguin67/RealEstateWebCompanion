---
name: sales-opportunai
description: "OpportunAI platform help — AI-powered Reddit lead generation with opportunity scoring, sentiment analysis, AI reply drafting, business profile analysis, free tier + $29/mo Pro plan. Use when OpportunAI opportunity scores don't match actual lead quality, AI-generated replies sound too promotional for Reddit communities, you need to optimize subreddit targeting to find better leads, you want to understand how OpportunAI analyzes your business profile for matching, Slack or email alerts are too noisy with irrelevant Reddit threads, you're comparing OpportunAI vs Redreach vs Leedlime vs Bazzly for Reddit lead gen, or you can't tell which Reddit conversations are worth engaging. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit marketing with managed accounts (use /sales-replyagent or /sales-leadmore)."
argument-hint: "[describe what you need help with in OpportunAI — e.g., 'opportunity scores seem off' or 'AI replies getting downvoted']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit-lead-gen, platform]
---

# OpportunAI Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Opportunity scoring — leads don't seem relevant
   - B) AI reply quality — drafts sound generic or promotional
   - C) Business profile setup — not sure if targeting is right
   - D) Subreddit/keyword configuration
   - E) Notification management — too noisy
   - F) Comparing OpportunAI to other Reddit tools
   - G) Something else — describe it

2. **Current setup?**
   - A) Just signed up / haven't configured yet
   - B) Running but getting too much noise
   - C) Running but leads aren't converting
   - D) Evaluating vs other tools

**If the user's request already provides enough context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit marketing with managed/high-karma accounts → `/sales-leadmore [question]`
- Reddit lead gen with Chrome extension and auto-reply → `/sales-leadlee [question]`
- Reddit monitoring with API/webhook access → `/sales-redship [question]` or `/sales-syften [question]`
- AI search visibility on Reddit → `/sales-reddgrow [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — OpportunAI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, opportunity scoring, business profile setup, integration workarounds.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

1. **Business profile setup** — ensure your website URL has clear product descriptions, define target audience and ICP, map pain points accurately
2. **Keyword targeting** — start specific (pain points, competitor names), expand only after validating first batch of leads
3. **Reply quality** — never post AI drafts verbatim, add personal experience, match subreddit norms, build karma first
4. **Noise reduction** — remove keywords that consistently surface irrelevant threads, tighten subreddit targeting

If you discover a tip not in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No API, no webhooks, no MCP server.** OpportunAI is UI-only. No programmatic access to leads, scores, or reply drafts. Plan for manual workflows.
- **No Zapier/Make integration.** Cannot trigger automations when leads are found. Dashboard and notifications are the only outputs.
- **Reddit-only coverage.** No X, LinkedIn, HN, or other platforms. If you need multi-platform monitoring, pair with another tool.
- **AI replies need heavy editing.** Reddit communities aggressively moderate promotional content. Never post AI-generated replies without significant personalization.
- **Business profile analysis requires clear website.** If your landing page is vague, OpportunAI's opportunity scoring will be poor. Ensure your URL clearly describes what you do and who you serve.
- **Free tier has undocumented limits.** The exact constraints of the free plan are unclear — expect monitoring restrictions or reply token caps.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence
- `/sales-leedlime` — Credit-based Reddit lead gen with intent scoring, Slack/Discord alerts
- `/sales-leadlee` — Cheapest Reddit lead gen with AI replies ($12/mo), Chrome extension
- `/sales-bazzly` — AI Reddit lead gen with intent scoring, Chrome extension, Reply Boost
- `/sales-redreach` — AI Reddit lead gen with keyword auto-discovery, Google-ranking post detection
- `/sales-subredditsignals` — Reddit lead gen with 7-dimension buyer intent classification
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Opportunity scores seem off
**User says**: "OpportunAI keeps scoring irrelevant threads as high-opportunity — most have nothing to do with my product"
**Skill does**:
1. Reads platform-guide.md for scoring and business profile setup
2. Diagnoses: business profile likely too broad, or keywords too generic
3. Recommends refining website URL content, tightening pain point descriptions, using competitor names as keywords
**Result**: Better opportunity scoring through improved business profile and targeting

### Example 2: Integrating leads into a CRM
**User says**: "How do I get OpportunAI leads into my Pipedrive?"
**Skill does**:
1. Reads platform-guide.md integration section
2. Explains no API or webhooks exist — manual export is the only path
3. Suggests workflow: screenshot/copy leads regularly → manually enter high-intent ones into CRM, or use a note-taking intermediary
**Result**: Manual but workable CRM workflow established

### Example 3: AI replies getting removed by mods
**User says**: "Every reply I post based on OpportunAI suggestions gets deleted by moderators"
**Skill does**:
1. Reads platform-guide.md reply quality guidance
2. Explains Reddit norms: never post AI verbatim, lead with value, disclose if promoting
3. Recommends building subreddit karma first, rewriting drafts in personal voice, checking each subreddit's rules
**Result**: Improved reply survival with community-appropriate engagement

## Troubleshooting

### Opportunity scores don't match lead quality
**Symptom**: High-scored threads are about unrelated topics
**Cause**: Business profile or website URL doesn't clearly describe your product and audience
**Solution**: Update your connected website URL to a page with clear product description, target audience, and use cases. Refine pain point mapping in your OpportunAI profile. Use more specific keywords.

### AI replies sound robotic or too salesy
**Symptom**: Suggested replies read like marketing copy, not authentic Reddit comments
**Cause**: AI drafts are templated starting points, not ready-to-post content
**Solution**: Use AI drafts as structure only. Rewrite in first person with specific personal experience. Remove any marketing language. Match the casual tone of the subreddit. If unsure, read top comments in the thread to calibrate tone.

### Too many notifications for low-quality leads
**Symptom**: Getting alerts for threads that clearly aren't buying signals
**Cause**: Keywords are too broad or monitoring too many subreddits
**Solution**: Audit your keyword list — remove generic terms. Focus on problem-specific phrases ("looking for a tool that...", "alternative to [competitor]"). Reduce subreddit scope to only the most relevant 5-10 communities.
