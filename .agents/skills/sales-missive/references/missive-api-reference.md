<!-- Source: https://missiveapp.com/docs/developers/rest-api/endpoints -->
<!-- Source: https://missiveapp.com/docs/developers/webhooks -->

# Missive API Reference

## Authentication

Bearer token via `Authorization: Bearer YOUR_API_TOKEN` header.

API tokens are generated in Missive Settings. **Requires Productive plan ($24/user/mo) or above.**

```bash
curl https://mail.missiveapp.com/v1/organizations \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Base URL

`https://mail.missiveapp.com/v1/`

## Rate Limits

Not officially documented. Implement exponential backoff on HTTP 429 responses.

## Pagination

Uses `limit` and `offset` parameters:
- Default `limit`: 50
- Max `limit`: 200
- Some endpoints use `until` (Unix timestamp) for cursor-based pagination

## Endpoints

### Analytics

| Method | Path | Description |
|---|---|---|
| POST | `/v1/analytics/reports` | Create analytics report |
| GET | `/v1/analytics/reports/:id` | Get analytics report (Productive/Business) |

### Contacts

| Method | Path | Description |
|---|---|---|
| POST | `/v1/contacts` | Create contact(s) |
| PATCH | `/v1/contacts/:id1,:id2,...` | Update contact(s) — comma-separated IDs |
| GET | `/v1/contacts` | List contacts |
| GET | `/v1/contacts/:id` | Get a single contact |

### Contact Books

| Method | Path | Description |
|---|---|---|
| GET | `/v1/contact_books` | List contact books |

### Contact Groups

| Method | Path | Description |
|---|---|---|
| GET | `/v1/contact_groups` | List contact groups / organizations |

### Conversations

| Method | Path | Description |
|---|---|---|
| GET | `/v1/conversations` | List conversations (requires `mailbox` filter) |
| GET | `/v1/conversations/:id` | Get a single conversation |
| GET | `/v1/conversations/:id/messages` | List messages in a conversation |
| GET | `/v1/conversations/:id/comments` | List internal comments on a conversation |
| GET | `/v1/conversations/:id/drafts` | List drafts in a conversation |
| GET | `/v1/conversations/:id/posts` | List posts in a conversation |
| POST | `/v1/conversations/:id/merge` | Merge two or more conversations |

### Drafts

| Method | Path | Description |
|---|---|---|
| POST | `/v1/drafts` | Create a draft (set `send: true` to send immediately) |
| DELETE | `/v1/drafts/:id` | Delete a draft |

**Key draft parameters:**
- `subject` — email subject
- `body` — HTML body
- `from_field` — `{ "address": "email@example.com" }`
- `to_fields` — array of `{ "address": "..." }`
- `cc_fields`, `bcc_fields` — same format
- `send` — `true` to send immediately
- `send_at` — Unix timestamp for scheduled send
- `conversation` — link to existing conversation ID
- `team` — link draft's conversation to a team
- `add_assignees` — array of user IDs
- `add_labels` — array of label IDs
- `organization` — organization ID
- `close` — `true` to close conversation after sending

### Messages

| Method | Path | Description |
|---|---|---|
| POST | `/v1/messages` | Create incoming custom channel message |
| GET | `/v1/messages/:id` | Get a message |
| GET | `/v1/messages` | List messages (filter by `email_message_id`) |

### Organizations

| Method | Path | Description |
|---|---|---|
| GET | `/v1/organizations` | List organizations the authenticated user belongs to |

### Responses (Canned Templates)

| Method | Path | Description |
|---|---|---|
| GET | `/v1/responses` | List response templates |
| GET | `/v1/responses/:id` | Get a response template |
| POST | `/v1/responses` | Create response template(s) |

**Response template fields:**
- `name` — template name
- `body` — HTML content
- `subject` — optional subject line
- `external_id`, `external_source` — for syncing with external systems

## Webhooks

### Setup

1. Go to Settings → Rules → New Rule
2. Select trigger condition (new message, label change, etc.)
3. Select "Webhook" as the action
4. Paste your endpoint URL
5. Missive validates the endpoint with a test POST request

**Requirements:**
- Productive or Business plan
- Admin/owner role in the organization
- Endpoint must respond within 15 seconds

### Signature Verification

Webhooks include `X-Hook-Signature` header: `sha256={HMAC-SHA256 hexdigest}`.

Verify using:
```python
import hmac, hashlib

def verify_signature(payload_bytes, signature_header, secret):
    expected = "sha256=" + hmac.new(
        secret.encode(), payload_bytes, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature_header, expected)
```

### Retry Behavior

- Failed requests retry up to 5 times over 8 minutes
- Rules auto-disable after 50+ consecutive failures
- Re-enable manually in Rules settings

### Payload Structure

See platform-guide.md for full webhook payload JSON schema.

## Conversation Actions via Drafts

There is no direct "update conversation" endpoint. Instead, use the drafts endpoint with action parameters:

- `close: true` — close the conversation
- `add_to_inbox: true` — move to inbox
- `add_assignees: [user_ids]` — assign to users
- `add_labels: [label_ids]` — apply labels
- `remove_labels: [label_ids]` — remove labels

## Gaps

- Rate limit details not documented — implement exponential backoff
- No bulk export endpoint — must paginate through conversations
- No direct conversation update endpoint — use draft actions
- Webhook event types not enumerated separately — tied to Rule trigger conditions
- Teams endpoint exists (`GET /v1/teams`) but not fully documented in public docs
