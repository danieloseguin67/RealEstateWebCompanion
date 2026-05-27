<!-- Source: https://www.substackexplorer.com/api-docs, https://substack-api.readthedocs.io/, https://support.substack.com/hc/en-us/articles/45099095296916-Substack-Developer-API -->

# Substack API Reference

## Official Developer API (very limited)

Substack's official Developer API is extremely limited — it only allows querying public Substack profile information by LinkedIn handle. It does NOT provide access to posts, subscribers, analytics, or any publisher functionality.

**Access:** Requires Substack account + Terms of Use agreement via form. Approval takes 7-10 business days.

**What it does:** Retrieve public information on Substack profiles by querying a creator's public LinkedIn handle.

**What it does NOT do:** Create posts, manage subscribers, access analytics, manage paid subscriptions, trigger automations, or anything else a publisher would need.

## Unofficial / Reverse-Engineered Endpoints

The following endpoints are reverse-engineered from Substack's web application. They are **not officially supported** and may break without notice.

### Auth

No authentication required for public endpoints. Authenticated endpoints (creating posts, managing subscribers) require a `substack.sid` session cookie obtained by logging into Substack in a browser.

### Endpoints

#### Search publications
```
GET https://substack.com/api/v1/publication/search
```

| Parameter | Type | Description |
|---|---|---|
| query | string | Search term |
| page | number | Page number (0-based) |
| limit | number | Results per page (max 100) |
| sort | string | Sort order (e.g., "relevance") |

**Headers:**
```
User-Agent: Mozilla/5.0
Accept: application/json
Origin: https://substack.com
Referer: https://substack.com/discover
```

**cURL example:**
```bash
curl -s "https://substack.com/api/v1/publication/search?query=tech&page=0&limit=5" \
  -H "Accept: application/json" \
  -H "User-Agent: Mozilla/5.0" \
  -H "Origin: https://substack.com" \
  -H "Referer: https://substack.com/discover"
```

#### Get post by slug
```
GET https://{publication}.substack.com/api/v1/posts/{post_slug}
```

**Headers:**
```
Accept: application/json
User-Agent: Mozilla/5.0
```

**cURL example:**
```bash
curl -s "https://technews.substack.com/api/v1/posts/welcome-post" \
  -H "Accept: application/json" \
  -H "User-Agent: Mozilla/5.0"
```

#### RSS feed
```
GET https://{publication}.substack.com/feed
```

Standard RSS 2.0 — no special headers needed.

### Pagination

Publication search uses offset-based pagination:
- `page=0` for first page
- `limit=10` controls page size (max 100)
- Check `total` field in response to determine if more pages exist

### Rate limits

No documented rate limits. Unofficial guidance from community wrappers:
- Add 1-2 second delays between requests
- Cache aggressively
- Substack may return 429 or block IPs for aggressive scraping

### Community wrappers

**Python:** `pip install substack-api` — [GitHub](https://github.com/NHagar/substack_api)
- Supports: publication search, post retrieval, newsletter listing, comment retrieval

**TypeScript:** `npm install substack-api` — [GitHub](https://github.com/jakub-k-slys/substack-api), [Docs](https://substack-api.readthedocs.io/)
- Supports: publications, posts, comments, user profiles
- Features: async iterators, cookie-based auth via `substack.sid`, content creation (authenticated), pagination, caching

## Gaps

- **No official publisher API** — cannot create posts, manage subscribers, or access analytics programmatically
- **No webhooks** — no way to receive real-time notifications of new subscribers, posts, or payments
- **No native Zapier/Make integration** — Substack is not listed as an app on Zapier or Make
- **Official Developer API docs returned 403** — could not fetch the support page. Info sourced from search snippets.
- **Authenticated endpoints undocumented** — the TypeScript wrapper supports content creation via session cookie, but specific endpoints and payloads are not publicly documented
