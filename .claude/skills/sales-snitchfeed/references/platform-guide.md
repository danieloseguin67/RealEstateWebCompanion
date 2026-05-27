# SnitchFeed Platform Reference

## Overview

SnitchFeed is an intent-based social listening platform for startups and SMBs that monitors Reddit, X/Twitter, LinkedIn, and Bluesky for high-intent buyer signals. Differentiator: keyword-level relevance context (plain English intent descriptions per keyword, not just keyword matching) with AI scoring to filter noise. Target audience: GTM teams at startups, solo founders, and lean marketing teams who want to find and engage prospects before competitors.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| Keyword monitoring | Tracks posts and comments across Reddit, X, LinkedIn, Bluesky | UI — all plans |
| AI relevance scoring | Scores each mention for relevance based on keyword context | UI — all plans |
| AI sentiment scoring | Classifies mentions as positive/negative | UI — Pro+ only |
| Automated intent tagging | Tags mentions as Buy Intent, Competitor Mention, Customer Testimonial, Promotional Post, Own Brand Mention, Industry Insights, Hiring, Event | UI — Pro+ only |
| One-line AI summaries | Generates brief summary per mention | UI — all plans |
| Keyword-level relevance context | Plain English description of what you're looking for, per keyword | UI — all plans |
| Upvote/downvote feedback | Trains AI filter accuracy per keyword | UI — all plans |
| Saved views | Multiple dashboard views per user for different monitoring scenarios | UI — all plans |
| CSV export | Export mentions for offline analysis or enrichment | UI — all plans |
| Slack alerts | Real-time, daily, or weekly delivery | Integration — all plans |
| Discord alerts | Real-time, daily, or weekly delivery | Integration — all plans |
| Email alerts | Real-time, daily, or weekly delivery | Integration — all plans |
| Webhook automation | Push mention payloads to external endpoints | Integration — Pro+ only |
| HubSpot integration | Native connector for CRM sync | Integration — plan unknown |
| Instantly integration | Native connector for outreach sequences | Integration — plan unknown |
| Google Sheets integration | Sync mentions to spreadsheet | Integration — plan unknown |
| Zendesk integration | Push mentions to support tickets | Integration — plan unknown |
| Linear integration | Push mentions to issue tracking | Integration — plan unknown |
| Apollo enrichment | Enrich mention contacts via Apollo | Integration — plan unknown |
| Clay enrichment | Enrich mention contacts via Clay | Integration — plan unknown |
| Team collaboration | Invite users, shared views | UI — Starter (1 user), Pro (5 users) |

**No public REST API.** SnitchFeed provides outbound webhooks (Pro+) and native integrations but no inbound API endpoints. You cannot query, search, or pull mentions programmatically. No Zapier/Make apps. No MCP server.

## Pricing, limits & plan gates

*Best-effort from research — verify current pricing at snitchfeed.com*

| Feature | Starter ($45/mo) | Pro ($99/mo) | Custom ($399+/mo) |
|---|---|---|---|
| **Keywords** | 3 | 50 | Custom |
| **Listeners** | 3 | 10 | Custom |
| **Mentions/mo** | 3,000 | 20,000 | Custom |
| **Users** | 1 | 5 | Custom |
| **Data retention** | 3 months | 6 months | Custom |
| **Platforms** | Reddit, X, LinkedIn, Bluesky | All | All |
| **AI relevance scoring** | Yes | Yes | Yes |
| **AI sentiment scoring** | No | Yes | Yes |
| **AI intent tagging** | No | Yes | Yes |
| **Slack/Discord/email** | Yes | Yes | Yes |
| **Webhooks** | No | Yes | Yes |
| **Native integrations** | Unknown | HubSpot, Instantly, Google Sheets, Zendesk, Linear | Custom |
| **CSV export** | Yes | Yes | Yes |
| **Apollo/Clay enrichment** | Unknown | Yes | Yes |

- **20% annual discount** available on all plans
- **7-day free trial** — no credit card required
- **480+ active customers** (per homepage)
- Mention caps are hard limits — broad keywords burn through caps quickly

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| Slack | SnitchFeed → Slack | Real-time, daily, or weekly alerts. All plans. |
| Discord | SnitchFeed → Discord | Same alert options as Slack. All plans. |
| Email | SnitchFeed → Email | Same alert options. All plans. |
| Webhooks | SnitchFeed → endpoint | JSON payload per mention. Pro+ only. |
| HubSpot | SnitchFeed → HubSpot | Native integration. Plan gate unclear. |
| Instantly | SnitchFeed → Instantly | Native integration for outreach. Plan gate unclear. |
| Google Sheets | SnitchFeed → Sheets | Mention sync. Plan gate unclear. |
| Zendesk | SnitchFeed → Zendesk | Support ticket creation. Plan gate unclear. |
| Linear | SnitchFeed → Linear | Issue creation. Plan gate unclear. |
| Apollo | SnitchFeed → Apollo | Contact enrichment. Plan gate unclear. |
| Clay | SnitchFeed → Clay | Contact enrichment. Plan gate unclear. |
| CSV export | Manual | Download mention data. All plans. |

**No Zapier/Make/n8n native apps.** Use webhooks (Pro+) as the automation bridge — trigger Zapier/Make scenarios via webhook URL.

## Data model

<!-- Constructed from UI research — no API docs, verify against live product -->

