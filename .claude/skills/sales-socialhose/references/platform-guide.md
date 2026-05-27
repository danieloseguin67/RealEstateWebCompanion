# Socialhose Platform Reference

## Overview

Socialhose is a social listening and media monitoring platform that tracks brand conversations across Instagram, Facebook, X, LinkedIn, Reddit, and TikTok. Differentiator: transparent pricing with no annual contracts, flexible monitoring speeds (daily/high-frequency/crisis), and webhook-based automation. Based in Dallas, TX. Founded 2021. Open-source PHP backend (BSD-3-Clause) available on GitHub.

## Capabilities & automation surface

| Module | What it does | Automation access |
|--------|-------------|-------------------|
| **Brand monitoring** | Track brand mentions, keywords, competitors across social platforms | Webhook-accessible (Pro+) |
| **Sentiment analysis** | AI-enriched sentiment on every mention | Webhook-accessible (Pro+) |
| **Smart alerts** | Threshold-based notifications on volume spikes | Webhook-accessible (Pro+) |
| **High-frequency monitoring** | Faster polling for time-sensitive topics | UI-only (config), webhook for delivery |
| **Crisis mode** | Real-time crisis detection and escalation monitoring | UI-only (Agency only) |
| **Analytics dashboard** | Visual reporting on mention trends, sentiment, sources | UI-only (Pro+) |
| **Competitor analysis** | Compare mention volume and sentiment across brands | UI-only |
| **Influencer discovery** | Identify relevant influencers in your space | UI-only |
| **Campaign measurement** | Track ROI and impact of marketing campaigns | UI-only |
| **Email digests** | Scheduled summary emails of mentions | UI-only (all plans) |
| **Export** | Download mention data | UI-only (Agency only) |

## Pricing, limits & plan gates

| Feature | Starter ($149/mo) | Pro ($399/mo) | Agency ($999/mo) |
|---------|-------------------|---------------|------------------|
| Mentions/month | 5,000 | 25,000 | 100,000 |
| Keywords | 50 | 100 | Unlimited |
| Standard live searches | 7 | 15 | 40 |
| High-frequency searches | 0 | 3 | 10 |
| Seats | 1 | 2 | 3 |
| Smart alerts | 1 | 3 | Unlimited |
| Webhook integrations | 0 | 3 | 5 |
| Analytics dashboard | No | Yes | Yes |
| Export mentions | No | No | Yes |
| Crisis mode | No | No | Yes |
| Campaigns | - | - | 5 |

**Annual discount:** 20% on all plans (Starter: $1,430/yr, Pro: $3,830/yr, Agency: $9,590/yr)

**Add-ons:**
- Additional seat: $29/user/month
- Standard live search: $9/search/month
- High-frequency upgrade: $39/search/month
- Crisis upgrade: $950/search/month
- Mention overage: $29 per 1,000
- Premium support: $299/month

**14-day free trial** — no credit card required. Setup ~5 minutes.

**Overage behavior:** When mentions are depleted, monitoring stops until next billing cycle or overage is purchased. No automatic overage charging — you must opt in.

## Integrations

**Webhook integrations (Pro+ only):**
- Outbound webhooks deliver mention data to your endpoints
- 3 integrations on Pro, 5 on Agency
- Supports any HTTPS endpoint (Slack, custom servers, Zapier Webhooks)
- No native CRM connectors
- No Zapier triggers/actions
- No Make modules
- No MCP server
- No iPaaS support

**Email delivery (all plans):**
- Email digests (daily/weekly summary)
- Smart alert emails (threshold-triggered)

## Data model

Socialhose does not have public API documentation. The webhook payload structure is not publicly documented. Based on the open-source PHP repository structure:

<!-- Constructed from open-source repo — verify against live webhook payloads -->
```json
{
  "mention": {
    "id": "abc123",
    "content": "Just tried @brand and love it!",
    "source": "twitter",
    "author": {
      "name": "user_handle",
      "followers": 1234
    },
    "sentiment": "positive",
    "published_at": "2026-05-05T14:30:00Z",
    "url": "https://x.com/user_handle/status/123456",
    "keywords_matched": ["brand"],
    "search_id": "search_789"
  },
  "alert": {
    "type": "smart_alert",
    "threshold_exceeded": true,
    "current_volume": 150,
    "baseline_volume": 50
  }
}
```

