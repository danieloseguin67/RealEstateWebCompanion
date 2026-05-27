# Reddily Platform Reference

## Overview

Reddily is an AI-powered Reddit thread analysis tool that transforms individual Reddit threads into structured market research reports. It uses Google Gemini to extract sentiment, pain points, feature requests, competitor mentions, audience demographics, and notable quotes from any Reddit thread. It's an on-demand analysis tool — not a monitoring or alerting platform.

**Primary audience**: Product managers, founders, and marketers doing market research, competitive analysis, and idea validation on Reddit.

**Key differentiator**: Pay-per-analysis pricing (no subscription), AI-powered structured insight extraction from individual threads, Chrome extension for one-click analysis while browsing.

## Capabilities & automation surface

| Capability | Description | Surface |
|---|---|---|
| **Thread analysis** | AI extracts sentiment, pain points, feature requests, competitor mentions, demographics, notable quotes from a single thread | UI + Chrome extension |
| **Batch analysis** | Process 25-50 threads simultaneously via keyword search in the web dashboard | UI-only |
| **Chrome extension** | One-click analysis button on any Reddit thread page | Chrome extension |
| **PDF export** | Download analysis results as PDF for sharing or archiving | UI-only |
| **Subreddit finder** | Free tool to discover relevant subreddits for any topic | UI-only (free, no credits) |
| **Keyword search** | Search Reddit for threads by keyword in the web dashboard to select for batch analysis | UI-only |

**No API, no webhooks, no Zapier, no Make, no MCP server.** Entirely UI + Chrome extension. PDF is the only export format.

## Pricing, limits & plan gates

Reddily uses credit-based pricing — each thread analysis costs one credit. No monthly subscriptions, no contracts. Credits do not expire.

| Pack | Original price | Launch price (70% off) | Credits | Cost per analysis |
|---|---|---|---|---|
| Free | — | — | 5 | Free |
| Starter | $9.99 | $2.99 | 10 | $0.30 |
| Growth | $45.99 | $13.99 | 50 | $0.28 |
| Pro | $89.99 | $26.99 | 100 | $0.27 |
| Enterprise | $399.99 | $119.99 | 500 | $0.24 |

**Important notes:**
- The 70% launch discount is a promotional offer — original prices may apply after the discount period ends
- All features are available on all packs (no feature gating) — the only difference is cost per analysis
- The subreddit finder tool is free (no credits required)
- Batch analysis limit: 25-50 threads per run

## Analysis output structure

Each thread analysis returns structured data in these categories:

### Sentiment analysis
- **Positive / Neutral / Negative** classification with percentage breakdown
- Applied to the thread as a whole, not individual comments

### Pain points
- Ranked by mention frequency across comments
- Each pain point includes supporting quotes with engagement data
- Useful for identifying recurring frustrations in a market

### Feature requests
- Ranked by mention frequency
- Each request includes context from the comments
- Useful for product development prioritization

### Competitor intelligence
- Named competitor mentions with sentiment context
- Shows how competitors are perceived in the conversation

### Notable quotes
- Impactful comments surfaced with author and engagement metrics
- Direct evidence to support research conclusions

### Audience demographics
- Inferred user roles, experience levels, and needs from conversation patterns
- AI inference — not verified demographic data

<!-- Constructed from product description — verify against actual analysis output -->

## Research methodology

### Single thread analysis (Chrome extension)
1. Install the Chrome extension from the Chrome Web Store
2. Navigate to any Reddit thread
3. Click the Reddily button in the browser toolbar
4. Analysis completes in <30 seconds
5. Export as PDF if needed

### Batch analysis (web dashboard)
1. Log in to reddily.io dashboard
2. Enter keywords related to your research topic
3. Dashboard shows matching Reddit threads with engagement metrics
4. Select 25-50 threads for batch processing
5. Review combined results across all analyzed threads

### Research project workflow
For a comprehensive market research project:

1. **Define the question** — "What problems do people have with [category]?"
2. **Find communities** — use the free subreddit finder for relevant subreddits
3. **Search and select** — keyword search in dashboard, select high-engagement threads (50+ comments)
4. **Diversify sources** — pick threads from multiple subreddits and thread types (complaints, comparisons, recommendations, how-to)
5. **Run batch analysis** — process 25-50 threads per batch
6. **Synthesize** — look for pain points and feature requests that appear across multiple threads
7. **Export** — PDF export for sharing with team

### Optimizing credit usage
- **Preview before analyzing** — check upvotes and comment count. Threads with <10 comments produce thin analysis.
- **Use the free subreddit finder first** — don't waste credits analyzing threads in irrelevant communities
- **Batch strategically** — one well-targeted batch of 50 threads is more valuable than five unfocused batches of 10
- **Prioritize engagement** — threads with 100+ comments and active debate yield the richest insights
- **Buy larger packs** — Enterprise pack ($0.24/analysis) is 20% cheaper per credit than Starter ($0.30/analysis)

## Integrations

Reddily has no programmatic integrations:

- **No REST API**
- **No webhooks**
- **No Zapier / Make / n8n**
- **No MCP server**
- **No CRM connectors**

The only data export is **PDF export** from the analysis results page.

**Workaround for automation**: If you need to capture Reddily data programmatically, your only option is manual copy-paste from the dashboard or OCR on exported PDFs. For programmatic Reddit data access, consider Xpoz (MCP + SDK, $20/mo), Octolens (API + MCP, $119/mo), or RedShip (REST API, $19/mo).

## Comparison with similar tools

| Feature | Reddily | PainOnSocial | Reddinbox | SparkToro |
|---|---|---|---|---|
| **Focus** | Thread analysis | Pain point scoring | Audience intelligence | Audience profiling |
| **Input** | Individual threads | Subreddit selection | Natural language queries | Audience description |
| **Output** | Sentiment, pain points, features, competitors, demographics | Pain points ranked by frequency/severity | Market briefs, intent scoring, trends | Websites, podcasts, channels audiences follow |
| **Platforms** | Reddit only | Reddit only | Reddit, X, HN, YouTube, Facebook, Bluesky | Cross-platform (audience behavior) |
| **Pricing model** | Pay-per-analysis ($0.24-0.30) | Subscription ($19-49/mo) | Subscription ($39/mo) | Freemium ($0-300/mo) |
| **Monitoring** | No (on-demand only) | No (on-demand scans) | Yes (always-on feed) | No (not a monitoring tool) |
| **API** | No | No | No | No (coming soon) |
| **Best for** | Deep single-thread analysis with structured output | Idea validation with scored pain points | Ongoing demand research with intent signals | Channel discovery and audience profiling |
