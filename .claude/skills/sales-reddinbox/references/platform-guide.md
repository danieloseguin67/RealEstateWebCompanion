# Reddinbox Platform Reference

## Overview

Reddinbox is an AI-powered audience intelligence platform that scans community conversations across Reddit, X, Bluesky, Hacker News, YouTube, Facebook, and (coming soon) Quora. It uses an AI agent to synthesize insights from thousands of discussions, filtering spam, bots, and AI-generated content to surface high-intent signals, pain points, sentiment, and market themes.

Unlike traditional social listening tools that monitor brand mentions, Reddinbox is designed for upstream research — understanding what your target audience says about problems before they search for solutions.

## Capabilities & automation surface

| Capability | Access level |
|---|---|
| Natural language query interface | UI (all plans) |
| Always-on monitoring (intent scoring) | UI (all plans) |
| Weekly market briefs (Passive Intelligence) | UI (Starter: 3, Pro: 5) |
| Purchase intent scoring (1-100) | UI (all plans) |
| AI spam/bot/slop filtering | UI (all plans) |
| Suggested replies for high-intent threads | UI (all plans) |
| Multi-platform scanning (Reddit, X, Bluesky, HN, YouTube, Facebook) | UI (all plans) |
| Free tools (subreddit finder, pain point research, competitor analysis, etc.) | Public (no login) |
| Data export | Not available |
| API | Not available |
| Webhooks | Not available |
| Zapier/Make | Not available |
| MCP server | Not available |

**No programmatic access exists.** Reddinbox is entirely UI-driven. If you need API/webhook/MCP access, use Octolens ($119/mo, all plans), Syften (€19.95/mo, API on Standard+), or Xpoz (free tier, MCP server).

## Pricing, limits & plan gates

| Plan | Monthly | Annual (20% off) | Market briefs | AI conversations | Buying signal research | Platforms |
|------|---------|-------------------|---------------|------------------|----------------------|-----------|
| Starter | $39 | $31/mo | 3 | Extended | Standard | All |
| Pro | $99 | $79/mo | 5 | Unlimited | Extended | All |

**Key details:**
- 7-day free trial (no credit card required)
- 7-day full refund guarantee on paid plans
- Market brief limits are hard monthly caps — they reset each billing cycle
- "Extended" vs "Unlimited" AI conversations is the main differentiator between plans
- All platforms available on both plans (no source gating)

## Supported platforms

| Platform | Status | Notes |
|---|---|---|
| Reddit | Live | Primary platform, deepest coverage |
| X (Twitter) | Live | Posts and conversations |
| Bluesky | Live | Growing coverage |
| Hacker News | Live | Technical/startup discussions |
| YouTube | Live | Comments and discussions |
| Facebook | Live | Public groups and pages |
| Quora | Coming soon | Not yet available despite being listed |

## Query strategy

### How queries work

Reddinbox uses natural language queries — no Boolean syntax (AND/OR/NOT). You describe what you want to research in plain English, and the AI agent interprets and scans relevant conversations.

### Effective query patterns

| Pattern | Example | Why it works |
|---------|---------|-------------|
| Problem-first | "What frustrates freelancers about invoicing?" | Surfaces pain points directly |
| Audience + topic | "What do SaaS founders say about cold email?" | Narrows to relevant conversations |
| Competitor sentiment | "What does Reddit think about [Competitor]?" | Competitive intelligence |
| Validation | "Are people looking for [solution type]?" | Idea validation with demand signals |
| Trend detection | "What's changing in [industry] hiring?" | Market movement signals |

### Ineffective queries (avoid)

| Pattern | Example | Why it fails |
|---------|---------|-------------|
| Too broad | "marketing" | Matches everything, insights are generic |
| Brand-only | "HubSpot" | Returns product discussions, not problems |
| Yes/no | "Is there demand for X?" | Too binary, doesn't surface nuance |
| Too specific | "Does anyone want a CRM that integrates with Obsidian and uses AI to auto-tag contacts?" | Too narrow to find enough conversations |

### Iteration strategy

1. Start with a broad problem query → review what surfaces
2. Identify the most interesting sub-theme from results
3. Re-query with that narrower focus for depth
4. Use market brief on the refined topic for synthesized analysis

## Intent scoring

Reddinbox scores each surfaced post/conversation on a 1-100 purchase intent scale.

| Score range | Meaning | Action |
|---|---|---|
| 80-100 | Active buyer — asking for recommendations, mentioning budget/timeline | Engage immediately (use suggested reply) |
| 60-79 | Problem-aware — describing frustration, comparing options | Monitor; engage if you have a direct solution |
| 40-59 | Research phase — exploring topics, asking general questions | Note for content ideas; don't hard-sell |
| 1-39 | Low intent — venting, casual discussion, no action signal | Ignore for lead gen; useful for sentiment research |

