# YouScan Platform Reference

## Overview

YouScan is an AI-powered social listening platform differentiated by visual analytics — it detects logos, products, objects, scenes, and demographics in user-generated images across social media. Best for mid-market to enterprise brands that need image recognition on top of standard text-based social listening. Starts at $499/mo (Starter 3).

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Social listening** | Text-based mention monitoring across news, social, blogs, forums, reviews | UI + API (Unlimited) + Webhook |
| **Visual Insights** | AI image recognition — logo detection, scene/object recognition, demographics in photos. Up to 80% more mentions via visual detection. | UI-only on Unlimited plan |
| **Insights Copilot** | Conversational AI agent (ChatGPT-powered) — query social listening data in natural language, get instant consumer insights | UI-only (10 questions/mo on Starter, unlimited on Unlimited) |
| **Sentiment analysis** | AI-powered with aspect-level granularity and trend detection | UI + API (Unlimited) + Webhook |
| **Audience Insights** | Demographics, interests, occupations from social profiles | UI-only on Unlimited plan |
| **Custom Dashboards** | Configurable visualizations, Mention Wall for displays | UI-only (1 on Starter, unlimited on Unlimited) |
| **Alerts & Rules** | Real-time notifications, volume spike detection, sentiment filters | UI + Webhook |
| **Competitive benchmarking** | Share of Voice, trend comparison across topics | UI + API (Unlimited) |
| **Word clouds** | Visual keyword frequency analysis | UI + API (Unlimited) |

## Pricing, limits & plan gates

| Feature | Starter 3 ($499/mo annual) | Unlimited (custom) |
|---|---|---|
| Topics | 3 | Unlimited |
| Monthly mentions | 15,000 (hard cap) | Unlimited (sampled) |
| Visual Insights | No | Yes |
| Audience Insights | No | Yes |
| Insights Copilot | 10 questions/mo | Unlimited |
| Integrations | 1 Slack/Teams/WhatsApp | Unlimited |
| Custom Dashboards | 1 | Unlimited |
| API access | No | Yes (paid add-on) |
| Webhook | Yes | Yes |
| Data export | No | Yes |
| User access rights | All users see all | Configurable |
| Users | Unlimited | Unlimited |

**Overage behavior:** Starter plan stops collecting mentions at the 15K cap — no overage charges, but no new data until the next billing cycle.

**Free trial:** None. Demo only (request via website).

## Integrations

| Integration | Type | Direction | Notes |
|---|---|---|---|
| Slack | Native | YouScan → Slack | Mention alerts and notifications |
| Microsoft Teams | Native | YouScan → Teams | Mention alerts and notifications |
| WhatsApp | Native | YouScan → WhatsApp | Mention alerts and notifications |
| Webhooks | Native | YouScan → any HTTP endpoint | Sends mention data via POST |
| REST API | Native | Read from YouScan | Unlimited plan only, paid add-on |
| CRM systems | Via API/webhook | YouScan → CRM | Build custom integration |
| BI tools (Tableau, Power BI, Google Data Studio) | Via API | YouScan → BI | Unlimited plan only |
| **Zapier** | Not available | — | — |
| **Make** | Not available | — | — |
| **MCP** | Not available | — | — |

## Data model

### Topic (Theme)

```json
{
  "id": 41541,
  "name": "Coca-cola"
}
```

### Mention (webhook payload)

```json
{
  "topicId": 41541,
  "topicName": "Coca-cola",
  "mentionId": "abc123",
  "sourceName": "twitter",
  "title": "Great new flavor!",
  "text": "Just tried the new Coca-cola flavor and it's amazing",
  "url": "https://twitter.com/user/status/123456",
  "published": "2026-05-04T10:30:00Z",
  "addedAt": "2026-05-04T10:31:00Z",
  "sentiment": "positive",
  "language": "en",
  "postType": "post",
  "resourceType": "social",
  "spam": false,
  "likes": 42,
  "reposts": 5,
  "comments": 3,
  "engagement": 50,
  "tags": ["product-launch"],
  "imageUrl": "https://pbs.twimg.com/media/example.jpg",
  "country": "US",
  "region": "California",
  "city": "San Francisco",
  "author": {
    "url": "https://twitter.com/user",
    "name": "Jane Doe",
    "nickname": "janedoe",
    "avatarUrl": "https://pbs.twimg.com/profile/example.jpg",
    "subscribers": 1500
  },
  "channel": {
    "url": "https://twitter.com/user",
    "name": "Jane Doe",
    "avatarUrl": "https://pbs.twimg.com/profile/example.jpg",
    "subscribers": 1500
  },
  "postId": "123456",
  "parentPostId": null,
  "discussionId": null
}
```
<!-- Constructed from webhook docs — verify against live API -->

