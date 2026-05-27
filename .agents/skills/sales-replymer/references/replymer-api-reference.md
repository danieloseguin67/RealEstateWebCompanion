<!-- Source: https://replymer.com/api/docs -->

# Replymer API Reference

## Base URL

`https://replymer.com/api/v1`

## Authentication

API key via `X-API-Key` header (recommended) or `?api_key=` query parameter.

Key format: `rply_` prefix, 45 characters total.

```bash
curl https://replymer.com/api/v1/account \
  -H "X-API-Key: rply_your_api_key_here"
```

## Rate Limits

Per-user, hourly reset.

| Plan | Limit |
|---|---|
| Free Trial | 100/hr |
| Starter | 500/hr |
| Growth | 1,000/hr |
| Scale / Scale Plus / Scale Elite | Unlimited |

429 responses include retry guidance in the error message.

## Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "meta": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "error_code",
  "message": "Human-readable description"
}
```

Error codes: `unauthorized` (401), `forbidden` (403), `not_found` (404), `bad_request` (400), `rate_limit_exceeded` (429), `plan_limit` (403), `internal_error` (500).

## Endpoints

### Account

| Method | Path | Description |
|---|---|---|
| GET | `/account` | Account info and current plan details |
| GET | `/account/stats` | Overall account statistics |

### Projects

| Method | Path | Description |
|---|---|---|
| GET | `/projects` | List all projects |
| GET | `/projects/:id` | Get a single project |
| POST | `/projects` | Create a new project (requires: title, domain) |
| PUT | `/projects/:id` | Update project settings |
| DELETE | `/projects/:id` | Delete a project permanently |
| POST | `/projects/:id/activate` | Reactivate a stopped project |
| POST | `/projects/:id/stop` | Pause monitoring and replies |

### Keywords

| Method | Path | Description |
|---|---|---|
| GET | `/projects/:projectId/keywords` | List project keywords |
| POST | `/projects/:projectId/keywords` | Add keywords |
| DELETE | `/projects/:projectId/keywords` | Remove keywords |

### Negative Keywords

| Method | Path | Description |
|---|---|---|
| GET | `/projects/:projectId/negative-keywords` | List negative keywords |
| POST | `/projects/:projectId/negative-keywords` | Add negative keywords |
| DELETE | `/projects/:projectId/negative-keywords` | Remove negative keywords |

### Mentions

| Method | Path | Description |
|---|---|---|
| GET | `/projects/:projectId/mentions` | List mentions (paginated, filterable by status/source/keyword) |
| PUT | `/projects/:projectId/mentions/:id` | Update mention status |

### Replies

| Method | Path | Description |
|---|---|---|
| GET | `/projects/:projectId/replies` | List published replies (paginated) |

### SEO

| Method | Path | Description |
|---|---|---|
| GET | `/projects/:projectId/seo-keywords` | List SEO keywords |
| POST | `/projects/:projectId/seo-keywords` | Add SEO keywords |
| DELETE | `/projects/:projectId/seo-keywords` | Remove SEO keywords |
| GET | `/projects/:projectId/seo-replies` | List SEO replies with Google ranking data (paginated) |

### Analytics

| Method | Path | Description |
|---|---|---|
| GET | `/projects/:projectId/stats` | Project statistics for a given period |

Query parameters: `period` (1, 7, 30, or 90 days).

## Pagination

Mentions, replies, and SEO replies endpoints support pagination. Exact pagination pattern (cursor vs offset) not documented — test with `page` and `limit` query parameters.

## Gaps

- Webhook support not documented — API appears pull-only
- Exact request/response schemas not published (field lists inferred from endpoint descriptions)
- Pagination pattern details (cursor vs offset, max page size) not specified
- No published OpenAPI/Swagger spec
- No Postman collection found
