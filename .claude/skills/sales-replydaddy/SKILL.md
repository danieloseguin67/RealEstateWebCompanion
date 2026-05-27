---
name: sales-replydaddy
description: "ReplyDaddy platform help — Reddit marketing co-pilot with AI-powered post discovery, multi-factor relevance scoring, response generation, persona-based engagement, BYOK AI model. Use when ReplyDaddy's relevance scoring is surfacing too many irrelevant posts, AI-generated responses sound generic or too promotional, you're unsure whether the LTD or subscription pricing is better value, API token costs are adding up beyond the base price, you want to connect ReplyDaddy leads to your CRM but there's no integration, or you're comparing ReplyDaddy vs Reppit AI vs Subtle AI vs Leadlee for Reddit marketing. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in ReplyDaddy]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, lead-generation, platform]
---
# ReplyDaddy Platform Help

Helps the user with ReplyDaddy platform questions — from discovery setup and persona configuration through response quality tuning, pricing optimization, and manual engagement workflow.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of ReplyDaddy do you need help with?**
   - A) Discovery setup — keywords, subreddit targeting, relevance scoring
   - B) Response quality — persona tuning, reducing generic output
   - C) Pricing/costs — LTD vs subscription, BYOK API costs
   - D) Workflow — daily engagement habits, marketing plan
   - E) Compliance — subreddit rules, post eligibility, account safety
   - F) Integration workarounds — CRM logging, lead tracking
   - G) Something else — describe it

2. **How are you using ReplyDaddy?**
   - A) LTD (lifetime deal via RocketHub, BYOK API key)
   - B) Subscription (Free / Starter $99/mo / Growth $299/mo / Scale $799/mo)
   - C) Not sure / just evaluating

3. **What are you trying to accomplish?** (describe your specific goal)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring strategy across tools → `/sales-social-listening [question]`
- Prospect list building → `/sales-prospect-list`
- Outbound cadence or sequence strategy → `/sales-cadence`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — ReplyDaddy platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, BYOK model, workflow recipes, and engagement patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Discovery setup** — refine keywords to target buying intent, pick niche subreddits, tune relevance scoring threshold
2. **Response quality** — configure persona with real expertise, edit every AI draft, add thread-specific context
3. **Pricing** — calculate total cost (base + API tokens) for usage level, compare LTD vs subscription
4. **Workflow** — use the 90-day plan and habit builder to maintain consistent daily engagement
5. **Safety** — always review before posting, check post eligibility, follow subreddit rules

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about pricing model and BYOK costs that may change.*

- **Two pricing models exist.** ReplyDaddy sells both a ~$59 lifetime deal (via RocketHub, BYOK) and monthly subscriptions ($99-799/mo). The LTD requires your own Anthropic/OpenAI API key, adding $10-50+/mo in token costs. The subscription model's per-tier feature limits are unclear from public docs.
- **No API, no webhooks, no integrations.** ReplyDaddy is UI-only. You cannot export leads, push to CRM, or integrate into automation pipelines. Manual copy-paste workflow only.
- **BYOK costs are unpredictable.** Each scan and reply generation costs API tokens. At 30 replies and 10 scans/day, monthly API costs can reach $20-50+. Heavy usage may exceed the cost of competing tools with flat pricing.
- **Manual control is the product.** ReplyDaddy never requests Reddit credentials or posts on your behalf. This is a safety feature — but it means every response requires you to manually copy, edit, and post on Reddit.
- **Solo developer product.** Early-stage with limited community knowledge and potential LTD abandonment risk. Factor this into long-term tool selection.
- **Relevance scoring ≠ buying intent.** The 70% relevance weighting tells you a post is topically related, not that the person is ready to buy. Manually filter for purchase-intent language.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, tool comparison across all platforms
- `/sales-subtle` — Subtle AI — Reddit lead generation for SaaS with campaign-based post discovery, AI response generation, browser extension
- `/sales-leadlee` — Leadlee — cheapest Reddit lead generation with AI replies ($12/mo), quality scoring, Chrome extension
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead generation with 7-dimension intent scoring, voice-trained Comment Builder
- `/sales-redreach` — Redreach — AI-powered Reddit lead gen with keyword auto-discovery, Google-ranking post detection, webhooks
- `/sales-replyagent` — ReplyAgent — Reddit marketing automation with managed account posting, AI comment generation
- `/sales-replierai` — ReplierAI — AI-powered Reddit monitoring and reply tool with Chrome extension, brand voice customization
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: AI responses sound generic
**User says**: "My ReplyDaddy responses all start with generic intros and read like obvious product plugs. How do I make them more natural?"
**Skill does**:
1. Reads platform-guide.md for persona and response optimization
2. Explains that response quality depends on persona configuration — background, expertise, and tone settings
3. Recommends writing a persona that mirrors a real user sharing genuine experience, not a salesperson
4. Suggests always editing AI drafts: remove generic openers, add thread-specific context, mention the product only after providing genuine value
**Result**: User has concrete steps to improve AI response quality

