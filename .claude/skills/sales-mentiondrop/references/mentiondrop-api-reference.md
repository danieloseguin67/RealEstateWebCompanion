<!-- Source: https://www.mentiondrop.com/openapi/mentiondrop-v1.json, https://www.mentiondrop.com/docs/api -->

# MentionDrop API Reference

## Overview

Read-only HTTP API for AI-processed web mentions. Authenticate with an API key from the MentionDrop dashboard (Settings → API Key).

- **Base URL:** `https://www.mentiondrop.com`
- **OpenAPI spec:** `https://www.mentiondrop.com/openapi/mentiondrop-v1.json` (OpenAPI 3.1.0)
- **API version:** 1.0.0

## Authentication

Two methods supported (use either):

| Method | Header | Example |
|---|---|---|
| Bearer token | `Authorization: Bearer <key>` | `Authorization: Bearer sk_live_abc123` |
| API key header | `X-API-Key: <key>` | `X-API-Key: sk_live_abc123` |

Create your API key in the MentionDrop dashboard under **Settings**.

### Auth quick-start

```bash
# Verify your API key works
curl -s "https://www.mentiondrop.com/api/v1/mentions?limit=1" \
  -H "X-API-Key: your_api_key_here" | jq .
```

## Endpoints

### GET /api/v1/mentions

Retrieve processed mentions with optional filtering. This is the only data endpoint — the API is read-only.

**Query parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `keyword` | UUID | No | — | Filter by keyword UUID. **Repeatable** — pass multiple `keyword=uuid1&keyword=uuid2` |
| `sentiment` | string | No | — | Enum: `positive`, `neutral`, `negative` |
| `content_type` | string | No | — | Enum: `article`, `comment`, `job_posting`, `cv`, `course`, `documentation`, `other` |
| `from` | datetime | No | — | ISO-8601 with offset (e.g., `2026-05-01T00:00:00Z`) |
| `to` | datetime | No | — | ISO-8601 with offset |
| `page` | integer | No | 1 | Page number (minimum: 1) |
| `limit` | integer | No | 20 | Results per page (range: 1-100) |

**Response — 200 OK:**

<!-- Constructed from OpenAPI spec — verify against live API -->

```json
{
  "mentions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "keyword_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "url": "https://reddit.com/r/SaaS/comments/abc123/...",
      "title": "Looking for a lightweight project management tool",
      "summary": "User is frustrated with Asana's complexity and asking for simpler alternatives for a 5-person remote team.",
      "sentiment": "negative",
      "relevance_score": 0.87,
      "content_type": "comment",
      "suggested_action": "respond",
      "published_at": "2026-05-06T14:30:00Z",
      "created_at": "2026-05-06T14:34:12Z"
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 142
}
```

**Error responses:**

| Status | Meaning | Example |
|---|---|---|
| 400 | Invalid query parameters | `{"error": "Invalid sentiment value"}` |
| 401 | Missing or invalid API key | `{"error": "Unauthorized"}` |
| 500 | Server error | `{"error": "Internal server error"}` |

### GET /api/status

Public health check endpoint. No authentication required.

```bash
curl -s "https://www.mentiondrop.com/api/status" | jq .
```

## Pagination

Offset-based pagination using `page` and `limit` parameters.

```bash
# Page 1 (default)
curl -s "https://www.mentiondrop.com/api/v1/mentions?limit=100&page=1" \
  -H "X-API-Key: your_key"

# Page 2
curl -s "https://www.mentiondrop.com/api/v1/mentions?limit=100&page=2" \
  -H "X-API-Key: your_key"
```

Loop until the response returns an empty `mentions` array or `mentions` count is less than `limit`.

## Rate limits

Rate limit details are not documented in the OpenAPI spec. Monitor response headers for `X-RateLimit-*` or `Retry-After` headers. If you encounter 429 responses, implement exponential backoff:

```python
import time
import requests

def fetch_with_backoff(url, headers, params, max_retries=3):
    for attempt in range(max_retries):
        resp = requests.get(url, headers=headers, params=params)
        if resp.status_code == 429:
            wait = 2 ** attempt
            time.sleep(wait)
            continue
        resp.raise_for_status()
        return resp.json()
    raise Exception("Rate limited after max retries")
```

## Discovery endpoints

| Endpoint | Purpose |
|---|---|
| `/.well-known/api-catalog` | RFC 9727 API catalog |
| `/openapi/mentiondrop-v1.json` | OpenAPI 3.1 specification |
| `/.well-known/openid-configuration` | OIDC discovery (Clerk auth) |
| `/.well-known/oauth-protected-resource` | RFC 9728 resource metadata |

## Gaps

- **No write endpoints.** Keywords, settings, and alerts can only be managed via the dashboard UI.
- **Webhook payload schema not documented.** The API spec only covers the GET endpoint. Webhook POST payloads should be captured via webhook.site.
- **Rate limits not documented.** No published rate limit policy in the OpenAPI spec.
- **Keyword UUID discovery not documented.** The API filters by keyword UUID but there's no documented endpoint to list keywords and their UUIDs. Check the dashboard or OpenAPI spec for additional endpoints not yet documented.
