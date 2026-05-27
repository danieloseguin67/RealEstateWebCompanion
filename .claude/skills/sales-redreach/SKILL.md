---
name: sales-redreach
description: "Redreach platform help — AI-powered Reddit lead generation with keyword auto-discovery, relevance scoring, Google-ranking post detection, AI reply suggestions, competitor monitoring, Chrome extension DM automation (Outbound), and webhook alerts. Use when Redreach isn't catching relevant Reddit posts you find manually, AI reply suggestions sound generic and don't match your product voice, keyword auto-discovery from your website is missing important terms, Google-ranking post detection isn't surfacing SEO opportunities, Reddit DM outbound is getting your account flagged or banned, webhook alerts aren't firing to Slack or Telegram, you want to compare Redreach vs RedShip vs Subreddit Signals vs KeyMentions for Reddit lead gen, or competitor monitoring is too noisy. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Redreach — e.g., 'relevance scoring misses good leads']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# Redreach Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (keywords, website analysis, competitors)
   - B) Improving relevance scoring / reducing noise
   - C) Google-ranking post discovery (SEO opportunities)
   - D) AI reply suggestions (quality, tone, personalization)
   - E) Outbound DM automation (Chrome extension)
   - F) Webhook alerts (Slack, Telegram, email)
   - G) Competitor or brand monitoring
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) 3-day trial pass ($12 one-time)
   - B) Starter (~$19/mo — 1 seat)
   - C) Growth (~$29/mo — 2 seats)
   - D) Professional (3 seats)

3. **What's your goal?**
   - A) Lead generation (find people asking for recommendations)
   - B) Brand monitoring (track product/company mentions)
   - C) Competitor monitoring (watch competitor discussions)
   - D) SEO engagement (comment on Google-ranking Reddit threads)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit) → `/sales-social-listening [question]`
- Reddit monitoring with Share of Voice analytics → `/sales-threadlytics [question]`
- Reddit monitoring with auto-publish comments → `/sales-keymentions [question]`
- Reddit + Quora monitoring with AI reply drafts → `/sales-threadradar [question]`
- Reddit monitoring with REST API/MCP across 13+ platforms → `/sales-octolens [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — Redreach platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, keyword strategy, SEO discovery, Outbound DM automation, webhook setup.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — Redreach auto-discovers keywords from your website and competitors; refine by removing generic terms and adding buying-intent phrases
2. **Relevance tuning** — improve company description accuracy, exclude irrelevant subreddits, add custom keywords
3. **SEO vs real-time** — Google-ranking posts have long-tail value; real-time posts need timely engagement
4. **Reply approach** — use AI drafts as starting points, always personalize before posting
5. **DM safety** — use Outbound sparingly, only for genuine conversations, not cold pitches

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about DM automation and plan limits.*

- **Outbound DMs risk account bans.** Reddit aggressively flags unsolicited DMs. The Chrome extension includes anti-detection measures, but no tool can eliminate ban risk. Use sparingly for genuine conversations only.
- **Reddit-only platform.** Does not monitor X, LinkedIn, HN, or other platforms. Pair with another tool (Octolens, Syften, CatchIntent) for multi-platform coverage.
- **No public API.** Cannot programmatically pull leads into a CRM or dashboard. Webhook alerts push notifications but don't expose full lead data for integration pipelines.
- **SEO scan is periodic, not real-time.** Google-ranking post discovery runs on a scan cycle. Don't expect same-day SEO results for newly ranking threads.
- **48-hour refund window is short.** Money-back guarantee expires 48 hours after payment. Test thoroughly on day one.
- **Keyword auto-discovery needs accurate website content.** If your homepage is vague or jargon-heavy, the AI will generate poor keywords. Write a clear company description in settings.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-redship` — RedShip platform help — Reddit monitoring with relevance scoring, REST API + webhooks, $19/mo
- `/sales-keymentions` — KeyMentions platform help — Reddit monitoring with AI comment generation and auto-publish
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring with Share of Voice
- `/sales-octolens` — Octolens platform help — developer-first social listening with API/MCP on all plans
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead generation with buyer intent classification
- `/sales-bazzly` — Bazzly platform help — Reddit lead generation with intent scoring, Chrome extension DMs
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: AI replies sound too generic
**User says**: "Redreach's AI reply suggestions don't sound like my product — they're too vague"
**Skill does**:
1. Reads platform guide for company description and AI filtering settings
2. Checks if company description accurately reflects the product's unique value
3. Suggests refining the description with specific use cases, differentiators, and target customer language
4. Recommends using AI suggestions as scaffolding and adding personal details before posting
**Result**: AI replies improved through better product context

### Example 2: Set up webhook alerts for Slack
**User says**: "I want Redreach to notify my team Slack channel when high-relevance posts are found"
**Skill does**:
1. Reads platform guide for notification channels
2. Explains Slack integration is native — connect via Redreach settings
3. Also covers Telegram and email alert options
4. Notes webhook endpoint option for custom integrations
**Result**: Team receiving real-time Reddit lead alerts in Slack

### Example 3: DM outbound getting flagged
**User says**: "Reddit is warning my account after using Redreach Outbound to send DMs"
**Skill does**:
1. Reads platform guide Outbound section
2. Explains Reddit's anti-spam DM policies and ban risk
3. Recommends reducing volume, only DMing users from highly relevant threads, and writing genuinely helpful messages
4. Suggests switching to public replies in threads as a safer alternative
**Result**: DM strategy adjusted to reduce ban risk

## Troubleshooting

### Monitoring not catching posts you find manually
**Symptom**: You see relevant Reddit posts yourself but Redreach didn't surface them
**Cause**: Keywords don't match the language users actually use, subreddit excluded, or post appeared during a monitoring gap
**Solution**: Check your keyword list — add variations and natural phrases people type. Review excluded subreddits. Try adding competitor names as keywords since users often mention alternatives.

### Google-ranking posts returning no results
**Symptom**: SEO discovery shows nothing even though you know Reddit threads rank for your terms
**Cause**: SEO scan uses different keywords than monitoring, or threads rank for long-tail variants the scan doesn't check
**Solution**: Verify your SEO keywords match actual Google search terms (not just Reddit jargon). Check if threads rank for question-format queries the scan might miss. Note the scan runs periodically — wait for the next cycle.

### Webhook alerts not arriving
**Symptom**: Configured webhook or Slack but not receiving notifications
**Cause**: URL unreachable, auth mismatch, or notification settings not enabled for the right alert types
**Solution**: Test with Slack first (native integration, most reliable). For webhooks, verify the endpoint returns 200 OK. Check Redreach notification settings to ensure the right alert types (new posts, comments, competitor mentions) are enabled.
