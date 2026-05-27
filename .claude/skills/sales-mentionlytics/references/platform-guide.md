# Mentionlytics Platform Reference

## Overview

Mentionlytics is a mid-market social listening and brand monitoring tool that monitors web and social mentions across all major channels. Differentiator: all features (sentiment, Boolean, SIA) are available on every plan — you only pay for volume. Target: SMBs, agencies, and solopreneurs who need more depth than Mention but can't justify Brand24/Meltwater pricing.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| Brand Monitoring | Track keyword mentions across web + social | API-accessible (Pro+) |
| Sentiment Analysis | AI-powered positive/negative/neutral + emotion detection | API-accessible (Pro+) |
| Social Intelligence Advisor (SIA) | AI recommendations for improving online presence | UI-only |
| Competitor Tracking | Monitor competitor brands, compare Share of Voice | API-accessible (Pro+) |
| Top Keywords | Discover trending words/hashtags in your mentions | API-accessible (Pro+) |
| Top Mentioners | Rank profiles by reach, engagement, mention count | API-accessible (Pro+) |
| Demographics | Gender and age breakdown of audience (owned media) | API-accessible (Pro+) |
| Geographic Analytics | Country and language breakdown of mentions | API-accessible (Pro+) |
| Reports | PDF/email reports, white-label, infographics | UI-only |
| Email Alerts | Automated notifications for new mentions | UI-only (configure in dashboard) |
| Hootsuite Integration | Native Hootsuite app for monitoring within Hootsuite | Native app |
| Looker Studio Connector | Connect Mentionlytics data to Google Looker Studio | Native connector |

## Pricing, limits & plan gates

All plans include the same features. Difference is keyword count and mention volume.

| Plan | Monthly (annual) | Keywords | Mentions/mo | Users | API |
|---|---|---|---|---|---|
| Basic | $69 | 3 | ~5,000 | 2 | No |
| Essential | $139 | 5 | ~10,000 | 5 | No |
| Advanced | $249 | 10 | ~25,000 | 10 | No |
| Pro | $399 | 20 | ~50,000 | 15 | Yes |
| Agency | $599 | 40+ | ~100,000 | 25 | Yes |
| Enterprise | $950 | Custom | Custom | Custom | Yes |

**Free trial:** 14 days, 3 keywords, 5,000 mentions, 10 social profiles, 5 users, full feature access.

**API gate:** Pro ($399/mo) and above only. No way to get API access on lower plans.

**Rate limit:** 100 requests/minute across all endpoints.

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| Hootsuite | Read (mentions in Hootsuite) | Native app in Hootsuite marketplace |
| Looker Studio | Read (data visualization) | Native connector for dashboards |
| REST API v2 | Read-only | Pro+ plans, Bearer auth, 100 req/min |

**No Zapier, no Make, no webhooks, no MCP server.** The only programmatic access is the REST API on Pro+ plans.

## Data model

### Mention object (from /api/mentions)

```json
{
  "id": 12345678,
  "uid": "abc123",
  "ftext": "Check out @YourBrand — great product!",
  "body": "Check out @YourBrand — great product!",
  "mchannel": "Twitter",
  "mchannel_id": 2,
  "profile_name": "John Smith",
  "screen_name": "johnsmith",
  "profile_image_url": "https://pbs.twimg.com/profile_images/...",
  "followers_count": 1500,
  "mEngagement": 45,
  "mRank": 78,
  "sentiment_text": "positive",
  "emotion": "joy",
  "pub_date": "20260504",
  "pub_datetime": "2026-05-04T14:23:00Z",
  "campaign": "Brand Monitoring",
  "campaign_id": 1,
  "commtrack": "brandmonitoring",
  "total_count": 523
}
```
<!-- Constructed from docs — verify against live API -->

### Aggregation object (from /api/aggregation)

```json
{
  "mentions": {
    "web": 150,
    "social": 320,
    "total": 470
  },
  "reach": {
    "1": 5000,
    "2": 12000,
    "3": 3000
  },
  "sentiment": {
    "positive": 210,
    "negative": 45,
    "neutral": 215
  },
  "engagement": {
    "likes": 890,
    "comments": 120,
    "shares": 340,
    "views": 15000
  }
}
```
<!-- Constructed from docs — verify against live API -->

### Channel IDs

| ID | Channel |
|---|---|
| 1 | Web |
| 2 | Twitter/X |
| 3 | Facebook |
| 4 | YouTube |
| 5 | Instagram |
| 7 | Reviews |
| 99 | Others |

## Quick-start recipes

### Recipe 1: Fetch recent brand mentions (cURL + Python)

**Use case:** Pull yesterday's mentions into a custom dashboard or Slack bot.

**cURL:**
```bash
# Get Bearer token (from Settings > API / Access Tokens in Mentionlytics dashboard)
# API v1 (deprecated but simpler for quick testing):
curl "https://app.mentionlytics.com/api/mentions?token=YOUR_TOKEN&startDate=20260503&endDate=20260504&per_page=50"

# API v2 (recommended):
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://api.mentionlytics.com/v2/mentions?startDate=20260503&endDate=20260504&per_page=50"
```

