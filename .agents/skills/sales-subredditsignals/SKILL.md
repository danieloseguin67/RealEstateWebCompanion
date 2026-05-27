---
name: sales-subredditsignals
description: "Subreddit Signals platform help — Reddit lead generation with 7-dimension buyer intent classification, AI Comment Builder with voice training, Engagement Queue, Pain Points Radar, competitor intelligence. Use when Subreddit Signals lead tokens run out before the week ends, keyword monitoring returns too many irrelevant threads, the Comment Builder sounds generic and doesn't match your voice, intent scoring misclassifies low-intent threads as purchase-ready, you want to find subreddits where your target customers actually hang out, engagement queue items pile up faster than you can respond, or you're comparing Subreddit Signals vs KeyMentions vs Redreach vs ThreadRadar for Reddit lead generation. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Subreddit Signals — e.g., 'lead tokens run out too fast' or 'comment builder sounds robotic']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, lead-generation, platform]
---

# Subreddit Signals Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (keywords, subreddits, filters)
   - B) Intent classification — scoring feels off
   - C) Comment Builder — replies sound generic or get downvoted
   - D) Lead tokens running out too fast
   - E) Finding the right subreddits for my niche
   - F) Campaign automations and engagement queue
   - G) Comparing Subreddit Signals vs other Reddit tools
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($29/mo — 1 brand, 10 subreddits, 15 lead tokens/week)
   - B) Pro ($59/mo — 5 brands, unlimited subreddits, 25 lead tokens/week)
   - C) Service ($2,000/mo — done-for-you)
   - D) Free trial / evaluating

3. **What's your product/niche?** (helps calibrate keyword and subreddit advice)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a broader strategy:
- Choosing between Reddit monitoring tools → `/sales-social-listening which Reddit monitoring tool should I use`
- Social listening beyond Reddit → `/sales-social-listening [question]`
- Reddit comment writing best practices → `/sales-social-listening how do I write Reddit comments that don't get downvoted`
- Cold outreach strategy → `/sales-cadence [question]`
- Prospect enrichment → `/sales-enrich [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Subreddit Signals platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, intent scoring system, Comment Builder workflow, engagement queue, and optimization strategies.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Keyword strategy** — design signal keywords that surface high-intent threads (problem phrases, comparison phrases, buying phrases)
2. **Subreddit discovery** — identify communities where target customers ask questions
3. **Comment quality** — train voice profiles, structure replies with the 3-part template
4. **Token optimization** — prioritize highest-intent leads, batch engagement windows
5. **Competitive positioning** — use Pain Points Radar and competitor intelligence features

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Lead tokens are weekly, not monthly.** Starter gets 15/week, Pro gets 25/week. Unused tokens don't roll over. Plan engagement around weekly windows.
- **No API, no webhooks, no Zapier.** Subreddit Signals is entirely UI-driven. You cannot programmatically export leads or integrate with your CRM automatically. Manual copy-paste or screenshot workflows are the only option.
- **Purchase-ready leads are capped on Starter.** Only 3 purchase-ready leads per week on Starter — if your niche has high volume, this limit becomes the real bottleneck, not the 15 token limit.
- **Voice profile training takes effort.** The Comment Builder learns your voice, but you need to invest time training it on your writing style and each subreddit's culture. Generic prompts produce generic comments.
- **Subreddit limits matter more than you think.** Starter is capped at 10 subreddits — choose carefully. A niche product may need only 5, but broader products can easily exceed 10.
- **Intent scoring is not infallible.** The 7-dimension system is better than keyword matching, but false positives still happen (especially with ambiguous "how do I" posts that aren't actually buying signals).

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Before recommending a specific platform skill

This skill covers a specific platform. **Before routing the user to any other platform skill** listed in `## Related skills`, read that platform skill's actual `SKILL.md` first. The 1-line description is enough to *identify* a candidate — it's not enough to *commit* to it or to write a prompt that invokes it well.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence, crisis detection
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment auto-publish, virality detection
- `/sales-threadradar` — ThreadRadar — Reddit + Quora monitoring with AI reply drafts, manual posting
- `/sales-redship` — RedShip — Reddit monitoring with relevance scoring, SEO post discovery, REST API + webhooks
- `/sales-bazzly` — Bazzly — Reddit lead generation with intent scoring, DM automation, Chrome extension
- `/sales-painonsocial` — PainOnSocial — Reddit pain point discovery with frequency/severity scoring
- `/sales-reddinbox` — Reddinbox — AI audience intelligence across Reddit, X, HN with intent scoring
- `/sales-syften` — Syften — AI-filtered monitoring across 15+ community platforms, sub-minute alerts, API
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Optimize lead token usage
**User says**: "I'm on the Starter plan and my 15 lead tokens run out by Wednesday every week. How do I prioritize?"
**Skill does**:
1. Reads platform guide for token system details
2. Recommends filtering engagement queue by intent score — only engage with +5 or higher threads
3. Suggests batching engagement to 2-3 sessions per week rather than daily
4. Notes that upgrading to Pro ($59/mo) gives 25 tokens + unlimited purchase-ready leads
**Result**: Token usage optimized with clear upgrade path if needed

