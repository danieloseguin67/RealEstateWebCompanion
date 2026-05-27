# Buska Platform Reference

## Overview

Buska is a social listening platform built for lead generation, not brand reputation tracking. It monitors 30+ platforms for buying intent signals, AI-scores each mention from 0-100, matches leads against your Ideal Customer Profile (ICP), and delivers qualified prospects ready for outreach. Differentiator: widest platform coverage of any intent-focused listening tool (30+ sources including Reddit, X, LinkedIn, HN, Product Hunt, YouTube, TikTok, Facebook, Instagram, G2, Capterra, Trustpilot, Medium, Quora, GitHub, Discord, Telegram).

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Keyword monitoring** | Track keywords across 30+ platforms with deduplication | All plans (16-33+ sources by tier) |
| **AI intent scoring** | 0-100 buying intent score per mention (5 types: active demand, competitor mentions, pain signals, questions, brand mentions) | All plans |
| **ICP matching** | Filter leads by industry, company size, role, and custom criteria | All plans (2-10 profiles by tier) |
| **Reply Studio** | AI-generated contextual replies with tone presets (Peer, Expert, Thought Leader) | Growth+ |
| **Prospect Finder** | Enrichment searches for contact data on qualified leads | Growth (20/mo), Scale (250/mo) |
| **Slack/Discord/Teams** | Real-time lead notifications to team channels | All plans |
| **Webhooks** | JSON POST to custom URL on each qualified lead | Growth+ |
| **REST API** | Programmatic access to leads, keywords, and actions | Growth (500 req/mo), Scale (2,500 req/mo) |
| **MCP server** | AI agent integration — query leads, trigger scans, act on signals autonomously | Scale (details on buska.io) |
| **CRM connectors** | Native HubSpot, Salesforce, Pipedrive integration | Growth+ |
| **Outreach connectors** | Native Lemlist, Apollo, Instantly, La Growth Machine integration | Growth+ |
| **CSV export** | Export lead lists for offline analysis or import | Growth+ |
| **Reports & analytics** | Lead volume trends, intent breakdowns, keyword performance | Scale |

## Pricing, limits & plan gates

| Feature | Starter $49/mo | Growth $99/mo | Scale $249/mo | Agency (custom) |
|---|---|---|---|---|
| Keywords | 3 | 10 | 30 | Unlimited |
| Leads/week | 50 | 150 | Unlimited | Unlimited |
| ICP profiles | 2 | 5 | 10 | Custom |
| Platform sources | 16+ | 28+ | 33+ | All |
| Reply Studio | No | Yes | Yes | Yes |
| Prospect Finder | No | 20 searches/mo | 250 searches/mo | Custom |
| Webhooks | No | Yes | Yes | Yes |
| REST API | No | 500 req/mo | 2,500 req/mo | Custom |
| MCP server | No | No | Yes | Yes |
| CRM connectors | No | Yes | Yes | Yes |
| CSV export | No | Yes | Yes | Yes |
| Reports & analytics | No | No | Yes | Yes |
| Automations | 1 | 5 | Unlimited | Unlimited |

All plans include 7-day free trial (no credit card required).

**Plan gate warning:** If you need programmatic access (API or webhooks), you must be on Growth ($99/mo) or higher. Starter is monitoring + notifications only.

## Integrations

- **CRM**: HubSpot, Salesforce, Pipedrive (native connectors, Growth+)
- **Outreach**: Lemlist, Apollo, Instantly, La Growth Machine (native connectors, Growth+)
- **Notifications**: Slack, Discord, Microsoft Teams (all plans)
- **Automation**: Clay, Airtable, Notion, Make, n8n (via webhooks, Growth+)
- **AI agents**: MCP server for Claude, Cursor, and other MCP-compatible agents (Scale)
- **Webhooks**: JSON POST to any endpoint on each qualified lead (Growth+)
- **REST API**: Programmatic access to leads and keyword management (Growth+)
- **No native Zapier app.** Use webhooks to trigger Zapier Catch Hook workflows.

Data flow: Buska monitors platforms → scores mentions → pushes qualified leads out via notifications/webhooks/API.

## Intent scoring model

Buska's AI classifies every mention into one of 5 intent types:

