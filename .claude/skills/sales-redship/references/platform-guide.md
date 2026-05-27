# RedShip Platform Reference

## Overview

RedShip is an AI-powered Reddit monitoring tool that finds relevant conversations where users seek product recommendations, scores them 0-100 for relevance, and provides AI reply drafts. Philosophy: "We automate the search, not your voice" — discovery is automated but engagement stays human. Target: SaaS founders, B2B marketers, startup teams.

## Capabilities & automation surface

| Capability | Access level |
|---|---|
| Real-time post monitoring | All plans (UI + API + alerts) |
| Comment monitoring (brand mentions) | All plans (UI + API + alerts) |
| SEO post discovery (posts ranking on Google) | All plans (weekly scan, UI + API) |
| AI relevance scoring (0-100) | All plans (automatic) |
| AI reply suggestions | All plans (unlimited, UI-only generation) |
| Auto DMs | All plans (30-300/day by plan, UI-only) |
| Email alerts | All plans |
| Slack alerts | All plans |
| Webhook alerts | All plans |
| REST API (inbox read/update) | All plans (Bearer auth) |
| Subreddit exclusions | All plans (UI-only config) |
| Username exclusions (bots, spam) | All plans (UI-only config) |
| Team seats | Plan-gated (1/3/10) |
| Data export | API only (list endpoint) |
| Zapier/Make | Not available |
| MCP server | Not available |
| Historical backfill | Not available |
| Sentiment analysis | Not available (relevance scoring only) |
| Competitive analytics / Share of Voice | Not available |

## Pricing, limits & plan gates

| Feature | Starter ($19/mo) | Growth ($39/mo) | Professional ($89/mo) |
|---|---|---|---|
| Websites monitored | 1 | 3 | 10 |
| Keywords | 10 | 30 | 80 |
| Auto DMs per day | 30 | 100 | 300 |
| Team seats | 1 | 3 | 10 |
| AI reply suggestions | Unlimited | Unlimited | Unlimited |
| SEO scans | Weekly | Weekly | Weekly |
| Real-time monitoring | Yes | Yes | Yes |
| API access | Yes | Yes | Yes |
| Webhooks | Yes | Yes | Yes |
| Slack alerts | Yes | Yes | Yes |

- No free plan; no free trial mentioned
- All plans include full API access and webhook support
- Keyword limits are hard caps — no overage
- Auto DM limits reset daily

## Integrations

### Slack
- Push alerts to any Slack channel
- Configuration in dashboard settings
- Data flow: RedShip → Slack (one-way)

### Webhooks
- HTTPS push notifications for new inbox items
- Configuration in dashboard settings
- Payload schema: undocumented publicly (test with request catcher)
- Data flow: RedShip → your endpoint (one-way push)

### REST API
- Pull inbox data programmatically
- Bearer auth with `rsp_` prefixed API keys
- 3 endpoints for inbox management
- Data flow: your code → RedShip (read/update)

### No native CRM connectors
No direct integrations with HubSpot, Salesforce, Pipedrive, etc. Build custom via API + webhook.

## Data model

### Inbox Item (primary object)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "post_id": "1abc2de",
  "post_title": "Looking for a tool to automate Reddit outreach",
  "post_url": "https://reddit.com/r/SaaS/comments/1abc2de/...",
  "post_author": "reddit_user",
  "post_subreddit": "SaaS",
  "post_content": "We've been manually replying to posts...",
  "post_created_utc": 1700000000,
  "post_score": 42,
  "post_num_comments": 15,
  "relevance_score": 85,
  "type": "seo",
  "is_read": false,
  "is_saved": false,
  "is_declined": false,
  "matched_keyword": "automation tool",
  "comment_id": null,
  "comment_content": null,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Key fields:**
