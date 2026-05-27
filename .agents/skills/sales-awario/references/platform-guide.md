# Awario Platform Reference

## Overview

Awario is a budget-friendly social listening and brand monitoring platform that crawls 13B+ web pages daily using proprietary crawlers (not just API-dependent). It monitors X/Twitter, Facebook, Instagram, Reddit, YouTube, Vimeo, blogs, forums, news sites, and the broader web. Differentiator: Awario Leads — a social selling feature that finds prospects asking for product recommendations. Target audience: SMBs, startups, and solopreneurs who need affordable monitoring without enterprise contracts.

## Capabilities & automation surface

| Capability | What it does | Access |
|---|---|---|
| **Mention Monitoring** | Real-time brand mention detection across social + web with Boolean search | UI + API (Enterprise) |
| **Awario Leads** | Finds prospects asking for recommendations — separate alert type from regular mentions | UI only (not a separate API endpoint — uses same mentions endpoint with leads alert type) |
| **Sentiment Analysis** | Auto-classifies mentions as positive, negative, or neutral | UI + API (insights endpoint) |
| **Share of Voice** | Competitive benchmarking — compares your mention volume/reach against competitors | UI only |
| **Topic Cloud** | Visual representation of most-discussed terms around your brand | UI + API (insights/total/topic_cloud) |
| **Audience Demographics** | Age, gender, country, language breakdown of who's mentioning you | UI + API (insights/total/gender, age, countries, languages) |
| **Influencer Identification** | Surfaces high-reach authors mentioning your keywords | UI only (sort by reach in mentions feed) |
| **In-App Engagement** | Reply to mentions directly from Awario without switching to the source platform | UI only |
| **Reporting** | PDF reports, white-label reports, scheduled email reports | UI only |
| **Boolean Search** | AND, OR, NOT, quotes, parentheses for complex query building | UI + API (configured in alert setup, then queried via API) |
| **Slack Integration** | Push new mention notifications to a Slack channel | UI config |
| **Zapier Integration** | Trigger: "New Mention Found" — push mentions to 8,000+ apps | Zapier (uses API key for auth) |

## Pricing, limits & plan gates

*Best-effort from research — verify current pricing at awario.com/pricing*

| | Starter | Pro | Enterprise |
|---|---|---|---|
| **Annual price** | €29/mo | €89/mo | €249/mo |
| **Monthly price** | €49/mo | €149/mo | €399/mo |
| **Topics (alerts)** | 3 | 15 | 100 |
| **Monthly new mentions** | 30,000 | 300,000 | 1,000,000 |
| **Stored mentions/topic** | 5,000 | 15,000 | 50,000 |
| **Team members** | 1 | 10 | Unlimited |
| **Boolean search** | Yes | Yes | Yes |
| **Data export** | Yes | Yes | Yes |
| **PDF reports** | Yes | Yes | Yes |
| **White-label reports** | Yes | Yes | Yes |
| **API access** | Pricing page says yes; API docs say Enterprise only — verify with support | Pricing page says yes; API docs say Enterprise only — verify with support | Yes (confirmed) |
| **Account manager** | Yes | Yes | Yes |

**Free trial**: Starter-level access (3 alerts, 30K mentions).

**Key plan gates for integrations:**
- API is documented as Enterprise-only despite the pricing page listing it on all plans. If you need programmatic access, confirm with Awario support before committing to a lower plan.
- Zapier integration uses an API key — same access question applies. Test during trial.
- No webhooks, no Make integration, no MCP server.

## Integrations

| Integration | Direction | Details |
|---|---|---|
| **Slack** | Awario → Slack | Push mention alerts to a channel. Configure per-alert in Awario UI. |
| **Zapier** | Awario → anything | Trigger: "New Mention Found". Auth via API key from Account Settings > API tab. One-way — no actions back into Awario. |
| **API** | Read from Awario | Enterprise only. REST API at `api.awario.com/v1.0/`. Get alerts, get mentions, get insights. No write endpoints (can't create alerts or update mentions via API). |
| **Adverity** | Awario → Adverity | Third-party data connector — pulls Awario analytics into Adverity dashboards. |

**What's missing:** No Make modules, no native CRM connectors, no webhooks, no bidirectional sync. For CRM integration, use Zapier: New Mention → filter by sentiment → create CRM record.

## Data model

### Alert object

<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 123456,
  "type": "mention",
  "name": "My Brand Alert",
  "project_id": 789,
  "mentions_count": 1542
}
```

Alert types: `mention` (brand monitoring) and `leads` (Awario Leads prospecting).

### Mention object

<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 98765432,
  "url": "https://reddit.com/r/SaaS/comments/...",
  "title": "Looking for a social listening tool",
  "snippet": "Can anyone recommend a good social listening tool that...",
  "author": {
    "name": "reddit_user_42",
    "url": "https://reddit.com/u/reddit_user_42",
    "avatar": "https://..."
  },
  "source": "reddit",
  "sentiment": "neutral",
  "reach": 15000,
  "country": "US",
  "language": "en",
  "date": 1714003200000,
  "tags": ["competitor-mention"],
  "entity_info": {
    "highlighted_text": "...recommend a good <em>social listening</em> tool..."
  }
}
```