**Calibration notes:**
- Urgency language ("I need this now", "help me") can inflate scores even for venting posts
- Always cross-reference score with: thread recency, specificity of requirements, mention of budget/timeline
- Scores are relative within your topic — a "70" on a low-competition topic may be more valuable than an "85" on a saturated one

## Market briefs (Passive Intelligence)

Market briefs are weekly curated digests synthesizing:
- Recurring themes across your monitored topics
- Competitor sentiment shifts
- Trending vocabulary and emerging terms
- High-frequency pain points

### Optimizing brief quality

| If briefs are... | Try this |
|---|---|
| Too generic | Narrow the topic — "CRM for solo consultants" not "CRM" |
| Repeating what you know | Add competitor names or specific pain points to the query |
| Missing your audience | Include audience identifiers — "indie hackers", "freelance developers", etc. |
| Not actionable | Focus on a decision you need to make — "should I build X or Y?" |

### Brief allocation strategy

- **Starter (3 briefs/mo):** Use 1 for core product research, 1 for competitive intel, 1 for audience expansion
- **Pro (5 briefs/mo):** Add 1 for trend detection, 1 for content planning

## Free tools (no login required)

Reddinbox offers 10 free tools at reddinbox.com/free-tools:

1. **Subreddit Finder** — find relevant subreddits for any niche
2. **Pain Point Research** — surface what your audience complains about
3. **FAQ Generator** — generate FAQs from real community questions
4. **Reddit Competitor Analysis** — see what Reddit thinks about any brand
5. **Reddit Sentiment Analysis** — brand/tool sentiment from Reddit
6. **Reddit Thread Summarizer** — summarize any thread
7. **Download Reddit Thread** — save threads before deletion
8. **Reddit Shadowban Checker** — check if an account is shadowbanned
9. **Reddit Subreddit Analytics** — engagement metrics and best posting times
10. **Facebook Group Finder** — find relevant Facebook groups

These are useful for quick research without committing to a paid plan.

## Comparison with similar tools

| Feature | Reddinbox | KeyMentions | Octolens | Syften |
|---|---|---|---|---|
| **Primary use** | Audience intelligence / research | Reddit lead gen + auto-reply | Dev-focused monitoring | Community keyword alerts |
| **Query type** | Natural language | Keywords | Keywords + context rules | Boolean |
| **Platforms** | Reddit, X, Bluesky, HN, YouTube, FB | Reddit only | Reddit, X, LinkedIn, GH, HN, Bluesky + 8 more | Reddit, HN, X, Bluesky + 11 more |
| **Intent scoring** | Yes (1-100) | No (virality filter only) | Yes (Buy Intent tag) | No |
| **AI filtering** | Yes (spam/bot/slop) | No | Yes (relevance scoring) | Yes (noise filtering) |
| **Auto-reply** | Suggested replies (manual) | Auto-publish (automated) | No | No |
| **Market synthesis** | Yes (weekly briefs) | No | Weekly AI summaries (Scale) | No |
| **API** | No | No | Yes (all plans) | Yes (Standard+) |
| **Webhooks** | No | No | Yes (Pro: hourly, Scale: real-time) | Yes (PRO) |
| **Starting price** | $39/mo | Free (limited) | $119/mo | €19.95/mo |

### When to choose Reddinbox over alternatives

- **Over KeyMentions:** When you need multi-platform research and audience intelligence, not just Reddit auto-reply
- **Over Octolens:** When you want synthesized insights (market briefs) rather than raw mention feeds, and don't need API access
- **Over Syften:** When you prefer natural language queries over Boolean syntax and want AI-synthesized analysis rather than alerts
- **Over Brand24/Awario:** When your goal is upstream audience research (what problems exist) rather than brand monitoring (who mentioned you)

## Use case recipes

### Recipe 1: Validate a product idea

1. Query: "What frustrates [target audience] about [current solution category]?"
2. Review intent scores — focus on 60+ (problem-aware and above)
3. Note recurring themes, language patterns, and frequency
4. Use a market brief on the most promising pain point cluster
5. Cross-reference with a competitive query: "What does [audience] think about [existing solutions]?"

### Recipe 2: Find high-intent leads

1. Query: "[Audience] looking for [your solution category]"
2. Filter to 70+ intent scores
3. Use suggested replies to craft non-promotional, helpful responses
4. Engage on the original platform (Reddit, HN, etc.) — Reddinbox doesn't post for you

### Recipe 3: Competitive intelligence

1. Query: "What does [audience] say about [Competitor] in [year]?"
2. Look for recurring complaints and praise patterns
3. Use market brief to synthesize competitive positioning themes
4. Compare with your own brand: "What does [audience] say about [your brand]?"
