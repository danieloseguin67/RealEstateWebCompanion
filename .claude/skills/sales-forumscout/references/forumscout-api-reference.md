<!-- Source: https://github.com/joshwallerr/ForumScout-API, https://apidirect.io/, https://apidirect.io/endpoints/forums -->

# ForumScout / API Direct API Reference

ForumScout's API is a separate product called **API Direct** (apidirect.io), built by the same developer. It provides social media search endpoints — it does NOT expose ForumScout dashboard data (scouts, mention history, sentiment analytics).

## Authentication

All requests require an API key via header:

```
X-API-Key: YOUR_API_KEY
```

One key authenticates across all endpoints. Generate keys from the API Direct developer dashboard.

## Base URL

```
https://apidirect.io/v1
```

## Endpoints

### Forum Posts Search

```
GET /v1/forums/posts
```

| Parameter | Required | Description |
|---|---|---|
| `query` | Yes | Search keyword (max 500 chars) |
| `page` | No | Pagination page number (default: 1) |
| `time` | No | Filter: `any`, `hour`, `day`, `week`, `month`, `year` (default: `any`) |
| `country` | No | ISO 3166-1 alpha-2 country code (e.g., `US`, `GB`) |
| `get_sentiment` | No | Boolean — AI emotion analysis (+$0.001/request) |

**Cost**: $0.008/request

### Reddit Posts Search

```
GET /v1/reddit/posts
```

Same parameters as Forum Posts. **Cost**: $0.003/request

### Reddit Comments Search

```
GET /v1/reddit/comments
```

Same parameters as Forum Posts. **Cost**: $0.003/request

### Twitter/X Search

```
GET /v1/x/posts
```

Same parameters as Forum Posts. **Cost**: $0.006/request

### LinkedIn Search

```
GET /v1/linkedin/posts
```

Same parameters as Forum Posts. **Cost**: $0.006/request

### Instagram Search

```
GET /v1/instagram/posts
```

Same parameters as Forum Posts. **Cost**: $0.006/request

### YouTube Search

```
GET /v1/youtube/videos
```

Same parameters as Forum Posts. **Cost**: $0.005/request

### TikTok Search

```
GET /v1/tiktok/videos
```

Same parameters as Forum Posts. **Cost**: $0.006/request

### Facebook Endpoints

```
GET /v1/facebook/posts          # Search posts
GET /v1/facebook/groups         # Group posts
GET /v1/facebook/pages          # Search pages
GET /v1/facebook/page_details   # Page details
GET /v1/facebook/page_posts     # Page posts
GET /v1/facebook/group_details  # Group details
GET /v1/facebook/videos         # Search videos
```

**Cost**: $0.008/request

### Twitter Extended Endpoints

```
GET /v1/x/user_tweets           # User's tweets
GET /v1/x/user_profile          # User profile
GET /v1/x/followers             # User's followers
GET /v1/x/following             # User's following
GET /v1/x/tweet_details         # Single tweet details
GET /v1/x/tweet_comments        # Tweet replies
GET /v1/x/tweet_retweets        # Retweets
GET /v1/x/tweet_quotes          # Quote tweets
GET /v1/x/user_replies          # User's replies
GET /v1/x/search_users          # Search users
GET /v1/x/trends                # Trending topics
GET /v1/x/verified_followers    # Verified followers
```

**Cost**: $0.006/request

### News Articles

```
GET /v1/news/articles
```

**Cost**: $0.008/request

## Response Format

All endpoints return consistent JSON:

```json
{
  "results": [
    {
      "position": 1,
      "rank": 1,
      "title": "Post Title or Username",
      "url": "https://...",
      "date": "2026-05-04 14:23:00",
      "author": "Content Author",
      "source": "Platform Name",
      "domain": "platform.com",
      "snippet": "Content Preview..."
    }
  ],
  "page": 1,
  "count": 10
}
```

### With sentiment enabled (`get_sentiment=true`)

Each result includes:

```json
{
  "sentiment": {
    "emotions": {
      "frustration": 0.7,
      "curiosity": 0.5,
      "hope": 0.3
    },
    "dominant_emotion": "frustration",
    "emotional_intensity": "high",
    "polarity": "negative"
  }
}
```

**Extra cost**: +$0.001/request when `get_sentiment=true`

## Rate Limits

- **Free tier**: 50 requests/month per endpoint
- **Concurrency**: 3 simultaneous requests per endpoint per user
- No monthly fee — pure pay-per-request after free tier

## Error Responses

| Status | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request (check parameters) |
| 401 | Unauthorized (invalid API key) |
| 402 | Payment required (free tier exhausted) |
| 429 | Rate limit exceeded (too many concurrent requests) |
| 500 | Server error |

## Pagination

Use the `page` parameter. Default: page 1. Increment to get more results. No cursor-based pagination — simple page numbering.

## MCP Server

API Direct provides an MCP server for Claude Desktop, Cursor, and other MCP clients:

```
https://apidirect.io/mcp?token=YOUR_API_KEY
```

Transport: HTTP (streamable). Exposes all search endpoints as MCP tools with the same parameters and pricing.

## Quick Start

```bash
# Simplest GET — search Reddit posts for "crm alternative"
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://apidirect.io/v1/reddit/posts?query=crm+alternative&time=week"
```

```python
import requests

resp = requests.get(
    "https://apidirect.io/v1/reddit/posts",
    headers={"X-API-Key": "YOUR_API_KEY"},
    params={"query": "crm alternative", "time": "week"}
)
for post in resp.json().get("results", []):
    print(f"{post['title']} — {post['url']}")
```

## Gaps

- No endpoint to access ForumScout dashboard data (scouts, mention history, filtered results, sentiment analytics)
- No webhook management via API (webhooks are configured in the ForumScout UI only)
- No create/update/delete operations — read-only search API
- Exact pagination limits (max pages, results per page) not documented
- Webhook payload schema not documented in API Direct docs (ForumScout feature, not API Direct)
