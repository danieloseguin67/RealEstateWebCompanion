# F5Bot Platform Reference

## Overview

F5Bot is a keyword monitoring service that tracks mentions across Reddit, Hacker News, and Lobsters with email alerts within minutes. Operating since 2017, it delivers 300,000+ daily alerts. Primary differentiator: free tier with 200 keywords — the most generous free Reddit monitoring available. API and webhooks on Ultra tier only.

## Capabilities & automation surface

| Capability | Access level |
|---|---|
| Keyword monitoring (posts + comments) | All plans (Reddit, HN, Lobsters) |
| Email alerts (instant, batched, or daily digest) | All plans |
| Exact keyword matching (case-insensitive) | All plans |
| Advanced filtering (exclude, include-any, include-all, only-url, no-url) | All plans (basic), Power+ (full flag set) |
| Location-specific matching (in-title, in-body, in-url, in-username, in-permalink) | Power+ |
| full-text flag (complete post content in alerts) | Power+ |
| Alert grouping (group= flag for bundled emails) | Power+ |
| Scheduled delivery (up to 3 daily digest times) | Power+ |
| no-comments / no-posts filtering | Power+ |
| no-url subreddit exclusion | Power+ |
| CSV bulk keyword upload | Power+ |
| RSS feeds | Power+ |
| JSON feeds | Power+ |
| AI semantic alerts (natural language descriptions) | Ultra only |
| REST API (CRUD alerts) | Ultra only |
| Webhooks (HTTP POST on match) | Ultra only |
| Slack integration | Ultra only |
| Discord integration | Ultra only |
| Sentiment analysis | Not available |
| AI reply generation | Not available |
| Lead scoring | Not available |
| CRM integration | Not available (build via webhooks on Ultra) |
| Historical backfill | Not available |

## Pricing, limits & plan gates

| Plan | Monthly cost | Keywords | Hits/day | Flag length | Key features |
|------|-------------|----------|----------|-------------|-------------|
| Free | $0 | 200 | 50 | Basic | Email alerts, basic filtering |
| Power | $14.17/mo (annual) | 350 | 1,000 | 1,024 chars | RSS/JSON, scheduled delivery, CSV upload, full flag set |
| Ultra | $58.33/mo (annual) | 1,000 | 1,000 | 1,024 chars | AI semantic alerts, API, webhooks, Slack/Discord |
| Enterprise | Custom | Custom | Custom | Custom | Contact for pricing |

- **No free trial mentioned** for paid plans
- **No annual discount** — annual billing is the default pricing shown
- **Common word restriction**: Free tier may reject very common single words. Upgrade to Power to remove this restriction.
- **Disabled keywords**: Keywords that hit 50 matches in 24 hours (free) or 1,000 (paid) are temporarily disabled until the next day.
- **Subscription cancellation**: Alerts remain but paid features stop working until resubscription.

## Filtering flags reference

### Available on all plans

