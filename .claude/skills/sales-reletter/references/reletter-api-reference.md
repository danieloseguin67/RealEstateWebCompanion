<!-- Source: https://pypi.org/project/reletter/ and https://reletter.com -->

# Reletter API Reference

## Overview

Reletter provides a REST API for searching 7M+ email newsletters, pulling contact data, and accessing publication metadata. The API is available as a $59/mo add-on to any base plan (5,000 requests/month).

## Authentication

API key via environment variable or direct parameter:

```bash
export RELETTER_API_KEY="your_api_key"
```

```python
from reletter import Reletter

# Option 1: Uses RELETTER_API_KEY env var automatically
client = Reletter()

# Option 2: Pass key directly
client = Reletter(api_key="your_api_key")
```

Two ways to get an API key:
1. Sign up at reletter.com with monthly billing
2. Programmatic payment via HTTP 402/MPP for autonomous AI agents

## Python SDK

**Install**: `pip install reletter` (or `pipx install reletter` for isolated CLI)

**Requirements**: Python 3.8+

**Version**: 1.0.2 (May 2026, Production/Stable)

**License**: MIT

### Key methods

| Method | Description |
|---|---|
| `publications.get(slug)` | Look up a publication by slug |
| `search.publications(query, filters)` | Search publications with filters |
| `search.iter_publications(query, filters)` | Auto-paginating search iterator |
| `search.issues(query, filters)` | Search newsletter issue content |
| `contacts.get(slug)` | Pull contact info for a publication |
| `charts` | Access chart/ranking data |
| `account.quota()` | Check API usage quota |

### Search with filters

Filters support three formats:

```python
# Dict format
results = client.search.publications(
    query="artificial intelligence",
    filters={"subscribers": {"gte": 5000}, "active": True}
)

# DSL string format
results = client.search.publications(
    query="artificial intelligence",
    filters="subscribers>=5000 AND active=true"
)

# Clause list format
results = client.search.publications(
    query="artificial intelligence",
    filters=[
        {"field": "subscribers", "op": "gte", "value": 5000},
        {"field": "active", "op": "eq", "value": True}
    ]
)
```

### Auto-pagination

```python
# Iterates through all pages automatically
for pub in client.search.iter_publications(query="fintech"):
    print(pub.name, pub.subscribers)
```

### Async support

```python
from reletter import AsyncReletter

async def main():
    client = AsyncReletter()
    results = await client.search.publications(query="AI")
    for pub in results:
        print(pub.name)
```

### Error handling

```python
from reletter.exceptions import (
    AuthenticationError,   # Invalid or missing API key
    RateLimitError,        # 429 — quota exceeded
    BadRequestError,       # 400 — invalid parameters
)
```

Automatic retries: Default 2 retries with exponential backoff on 429 and 5xx responses.

## CLI

**Install**: `pip install reletter` or `pipx install reletter`

```bash
# Look up a publication
reletter publications get doomberg

# Search publications
reletter search publications --query "artificial intelligence" --filters '{"subscribers": {"gte": 5000}}'

# Search issues
reletter search issues --query "YourBrand"

# Check quota
reletter account quota
```

**Exit codes**: 0 = success, 1 = API error, 2 = usage error, 4 = auth error, 5 = server error

## MCP Server

**URL**: `mcp.reletter.com`

Works with Claude, ChatGPT, and Cursor. Requires `RELETTER_API_KEY` for authentication.

Available operations: publication search, contact lookup, issue search, chart data.

## Rate limits & quotas

- **API add-on**: 5,000 requests/month ($59/mo)
- Per-minute rate limits exist (exact values not documented)
- SDK handles rate limits automatically with retries + exponential backoff
- Monitor usage: `client.account.quota()` or `reletter account quota`

## Gaps

- Exact REST API base URL and endpoint paths not publicly documented (SDK abstracts them)
- MCP server tool list not fetchable without auth
- Webhook support: none
- Zapier/Make integrations: none
- Per-minute rate limit thresholds: not documented
- AI Search availability via API: unclear (may be UI-only)
