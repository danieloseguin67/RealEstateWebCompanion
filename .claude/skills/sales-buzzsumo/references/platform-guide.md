# BuzzSumo Platform Reference

## Overview

Content intelligence platform (owned by Cision) that analyzes 8B+ articles to surface trending topics, top-performing content, influencers, and journalist contacts. Primarily used by content marketers, PR teams, and agencies for content research, media outreach, and competitive content analysis.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| **Content Analyzer** | Search articles by topic/domain, filter by date/engagement/country, view share counts | API-accessible (Search API) |
| **Trending Feeds** | Real-time trending topics, 15-min to 24-hour windows | API-accessible (Search API) |
| **Question Analyzer** | Find questions asked on forums/Q&A sites by topic | API-accessible (Search API) |
| **Media Database** | 700K journalists, 330K active monthly, beat/outlet filtering | UI-only (PR & Comms+ plans) |
| **Monitoring Alerts** | Brand mention, keyword, competitor, backlink alerts | API-accessible (Account API) |
| **Projects** | Batch URL upload for performance tracking | API-accessible (Account API) |
| **Influencer Search** | Find sharers by topic on Facebook, X, YouTube, TikTok | API-accessible (Search API) |
| **YouTube Analyzer** | Video performance metrics (views, likes, comments) | API-accessible (Search API) |
| **Backlinks** | Backlink data for articles/domains | API-accessible (Backlinks API) |
| **Chrome Extension** | Real-time content analysis while browsing | UI-only |
| **Coverage Reports** | Aggregated media mention data | UI-only (PR & Comms+) |

## Pricing, limits & plan gates

| Plan | Monthly (annual -20%) | Users | Searches/mo | Alerts | Key gates |
|---|---|---|---|---|---|
| **Content Creation** | $199 | 1 | Unlimited | 2 | No media database, no Slack, no journalist access |
| **PR & Comms** | $299 | 5 | Unlimited | 10 | Media database, Coverage Reports, Slack integration |
| **Suite** | $499 | 10 | Unlimited | 25 | YouTube Analyzer, Advanced Chrome Extension, Article Uploads |
| **Enterprise** | $999 | 30 | Unlimited | 50 | RSS Feed Sync, Location Search, Beta Access |

**API limits (free key included with all plans):**
- Search API: 100 calls/month
- Account API: 100,000 calls/month
- Higher limits: apply via form, approved case-by-case
- No documented per-minute rate limits

**Trial:** 30 days, 50 total searches (hard cap, not per month). No free plan.

## Integrations

| Integration | Direction | Details |
|---|---|---|
| **Slack** | BuzzSumo → Slack | Alert notifications (PR & Comms+ only) |
| **RSS** | BuzzSumo → any RSS reader | From Monitoring Alerts and Trending Feeds (Enterprise for Feed Sync) |
| **Zapier/IFTTT** | BuzzSumo → third-party | Via RSS feeds from alerts/trending — not native Zapier triggers |
| **API** | Bidirectional | Read content data (Search), manage alerts/projects (Account), backlinks (Backlinks) |
| **Chrome Extension** | N/A | In-browser content analysis |

No native CRM connectors. No Make modules. No webhooks. No MCP server.

## Data model

### Article object (Search API response)

<!-- Constructed from docs and community repos — verify against live API -->
```json
{
  "title": "How AI is Changing Content Marketing",
  "url": "https://example.com/article",
  "domain_name": "example.com",
  "date_published": "2026-04-15",
  "total_facebook_shares": 1250,
  "twitter_shares": 340,
  "reddit_engagements": 89,
  "total_shares": 1679,
  "num_linking_domains": 23,
  "thumbnail": "https://example.com/thumb.jpg",
  "author_name": "Jane Smith",
  "language": "en"
}
```

### Influencer object (Search API response)

<!-- Constructed from docs and community repos — verify against live API -->
```json
{
  "twitter_name": "contentmarketer",
  "name": "Jane Smith",
  "description": "Content strategist | Speaker | Author",
  "follower_count": 45000,
  "following_count": 2100,
  "retweet_ratio": 0.35,
  "reply_ratio": 0.12,
  "average_retweets": 15
}
```

### Alert object (Account API)

