# Threadlytics Platform Reference

## Overview

Threadlytics is a Reddit-specific monitoring and competitive intelligence platform. It indexes 500M+ Reddit conversations and provides real-time keyword monitoring, sentiment analysis, Share of Voice benchmarking, and AI-powered opportunity scoring. Purpose-built exclusively for Reddit — not a general social listening tool that treats Reddit as one of many sources.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Keyword monitoring** | Track brand, competitor, and industry keywords across Reddit posts and comments. Context keywords, negative keywords, subreddit filtering. | UI (all plans) |
| **Sentiment analysis** | AI-powered positive/negative/neutral classification for every mention. 50+ languages. | UI (all plans) |
| **Share of Voice** | Competitive benchmarking — percentage of Reddit conversation about your brand vs competitors for tracked keywords. | UI (all plans) |
| **Opportunity scoring** | AI-powered 0-100% score for each mention based on engagement, sentiment, and relevance. Identifies high-value threads worth engaging. | UI (all plans) |
| **Alerts** | Real-time keyword alerts. Frequency: 1hr (Standard), 15min (Pro), 5min (Premium). | UI (all plans, frequency varies) |
| **SERP tracking** | Tracks Reddit URLs appearing in Google search results for your keywords. | UI (Pro+ only) |
| **Accounts tracking** | Monitor specific Reddit accounts/users. | UI (Pro+ only) |
| **Market analysis** | Industry-level analysis of Reddit conversations — trends, topics, seasonal patterns. | UI (all plans) |
| **Historical data** | Access to 500M+ indexed Reddit conversations for trend analysis and pattern recognition. | UI (all plans) |
| **Manual URL tracking** | Add any Reddit post URL to monitor directly, regardless of keyword matches. | UI (all plans) |
| **Multi-client dashboards** | Isolated dashboards for agency clients. Up to 5 (Standard), 10 (Pro), more on higher tiers. | UI (all plans) |
| **API access** | Programmatic data access. | Enterprise only |

**No webhooks, no Zapier, no Make, no MCP server.** Integration is limited to manual export on self-serve plans and API on Enterprise.

## Pricing, limits & plan gates

<!-- Pricing as of May 2026 — verify at threadlytics.io/pricing -->

| Feature | Standard | Pro | Premium | Enterprise |
|---|---|---|---|---|
| **Monthly price** | $99 | $199 | $499 | Custom |
| **Annual price (per month)** | $15 | $30 | $499 | Custom |
| **Keywords** | 20 | 100 | 250 | Custom |
| **Context keywords** | 10 | 25 | 50 | Custom |
| **Mentions/month** | 5,000 | 20,000 | 50,000 | Custom |
| **Users** | 1 | 5 | 10 | Unlimited |
| **Clients** | 5 | 10 | Custom | Custom |
| **Alert frequency** | 1 hour | 15 minutes | 5 minutes | Custom |
| **Market analysis** | Yes | Yes | Yes | Yes |
| **Sentiment analysis** | Yes | Yes | Yes | Yes |
| **Accounts tracking** | No | Yes | Yes | Yes |
| **SERP tracking** | No | Yes | Yes | Yes |
| **API access** | No | No | No | Yes |

**7-day free trial** available on all self-serve plans. No free tier. Company email required (personal domains blocked).

**Key plan gates to know:**
- Standard lacks SERP tracking and Accounts tracking
- Premium does NOT get a yearly discount ($499/mo either way)
- API access is strictly Enterprise — no self-serve API access at any price point
- Annual billing saves 85% on Standard ($15 vs $99) and 85% on Pro ($30 vs $199)

## Keyword configuration

### Main keywords
Brand, competitor, and industry terms you want to track. Each plan has a keyword limit (20/100/250).

### Context keywords
Secondary terms that must appear alongside a main keyword for a mention to count. This is Threadlytics' primary noise reduction mechanism.

**Example:** Tracking "Apollo" with context keyword "software" only counts mentions containing both "Apollo" and "software" — filtering out space program and mythology references.

