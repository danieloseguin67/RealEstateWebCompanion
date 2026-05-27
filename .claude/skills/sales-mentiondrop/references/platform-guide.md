# MentionDrop Platform Reference

## Overview

MentionDrop monitors web mentions (via Ahrefs Firehose) and Reddit discussions for brands, delivering AI-powered summaries with sentiment analysis and suggested actions. Positioned as a budget Google Alerts replacement for indie founders, freelancers, and small teams at $29/mo (vs enterprise tools at $99-599+/mo). Built with Next.js, Supabase, and Gemini Flash-Lite.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Keyword monitoring** | Track brand, product, and competitor keywords across web and Reddit | UI-only (create/manage) |
| **AI summaries** | Gemini Flash-Lite summarizes each mention with context | Automatic on all mentions |
| **Sentiment analysis** | Positive/neutral/negative classification per mention | API-accessible (filter param) |
| **Relevance scoring** | AI scores each mention for relevance to your keyword context | API-accessible (in response) |
| **Suggested actions** | Respond, share, monitor, or ignore — AI-generated per mention | UI-only |
| **Real-time dashboard** | Live-streaming mention feed via Supabase real-time | UI-only |
| **Email alerts** | New mention notifications to inbox | UI — configure in settings |
| **Slack alerts** | New mention notifications to Slack channel | UI — configure in settings |
| **Webhook alerts** | HTTP POST to custom endpoint on new mentions | UI — configure in settings |
| **Mentions API** | Read-only endpoint to pull processed mentions | API-accessible |

## Pricing, limits & plan gates

| Feature | Free | Starter ($29/mo) | Pro ($59/mo) |
|---|---|---|---|
| Keywords | 1 | 5 | 20 |
| AI summaries | Yes | Yes | Yes |
| Sentiment analysis | Yes | Yes | Yes |
| Email alerts | Yes | Yes | Yes |
| Slack alerts | Likely | Yes | Yes |
| Webhooks | Likely | Yes | Yes |
| API access | Likely | Yes | Yes |
| Credit card required | No | Yes | Yes |
| Money-back guarantee | — | 14 days | 14 days |

<!-- Plan-gated features for Slack, webhooks, and API on Free tier not confirmed — verify against live account -->

**No annual contracts.** Monthly billing only. No sales calls required.

## Integrations

| Integration | Direction | Details |
|---|---|---|
| **Slack** | MentionDrop → Slack | Push notifications for new mentions |
| **Webhooks** | MentionDrop → Your endpoint | HTTP POST on new mentions |
| **Email** | MentionDrop → Inbox | Digest or real-time email alerts |
| **API** | Your app → MentionDrop | Pull processed mentions (read-only) |

**No native Zapier/Make apps.** Use webhooks to trigger Zapier Webhooks or Make HTTP modules.

**No MCP server.** For AI agent integration, use the REST API directly.

## Data model

### Mention object

<!-- Constructed from OpenAPI spec and docs — verify against live API -->

```json
{
  "id": "uuid",
  "keyword_id": "uuid",
  "url": "https://reddit.com/r/SaaS/comments/...",
  "title": "Looking for a project management tool",
  "summary": "User is asking for recommendations for lightweight PM tools for a 5-person remote team. Mentions frustration with Asana's complexity.",
  "sentiment": "negative",
  "relevance_score": 0.87,
  "content_type": "comment",
  "suggested_action": "respond",
  "source": "reddit",
  "published_at": "2026-05-06T14:30:00Z",
  "created_at": "2026-05-06T14:34:12Z"
}
```

### Content types

Enum values: `article`, `comment`, `job_posting`, `cv`, `course`, `documentation`, `other`

### Keyword object (UI-only — not API-accessible)

Keywords are created and managed in the dashboard. Each keyword has:
- **Term**: The phrase to monitor (e.g., "TaskFlow")
- **Context**: Description to help AI distinguish ambiguous terms (e.g., "TaskFlow is a project management SaaS tool")

## Quick-start recipes

### Recipe 1: Fetch negative mentions for triage

**Trigger:** Daily cron job or manual check
**Use case:** Surface negative sentiment mentions for immediate response

```bash
# cURL — fetch negative mentions from the last 24 hours
curl -s "https://www.mentiondrop.com/api/v1/mentions?sentiment=negative&from=$(date -u -v-1d +%Y-%m-%dT%H:%M:%SZ)&limit=50" \
  -H "X-API-Key: your_api_key_here" | jq '.mentions[] | {url, title, summary, relevance_score}'
```

