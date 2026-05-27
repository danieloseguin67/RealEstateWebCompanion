<!-- Source: https://developer.talkwalker.com/api, https://developer.talkwalker.com/docs -->

# Talkwalker API Reference

## Authentication

- **Method**: Query parameter `access_token`
- **Token types**: `read_only` (search only), `read_write` (search + modify + stream)
- **How to get a token**: Contact Talkwalker sales (support@talkwalker.com) — not self-serve
- **Demo token**: `access_token=demo` — limited to queries `cats`, `dogs`, `cats AND dogs`; blogs/forums/news only; no social media

**Quick test:**
```bash
curl 'https://api.talkwalker.com/api/v1/search/results?access_token=demo&q=cats&hpp=5&pretty=true'
```

## Base URLs

| API | Base URL |
|---|---|
| Search, Summary, Histogram, Resources, Topic, Source panels, Modify docs | `https://api.talkwalker.com/api/v1/` |
| Image Detection | `https://api.talkwalker.com/api/v2/` |
| Streaming | `https://api.talkwalker.com/api/v3/` |

## API Modules & Endpoints

### Status API (1 endpoint)

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/status` | Check API availability |

### Search API (3 endpoints)

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/search/results` | Search outside a project (quicksearch — blogs, forums, news only; no social) |
| GET | `/api/v1/search/p/{project_id}/results` | Search within a project (includes social media) |
| GET | `/api/v1/search/p/{project_id}/results?topic={id}` | Search filtered by project topic |

**Parameters (Search):**

| Param | Type | Required | Default | Description |
|---|---|---|---|---|
| `access_token` | string | Yes | — | Auth token |
| `q` | string | Yes | — | Boolean search query |
| `hpp` | int | No | 10 | Results per page (max 500) |
| `offset` | int | No | 0 | Results to skip |
| `sort_by` | string | No | engagement | `engagement`, `trending_score`, `published` |
| `sort_order` | string | No | desc | `asc` or `desc` |
| `time_range` | string | No | 30d | Duration: s, m, h, d, w, M units |
| `timezone` | string | No | UTC | Timezone for time_range |
| `hl` | bool | No | true | Enable snippet highlighting |
| `pretty` | bool | No | false | Pretty-print JSON |
| `summarize` | bool | No | false | AI summary (20 credits) |

**Project-specific params:** `topic`, `filter`, `channel`, `panel`, `dataset`

**Constraints:**
- Quicksearch: max offset 500, time range 30 days
- Project: max offset+hpp 10,000
- Datasets older than 7 days cannot be queried
- Credits: 1 per result, min 10 per call

### Summary API (2 endpoints)

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/search/summary` | Aggregated metrics outside project |
| GET | `/api/v1/search/p/{project_id}/summary` | Aggregated metrics within project |

### Histogram API (3 endpoints)

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/search/histogram` | Time-series data outside project |
| GET | `/api/v1/search/p/{project_id}/histogram` | Time-series data within project |
| GET | `/api/v1/search/p/{project_id}/histogram?topic={id}` | Histogram filtered by topic |

Rate limit: 60/min (quicksearch), 30/min (project)

### Streaming API v3 (8+ endpoints)

| Method | Path | Description |
|---|---|---|
| PUT | `/api/v3/stream/s/{stream_id}` | Create or update a stream |
| GET | `/api/v3/stream/s/{stream_id}/results` | Connect to stream (persistent) |
| DELETE | `/api/v3/stream/s/{stream_id}` | Delete a stream |

**Streaming rules support:** Boolean queries, language, media type, title, content, author, URL, country, source include/exclude. Max 50 operands per rule.

**Response chunk types:**
- `CT_CONTROL` — stream metadata and connection status
- `CT_RESULT` — search result documents

**Key behaviors:**
- Results delivered in crawler-found order (not chronological)
- Each result = 1 credit (regardless of matched rules)
- Manual updates and rule-applied tags do NOT transmit through streams
- Custom sorting not available (use Search API instead)

### Streaming > Collector API (6 endpoints)

Collector management for stream data collection.

### Streaming > Task API (6 endpoints)

Task management for stream processing jobs.

### Modify Documents API (4 endpoints)

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/search/p/{project_id}/results/update` | Update document fields |
| POST | `/api/v1/search/p/{project_id}/results/delete` | Delete documents |
| POST | `/api/v1/search/p/{project_id}/results/import` | Import external documents (120 calls/min) |

**Note:** Cannot import social media documents. Modifications via API overwrite changes made in the UI.

### Resources API (8 endpoints)

Managing project resources (filters, channels, etc.).

### Topic API (4 endpoints)

CRUD operations for monitoring topics within a project.

### Source Panels API (3 endpoints)

Managing source panel configurations.

### Image API v2 (2 endpoints)

| Method | Path | Description |
|---|---|---|
| GET | `/api/v2/detect/images/{type}?image_url={url}` | Detect features in image by URL |
| POST | `/api/v2/detect/images/{type}` | Detect features in uploaded image (multipart) |

**Detection types:** `logo`, `object`, `scene`

**Parameters:**
- `access_token` (required)
- `image_url` (for GET — must be from whitelisted URL prefix)
- `image_file` (for POST — multipart/form-data)
- `detect` (optional — restrict to specific image IDs)

**Response fields:** `confidence` (0-1), `position` (top/left/right/bottom for logos), `id` (Talkwalker image ID), image dimensions

**Rate limit:** 300 calls/min

## Rate Limits Summary

| API | Limit |
|---|---|
| Search (quicksearch) | 240 calls/min |
| Search (project) | 60 calls/min |
| Histogram (quicksearch) | 60 calls/min |
| Histogram (project) | 30 calls/min |
| Document Import | 120 calls/min |
| Image Detection | 300 calls/min |

## Pagination

- **Pattern:** offset + hpp (hits per page)
- Quicksearch: max offset = 500, max hpp = 500
- Project: max offset + hpp = 10,000
- Response includes `next` link for pagination and `total` count

```bash
# Page 1
curl '...&hpp=100&offset=0'
# Page 2
curl '...&hpp=100&offset=100'
```

## Data Export Restrictions

The following data CANNOT be fully exported via API:
- **Facebook/Instagram**: aggregated metrics only via Histogram API
- **Twitter/X**: limited to tweet ID, author ID, sentiment score only (1.5M docs/month cap)
- **Online news**: full content truncated, highlighted snippets only
- **LinkedIn, Reddit raw data, Chinese sources, Disqus, monitored sites, certain review sites**: not exportable
- **WEB_NLA restricted articles**: blocked from export

## Error Handling

API returns standard HTTP status codes. Check for:
- `401` — invalid or expired access token
- `429` — rate limit exceeded (implement exponential backoff)
- `400` — malformed query or invalid parameters

## Gaps

- Full OpenAPI/Swagger spec is JS-rendered and not directly fetchable
- Collector API and Task API endpoint details not documented in public pages
- Resources API endpoint details not fully documented
- Webhook support not documented (may not exist)
- Credit quota/allocation per plan not publicly documented
