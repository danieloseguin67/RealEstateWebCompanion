# BrandMentions Platform Reference

## Overview

BrandMentions is a social listening and brand monitoring platform that tracks online mentions across web and social media in real time. Differentiator: emotion AI sentiment analysis that breaks reactions into categories (admiration, frustration, sarcasm, joy) beyond basic positive/negative/neutral. Targets SMBs and agencies that need affordable monitoring with competitor intelligence.

## Capabilities & automation surface

| Capability | Description | Automation |
|---|---|---|
| **Brand monitoring** | Track mentions across web, social, news, blogs, forums, reviews. 9.4B+ mentions analyzed. Sources: Facebook, X, Instagram, LinkedIn, Reddit, YouTube, TikTok, Bluesky | API-accessible (Enterprise only) |
| **Sentiment analysis** | Emotion AI with categories (admiration, frustration, sarcasm, joy). Basic AI on Starter, advanced multilingual on Pro+ | API-accessible (Enterprise only) |
| **Competitor intelligence** | Side-by-side competitor tracking, Share of Voice analysis | API-accessible (Enterprise only) |
| **Real-time alerts** | Email notifications for new mentions and links. Volume spike detection | UI-only (email delivery) |
| **White-label reports** | Customizable branded reports without BrandMentions branding | UI-only (Expert+ plans) |
| **Influencer identification** | GetProjectInfluencers endpoint returns top authors/influencers by reach | API-accessible (Enterprise only) |
| **Historical data** | Backfill searches by month. Starter = 3mo, Pro = 6mo, Expert = 12mo, Enterprise = unlimited | API-accessible (Enterprise only) |
| **Review monitoring** | AddReviewSourceToProject integrates review platforms | API-accessible (Enterprise only) |
| **Data export** | CSV export. Starter = 1K rows, Pro = 10K, Expert = 100K, Enterprise = unlimited | UI-only (manual download) |
| **Boolean search** | AND, OR, NOT, exact phrases — Expert+ plans only | API-accessible (Enterprise only) |

## Pricing, limits & plan gates

| Feature | Starter $99/mo | Pro $299/mo | Expert $499/mo | Enterprise $1,299+/mo |
|---|---|---|---|---|
| **Annual price** | $89/mo | $249/mo | $399/mo | $1,099+/mo |
| **Keywords** | 5 | 20 | 50 | Custom |
| **Mentions/month** | 5,000 | 30,000 | 75,000 | Custom |
| **Users** | 1 | 2 | 10 | Custom |
| **Update frequency** | Daily | Hourly | Real-time | Real-time |
| **Sentiment** | Basic AI | Advanced AI, multilingual | Advanced AI, multilingual | Advanced AI, multilingual |
| **Historical data** | 3 months | 6 months | 12 months | Unlimited |
| **Projects** | 3 | 10 | 50 | Unlimited |
| **Boolean search** | No | No | Yes | Yes |
| **White-label reports** | No | No | Yes | Yes |
| **Data export rows** | 1,000 | 10,000 | 100,000 | Unlimited |
| **API access** | No | No | No | Yes |
| **App white-label** | No | No | No | Yes |

**7-day free trial** on all plans — no credit card required. Watch for auto-upgrade billing behavior.

**Mention limit is a hard stop** — monitoring pauses when you hit your monthly cap. No degraded mode.

## Integrations

BrandMentions has a limited integration surface:

- **Email alerts**: Real-time mention notifications via email (all plans)
- **CSV export**: Manual data export with row limits per plan
- **REST API**: Enterprise only — full programmatic access
- **No Zapier/Make/webhooks**: No iPaaS connectors or webhook support
- **No MCP server**: No AI assistant integration

For non-Enterprise users, the only data egress path is manual CSV export.

## Data model

### Mention object (from GetProjectMentions / GetMentions)

```json
<!-- Constructed from docs — verify against live API -->
{
  "title": "Blog post mentioning Acme Corp",
  "url": "https://example.com/article",
  "source": "web",
  "date": "2026-05-01T14:30:00Z",
  "sentiment": "positive",
  "emotion": "admiration",
  "reach": 15000,
  "engagement": 42,
  "language": "en",
  "country": "US",
  "author": "john_doe",
  "snippet": "Acme Corp just launched their new product and it looks impressive..."
}
```

### Project object (from ListProjects)

```json
<!-- Constructed from docs — verify against live API -->
{
  "project_id": "abc123",
  "name": "Acme Brand Monitor",
  "keywords": ["Acme Corp", "AcmeCorp", "Acme software"],
  "sources": ["web", "facebook", "twitter", "instagram", "reddit"],
  "language": "en",
  "country": "US",
  "created_at": "2026-01-15T10:00:00Z"
}
```

### Search result (from PostSearch → GetMentions flow)

