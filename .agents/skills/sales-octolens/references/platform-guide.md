# Octolens Platform Reference

## Overview

Developer-first social listening platform that monitors brand mentions across 13+ platforms (Reddit, GitHub, Hacker News, X, LinkedIn, Bluesky, Stack Overflow, DEV.to, podcasts, newsletters, YouTube, TikTok, news). Primary differentiator: MCP server for AI tools + focus on developer/SaaS-relevant platforms that general listening tools ignore (GitHub, HN, Stack Overflow, DEV.to).

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| Keyword monitoring | Tracks mentions across all platforms with configurable refresh | UI + API (GET /keywords) |
| AI relevance scoring | Auto-tags mentions: Own Brand, Competitors, Buy Intent, Product Question | API-accessible (in mention response) |
| Sentiment analysis | Classifies positive/negative/neutral | API-accessible (in mention response) |
| Filtered views | Saved filter combinations for segmented monitoring | API-accessible (GET /views) |
| Alerts | Email, Slack, webhook push on new mentions | Webhook-accessible |
| Weekly AI summaries | AI-generated intelligence digest | UI-only (Scale+ plans) |
| Conversation Rank | Reddit-specific thread ranking | UI-only |
| Analytics & trends | Volume, sentiment, source breakdown over time | UI-only (export via CSV or API) |
| MCP server | Natural language queries from AI tools | MCP (SSE transport) |

## Pricing, limits & plan gates

| Feature | Pro ($119/mo) | Scale ($319/mo) | Enterprise (custom) |
|---|---|---|---|
| Mentions/mo | 15,000 | 50,000 | Unlimited |
| Keywords | 10 | 15 | Unlimited |
| Refresh rate | Hourly | Real-time | Real-time |
| Data history | 2 years | Unlimited | Unlimited |
| Sources | Social + communities | + podcasts, media, newsletters | + custom |
| AI summaries | No | Weekly | Custom |
| API/webhooks/MCP | Yes | Yes | Yes |
| Workspaces | 1 | 1 | Multiple |

**Add-ons:** Extra mentions from $0.007/mention. Additional keywords $5-10/mo each.

**Free trial:** 7 days, Pro features, 1K mention cap. No credit card required.

**Annual discount:** 20% off (Pro ~$95/mo, Scale ~$255/mo).

**Overage behavior:** Mentions stop being tracked when quota hits limit — no automatic overage charges. You can purchase add-on mention packs.

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| Slack | Octolens → Slack | Alert delivery, channel routing |
| Email | Octolens → Email | Digest and alert delivery |
| Webhooks | Octolens → Your endpoint | Real-time mention push (HTTPS required) |
| MCP (Claude, Cursor, Windsurf) | Bidirectional | Query mentions via natural language |
| Zapier | Octolens → Any | Trigger on new mentions |
| Make | Octolens → Any | Trigger on new mentions |
| n8n | Octolens → Any | Trigger on new mentions |
| Clay | Octolens → Clay | Webhook integration for lead enrichment |
| CSV export | Octolens → File | Manual bulk export |

No native CRM connectors — use webhooks or Zapier/Make to push to HubSpot, Salesforce, Attio, etc.

## Data model

### Mention object

```json
{
  "id": "mention_abc123",
  "keyword_id": "kw_xyz",
  "source": "reddit",
  "author": {
    "name": "username",
    "url": "https://reddit.com/u/username",
    "followers": 1250
  },
  "content": "Has anyone tried Octolens for tracking GitHub mentions? Way better than...",
  "url": "https://reddit.com/r/SaaS/comments/abc123",
  "published_at": "2026-05-04T14:32:00Z",
  "sentiment": "positive",
  "relevance_tags": ["own_brand_mention", "product_question"],
  "engagement": {
    "likes": 12,
    "comments": 5,
    "shares": 2
  }
}
```
<!-- Constructed from docs — verify against live API -->

### Keyword object

```json
{
  "id": "kw_xyz",
  "name": "octolens",
  "platforms": ["reddit", "twitter", "github", "hackernews", "linkedin"],
  "color": "#4A90D9",
  "paused": false,
  "context": "social listening tool for developers"
}
```
<!-- Constructed from docs — verify against live API -->

### View object

```json
{
  "id": "view_123",
  "name": "High Intent Mentions",
  "filters": {
    "sources": ["reddit", "twitter"],
    "sentiment": ["positive"],
    "tags": ["buy_intent"],
    "min_followers": 100
  }
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: List all mentions via API (Python)

**Use case:** Pull recent mentions into a custom dashboard or spreadsheet.

```bash
curl -X POST https://app.octolens.com/api/v1/mentions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"limit": 50}'
```

```python
import requests

