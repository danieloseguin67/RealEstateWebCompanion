# Syften Platform Reference

## Overview

Syften is an AI-filtered keyword monitoring tool for online communities. Built for founders, marketers, and support teams who need to find brand mentions, competitor mentions, and buying-intent conversations as they happen. Primary differentiator: sub-minute Reddit alert latency with AI noise suppression across 15+ community platforms.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Keyword monitoring | Track mentions across 15+ platforms with Boolean operators | All plans |
| AI filtering | Suppresses spam, duplicates, auto-promos, weak matches | Standard+ (API-accessible) |
| Slack integration | Real-time alerts to Slack channels | Standard+ |
| Email alerts | Daily digest or instant email notifications | All plans |
| RSS feeds | Subscribe to mention streams via RSS reader | All plans |
| Archive search | Search past mentions before alert was created | PRO (unlimited), Standard (limited) |
| Tag routing | `$tag:` operator routes matches to different destinations | All plans |
| REST API | Pull mentions programmatically, read AI verdicts | Standard+ (API-accessible) |
| Webhooks | Push-based delivery of new mentions | PRO only (webhook-accessible) |
| Zapier | "New Mention" trigger for workflow automation | Standard+ |
| Author filters | Filter by specific usernames or exclude authors | All plans |
| Site-specific filters | Narrow monitoring to specific platforms/subreddits | All plans |

## Pricing, limits & plan gates

| | Entry | Standard | PRO | Custom |
|---|---|---|---|---|
| **Price** | €19.95/mo | €39.95/mo | €99.95/mo | Contact |
| **Filters** | 3 | 20 | 100 | Custom |
| **Daily results** | 100 | 200 | 500 | Custom |
| **AI filtering** | No | Yes | Yes | Yes |
| **Slack** | No | Yes | Yes | Yes |
| **API** | No | Yes | Yes | Yes |
| **Webhooks** | No | No | Yes | Yes |
| **Archive** | Limited | Limited | Unlimited | Custom |
| **Zapier** | No | Yes | Yes | Yes |

- Daily result limits are hard caps — no overage billing, but mentions are missed once exhausted
- Filter slots are consumed per keyword/source combination
- No annual contracts mentioned — appears month-to-month

## Supported platforms

Reddit, X/Twitter (~15 min delay), Hacker News, Indie Hackers, Bluesky, Mastodon, GitHub, YouTube, Stack Exchange family, Discourse forums, Dev.to, Lobste.rs, Steemit, Slack communities, newsletters, podcasts.

**NOT supported:** LinkedIn, Facebook, Instagram, TikTok.

## Integrations

| Integration | Direction | Details |
|---|---|---|
| Slack | Push (Syften → Slack) | Channel delivery, tag-based routing to different channels |
| Email | Push (Syften → email) | Daily digest, tag-based routing to different addresses |
| RSS | Pull | Tag-based separate feeds |
| REST API | Pull (client → Syften) | Query mentions, read AI verdicts, manage filters |
| Webhooks | Push (Syften → endpoint) | PRO only, HTTP POST on new mention |
| Zapier | Trigger (Syften → Zapier) | "New Mention" trigger, connects to any Zapier action |

No native CRM connectors. CRM sync requires Zapier or API integration.

## Data model

### Mention object (from API)

<!-- Constructed from docs — verify against live API -->
```json
{
  "id": "mention_abc123",
  "keyword": "my-product",
  "title": "Looking for a tool that does X",
  "text": "Has anyone tried my-product? I'm evaluating options for...",
  "url": "https://reddit.com/r/SaaS/comments/abc123/...",
  "source": "reddit",
  "subreddit": "SaaS",
  "author": "username123",
  "created_at": "2026-05-05T14:30:00Z",
  "tags": ["leads", "reddit"],
  "ai_verdict": "relevant",
  "ai_confidence": 0.92
}
```

### Filter object

