# KWatch.io Platform Reference

## Overview

KWatch.io is a budget-friendly multi-platform keyword monitoring tool that sends real-time alerts via email, Slack, or API webhook when keywords are detected across Reddit, Hacker News, X/Twitter, LinkedIn, Facebook, and YouTube. Differentiator: one of the few tools under $20/mo that monitors LinkedIn posts.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Keyword monitoring** | Track keywords across 6 platforms, AND-match up to 3 words per alert | UI + API (Business+) |
| **Conversation tracking** | Monitor specific Reddit/HN threads for new comments | UI + API (Business+) |
| **AI sentiment analysis** | Automatic positive/negative/neutral classification per mention | Essential+ (UI + webhook payload) |
| **Email alerts** | Alerts to configured email address (auto-truncates large content) | All plans |
| **Slack integration** | Global or per-alert Slack incoming webhooks | Essential+ |
| **API webhooks** | JSON POST to custom URL on each match | Business+ |
| **REST API** | CRUD for keyword alerts and conversation trackers | Business+ |
| **Bulk keyword import** | Import keywords in bulk | Business+ |
| **Team management** | Multi-user team features | Enterprise |

## Pricing, limits & plan gates

| Feature | Free | Essential $19/mo | Business $79/mo | Enterprise $199/mo |
|---|---|---|---|---|
| Reddit/HN keywords | 2 | 20 | 100 | 500 |
| X/YouTube keywords | 0 | 2 | 10 | 50 |
| Facebook keywords | 0 | 1 | 5 | 25 |
| LinkedIn keywords | 0 | 1 | 5 | 25 |
| AI sentiment | No | Yes | Yes | Yes |
| Slack | No | Yes | Yes | Yes |
| API webhooks | No | No | Yes | Yes |
| REST API | No | No | Yes | Yes |
| Bulk import | No | No | Yes | Yes |
| Team management | No | No | No | Yes |

Agency plan available at custom pricing for multi-client management.

**Plan gate warning:** If you need programmatic access (API or webhooks), you must be on Business ($79/mo) or higher. Essential ($19/mo) gives Slack but no API/webhooks.

## Integrations

- **Slack**: Incoming webhook integration (global or per-alert). Essential+.
- **API webhooks**: JSON POST to your endpoint on each match. Business+. Per-alert URL overrides global URL.
- **REST API**: Full CRUD for alerts and trackers. Business+.
- **No Zapier/Make/n8n native connectors.** Use webhooks to trigger Zapier/Make/n8n workflows.
- **No MCP server.**
- **No native CRM connectors.**

Data flow: KWatch pushes data out (alerts → your endpoint). No inbound data ingestion.

## Data model

### Keyword alert object

```json
{
  "id": 123,
  "keywords": "example keyword",
  "excluded_keywords": "exclude this",
  "search_posts": true,
  "search_comments": false,
  "included_users": "user1,user2",
  "excluded_users": "user3",
  "included_subreddits": "SaaS,startups",
  "excluded_subreddits": "gaming",
  "included_languages": "en,fr",
  "excluded_languages": "es",
  "whole_words_only": false,
  "case_sensitive": false,
  "include_nsfw": false,
  "api_webhook_url": "https://example.com/webhook",
  "slack_webhook_url": "https://hooks.slack.com/...",
  "enabled": true,
  "monthly_count": 42
}
```

### Webhook payload (on match)

```json
{
  "platform": "reddit",
  "query": "example keyword",
  "datetime": "2026-05-07T14:30:00Z",
  "link": "https://www.reddit.com/r/SaaS/comments/abc123/post_title/",
  "author": "reddit_user",
  "content": "Full text of the post or comment mentioning the keyword",
  "sentiment": "neutral"
}
```

Platform values: `reddit`, `hacker_news`, `twitter`, `linkedin`, `youtube`, `facebook`.
Sentiment values: `positive`, `negative`, `neutral`.

### Platform-specific parameters