### Example 2: Comment Builder sounds robotic
**User says**: "My comments keep getting downvoted. The AI suggestions sound too sales-y."
**Skill does**:
1. Reviews the 3-part comment structure (direct answer → proof → next step)
2. Recommends training voice profiles with 5-10 examples of naturally-written Reddit comments
3. Suggests adjusting per-subreddit culture context — r/SaaS tolerates product mentions, r/startups does not
4. Advises leading with genuine value before any product mention
**Result**: Comment quality improved with culture-aware voice training

### Example 3: Find subreddits for a niche product
**User says**: "I sell a time-tracking tool for freelancers. Which subreddits should I monitor?"
**Skill does**:
1. Uses the AI subreddit discovery feature to find communities matching "freelancer time tracking"
2. Recommends starting with r/freelance, r/Upwork, r/graphic_design, r/webdev (high freelancer density)
3. Suggests adding pain-point keywords: "tracking hours", "invoicing time", "billable hours"
4. Advises starting with 5-7 subreddits on Starter and expanding based on lead quality
**Result**: Targeted subreddit list with matching keyword strategy

## Troubleshooting

### Lead tokens run out too fast
**Symptom**: Weekly allocation exhausted by mid-week, missing high-intent threads on Thursday-Sunday
**Cause**: Engaging with every lead regardless of intent score, or too many low-intent threads in the queue
**Solution**: Filter the engagement queue by intent — only spend tokens on threads scoring +3 or higher (direct recommendation requests). Save 5 tokens for late-week high-intent threads. If consistently running out, upgrade to Pro ($59/mo) for 25 tokens + unlimited purchase-ready leads.

### Intent scoring marks irrelevant threads as high-intent
**Symptom**: Threads flagged as "purchase-ready" are just general discussion posts, not people looking to buy
**Cause**: Generic keywords like "best tool" or "recommendation" trigger the scoring but lack product-specific context
**Solution**: Add more specific signal keywords that include your product category + buying context (e.g., "time tracking tool recommendation" instead of just "recommendation"). Use negative keywords to exclude tutorial requests, academic discussions, and meme threads.

### Comment Builder suggestions don't match subreddit culture
**Symptom**: AI-generated comments feel out of place, get downvoted or removed by moderators
**Cause**: Voice profile not trained on subreddit-specific norms, or using the same comment style across all communities
**Solution**: Train separate voice profiles for each high-priority subreddit. Read the top 10 comments in that subreddit and note the tone (technical, casual, supportive). Adjust the Comment Builder's talking points per community. Avoid any link or product mention in subreddits that have strict self-promotion rules — check the sidebar before engaging.
