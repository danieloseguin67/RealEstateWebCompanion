# Buzzabout Platform Reference

## Overview

Buzzabout is an AI-powered social media intelligence platform that analyzes billions of conversations across Reddit, TikTok, YouTube, Instagram, LinkedIn, and X to produce audience insights, sentiment analysis, trend tracking, and competitive intelligence. Target audience: marketers, product teams, and founders who need to understand what audiences actually think and feel about topics — not just mention counts. Primary differentiator: AI-first analysis that surfaces motivations and reasoning behind conversations, plus synthetic audience segmentation.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Multi-platform research** | Analyze conversations across Reddit, TikTok, YouTube, Instagram, LinkedIn, X | UI (all plans) |
| **Profile analysis** | Analyze specific social profiles by direct URL | UI (all plans) |
| **Sentiment analysis** | AI-powered sentiment that goes beyond pos/neg to understand motivations | UI (all plans) |
| **Trend & narrative tracking** | Identify emerging narratives and track topic shifts over time | UI (all plans) |
| **Synthetic audience segmentation** | AI-generated audience segments for personalized messaging | UI (all plans) |
| **Competitive research** | Reverse-engineer competitor strategies from social conversations | UI (all plans) |
| **AI Chat interface** | Conversational data exploration — ask follow-up questions about analyzed data | UI (all plans) |
| **Chart builder** | Create and share visualizations within the platform | UI (all plans) |
| **Language localization** | Filter results by language preference | UI (all plans) |
| **Slack alerts** | Native Slack integration for narrative tracking alerts | UI (all plans) |
| **Zapier webhook** | Insert Zapier webhook URL as digest destination for automation | Webhook (all plans) |
| **API access** | REST API for programmatic data access | Enterprise only |
| **Custom data sources** | Add proprietary or custom data sources to analysis | Enterprise only |

## Pricing, limits & plan gates

| Feature | Pro ($49/mo) | Business ($149/mo) | Enterprise (custom) |
|---|---|---|---|
| Research Hours (RH) | 200/mo | 600/mo | Unlimited |
| Overage rate | $0.25/RH | $0.25/RH | N/A |
| Credit rollovers | Yes | Yes | N/A |
| AI Assistant | Yes | Yes | Yes |
| Narrative tracking | Yes | Yes | Yes |
| Parallel researches | Yes | Yes | Yes |
| Custom date range | Yes | Yes | Yes |
| Audience analysis | Yes | Yes | Yes |
| Seats | Up to 5 | Up to 5 | Unlimited |
| API access | No | No | Yes |
| Custom data sources | No | No | Yes |
| Managed service | No | No | Yes |
| Premium support | No | No | Yes |

**Billing options**: Monthly, yearly, or one-time top-ups for additional credits.

**Free trial**: Available on Pro and Business plans.

**Credit system**: Research Hours (RH) are consumed per analysis. Broader queries and longer date ranges consume more credits. Exact consumption per query is not publicly documented — monitor usage in-dashboard.

## Integrations

| Integration | Direction | Plans | Notes |
|---|---|---|---|
| **Slack** | Buzzabout → Slack (push alerts) | All | Native integration for narrative tracking alerts |
| **Zapier** | Buzzabout → Zapier (webhook push) | All | Insert Zapier webhook URL as digest destination URL; triggers on digest delivery |
| **REST API** | Bidirectional | Enterprise only | No public documentation available |
| **Custom integrations** | Varies | Enterprise only | Via API and managed service |

**Automation workaround for Pro/Business**: Use the Zapier webhook to pipe digests to any Zapier-connected app. Common pattern: Buzzabout digest → Zapier webhook → OpenAI (generate content ideas) → Slack channel.

## Data model

Buzzabout does not expose a public data model or API schema. The following is inferred from platform features:

```json
// Research query (conceptual — no public API schema)
<!-- Constructed from docs — verify against live API -->
{
  "topic": "AI writing tools",
  "platforms": ["reddit", "tiktok", "youtube"],
  "date_range": {"start": "2026-04-01", "end": "2026-05-01"},
  "language": "en",
  "analysis_type": "audience_insights"
}

// Insight result (conceptual)
<!-- Constructed from docs — verify against live API -->
{
  "sentiment": {
    "positive": 0.42,
    "negative": 0.18,
    "neutral": 0.40,
    "top_motivations": ["frustration with existing tools", "desire for faster output"]
  },
  "trends": [
    {"narrative": "AI replacing human writers", "direction": "rising", "volume_change": "+34%"},
    {"narrative": "AI as writing assistant", "direction": "stable", "volume_change": "+2%"}
  ],
  "audience_segments": [
    {"segment": "Content marketers", "size_pct": 0.35, "top_pain": "content quality at scale"},
    {"segment": "Solo founders", "size_pct": 0.28, "top_pain": "time to publish"}
  ]
}
```

## Quick-start recipes

### Recipe 1: Daily trending topic alerts to Slack via Zapier

**Trigger**: Buzzabout daily digest delivery → Zapier webhook
**Steps**:
1. In Buzzabout, create a research topic for your niche (e.g., "AI writing tools")
2. Set up a daily digest schedule
3. Create a Zapier Zap with trigger "Webhooks by Zapier" → "Catch Hook"
4. Copy the Zapier webhook URL
5. In Buzzabout, paste the webhook URL as the digest destination URL
6. Add a Zapier action: "Slack" → "Send Channel Message"
7. Map the digest content to the Slack message body

**Gotcha**: The webhook payload format is not publicly documented. Test with a sample digest first to map fields in Zapier.

### Recipe 2: Competitive narrative analysis

**Steps**:
1. Create separate research topics for your brand and each competitor
2. Set identical date ranges and platform filters
3. Compare sentiment breakdowns — where are competitors perceived more positively?
4. Use the AI Chat to ask: "What unmet needs do users express about [competitor]?"
5. Export charts for stakeholder reports

**Gotcha**: Each research topic consumes RH independently. Running 4 competitor analyses at once can burn 50+ RH depending on data volume.

### Recipe 3: Idea validation via Reddit conversation analysis

**Steps**:
1. Create a research topic with your product category keywords
2. Filter to Reddit only (strongest data source)
3. Set date range to last 90 days
4. Review pain points and unmet needs in the AI analysis
5. Use synthetic audience segments to identify which user groups have the strongest demand signals
6. Use AI Chat to drill into specific pain points: "Show me what solo founders say about [problem]"

**Gotcha**: Synthetic audiences are derived from conversation patterns — they represent discussion participants, not verified buyer personas. Cross-reference with actual customer data.

## Integration patterns

### Zapier webhook pattern

Buzzabout's only automation surface on Pro/Business plans. Insert Zapier's webhook URL as the digest destination to receive structured topic data.

**Setup**:
1. Create Zapier "Webhooks by Zapier" trigger (Catch Hook)
2. Copy the generated webhook URL
3. In Buzzabout settings, paste as digest destination URL
4. Test by triggering a manual digest
5. Map webhook payload fields to downstream actions

**Limitations**:
- Push-only (Buzzabout → Zapier), no pull/query capability
- Payload schema undocumented — must inspect test payload
- Tied to digest schedule (daily/weekly/monthly), not real-time
- No webhook signature verification documented

### Enterprise API pattern

Enterprise plan includes API access with custom integrations. No public documentation available. Contact Buzzabout sales for API specs, rate limits, and authentication details.
