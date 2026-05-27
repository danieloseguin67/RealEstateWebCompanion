<!-- Source: https://developers.buzzsumo.com/reference, https://api.buzzsumo.com, community repos -->

# BuzzSumo API Reference

## Overview

BuzzSumo provides two REST APIs for accessing content intelligence data and managing account resources.

- **Base URL:** `https://api.buzzsumo.com`
- **Auth:** API key passed as `api_key` query parameter
- **Format:** JSON responses
- **Rate limits:** 100 Search API calls/month, 100,000 Account API calls/month (free key). No documented per-minute rate limits.

## Authentication

Generate your API key at: https://app.buzzsumo.com/account/api-dash (Settings > API tab > Generate API key). All paid plans include a free API key.

```bash
# Simple auth test
curl "https://api.buzzsumo.com/search/articles.json?q=test&api_key=YOUR_API_KEY"
```

## API Specifications

Three API specifications are documented:

1. **search-api.json** — Content search, trending, influencer discovery
2. **account-api.json** — Alerts, projects, account management
3. **backlinks-api.json** — Backlink data for articles/domains

## Search API Endpoints

### GET /search/articles.json

Search for articles by keyword or domain.

**Parameters:**
| Param | Type | Description |
|---|---|---|
| `q` | string | Search query (keyword or domain) |
| `num_results` | int | Number of results per page (default 10) |
| `page` | int | Page number (0-indexed) |
| `api_key` | string | Your API key |

<!-- Constructed from community repos — additional params like date filters, country, language likely exist but not documented in accessible sources -->

**Example request:**
```bash
curl "https://api.buzzsumo.com/search/articles.json?q=saas+marketing&num_results=10&page=0&api_key=YOUR_KEY"
```

**Example response:**
<!-- Constructed from community repos — verify against live API -->
```json
{
  "results": [
    {
      "title": "10 SaaS Marketing Strategies That Work",
      "url": "https://example.com/saas-marketing",
      "domain_name": "example.com",
      "date_published": "2026-04-10",
      "total_facebook_shares": 890,
      "twitter_shares": 210,
      "reddit_engagements": 45,
      "total_shares": 1145,
      "num_linking_domains": 12,
      "author_name": "John Doe",
      "language": "en"
    }
  ],
  "total_results": 5420,
  "page": 0,
  "num_results": 10
}
```

### GET /search/influencers.json

Find influencers who share content about a topic.

**Parameters:**
| Param | Type | Description |
|---|---|---|
| `q` | string | Topic keyword |
| `num_results` | int | Results per page |
| `page` | int | Page number (0-indexed) |
| `api_key` | string | Your API key |

**Example request:**
```bash
curl "https://api.buzzsumo.com/search/influencers.json?q=content+marketing&num_results=10&api_key=YOUR_KEY"
```

**Example response:**
<!-- Constructed from community repos — verify against live API -->
```json
{
  "results": [
    {
      "twitter_name": "contentpro",
      "name": "Content Pro",
      "description": "Content strategist and speaker",
      "follower_count": 52000,
      "following_count": 1800,
      "retweet_ratio": 0.28,
      "reply_ratio": 0.15,
      "average_retweets": 22
    }
  ]
}
```

### GET /search/shared_links.json

Find who shared a specific article.

**Parameters:**
| Param | Type | Description |
|---|---|---|
| `q` | string | Article URL |
| `api_key` | string | Your API key |

## Account API Endpoints

### GET /alerts.json

List all monitoring alerts.

```bash
curl "https://api.buzzsumo.com/alerts.json?api_key=YOUR_KEY"
```

### POST /alerts.json

Create a new monitoring alert.

```bash
curl -X POST "https://api.buzzsumo.com/alerts.json?api_key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Brand Alert", "query": "\"my brand\""}'
```

### DELETE /alerts/{id}.json

Delete a monitoring alert.

```bash
curl -X DELETE "https://api.buzzsumo.com/alerts/12345.json?api_key=YOUR_KEY"
```

### GET /alerts/{id}/mentions.json

Fetch mentions for a specific alert.

```bash
curl "https://api.buzzsumo.com/alerts/12345/mentions.json?api_key=YOUR_KEY"
```

### GET /projects.json

List all projects.

### POST /projects.json

Create a project with batch URL upload.

## Backlinks API

### GET /search/backlinks.json

Get backlink data for a URL or domain.

**Parameters:**
| Param | Type | Description |
|---|---|---|
| `q` | string | URL or domain |
| `num_results` | int | Results per page |
| `api_key` | string | Your API key |

## Pagination

All list endpoints use offset-based pagination:
- `page` — 0-indexed page number
- `num_results` — items per page (default 10)

```
page=0&num_results=10  → results 1-10
page=1&num_results=10  → results 11-20
```

Response includes `total_results` for calculating total pages.

## Rate Limits & Quotas

| API | Free key limit | Higher limits |
|---|---|---|
| Search API | 100 calls/month | Apply via form (case-by-case) |
| Account API | 100,000 calls/month | Apply via form |
| Backlinks API | Included in Search quota | — |

No documented per-minute/per-second rate limiting. No rate limit headers documented.

**Strategy:** Cache aggressively. With 100 Search calls/month, you get ~3/day. Batch multiple keywords into single requests where possible.

## Gaps

- Full parameter list for Search API not accessible (docs are JS-rendered at developers.buzzsumo.com)
- Response pagination metadata shape not fully documented
- Error response schema not documented
- Backlinks API parameter details not accessible
- No webhook support documented
- No SDK provided (community wrappers: PHP at github.com/F2KLabs/buzzsumo, R package at github.com/mhairi/buzzsumo)
