---
name: sales-devi
description: "Devi AI platform help — Chrome extension for social media lead monitoring across Facebook groups, LinkedIn, X, Reddit, WhatsApp, Telegram, Nextdoor, Bluesky, Threads with AI buying intent detection and ChatGPT-powered outreach drafts. Use when Devi keyword monitoring is returning too much noise and you need to filter leads better, the Chrome extension isn't scanning your Facebook groups or showing new leads, AI-generated outreach messages sound generic and need tuning, you want to set up webhook notifications to push Devi leads to another tool, you're not sure whether to monitor public LinkedIn posts or private Facebook groups first, content scheduling across social profiles isn't posting on time, or you're comparing Devi vs other social listening tools for lead generation. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe your Devi question — e.g., 'how do I filter out spam leads' or 'webhook setup for lead notifications']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, lead-generation, platform]
github: "https://github.com/DeviAI-OpenSource"
---

# Devi AI Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring across platforms
   - B) Filtering leads and reducing noise
   - C) AI outreach message generation
   - D) Webhook setup for lead notifications
   - E) Content scheduling and social posting
   - F) Facebook group monitoring (public/private)
   - G) Something else — describe it

2. **Which platforms are you monitoring?**
   - A) Facebook groups (public, private, or both)
   - B) LinkedIn
   - C) Twitter/X
   - D) Reddit
   - E) WhatsApp / Telegram
   - F) Multiple — which ones?

3. **Current situation?**
   - A) Just installed — haven't set up monitoring yet
   - B) Monitoring is running but too noisy
   - C) Getting leads but outreach isn't converting
   - D) Need to connect Devi to other tools

**If the user's request already provides most of this context, skip directly to the relevant step.**

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Choosing between social listening tools → `/sales-social-listening which social listening tool should I use`
- Social media scheduling strategy → `/sales-social-media-management [question]`
- Cold outreach sequences → `/sales-cadence [question]`
- Email deliverability → `/sales-deliverability [question]`

Otherwise, answer directly from the platform reference.

## Step 3 — Devi platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, webhook setup, content scheduling, integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Keyword strategy** — start narrow (3-5 high-intent keywords), expand after validating quality
2. **Platform priority** — focus on 1-2 platforms first, add more once workflow is stable
3. **Outreach cadence** — respond to high-intent leads within 2 hours, customize AI drafts before sending
4. **Noise reduction** — review first 20 leads, identify false positive patterns, adjust keywords
5. **Webhook integration** — connect to CRM or notification tool for real-time lead routing

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Chrome must stay open for monitoring to work.** Devi is a browser extension — it scans while Chrome is running. Close your laptop lid or quit Chrome and monitoring stops. Keep a dedicated Chrome profile running.
- **Private Facebook group monitoring requires membership.** You must be a member of a group to monitor it — Devi can't access groups you haven't joined.
- **No REST API.** Devi offers webhooks only (Settings > Webhook) for external integrations. No Zapier, no Make, no MCP. If you need programmatic data access, this isn't the right tool.
- **ChatGPT API calls are capped per plan.** Monthly plan gets 250 calls, annual gets 1,000. Once exhausted, AI outreach drafts stop working until the next billing cycle.
- **$2/group add-on costs add up.** Base plan includes 25 groups. If you monitor 50 Facebook groups + subreddits, that's an extra $50/mo on top of the $49/mo base.
- **Data stays in your browser.** Devi doesn't store data server-side — it caches temporarily in your browser. This means you lose lead history if you clear browser data or switch machines.
- **Content scheduling is secondary.** The scheduling feature works but is basic compared to dedicated tools like Buffer or Later. Don't choose Devi primarily for scheduling.

## Related skills

- `/sales-social-listening` — Social listening strategy — choosing tools, monitoring setup, competitive intelligence, crisis detection
- `/sales-social-media-management` — Social media management strategy — publishing, scheduling, engagement
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation
- `/sales-bazzly` — Bazzly — Reddit lead generation with intent scoring and Chrome extension
- `/sales-syften` — Syften — multi-platform community monitoring with API/webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up Facebook group monitoring for a SaaS product
**User says**: "I want to monitor 10 private Facebook groups for people asking about project management tools"
**Skill does**:
1. Confirms user is a member of all 10 groups
2. Designs keyword strategy: "project management", "task tracking", "looking for a tool", "any recommendations"
3. Explains how to add groups in Devi and set up intent detection
4. Recommends webhook setup to push high-intent leads to a Slack channel
**Result**: Monitoring running with targeted keywords and lead notifications

### Example 2: Connect Devi leads to a CRM via webhook
**User says**: "How do I get Devi leads into my CRM automatically?"
**Skill does**:
1. Explains webhook setup in Settings > Webhook
2. Shows how to use a webhook relay (e.g., webhook.site or n8n) to transform the payload
3. Suggests mapping Devi lead data (platform, keyword match, post content) to CRM contact fields
4. Notes the limitation: no REST API, so webhook is the only programmatic path
**Result**: Webhook pipeline from Devi → middleware → CRM

### Example 3: Reduce noise in LinkedIn lead monitoring
**User says**: "I'm getting hundreds of irrelevant LinkedIn mentions from my keywords"
**Skill does**:
1. Reviews current keyword list for overly broad terms
2. Recommends more specific phrases and keyword combinations
3. Suggests using Devi's intent detection to filter for buying signals only
4. Advises starting with location/network filters to narrow scope
**Result**: Cleaner lead feed with higher intent ratio

## Troubleshooting

### Chrome extension not finding leads
**Symptom**: Dashboard shows zero leads despite active keyword monitoring
**Cause**: Chrome not running, extension disabled, or groups/platforms not properly configured
**Solution**: Verify Chrome is open and Devi extension is enabled. Check that monitoring is started (not paused). For Facebook groups, confirm you're a member and the group URL is correctly added. For LinkedIn/X, verify keywords are set and location/network filters aren't too restrictive.

### AI outreach messages sound robotic
**Symptom**: ChatGPT-generated comments and DMs feel generic, not personalized to the conversation
**Cause**: Default prompt templates produce generic output without context about your product or voice
**Solution**: Customize the AI prompt templates in Devi settings. Include your product name, value proposition, and preferred tone. Review and edit every AI draft before sending — treat them as first drafts, not final messages. Check your ChatGPT API call balance hasn't been exhausted.

### Too many irrelevant leads / spam
**Symptom**: Lead feed is full of promotional posts, bot content, or unrelated discussions
**Cause**: Keywords are too broad, monitoring too many low-quality groups, or intent detection isn't filtering effectively
**Solution**: Narrow keywords to specific phrases (use exact product category terms, not general industry words). Remove low-activity or spam-heavy groups from monitoring. Use Devi's spam elimination feature. Start with 5-10 high-quality groups and expand only after validating lead quality.
