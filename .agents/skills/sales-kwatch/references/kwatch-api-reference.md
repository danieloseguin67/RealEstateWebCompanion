<!-- Source: https://docs.kwatch.io/api/ -->

# KWatch.io API Reference

## Authentication

All requests require a Bearer token in the Authorization header. Generate your API key from the KWatch dashboard under the API section.

```
Authorization: Bearer your-api-key-here
```

**Plan requirement:** REST API access requires Business plan ($79/mo) or higher.

## Base URL

```
https://api.kwatch.io
```

## HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 OK | Successful request |
| 201 Created | Resource created |
| 204 No Content | Successful deletion |
| 400 Bad Request | Invalid request body or parameters |
| 401 Unauthorized | Missing or invalid API key |
| 403 Forbidden | Plan limitation or insufficient permissions |
| 404 Not Found | Resource doesn't exist |
| 429 Too Many Requests | Rate limit exceeded |
| 500 Internal Server Error | Server-side error |

Error response shape:
```json
{"error": "Error message here"}
```

## Endpoints

### Keyword Alerts

#### Create keyword alert

```
POST /api/keyword-alerts/{platform}
```

**Path parameters:**
- `platform` (string, required): `reddit`, `hacker_news`, `twitter`, `linkedin`, `youtube`, `facebook`

**Request body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `keywords` | string | Yes | Keywords to monitor. Up to 3 independent words that must ALL appear. |
| `excluded_keywords` | string | No | Keywords to exclude (max 10, max 5 for LinkedIn) |
| `included_users` | string | No | Specific users to monitor (Reddit, HN, X, YouTube only; max 3) |
| `excluded_users` | string | No | Users to exclude (max 3) |
| `included_subreddits` | string | No | Specific subreddits (Reddit only; max 10) |
| `excluded_subreddits` | string | No | Subreddits to exclude (Reddit only; max 10) |
| `public_facebook_group_url` | string | No | Facebook group URL (Facebook only) |
| `included_languages` | string | No | ISO language codes (max 3) |
| `excluded_languages` | string | No | Languages to exclude (max 3) |
| `whole_words_only` | boolean | No | Match complete words only |
| `case_sensitive` | boolean | No | Match exact case |
| `search_posts` | boolean | No | Monitor keywords in posts |
| `search_comments` | boolean | No | Monitor keywords in comments |
| `include_nsfw` | boolean | No | Include NSFW content (Reddit only) |
| `api_webhook_url` | string | No | Webhook URL for notifications |
| `slack_webhook_url` | string | No | Slack webhook URL |
| `enabled` | boolean | No | Whether the alert is active |

**Example request:**
```bash
curl -X POST "https://api.kwatch.io/api/keyword-alerts/reddit" \
  -H "Authorization: Bearer your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": "saas recommendation",
    "excluded_keywords": "game,unrelated",
    "search_posts": true,
    "search_comments": true,
    "included_subreddits": "SaaS,startups",
    "whole_words_only": true,
    "api_webhook_url": "https://example.com/webhook",
    "enabled": true
  }'
```

**Example response (201):**
```json
{
  "id": 123,
  "keywords": "saas recommendation",
  "excluded_keywords": "game,unrelated",
  "search_posts": true,
  "search_comments": true,
  "included_users": null,
  "excluded_users": null,
  "included_subreddits": "SaaS,startups",
  "excluded_subreddits": null,
  "included_languages": null,
  "excluded_languages": null,
  "whole_words_only": true,
  "case_sensitive": false,
  "include_nsfw": false,
  "api_webhook_url": "https://example.com/webhook",
  "slack_webhook_url": null,
  "enabled": true,
  "monthly_count": 0
}
```

#### Update keyword alert

```
PUT /api/keyword-alerts/{platform}/{id}
```

**Path parameters:**
- `platform` (string, required): Platform name
- `id` (string, required): Alert ID

Same request body fields as Create. All fields are optional except `keywords`.

**Example request:**
```bash
curl -X PUT "https://api.kwatch.io/api/keyword-alerts/reddit/123" \
  -H "Authorization: Bearer your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": "updated keyword",
    "excluded_keywords": "new exclusion",
    "enabled": true
  }'
```

#### Delete keyword alert

```
DELETE /api/keyword-alerts/{platform}/{id}
```

**Example request:**
```bash
curl -X DELETE "https://api.kwatch.io/api/keyword-alerts/reddit/123" \
  -H "Authorization: Bearer your-api-key-here"
```

**Example response (200):**
```json
{"message": "Alert deleted successfully"}
```

#### List keyword alerts
<!-- Constructed from docs — verify endpoint path against live API -->

```
GET /api/keyword-alerts/{platform}
```

Returns array of alert objects for the specified platform.

#### Get keyword alert
<!-- Constructed from docs — verify endpoint path against live API -->

```
GET /api/keyword-alerts/{platform}/{id}
```

Returns a single alert object.

### Conversation Trackers

#### Create conversation tracker
<!-- Constructed from docs — verify request body against live API -->

```
POST /api/conversation-trackers/{platform}
```

Platforms: `reddit`, `hacker_news`

**Request body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | string | Yes | URL of the Reddit post or HN discussion |

#### List, Get, Update, Delete conversation trackers

Follow the same pattern as keyword alerts:
- `GET /api/conversation-trackers/{platform}` — list all
- `GET /api/conversation-trackers/{platform}/{id}` — get one
- `PUT /api/conversation-trackers/{platform}/{id}` — update
- `DELETE /api/conversation-trackers/{platform}/{id}` — delete

## Webhook payload

When a keyword match is found, KWatch sends a JSON POST to the configured `api_webhook_url`:

```json
{
  "platform": "reddit",
  "query": "saas recommendation",
  "datetime": "2026-05-07T14:30:00Z",
  "link": "https://www.reddit.com/r/SaaS/comments/abc123/post_title/",
  "author": "reddit_user",
  "content": "Full text of the post or comment",
  "sentiment": "neutral"
}
```

**Fields:**
- `platform`: `reddit`, `hacker_news`, `twitter`, `linkedin`, `youtube`, `facebook`
- `sentiment`: `positive`, `negative`, `neutral` (requires Essential+ plan)

**Webhook configuration:**
- Global webhook URL (account-level) — applies to all alerts
- Per-alert webhook URL — overrides global if both set
- Payload is JSON-encoded POST request

## Pagination

Not documented. Likely returns all alerts for a platform in a single response (alert counts are capped by plan limits: 2-500 depending on plan).

## Rate limits

Rate limiting is active (429 Too Many Requests returned on excess). Specific limits not documented. Recommended: implement exponential backoff on 429 responses.

## Gaps

- List/Get endpoints for keyword alerts and conversation trackers are inferred from docs navigation but not individually documented — verify paths against live API
- Rate limit specifics (requests per minute/hour) not documented
- Pagination pattern not documented
- Webhook retry policy not documented (test with a failing endpoint to determine behavior)
- Conversation tracker request/response schema beyond URL field not documented
