# Redreach Platform Reference

## Overview

Redreach is an AI-powered Reddit lead generation tool that auto-discovers keywords from your website and competitors, monitors Reddit for relevant conversations, detects Google-ranking threads, and provides AI reply suggestions. It also offers an Outbound Chrome extension for Reddit DM automation. Reddit-only — no other platforms.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| AI keyword discovery | Analyzes your website and top 3 competitors to generate keywords automatically | UI-only |
| Reddit monitoring | Tracks keywords across Reddit in near real-time | UI-only |
| Relevance scoring | AI scores each post for business relevance | UI-only |
| Google-ranking post detection | Identifies Reddit threads that rank on Google for your keywords (SEO opportunities) | UI-only |
| AI reply suggestions | Generates contextual reply drafts for each matched post | UI-only |
| One-click Reddit replies | Opens Reddit with pre-filled reply from AI suggestion | UI-only (opens Reddit) |
| Competitor monitoring | Tracks competitor brand mentions across Reddit | UI-only |
| Brand mention tracking | Monitors your own brand mentions | UI-only |
| Post management | Save, organize, and track posts and comment history | UI-only |
| Outbound DM automation | Chrome extension for sending Reddit DMs at scale with anti-detection | Chrome extension only |
| Notification alerts | Push alerts via email, Slack, Telegram, webhooks | Push-only (no pull API) |

**No public REST API.** All lead data is accessible only through the Redreach dashboard. Webhook alerts push notifications but do not expose structured lead data for programmatic access.

## Pricing, limits & plan gates

*Best-effort — pricing pages are JS-rendered. Verify current pricing at redreach.ai.*

| Plan | Price | Seats | Key features |
|---|---|---|---|
| 3-day trial | $12 one-time | 1 | Full access for 3 days |
| Starter | ~$19/mo | 1 (owner) | AI keyword discovery, monitoring, AI replies, alerts |
| Growth | ~$29/mo | 2 (owner + 1) | Everything in Starter + team collaboration |
| Professional | Higher | 3 (owner + 2) | Everything in Growth + additional capacity |

- **48-hour money-back guarantee** after payment
- **Unlimited AI replies** on all plans (no token/credit limits reported)
- **Unlimited discovery** — no cap on keywords or subreddits tracked (per marketing claims)
- **Outbound DM limits** — Chrome extension has daily DM caps that vary by plan

## Integrations

| Integration | Type | Notes |
|---|---|---|
| Slack | Native push | Direct integration — connect in Redreach settings |
| Telegram | Native push | Alert notifications |
| Email | Native push | Alert notifications |
| Webhooks | Push endpoint | Custom URL for alert delivery — payload schema undocumented |
| Chrome extension | Browser plugin | Required for Outbound DM automation |

No Zapier, Make, or iPaaS integrations. No MCP server. No bidirectional data sync — all integrations are outbound push notifications only.

## Data model

Redreach does not expose a public API, so no formal data model is documented. Based on the UI and help center, the key objects are:

```json
// Post (inferred from dashboard)
<!-- Constructed from docs — verify against live UI -->
{
  "post_title": "Looking for a tool to automate X",
  "subreddit": "r/SaaS",
  "relevance_score": 85,
  "google_ranking": true,
  "author": "u/example_user",
  "created_at": "2026-05-06T14:30:00Z",
  "ai_reply_suggestion": "Great question! I've been using...",
  "status": "new",
  "source_type": "keyword_match"
}
```

```json
// Keyword (inferred from settings)
<!-- Constructed from docs — verify against live UI -->
{
  "keyword": "project management tool",
  "source": "auto_discovered",
  "active": true,
  "origin": "website_analysis"
}
```

## Quick-start recipes

### Recipe 1: Set up monitoring from scratch

**Trigger**: New Redreach account, want to find Reddit leads.

**Steps**:
1. Enter your website URL — Redreach analyzes it and auto-generates keywords
2. Add up to 3 competitor URLs for competitive keyword discovery
3. Review generated keywords — remove generic ones, add buying-intent phrases like "looking for", "recommend", "alternative to"
4. Configure excluded subreddits (remove off-topic communities)
5. Write a detailed company description in settings (this trains the AI)
6. Enable Slack/Telegram/email alerts

**Gotchas**: The auto-generated keyword list is only as good as your website copy. If your homepage is abstract or jargon-heavy, manually add keywords that match how your customers actually describe their problems.

### Recipe 2: Engage with Google-ranking Reddit threads

**Trigger**: Want to get visibility on Reddit threads that appear in Google search results.

**Steps**:
1. Enable the SEO/Google-ranking post detection feature
2. Review discovered threads — these are posts that rank on Google for terms related to your product
3. Use AI reply suggestions as a starting point
4. Personalize the reply: reference the specific question, add genuine value, mention your product naturally only if directly relevant
5. Post the reply directly on Reddit (one-click opens Reddit with pre-filled text)

**Gotchas**: SEO scan runs periodically (not real-time). Threads that rank on Google often have high engagement — a low-effort promotional reply will be downvoted. Invest time in genuinely helpful responses.

### Recipe 3: Set up competitor monitoring

**Trigger**: Want to track when competitors are mentioned on Reddit.

**Steps**:
1. Add competitor names as monitored keywords
2. Include common misspellings and abbreviations
3. Set up Slack alerts for competitor mentions
4. Review competitor threads for opportunities to position your product as an alternative
5. Use AI reply suggestions to draft helpful comparisons (not attacks)

**Gotchas**: Don't use competitor threads for aggressive self-promotion — Reddit communities react negatively. Focus on threads where someone is actively seeking alternatives.

## Integration patterns

### Alert-based workflow (only available pattern)

Since Redreach has no pull API, all integrations are alert-driven:

```
Redreach monitoring → Detects relevant post → Pushes alert to:
  → Slack channel (native)
  → Telegram bot (native)
  → Email inbox
  → Webhook endpoint (custom URL)
```

For CRM integration, the only path is:
1. Set up webhook alerts to a middleware (n8n, Make webhook trigger, custom server)
2. Parse the webhook payload (schema undocumented — test with webhook.site first)
3. Create/update records in your CRM from the parsed payload

This is fragile compared to platforms with documented REST APIs. If webhook payloads change, the integration breaks silently.

### Outbound DM workflow (Chrome extension)

```
1. Install Redreach Outbound Chrome extension
2. Identify target users from high-relevance posts in dashboard
3. Configure DM template with personalization tokens
4. Extension sends DMs through your Reddit account
5. Anti-detection measures throttle sending speed
```

**Risk**: Reddit's anti-spam systems actively detect automated DMs. Even with anti-detection, account bans are possible. Never use a primary account for DM outbound.
