<!-- Source: https://dev.frontapp.com/docs/welcome, https://dev.frontapp.com/reference/introduction, https://dev.frontapp.com/docs/authentication, https://dev.frontapp.com/docs/rate-limiting, https://dev.frontapp.com/docs/pagination -->

# Front API Reference

## Base URL

```
https://api2.frontapp.com
```

Company-specific URLs also accepted: `https://{company}.api.frontapp.com`

## Authentication

Two methods:

**API Tokens** — for testing and single-customer integrations. Generate in Front Settings.

**OAuth 2.0** — required for public integrations available to all Front customers.

Both use Bearer token in the Authorization header:

```bash
curl -s "https://api2.frontapp.com/me" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Token scopes

Tokens support three feature types:
- **Access resources** — manage Core API resources (conversations, contacts, inboxes)
- **Auto-provisioning** — manage SCIM provisioning resources
- **Application triggers** — process external service events

Granular permissions: read, write, delete, send. Namespace: global, shared, or private resources.

## API Types

### Core API
Full CRUD on all Front entities: conversations, contacts, messages, tags, teammates, inboxes, comments, events, analytics.

### Channels API
Connect custom messaging platforms to Front — add inbound/outbound conversation sources (SMS, social, custom chat).

### Plugin SDK
Embed custom side-panel apps in Front UI. Context-aware access to current conversation, contact, and user.

### Chat Widget SDK
Add Front-powered chat to your website.

## Core API Endpoints

| Resource | Key Endpoints |
|---|---|
| Conversations | `GET /conversations`, `GET /conversations/:id`, `PATCH /conversations/:id`, `GET /conversations/search/:query` |
| Messages | `GET /conversations/:id/messages`, `POST /channels/:id/messages` |
| Drafts | `GET /conversations/:id/drafts`, `POST /conversations/:id/drafts` |
| Contacts | `GET /contacts`, `GET /contacts/:id`, `POST /contacts`, `PATCH /contacts/:id`, `DELETE /contacts/:id` |
| Tags | `GET /tags`, `POST /tags`, `POST /conversations/:id/tags` |
| Teammates | `GET /teammates`, `GET /teammates/:id`, `GET /teammates/:id/conversations` |
| Inboxes | `GET /inboxes`, `GET /inboxes/:id`, `GET /inboxes/:id/conversations` |
| Comments | `GET /conversations/:id/comments`, `POST /conversations/:id/comments` |
| Events | `GET /events`, `GET /events/:id` |
| Analytics | `POST /analytics/exports`, `POST /analytics/reports` |
| Knowledge Base | `GET /knowledge_bases`, articles CRUD |
| Accounts | `GET /accounts`, `POST /accounts`, `PATCH /accounts/:id` |
| Rules | `GET /rules` |

## Request/Response Format

- **Content-Type**: `application/json`
- **File uploads**: `multipart/form-data` — array fields use indexed notation (`to[0]`, `to[1]`)
- **Timestamps**: Unix with millisecond precision (e.g., `1454453901.012`)
- **Responses**: JSON objects with `_links` for HATEOAS navigation

## Pagination

**Pattern**: Cursor-based

**Parameters**:
- `limit` — results per page (default: 50, max: 100)
- `page_token` — cursor for next page (from previous response)

**Response**:
```json
{
  "_results": [...],
  "_pagination": {
    "next": "https://api2.frontapp.com/contacts?limit=25&page_token=2d018a..."
  }
}
```

When `_pagination.next` is `null`, no more results exist. Always use the `next` URL directly — don't reconstruct it.

## Rate Limits

### Per-plan limits (per company, per minute)

| Plan | Standard | Burst (50% extra) |
|---|---|---|
| Starter | 50 rpm | 25 rpm burst |
| Professional | 100 rpm | 50 rpm burst |
| Enterprise | 200 rpm | 100 rpm burst |

Partner integrations (OAuth): 120 rpm per-company (separate from customer's quota).

### Response headers

| Header | Description |
|---|---|
| `x-ratelimit-limit` | Max requests in current window |
| `x-ratelimit-remaining` | Remaining requests |
| `x-ratelimit-reset` | UNIX timestamp for window reset |
| `x-ratelimit-burst-limit` | Burst allowance |
| `x-ratelimit-burst-remaining` | Remaining burst requests |

### 429 response

```json
HTTP 429 Too Many Requests
retry-after: 12
x-front-tier: standard
```

`x-front-tier` indicates which limit was hit (`standard`, `burst`, `tier1`, `tier2`).

### Endpoint-specific limits

| Endpoint | Limit |
|---|---|
| `POST /analytics/exports` | 1 req/sec (Tier 1) |
| `POST /analytics/reports` | 1 req/sec (Tier 1) |
| Conversation/channel/teammate endpoints | 5 req/resource/sec (Tier 2) |
| `POST /messages/:id/seen` | 10 req/message/hour |
| `GET /conversations/search/:query` | 40% of global rate limit |

## Webhooks

### Two types

**Application webhooks** — for production integrations. Deliver full event payloads. Shared inbox scope. Server must be ready at configuration time.

**Rule webhooks** — for testing. Can send event preview (lighter) or full payload. Scoped to inbox where rule was created.

### Event types

Webhooks fire for conversation, message, tag, and teammate events. Mass actions (batch status changes, inbox migrations, historical imports) are excluded.

### Delivery

Webhooks are POST requests with JSON event body. Implement idempotency using event IDs. Exact retry policy not publicly documented.

## OpenAPI Specs

Available at `github.com/frontapp/front-api-specs`:
- `core-api/core-api.json` — Core API OpenAPI spec
- `channel-api/channel-api.json` — Channel API OpenAPI spec
- Postman collections included for both APIs

## Gaps

- Webhook payload schemas not fully documented in public docs — use OpenAPI specs or test with rule webhooks to capture payloads
- Webhook retry policy (count, backoff) not publicly specified
- Connector configuration is UI-only — no API for managing connectors
- Rule creation/modification is UI-only — rules are read-only via API (`GET /rules`)
