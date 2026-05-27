# Devi AI Platform Reference

## Overview

Devi AI is a Chrome browser extension that monitors social media platforms for keyword mentions, detects buying intent using LLMs, and generates AI-powered outreach messages. Targeted at solopreneurs, small businesses, and agencies who want to find leads from social conversations without manual monitoring.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **LeadsAI** | Keyword monitoring across Facebook groups, LinkedIn, X, Reddit, WhatsApp, Telegram, Nextdoor, Bluesky, Threads | UI-only (Chrome extension) — no API |
| **Intent Detection** | AI (LLM-based) reads posts and classifies buying intent, complaints, information seeking, and spam | UI-only |
| **OutreachAI** | ChatGPT-powered comment and message draft generation, customizable prompts | UI-only — ChatGPT API calls capped per plan |
| **ScheduleAI** | Content scheduling across Facebook groups/pages, X, LinkedIn | UI-only |
| **NewsAI** | Converts industry news into social posts with AI-generated visuals | UI-only |
| **Webhooks** | Push lead notifications to external endpoints | Webhook-accessible (Settings > Webhook) |
| **Influencer Detection** | Identifies influencers and C-level executives in monitored conversations | UI-only |

## Pricing, limits & plan gates

<!-- Best-effort from research — verify against current pricing page -->

| Feature | Monthly ($49/mo) | Annual ($49/mo - 2 months free) |
|---|---|---|
| **Trial** | $1 for 10 days | No trial (100% anytime refund) |
| **Groups included** | 25 | 25 |
| **Additional groups** | $2/group/mo | $2/group/mo (50% discount on add-on platforms) |
| **ChatGPT API calls** | 250/mo | 1,000/mo |
| **Webhooks** | Yes | Yes |
| **Content scheduling** | Yes | Yes |
| **AI visual content** | Yes | Yes |
| **Free AI websites** | 3 (with hosting + lead collection) | 3 |

**Platforms monitored:** Facebook groups (public/private, must be member), LinkedIn, X, Reddit, Nextdoor, WhatsApp, Telegram, Bluesky, Threads, news/blogs.

**Key limits:**
- 25 groups base, $2 each additional (Facebook, WhatsApp, Reddit, Telegram)
- ChatGPT API calls reset monthly — once exhausted, no AI drafts until next cycle
- Chrome must be running for monitoring to work (browser extension, not server-side)

## Integrations

| Integration | Type | Direction | Notes |
|---|---|---|---|
| **Webhooks** | Native | Devi → External | Settings > Webhook. Push lead notifications. No documented payload schema. |
| **ChatGPT** | Built-in | Internal | Powers OutreachAI drafts. Calls capped per plan. |
| **Social posting** | Native | Devi → Facebook/X/LinkedIn | One-click scheduling to connected profiles. |
| **Zapier** | Not available | — | No Zapier integration |
| **Make** | Not available | — | No Make integration |
| **REST API** | Not available | — | No public REST API |
| **MCP** | Not available | — | No MCP server |

**Workaround for automation:** Use webhooks with a middleware (n8n, Make webhook trigger, or custom endpoint) to route Devi leads to CRM, Slack, or other tools. The webhook fires when new leads are detected — connect a webhook relay to transform and forward the payload.

## Data model

Devi doesn't expose a formal data model via API. Based on the extension UI, leads contain:

```json
<!-- Constructed from UI observation — verify against live webhook payload -->
{
  "platform": "facebook_group | linkedin | twitter | reddit | whatsapp | telegram",
  "keyword_matched": "project management tool",
  "post_content": "Looking for a good project management tool for a 5-person team...",
  "post_url": "https://facebook.com/groups/...",
  "author": "User display name",
  "intent": "buying_intent | complaint | information_seeking | spam",
  "detected_at": "2026-05-06T10:30:00Z",
  "group_name": "SaaS Founders"
}
```

## Quick-start recipes

### Recipe 1: Set up Facebook group monitoring for lead generation

**Trigger:** You want to find people asking for product recommendations in Facebook groups.

**Steps:**
1. Install Devi Chrome extension from Chrome Web Store
2. Sign in and complete onboarding
3. Add Facebook groups you're a member of (paste group URLs)
4. Add keywords: product category terms + buying signals
5. Start monitoring — Devi scans groups while Chrome is open

**Keywords to start with:**
```
"looking for", "any recommendations", "best tool for",
"which [category] do you use", "alternative to [competitor]"
```

**Gotchas:**
- Must be a member of private groups before adding them
- Start with 5-10 groups max — validate lead quality before scaling
- Chrome must stay open and extension must be enabled

### Recipe 2: Push Devi leads to Slack via webhook

**Trigger:** You want real-time Slack notifications when Devi finds a high-intent lead.

**Steps:**
1. Create a Slack Incoming Webhook URL (Slack > Settings > Incoming Webhooks)
2. In Devi extension: Settings > Webhook > paste the Slack webhook URL
3. Devi pushes lead data to Slack when new matches are found

**Alternative with n8n (for CRM routing):**
1. Create an n8n webhook trigger node
2. Copy the n8n webhook URL into Devi Settings > Webhook
3. Add transformation nodes in n8n to map Devi payload to your CRM schema
4. Connect to CRM node (HubSpot, Pipedrive, etc.)

**Gotchas:**
- Webhook payload schema isn't publicly documented — inspect the first payload to map fields
- No retry mechanism documented — if your endpoint is down, leads may be missed
- Cannot filter which leads trigger the webhook — all matches fire

### Recipe 3: Monitor LinkedIn for competitor mentions

**Trigger:** You want to find people complaining about or asking for alternatives to a competitor.

**Steps:**
1. Add keywords: `"[competitor name]" problems`, `"alternative to [competitor]"`, `"switching from [competitor]"`
2. Set LinkedIn as one of your monitored platforms
3. Enable intent detection to filter for complaint and information-seeking intent
4. When high-intent leads appear, use OutreachAI to draft a contextual response
5. Review and personalize the draft before sending

**Gotchas:**
- LinkedIn monitoring covers global posts filtered by location/network — not private messages
- AI drafts need heavy customization for LinkedIn's professional tone
- Don't auto-send — LinkedIn's spam detection is aggressive

## Integration patterns

### Webhook listener pattern

Devi's webhook is the only programmatic interface. Architecture:

```
Devi (Chrome extension)
  → Webhook POST to your endpoint
    → Middleware (n8n / Make webhook / custom server)
      → CRM (create/update contact)
      → Slack (notification)
      → Email (alert to sales team)
```

**Setup:**
1. Deploy a webhook receiver (n8n self-hosted, webhook.site for testing, or custom endpoint)
2. Configure in Devi Settings > Webhook
3. Inspect the first payload to understand the schema
4. Build transformation logic in your middleware
5. Route to downstream tools

**Limitations:**
- No webhook authentication documented (no HMAC signature verification)
- No retry/backoff — if endpoint is unreachable, data may be lost
- No filtering — all detected leads trigger the webhook
- Cannot send data back to Devi (one-way only)
