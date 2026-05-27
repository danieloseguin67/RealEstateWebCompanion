---
name: sales-front
description: "Front platform help — AI-powered customer operations platform with shared inbox, omnichannel support (email, SMS, chat, social, WhatsApp), Autopilot AI resolution, Copilot agent assistant, Smart QA/CSAT, ticketing, knowledge base, 160+ integrations, full REST API with webhooks ($25-105/seat/mo). Use when setting up Front for a support team, shared inbox assignments not routing correctly, Autopilot AI resolving wrong tickets, comparing Front to Missive or Hiver or Zendesk for team email, Front API returning 400 on conversation search, connecting Front to Salesforce or HubSpot via API, analytics reports showing zero values, wondering if Front is worth the price vs cheaper alternatives, or configuring Front webhooks for real-time event processing. Do NOT use for help desk platform comparison across tools (use /sales-helpdesk-selection). Do NOT use for CCaaS/contact center selection (use /sales-ccaas-selection)."
argument-hint: "[describe what you need help with in Front]"
license: MIT
version: 1.0.0
tags: [sales, customer-service, help-desk, shared-inbox, platform]
github: "https://github.com/frontapp"
---

# Front Platform Help

Helps with everything related to using Front — an AI-powered customer operations platform combining shared inbox, omnichannel support, AI automation (Autopilot, Copilot), ticketing, knowledge base, and a full REST API with webhooks. Used by 9,000+ companies for support, operations, and account management.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated knowledge.

Ask the user:

1. **What are you trying to do with Front?**
   - A) Set up Front for the first time
   - B) Configure shared inbox routing and assignments
   - C) Set up AI features (Autopilot, Copilot, Smart QA)
   - D) Build an API integration or webhook listener
   - E) Connect Front to CRM (Salesforce, HubSpot)
   - F) Compare Front to alternatives
   - G) Troubleshoot performance or data issues
   - H) Something else — describe it

2. **Which plan are you on (or considering)?**
   - A) Starter ($25/seat/mo) — up to 10 seats, single channel, basic analytics
   - B) Professional ($65/seat/mo) — up to 50 seats, omnichannel, SSO/SCIM
   - C) Enterprise ($105/seat/mo) — unlimited seats, Copilot/QA/CSAT included
   - D) Not sure yet / free trial

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to another skill, route:
- Comparing help desk platforms → "Run: `/sales-helpdesk-selection {user's original question}`"
- CCaaS / contact center evaluation → "Run: `/sales-ccaas-selection {user's original question}`"
- CRM integration strategy → "Run: `/sales-integration {user's original question}`"
- Live chat strategy → "Run: `/sales-live-chat {user's original question}`"
- Chatbot strategy → "Run: `/sales-chatbot {user's original question}`"

Otherwise, answer directly from the platform reference below.

## Step 3 — Front platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, plan gates, API details, data model, integration recipes, and code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

**For shared inbox routing:**
1. Use Rules to auto-assign based on sender domain, subject keywords, or channel
2. Round-robin assignment distributes evenly across team members
3. Starter plan allows only 10 automation rules — Professional allows 20, Enterprise unlimited
4. Tag conversations for reporting and routing — tags are API-accessible

**For AI feature setup:**
1. Copilot ($20/seat add-on, included in Enterprise) assists agents with draft suggestions
2. Smart QA ($20/seat add-on) auto-scores 100% of conversations
3. Smart CSAT ($10/seat add-on) predicts satisfaction without survey fatigue
4. Autopilot resolves routine requests end-to-end — monitor resolution quality weekly

**For API integrations:**
1. Start with an API token for testing, switch to OAuth for production
2. Rate limits are per-company: 50 rpm (Starter), 100 rpm (Professional), 200 rpm (Enterprise)
3. Use cursor-based pagination with `page_token` — max 100 results per page
4. Webhooks support application-level and rule-level events — use application webhooks for production

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and pricing that may change.*

