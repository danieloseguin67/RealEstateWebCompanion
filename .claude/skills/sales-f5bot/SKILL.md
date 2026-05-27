---
name: sales-f5bot
description: "F5Bot platform help — free Reddit, Hacker News, and Lobsters keyword monitoring with email alerts, advanced filtering, AI semantic alerts, REST API, webhooks, Slack/Discord, RSS/JSON feeds. Use when F5Bot keyword alerts are drowning you in noise and you need to tighten filtering, the 50 hits/day free limit is causing you to miss important mentions, you want to set up F5Bot webhooks to push alerts to your CRM or dashboard, AI semantic alerts on Ultra aren't matching the right conversations, you need to monitor Reddit and HN on a zero budget, RSS or JSON feeds aren't updating or you want to build a pipeline on them, or you're comparing F5Bot vs Syften vs RedditMentions for Reddit monitoring. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in F5Bot — e.g., 'too many irrelevant alerts' or 'how do I use the API to manage keywords']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit-monitoring, platform]
---

# F5Bot Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, filtering)
   - B) Reducing noise / too many irrelevant alerts
   - C) Configuring notifications (email timing, Slack, Discord, webhooks)
   - D) Using the API to manage alerts programmatically
   - E) RSS/JSON feed setup
   - F) AI semantic alerts (Ultra tier)
   - G) Plan limits and upgrade decision
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Free (200 keywords, 50 hits/day, email only)
   - B) Power ($14.17/mo annual — 350 keywords, RSS/JSON, scheduled delivery)
   - C) Ultra ($58.33/mo annual — 1000 keywords, AI alerts, API, Slack/Discord)
   - D) Not sure / haven't signed up yet

3. **What's your goal?**
   - A) Brand monitoring (track mentions of my product)
   - B) Lead generation (find people asking for solutions)
   - C) Competitor monitoring
   - D) Customer research / market trends

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit/HN/Lobsters) → `/sales-social-listening [question]`
- Reddit monitoring with AI comment generation → `/sales-keymentions [question]`
- Reddit monitoring with competitive intelligence → `/sales-threadlytics [question]`
- Developer-first monitoring with API/MCP on all plans → `/sales-octolens [question]`
- Community monitoring across 15+ platforms with API → `/sales-syften [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — F5Bot platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, filtering flags, API endpoints, webhook setup, and code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Noise reduction** — use multi-word keywords with the `whole` flag, add `exclude=` for false positives, use `only-url=` to restrict to specific subreddits, use `no-url=` to block noisy subreddits
2. **Hit limit management** — if hitting 50/day on free, upgrade to Power (1,000/day) or tighten keywords first
3. **Integration** — API and webhooks require Ultra ($58.33/mo). For cheaper programmatic access, consider Syften (API at €39.95/mo) or RedShip (API at $19/mo)
4. **AI alerts** — Ultra-only semantic alerts match on meaning, not just keywords. Write natural language descriptions of what you want to find

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and pricing that may change.*

- **50 hits/day cap on free tier is brutal for common keywords.** If you track "CRM" you'll exhaust the limit in minutes. Use multi-word phrases or upgrade to Power (1,000 hits/day).
- **API and webhooks are Ultra-only ($58.33/mo annual).** Free and Power users have no programmatic access. If you need API access at a lower price, Syften starts at €39.95/mo with API.
- **No regex or wildcards.** Keywords match exactly as entered (case-insensitive). You cannot use patterns — add each variation as a separate keyword.
- **Matches can trigger from URLs and titles, not just body text.** If getting unexpected matches, use `in-body` or `in-title` flags (Power+) to restrict where keywords match.
- **`only-reddit` and `only-url` flags are OR-based.** If you use `only-reddit only-url=/r/saas`, you get ALL Reddit matches plus the subreddit — remove `only-reddit` to restrict to just that subreddit.
- **Slack/Discord require Ultra tier.** Free and Power users can only receive email alerts. Use webhooks on Ultra to route to Slack/Discord channels.
- **Webhook retries stop after 3 failures.** If your endpoint goes down, F5Bot will retry (immediate → 5 min → 1 hour → 15 hours), then give up. Monitor webhook delivery logs.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-syften` — Syften platform help — fast community monitoring across 15+ platforms with API/webhooks
- `/sales-redditmentions` — RedditMentions — cheapest paid Reddit monitoring at €4.49/mo
- `/sales-keymentions` — KeyMentions — Reddit monitoring with AI comment generation and auto-publish
- `/sales-octolens` — Octolens — developer-first social listening with API/MCP on all plans
- `/sales-threadlytics` — Threadlytics — Reddit-specific monitoring with 500M+ indexed conversations
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up monitoring for a SaaS product on a budget
**User says**: "I just launched a project management tool and want to know when people on Reddit ask for recommendations — but I'm on the free plan"
**Skill does**:
1. Reads platform guide for keyword strategy and filtering
2. Suggests intent-rich keywords: "best project management tool", "project management recommendation", "looking for task manager", competitor names
3. Recommends using `only-url=/r/productivity only-url=/r/SaaS only-url=/r/Entrepreneur` to restrict to relevant subreddits
4. Adds `exclude=minecraft exclude=game` to remove gaming false positives
5. Warns about the 50 hits/day limit and suggests monitoring keyword hit rates
**Result**: Targeted monitoring on free tier with noise reduction

