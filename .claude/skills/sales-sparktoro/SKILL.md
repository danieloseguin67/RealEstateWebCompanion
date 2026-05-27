---
name: sales-sparktoro
description: "SparkToro platform help — audience intelligence revealing where target audiences spend attention online (websites, podcasts, YouTube channels, subreddits, social accounts). Use when you need to discover where your audience hangs out before choosing ad placements or partnerships, SparkToro search quota runs out too fast during market research, audience data seems inaccurate or shows wrong subscriber counts, you want to find podcasts or YouTube channels that reach your target buyers, you need to build a persona based on real audience behavior not guesswork, SparkToro reports show sparse or no data for non-US markets, or you want to compare SparkToro vs Reddinbox or other audience research tools. Do NOT use for social listening or brand monitoring (use /sales-social-listening), social media publishing or scheduling (use /sales-social-media-management)."
argument-hint: "[describe what you need help with in SparkToro]"
license: MIT
version: 1.0.0
tags: [sales, audience-intelligence, audience-research, platform]
---

# SparkToro Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Running an audience research query and interpreting results
   - B) Understanding which plan fits my needs
   - C) Exporting data or working around no integrations
   - D) Data accuracy issues (missing or wrong results)
   - E) Comparing SparkToro to alternatives
   - F) Something else — describe it

2. **What's your use case?**
   - A) Content strategy — finding where to publish/guest post
   - B) Ad targeting — discovering the right channels to advertise on
   - C) Partnership/sponsorship — identifying podcasts, newsletters, influencers to partner with
   - D) Persona development — building audience profiles from real data
   - E) Competitive research — understanding competitor audiences
   - F) PR/media — finding publications that reach my audience

3. **Current SparkToro plan?**
   - A) Free (5 reports/mo)
   - B) Personal ($50/mo, 50 reports)
   - C) Business ($150/mo, 500 reports)
   - D) Agency ($300/mo, unlimited)
   - E) Not signed up yet

**If the user's request already provides most of this context, skip directly to the relevant step.**

## Step 2 — Route or answer directly

If the request maps to a different skill, route:
- Social listening / brand monitoring / mention tracking → `/sales-social-listening [question]`
- Audience research from Reddit/forum conversations → `/sales-reddinbox [question]`
- Social media management / publishing → `/sales-social-media-management [question]`
- Influencer discovery or campaign tracking → `/sales-influencer-marketing [question]`
- SEO keyword research → `/sales-seo [question]`
- Content strategy → `/sales-content [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — SparkToro platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, export workflows, comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Query design** — help craft effective search queries (audience descriptions, hashtags, topic phrases)
2. **Result interpretation** — explain affinity scores, audience overlap, demographic breakdowns
3. **Data export workflow** — CSV export strategies, manual integration patterns
4. **Plan optimization** — help maximize report quota on their current plan
5. **Alternative recommendation** — if SparkToro isn't the right fit, suggest alternatives

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about data coverage and plan limits that may change.*

- **No API, no integrations, no webhooks.** SparkToro is entirely UI-driven with CSV export as the only data extraction method. You cannot pipe data to CRM, marketing automation, or analytics tools. API and MCP server are on a waitlist but not yet available.
- **Report quotas burn fast.** Each unique search query counts as a report. The Free plan gives only 5/mo, Personal gives 50/mo. Plan your queries before searching — batch similar questions into fewer, broader queries.
- **Data accuracy varies by audience size.** SparkToro works best for large, well-defined audiences. Niche B2B audiences or small markets may return sparse or inaccurate data (e.g., showing zero YouTube subscribers for channels with 100K+).
- **Non-English and non-US data is thin.** Coverage degrades significantly outside English-speaking markets. Don't rely on SparkToro for international audience research.
- **SparkToro is not social listening.** It shows what audiences follow and consume — not what they say about you. For brand monitoring, mention tracking, or sentiment analysis, use a social listening tool instead.
- **No real-time data.** Reports reflect historical audience behavior patterns, not live trends or conversations.

## Related skills

- `/sales-social-listening` — Social listening and brand monitoring strategy — tool comparison, monitoring setup, sentiment analysis, competitive intel
- `/sales-reddinbox` — Reddinbox platform help — AI audience intelligence from Reddit/X/HN conversations, intent scoring, market briefs
- `/sales-influencer-marketing` — Influencer discovery and campaign tracking
- `/sales-content` — Sales content management and strategy
- `/sales-seo` — SEO strategy — keyword research, technical audits, link building
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Find podcast sponsorship opportunities
**User says**: "I sell a project management SaaS for freelancers. Where should I sponsor podcasts?"
**Skill does**:
1. Runs a SparkToro query for audiences interested in freelancing + project management
2. Identifies top podcasts by audience affinity score
3. Filters for podcasts in the right size range for sponsorship (not too big, not too small)
4. Provides a ranked list with audience overlap data
**Result**: Prioritized podcast sponsorship target list based on real audience data

### Example 2: Export audience data for ad targeting
**User says**: "How do I get SparkToro data into my Google Ads campaigns?"
**Skill does**:
1. Explains there's no direct integration — CSV export is the only option
2. Walks through exporting the website list as CSV
3. Shows how to use exported URLs as custom audience signals in Google Ads
4. Suggests saving report quota by running one broad query rather than multiple narrow ones
**Result**: Manual but workable pipeline from SparkToro to ad targeting

### Example 3: Compare SparkToro vs Reddinbox
**User says**: "Should I use SparkToro or Reddinbox for startup idea validation?"
**Skill does**:
1. Explains SparkToro shows audience consumption patterns (what they follow) while Reddinbox surfaces audience conversations (what they say)
2. For idea validation, Reddinbox's conversation-level data (pain points, purchase intent) is more actionable
3. SparkToro is better for channel discovery (where to advertise/publish) once the idea is validated
4. Recommends Reddinbox for validation, SparkToro for distribution strategy
**Result**: Clear recommendation with reasoning tied to the user's specific goal

## Troubleshooting

### SparkToro shows inaccurate data for a known audience
**Symptom**: Results show zero or very low numbers for YouTube channels, podcasts, or social accounts you know are popular
**Cause**: SparkToro's data coverage varies by platform and audience size. Smaller or newer accounts may not be indexed. Some data sources refresh less frequently.
**Solution**: Try broader search terms to increase sample size. Cross-reference with other tools (YouTube Analytics, podcast directories). Report data issues to SparkToro support. If the audience is small or niche, SparkToro may not be the right tool — consider Reddinbox or direct platform research instead.

### Search quota runs out before end of month
**Symptom**: You've used all your monthly reports and need more searches
**Cause**: Each unique query consumes one report from your monthly quota. Exploratory searching burns through quota quickly.
**Solution**: Plan queries in advance — write down exactly what you want to learn before searching. Use broader queries (e.g., "marketing managers" instead of "B2B SaaS marketing managers in Austin") to get more data per report. Consider upgrading: Personal ($50/mo) gives 50, Business ($150/mo) gives 500. Export CSV from each report immediately so you don't re-run the same query later.

### Reports show sparse data for non-US markets
**Symptom**: Searching for audiences in non-English-speaking countries returns minimal or no results
**Cause**: SparkToro's data sources skew heavily toward English-speaking, US-centric content. Coverage of non-English social accounts, podcasts, and websites is limited.
**Solution**: Use English-language search terms even for non-US audiences (many global audiences consume English content). Supplement SparkToro with region-specific tools (e.g., Audiense for Twitter/X audience analysis globally). For non-English markets, consider Meltwater or Brandwatch which have stronger international coverage.
