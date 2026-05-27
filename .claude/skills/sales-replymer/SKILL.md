---
name: sales-replymer
description: "Replymer platform help — managed Reddit and X reply marketing with human-written replies, 24/7 keyword monitoring, SEO Replies targeting Google-ranking posts, project-based analytics, and REST API. Use when Replymer replies sound too generic or off-brand, you want to track which keywords generate the most published replies, SEO Replies aren't targeting the right Google-ranking posts, your mention-to-reply conversion rate is low, you need to automate project setup or pull analytics via the API, or you want to compare Replymer vs ReplyAgent vs ReplyGuy vs CrowdReply for managed Reddit posting. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Replymer — e.g., 'replies sound too promotional']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# Replymer Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keywords and negative keywords for monitoring
   - B) Improving reply quality (too generic, too promotional)
   - C) SEO Replies — targeting Google-ranking Reddit posts
   - D) Analytics and conversion tracking
   - E) API integration (projects, mentions, replies)
   - F) Scaling volume (choosing the right plan)
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial
   - B) Starter ($99/mo — 30 replies, 15 keywords)
   - C) Growth ($199/mo — 100 replies, 50 keywords)
   - D) Scale ($399/mo — 300 replies, unlimited keywords)
   - E) Scale Plus/Elite ($999-1,999/mo)
   - F) Evaluating — haven't signed up yet

3. **What's your goal?**
   - A) Lead generation (find people asking for solutions)
   - B) Brand awareness (join relevant conversations)
   - C) SEO engagement (comment on Google-ranking threads)
   - D) Competitive monitoring (track competitor mentions)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform social listening strategy → `/sales-social-listening [question]`
- Reddit monitoring with your own accounts and auto-publish → `/sales-keymentions [question]`
- Reddit lead gen with buyer intent classification → `/sales-subredditsignals [question]`
- Reddit + Twitter AI replies with your own accounts → `/sales-replyguy [question]`
- Managed Reddit posting with pay-per-post → `/sales-replyagent [question]`
- Reddit lead gen with Chrome extension DM automation → `/sales-redreach [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — Replymer platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, API endpoints, keyword setup, SEO Replies, analytics.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — start with 10-15 problem-language keywords, add negative keywords aggressively to reduce noise
2. **Reply quality** — provide a detailed product brief with specific use cases; Replymer's writers match your brand voice from the setup form
3. **SEO Replies** — target posts ranking in Google's top 10 for your keywords; these drive sustained organic traffic
4. **Conversion tracking** — use the analytics endpoint or dashboard to measure mention-to-reply rate by keyword
5. **Volume scaling** — if hitting plan limits, upgrade or consolidate to fewer high-intent keywords

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan limits and reply quality.*

- **Flat pricing, not pay-per-post.** Unlike ReplyAgent ($3/comment), Replymer charges a flat monthly fee with a fixed reply allocation. Unused replies don't roll over.
- **Human-written doesn't mean you control the writers.** Replymer's team writes and reviews replies — you provide the product brief and brand voice, but you don't approve individual replies before posting.
- **No webhooks or real-time push.** The API is pull-only. Poll the mentions or replies endpoints if you need programmatic monitoring.
- **Team management is Scale+ only.** Starter and Growth plans are single-user. No way to assign keywords or projects to team members.
- **Reddit and X only.** No LinkedIn, HN, Bluesky, or other platforms. Pair with another tool for broader coverage.
- **Keyword limits are per-project.** Starter allows 15 keywords total across all projects. Plan keyword allocation carefully.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-replyagent` — ReplyAgent — Reddit marketing with managed account posting, AI comments, pay-per-post
- `/sales-replyguy` — ReplyGuy — AI replies across Twitter, Reddit, LinkedIn with auto-reply
- `/sales-redreach` — Redreach — Reddit lead gen with keyword auto-discovery, DM automation
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead gen with buyer intent classification
- `/sales-keymentions` — KeyMentions — Reddit monitoring with AI comment generation and auto-publish
- `/sales-soclistener` — SocListener — Reddit lead gen with AI context matching, comment/DM drafting
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Replies sound too promotional
**User says**: "Replymer's replies keep mentioning my product name in the first sentence — they look like ads"
**Skill does**:
1. Reads platform guide for reply quality setup
2. Reviews the product brief submitted during onboarding — likely too product-focused
3. Suggests rewriting the brief to emphasize problems solved, not product features; ask Replymer to lead with value before any product mention
4. Recommends checking the style guide customization to set a conversational, help-first tone
**Result**: Replies lead with genuine help before any product reference

### Example 2: Pull analytics via API for a reporting dashboard
**User says**: "I want to pull Replymer stats into my internal dashboard — how do I use the API?"
**Skill does**:
1. Reads platform guide API section
2. Shows the stats endpoint: GET /projects/:projectId/stats with period parameter (1/7/30/90 days)
3. Walks through API key generation and X-API-Key header auth
4. Notes rate limits: 500/hr on Starter, 1,000/hr on Growth, unlimited on Scale+
**Result**: Working API integration pulling project analytics into custom dashboard

### Example 3: SEO Replies not generating enough traffic
**User says**: "I set up SEO Replies but I'm not seeing any clicks from Google-ranking Reddit posts"
**Skill does**:
1. Reads platform guide for SEO Replies feature
2. Checks keyword selection — SEO keywords should target long-tail queries where Reddit ranks on page 1
3. Suggests reviewing the Google ranking positions in the SEO replies dashboard
4. Notes that SEO Replies require time to accumulate — Google re-indexes Reddit threads periodically
**Result**: Better keyword targeting for SEO Replies with realistic traffic expectations

## Troubleshooting

### Low mention-to-reply conversion rate
**Symptom**: Many mentions found but few replies published
**Cause**: Keywords too broad generating low-quality mentions, or negative keywords not filtering enough noise
**Solution**: Review the mentions list via API or dashboard. Identify recurring irrelevant mentions and add those terms as negative keywords. Narrow keywords to problem-specific phrases (e.g., "best CRM for solopreneurs" instead of "CRM"). Check that your product brief clearly defines target conversations.

### Replies being removed from Reddit
**Symptom**: Published replies disappear from Reddit threads
**Cause**: Subreddit has strict self-promotion rules, or replies triggered spam filters
**Solution**: Contact Replymer support — they manage the posting accounts and have a 7-day refund guarantee. Ask them to adjust targeting to avoid subreddits with aggressive moderation. Ensure replies don't include tracking links that subreddits block.

### API returning rate_limit_exceeded errors
**Symptom**: 429 errors when polling the API
**Cause**: Exceeding hourly rate limit for your plan (Starter: 500, Growth: 1,000)
**Solution**: Add caching and reduce polling frequency. Batch requests where possible (e.g., fetch all mentions once per hour instead of per-minute). Upgrade to Scale for unlimited API calls if programmatic access is core to your workflow.
