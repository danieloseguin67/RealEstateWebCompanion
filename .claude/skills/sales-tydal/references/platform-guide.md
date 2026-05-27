# Tydal Platform Reference

## Overview

Tydal is an AI-powered Reddit lead generation tool that automates the full cycle: product description → AI finds relevant threads → AI drafts and auto-posts replies. Differentiator: hands-off auto-posting with timing optimization and ban-safe guardrails. Targets founders, indie hackers, SaaS businesses, and content creators.

## Capabilities & automation surface

| Capability | Access | Notes |
|---|---|---|
| AI lead scanning | UI-only | Monitors Reddit 24/7 across selected subreddits (max 5); scans every 48 hours |
| Intent scoring | UI-only | Ranks threads by buyer intent and product fit; prioritized queue |
| AI comment generation | UI-only | Drafts contextual replies matching brand voice; explains why threads qualify |
| Auto-reply posting | UI-only | Posts replies automatically with timing optimized for community norms |
| One-click bulk posting | UI-only | Bulk-approve and post AI-generated replies |
| Viral post templates | UI-only | 50+ Reddit-proven post structures, customizable for brand voice |
| Dashboard analytics | UI-only | Auto-reply response rates, top subreddits by lead volume, response inbox |
| Subreddit targeting | UI-only | Select or receive AI-recommended subreddits (max 5) |

**No public API. No webhooks. No MCP server. No Zapier/Make modules.**

## Pricing, limits & plan gates

<!-- Pricing from tydal.co homepage — verify on site -->

| Tier | Price | Includes |
|---|---|---|
| Pro | $29/mo (7-day free trial) | Unlimited AI lead generation, unlimited comment generation, unlimited auto-replies, 50+ viral templates, subreddit targeting, relevant post tracking, priority support |

- Cancel anytime (no annual lock-in)
- Single plan — no tier gating on features
- **Key limits**: 5 subreddits max, scan interval every 48 hours

**Cost comparison context:**
- Leadlee: $12/mo (cheapest Reddit lead gen, manual posting)
- Subreddit Signals: $19.99/mo (7-dimension intent scoring, manual posting)
- Reppit AI: ~$25-29/mo (URL keyword discovery, manual posting)
- **Tydal: $29/mo (auto-posting, 5 subreddit limit, 48h scan)**
- Leado: $0-29.99/mo (Karma Builder, manual posting)
- Redreach: $49/mo (Google-ranking posts, webhooks)

## Integrations

**Data flows OUT of Tydal:**
- Dashboard (web UI) — view leads, intent scores, AI drafts, auto-reply status
- Analytics — response rates, top subreddits

**Data flows INTO Tydal:**
- Product description or URL (AI generates keywords and subreddit recommendations)
- Subreddit selections (max 5)

**No confirmed integrations with CRMs, email tools, Slack, Zapier, or any external tools.**

### CRM sync workaround

Since no API or export feature exists:
1. Review leads daily in dashboard
2. Copy thread URLs and key details for promising leads
3. Batch-enter into CRM manually
4. For automation needs, consider switching to RedShip ($29/mo, API + webhooks) or Buska ($49/mo, API + MCP)

## Data model

<!-- Constructed from website content — verify against live product -->

```json
{
  "lead": {
    "thread_url": "https://reddit.com/r/SaaS/comments/...",
    "subreddit": "r/SaaS",
    "title": "Looking for a tool that does X",
    "intent_score": "high/medium/low",
    "status": "awaiting | sent | responded",
    "ai_reply_draft": "Based on what you're describing...",
    "auto_reply_posted": true,
    "discovered_at": "2026-05-10T14:30:00Z"
  }
}
```

```json
{
  "campaign_config": {
    "product_description": "AI-powered project management for remote teams",
    "target_subreddits": ["r/SaaS", "r/startups", "r/Entrepreneur", "r/smallbusiness", "r/projectmanagement"],
    "max_subreddits": 5,
    "scan_interval_hours": 48,
    "auto_reply_enabled": true,
    "brand_voice": "conversational, helpful"
  }
}
```

