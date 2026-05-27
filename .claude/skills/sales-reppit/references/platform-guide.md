# Reppit AI Platform Reference

## Overview

Reppit AI is a Reddit-only lead generation tool that uses AI to discover buying-intent conversations and draft contextual replies. Differentiator: automatic keyword discovery from product URL analysis + 0-100 buying intent scoring + manual-only posting (protects account safety). Targets SaaS founders, agencies, e-commerce, and course creators.

## Capabilities & automation surface

| Capability | Access | Notes |
|---|---|---|
| AI keyword discovery | UI-only | Analyzes your product URL and generates relevant keywords; learns from edits |
| Subreddit targeting | UI-only | Define target communities for prospect discovery |
| Buying intent scoring | UI-only | 0-100 relevance score per post, highest-intent first |
| AI reply drafts | UI-only | Context-aware reply suggestions for each thread |
| Post management | UI-only | Track replied, pending, and rejected posts |
| Manual posting | User action | You post replies yourself on Reddit — Reppit never auto-posts |

**No public API. No webhooks. No MCP server. No Zapier/Make modules.**

## Pricing, limits & plan gates

<!-- Pricing JS-rendered on reppit.ai — details compiled from blog, comparison pages, and search results. Verify on site. -->

| Tier | Monthly | Yearly (est.) | Smart comments/mo | Notes |
|---|---|---|---|---|
| Basic | ~$29/mo | ~$25/mo | ~300 | Core features |
| Pro | higher | — | ~1,000 | Higher volume |

- "Save up to 50%" on yearly billing
- No per-comment or per-post fees (flat subscription)
- Yearly pricing roughly half of GummySearch's former $48/mo
- All plans include: intent scoring, AI reply drafts, keyword discovery, subreddit targeting, post management

**Cost comparison context:**
- Leadlee: $12/mo (cheapest Reddit lead gen)
- Subreddit Signals: $19.99/mo (7-dimension intent scoring)
- Reppit AI: ~$25-29/mo (URL-based keyword discovery + intent scoring)
- Redreach: $49/mo (Google-ranking posts, webhooks)
- ReplyAgent: $79/mo + $3/comment (managed accounts)

## Integrations

**Data flows OUT of Reppit AI:**
- Dashboard (web UI) — view leads, intent scores, AI drafts
- Post management (replied/pending/rejected tracking)

**Data flows INTO Reppit AI:**
- Website URL (AI analyzes to generate keywords)
- Manual keyword additions and edits
- Subreddit selections

**No confirmed integrations with CRMs, email tools, Slack, Zapier, or any external tools.**

### CRM sync workaround

Since no API or export feature exists:
1. Review high-intent leads daily in dashboard
2. Copy thread URLs and key details for promising leads
3. Batch-enter into CRM manually
4. For higher volume, consider switching to RedShip ($29/mo, API + webhooks) or Buska ($49/mo, API + MCP)

## Data model

<!-- Constructed from website content — verify against live product -->

```json
{
  "prospect_post": {
    "thread_url": "https://reddit.com/r/SaaS/comments/...",
    "subreddit": "r/SaaS",
    "title": "Looking for a tool that does X",
    "intent_score": 87,
    "status": "pending",
    "ai_reply_draft": "Based on what you're describing...",
    "matched_keywords": ["tool recommendation", "alternative to Y"],
    "discovered_at": "2026-05-10T14:30:00Z"
  }
}
```

```json
{
  "keyword_config": {
    "source_url": "https://myproduct.com",
    "auto_generated_keywords": ["project management", "team collaboration", "task tracking"],
    "manually_added_keywords": ["alternative to Asana", "need a simpler PM tool"],
    "target_subreddits": ["r/SaaS", "r/startups", "r/Entrepreneur"]
  }
}
```

## Quick-start recipes

### Recipe 1: Set up lead discovery in 5 minutes

**Goal:** Start finding buying-intent Reddit conversations for your product.

**Steps:**
1. Sign up at reppit.ai
2. Enter your product URL — Reppit's AI analyzes your site and generates keywords
3. Review auto-generated keywords — keep the specific ones, remove broad terms
4. Add 3-5 manual keywords using the language your target customers actually use on Reddit (e.g., "alternative to [competitor]", "need a tool for [specific problem]")
5. Select 5-10 target subreddits where your prospects hang out
6. Review the prospect feed — posts sorted by intent score (0-100)
7. Start with posts scoring 70+ to validate keyword quality

### Recipe 2: Optimize intent scoring accuracy

**Goal:** Reduce false positives and surface genuinely high-intent conversations.

**Steps:**
1. Review your top 20 highest-scored posts over the past week
2. Mark irrelevant ones as "rejected" — note what keywords triggered them
3. Identify patterns: are broad keywords (e.g., "marketing") causing noise?
4. Replace broad keywords with specific pain-point phrases (e.g., "my cold emails go to spam" instead of "email marketing")
5. Remove subreddits where posts are educational/discussion-only (e.g., r/marketing) and focus on action-oriented communities (e.g., r/SaaS, r/smallbusiness)
6. Re-evaluate scores after 1 week — false positive rate should drop

### Recipe 3: Reply strategy for Reddit lead conversion

**Goal:** Turn AI reply drafts into replies that get upvoted and drive engagement.

**Steps:**
1. Read the AI-drafted reply — identify the key point it makes
2. Delete the draft and rewrite from scratch:
   - Lead with 2-3 sentences of genuine advice about the problem
   - Share a personal experience or specific insight
   - Only mention your product if it's directly relevant to what they asked
   - End with a question or additional resource
3. Check subreddit rules before posting (sidebar → rules)
4. Check your karma in that subreddit — if new, contribute genuine comments first
5. Post manually from your own Reddit account
6. Follow up on any replies within 24 hours — keep engaging authentically
7. Mark the post as "replied" in Reppit to avoid duplicates

## Integration patterns

### Manual lead-to-CRM workflow (only available pattern)

```
Reppit AI scans Reddit based on your keywords
  → AI scores each post 0-100 for buying intent
  → You review high-intent posts in dashboard
  → AI generates reply draft for context
  → You rewrite reply in your own voice
  → Post manually on Reddit
  → Copy lead details into CRM manually
  → Follow up on engagement
```

**Limitations:**
- No programmatic access to any data
- No export functionality documented
- No notification channels beyond the web dashboard
- All tracking and CRM sync is manual
- No browser extension — web dashboard only
