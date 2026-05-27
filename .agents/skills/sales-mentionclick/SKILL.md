---
name: sales-mentionclick
description: "mention.click platform help — AI-powered Reddit intelligence with semantic vectorization for lead discovery, 0-10 relevance scoring, auto-keyword extraction from product description, subreddit targeting, sentiment analysis, AI reply generation. Use when mention.click isn't surfacing relevant Reddit conversations for your product, similarity scores don't match actual lead quality, AI-extracted keywords from your URL don't reflect how Reddit users talk about your problem, you want to reduce noise and only see high-scoring matches, AI reply suggestions sound too promotional for Reddit, or you're comparing mention.click vs Redreach vs Reppit AI vs Subreddit Signals for Reddit lead gen. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit marketing with managed accounts (use /sales-replyagent or /sales-leadmore)."
argument-hint: "[describe what you need help with in mention.click — e.g., 'similarity scores seem off' or 'too many low-quality matches']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, platform]
---

# mention.click Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Match quality — similarity scores don't reflect real leads
   - B) Reply quality — AI suggestions sound too promotional
   - C) Keyword/subreddit targeting — too much noise or missing good conversations
   - D) Setup — just getting started with mention.click
   - E) Comparing mention.click to other Reddit lead gen tools
   - F) Something else — describe it

2. **Current setup?**
   - A) Just signed up / configuring
   - B) Running but too much noise
   - C) Running but leads aren't converting
   - D) Evaluating vs other tools

**If the user's request already provides enough context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit lead gen with managed accounts → `/sales-replyagent [question]` or `/sales-leadmore [question]`
- Reddit monitoring with API/webhooks → `/sales-redship [question]` or `/sales-octolens [question]`
- Reddit thread analysis for market research → `/sales-reddily [question]`
- AI search visibility via Reddit → `/sales-reddgrow [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — mention.click platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, vectorization scoring, keyword extraction, reply generation.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

1. **Improve match quality** — refine your product description (the AI extracts keywords from it); prune irrelevant subreddits; focus on similarity scores 8.0+ for outreach
2. **Better replies** — never post AI drafts verbatim; rewrite in first person with genuine experience; lead with value before any product mention
3. **Reduce noise** — review rejected matches for patterns; remove broad subreddits where general discussion dominates buying conversations
4. **Account safety** — mention.click provides reply suggestions but you post manually; build karma before engaging in target subreddits

If you discover a tip not in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No confirmed API, webhooks, or MCP server.** mention.click is dashboard-only. SoftwareSuggest lists "API Access" but the profile is unclaimed — verify directly with mention.click support.
- **No confirmed Zapier/Make integration.** Cannot trigger automations from discovered matches.
- **Pricing is JS-rendered.** SoftwareSuggest lists $99/mo starting price with a 7-day trial, but exact tiers and limits may differ. Verify on mention.click before purchasing.
- **Semantic scoring ≠ buying intent.** The 0-10 similarity score measures how well a conversation matches your product description, not whether the poster is ready to buy. High similarity + low engagement may still be a weak lead.
- **AI reply drafts need heavy editing.** Reddit communities flag promotional content aggressively. Always rewrite before posting.
- **No CRM export.** No confirmed way to bulk-export discovered matches. Manual copy-paste workflow required.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence
- `/sales-redreach` — AI Reddit lead gen with keyword auto-discovery, Google-ranking posts, webhooks
- `/sales-subredditsignals` — Reddit lead gen with 7-dimension buyer intent classification, voice training
- `/sales-reppit` — Reddit-only lead gen with URL-based keyword discovery, intent scoring, ~$25-29/mo
- `/sales-leadlee` — Cheapest Reddit lead gen with AI replies ($12/mo), quality scoring
- `/sales-reddgrow` — Reddit marketing for AI search visibility (GEO), REST API, CLI
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Similarity scores surface irrelevant conversations
**User says**: "mention.click shows 8+ scores for posts that are just general discussions about my industry, not people looking for solutions"
**Skill does**:
1. Reads platform-guide.md for vectorization scoring mechanics
2. Explains that similarity measures product-conversation semantic match, not buying intent
3. Recommends refining product description to focus on specific pain points rather than broad category terms
4. Suggests pruning high-volume general subreddits and targeting niche communities
**Result**: Higher-quality match feed with more actionable leads

### Example 2: Getting leads into a CRM
**User says**: "How do I get mention.click leads into HubSpot automatically?"
**Skill does**:
1. Reads platform-guide.md integration section
2. Explains no confirmed API, webhooks, or Zapier — dashboard is the only confirmed interface
3. Suggests manual daily review workflow: filter 8.0+ scores, batch-enter thread URLs and details into CRM
4. For automation needs, recommends evaluating RedShip or Buska which have API/webhook access
**Result**: Manual workaround established, API-capable alternatives flagged

### Example 3: AI reply suggestions getting downvoted
**User says**: "I used mention.click's reply suggestions and got downvoted to oblivion"
**Skill does**:
1. Reads platform-guide.md reply quality section
2. Explains Reddit norms: AI-sounding replies get flagged fast
3. Recommends rewriting completely in first person, leading with genuine advice, mentioning product only if directly relevant
4. Suggests building karma in target subreddits before engaging with leads
**Result**: Improved reply survival rate through community-appropriate engagement

## Troubleshooting

### Too many low-quality matches despite high similarity scores
**Symptom**: Matches scored 7-10 turn out to be general discussions, not buying conversations
**Cause**: Product description is too broad, causing semantic matches on category terms rather than pain-point language
**Solution**: Rewrite your product description to focus on the specific problems your product solves, using the language Reddit users actually use. Remove subreddits where educational/general discussion dominates. Focus outreach only on 8.0+ scores with strong engagement metrics.

### AI reply suggestions sound too promotional
**Symptom**: Suggested replies read like sales pitches and get downvoted or removed by mods
**Cause**: AI optimizes for product mention relevance rather than community value
**Solution**: Use AI drafts as topic inspiration only — never copy-paste. Rewrite in first person, lead with 2-3 sentences of genuine advice based on real experience. Mention your product only when directly asked or when it genuinely solves the poster's problem.

### Auto-extracted keywords don't match Reddit language
**Symptom**: Keywords generated from your product URL use marketing language that doesn't match how Reddit users discuss the problem
**Cause**: AI extracts keywords from website copy, which is optimized for SEO and marketing, not casual Reddit conversation
**Solution**: Keep 2-3 of the best auto-extracted keywords, then manually browse target subreddits to find the exact phrases and pain points real users mention. Add those as custom keywords to supplement the AI-generated ones.
