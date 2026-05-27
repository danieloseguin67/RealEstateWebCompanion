---
name: sales-reddgrow
description: "ReddGrow platform help — Reddit marketing for AI search visibility (GEO) with AI Visibility Scanning across 220+ countries and 4+ AI platforms, AI comment drafting with human review, Chrome extension posting, karma warmup, brand monitoring, subreddit discovery, community management, REST API and CLI for AI agent workflows. Use when ReddGrow AI drafts sound too generic or template-like, your brand is missing from AI answers citing Reddit, you want to track which Reddit threads ChatGPT or Perplexity cite, subreddit targeting is surfacing irrelevant conversations, you need to use the ReddGrow API or CLI for automated Reddit intelligence, or you want to compare ReddGrow vs Redreach vs ReplyAgent vs Replymer for Reddit marketing. Do NOT use for social listening strategy across tools (use /sales-social-listening) or AI visibility strategy across tools (use /sales-ai-visibility)."
argument-hint: "[describe what you need help with in ReddGrow — e.g., 'AI comments sound too generic' or 'how do I use the API to find relevant subreddits']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, ai-visibility, reddit, platform]
---

# ReddGrow Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up subreddit discovery and targeting
   - B) Improving AI comment quality (too generic, too polished)
   - C) AI Visibility Scanning — tracking brand in LLM answers
   - D) Brand monitoring on Reddit
   - E) Karma warmup for posting accounts
   - F) API or CLI integration for automated workflows
   - G) Chrome extension usage and posting workflow
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($59/mo — 150 comments, 10 AI prompts, 1 domain)
   - B) Growth ($149/mo — 450 comments, 100 AI prompts, 3 domains, Slack)
   - C) Pro ($299/mo — 750 comments, 200 AI prompts, 5 domains)
   - D) Enterprise (custom)
   - E) Free trial / evaluating

3. **What's your goal?**
   - A) Get brand mentioned in AI answers (GEO)
   - B) Lead generation from Reddit discussions
   - C) Community management and support
   - D) Competitive monitoring on Reddit
   - E) SEO through Reddit engagement

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- AI visibility strategy across tools (not ReddGrow-specific) → `/sales-ai-visibility [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`
- Reddit lead gen with managed accounts and pay-per-post → `/sales-replyagent [question]`
- Reddit lead gen with human-written replies → `/sales-replymer [question]`
- Reddit lead gen with Chrome extension DM automation → `/sales-redreach [question]`
- Reddit monitoring with AI comment auto-publish → `/sales-keymentions [question]`
- Multi-platform social listening → `/sales-social-listening [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — ReddGrow platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, API endpoints, CLI commands, AI Visibility Scanning, comment drafting workflow, karma warmup.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **GEO strategy** — identify which AI platforms cite your category's Reddit threads, then focus engagement there
2. **Subreddit targeting** — start with AI-discovered subreddits, validate with visibility scans, prune irrelevant ones
3. **Comment quality** — provide detailed product context and tone guidelines; always review AI drafts before posting via Chrome extension
4. **API workflows** — use the Agent API for custom monitoring pipelines; CLI for terminal-based Reddit intelligence
5. **Volume management** — stay within plan comment limits; prioritize high-intent threads over volume

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Human-in-the-loop required.** ReddGrow never auto-posts. Every comment goes through AI draft → human review → Chrome extension posting. This is safer but slower than auto-reply tools.
- **Slack integration is Growth+ only.** Starter plan users get email alerts only. Upgrade to Growth ($149/mo) for Slack notifications.
- **AI prompts are limited per plan.** Starter gets 10 AI prompts/mo, Growth 100, Pro 200. Running out means no AI Visibility Scanning until the next billing cycle.
- **No webhooks or Zapier/Make.** Integration is limited to the REST API and CLI. No push notifications — poll the API or use email/Slack alerts.
- **Comment limits are strict.** 150/mo on Starter means ~5/day. If you're monitoring 10+ subreddits, you'll burn through comments quickly. Prioritize high-intent threads.
- **GEO results take weeks to months.** Reddit engagement influences AI answers over time, not immediately. Set expectations accordingly.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-ai-visibility` — AI visibility monitoring strategy — track brand mentions in ChatGPT, Claude, Perplexity, Gemini, AI Overviews
- `/sales-replyagent` — ReplyAgent — Reddit marketing with managed account posting, pay-per-post
- `/sales-replymer` — Replymer — managed Reddit/X reply marketing with human-written replies
- `/sales-redreach` — Redreach — Reddit lead gen with keyword auto-discovery, DM automation
- `/sales-keymentions` — KeyMentions — Reddit monitoring with AI comment auto-publish
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead gen with buyer intent classification
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: AI comments sound too generic
**User says**: "ReddGrow's comments all start the same way and don't sound like a real person"
**Skill does**:
1. Reads platform guide for comment quality tuning
2. Checks product description setup — likely too vague or missing specific use cases
3. Suggests writing detailed product context with target customer language, unique differentiators, and 3-5 specific scenarios
4. Recommends editing AI drafts in the Chrome extension before posting — treat them as first drafts
**Result**: Comments become more specific and authentic after better input context