### Sentiment statistics

```json
{
  "sentiments": [
    { "name": "positive", "count": 48 },
    { "name": "neutral", "count": 119 },
    { "name": "negative", "count": 25 }
  ]
}
```
<!-- Source: https://gist.github.com/0266db79615b2adcfb12d9a352444033 -->

### Data restrictions by source

| Source | API data available | Restricted fields |
|---|---|---|
| Most platforms | Full mention data | — |
| Reddit | URL + YouScan metrics only | No text, title, author info, engagement |
| Twitter/X | Partial | No text, full text, URLs, author name/URL/avatar (Profile ID + Post ID retained) |
| Quora | Not available via API | All fields |
| Small/niche sources | Varies | Some restrictions |

## Quick-start recipes

### Recipe 1: List all monitoring topics

**Use case:** Discover which topics are configured in your account.

```bash
# cURL
curl "https://api.youscan.io/api/external/themes?apikey=YOUR_API_KEY"
```

```python
# Python
import requests

API_KEY = "YOUR_API_KEY"
BASE = "https://api.youscan.io/api/external"

resp = requests.get(f"{BASE}/themes", params={"apikey": API_KEY})
topics = resp.json()["themes"]
for t in topics:
    print(f"Topic {t['id']}: {t['name']}")
```

### Recipe 2: Pull sentiment breakdown for a topic

**Use case:** Get sentiment distribution for a date range to build a dashboard.

```bash
# cURL
curl "https://api.youscan.io/api/external/themes/41541/statistics/sentiments?apikey=YOUR_API_KEY&from=2026-04-01&to=2026-04-30"
```

```python
# Python
import requests

API_KEY = "YOUR_API_KEY"
BASE = "https://api.youscan.io/api/external"
TOPIC_ID = 41541

resp = requests.get(
    f"{BASE}/themes/{TOPIC_ID}/statistics/sentiments",
    params={"apikey": API_KEY, "from": "2026-04-01", "to": "2026-04-30"}
)
for s in resp.json()["sentiments"]:
    print(f"{s['name']}: {s['count']}")
```

### Recipe 3: Set up a webhook to forward negative mentions to Slack

**Use case:** Real-time negative sentiment alerting without API access (works on Starter plan).

**Step 1:** Create a Slack Incoming Webhook URL in your Slack workspace settings.

**Step 2:** In YouScan, open your topic → Settings → Integrations → Add Webhook → paste the Slack webhook URL.

**Step 3:** Create a Rule: Conditions = Sentiment is "Negative" → Action = Send to Webhook.

**Step 4:** (Optional) Add a middleware (e.g., a Cloudflare Worker) to transform the YouScan payload into Slack's block format:

```python
# Minimal Flask middleware to transform YouScan webhook → Slack
from flask import Flask, request
import requests

app = Flask(__name__)
SLACK_WEBHOOK = "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

@app.route("/youscan-to-slack", methods=["POST"])
def forward():
    data = request.json
    slack_msg = {
        "text": f"*Negative mention* in {data.get('topicName', 'unknown topic')}\n"
                f">{data.get('text', 'No text available')[:200]}\n"
                f"Source: {data.get('url', 'N/A')} | Sentiment: {data.get('sentiment', 'N/A')}"
    }
    requests.post(SLACK_WEBHOOK, json=slack_msg)
    return "OK", 200
```

**Gotcha:** Reddit mentions won't include text in the webhook payload — you'll only get the URL. Twitter/X mentions won't include text or author name.

## Integration patterns

### Webhook listener

- **Setup:** Per-topic configuration in Settings → Integrations
- **Auth:** Basic Auth via URL: `https://user:password@example.com/callback`
- **Trigger:** Automatic via Rules (filter by sentiment, source, tag) or manual from mention stream
- **Retry:** Not documented — implement idempotency on your receiver
- **Multiple webhooks:** Supported per topic, can target same or different endpoints

### API batch pipeline (Unlimited plan only)

- **Pagination:** Use `skip` and `size` parameters on the mentions endpoint
- **Rate limits:** Not publicly documented — implement exponential backoff on 429 responses
- **Date filtering:** Required `from` and `to` params (yyyy-MM-dd) on all statistics endpoints
- **API key scope:** Returns only topics accessible to the user who generated the key
