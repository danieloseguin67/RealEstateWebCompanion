<!-- Source: https://developers.gmelius.com/ -->

# Gmelius API Reference

## Base URL

`https://api.gmelius.com/public/v2`

## Authentication

OAuth 2.0 with OpenID Connect 1.0 and PKCE.

**Authorization URL**: `https://gmelius.io/oauth/authorize`
**Token endpoint**: `POST https://api.gmelius.com/public/v2/token`

Parameters:
- `client_id` — your app's client ID
- `redirect_uri` — registered callback URL
- `code_challenge` — PKCE challenge
- `scope` — space-separated scope list

**Token lifecycle**:
- Access token: expires after 1 hour
- Refresh token: valid for 60 days, renew at 30-day mark

**Plan requirement**: API access requires Growth plan ($25/user/mo) or above. Admin/manager credentials required.

## Scopes

| Scope | Description |
|---|---|
| `https://api.gmelius.com/public/auth/boards/read` | Read board access |
| `https://api.gmelius.com/public/auth/boards/modify` | Read/write board access |
| `https://api.gmelius.com/public/auth/conversations/read` | Read conversations |
| `https://api.gmelius.com/public/auth/conversations/metadata` | Modify conversation metadata (assign, tag, status) |
| `https://api.gmelius.com/public/auth/conversations/insert` | Reply to and draft conversations |
| `https://api.gmelius.com/public/auth/sequences/enroll` | Manage sequence enrollments |
| `offline_access` | Obtain tokens without user interaction |

## Response format

All responses follow this structure:
```json
{
  "meta": {"status": 200, "code": "Ok"},
  "data": {}
}
```

## Endpoints

### Boards

| Method | Path | Description |
|---|---|---|
| GET | `/auth/boards` | List user's boards |
| POST | `/auth/boards` | Create board |
| GET | `/auth/boards/{id}` | Retrieve board |
| PUT | `/auth/boards/{id}` | Update board |
| DELETE | `/auth/boards/{id}` | Delete board |

### Board Columns

| Method | Path | Description |
|---|---|---|
| GET | `/auth/boards/{id}/columns` | List columns |
| POST | `/auth/boards/{id}/columns` | Create column |
| GET | `/auth/boards/columns/{id}` | Get column details |
| PATCH | `/auth/boards/columns/{id}` | Update column |
| DELETE | `/auth/boards/columns/{id}` | Delete column |

### Board Cards

| Method | Path | Description |
|---|---|---|
| GET | `/auth/boards/columns/{id}/cards` | List cards in column |
| GET | `/auth/boards/cards/{id}` | Get card details |
| PATCH | `/auth/boards/cards/{id}` | Update card |

**Pagination for cards**:
- `limit` (query, number): defaults to 50
- `from` (query, number): pagination start point
- `vri` (query, number): vertical row index (0 or 1)

### Conversations

| Method | Path | Description |
|---|---|---|
| GET | `/auth/shared-folders/{id}/conversations` | List conversations in shared folder |
| GET | `/auth/conversations/{id}` | Get conversation |
| POST | `/auth/conversations/{id}/notes` | Create note on conversation |
| POST | `/auth/conversations/{id}/replies` | Reply to conversation |
| POST | `/auth/conversations/{id}/drafts` | Create draft on conversation |
| POST | `/auth/conversations/{id}/tags` | Add tag to conversation |
| PATCH | `/auth/conversations/{id}/assignee` | Assign conversation |
| PATCH | `/auth/conversations/{id}/status` | Update conversation status |

### Sequences

| Method | Path | Description |
|---|---|---|
| GET | `/auth/sequences` | List user's sequences |
| GET | `/auth/sequences/{id}` | Get sequence details |
| POST | `/auth/sequences/{id}/enrollments` | Enroll contact in sequence |
| DELETE | `/auth/sequences/{id}/enrollments/{user_id}` | Disenroll contact |

### Webhooks (Pro plan required)

| Method | Path | Description |
|---|---|---|
| GET | `/auth/webhooks` | List all webhooks |
| POST | `/auth/webhooks` | Create webhook |
| GET | `/auth/webhooks/{id}` | Get webhook |
| GET | `/auth/webhooks/{id}/events` | List webhook events |
| DELETE | `/auth/webhooks/{id}` | Delete webhook |

## Data Models

### SharedFolder
### User
### Conversation
### Note
### Tag
### Board
### Column
### Card
### Sequence
### SequenceVariable

## Rate Limits

Rate limits are referenced in documentation but specific values are not publicly documented. Implement exponential backoff on 429 responses.

## Gaps

- Webhook payload schema not documented in public API docs — test with real events to capture shapes
- Rate limit specific values (requests/minute, burst limits) not documented
- Conversation search/filter parameters not documented beyond folder listing
- Meli AI assistant has no API surface — all AI features are UI-only