### Example 2: Push F5Bot alerts to a CRM via webhooks
**User says**: "How do I send F5Bot alerts to my internal tool automatically?"
**Skill does**:
1. Confirms Ultra plan required for webhooks and API
2. Reads API reference for webhook payload format
3. Shows webhook setup: configure URL in API Dashboard, receive JSON POST with alert data
4. Provides example payload and shows how to parse `content_html`, `url`, `tags` fields
5. Notes retry policy (stops after 3 failures) and suggests monitoring the webhook log
**Result**: Working webhook integration pushing alerts to user's pipeline

### Example 3: Free tier noise is overwhelming
**User says**: "I'm tracking 'automation' on F5Bot but getting 50 alerts before noon and they're all irrelevant"
**Skill does**:
1. Explains 50 hits/day free limit means common words exhaust quota fast
2. Suggests narrowing: "marketing automation tool" or "automation for small business" instead of "automation"
3. Adds `exclude=home exclude=industrial exclude=factory` flags
4. Recommends `only-url=` to restrict to business subreddits only
5. If still insufficient, suggests Power plan ($14.17/mo) for 1,000 hits/day and `in-body` flag
**Result**: Noise reduced, hit limit managed

## Troubleshooting

### Alerts not arriving
**Symptom**: Set up keywords but no email alerts received
**Cause**: No matches yet (F5Bot only emails when matches exist), email in spam, or keyword is too specific
**Solution**: Post your keyword to r/test — expect an email within minutes. Check spam/promotions folder. If using a common word that should match frequently, verify the keyword wasn't rejected as too common (free tier restriction). Upgrade to Power to remove common word restrictions.

### Hitting 50 hits/day limit before noon
**Symptom**: Stop receiving alerts partway through the day on the free plan
**Cause**: Keywords are too broad, matching high-volume terms across all of Reddit
**Solution**: Use multi-word phrases with the `whole` flag. Add `exclude=` for recurring false positives. Use `only-url=` to restrict to 3-5 relevant subreddits. If legitimate volume exceeds 50/day, upgrade to Power ($14.17/mo, 1,000 hits/day) or Ultra ($58.33/mo, 1,000 hits/day).

### Webhook deliveries failing
**Symptom**: Webhook URL configured but alerts aren't arriving at your endpoint
**Cause**: Endpoint returning non-2xx responses, timeout, or SSL issues
**Solution**: Check the webhook delivery log in the API Dashboard for error codes. Ensure your endpoint accepts POST requests with JSON body and returns 200 within 10 seconds. F5Bot retries on failure (immediate → 5 min → 1 hour → 15 hours) but stops after 3 failures. Fix the issue and re-enable the webhook.
