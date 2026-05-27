---
name: sales-threadlytics
description: "Threadlytics platform help — Reddit-specific monitoring with 500M+ indexed conversations, keyword tracking, sentiment analysis, Share of Voice, opportunity scoring, SERP tracking. Use when Threadlytics keyword alerts are returning too much noise and you need to tune context keywords, mention quota is filling up before the month ends, sentiment analysis results don't match what you see on Reddit, opportunity scores aren't surfacing the right threads to engage with, you need to track how often competitors get mentioned on Reddit vs your brand, SERP tracking isn't picking up your Reddit URLs in Google, or you want to monitor Reddit after GummySearch shut down. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe your Threadlytics or Reddit monitoring question]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, brand-monitoring, platform]
---

# Threadlytics Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (brand, competitor, industry terms)
   - B) Reducing noise / tuning context keywords and filters
   - C) Understanding sentiment analysis results
   - D) Competitive benchmarking / Share of Voice on Reddit
   - E) Finding high-value threads to engage with (opportunity scoring)
   - F) SERP tracking for Reddit URLs in Google
   - G) Multi-client setup (agency use)
   - H) Something else — describe it

2. **Which Threadlytics plan are you on?**
   - A) Standard ($15/mo yearly — 20 keywords, 5K mentions, 1 user)
   - B) Pro ($30/mo yearly — 100 keywords, 20K mentions, 5 users)
   - C) Premium ($499/mo — 250 keywords, 50K mentions, 10 users)
   - D) Enterprise (custom — API access, unlimited users)
   - E) Not sure / evaluating

**Skip-ahead rule**: if the user's prompt already provides enough context, skip to Step 2.

## Step 2 — Route or answer directly

If the request maps to a broader strategy skill, route:
- Social listening strategy across multiple platforms → `/sales-social-listening [question]`
- Choosing between Reddit monitoring tools → `/sales-social-listening which Reddit monitoring tool should I use`
- Brand monitoring beyond Reddit (news, social, forums) → `/sales-social-listening [question]`
- Influencer discovery on Reddit → `/sales-influencer-marketing [question]`
- Sales intent signals from Reddit → `/sales-intent [question]`
- B2B advertising on Reddit → `/sales-b2b-advertising [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Threadlytics platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, keyword setup, filtering, monitoring workflows.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Keyword setup** — start with brand + top 2-3 competitors, add context keywords to filter noise, use negative keywords for common false positives
2. **Noise reduction** — review the top 20 mentions, identify recurring irrelevant patterns, add negative keywords and subreddit exclusions
3. **Engagement** — sort by opportunity score, focus on threads where brand/product is being discussed or alternatives requested
4. **Competitive intel** — track Share of Voice weekly, look for sentiment shifts after competitor launches or incidents
5. **Quota management** — if approaching mention limits, tighten context keywords or exclude high-volume low-value subreddits

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and limits that may be outdated.*

- **Yearly billing discount is massive.** Standard drops from $99/mo to $15/mo on annual. Monthly pricing is 5-6x higher — always compare annual rates.
- **No public API on self-serve plans.** API access is Enterprise-only with custom pricing. If you need programmatic data access, factor this into plan selection.
- **No Zapier, Make, or webhook integrations.** Data stays inside Threadlytics unless you're on Enterprise. Manual export or screenshotting is the workaround on lower tiers.
- **Company email required to sign up.** Personal email domains (Gmail, Yahoo, Outlook) are blocked. Use a company domain.
- **SERP tracking and Accounts Tracking are Pro+ only.** Standard plan lacks both features. If you need Google ranking visibility for Reddit URLs, you need Pro or higher.
- **Mention quotas are monthly.** 5K mentions on Standard can fill fast for popular keywords. Monitor usage and tighten filters if approaching limits.
- **Reddit API dependency.** Threadlytics relies on Reddit's API for real-time data. If Reddit restricts API access (as they did with GummySearch), monitoring could be affected.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy across platforms — tool comparison, monitoring setup, sentiment analysis, crisis detection
- `/sales-awario` — Awario platform help — budget social listening with Boolean search, Awario Leads, Reddit monitoring
- `/sales-brand24` — Brand24 platform help — social listening, sentiment analysis, Storm Alerts, MCP server
- `/sales-mention` — Mention platform help — real-time media monitoring, brand tracking, REST API
- `/sales-b2b-advertising` — B2B advertising including Reddit Ads
- `/sales-intent` — Buyer intent signals from monitoring data
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up Reddit brand monitoring
**User says**: "I just signed up for Threadlytics Standard. How do I set up monitoring for my SaaS product?"
**Skill does**:
1. Walks through keyword setup — brand name, common misspellings, product name
2. Recommends 2-3 context keywords to filter noise (e.g., "software", "tool", "app")
3. Sets up competitor tracking with the same context keywords
4. Configures negative keywords for common false positives
5. Advises on alert frequency and mention quota management at 5K/mo
**Result**: Monitoring configured with noise filtering from day one

### Example 2: API access for Reddit data pipeline
**User says**: "I want to pull Threadlytics data into my dashboard automatically. How do I use the API?"
**Skill does**:
1. Explains that API access is Enterprise-only — not available on Standard/Pro/Premium self-serve plans
2. Suggests contacting Threadlytics sales for Enterprise pricing with API access
3. Offers workaround: manual CSV export from the dashboard
4. Recommends alternative tools with self-serve API access (Awario Enterprise, Brand24, Mention) if programmatic access is a hard requirement
**Result**: User understands the limitation and has alternatives

### Example 3: Reduce noise in keyword results
**User says**: "I'm tracking 'Apollo' but getting mentions of the space program and the Greek god. How do I filter these out?"
**Skill does**:
1. Recommends adding context keywords: "software", "CRM", "sales", "tool"
2. Suggests negative keywords: "NASA", "space", "mythology", "Greek", "mission"
3. Recommends subreddit filtering — exclude r/space, r/mythology, include r/sales, r/SaaS
4. Notes the global context keyword feature for cross-keyword noise reduction
**Result**: Mentions filtered down to relevant software discussions

## Troubleshooting

### Mention quota filling up too fast
**Symptom**: 5K mention limit on Standard is exhausted mid-month
**Cause**: Keywords are too broad, missing context keywords, or monitoring high-volume generic terms
**Solution**: Add context keywords (must appear alongside main keyword for a mention to count). Add negative keywords for recurring irrelevant patterns. Exclude high-volume low-value subreddits. If still insufficient, upgrade to Pro (20K mentions) or narrow keyword list.

### Opportunity scores seem random
**Symptom**: High-scoring threads aren't actually good engagement opportunities
**Cause**: Opportunity scoring is AI-based and weighs engagement metrics, sentiment, and relevance — it may not match your specific use case
**Solution**: Use opportunity scores as one signal, not the only filter. Combine with subreddit filtering (focus on subreddits where your audience actually hangs out) and sentiment filtering (prioritize negative sentiment threads where you can help). Review and dismiss low-value scored threads to learn the pattern.

### Missing mentions you know exist
**Symptom**: A Reddit thread mentions your brand but doesn't appear in Threadlytics
**Cause**: Context keywords may be too restrictive, the subreddit may be excluded, or the mention is in a comment that hasn't been indexed yet
**Solution**: Use the manual URL tracking feature to add specific Reddit post URLs. Review context keyword settings — they require ALL context keywords to appear alongside the main keyword, which can be overly restrictive. Try removing context keywords temporarily to see if the mention appears, then add them back selectively.
