---
name: sales-subtle
description: "Subtle AI platform help — AI-powered Reddit lead generation for SaaS with automated post discovery, campaign-based keyword targeting, AI response generation, browser extension. Use when Subtle AI isn't finding relevant Reddit posts for your product, AI-generated responses sound too generic or promotional, your campaign keywords are returning too much noise, you want to optimize subreddit targeting for higher-intent conversations, response quota is running out before the month ends, you're not sure whether to upgrade from $20/mo to Plus or Pro, or you're comparing Subtle vs Leadlee vs KeyMentions vs SocListener for Reddit lead gen. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Subtle AI]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, lead-generation, platform]
---
# Subtle AI Platform Help

Helps the user with Subtle AI platform questions — from campaign setup and keyword targeting through AI response tuning, subreddit selection, and plan optimization.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Subtle do you need help with?**
   - A) Campaign setup — creating campaigns, choosing keywords and subreddits
   - B) AI responses — improving quality, reducing generic output
   - C) Post discovery — finding more relevant threads, reducing noise
   - D) Browser extension — using the extension for engagement
   - E) Account safety — avoiding Reddit bans when engaging
   - F) Plan/billing — choosing between plans, managing quotas
   - G) Agency setup — managing multiple client campaigns
   - H) Something else — describe it

2. **What plan are you on?**
   - A) Subtle AI ($20/mo — 1 campaign, 10 keywords, 300 responses/mo)
   - B) Subtle AI Plus ($50/mo — 3 campaigns, 15 keywords, 1,000 responses/mo)
   - C) Subtle AI Pro ($120/mo — 10 campaigns, 20 keywords, 3,000 responses/mo)
   - D) Agency plan ($250-1,000/mo)
   - E) Free trial (7-day)

3. **What are you trying to accomplish?** (describe your specific goal)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring strategy across tools → `/sales-social-listening [question]`
- Prospect list building → `/sales-prospect-list`
- Outbound cadence or sequence strategy → `/sales-cadence`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — Subtle AI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, workflow recipes, and campaign optimization patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Campaign setup** — define clear product description, choose high-intent keywords, pick niche subreddits
2. **Response quality** — review and edit every AI draft, add product-specific context, match the thread tone
3. **Post discovery** — refine keywords to target buying language, exclude low-intent terms
4. **Safety** — always review before posting, space out engagement, follow subreddit rules
5. **Plan optimization** — monitor response usage, upgrade when consistently hitting limits

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and Reddit safety that may be outdated.*

- **No API, no webhooks, no integrations.** Subtle is UI-only with a browser extension. You cannot export leads programmatically, push to CRM, or integrate into automation pipelines. Manual workflow only.
- **"Daily posts" ≠ your posts.** The daily post limits (70/140/250) refer to posts Subtle *discovers* for you, not posts you make. Your actual engagement volume is limited by the monthly response quota (300/1,000/3,000).
- **Human review is mandatory for safety.** Subtle generates responses but requires you to approve them before posting. This is a feature, not a limitation — auto-posting tools get accounts banned.
- **$20/mo plan is very restrictive.** 1 campaign with 10 keywords and 10 subreddits means narrow targeting only. Most SaaS products need 15+ keywords to cover their problem space. Expect to upgrade to Plus quickly.
- **Agency plans are a different product tier.** Agency pricing ($250-1,000/mo) isn't just "more campaigns" — it adds team members, permissions, dedicated support, and 4-hour response SLA. Individual plans don't have team features.
- **Small user base (50+ active founders).** Less community knowledge, fewer tutorials, and less proven at scale compared to established tools with thousands of users.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, tool comparison across all platforms
- `/sales-leadlee` — Leadlee — cheapest Reddit lead generation with AI replies ($12/mo), quality scoring, Chrome extension
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-soclistener` — SocListener — Reddit lead gen with AI context matching, personalized comment/DM drafting
- `/sales-leado` — Leado — Reddit lead gen with buying intent scoring, Karma Builder, Viral Template Library
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead generation with 7-dimension intent scoring, voice-trained Comment Builder
- `/sales-redreach` — Redreach — AI-powered Reddit lead gen with keyword auto-discovery, Google-ranking post detection, webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: AI responses sound generic
**User says**: "My Subtle AI responses all start with 'That's a great question!' and sound like obvious ads. How do I make them more natural?"
**Skill does**:
1. Reads platform-guide.md for response optimization tips
2. Explains that response quality depends heavily on the product description provided to Subtle
3. Recommends rewriting the product description using customer language and specific pain points
4. Suggests always editing AI drafts: remove generic openers, add thread-specific context, mention the product only after providing genuine value
**Result**: User has concrete steps to improve AI response quality

### Example 2: Campaign keyword optimization
**User says**: "I'm on the Plus plan monitoring 'project management tool' but getting tons of irrelevant posts about school projects and personal task lists"
**Skill does**:
1. Reads platform-guide.md for keyword targeting strategies
2. Recommends using more specific phrases: "project management for teams", "Asana alternative", "better than Monday.com"
3. Suggests narrowing subreddit targeting to B2B-focused subreddits (r/SaaS, r/startups, r/Entrepreneur)
4. Notes that Subtle discovers up to 140 posts/day on Plus — noisy keywords waste that discovery budget
**Result**: User refines keywords for higher-intent matches

### Example 3: Choosing the right plan
**User says**: "I've been on the $20 plan for a week. I hit my 300 response limit on day 4. Should I upgrade to Plus or Pro?"
**Skill does**:
1. Reads platform-guide.md pricing section
2. Calculates: at current pace user needs ~2,100 responses/mo — Plus (1,000) may not be enough, Pro (3,000) fits
3. But first asks: of those 300 responses, how many did you actually use? If reviewing 50+ per day is too much, the problem is keyword noise, not quota
4. Recommends tightening keywords first (free fix), then upgrading to Plus if still hitting limits
**Result**: User makes an informed plan decision based on actual usage patterns

## Troubleshooting

### Responses running out mid-month
**Symptom**: Monthly response quota (300/1,000/3,000) depletes well before month end
**Cause**: Too many broad keywords generating responses for low-intent posts
**Solution**: Audit keyword performance — which keywords generate responses you actually use vs which generate waste? Replace broad keywords ("CRM", "marketing") with intent-rich phrases ("looking for a CRM", "need help with email marketing"). Reduce active subreddits to only those with genuine prospects. The goal is fewer, higher-quality responses — not maximum volume.

### Posts found are irrelevant to product
**Symptom**: Subtle discovers posts daily but most are off-topic or from the wrong audience
**Cause**: Keywords are too generic or subreddit selection is too broad
**Solution**: Use product-specific terminology and competitor names as keywords. Target subreddits where your ICP actually posts (not general-purpose subreddits with millions of members). Test one keyword at a time — add it, review results for 2-3 days, keep or replace.

### Browser extension not showing posts
**Symptom**: Extension installed but not displaying discovered posts or response suggestions
**Cause**: Common causes include browser permissions, ad blockers interfering, or being logged out of Subtle
**Solution**: Check that the extension has permission to access reddit.com. Disable ad blockers for reddit.com temporarily. Verify you're logged into Subtle in another tab. If issues persist, try removing and reinstalling the extension.
