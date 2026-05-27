<!-- Source: https://www.communitytracker.ai/api-integration -->

# CommunityTracker API Reference

## Authentication

Bearer token authentication. Generate API keys from dashboard: Settings → API.

```
Authorization: Bearer YOUR_API_KEY
```

## Base URL

```
https://api.communitytracker.ai/v1/
```

## Rate limits

| Plan | Calls/day |
|---|---|
| Starter | No API access |
| Pro ($99/mo) | 1,000 |
| Advanced ($199/mo) | 5,000 |

When limit is reached, API returns HTTP 429.

## Endpoints

### GET /v1/mentions

Retrieve community mentions with filtering.

**Request:**

```bash
curl -X GET \
  "https://api.communitytracker.ai/v1/mentions?keyword=your-brand&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

**Parameters:**

| Param | Type | Description |
|---|---|---|
| `keyword` | string | Filter by keyword |
| `limit` | integer | Results per page (default unknown) |
| `page` | integer | Page number for pagination |

**Response:**

```json
{
  "data": [
    {
      "id": "mention_abc123",
      "platform": "reddit",
      "subreddit": "r/devops",
      "title": "Looking for a better CI/CD pipeline tool",
      "body": "We've been using Jenkins but it's too complex...",
      "intent_score": 85,
      "sentiment": "negative",
      "url": "https://reddit.com/r/devops/comments/abc123",
      "created_at": "2026-05-07T14:30:00Z"
    }
  ],
  "total": 42,
  "page": 1
}
```
<!-- Constructed from docs — verify against live API -->

**Response fields:**

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique mention identifier |
| `platform` | string | Source platform (reddit, linkedin, hackernews, github, etc.) |
| `subreddit` | string | Community identifier (subreddit, channel, etc.) |
| `title` | string | Post/thread title |
| `body` | string | Post content |
| `intent_score` | integer | Commercial relevance 0-100 |
| `sentiment` | string | positive / negative / neutral |
| `url` | string | Direct link to the conversation |
| `created_at` | string | ISO 8601 timestamp |
| `total` | integer | Total matching mentions |
| `page` | integer | Current page number |

### POST /v1/generate

Generate AI-crafted social posts and content briefs from trending community discussions.

```bash
curl -X POST \
  "https://api.communitytracker.ai/v1/generate" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"topic": "your-topic", "style": "linkedin"}'
```

**Request body:**

| Field | Type | Description |
|---|---|---|
| `topic` | string | Topic for content generation |
| `style` | string | Content style/platform target |

**Response:** Not documented. Likely returns generated content text.

## Webhooks

CommunityTracker supports webhook push for real-time signal delivery (Pro+ only). Configure webhook URL in dashboard settings.

**Payload:** Expected to mirror the mention object from GET /v1/mentions (not officially documented — test with webhook.site).

**Retry policy:** Not documented. Implement idempotent endpoints.

## Gaps

- Full list of API endpoints not publicly documented (only /mentions and /generate found)
- Webhook payload schema not officially documented
- Error response format not documented
- Additional query parameters for /mentions (date range, platform filter, sentiment filter) not documented
- /generate endpoint response format not documented
- Pagination max page size not documented
- No OpenAPI/Swagger spec found