### Example 2: BYOK costs adding up
**User says**: "I bought the LTD for $59 but my Anthropic bill was $47 last month. Is this normal?"
**Skill does**:
1. Reads platform-guide.md pricing section about BYOK model
2. Explains that every scan, reply draft, and analysis consumes API tokens — this is expected with BYOK
3. Calculates: at ~$0.01-0.05 per reply and heavy scanning, $47/mo is within normal range for active use
4. Suggests optimizing: reduce scan frequency, narrow keywords to avoid wasted analysis, batch daily engagement into focused sessions
5. Compares total cost ($59 + $47/mo = ~$47/mo ongoing) against flat-rate alternatives like Reppit AI ($29/mo) or Subtle AI ($20/mo)
**Result**: User understands their cost structure and can make informed decision

### Example 3: No CRM integration workaround
**User says**: "I found 15 hot leads on ReplyDaddy but there's no way to export them to my CRM. What's the best workaround?"
**Skill does**:
1. Reads platform-guide.md integration patterns section
2. Confirms no API, no export, no integration exists — manual workflow required
3. Recommends a lightweight manual process: after posting a response, copy the Reddit thread URL, create a CRM contact with source = "Reddit - ReplyDaddy", add thread title and subreddit as notes
4. For tracking: include UTM parameters in product links shared on Reddit
5. Notes: if CRM integration is critical, suggests alternatives with API access (Redreach webhooks, CatchIntent CRM push, Buska API)
**Result**: User has a workable manual process and knows which alternatives offer automation

## Troubleshooting

### Discovery returning irrelevant posts
**Symptom**: ReplyDaddy surfaces posts that are topically adjacent but not relevant to your product
**Cause**: Keywords are too broad or subreddit selection includes large general-purpose subreddits
**Solution**: Use intent-rich keywords: "looking for [your category]", "[competitor] alternative", "frustrated with [competitor]". Drop subreddits with 1M+ members and focus on niche communities where your ICP actually posts. Review the relevance score threshold and only engage with high-scoring posts.

### API token costs higher than expected
**Symptom**: Monthly Anthropic/OpenAI bill exceeds $30-50 despite moderate usage (BYOK users only)
**Cause**: Each scan, analysis, and reply generation consumes tokens — scanning hot/rising/new posts across multiple keywords burns through tokens fast
**Solution**: Reduce active keywords to only your top performers. Batch engagement into one focused session per day instead of checking throughout the day. Use fewer scan categories (hot only, skip rising/new). Consider switching to subscription pricing if total cost (LTD + API) consistently exceeds $99/mo.

### Responses flagged or removed on Reddit
**Symptom**: Your manually-posted ReplyDaddy-suggested responses get removed by moderators
**Cause**: Even with compliance checking, AI-generated responses can still feel promotional or violate specific subreddit norms
**Solution**: Always check subreddit rules manually before posting. Lead with genuine value — answer the question fully before any product mention. Vary your response patterns (don't start every response the same way). Build karma in subreddits organically before engaging with marketing intent. If a subreddit has strict self-promotion rules, skip marketing responses entirely and just help.
