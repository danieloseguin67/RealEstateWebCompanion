<!-- Source: https://octolens.com/docs/api/overview -->
<!-- Additional context: https://octolens.com/social-listening-api -->

# Octolens API Reference

## Base URL

```
https://app.octolens.com/api/v1
```

## Authentication

Bearer token in the Authorization header.

```bash
curl -X POST https://app.octolens.com/api/v1/mentions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"limit": 20}'
```

**Key management:** Create API keys at Settings > API tab. Specify name and expiration date. Revoke via three-dot menu.

API access included on all plans (Pro, Scale, Enterprise).

## Rate Limits

500 requests per hour.

**Headers:**
- `X-RateLimit-Limit` — max requests per window
- `X-RateLimit-Remaining` — requests left
- `X-RateLimit-Reset` — seconds until reset

**On 429:** Back off until `X-RateLimit-Reset` seconds have elapsed.

## Endpoints

### POST /mentions

Retrieves mentions matching configured keywords with filtering.

**Request body:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer (1-100) | No | Results per page. Default: 20 |
| `cursor` | string | No | Pagination cursor from previous response |
| `view` | string | No | View ID to apply pre-configured filters |
| `includeAll` | boolean | No | Include all mentions regardless of filters |
| `sources` | string[] | No | Filter by platform: reddit, twitter, linkedin, github, hackernews, bluesky, dev, stackoverflow, youtube, tiktok, podcasts, newsletters, news |
| `sentiment` | string[] | No | Filter: positive, negative, neutral |
| `keyword_ids` | string[] | No | Filter by specific keyword IDs |
| `languages` | string[] | No | ISO language codes |
| `tags` | string[] | No | AI relevance tags: own_brand_mention, competitors, buy_intent, product_question |
| `bookmarked` | boolean | No | Only bookmarked mentions |
| `engaged` | boolean | No | Only engaged mentions |
| `min_followers` | integer | No | Minimum author follower count |
| `max_followers` | integer | No | Maximum author follower count |
| `since` | ISO 8601 | No | Start date filter |
| `until` | ISO 8601 | No | End date filter |

**Response:**

```json
{
  "mentions": [
    {
      "id": "mention_abc123",
      "keyword_id": "kw_xyz",
      "source": "reddit",
      "author": {
        "name": "username",
        "url": "https://reddit.com/u/username",
        "followers": 1250
      },
      "content": "Full text of the mention...",
      "url": "https://reddit.com/r/SaaS/comments/abc123",
      "published_at": "2026-05-04T14:32:00Z",
      "sentiment": "positive",
      "relevance_tags": ["own_brand_mention", "product_question"],
      "engagement": {
        "likes": 12,
        "comments": 5,
        "shares": 2
      }
    }
  ],
  "cursor": "eyJsYXN0X2lkIjoiYWJjMTIzIn0="
}
```
<!-- Constructed from docs — verify against live API -->

### GET /keywords

Lists all configured keywords.

**Response:**

```json
{
  "keywords": [
    {
      "id": "kw_xyz",
      "name": "octolens",
      "platforms": ["reddit", "twitter", "github", "hackernews", "linkedin"],
      "color": "#4A90D9",
      "paused": false,
      "context": "social listening tool for developers"
    }
  ]
}
```
<!-- Constructed from docs — verify against live API -->

### GET /views

Returns saved filter view configurations.

**Response:**

```json
{
  "views": [
    {
      "id": "view_123",
      "name": "High Intent Mentions",
      "filters": {
        "sources": ["reddit", "twitter"],
        "sentiment": ["positive"],
        "tags": ["buy_intent"],
        "min_followers": 100
      }
    }
  ]
}
```
<!-- Constructed from docs — verify against live API -->

## Error Responses

| Status | Code | Description |
|---|---|---|
| 400 | `invalid_request` | Malformed request body or invalid parameters |
| 401 | `unauthorized` | Missing or invalid API key |
| 403 | `forbidden` | Key lacks permission for this resource |
| 404 | `not_found` | Resource does not exist |
| 429 | `rate_limit_exceeded` | Over 500 req/hr — check X-RateLimit-Reset |
| 500 | `internal_error` | Server error — retry with backoff |

**Error response shape:**

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 42 seconds."
  }
}
```
<!-- Constructed from docs — verify against live API -->

## Pagination

Cursor-based. The response includes a `cursor` field when more results exist. Pass it in the next request's `cursor` parameter.

- Cursors are opaque strings — do not parse or construct them
- When `cursor` is null or absent, you've reached the end
- Maximum 100 results per page

## Webhooks

Webhooks push new mentions to your configured HTTPS endpoint as they're detected.

**Setup:** Configure webhook URL in Octolens dashboard settings.

**Delivery timing:**
- Pro plan: Hourly batches
- Scale plan: Near real-time (within minutes)
- Enterprise: Real-time

**Payload:** Same mention object as the API response, delivered as a POST with `Content-Type: application/json`.

**No documented signature verification** — consider adding a secret path segment to your webhook URL for basic authentication.

## MCP Server

The MCP server enables AI tools (Claude Code, Cursor, Windsurf, VS Code, Zed) to query Octolens data via natural language.

**Setup:**

```bash
claude mcp add octolens --transport sse \
  "https://app.octolens.com/api/mcp?token=YOUR_MCP_KEY"
```

**Key types:**
- Personal key: Individual access only
- Team key: Shareable via `.mcp.json` in git

**Generate keys:** Settings > MCP > "Generate New Key"

**Available queries (natural language):**
- List keywords
- Show recent mentions
- Filter by platform, sentiment, tags
- Summarize mention trends

## Gaps

- Webhook payload schema not formally documented — shape inferred from API mention object
- No documented retry/failure behavior for webhook delivery
- No endpoint for creating/updating/deleting keywords via API (management is UI-only)
- No bulk operations endpoint
- Python/Node SDKs listed as "in development" — not yet available
