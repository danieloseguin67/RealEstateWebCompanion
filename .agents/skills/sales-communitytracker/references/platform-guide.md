# CommunityTracker Platform Reference

## Overview

CommunityTracker is a community intelligence platform built for GTM teams — sales, marketing, founders, and product. It monitors public communities (Reddit, Slack, Discord, LinkedIn, X, GitHub, Product Hunt, Stack Overflow, Indie Hackers, Dev.to, Hacker News, and niche forums) for high-intent buyer signals, scores them by commercial relevance, and delivers them through a unified inbox with AI summaries and recommended next steps. Differentiator vs general social listening tools: focuses specifically on community discussions where product research and buying decisions happen, not news/media monitoring.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Keyword monitoring** | Track keywords across community platforms with intent filtering | All plans (3-20 keywords by tier) |
| **Signal detection** | AI surfaces buyer research, solution comparisons, pain-point discussions | All plans |
| **Intent scoring** | Filters commercially relevant conversations (high/medium priority) | All plans |
| **Competitor tracking** | Monitor competitor mentions and share of voice across communities | All plans |
| **Unified inbox** | Aggregate signals from multiple platforms in one dashboard | All plans |
| **AI summaries** | Context on why signals matter + recommended next steps | All plans |
| **Team workflows** | Signal assignment, notes, collaboration | Pro+ |
| **Content generation** | AI-crafted social posts from trending discussions (`/generate` endpoint) | Pro+ (API-accessible) |
| **Slack integration** | Real-time signal alerts to Slack channels | Pro+ |
| **Email alerts** | Daily digest or real-time notifications | All plans (daily on Starter, real-time on Pro+) |
| **Webhooks** | JSON POST to custom URL on each signal | Pro+ (webhook-accessible) |
| **REST API** | Programmatic access to mentions and content generation | Pro (1K calls/day), Advanced (5K calls/day) |
| **Task management** | Route signals as tasks to ClickUp, Notion, Trello, Linear | Pro+ |
| **Warm outreach** | LinkedIn and email integration for personalized follow-up | Pro+ |
| **CSV export** | Export signal lists | Pro+ |

## Pricing, limits & plan gates

| Feature | Starter $29/mo | Pro $99/mo | Advanced $199/mo |
|---|---|---|---|
| Keywords | 3 | 10 | 20 |
| Community platforms | Reddit, LinkedIn, HN, GitHub | All platforms | All platforms |
| Alert frequency | Daily digest | Real-time | Real-time |
| Unified inbox | Yes | Yes | Yes |
| AI summaries | Yes | Yes | Yes |
| Intent scoring | Yes | Yes | Yes |
| Competitor tracking | Basic | Full + Share of Voice | Full + Share of Voice |
| Slack integration | No | Yes | Yes |
| Team workflows | No | Yes | Yes |
| Webhooks | No | Yes | Yes |
| REST API | No | 1,000 calls/day | 5,000 calls/day |
| Task management | No | Yes | Yes |
| Warm outreach | No | Yes | Yes |

**Plan gate warning:** If you need programmatic access (API or webhooks), Slack, or team workflows, you must be on Pro ($99/mo) or higher. Starter is monitoring + daily email alerts only.

**Pricing note:** The homepage and blog articles show different keyword counts for Starter (20 vs 3). Verify current limits in your account dashboard.

## Integrations

- **Notifications**: Email (all plans), Slack (Pro+)
- **Webhooks**: JSON POST to any endpoint on each signal (Pro+)
- **Task management**: ClickUp, Notion, Trello, Linear (Pro+)
- **Outreach**: LinkedIn and email integration (Pro+)
- **Automation**: n8n, Make.com, Zapier (via webhooks, Pro+)
- **REST API**: Programmatic access to mentions and AI content generation (Pro+)
- **No native Zapier app.** Use webhooks to trigger Zapier Catch Hook workflows.

Data flow: CommunityTracker monitors communities → scores signals by intent → pushes qualified signals out via email/Slack/webhooks/API.

## Data model

### Mention object (from GET /v1/mentions)

