<!-- Source: https://www.replyagent.ai/docs -->

# ReplyAgent API Reference

## Authentication

All requests require a Bearer token in the Authorization header.

```
Authorization: Bearer YOUR_API_KEY
```

API keys are generated from the ReplyAgent dashboard (API Key page). Keys are shown only once upon creation — store securely.

## Base URL

```
https://www.replyagent.ai
```

## Product ID

All API calls require a Product ID. Find it in the dashboard URL:
```
/dashboard/products/{productId}/setup
```

## Rate Limits

- **100 requests per minute per API key**
- Contact support@replyagent.ai for higher limits

## Endpoints

### Import Comment

Import Reddit posts and create preview comments with AI-generated text.

```
POST /api/import
```

**Request:**
```json
{
  "product_id": "YOUR_PRODUCT_ID",
  "urls": [
    "https://reddit.com/r/SaaS/comments/abc123/thread-title",
    "https://reddit.com/r/startups/comments/def456/another-thread"
  ]
}
```

<!-- Constructed from docs — verify against live API -->
**Response:**
```json
{
  "success": true,
  "imported": 2,
  "comments": [
    {
      "id": "comment_abc123",
      "reddit_url": "https://reddit.com/r/SaaS/comments/abc123/thread-title",
      "status": "preview",
      "generated_text": "Based on what you're describing..."
    }
  ]
}
```

### Approve Comment

Approve a preview comment for posting via managed accounts.

```
POST /api/approve
```

**Request:**
```json
{
  "product_id": "YOUR_PRODUCT_ID",
  "comment_id": "comment_abc123"
}
```

### List Comments

List comments filtered by product and status.

```
GET /api/comments?product_id=YOUR_PRODUCT_ID&status=preview
```

**Query parameters:**
- `product_id` (required) — your product identifier
- `status` (optional) — filter by `preview`, `posted`, `removed`

## Gaps

- No webhook or callback support documented
- No detailed response schemas beyond import endpoint
- No error response format documented
- No pagination parameters documented
- No bulk approve endpoint documented
- Full endpoint inventory may be larger than documented — check with support@replyagent.ai
