---
name: sales-threadradar
description: "ThreadRadar platform help — Reddit and Quora keyword monitoring with AI-drafted replies for lead generation and brand engagement. Use when ThreadRadar keyword alerts are returning too many irrelevant threads, AI-suggested replies sound generic and get downvoted, you want to monitor competitor mentions on Reddit and Quora, email alerts are too frequent or not triggering for important threads, you're trying to decide between ThreadRadar and KeyMentions for Reddit engagement, or you need to set up multi-project monitoring for different products. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in ThreadRadar — e.g., 'AI replies sound too generic']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# ThreadRadar Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, filters)
   - B) AI reply quality (tone, personalization, talking points)
   - C) Managing alerts (too many, too few, wrong threads)
   - D) Multi-project setup
   - E) Comparing ThreadRadar to alternatives
   - F) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial (7 days)
   - B) Basic ($19.95/mo — 10 keywords, 100 AI replies, 1 project)
   - C) Pro ($39.95/mo — 50 keywords, 500 AI replies, 3 projects)

3. **What's your goal?**
   - A) Brand monitoring (track mentions of my brand/product)
   - B) Lead generation (find people asking for solutions I offer)
   - C) Competitor monitoring (track what people say about competitors)
   - D) Content ideas (find trending discussions in my niche)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit/Quora) → `/sales-social-listening [question]`
- Reddit monitoring with API/webhooks/MCP access → `/sales-octolens [question]`
- Reddit monitoring with competitive intelligence and Share of Voice → `/sales-threadlytics [question]`
- Reddit monitoring with auto-publish (not just AI drafts) → `/sales-keymentions [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — ThreadRadar platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, keyword strategy, AI reply customization, and alert management.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — use buying-intent phrases, not single words
2. **AI reply quality** — customize tone and talking points per project, always edit before posting
3. **Alert management** — adjust keyword specificity to control volume
4. **Account safety** — never post AI replies verbatim; personalize to avoid spam detection

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about Reddit's anti-spam enforcement that changes frequently.*

- **No API or integrations.** ThreadRadar is entirely UI-based. You cannot export data, set up webhooks, or connect to CRM/Slack. If you need programmatic access, use Octolens or Syften instead.
- **AI replies are drafts only.** ThreadRadar drafts replies but does not auto-publish them. You must manually copy and post on Reddit/Quora. This is safer than auto-publish but slower.
- **Reddit and Quora only.** Does not monitor X, LinkedIn, HN, GitHub, or news. If you need broader coverage, pair with another tool or switch to a multi-platform option.
- **Keyword limits are tight on Basic.** 10 keywords fills fast if you track brand + competitors + use cases. Plan keywords carefully or upgrade to Pro (50 keywords).
- **AI replies still sound AI-generated.** Redditors spot generic "As someone who..." patterns instantly. Always rewrite the opening, add specific thread context, and match the subreddit's tone before posting.
- **No analytics or reporting.** No sentiment, no Share of Voice, no engagement tracking. It's a monitoring + reply drafting tool only.
- **7-day trial is short.** You won't get meaningful data in 7 days for low-volume keywords. Test with high-traffic keywords during the trial to evaluate quality.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-keymentions` — KeyMentions platform help — Reddit keyword monitoring with AI comment generation and auto-publish for lead generation
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring with 500M+ indexed conversations, Share of Voice, SERP tracking
- `/sales-octolens` — Octolens platform help — developer-first social listening with Reddit + GitHub + HN + API/MCP on all plans
- `/sales-syften` — Syften platform help — AI-filtered keyword monitoring across Reddit, HN, X, Bluesky, GitHub, 15+ community platforms
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up Reddit monitoring for a SaaS product
**User says**: "I just launched an invoicing tool and want to find Reddit threads where people ask for recommendations"
**Skill does**:
1. Reads platform guide for keyword strategy
2. Suggests keywords: "invoicing tool recommendation", "best invoice software", "looking for invoicing", competitor names like "FreshBooks alternative"
3. Recommends using a dedicated project for this product
4. Warns about editing AI replies before posting to avoid spam detection
**Result**: Monitoring configured with intent-based keywords

### Example 2: AI replies sound too generic
**User says**: "The AI-suggested replies all sound the same and don't feel authentic"
**Skill does**:
1. Reads platform guide AI reply section
2. Identifies likely causes: talking points too vague, tone setting not specific enough
3. Recommends: update talking points with specific product benefits and use cases, set tone to match target subreddits, always add a personal hook referencing the thread's specific question
4. Suggests a before/after example showing personalization
**Result**: Clear improvement strategy for reply quality

### Example 3: Too many irrelevant alerts
**User says**: "I'm getting 50 email alerts a day and most are not relevant to my product"
**Skill does**:
1. Reads platform guide alert management section
2. Identifies likely causes: keywords too broad (e.g., "marketing" instead of "email marketing tool for startups")
3. Recommends: use multi-word phrases, add product category context, remove single-word keywords
4. Notes Pro plan gets real-time delivery which may mean more alerts — adjust email frequency if available
**Result**: Alert volume reduced through keyword refinement

## Troubleshooting

### Getting alerts for threads that aren't relevant
**Symptom**: Email alerts fire for threads that have nothing to do with your product or niche
**Cause**: Keywords are too generic (e.g., "tool" or "software" match everything)
**Solution**: Use multi-word intent phrases like "best project management tool for small teams" instead of "project management". Add your product category. Review the first 20 alerts and identify recurring false positive patterns, then refine keywords to exclude those topics.

### AI replies get downvoted or called out as bot content
**Symptom**: When you post AI-suggested replies (even edited), users react negatively
**Cause**: AI replies follow recognizable patterns — "I've been using X and it's been a game-changer" or "As someone who..." are red flags for experienced Redditors
**Solution**: Never use the opening sentence from the AI draft. Start with something specific to the thread ("I had the same issue with [specific thing OP mentioned]"). Remove superlatives. Add a limitation or caveat about your product. Match the subreddit's communication style (casual in r/startups, technical in r/selfhosted).

### Missing threads you know exist
**Symptom**: You find relevant threads manually that ThreadRadar didn't alert you about
**Cause**: Keywords don't match the phrasing used in those threads, or the thread appeared on a subreddit ThreadRadar doesn't index
**Solution**: Check the exact phrasing used in the missed threads and add those as keywords. Add common misspellings and abbreviations. If ThreadRadar consistently misses certain subreddits, note that its coverage may not include all subreddits and consider supplementing with F5Bot (free) or Syften for broader coverage.
