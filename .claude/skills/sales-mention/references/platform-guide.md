# Mention Platform Reference

## Overview

Mention is a real-time media monitoring and brand listening tool that tracks mentions across 1B+ sources including social media, news, blogs, forums, and review sites. Acquired by Agorapulse in 2024, it's now focused purely on monitoring (publishing/scheduling was deprecated January 2026). Positioned as an affordable entry point for startups and small teams.

## Capabilities & automation surface

| Module | What it does | Automation |
|---|---|---|
| **Alerts** | Keyword-based or page-based monitoring with Boolean queries, source filtering, language/country filters | API-accessible (CRUD, pause/unpause, share) |
| **Mentions feed** | Real-time stream of captured mentions with sentiment, source, author influence | API-accessible (list, get, curate, stream) |
| **Sentiment analysis** | Automatic tone detection (positive/neutral/negative) in 40+ languages | API-accessible (read tone, manually override via PUT) |
| **Competitor benchmarking** | Share of Voice, mention volume comparison across brands | UI-only (ProPlus+ plans) |
| **Review monitoring** | Track reviews across 75+ sites (Google, Trustpilot, G2, Amazon, Glassdoor) | API-accessible (mentions from review sources) |
| **Boolean search** | AND/OR/NOT queries up to 2,000 chars for advanced filtering | API-accessible (via alert query object) |
| **Historical data** | Access mention data up to 2 years back | UI-only (Company plan) |
| **Reporting** | Custom dashboards and scheduled reports | UI-only |
| **Publishing** | **Deprecated** (Jan 2026) — migrated to Agorapulse | N/A |

## Pricing, limits & plan gates

| Feature | Solo ($41/mo) | Pro ($83/mo) | ProPlus ($149/mo) | Company ($599+/mo) |
|---|---|---|---|---|
| Alerts | 2 | 5 | 7 | 10+ |
| Mentions/month | 5,000 | 10,000 | 20,000 | 100,000+ |
| Users | 1 | 10 | Unlimited | Unlimited |
| Social accounts | 4 | 10 | 15 | Custom |
| Sentiment analysis | No | Yes | Yes | Yes |
| Competitive analysis | No | No | Yes | Yes |
| Boolean search | Basic | Advanced | Advanced (2,000 chars) | Advanced |
| Historical data | No | No | No | Up to 2 years |
| API access | No (extra cost) | No (extra cost) | No (extra cost) | Included |
| Review monitoring | Yes (75+ sites) | Yes | Yes | Yes |
| Dedicated account manager | No | No | No | Yes |

**Important notes:**
- Annual billing saves ~2 months (pay yearly, get 2 months free)
- Solo/Pro/ProPlus may not be available to new customers — Mention's website now pushes the Company plan at $599/mo. Check current availability.
- API access requires contacting Mention and paying an additional fee on self-serve plans
- No free plan — 14-day free trial available
- No overage fees, but monitoring stops when you hit your mention limit

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| **Slack** | Mention → Slack | Native — push new mentions to a channel |
| **Zapier** | Mention → any | Trigger: "New Mention Alert" → any Zapier action |
| **Integrately** | Mention → any | Similar to Zapier, alternative workflow tool |
| **API** | Bidirectional | REST API for alerts + mentions (extra cost) |

No native CRM connectors. No Make (Integromat) modules. No MCP server.

## Data model

### Alert object

```json
{
  "id": 12345,
  "name": "My Brand Monitor",
  "query": {
    "type": "basic",
    "included_keywords": ["acme corp", "acmecorp"],
    "excluded_keywords": ["acme hardware"],
    "required_keywords": []
  },
  "languages": ["en", "fr"],
  "countries": ["US", "GB"],
  "sources": ["web", "twitter", "facebook", "instagram"],
  "blocked_sites": ["spam-site.com"],
  "noise_detection": true,
  "sentiment_analysis": true,
  "reviews_pages": ["https://www.google.com/maps/place/..."],
  "connection_type": "main",
  "created_at": "2026-01-15T10:30:00+00:00",
  "updated_at": "2026-01-15T10:30:00+00:00",
  "stats": {
    "mentions": 1542,
    "tasks": 3,
    "logs": 12
  },
  "shares": [
    {"account_id": "abc123", "role": "admin"}
  ]
}
```
<!-- Constructed from docs — verify against live API -->

### Mention object

```json
{
  "id": "67890",
  "alert_id": 12345,
  "title": "Great new feature from Acme Corp",
  "description": "Acme Corp just launched their new analytics dashboard and it's exactly what we needed for...",
  "original_url": "https://blog.example.com/acme-review",
  "clickable_url": "https://blog.example.com/acme-review",
  "displayable_url": "blog.example.com",
  "unique_id": "web:blog.example.com:12345",
  "published_at": "2026-03-10T14:22:00+00:00",
  "created_at": "2026-03-10T14:25:00+00:00",
  "updated_at": "2026-03-10T14:25:00+00:00",
  "country": "US",
  "favorite": false,
  "folder": "inbox",
  "read": false,
  "tone": 1,
  "source_type": "web",
  "source_name": "Example Blog",
  "source_url": "https://blog.example.com",
  "language_code": "en",
  "tags": [{"id": 101, "name": "positive-review"}],
  "picture_url": "https://blog.example.com/image.jpg",
  "author_influence": {
    "score": 72
  },
  "children": {
    "mentions": [],
    "total": 0
  },
  "permissions": {
    "can_favorite": true,
    "can_trash": true,
    "can_set_tone": true
  }
}
```
<!-- Constructed from docs — verify against live API -->