| Flag | Effect | Example |
|---|---|---|
| `whole` | Match complete words only ("thing" won't match "something") | `whole` |
| `only-reddit` | Only match Reddit (not HN/Lobsters) | `only-reddit` |
| `only-hn` | Only match Hacker News | `only-hn` |
| `only-lobsters` | Only match Lobsters | `only-lobsters` |

### Available on Power+ plans

| Flag | Effect | Example |
|---|---|---|
| `exclude=word` | Skip matches containing this word | `exclude=minecraft` |
| `include-any=word` | Match only if this word is also present (OR logic) | `include-any=recommendation` |
| `include-all=word` | Match only if this word is also present (AND logic) | `include-all=startup` |
| `only-url=/r/subreddit` | Only match in this subreddit (repeatable) | `only-url=/r/SaaS only-url=/r/startups` |
| `no-url=/r/subreddit/` | Exclude this subreddit (note trailing slash) | `no-url=/r/politics/` |
| `exclude-username=user` | Exclude posts from this user | `exclude-username=AutoModerator` |
| `in-title` | Only match in post titles | `in-title` |
| `in-body` | Only match in post/comment body | `in-body` |
| `in-url` | Only match in URLs | `in-url` |
| `in-username` | Only match in usernames | `in-username` |
| `in-permalink` | Only match in permalink URLs | `in-permalink` |
| `full-text` | Include complete post content in alerts | `full-text` |
| `instant` | Bypass scheduled delivery delay | `instant` |
| `no-comments` | Only match posts (skip comments) | `no-comments` |
| `no-posts` | Only match comments (skip posts) | `no-posts` |
| `group=name` | Bundle alerts with same group into one email | `group="competitor mentions"` |

**Important**: `only-` flags use OR logic. If you use `only-reddit only-url=/r/saas`, you get ALL of Reddit plus the subreddit filter. Remove `only-reddit` to restrict to just the subreddit.

## Integrations

### Email
- **Delivery modes**: Instant (default), scheduled batches (Power+), daily digest (Power+)
- **Configuration**: Up to 3 scheduled delivery times per day (Power+)
- **Timezone**: User-configurable
- **Zero-match behavior**: No email sent if nothing matched
- **Direction**: F5Bot → Email (one-way push)

### RSS/JSON feeds (Power+)
- **Access**: Personalized feed URLs from account page
- **Filtering**: Group parameter to filter by alert group
- **Pagination**: Supported
- **Direction**: Pull-based

### Webhooks (Ultra only)
- **Setup**: Configure URL in API Dashboard
- **Delivery**: HTTP POST for each triggered alert
- **Retry policy**: Immediate → 5 min → 1 hour → 15 hours (stops after 3 failures)
- **Delivery logs**: Available in API Dashboard
- **Direction**: F5Bot → Your endpoint (one-way push)

### Slack/Discord (Ultra only)
- **Setup**: Configure webhook URLs from account page
- **Delivery**: Real-time alerts to configured channels
- **Direction**: F5Bot → Slack/Discord (one-way push)

### No other integrations
No CRM connectors, no Zapier, no Make, no MCP server. Build custom integrations via webhooks (Ultra) or RSS/JSON feeds (Power+).

## Data model

### Webhook payload

When a keyword matches, F5Bot sends an HTTP POST with this JSON:

```json
{
  "id": "abc123",
  "url": "https://www.reddit.com/r/SaaS/comments/xyz/my_post_title/",
  "title": "My post title",
  "content_html": "<p>The full post or comment HTML content...</p>",
  "date_published": "2026-05-06T14:30:00Z",
  "group": "competitor-mentions",
  "username": "reddit_user",
  "tags": ["keyword1", "keyword2"]
}
```

<!-- Source: https://f5bot.com/docs-api — field names from webhook documentation -->

### Alert object (API)

```json
{
  "id": 12345,
  "keyword": "best project management tool",
  "flags": "whole only-url=/r/SaaS exclude=minecraft",
  "enabled": true
}
```

<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: Create a keyword alert via API (Ultra)

**Use case**: Programmatically manage monitoring keywords from a script or CI pipeline.

**cURL**:
```bash
curl -X POST https://f5bot.com/api/create-alert \
  -H "Authorization: Bearer $F5BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "best CRM for startups", "flags": "whole only-url=/r/SaaS only-url=/r/startups exclude=enterprise"}'
```

**Python**:
```python
import requests

token = "your-api-token"
resp = requests.post(
    "https://f5bot.com/api/create-alert",
    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    json={
        "keyword": "best CRM for startups",
        "flags": "whole only-url=/r/SaaS only-url=/r/startups exclude=enterprise"
    }
)
print(resp.json())
```

**Gotchas**: Keywords must be 3-50 characters. Flags string max 1,024 characters on paid plans.

### Recipe 2: Listen for webhook alerts and log to a database

**Use case**: Capture all F5Bot alerts in your own system for analysis.

**Python (Flask)**:
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/f5bot-webhook", methods=["POST"])
def handle_alert():
    data = request.json
    # data contains: id, url, title, content_html, date_published, group, username, tags
    print(f"Alert: {data['title']} — {data['url']}")
    # Save to database here
    return jsonify({"status": "ok"}), 200
```

**Gotchas**: Return 200 within 10 seconds or F5Bot marks as failed. After 3 consecutive failures, webhook delivery stops — check the delivery log in your API Dashboard.

### Recipe 3: Export all alerts as CSV via API

**Use case**: Backup your keyword configuration or migrate to another tool.

**cURL**:
```bash
curl "https://f5bot.com/api/get-alerts?format=csv" \
  -H "Authorization: Bearer $F5BOT_TOKEN" \
  -o alerts.csv
```

**Python**:
```python
import requests

token = "your-api-token"
resp = requests.get(
    "https://f5bot.com/api/get-alerts",
    headers={"Authorization": f"Bearer {token}"},
    params={"format": "json"}
)
alerts = resp.json()
for alert in alerts:
    print(f"[{alert['id']}] {alert['keyword']} — enabled={alert['enabled']}")
```

## Integration patterns

### Webhook → CRM pipeline
1. Configure webhook URL in F5Bot API Dashboard (Ultra required)
2. Receive POST with alert JSON payload
3. Parse `content_html` for buying intent signals
4. Create CRM contact/lead via CRM API
5. Attach original Reddit URL as lead source

### RSS → Dashboard pipeline
1. Get personalized RSS feed URL from account page (Power+ required)
2. Poll RSS feed on a schedule (every 15 minutes)
3. Parse new entries and store in database
4. Display in custom dashboard with filtering/tagging

### Bulk keyword management
1. Prepare CSV with keywords and flags
2. Upload via Power+ mass upload feature (UI)
3. Or use API (Ultra) to create/update/delete programmatically
4. Export current keywords via API as CSV for backup
