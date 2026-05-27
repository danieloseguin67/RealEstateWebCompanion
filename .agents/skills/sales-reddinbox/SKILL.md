---
name: sales-reddinbox
description: "Reddinbox platform help — AI-powered audience intelligence across Reddit, X, Bluesky, Hacker News, YouTube, Facebook, Quora. Natural language queries, purchase intent scoring (1-100), AI spam/bot/slop filtering, market digests, suggested replies. Use when Reddinbox market briefs aren't surfacing actionable pain points, intent scoring is flagging irrelevant conversations as high-intent, you want to validate a startup idea using community conversations, AI filtering is suppressing mentions you actually want to see, you need to research what a target audience is actually saying about a problem before building, you're looking for a GummySearch or SparkToro replacement for community audience research, or you want to find high-intent Reddit/HN threads to engage with. Do NOT use for social listening strategy across tools (use /sales-social-listening), choosing between social listening platforms (use /sales-social-listening), or Reddit auto-reply and comment publishing (use /sales-keymentions)."
argument-hint: "[describe what you need help with in Reddinbox — e.g., 'market briefs are too generic' or 'intent scoring seems off']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, audience-intelligence, reddit-monitoring, platform]
---

# Reddinbox Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring queries (natural language, topics, competitors)
   - B) Tuning intent scoring / filtering relevance
   - C) Market briefs aren't actionable enough
   - D) Validating a startup idea or product concept
   - E) Finding high-intent threads to engage with
   - F) Understanding pricing / plan limits
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial (no credit card)
   - B) Starter ($39/mo — 3 market briefs, standard research)
   - C) Pro ($99/mo — unlimited conversations, 5 market briefs, extended research)

3. **What's your primary goal?**
   - A) Pain point discovery (what are people complaining about?)
   - B) Competitive intelligence (what do people say about competitors?)
   - C) Idea validation (is there real demand for this?)
   - D) Lead generation (find high-intent prospects)
   - E) Content research (what topics resonate?)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring with Boolean search → `/sales-social-listening [question]`
- Reddit auto-reply or comment publishing → `/sales-keymentions [question]`
- Reddit monitoring with API/webhooks/MCP → `/sales-octolens [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — Reddinbox platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, query strategy, intent scoring, and market brief optimization.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Query design** — use natural language describing the problem your audience has, not brand names
2. **Intent scoring** — focus on 70+ scores for active buyers; 40-70 for research phase
3. **Market briefs** — refine topic scope if briefs are too generic; narrow by audience segment
4. **Idea validation** — look for frequency and urgency signals, not just existence of mentions

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about platform capabilities that may change.*

- **No API, webhooks, or integrations.** Reddinbox is entirely UI-driven. You cannot export data programmatically, connect to CRM/Slack, or build automations. If you need programmatic access, use Octolens or Syften instead.
- **No Boolean search.** Queries are natural language only. You cannot use AND/OR/NOT operators. This is simpler but less precise — if you need Boolean control, use Awario, Syften, or Brand24.
- **Market brief limits are hard caps.** Starter gets 3 briefs, Pro gets 5. Briefs reset monthly. If you burn them on vague topics, you've wasted them for the cycle.
- **AI filtering may be over-aggressive.** The spam/AI-slop filter can suppress legitimate mentions that happen to match AI-content patterns. Check manually if you suspect you're missing relevant conversations.
- **No sentiment scoring.** Unlike traditional social listening tools, Reddinbox scores by purchase intent (1-100) rather than positive/negative sentiment. If you need sentiment analysis, pair with another tool.
- **Quora is "coming soon" indefinitely.** Don't choose Reddinbox based on Quora coverage — it's not live yet.
- **No historical data export.** Insights disappear after your subscription ends. Save/screenshot anything important.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-keymentions` — KeyMentions platform help — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-octolens` — Octolens platform help — developer-first social listening with Reddit + GitHub + HN + API/MCP on all plans
- `/sales-syften` — Syften platform help — AI-filtered keyword monitoring across 15+ community platforms, REST API, webhooks
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring with 500M+ indexed conversations, Share of Voice
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Validate a startup idea using community conversations
**User says**: "I want to know if people actually need an AI tool that summarizes Slack threads"
**Skill does**:
1. Reads platform guide for query strategy
2. Suggests queries: "Slack threads are overwhelming", "too many Slack messages", "miss important Slack conversations"
3. Recommends checking intent scores — 70+ signals active solution-seeking
4. Advises using market brief to synthesize pain point patterns across Reddit, HN, and X
**Result**: Structured validation with frequency and urgency signals from real conversations

### Example 2: Intent scoring flagging irrelevant threads
**User says**: "I keep getting high intent scores for threads that have nothing to do with my product"
**Skill does**:
1. Reads platform guide troubleshooting
2. Identifies likely cause: queries are too broad or matching adjacent topics
3. Recommends narrowing queries to include specific problem language, not category terms
4. Suggests using market brief to identify which sub-topics are generating false positives
**Result**: Refined queries producing more accurate intent signals

### Example 3: Market briefs are too generic
**User says**: "My market briefs just tell me obvious things I already know"
**Skill does**:
1. Reads platform guide on brief optimization
2. Identifies likely cause: topic is too broad (e.g., "CRM" instead of "CRM for solo consultants who hate data entry")
3. Recommends: narrow by audience segment, add competitor names, focus on a specific pain point
4. Notes Pro plan gives 5 briefs vs Starter's 3 — suggests saving briefs for narrower, more specific queries
**Result**: Actionable brief optimization strategy

## Troubleshooting

### Monitoring returns conversations from unrelated communities
**Symptom**: Getting insights from subreddits or platforms that have nothing to do with your target audience
**Cause**: Natural language queries are interpreted broadly without platform/community constraints
**Solution**: Make queries more specific by including audience identifiers ("SaaS founders struggling with...", "freelance designers looking for..."). If a particular platform is consistently irrelevant, note it and focus your analysis on the platforms that matter.

### AI filtering suppressing relevant mentions
**Symptom**: You know conversations exist (you've seen them manually) but Reddinbox isn't surfacing them
**Cause**: The AI spam/slop filter is classifying legitimate posts as low-quality, possibly because they contain links, use promotional language, or are short
**Solution**: Check if the post matches any AI-content or spam patterns (affiliate links, promotional tone, very short posts). If legitimate posts are consistently filtered, contact support — the filter thresholds may need adjustment for your use case.

### Intent scores don't correlate with actual buying readiness
**Symptom**: High-intent-scored threads (80+) are just people venting, not actually looking for solutions
**Cause**: The intent model may weight urgency language ("I need", "help me") that correlates with venting as much as buying
**Solution**: Use intent scores as a first filter, not a final qualifier. Cross-reference high-intent threads with: (1) thread recency, (2) whether the poster asked for specific recommendations, (3) whether they mentioned budget or timeline. True buying intent usually includes specificity about requirements.
