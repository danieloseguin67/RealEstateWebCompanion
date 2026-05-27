---
name: sales-prospy
description: "Prospy platform help — AI-powered social listening and lead generation across Twitter/X, Reddit, Bluesky, and Hacker News with AI lead scoring, smart intent detection, brand monitoring, competitor tracking, and AI reply suggestions. Use when Prospy lead scoring is surfacing too many irrelevant conversations and you need to tune keywords, AI reply suggestions sound generic and don't match your brand voice, you want to set up brand monitoring and competitor tracking across multiple platforms, leads from Bluesky or HN aren't appearing and you think the scanner is missing conversations, you need help choosing between Prospy and other multi-platform social listeners like CatchIntent or Syften, or you're comparing budget social listening tools under $30/mo for a solo founder. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Prospy]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, lead-generation, platform]
---

# Prospy Platform Help

Helps the user with Prospy platform questions — from project setup and keyword configuration through lead scoring, AI reply optimization, brand monitoring, and competitor tracking.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Prospy do you need help with?**
   - A) Project setup — keywords, competitor terms, audience signals
   - B) Lead scoring — understanding scores, filtering irrelevant matches
   - C) AI replies — improving suggestion quality, matching brand voice
   - D) Brand monitoring — tracking mentions across platforms
   - E) Competitor tracking — monitoring competitor discussions
   - F) Billing — Explorer Pass vs Pro vs Enterprise differences
   - G) Something else — describe it

2. **What's your goal?** (describe your specific question or problem)

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit-specific monitoring (depth over breadth) → `/sales-threadlytics [question]` or `/sales-syften [question]`
- Buyer intent signals and prioritization → `/sales-intent [question]`
- Contact enrichment → `/sales-enrich [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Prospy platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, project setup, lead scoring, and comparison with alternatives.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Project setup** — define keywords using buyer-intent phrases, add competitor names as exclusion terms or tracking targets, configure audience signals
2. **Lead scoring** — focus on highest-scored leads first; scoring combines intent, relevance, and timing
3. **Platform prioritization** — Twitter/X and Reddit are the strongest channels; Bluesky and HN are supplementary
4. **Reply quality** — always edit AI suggestions before posting; match community tone, not sales pitch
5. **Alert fatigue** — start with narrow keywords and expand; broad keywords drown signal in noise

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Explorer Pass ($12) is a one-time 3-day trial, not a subscription.** It gives temporary access to evaluate the platform. For ongoing use, Pro ($24/mo) is the entry point.
- **No API, no webhooks, no Zapier/Make.** Prospy is entirely UI-driven. No way to push leads to a CRM programmatically — manual copy-paste or screenshot workflow only.
- **LinkedIn and Facebook are "coming soon" — not live.** Only Twitter/X, Reddit, Bluesky, and Hacker News are active. Don't expect LinkedIn monitoring yet.
- **Launch pricing ($24/mo) may expire.** Pro is listed at $24/mo but originally priced at $59/mo. Budget for the higher price if you depend on it long-term.
- **AI reply suggestions need heavy editing.** Generated replies tend toward generic engagement language. Always customize for the specific community's tone and norms.
- **No auto-reply or auto-publish.** All engagement is manual — Prospy finds leads and suggests replies, but you post from your own accounts.

## Related skills

- `/sales-social-listening` — Social listening strategy — monitoring setup, tool comparison, sentiment analysis, competitive intelligence, crisis detection
- `/sales-catchintent` — CatchIntent — AI intent detection across Reddit, X, HN, Bluesky with CRM integrations, MCP server, webhooks
- `/sales-syften` — Syften — AI-filtered keyword monitoring across 15+ community platforms, sub-minute alerts, REST API, webhooks
- `/sales-leadverse` — Leadverse — multi-platform lead discovery (Reddit, X, LinkedIn) with keyword tracking and AI reply suggestions
- `/sales-prems` — Prems AI — 15-platform lead generation with AI intent scoring and personalized reply drafts
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up monitoring for a SaaS launch
**User says**: "I just launched an AI writing tool and want to find people on Twitter and Reddit asking for writing help"
**Skill does**:
1. Creates a new Prospy project with product description and target keywords
2. Adds buyer-intent phrases: "looking for AI writer", "alternative to Jasper", "need help writing content"
3. Adds competitor terms for tracking: Jasper, Copy.ai, Writesonic
4. Configures audience signals to focus on founders and marketers
**Result**: Multi-platform monitoring running with targeted keywords across Twitter/X and Reddit

### Example 2: Reduce noise in lead feed
**User says**: "Most of the conversations Prospy shows me aren't real leads — people are just chatting about the topic"
**Skill does**:
1. Reviews current keyword list for overly broad terms
2. Recommends adding buyer-intent modifiers and competitor-switch phrases
3. Suggests using exclusion terms to filter out educational/tutorial content
4. Notes that AI scoring combines intent + relevance + timing, so high scores should already filter casual chat
**Result**: Refined keyword strategy producing higher-quality leads

### Example 3: Push Prospy leads to a CRM
**User says**: "How do I get Prospy leads into my CRM automatically?"
**Skill does**:
1. Notes Prospy has no API, webhooks, or CRM integration — entirely UI-only
2. Suggests manual workflow: review leads in dashboard → copy lead details → paste into CRM
3. Compares with alternatives that offer CRM integration (CatchIntent has HubSpot/Pipedrive/Close, Syften has webhooks + API)
4. If CRM automation is critical, recommends evaluating CatchIntent instead
**Result**: Clear explanation of limitations with actionable alternative recommendations

## Troubleshooting

### Leads are mostly irrelevant discussions
**Symptom**: High volume of leads but most are casual conversations, not people looking to buy
**Cause**: Keywords are too generic or project description is too broad
**Solution**: Refine keywords with buyer-intent language ("looking for", "recommend", "alternative to [competitor]"). Remove single-word keywords. Add exclusion terms for common false-positive patterns. Review AI lead scoring — if high-scored leads are still irrelevant, the product description may need sharpening.

### Platform coverage feels incomplete
**Symptom**: You see relevant conversations on Twitter/Reddit manually that Prospy doesn't surface
**Cause**: Keywords may not match the exact phrasing used in those conversations, or scanning frequency may introduce delay
**Solution**: Add alternate phrasings and misspellings as keywords. Check that all four platforms (Twitter/X, Reddit, Bluesky, HN) are enabled in your project. Note that Prospy scans continuously but there may be indexing delay — real-time coverage is best-effort.

### AI reply suggestions sound robotic
**Symptom**: Generated replies feel generic and don't match community tone
**Cause**: AI suggestions default to professional engagement language that can feel out of place on Reddit or HN
**Solution**: Always edit suggestions before posting. Match the community's communication style — Reddit is informal, HN is technical, Twitter is concise. Add your brand voice details in the project setup to improve suggestion quality.
