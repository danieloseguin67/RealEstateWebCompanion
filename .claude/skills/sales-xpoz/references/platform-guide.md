# Xpoz Platform Reference

## Overview

Xpoz is a social data API and MCP server that gives AI agents and developers access to 1.5B+ indexed posts across Twitter/X, Instagram, TikTok, and Reddit. Primary differentiator: natural language queries via MCP protocol — no platform API keys needed, just Google OAuth. Targets developers, researchers, and GTM teams who want programmatic social data without enterprise pricing.

## Capabilities & automation surface

| Capability | Access method | Notes |
|---|---|---|
| Twitter/X search (posts, users, engagement) | MCP (14 tools) + SDK | Full coverage: keyword search, user profiles, comments, retweets, quotes |
| Instagram search (posts, users, comments) | MCP (9 tools) + SDK | Posts, user profiles, connections, comments |
| Reddit search (posts, comments, users) | MCP (6 tools) + SDK | Subreddit and thread context preserved |
| TikTok search | MCP (coming soon) + SDK | Listed but not fully available yet |
| CSV export (up to 500K rows) | MCP + SDK | Async operations with status polling |
| Natural language queries | MCP only | AI optimizes queries automatically |
| Persistent monitoring | SDK (polling) | No webhooks — must poll for new data |
| User intelligence | MCP + SDK | Followers, engagement, authenticity scores |

## Pricing, limits & plan gates

| Plan | Price | Results/month | Tracked items | Notes |
|---|---|---|---|---|
| Free | $0 | 100,000 | 1 | No credit card required. Get token at xpoz.ai/get-token |
| Pro | $20/mo | 1,000,000 | Unlimited | All tools and platforms included |
| Max | $200/mo | 10,000,000 | Unlimited | For high-volume pipelines and research |

**All tools are available on all plans** — no feature gating by tier. The only difference is result volume.

**Rate limits:** Not publicly documented. The MCP server handles rate limiting server-side. SDK users should implement reasonable delays between requests.

**Overage behavior:** Not documented — likely hard stops at plan limit. Monitor usage via result counts.

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| Claude Desktop/claude.ai | Read | MCP native — add as custom connector |
| Claude Code | Read | MCP config in project settings |
| Cursor / Windsurf / Cline | Read | MCP config |
| OpenAI Codex | Read | Via Xpoz MCP or SDK |
| ChatGPT | Read | Via MCP |
| n8n | Read | Via HTTP request nodes to SDK |
| Python pipelines | Read | `pip install xpoz` — typed client |
| TypeScript/Node | Read | `npm install @xpoz/xpoz` — typed client |

**No Zapier, Make, or native CRM connectors.** Build custom integrations via SDK.

## Data model

### Twitter post object

```json
{
  "id": "1234567890",
  "text": "Just tried the new feature and it's amazing!",
  "author": {
    "id": "987654321",
    "username": "techuser",
    "followers_count": 5200,
    "verified": false
  },
  "created_at": "2026-05-01T14:30:00Z",
  "metrics": {
    "likes": 42,
    "retweets": 8,
    "replies": 3,
    "quotes": 1
  },
  "language": "en",
  "hashtags": ["productlaunch", "saas"]
}
```
<!-- Constructed from docs — verify against live API -->

### Reddit post object

```json
{
  "id": "abc123",
  "title": "Looking for alternatives to X tool",
  "body": "I've been using X for 6 months but...",
  "subreddit": "SaaS",
  "author": "startup_founder",
  "created_at": "2026-05-02T09:15:00Z",
  "score": 87,
  "num_comments": 23,
  "url": "https://reddit.com/r/SaaS/comments/abc123"
}
```
<!-- Constructed from docs — verify against live API -->

## MCP tools inventory

### Twitter/X (14 tools)

| Tool | Purpose |
|---|---|
| `searchTwitterUsers` | Find users by name/bio keywords |
| `getTwitterUser` | Get profile details by username |
| `getTwitterUsersByKeywords` | Discover users matching topic keywords |
| `getTwitterUserConnections` | Get followers/following lists |
| `getTwitterPostsByKeywords` | Search posts by keyword with filters |
| `getTwitterPostsByAuthor` | Get posts from a specific user |
| `getTwitterPostsByIds` | Fetch specific posts by ID |
| `getTwitterPostComments` | Get replies to a post |
| `getTwitterPostRetweets` | Get retweet details |
| `getTwitterPostQuotes` | Get quote tweets |
| `getTwitterPostInteractingUsers` | Users who engaged with a post |
| `countTweets` | Count tweets matching criteria |
| `checkOperationStatus` | Poll async export status |
| `cancelOperation` | Cancel a running export |

