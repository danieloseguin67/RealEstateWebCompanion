---
name: sales-serplock
description: "Serplock platform help — AI search visibility with Prompt Rank (LLM mention tracking across ChatGPT, Perplexity, Gemini, Claude), Brand Wiki (LLM brand perception monitoring), Topic Graph (knowledge graph and entity mapping), Content Engineering (AI content generation with brand style guides), Reddit Mentions add-on, and Bot Analytics. Use when Prompt Rank results don't match what you see manually in ChatGPT or Perplexity, Brand Wiki shows inconsistencies in how LLMs describe your product, you need to map your brand's knowledge graph and entity relationships, content engineering agents aren't matching your brand voice, you want to track Reddit mentions alongside AI search visibility, or you're comparing Serplock vs Otterly vs Semrush AI Toolkit vs Ahrefs Brand Radar for AI visibility. Do NOT use for AI visibility strategy across tools (use /sales-ai-visibility) or traditional SEO (use /sales-seo)."
argument-hint: "[describe what you need help with in Serplock]"
license: MIT
version: 1.0.0
tags: [sales, ai-visibility, aeo, platform]
---
# Serplock Platform Help

Helps the user with Serplock platform questions — from prompt rank tracking and brand wiki interpretation through topic graph mapping, content engineering, and Reddit mentions.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Serplock do you need help with?**
   - A) Prompt Rank — tracking LLM mentions, understanding visibility scores
   - B) Brand Wiki — interpreting LLM brand perception, fixing inconsistencies
   - C) Topic Graph — mapping entities, building topical authority
   - D) Content Engineering — generating content with brand style guides
   - E) Reddit Mentions — tracking brand conversations on Reddit
   - F) Bot Analytics — understanding AI bot traffic to your site
   - G) Account/billing — plans, credits, add-ons
   - H) Something else — describe it

2. **What plan are you on?**
   - A) Startup ($49/mo — 35 prompts, 5 articles, 10 entities)
   - B) Growth ($99/mo — 100 prompts, 15 articles, 25 entities)
   - C) Pro ($199/mo — 200 prompts, 30 articles, 40 entities, Bot Analytics)
   - D) Enterprise ($299/mo — 300 prompts, 60 articles, unlimited entities)
   - E) Not sure / evaluating

3. **What's your specific goal?** (describe it)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- AI visibility strategy or tool comparison → `/sales-ai-visibility [question]`
- SEO strategy, keyword research, technical audits → `/sales-seo [question]`
- Semrush AI Visibility Toolkit → `/sales-semrush [question]`
- Traditional social listening → `/sales-social-listening [question]`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — Serplock platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, modules, content engineering, and tips.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Prompt Rank setup** — choose target prompts, set up competitor tracking, interpret visibility scores
2. **Brand perception** — audit Brand Wiki findings, plan corrections for LLM inconsistencies
3. **Entity strategy** — use Topic Graph to identify entity gaps, plan topical authority content
4. **Content generation** — configure brand style guides, review AI-generated content, export workflow
5. **Reddit monitoring** — set up keyword tracking, review AI analysis of threads, plan responses

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and pricing that may be outdated.*