<!-- Constructed from docs — verify against live API -->
```json
{
  "id": "filter_xyz",
  "keyword": "\"my-product\" OR \"myproduct\"",
  "exclusions": "NOT \"home automation\" NOT \"industrial\"",
  "sources": ["reddit", "hackernews", "devto"],
  "tags": ["$tag:leads"],
  "ai_filtering": true,
  "active": true
}
```

## Quick-start recipes

### Recipe 1: Poll for new mentions (cURL + Python)

**Use case:** Pull recent mentions into your internal dashboard or CRM every hour.

**cURL:**
```bash
# Authenticate with API key (Standard+ plan required)
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://syften.com/api/v1/mentions?since=2026-05-05T13:00:00Z&limit=50"
```

**Python:**
```python
import requests
from datetime import datetime, timedelta

API_KEY = "YOUR_API_KEY"
BASE_URL = "https://syften.com/api/v1"

# Get mentions from the last hour
since = (datetime.utcnow() - timedelta(hours=1)).isoformat() + "Z"
resp = requests.get(
    f"{BASE_URL}/mentions",
    headers={"Authorization": f"Bearer {API_KEY}"},
    params={"since": since, "limit": 50}
)
mentions = resp.json()

for mention in mentions.get("results", []):
    if mention.get("ai_verdict") == "relevant":
        print(f"[{mention['source']}] {mention['title']}")
        print(f"  URL: {mention['url']}")
        print(f"  AI confidence: {mention['ai_confidence']}")
```

**Gotchas:** API is only on Standard+ plans. Daily result limits still apply to API calls. Poll no more frequently than every 5 minutes.

### Recipe 2: Webhook listener (PRO plan)

**Use case:** Get real-time push notifications when mentions arrive, without polling.

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/syften-webhook", methods=["POST"])
def handle_mention():
    mention = request.json
    # Route based on tags
    if "leads" in mention.get("tags", []):
        # Send to sales channel
        notify_sales_team(mention)
    elif "support" in mention.get("tags", []):
        # Create support ticket
        create_ticket(mention)
    return jsonify({"status": "ok"}), 200
```

**Gotchas:** Webhooks are PRO-only (€99.95/mo). For Standard users, use Zapier "New Mention" trigger as a push alternative.

### Recipe 3: Zapier workflow — mention to Google Sheet

**Use case:** Log all mentions to a spreadsheet for weekly review without code.

1. **Trigger:** Syften → New Mention
2. **Filter (optional):** Only continue if `ai_verdict` = "relevant"
3. **Action:** Google Sheets → Create Spreadsheet Row
   - Column A: `{{created_at}}`
   - Column B: `{{source}}`
   - Column C: `{{title}}`
   - Column D: `{{url}}`
   - Column E: `{{tags}}`

**Gotchas:** Zapier requires Standard+ plan. The "New Mention" trigger fires per mention — high-volume keywords may consume Zapier task quota quickly.

## Integration patterns

### CRM sync (via Zapier or API)

- **Field mapping:** Mention URL → CRM activity/note, Source → custom field, Tags → CRM tags/labels
- **Conflict resolution:** Syften mentions are append-only — no bidirectional sync needed
- **Frequency:** Zapier triggers per-mention (real-time); API polling recommended every 15-60 minutes

### Boolean query patterns

```
# Brand monitoring with exclusions
"acme" OR "acme.io" NOT "acme hardware" NOT "roadrunner"

# Competitor tracking
"competitor-name" AND ("review" OR "alternative" OR "vs" OR "comparison")

# Buying intent
("looking for" OR "recommend" OR "anyone tried" OR "best tool for") AND "your-category"

# Specific subreddit + keyword
$source:reddit $subreddit:SaaS "email automation"
```

### Tag-based routing

Use `$tag:` in filter definitions to route different match types:
- `$tag:leads` — buying intent mentions → sales Slack channel
- `$tag:support` — complaint mentions → support email
- `$tag:competitors` — competitor mentions → strategy Slack channel
- `$tag:brand` — direct brand mentions → general channel
