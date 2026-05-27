# Leedlime Platform Reference

## Overview

Leedlime is a Reddit lead generation tool that monitors conversations 24/7, scores them for buying intent using AI, and surfaces warm leads with reply suggestions. Differentiator: credit-based pay-per-lead pricing (no monthly subscription), making it low-risk for early-stage founders testing Reddit as a channel.

## Capabilities & automation surface

| Capability | Access | Notes |
|---|---|---|
| Reddit monitoring | UI + Slack/Discord alerts | 24/7 scanning, keyword-based |
| AI intent scoring | UI-only | Scores leads by buying signals |
| Lead management | UI-only | Status: contacted/interested/converted |
| AI reply suggestions | UI-only | Brand voice-aware drafts |
| Competitor alerts | UI + Slack/Discord | Up to 3 competitor URLs |
| CSV/Excel export | UI-only | Manual bulk export |
| Chrome extension | Browser | Quick actions from Reddit |
| Slack/Discord notifications | Push only | No bidirectional — alerts only, no commands |
| CRM integration | **Not confirmed** | Schema mentions HubSpot/Salesforce/Zapier/Clay but no documentation |

**No public API. No webhooks. No MCP server. No Zapier/Make modules confirmed.**

## Pricing, limits & plan gates

Credit-based model — 1 credit = 1 lead surfaced.

| Tier | Credits | Price | Per-Lead Cost | Team access |
|---|---|---|---|---|
| Starter | 100 | $20 one-time | $0.20 | No |
| Pro | 200 | $29 one-time | $0.15 | Yes |
| Growth | 800 | $79 one-time | $0.09 | Yes |

- **7-day free trial** (no credit card required)
- All tiers include: Reddit monitoring, competitor tracking, CSV export, custom keywords, real-time alerts
- Credits are one-time purchases (not recurring subscription)
- No documented rate limits or throttling — leads are delivered as discovered

**Cost comparison context:**
- Leadlee: $12/mo unlimited monitoring + 30 AI replies
- Bazzly: $19-99/mo with credit packs
- Subreddit Signals: $49-149/mo with lead tokens
- Leedlime advantage: no ongoing cost, pay only when you need leads

## Integrations

**Data flows OUT of Leedlime:**
- Slack notifications (lead alerts, competitor mentions)
- Discord notifications (same as Slack)
- CSV/Excel export (manual, bulk)

**Data flows INTO Leedlime:**
- Website URL (for AI to understand your product)
- Competitor URLs (up to 3, for positioning context)
- Custom keywords

**No bidirectional integrations confirmed.** The platform operates as a standalone monitoring + lead dashboard.

### CRM sync workaround

Since no API exists:
1. Export leads as CSV from Leedlime dashboard
2. Import to CRM (HubSpot, Salesforce, Pipedrive all support CSV import)
3. Automate with file-watching: export to Google Drive → Zapier watches folder → imports new rows to CRM

## Data model

<!-- Constructed from UI observation — verify against live product -->

```json
{
  "lead": {
    "id": "lead_abc123",
    "reddit_post_url": "https://reddit.com/r/SaaS/comments/...",
    "subreddit": "r/SaaS",
    "title": "Looking for a tool that does X",
    "intent_score": 85,
    "status": "new",
    "keywords_matched": ["tool recommendation", "SaaS"],
    "competitor_mentioned": "CompetitorName",
    "ai_reply_draft": "Based on what you're describing...",
    "discovered_at": "2026-05-10T14:30:00Z",
    "contacted_at": null,
    "notes": ""
  }
}
```

**Lead statuses:** new → contacted → interested → converted (or dismissed)

## Quick-start recipes

### Recipe 1: Optimize keyword setup for high-intent leads

**Goal:** Reduce irrelevant leads and conserve credits.

**Steps:**
1. Connect your product URL — ensure the landing page clearly describes what you do
2. Add 3 competitor URLs (direct competitors in same category)
3. Start with specific keywords:
   - Good: "looking for [your category] tool", "alternative to [competitor]", "[specific pain point] solution"
   - Bad: broad category names like "marketing", "automation", "SaaS"
4. Monitor first 10-20 leads — if >50% are irrelevant, tighten keywords
5. Remove keywords that consistently surface noise

### Recipe 2: Lead-to-CRM workflow (manual)

**Goal:** Get Leedlime leads into your CRM without an API.

**Steps:**
1. Set up Slack/Discord alerts for immediate notification
2. When you accumulate 20+ leads, export CSV from dashboard
3. Map CSV columns to CRM fields:
   - `reddit_post_url` → CRM "Source URL" field
   - `intent_score` → CRM "Lead Score" field
   - `status` → CRM "Stage" field
4. Import CSV to CRM (weekly cadence recommended)
5. For real-time: upload CSV to Google Drive → set up Zapier "New File in Folder" trigger → parse CSV → create CRM contacts

### Recipe 3: Reply strategy for Reddit engagement

**Goal:** Convert leads without getting banned or downvoted.

**Steps:**
1. Review AI-generated reply draft — never post verbatim
2. Check the subreddit rules (some ban self-promotion entirely)
3. Rewrite draft to:
   - Lead with helpful context/experience (2-3 sentences)
   - Mention your product naturally only if directly relevant
   - Include a disclaimer if the subreddit requires it
4. Build karma in target subreddits BEFORE promoting (comment helpfully for 1-2 weeks)
5. Mark lead as "contacted" in Leedlime after posting
6. Check back in 24-48h for responses, mark as "interested" if engagement

## Integration patterns

### Notification-based workflow (only available pattern)

```
Leedlime detects high-intent post
  → Slack/Discord notification fires
  → You review in Leedlime dashboard
  → Craft reply (using AI draft as starting point)
  → Post on Reddit manually
  → Update lead status in dashboard
  → Periodic CSV export to CRM
```

**Limitations:**
- No webhook payload — you can't parse notification content programmatically
- No status update API — all tracking is manual in the dashboard
- No bulk actions via automation — one lead at a time in the UI