- **Starter plan is very limited.** Only 10 seats, 1 channel type, 10 automation rules, basic analytics. Most teams need Professional ($65/seat) for omnichannel and SSO.
- **AI add-ons are expensive.** Copilot ($20/seat) + Smart QA ($20/seat) + Smart CSAT ($10/seat) = $50/seat on top of base price. Enterprise ($105/seat) includes all three — do the math.
- **Rate limits are low on Starter.** 50 rpm per company (not per token). Heavy API integrations need Professional (100 rpm) or Enterprise (200 rpm).
- **No built-in phone/voice.** Front handles email, chat, SMS, social — but no native telephony. Integrate with Aircall, Dialpad, or similar for voice.
- **Conversation search API is fragile.** Users report 400 errors with "Unsupported search modifier" — stick to documented query parameters and test thoroughly.
- **Analytics can show zero values.** Reports may return 0 for `num_messages_sent` even when messages exist — known intermittent issue.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-helpdesk-selection` — Compare help desk platforms (Zendesk, Freshdesk, Intercom, Help Scout, Hiver, Missive, Front, etc.). Install:
  `npx skills add sales-skills/sales --skill sales-helpdesk-selection -a claude-code`
- `/sales-missive` — Missive collaborative team inbox (internal threads, co-drafting, API). Install:
  `npx skills add sales-skills/sales --skill sales-missive -a claude-code`
- `/sales-hiver` — Hiver Gmail-native shared inbox (AI copilot, SLAs). Install:
  `npx skills add sales-skills/sales --skill sales-hiver -a claude-code`
- `/sales-gmelius` — Gmelius Gmail AI collaboration (Meli assistant, Kanban boards). Install:
  `npx skills add sales-skills/sales --skill sales-gmelius -a claude-code`
- `/sales-zendesk` — Zendesk platform help (ticketing, Help Center, AI agents, API)
- `/sales-integration` — Connect help desk to CRM and other tools
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Connect Front to HubSpot via API
**User says**: "How do I sync Front conversations to HubSpot so our sales team can see support history on contact records?"
**Skill does**:
1. Reads platform guide for API and integration details
2. Explains two approaches: native HubSpot integration (Professional+) or custom API sync
3. For API approach: use webhooks to listen for conversation events, then POST to HubSpot API
4. Provides webhook setup steps and example payload
5. Notes rate limit considerations (100 rpm on Professional)
**Result**: Clear integration architecture with code pointers

### Example 2: Reduce Front costs for a growing team
**User says**: "We're paying $85/seat for 30 agents on Front Professional and it's getting expensive. Are there cheaper options?"
**Skill does**:
1. Calculates current cost: 30 x $85 = $2,550/mo (monthly) or 30 x $65 = $1,950/mo (annual)
2. Notes switching to annual billing saves $600/mo
3. Compares alternatives: Missive ($36/seat = $1,080/mo), Hiver ($49/seat = $1,470/mo), Freshdesk ($49/agent = $1,470/mo)
4. Routes to `/sales-helpdesk-selection` for full comparison
**Result**: Cost analysis with migration options

### Example 3: Front API search returning errors
**User says**: "I'm getting 400 Bad Request when calling the conversations search endpoint. My query worked last week."
**Skill does**:
1. Identifies this as a known issue — the search API is strict about query modifiers
2. Explains documented query format and common pitfalls
3. Suggests testing with minimal query parameters first, then adding filters
4. Notes the search endpoint has a reduced rate limit (40% of global limit)
5. Recommends checking Front status page and community for active incidents
**Result**: Specific debugging steps for the search API

## Troubleshooting

### Conversation search API returning 400 errors
**Symptom**: `GET /conversations/search/:query` returns "Unsupported search modifier provided"
**Cause**: The search endpoint is strict about query syntax. Unsupported or malformed modifiers trigger 400 errors. API changes can break previously working queries.
**Solution**: Use only documented search modifiers. Test with a minimal query first (`?q=test`), then add modifiers one at a time. Check the API changelog at dev.frontapp.com for breaking changes. The search endpoint also has a reduced rate limit (40% of your plan's global limit) — hitting this returns 429, not 400.

### Analytics reports showing zero values
**Symptom**: `num_messages_sent` and `num_messages_received` return 0 in analytics exports despite visible messages
**Cause**: Known intermittent issue — analytics aggregation can lag or fail for certain time ranges.
**Solution**: Try a different time range. Export via the UI to compare against API results. If the issue persists, contact Front support with specific conversation IDs and time ranges. For real-time message counts, query the Core API directly (`GET /conversations/:id/messages`) instead of analytics endpoints.

### Auto-assignment routing emails to wrong team member
**Symptom**: Emails getting assigned to a specific person without any rules configured
**Cause**: Front may auto-assign based on previous conversation history or contact ownership. If a contact previously interacted with a specific agent, Front may route new conversations to them.
**Solution**: Check Rules for any assignment rules you may have forgotten. Review contact ownership settings. If using round-robin, verify the assignment rule scope covers the right inboxes. Create an explicit assignment rule to override default behavior.