API_KEY = "your_api_key"
BASE_URL = "https://app.octolens.com/api/v1"

def get_mentions(limit=50, cursor=None, view_id=None):
    payload = {"limit": limit}
    if cursor:
        payload["cursor"] = cursor
    if view_id:
        payload["view"] = view_id

    resp = requests.post(
        f"{BASE_URL}/mentions",
        headers={"Authorization": f"Bearer {API_KEY}"},
        json=payload
    )
    resp.raise_for_status()
    return resp.json()

# Get first page
data = get_mentions(limit=100)
mentions = data["mentions"]
next_cursor = data.get("cursor")

# Paginate
while next_cursor:
    data = get_mentions(limit=100, cursor=next_cursor)
    mentions.extend(data["mentions"])
    next_cursor = data.get("cursor")
```

**Gotchas:** POST not GET for mentions endpoint. Max 100 per page. Cursor is opaque — don't construct it manually.

### Recipe 2: Set up MCP for Claude Code

**Use case:** Query Octolens mentions directly from your terminal via Claude Code.

```bash
# Generate an MCP key at Settings > MCP > "Generate New Key"
# Then add the server:
claude mcp add octolens \
  --transport sse \
  "https://app.octolens.com/api/mcp?token=YOUR_MCP_KEY"

# Restart Claude Code, then test:
# @octolens list my keywords
# @octolens show mentions from Reddit in the last 24 hours
# @octolens find buy-intent mentions this week
```

**For team sharing via `.mcp.json`:**

```json
{
  "mcpServers": {
    "octolens": {
      "type": "sse",
      "url": "https://app.octolens.com/api/mcp?token=TEAM_MCP_KEY"
    }
  }
}
```

**Gotchas:** Use MCP key (Settings > MCP), not API key (Settings > API). Team keys are shareable; personal keys are not. Commit `.mcp.json` to git for team access. Restart tool completely after config change.

### Recipe 3: Webhook to Slack (high-intent mentions only)

**Use case:** Push only buy-intent or product-question mentions to a Slack channel.

```python
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
SLACK_WEBHOOK = "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

@app.route("/octolens-webhook", methods=["POST"])
def handle_mention():
    mention = request.json

    # Filter: only forward high-intent mentions
    tags = mention.get("relevance_tags", [])
    if "buy_intent" not in tags and "product_question" not in tags:
        return jsonify({"status": "skipped"}), 200

    # Format Slack message
    slack_msg = {
        "text": f"*{mention['source'].title()}* mention ({', '.join(tags)}):\n"
                f">{mention['content'][:200]}\n"
                f"<{mention['url']}|View on {mention['source'].title()}>"
    }

    requests.post(SLACK_WEBHOOK, json=slack_msg)
    return jsonify({"status": "forwarded"}), 200

if __name__ == "__main__":
    app.run(port=5000)
```

**Gotchas:** Endpoint must be HTTPS and publicly reachable. Pro plan sends webhooks hourly (batch), Scale sends near-real-time. Test with ngrok during development.

## Integration patterns

### Webhook listener pattern

1. Deploy HTTPS endpoint (Cloudflare Worker, Railway, or similar)
2. Configure webhook URL in Octolens settings
3. Mentions arrive as POST with JSON body containing the mention object
4. Return 200 quickly — process asynchronously if doing heavy work
5. No signature verification documented — validate by checking source IP or including a secret in the URL path

### CRM sync via Zapier/Make

1. Trigger: "New Mention" in Octolens
2. Filter: relevance_tags contains "buy_intent"
3. Action: Create contact/note in HubSpot/Attio/Pipedrive
4. Map: author.name → contact name, content → note body, url → source link

### Batch export pattern

```python
# Export all mentions for a date range
import time

all_mentions = []
cursor = None

while True:
    payload = {
        "limit": 100,
        "since": "2026-05-01T00:00:00Z",
        "until": "2026-05-05T00:00:00Z"
    }
    if cursor:
        payload["cursor"] = cursor

    resp = requests.post(f"{BASE_URL}/mentions",
                         headers={"Authorization": f"Bearer {API_KEY}"},
                         json=payload)

    if resp.status_code == 429:
        # Rate limited — wait and retry
        reset = int(resp.headers.get("X-RateLimit-Reset", 60))
        time.sleep(reset)
        continue

    data = resp.json()
    all_mentions.extend(data["mentions"])
    cursor = data.get("cursor")

    if not cursor:
        break

print(f"Exported {len(all_mentions)} mentions")
```

### Rate limit handling

- 500 requests/hour across all endpoints
- Check `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers
- On 429: back off until reset time
- For batch operations: add 200ms delay between requests to stay well under limit