```json
{
  "listener": {
    "name": "Competitor Tracking",
    "keywords": ["alternative to Jira", "looking for PM tool"],
    "relevance_context": "People actively looking to switch project management tools for small teams",
    "platforms": ["reddit", "twitter", "bluesky"],
    "alert_channels": ["slack", "email"],
    "alert_frequency": "real-time"
  },
  "mention": {
    "platform": "reddit",
    "url": "https://reddit.com/r/SaaS/comments/...",
    "content": "We need something simpler than Jira for our small team...",
    "ai_relevance_score": 0.92,
    "ai_sentiment": "negative",
    "ai_tags": ["Buy Intent", "Competitor Mention"],
    "ai_summary": "User frustrated with Jira complexity, actively seeking simpler PM tool for 5-person team",
    "detected_at": "2026-05-08T14:23:00Z",
    "keyword_matched": "alternative to Jira"
  }
}
```

*Note: This is a representative shape constructed from feature descriptions — SnitchFeed has no public API, so field names are inferred. Webhook payloads may differ.*

## Quick-start recipes

### Recipe 1: Monitor Reddit for buying signals and alert Slack

**Trigger**: New high-intent Reddit mention detected
**Steps**:
1. Create a listener in SnitchFeed with keywords like "best tool for [category]", "alternative to [competitor]", "recommend [category]"
2. For each keyword, add relevance context: "People who are actively evaluating tools and ready to buy, not just casually browsing"
3. Connect Slack workspace and select the channel for alerts
4. Set alert frequency to "real-time" for immediate notifications
5. Review first 20-30 mentions, upvote relevant ones, downvote noise to train the AI

**Gotcha**: Starter plan caps at 3 keywords and 3,000 mentions/mo. Start narrow and expand if you have capacity.

### Recipe 2: Push mentions to HubSpot via webhook (Pro plan)

**Trigger**: SnitchFeed webhook fires on new mention
**Steps**:
1. In SnitchFeed dashboard, navigate to webhook settings
2. Add your endpoint URL (e.g., a Zapier/Make webhook URL or your own server)
3. Configure a Zapier/Make scenario: receive webhook → create/update HubSpot contact
4. Map fields: mention URL → contact note, platform → custom property, intent tag → lead status
5. Alternatively, use the native HubSpot integration if available on your plan

```python
# Example: Simple webhook receiver (Flask)
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

HUBSPOT_API_KEY = "your-hubspot-api-key"

@app.route("/snitchfeed-webhook", methods=["POST"])
def handle_mention():
    mention = request.json
    # Create a note in HubSpot with mention details
    # Adapt field names based on actual webhook payload
    note = {
        "properties": {
            "hs_note_body": f"SnitchFeed mention: {mention.get('url', 'N/A')}\n"
                           f"Platform: {mention.get('platform', 'N/A')}\n"
                           f"Summary: {mention.get('ai_summary', 'N/A')}\n"
                           f"Tags: {mention.get('ai_tags', [])}"
        }
    }
    # Post to HubSpot API
    resp = requests.post(
        "https://api.hubapi.com/crm/v3/objects/notes",
        headers={"Authorization": f"Bearer {HUBSPOT_API_KEY}",
                 "Content-Type": "application/json"},
        json=note
    )
    return jsonify({"status": "ok"}), 200
```

**Gotcha**: Webhook payload schema is not publicly documented. Test with webhook.site first to inspect the actual JSON structure before building your integration.

### Recipe 3: Competitive intelligence tracking

**Trigger**: Ongoing monitoring of competitor mentions
**Steps**:
1. Create separate listeners for each competitor (e.g., "Competitor A complaints", "switching from Competitor A")
2. Set relevance context: "People complaining about [Competitor A] or expressing desire to switch to a different tool"
3. Enable AI intent tagging (Pro plan) to auto-categorize as "Competitor Mention"
4. Set up a weekly digest alert to track sentiment trends around competitors
5. Export CSV monthly for share-of-voice analysis

**Gotcha**: Each listener consumes from your keyword quota (Starter: 3, Pro: 50). Group related competitor keywords in a single listener if possible.

## Integration patterns

### Webhook-based automation (Pro+)
SnitchFeed pushes mention data to your configured webhook endpoint whenever a new mention matches your keywords and passes the relevance filter.

**Setup**:
1. Create a publicly accessible endpoint (your server, Zapier webhook URL, or Make webhook URL)
2. Configure the webhook URL in SnitchFeed dashboard settings
3. SnitchFeed sends a POST request with JSON payload per mention

**Retry behavior**: Unknown — not documented. Assume no automatic retry. Build idempotent receivers.

**Payload schema**: Not publicly documented. Test with a webhook debugging service first:
1. Go to webhook.site and copy the unique URL
2. Add this URL as your webhook endpoint in SnitchFeed
3. Wait for a matching mention to trigger a payload
4. Inspect the JSON structure and map fields to your downstream system

### Enrichment pipeline
SnitchFeed → webhook → Clay/Apollo enrichment → CRM/outreach:
1. SnitchFeed detects high-intent mention with poster's profile URL
2. Webhook pushes mention data to middleware (Zapier/Make/custom)
3. Middleware sends profile URL to Clay or Apollo for enrichment (email, company, title)
4. Enriched contact is created in HubSpot or added to Instantly sequence

### CSV batch workflow (all plans)
For teams on Starter without webhook access:
1. Export mentions as CSV from SnitchFeed dashboard
2. Upload CSV to Clay for bulk enrichment
3. Push enriched contacts to CRM or outreach tool
4. Repeat weekly or as needed
