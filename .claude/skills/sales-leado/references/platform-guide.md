# Leado Platform Reference

## Overview

Leado is an AI-powered Reddit lead generation tool that scans subreddits 24/7 to find high-intent prospects and generates contextual reply drafts. Built for B2B SaaS founders and solopreneurs who want to find people actively seeking solutions on Reddit.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| AI Lead Discovery | Scans Reddit discussions for people seeking solutions matching your product | UI-only |
| Opportunity Scoring | 0-100 intent score with badges (High, Medium-High, Medium, Low-Medium, Low) | UI-only |
| AI Reply Generation | Contextual, human-like reply drafts based on thread context and your product | UI-only |
| Karma Builder | Generates genuine Reddit participation to build account credibility | UI-only (Pro: Advanced) |
| Viral Template Library | Proven post templates based on successful engagement patterns | UI-only (Pro only) |
| Compliance Engine | Checks replies against community guidelines before posting | UI-only |
| Google Indexing Check | Identifies Reddit posts indexed by Google (SEO visibility) | UI-only (Pro only) |
| Advanced Post Generation | AI-powered post creation for proactive Reddit marketing | UI-only (Pro only) |
| Competitor Mention Tracking | Monitors brand references across Reddit | UI-only |
| Notifications | Alerts via Slack, Discord, email, custom webhooks | Push (details undocumented) |

**No public API.** All lead management, reply generation, and analytics are UI-only. Notifications are the only outbound data channel, but webhook payload schema is undocumented.

## Pricing, limits & plan gates

| Feature | Free ($0/mo) | Pro ($29.99/mo) | Enterprise (custom) |
|---|---|---|---|
| Leads per month | 10 | Unlimited | Unlimited |
| Monitored subreddits | 10 | 15 | 30+ |
| Products analyzed | 1 | 1 | Custom (multiple) |
| AI-generated comments | Yes | Yes | Yes |
| Opportunity scoring | Yes | Yes | Yes |
| Google indexing check | No | Yes | Yes |
| Advanced Post Generation | No | Yes | Yes |
| Advanced Karma Builder | No | Yes | Yes |
| Viral Template Library | No | Yes | Yes |
| Support | Email | Priority (email + live chat) | Dedicated |

- Pro is listed at $29.99/mo (reduced from $39.99 — "limited offer")
- No credit card required for Free plan
- No team features — each subscription is tied to a single account
- Scan frequency: hourly (upgraded from every 2 hours in Dec 2025)

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| Slack | Push (alerts) | Lead notifications — setup details undocumented |
| Discord | Push (alerts) | Lead notifications — setup details undocumented |
| Email | Push (alerts) | Lead notifications |
| Custom webhooks | Push (alerts) | Claimed on homepage — payload schema undocumented |

**No Zapier, Make, or MCP integrations.** No CRM connectors. No bulk export. Leads are managed entirely within the Leado dashboard.

## Data model

Leado's data model is not exposed via API. Based on the UI:

<!-- Constructed from UI observation — verify against live platform -->
```json
{
  "lead": {
    "id": "lead_abc123",
    "reddit_post_url": "https://reddit.com/r/SaaS/comments/...",
    "subreddit": "SaaS",
    "title": "Looking for a tool to manage...",
    "opportunity_score": 85,
    "opportunity_badge": "High",
    "ai_reply_draft": "Great question! I've been using...",
    "discovered_at": "2026-05-10T14:30:00Z",
    "status": "new"
  },
  "product": {
    "name": "My SaaS Product",
    "url": "https://myproduct.com",
    "description": "Helps teams collaborate on...",
    "target_subreddits": ["SaaS", "startups", "smallbusiness"]
  }
}
```

## Quick-start recipes

### Recipe 1: Set up your first product for lead discovery

**Trigger:** You just signed up and want to start finding Reddit leads.

**Steps:**
1. Enter your product URL — Leado's AI analyzes your website
2. Review the auto-generated product description — edit to emphasize specific pain points you solve
3. Select 5-10 subreddits where your target audience asks questions
4. Wait for the next hourly scan to discover leads
5. Review opportunity scores and filter by High/Medium-High badges

**Gotchas:**
- The product description drives AI quality — vague descriptions produce irrelevant leads
- Start with 5 subreddits and expand once you validate lead quality
- Don't skip Karma Builder — engage genuinely before any promotional replies

### Recipe 2: Build karma before engaging leads

**Trigger:** You have a fresh Reddit account and want to start replying to leads safely.

**Steps:**
1. Enable Karma Builder in Leado settings
2. Select subreddits where you want to build credibility
3. Karma Builder generates question/comment suggestions for r/AskReddit and target subreddits
4. Post genuine, helpful responses daily for 1-2 weeks
5. Monitor your Reddit karma — aim for 100+ comment karma before any promotional engagement
6. Once established, start engaging leads with AI-assisted replies (always edited before posting)

**Gotchas:**
- Advanced Karma Builder (Pro only) provides better suggestions and tracks progress
- Reddit accounts under 30 days old face posting restrictions in many subreddits
- Don't mix karma building with promotional replies — keep them separate

### Recipe 3: Create a viral post using templates

**Trigger:** You want to proactively generate interest, not just reply to existing threads. (Pro only)

**Steps:**
1. Open the Viral Template Library
2. Browse templates categorized by engagement pattern (question posts, story posts, comparison posts)
3. Select a template matching your product category
4. Customize the template with your specific product angle and genuine experience
5. Use the compliance engine to check the post before publishing
6. Post during peak hours for your target subreddit (check subreddit analytics)

**Gotchas:**
- Templates are starting points, not copy-paste — heavily customize each one
- Overtly promotional posts get removed immediately in most subreddits
- The Google indexing check (Pro) helps identify which posts have SEO value

## Integration patterns

### Notification-based workflow (only available pattern)

Since Leado has no API, the only integration pattern is notification-driven:

1. **Configure Slack/Discord notifications** — get alerted when high-score leads appear
2. **Manual review in Leado dashboard** — assess lead, review AI draft
3. **Edit and post reply manually** — always customize AI drafts
4. **Track in your CRM manually** — copy lead details to your CRM/spreadsheet

For automation, consider supplementing Leado with a tool that has API access (RedShip, CatchIntent, Buska) for the same keywords, using Leado primarily for its AI reply quality and Karma Builder.
