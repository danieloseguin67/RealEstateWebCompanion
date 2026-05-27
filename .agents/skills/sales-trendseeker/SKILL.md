---
name: sales-trendseeker
description: "Trend Seeker platform help — Reddit-based business idea discovery and validation with evidence scoring, demand signals, and a public API. Use when you want to find validated business ideas from real Reddit conversations, the Idea Validator score doesn't make sense or feels too low for your concept, you need to search the Trend Seeker API for ideas programmatically, free tier ideas are too basic and you're deciding whether Pro is worth it, you're comparing Trend Seeker vs PainOnSocial vs Reddinbox vs BigIdeasDB for Reddit idea validation, or you want to validate a micro-SaaS concept against real user requests before building. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit keyword monitoring and alerts (use /sales-syften or /sales-keymentions)."
argument-hint: "[describe what you need help with in Trend Seeker]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, idea-validation, platform]
---
# Trend Seeker Platform Help

Helps the user with Trend Seeker platform questions — from idea discovery and validation scoring through API integration, Pro plan evaluation, and research methodology.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Trend Seeker do you need help with?**
   - A) Idea discovery — browsing and filtering validated ideas
   - B) Idea Validator — understanding or improving your validation score
   - C) API integration — querying ideas programmatically
   - D) Free vs Pro — deciding whether to upgrade
   - E) Research methodology — using Trend Seeker for market research
   - F) Something else — describe it

2. **Are you using the free tier or Pro?**
   - A) Free tier
   - B) Pro subscriber
   - C) Not signed up yet

3. **What are you trying to accomplish?** (describe your specific goal)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit keyword monitoring and alerts → `/sales-syften [question]` or `/sales-keymentions [question]`
- Reddit pain point scoring (frequency/severity) → `/sales-painonsocial [question]`
- Audience intelligence and demand research → `/sales-reddinbox [question]`
- Audience profiling (where audiences spend attention) → `/sales-sparktoro [question]`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — Trend Seeker platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, API details, data model, validation scoring, and integration recipes.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Idea discovery** — navigate categories, interpret evidence scores, identify high-signal ideas
2. **Validation scoring** — understand post volume vs idea similarity, interpret high/low scores
3. **API integration** — authenticate, query endpoints, handle pagination, build pipelines
4. **Free vs Pro** — compare field access, rate limits, validation quotas
5. **Research methodology** — combine Trend Seeker with other tools for complete validation

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about pricing and capabilities that may be outdated.*

- **Trend Seeker finds ideas, it doesn't monitor or alert.** It's a research database, not a real-time monitoring tool. If you need ongoing Reddit keyword alerts, pair with Syften or KeyMentions.
- **Free tier redacts key fields.** `solution_approach` and `why_now` are hidden for premium-tier ideas on the free plan. You see titles and basic scores but not the actionable detail.
- **Validation score combines two axes.** Post Volume (0-50) measures how many users requested something similar. Idea Similarity (0-50) measures how closely existing solutions match. High volume + low similarity = underserved market.
- **Pro pricing is not publicly listed.** The Pro plan unlocks full API access (120 req/min, unlimited offset) and detailed validation insights, but the exact price isn't disclosed on the website.
- **API rate limits are generous for Pro, tight for free.** Free/anonymous: 10 req/min, max 20 results, offset capped at 100. Pro: 120 req/min, 100 results per page, unlimited offset.
- **Data source is Reddit-heavy.** Ideas are extracted from Reddit and online community discussions — biased toward technical/developer problems. Consumer and enterprise pain points may be underrepresented.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, tool comparison across all platforms
- `/sales-painonsocial` — PainOnSocial — AI-scored Reddit pain point discovery with frequency/severity ranking for idea validation
- `/sales-reddinbox` — Reddinbox — AI audience intelligence across Reddit, X, HN, YouTube with intent scoring and market briefs
- `/sales-sparktoro` — SparkToro — audience intelligence revealing where audiences spend attention (websites, podcasts, YouTube, subreddits)
- `/sales-reddily` — Reddily — AI-powered Reddit thread analysis for market research with structured insight extraction
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Validate a micro-SaaS idea
**User says**: "I'm thinking of building an AI-powered invoice reconciliation tool for freelancers. Is there demand for this?"
**Skill does**:
1. Suggests using the free Idea Validator at trend-seeker.app/idea-validator
2. Explains the scoring: high Post Volume (many users asked for similar) + low Idea Similarity (few existing solutions) = strong signal
3. Recommends also browsing the Fintech and SaaS categories for related validated ideas
4. Notes that validation scores above 0.7 with 10+ supporting posts indicate strong demand
**Result**: User understands how to interpret validation signals before committing to build

### Example 2: Query the API for SaaS ideas
**User says**: "How do I pull all SaaS business ideas from Trend Seeker's API into my own dashboard?"
**Skill does**:
1. Shows the GET /v1/ideas endpoint with category filter
2. Provides auth setup (Bearer token with `tskr_` prefix)
3. Explains pagination (limit + offset params, Pro needed for offset > 100)
4. Notes that free tier returns basic fields only — Pro needed for full scores and metrics
**Result**: User has working API integration code

### Example 3: Compare idea validation tools
**User says**: "Should I use Trend Seeker or PainOnSocial for validating my startup idea?"
**Skill does**:
1. Explains Trend Seeker discovers pre-validated ideas from Reddit; PainOnSocial scores pain points in subreddits you choose
2. Notes Trend Seeker is idea-first (browse a database), PainOnSocial is problem-first (scan communities for pain)
3. Recommends Trend Seeker if you don't have an idea yet; PainOnSocial if you have a niche and need to quantify pain
4. Routes to `/sales-painonsocial` if user wants PainOnSocial-specific help
**Result**: User picks the right tool for their stage

## Troubleshooting

### Validation score seems too low for an idea you know has demand
**Symptom**: You enter a business idea you've seen people request on Reddit, but the validator gives a low score
**Cause**: The validator matches your description against its embeddings database — phrasing matters. It may also not have indexed the specific threads you're thinking of.
**Solution**: Try rephrasing your idea description to match how Reddit users describe the problem (use their words, not product jargon). Try variations — "invoice tool for freelancers" vs "freelancer billing automation" vs "automatic receipt matching". If scores remain low, the demand may exist in communities not yet indexed.

### Free tier ideas lack actionable detail
**Symptom**: You browse ideas but `solution_approach` and `why_now` are redacted
**Cause**: These fields are gated to premium-tier ideas on the free plan
**Solution**: Use the free Idea Validator for your own concepts (basic scores are free). For full idea details, consider the Pro plan. As a workaround, use the idea title and evidence score to find the original Reddit threads manually and read them yourself.

### API returns 429 Too Many Requests
**Symptom**: API calls fail with HTTP 429
**Cause**: Rate limit exceeded — 10 req/min for free/anonymous, 120 req/min for Pro
**Solution**: Implement exponential backoff. Limits reset on a 60-second rolling window. If you're on the free tier and need higher throughput, upgrade to Pro. Cache responses locally to avoid redundant requests.