```json
<!-- Constructed from docs — verify against live API -->
{
  "search_hash": "a1b2c3d4e5",
  "status": "completed",
  "total_results": 247,
  "mentions": [
    {
      "title": "...",
      "url": "...",
      "source": "twitter",
      "sentiment": "negative",
      "emotion": "frustration",
      "date": "2026-05-01T09:15:00Z"
    }
  ]
}
```

## Quick-start recipes

### Recipe 1: Check remaining API credits

**Trigger**: Before running searches, verify you have credits available.

**cURL:**
```bash
curl "https://api.brandmentions.com/command.php?api_key=YOUR_API_KEY&command=GetRemainingCredits"
```

**Python:**
```python
import requests

API_KEY = "YOUR_API_KEY"
BASE = "https://api.brandmentions.com/command.php"

resp = requests.get(BASE, params={"api_key": API_KEY, "command": "GetRemainingCredits"})
credits = resp.json()
print(f"Search credits: {credits.get('post_search_credits')}")
print(f"Project credits: {credits.get('add_project_credits')}")
```

**Gotcha**: Each PostSearch costs 1 credit. GetMentions and GetProcessedMentions are free.

### Recipe 2: Run an on-demand search and retrieve results

**Trigger**: Need to search for mentions outside your saved projects.

**cURL (create search):**
```bash
curl -X POST "https://api.brandmentions.com/command.php" \
  -d "api_key=YOUR_API_KEY" \
  -d "command=PostSearch" \
  -d "keywords[0]=Acme Corp" \
  -d "keywords[1]=AcmeCorp" \
  -d "match_type=exact"
```

**cURL (retrieve results — use the search_hash from PostSearch response):**
```bash
curl "https://api.brandmentions.com/command.php?api_key=YOUR_API_KEY&command=GetMentions&search_hash=HASH_FROM_ABOVE"
```

**Python (full flow):**
```python
import requests
import time

API_KEY = "YOUR_API_KEY"
BASE = "https://api.brandmentions.com/command.php"

# Step 1: Create search
search_resp = requests.post(BASE, data={
    "api_key": API_KEY,
    "command": "PostSearch",
    "keywords[0]": "Acme Corp",
    "keywords[1]": "AcmeCorp",
    "match_type": "exact"
})
search_hash = search_resp.json().get("search_hash")

# Step 2: Poll for results (13-second intervals)
while True:
    poll_resp = requests.get(BASE, params={
        "api_key": API_KEY,
        "command": "GetProcessedMentions",
        "search_hash": search_hash
    })
    data = poll_resp.json()
    if data.get("processing_ended"):
        break
    time.sleep(13)

# Step 3: Get complete results
results = requests.get(BASE, params={
    "api_key": API_KEY,
    "command": "GetMentions",
    "search_hash": search_hash
})
mentions = results.json().get("mentions", [])
print(f"Found {len(mentions)} mentions")
```

**Gotchas**:
- Search hash expires after 1 hour
- Up to 5 keywords per search (3-50 chars each)
- Use GetProcessedMentions with 13-second polling intervals for partial results

### Recipe 3: List project mentions with pagination

**Trigger**: Export mentions from a saved project for reporting or CRM sync.

**cURL:**
```bash
curl "https://api.brandmentions.com/command.php?api_key=YOUR_API_KEY&command=GetProjectMentions&project_id=PROJECT_ID&page=1&per_page=100"
```

**Python:**
```python
import requests

API_KEY = "YOUR_API_KEY"
BASE = "https://api.brandmentions.com/command.php"

all_mentions = []
page = 1

while True:
    resp = requests.get(BASE, params={
        "api_key": API_KEY,
        "command": "GetProjectMentions",
        "project_id": "PROJECT_ID",
        "page": page,
        "per_page": 100
    })
    data = resp.json()
    mentions = data.get("mentions", [])
    if not mentions:
        break
    all_mentions.extend(mentions)
    page += 1

print(f"Total mentions exported: {len(all_mentions)}")
```

**Gotcha**: Max 100 mentions per page. Use date range filters to reduce result sets.

## Integration patterns

### CRM sync (Enterprise only)

Since BrandMentions has no webhooks, CRM sync requires polling:

1. **Scheduled fetch**: Run GetProjectMentions on a cron (hourly or daily)
2. **Dedup**: Track last-seen mention date/URL to avoid duplicates
3. **Map fields**: mention.url → CRM note URL, mention.sentiment → custom field, mention.author → contact lookup
4. **Error handling**: Check `status` field in every response. Error codes 3/4 = auth failure, retry with fresh key

### Batch export pattern

1. Use GetProjectMentions with date range filters
2. Paginate through all results (100 per page max)
3. Rate limit: No documented rate limit, but space requests by 1-2 seconds
4. Export to CSV/JSON for BI tools

### No-API workaround (non-Enterprise plans)

For plans without API access:
1. Use manual CSV export (limited to plan's row cap)
2. Schedule weekly exports and import into Google Sheets or BI tool
3. Use email alerts as a lightweight trigger (forward to Zapier Email Parser for basic automation)
