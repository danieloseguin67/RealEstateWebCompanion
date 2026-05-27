---
name: sales-bazzly
description: "Bazzly platform help — AI-powered Reddit lead generation with intent scoring, contextual DM/reply drafting, Chrome extension for sending, and Reply Boost for visibility. Use when Bazzly AI-drafted messages sound generic and need heavy rewriting before posting, false positive leads are wasting your outreach credits, you want to reduce Reddit ban risk when using Bazzly DMs, subreddit limits on your plan are too restrictive for your niche, the Chrome extension isn't detecting leads in subreddits you've configured, you need to optimize credit usage across comments and Reply Boosts, or you're comparing Bazzly vs KeyMentions vs RedShip vs ReplyGuy for Reddit lead generation. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Bazzly — e.g., 'AI messages need too much editing' or 'running out of credits too fast']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# Bazzly Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (subreddits, keywords, targeting)
   - B) Improving AI message quality (replies and DMs)
   - C) Reducing false positive leads
   - D) Credit optimization (getting more from 100/200/unlimited credits)
   - E) Account safety and ban prevention
   - F) Chrome extension issues
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($19/mo — 200 leads, 4 subreddits, 20 AI credits)
   - B) Growth ($39/mo — unlimited leads, 6 subreddits, 200 AI credits)
   - C) Elite ($99/mo — unlimited everything)
   - D) Free trial

3. **What's your goal?**
   - A) Lead generation (find people asking for recommendations)
   - B) Brand awareness (get product mentioned in relevant threads)
   - C) Competitor monitoring (watch competitor discussions to engage)
   - D) Content promotion (share content in relevant communities)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring with AI relevance scoring (0-100) and API access → `/sales-redship [question]`
