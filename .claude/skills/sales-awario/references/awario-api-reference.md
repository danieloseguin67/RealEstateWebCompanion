<!-- Source: https://awario.com/help/api/api-overview/ , https://awario.com/help/api/api-authentication/ , https://awario.com/help/api/get-mentions/ , https://awario.com/help/api/get-insights/ , https://awario.com/help/api/rate-limits/ , https://awario.com/help/api/error-codes/ -->

# Awario API Reference

## Overview

Awario API v1.0 provides read-only access to brand monitoring data. Use cases: export mentions for custom dashboards, pull analytics into reporting tools, integrate monitoring data into products.

**Base URL**: `https://api.awario.com/v1.0/`

**Access**: Enterprise plan or custom package only. Owner/Admin roles can generate API keys.

**Note**: Twitter/X data is NOT available via API.

## Authentication

Token-based authentication via `access_token` query parameter on every request.

**Getting your API key:**
1. Log into Awario → Account Settings → API tab
2. Generate a new key (regenerating invalidates the previous key)
3. Only Owner/Admin roles can access the API tab

**Auth quick-start:**
```bash
curl "https://api.awario.com/v1.0/alerts/YOUR_ALERT_ID/mentions?access_token=YOUR_API_KEY&limit=10"
```

## Endpoints

### Get Alerts

**GET** `/alerts`

Returns list of all alerts (Mention and Leads types) in your account.

| Parameter | Required | Description |
|---|---|---|
| `access_token` | Yes | API key |

<!-- Constructed from docs — verify against live API -->
```json
{
  "alerts": [
    {
      "id": 123456,
      "type": "mention",
      "name": "My Brand",
      "project_id": 789,
      "mentions_count": 1542
    }
  ]
}
```

### Get Mentions

**GET** `/alerts/{alert_id}/mentions`

Returns mentions for a specific alert with pagination.

| Parameter | Required | Default | Description |
|---|---|---|---|
| `access_token` | Yes | — | API key |
| `sort_by` | No | `date` | Order by: `id`, `date`, or `reach` |
| `sort_order` | No | `desc` | Direction: `asc` or `desc` |
| `date_from` | No | All time | UTC timestamp in **milliseconds** |
| `date_to` | No | All time | UTC timestamp in **milliseconds** |
| `since_id` | No | — | Returns mentions more recent than this ID |
| `source` | No | All | Comma-separated: `facebook`, `instagram`, `youtube`, `vimeo`, `reddit`, `news-blogs`, `web` |
| `lang` | No | All | ISO language codes, comma-separated |
| `country` | No | All | ISO country codes, comma-separated |
| `reach_from` | No | — | Minimum reach value |
| `reach_to` | No | — | Maximum reach value |
| `tag` | No | — | Filter by tag(s) |
| `tag_match` | No | `any` | Tag filter mode: `any` or `all` |
| `limit` | No | 300 | Results per page (max 300) |
| `next` | No | — | Pagination cursor token |

**Response structure:**
```json
{
  "limits": { "...plan restriction info..." },
  "alert_data": {
    "id": 123456,
    "type": "mention",
    "name": "My Brand",
    "project_id": 789,
    "mentions_count": 1542
  },
  "mentions": [
    {
      "id": 98765432,
      "url": "https://example.com/post",
      "title": "Post title",
      "snippet": "Mention text excerpt...",
      "author": {
        "name": "username",
        "url": "https://...",
        "avatar": "https://..."
      },
      "source": "reddit",
      "sentiment": "positive",
      "reach": 15000,
      "country": "US",
      "language": "en",
      "date": 1714003200000,
      "tags": ["tag1"],
      "entity_info": {
        "highlighted_text": "...text with <em>highlights</em>..."
      }
    }
  ],
  "next": "cursor_token_for_next_page"
}
```

### Get Insights — Total

**GET** `/alerts/{alert_id}/insights/total/{type}`

Returns aggregate statistics for a date range.

**Available types:** `mentions`, `sentiment`, `reach`, `countries`, `languages`, `sources`, `topic_cloud`, `gender`, `age`

| Parameter | Required | Default | Description |
|---|---|---|---|
| `access_token` | Yes | — | API key |
| `date_from` | No | UTC now - 30 days | Start date (`YYYY-MM-DD`) |
| `date_to` | No | UTC now | End date (`YYYY-MM-DD`) |
| `source` | No | All | Comma-separated source filter |

**Accepted sources:** `facebook`, `instagram`, `twitter`, `reddit`, `news-blogs`, `web`

**Note:** Only works for `mention` type alerts (not `leads` alerts).

### Get Insights — Time Series

**GET** `/alerts/{alert_id}/insights/time_series/{type}`

Returns metrics over time with configurable granularity.

**Available types:** `mentions`, `sentiment`, `reach`

| Parameter | Required | Default | Description |
|---|---|---|---|
| `access_token` | Yes | — | API key |
| `date_from` | No | UTC now - 30 days | Start date (`YYYY-MM-DD`) |
| `date_to` | No | UTC now | End date (`YYYY-MM-DD`) |
| `granularity` | No | `Day` | Time period: `Day`, `Week`, `Month` |
| `source` | No | All | Comma-separated source filter |

**Note:** Only works for `mention` type alerts (not `leads` alerts).

## Rate Limits

| Limit type | Threshold |
|---|---|
| Per IP address | 100 requests/second |
| Per API token | 300 requests/minute |

When exceeded, the API returns an error response (see error codes 11 and 12).

**Retry strategy:** On rate limit error, wait 60 seconds before retrying. The API does not return `Retry-After` headers or remaining-quota headers.

## Error Codes

All errors return JSON:
```json
{
  "error": {
    "code": 1,
    "message": "No such method."
  }
}
```

| Code | HTTP | Message | What to do |
|---|---|---|---|
| 1 | 404 | No such method | Check endpoint URL |
| 10 | 503 | System is busy | Retry after 5-10 seconds |
| 11 | 403 | Too many requests per token | Wait 60 seconds, reduce request rate |
| 12 | 403 | Too many requests per IP address | Wait a few seconds |
| 20 | 401 | Invalid access token | Regenerate API key in Account Settings |
| 21 | 401 | Your Awario account has expired | Renew Enterprise subscription |
| 22 | 401 | Your Awario account has been deleted | Contact Awario support |
| 23 | 401 | API access is not supported by your plan | Upgrade to Enterprise |
| 30 | 404 | Alert not found | Verify alert ID via get-alerts endpoint |
| 40 | 400 | Parameter invalid | Check parameter name and value format |
| 41 | 400 | Statistics for Leads is not supported | Use mention alerts for insights endpoints |
| 50 | 503 | System temporarily unavailable | Retry with exponential backoff |
| 51 | 503 | Couldn't find your account | Contact Awario support |
| 52 | 503 | Network error | Retry after a few seconds |
| 53 | 503 | Request timeout | Narrow date range or filters, retry |
| 54 | 500 | Unexpected error | Contact Awario support |

## Gaps

- **Get Alerts endpoint URL** not confirmed — docs page returned 404. Likely `/alerts` but verify.
- **No write endpoints** — the API is read-only. Cannot create/update/delete alerts or mentions via API.
- **No webhook support** — Awario does not push data. You must poll or use Zapier.
- **Response headers** not documented — no info on `X-RateLimit-Remaining` or similar.
- **Twitter data excluded** from all API responses despite being available in the UI.