<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 12345,
  "name": "Brand mention alert",
  "type": "keyword",
  "query": "\"Acme Corp\" OR \"AcmeCorp\"",
  "created_at": "2026-01-15T10:00:00Z",
  "active": true
}
```

## Quick-start recipes

### Recipe 1: Find top-performing content for a topic

**Trigger:** Need content ideas for a topic
**Steps:** Query Search API → filter by date and engagement → analyze patterns

```bash
# cURL — search for articles about "content marketing" in last 30 days
curl "https://api.buzzsumo.com/search/articles.json?q=content+marketing&num_results=10&page=0&api_key=YOUR_API_KEY"
```

```python
import requests

API_KEY = "YOUR_API_KEY"
BASE_URL = "https://api.buzzsumo.com"

def get_top_content(topic, num_results=10):
    response = requests.get(
        f"{BASE_URL}/search/articles.json",
        params={
            "q": topic,
            "num_results": num_results,
            "page": 0,
            "api_key": API_KEY
        }
    )
    response.raise_for_status()
    articles = response.json().get("results", [])
    return sorted(articles, key=lambda a: a.get("total_shares", 0), reverse=True)

top = get_top_content("content marketing")
for article in top:
    print(f"{article['total_shares']} shares: {article['title']}")
```

**Gotchas:** Each call counts against your 100/month Search API limit. Cache responses locally.

### Recipe 2: Find influencers who share content about a topic

**Trigger:** Need to find amplifiers for content distribution
**Steps:** Query influencer endpoint → filter by engagement metrics → export for outreach

```bash
# cURL — find influencers who share about "SaaS marketing"
curl "https://api.buzzsumo.com/search/influencers.json?q=saas+marketing&num_results=10&api_key=YOUR_API_KEY"
```

```python
def get_influencers(topic, min_followers=5000):
    response = requests.get(
        f"{BASE_URL}/search/influencers.json",
        params={
            "q": topic,
            "num_results": 50,
            "api_key": API_KEY
        }
    )
    response.raise_for_status()
    influencers = response.json().get("results", [])
    return [i for i in influencers if i.get("follower_count", 0) >= min_followers]

amplifiers = get_influencers("saas marketing", min_followers=10000)
for inf in amplifiers:
    print(f"@{inf['twitter_name']} ({inf['follower_count']} followers)")
```

**Gotchas:** Influencer data is primarily Twitter/X-based. Results may include inactive accounts.

### Recipe 3: Monitor brand mentions via alerts

**Trigger:** Set up automated brand monitoring
**Steps:** Create alert via Account API → poll for mentions → route to Slack via RSS

```bash
# cURL — list existing alerts
curl "https://api.buzzsumo.com/alerts.json?api_key=YOUR_API_KEY"
```

```python
def list_alerts():
    response = requests.get(
        f"{BASE_URL}/alerts.json",
        params={"api_key": API_KEY}
    )
    response.raise_for_status()
    return response.json().get("results", [])

def create_alert(name, query):
    response = requests.post(
        f"{BASE_URL}/alerts.json",
        params={"api_key": API_KEY},
        json={"name": name, "query": query}
    )
    response.raise_for_status()
    return response.json()

# Create a brand mention alert
create_alert("Brand Mentions", '"MyBrand" OR "mybrand.com"')
```

**Gotchas:** Alert count is plan-gated (2 on Content Creation, up to 50 on Enterprise). RSS export from alerts works on all plans — use this as a workaround to pipe into Zapier/IFTTT.

## Integration patterns

### Workflow: BuzzSumo → Spreadsheet/Dashboard

1. Schedule a daily cron job calling Search API with your tracked keywords
2. Parse article objects for title, URL, total_shares, date_published
3. Append to Google Sheets (via Sheets API) or database
4. Build charts on engagement trends over time

**Limitation:** 100 Search API calls/month = ~3 calls/day if evenly distributed. Batch efficiently.

### Workflow: Alerts → Slack (without PR & Comms plan)

1. Create monitoring alerts in BuzzSumo
2. Each alert generates an RSS feed URL
3. Use Zapier: "New Item in RSS Feed" trigger → Slack message action
4. Workaround avoids the PR & Comms+ Slack integration requirement

### Pagination

Pagination uses `page` parameter (0-indexed). Default 10 results per page, max controlled by `num_results`. No cursor pagination.

```
page=0&num_results=10  → results 1-10
page=1&num_results=10  → results 11-20
```

### Error handling

No documented error response schema. Standard HTTP status codes apply. Cache responses aggressively given the 100-call monthly limit. Consider implementing exponential backoff for 429/5xx responses.
