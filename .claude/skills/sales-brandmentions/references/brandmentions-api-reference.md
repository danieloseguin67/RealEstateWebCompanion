<!-- Source: https://api.brandmentions.com/documentation.html + https://help.brandmentions.com/en/articles/12814640-what-are-the-available-brandmentions-api-endpoints -->

# BrandMentions API Reference

## Base URL

```
https://api.brandmentions.com/command.php
```

All requests use the `command` parameter to specify the endpoint. Authentication via `api_key` query parameter.

**API access requires Enterprise plan ($1,299+/mo).** Contact support@brandmentions.com to activate your API key.

## Authentication

```bash
curl "https://api.brandmentions.com/command.php?api_key=YOUR_API_KEY&command=GetRemainingCredits"
```

- `api_key` — required on every request
- Error code 3 = missing API key
- Error code 4 = invalid API key

## Endpoints

### PostSearch
Create an on-demand search job. Processing is asynchronous.

| Param | Type | Required | Description |
|---|---|---|---|
| `keywords[0..4]` | string | Yes | Up to 5 keywords, 3-50 chars each |
| `match_type` | string | No | Match type (exact, broad) |
| `time_range` | string | No | Time range filter |
| `language` | string | No | Language filter |
| `country` | string | No | Country filter |
| `sources` | string | No | Source filter (web, facebook, twitter, etc.) |

**Cost**: 1 credit per search.

**Response:**
```json
<!-- Constructed from docs — verify against live API -->
{
  "status": "success",
  "search_hash": "a1b2c3d4e5"
}
```

**Note**: `search_hash` valid for 1 hour.

### GetMentions
Retrieve complete results of a PostSearch. Best used after callback receipt.

| Param | Type | Required | Description |
|---|---|---|---|
| `search_hash` | string | Yes | Hash from PostSearch response |

**Cost**: 0 credits.

### GetProcessedMentions
Poll partial results while search is still processing. Use 13-second intervals.

| Param | Type | Required | Description |
|---|---|---|---|
| `search_hash` | string | Yes | Hash from PostSearch response |

**Response includes `processing_ended` boolean** — poll until `true`, then call GetMentions for final results.

**Cost**: 0 credits.

### GetRemainingCredits
Check available API credits.

**Cost**: 0 credits.

```bash
curl "https://api.brandmentions.com/command.php?api_key=YOUR_API_KEY&command=GetRemainingCredits"
```

### AddProject
Create a saved daily monitoring project.

| Param | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Project name |
| `keywords` | array | Yes | Keywords to monitor |
| `language` | string | No | Language filter |
| `country` | string | No | Country filter |
| `sources` | array | No | Sources to monitor |

**Cost**: 1 credit.

### ListProjects
List all projects in the account.

**Cost**: 0 credits.

### DeleteProject
Remove a project permanently.

**Cost**: 0 credits.

### EditProject
Modify project keywords, filters, and configuration. For boolean expression projects.

**Cost**: 0 credits.

### GetProjectMentions
Paginated retrieval of project mentions with filtering.

| Param | Type | Required | Description |
|---|---|---|---|
| `project_id` | string | Yes | Project identifier |
| `page` | int | No | Page number (default 1) |
| `per_page` | int | No | Results per page (max 100) |
| `date_from` | string | No | Start date filter |
| `date_to` | string | No | End date filter |

**Cost**: 0 credits.

### GetProjectInfluencers
Return top influencers/authors associated with a project by reach.

**Cost**: 0 credits.

### GetMentionsCount
Total mention count matching filters, without returning full mention data.

**Cost**: 0 credits.

### RunProjectHistorical
Run historical backfill for a project by month count.

**Cost**: Uses historical mention credits.

### AddReviewSourceToProject
Integrate review platforms into project monitoring.

**Cost**: 0 credits.

### GetMainKeywordsCount
Calculate keyword credits needed for a boolean expression.

**Cost**: 0 credits.

## Supported sources

Web, Facebook, Twitter/X, Instagram, LinkedIn, Reddit, YouTube, TikTok, Bluesky

## Response format

All responses return JSON with a `status` field. Error codes range from 1-78.

## Pagination

Offset-based: `page` + `per_page` (max 100 per page). Loop until empty `mentions` array.

## Rate limits

No documented rate limits. Recommend spacing requests by 1-2 seconds to be safe.

## Gaps

- No webhook/callback URL documentation found — PostSearch mentions "callback receipt" but no setup instructions
- No detailed error code reference beyond codes 3 and 4
- No documented rate limit headers or retry strategy
- Request/response JSON shapes are constructed from field descriptions, not copied from docs
