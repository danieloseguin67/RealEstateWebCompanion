---
name: sales-buska
description: "Buska platform help — AI social listening for lead generation across 30+ platforms (Reddit, X, LinkedIn, HN, Product Hunt, YouTube, TikTok, Facebook, Instagram, G2, Capterra, Trustpilot, Medium, Quora, GitHub, Discord, Telegram) with buying intent scoring (0-100), ICP matching, AI Reply Studio, Prospect Finder enrichment, REST API, MCP server, webhooks. Use when Buska alerts are returning too many irrelevant mentions and you need to tighten keyword or ICP filters, intent scores don't match the actual buying signals you see in conversations, AI Reply Studio drafts sound generic or get flagged in communities, keyword quota is filling up before the month ends, you want to push Buska leads to your CRM or outreach tool via API or webhooks, Prospect Finder enrichment searches aren't returning useful contact data, you need to connect Buska to Claude or other AI agents via MCP, or you're comparing Buska vs Octolens vs Brand24 vs CatchIntent for social listening lead gen. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in Buska — e.g., 'intent scores seem wrong' or 'how do I push leads to HubSpot via webhook']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, lead-generation, intent-scoring, platform]
---

# Buska Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, platforms, ICP)
   - B) Reducing noise / too many irrelevant leads
   - C) Tuning intent scoring or ICP matching
   - D) Using the Reply Studio for outreach
   - E) Connecting Buska to CRM/outreach tools via API or webhooks
   - F) Using the MCP server with AI agents
   - G) Prospect Finder enrichment
   - H) Plan limits and upgrade decision
   - I) Something else — describe it

2. **Which plan are you on?**
   - A) Starter ($49/mo — 3 keywords, 50 leads/week, 16+ sources)
   - B) Growth ($99/mo — 10 keywords, 150 leads/week, API 500 req/mo, webhooks, Reply Studio)
   - C) Scale ($249/mo — 30 keywords, unlimited leads, full API, analytics)
   - D) Agency (custom — multi-brand)
   - E) Not sure / haven't signed up yet

3. **What's your goal?**
   - A) Lead generation (find people looking for solutions like mine)
   - B) Brand monitoring (track what people say about us)
   - C) Competitor monitoring (track competitor mentions and weaknesses)
   - D) Market research (understand trends and pain points)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Developer-first monitoring with MCP on all plans → `/sales-octolens [question]`
- Intent detection across Reddit, X, HN, Bluesky with CRM push → `/sales-catchintent [question]`
- Multi-platform lead gen with auto-pilot mode → `/sales-prems [question]`
- Reddit-only monitoring on a budget → `/sales-f5bot [question]` or `/sales-kwatch [question]`
- Audience intelligence (where audiences spend attention) → `/sales-sparktoro [question]`

Otherwise, answer directly from the platform reference below.

## Step 3 — Buska platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, and workflow examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Noise reduction** — tighten ICP profiles with industry/company size/role filters, add negative keywords, raise the intent score threshold to 70+, focus on "active demand" and "pain signal" intent types
2. **Quota management** — consolidate overlapping keywords, disable low-converting keywords, use broader terms with ICP filters instead of many narrow keywords
3. **Reply quality** — switch tone presets (Peer for communities, Expert for technical threads, Thought Leader for LinkedIn), customize the AI context with your product value props, always review before posting
4. **Integration** — webhooks and API require Growth ($99/mo). For cheaper API access, consider Octolens (API on all plans from $25/mo) or RedShip ($19/mo)
5. **MCP setup** — connect as MCP server so Claude/Cursor can query leads and trigger actions autonomously

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and pricing that may change.*

