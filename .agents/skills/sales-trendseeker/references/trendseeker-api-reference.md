<!-- Source: https://trend-seeker.app/docs/api -->

# Trend Seeker Public API Reference

## Base URL

```
https://api.trend-seeker.app/v1
```

## Authentication

Two methods supported:

```
Authorization: Bearer tskr_your_api_key
```

or:

```
X-API-Key: tskr_your_api_key
```

Unauthenticated requests are permitted but receive reduced rate limits and basic field access only.

API keys are prefixed with `tskr_`.

## Rate Limits

| Tier | Requests/Minute | Max Results/Page | Max Offset | Data Access |
|------|-----------------|------------------|------------|-------------|
| Anonymous | 10 | 20 | 100 | Basic fields |
| Free (with API key) | 10 | 20 | 100 | Basic fields |
| Pro | 120 | 100 | Unlimited | Full data with scores/metrics |

Limits reset on a 60-second rolling window. HTTP 429 is returned when exceeded.

## Endpoints

### GET /v1/ideas

Retrieve a list of business ideas.

**Parameters:**
- `limit` (integer) — results per page. Max 20 (free), max 100 (Pro).
- `offset` (integer) — pagination offset. Max 100 (free), unlimited (Pro).
- `categories` (string) — filter by category name.

**Example:**
```bash
curl -H "Authorization: Bearer tskr_your_key" \
  "https://api.trend-seeker.app/v1/ideas?limit=10&categories=saas"
```

**Response:**
<!-- Constructed from docs — verify against live API -->
```json
{
  "ideas": [
    {
      "business_idea_id": "abc123",
      "title": "AI-powered invoice reconciliation for freelancers",
      "evidence_strength": 0.82,
      "market_metrics": {
        "post_count": 47,
        "recency_score": 0.9
      },
      "validation_score": 0.78,
      "confidence_tier": "premium",
      "solution_approach": "SaaS tool that...",
      "why_now": "Growing freelance market...",
      "category": "fintech",
      "created_at": "2026-04-15T10:30:00Z"
    }
  ],
  "total": 1250,
  "limit": 10,
  "offset": 0
}
```

**Access notes:**
- Free users: `solution_approach` and `why_now` are redacted for `confidence_tier: "premium"` ideas
- Pro users: all fields returned

### GET /v1/ideas/search

Search business ideas with semantic capabilities — finds results by meaning, not just exact keywords.

**Parameters:**
- `q` (string) — search query
- `limit` (integer) — results per page
- `offset` (integer) — pagination offset

**Example:**
```bash
curl -H "Authorization: Bearer tskr_your_key" \
  "https://api.trend-seeker.app/v1/ideas/search?q=invoice+automation&limit=10"
```

### GET /v1/ideas/:id

Fetch a specific idea by its ID.

**Example:**
```bash
curl -H "Authorization: Bearer tskr_your_key" \
  "https://api.trend-seeker.app/v1/ideas/abc123"
```

### GET /v1/ideas/:id/posts

Retrieve the original source posts from Reddit/communities that support a specific idea.

**Example:**
```bash
curl -H "Authorization: Bearer tskr_your_key" \
  "https://api.trend-seeker.app/v1/ideas/abc123/posts"
```

<!-- Constructed from docs — verify against live API -->
```json
{
  "posts": [
    {
      "post_id": "xyz789",
      "source": "reddit",
      "subreddit": "r/freelance",
      "title": "I wish there was a tool that auto-reconciles invoices",
      "url": "https://reddit.com/r/freelance/...",
      "score": 156,
      "num_comments": 42,
      "created_at": "2026-03-20T15:00:00Z"
    }
  ]
}
```

### GET /v1/categories

List all available idea categories.

**Example:**
```bash
curl "https://api.trend-seeker.app/v1/categories"
```

No authentication required.

## Pagination

Offset-based pagination:
```
?limit=20&offset=0   # Page 1
?limit=20&offset=20  # Page 2
?limit=20&offset=40  # Page 3
```

Free tier: offset capped at 100 (effectively 5 pages of 20 results). Pro: unlimited offset.

## Error Handling

- `200` — Success
- `401` — Invalid or missing API key
- `429` — Rate limit exceeded (60-second rolling window)

### Rate Limit Retry Strategy

```python
import time
import requests

def fetch_with_retry(url, headers, params, max_retries=3):
    for attempt in range(max_retries):
        resp = requests.get(url, headers=headers, params=params)
        if resp.status_code == 429:
            wait = 2 ** attempt  # 1s, 2s, 4s
            time.sleep(wait)
            continue
        resp.raise_for_status()
        return resp.json()
    raise Exception("Rate limit exceeded after retries")
```

## Gaps

- Webhook support: None documented
- Write endpoints (POST/PUT/DELETE): None documented — API is read-only
- Detailed error response schema: Not documented
- Rate limit response headers: Not confirmed (expected X-RateLimit-* headers based on common patterns)
- MCP server: None
- SDK: None (REST-only)
