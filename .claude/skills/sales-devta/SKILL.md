---
name: sales-devta
description: "Devta platform help — AI Networking Agent that proactively builds your presence in Reddit, LinkedIn, and Upwork communities through persona-based human-like engagement, automated commenting, DM nurturing, and post drafting. Use when Devta's AI comments sound generic and you need to improve your Persona setup, the Networking Agent isn't engaging in the right subreddits or communities, you want to understand how Devta's credit system works and optimize credit usage, your Reddit account got flagged or banned while using automated engagement, you need to set up Draft Posts for consistent community visibility, or you're comparing Devta vs Devi vs KeyMentions vs other Reddit engagement tools. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe your Devta question — e.g., 'how do I set up my Persona for better comments' or 'agent keeps engaging in wrong threads']"
license: MIT
version: 1.0.0
tags: [sales, social-selling, community-engagement, platform]
---

# Devta Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up your Persona for authentic engagement
   - B) Configuring the Networking Agent (subreddits, topics, DM nurturing)
   - C) Understanding credits and optimizing usage
   - D) Draft Posts — content creation and community posting
   - E) Project Planning — client-ready blueprints
   - F) Avoiding Reddit/LinkedIn bans while using automation
   - G) Something else — describe it

2. **Which platforms are you using Devta on?**
   - A) Reddit
   - B) LinkedIn
   - C) Upwork
   - D) Multiple — which ones?

3. **Current situation?**
   - A) Just signed up — haven't set up my Persona yet
   - B) Agent is running but comments feel generic
   - C) Agent is engaging but in the wrong communities or threads
   - D) Need help with credit optimization
   - E) Got banned or flagged on a platform

**If the user's request already provides most of this context, skip directly to the relevant step.**

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Choosing between social listening/engagement tools → `/sales-social-listening which social listening tool should I use`
- Social media scheduling strategy → `/sales-social-media-management [question]`
- Cold outreach sequences → `/sales-cadence [question]`
- Upwork proposal strategy (beyond Devta's features) → answer directly with general Upwork advice

Otherwise, answer directly from the platform reference.

## Step 3 — Devta platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, Persona setup, credit system, engagement workflow, integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Persona quality** — invest time upfront: background, expertise, communication style, typical language. Generic persona = generic comments
2. **Community selection** — start with 2-3 subreddits where your target audience is active, expand after validating engagement quality
3. **Credit management** — monitor minutes used per session, adjust session length and frequency to stretch credits
4. **Human oversight** — always use the live view for the first few sessions to calibrate agent behavior
5. **Safety** — warm up your Reddit account before running the agent, vary engagement patterns, don't run for long uninterrupted sessions

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about credit costs and platform behavior that may change.*

- **Devta is NOT a keyword monitoring tool.** It builds presence proactively — the agent goes out and engages in communities. If you need reactive alerts when someone posts a keyword, use Devi, Syften, KeyMentions, or RedShip instead.
- **Credit-based pricing, not subscription tiers.** $49 top-up gives ~189 minutes of AI Networking OR ~20 project plans. Credits are consumed per minute of agent runtime. There are no monthly plan tiers.
- **No API, no webhooks, no integrations.** Devta is entirely UI-driven. You cannot export leads to a CRM, trigger workflows, or connect to Zapier/Make. If you need programmatic data access, this is the wrong tool.
- **Persona setup makes or breaks quality.** The agent's comment quality directly depends on how well you've defined your Persona — name, background, expertise, communication style. Rushing this step produces generic output that reads like a bot.
- **Reddit ban risk is real.** Automated engagement violates Reddit's terms of service. Warm up your account, vary patterns, and use the live view to catch problematic comments before they're posted.
- **Requires active browser session.** The agent runs through your browser — it's not a server-side service. If you close the browser or your machine sleeps, the agent stops.

## Related skills

- `/sales-social-listening` — Social listening strategy — choosing tools, monitoring setup, competitive intelligence, crisis detection
- `/sales-devi` — Devi AI — Chrome extension for social lead monitoring across Facebook groups, LinkedIn, X, Reddit with AI intent detection
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-bazzly` — Bazzly — Reddit lead generation with intent scoring and Chrome extension
- `/sales-replyguy` — ReplyGuy — AI reply generation across Twitter, Reddit, LinkedIn
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up Persona for a SaaS founder
**User says**: "I'm a SaaS founder and I want Devta to engage in Reddit communities about project management"
**Skill does**:
1. Guides through Persona setup: name, professional background (SaaS founder, X years), expertise (project management, productivity tools), communication style (helpful, technical but accessible)
2. Recommends starting subreddits: r/projectmanagement, r/SaaS, r/startups
3. Advises on session length and frequency for credit efficiency
4. Recommends using live view for first 3 sessions to calibrate
**Result**: Persona configured, agent ready to engage authentically

### Example 2: Optimize credit usage
**User says**: "I'm burning through my credits too fast — how do I get more engagement from a $49 top-up?"
**Skill does**:
1. Explains the credit-to-minutes relationship (~189 minutes per $49)
2. Recommends shorter, focused sessions (30-45 min) targeting peak activity times
3. Suggests using Draft Posts (cheaper than live engagement) for consistent visibility
4. Advises reviewing engagement quality — better to do fewer high-quality interactions
**Result**: Credit optimization strategy that stretches a top-up further

### Example 3: Agent comments getting flagged
**User says**: "My Reddit comments from Devta are getting removed by moderators — what am I doing wrong?"
**Skill does**:
1. Reviews common causes: new account, too-frequent posting, overly promotional tone
2. Checks Persona setup for promotional language that triggers mod filters
3. Recommends account warmup: 2+ weeks of manual activity before running the agent
4. Advises varying subreddits and engagement patterns to avoid pattern detection
**Result**: Engagement strategy adjusted to reduce mod removals

## Troubleshooting

### Agent comments sound generic or robotic
**Symptom**: Comments the agent posts read like bot output, not like something you'd actually write
**Cause**: Persona isn't detailed enough — missing specific expertise, communication style, or technical depth
**Solution**: Edit your Persona with specific details: what technologies you use, your opinions on common debates in your field, how you typically open a comment (casual? technical? with a question?). Include 2-3 example comments you've written manually so the agent can calibrate tone. Use the live view to review output and adjust.

### Agent engaging in wrong communities or threads
**Symptom**: The agent is commenting on threads unrelated to your expertise or target audience
**Cause**: Community targeting too broad, or Persona doesn't clearly define your niche
**Solution**: Narrow your target communities to 2-3 specific subreddits. Use custom instruction fields for each session to direct the agent toward specific topics. Review the agent's browsing behavior in live view to understand what it's selecting.

### Credits running out too quickly
**Symptom**: $49 top-up doesn't last as long as expected, especially with daily usage
**Cause**: Running long sessions, agent spending time browsing before engaging, or using credits for project plans instead of networking
**Solution**: Track minutes per session. Use shorter focused sessions (30-45 min) rather than leaving the agent running for hours. Schedule sessions during peak community activity (weekday mornings US time for Reddit). Reserve credit allocation between networking and project planning.