Key fields:
- `date`: Unix timestamp in **milliseconds** (not seconds)
- `source`: One of `facebook`, `instagram`, `youtube`, `vimeo`, `reddit`, `news-blogs`, `web` (note: `twitter` exists in UI but NOT returned by API)
- `sentiment`: `positive`, `negative`, or `neutral`
- `reach`: Estimated audience size of the source

### Insights response

<!-- Constructed from docs — verify against live API -->
```json
{
  "total": {
    "mentions": 1542,
    "positive": 823,
    "negative": 201,
    "neutral": 518
  }
}
```

## Quick-start recipes

### Recipe 1: Export mentions for a custom dashboard (cURL + Python)

**Use case**: Pull all brand mentions from the last 7 days into a CSV for analysis.

**cURL:**
```bash
# Get mentions from the last 7 days
curl "https://api.awario.com/v1.0/alerts/ALERT_ID/mentions?access_token=YOUR_API_KEY&date_from=$(date -d '7 days ago' +%s)000&date_to=$(date +%s)000&limit=300"
```

**Python:**
```python
import requests
import time
import csv

API_KEY = "your_api_key"
ALERT_ID = "123456"
BASE_URL = "https://api.awario.com/v1.0"

# Last 7 days in milliseconds
now_ms = int(time.time() * 1000)
week_ago_ms = now_ms - (7 * 24 * 60 * 60 * 1000)

mentions = []
next_token = None

while True:
    params = {
        "access_token": API_KEY,
        "date_from": week_ago_ms,
        "date_to": now_ms,
        "limit": 300,
    }
    if next_token:
        params["next"] = next_token

    resp = requests.get(f"{BASE_URL}/alerts/{ALERT_ID}/mentions", params=params)
    resp.raise_for_status()
    data = resp.json()

    mentions.extend(data.get("mentions", []))
    next_token = data.get("next")
    if not next_token or not data.get("mentions"):
        break

# Write to CSV
with open("mentions.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["date", "source", "sentiment", "reach", "url", "snippet"])
    writer.writeheader()
    for m in mentions:
        writer.writerow({
            "date": m.get("date"),
            "source": m.get("source"),
            "sentiment": m.get("sentiment"),
            "reach": m.get("reach"),
            "url": m.get("url"),
            "snippet": m.get("snippet", "")[:200],
        })

print(f"Exported {len(mentions)} mentions to mentions.csv")
```

**Gotcha**: Rate limit is 300 req/min per token. With 300 mentions/page, you can fetch 90K mentions/min — more than enough for most use cases. Add a small delay if paginating through very large datasets.

### Recipe 2: Sentiment trend monitoring with time series (Python)

**Use case**: Track daily sentiment scores to detect negative spikes early.

```python
import requests

API_KEY = "your_api_key"
ALERT_ID = "123456"

resp = requests.get(
    f"https://api.awario.com/v1.0/alerts/{ALERT_ID}/insights/time_series/sentiment",
    params={
        "access_token": API_KEY,
        "date_from": "2026-04-01",
        "date_to": "2026-05-01",
        "granularity": "Day",
    },
)
resp.raise_for_status()
data = resp.json()

# Check for negative sentiment spikes
for day in data.get("time_series", []):
    negative_pct = day.get("negative", 0) / max(day.get("total", 1), 1) * 100
    if negative_pct > 30:
        print(f"ALERT: {day['date']} — {negative_pct:.0f}% negative sentiment")
```

**Gotcha**: Insights endpoint uses `YYYY-MM-DD` date format, not millisecond timestamps (unlike the mentions endpoint).

### Recipe 3: Zapier — new mention to Slack with sentiment filter

**Use case**: Only get Slack notifications for negative mentions (skip neutral/positive noise).

1. **Trigger**: Awario → "New Mention Found"
2. **Filter** (Zapier built-in): Only continue if `sentiment` equals `negative`
3. **Action**: Slack → Send Channel Message
   - Channel: `#brand-alerts`
   - Message: `Negative mention from {{source}}: {{snippet}} — {{url}}`

Auth: In Zapier, connect Awario using the API key from Account Settings > API tab.

## Integration patterns

### CRM sync via Zapier

Awario has no native CRM connectors. Use Zapier:

**Mention → CRM lead flow:**
1. Trigger: Awario "New Mention Found" (from a Leads alert)
2. Filter: sentiment = positive OR neutral, reach > 1000
3. Action: Create contact in HubSpot/Salesforce/Attio with fields: name (from author), source URL, mention snippet, sentiment

**Limitation**: Zapier only triggers on new mentions — no batch sync, no historical backfill. For bulk export, use the API (Enterprise).

### Rate limit handling

- **Per IP**: 100 requests/second — unlikely to hit unless parallelizing heavily
- **Per token**: 300 requests/minute — the binding constraint
- **Error codes**: 11 (token rate limit) and 12 (IP rate limit) return HTTP 403
- **Retry strategy**: On 403 with code 11/12, wait 60 seconds and retry. On 503 (system busy), exponential backoff starting at 5 seconds.

### Pagination

The mentions endpoint uses cursor-based pagination via the `next` token:
1. First request: omit `next` parameter
2. Response includes a `next` token if more results exist
3. Pass `next` value in subsequent requests
4. Stop when `next` is absent or `mentions` array is empty
5. Max 300 results per page (`limit` parameter)
