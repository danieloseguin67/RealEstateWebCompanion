<!-- Source: https://f5bot.com/docs-api -->

# F5Bot API Reference

## Authentication

All API requests require a Bearer token in the `Authorization` header.

```
Authorization: Bearer <your-token>
```

Generate and manage tokens from the API Dashboard at f5bot.com. API access requires the **Ultra plan** ($58.33/mo annual).

**Base URL**: `https://f5bot.com`

## Endpoints

### GET /api/get-alerts

Retrieve all alerts associated with your account.

**Query parameters**:

| Parameter | Type | Description |
|---|---|---|
| `format` | string | Response format: `json` (default) or `csv` |
| `group` | string | Filter by alert group name |
| `ids` | string | Comma-separated alert IDs to retrieve specific alerts |

**Example request**:
```bash
curl "https://f5bot.com/api/get-alerts?format=json" \
  -H "Authorization: Bearer $F5BOT_TOKEN"
```

**Example response** (JSON):
```json
[
  {
    "id": 12345,
    "keyword": "best CRM for startups",
    "flags": "whole only-url=/r/SaaS",
    "enabled": true
  },
  {
    "id": 12346,
    "keyword": "project management recommendation",
    "flags": "exclude=minecraft",
    "enabled": true
  }
]
```

<!-- Constructed from docs — verify against live API -->

### POST /api/create-alert

Create a new keyword alert.

**Request body** (JSON):

| Field | Type | Required | Description |
|---|---|---|---|
| `keyword` | string | Yes | The keyword to monitor (3-50 characters) |
| `flags` | string | No | Space-separated filtering flags |
| `enabled` | boolean | No | Whether the alert is active (default: true) |

**Example request**:
```bash
curl -X POST https://f5bot.com/api/create-alert \
  -H "Authorization: Bearer $F5BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "best project management tool", "flags": "whole only-url=/r/SaaS"}'
```

**Example response**:
```json
{
  "id": 12347,
  "keyword": "best project management tool",
  "flags": "whole only-url=/r/SaaS",
  "enabled": true
}
```

<!-- Constructed from docs — verify against live API -->

### POST /api/update-alert

Modify an existing alert.

**Request body** (JSON):

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | Yes | The alert ID to update |
| `keyword` | string | Yes | Updated keyword text |
| `flags` | string | No | Updated flags |
| `enabled` | boolean | No | Enable/disable the alert |

**Example request**:
```bash
curl -X POST https://f5bot.com/api/update-alert \
  -H "Authorization: Bearer $F5BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": 12345, "keyword": "best CRM for startups", "flags": "whole only-url=/r/SaaS exclude=enterprise", "enabled": true}'
```

### POST /api/delete-alert

Permanently remove an alert.

**Request body** (JSON):

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | Yes | The alert ID to delete |

**Example request**:
```bash
curl -X POST https://f5bot.com/api/delete-alert \
  -H "Authorization: Bearer $F5BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": 12345}'
```

## Webhooks

Configure a webhook URL in the API Dashboard. F5Bot sends an HTTP POST for each triggered alert.

### Webhook payload

```json
{
  "id": "abc123",
  "url": "https://www.reddit.com/r/SaaS/comments/xyz/my_post_title/",
  "title": "My post title",
  "content_html": "<p>The full post or comment HTML content...</p>",
  "date_published": "2026-05-06T14:30:00Z",
  "group": "competitor-mentions",
  "username": "reddit_user",
  "tags": ["keyword1", "keyword2"]
}
```

### Retry policy

| Attempt | Delay |
|---|---|
| 1st retry | Immediate |
| 2nd retry | 5 minutes |
| 3rd retry | 1 hour |
| 4th retry | 15 hours |

After 3 consecutive failures, webhook delivery is discontinued. Check delivery logs in the API Dashboard.

## Response codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad Request — invalid parameters |
| 401 | Unauthorized — missing or invalid token |
| 404 | Not Found — alert ID doesn't exist |
| 405 | Method Not Allowed — wrong HTTP method |
| 500 | Server Error |

## Rate limiting

Currently no hard rate limits. F5Bot may implement metering in the future.

## Gaps

- No webhook payload schema versioning documented
- No pagination documented for GET /api/get-alerts (may return all alerts in one response)
- No documented error response JSON shape (likely `{"error": "message"}` but unconfirmed)
- No webhook signature/HMAC verification documented — cannot cryptographically verify webhook authenticity