**Key objects:**
- **Live search** — a saved monitoring query with keywords, sources, and speed settings
- **Mention** — individual brand mention with metadata (source, sentiment, author, timestamp)
- **Smart alert** — threshold-based notification rule attached to a live search
- **Webhook integration** — outbound HTTP endpoint receiving mention/alert data

## Quick-start recipes

### Recipe 1: Forward mention spikes to Slack

**Trigger:** Smart alert fires when mention volume exceeds 3x baseline
**Steps:**
1. Create a Slack incoming webhook URL
2. Configure Socialhose webhook integration pointing to Slack
3. Attach smart alert to your primary brand monitoring search

**Setup (Slack side):**
```bash
# Create Slack incoming webhook at:
# https://api.slack.com/messaging/webhooks
# Copy the webhook URL: https://hooks.slack.com/services/T.../B.../xxx
```

**Socialhose side (UI):**
1. Settings → Integrations → Add Webhook
2. Paste Slack webhook URL
3. Select "Smart Alerts" as trigger type
4. Attach to your brand monitoring live search
5. Set threshold: alert when volume > 3x daily average

**Gotcha:** Slack webhook URLs expire if unused for 30+ days. Test monthly.

### Recipe 2: Pipe mentions to a custom dashboard

**Trigger:** New mention matches a live search
**Steps:**
1. Set up a serverless function (AWS Lambda / Cloudflare Worker) as webhook receiver
2. Parse the incoming mention payload
3. Store in your database for custom dashboard

**Receiver example (Cloudflare Worker):**
```javascript
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    const payload = await request.json();
    // Store mention in D1 or forward to your DB
    console.log('Mention received:', payload.mention?.content);
    // Must return 200 or Socialhose will retry
    return new Response('OK', { status: 200 });
  }
};
```

**Gotcha:** Always return 200 immediately. If your endpoint is slow or returns errors, Socialhose may stop delivering to that webhook.

### Recipe 3: Daily competitive digest to email

**Trigger:** Daily email digest scheduled for 8 AM
**Steps:**
1. Create separate live searches for your brand and each competitor
2. Enable email digests on each search
3. Set digest timing to daily, morning delivery

**Socialhose side (UI):**
1. Create Live Search → "MyBrand mentions"
2. Create Live Search → "Competitor A mentions"
3. Create Live Search → "Competitor B mentions"
4. For each: Settings → Email Digest → Enable → Daily at 8:00 AM
5. Compare mention volume and sentiment across daily summaries

**Gotcha:** Each live search counts against your plan limit (7 on Starter). With 3+ competitors, consider Pro plan for 15 searches.

## Integration patterns

### Webhook listener pattern

```python
# Flask webhook receiver for Socialhose
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/socialhose/webhook', methods=['POST'])
def handle_mention():
    payload = request.get_json()
    mention = payload.get('mention', {})

    # Filter for high-impact mentions
    if mention.get('sentiment') == 'negative':
        # Route to crisis response channel
        notify_team(mention)

    # Always return 200
    return jsonify({'status': 'received'}), 200

def notify_team(mention):
    # Forward to Slack, PagerDuty, etc.
    pass
```

**Retry behavior:** Not publicly documented. Best practice: return 200 immediately, process asynchronously.

### Mention budget management

```python
# Track mention consumption to avoid overages
import datetime

MONTHLY_LIMIT = 5000  # Starter plan
WARNING_THRESHOLD = 0.8  # 80%

def check_mention_budget(current_count):
    """Alert when approaching mention limit."""
    usage_pct = current_count / MONTHLY_LIMIT
    if usage_pct >= WARNING_THRESHOLD:
        days_remaining = days_until_reset()
        daily_burn = current_count / days_elapsed()
        projected_total = daily_burn * 30
        return {
            'warning': True,
            'usage_pct': usage_pct,
            'projected_total': projected_total,
            'recommendation': 'Pause low-priority searches' if projected_total > MONTHLY_LIMIT else 'On track'
        }
    return {'warning': False}
```

## Self-hosted option

Socialhose has an open-source PHP implementation on GitHub (BSD-3-Clause):
- **Repo:** https://github.com/SOCIALHOSE/socialhose-php
- **Stack:** PHP 7.2+, Symfony, ElasticSearch 5.x, RabbitMQ, MySQL, Docker
- **Use case:** Full control over data, no mention limits, custom integrations
- **Trade-off:** You manage infrastructure, no SaaS support, community is small (9 stars)

This is an option for teams that need unlimited mentions or custom API access without paying for the Agency plan.
