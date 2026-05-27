---
name: sales-talkwalker
description: "Talkwalker platform help — enterprise social listening, media monitoring, consumer intelligence, image/logo recognition, Blue Silk AI, Streaming API, Hootsuite integration. Use when Talkwalker search queries return too much noise and need Boolean refinement, image recognition isn't detecting your logo in visual content, Streaming API connection drops or stops delivering results, data export restrictions are blocking your reporting pipeline, API credit consumption is higher than expected, you need to pull Talkwalker data into your CRM or BI tool via REST API, or the Talkwalker dashboard feels overwhelming and you don't know where to start. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Talkwalker]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, media-monitoring, consumer-intelligence, platform]
---

# Talkwalker Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (queries, topics, alerts)
   - B) Image recognition / visual analytics
   - C) API integration or data export
   - D) Competitive benchmarking / Share of Voice
   - E) Blue Silk AI or Yeti Agent configuration
   - F) Streaming API setup
   - G) Dashboard and reporting
   - H) Something else — describe it

2. **Which Talkwalker plan are you on?**
   - A) Core
   - B) Analyze
   - C) Business
   - D) Not sure / evaluating

3. **What's your integration goal?**
   - A) Just using the UI — no integration needed
   - B) Pulling data into a BI tool or dashboard
   - C) CRM sync (Salesforce, HubSpot, etc.)
   - D) Building a custom pipeline via the API
   - E) Connecting through Zapier

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

- Social listening strategy across tools → `/sales-social-listening [question]`
- Social media management or publishing → `/sales-social-media-management [question]`
- Hootsuite-specific features → `/sales-social-media-management [question]`
- Media relations or journalist databases → `/sales-media-relations [question]`
- Influencer discovery → `/sales-influencer-marketing [question]`
- AI visibility monitoring → `/sales-ai-visibility [question]`

Otherwise, answer directly from the platform reference.

## Step 3 — Talkwalker platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API details, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Query optimization** — refine Boolean queries, add NOT exclusions, test with quicksearch
2. **API integration** — authenticate, choose Search vs Streaming, handle pagination and credits
3. **Image recognition** — configure logo detection, set confidence thresholds
4. **Reporting** — build dashboards, export data, automate reports
5. **Cost control** — monitor credit usage, optimize API calls, reduce noise

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No self-serve API access.** You must contact Talkwalker sales to get an API token. The `demo` token only works with `cats`, `dogs`, and `cats AND dogs` queries on blogs/forums/news. Plan for sales call delays when scoping API integrations.
- **Data export restrictions are strict.** Facebook/Instagram content is aggregated-only via Histogram API. Twitter exports limited to tweet ID, author ID, and sentiment. Full news article content is truncated. Many source types cannot be exported at all (LinkedIn, Reddit raw data, Chinese sources).
- **Steep learning curve.** The platform is not plug-and-play. Users consistently report needing onboarding and training before getting value. Budget time for ramp-up.
- **Credit consumption adds up fast.** Every API result costs 1 credit (minimum 10 per call). AI summaries cost 20 credits each. Monitor credit usage carefully and optimize `hpp` and query scope to avoid overages.
- **Pricing is non-transparent.** No public pricing — you must go through sales for a quote. Annual contracts required. Expect $9K-26K+/year depending on tier and usage.
- **Hootsuite overlap.** Since the acquisition, Talkwalker powers Hootsuite Listening. If you're already on Hootsuite, you may have Talkwalker capabilities built in — check before buying separately.
- **Quicksearch excludes social media.** The non-project Search API only returns blogs, forums, and news. Social media data requires project-scoped queries with a paid access token.

## Before recommending a specific platform skill

This skill covers a strategy domain across many platforms. **Before pointing the user to any specific platform skill** (any `/sales-{platform}` listed in `## Related skills`, e.g., `/sales-mailshake`, `/sales-klaviyo`, `/sales-apollo`), read that platform skill's actual `SKILL.md` first. The 1-line description in `## Related skills` is enough to *identify* a candidate — it's not enough to *commit* to it or to write a prompt that invokes it well.

**How to read it:**
- If `~/.claude/skills/{skill-name}/SKILL.md` exists locally, `Read` it.
- For `sales-*` skills, `WebFetch` directly from this repo: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/{skill-name}/SKILL.md` — e.g., for `sales-mailshake`: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/sales-mailshake/SKILL.md`.
- For non-`sales-*` skills (third-party), look up `{org}/{repo}` in `~/.claude/skills/sales-do/references/skill-sources.md` if installed and fetch the same `skills/{skill-name}/SKILL.md` path under that repo.

