---
name: sales-brandmentions
description: "BrandMentions platform help — social listening, brand monitoring, emotion AI sentiment analysis, competitor intelligence, Share of Voice, white-label reports, REST API (Enterprise only). Use when BrandMentions mentions are full of irrelevant noise and you need to tighten keyword queries, mention quota is hitting its limit before the month ends, sentiment analysis results seem inaccurate or emotion categories don't match your perception, you want to compare your brand's Share of Voice against competitors, you need to pull BrandMentions data into your CRM or dashboard via the API, BrandMentions alerts aren't catching mentions you know exist, or white-label reports need customization for client delivery. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in BrandMentions — e.g., 'too many irrelevant mentions' or 'how do I use the API to export mentions']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, platform]
---

# BrandMentions Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up brand monitoring (keywords, sources, alerts)
   - B) Reducing noise / filtering irrelevant mentions
   - C) Sentiment analysis and emotion tracking
   - D) Competitor analysis / Share of Voice
   - E) White-label reports for clients
   - F) API integration or data export
   - G) Billing, plan limits, or account issues
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($99/mo — 5kw, 5K mentions, daily updates)
   - B) Pro ($299/mo — 20kw, 30K mentions, hourly updates)
   - C) Expert ($499/mo — 50kw, 75K mentions, real-time, Boolean, white-label)
   - D) Enterprise ($1,299+/mo — API access, custom limits)
   - E) Free trial / evaluating

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Competitive intelligence beyond BrandMentions → `/sales-compete [question]`
- Media relations / PR outreach → `/sales-media-relations [question]`
- Influencer discovery → `/sales-influencer-marketing [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — BrandMentions platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Noise reduction** — review top 50 mentions, identify false positive patterns, add NOT exclusions, narrow source filters
2. **Quota management** — prioritize high-value keywords, reduce low-signal projects, consider plan upgrade
3. **Sentiment tuning** — manually correct high-impact mentions, review emotion categories for domain fit
4. **Competitive benchmarking** — set up identical monitoring for each competitor, track SOV monthly
5. **API integration** — confirm Enterprise plan, use PostSearch → callback → GetMentions pattern

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **API is Enterprise-only ($1,299+/mo).** There is no API access on Starter, Pro, or Expert plans. If you need programmatic access on a lower tier, your only option is CSV export. Contact support to activate your API key even on Enterprise.
- **Free trial billing can surprise you.** Some users report being charged immediately during what looks like a free trial. Read the signup flow carefully and check which plan gets auto-selected. Cancel before the 7-day trial ends to avoid charges.
- **Mention limit is a hard stop.** When you hit your monthly mention limit (5K/30K/75K), monitoring pauses — no partial results or degraded mode. Plan your keyword count and query specificity to avoid hitting the wall mid-month.
- **Boolean search is Expert+ only.** Starter and Pro plans only support basic keyword matching. If you need AND/OR/NOT operators to reduce noise, you need Expert ($499/mo) or higher.
- **No Zapier, Make, or webhook support.** The only programmatic interface is the REST API (Enterprise) or manual CSV export. No iPaaS connectors exist for automated workflows on lower plans.
- **Update frequency varies by plan.** Starter = daily, Pro = hourly, Expert/Enterprise = real-time. If you need crisis detection, daily updates on Starter won't cut it.

## Before recommending a specific platform skill

This skill covers a strategy domain across many platforms. **Before pointing the user to any specific platform skill** (any `/sales-{platform}` listed in `## Related skills`, e.g., `/sales-mailshake`, `/sales-klaviyo`, `/sales-apollo`), read that platform skill's actual `SKILL.md` first. The 1-line description in `## Related skills` is enough to *identify* a candidate — it's not enough to *commit* to it or to write a prompt that invokes it well.