- Reddit monitoring with auto-publish comments and virality detection → `/sales-keymentions [question]`
- Reddit + Quora with forced manual posting → `/sales-threadradar [question]`
- AI reply generation across Twitter + Reddit + LinkedIn → `/sales-replyguy [question]`
- Multi-platform monitoring (Reddit + X + LinkedIn + Quora + HN) → `/sales-parsestream [question]`
- Community monitoring across 15+ platforms with API → `/sales-syften [question]`
- Audience intelligence and pain point research → `/sales-reddinbox [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Bazzly platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, credit system, Chrome extension setup, message optimization, and account safety guidance.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's situation:

1. **Message quality** — customize product context, review and edit every AI draft, vary style across replies
2. **Credit optimization** — prioritize high-intent leads, use AI drafts (0.1 credits) before committing to comments (10 credits)
3. **Lead quality** — narrow subreddit selection, refine targeting description, review intent scores before engaging
4. **Account safety** — always approve messages manually, limit daily sends, avoid generic templates, use personal Reddit account via Chrome extension
5. **Coverage** — if subreddit limits restrict you, prioritize highest-traffic communities for your niche

If you discover a gotcha not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about pricing and capabilities that may change.*

- **Chrome extension only.** No Firefox, Safari, or mobile support. You must run the extension in Chrome (or Chromium-based browsers) for sending. No standalone desktop or mobile app.
- **No API, webhooks, or Zapier.** Entirely UI-driven. You cannot pipe Bazzly data into a CRM, dashboard, or automation workflow. If programmatic access matters, use RedShip ($19/mo, REST API + webhooks on all plans).
- **30% of AI messages need significant rewrites.** Treat AI drafts as rough starting points, not final copy. The AI occasionally misses sarcasm, context, and subtle nuances in Reddit threads.
- **15% false positive rate on leads.** Not every flagged lead is genuine — review intent scores before spending credits on comments or DMs.
- **Subreddit limits are tight.** Starter gives 4, Growth gives 6. Choose carefully based on where your audience actually asks for recommendations.
- **Reply Boost (smart upvotes) carries risk.** Vote manipulation violates Reddit TOS. Use sparingly and understand the risk.
- **Credit costs vary significantly.** A comment via high-karma account costs 10 credits vs 0.1 for an AI draft. Plan credit allocation around your highest-intent leads.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-redship` — RedShip platform help — AI-scored Reddit monitoring with SEO post discovery, REST API + webhooks, $19/mo
- `/sales-keymentions` — KeyMentions platform help — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-threadradar` — ThreadRadar platform help — Reddit + Quora with AI-drafted replies, forced manual posting (safer)
- `/sales-replyguy` — ReplyGuy platform help — AI reply generation across Twitter, Reddit, LinkedIn
- `/sales-parsestream` — ParseStream platform help — multi-platform monitoring (Reddit, X, LinkedIn, Quora, HN) with AI reply drafts
- `/sales-syften` — Syften platform help — 15+ community platforms with sub-minute Reddit alerts, Boolean search, API + webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: AI messages too generic
**User says**: "Bazzly AI drafts all sound the same — robotic and salesy. How do I make them sound natural?"
**Skill does**:
1. Reads platform guide for message optimization tips
2. Recommends adding detailed product context and specifying tone (casual, helpful, founder-voice)
3. Advises editing every draft to add personal anecdotes or specific value for the thread's question
4. Suggests varying reply styles (question, resource share, personal experience) across different threads
**Result**: Clear strategy to improve message authenticity and reduce spam signals

### Example 2: Running out of credits too fast
**User says**: "I'm on the Growth plan and burning through 200 AI credits in a week. How do I optimize?"
**Skill does**:
1. Reads platform guide for credit cost breakdown
2. Identifies AI drafts (0.1 credits) vs comments (10 credits) vs upvotes (0.2 credits) cost structure
3. Recommends screening leads by intent score before committing to expensive comment credits
4. Suggests batch-reviewing AI drafts to filter out low-quality leads early
**Result**: Credit allocation strategy that extends monthly budget

### Example 3: Comparing Bazzly to alternatives with API access
**User says**: "I want to feed Reddit lead data into my CRM. Can Bazzly do this?"
**Skill does**:
1. Confirms Bazzly has no API, webhooks, or iPaaS support — entirely UI + Chrome extension
2. Recommends alternatives: RedShip ($19/mo, REST API + webhooks on all plans), Syften (REST API + webhooks), or Octolens ($119/mo, REST + webhooks + MCP)
3. Routes to `/sales-social-listening` for a full comparison of tools with developer-friendly integrations
**Result**: Clear answer that Bazzly can't do this, with actionable alternatives

## Troubleshooting

### AI messages flagged or getting low engagement
**Symptom**: Replies get downvoted, ignored, or flagged as promotional on Reddit
**Cause**: AI drafts are too generic, template-like, or jump to product pitch too quickly
**Solution**: Edit every message before sending. Lead with genuine value — answer the question first, then mention your product only if directly relevant. Vary message length and structure. Never post the same message template in multiple threads. Add personal context ("I ran into this same issue and...") to make replies authentic.

### False positives consuming credits
**Symptom**: Bazzly flags leads with high intent scores but the threads are irrelevant to your product
**Cause**: Targeting description is too broad or subreddit selection includes tangential communities
**Solution**: Narrow your product description to focus on the specific problem you solve, not general features. Remove subreddits where your product is a poor fit. Review the first 20 leads manually before enabling DMs. Use AI draft generation (0.1 credits) as a screening step before committing comment credits (10 credits).

### Chrome extension not detecting leads
**Symptom**: Extension installed but no leads appearing in dashboard
**Cause**: Extension permissions, browser profile conflicts, or subreddit configuration issues
**Solution**: Verify the extension has permissions for reddit.com. Check that your Chrome profile isn't blocking extensions. Confirm subreddits are correctly configured in your Bazzly dashboard. Try disabling other Reddit-related extensions that may conflict. Clear browser cache and reload. If using multiple Chrome profiles, ensure the extension is enabled in the correct profile.
