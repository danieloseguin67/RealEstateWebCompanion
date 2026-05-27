---
name: sales-forumscout
description: "ForumScout platform help — AI social listening across 10M+ forums, Reddit, X, LinkedIn, YouTube, Instagram, Bluesky, HN, Facebook with natural language AI filtering, sentiment analysis, competitive intelligence, share of voice, auto-replies, and API/MCP via apidirect.io. Use when ForumScout mentions are full of irrelevant noise and you need to tune AI filters, keyword scouts aren't catching conversations you know exist, auto-replies sound generic or are getting flagged, scan frequency feels too slow and you need faster mention detection, you want to connect ForumScout to your CRM or dashboard via webhooks or API, sentiment analysis results don't match what you see in conversations, you need to set up competitive intelligence and share of voice tracking, or you're confused about the difference between ForumScout and API Direct pricing. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe your ForumScout question — e.g., 'how do I reduce noise in my mentions' or 'set up competitive monitoring']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, platform]
---

# ForumScout Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up scouts and keywords
   - B) Reducing noise / tuning AI filters
   - C) Sentiment or emotion analysis
   - D) Competitive intelligence / share of voice
   - E) Auto-replies configuration
   - F) API or webhook integration (apidirect.io)
   - G) Pricing or plan selection
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Free trial (7-day Pro)
   - B) Starter ($19/mo)
   - C) Pro ($49/mo)
   - D) Ultra ($129/mo)
   - E) Not signed up yet

**If the user's request already provides most of this context, skip directly to Step 2.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a broader strategy skill, route:
- Choosing between social listening tools → `/sales-social-listening which social listening tool should I use`
- Social media management or publishing → `/sales-social-media-management`
- Influencer discovery → `/sales-influencer-marketing`
- SEO keyword research → `/sales-seo`
- Sales intent signals → `/sales-intent`

Otherwise, answer directly from the platform reference below.

## Step 3 — ForumScout platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

1. **Scout setup** — design keyword strategy, configure AI filters with natural language rules
2. **Noise reduction** — write specific AI filter descriptions, add negative keywords
3. **Competitive monitoring** — set up competitor scouts, configure share of voice dashboards
4. **Integration** — choose between webhooks (included on all plans) and API Direct for programmatic access
5. **Plan optimization** — match features to plan tiers (sentiment on Pro+, emotion on Ultra)

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **API is a separate product.** ForumScout's API lives at apidirect.io with separate pay-per-request pricing. Your ForumScout subscription doesn't include API access — you need a separate API Direct API key. The API covers social search only (forums, Reddit, X, LinkedIn, Instagram, YouTube, TikTok) — it does NOT expose your ForumScout scouts, mention history, or sentiment data.
- **Sentiment analysis requires Pro ($49/mo).** Starter plan has AI filtering and webhooks but no sentiment analysis, competitive intelligence, or share of voice. These are the features most users expect from a social listening tool.
- **Auto-replies are plan-gated and limited.** Pro gets 100/month, Ultra gets 1,500. Auto-replies post to the original platform — monitor quality carefully to avoid account flags.
- **Scan frequency varies by plan.** Starter scans every 6 hours, Pro every 3 hours, Ultra every hour. None are real-time. If you need faster alerts, webhooks fire when new matches are found during scans.
- **Historical data is limited.** Starter: 3 months, Pro: 6 months, Ultra: 12 months. No way to access older data.
- **MCP server is via API Direct.** The MCP endpoint at `apidirect.io/mcp?token=YOUR_API_KEY` connects to the API Direct search API, not your ForumScout dashboard data.

## Related skills

- `/sales-social-listening` — Social listening strategy — choosing tools, monitoring setup, competitive intelligence, crisis detection
- `/sales-octolens` — Developer-first social listening with MCP server, API, and webhooks on all plans
- `/sales-syften` — AI-filtered keyword monitoring across 15+ community platforms with sub-minute Reddit alerts
- `/sales-brand24` — Brand24 platform help — social listening, sentiment, Storm Alerts, MCP server
- `/sales-catchintent` — AI intent detection across Reddit, X, HN, Bluesky with CRM integrations and MCP
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Reduce mention noise
**User says**: "My ForumScout scouts are returning hundreds of irrelevant mentions about my brand name which is a common word"
**Skill does**:
1. Reads the platform guide for AI filter configuration
2. Suggests writing specific AI filter rules in natural language (e.g., "only show mentions discussing software pricing or product complaints, not the common word")
3. Recommends adding context keywords and negative keyword exclusions
4. Notes that AI filtering is available on all plans
**Result**: Focused, relevant mentions with dramatically reduced noise

### Example 2: Set up webhook integration
**User says**: "I want to push ForumScout mentions to my CRM automatically"
**Skill does**:
1. Reads the platform guide for webhook and API Direct integration patterns
2. Explains that webhooks are included on all plans and fire on each scan cycle
3. Shows how to configure a webhook endpoint and connect via Zapier/Make
4. Notes the difference between ForumScout webhooks (mention alerts) and API Direct (search queries)
**Result**: Mention data flowing into CRM via webhook → Zapier → CRM pipeline

### Example 3: Compare ForumScout pricing tiers
**User says**: "Is it worth upgrading from Starter to Pro?"
**Skill does**:
1. Reads the platform guide for pricing and plan-gated features
2. Explains Pro adds: competitive intelligence, sentiment analysis, share of voice, audience insights, 3-hour scan frequency, 100 auto-replies/month
3. Notes that Starter only includes AI filtering, webhooks, and Google Sheets — no analytics
4. Recommends Pro if the user needs any analytics or competitive intelligence features
**Result**: Clear feature comparison guiding upgrade decision

## Troubleshooting

### AI filters aren't reducing noise enough
**Symptom**: Despite setting up AI filters, mentions still include irrelevant results
**Cause**: AI filter descriptions are too vague or too broad
**Solution**: Write specific, detailed natural language rules. Instead of "show relevant mentions", write "only show mentions where someone is asking for a recommendation, complaining about a competitor, or discussing pricing for project management software — exclude job postings, academic papers, and news aggregator reposts." Test with a small keyword set first, then expand.

### Scan frequency feels too slow
**Symptom**: Mentions appear hours after they were posted
**Cause**: Plan-based scan intervals (Starter 6hr, Pro 3hr, Ultra 1hr)
**Solution**: Upgrade plan for faster scans. Even Ultra scans hourly, not real-time. If you need near-real-time alerts, consider pairing ForumScout with a tool like Syften (sub-minute Reddit alerts) or Octolens (hourly-to-real-time across developer platforms). ForumScout's strength is breadth across 10M+ sources, not speed.

### Confused about ForumScout vs API Direct
**Symptom**: Signed up for ForumScout but can't find the API, or API Direct results don't match ForumScout dashboard
**Cause**: ForumScout (social listening SaaS) and API Direct (social search API) are separate products by the same developer
**Solution**: ForumScout = dashboard + scouts + AI filters + analytics. API Direct = raw search API for developers, pay-per-request, separate API key. Your ForumScout subscription doesn't include API Direct access. If you need programmatic access to social data, sign up at apidirect.io separately. If you just need to push ForumScout mentions to another tool, use ForumScout's built-in webhooks (available on all plans).