### Global context keywords
Apply across ALL tracked keywords. At least one global context keyword must appear alongside any main keyword for a mention to register. Useful for industry-wide filtering (e.g., "SaaS", "software", "tool").

### Negative keywords
Exclude mentions containing these terms. Use for recurring false positive patterns (e.g., "NASA" when tracking "Apollo" the CRM).

### Subreddit filtering
Include or exclude specific subreddits. Useful for focusing on relevant communities and excluding high-volume noise sources.

## Monitoring workflow

### 1. Configure keywords
- Start with 3-5 main keywords: brand name, top 2-3 competitors, 1-2 industry terms
- Add 2-3 context keywords per main keyword to filter noise
- Set 3-5 negative keywords for known false positives
- Choose subreddits to include/exclude

### 2. Review and tune
- After 24-48 hours, review the first 50 mentions
- If >20% are irrelevant: tighten context keywords, add negative keywords
- If mentions seem sparse: loosen context keywords or remove overly restrictive ones
- Use the manual URL tracking to catch threads the keyword system missed

### 3. Ongoing monitoring
- Review opportunity-scored mentions daily (sort by score descending)
- Check Share of Voice weekly for competitive trends
- Monitor sentiment trends monthly
- Adjust keywords as market terms evolve

## Engagement workflow

Threadlytics provides an in-dashboard engagement workflow:
1. **Review** — scan mentions sorted by opportunity score or recency
2. **Engage** — click through to the Reddit thread to respond
3. **Save** — bookmark high-value threads for follow-up
4. **Dismiss** — mark irrelevant mentions to declutter
5. **Notes** — add internal notes to track context and engagement history

## Data model

Threadlytics does not expose a public API, so no formal data model is documented. The key objects visible in the dashboard:

- **Keywords**: main keywords, context keywords, negative keywords, subreddit filters
- **Conversations (Mentions)**: individual Reddit posts/comments matching keyword criteria, with sentiment, opportunity score, subreddit, author, engagement metrics
- **Share of Voice**: percentage breakdowns per keyword/competitor over configurable time ranges
- **SERP entries**: Reddit URLs appearing in Google results for tracked keywords (Pro+)
- **Accounts**: monitored Reddit users and their activity (Pro+)

## Integration patterns

### Enterprise API (custom pricing)
Details not publicly documented. Contact Threadlytics sales for:
- API endpoints and authentication
- Rate limits and data access scope
- Historical data depth
- Webhook availability

### Manual export (all plans)
Export-ready reports from the dashboard. Suitable for:
- Monthly competitive intelligence reports
- Stakeholder presentations
- Feeding data into external tools manually

### Workarounds for programmatic access
If you need automated data flow from Reddit monitoring but can't justify Enterprise:
- **Awario** — REST API on Enterprise plan (~€249/mo annual), covers Reddit + social + web
- **Brand24** — REST API on all paid plans from $79/mo, covers Reddit + 25M sources
- **Mention** — REST API on all plans from $41/mo, covers Reddit + 1B+ sources

## Reddit monitoring best practices

### Keyword strategy for Reddit
Reddit conversations are informal — include slang, abbreviations, and common misspellings:
- Brand: "yourapp", "your-app", "your app", "@yourapp"
- Competitor: include known nicknames (e.g., "HubSpot" → "HS", "HubSpot CRM")
- Industry: use Reddit-native language ("tech stack", "what do you use for...")

### Subreddit prioritization
Focus monitoring on subreddits where your audience actually discusses relevant topics:
- **B2B SaaS**: r/SaaS, r/startups, r/Entrepreneur, r/sales, r/marketing
- **Developer tools**: r/webdev, r/programming, r/devops, technology-specific subs
- **Ecommerce**: r/ecommerce, r/shopify, r/dropshipping, r/FulfillmentByAmazon

### Engagement best practices
- Respond authentically — Reddit users detect and reject promotional content
- Add value first — answer the question, share genuine experience
- Disclose affiliation when recommending your own product
- Don't spam — quality engagement in 2-3 threads/day beats 20 drive-by comments
