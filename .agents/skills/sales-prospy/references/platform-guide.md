# Prospy Platform Reference

## Overview

Prospy is an AI-powered social listening and lead generation tool that scans Twitter/X, Reddit, Bluesky, and Hacker News for high-intent buyer conversations. It scores leads by intent, relevance, and timing, then suggests AI-drafted replies. Target audience: SaaS founders, startups, freelancers, and lean B2B teams who want to find and engage prospects directly in social conversations.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| Unified social feed | Aggregates posts from all monitored platforms into one dashboard | UI-only |
| AI lead scoring | Evaluates leads based on intent, relevance, and timing signals | UI-only |
| Smart detection | Identifies high-intent conversations using AI analysis | UI-only |
| AI reply suggestions | Generates personalized response drafts matching brand voice | UI-only |
| Brand monitoring | Real-time tracking of brand mentions across platforms | UI-only |
| Competitor intelligence | Monitors competitor discussions and mentions | UI-only |
| Conversation analysis | Provides context and pain points for each lead | UI-only |
| Project configuration | Keywords, competitor terms, buyer audience signals | UI-only |

**No public API. No webhooks. No Zapier/Make/MCP.** Prospy is entirely UI-driven. The only external output is the dashboard itself — no structured data export, no notification integrations documented.

## Pricing, limits & plan gates

*Best-effort from research — verify current pricing at prospy.io*

| Feature | Explorer Pass ($12 one-time) | Pro ($24/mo) | Enterprise (custom) |
|---|---|---|---|
| **Access** | 3-day trial | Full ongoing access | Custom |
| **Platforms** | All 4 (Twitter/X, Reddit, Bluesky, HN) | All 4 | All 4 + custom |
| **AI scoring** | Yes | Yes | Yes |
| **AI replies** | Yes | Yes | Yes |
| **Brand monitoring** | Yes | Yes | Yes |
| **Competitor tracking** | Yes | Yes | Yes |
| **Projects** | Unknown | Unknown | Multiple projects, agency access |
| **Support** | Standard | Priority | Dedicated |

- **Pro pricing is a launch discount** — original price is $59/mo, currently $24/mo
- **LinkedIn and Facebook listed as "coming soon"** — not yet active
- No free tier (Explorer Pass is a paid trial)
- No annual discount documented

## Integrations

**No integrations documented.** No CRM connectors, no Slack/email alerts, no Zapier/Make/n8n, no webhooks, no API.

**Workaround options:**
1. **Manual CRM entry** — review leads in Prospy dashboard, copy details to CRM manually
2. **Browser automation** — tools like Bardeen or browser extensions could scrape the dashboard (fragile, not recommended)
3. **Switch tools** — if CRM integration is critical, consider CatchIntent (HubSpot/Pipedrive/Close), Syften (webhooks + API), or Octolens (REST API + MCP)

## Data model

<!-- Constructed from UI research — no API, verify against live product -->

```json
{
  "project": {
    "name": "My SaaS Product",
    "keywords": ["alternative to Jira", "looking for PM tool"],
    "competitor_terms": ["Asana", "Monday.com"],
    "audience_signals": ["founders", "product managers"]
  },
  "lead": {
    "platform": "reddit",
    "post_url": "https://reddit.com/r/SaaS/comments/...",
    "content_preview": "We need something simpler than Jira for our small team...",
    "ai_score": {
      "intent": "high",
      "relevance": "high",
      "timing": "recent"
    },
    "context": "User is actively looking for PM alternatives for a small team",
    "pain_points": ["complexity", "pricing"],
    "ai_reply_suggestion": "Have you looked at [product]? It's designed for small teams who find Jira too complex..."
  }
}
```

*Note: This is a representative shape based on research — Prospy has no API, so field names and structure are inferred from UI descriptions and feature documentation.*

## Quick-start recipes

### Recipe 1: Set up a lead generation project

**Trigger:** You want to find potential customers discussing problems your product solves.