| Intent type | Description | Example |
|---|---|---|
| **Active demand** | User explicitly looking for a product/solution | "Looking for a tool that can track Reddit mentions" |
| **Competitor mention** | User discussing or comparing a competitor | "We switched from Brand24 to something cheaper" |
| **Pain signal** | User expressing frustration with a problem you solve | "Our social monitoring misses half the mentions" |
| **Question** | User asking about a topic related to your product | "How do people track what's being said about their brand?" |
| **Brand mention** | Direct mention of your brand or product | "Has anyone used Buska for lead gen?" |

Each mention gets a 0-100 score combining intent type, relevance to ICP, and contextual signals. Recommended thresholds:
- **70-100**: High intent — engage immediately
- **40-69**: Medium intent — review and qualify manually
- **0-39**: Low intent — usually noise, batch review weekly

## ICP configuration

Effective ICP profiles are specific. Example for a B2B SaaS selling to marketing teams:

- **Industry**: SaaS, Technology, Digital Marketing
- **Company size**: 10-500 employees
- **Role**: Marketing Manager, Head of Growth, CMO
- **Pain points**: "social listening too expensive", "can't track Reddit mentions", "missing competitor conversations"

Tips:
- Create separate ICP profiles for different buyer personas
- Start broad, then tighten based on lead quality feedback
- Use the "pain points" field to boost intent scoring accuracy

## Reply Studio

AI-generated replies with 3 tone presets:

| Preset | When to use | Style |
|---|---|---|
| **Peer** | Reddit, HN, community forums | Casual, helpful, no product pitch |
| **Expert** | LinkedIn, professional forums | Authoritative, data-backed, subtle mention |
| **Thought Leader** | Twitter/X, LinkedIn posts | Opinionated, forward-looking, brand-building |

Best practices:
- Always review and edit before posting — AI drafts are starting points
- Lead with value (solve the user's problem first)
- Check subreddit/community rules for self-promotion policies
- On Reddit: never open with your product name, build context first
- Customize the AI context field with your product's key differentiators

## Quick-start recipes

### Recipe 1: Monitor competitor mentions and export to CRM (Python + webhook)

Set up a webhook endpoint that receives Buska leads and pushes competitor-mention leads to HubSpot:

```python
# Receive Buska webhook and create HubSpot contact
from flask import Flask, request
import requests

app = Flask(__name__)

HUBSPOT_TOKEN = "your-hubspot-token"

@app.route("/buska-webhook", methods=["POST"])
def handle_lead():
    lead = request.json
    # Only process competitor mentions with high intent
    if lead.get("intent_type") == "competitor_mention" and lead.get("intent_score", 0) >= 60:
        # Create HubSpot contact
        requests.post(
            "https://api.hubapi.com/crm/v3/objects/contacts",
            headers={"Authorization": f"Bearer {HUBSPOT_TOKEN}", "Content-Type": "application/json"},
            json={
                "properties": {
                    "firstname": lead.get("author_name", "Unknown"),
                    "lifecyclestage": "lead",
                    "hs_lead_status": "NEW",
                    "notes_last_contacted": f"Buska: {lead.get('platform')} — {lead.get('mention_url')}"
                }
            }
        )
    return {"status": "ok"}, 200
```

### Recipe 2: Daily lead digest to Slack via n8n

1. Create an n8n workflow with a Webhook trigger node
2. Point Buska webhook URL to your n8n webhook endpoint
3. Add a Filter node: `intent_score >= 50`
4. Add a Batch node: collect leads for 24 hours
5. Add a Slack node: format as a daily digest with lead count, top platforms, and highest-intent mentions
6. Schedule: runs daily at 9 AM

### Recipe 3: Feed Buska leads to Clay for enrichment

1. Set up Buska webhook → Clay webhook ingest
2. Map fields: author name, platform, mention URL, intent score
3. Clay enriches with: company data, email, LinkedIn profile, tech stack
4. Filter: only rows where email was found AND intent score > 60
5. Export enriched leads to your outreach tool (Lemlist, Apollo, Instantly)

## Affiliate program

- **Commission**: 20% recurring on every subscription payment, lifetime of customer
- **Cookie**: 60-day attribution window
- **Payout**: Monthly via PayPal or bank transfer, $50 minimum
- **Sign-up**: buskaio-27be.endorsely.com
- **Eligibility**: No need to be a paying customer