```python
import requests
from datetime import datetime, timedelta, timezone

API_KEY = "your_api_key_here"
BASE_URL = "https://www.mentiondrop.com/api/v1/mentions"

yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
resp = requests.get(BASE_URL, headers={"X-API-Key": API_KEY}, params={
    "sentiment": "negative",
    "from": yesterday,
    "limit": 50,
})
resp.raise_for_status()

for mention in resp.json().get("mentions", []):
    print(f"[{mention['sentiment']}] {mention['title']}")
    print(f"  URL: {mention['url']}")
    print(f"  Summary: {mention['summary'][:120]}...")
    print()
```

**Gotchas:** API is read-only — you can't mark mentions as "handled" via API. Track triage state in your own system.

### Recipe 2: Webhook to Slack via n8n

**Trigger:** MentionDrop webhook fires on new mention
**Use case:** Get rich mention alerts in a Slack channel with sentiment color-coding

1. Create an n8n webhook node — copy the webhook URL
2. In MentionDrop dashboard → Settings → Webhooks → paste the URL
3. Add an n8n Slack node that formats the payload:

```json
{
  "channel": "#brand-mentions",
  "text": "New mention detected",
  "attachments": [{
    "color": "{{ $json.sentiment === 'positive' ? '#36a64f' : $json.sentiment === 'negative' ? '#ff0000' : '#cccccc' }}",
    "title": "{{ $json.title }}",
    "title_link": "{{ $json.url }}",
    "text": "{{ $json.summary }}",
    "fields": [
      {"title": "Sentiment", "value": "{{ $json.sentiment }}", "short": true},
      {"title": "Relevance", "value": "{{ $json.relevance_score }}", "short": true}
    ]
  }]
}
```

**Gotchas:** Webhook payload schema not fully documented — test with webhook.site first to capture the actual structure. The JSON above is based on the data model; field names may differ in the webhook payload.

### Recipe 3: Build a weekly mention report

**Trigger:** Weekly cron (Monday 9 AM)
**Use case:** Generate a summary of the past week's mentions for stakeholders

```python
import requests
from datetime import datetime, timedelta, timezone
from collections import Counter

API_KEY = "your_api_key_here"
BASE_URL = "https://www.mentiondrop.com/api/v1/mentions"

week_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
all_mentions = []
page = 1

while True:
    resp = requests.get(BASE_URL, headers={"X-API-Key": API_KEY}, params={
        "from": week_ago, "limit": 100, "page": page,
    })
    resp.raise_for_status()
    data = resp.json()
    mentions = data.get("mentions", [])
    if not mentions:
        break
    all_mentions.extend(mentions)
    page += 1

sentiments = Counter(m["sentiment"] for m in all_mentions)
print(f"Weekly Mention Report ({len(all_mentions)} total)")
print(f"  Positive: {sentiments['positive']}")
print(f"  Neutral: {sentiments['neutral']}")
print(f"  Negative: {sentiments['negative']}")
print(f"\nTop negative mentions:")
for m in sorted(
    [m for m in all_mentions if m["sentiment"] == "negative"],
    key=lambda x: x.get("relevance_score", 0), reverse=True
)[:5]:
    print(f"  - {m['title']} ({m['url']})")
```

**Gotchas:** Pagination returns max 100 per page. If you monitor high-volume keywords, you may need many pages. Check the response for total count or next-page indicators.

## Integration patterns

### CRM sync (via webhook + middleware)

MentionDrop has no native CRM connectors. Use webhooks to push to middleware:

1. **MentionDrop → webhook → n8n/Make → CRM**
2. Map mention fields to CRM contact/activity fields
3. Use sentiment as a triage signal — auto-create tasks for negative mentions
4. Use relevance score as a filter — only push mentions above a threshold

### Dashboard pipeline (via API polling)

1. Poll `GET /api/v1/mentions` on a schedule (hourly or daily)
2. Store in your own database (Supabase, PostgreSQL, Google Sheets)
3. Build dashboards in your BI tool of choice
4. Track trends: mention volume, sentiment ratio, top sources

### Webhook listener pattern

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/mentiondrop-webhook", methods=["POST"])
def handle_mention():
    payload = request.json
    # Process the mention — log, notify, create CRM record, etc.
    print(f"New mention: {payload.get('title', 'Unknown')}")
    print(f"Sentiment: {payload.get('sentiment', 'Unknown')}")
    return jsonify({"status": "ok"}), 200
```

**Note:** Webhook payload schema is not fully documented. Log raw payloads initially to understand the structure before building production integrations.
