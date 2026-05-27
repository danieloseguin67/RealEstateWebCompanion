---
name: sales-leadmore
description: "Leadmore AI platform help — safe Reddit marketing via managed high-karma accounts with subreddit discovery, lead tracking, AI compliance checks, and pay-per-post pricing. Use when Leadmore costs are escalating beyond budget at $4/comment and $7/post, managed account posts keep getting removed despite compliance checks, subreddit discovery recommendations don't match your product niche, you can't export leads from Leadmore to your CRM or email tool, the 10-30 minute publishing delay is making you miss time-sensitive threads, or you want to compare Leadmore vs ReplyAgent vs Redreach vs CrowdReply for managed Reddit posting. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Leadmore AI — e.g., 'costs are too high' or 'posts keep getting removed']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# Leadmore AI Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Subreddit discovery and targeting strategy
   - B) Content publishing and compliance issues
   - C) Lead tracking and qualification
   - D) Cost optimization (pay-per-post model)
   - E) Managed account posting concerns
   - F) Comparing Leadmore to alternatives
   - G) Something else — describe it

2. **How are you using Leadmore?**
   - A) Just started ($9.90 trial)
   - B) Active — Standard or Professional plan
   - C) Enterprise plan
   - D) Evaluating — haven't signed up yet

3. **What's your goal?**
   - A) Lead generation (find people looking for solutions)
   - B) Brand awareness (participate in relevant discussions)
   - C) Safe Reddit marketing (avoid account bans)
   - D) Content distribution (drive traffic from Reddit)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit) → `/sales-social-listening [question]`
- Managed Reddit posting at lower per-post cost → `/sales-replyagent [question]`
- Reddit lead gen with Chrome extension DM automation → `/sales-redreach [question]`
- Reddit lead gen with buyer intent classification → `/sales-subredditsignals [question]`
- Reddit + Twitter AI replies with your own accounts → `/sales-replyguy [question]`
- AI search visibility tracking + managed Reddit engagement → `/sales-crowdreply [question]`
- Reddit monitoring with AI comment generation and auto-publish → `/sales-keymentions [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — Leadmore AI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, managed accounts, subreddit discovery, lead tracking, compliance system.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Subreddit targeting** — start with 3-5 subreddits from Leadmore's recommendations, validate fit before scaling
2. **Cost control** — calculate monthly spend at your volume; compare per-post economics vs flat-rate alternatives
3. **Content quality** — provide detailed product descriptions; Leadmore's compliance checker catches rule violations but not quality
4. **Lead qualification** — use the daily lead tracking emails to prioritize high-intent conversations
5. **Safety model** — managed accounts protect your personal Reddit identity but you can't build community reputation

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about pricing and managed accounts.*

- **Pay-per-post costs escalate fast.** At $4/comment and $7/post, moderate usage (15 posts + 40 comments) runs ~$265/mo. Heavy users can exceed $500/mo. Calculate your projected monthly spend before committing.
- **You don't own the posting accounts.** Leadmore uses platform-managed high-karma accounts. You can't build karma, reputation, or community trust on these accounts.
- **10-30 minute publishing delay.** Content goes through compliance checks before posting. You'll miss time-sensitive threads that need immediate replies.
- **No CRM or email integration.** Leads found by Leadmore stay in the platform. No export, no API, no Zapier, no webhooks. Manual copy-paste is the only way to get leads into your pipeline.
- **No bulk scheduling.** You can't queue up a week of posts. Each post/comment is triggered individually.
- **Reddit-only platform.** Does not monitor X, LinkedIn, HN, or other platforms. Pair with another tool for multi-platform coverage.
- **Refund only within 10 minutes.** If a post is removed after 10 minutes, you still pay. This differs from ReplyAgent's 30-day warranty.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel
- `/sales-replyagent` — ReplyAgent — managed Reddit posting at $3/comment with API, UTM tracking, 30-day removal warranty
- `/sales-redreach` — Redreach — Reddit lead gen with keyword auto-discovery, Google-ranking posts, Chrome extension DMs
- `/sales-crowdreply` — CrowdReply — AI search visibility tracking + managed Reddit engagement, $99-499+/mo
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead gen with buyer intent classification
- `/sales-replyguy` — ReplyGuy — AI replies across Twitter, Reddit, LinkedIn with auto-reply
- `/sales-keymentions` — KeyMentions — Reddit monitoring with AI comment generation and auto-publish
- `/sales-soclistener` — SocListener — Reddit lead gen with AI context matching, comment/DM drafting
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Costs escalating beyond budget
**User says**: "I'm spending over $400/month on Leadmore and not sure I'm getting enough ROI"
**Skill does**:
1. Reads platform guide for pricing breakdown
2. Analyzes per-post economics — at $4/comment, 100 comments/mo = $400
3. Compares flat-rate alternatives: ReplyAgent ($3/comment), Subreddit Signals ($29-59/mo flat), Leadlee ($12/mo)
4. Suggests reducing volume to highest-performing subreddits and tracking conversion per subreddit
**Result**: Cost reduction plan with alternative platform options

### Example 2: Subreddit recommendations don't match product
**User says**: "Leadmore recommended subreddits that have nothing to do with my B2B SaaS product"
**Skill does**:
1. Reads platform guide for subreddit discovery
2. Checks how product details were entered — vague descriptions produce poor recommendations
3. Suggests rewriting the product description with specific ICP, use cases, and competitor names
4. Recommends manually validating each subreddit before posting
**Result**: Better subreddit targeting after improved product context

### Example 3: Getting leads into CRM
**User says**: "How do I get the leads Leadmore finds into my HubSpot CRM?"
**Skill does**:
1. Reads platform guide for integration capabilities
2. Notes Leadmore has no API, webhooks, or native CRM connectors
3. Suggests manual export workflow: screenshot lead details, add to CRM manually
4. Recommends evaluating CatchIntent or Buska if CRM integration is critical
**Result**: Clear understanding that integration requires manual work or a different tool

## Troubleshooting

### Posts removed despite compliance checks
**Symptom**: Leadmore's compliance check passes but posts still get removed by moderators
**Cause**: Compliance checks verify subreddit rules but can't predict moderator judgment. Some subreddits aggressively remove promotional content regardless of rule compliance.
**Solution**: Check which subreddits have highest removal rates. Drop subreddits with strict anti-promotion cultures. Ensure content leads with genuine value before any product mention. Reduce posting frequency in sensitive communities.

### Lead tracking delivers low-quality leads
**Symptom**: Daily lead emails contain mostly irrelevant or low-intent conversations
**Cause**: Keywords too broad, or AI scoring isn't matching your specific product niche
**Solution**: Narrow keywords to specific pain points your product solves (not broad industry terms). Review the first 20 leads manually and note patterns in false positives. Adjust keyword strategy to match the language your actual customers use.

### No leads showing up despite active keywords
**Symptom**: Keyword monitoring is configured but lead emails are empty
**Cause**: Keywords too niche, or target subreddits have low posting volume
**Solution**: Broaden keywords slightly — try pain-point language instead of product category terms. Check target subreddit posting frequency (some niche subreddits get <5 posts/day). Consider adding adjacent subreddits where your audience discusses related problems.