## Quick-start recipes

### Recipe 1: Set up auto-posting lead gen in 10 minutes

**Goal:** Start auto-replying to buying-intent Reddit conversations.

**Steps:**
1. Sign up at tydal.co — start 7-day free trial
2. Describe your product (enter URL or manual description)
3. Review AI-recommended subreddits — pick your top 5 (you only get 5 slots)
4. Choose subreddits by buying intent density, not subscriber count (r/SaaS > r/technology)
5. Review the first batch of AI-discovered leads
6. Check AI reply drafts for quality before enabling auto-post
7. Enable auto-posting — Tydal posts with timing optimized for each subreddit
8. Monitor daily: check response inbox for replies, watch for removals

**Gotchas:**
- Start with 2-3 subreddits and add more once you verify replies aren't being removed
- Check each subreddit's rules for self-promotion policies before enabling auto-post there

### Recipe 2: Optimize subreddit rotation with only 5 slots

**Goal:** Maximize lead quality within Tydal's 5-subreddit limit.

**Steps:**
1. Run your initial 5 subreddits for 2 weeks (2-3 scan cycles)
2. Check dashboard analytics: rank subreddits by response rate and lead volume
3. Identify the lowest performer by lead quality (not just volume)
4. Replace it with a new subreddit candidate
5. Run for another 2 weeks and compare
6. Repeat — treat subreddit selection as an ongoing optimization

**Signals for good subreddits:**
- Posts asking "what tool should I use for X" or "alternative to Y"
- Active daily posting (not ghost subs)
- Moderators don't aggressively remove product mentions
- Community responds to helpful answers (upvotes, follow-up questions)

### Recipe 3: Use Tydal for discovery only (disable auto-post)

**Goal:** Use Tydal's AI lead scanning without the risk of auto-posting.

**Steps:**
1. Configure product and subreddits as normal
2. Disable auto-posting (if toggle available) or simply don't click "post"
3. Use the lead feed as a discovery queue — review intent scores
4. Read AI draft replies for inspiration, but write your own
5. Post manually from your own Reddit account
6. Build karma naturally in target subreddits before engaging with leads

**Why:**
- Eliminates ban risk from automated posting
- Gives you quality control over every reply
- Still saves time through AI lead discovery and intent scoring
- Effectively turns Tydal into a $29/mo Reddit lead scanner (comparable to Reppit at same price)

## Integration patterns

### Manual lead-to-CRM workflow (only available pattern)

```
Tydal scans Reddit every 48 hours
  → AI scores threads for intent and product fit
  → AI drafts contextual replies
  → Auto-posts replies (or you review/post manually)
  → Check response inbox for engagement
  → Copy engaged lead details into CRM manually
  → Follow up on responses
```

**Limitations:**
- No programmatic access to any data
- No export functionality documented
- No notification channels beyond the web dashboard
- All CRM sync is manual
- 5 subreddit hard cap
- 48-hour scan interval (not real-time)

## Auto-posting risk assessment

Tydal's auto-posting is its key differentiator and its biggest risk:

**Risks:**
- Reddit's Content Policy prohibits automated engagement that isn't transparent
- Subreddit moderators can ban accounts that post bot-generated replies
- Shadowbans can affect your main Reddit account without warning
- Auto-posted replies may not match subreddit-specific tone

**Mitigation:**
- Monitor the response inbox daily for removals and mod messages
- Start with lenient subreddits (r/SaaS, r/startups) before expanding
- Review AI draft quality before enabling auto-post for each subreddit
- Consider using a dedicated Reddit account (not your personal one) for auto-posting
- If you get flagged, immediately disable auto-post and switch to manual mode

**When to choose manual-posting alternatives instead:**
- Your main Reddit account has significant karma you don't want to risk
- Target subreddits have strict anti-bot or anti-promotion rules
- You need replies to sound genuinely personal (auto-posts are detectable)
