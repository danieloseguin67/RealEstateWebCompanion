# Brand24 Platform Reference

## Overview

Brand24 is an AI-powered social listening tool that monitors 25M+ online sources in real time across social media, news, blogs, forums, podcasts, and reviews. Positioned as an affordable alternative to enterprise tools like Meltwater and Brandwatch, it serves SMBs, startups, and marketing teams. Primary differentiator: best coverage-to-price ratio in the social listening market with a growing AI feature set and official MCP server for AI assistant integration.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| **Mention monitoring** | Real-time tracking across 25M+ sources (social, news, blogs, forums, podcasts, reviews, TikTok, Reddit, Telegram, AppStore, TripAdvisor). 108 languages. | UI + API + MCP |
| **Sentiment analysis** | AI-powered positive/negative/neutral classification with sarcasm detection | UI + API + MCP |
| **Storm Alerts** | Anomaly detection — alerts when mention volume spikes beyond normal baseline | UI (email/Slack/Teams delivery) |
| **Share of Voice** | Competitive benchmarking — compare brand mention volume and sentiment vs competitors | UI + MCP |
| **Influencer Score** | Identifies top mentioners by reach/engagement | UI + MCP |
| **Brand Assistant** | AI chatbot for querying your monitoring data in natural language | UI (Pro+) |
| **AI Insights** | Automated strategic analysis of monitoring data | UI (Pro: 2 projects, Business: 5, Enterprise: unlimited) |
| **AI Topics** | Auto-clustering of mentions into discussion topics | UI (Pro: 2 projects, Business+: unlimited) |
| **Smart Context Search** | Semantic search across mentions (beyond keyword matching) | UI (add-on, Pro+) |
| **Discussion context** | Word cloud and topic visualization | UI |
| **Backlinks checker** | Track who links to your site from monitoring data | UI |
| **Reporting** | PDF/email reports, automated scheduling, custom dashboards | UI + API |
| **Slack integration** | Push mention alerts to Slack channels | Native integration |
| **MS Teams integration** | Push mention alerts to Teams channels | Native integration |
| **LinkedIn data** | Collect LinkedIn mentions (requires setup) | Native integration |
| **Zapier** | Trigger workflows from Brand24 events | Zapier connector |

## Pricing, limits & plan gates

*Best-effort — verify current pricing at brand24.com/pricing*

| Feature | Individual ($199/mo) | Team ($299/mo) | Pro ($399/mo) | Business ($599/mo) | Enterprise ($1,499+/mo) |
|---|---|---|---|---|---|
| Keywords | 3 | 7 | 12 | 25 | Custom |
| Mentions/month | 2,000 | 10,000 | 40,000 | 100,000 | Custom |
| Users | 1 | Unlimited | Unlimited | Unlimited | Unlimited |
| Update frequency | 12-hour | Hourly | Real-time | Real-time | Real-time |
| AI Sentiment | Yes | Yes | Yes | Yes | Yes |
| Storm Alerts | Yes | Yes | Yes | Yes | Yes |
| Brand Assistant | No | No | Yes | Yes | Yes |
| AI Insights | No | No | 2 projects | 5 projects | Unlimited |
| AI Topics | No | No | 2 projects | Unlimited | Unlimited |
| Smart Context Search | No | No | Add-on | Add-on | Yes |
| Priority support | No | Yes | Yes | Yes | Yes |
| Client Success Lead | No | No | No | Yes | Yes |
| Lightning Search | No | No | Yes | Yes | Yes |

- **14-day free trial** (no credit card required)
- **30-day money-back guarantee**
- **No auto-overage charges** — mentions cap at plan limit
- Annual billing saves ~20% over monthly
- All prices shown are annual billing rates

**Will my integration break on the free trial?** The trial provides full Pro-level features. After trial ends, you'll need a paid plan. The API and MCP server require an active paid subscription.

## Integrations

| Integration | Direction | What it does |
|---|---|---|
| **Slack** | Brand24 → Slack | Pushes mention alerts to Slack channels. Configure per-project. |
| **MS Teams** | Brand24 → Teams | Pushes mention alerts to Teams channels. |
| **LinkedIn** | LinkedIn → Brand24 | Enables LinkedIn mention data collection. Requires authorization. |
| **Zapier** | Bidirectional | Triggers on new mentions. Actions for CRM updates, ticketing, notifications. |
| **MCP** | AI Assistant ↔ Brand24 | Real-time brand monitoring data in Claude, ChatGPT, Gemini, Cursor. |
| **Insights24** | Brand24 → Insights24 | Expert analysis service that converts Brand24 data into strategic intelligence reports. |
| **ChatGPT App** | ChatGPT ↔ Brand24 | Official ChatGPT App Store integration — install and authorize. |

**No native Make/Integromat modules.** Use Zapier or the REST API for automation workflows.

## MCP server

Brand24 provides an official MCP server for connecting monitoring data to AI assistants.

**Server URL:** `https://mcp.brand24.com/v1/mcp`
**Auth:** OAuth (authorize your Brand24 account)
**Requires:** Active Brand24 subscription

### Setup for Claude

1. Open Claude → Settings → Connectors → Add Custom Connector
2. Server URL: `https://mcp.brand24.com/v1/mcp`
3. Auth: OAuth — authorize your Brand24 account
4. Query: "What are people saying about [brand] this week?"

