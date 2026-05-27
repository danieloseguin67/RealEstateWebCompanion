# Leadverse Platform Reference

## Overview

Leadverse is an AI-powered social lead generation tool that scans Reddit, X (Twitter), and LinkedIn for people publicly discussing problems your product solves. It scores matches by relevance to your product description and suggests AI-drafted replies. Target audience: founders, freelancers, and lean B2B teams selling into communities where prospects ask publicly.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| AI keyword generator | Suggests search phrases from product description | UI-only |
| Lead scoring | Ranks posts by relevance to your offering | UI-only |
| AI reply suggestions | Drafts outreach messages for discovered leads | UI-only |
| Competitor analysis | Tracks competitor mentions across platforms | UI-only |
| Slack alerts | Real-time notifications for new leads | Slack integration |
| Email alerts | Digest or real-time email notifications | Email integration |
| Date range search | Historical prospecting with adjustable window | UI-only |

**No public API. No webhooks. No Zapier/Make/MCP.** Leadverse is entirely UI-driven with Slack and email as the only external notification channels.

## Pricing, limits & plan gates

*Best-effort from research — verify current pricing at leadverse.ai*

| Feature | Explorer ($19/mo) | Founder ($29/mo) | Business ($39/mo) |
|---|---|---|---|
| **Platforms** | Reddit only | Reddit + X | Reddit + X + LinkedIn |
| **Real-time alerts** | Unclear (may be limited) | Yes (Slack + email) | Yes (Slack + email) |
| **AI replies** | Unclear | 300 auto-replies/mo | Full access |
| **Team access** | No | No | Yes |
| **Competitor analysis** | Basic | Yes | Yes |

- **7-day free trial**, no credit card required
- Exact keyword limits per plan not publicly documented
- No annual discount documented

## Integrations

| Integration | Direction | Details |
|---|---|---|
| Slack | Leadverse → Slack | Push notifications for new leads |
| Email | Leadverse → Email | Digest or real-time alerts |

**No CRM connectors.** No Salesforce, HubSpot, Pipedrive, or any CRM integration. No webhooks for middleware (Zapier/Make/n8n).

**Workaround for CRM sync:** Slack alert → Zapier trigger on Slack message → parse lead text → create CRM contact. This is lossy — you get alert text, not structured lead data (no JSON payload with lead details, scores, or source URLs).

## Data model

<!-- Constructed from UI research — no API, verify against live product -->

```json
{
  "lead": {
    "platform": "reddit",
    "post_url": "https://reddit.com/r/SaaS/comments/...",
    "post_title": "Looking for a project management tool",
    "post_body": "We need something simpler than Jira...",
    "relevance_score": 0.85,
    "keyword_matched": "alternative to Jira",
    "author": "u/example_user",
    "subreddit": "r/SaaS",
    "posted_at": "2026-05-05T14:30:00Z",
    "ai_reply_suggestion": "Have you looked at [product]? It's designed for..."
  }
}
```

*Note: This is a representative shape based on research — Leadverse has no API, so field names and structure are inferred from UI descriptions.*

## Quick-start recipes

### Recipe 1: Set up Reddit monitoring for a SaaS product

**Trigger:** You just launched and want to find Reddit threads where people ask for your type of product.

**Steps:**
1. Sign up for Explorer ($19/mo) or start free trial
2. Describe your product in the setup wizard — be specific about what problem it solves
3. Review AI-generated keywords — keep buyer-intent phrases, remove generic topic words
4. Add manual keywords: `"alternative to [competitor]"`, `"looking for [category]"`, `"recommend [category]"`
5. Connect Slack workspace and select notification channel
6. Set date range to 30 days for initial sweep, then narrow to 7 days for ongoing

**Gotchas:**
- Default 7-day window misses older but still-active threads — extend manually
- AI keyword generator tends toward topical keywords, not buyer-intent phrases — always add intent modifiers

### Recipe 2: Use Slack alerts as a makeshift CRM pipeline

**Trigger:** You want leads from Leadverse to appear in a structured system, but there's no API.

**Steps:**
1. Create a dedicated Slack channel (e.g., `#leadverse-leads`)
2. Connect Leadverse to push alerts to this channel
3. Set up a Zapier/Make zap: Trigger = New message in Slack channel
4. Parse the Slack message text for platform, post URL, and keyword
5. Create a CRM contact (HubSpot, Pipedrive, etc.) with parsed fields
6. Add a note with the original post URL and Leadverse context

**Gotchas:**
- Slack message format may change without notice — build parsing with fallback handling
- You won't get structured data (score, author, subreddit) — only the alert text
- Rate limit: if Leadverse sends many alerts quickly, Zapier may batch them

### Recipe 3: Competitor monitoring setup

**Trigger:** You want to track when people discuss your competitors and potentially want alternatives.

**Steps:**
1. Add competitor names as keywords: `"[Competitor A]"`, `"[Competitor B]"`
2. Add switching-intent phrases: `"switch from [Competitor]"`, `"[Competitor] alternative"`, `"leaving [Competitor]"`
3. Review leads daily — competitor-mention leads often have the highest conversion potential
4. Use AI reply suggestions as a starting point, but customize with specific differentiators

## Integration patterns

### Slack-based notification routing

Since Leadverse has no webhooks or API, Slack is the primary integration surface:

```
Leadverse → Slack channel → Zapier/Make → CRM/Spreadsheet/Notion
```

**Setup:**
1. Leadverse: Settings → Integrations → Connect Slack → Select channel
2. Zapier: Trigger = "New Message in Channel" → Filter for Leadverse messages → Action = Create CRM record

**Limitations:**
- No structured payload — parsing depends on Leadverse's alert message format
- No way to mark leads as "contacted" in Leadverse from external tools
- No bidirectional sync — CRM status doesn't flow back to Leadverse

### Manual export workflow

For teams needing periodic data export:
1. Review leads in Leadverse dashboard
2. Copy relevant lead details (URL, platform, context)
3. Paste into spreadsheet or CRM manually
4. No bulk export feature documented

## Comparison with similar tools

| Feature | Leadverse | ParseStream | Prems AI | CatchIntent |
|---|---|---|---|---|
| **Platforms** | Reddit, X, LinkedIn | Reddit, X, LinkedIn, Quora, HN | 15 platforms | Reddit, X, HN, Bluesky, LinkedIn |
| **Pricing** | $19-39/mo | ~$29-79/mo | $49/mo | $49-69/mo |
| **AI scoring** | Relevance-based | Binary filtering | Intent 0-100 | Relevance 0-100 |
| **AI replies** | Yes (suggestions) | Yes (drafts + auto-reply) | Yes (AI Pitcher) | Yes (suggestions) |
| **API** | No | No | No (webhooks only) | Yes (REST + MCP) |
| **Slack** | Yes | No | Yes | Yes |
| **CRM integration** | No | No | No | Yes (HubSpot, Pipedrive, Close) |
| **Auto-reply** | No | Yes (Reddit OAuth) | No | No |
| **Free trial** | 7 days | Unknown | Yes (no CC) | Yes |

**Choose Leadverse when:** You want the simplest, cheapest multi-platform lead finder ($19/mo for Reddit, $29 for Reddit+X) with AI keyword generation and don't need API access, structured intent scoring, or CRM integration.

**Choose alternatives when:** You need API/webhook access (CatchIntent), widest platform coverage (Prems — 15 platforms), auto-reply (ParseStream), or structured intent scoring (CatchIntent, Prems).
