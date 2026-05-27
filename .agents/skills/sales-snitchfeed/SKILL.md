---
name: sales-snitchfeed
description: "SnitchFeed platform help — intent-based social listening for startups and SMBs across Reddit, X, LinkedIn, and Bluesky with AI relevance scoring, sentiment analysis, automated intent tagging (Buy Intent, Competitor Mention, Customer Testimonial), and real-time Slack/Discord/webhook alerts. Use when SnitchFeed mentions are full of irrelevant noise and you need to tune keyword-level relevance filtering, AI intent tags are miscategorizing leads and you need to adjust keyword context, webhook notifications aren't firing to your CRM on the Pro plan, you want to push SnitchFeed mentions to HubSpot or Instantly via webhooks, CSV exports are missing fields you need for enrichment workflows, or you're comparing SnitchFeed vs Octolens vs Syften vs CatchIntent for multi-platform social listening under $100/mo. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in SnitchFeed]"
license: MIT
version: 1.0.0
tags: [sales, social-listening, lead-generation, platform]
---

# SnitchFeed Platform Help

Helps the user with SnitchFeed platform questions — from keyword setup and relevance tuning through AI intent tagging, webhook integration, and alert configuration.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of SnitchFeed do you need help with?**
   - A) Keyword setup — listeners, keyword-level relevance context, exclusions
   - B) AI filtering — relevance scoring, intent tagging, sentiment accuracy
   - C) Alerts — Slack, Discord, email, webhook configuration
   - D) Integrations — HubSpot, Instantly, Google Sheets, Clay, Apollo
   - E) Billing — Starter vs Pro vs Custom differences
   - F) Something else — describe it

2. **What's your goal?** (describe your specific question or problem)

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a specialized skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Reddit-specific monitoring (depth over breadth) → `/sales-threadlytics [question]` or `/sales-syften [question]`
- Buyer intent signals and prioritization → `/sales-intent [question]`
- Contact enrichment via Apollo or Clay → `/sales-enrich [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — SnitchFeed platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration patterns, and webhook setup.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Keyword strategy** — use natural language intent descriptions per keyword; SnitchFeed reads posts in full context, so describe what you're looking for (e.g., "people looking for a CRM alternative")
2. **Relevance tuning** — upvote/downvote mentions to train the AI filter per keyword; specificity reduces noise
3. **Platform prioritization** — Reddit and X are the strongest channels; LinkedIn and Bluesky are supplementary
4. **Alert routing** — use Slack or Discord for real-time team notifications; use webhooks for CRM/pipeline automation
5. **Enrichment workflow** — export CSV or use webhooks → Clay/Apollo for contact enrichment → HubSpot/Instantly for outreach

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **Webhooks and AI tagging are Pro-only ($99/mo).** Starter ($45/mo) gets email, Slack, and Discord alerts but no webhook automation and no automated intent tags. Budget for Pro if CRM integration matters.
- **No public REST API.** SnitchFeed has outbound webhooks but no inbound API — you can't query mentions programmatically. Export via CSV or webhook push only.
- **Keyword-level relevance context is the key differentiator.** Each keyword gets its own AI filtering context — describe what you're looking for in plain English per keyword, not just the keyword itself. Generic keywords without context produce noisy results.
- **Mention caps are hard limits.** Starter caps at 3,000 mentions/mo, Pro at 20,000. Broad keywords on high-volume platforms can burn through caps quickly.
- **LinkedIn monitoring is not yet available.** Despite being listed on the homepage, LinkedIn and some platforms may still be rolling out. Verify current platform coverage in your dashboard.
- **Pricing discrepancy across pages.** Blog posts reference $24-36/mo while the pricing page shows $45/mo Starter. The pricing page is authoritative — blog posts may reflect old or promotional rates.

## Related skills

- `/sales-social-listening` — Social listening strategy — monitoring setup, tool comparison, sentiment analysis, competitive intelligence, crisis detection
- `/sales-octolens` — Octolens — developer-first social listening with MCP server, REST API, webhooks on all plans
- `/sales-syften` — Syften — AI-filtered keyword monitoring across 15+ platforms, sub-minute alerts, REST API, webhooks
- `/sales-catchintent` — CatchIntent — AI intent detection across Reddit, X, HN, Bluesky with CRM integrations, MCP server, webhooks
- `/sales-kwatch` — KWatch.io — budget multi-platform monitoring including LinkedIn, AI sentiment, webhooks
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up monitoring for a B2B SaaS product
**User says**: "I sell a project management tool and want to find people on Reddit and Twitter looking for alternatives to Asana"
**Skill does**:
1. Creates listeners with keywords: "alternative to Asana", "looking for PM tool", "Asana frustrating"
2. Adds keyword-level relevance context: "People looking to switch project management tools for small teams"
3. Configures Slack alerts for real-time team notifications
4. Recommends starting with 3-5 high-intent keywords and expanding after reviewing AI scoring accuracy
**Result**: Multi-platform monitoring with intent-focused keywords and Slack alerts

### Example 2: Push SnitchFeed leads to CRM via webhooks
**User says**: "How do I get SnitchFeed mentions into HubSpot automatically?"
**Skill does**:
1. Confirms user is on Pro plan (webhooks are Pro-only at $99/mo)
2. Walks through webhook setup: configure endpoint URL in SnitchFeed dashboard
3. Suggests using Zapier or Make as middleware between webhook and HubSpot
4. Notes native HubSpot integration is also available — check if it covers the user's use case
**Result**: Automated pipeline from SnitchFeed mentions to HubSpot contacts

### Example 3: Reduce noise in mention feed
**User says**: "Most of the mentions SnitchFeed shows me aren't relevant to my product"
**Skill does**:
1. Reviews current keyword-level relevance context for specificity
2. Recommends rewriting context in plain English describing the ideal mention
3. Uses upvote/downvote feedback on mentions to train the AI filter
4. Suggests narrowing to specific subreddits or platform filters if available
**Result**: Refined keyword context producing higher-relevance mentions

## Troubleshooting

### Mentions are mostly irrelevant noise
**Symptom**: High volume of mentions but most don't match your product or audience
**Cause**: Keyword-level relevance context is too generic or missing
**Solution**: For each keyword, add a descriptive context explaining what you're looking for in plain English. Instead of just "CRM", add context like "People asking for recommendations for a lightweight CRM for small B2B teams." Upvote relevant mentions and downvote irrelevant ones to train the AI. Remove overly broad single-word keywords.

### Webhook notifications not arriving
**Symptom**: Configured a webhook endpoint but no payloads are being received
**Cause**: Webhook is Pro-only ($99/mo), endpoint URL may be incorrect, or endpoint isn't returning 200 OK
**Solution**: Verify you're on the Pro plan. Check the webhook URL is correct and publicly accessible. Ensure your endpoint returns HTTP 200 within a reasonable timeout. Test with a webhook debugging service (e.g., webhook.site) first. Check if SnitchFeed has a webhook log or test button in the dashboard.

### AI intent tags seem wrong
**Symptom**: Mentions tagged as "Buy Intent" are actually casual discussions, or real buying signals are tagged as "Industry Insights"
**Cause**: AI tagging works best with specific keywords and clear relevance context
**Solution**: Review your keyword context — vague descriptions lead to poor tagging. Upvote/downvote mentions to provide feedback. Focus on the mentions with highest relevance scores first. Note that AI tagging requires Pro plan — Starter only gets basic relevance filtering without intent categories.