**Steps:**
1. Sign up for Pro ($24/mo) or Explorer Pass ($12 for 3-day trial)
2. Create a new project — describe your product clearly (what problem it solves, who it's for)
3. Add keywords using buyer-intent phrases:
   - Direct: `"looking for [category]"`, `"need a [category] tool"`, `"recommend [category]"`
   - Competitor-switch: `"alternative to [competitor]"`, `"switch from [competitor]"`, `"[competitor] too expensive"`
   - Pain-based: `"frustrated with [problem]"`, `"how do you handle [problem]"`
4. Add competitor names for intelligence tracking
5. Configure audience signals to match your ICP (founders, marketers, developers, etc.)
6. Review the unified feed — AI scoring prioritizes the best leads automatically

**Gotchas:**
- Start narrow with 5-10 highly specific keywords, then expand based on results
- Broad single-word keywords will flood the feed with noise

### Recipe 2: Brand monitoring and competitor intelligence

**Trigger:** You want to track what people say about your brand and competitors across social platforms.

**Steps:**
1. Create a project with your brand name and variations as keywords
2. Add competitor brand names as separate tracking terms
3. Review the unified feed for brand mentions — positive, negative, and comparative
4. Use conversation analysis to understand pain points and sentiment
5. Draft replies to brand mentions using AI suggestions — prioritize negative mentions and comparison discussions

**Gotchas:**
- If your brand name is a common word, add context keywords to reduce false positives
- Competitor mentions are often the highest-value leads (people actively comparing)

### Recipe 3: Evaluate Prospy with the Explorer Pass

**Trigger:** You want to test Prospy before committing to the monthly plan.

**Steps:**
1. Purchase Explorer Pass ($12 one-time, 3-day access)
2. Set up 1-2 projects with your best keywords
3. During the 3 days, evaluate: lead quality, AI scoring accuracy, reply suggestion usefulness
4. Note: 3 days is tight — set up projects immediately after purchase
5. Decision criteria: Are the AI-scored leads actually high-intent? Do the reply suggestions save time?

**Gotchas:**
- 3 days is very short for evaluating social listening — some keywords may not trigger in that window
- No free trial alternative — the Explorer Pass is the cheapest way to test

## Comparison with similar tools

| Feature | Prospy | CatchIntent | Syften | Leadverse | Prems AI |
|---|---|---|---|---|---|
| **Platforms** | Twitter/X, Reddit, Bluesky, HN | Reddit, X, HN, Bluesky, LinkedIn | Reddit, X, HN, Bluesky + 11 more | Reddit, X, LinkedIn | 15 platforms |
| **Pricing** | $24/mo (launch) | $49-69/mo | $19-79/mo | $19-39/mo | $49/mo |
| **AI scoring** | Intent + relevance + timing | Relevance 0-100 | AI filtering (relevant/spam) | Relevance-based | Intent 0-100 |
| **AI replies** | Yes (suggestions) | Yes (suggestions) | No | Yes (suggestions) | Yes (AI Pitcher) |
| **API** | No | Yes (REST + MCP) | Yes (REST + webhooks) | No | No (webhooks only) |
| **CRM integration** | No | Yes (HubSpot, Pipedrive, Close) | No | No | No |
| **Brand monitoring** | Yes | Yes | Yes | No | No |
| **Auto-reply** | No | No | No | No | No |
| **Free trial** | $12 Explorer Pass (3 days) | Yes | No | 7-day free | Yes (no CC) |

**Choose Prospy when:** You want a budget all-in-one social listener ($24/mo) that combines lead generation with brand monitoring and competitor intelligence across Twitter/X, Reddit, Bluesky, and HN, and you don't need API access or CRM integration.

**Choose alternatives when:** You need API/webhook access (CatchIntent, Syften), CRM integration (CatchIntent), widest platform coverage (Prems — 15 platforms, Syften — 15+ communities), or the cheapest Reddit-only option (Leadverse $19/mo, RedditMentions ~$5/mo).
