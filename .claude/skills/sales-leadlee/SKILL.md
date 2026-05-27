---
name: sales-leadlee
description: "Leadlee platform help — Reddit lead generation with AI lead detection, quality scoring, AI reply generation, automated reply posting (beta), Chrome extension. Use when Leadlee isn't finding relevant Reddit leads for your product, lead quality scores don't match what you'd consider a real prospect, AI-generated replies sound generic and need rewriting before posting, auto-reply beta is getting your Reddit account flagged, you want to track multiple products but hit the product slot limit, or you're comparing Leadlee vs KeyMentions vs Bazzly vs RedShip for Reddit lead generation. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Leadlee]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, lead-generation, platform]
---
# Leadlee Platform Help

Helps the user with Leadlee platform questions — from lead discovery setup and AI reply tuning through product tracking, analytics, and Chrome extension usage.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Leadlee do you need help with?**
   - A) Lead discovery — finding relevant Reddit leads, tuning keywords
   - B) AI replies — improving reply quality, customizing tone
   - C) Auto-reply (beta) — setup, safety, ban prevention
   - D) Product tracking — adding products, managing multiple slots
   - E) Analytics — understanding lead metrics, quality scores
   - F) Chrome extension — setup, troubleshooting
   - G) Account/billing — plan features, upgrading
   - H) Something else — describe it

2. **What plan are you on?**
   - A) Free (15 leads, 1 product)
   - B) Pro $12/mo (unlimited leads, 3 products)
   - C) Pro Plus $29/mo (10 products)

3. **What are you trying to accomplish?** (describe your specific goal)

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit monitoring strategy across tools → `/sales-social-listening [question]`
- Prospect list building → `/sales-prospect-list`
- Outbound cadence or sequence strategy → `/sales-cadence`

Otherwise, answer directly from platform knowledge using the reference below.

## Step 3 — Leadlee platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, workflow recipes, and integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Lead discovery** — optimize product description, refine what Leadlee monitors, improve lead relevance
2. **Reply quality** — customize AI reply tone, add context about your product, review before posting
3. **Safety** — avoid auto-reply abuse, protect Reddit account, stay within Reddit TOS
4. **Analytics** — interpret quality scores, track conversion, identify best-performing subreddits
5. **Plan optimization** — decide when to upgrade from Free to Pro or Pro Plus

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and Reddit safety that may be outdated.*

- **Auto-reply (beta) is the #1 ban risk.** Leadlee's automated reply posting is still in beta. Reddit communities are highly sensitive to bot-like responses and will report/downvote generic replies. Always review AI drafts before posting. Disabling auto-reply and using manual posting is significantly safer.
- **Free tier is a trial, not a plan.** 15 total leads lifetime (not per month) with 1 product slot and limited AI replies. It's enough to evaluate lead quality but not to run ongoing lead gen. Expect to upgrade to Pro ($12/mo) quickly.
- **No competitor monitoring.** Unlike tools such as RedShip or Threadlytics, Leadlee doesn't track competitor mentions or show share of voice. It's purely inbound lead discovery.
- **No API, no webhooks, no Zapier.** Entirely UI + Chrome extension. You cannot export leads programmatically or integrate Leadlee into an automation pipeline. Manual CSV export or copy-paste only.
- **Quality scores are opaque.** Leadlee assigns quality scores to leads but doesn't explain the scoring methodology. Calibrate by reviewing the first 20-30 leads and noting which score ranges produce genuine prospects for your product.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-social-listening` — Social listening strategy — brand monitoring, sentiment analysis, competitive intelligence, tool comparison across all platforms
- `/sales-keymentions` — KeyMentions — Reddit keyword monitoring with AI comment generation and auto-publish
- `/sales-bazzly` — Bazzly — Reddit lead generation with intent scoring, Chrome extension, Reply Boost
- `/sales-redship` — RedShip — Reddit monitoring with relevance scoring, SEO post discovery, API + webhooks
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead generation with 7-dimension intent scoring, voice-trained Comment Builder
- `/sales-threadradar` — ThreadRadar — Reddit + Quora monitoring with AI-drafted replies
- `/sales-redditmentions` — RedditMentions — cheapest Reddit keyword monitoring (email + Slack alerts)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Leads aren't relevant
**User says**: "Leadlee keeps finding Reddit threads that mention my keywords but the people aren't actually looking for a solution like mine"
**Skill does**:
1. Reviews how the user configured their product description in Leadlee
2. Suggests refining the product URL and description to be more specific about the problem they solve
3. Recommends checking quality scores — leads below a certain threshold can be ignored
4. Advises monitoring which subreddits produce the best leads and focusing there
**Result**: User has a strategy for improving lead relevance

### Example 2: Auto-reply safety
**User says**: "I turned on auto-reply and got a warning from a subreddit mod. How do I use Leadlee without getting banned?"
**Skill does**:
1. Explains that auto-reply (beta) is the highest-risk feature — most Reddit communities detect and penalize automated responses
2. Recommends disabling auto-reply and switching to manual review workflow
3. Suggests using AI drafts as starting points, then personalizing each reply with specific context from the thread
4. Notes Reddit's rules on self-promotion (10:1 ratio of genuine participation to promotional content)
**Result**: User switches to safer manual posting with AI-assisted drafts

### Example 3: Choosing the right plan
**User says**: "I'm on the free plan and ran out of leads. Is Pro worth it or should I look at other tools?"
**Skill does**:
1. Explains Free tier's 15-lead lifetime cap — confirms it's designed as a trial
2. Compares Pro ($12/mo, unlimited leads, 3 products) vs Pro Plus ($29/mo, 10 products)
3. Notes Leadlee's strength: cheapest Reddit lead gen with AI replies ($12/mo vs $19-49/mo for alternatives)
4. Suggests trying Pro for one month — if lead quality is good, stay; if not, compare alternatives via `/sales-social-listening`
**Result**: User makes an informed upgrade decision

## Troubleshooting

### AI replies sound generic
**Symptom**: AI-generated replies are vague, don't mention your product naturally, or get downvoted
**Cause**: Leadlee's AI context about your product is too generic — it doesn't have enough detail about what makes your product relevant to specific problems
**Solution**: Update your product description in Leadlee settings with specific use cases, pain points your product solves, and key differentiators. Always edit AI drafts before posting — add a sentence that directly addresses the thread's specific question. Never post AI drafts verbatim.

### Leads stop appearing
**Symptom**: Dashboard shows no new leads for days despite active subreddits
**Cause**: Free plan hit the 15-lead lifetime cap, or the product description is too narrow for Leadlee's AI to find matches
**Solution**: Check your plan status — Free users hit a hard cap at 15 leads total. If on Pro, broaden your product description slightly or verify that your target subreddits have active discussion. Try adding a second product slot with different keywords targeting the same audience from a different angle.

### Reddit account getting flagged
**Symptom**: Comments removed by mods, shadowban warnings, or DM restrictions
**Cause**: Auto-reply posting too frequently, replies too promotional, or posting in subreddits with strict self-promotion rules
**Solution**: Disable auto-reply immediately. Switch to manual posting. Follow Reddit's self-promotion guidelines (genuinely helpful content, not just product plugs). Space out your replies — no more than 2-3 per day across different subreddits. Build karma in communities through genuine participation before mentioning your product.
