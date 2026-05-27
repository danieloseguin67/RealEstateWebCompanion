<!-- Source: https://syften.com/documentation + https://github.com/syften/syften-examples -->

# Syften API Reference

## Overview

Syften provides a REST API for programmatic access to keyword monitoring data. Available on Standard plan (€39.95/mo) and above.

## Authentication

API key-based authentication via Bearer token in the Authorization header.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://syften.com/api/v1/mentions"
```

API keys are generated in the Syften dashboard under Settings.

## Known endpoints

The API documentation was partially inaccessible (help center returned 503). Based on available information:

| Method | Path | Description | Plan required |
|---|---|---|---|
| GET | `/api/v1/mentions` | List recent mentions matching your filters | Standard+ |
| GET | `/api/v1/mentions/{id}` | Get a single mention by ID | Standard+ |
| GET | `/api/v1/filters` | List configured filters | Standard+ |
| POST | `/api/v1/filters` | Create a new filter | Standard+ |
| PUT | `/api/v1/filters/{id}` | Update a filter | Standard+ |
| DELETE | `/api/v1/filters/{id}` | Delete a filter | Standard+ |

## Response format

<!-- Constructed from docs — verify against live API -->

### GET /api/v1/mentions

```json
{
  "results": [
    {
      "id": "mention_abc123",
      "keyword": "my-product",
      "title": "Looking for a tool that does X",
      "text": "Has anyone tried my-product?...",
      "url": "https://reddit.com/r/SaaS/comments/abc123/...",
      "source": "reddit",
      "author": "username123",
      "created_at": "2026-05-05T14:30:00Z",
      "tags": ["leads"],
      "ai_verdict": "relevant",
      "ai_confidence": 0.92
    }
  ],
  "total": 42,
  "has_more": true
}
```

**AI verdict fields** (Standard+ with AI filtering enabled):
- `ai_verdict`: "relevant" | "spam" | "duplicate" | "weak_match"
- `ai_confidence`: float 0.0–1.0

## Pagination

Cursor-based or time-based using `since` parameter:

```bash
# Time-based: get mentions since a timestamp
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://syften.com/api/v1/mentions?since=2026-05-05T00:00:00Z&limit=50"
```

## Rate limits

Not documented publicly. GitHub examples repo (Go + Shell) suggests standard polling intervals. Recommend polling no more than every 5 minutes.

## Webhooks (PRO only)

Webhooks push new mentions to your HTTP endpoint as they arrive.

### Webhook payload

<!-- Constructed from docs — verify against live API -->
```json
{
  "event": "new_mention",
  "mention": {
    "id": "mention_abc123",
    "keyword": "my-product",
    "title": "Looking for a tool that does X",
    "text": "Has anyone tried my-product?...",
    "url": "https://reddit.com/r/SaaS/comments/abc123/",
    "source": "reddit",
    "author": "username123",
    "created_at": "2026-05-05T14:30:00Z",
    "tags": ["leads"],
    "ai_verdict": "relevant",
    "ai_confidence": 0.92
  }
}
```

Configure webhook URL in Syften dashboard → Settings → Webhooks.

## Zapier integration

**Trigger:** "New Mention" — fires when a new mention matches any of your filters.

**Available fields in trigger output:**
- Keyword, title, text, URL, source, author, created_at, tags, ai_verdict

No native Zapier actions (Syften is trigger-only).

## GitHub examples

Repository: https://github.com/syften/syften-examples
- `/curl/` — Shell scripts demonstrating API calls
- `/webhook/` — Go webhook listener examples

Languages: Go (53%), Shell (47%)

## Gaps

- Full endpoint documentation not fetchable (help center returned 503)
- Rate limit headers and retry strategy not documented
- Pagination details (cursor vs offset) unconfirmed
- Error response format not documented
- Filter creation payload schema not confirmed
- Webhook retry behavior not documented
