---
name: sales-replyguy
description: "ReplyGuy platform help — AI-powered social mention generation across Twitter, Reddit, and LinkedIn with keyword monitoring, automated reply drafting, and natural product placement. Use when ReplyGuy replies sound too robotic and keep getting downvoted or deleted, your Reddit account got banned after using ReplyGuy auto-replies, mentions aren't being found for your keywords and the dashboard shows zero matches, you want to switch from full auto-reply to manual review mode on Twitter, reply quota is running out before the month ends, you're comparing ReplyGuy vs KeyMentions vs ThreadRadar for Reddit engagement, or you're not sure whether ReplyGuy is safe to use on Reddit after the 2024 ownership change. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in ReplyGuy — e.g., 'my Reddit account got banned']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# ReplyGuy Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, projects)
   - B) Reply quality (too generic, robotic tone, getting deleted)
   - C) Account bans or shadowbans on Reddit/Twitter
   - D) Auto-reply vs manual mode configuration
   - E) Managing reply quota / plan limits
   - F) Multi-project setup (Business+ plans)
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial
   - B) Pro ($49/mo — 10 keywords, 100 replies, 1 project)
   - C) Business ($99/mo — 25 keywords, 300 replies, 5 projects)
   - D) Enterprise ($199/mo — 100 keywords, 1000 replies, unlimited projects)
   - E) Agency ($499/mo — 1000 keywords, 5000 replies, unlimited projects)

