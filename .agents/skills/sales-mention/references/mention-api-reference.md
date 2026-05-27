<!-- Source: https://dev.mention.com/current/src/index.html -->

# Mention API Reference

## Overview

JSON-based RESTful API. Version 1.8+ (current: 1.19).

**Base URL:** `https://api.mention.net/api`

**Authentication:** Bearer token via `Authorization: Bearer {token}` header or `?access_token={token}` query parameter. Create an app at https://dev.mention.com/apps/create to get a token, or use OAuth2.

**Important:** API access requires an additional fee on self-serve plans. Contact Mention to enable.

## Auth quick-start

```bash
curl -s 'https://api.mention.net/api/accounts/{account_id}/alerts' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Accept-Version: 1.19'
```

## Request/response format

- POST/PUT: JSON body with `Content-Type: application/json`
- Responses: JSON, status 200 for success
- Dates: W3C level 6 format (e.g., `1997-07-16T19:20:30.12345+01:00`)

## Error responses

| Status | Meaning |
|---|---|
| 400 | Invalid input — returns structured validation errors |
| 401/403 | Access denied |
| 404 | Resource not found |
| 429 | Rate limited — check `X-Rate-Limit-Reset` header (unix timestamp) |

Error shape:
```json
{
  "error": {
    "status": 400,
    "message": "Validation failed",
    "fields": {
      "name": ["Name is required"]
    }
  }
}
```
<!-- Constructed from docs — verify against live API -->

## Rate limits

| Resource | Limit |
|---|---|
| Create alert | max(20, alertsQuota * 2) per 24 hours |
| List mentions | 3,600 per alert per 24 hours |
| Other endpoints | Varies — check `X-Rate-Limit-Reset` on 429 |

## Pagination

Cursor-based. Responses include `_links` object:

```json
{
  "_links": {
    "more": {
      "href": "/api/accounts/.../alerts?limit=20&cursor=abc",
      "params": {"limit": 20, "cursor": "abc"}
    }
  }
}
```

Follow `_links.more.href` for next page. Attribute only present if more results exist. For mentions, `_links.pull` provides a URL for fetching only newer mentions (incremental polling).

## Endpoints

### Alerts

#### List alerts
```
GET /accounts/{account_id}/alerts
```

**Query params:**
| Param | Type | Description |
|---|---|---|
| `limit` | integer | Number of alerts to return (default: all) |
| `cursor` | string | Pagination cursor |
| `ids` | array | Specific alert IDs (max 50) |

**Response:**
```json
{
  "alerts": [
    {
      "id": 12345,
      "name": "My Brand",
      "query": {"type": "basic", "included_keywords": ["acme"]},
      "languages": ["en"],
      "sources": ["web", "twitter"],
      "stats": {"mentions": 1542},
      "created_at": "2026-01-15T10:30:00+00:00"
    }
  ],
  "_links": {"more": {"href": "..."}}
}
```
<!-- Constructed from docs — verify against live API -->

#### Create alert
```
POST /accounts/{account_id}/alerts
```

**Required body fields:**
| Field | Type | Description |
|---|---|---|
| `name` | string | Human-readable identifier |
| `query` | object | `{type: "basic"|"advanced", included_keywords, excluded_keywords, required_keywords}` |
| `languages` | array | Language codes (max 5) |

**Optional body fields:**
| Field | Type | Description |
|---|---|---|
| `countries` | array | Country codes (max 5) |
| `sources` | array | Source types: web, twitter, facebook, instagram, reddit, etc. |
| `blocked_sites` | array | URLs to exclude |
| `noise_detection` | boolean | Enable noise filtering |
| `sentiment_analysis` | boolean | Enable sentiment (Pro+ only) |
| `reviews_pages` | array | Review site URLs to monitor |
| `color` | string | Alert color in UI |
| `connection_type` | string | "main", "related", or "independent" |
| `connection_id` | string | Related alert ID |
| `description` | string | Alert description |

#### Update alert
```
PUT /accounts/{account_id}/alerts/{alert_id}
```

Same body fields as create. Omitted fields remain unchanged.

#### Delete alert
```
DELETE /accounts/{account_id}/alerts/{alert_id}
```

### Mentions

#### List mentions
```
GET /accounts/{account_id}/alerts/{alert_id}/mentions
```

**Query params:**
| Param | Type | Description |
|---|---|---|
| `limit` | integer | Results per page (default 20, max 1000) |
| `cursor` | string | Pagination cursor |
| `since_id` | string | Return mentions newer than this ID |
| `before_date` | date | Mentions published before this date |
| `not_before_date` | date | Ignore mentions older than this date |
| `source` | string | Filter by source type |
| `unread` | boolean | Only unread mentions |
| `favorite` | boolean | Only favorited mentions |
| `folder` | string | inbox, archive, spam, trash |
| `tone` | integer | Sentiment: -1, 0, 1 |
| `countries` | array | Filter by country |
| `languages` | array | Filter by language |
| `sort` | string | Order by: published_at, author_influence.score |
| `q` | string | Keyword search within results |
| `include_children` | boolean | Include child mentions |
| `timezone` | string | Timezone for date parsing |

**Response:**
```json
{
  "mentions": [
    {
      "id": "67890",
      "alert_id": 12345,
      "title": "Great review of Acme",
      "description": "Acme Corp just launched their...",
      "original_url": "https://example.com/post",
      "tone": 1,
      "source_type": "web",
      "source_name": "Example Blog",
      "published_at": "2026-03-10T14:22:00+00:00",
      "author_influence": {"score": 72},
      "tags": [],
      "folder": "inbox",
      "read": false
    }
  ],
  "_links": {
    "more": {"href": "...older mentions..."},
    "pull": {"href": "...newer mentions..."}
  }
}
```
<!-- Constructed from docs — verify against live API -->

**Note:** `description` is truncated to ~250 characters. Follow `original_url` for full content.

#### Get single mention
```
GET /accounts/{account_id}/alerts/{alert_id}/mentions/{mention_id}
```

Returns full mention object (see data model in platform-guide.md).

#### Curate mention
```
PUT /accounts/{account_id}/alerts/{alert_id}/mentions/{mention_id}
```

**Body fields (all optional):**
| Field | Type | Description |
|---|---|---|
| `favorite` | boolean | Mark as favorite (admin only) |
| `trashed` | boolean | Move to trash (admin only) |
| `read` | boolean | Mark as read |
| `tags` | array | Array of `{id: tag_id}` objects |
| `folder` | string | Move to folder (archive, inbox, etc.) |
| `tone` | integer | Override sentiment: -1, 0, 1 |

No minimum required fields — send only what you want to update.

## Gaps

- Streaming API endpoint not documented in detail (mentioned in overview but no endpoint spec found)
- Statistics/analytics endpoints not found in public docs
- Tag CRUD endpoints not documented
- Webhook/callback support not found — polling or streaming only
- Account management endpoints not fully documented
- Full response schemas may have additional fields not captured here
