---
name: sales-replierai
description: "ReplierAI platform help — AI-powered Reddit monitoring and reply tool with Chrome extension, brand voice customization, sentiment analysis, and workflow automation. Use when ReplierAI AI replies sound too generic or don't match your brand voice, keyword monitoring is returning too much noise or missing relevant threads, you want to optimize reply volume for better engagement, you're comparing ReplierAI vs ReplyGuy vs Leadlee vs Bazzly for Reddit reply tools, or you need help setting up workflows and alert preferences. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit lead gen with managed accounts (use /sales-replyagent)."
argument-hint: "[describe what you need help with in ReplierAI — e.g., 'AI replies sound too generic']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit-marketing, platform]
---

# ReplierAI Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring and alert preferences
   - B) Improving AI reply quality (too generic, too promotional)
   - C) Brand voice and tone configuration
   - D) Sentiment analysis and engagement tracking
   - E) Workflow management and conditional logic
   - F) Choosing the right plan (Basic vs Pro vs Business)
   - G) Chrome extension setup and usage
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Free tier
   - B) Basic ($10/mo — 30 AI replies/mo)
   - C) Pro ($20/mo — 300 AI replies/mo)
   - D) Business ($50/mo — 1,000 AI replies/mo)
   - E) Evaluating — haven't signed up yet

3. **What are you monitoring for?**
   - A) Brand mentions and reputation tracking
   - B) Lead generation — finding people asking about problems I solve
   - C) Competitor monitoring
   - D) Market research and trend discovery
   - E) Multiple — describe

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform social listening strategy → `/sales-social-listening [question]`
- Reddit lead gen with managed accounts → `/sales-replyagent [question]`
- Reddit managed reply marketing with human writers → `/sales-replymer [question]`
- AI reply generation across Twitter + Reddit + LinkedIn → `/sales-replyguy [question]`
- Reddit keyword monitoring with AI comments and auto-publish → `/sales-keymentions [question]`
- Reddit lead gen with structured intent scoring → `/sales-subredditsignals [question]`
- Free Reddit/HN/Lobsters keyword monitoring → `/sales-f5bot [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — ReplierAI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, workflow setup, Chrome extension, analytics.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — start with 3-5 high-intent keywords; add negative filters to reduce noise; use product-problem terms not feature names
2. **Reply quality** — configure brand voice with specific examples; set tone (casual to formal); avoid product-first language in AI suggestions
3. **Volume optimization** — Basic's 30 replies/mo is ~1/day; if you need more engagement, upgrade to Pro (300/mo = ~10/day)
4. **Monitoring coverage** — ReplierAI is Reddit-only; pair with a multi-platform tool if you need X, LinkedIn, or news coverage
5. **Manual review** — always review AI suggestions before publishing; edit replies to add specific details about the thread

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan limits and pricing.*

- **No API, no webhooks, no Zapier/Make.** ReplierAI is UI-only (web dashboard + Chrome extension). You cannot programmatically manage keywords, pull analytics, or integrate with CRM or other tools.
- **Prices shown are 50% introductory discount.** The $10/$20/$50 prices may increase after the introductory period. Verify current pricing before committing.
- **Reddit-only.** Twitter support is listed as "coming soon" but not available. No LinkedIn, HN, or other platforms.
- **AI reply limits are monthly, not daily.** Basic gives 30 AI replies/mo total — not 30/day. Running out mid-month means no more AI suggestions until renewal.
- **Manual review required.** Unlike tools with auto-post (ReplyGuy, ParseStream), ReplierAI requires you to review and approve every reply before publishing. This is safer but slower.
- **Free plan limits are unclear.** The free tier exists but specific limits on keywords, replies, and mentions are not publicly documented.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-replyguy` — ReplyGuy — AI replies across Twitter, Reddit, LinkedIn with auto-reply
- `/sales-replyagent` — ReplyAgent — Reddit marketing with managed account posting, AI comments
- `/sales-replymer` — Replymer — managed Reddit/X reply marketing with human-written replies
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead gen with 7-dimension buyer intent scoring
- `/sales-leadlee` — Leadlee — cheapest Reddit lead gen with AI replies ($12/mo)
- `/sales-bazzly` — Bazzly — Reddit lead gen with intent scoring, Chrome extension
- `/sales-f5bot` — F5Bot — free Reddit/HN/Lobsters keyword monitoring
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: AI replies sound too generic
**User says**: "My ReplierAI replies all say the same thing — they don't reference the actual thread content"
**Skill does**:
1. Reads platform guide for brand voice and tone configuration
2. Reviews keyword targeting — likely too broad, matching threads outside core expertise
3. Suggests updating brand profile with specific problem-solution examples and conversational tone
4. Recommends narrowing keywords to problem-specific phrases where genuine expertise exists
**Result**: AI generates context-aware replies that reference thread specifics

### Example 2: Choosing ReplierAI vs competitors
**User says**: "I want to do Reddit marketing — should I use ReplierAI, ReplyGuy, or Leadlee?"
**Skill does**:
1. Reads platform guide for comparison section
2. Compares: ReplierAI ($10-50/mo, Reddit-only, manual review, Chrome extension); ReplyGuy ($49/mo, Twitter+Reddit+LinkedIn, auto-reply on Twitter); Leadlee ($12/mo, Reddit-only, AI quality scoring, auto-reply beta)
3. Recommends based on user's budget, platform needs, and automation comfort level
**Result**: Clear recommendation matched to the user's specific requirements

### Example 3: Setting up monitoring for a SaaS product
**User says**: "How do I set up ReplierAI to find Reddit threads where people are looking for a project management tool?"
**Skill does**:
1. Reads platform guide for keyword strategy and workflow setup
2. Walks through: create project, add keywords ("project management tool", "Asana alternative", "task management recommendation"), configure sources per subreddit
3. Sets up alert preferences — email for high-relevance matches, dashboard review for batch processing
4. Configures brand voice with helpful, non-promotional tone
**Result**: Monitoring pipeline catching relevant threads with AI reply suggestions ready for review

## Troubleshooting

### Too many irrelevant mentions
**Symptom**: Dashboard flooded with threads that don't match your niche
**Cause**: Keywords are too broad or overlapping with unrelated topics
**Solution**: Review the most recent 20 mentions. Identify patterns in false positives — common words that trigger unrelated matches. Narrow keywords to multi-word problem phrases. Use per-project source settings to limit monitoring to relevant subreddits. Reduce active sources to only high-signal subreddits.

### Running out of AI replies mid-month
**Symptom**: Hit the AI reply limit before the billing cycle ends
**Cause**: Using AI suggestions on every mention instead of prioritizing high-value threads
**Solution**: Triage mentions first — only request AI replies for threads with genuine engagement potential (active discussions, specific questions, high upvotes). Write manual replies for simpler threads. If consistently running out, upgrade from Basic (30/mo) to Pro (300/mo).

### Chrome extension not working
**Symptom**: Chrome extension doesn't show ReplierAI overlay on Reddit
**Cause**: Extension not properly installed, Reddit session not connected, or browser permissions issue
**Solution**: Verify the extension is installed from the Chrome Web Store and enabled. Check that your Reddit account is connected via OAuth in the ReplierAI dashboard. Try clearing browser cache and re-authenticating. Ensure no ad blockers or privacy extensions are blocking the extension's content scripts.