```json
{
  "id": "mention_abc123",
  "platform": "reddit",
  "subreddit": "r/devops",
  "title": "Looking for a better CI/CD pipeline tool",
  "body": "We've been using Jenkins but it's too complex for our small team...",
  "intent_score": 85,
  "sentiment": "negative",
  "url": "https://reddit.com/r/devops/comments/abc123",
  "created_at": "2026-05-07T14:30:00Z"
}
```
<!-- Constructed from docs — verify against live API -->

**Key fields:**
- `intent_score` (0-100): commercial relevance rating. 70+ is high intent.
- `sentiment`: positive / negative / neutral
- `platform`: which community the signal came from
- `subreddit`: community-specific identifier (subreddit for Reddit, channel for Slack, etc.)

### Pagination

Response includes `total` and `page` fields. Use `?page=2&limit=10` for offset pagination.

## Quick-start recipes

### Recipe 1: Monitor competitor mentions and push to Slack (cURL)

```bash
# Fetch high-intent competitor mentions
curl -X GET \
  "https://api.communitytracker.ai/v1/mentions?keyword=competitor-name&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

```python
# Poll CommunityTracker API and post high-intent signals to Slack
import requests

CT_API_KEY = "your-communitytracker-api-key"
SLACK_WEBHOOK = "https://hooks.slack.com/services/T.../B.../xxx"

response = requests.get(
    "https://api.communitytracker.ai/v1/mentions",
    params={"keyword": "competitor-name", "limit": 20},
    headers={"Authorization": f"Bearer {CT_API_KEY}"}
)

for mention in response.json().get("data", []):
    if mention.get("intent_score", 0) >= 70:
        requests.post(SLACK_WEBHOOK, json={
            "text": f"*High-intent signal* ({mention['intent_score']}/100)\n"
                    f"Platform: {mention['platform']}\n"
                    f"Title: {mention['title']}\n"
                    f"<{mention['url']}|View conversation>"
        })
```

**Gotcha:** API is Pro-only ($99/mo). Starter users should use the Slack integration directly (also Pro-only) or email alerts.

### Recipe 2: Generate AI content from trending discussions

```bash
# Generate AI social posts from community trends
curl -X POST \
  "https://api.communitytracker.ai/v1/generate" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"topic": "CI/CD pipeline trends", "style": "linkedin"}'
```

**Use case:** Monitor what communities are discussing, then generate relevant content that positions you as a thought leader on the topics your audience cares about.

### Recipe 3: Webhook → n8n → CRM pipeline

1. Set up a webhook URL in CommunityTracker pointing to your n8n webhook trigger
2. n8n receives the signal JSON payload on each qualified mention
3. Filter node: `intent_score >= 70` AND `platform == "reddit"` OR `platform == "linkedin"`
4. Map fields to CRM contact: author name, platform, mention URL, intent score, sentiment
5. Create/update contact in HubSpot/Salesforce with signal context in notes
6. Optional: send Slack notification to sales team for immediate engagement

**Gotcha:** Webhook payload schema is not publicly documented. Test with webhook.site first to inspect the actual payload format.

## Integration patterns

### Webhook listener

CommunityTracker pushes JSON POST to your endpoint on each qualified signal. Set up the webhook URL in your dashboard settings.

**Expected payload structure** (based on API mention object — verify against actual webhook):

```json
{
  "id": "mention_abc123",
  "platform": "reddit",
  "title": "Looking for a tool...",
  "body": "...",
  "intent_score": 85,
  "sentiment": "negative",
  "url": "https://...",
  "created_at": "2026-05-07T14:30:00Z"
}
```
<!-- Constructed from docs — verify against live webhook payload -->

**Retry behavior:** Not documented. Implement idempotency on your endpoint (check `id` for duplicates).

### Rate limit handling

- Pro: 1,000 API calls/day
- Advanced: 5,000 API calls/day
- When limit is reached, API returns 429 status

**Backoff strategy:**
1. Check for `429` status code
2. Wait 60 seconds, then retry
3. If still limited, switch to webhook-based approach (no rate limit on inbound webhooks)
4. For polling workflows, space requests at least 90 seconds apart to stay under 1K/day (960 calls at 90s intervals = 24 hours)
