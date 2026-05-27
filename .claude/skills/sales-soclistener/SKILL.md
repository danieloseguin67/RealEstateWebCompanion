---
name: sales-soclistener
description: "SocListener platform help — Reddit lead generation with AI-powered context matching, personalized comment drafting, and DM outreach. Use when SocListener isn't finding relevant Reddit threads for your product, AI-generated comments sound generic or get downvoted, you're worried about getting shadowbanned from Reddit lead gen, your credit balance is draining too fast, you want to compare SocListener vs Leadlee vs Bazzly vs KeyMentions for Reddit outreach, or you need help setting up your first product in SocListener. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in SocListener]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, lead-generation, platform]
---
# SocListener Platform Help

Helps the user with SocListener platform questions — from product setup and lead discovery through AI comment quality, credit optimization, and Reddit safety.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of SocListener do you need help with?**
   - A) Lead discovery — finding relevant Reddit threads, tuning targeting
   - B) AI comments — improving reply quality, personalization
   - C) DM outreach — starting conversations at scale
   - D) Credits — understanding usage, optimizing spend
   - E) Safety — avoiding Reddit bans, spam prevention
   - F) Account setup — getting started, configuring products
   - G) Something else — describe it

2. **What's your current status?**
   - A) Haven't signed up yet
   - B) Free tier — evaluating
   - C) Paid plan — actively using
   - D) Considering switching away

3. **What are you trying to accomplish?** (describe your specific goal)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring strategy across tools → `/sales-social-listening [question]`
- Prospect list building → `/sales-prospect-list`
- Outbound cadence or sequence strategy → `/sales-cadence`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — SocListener platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, workflow recipes, and Reddit safety patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Lead discovery** — optimize product description, refine targeting for better context matching
2. **Reply quality** — customize AI comments, add thread-specific context before posting
3. **Safety** — follow Reddit's self-promotion rules, manual review before posting, account warmup
4. **Credit optimization** — focus on highest-intent threads, skip low-relevance matches
5. **Comparison** — help decide between SocListener and alternatives based on their specific needs

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and Reddit safety that may be outdated.*

- **No public API, no webhooks, no integrations.** SocListener is entirely UI-based. You cannot export leads programmatically, trigger workflows, or integrate with CRM/automation tools. Manual copy-paste only.
- **Credit-based pricing with opaque tiers.** Pricing details aren't publicly documented — you need to sign up to see exact credit costs. Credits are consumed per search/comment generation. If credits run out mid-cycle, you need to purchase more or upgrade.
- **Reddit shadowban risk is real.** 89% of startup marketing accounts get banned within 30 days on Reddit. SocListener's "no spam risks" marketing claim doesn't override Reddit's anti-spam systems. Always manually review and edit AI-generated comments before posting. Follow the 10:1 rule (10 genuine comments per 1 promotional one).
- **AI context matching ≠ buyer intent.** SocListener matches threads to your product description, but not all matches represent buying intent. Many threads are general discussions, venting, or already-solved problems. Screen leads manually for genuine purchase signals.
- **Domain redirected.** soclistener.com redirects to sociallisteningtool.com. The app lives at app.sociallisteningtool.com (also accessible at app.soclistener.com).

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, tool comparison across all platforms
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-bazzly` — Bazzly — Reddit lead generation with intent scoring, Chrome extension, Reply Boost
- `/sales-leadlee` — Leadlee — cheapest Reddit lead gen with AI replies ($12/mo), quality scoring, Chrome extension
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead generation with 7-dimension intent scoring, voice-trained Comment Builder
- `/sales-redreach` — Redreach — Reddit lead gen with keyword auto-discovery, Google-ranking post detection, AI replies
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Leads aren't relevant
**User says**: "SocListener keeps showing me Reddit threads where people mention my keywords but they're not actually looking for a solution"
**Skill does**:
1. Reviews how the user's product description is configured
2. Suggests rewriting the description to focus on the specific problem solved, not just keywords
3. Recommends manually reviewing the first 20 leads to calibrate what "relevant" looks like
4. Advises ignoring threads where the user already solved their problem or is just venting
**Result**: User has clearer targeting and a filtering strategy

### Example 2: Comparing SocListener vs alternatives
**User says**: "Is SocListener worth it or should I use something like Redreach or Leadlee?"
**Skill does**:
1. Compares SocListener's AI context matching and comment drafting with Redreach's deeper Reddit features (keyword auto-discovery, Google-ranking posts, DM automation) and Leadlee's budget pricing ($12/mo)
2. Notes SocListener has no API vs Redreach's webhooks vs Leadlee's Chrome extension
3. Routes to `/sales-social-listening` for comprehensive tool comparison if the user needs more options
**Result**: User can make an informed choice based on their specific needs and budget

### Example 3: Avoiding Reddit bans
**User says**: "How do I use SocListener to post comments without getting my Reddit account banned?"
**Skill does**:
1. Explains Reddit's 89% ban rate for marketing accounts
2. Recommends account warmup: week 1 observe/upvote, week 2 genuine comments, week 3 start soft product mentions
3. Emphasizes editing every AI draft before posting — never post verbatim
4. Advises 2-3 replies per day max, spaced 30+ minutes apart, across different subreddits
**Result**: User has a safe posting workflow that protects their Reddit account

## Troubleshooting

### AI comments get downvoted or removed
**Symptom**: Comments generated by SocListener are being downvoted, removed by mods, or reported as spam
**Cause**: AI drafts posted verbatim are often generic and detectable as promotional
**Solution**: Never post AI drafts without heavy editing. Read the full thread first, address the person's specific question, add genuine value, and only mention your product if it's directly relevant. If a subreddit has strict self-promotion rules, skip it entirely and focus on subreddits that welcome recommendations.

### Credits running out too fast
**Symptom**: Credit balance depletes before the end of the billing period
**Cause**: Running too many searches or generating comments for low-quality leads
**Solution**: Be selective about which threads you generate comments for — skip threads with low engagement or where the discussion is already stale. Focus your credits on high-intent threads where someone is actively asking for recommendations. Purchase additional credits or upgrade if your usage consistently exceeds your plan.

### No leads found for your product
**Symptom**: SocListener returns zero or very few leads
**Cause**: Product description too narrow, targeting a niche with low Reddit activity, or wrong terminology
**Solution**: Broaden your product description — describe the problem broadly, not just your specific solution. Check that your target audience actually uses Reddit (some B2B verticals are under-represented). Try using the language your potential customers use, not your marketing copy.
