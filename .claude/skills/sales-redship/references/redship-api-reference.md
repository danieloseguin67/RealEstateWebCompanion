<!-- Source: https://redship.io/docs/api-reference/getting-started -->
<!-- Source: https://redship.io/docs/api-reference/list-inbox -->
<!-- Source: https://redship.io/docs/api-reference/get-inbox-item -->
<!-- Source: https://redship.io/docs/api-reference/update-inbox-item -->

# RedShip API Reference

## Authentication

All requests require Bearer token authentication.

```
Authorization: Bearer rsp_your_api_key_here
```

**API Key Generation:**
1. Navigate to Settings → API tab in your dashboard
2. Click "Create Key" and assign a name
3. Copy immediately — displayed only once

Keys are prefixed with `rsp_` (e.g., `rsp_a1b2c3d4e5f6...`).

## Base URL

```
https://redship.io/api/v1
```

## Endpoints

### GET /api/v1/inbox — List inbox items

Returns a paginated list of inbox items for the authenticated user.

**Query parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search_id` | string | No | Filter by a specific search/project |
| `unread_only` | boolean | No | Only return unread items |
| `saved_only` | boolean | No | Only return saved items |
| `min_score` | number | No | Minimum relevance score (0-100) |
| `type` | string | No | Filter by type: `seo`, `realtime`, or `comment` |
| `sort_by` | string | No | Sort: `score_high`, `score_low`, `newest`, `oldest`, `upvotes`, `comments` |
| `limit` | number | No | Items per page, max 100 (default: 50) |
| `offset` | number | No | Number of items to skip (default: 0) |

**Example request:**

```bash
curl -H "Authorization: Bearer rsp_your_key" \
  "https://redship.io/api/v1/inbox?unread_only=true&min_score=70&limit=10"
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "post_id": "1abc2de",
      "post_title": "Looking for a tool to automate Reddit outreach",
      "post_url": "https://reddit.com/r/SaaS/comments/1abc2de/...",
      "post_author": "reddit_user",
      "post_subreddit": "SaaS",
      "post_content": "We've been manually replying to posts...",
      "post_created_utc": 1700000000,
      "post_score": 42,
      "post_num_comments": 15,
      "relevance_score": 85,
      "type": "seo",
      "is_read": false,
      "is_saved": false,
      "is_declined": false,
      "matched_keyword": "automation tool",
      "comment_id": null,
      "comment_content": null,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 42,
  "limit": 10,
  "offset": 0
}
```

**Pagination:** Offset-based. Increment `offset` by `limit` to page through results. `count` gives total matching items.

---

### GET /api/v1/inbox/:id — Get single inbox item

Returns a single inbox item by UUID.

**Path parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | The inbox item UUID |

**Example request:**

```bash
curl -H "Authorization: Bearer rsp_your_key" \
  "https://redship.io/api/v1/inbox/550e8400-e29b-41d4-a716-446655440000"
```

**Response (200 OK):**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "post_id": "1abc2de",
    "post_title": "Looking for a tool to automate Reddit outreach",
    "post_url": "https://reddit.com/r/SaaS/comments/1abc2de/...",
    "post_author": "reddit_user",
    "post_subreddit": "SaaS",
    "post_content": "We've been manually replying to posts...",
    "post_created_utc": 1700000000,
    "post_score": 42,
    "post_num_comments": 15,
    "relevance_score": 85,
    "type": "seo",
    "is_read": false,
    "is_saved": false,
    "is_declined": false,
    "matched_keyword": "automation tool",
    "comment_id": null,
    "comment_content": null,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### PATCH /api/v1/inbox/:id — Update inbox item state

Update the state of an inbox item. All body fields are optional.

**Path parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | The inbox item UUID |

**Request body (JSON):**

| Field | Type | Description |
|-------|------|-------------|
| `is_read` | boolean | Mark as read or unread |
| `is_saved` | boolean | Save or unsave the item |
| `is_declined` | boolean | Decline (hide) the item |

**Example request:**

```bash
curl -X PATCH \
  -H "Authorization: Bearer rsp_your_key" \
  -H "Content-Type: application/json" \
  -d '{"is_read": true, "is_saved": true}' \
  "https://redship.io/api/v1/inbox/550e8400-e29b-41d4-a716-446655440000"
```

**Response (200 OK):**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "post_title": "Looking for a tool to automate Reddit outreach",
    "is_read": true,
    "is_saved": true,
    "is_declined": false,
    "read_at": "2024-01-15T12:00:00Z",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## Error responses

| Status | Meaning |
|--------|---------|
| 401 | Invalid or missing API key |
| 404 | Item not found or not owned by user |
| 400 | Invalid request body or parameters |
| 500 | Server error |

Error response shape:

```json
{
  "error": "Descriptive error message"
}
```

## Rate limits

No hard rate limit numbers documented. RedShip states: "Please keep requests reasonable. Excessive usage may be throttled."

**Recommended approach:**
- Poll no more frequently than once per minute
- Use webhooks for real-time needs instead of rapid polling
- Implement exponential backoff if you receive 429 or 5xx responses

## Webhooks

RedShip supports HTTPS webhook push notifications. Configuration is in the dashboard settings.

**What's documented:**
- Webhook URL must be HTTPS
- Fires when new inbox items are detected

**What's NOT documented:**
- Exact payload schema (likely mirrors inbox item JSON — verify by logging)
- Retry behavior on delivery failure
- Signature/verification header for payload authenticity
- Whether webhooks fire for all items or only above a score threshold

**Recommendation:** Set up a request logger (webhook.site) first to capture actual payloads before building production integrations.

## Gaps

- No webhook payload schema documented
- No rate limit headers or numbers documented
- No create/delete endpoints (read + update only)
- No search/project management endpoints
- No keyword management via API
- No DM sending via API (UI-only)
- No AI reply generation via API (UI-only)
