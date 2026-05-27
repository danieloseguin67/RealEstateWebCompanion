# KeyMentions Platform Reference

## Overview

KeyMentions is a Reddit-only marketing automation tool that monitors keywords across Reddit, delivers real-time alerts for high-traffic threads, and provides AI-generated comments with optional auto-publish. Built for indie hackers, startup founders, and marketers who want to intercept Reddit conversations where people are asking for product recommendations.

## Capabilities & automation surface

| Capability | Access level |
|---|---|
| Keyword monitoring | UI-only (all plans) |
| Real-time notifications (email + dashboard) | UI-only (all plans) |
| AI comment generation | UI-only (all plans, limited by plan) |
| Auto-publish comments | UI-only (all plans, daily/monthly limits) |
| Virality filter ("Reddit Time-Traveling") | UI-only (all plans) |
| Multi-project management | UI-only (Pro+: 3 projects, Agency: 5) |
| Data export | Not available |
| API | Not available |
| Webhooks | Not available |
| Zapier/Make | Not available |
| MCP server | Not available |

**No programmatic access exists.** KeyMentions is entirely UI-driven with email notifications as the only external output. If you need API/webhook/MCP access for Reddit monitoring, use Octolens ($119/mo, all plans) or Syften ($19.95/mo, Zapier webhooks).

## Pricing, limits & plan gates

| Plan | Monthly | Annual (20% off) | Keywords | Mentions/mo | Auto-publish/mo | Daily limit | Projects | Data retention |
|------|---------|-------------------|----------|-------------|-----------------|-------------|----------|----------------|
| Free | $0 | — | 3 | 30 | 3 | — | 1 | None |
| Starter | $29 | ~$23 | 3 | 300 | 30 | — | 1 | 1 month |
| Pro | $79 | ~$63 | 12 | 2,400 | 100 | 20/day | 3 | 6 months |
| Agency | $199 | ~$159 | 35 | 10,000 | 400 | 50/day | 5 | 2 years |

