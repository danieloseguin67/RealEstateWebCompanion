---
name: sales-crowdreply
description: "CrowdReply platform help — AI search visibility tracking across ChatGPT, Perplexity, Gemini, Claude combined with managed Reddit/Quora/Facebook engagement via trusted community profiles. Use when CrowdReply engagement credits are running out faster than expected, managed account comments keep getting removed by Reddit moderators, AI search visibility scores aren't improving despite active engagement, you want to understand which prompts trigger brand mentions in AI models, engagement credit costs feel too high for the ROI you're seeing, or you want to compare CrowdReply vs ReddGrow vs Replymer vs ReplyAgent for managed Reddit posting. Do NOT use for social listening strategy across tools (use /sales-social-listening) or AI visibility strategy across tools (use /sales-ai-visibility)."
argument-hint: "[describe what you need help with in CrowdReply — e.g., 'comments getting removed' or 'AI visibility not improving']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, ai-visibility, reddit, platform]
---

# CrowdReply Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) AI search visibility tracking and prompt analysis
   - B) Engagement credits — budgeting, ROI, cost management
   - C) Comments getting removed by moderators
   - D) Citation source intelligence and competitor benchmarking
   - E) Social listening and keyword setup
   - F) Reporting and stakeholder communication
   - G) API integration (Growth+ plan)
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial (7-day, no engagement credits)
   - B) Starter ($99/mo — 1 brand, 20 prompts, $50 credits)
   - C) Growth ($299/mo — 3 brands, 75 prompts, API, $200 credits)
   - D) Enterprise ($499+/mo — 10 brands, API, dedicated AM)
   - E) Evaluating — haven't signed up yet

3. **What's your primary goal?**
   - A) Improve AI search visibility (appear in ChatGPT/Perplexity answers)
   - B) Reddit marketing and community engagement
   - C) Brand monitoring and competitive intelligence
   - D) Both AI visibility and Reddit engagement

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- AI visibility strategy across tools → `/sales-ai-visibility [question]`
- Multi-platform social listening → `/sales-social-listening [question]`
- Reddit monitoring with your own accounts → `/sales-keymentions [question]`
- Reddit managed posting (pay-per-post) → `/sales-replyagent [question]`
- Reddit managed replies (human-written) → `/sales-replymer [question]`
- Reddit marketing for GEO with API/CLI → `/sales-reddgrow [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — CrowdReply platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, engagement credit costs, AI visibility tracking, citation intelligence, API info, integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **AI visibility tracking** — start with 5-10 prompts per competitor, track weekly, focus on prompts where competitors appear but you don't
2. **Engagement budgeting** — calculate realistic comment volume per plan; $50 credits = ~5-7 mid-tier comments, not 50
3. **Comment survival** — target question threads in mid-size subreddits; avoid subreddits with strict self-promotion rules
4. **Citation strategy** — identify which domains AI cites for your category, build presence on those domains
5. **Reporting** — use CrowdReply's shareable reports for stakeholder communication; lead with AI visibility score trends

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about engagement credits and managed accounts.*

- **Engagement credits buy fewer comments than you think.** Low-karma comments cost 25-40 credits, mid-karma 50-75, high-karma 100+. The $50 Starter credit = ~5-7 mid-tier comments/month at best, not 50.
- **You don't own the posting accounts.** CrowdReply uses managed "trusted community profiles." You can't build karma, post history, or community reputation on these accounts.
- **Comments can still get removed.** G2 and Product Hunt reviews report 50-90% removal rates in some cases. CrowdReply refunds credits for removed comments, but the engagement didn't happen.
- **API requires Growth ($299/mo) or higher.** No public API docs available. Starter plan has no programmatic access.
- **AI visibility and engagement are separate modules.** Tracking what AI says about you is useful on its own. The engagement engine is an add-on spend on top of the subscription.
- **Reddit-primary engagement.** Quora and Facebook are mentioned but Reddit is the main engagement target. Don't expect equal coverage across platforms.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-ai-visibility` — AI visibility monitoring — track what LLMs say about your brand, tool comparison, improvement strategy
- `/sales-replyagent` — ReplyAgent — Reddit marketing automation with managed account posting, pay-per-post ($3/comment)
- `/sales-replymer` — Replymer — managed Reddit/X reply marketing with human-written replies, SEO Replies
- `/sales-reddgrow` — ReddGrow — Reddit marketing for AI search visibility (GEO) with AI Visibility Scanning, AI comment drafting, REST API
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Comments keep getting removed
**User says**: "I spent $200 on engagement credits last month and most of my CrowdReply comments got removed within a week"
**Skill does**:
1. Reads platform guide for moderation risk management
2. Identifies likely causes — targeting subreddits with strict self-promotion rules, comment tone too promotional, high volume in one community
3. Recommends focusing on question threads where product mentions are natural, reducing volume per subreddit, and targeting mid-size communities over popular ones
4. Notes CrowdReply's credit refund policy for removed comments
**Result**: Better subreddit and thread targeting reduces removal rate

### Example 2: Understanding AI visibility scores via API
**User says**: "I'm on the Growth plan — how do I pull my AI visibility data into our internal dashboard?"
**Skill does**:
1. Reads platform guide API section
2. Notes API is available on Growth+ but no public API documentation is available
3. Suggests contacting CrowdReply support for API access details and endpoint documentation
4. Recommends using shareable reports as an interim solution until API integration is confirmed
**Result**: Clear expectations about API availability and workaround path

### Example 3: AI visibility not improving despite engagement
**User says**: "I've been posting comments for 3 months but my AI search visibility score hasn't changed"
**Skill does**:
1. Reads platform guide for AI visibility improvement strategy
2. Explains that AI visibility depends on training data cycles (months) and retrieval source authority (immediate for Perplexity, slower for ChatGPT)
3. Reviews citation source intelligence to check if engagement is happening on domains that AI actually cites
4. Recommends focusing engagement on high-authority domains AI cites, not just any Reddit thread
**Result**: Engagement strategy aligned with citation source intelligence for better visibility impact

## Troubleshooting

### Engagement credits depleting too fast
**Symptom**: Monthly credits run out within the first week
**Cause**: Targeting high-karma account comments ($100+ credits each) or posting threads ($15-25 each) instead of standard comments
**Solution**: Review your credit spend in the dashboard. Shift to mid-tier comments (50-75 credits) unless high-karma is essential. Calculate your realistic monthly volume: $200 credits / $10 avg per comment = ~20 comments. Set a weekly budget cap.

### AI visibility score not matching manual checks
**Symptom**: CrowdReply shows 60% visibility but manual ChatGPT prompts rarely mention your brand
**Cause**: CrowdReply runs many prompt variations and aggregates results. Manual checks are a small, non-representative sample. API access may also produce different results than the consumer interface.
**Solution**: Use CrowdReply's prompt tracking to see which specific prompts trigger mentions. Manually test those exact prompts. Treat tool data as directional trends, not absolute numbers.

### Social listening keywords returning noise
**Symptom**: Too many irrelevant mentions flooding the dashboard
**Cause**: Keywords too broad, missing exclusion terms, or monitoring sources that generate spam
**Solution**: Add industry-specific exclusion terms. Use your brand name + category terms as compound keywords. Start with 5-10 focused keywords, validate results, then expand. Review the top 20 mentions weekly and prune keywords that consistently produce noise.
