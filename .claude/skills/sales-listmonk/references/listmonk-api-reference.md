<!-- Source: https://listmonk.app/docs/apis/apis/, https://listmonk.app/docs/apis/subscribers/, https://listmonk.app/docs/apis/campaigns/, https://listmonk.app/docs/apis/lists/, https://listmonk.app/docs/apis/transactional/ -->

# Listmonk API Reference

## Authentication

Two methods supported:

```bash
# BasicAuth
curl -u "api_user:token" http://localhost:9000/api/lists

# Authorization header
curl -H "Authorization: token api_user:token" http://localhost:9000/api/lists
```

API credentials are managed through Admin → Users. Granular API tokens with per-endpoint permissions are supported.

## Base URL

`http://localhost:9000/api/` (or your domain)

## Response format

**Success:**
```json
{
  "data": { ... }
}
```

**Error:**
```json
{
  "message": "Error description",
  "data": null
}
```

## Error codes

| Code | Meaning |
|---|---|
| 400 | Invalid parameters/values |
| 403 | Session expired or insufficient permissions |
| 404 | Resource not found |
| 405 | Method not allowed |
| 410 | Resource permanently gone |
| 422 | Unprocessable entity |
| 429 | Rate limited |
| 500-504 | Server/service errors |

## Pagination

List endpoints support:
- `page` (number) — page number (1-based)
- `per_page` (number or `"all"`) — results per page

## OpenAPI spec

Auto-generated Swagger spec available at: `https://listmonk.app/docs/swagger/`

---

## Subscribers API

### GET /api/subscribers
Query and retrieve subscribers.

| Parameter | Type | Description |
|---|---|---|
| query | string | SQL expression filter |
| list_id | number[] | Filter by list IDs |
| subscription_status | string | Filter by subscription status |
| order_by | string | Sort field |
| order | string | ASC or DESC |
| page | number | Page number |
| per_page | number | Results per page |

### GET /api/subscribers/{id}
Retrieve a specific subscriber with attributes and list subscriptions.

### POST /api/subscribers
Create a new subscriber.

```json
{
  "email": "user@example.com",
  "name": "Jane Doe",
  "status": "enabled",
  "lists": [1, 2],
  "attribs": {"company": "Acme", "plan": "pro"},
  "preconfirm_subscriptions": true
}
```

### PUT /api/subscribers/{id}
Full update (all fields required — omitted lists are cleared).

### PATCH /api/subscribers/{id}
Partial update (preserves existing data for omitted fields).

### DELETE /api/subscribers/{id}
Delete a single subscriber.

### PUT /api/subscribers/lists
Modify multiple subscribers' list memberships.

```json
{
  "ids": [1, 2, 3],
  "action": "add",
  "target_list_ids": [4, 5],
  "status": "confirmed"
}
```

Actions: `add`, `remove`, `unsubscribe`

### POST /api/subscribers/{id}/optin
Send opt-in confirmation email.

### POST /api/public/subscription
Public subscription endpoint (no auth required). Accepts JSON or form data.

```json
{
  "email": "user@example.com",
  "name": "Jane Doe",
  "list_uuids": ["list-uuid-1", "list-uuid-2"]
}
```

### PUT /api/subscribers/{id}/blocklist
Blocklist a single subscriber.

### PUT /api/subscribers/blocklist
Blocklist multiple subscribers.

```json
{
  "ids": [1, 2, 3]
}
```

### PUT /api/subscribers/query/blocklist
Blocklist subscribers matching SQL expression.

### GET /api/subscribers/{id}/export
Export subscriber profile, subscriptions, campaign views, and link clicks.

### GET /api/subscribers/{id}/bounces
Retrieve bounce records for a subscriber.

### DELETE /api/subscribers/{id}/bounces
Clear subscriber's bounce history.

### DELETE /api/subscribers
Delete multiple subscribers.

```json
{
  "ids": [1, 2, 3]
}
```

### POST /api/subscribers/query/delete
Delete subscribers matching SQL expression.

---

## Lists API

### GET /api/lists
Retrieve lists with filtering.

| Parameter | Type | Description |
|---|---|---|
| query | string | Name search |
| status | string | active or archived |
| minimal | boolean | Omit subscriber counts |
| tag | string[] | Filter by tags |
| order_by | string | name, status, created_at, updated_at |
| order | string | ASC or DESC |
| page | number | Page number |
| per_page | number or "all" | Results per page |

