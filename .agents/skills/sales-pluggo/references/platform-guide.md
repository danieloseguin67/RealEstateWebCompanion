# Pluggo Platform Reference

## Overview

Pluggo is an AI-powered social listening platform that monitors conversations across Reddit, X/Twitter, HN, Bluesky, Facebook, and LinkedIn, then delivers high-intent opportunities to Slack. Differentiator: automatic community discovery (no manual subreddit/channel setup) plus AI copilot that learns from Slack feedback. Consumer brands and B2B SaaS focus. Currently in maintenance mode — new signups paused.

## Capabilities & automation surface

| Capability | Access | Notes |
|---|---|---|
| Multi-platform monitoring | UI + Slack | Reddit, X, HN, Bluesky, Facebook, LinkedIn |
| Automatic community discovery | UI-only | AI finds relevant communities without manual setup |
| AI opportunity scoring | UI + Slack | Context, intent, and sentiment analysis |
| Smart reply templates | UI-only | Ready-to-use response suggestions, editable |
| AI copilot | UI + Slack | Learns from one-click Slack feedback |
| Custom analysis rules | UI-only | Set notification triggers (e.g., "only consumer brands") |
| Interactive research | UI-only | Exploratory research beyond initial keywords |
| Share of Voice calculator | UI-only | Free tool on website |

**No public API. No webhooks. No MCP server. No Zapier/Make modules.**

## Pricing, limits & plan gates

| Tier | Price | Refresh rate | Key features |
|---|---|---|---|
| Free | $0/mo | Weekly | Basic monitoring, AI analysis |
| Starter | $16.58/mo | Daily | Slack integration, customer engagement insights |
| Growth | $41.58/mo | Bi-hourly | Enhanced monitoring speed, full features |

*Pricing from third-party source (aitools.inc) — may differ from current Pluggo pricing. Homepage previously listed $29/mo starting and $49/mo Pro. New plans are currently paused.*

- No documented keyword limits per plan
- No documented community/source limits per plan
- No credit card required for free tier
- "Trusted by 1,000+ brands" per homepage
- 4.9/5 rating from 127 reviews (schema data)

**Cost comparison context:**
- Octolens: $25/mo (API + MCP server)
- Buska: $19/mo (30+ platforms, API, MCP)
- Syften: $9/mo (AI filtering, API, webhooks)
- Pluggo: $16.58-41.58/mo (Slack only, no API)

## Integrations

**Data flows OUT of Pluggo:**
- Slack workspace alerts (primary delivery)
- Dashboard (web UI)
- One-click Slack feedback trains AI copilot

**Data flows INTO Pluggo:**
- Website URL (for AI to analyze your brand/product)
- Keywords (manual configuration)
- Community preferences (after auto-discovery)

**No confirmed integrations with CRMs, email, Zapier, or any external tools beyond Slack.**

### CRM sync workaround

Since no API or export feature exists:
1. Review high-intent opportunities in Slack or dashboard
2. Bookmark/star the best leads in Slack
3. Batch-enter thread URLs and key details into CRM weekly
4. For higher volume, maintain a spreadsheet intermediary

## Data model

<!-- Constructed from website content — verify against live product -->

```json
{
  "opportunity": {
    "source_platform": "reddit",
    "thread_url": "https://reddit.com/r/SaaS/comments/...",
    "community": "r/SaaS",
    "title": "Looking for a tool that does X",
    "intent_signal": "high",
    "sentiment": "positive",
    "matched_keywords": ["tool recommendation", "alternative to"],
    "smart_reply_template": "Based on your requirements...",
    "discovered_at": "2026-05-10T14:30:00Z"
  }
}
```

```json
{
  "brand_profile": {
    "website_url": "https://myproduct.com",
    "brand_name": "MyProduct",
    "auto_discovered_communities": ["r/SaaS", "r/startups", "HN"],
    "keywords": ["project management", "team collaboration"],
    "custom_rules": ["Only posts from consumer brands"]
  }
}
```

## Quick-start recipes

### Recipe 1: Set up monitoring from URL to Slack in 2 minutes

**Goal:** Get your first opportunity alerts flowing to Slack.

**Steps:**
1. Sign up at pluggo.ai (free tier if available, no credit card)
2. Enter your website URL — Pluggo's AI analyzes your product and audience
3. Connect your Slack workspace
4. Review auto-discovered communities — Pluggo finds relevant subreddits, X accounts, HN discussions
5. Add 3-5 specific keywords: competitor names, pain-point phrases, product category terms
6. Wait for first alerts — free tier refreshes weekly, paid plans daily to bi-hourly
7. Provide feedback on every alert via one-click Slack buttons to train the AI

### Recipe 2: Train the AI copilot for better recommendations

**Goal:** Reduce noise and increase relevance over time.

**Steps:**
1. For every Slack alert, click the feedback button (relevant / not relevant)
2. Be consistent — skip no alerts, even if the answer seems obvious
3. After 1-2 weeks, review the change in alert quality
4. If still noisy: audit your keyword list, remove broad terms, add specifics
5. Set custom analysis rules for additional filtering (e.g., "only B2B discussions")
6. Prune auto-discovered communities that consistently produce irrelevant results

### Recipe 3: Reply strategy for social opportunities

**Goal:** Convert discovered conversations into engagement without getting flagged.

**Steps:**
1. Review the smart reply template — note key talking points
2. Before engaging, check:
   - Community rules (Reddit sidebar, HN guidelines)
   - Your history in that community — contribute first, promote second
   - Thread age — older threads get less visibility
3. Rewrite the template completely:
   - Lead with helpful context (2-3 sentences of genuine advice)
   - Use first person, share real experience
   - Only mention your product if directly relevant
   - Remove marketing language
4. Post manually on the platform
5. Follow up on replies within 24 hours — engage authentically

## Integration patterns

### Slack-based monitoring workflow (only available pattern)

```
Pluggo AI monitors 6 platforms 24/7
  → Auto-discovers relevant communities
  → AI scores conversations for intent and sentiment
  → High-intent opportunities delivered to Slack
  → One-click feedback in Slack trains AI copilot
  → Smart reply template available in dashboard
  → You edit and personalize the reply
  → Post on platform manually
  → Track engagement manually
```

**Limitations:**
- No programmatic access to any data
- No export functionality documented
- No webhook or notification parsing beyond Slack messages
- All tracking and follow-up is manual
- Platform is in maintenance mode — new signups paused
