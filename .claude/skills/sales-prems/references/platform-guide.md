# Prems AI Platform Reference

## Overview

Prems AI is a multi-platform social listening and lead generation tool that monitors 15 platforms for buying-intent conversations, scores each lead 0-100, and generates personalized reply drafts. Built for solo SaaS founders and small B2B teams who want warm outreach to people already discussing relevant problems.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| Multi-platform monitoring | Scans 15 platforms for keyword-matched conversations | UI — dashboard |
| Intent scoring (0-100) | AI evaluates each post for purchase likelihood | UI — per-lead score |
| AI Pitcher | Generates contextual reply drafts for each lead | UI — one-click generate |
| Auto-pilot mode | Scheduled scans (hourly or daily) with email notifications | UI — settings |
| Brand relevance filter | AI eliminates false positives using product context | UI — automatic |
| CRM pipeline view | Kanban-style lead management within Prems | UI-only |
| Slack integration | Push notifications to Slack channels | Webhook-accessible |
| Discord integration | Push notifications to Discord channels | Webhook-accessible |
| Notion integration | Sync leads to Notion database | Webhook-accessible |
| Custom webhooks | Send lead data to any HTTP endpoint | Webhook-accessible |

**No REST API.** All programmatic access is via webhooks (outbound only — Prems pushes to your endpoint when leads are found). No inbound API for querying leads, updating status, or managing keywords.

## Pricing, limits & plan gates

<!-- Pricing as of May 2026 — founder pricing, may increase -->

| | Single plan (Founder) | After founder pricing ends |
|---|---|---|
| Monthly | $49/mo | $79/mo |
| Annual | $490/yr (~$41/mo) | TBD |
| Leads/month | 100 | 100 |
| Keywords | Unlimited | Unlimited |
| Platforms | All 15 | All 15 |
| AI Pitcher | Included | Included |
| Auto-pilot | Included | Included |
| Webhooks | Included | Included |
| Slack/Discord/Notion | Included | Included |
| Free trial | Yes (no CC required) | Yes |

**No plan tiers.** Single plan includes everything — no feature gating. The only limit is 100 leads/month.

**Agency support:** A Scale plan (750 credits) is mentioned for agencies with team collaboration and white-label options — pricing and availability unclear.

## Monitored platforms

Reddit, X (Twitter), LinkedIn, Hacker News, Quora, Facebook Groups, Indie Hackers, Dev.to, Stack Overflow, YouTube, Product Hunt, Bluesky, Medium, GitHub, Substack.

**Roadmap:** Google Maps, TripAdvisor, G2.

## Integrations

| Integration | Direction | What it does |
|---|---|---|
| Slack | Outbound | Pushes lead notifications to channels |
| Discord | Outbound | Pushes lead notifications to channels |
| Notion | Outbound | Syncs leads to a Notion database |
| Webhooks | Outbound | Posts JSON to any HTTP endpoint on new leads |

**No native CRM connectors.** For CRM sync, use webhooks → Zapier/Make/n8n → CRM.

**No Zapier/Make triggers.** Must use raw webhooks with middleware.

## Data model

<!-- Constructed from docs — verify against live API -->

### Lead object (webhook payload — estimated shape)

```json
{
  "id": "lead_abc123",
  "platform": "reddit",
  "url": "https://reddit.com/r/SaaS/comments/...",
  "title": "Looking for a better project management tool",
  "content": "I've been using Jira but it's too complex for my 5-person team...",
  "intent_score": 85,
  "keywords_matched": ["project management", "alternative to Jira"],
  "author": "u/username",
  "created_at": "2026-05-06T14:30:00Z",
  "discovered_at": "2026-05-06T15:00:00Z",
  "ai_pitch": "As someone who's been in the same boat with Jira complexity..."
}
```

**Note:** Webhook payload schema is not publicly documented. The above is constructed from UI field observations. Verify field names and structure against actual webhook deliveries.

## Quick-start recipes

### Recipe 1: Route high-intent leads to Slack via webhook

**Trigger:** Prems discovers a lead scoring 70+
**Steps:**
1. In Prems dashboard, go to Settings > Integrations > Webhooks
2. Add your Slack incoming webhook URL
3. Prems will push lead notifications directly

Alternatively, for filtering/transformation, route through n8n:

```bash
# Test webhook delivery with webhook.site first
# 1. Go to webhook.site, copy your unique URL
# 2. Paste into Prems webhook settings
# 3. Wait for next auto-pilot scan to verify payload format
```

### Recipe 2: Sync Prems leads to HubSpot via Zapier

**Trigger:** Prems webhook fires on new lead
**Steps:**
1. Create Zapier zap: Trigger = "Webhooks by Zapier" (Catch Hook)
2. Copy the Zapier webhook URL into Prems webhook settings
3. Run a Prems scan to send a test payload
4. Map fields in Zapier: `url` → Website, `intent_score` → custom property, `ai_pitch` → Notes
5. Action = "HubSpot" → Create Contact

```python
# Python: Parse Prems webhook and create HubSpot contact
import requests
from flask import Flask, request

app = Flask(__name__)

@app.route("/prems-webhook", methods=["POST"])
def handle_lead():
    lead = request.json
    if lead.get("intent_score", 0) >= 70:
        requests.post(
            "https://api.hubapi.com/crm/v3/objects/contacts",
            headers={"Authorization": "Bearer YOUR_HUBSPOT_TOKEN"},
            json={
                "properties": {
                    "website": lead["url"],
                    "notes": f"Prems AI lead (score: {lead['intent_score']})\n{lead.get('ai_pitch', '')}",
                    "hs_lead_status": "NEW"
                }
            }
        )
    return "", 200
```

### Recipe 3: Daily lead digest via Discord

**Trigger:** Auto-pilot completes daily scan
**Steps:**
1. Create a Discord webhook in your server channel settings
2. Add the Discord webhook URL in Prems integrations
3. Leads will post to the channel as they're discovered

## Integration patterns

### Webhook listener setup

Prems sends outbound webhooks — your endpoint must be:
- Publicly accessible (not localhost)
- Accepting POST requests with JSON body
- Responding with 2xx within a reasonable timeout

**Testing:** Use webhook.site or ngrok for local development before deploying.

### CRM sync architecture

```
Prems (webhook) → Zapier/Make/n8n → CRM (HubSpot, Pipedrive, etc.)
```

- **Field mapping:** Map intent_score to a custom CRM property for lead prioritization
- **Dedup:** Use the lead URL as a unique identifier to avoid creating duplicate contacts
- **Filtering:** Only sync leads above a score threshold (70+) to keep CRM clean
