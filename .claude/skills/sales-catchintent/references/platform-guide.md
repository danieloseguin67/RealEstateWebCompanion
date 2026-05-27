# CatchIntent Platform Reference

## Overview

CatchIntent is an AI-powered social listening platform that detects buyer intent signals across Reddit, X/Twitter, Hacker News, and Bluesky, then enriches matching leads with verified emails, LinkedIn profiles, and company data. Differentiator: AI intent classification goes beyond keyword matching — it distinguishes casual mentions from active solution-seeking and scores each signal 0-100 for relevance.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Social Listening** | Monitors Reddit, X, HN, Bluesky for buying signals via "listeners" (keyword + AI intent rules running 24/7) | MCP server (OAuth) |
| **Relevance Scoring** | AI scores each captured signal 0-100, filtering out noise, jokes, spam | MCP server |
| **AI Response Suggestions** | Drafts contextual replies for high-intent signals | UI-only (Pro+) |
| **Lead Enrichment** | Adds verified email, LinkedIn profile, company data, ICP score, warmth score to each signal | UI + MCP server |
| **LinkedIn Intelligence** | AI agents identify buyers engaging with competitors, detect job changes, hiring signals | UI-only (separate product) |
| **CRM Push** | One-click push leads to HubSpot, Pipedrive, Close, Lemlist, Instantly, Apollo | UI-only (Pro+) |
| **Alerts** | Email, Slack, Discord, Telegram notifications for new signals | UI config → push delivery |
| **Webhooks** | Push signal data to external endpoints | Webhook-accessible (Pro+) |
| **MCP Server** | Natural language access to signals, listeners, and lead data from Claude, Cursor, ChatGPT | MCP (OAuth, all plans) |
| **CSV Export** | Bulk export signal and lead data | UI-only |

## Pricing, limits & plan gates

*Best-effort — verify current pricing at catchintent.com/pricing.*

| Feature | Basic ($49/mo) | Pro ($69/mo) | Enterprise (custom) |
|---|---|---|---|
| Listeners | 3 | 10 | 25+ |
| Signals/month | 150 | 500 | 500+ |
| Team members | 5 | 5 | Unlimited |
| Platforms | Reddit, X, HN, Bluesky | Reddit, X, HN, Bluesky | All |
| Signal retention | 90 days | 180 days | 365 days |
| Email & Slack alerts | Yes | Yes | Yes |
| Discord & Telegram alerts | Yes | Yes | Yes |
| Webhooks | No | Yes | Yes |
| AI response suggestions | No | Yes | Yes |
| CRM integrations | No | Yes (HubSpot, Pipedrive, Close) | Yes |
| MCP server | Yes | Yes | Yes |
| Priority support | No | Yes | Dedicated |

**LinkedIn Intelligence** is a separate add-on starting at $69/mo, scaling by monthly lead volume (up to 18,000 leads/mo).

**Done-for-you service**: $1,499/mo, 3-month minimum.

**Trial**: 7-day free trial, full feature access, card required, 14-day refund policy.

No annual discount mentioned. No rollover of unused signals.

## Integrations

| Integration | Direction | Plan required |
|---|---|---|
| HubSpot | CatchIntent → HubSpot (push leads) | Pro+ |
| Pipedrive | CatchIntent → Pipedrive (push leads) | Pro+ |
| Close | CatchIntent → Close (push leads) | Pro+ |
| Lemlist | CatchIntent → Lemlist (push to sequences) | Pro+ |
| Instantly | CatchIntent → Instantly (push to campaigns) | Pro+ |
| Apollo | CatchIntent → Apollo (push leads) | Pro+ |
| Slack | CatchIntent → Slack (push alerts) | All plans |
| Discord | CatchIntent → Discord (push alerts) | All plans |
| Telegram | CatchIntent → Telegram (push alerts) | All plans |
| Webhooks | CatchIntent → any endpoint (push signal data) | Pro+ |
| MCP Server | Bidirectional (query signals, manage listeners) | All plans |
| CSV Export | CatchIntent → file (bulk export) | All plans |

## Data model