- **No API, no webhooks, no Zapier.** Serplock is entirely UI-based. You cannot export data programmatically or build automation pipelines. Content Engineering exports are manual.
- **Prompt limits are per plan, not per month rolling.** The Startup plan tracks 35 prompts total — choose your target prompts carefully. Upgrading increases the limit.
- **Bot Analytics is Pro+ only.** The add-on that tracks AI bot traffic to your site requires the Pro ($199/mo) or Enterprise ($299/mo) plan.
- **Reddit Mentions is a separate add-on.** It starts at $20/mo on top of your base plan. It's not included in any tier by default.
- **Content Engineering uses brand-trained agents.** Results depend on how well you configure your brand style guide and knowledge ingestion. Garbage in, garbage out.
- **Article generation credits are limited per plan.** Startup gets 5 articles/mo, Enterprise gets 60. Additional credits available separately.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-ai-visibility` — AI visibility monitoring strategy — tool selection, manual audits, improvement strategies across all AI visibility platforms
- `/sales-seo` — SEO strategy — tool-agnostic keyword research, technical audits, link building, AI visibility
- `/sales-semrush` — Semrush platform help — SEO, AI Visibility Toolkit
- `/sales-yoast` — Yoast SEO — llms.txt generation, Schema Aggregation for AI visibility
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up AI visibility tracking for a new brand
**User says**: "I just signed up for Serplock Startup plan. How do I set up prompt tracking for my SaaS product?"
**Skill does**:
1. Recommends starting with 10-15 high-priority prompts (brand overview, category comparison, recommendation queries)
2. Explains how to add competitor brands for benchmarking
3. Walks through interpreting the first Prompt Rank results — mention rate, citation presence, sentiment
4. Suggests using remaining prompt slots for "best [category]" and "[brand] vs [competitor]" queries
**Result**: User has prompt tracking configured with meaningful baseline data

### Example 2: Fix inconsistent brand descriptions across LLMs
**User says**: "Brand Wiki shows ChatGPT describes us as an 'enterprise solution' but we're actually targeting startups. How do I fix this?"
**Skill does**:
1. Explains that Brand Wiki surfaces perception inconsistencies but cannot change LLM outputs directly
2. Recommends content strategy: update website copy, structured data, and third-party profiles to emphasize startup positioning
3. Suggests using Topic Graph to map entity relationships and identify which sources are feeding the "enterprise" perception
4. Sets realistic timeline: retrieval-based models (Perplexity) update faster, training-based models (ChatGPT) take months
**Result**: User has an actionable plan to correct LLM brand perception over time

### Example 3: Compare Serplock vs other AI visibility tools
**User says**: "Should I use Serplock or Otterly.ai for tracking my brand across AI search?"
**Skill does**:
1. Routes to `/sales-ai-visibility` for comprehensive tool comparison
2. Notes Serplock's differentiator: combined visibility tracking + content engineering + entity mapping in one workflow
3. Notes Otterly's strength: dedicated AI search monitoring with broader model coverage at lower entry price (~$49/mo)
4. Recommends Serplock if the user also needs content generation and entity strategy, Otterly if pure monitoring is enough
**Result**: User understands positioning differences and can make an informed choice

## Troubleshooting

### Prompt Rank results don't match manual checks
**Symptom**: Serplock shows your brand mentioned 40% of the time but manual ChatGPT checks show it less frequently
**Cause**: AI answers are non-deterministic — the same prompt produces different responses across sessions. Serplock aggregates across many runs while manual checks are single samples.
**Solution**: Treat Serplock data as directional trends, not absolute numbers. Use manual checks to validate qualitative aspects (accuracy, sentiment, context) rather than mention frequency. Compare trends over time rather than single snapshots.

### Content Engineering output doesn't match brand voice
**Symptom**: Generated articles sound generic or don't match your brand's tone and style
**Cause**: Brand style guide and knowledge base not configured properly, or insufficient training data
**Solution**: Review and update your brand style guide in Serplock — include tone descriptors, vocabulary preferences, and example content. Ingest more brand knowledge (existing blog posts, marketing copy). Generate a few test articles and iterate on the style guide before producing at scale.

### Entity limits hit before coverage is adequate
**Symptom**: Topic Graph shows you've used all entity slots but key entities are missing
**Cause**: Plan entity limits (Startup: 10, Growth: 25, Pro: 40) may be insufficient for brands in broad categories
**Solution**: Prioritize entities that directly impact your brand's AI visibility — your brand, top 3-5 competitors, key product categories. Remove entities that aren't driving insights. If still insufficient, upgrade to the next plan tier or contact Serplock about custom limits.