| Parameter | Platforms | Notes |
|---|---|---|
| `included_subreddits` / `excluded_subreddits` | Reddit only | Max 10 each |
| `included_users` / `excluded_users` | Reddit, HN, X, YouTube | Max 3 each |
| `public_facebook_group_url` | Facebook only | One group URL |
| `include_nsfw` | Reddit only | Boolean |

## Quick-start recipes

### Recipe 1: Create a Reddit keyword alert with webhook

**Use case:** Monitor Reddit for mentions of your product and push them to your pipeline.

**cURL:**
```bash
curl -X POST "https://api.kwatch.io/api/keyword-alerts/reddit" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": "my product name",
    "excluded_keywords": "game,unrelated",
    "search_posts": true,
    "search_comments": true,
    "included_subreddits": "SaaS,startups,Entrepreneur",
    "whole_words_only": true,
    "api_webhook_url": "https://my-server.com/kwatch-webhook",
    "enabled": true
  }'
```

**Python:**
```python
import requests

resp = requests.post(
    "https://api.kwatch.io/api/keyword-alerts/reddit",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "keywords": "my product name",
        "excluded_keywords": "game,unrelated",
        "search_posts": True,
        "search_comments": True,
        "included_subreddits": "SaaS,startups,Entrepreneur",
        "whole_words_only": True,
        "api_webhook_url": "https://my-server.com/kwatch-webhook",
        "enabled": True,
    },
)
alert = resp.json()
print(f"Alert created: id={alert['id']}, monthly_count={alert['monthly_count']}")
```

**Gotcha:** `keywords` uses AND matching — "my product name" matches posts containing ALL three words. For OR matching, create separate alerts.

### Recipe 2: Receive and process webhook alerts

**Use case:** Build a simple webhook listener that logs KWatch alerts and routes based on sentiment.

**Python (Flask):**
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/kwatch-webhook", methods=["POST"])
def kwatch_webhook():
    data = request.json
    platform = data["platform"]
    sentiment = data["sentiment"]
    link = data["link"]
    content = data["content"]

    if sentiment == "negative":
        # Route to support team
        notify_support(platform, link, content)
    elif "recommend" in content.lower() or "looking for" in content.lower():
        # Route to sales as a lead
        create_lead(platform, link, content)
    else:
        # Log for analytics
        log_mention(data)

    return jsonify({"status": "ok"}), 200
```

**Gotcha:** KWatch sends per-alert webhooks. If you set both a global and per-alert webhook URL, the per-alert URL takes priority.

### Recipe 3: Monitor a specific Reddit thread for new comments

**Use case:** Track a product launch thread for feedback.

**cURL:**
```bash
curl -X POST "https://api.kwatch.io/api/conversation-trackers/reddit" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.reddit.com/r/SaaS/comments/abc123/my_product_launch/"
  }'
```
<!-- Constructed from docs — verify against live API -->

**Gotcha:** Conversation tracking only works for Reddit and Hacker News threads. LinkedIn, X, Facebook, and YouTube threads cannot be tracked.

## Integration patterns

### Webhook → Make/n8n pipeline
Since KWatch has no native Zapier/Make connector, use webhooks:
1. Create a webhook trigger in Make or n8n
2. Copy the trigger URL
3. Set it as `api_webhook_url` on your KWatch alert (via API or dashboard)
4. KWatch sends JSON POST on each match → Make/n8n processes it

### Multi-platform monitoring strategy
Distribute keyword quota across platforms based on value:
- **Reddit** (highest volume, most developer/SaaS conversations) — use 60-70% of keyword quota
- **Hacker News** — share quota with Reddit (same pool)
- **X/Twitter** — 2 slots on Essential; use for brand name + competitor
- **LinkedIn** — 1 slot on Essential; use for brand name (posts only)
- **YouTube** — often lower priority; use for brand name if video presence matters
- **Facebook** — requires group URL; only useful if you know the target group
