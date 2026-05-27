# ForumScout Platform Reference

## Overview

ForumScout is an AI-powered social listening tool that monitors mentions across 10M+ forums, Reddit, X, LinkedIn, YouTube, Instagram, Bluesky, Hacker News, Facebook, Quora, news sites, and thousands of online forums. Differentiator: natural language AI filtering (write rules in plain English instead of Boolean queries) and affordable pricing starting at $19/mo. Built by Josh Waller (joshwallerr on GitHub).

## Capabilities & automation surface

| Capability | Description | Automation surface |
|---|---|---|
| **Scouts** | Keyword monitoring profiles — set up separate scouts for brand, competitors, industry terms | UI-only (create/manage via dashboard) |
| **AI Filtering** | Natural language rules to filter relevant mentions (e.g., "only show pricing complaints") | UI-only (configure per scout) |
| **Multi-platform monitoring** | Reddit, X, LinkedIn, YouTube, Instagram, Bluesky, HN, Facebook, Quora, forums, news | UI-only (source selection per scout) |
| **Sentiment analysis** | AI-powered positive/neutral/negative classification | UI-only (Pro+ plans) |
| **Emotion analysis** | Deeper emotional classification beyond sentiment | UI-only (Ultra plan only) |
| **Competitive intelligence** | Competitor mention tracking, share of voice comparison | UI-only (Pro+ plans) |
| **Share of Voice** | Brand presence vs competitors over time | UI-only (Pro+ plans) |
| **Audience insights** | Community identification, engagement patterns | UI-only (Pro+ plans) |
| **Emerging topics** | AI-powered trending discussion word clouds | UI-only (Pro+ plans) |
| **Auto-replies** | AI-generated responses posted to identified mentions | UI-only (Pro: 100/mo, Ultra: 1,500/mo) |
| **Email alerts** | Configurable per-scout notifications | UI-only |
| **Webhooks** | Real-time mention notifications to external endpoints | Webhook-accessible (all plans) |
| **Google Sheets sync** | Direct mention sync to spreadsheets | Integration (all plans) |
| **Zapier/Make** | Connect to thousands of services | Integration (all plans, via webhooks) |
| **API Direct** | Separate social search API at apidirect.io | API-accessible (separate product/pricing) |
| **MCP Server** | Claude/Cursor connection via API Direct | API-accessible (via apidirect.io) |

## Pricing, limits & plan gates

| Feature | Starter ($19/mo) | Pro ($49/mo) | Ultra ($129/mo) |
|---|---|---|---|
| Keywords | 10 | 20 | 30 |
| Scan frequency | Every 6 hours | Every 3 hours | Every hour |
| Historical data | 3 months | 6 months | 12 months |
| Unlimited leads | Yes | Yes | Yes |
| AI filtering | Yes | Yes | Yes |
| Webhooks | Yes | Yes | Yes |
| Google Sheets | Yes | Yes | Yes |
| Zapier/Make | Yes | Yes | Yes |
| Email alerts | Yes | Yes | Yes |
| Competitive intelligence | No | Yes | Yes |
| Sentiment analysis | No | Yes | Yes |
| Share of Voice | No | Yes | Yes |
| Audience insights | No | Yes | Yes |
| Mention sorting | No | Yes | Yes |
| Emotion analysis | No | No | Yes |
| Auto-replies | 0 | 100/mo | 1,500/mo |
| **Annual pricing** | $190/yr ($15.83/mo) | $490/yr ($40.83/mo) | $1,290/yr ($107.50/mo) |

- **Free trial**: 7 days with Pro features, no credit card required
- **Annual discount**: ~17% savings on all plans

## Integrations

| Integration | Direction | Available on |
|---|---|---|
| **Webhooks** | ForumScout → external (push) | All plans |
| **Google Sheets** | ForumScout → Sheets (push) | All plans |
| **Zapier** | ForumScout → Zapier (via webhooks) | All plans |
| **Make** | ForumScout → Make (via webhooks) | All plans |
| **Email alerts** | ForumScout → email (push) | All plans |
| **API Direct** | Bidirectional search API (separate product) | Separate pricing |
| **MCP Server** | API Direct → Claude/Cursor (pull) | Separate pricing |

## Data model

ForumScout mentions follow this structure:

