---
name: sales-replyagent
description: "ReplyAgent platform help — AI-powered Reddit marketing automation with managed account posting, subreddit monitoring, AI comment generation, Google-ranking post detection, UTM tracking, and approval workflows. Use when ReplyAgent AI comments sound too polished or template-like, managed account posts keep getting removed by moderators, you want to track ROI from Reddit engagement with UTM parameters, subreddit targeting is surfacing irrelevant threads, you need to import Reddit posts via the API for custom workflows, or you want to compare ReplyAgent vs Redreach vs Subreddit Signals vs ReplyGuy for Reddit lead gen. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in ReplyAgent — e.g., 'AI comments sound too generic']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# ReplyAgent Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up subreddit monitoring and targeting
   - B) Improving AI comment quality (too generic, too polished)
   - C) Managing posting volume and moderation risk
   - D) Google-ranking post discovery for SEO engagement
   - E) API integration (importing posts, approving comments)
   - F) Tracking ROI with UTM parameters
   - G) Enterprise setup or volume pricing
   - H) Something else — describe it

2. **How are you using ReplyAgent?**
   - A) Just started (free trial credits)
   - B) Active — pay-per-post ($3/comment)
   - C) Enterprise plan
   - D) Evaluating — haven't signed up yet

3. **What's your goal?**
   - A) Lead generation (find people asking for solutions)
   - B) Brand awareness (participate in relevant discussions)
   - C) SEO engagement (comment on Google-ranking Reddit threads)
   - D) Competitive monitoring (track competitor mentions)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit) → `/sales-social-listening [question]`
- Reddit monitoring with your own accounts and auto-publish → `/sales-keymentions [question]`
- Reddit monitoring with REST API/MCP across 13+ platforms → `/sales-octolens [question]`
- Reddit lead gen with buyer intent classification → `/sales-subredditsignals [question]`
- Reddit + Twitter AI replies with your own accounts → `/sales-replyguy [question]`
- Reddit lead gen with Chrome extension DM automation → `/sales-redreach [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — ReplyAgent platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, API endpoints, managed accounts, comment quality tuning, UTM setup.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Subreddit targeting** — start with 3-5 focused subreddits, expand only after validating comment quality
2. **Comment quality** — provide detailed product descriptions and tone guidelines; review and personalize AI drafts before approving
3. **Volume management** — ReplyAgent caps at 5 comments per managed account per day; keep volume low to avoid mod attention
4. **SEO plays** — target Google-ranking posts for long-tail traffic; these threads get sustained visibility
5. **ROI tracking** — use UTM parameters on every link; track conversions in Google Analytics

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about managed accounts and moderation risk.*

- **You don't control the posting accounts.** ReplyAgent uses managed accounts you don't own. You can't build karma, post history, or community reputation on these accounts.
- **Moderators can still remove posts.** Managed accounts reduce ban risk to YOUR account, but subreddit moderators can remove any comment. The 30-day warranty refunds credits for removed posts.
- **No webhooks or real-time notifications via API.** The API only supports importing posts and approving comments. No push notifications — rely on email digests for monitoring.
- **Pay-per-post adds up.** At $3/comment across 10 subreddits with daily posting, expect ~$450-900/month. Budget carefully.
- **AI comments need input quality.** Vague product descriptions produce vague comments. Write specific, detailed descriptions with use cases and differentiators.
- **Reddit-only platform.** Does not monitor X, LinkedIn, HN, or other platforms. Pair with another tool for multi-platform coverage.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-redreach` — Redreach platform help — Reddit lead gen with keyword auto-discovery, Google-ranking posts, DM automation
- `/sales-replyguy` — ReplyGuy platform help — AI replies across Twitter, Reddit, LinkedIn with auto-reply
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead gen with buyer intent classification
- `/sales-keymentions` — KeyMentions platform help — Reddit monitoring with AI comment generation and auto-publish
- `/sales-soclistener` — SocListener — Reddit lead gen with AI context matching, comment/DM drafting
- `/sales-bazzly` — Bazzly platform help — Reddit lead gen with intent scoring, Chrome extension DMs
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: AI comments sound too generic
**User says**: "ReplyAgent's comments all start with 'Great question!' and don't mention my product's specific features"
**Skill does**:
1. Reads platform guide for comment quality tuning
2. Checks product description setup — likely too vague
3. Suggests writing a detailed product description with 3-5 specific use cases, target customer language, and unique differentiators
4. Recommends reviewing and editing AI drafts before approving — treat them as first drafts, not final posts
**Result**: Comments become more specific and authentic after better input context

### Example 2: Import posts via API for custom workflow
**User says**: "I found Reddit posts through my own monitoring and want to import them into ReplyAgent for comment generation"
**Skill does**:
1. Reads platform guide API section
2. Shows Import Comment endpoint: POST with Bearer auth, array of Reddit URLs
3. Walks through generating an API key from the dashboard
4. Notes imported posts appear in preview state — still need manual approval before posting
**Result**: Custom monitoring pipeline feeding into ReplyAgent's managed posting

### Example 3: Posts getting removed by moderators
**User says**: "Half my ReplyAgent comments get removed within a day — what am I doing wrong?"
**Skill does**:
1. Reads platform guide for moderation risk management
2. Reviews subreddit selection — some subreddits aggressively remove promotional content
3. Suggests reducing volume per subreddit, targeting question-style threads, and ensuring comments add genuine value before mentioning products
4. Notes the 30-day warranty refunds credits for removed posts
**Result**: Better subreddit and thread selection reduces removal rate

## Troubleshooting

### Comments getting removed by moderators
**Symptom**: Many comments disappear within hours or days of posting
**Cause**: Subreddits have anti-promotional rules, comment sounds too promotional, or volume too high in one community
**Solution**: Review which subreddits remove comments most. Drop subreddits with strict self-promotion rules. Ensure comments lead with genuine help before any product mention. Reduce to 1-2 comments per subreddit per day. ReplyAgent's 30-day warranty refunds credits for removed posts.

### Low conversion despite high comment volume
**Symptom**: Lots of comments posted but UTM tracking shows minimal clicks or conversions
**Cause**: Targeting low-intent threads, comments lack compelling CTAs, or UTM links are buried
**Solution**: Focus on threads where users explicitly ask for recommendations or solutions. Ensure the product mention includes a clear benefit statement. Check that UTM parameters are properly configured in Google Analytics. Target Google-ranking posts for sustained traffic vs ephemeral real-time threads.

### API import not generating previews
**Symptom**: POST to Import Comment returns success but no preview comments appear
**Cause**: Reddit URLs invalid, posts too old, or product context not configured
**Solution**: Verify Reddit URLs are valid post permalinks (not comment URLs). Ensure your product/company description is set up in the dashboard — the AI needs context to generate comments. Check the dashboard for any error indicators on imported posts.
