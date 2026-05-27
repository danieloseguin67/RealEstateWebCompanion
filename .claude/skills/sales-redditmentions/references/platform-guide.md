# RedditMentions Platform Reference

## Overview

RedditMentions is the cheapest Reddit keyword monitoring tool available — €4.49/mo entry point with email digests and Slack alerts. Scans every 30 minutes. No AI replies, no analytics, no API — pure monitoring and alerting. Founded July 2025 by Kakaruwai OÜ (Estonia).

## Capabilities & automation surface

| Capability | Access level |
|---|---|
| Keyword monitoring (posts + comments) | UI-only (all plans) |
| Daily email digest | All plans (configurable send time) |
| Slack notifications | All plans (OAuth 2.0, 60s setup) |
| Negative keywords | All plans |
| 7-day match history (filterable) | All plans |
| Duplicate prevention | All plans |
| Preview mode (free sample results) | Pre-trial |
| Data export | Not available |
| API | Not available |
| Webhooks | Not available |
| Zapier/Make | Not available |
| MCP server | Not available |
| AI comment generation | Not available |
| Sentiment analysis | Not available |
| Historical backfill | Not available |

**No programmatic access exists.** RedditMentions is entirely UI-driven with email and Slack as the only external outputs. If you need API/webhook access for Reddit monitoring, use Octolens ($119/mo, API + MCP on all plans) or Syften (€19.95/mo, API on Standard+).

## Pricing, limits & plan gates

| Plan | Monthly cost | Keywords | Subreddits | Match retention | Support |
|------|-------------|----------|-----------|----------------|---------|
| Free Preview | €0 | Limited | Limited | Sample only | — |
| Standard | €4.49/mo | 5 | 5 | 7 days | Email |
| Pro | €9.49/mo | 15 | 15 | 7 days | Priority email |

- 7-day free trial on both paid plans (no CC required)
- All paid plans include: unlimited matches, all notification methods, negative keywords
- No annual discount mentioned
- No overage option — hard keyword/subreddit caps
- **Monitoring frequency**: every 30 minutes (48 scans/day) on all plans
- **Coverage**: all public subreddits only (no private/restricted)

## Integrations

### Slack

- **Setup**: OAuth 2.0 authentication, ~60 seconds
- **Delivery**: real-time alerts to public or private channels
- **Configuration**: per-workspace, select channel during OAuth flow
- **Data flow**: RedditMentions → Slack (one-way push)

### Email

- **Daily digest**: single email with all matches from the past 24 hours
- **Timing**: user-configurable send time
- **Zero-match behavior**: no email sent if nothing matched
- **From address**: hello@redditmentions.com

### No other integrations

No CRM connectors, no Zapier, no Make, no webhooks, no API. The only way to get data out is email + Slack + manual dashboard viewing.

## Data model

RedditMentions has no API, so there's no programmatic data model. The dashboard displays:

- **Match**: A Reddit post or comment containing one of your keywords in a monitored subreddit
  - Fields visible: post title, comment text (excerpt), subreddit, author, timestamp, Reddit permalink
- **Keyword**: A search term you're monitoring (up to 5 or 15)
- **Subreddit**: A Reddit community you're monitoring (up to 5 or 15)
- **Negative keyword**: A term that excludes a match if present

No JSON, no export, no structured data access.

## Keyword strategy

### What makes a good keyword

- **Multi-word phrases** that signal buying intent: "best project management tool", "looking for CRM recommendation", "alternative to Notion"
- **Competitor names**: monitor direct competitors to find dissatisfied users
- **Problem phrases**: "frustrated with Trello", "need help with invoicing"
- **Misspellings and abbreviations** if your brand has common variants

### What to avoid

- **Single generic words**: "marketing", "tool", "software" — match everything
- **Your own brand** (if very common word): use negative keywords to filter
- **Overly long phrases**: Reddit comments rarely contain exact long matches

### Negative keyword tips

- Exclude gaming/entertainment contexts if your keywords are ambiguous
- Exclude bot accounts and common spam patterns
- Exclude meta-subreddits (r/SubredditDrama, r/bestof) if you only want direct discussions

## Subreddit selection strategy

### For SaaS/startup monitoring

- r/SaaS, r/startups, r/Entrepreneur, r/smallbusiness
- r/webdev, r/programming (if dev tool)
- Niche subreddits specific to your industry (r/accounting for accounting software, etc.)

### For consumer products

- r/BuyItForLife, r/ProductReviews
- Category-specific subreddits

### For competitor intelligence

- Competitor's subreddit (if they have one)
- r/SaaS, r/Entrepreneur where comparison discussions happen

## Troubleshooting reference

### Common issues

| Issue | Cause | Fix |
|---|---|---|
| No email received | Zero matches OR spam folder | Check dashboard for matches first, then check spam |
| Slack not firing | OAuth incomplete or wrong channel | Re-authorize in settings, verify channel selection |
| Too many matches | Keywords too broad | Switch to multi-word phrases, add negative keywords |
| Missing known mentions | Keyword spelling doesn't match OR subreddit not monitored | Add variants, check subreddit list |
| Matches disappearing | 7-day retention | By design — save important ones immediately |
| Preview shows results but trial doesn't | Different keywords/subreddits configured | Ensure trial uses same config as preview |

## Comparison with alternatives

| Tool | Price | Platforms | AI features | API | Best for |
|---|---|---|---|---|---|
| **RedditMentions** | €4.49/mo | Reddit only | None | None | Cheapest Reddit alerts |
| **F5Bot** | Free | Reddit + HN | None | None | Zero-budget alerts |
| **KWatch.io** | ~$19/mo | Reddit | Basic | None | Budget Reddit dashboard |
| **KeyMentions** | Free-$79/mo | Reddit | AI comments + auto-publish | None | Reddit lead gen with responses |
| **ThreadRadar** | $19.95/mo | Reddit + Quora | AI reply drafts | None | Reddit + Quora engagement |
| **Syften** | €19.95/mo | 15+ platforms | AI filtering | REST + webhooks | Multi-platform + API |
| **Octolens** | $119/mo | 13+ platforms | AI scoring + MCP | REST + webhooks + MCP | Developer-first with API |

### When RedditMentions is the right choice

- You want the **absolute cheapest** Reddit monitoring (€4.49/mo beats everything except free F5Bot)
- You only need **email + Slack alerts** — no API, no AI, no analytics
- You're monitoring a **small number** of keywords (5-15) across specific subreddits
- You want **zero learning curve** — setup in under 2 minutes

### When to choose something else

- Need API/webhooks → Syften or Octolens
- Need AI reply generation → KeyMentions or ThreadRadar
- Need competitive analytics → Threadlytics
- Need multi-platform → Syften, Octolens, or Awario
- Need free → F5Bot (no Slack, email only)