- `relevance_score` (0-100): AI-computed match quality to your product
- `type`: `seo` (found via Google ranking), `realtime` (new post), or `comment` (mention in comments)
- `is_declined`: marks item as dismissed/hidden
- `matched_keyword`: which of your configured keywords triggered this match
- `comment_id` / `comment_content`: populated only for `type: "comment"` items

### Search types

| Type | Trigger | Latency | Use case |
|---|---|---|---|
| SEO | Weekly scan of Google for Reddit posts ranking on your keywords | Weekly | Long-tail engagement — posts with sustained traffic |
| Realtime | Continuous scan of new Reddit posts | Minutes | Timely responses to fresh threads |
| Comment | Keyword matches in comments | Minutes | Brand mention tracking |

## Quick-start recipes

### Recipe 1: Poll for high-relevance leads (cURL + Python)

**Trigger**: Cron job every hour
**Use case**: Send scored leads (80+) to your CRM or Slack

```bash
# cURL — get unread items scored 80+
curl -H "Authorization: Bearer rsp_your_key" \
  "https://redship.io/api/v1/inbox?unread_only=true&min_score=80&limit=50"
```

```python
import requests

API_KEY = "rsp_your_key"
BASE_URL = "https://redship.io/api/v1"

def get_high_score_leads(min_score=80):
    resp = requests.get(
        f"{BASE_URL}/inbox",
        headers={"Authorization": f"Bearer {API_KEY}"},
        params={"unread_only": "true", "min_score": min_score, "limit": 50}
    )
    resp.raise_for_status()
    return resp.json()["data"]

def mark_as_read(item_id):
    requests.patch(
        f"{BASE_URL}/inbox/{item_id}",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={"is_read": True}
    )

# Usage
leads = get_high_score_leads()
for lead in leads:
    print(f"[{lead['relevance_score']}] {lead['post_title']}")
    print(f"  r/{lead['post_subreddit']} — {lead['post_url']}")
    # Send to CRM, Slack, etc.
    mark_as_read(lead["id"])
```

**Gotchas**: No documented rate limit — keep requests reasonable (RedShip docs say "excessive usage may be throttled"). Pagination uses offset — increment by `limit` value.

### Recipe 2: Filter SEO opportunities only

**Trigger**: Weekly after SEO scan completes
**Use case**: Find Reddit posts ranking on Google for your keywords — engage there for sustained traffic

```bash
curl -H "Authorization: Bearer rsp_your_key" \
  "https://redship.io/api/v1/inbox?type=seo&unread_only=true&sort_by=score_high"
```

```python
def get_seo_opportunities():
    resp = requests.get(
        f"{BASE_URL}/inbox",
        headers={"Authorization": f"Bearer {API_KEY}"},
        params={
            "type": "seo",
            "unread_only": "true",
            "sort_by": "score_high",
            "limit": 20
        }
    )
    resp.raise_for_status()
    return resp.json()["data"]

# These posts rank on Google — a helpful comment drives traffic for months
for post in get_seo_opportunities():
    print(f"[SEO] {post['post_title']} (score: {post['relevance_score']})")
    print(f"  Keyword: {post['matched_keyword']}")
    print(f"  {post['post_url']}")
```

### Recipe 3: Webhook-to-Slack pipeline (architecture)

**Trigger**: RedShip webhook fires on new high-score item
**Use case**: Instant Slack notification for hot leads without polling

```
RedShip webhook → your server/serverless function → filter by score → post to Slack

Architecture:
1. Set webhook URL in RedShip dashboard (e.g., https://your-domain.com/redship-webhook)
2. Your endpoint receives POST with inbox item payload
3. Filter: if relevance_score >= 75, forward to Slack
4. Post to Slack via Incoming Webhook URL
```

