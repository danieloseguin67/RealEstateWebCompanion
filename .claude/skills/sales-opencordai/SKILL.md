---
name: sales-opencordai
description: "Opencord AI platform help — AI agents for automated social media engagement on Twitter/X and Reddit with personalized reply generation, keyword-based opportunity discovery, and credit-based pricing. Use when Opencord AI replies sound too generic or spammy and you need to improve comment quality, your credits are running out too fast and you want to optimize credit usage, you need to configure AI agents for better targeting and higher-intent opportunities, you want to compare Opencord AI vs ReplyGuy vs Commentions vs Devi for social engagement automation, or you're setting up keyword targeting for Twitter/X and Reddit lead discovery. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit-only managed posting (use /sales-replyagent or /sales-replymer)."
argument-hint: "[describe what you need help with in Opencord AI — e.g., 'comments feel robotic']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, social-engagement, platform]
---

# Opencord AI Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up AI agents and keyword targeting
   - B) Improving reply quality (too generic, too promotional)
   - C) Optimizing credit usage (running out too fast)
   - D) Choosing between Opencord AI and alternatives
   - E) Understanding pricing and plan limits
   - F) Something else — describe it

2. **Which plan are you on?**
   - A) Free (200k credits, 1 agent)
   - B) Basic ($8/mo — 750k credits, 1 agent)
   - C) Plus ($24/mo — 3M credits, 3 agents)
   - D) Pro ($48/mo — 6M credits, 5 agents)
   - E) Elite ($96/mo — 12M credits, 7 agents)
   - F) Evaluating — haven't signed up yet

3. **Which platforms are you targeting?**
   - A) Twitter/X
   - B) Reddit
   - C) Both

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform social listening strategy → `/sales-social-listening [question]`
- Reddit managed posting with human writers → `/sales-replymer [question]`
- Reddit marketing with managed accounts → `/sales-replyagent [question]`
- LinkedIn/X/YouTube/Quora auto-commenting → `/sales-commentions [question]`
- Multi-platform AI replies with auto-post → `/sales-parsestream [question]`
- Reddit + Quora keyword monitoring with AI replies → `/sales-threadradar [question]`
- Facebook group + social lead monitoring → `/sales-devi [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Opencord AI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, credit system, agent setup, platform coverage, competitive positioning.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — start with 5-10 high-intent keywords; use problem-language, not brand terms
2. **Agent quality** — configure detailed brand context; emphasize help over promotion
3. **Credit optimization** — focus agents on high-relevance opportunities; reduce broad keyword matches
4. **Platform focus** — Twitter/X for real-time conversations, Reddit for long-form community discussions
5. **Plan selection** — Free tier is extremely limited (~8 replies); Basic gives ~30/mo; most active users need Plus+

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about credit system and plan limits.*

- **No API, no webhooks, no Zapier.** Opencord AI is UI-only. You cannot programmatically manage agents, pull analytics, or integrate with other tools.
- **Free tier is almost unusable.** 200k credits translates to roughly 8 replies per month — enough to test, not enough to generate leads.
- **Credits don't map linearly to replies.** Credit consumption depends on AI processing per opportunity. The ~25k credits per reply ratio is approximate — complex threads may consume more.
- **Browser automation is the engine.** All posting is done via browser automation, not API-compliant OAuth posting. This carries inherent platform risk.
- **No approval queue.** AI agents generate and engage autonomously. Set targeting and brand voice carefully upfront — you can't review before posting.
- **Annual billing only for discounted rates.** The $8-96/mo prices require annual commitment. Monthly billing is ~20% more.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel
- `/sales-commentions` — Commentions — auto-commenting on LinkedIn, X, YouTube, Quora
- `/sales-replyguy` — ReplyGuy — AI replies across Twitter, Reddit, LinkedIn
- `/sales-parsestream` — ParseStream — multi-platform keyword monitoring with AI replies and auto-reply
- `/sales-devi` — Devi AI — social lead monitoring across Facebook groups, LinkedIn, X, Reddit
- `/sales-replyagent` — ReplyAgent — Reddit marketing with managed account posting
- `/sales-replymer` — Replymer — managed Reddit/X reply marketing with human-written replies
- `/sales-devta` — Devta — AI Networking Agent for proactive community engagement
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Replies sound like ads
**User says**: "My Opencord AI comments keep mentioning my product name first — they look spammy"
**Skill does**:
1. Reads platform guide for agent configuration
2. Reviews keyword targeting — likely too product-focused instead of problem-focused
3. Suggests reconfiguring the AI agent with problem-language keywords and value-first brand context
4. Recommends testing with a few high-intent keywords before scaling
**Result**: Comments lead with genuine help, brand mention feels natural

### Example 2: Credits running out too fast
**User says**: "I'm on the Plus plan but burning through 3M credits in the first week"
**Skill does**:
1. Reads platform guide for credit system details
2. Checks agent configuration — likely too many agents on broad keywords consuming credits on low-relevance opportunities
3. Suggests narrowing keywords to high-intent phrases, reducing active agents to 1-2, and monitoring credit burn rate
4. Recommends upgrading to Pro only after optimizing targeting
**Result**: Better credit efficiency with focused targeting

### Example 3: Choosing an engagement automation tool
**User says**: "Should I use Opencord AI or ReplyGuy for automated social engagement?"
**Skill does**:
1. Reads platform guide for competitive positioning
2. Compares: Opencord AI uses AI agents with credit-based pricing ($8-96/mo) on X/Reddit; ReplyGuy uses keyword monitoring ($49/mo flat) on Twitter/Reddit/LinkedIn with semi-manual posting
3. Notes Opencord AI is fully autonomous; ReplyGuy requires manual review on Reddit/LinkedIn
4. Recommends based on budget, automation comfort level, and platform needs
**Result**: Clear comparison matched to user's priorities

## Troubleshooting

### AI agent not finding relevant opportunities
**Symptom**: Agent is active but not engaging with high-quality threads
**Cause**: Keywords too broad, targeting popular topics with too much noise
**Solution**: Narrow keywords to specific problem phrases your product solves. Use 3-5 word phrases instead of single terms. Review what the agent is matching and refine. Start with Reddit where thread quality is often higher.

### Comments getting flagged or removed
**Symptom**: Posts being removed by moderators or platform algorithms
**Cause**: Browser automation patterns detected, or comment content too promotional
**Solution**: Reduce posting frequency. Improve brand voice configuration to be genuinely helpful, not promotional. Space out engagement across different subreddits/threads. Consider whether the platform (especially Reddit) is suitable for automated engagement.

### Not sure which plan to choose
**Symptom**: Evaluating plans but unclear on actual reply volume needed
**Cause**: Credit-to-reply ratio is approximate and hard to predict
**Solution**: Start with Free (8 replies) to test quality and targeting. Move to Basic ($8/mo, ~30 replies) for light use. Most active lead generation requires Plus ($24/mo, ~150 replies) or higher. Credits don't roll over — match your plan to actual weekly posting needs.