**After reading,** ground your recommendation in something concrete from the SKILL.md (its scope, a sub-flow, its `argument-hint` shape, or a "Do NOT use for..." negative trigger). Align any generated invocation with the platform skill's `argument-hint`. If the platform skill turns out not to fit the user's situation, swap to another or handle the question here directly rather than recommending a poor fit.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment, competitive intel, crisis detection, tool comparison
- `/sales-brand24` — Brand24 platform help — affordable social listening alternative with MCP server
- `/sales-awario` — Awario platform help — budget social listening with Boolean search and Awario Leads
- `/sales-mention` — Mention platform help — simple affordable brand monitoring, REST API
- `/sales-brandwatch` — Brandwatch platform help — enterprise consumer intelligence, deep audience research
- `/sales-meltwater` — Meltwater platform help — enterprise media intelligence, journalist database
- `/sales-sproutsocial` — Sprout Social platform help — social management + listening add-on
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring
- `/sales-social-media-management` — Social media management strategy across tools
- `/sales-ai-visibility` — AI visibility monitoring — track brand in LLMs
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up brand monitoring with image recognition
**User says**: "I want to track our logo appearing in social media images and news articles using Talkwalker"
**Skill does**:
1. Reads platform-guide.md for Image API details
2. Explains the three detection types: logo, object, scene
3. Provides cURL example for logo detection endpoint
4. Notes that image URL prefixes must be whitelisted by Talkwalker support
5. Suggests combining Search API keyword monitoring with Image API visual detection
**Result**: Dual monitoring setup covering both text mentions and visual brand appearances

### Example 2: Build an API pipeline to export mentions to a data warehouse
**User says**: "I need to pull all brand mentions from Talkwalker into BigQuery daily"
**Skill does**:
1. Reads platform-guide.md for Search API and Streaming API details
2. Recommends Streaming API for continuous ingestion vs Search API for batch
3. Provides Python recipe for paginated Search API extraction
4. Warns about data export restrictions (FB/IG aggregated only, Twitter limited)
5. Suggests credit-efficient pagination strategy (hpp=500, manage offset limits)
**Result**: Working pipeline architecture with code examples and cost optimization

### Example 3: Reduce noise in social listening results
**User says**: "Our Talkwalker monitoring returns thousands of irrelevant mentions every day"
**Skill does**:
1. Diagnoses likely cause: overly broad queries, missing NOT exclusions
2. Explains Boolean refinement: exact phrases, NOT operator, topic filters
3. Suggests testing with quicksearch endpoint first (240 calls/min, no project needed)
4. Recommends using `noise_level` field to filter low-quality content programmatically
5. Shows how to use topic and channel filters in project-scoped queries
**Result**: Refined monitoring with significantly less noise

## Troubleshooting

### API returns empty or limited results
**Symptom**: Search API calls return few or no results despite matching content visible in the UI
**Cause**: Using quicksearch endpoint (non-project) which excludes all social media. Or `access_token=demo` which only works with `cats`/`dogs` queries.
**Solution**: Use the project-scoped endpoint (`/api/v1/search/p/<project_id>/results`) with a valid paid token. Verify your token type is `read_only` or `read_write`, not `demo`.

### Streaming API connection drops
**Symptom**: Real-time stream stops delivering results or returns CT_CONTROL messages without data
**Cause**: Streaming connections can be interrupted by network issues or rule changes. Manual tag updates and rule-applied tags don't transmit through streams.
**Solution**: Implement reconnection logic with exponential backoff. Monitor CT_CONTROL messages for stream status. For rules and tags that need to appear in stream output, configure them before starting the stream — changes mid-stream require reconnecting.

### Credit consumption unexpectedly high
**Symptom**: API credits deplete faster than expected
**Cause**: Each result costs 1 credit (min 10/call). AI summaries cost 20 credits. Broad queries with high hpp values drain credits quickly.
**Solution**: Use `hpp` strategically — request only what you need. Filter queries tightly with Boolean operators and time ranges. Avoid enabling `summarize=true` on high-volume endpoints. Track credits per call and set internal budgets per integration.