3. **Which platforms are you targeting?**
   - A) Twitter/X only (full auto-reply available)
   - B) Reddit (semi-manual — AI drafts, you publish)
   - C) LinkedIn (semi-manual — AI drafts, you publish)
   - D) All platforms

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform social listening strategy → `/sales-social-listening [question]`
- Reddit monitoring with API/webhooks access → `/sales-octolens [question]`
- Reddit monitoring with auto-publish and virality filter → `/sales-keymentions [question]`
- Reddit + Quora monitoring with manual-only drafts → `/sales-threadradar [question]`
- Reddit monitoring with AI relevance scoring + API → `/sales-redship [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — ReplyGuy platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, automation modes, platform differences, and safety guidelines.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — use specific multi-word phrases matching buying intent, not generic single words
2. **Platform selection** — Twitter allows auto-reply; Reddit/LinkedIn require manual posting (safer)
3. **Reply quality** — review and edit AI drafts before posting; generic replies get deleted
4. **Account safety** — use aged accounts, post organically between ReplyGuy replies, vary posting times

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about account safety and platform differences.*

- **Reddit accounts get banned from automated/repetitive replies.** ReplyGuy reportedly received a letter from Reddit legal. Reddit semi-manual mode is safer than Twitter auto-reply, but repeated similar-sounding comments from the same account will still trigger anti-spam. Vary your language and post organic content between promotional replies.
- **Twitter auto-reply is the only truly automated mode.** Reddit and LinkedIn require you to manually copy-paste and submit. Don't expect "set and forget" on Reddit/LinkedIn.
- **No API, no webhooks, no integrations.** You cannot export data, trigger workflows, or connect to CRM. The platform is entirely UI-driven. If you need programmatic access, use Octolens, RedShip, or Syften instead.
- **Ownership changed in September 2024.** Original creators sold the platform. Support quality and feature roadmap may differ from earlier reviews.
- **$49/mo minimum entry is expensive for what you get.** KeyMentions offers a free tier with 3 keywords; ThreadRadar starts at $19.95/mo. ReplyGuy's value is multi-platform coverage (Twitter + Reddit + LinkedIn) in one tool.
- **No sentiment scoring, no analytics, no competitive intel.** This is a reply generation tool, not a monitoring platform. If you need insights beyond "here are threads to reply to," pair with a proper listening tool.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel
- `/sales-keymentions` — KeyMentions platform help — Reddit monitoring with AI comment generation and auto-publish
- `/sales-threadradar` — ThreadRadar platform help — Reddit + Quora monitoring with AI reply drafts (manual only)
- `/sales-redship` — RedShip platform help — Reddit monitoring with AI relevance scoring, REST API, webhooks
- `/sales-octolens` — Octolens platform help — developer-first social listening with API/MCP on all plans
- `/sales-syften` — Syften platform help — fast community monitoring across 15+ platforms with API/webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Replies getting deleted on Reddit
**User says**: "My ReplyGuy-generated replies keep getting removed from Reddit threads within minutes"
**Skill does**:
1. Reads platform guide safety section
2. Explains that Reddit's spam filters detect repetitive promotional patterns
3. Advises: switch to semi-manual mode, edit AI drafts substantially before posting, space out replies (max 2-3/day per account), mix organic comments between promotional ones, use an aged Reddit account with karma history
4. Suggests considering KeyMentions or ThreadRadar as alternatives with better Reddit safety track records
**Result**: Clear action plan to reduce deletions and ban risk

### Example 2: Setting up for a SaaS product launch
**User says**: "I just launched a project management tool and want to use ReplyGuy to get mentions on Twitter and Reddit"
**Skill does**:
1. Reads platform guide keyword strategy
2. Suggests keywords: "project management recommendation", "best task app", "looking for project tool", competitor names like "Asana alternative"
3. Recommends: start with Twitter auto-reply (lower ban risk), use Reddit semi-manual mode with heavy editing
4. Sets expectations: results typically appear within 1-2 weeks, budget for Pro plan (10 keywords sufficient for launch)
**Result**: Launch monitoring configured across platforms with safety-first approach

### Example 3: Comparing ReplyGuy to alternatives
**User says**: "Is ReplyGuy worth $49/mo vs KeyMentions or ThreadRadar for Reddit lead gen?"
**Skill does**:
1. Reads platform guide comparison section
2. Compares: ReplyGuy $49/mo (Reddit + Twitter + LinkedIn, semi-manual) vs KeyMentions free-$79/mo (Reddit only, auto-publish) vs ThreadRadar $19.95/mo (Reddit + Quora, manual only)
3. Notes ReplyGuy's unique value: multi-platform coverage in one tool, especially if Twitter is important
4. Notes downsides: higher ban risk history, no API, more expensive than focused alternatives
5. Recommends: if Reddit-only → KeyMentions (free tier + auto-publish). If safety-first → ThreadRadar. If Twitter + Reddit + LinkedIn → ReplyGuy.
**Result**: Clear decision framework with trade-offs

## Troubleshooting

### Reddit account got banned or shadowbanned
**Symptom**: Account can still post but comments don't appear to others, or account is fully suspended
**Cause**: Posting too many similar-sounding promotional replies, too quickly, from a new or low-karma account
**Solution**: Stop using the account immediately. Create or switch to an aged account with organic karma history. Reduce reply frequency to 2-3/day maximum. Always edit AI drafts to sound genuinely helpful (not promotional). Post organic comments between promotional ones. Consider switching to ThreadRadar which forces manual posting only.

### Replies sound too generic and get downvoted
**Symptom**: AI-generated replies are clearly promotional, don't address the thread topic, or get negative reactions
**Cause**: Keywords are too broad (matching irrelevant threads) or AI context is insufficient for good replies
**Solution**: Use more specific multi-word keywords that match high-intent threads (e.g., "recommend a CRM for freelancers" not just "CRM"). Always review and substantially edit AI drafts before posting — add specific personal experience, answer the thread's actual question first, then mention your product only if genuinely relevant.

### Dashboard shows no mentions despite active keywords
**Symptom**: Set up keywords but the dashboard stays empty for days
**Cause**: Keywords are too specific (no matching threads exist), platform monitoring may be delayed, or keywords overlap with excluded terms
**Solution**: Start broader, then narrow down. Check that your keywords actually appear in recent Reddit/Twitter posts by manually searching. Try single high-volume keywords first to confirm the system is working, then refine. If still no results after 48 hours, contact support via live chat (Crisp widget on site).
