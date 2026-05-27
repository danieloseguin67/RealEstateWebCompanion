# OpportunAI Platform Reference

## Overview

OpportunAI is an AI-powered Reddit lead generation tool that monitors subreddit conversations, scores them for business opportunity, and generates contextual reply suggestions. Differentiator: business profile analysis (ICP, pain points, target audience) feeds into opportunity scoring. Reddit-only. Free tier + $29/mo Pro.

## Capabilities & automation surface

| Capability | Access | Notes |
|---|---|---|
| Reddit monitoring | UI-only | Real-time tracking across thousands of subreddits |
| Opportunity scoring | UI-only | AI-scored based on business profile match |
| Sentiment analysis | UI-only | Thread-level sentiment detection |
| AI reply generation | UI-only | Contextual drafts, editable before posting |
| Business profile analysis | UI-only | Website analysis, ICP creation, pain point mapping |
| Smart notifications | Push only | Alerts for high-scoring opportunities |

**No public API. No webhooks. No MCP server. No Zapier/Make modules.**

## Pricing, limits & plan gates

| Tier | Price | Key features |
|---|---|---|
| Free | $0/mo | Limited monitoring, basic features (exact limits undocumented) |
| Pro | $29/mo | Unlimited job credits, unlimited AI response tokens, full monitoring |
| Pro (yearly) | ~$24/mo | 17% discount on annual billing |

- **No credit card required** for free tier
- Claimed metrics: "$10k+ average savings per user", "80% time reduction", "24/7 automated monitoring"
- No documented rate limits or throttling

**Cost comparison context:**
- Redreach: $19/mo with keyword auto-discovery
- Leedlime: $20-79 one-time credit packs
- Leadlee: $12/mo unlimited monitoring + 30 AI replies
- Bazzly: $19-99/mo with credit packs
- OpportunAI: $29/mo with unlimited credits and tokens — slightly higher but no per-action limits

## Integrations

**Data flows OUT of OpportunAI:**
- Smart notifications (in-app, likely email)
- Manual copy/export of leads and reply drafts

**Data flows INTO OpportunAI:**
- Website URL (for AI to analyze your business)
- Business description (manual input)
- Keyword/subreddit configuration

**No confirmed integrations with CRMs, Slack, Zapier, or any external tools.**

### CRM sync workaround

Since no API or export feature is documented:
1. Manually review high-scoring opportunities in OpportunAI dashboard
2. Copy thread URLs and key details to your CRM manually
3. For volume: maintain a spreadsheet intermediary, periodically import to CRM

## Data model

<!-- Constructed from website content — verify against live product -->

```json
{
  "opportunity": {
    "reddit_thread_url": "https://reddit.com/r/SaaS/comments/...",
    "subreddit": "r/SaaS",
    "title": "Looking for a tool that does X",
    "opportunity_score": "high",
    "sentiment": "positive",
    "matched_keywords": ["tool recommendation", "alternative to"],
    "ai_reply_draft": "Based on your requirements...",
    "discovered_at": "2026-05-10T14:30:00Z"
  }
}
```

```json
{
  "business_profile": {
    "website_url": "https://myproduct.com",
    "description": "AI-powered analytics for SaaS teams",
    "target_audience": "SaaS founders, product managers",
    "ideal_customer": "B2B SaaS companies with 10-100 employees",
    "pain_points": ["manual data analysis", "no real-time insights"]
  }
}
```

## Quick-start recipes

### Recipe 1: Set up business profile for accurate scoring

**Goal:** Configure OpportunAI to surface relevant Reddit threads.

**Steps:**
1. Sign up at opportunai.co (free tier, no credit card)
2. Connect your website URL — ensure the page clearly describes:
   - What your product does
   - Who it's for
   - What problems it solves
3. Review the auto-generated business profile:
   - Target audience description
   - ICP characteristics
   - Pain point mapping
4. Manually refine any AI-generated descriptions that miss your positioning
5. Add relevant keywords: competitor names, problem-specific phrases, product category terms
6. Start monitoring — review first 10-20 opportunities to validate scoring

### Recipe 2: Reply strategy for high-scoring opportunities

**Goal:** Convert high-opportunity threads into engagement without getting banned.

**Steps:**
1. Review AI-generated reply draft — note the key points it addresses
2. Before replying, check:
   - Subreddit rules (sidebar) — many ban self-promotion
   - Your karma in that subreddit — build karma first if new
   - Thread age — threads older than 24-48h get less visibility
3. Rewrite the draft:
   - Lead with helpful context (2-3 sentences of genuine advice)
   - Only mention your product if directly asked or clearly relevant
   - Use first person, share personal experience
   - Remove any marketing buzzwords
4. Post manually on Reddit
5. Check back in 24h for replies — engage authentically

### Recipe 3: Subreddit targeting for niche products

**Goal:** Find the right subreddits for your product category.

**Steps:**
1. Start with obvious subreddits: r/SaaS, r/entrepreneur, r/smallbusiness, r/marketing
2. Use OpportunAI's monitoring to discover which subreddits surface the most relevant threads
3. After 1-2 weeks, review opportunity distribution:
   - Which subreddits produce the highest-scoring threads?
   - Which produce only noise?
4. Trim low-quality subreddits, add niche subreddits discovered through related threads
5. Monitor competitor mentions — they often appear in subreddits you haven't targeted yet

## Integration patterns

### Manual monitoring workflow (only available pattern)

```
OpportunAI monitors Reddit 24/7
  → AI scores threads for business opportunity
  → Notification alerts for high-scoring threads
  → You review in OpportunAI dashboard
  → AI generates contextual reply draft
  → You edit and personalize the reply
  → Post on Reddit manually
  → Track engagement manually
```

**Limitations:**
- No programmatic access to any data
- No export functionality documented
- No webhook or notification parsing possible
- All tracking and follow-up is manual
