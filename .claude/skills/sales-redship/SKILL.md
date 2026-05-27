---
name: sales-redship
description: "RedShip platform help — AI-powered Reddit monitoring with relevance scoring (0-100), SEO post discovery, real-time alerts, AI reply drafts, webhooks, and REST API. Use when RedShip relevance scores don't match what you'd consider a good lead, SEO scan isn't finding posts that rank for your keywords, real-time alerts are delayed or missing posts you see manually, AI reply suggestions sound generic and don't match your voice, webhook notifications aren't firing to your endpoint, you want to pull RedShip inbox data into your CRM or dashboard via the API, auto DMs are hitting daily limits too fast, or you're comparing RedShip vs KeyMentions vs ThreadRadar for Reddit engagement. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in RedShip — e.g., 'relevance scores are too low for good threads']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# RedShip Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (keywords, website analysis)
   - B) Improving relevance scores / reducing noise
   - C) SEO post discovery (finding posts ranking on Google)
   - D) Real-time post or comment alerts
   - E) AI reply suggestions (quality, tone)
   - F) Webhook or API integration
   - G) Auto DM configuration and limits
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($19/mo — 1 website, 10 keywords, 30 DMs/day)
   - B) Growth ($39/mo — 3 websites, 30 keywords, 100 DMs/day)
   - C) Professional ($89/mo — 10 websites, 80 keywords, 300 DMs/day)

3. **What's your goal?**
   - A) Lead generation (find people asking for product recommendations)
   - B) Brand monitoring (track mentions of my product/company)
   - C) Competitor monitoring (watch competitor discussions)
   - D) SEO-driven engagement (comment on posts ranking in Google)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit) → `/sales-social-listening [question]`
- Reddit monitoring with competitive intelligence / Share of Voice → `/sales-threadlytics [question]`
- Reddit monitoring with auto-publish comments → `/sales-keymentions [question]`
- Reddit + Quora monitoring with AI reply drafts → `/sales-threadradar [question]`
- Reddit monitoring with API/MCP across 13+ platforms → `/sales-octolens [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — RedShip platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API recipes, webhook setup, keyword strategy.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — RedShip auto-generates keywords from your website; refine by removing generic terms and adding buying-intent phrases
2. **Relevance tuning** — use min_score filter (API) or decline low-quality items to train your eye
3. **SEO vs real-time** — SEO posts have long-tail value (rank on Google for months); real-time posts are for timely engagement
4. **Reply approach** — use AI drafts as starting points, always personalize before posting

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan limits and auto DM behavior.*

- **Auto DMs risk account bans.** Reddit aggressively flags unsolicited DMs as spam. Use sparingly and only for genuine conversations, not cold pitching. Your account can get suspended.
- **Keyword limits are hard caps per plan.** Starter gets 10 keywords only. No overage option — upgrade or consolidate.
- **SEO scan is weekly, not daily.** Posts ranking on Google are discovered on a weekly scan cycle. Don't expect same-day SEO results.
- **AI replies are suggestions only.** RedShip intentionally doesn't auto-post — you must manually post replies on Reddit. This protects your account but requires daily action.
- **Webhook payloads are undocumented.** Webhook support exists but the exact payload schema isn't publicly documented. Test with a request catcher first.
- **Reddit-only.** Does not monitor X, LinkedIn, HN, or any other platform. Pair with another tool if needed.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-keymentions` — KeyMentions platform help — Reddit monitoring with AI comment generation and auto-publish
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring with 500M+ indexed conversations, Share of Voice
- `/sales-octolens` — Octolens platform help — developer-first social listening with API/MCP on all plans
- `/sales-syften` — Syften platform help — fast community monitoring across 15+ platforms with API/webhooks
- `/sales-threadradar` — ThreadRadar platform help — Reddit + Quora monitoring with AI reply drafts
- `/sales-redditmentions` — RedditMentions platform help — cheapest Reddit alerts (€4.49/mo), email + Slack
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Relevance scores are too low for good threads
**User says**: "I'm getting posts scored 30-40 that are clearly people asking for exactly what I sell"
**Skill does**:
1. Reads platform guide for relevance scoring mechanics
2. Checks if website description accurately reflects the product
3. Suggests re-analyzing the website in RedShip settings to refresh the AI's understanding
4. Recommends adding more specific keywords that match how users describe the problem
**Result**: Relevance scoring improved through better website context

### Example 2: Pull high-scoring leads into CRM via API
**User says**: "I want to automatically send RedShip leads scored 80+ to my HubSpot CRM"
**Skill does**:
1. Reads API reference for list inbox endpoint with min_score filter
2. Shows working cURL + Python code to poll inbox with `min_score=80&unread_only=true`
3. Suggests webhook setup for push-based delivery instead of polling
4. Outlines HubSpot contact creation with Reddit thread URL as source
**Result**: Working integration pipeline from RedShip to CRM

### Example 3: SEO posts not finding relevant results
**User says**: "Weekly SEO scan returns nothing even though I know posts rank for my keywords"
**Skill does**:
1. Reads platform guide SEO scan section
2. Explains SEO scan uses post keywords (not mention keywords) and checks Google rankings
3. Suggests verifying keywords actually match terms people Google (not just Reddit jargon)
4. Recommends checking if posts are ranking for long-tail variants the scan might miss
**Result**: SEO keyword strategy aligned with actual Google search patterns

## Troubleshooting

### Alerts not arriving for posts you see manually
**Symptom**: You find relevant Reddit posts yourself but RedShip didn't alert you
**Cause**: Post keywords don't match the exact language used, subreddit excluded, or post was created during a monitoring gap
**Solution**: Check your keyword list — add variations and phrases users actually type. Check excluded subreddits list. For real-time posts, verify monitoring is active (check dashboard status). Try broader keyword phrases temporarily to confirm detection works.

### Auto DMs hitting daily limit too fast
**Symptom**: You run out of daily DM quota by midday
**Cause**: Sending DMs to every match instead of high-relevance ones only
**Solution**: Be selective — only DM users from posts scored 70+. Focus DMs on users who explicitly asked for recommendations. Upgrade to Growth ($39/mo, 100/day) if volume is justified. Consider that replies in threads are often more effective than DMs.

### Webhook not firing
**Symptom**: Configured webhook URL but not receiving any payloads
**Cause**: URL unreachable from RedShip servers, HTTPS certificate issue, or wrong URL format
**Solution**: Test with a public endpoint first (webhook.site or requestbin.com). Ensure HTTPS is valid and responding with 200 OK. Check that monitoring is actually detecting posts (verify in dashboard). If dashboard shows matches but webhook doesn't fire, contact RedShip support.
