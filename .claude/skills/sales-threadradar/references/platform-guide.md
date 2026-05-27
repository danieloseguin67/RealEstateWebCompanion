# ThreadRadar Platform Reference

## Overview

ThreadRadar monitors Reddit and Quora discussions in real-time, alerting users when keyword-matched threads appear and drafting AI-powered replies based on configured tone and talking points. Target audience: indie hackers, startup founders, and social media managers who want to engage in relevant conversations without constant manual monitoring.

## Capabilities & automation surface

| Capability | Description | Automation |
|---|---|---|
| Keyword monitoring | Track up to 10-50 keywords across Reddit and Quora | UI-only |
| Real-time alerts | Email notifications when matching threads are found | Email-only (no Slack/webhook) |
| AI reply drafting | Generates personalized reply suggestions based on tone + talking points | UI-only |
| Dashboard | Live feed of matched threads with status tracking | UI-only |
| Multi-project | Separate keyword sets and talking points per project (Pro only) | UI-only |

**No public API. No webhooks. No Zapier/Make/MCP.** ThreadRadar is entirely browser-based with email alerts as the only outbound notification.

## Pricing, limits & plan gates

| Feature | Basic ($19.95/mo) | Pro ($39.95/mo) |
|---|---|---|
| Keywords | 10 | 50 |
| AI-suggested replies | 100/mo | 500/mo |
| Projects | 1 | 3 |
| Email notifications | Yes | Yes + real-time delivery |
| Priority support | No | Yes |
| Annual discount | $199/yr (~$16.58/mo) | $399/yr (~$33.25/mo) |

- **Free trial**: 7 days, no credit card required
- **No overage options** — when you hit AI reply limits, you wait until next billing cycle
- **No API on any plan** — there's no paid add-on to unlock programmatic access

## Integrations

ThreadRadar has **no integrations**:
- No CRM connectors
- No Slack/Discord/Teams alerts
- No Zapier/Make/n8n triggers
- No webhooks
- No API
- No MCP server
- No data export (beyond manual copy)

The only notification channel is email. To route ThreadRadar alerts elsewhere, you'd need an email-parsing workflow (e.g., Gmail filter → Zapier email trigger → Slack).

**Workaround for Slack alerts:** Set up a Gmail filter matching ThreadRadar alert emails, then use Zapier's "New Email Matching Search" trigger to forward to a Slack channel.

## Data model

ThreadRadar doesn't expose a data model (no API). The UI presents:

```json
// Conceptual — not from an API
{
  "thread": {
    "title": "Best invoicing tool for freelancers?",
    "url": "https://reddit.com/r/freelance/comments/...",
    "platform": "reddit",
    "subreddit": "r/freelance",
    "matched_keyword": "invoicing tool",
    "discovered_at": "2026-05-05T10:23:00Z"
  },
  "ai_reply": {
    "draft": "I've been freelancing for 3 years and...",
    "tone": "casual",
    "talking_points": ["handles recurring invoices", "free tier available"]
  }
}
```
<!-- Constructed from UI observation — no API exists -->

## Quick-start recipes

### Recipe 1: Set up lead generation monitoring

**Trigger:** You want to find Reddit threads where people ask for tools like yours.

**Steps:**
1. Create a project named after your product
2. Set talking points: 3-5 unique value props (specific, not generic)
3. Set tone to match your target subreddits (casual for r/startups, technical for r/selfhosted)
4. Add keywords:
   - Intent phrases: "best [category] tool", "looking for [category]", "[category] recommendation"
   - Competitor names: "alternative to [competitor]", "[competitor] vs"
   - Pain points: "[problem your product solves]"
5. Monitor email alerts, review AI drafts, personalize, and post manually

**Gotchas:**
- Start with 5 keywords, review results for 3 days, then add more
- Generic keywords like "tool" or "software" will flood your inbox
- AI reply limit (100/mo on Basic) means you can't draft replies for every match

### Recipe 2: Competitor monitoring

**Trigger:** You want to know what people say about competitors on Reddit.

**Steps:**
1. Create a project (or use keywords within your existing project)
2. Add competitor brand names as keywords (exact match in quotes if possible)
3. Add "[competitor] alternative", "[competitor] problems", "[competitor] pricing"
4. Review threads where people complain about competitors — these are engagement opportunities
5. Draft replies that address the specific pain point (don't just pitch your product)

**Gotchas:**
- Don't use AI replies that directly trash competitors — Redditors hate obvious marketing
- Focus on threads where someone has a problem you genuinely solve
- Track which competitor complaints come up most to inform your positioning

### Recipe 3: Email-to-Slack bridge (workaround)

**Trigger:** You want ThreadRadar alerts in Slack, not email.

**Steps:**
1. In Gmail, create a filter: `from:threadradar.com` → apply label "ThreadRadar"
2. In Zapier, create a Zap:
   - Trigger: Gmail → "New Email Matching Search" → search: `from:threadradar.com`
   - Action: Slack → "Send Channel Message" → format: subject + link
3. Test by adding a high-frequency keyword to trigger an alert quickly

**Gotchas:**
- Zapier free tier checks every 15 minutes — not truly real-time
- Gmail API has a slight delay — total latency: ThreadRadar detection + email delivery + Zapier poll = potentially 20-30 minutes
- For true real-time Slack alerts, consider Syften or Octolens which have native Slack integration

## Integration patterns

### Email parsing pattern (only available integration)

Since ThreadRadar only outputs email alerts, the only integration pattern is:

1. **Email → Automation platform** — Use Zapier/Make email triggers to parse ThreadRadar alerts
2. **Email → CRM** — Forward alerts to a CRM inbox for tracking (manual)
3. **Email → Spreadsheet** — Parse alert emails into Google Sheets for reporting

This is fragile — if ThreadRadar changes their email format, parsing breaks. There's no stable programmatic interface.

## ThreadRadar vs KeyMentions comparison

| Feature | ThreadRadar | KeyMentions |
|---|---|---|
| Platforms | Reddit + Quora | Reddit only |
| AI replies | Draft only (manual post) | Draft + auto-publish option |
| Keywords | 10-50 | 3-35 |
| Starting price | $19.95/mo | Free (3 keywords) |
| Auto-publish | No | Yes (with ban risk) |
| API/webhooks | No | No |
| Projects | 1-3 | Multi-project on Pro+ |
| Reply limit | 100-500/mo | 30-400/mo |
| Ban risk | Lower (manual posting) | Higher (auto-publish) |

**Choose ThreadRadar when:** You want Reddit + Quora coverage, prefer the safety of manual posting, and want more keywords at the base tier.

**Choose KeyMentions when:** You want auto-publish capability (accepting the ban risk), need a free tier to test, or want virality filtering to catch trending threads.