### GET /api/public/lists
Public lists endpoint (no auth). Returns name and UUID only.

### GET /api/lists/{id}
Retrieve a specific list.

### POST /api/lists
Create a new list.

```json
{
  "name": "Weekly Newsletter",
  "type": "public",
  "optin": "double",
  "tags": ["newsletter"],
  "description": "Weekly product updates"
}
```

### PUT /api/lists/{id}
Update a list (all fields optional).

### DELETE /api/lists/{id}
Delete a specific list.

### DELETE /api/lists
Delete multiple lists by IDs or query.

---

## Campaigns API

### GET /api/campaigns
Retrieve all campaigns with pagination and filtering.

### GET /api/campaigns/{id}
Retrieve a specific campaign.

### GET /api/campaigns/{id}/preview
Retrieve rendered preview of a campaign.

### GET /api/campaigns/running/stats
Retrieve stats of running campaigns.

### GET /api/campaigns/analytics/{type}
Retrieve analytics. Types: `views`, `links`, `clicks`, `bounces`.

### POST /api/campaigns
Create a new campaign.

```json
{
  "name": "March Newsletter",
  "subject": "What's new in March",
  "lists": [1],
  "from_email": "newsletter@example.com",
  "type": "regular",
  "content_type": "richtext",
  "body": "<h1>Hello {{ .Subscriber.Name }}!</h1>",
  "template_id": 1,
  "tags": ["monthly"],
  "send_at": "2024-03-15T09:00:00Z"
}
```

### POST /api/campaigns/{id}/test
Send test campaign to specific subscribers.

### PUT /api/campaigns/{id}
Update a campaign.

### PUT /api/campaigns/{id}/status
Change campaign status.

```json
{
  "status": "running"
}
```

Valid transitions: draft → scheduled, draft → running, running → paused, paused → running, running → cancelled, paused → cancelled.

### PUT /api/campaigns/{id}/archive
Publish campaign to public archive.

### DELETE /api/campaigns/{id}
Delete a campaign.

### DELETE /api/campaigns
Delete multiple campaigns.

---

## Transactional API

### POST /api/tx
Send a transactional message.

```json
{
  "subscriber_email": "user@example.com",
  "template_id": 2,
  "data": {
    "order_id": "ORD-1234",
    "items": ["Widget A", "Widget B"],
    "total": "$49.99"
  },
  "content_type": "html"
}
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| subscriber_email | string | * | Recipient email |
| subscriber_id | number | * | Alternative to email |
| subscriber_emails | string[] | * | Multiple recipients |
| subscriber_ids | number[] | * | Multiple recipients by ID |
| template_id | number | Yes | Transactional template ID |
| subscriber_mode | string | No | `default`, `fallback`, or `external` |
| from_email | string | No | Override sender |
| subject | string | No | Override template subject |
| data | object | No | Template variables (available as `{{ .Tx.Data.* }}`) |
| headers | object[] | No | Custom email headers |
| messenger | string | No | Delivery service (default: `email`) |
| content_type | string | No | `html`, `markdown`, or `plain` |
| altbody | string | No | Plaintext alternative |

**Subscriber modes:**
- `default` — recipient must exist as subscriber
- `fallback` — looks up subscriber, sends anyway if not found
- `external` — sends to emails without subscriber lookup

**File attachments:** Use `multipart/form-data` with `data` as JSON string + `file` fields.

**Response:**
```json
{
  "data": true
}
```

---

## Bounce webhook endpoints

These receive bounce notifications from SMTP providers:

- `POST /webhooks/service/ses` — Amazon SES (via SNS)
- `POST /webhooks/service/sendgrid` — SendGrid Event Webhook
- `POST /webhooks/service/postmark` — Postmark bounce webhook

---

## Rate limiting

No documented rate limits from Listmonk itself (self-hosted, so you control it). The 429 error code is listed but no specific limits are documented. SMTP rate limiting is configurable via sliding window settings in the admin UI.

## Timestamps

Format: `2019-01-01T09:00:00.000000+05:30` (ISO 8601 with microseconds and timezone offset)