**Key fields:**
- `tone`: -1 (negative), 0 (neutral), 1 (positive) — only populated on Pro+ plans with sentiment enabled
- `description`: Truncated to ~250 characters due to legal/IP restrictions. Follow `original_url` for full content.
- `folder`: `inbox`, `archive`, `spam`, or `trash`
- Twitter/Facebook/Instagram mentions omit `title`, `description`, `source_name`, `source_url`, and `picture_url` — use `metadata` for platform-specific fields

## Quick-start recipes

### Recipe 1: List recent mentions for an alert (cURL + Python)

**Use case:** Pull latest brand mentions into your dashboard or CRM.

**cURL:**
```bash
curl -s 'https://api.mention.net/api/accounts/{account_id}/alerts/{alert_id}/mentions?limit=50' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Accept-Version: 1.19' | jq '.mentions[] | {title, tone, source_type, published_at, url: .original_url}'
```

**Python:**
```python
import requests

BASE = "https://api.mention.net/api"
HEADERS = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Accept-Version": "1.19",
}

def get_mentions(account_id, alert_id, limit=50):
    url = f"{BASE}/accounts/{account_id}/alerts/{alert_id}/mentions"
    mentions = []
    params = {"limit": limit}

    while url:
        resp = requests.get(url, headers=HEADERS, params=params)
        resp.raise_for_status()
        data = resp.json()
        mentions.extend(data.get("mentions", []))
        # Follow cursor for next page
        more = data.get("_links", {}).get("more", {})
        url = more.get("href") if more else None
        params = {}  # params are embedded in the cursor URL

    return mentions

for m in get_mentions("ACC_ID", "ALERT_ID"):
    print(f"[{m['tone']}] {m['source_type']}: {m['title'][:80]} — {m['original_url']}")
```

**Gotchas:**
- Rate limit: 3,600 calls per alert per 24 hours
- `description` is truncated to ~250 chars — scrape `original_url` if you need full text
- On 429 responses, read `X-Rate-Limit-Reset` header for the unix timestamp when you can retry

### Recipe 2: Create a monitoring alert

**Use case:** Programmatically set up monitoring for a new brand or competitor.

**cURL:**
```bash
curl -X POST 'https://api.mention.net/api/accounts/{account_id}/alerts' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Accept-Version: 1.19' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Acme Corp Monitor",
    "query": {
      "type": "basic",
      "included_keywords": ["acme corp", "acmecorp", "@acmecorp"],
      "excluded_keywords": ["acme hardware", "acme anvil"],
      "required_keywords": []
    },
    "languages": ["en"],
    "sources": ["web", "twitter", "facebook", "instagram", "reddit"],
    "noise_detection": true,
    "sentiment_analysis": true
  }'
```

**Gotchas:**
- Alert creation rate limit: max(20, alertsQuota * 2) calls per 24 hours
- You cannot exceed your plan's alert limit (e.g., 2 on Solo)
- Mentions only start from the moment the alert is created — no retroactive data

### Recipe 3: Tag and curate mentions

**Use case:** Automatically tag mentions by sentiment or topic for reporting.

**Python:**
```python
def curate_mention(account_id, alert_id, mention_id, tags=None, tone=None, folder=None):
    """Update a mention: tag it, set sentiment, or move to a folder."""
    url = f"{BASE}/accounts/{account_id}/alerts/{alert_id}/mentions/{mention_id}"
    body = {}
    if tags:
        body["tags"] = [{"id": t} for t in tags]
    if tone is not None:
        body["tone"] = tone  # -1, 0, or 1
    if folder:
        body["folder"] = folder  # inbox, archive, spam, trash
    resp = requests.put(url, headers=HEADERS, json=body)
    resp.raise_for_status()
    return resp.json()

# Mark a mention as positive and archive it
curate_mention("ACC_ID", "ALERT_ID", "MENTION_ID", tone=1, folder="archive")
```

## Integration patterns

### Polling for new mentions

The API provides a `_links.pull` URL in the mentions list response. This URL returns only mentions newer than the last fetch — use it for incremental polling:

1. Initial fetch: `GET /accounts/{id}/alerts/{id}/mentions?limit=50`
2. Save the `_links.pull.href` from the response
3. Next poll: `GET {pull_href}` — returns only new mentions since last call
4. Repeat every 5-15 minutes (stays well within rate limits)

### Zapier integration pattern

Mention's Zapier integration provides one trigger:
- **New Mention Alert** — fires when a new mention matches any of your alerts

Common Zaps:
- Mention → Google Sheets (log all mentions for analysis)
- Mention → Slack (real-time team notifications)
- Mention → HubSpot (create activity on a contact when they mention you)
- Mention → Airtable (build a mention database with custom fields)

### Rate limit handling

```python
import time

def safe_request(url, headers, max_retries=3):
    for attempt in range(max_retries):
        resp = requests.get(url, headers=headers)
        if resp.status_code == 429:
            reset = int(resp.headers.get("X-Rate-Limit-Reset", time.time() + 60))
            wait = max(reset - time.time(), 1)
            time.sleep(wait)
            continue
        resp.raise_for_status()
        return resp.json()
    raise Exception("Rate limit exceeded after retries")
```
