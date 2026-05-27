# mention.click Platform Reference

## Overview

mention.click is an AI-powered Reddit intelligence platform that discovers relevant conversations using semantic vectorization rather than simple keyword matching. Differentiator: product-description-driven keyword extraction + 0-10 semantic similarity scoring + 5-minute scan intervals across 430M+ conversations. Targets SaaS founders, solopreneurs, and marketers looking for Reddit lead generation.

## Capabilities & automation surface

| Capability | Access | Notes |
|---|---|---|
| Product description analysis | UI-only | AI extracts keywords, target subreddits, problem statements, and audience profiles from your product description |
| Semantic conversation discovery | UI-only | Vectorization-based matching — finds conversations semantically similar to your product, not just keyword matches |
| Relevance scoring (0-10) | UI-only | Each match gets a similarity score based on problem-solution fit |
| Real-time monitoring | UI-only | Scans relevant subreddits every 5 minutes, 24/7 |
| Sentiment analysis | UI-only | Positive/neutral/negative classification per discussion |
| AI reply generation | UI-only | Context-aware reply suggestions for matched conversations (added in v2) |
| Match management | UI-only | Approve/reject matches, track status (approved/pending/rejected) |
| Dashboard analytics | UI-only | Match trends, approval rates, sentiment breakdown, top subreddits |

**No confirmed public API. No webhooks. No MCP server. No confirmed Zapier/Make modules.**

Note: SoftwareSuggest (unclaimed profile) lists API Access, Zoho CRM, Pipedrive, HubSpot, and Microsoft Teams integrations — these are unverified and likely auto-generated. Verify directly with mention.click support before relying on any integration.

## Pricing, limits & plan gates

<!-- Pricing JS-rendered on mention.click — details compiled from SoftwareSuggest and search results. Verify on site. -->

| Detail | Info |
|---|---|
| Starting price | $99/mo (SoftwareSuggest) |
| Free trial | 7-day |
| Billing | Monthly (annual unknown) |

Exact plan tiers, feature gates, and match/scan limits are not publicly documented. The site is JS-rendered and pricing details couldn't be extracted.

**Cost comparison context:**
- Leadlee: $12/mo (cheapest Reddit lead gen)
- Subreddit Signals: $19.99/mo (7-dimension intent scoring)
- Reppit AI: ~$25-29/mo (URL-based keyword discovery)
- Redreach: $49/mo (Google-ranking posts, webhooks)
- mention.click: $99/mo (semantic vectorization, 5-min scans)
- ReplyAgent: $79/mo + $3/comment (managed accounts)

## How vectorization scoring works

Unlike keyword-based tools that match exact terms, mention.click uses semantic vectorization:

1. **Input**: You describe your product in natural language
2. **Extraction**: AI generates keywords, problem statements, audience profiles, and target subreddits
3. **Matching**: The system creates vector embeddings of your product description and compares them against Reddit conversation embeddings
4. **Scoring**: Each match receives a 0-10 similarity score reflecting semantic distance between your product and the conversation

This means a conversation about "my email campaigns aren't getting responses" could match a cold email tool even without the exact keywords "cold email" or "outreach."

**Limitation**: Similarity ≠ buying intent. A post discussing your problem space theoretically scores high even if the poster isn't looking for a solution.

## Integrations

**Data flows OUT of mention.click:**
- Dashboard (web UI) — view matches, scores, sentiment, AI reply suggestions
- Match management (approve/reject/status tracking)
- Dashboard analytics (trends, approval rates, subreddit rankings)

**Data flows INTO mention.click:**
- Product description (AI analyzes to generate keywords and targeting)
- Manual subreddit selections
- Match approve/reject actions

**No confirmed programmatic data export.**

## Data model

<!-- Constructed from UI descriptions and documentation — verify against live platform -->

Key objects based on the dashboard interface:

```json
// Match (discovered conversation)
{
  "similarity_score": 8.5,        // 0-10, semantic distance to product
  "problem_solution_fit": "high", // AI assessment
  "sentiment": "negative",       // positive / neutral / negative
  "engagement_level": "medium",  // based on upvotes, comments
  "status": "approved",          // approved / pending / rejected
  "subreddit": "r/SaaS",
  "ai_assessment": "High relevance — user describes exact pain point your product solves"
}

// Project (product configuration)
{
  "product_description": "...",
  "extracted_keywords": ["keyword1", "keyword2"],
  "target_subreddits": ["r/SaaS", "r/Entrepreneur"],
  "problem_statements": ["..."],
  "audience_profiles": ["..."]
}
```

## Quick-start recipes

### Recipe 1: Optimize product description for better matches

**Trigger**: Too many irrelevant matches despite high scores

**Steps**:
1. Review your top 10 rejected matches — what topics are they about?
2. Rewrite your product description to focus on specific pain points, not features
3. Use Reddit language: "I need a tool that..." not "Our platform enables..."
4. Remove industry jargon that maps to multiple unrelated domains

**Before** (too broad):
> "Marketing automation platform for growing businesses"

**After** (pain-point focused):
> "Cold email tool for SaaS founders who need to send personalized outreach sequences without landing in spam. Solves: low reply rates, email warmup, deliverability monitoring."

### Recipe 2: Daily lead review workflow (manual CRM sync)

**Trigger**: No API means manual export

**Steps**:
1. Open mention.click dashboard daily (or set a calendar reminder)
2. Filter matches by similarity score 8.0+
3. Review AI assessment and sentiment for each
4. For approved matches: copy thread URL, poster context, and pain point into your CRM as a new lead
5. Draft a response using the AI suggestion as inspiration (never copy-paste)
6. Post the rewritten reply manually on Reddit

**Time estimate**: 15-20 min/day for ~10-15 high-score matches

### Recipe 3: Subreddit pruning for noise reduction

**Trigger**: High volume of irrelevant matches

**Steps**:
1. Go to dashboard analytics → top subreddits by match count
2. For each high-volume subreddit, check the approval rate
3. Subreddits with <30% approval rate are generating noise — remove them
4. Add niche subreddits where your approval rate is >60%
5. Re-evaluate monthly as conversation patterns shift

## Integration patterns

**Manual CRM sync (only available pattern):**
Since there's no API or webhook access, the only integration pattern is manual:
1. Review matches in dashboard
2. Copy approved lead details to your CRM (thread URL, problem statement, score)
3. Track engagement in CRM
4. Follow up based on CRM pipeline stages

**For programmatic access**: Consider switching to RedShip ($19/mo, REST API + webhooks on all plans), Buska (REST API + MCP server), or Octolens (REST API + MCP server) if you need CRM automation.