### Example 2: Use the API to monitor domain mentions
**User says**: "I want to build a custom pipeline that tracks whenever my domain gets mentioned on Reddit"
**Skill does**:
1. Reads platform guide API section
2. Shows the domain mentions endpoint: `GET /agent/domains/{domain}/mentions` with `x-api-key` auth
3. Walks through getting an API key from Settings > API Keys (keys prefixed `rg_`)
4. Notes rate limits: 60 req/min, 1K req/hr, 1 credit per lookup
5. Suggests polling on a schedule and piping results to Slack via a simple script
**Result**: Custom domain monitoring pipeline using the ReddGrow API

### Example 3: Brand missing from AI answers
**User says**: "Competitors show up when I ask ChatGPT about our category but we don't — can ReddGrow help?"
**Skill does**:
1. Reads platform guide for AI Visibility Scanning workflow
2. Explains GEO concept — ReddGrow finds Reddit threads that AI platforms already cite, then helps add your brand
3. Walks through the Scan → Match → Draft → Track workflow
4. Notes that results take weeks to months as AI models update their retrieval sources
5. Suggests starting with the free AI visibility report to see current citation landscape
**Result**: Clear GEO strategy with realistic expectations on timeline

## Troubleshooting

### AI Visibility scans showing no citations
**Symptom**: Scans return zero or very few Reddit threads that AI platforms cite for your category
**Cause**: Your category may not be well-represented on Reddit, or AI platforms may source from other types of content (blogs, docs, review sites) rather than Reddit
**Solution**: Broaden your keyword set — try generic category terms, competitor names, and common questions your buyers ask. Check if competitors have Reddit presence that's being cited. If Reddit simply isn't a source for your category, ReddGrow's GEO value may be limited — consider `/sales-ai-visibility` for a broader strategy.

### Chrome extension not showing draft button on Reddit
**Symptom**: The ReddGrow Chrome extension is installed but the drafting overlay doesn't appear on Reddit threads
**Cause**: Extension may not be logged in, Reddit's UI changed, or the thread isn't in your monitored subreddits
**Solution**: Verify the extension is logged in (click the extension icon, check auth status). Try refreshing the Reddit page. Ensure the subreddit is in your monitored list. Check the Chrome Web Store for extension updates.

### Running out of comments mid-month
**Symptom**: Hit the monthly comment limit (150/450/750) before the billing cycle resets
**Cause**: Posting too broadly across many subreddits without prioritizing high-intent threads
**Solution**: Focus on threads where users explicitly ask for recommendations or describe problems your product solves. Skip "just chatting" threads. Use AI Visibility Scanning to identify which threads AI platforms actually cite — those have the highest ROI. Consider upgrading plans if volume needs consistently exceed limits.