### Signal object
<!-- Constructed from docs — verify against live API -->
```json
{
  "signal_id": "sig_abc123",
  "platform": "reddit",
  "source_url": "https://reddit.com/r/SaaS/comments/...",
  "content": "Looking for a project management tool that integrates with Slack...",
  "relevance_score": 87,
  "intent_type": "buying",
  "surfacing_rationale": "User is actively comparing tools and requesting specific integration",
  "author": {
    "username": "techfounder42",
    "platform_profile_url": "https://reddit.com/u/techfounder42"
  },
  "enrichment": {
    "email": "verified@example.com",
    "linkedin_url": "https://linkedin.com/in/...",
    "company": "Acme Corp",
    "icp_score": 82,
    "warmth_score": "high"
  },
  "created_at": "2026-05-06T14:30:00Z",
  "listener_id": "lst_xyz789"
}
```

### Listener object
<!-- Constructed from docs — verify against live API -->
```json
{
  "listener_id": "lst_xyz789",
  "name": "PM tool buyers",
  "keywords": ["project management", "task management", "Asana alternative"],
  "platforms": ["reddit", "hackernews", "bluesky"],
  "relevance_threshold": 75,
  "status": "active",
  "notification_channels": ["slack", "email"],
  "signals_this_month": 42,
  "created_at": "2026-04-01T10:00:00Z"
}
```

## Quick-start recipes

### Recipe 1: Set up a buyer intent listener

**Goal**: Monitor Reddit and HN for people actively looking for your type of product.

**Steps**:
1. Go to Listeners → Create New
2. Add 3-5 keywords using buyer language: "looking for [category]", "need a [category] tool", "alternative to [competitor]"
3. Select platforms: Reddit + Hacker News
4. Set relevance threshold to 75%
5. Connect Slack for real-time alerts
6. Review first 20 signals after 48 hours, adjust threshold up/down

**Gotchas**: Don't use your product name as a keyword — that captures mentions of you, not buyers looking for your category. Use competitor names and problem-language keywords instead.

### Recipe 2: Push qualified leads to HubSpot via webhook

**Goal**: Automatically create HubSpot contacts when CatchIntent surfaces a high-intent signal.

**Trigger**: CatchIntent webhook fires on new signal (Pro+ plan required)

**Webhook endpoint setup** (your server):
```python
from flask import Flask, request
import requests

app = Flask(__name__)

HUBSPOT_TOKEN = "pat-na1-xxx"

@app.route("/catchintent-webhook", methods=["POST"])
def handle_signal():
    signal = request.json
    if signal.get("relevance_score", 0) >= 80:
        # Create HubSpot contact
        requests.post(
            "https://api.hubapi.com/crm/v3/objects/contacts",
            headers={"Authorization": f"Bearer {HUBSPOT_TOKEN}",
                     "Content-Type": "application/json"},
            json={
                "properties": {
                    "email": signal["enrichment"]["email"],
                    "firstname": signal["author"]["username"],
                    "company": signal["enrichment"].get("company", ""),
                    "hs_lead_status": "NEW",
                    "notes_last_activity": f"CatchIntent signal: {signal['source_url']}"
                }
            }
        )
    return "", 200
```

**Gotchas**: Webhook payload schema is not formally documented — test with a real signal and log the full payload before building your handler. Filter by `relevance_score >= 80` to avoid creating contacts from noise.

### Recipe 3: Query signals via MCP server

**Goal**: Access CatchIntent data from Claude or Cursor via natural language.

**Setup**:
1. In your MCP client (Claude Desktop, Cursor), add the CatchIntent MCP server
2. Authentication uses OAuth — no API key needed, follow the browser-based auth flow
3. Once connected, query naturally: "Show me today's high-intent signals from Reddit" or "How many signals did my PM listener capture this week?"

**Gotchas**: MCP server is available on all plans, but some data (AI response suggestions, enrichment details) may be limited on Basic.

## Integration patterns

### Alert routing architecture

CatchIntent supports parallel alert delivery — a single listener can push to Slack AND email AND Discord simultaneously. Design your routing by urgency:

- **Immediate action** (relevance 85+): Slack DM or Discord with @mention
- **Daily review** (relevance 70-84): Email digest
- **Weekly audit** (relevance below 70): CSV export review

### CRM sync pattern

CatchIntent's CRM integrations are one-click push, not continuous sync. The workflow:
1. Signal appears in dashboard with enrichment data
2. User reviews and clicks "Push to CRM"
3. Contact/lead created in CRM with signal context

For automated push, use webhooks (Pro+) to build your own pipeline.

### MCP server interaction pattern

The MCP server exposes CatchIntent's data through natural language queries. No endpoint documentation is published — the server handles query interpretation internally via OAuth session.