- **API and webhooks are Growth-only ($99/mo).** Starter users have no programmatic access. If you need API at a lower price, Octolens (from $25/mo) or RedShip ($19/mo) both offer REST APIs on all plans.
- **50 leads/week cap on Starter.** If your keywords are broad, you'll hit this quickly. Growth bumps to 150/week, Scale is unlimited.
- **Reply Studio needs human review.** AI-generated replies can sound promotional. Always edit tone for the specific community norms — what works on LinkedIn won't work on Reddit.
- **ICP matching only works if you define it well.** Vague ICPs ("SaaS companies") return noise. Use specific industry, company size, role, and pain-point filters.
- **Prospect Finder is limited on Growth (20 searches/mo).** Scale gives 250/mo. If enrichment is your primary need, consider Clay or Apollo for higher volume.
- **No native Zapier app.** Use webhooks to trigger Zapier/Make/n8n workflows. The webhook sends a JSON POST on each qualified lead.
- **30+ platforms varies by plan.** Starter covers 16+ sources, Growth 28+, Scale 33+. Some platforms (like Telegram, Discord) may be gated to higher tiers.
- **Intent scoring is AI-based and imperfect.** Low scores (under 30) are usually noise, but mid-range (30-70) needs manual review. Don't auto-discard everything under 70.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-octolens` — Octolens — developer-first social listening with API/MCP on all plans from $25/mo
- `/sales-catchintent` — CatchIntent — AI intent detection across Reddit, X, HN, Bluesky with CRM push, MCP server, webhooks
- `/sales-prems` — Prems AI — multi-platform lead generation with AI intent scoring, auto-pilot, webhooks
- `/sales-forumscout` — ForumScout — AI social listening across forums, Reddit, X, LinkedIn with natural language AI filtering, API/MCP
- `/sales-brand24` — Brand24 — affordable social listening with Storm Alerts and MCP server
- `/sales-sparktoro` — SparkToro — audience intelligence, channel discovery, persona development
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up lead generation monitoring for a SaaS product
**User says**: "I sell a project management tool and want to find people on Reddit and LinkedIn asking for recommendations"
**Skill does**:
1. Reads platform guide for keyword strategy and ICP setup
2. Creates keywords: "project management tool", "looking for PM software", "Asana alternative", competitor names
3. Sets ICP: SaaS/tech industry, 10-500 employees, product/engineering roles
4. Configures intent filter to prioritize "active demand" and "pain signal" types
5. Sets up Slack notifications for high-intent leads (score 70+)
**Result**: Lead pipeline generating qualified prospects from social conversations

### Example 2: Push Buska leads to HubSpot CRM via webhook
**User says**: "How do I automatically create HubSpot contacts from Buska leads?"
**Skill does**:
1. Confirms Growth plan required for webhooks
2. Reads platform guide for webhook payload format
3. Sets up webhook URL pointing to a Make/n8n workflow
4. Maps Buska lead fields (name, platform, mention URL, intent score) to HubSpot contact properties
5. Adds a filter: only push leads with intent score > 60
**Result**: Automated lead pipeline from social mentions to CRM

### Example 3: AI replies getting flagged on Reddit
**User says**: "My Buska Reply Studio responses keep getting downvoted on Reddit — what am I doing wrong?"
**Skill does**:
1. Explains Reddit community norms: no overt self-promotion, lead with value
2. Suggests switching tone to "Peer" instead of "Expert" or "Thought Leader"
3. Recommends customizing the AI context to focus on solving the user's problem first, mentioning product only as a secondary note
4. Advises checking subreddit rules for self-promotion policies before posting
5. Suggests using Reply Studio drafts as starting points, not final copies
**Result**: Improved reply quality that gets engagement instead of downvotes

## Troubleshooting

### Intent scores seem inaccurate
**Symptom**: Mentions scored 80+ are clearly not buying signals, or real buying intent gets scored low
**Cause**: ICP definition is too broad, or keywords match irrelevant contexts
**Solution**: Tighten ICP profiles with specific role, industry, and company size filters. Add negative keywords for common false-positive patterns. Review the 5 intent types — ensure "active demand" mentions are being correctly classified versus general "questions."

### Not getting enough leads
**Symptom**: Set up keywords but lead count is much lower than expected
**Cause**: Keywords too narrow, ICP too restrictive, or monitoring only a subset of available platforms
**Solution**: Broaden keywords — use problem language ("how do I manage projects") not just tool names. Relax ICP filters temporarily to see what the full mention volume looks like. Check which platforms are active on your plan tier.

### Webhook not firing
**Symptom**: Webhook URL configured but your endpoint never receives POST requests
**Cause**: Growth plan required, endpoint returning non-2xx, or no new qualified leads matching filters
**Solution**: Verify you're on Growth or Scale (Starter has no webhooks). Test with webhook.site first. Lower intent score threshold temporarily to trigger a test payload. Check that the webhook is enabled in your automation settings.