```python
# Minimal Flask webhook receiver
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
SLACK_WEBHOOK = "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

@app.route("/redship-webhook", methods=["POST"])
def handle_webhook():
    payload = request.json
    # Payload schema undocumented — log first to discover structure
    # Expected: similar to inbox item JSON from API
    score = payload.get("relevance_score", 0)
    if score >= 75:
        requests.post(SLACK_WEBHOOK, json={
            "text": f"*Hot Reddit lead (score: {score})*\n"
                    f"{payload.get('post_title', 'Unknown')}\n"
                    f"r/{payload.get('post_subreddit', '?')} — {payload.get('post_url', '')}"
        })
    return jsonify({"ok": True}), 200
```

**Gotcha**: Webhook payload schema is not publicly documented. The above assumes it mirrors the API inbox item structure — verify by logging actual payloads first.

## Integration patterns

### CRM sync (custom build)

Since RedShip has no native CRM connectors:

1. **Poll approach**: Cron job hits `/api/v1/inbox?unread_only=true&min_score=70` hourly
2. **For each lead**: Create/update CRM contact with Reddit username, thread URL as source
3. **Mark processed**: PATCH item as `is_read: true` to avoid reprocessing
4. **Dedup**: Use `post_id` as external ID in CRM to prevent duplicates

### Webhook listener pattern

1. Expose HTTPS endpoint (Cloudflare Worker, Vercel, AWS Lambda)
2. Register URL in RedShip dashboard webhook settings
3. Log all payloads for first week to understand schema
4. Add score-based filtering once schema is confirmed
5. Retry: unknown if RedShip retries failed deliveries — implement idempotency

### Batch processing

- Pagination: offset-based (`limit` + `offset` params)
- Max page size: 100 items
- Sort options: `score_high`, `score_low`, `newest`, `oldest`, `upvotes`, `comments`
- Filter by project: `search_id` param isolates one website's results

## Keyword strategy

### Post keywords (drive SEO + real-time discovery)

RedShip auto-generates keywords when you add a website. Refine by:
- Removing generic industry terms (too broad → low scores)
- Adding buying-intent phrases: "best [category] tool", "looking for [solution]", "alternative to [competitor]"
- Adding competitor names as keywords
- Using problem language: "frustrated with", "can't figure out", "need help with"

### Mention keywords (comment monitoring)

- Your brand name and common misspellings
- Product name variations
- Competitor names (track their mentions)

### Exclusions

- Block subreddits with irrelevant content (gaming, memes, news)
- Block known bot usernames
- Review and update exclusions monthly

## Comparison with alternatives

| Tool | Price | AI scoring | AI replies | Auto-post | API | Platforms |
|---|---|---|---|---|---|---|
| **RedShip** | $19/mo | Yes (0-100) | Yes (drafts) | No (DMs only) | Yes (REST) | Reddit |
| **KeyMentions** | Free-$79/mo | No | Yes (generation) | Yes (auto-publish) | No | Reddit |
| **ThreadRadar** | $19.95/mo | No | Yes (drafts) | No | No | Reddit + Quora |
| **Syften** | €19.95/mo | AI filtering | No | No | Yes (REST + webhooks) | 15+ platforms |
| **Octolens** | $119/mo | Yes (tags) | No | No | Yes (REST + MCP) | 13+ platforms |
| **RedditMentions** | €4.49/mo | No | No | No | No | Reddit |
| **F5Bot** | Free | No | No | No | No | Reddit + HN |

### When RedShip is the right choice

- You want **AI relevance scoring** to cut through noise (not just keyword matching)
- You want **AI reply drafts** as starting points for engagement
- You value the **SEO discovery** angle (find posts already ranking on Google)
- You need **API access** for custom integrations at an affordable price ($19/mo)
- You prefer **manual posting** (human voice, lower ban risk) over auto-publish

### When to choose something else

- Need auto-publish to Reddit → KeyMentions (higher ban risk)
- Need Quora coverage → ThreadRadar
- Need multi-platform (X, LinkedIn, HN) → Octolens or Syften
- Need competitive analytics → Threadlytics
- Need the absolute cheapest → RedditMentions (€4.49/mo) or F5Bot (free)