**How to read it:**
- If `~/.claude/skills/{skill-name}/SKILL.md` exists locally, `Read` it.
- For `sales-*` skills, `WebFetch` directly from this repo: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/{skill-name}/SKILL.md` — e.g., for `sales-mailshake`: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/sales-mailshake/SKILL.md`.
- For non-`sales-*` skills (third-party), look up `{org}/{repo}` in `~/.claude/skills/sales-do/references/skill-sources.md` if installed and fetch the same `skills/{skill-name}/SKILL.md` path under that repo.

**After reading,** ground your recommendation in something concrete from the SKILL.md (its scope, a sub-flow, its `argument-hint` shape, or a "Do NOT use for..." negative trigger). Align any generated invocation with the platform skill's `argument-hint`. If the platform skill turns out not to fit the user's situation, swap to another or handle the question here directly rather than recommending a poor fit.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence, crisis detection
- `/sales-brand24` — Brand24 platform help — affordable alternative with MCP server and Storm Alerts
- `/sales-mention` — Mention platform help — simpler/cheaper monitoring starting at $41/mo
- `/sales-awario` — Awario platform help — budget social listening with Boolean search and social selling
- `/sales-mentionlytics` — Mentionlytics platform help — mid-market social listening with SIA AI advisor
- `/sales-talkwalker` — Talkwalker platform help — enterprise social listening with image recognition
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring
- `/sales-compete` — Competitive displacement strategy
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Too many irrelevant mentions
**User says**: "I'm monitoring our brand name but getting hundreds of unrelated mentions every day. How do I clean this up?"
**Skill does**:
1. Reviews the user's keyword setup and identifies common false positive patterns
2. Suggests NOT exclusions for homonyms, unrelated brands, and spam domains
3. Recommends narrowing source filters and using exact phrase matching
4. Notes that Boolean search (AND/OR/NOT) requires Expert plan or higher
**Result**: Cleaner mention feed with actionable alerts

### Example 2: API integration for dashboard
**User says**: "How do I use the BrandMentions API to pull mention data into my custom dashboard?"
**Skill does**:
1. Confirms the user is on Enterprise plan (API access requirement)
2. Walks through the async search pattern: PostSearch → wait for callback → GetMentions
3. Provides working cURL examples for creating a search and retrieving results
4. Notes the 1-hour search hash expiration and credit costs
**Result**: Working API integration pulling mentions into external dashboard

### Example 3: Client reporting with white-label
**User says**: "I run an agency and need to send branded reports to clients without BrandMentions branding showing"
**Skill does**:
1. Confirms Expert plan is required for white-label reports
2. Walks through report customization options
3. Suggests creating separate projects per client for clean data isolation
4. Recommends scheduling automated report delivery
**Result**: Branded client-ready reports configured

## Troubleshooting

### Mention limit hit mid-month
**Symptom**: Monitoring stops working before the billing cycle resets
**Cause**: Too many broad keywords consuming mention quota, or monitoring more brands/competitors than the plan supports
**Solution**: Audit your keyword list — remove low-value terms, add NOT exclusions to reduce false positives, consolidate overlapping projects. If consistently hitting limits, upgrade plans or reduce project count. The limit is a hard stop, not a soft cap.

### Mentions missing that you know exist
**Symptom**: You see a social post or article mentioning your brand, but BrandMentions didn't capture it
**Cause**: Keyword didn't match (misspelling, abbreviation, or hashtag not tracked), source not covered, or update frequency too slow (Starter = daily)
**Solution**: Add name variations, misspellings, and hashtags to your keyword list. Check which social platforms are included in your monitoring sources. If on Starter plan, upgrade to Pro (hourly) or Expert (real-time) for faster detection.

### Connectivity issues and slow loading
**Symptom**: Dashboard loads slowly, mentions appear with delays, or the app disconnects
**Cause**: Known issue reported by multiple users — server-side performance variability
**Solution**: Try a different browser or clear cache. If persistent, contact support@brandmentions.com. For time-sensitive monitoring, verify your alert email notifications are working as a backup channel even when the dashboard is slow.
