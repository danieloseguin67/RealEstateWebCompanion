---
name: sales-reppit
description: "Reppit AI platform help — Reddit-only lead generation with AI keyword discovery from product URL, 0-100 buying intent scoring, AI reply drafts, subreddit targeting, manual posting only. Use when Reppit AI isn't finding relevant Reddit threads for your product, buying intent scores don't match actual lead quality, AI-drafted replies sound too generic or promotional for Reddit, you want to optimize keyword or subreddit targeting for higher-intent conversations, you're comparing Reppit AI vs Redreach vs Subreddit Signals vs Leadlee for Reddit lead gen, or you need a GummySearch replacement with intent scoring. Do NOT use for social listening strategy across tools (use /sales-social-listening) or Reddit marketing with managed accounts (use /sales-replyagent or /sales-leadmore)."
argument-hint: "[describe what you need help with in Reppit AI — e.g., 'intent scores seem wrong' or 'not finding the right threads']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, platform]
---

# Reppit AI Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Alert quality — intent scores don't match real leads
   - B) Reply quality — AI drafts sound generic or promotional
   - C) Keyword/subreddit targeting — not finding the right conversations
   - D) Setup — just getting started with Reppit AI
   - E) Comparing Reppit AI to other Reddit lead gen tools
   - F) Something else — describe it

2. **Current setup?**
   - A) Just signed up / configuring
   - B) Running but too much noise
   - C) Running but leads aren't converting
   - D) Evaluating vs other tools

**If the user's request already provides enough context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit lead gen with managed accounts → `/sales-replyagent [question]` or `/sales-leadmore [question]`
- Reddit monitoring with API/webhooks → `/sales-redship [question]` or `/sales-octolens [question]`
- Reddit thread analysis for market research → `/sales-reddily [question]`
- AI search visibility via Reddit → `/sales-reddgrow [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Reppit AI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, keyword discovery, intent scoring, reply drafting.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

1. **Improve intent scores** — refine keywords to be specific pain-point phrases, not broad category terms; prune low-converting subreddits
2. **Better replies** — never post AI drafts verbatim; rewrite in first person, add genuine experience, remove marketing language
3. **Account safety** — Reppit uses manual posting only, which protects your Reddit account; build karma before engaging
4. **Keyword discovery** — start by entering your product URL for AI-generated keywords, then refine based on which keywords surface real buying conversations

If you discover a tip not in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No API, no webhooks, no MCP server.** Reppit AI is dashboard-only. No programmatic access to leads or data.
- **No Zapier/Make integration.** Cannot trigger automations from discovered leads. Manual workflow only.
- **Manual posting only.** Reppit drafts replies but you post them yourself on Reddit. This is a feature, not a bug — it protects your account from auto-posting bans.
- **AI drafts need heavy editing.** Reddit communities flag promotional content aggressively. Always rewrite before posting.
- **Pricing is JS-rendered.** Exact plan limits may differ from what's documented here. Verify on reppit.ai before purchasing.
- **No CRM export.** No way to bulk-export discovered leads. Manual copy-paste workflow required.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, competitive intelligence
- `/sales-redreach` — AI Reddit lead gen with keyword auto-discovery, Google-ranking posts, webhooks
- `/sales-subredditsignals` — Reddit lead gen with 7-dimension buyer intent classification, voice training
- `/sales-leadlee` — Cheapest Reddit lead gen with AI replies ($12/mo), quality scoring
- `/sales-reddgrow` — Reddit marketing for AI search visibility (GEO), REST API, CLI
- `/sales-leado` — Reddit lead gen with Karma Builder, Viral Template Library, $0-29.99/mo
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Intent scores don't match lead quality
**User says**: "Reppit shows posts as 80+ intent but they're just general discussions, not buying conversations"
**Skill does**:
1. Reads platform-guide.md for intent scoring mechanics
2. Recommends tightening keywords from broad terms ("project management") to pain-point phrases ("need a tool that does X")
3. Suggests pruning subreddits where general discussion dominates over buying conversations
4. Advises marking irrelevant posts as "rejected" to track patterns
**Result**: Higher-quality lead feed with more actionable intent scores

### Example 2: Getting leads into a CRM
**User says**: "How do I get Reppit leads into HubSpot?"
**Skill does**:
1. Reads platform-guide.md integration section
2. Explains no API, webhooks, or Zapier exist — dashboard is the only interface
3. Suggests manual workflow: review high-intent leads daily, batch-enter thread URLs and details into CRM
4. For automation needs, recommends evaluating RedShip or Buska which have API/webhook access
**Result**: Manual workaround established, API-capable alternatives flagged

### Example 3: AI reply drafts getting downvoted
**User says**: "I'm posting Reppit's suggested replies and they keep getting downvoted or removed"
**Skill does**:
1. Reads platform-guide.md reply quality section
2. Explains Reddit norms: never post AI drafts verbatim, they read as promotional
3. Recommends rewriting completely in first person with genuine experience
4. Suggests building karma in target subreddits before engaging with leads
**Result**: Improved reply survival through community-appropriate engagement

## Troubleshooting

### Intent scoring surfaces mostly irrelevant threads
**Symptom**: High-intent posts (80+) turn out to be general discussions, not buying signals
**Cause**: Keywords too broad, subreddits too general, or AI scoring calibrated for keyword density not buying context
**Solution**: Replace broad category keywords with specific pain-point phrases that real buyers use. Remove subreddits where discussion is primarily educational rather than purchase-oriented. Mark irrelevant high-score posts as "rejected" to identify keyword patterns causing false positives.

### AI reply suggestions sound too promotional
**Symptom**: Suggested replies read like sales pitches and get downvoted or removed
**Cause**: AI optimizes for product mention rather than community value
**Solution**: Use AI drafts as topic inspiration only — never copy-paste. Rewrite in first person, lead with 2-3 sentences of genuine advice, mention your product only if directly relevant, and remove all marketing language. Check subreddit rules before posting.

### Keyword discovery from URL generates irrelevant terms
**Symptom**: Auto-generated keywords from your product URL don't match how Reddit users discuss your problem space
**Cause**: AI extracts keywords from website copy, which uses marketing language rather than user language
**Solution**: Keep 2-3 of the best auto-generated keywords, then manually add terms from actual Reddit conversations about your problem. Search relevant subreddits manually to find the exact phrases people use when asking for solutions.