```json
{
  "title": "Looking for a better CRM alternative",
  "url": "https://reddit.com/r/SaaS/comments/abc123",
  "date": "2026-05-04 14:23:00",
  "author": "startup_founder",
  "source": "Reddit",
  "domain": "reddit.com",
  "snippet": "We've been using HubSpot but the pricing is getting ridiculous. Any recommendations for a simpler CRM that...",
  "sentiment": {
    "emotions": {
      "frustration": 0.7,
      "curiosity": 0.5,
      "hope": 0.3
    },
    "dominant_emotion": "frustration",
    "emotional_intensity": "high",
    "polarity": "negative"
  }
}
```
<!-- Constructed from docs — verify against live API -->

**Note**: The `sentiment` object is only available on Pro+ plans. Starter plan mentions include the first 6 fields only.

## Quick-start recipes

### Recipe 1: Push mentions to Slack via Zapier webhook

**Use case**: Get instant Slack notifications when ForumScout finds a relevant mention.

**Steps**:
1. In Zapier, create a new Zap with trigger "Webhooks by Zapier → Catch Hook"
2. Copy the webhook URL Zapier gives you
3. In ForumScout, go to your scout → Settings → Webhooks → paste the URL
4. In Zapier, add action "Slack → Send Channel Message"
5. Map: `title` → message title, `url` → link, `snippet` → body, `source` → platform

### Recipe 2: Search social mentions via API Direct (Python)

**Use case**: Programmatically search Reddit for mentions of your product.

```python
import requests

API_KEY = "your_apidirect_api_key"
BASE_URL = "https://apidirect.io/v1"

# Search Reddit posts
response = requests.get(
    f"{BASE_URL}/reddit/posts",
    headers={"X-API-Key": API_KEY},
    params={
        "query": "your product name",
        "time": "week",
        "page": 1
    }
)

data = response.json()
for post in data.get("results", []):
    print(f"[{post['source']}] {post['title']}")
    print(f"  URL: {post['url']}")
    print(f"  Snippet: {post['snippet'][:200]}")
```

```bash
# cURL equivalent
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://apidirect.io/v1/reddit/posts?query=your+product+name&time=week&page=1"
```

**Gotchas**:
- API Direct is a separate product from ForumScout — you need a separate API key from apidirect.io
- Free tier: 50 requests/month per endpoint
- Rate limit: 3 concurrent requests per endpoint per user
- Reddit endpoint costs $0.003/request

### Recipe 3: Connect MCP server to Claude

**Use case**: Query social data from Claude Desktop or Cursor.

Add to your MCP config:

```json
{
  "mcpServers": {
    "apidirect": {
      "url": "https://apidirect.io/mcp?token=YOUR_API_KEY"
    }
  }
}
```

Then in Claude: "Search Reddit for mentions of [your product] in the last week"

**Gotchas**:
- This connects to API Direct's search API, not your ForumScout dashboard
- Same per-request pricing applies
- Results don't include your ForumScout AI filter rules or sentiment data

## Integration patterns

### Webhook listener

ForumScout sends webhook payloads when new mentions match your scout keywords during each scan cycle. Webhook fires per-scout — configure separate webhooks for different scouts if needed.

**Expected payload structure**:
```json
{
  "scout_name": "Brand Monitoring",
  "mentions": [
    {
      "title": "Post title",
      "url": "https://...",
      "date": "2026-05-04 14:23:00",
      "author": "username",
      "source": "Reddit",
      "domain": "reddit.com",
      "snippet": "Content preview..."
    }
  ]
}
```
<!-- Constructed from docs — verify against live API -->

**Frequency**: Webhooks fire after each scan cycle (6hr/3hr/1hr depending on plan). Not real-time — there's a delay between post creation and webhook delivery.

### API Direct search patterns

**Pagination**: Use the `page` parameter (default: 1). Increment to get more results.

**Time filtering**: `time` parameter accepts: `any`, `hour`, `day`, `week`, `month`, `year`.

**Sentiment enrichment**: Add `get_sentiment=true` to any endpoint for AI emotion analysis (+$0.001/request extra).

**Rate limit handling**: 3 concurrent requests per endpoint. Queue requests or add delays between batches:

```python
import time

for keyword in keywords:
    response = requests.get(
        f"{BASE_URL}/reddit/posts",
        headers={"X-API-Key": API_KEY},
        params={"query": keyword, "time": "week"}
    )
    if response.status_code == 429:
        time.sleep(2)
        response = requests.get(...)  # retry
    time.sleep(0.5)  # be polite
```

**Error responses**:
```json
{"error": "Unauthorized", "status": 401}
{"error": "Rate limit exceeded", "status": 429}
{"error": "Payment required", "status": 402}
```
