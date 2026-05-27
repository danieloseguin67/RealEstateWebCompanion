---
name: sales-leado
description: "Leado platform help — AI-powered Reddit lead generation with buying intent scoring (0-100), AI contextual reply drafting, Karma Builder, Viral Template Library, compliance engine, multi-subreddit monitoring. Use when Leado isn't finding relevant Reddit leads for your product, opportunity scores don't match what you'd consider a real prospect, AI-generated replies sound generic and need editing before posting, Karma Builder isn't building enough credibility before you start engaging, you want to use the Viral Template Library but posts aren't getting traction, or you're comparing Leado vs Leadlee vs Bazzly vs KeyMentions vs SocListener for Reddit lead generation. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Leado]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, lead-generation, platform]
---
# Leado Platform Help

Helps the user with Leado platform questions — from lead discovery setup and AI reply tuning through Karma Builder, Viral Template Library, opportunity scoring, and compliance.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Leado do you need help with?**
   - A) Lead discovery — finding relevant Reddit leads, tuning keywords
   - B) AI replies — improving reply quality, customizing tone
   - C) Karma Builder — building Reddit credibility before engaging
   - D) Viral Template Library — creating posts that get traction
   - E) Opportunity scoring — understanding 0-100 scores, filtering leads
   - F) Compliance — avoiding bans, following community guidelines
   - G) Account/billing — plan features, upgrading
   - H) Something else — describe it

2. **What plan are you on?**
   - A) Free ($0/mo — 10 leads, 10 subreddits, 1 product)
   - B) Pro ($29.99/mo — unlimited leads, 15 subreddits)
   - C) Enterprise (custom — 30+ subreddits, multiple products)

3. **What are you trying to accomplish?** (describe your specific goal)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring strategy across tools → `/sales-social-listening [question]`
- Prospect list building → `/sales-prospect-list`
- Outbound cadence or sequence strategy → `/sales-cadence`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — Leado platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, workflow recipes, and integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Lead discovery** — optimize product description and URL, refine what Leado monitors, improve lead relevance
2. **Reply quality** — customize AI reply context, add product-specific details, always edit before posting
3. **Karma building** — use Karma Builder before engaging, establish credibility in target subreddits
4. **Safety** — follow Reddit TOS, space out replies, avoid self-promotion rules, use compliance engine
5. **Plan optimization** — decide when to upgrade from Free to Pro

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and Reddit safety that may be outdated.*

- **Free tier is a trial, not a plan.** 10 leads per month with 1 product slot and 10 subreddits. Enough to evaluate lead quality but not for ongoing lead gen. Expect to upgrade to Pro ($29.99/mo) quickly.
- **No public API or webhooks.** Leado claims Slack, Discord, and email notifications but has no documented API or webhook endpoints. You cannot export leads programmatically or integrate into automation pipelines.
- **Opportunity scoring is opaque.** The 0-100 score with badges (High, Medium, Low) isn't explained methodologically. Calibrate by reviewing the first 20-30 leads and noting which score ranges produce genuine prospects.
- **Karma Builder is essential before engaging.** Posting promotional replies from a fresh Reddit account is the fastest path to a ban. Use Karma Builder to establish credibility first — this takes days, not hours.
- **Pro features gate real value.** Google indexing check, Advanced Post Generation, Advanced Karma Builder, and Viral Template Library are all Pro-only. The free plan tests lead discovery quality, not the full workflow.
- **Hourly scan frequency.** Leads refresh hourly (upgraded from every 2 hours in Dec 2025). For time-sensitive Reddit threads, this may still be too slow — manual monitoring may catch opportunities faster.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, tool comparison across all platforms
- `/sales-leadlee` — Leadlee — cheapest Reddit lead generation with AI replies ($12/mo), quality scoring, Chrome extension
- `/sales-bazzly` — Bazzly — Reddit lead generation with intent scoring, Chrome extension, Reply Boost
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-soclistener` — SocListener — Reddit lead gen with AI context matching, personalized comment/DM drafting
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead generation with 7-dimension intent scoring, voice-trained Comment Builder
- `/sales-redship` — RedShip — Reddit monitoring with relevance scoring, SEO post discovery, API + webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Leads aren't relevant
**User says**: "Leado keeps finding Reddit threads that mention my keywords but the people aren't actually looking for a solution like mine"
**Skill does**:
1. Reviews how the user configured their product URL and description in Leado
2. Suggests refining the product description to be more specific about the problem they solve
3. Recommends filtering by opportunity score — focus on High and Medium-High badges
4. Advises checking which subreddits produce the best leads and dropping noisy ones
**Result**: User has a strategy for improving lead relevance

### Example 2: Building credibility before outreach
**User says**: "I just signed up for Leado Pro. How do I start replying to leads without getting my Reddit account banned?"
**Skill does**:
1. Explains that jumping straight into product replies from a new account triggers bans
2. Recommends using Karma Builder to generate genuine participation first
3. Suggests spending 1-2 weeks building karma in target subreddits before any promotional replies
4. Notes Reddit's self-promotion guidelines (10:1 ratio of genuine content to promotional)
**Result**: User has a credibility-building plan before engaging leads

### Example 3: Choosing the right plan
**User says**: "I'm on the free plan and already used my 10 leads. Is Pro worth $30/mo or should I try something cheaper?"
**Skill does**:
1. Confirms Free tier's 10-lead/mo cap — designed as a trial
2. Compares Pro ($29.99/mo, unlimited leads) against Leadlee ($12/mo, cheapest alternative) and KeyMentions ($39/mo, includes auto-publish)
3. Notes Pro unlocks Viral Template Library and Advanced Karma Builder — useful if lead quality was good during trial
4. Suggests evaluating whether the first 10 leads showed genuine prospects; if not, compare alternatives via `/sales-social-listening`
**Result**: User makes an informed upgrade decision

## Troubleshooting

### AI replies sound generic
**Symptom**: AI-generated replies are vague, don't mention your product naturally, or feel like templates
**Cause**: Leado's AI doesn't have enough context about your product's specific value proposition and use cases
**Solution**: Update your product description with specific pain points your product solves, key differentiators, and real customer language. Always edit AI drafts before posting — add a sentence that directly addresses the thread's specific question. Never post AI drafts verbatim.

### Opportunity scores seem random
**Symptom**: High-scoring leads (80+) aren't actually interested buyers, while genuinely interested threads score low
**Cause**: The opportunity scoring algorithm weighs signals that may not align with your specific market
**Solution**: Track your first 30 leads and note which score ranges actually convert to conversations. Create your own threshold — e.g., "only engage with 60+ scores in r/SaaS but 40+ in niche subreddits." Use scores as a filter, not as gospel.

### Reddit account getting flagged
**Symptom**: Comments removed by mods, shadowban warnings, or DM restrictions after using Leado
**Cause**: Posting replies too frequently, replies too promotional, or engaging before building enough karma
**Solution**: Use Karma Builder for at least 1-2 weeks before any promotional engagement. Follow Reddit's self-promotion guidelines. Space out replies — no more than 2-3 per day across different subreddits. Make replies genuinely helpful first, product mention second. Use the compliance engine to check replies before posting.