### Instagram (9 tools)

User search, profile retrieval, keyword-based user discovery, post search, connection retrieval, comment access, interaction analytics.

### Reddit (6 tools)

User search, profile retrieval, keyword-based user discovery, post/comment searching with threaded context.

## Quick-start recipes

### Recipe 1: Monitor brand mentions on Twitter (Python SDK)

**Trigger:** Cron job every hour
**Steps:** Search for brand keywords → filter by engagement → send to Slack

```python
# pip install xpoz requests
import os
from xpoz import XpozClient
import requests

client = XpozClient(api_key=os.environ["XPOZ_API_KEY"])

# Search for mentions
results = client.twitter.search_posts(
    keywords="YourBrand OR @yourbrand",
    limit=50,
    sort_by="recent"
)

# Filter high-engagement mentions
important = [p for p in results.data if p.metrics.likes > 5]

# Send to Slack
for post in important:
    requests.post(os.environ["SLACK_WEBHOOK"], json={
        "text": f"New mention by @{post.author.username}: {post.text[:200]}"
    })
```
<!-- Constructed from docs — verify against live API -->

**Gotchas:** No webhooks — you must poll. Use caching to avoid counting duplicate results against your monthly quota.

### Recipe 2: Export competitor mentions to CSV (MCP)

**Trigger:** Monthly report generation
**Steps:** Ask Claude via MCP to export all mentions of competitors

```
Prompt to Claude (with Xpoz MCP connected):
"Export all Twitter posts mentioning 'CompetitorA' OR 'CompetitorB' from the
last 30 days to CSV. Include author, text, likes, retweets, and date."
```

Claude will use `getTwitterPostsByKeywords` with date filters, then trigger a CSV export via the async operation system. Poll `checkOperationStatus` until complete.

### Recipe 3: Reddit lead monitoring (TypeScript SDK)

```typescript
// npm install @xpoz/xpoz
import { XpozClient } from '@xpoz/xpoz';

const client = new XpozClient({ apiKey: process.env.XPOZ_API_KEY! });

async function findLeads() {
  const results = await client.reddit.searchPosts({
    keywords: '"looking for" OR "recommend" OR "alternative to"',
    subreddit: 'SaaS',
    limit: 100,
    sort_by: 'recent'
  });

  // Filter for purchase-intent posts
  const leads = results.data.filter(post =>
    post.score > 5 && post.num_comments > 3
  );

  console.log(`Found ${leads.length} potential leads`);
  return leads;
}
```
<!-- Constructed from docs — verify against live API -->

**Gotchas:** Reddit context is preserved (subreddit, thread), but you can't filter by specific subreddits in all query types — check which tool supports subreddit filtering.

## Integration patterns

### MCP connection setup

```json
{
  "mcpServers": {
    "xpoz": {
      "type": "streamable-http",
      "url": "https://mcp.xpoz.ai/mcp"
    }
  }
}
```

Authentication happens automatically via Google OAuth on first connection. No API key needed for MCP.

### SDK authentication

```bash
# Get your API key at xpoz.ai/get-token (free, no CC)
export XPOZ_API_KEY=your-api-key

# Python
pip install xpoz

# TypeScript
npm install @xpoz/xpoz
```

### Pagination pattern

Results use server-side pagination. For MCP, the server handles pagination automatically when you request large result sets. For SDKs:

```python
# SDK pagination (conceptual)
results = client.twitter.search_posts(keywords="brand", limit=100)
# Server returns paginated results in results.data
# Use limit parameter to control page size
```
<!-- Constructed from docs ��� verify against live API -->

### Async export pattern

```python
# Start export
operation = client.export.create(
    platform="twitter",
    keywords="brand",
    format="csv",
    limit=500000
)

# Poll for completion
import time
while True:
    status = client.operations.check(operation.id)
    if status.state == "completed":
        download_url = status.result_url
        break
    time.sleep(10)
```
<!-- Constructed from docs — verify against live API -->

### Caching strategy

Xpoz has smart caching built in. To bypass cache for fresh data:
- MCP: include "get the latest data" or "force refresh" in your prompt
- SDK: pass `forceLatest: true` parameter

Cache results locally between polling intervals to avoid counting the same results multiple times against your monthly quota.