**Python:**
```python
import requests
from datetime import datetime, timedelta

BASE_URL = "https://api.mentionlytics.com/v2"
ACCESS_TOKEN = "your_bearer_token"
REFRESH_TOKEN = "your_refresh_token"

headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y%m%d")
today = datetime.now().strftime("%Y%m%d")

response = requests.get(
    f"{BASE_URL}/mentions",
    headers=headers,
    params={
        "startDate": yesterday,
        "endDate": today,
        "per_page": 100,
        "ordering": "date"
    }
)

if response.status_code == 401:
    # Token expired — refresh it
    refresh_resp = requests.post(f"{BASE_URL}/auth/refresh", json={"refresh_token": REFRESH_TOKEN})
    ACCESS_TOKEN = refresh_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
    response = requests.get(f"{BASE_URL}/mentions", headers=headers, params={"startDate": yesterday, "endDate": today, "per_page": 100})

mentions = response.json()
for mention in mentions:
    print(f"[{mention['sentiment_text']}] {mention['profile_name']}: {mention['ftext'][:100]}")
```

**Gotchas:** Bearer token expires every hour. Always handle 401 with refresh logic.

### Recipe 2: Weekly sentiment summary for stakeholders

**Use case:** Generate a weekly brand health report with sentiment breakdown.

```python
import requests
from datetime import datetime, timedelta

BASE_URL = "https://api.mentionlytics.com/v2"
headers = {"Authorization": "Bearer YOUR_TOKEN"}

week_ago = (datetime.now() - timedelta(days=7)).strftime("%Y%m%d")
today = datetime.now().strftime("%Y%m%d")

# Get aggregated data
agg = requests.get(
    f"{BASE_URL}/aggregation",
    headers=headers,
    params={"startDate": week_ago, "endDate": today}
).json()

total = agg["sentiment"]["positive"] + agg["sentiment"]["negative"] + agg["sentiment"]["neutral"]
print(f"Weekly Brand Health Report ({week_ago} - {today})")
print(f"Total mentions: {agg['mentions']['total']}")
print(f"Sentiment: {agg['sentiment']['positive']/total*100:.0f}% positive, {agg['sentiment']['negative']/total*100:.0f}% negative")
print(f"Engagement: {agg['engagement']['likes']} likes, {agg['engagement']['shares']} shares")

# Get top mentioners
mentioners = requests.get(
    f"{BASE_URL}/mentioners",
    headers=headers,
    params={"startDate": week_ago, "endDate": today, "ordering": "reach", "per_page": 5}
).json()

print("\nTop 5 Mentioners by Reach:")
for m in mentioners:
    print(f"  @{m['screen_name']} (reach: {m['followers_count']}, sentiment: {m['pos_count']}+/{m['neg_count']}-)")
```

### Recipe 3: Competitive Share of Voice comparison

**Use case:** Compare your brand's mention volume against competitors.

```python
import requests

BASE_URL = "https://api.mentionlytics.com/v2"
headers = {"Authorization": "Bearer YOUR_TOKEN"}

params = {"startDate": "20260401", "endDate": "20260504"}

# Get your brand mentions
brand = requests.get(f"{BASE_URL}/aggregation", headers=headers, params={**params, "commtracks": "brandmonitoring"}).json()

# Get competitor mentions
competitors = requests.get(f"{BASE_URL}/aggregation", headers=headers, params={**params, "commtracks": "competitors"}).json()

brand_total = brand["mentions"]["total"]
comp_total = competitors["mentions"]["total"]
total = brand_total + comp_total

print(f"Share of Voice (Apr 1 - May 4, 2026):")
print(f"  Your brand: {brand_total} mentions ({brand_total/total*100:.0f}%)")
print(f"  Competitors: {comp_total} mentions ({comp_total/total*100:.0f}%)")
```

**Gotchas:** The `commtracks` filter separates brand vs competitor keyword groups. You must set up keywords as "Brand Monitoring" or "Competitors" in the Mentionlytics dashboard for this to work.

## Integration patterns

### Token refresh pattern

The dual-token system requires:
1. Initial auth: get Bearer + Refresh tokens from dashboard (Settings > API / Access Tokens)
2. Every API call: include `Authorization: Bearer <token>` header
3. On 401: POST to refresh endpoint with Refresh Token → get new Bearer Token
4. Refresh tokens have longer TTL but can also expire — if refresh fails, user must re-authenticate in dashboard

### Pagination pattern

- Use `page_no` (0-indexed) + `per_page` (default 20, max 10,000)
- Alternative: `results_after` parameter for cursor-style pagination (prevents duplicate mentions across pages)
- Total count available in response's `total_count` field

### Data export pipeline

Since the API is read-only, a typical integration:
1. Cron job (every hour or daily) calls `/api/mentions` with date range
2. Stores results in local database / data warehouse
3. Feeds dashboard (Looker Studio, Grafana, custom)
4. Alerts on sentiment spikes via custom logic (no native webhook alerts to external systems)
