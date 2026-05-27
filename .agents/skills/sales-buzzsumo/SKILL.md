---
name: sales-buzzsumo
description: "BuzzSumo platform help — content intelligence, trending topic discovery, content performance research, journalist database (700K+), influencer identification, monitoring alerts, and Search/Account/Backlinks REST APIs. Use when BuzzSumo search results are returning irrelevant content and you need better query filters, trending feeds aren't showing topics relevant to your niche, journalist database isn't surfacing the right reporters for your pitch, API call limits are exhausting too quickly on your plan, you need to pull BuzzSumo data into your dashboard or CRM via the API, content analysis isn't showing accurate share counts, or you're unsure whether BuzzSumo is worth $199/mo vs cheaper alternatives. Do NOT use for social listening strategy across tools (use /sales-social-listening) or media relations strategy (use /sales-media-relations)."
argument-hint: "[describe your BuzzSumo question — e.g., 'find trending content in my niche' or 'pull content data via API']"
license: MIT
version: 1.0.0
tags: [sales, content-research, media-monitoring, platform]
github: "https://github.com/BuzzSumo"
---

# BuzzSumo Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Finding trending content or content ideas
   - B) Researching competitor content performance
   - C) Finding journalists or influencers
   - D) Setting up monitoring alerts
   - E) Using the BuzzSumo API for automation
   - F) Understanding pricing / whether BuzzSumo is worth it
   - G) Something else — describe it

2. **What's your plan?**
   - A) Content Creation ($199/mo)
   - B) PR & Comms ($299/mo)
   - C) Suite ($499/mo)
   - D) Enterprise ($999/mo)
   - E) Not sure / evaluating

3. **What's your primary use case?**
   - A) Content marketing — finding what to write about
   - B) PR / media outreach — finding journalists
   - C) Competitive intelligence — seeing what works for competitors
   - D) Influencer discovery — finding who shares content in my space
   - E) API integration — pulling data into my own tools

**If the user's request already provides most of this context, skip directly to the relevant step.**

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Social listening strategy across tools | `/sales-social-listening [question]` |
| Media relations strategy (not BuzzSumo-specific) | `/sales-media-relations [question]` |
| Influencer marketing strategy | `/sales-influencer-marketing [question]` |
| SEO / keyword research | `/sales-seo [question]` |
| Content enablement for sales reps | `/sales-content [question]` |

If it's a BuzzSumo-specific question, continue to Step 3.

## Step 3 — BuzzSumo platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API details, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Content research**: Start with Content Analyzer using domain filters and date ranges. Use Question Analyzer for long-tail topic ideas. Compare against competitor domains.
- **Journalist outreach**: Filter media database by beat, recency of publishing, and social engagement. Export to your outreach tool.
- **API integration**: Start with the Search API for content data. Account API for alerts/projects management. Monitor your 100-call monthly limit.
- **Value assessment**: Compare against Ahrefs Content Explorer ($199/mo with full SEO suite) or Exploding Topics ($39/mo for trend detection only).

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **API limits are extremely low** — free API key gives only 100 Search API calls/month. Need more? Must apply and get approved case-by-case.
- **No free plan** — discontinued in 2025. Only a 30-day trial with 50 total searches (not per month).
- **Media Database is PR & Comms+ only** — Content Creation plan ($199/mo) has no journalist access.
- **RSS Feed Sync is Enterprise only** ($999/mo) — can't pipe feeds to Zapier/IFTTT on lower plans without manual setup.
- **Share counts may be inaccurate** — Facebook deprecated public share counts; BuzzSumo metrics are best-effort estimates for some platforms.
- **B2B content coverage is weaker** — platform indexes viral/high-share content better than niche B2B articles with low social engagement.
- **Slack integration requires PR & Comms+** — Content Creation plan has no Slack alerts.

## Related skills

- `/sales-social-listening` — Social listening strategy, platform comparison, monitoring setup
- `/sales-media-relations` — Media relations strategy, journalist databases, pitch writing
- `/sales-influencer-marketing` — Influencer marketing strategy across platforms
- `/sales-seo` — SEO strategy, content optimization, keyword research
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

**Example 1**: "What content is performing best for my competitor?"
→ Use Content Analyzer: search competitor's domain, filter by last 6 months, sort by total engagements. Compare their top 10 articles against yours. Look for topic gaps they're winning on.

**Example 2**: "How do I find journalists who cover AI startups?"
→ PR & Comms plan required. Filter media database by beat "artificial intelligence" + "startups", sort by recent publication activity. Check their social engagement metrics to prioritize active journalists over dormant ones.

**Example 3**: "How do I pull trending articles into my own dashboard via the API?"
→ Use Search API: `GET https://api.buzzsumo.com/search/articles.json?q=your+topic&api_key=YOUR_KEY`. Parse the JSON response for article URLs, share counts, and publication dates. Mind the 100 calls/month limit — cache aggressively.

## Troubleshooting

**Content search returns irrelevant results**
Filter by date range (last 3-6 months), specific domains, and minimum engagement thresholds. Use exact phrase matching with quotes. Exclude known noise domains. For B2B content, try searching specific industry publications rather than broad topic keywords.

**API calls exhausting too quickly**
With only 100 Search API calls/month on free keys, cache every response locally. Batch requests by building comprehensive queries (multiple keywords in one call). Consider if Ahrefs Content Explorer API ($199/mo with 1000x more capacity) better suits your volume needs.

**Trending feeds show nothing relevant to my niche**
BuzzSumo trends skew toward high-volume B2C content. For niche topics: use Content Analyzer with specific industry terms instead of Trending Feeds. Set up Monitoring Alerts with narrow keyword combinations for your specific space.
