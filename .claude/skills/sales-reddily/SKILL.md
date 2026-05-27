---
name: sales-reddily
description: "Reddily platform help — AI-powered Reddit thread analysis for market research with sentiment, pain point detection, feature requests, competitor mentions, audience demographics, batch processing, Chrome extension, PDF export. Use when Reddily analysis results miss the pain points you see in a thread, you want to run batch analysis across multiple threads but aren't sure how to structure the research, credit costs are adding up and you need to optimize how many analyses you run, the Chrome extension isn't triggering on Reddit pages, you need to turn Reddit threads into a structured market research report, or you're comparing Reddily vs PainOnSocial vs Reddinbox vs SparkToro for Reddit research. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Reddily]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, market-research, platform]
---
# Reddily Platform Help

Helps the user with Reddily platform questions — from thread analysis and batch processing through credit optimization, Chrome extension usage, and research methodology.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Reddily do you need help with?**
   - A) Thread analysis — interpreting results, improving relevance
   - B) Batch analysis — analyzing multiple threads, structuring research
   - C) Chrome extension — setup, troubleshooting
   - D) Credit optimization — getting more value per analysis
   - E) Research methodology — how to use Reddily for market research
   - F) Account/billing — credit packs, pricing
   - G) Something else — describe it

2. **What credit pack are you on?**
   - A) Free credits (5 on signup)
   - B) Starter (10 credits, $2.99)
   - C) Growth (50 credits, $13.99)
   - D) Pro (100 credits, $26.99)
   - E) Enterprise (500 credits, $119.99)

3. **What are you trying to accomplish?** (describe your specific goal)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring strategy across tools → `/sales-social-listening [question]`
- Reddit pain point scoring (frequency/severity) → `/sales-painonsocial [question]`
- Audience intelligence and demand research → `/sales-reddinbox [question]`
- Audience profiling (where audiences spend attention) → `/sales-sparktoro [question]`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — Reddily platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, analysis outputs, research methodology, and tips.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Analysis quality** — refine which threads to analyze, interpret structured outputs, identify actionable insights
2. **Batch research** — structure keyword searches, select threads strategically, combine batch results
3. **Credit optimization** — preview threads before spending credits, prioritize high-value threads, use the subreddit finder
4. **Chrome extension** — install, troubleshoot, one-click workflow
5. **Research methodology** — combine Reddily with other tools for complete market research

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about pricing and capabilities that may be outdated.*

- **Reddily is analysis, not monitoring.** It analyzes threads on demand — it does not continuously monitor keywords or send alerts. If you need ongoing monitoring, pair Reddily with a monitoring tool (Syften, RedShip, KeyMentions) for the reactive side.
- **Credits are pay-per-analysis, not subscription.** Each thread analysis costs one credit (~$0.24-0.30 depending on pack size). Credits don't expire. No monthly subscription — but costs can add up quickly for large research projects. Preview threads before analyzing to avoid wasting credits on low-value threads.
- **70% launch discount may expire.** Current pricing shows 70% off original prices. If you see higher prices, the discount period may have ended.
- **No API, no webhooks, no Zapier.** Entirely UI + Chrome extension. You cannot export analysis data programmatically or build automation pipelines. PDF export is the only export option.
- **Batch analysis has limits.** Batch processing handles 25-50 threads per run. For larger research projects, run multiple batch analyses with different keyword searches.
- **AI analysis uses Google Gemini.** Results depend on Gemini's capabilities and limitations — sarcasm, context-dependent sentiment, and niche jargon may be misinterpreted. Always review AI outputs against the actual thread content.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, tool comparison across all platforms
- `/sales-painonsocial` — PainOnSocial — AI-scored Reddit pain point discovery with frequency/severity ranking for idea validation
- `/sales-reddinbox` — Reddinbox — AI audience intelligence across Reddit, X, HN, YouTube with intent scoring and market briefs
- `/sales-sparktoro` — SparkToro — audience intelligence revealing where audiences spend attention (websites, podcasts, YouTube, subreddits)
- `/sales-threadlytics` — Threadlytics — Reddit-specific monitoring with 500M+ indexed conversations, Share of Voice, opportunity scoring
- `/sales-syften` — Syften — fast keyword monitoring across 15+ community platforms with AI filtering
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Structure a market research project
**User says**: "I want to understand what problems people have with project management tools. How do I use Reddily for this?"
**Skill does**:
1. Suggests using Reddily's subreddit finder to identify relevant communities (r/projectmanagement, r/startups, r/SaaS)
2. Recommends keyword searches like "project management frustrated" or "Asana vs Monday" in the batch dashboard
3. Advises selecting 20-30 high-engagement threads across different subreddits for batch analysis
4. Explains how to read the pain point and feature request outputs to identify recurring themes
**Result**: User has a structured approach to Reddit-based market research

### Example 2: Credit optimization
**User says**: "I burned through my 10 credits analyzing threads that weren't useful. How do I get better value?"
**Skill does**:
1. Recommends previewing thread engagement (upvotes, comment count) before spending a credit
2. Suggests focusing on threads with 50+ comments — more data produces richer analysis
3. Advises using the free subreddit finder tool first to identify the right communities
4. Notes that the Growth pack ($13.99/50 credits) drops per-analysis cost from $0.30 to $0.28
**Result**: User avoids wasting credits on low-value threads

### Example 3: Combining Reddily with monitoring tools
**User says**: "I want to use Reddily for deep analysis but I also need ongoing alerts when people mention my product on Reddit"
**Skill does**:
1. Explains Reddily is on-demand analysis, not monitoring — it won't alert you to new threads
2. Recommends pairing with a monitoring tool: Syften ($19.95/mo, 15+ platforms), RedShip ($19/mo, API), or RedditMentions (€4.49/mo, cheapest alerts)
3. Suggests workflow: monitoring tool catches relevant threads → use Reddily Chrome extension on the most important ones for deep analysis
4. Routes to `/sales-social-listening` for help choosing a monitoring tool
**Result**: User understands the complementary workflow between monitoring and analysis tools

## Troubleshooting

### Analysis results don't match what you see in the thread
**Symptom**: Reddily's sentiment or pain points don't reflect the actual conversation tone or themes
**Cause**: Gemini AI may misinterpret sarcasm, niche jargon, or context-dependent sentiment. Long threads may have mixed signals that get averaged.
**Solution**: Cross-reference Reddily's output with the actual thread. Focus on the "Notable Quotes" section which provides direct evidence. For niche communities, the AI may need more context — try analyzing multiple threads in the same subreddit to see if patterns emerge across analyses.

### Chrome extension not working
**Symptom**: Reddily button doesn't appear on Reddit pages, or clicking it doesn't trigger analysis
**Cause**: Extension not installed, disabled, or Reddit's page structure changed
**Solution**: Verify the extension is installed and enabled in Chrome settings (chrome://extensions). Make sure you're on a Reddit thread page (not a subreddit listing or user profile). Try refreshing the page. If still broken, check for Chrome extension updates or try the web dashboard instead.

### Batch analysis returns shallow results
**Symptom**: Batch results across 25+ threads feel repetitive or generic
**Cause**: Threads selected were too similar (same subreddit, same topic angle) or had too few comments
**Solution**: Diversify thread selection across multiple subreddits for different perspectives. Prioritize threads with 50+ comments. Mix thread types: complaint threads, recommendation requests, comparison discussions, "how do you handle X" posts. Use different keyword searches to capture different angles of the same problem.
