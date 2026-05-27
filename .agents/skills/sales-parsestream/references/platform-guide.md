# ParseStream Platform Reference

## Overview

ParseStream monitors keywords across Reddit, X (Twitter), LinkedIn, Quora, and Hacker News in real time, with AI-powered relevance filtering and reply generation. Targets indie hackers and SaaS founders wanting multi-platform lead generation from social conversations. Differentiator: covers 5 discussion platforms in one tool with built-in auto-reply via Reddit OAuth.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Keyword monitoring | 24/7 scanning across Reddit, X, LinkedIn, Quora, HN | UI-only |
| AI relevance filtering | Filters noise, surfaces intent signals | UI-only |
| AI reply generation | Contextual replies with customizable tone/style | UI-only |
| Auto-reply (Reddit) | Posts replies via Reddit OAuth with timing delays | UI-only |
| Email notifications | Alerts when keywords match | UI-only |
| Subreddit filtering | Include/exclude specific communities | UI-only |
| Historical trend analysis | Trend charts for keyword activity | UI-only |
| Brand context | Custom product/brand info for reply personalization | UI-only |

**No public API.** No webhooks. No Zapier/Make/MCP. Entirely browser-based — no programmatic access to data or functionality.

## Pricing, limits & plan gates

Pricing is not publicly disclosed. Based on third-party reviews (best-effort, may be outdated):

| Tier | Estimated price | Keywords | Reply credits | Notes |
|---|---|---|---|---|
| Lite | ~$29/mo | Limited | Limited | Solo users testing |
| Pro | ~$49/mo | More | More | Active engagement |
| Growth | ~$79/mo | Higher | Higher | Growing teams |
| Enterprise | Custom | Custom | Custom | Multi-brand |

- Free trial available (full functionality during trial)
- No setup fees
- Cancel anytime
- Credit-based reply system (credits consumed per AI reply generated)

**Plan gates**: All plans appear to include all 5 platforms. Multi-brand/multi-project support likely Enterprise-only. Exact keyword and reply credit limits per plan are not publicly documented.

## Integrations

**Native integrations**: None documented
- No Slack
- No Zapier/Make/n8n
- No CRM connectors
- No webhooks
- No data export documented

**Reddit OAuth**: Secure connection for auto-reply (read/write to Reddit via OAuth 2.0 — no password required). This is the only external integration.

**Workaround for automation needs**: If you need ParseStream data in other tools, your only options are:
1. Manual copy-paste from the UI
2. Browser automation (Puppeteer/Playwright — fragile, not recommended)
3. Switch to a tool with API access (RedShip, Syften, Octolens)

## Data model

No API means no documented data model. Based on UI research, key objects include:

```json
// Mention (conceptual — no API access)
{
  "platform": "reddit",
  "keyword": "email marketing tool",
  "title": "What's the best email marketing tool for startups?",
  "subreddit": "r/SaaS",
  "author": "username123",
  "timestamp": "2026-05-04T14:30:00Z",
  "url": "https://reddit.com/r/SaaS/comments/...",
  "ai_relevant": true,
  "reply_generated": true
}
```
<!-- Constructed from UI descriptions — no API docs exist to verify -->

```json
// AI Reply Draft (conceptual)
{
  "mention_id": "...",
  "style": "value-first",
  "content": "I had the same problem last year...",
  "length": "medium",
  "brand_context_applied": true,
  "auto_publish_enabled": false
}
```
<!-- Constructed from UI descriptions — no API docs exist to verify -->

## Quick-start recipes

Since ParseStream has no API, these are UI workflow recipes rather than code recipes.

### Recipe 1: Set up Reddit lead monitoring

**Goal**: Monitor Reddit for people asking for product recommendations in your space

1. Sign up and start free trial
2. Add your primary keywords (product category terms people search for):
   - "best [category] tool"
   - "looking for [category]"
   - "alternative to [competitor]"
   - "[competitor] sucks"
3. Enable subreddit filters — include only relevant communities (r/SaaS, r/startups, r/smallbusiness, etc.)
4. Exclude noise subreddits (r/all, large entertainment subs)
5. Set brand context: paste your product description, key value props, and tone guidelines
6. Set email notification frequency

### Recipe 2: Configure safe auto-reply

**Goal**: Use auto-reply without getting Reddit account banned

1. Connect Reddit account via OAuth (Settings > Reddit Connection)
2. Set reply mode to "Queue with review" (not full auto)
3. Configure timing delays:
   - Minimum 30-60 minutes between replies
   - Random variation (don't post at exact intervals)
4. Set daily reply cap to 3-5 maximum
5. Select "value-first" reply style (never lead with product mention)
6. Add instruction: "Include personal experience or helpful context before any product mention"
7. Always review queue before approving — edit heavily

**Account safety rules:**
- Never auto-reply on accounts less than 6 months old
- Never auto-reply more than 5x per day
- Never reply to the same subreddit more than 2x per day
- Mix genuine non-promotional comments with product mentions (80/20 ratio)
- Stop immediately if you receive any Reddit warning

### Recipe 3: Multi-platform keyword strategy

**Goal**: Monitor all 5 platforms effectively

| Platform | Best keywords | Why |
|---|---|---|
| Reddit | "looking for", "alternative to", "recommend" | High purchase intent in recommendation threads |
| X/Twitter | Brand name, competitor names | Real-time complaints and switching signals |
| LinkedIn | Industry terms, job-related pain | Professional context, B2B signals |
| Quora | "What is the best...", "How do I..." | Question-based intent |
| Hacker News | "Show HN" + category, "Ask HN" + problem | Technical audience, early adopters |

Adjust keywords per platform — Reddit intent language differs from LinkedIn professional language.

## Integration patterns

### No programmatic integration available

ParseStream is entirely UI-driven. For teams needing data pipelines:

**If you need monitoring data in your CRM:**
- Use RedShip ($19/mo) — REST API + webhooks on all plans, push to any CRM
- Use Syften (€39.95/mo) — REST API, push via webhooks (PRO €99.95/mo)
- Use Octolens ($119/mo) — REST API + webhooks + MCP server

**If you need monitoring data in Slack:**
- Use Syften — native Slack integration with tag-based routing
- Use RedShip — native Slack alerts
- Use Octolens — Slack alerts

**If you need to build custom dashboards:**
- Use Xpoz ($20/mo) — raw data API via MCP/SDK
- Use Octolens — REST API with JSON export

ParseStream is best suited for users who will work entirely within the ParseStream UI and only need email alerts — no data portability exists.