**Critical limits:**
- Mention limits are **hard caps** — monitoring stops when reached, no overage billing
- Auto-publish daily caps prevent burst activity (Pro: 20/day max even if monthly limit isn't reached)
- Data retention means historical mentions disappear after the retention window
- Free tier: no data retention at all — once it's gone, it's gone

**7-day free trial** (no credit card required) gives access to Pro features.

## Keyword strategy

### High-intent keywords (recommended)

Focus on keywords that signal buying intent or problem-solving:

| Pattern | Example | Why it works |
|---------|---------|-------------|
| "best [category] for [audience]" | "best CRM for solopreneurs" | Active evaluation phase |
| "looking for [category]" | "looking for email tool" | Explicit need |
| "[competitor] alternative" | "Mailchimp alternative" | Switching signal |
| "recommend [category]" | "recommend project management" | Asking for suggestions |
| "[problem] help" | "cold email deliverability help" | Pain point |

### Low-intent keywords (avoid — burns quota)

- Single generic words: "marketing", "sales", "email"
- Brand names without context: just "HubSpot" matches everything
- Overly broad phrases: "how to grow"

### Keyword optimization for quota

On Starter (300 mentions/mo):
- Use 2-3 highly specific multi-word phrases
- Enable virality filter to skip dead threads
- Monitor weekly — remove keywords that produce noise

On Pro (2,400 mentions/mo):
- Mix 4-5 intent keywords + 3-4 competitor keywords + 2-3 brand keywords
- Keep 1-2 keyword slots free to test new ones
- Rotate underperforming keywords monthly

## Auto-publish safety guide

### Reddit's anti-spam enforcement (2025-2026)

Reddit's 2025 enforcement wiped ~70% of automated posting accounts. The system now scores:
- Account age and karma
- Posting cadence regularity
- Link ratio (links in comments vs. text-only)
- Content duplication across threads
- Community response (downvotes, reports, removals)

### Safe auto-publish protocol

1. **Never auto-publish from a new account.** Minimum 30 days of manual activity and 500+ karma before enabling.
2. **Keep the 10% rule.** No more than 10% of your Reddit activity should be promotional. If you auto-publish 5 comments/day, manually post 45+ genuine comments/day (unrealistic — so limit auto-publish to 1-2/day and supplement with manual engagement).
3. **Vary your comment structure.** Don't always lead with "I've been using [product]..." — Reddit users spot templates instantly.
4. **Spread across subreddits.** Never post more than 1 promotional comment per subreddit per week.
5. **Never include links in auto-published comments.** Mention your product by name only. Add links only in follow-up replies when someone asks.
6. **Review before auto-publishing.** Use the AI comment generator as a draft, personalize heavily, then publish. The "auto" in auto-publish should mean "scheduled" not "unreviewed."

### Account warmup checklist

Before enabling any auto-publish features:

- [ ] Account is 30+ days old
- [ ] 500+ combined karma (post + comment)
- [ ] Active in 5+ subreddits with genuine engagement
- [ ] Has made 50+ non-promotional comments
- [ ] No prior bans or content removals
- [ ] Profile has a bio and avatar (signals human)

## Reddit Time-Traveling (virality detection)

KeyMentions' virality filter identifies threads that are gaining momentum before they peak. This helps you:

1. **Comment early** — Reddit's algorithm favors early comments (first 1-2 hours of a hot thread)
2. **Avoid dead threads** — Don't waste auto-publish quota on threads with 2 upvotes
3. **Catch recommendation threads** — Threads asking "what tool do you use for X?" often go viral in niche subreddits

**How to use effectively:**
- Enable virality filter on all keywords (reduces noise by 60-80%)
- Check notifications within 1 hour of alert (threads peak fast)
- Prioritize threads with 5+ comments already (shows active discussion)

## Integrations

**None.** KeyMentions has no API, webhooks, Zapier/Make modules, or MCP server.

**Workarounds for data flow:**
- Email notifications → email-to-Slack/CRM via Zapier (indirect)
- Manual copy-paste from dashboard → spreadsheet tracking
- Screenshot dashboard → Notion/documentation

**If you need programmatic Reddit monitoring:**
- **Octolens** ($119/mo) — REST API + webhooks + MCP server, 13+ platforms including Reddit
- **Syften** ($19.95/mo) — Slack integration + Zapier webhooks, Reddit + HN + multiple platforms
- **SnitchFeed** ($29/mo) — Webhook support + CSV exports + n8n/Zapier
- **Xpoz** (free tier) — MCP server + SDKs, raw Reddit data API

## Competitive positioning

| Feature | KeyMentions | Threadlytics | Octolens | Syften | F5Bot |
|---------|-------------|--------------|----------|--------|-------|
| **Price** | $29/mo | $15/mo | $119/mo | $19.95/mo | Free |
| **Reddit depth** | Keywords + virality | 500M+ conversations, SOV, SERP | Keywords + AI scoring | Keywords + sentiment | Keywords only |
| **AI comments** | Yes (auto-publish) | No | No | No | No |
| **Multi-platform** | No (Reddit only) | No (Reddit only) | Yes (13+ platforms) | Yes (Reddit, HN, X, YouTube) | Reddit, HN, Lobsters |
| **API/webhooks** | No | Enterprise only | Yes (all plans) | Zapier webhooks | No |
| **Best for** | Reddit engagement/lead gen | Reddit competitive intel | Developer monitoring | Filtered alerts | Basic free alerts |

**Choose KeyMentions when:** You want to actively engage on Reddit (not just monitor) and need AI-assisted comment generation. The unique value is the engagement layer — monitoring + response in one tool.

**Don't choose KeyMentions when:** You need API access, multi-platform coverage, competitive intelligence, or deep analytics. It's a lead generation tool, not a social listening platform.