### What you can query via MCP

- Account-wide project summaries
- Major events within specific projects
- Main discussion topics and trends
- Influencer activity analysis
- News source mention breakdowns
- Sentiment trends over time

**Data is real-time** (not cached) — queries return current monitoring data.

## API surface

Brand24 offers a REST API with webhooks, SDK libraries, and a sandbox environment. However, **official API documentation is not publicly accessible** — it requires an active subscription or contacting Brand24 directly.

### What's known

- **Protocol:** REST
- **Auth:** API key or OAuth (details require subscription access)
- **Capabilities:** Mention retrieval, sentiment data, project management, reporting export
- **Webhooks:** Real-time event notifications for new mentions
- **SDK:** Official libraries referenced for popular languages
- **Sandbox:** Testing environment available for development

### Gaps

- Exact base URL not publicly documented
- Endpoint inventory not available without subscription
- Rate limits, pagination pattern, and error response format unknown
- Webhook payload schema not publicly documented

**Recommendation:** For programmatic access, start with the **MCP server** (easiest setup, no API key management) or **Zapier** (no-code automation). Contact Brand24 support or check the in-app developer docs for full REST API access.

<!-- Source: https://help.brand24.com/en/collections/10259552-integrations, https://help.brand24.com/en/articles/13011375-brand24-mcp, https://firstsales.io/brand-review/brand24/ -->

## Data model

Based on the UI and integration behavior, key objects include:

```json
// Project (monitoring configuration)
{
  "id": 12345,
  "name": "My Brand Monitoring",
  "keywords": ["brand name", "product name"],
  "language": "en",
  "sources": ["twitter", "facebook", "news", "blogs", "forums"],
  "created_at": "2026-01-15T10:00:00Z"
}
```
<!-- Constructed from docs — verify against live API -->

```json
// Mention (single brand mention)
{
  "id": 987654,
  "project_id": 12345,
  "title": "Great experience with Brand24",
  "content": "Just tried Brand24 for our startup...",
  "url": "https://twitter.com/user/status/123",
  "source": "twitter",
  "author": "username",
  "author_followers": 5200,
  "sentiment": "positive",
  "reach": 15000,
  "engagement": 42,
  "language": "en",
  "published_at": "2026-05-01T14:30:00Z",
  "collected_at": "2026-05-01T14:31:00Z"
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: Push new mentions to Slack with sentiment filtering

**Trigger:** New mention detected in Brand24 project
**Steps:** Configure Slack integration with sentiment filter

1. Go to Account Settings → Integrations → Slack
2. Select your project from dropdown
3. Choose Slack channel for alerts
4. Configure alert frequency (real-time for crisis monitoring, daily digest for routine)

**Gotcha:** Slack integration pushes ALL mentions unless you set up separate projects for different alert levels. Create a "Crisis" project with negative keywords for real-time Slack alerts, and a "General" project for daily digests.

### Recipe 2: Connect Brand24 to Claude via MCP

**Trigger:** Want AI assistant to access monitoring data
**Steps:**

```
# In Claude Settings → Connectors → Add Custom Connector
Server URL: https://mcp.brand24.com/v1/mcp
Auth: OAuth
```

**Example prompts after connecting:**
- "Summarize what people are saying about [brand] this week"
- "What were the top 3 negative mentions in the last 24 hours?"
- "Compare our mention volume vs [competitor] this month"
- "Who are the top influencers mentioning us?"

**Gotcha:** MCP returns data from your active projects only — you can't query brands you're not monitoring.

### Recipe 3: Automate competitive reports via Zapier

**Trigger:** Weekly schedule (Zapier Schedule trigger)
**Steps:**

1. Create Brand24 projects for your brand + each competitor (matching keyword patterns)
2. In Zapier: Schedule trigger → Brand24 "Get Mentions" → Filter by date range → Google Sheets row
3. Add columns: brand, mention_count, positive_count, negative_count, top_source
4. Build a Google Sheets dashboard with SOV chart

**Gotcha:** Zapier connection has rate limits. For high-volume monitoring (10K+ mentions/mo), use the REST API for batch exports instead.

## Integration patterns

### Slack/Teams alert architecture

```
Brand24 Project → Storm Alert threshold → Slack #brand-alerts (real-time)
Brand24 Project → Daily digest → Slack #brand-daily (morning summary)
Brand24 Crisis Project → Any mention → Slack #crisis-response (immediate)
```

**Best practice:** Create separate Brand24 projects for different alert severity levels rather than trying to filter within one project.

### Zapier workflow patterns

**CRM enrichment:** New Brand24 mention → Check if author exists in CRM → Create/update contact with social mention data
**Ticketing:** New negative mention → Create support ticket in Zendesk/Freshdesk → Assign to social team
**Reporting:** Weekly schedule → Pull Brand24 data → Append to Google Sheets → Trigger Slack summary

### MCP integration pattern

The MCP server provides the simplest path to AI-powered brand monitoring workflows:

```
User question → Claude (with Brand24 MCP) → Real-time monitoring data → AI-generated insight
```

Use cases: Executive briefings, competitive analysis on-demand, crisis situation assessment, content strategy input.
