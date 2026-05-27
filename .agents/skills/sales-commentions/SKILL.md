---
name: sales-commentions
description: "Commentions platform help — automated brand mention commenting across LinkedIn, X, YouTube, Quora with AI comment generation, post discovery, and engagement analytics. Use when Commentions comments sound too promotional or spammy, you want to optimize keyword targeting for higher-quality post matches, engagement metrics are low and comments aren't driving clicks, you need to set up brand voice and tone for natural-sounding comments, you're worried about account safety with automated commenting, or you want to compare Commentions vs PowerIn vs ReplyGuy vs ParseStream for auto-commenting. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit-only engagement (use /sales-replyguy or /sales-replyagent)."
argument-hint: "[describe what you need help with in Commentions — e.g., 'comments sound like ads']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, comment-automation, platform]
---

# Commentions Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keywords and targeting for post discovery
   - B) Improving comment quality (too generic, too promotional)
   - C) Brand voice and tone configuration
   - D) Engagement analytics and click tracking
   - E) Account safety and compliance
   - F) Scaling volume (choosing the right plan)
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial (240 mentions)
   - B) Starter ($59/mo — 20 mentions/day)
   - C) Growth ($99/mo — 80 mentions/day)
   - D) Dominate ($149/mo — 160 mentions/day)
   - E) Evaluating — haven't signed up yet

3. **Which platforms are you targeting?**
   - A) LinkedIn
   - B) X (Twitter)
   - C) YouTube
   - D) Quora
   - E) Multiple — which ones?

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform social listening strategy → `/sales-social-listening [question]`
- Reddit-specific reply automation → `/sales-replyguy [question]`
- Reddit managed posting with human writers → `/sales-replymer [question]`
- Reddit + Quora keyword monitoring with AI replies → `/sales-threadradar [question]`
- Multi-platform AI replies with auto-post → `/sales-parsestream [question]`
- LinkedIn signal intelligence and engagement → `/sales-trigify [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Commentions platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, workflow setup, platform coverage, analytics.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — start with 5-10 high-intent keywords per workflow; add niche terms, not broad ones
2. **Comment quality** — set detailed brand profiles with tone examples; avoid product-first language
3. **Platform selection** — LinkedIn for B2B/professional, YouTube for content-heavy niches, Quora for long-tail SEO, X for real-time conversations
4. **Volume optimization** — 20-50 mentions/day is often enough for solopreneurs; scale only after validating click-through
5. **Safety** — rely on Commentions' built-in pacing and variation; don't connect accounts used for manual engagement simultaneously

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan limits and platform coverage.*

- **No API, no webhooks, no Zapier.** Commentions is UI-only. You cannot programmatically manage workflows, pull analytics, or integrate with other tools. All configuration is manual dashboard work.
- **No Reddit support.** Despite competing with ReplyGuy and similar tools, Commentions does not support Reddit. Use a dedicated Reddit tool if that's your primary channel.
- **Volume is per-day, not rollover.** Starter gets 20 mentions/day — unused daily quota doesn't carry over. Plan daily volume based on actual need.
- **You don't approve comments before posting.** The AI generates and posts autonomously. Set your brand voice carefully upfront — there's no approval queue.
- **LinkedIn automation carries inherent risk.** Commentions claims API-compliant posting and zero bans, but LinkedIn actively restricts automation. Monitor your account health.
- **All plans have identical features.** The only difference between tiers is daily mention volume. No feature gating.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-replyguy` — ReplyGuy — AI replies across Twitter, Reddit, LinkedIn with auto-reply
- `/sales-parsestream` — ParseStream — multi-platform keyword monitoring with AI reply drafts and auto-reply
- `/sales-replymer` — Replymer — managed Reddit/X reply marketing with human-written replies
- `/sales-replyagent` — ReplyAgent — Reddit marketing with managed account posting, AI comments
- `/sales-threadradar` — ThreadRadar — Reddit + Quora keyword monitoring with AI-drafted replies
- `/sales-trigify` — Trigify — LinkedIn signal intelligence with AI workflows
- `/sales-devta` — Devta — AI Networking Agent for proactive community engagement
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Comments sound like ads
**User says**: "My Commentions comments keep leading with my product name — they look like spam"
**Skill does**:
1. Reads platform guide for brand profile setup
2. Reviews the brand voice configuration — likely too product-focused
3. Suggests rewriting the brand profile to emphasize problems solved, not features; set tone to conversational/helpful
4. Recommends starting with value-first language and only subtly mentioning the brand
**Result**: Comments lead with genuine help, brand mention feels natural

### Example 2: Low click-through rate
**User says**: "I'm getting impressions but almost no clicks from my Commentions comments"
**Skill does**:
1. Reads platform guide for analytics section
2. Checks keyword targeting — likely too broad, matching low-intent posts
3. Suggests narrowing keywords to problem-specific phrases where the user's product is a genuine answer
4. Recommends reviewing which platforms drive the best CTR and focusing volume there
**Result**: Better keyword targeting with improved click-through rates

### Example 3: Choosing between comment automation tools
**User says**: "Should I use Commentions or ReplyGuy for automated brand mentions?"
**Skill does**:
1. Reads platform guide for positioning and comparison
2. Explains key differences: Commentions covers LinkedIn/X/YouTube/Quora with full auto-posting; ReplyGuy covers Twitter/Reddit/LinkedIn with semi-manual posting
3. Notes Commentions has no Reddit support; ReplyGuy has no YouTube/Quora
4. Recommends based on user's target platforms and automation comfort level
**Result**: Clear comparison matched to user's specific platform needs

## Troubleshooting

### Comments not generating engagement
**Symptom**: Comments posted but getting no likes, replies, or clicks
**Cause**: Keywords too broad, targeting low-relevance posts, or brand voice set too generically
**Solution**: Review recent comments in the dashboard. Identify which keywords produced the lowest-engagement comments and either refine or remove them. Narrow targeting to high-engagement posts in your specific niche. Update your brand profile with more specific tone and topic guidance.

### Worried about account restrictions
**Symptom**: Concerned about LinkedIn or X flagging the account for automated commenting
**Cause**: Natural concern with any automation tool, especially on LinkedIn
**Solution**: Commentions uses API-compliant posting with random delays and tone variation to avoid detection. Keep daily volume moderate (start with 20-30/day), don't run other automation tools on the same accounts simultaneously, and monitor account health regularly. If a platform sends a warning, pause automation immediately.

### Comments appearing on irrelevant posts
**Symptom**: Brand mentions showing up in threads that have nothing to do with your niche
**Cause**: Keywords are too generic or overlapping with unrelated topics
**Solution**: Review the post discovery results in the dashboard. Add negative keywords for recurring off-topic matches. Use more specific multi-word keyword phrases instead of single broad terms. Consider platform-specific keyword strategies since the same keyword may match differently on LinkedIn vs YouTube.
