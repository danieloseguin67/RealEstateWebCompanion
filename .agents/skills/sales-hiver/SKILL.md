---
name: sales-hiver
description: "Hiver platform help — Gmail-native help desk that turns shared inboxes into a multichannel support system with AI copilot, SLA tracking, and workflow automations (Free-$49/user/mo). Use when setting up Hiver shared inboxes for a Google Workspace team, Hiver automations not triggering or emails not being assigned, Hiver is slow or lagging with high email volume, comparing Hiver to Front or Freshdesk or Help Scout for shared inbox, choosing between Hiver Free/Lite/Growth/Pro plans, or connecting Hiver to Salesforce or Slack via Zapier. Do NOT use for comparing help desk platforms broadly (use /sales-helpdesk-selection). Do NOT use for contact center or CCaaS selection (use /sales-ccaas-selection)."
argument-hint: "[describe what you need help with in Hiver]"
license: MIT
version: 1.0.0
tags: [sales, help-desk, shared-inbox, customer-service, platform]
github: "https://github.com/Hiverhq"
---

# Hiver Platform Help

Helps with Hiver — a Gmail-native help desk that adds shared inboxes, ticketing, live chat, WhatsApp, voice, and AI capabilities directly inside Gmail. Zero learning curve for Google Workspace teams.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What are you trying to do with Hiver?**
   - A) Set up Hiver shared inboxes for the first time
   - B) Fix automation, assignment, or SLA issues
   - C) Configure AI features (Copilot, AI Agents)
   - D) Connect Hiver to CRM or other tools
   - E) Compare Hiver to other help desk tools
   - F) Something else — describe it

2. **How many support agents?**
   - A) 1-5 (solo / micro team)
   - B) 6-20 (small team)
   - C) 21-50 (growing team)
   - D) 50+ (scaling)

3. **Which plan are you on (or considering)?**
   - A) Free — shared inboxes, live chat, WhatsApp, voice, knowledge base
   - B) Lite ($19/user/mo) — automations, SLAs, custom fields, customer portal
   - C) Growth ($29/user/mo) — custom reports, advanced integrations
   - D) Pro ($49/user/mo) — chatbots, CSAT, API access, advanced analytics
   - E) Elite (contact sales) — HIPAA, SSO, skill-based routing
   - F) Not sure / evaluating

**If the user's request already provides most of this context, skip directly to the relevant step.**

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Comparing help desk platforms broadly | `/sales-helpdesk-selection {question}` |
| Contact center / CCaaS selection | `/sales-ccaas-selection {question}` |
| Live chat strategy across tools | `/sales-live-chat {question}` |
| Chatbot marketing strategy | `/sales-chatbot {question}` |
| Connecting tools via Zapier/Make/API pipelines | `/sales-integration {question}` |
| Customer feedback / CSAT strategy | `/sales-customer-feedback {question}` |

For Hiver-specific questions, continue to Step 3.

## Step 3 — Hiver platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, Zapier triggers, API details, and integration recipes.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

- For **slow performance**: Reduce browser extensions, clear Gmail cache, limit open tabs with Hiver sidebar. High-volume inboxes (500+ emails/day) may need periodic browser refreshes.
- For **assignment issues**: Check automation rules for conflicts. Verify round-robin is configured with correct agent availability. Check if the conversation was already manually assigned (manual overrides auto-assignment).
- For **plan selection**: Start Free for basic shared inbox. Upgrade to Lite ($19) for automations and SLAs. Growth ($29) for analytics. Pro ($49) only if you need API access, CSAT surveys, or chatbots.
- For **AI setup**: AI features are a $20/user/mo add-on on any plan. Includes AI Compose, Summarizer, Tagging, Sentiment Analysis, and Suggested Responses.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and pricing that may be outdated.*

- **Gmail-only.** Hiver requires Google Workspace — no Outlook, Apple Mail, or standalone option. If the team isn't on Gmail, look at Front, Help Scout, or Freshdesk instead.
- **API is Pro-only ($49/user/mo).** REST API access is locked to the Pro plan. Lite and Growth users must use Zapier for integrations.
- **AI is a paid add-on ($20/user/mo).** AI Copilot, Summarizer, Tagging, and Sentiment Analysis are not included in any base plan.
- **Performance degrades at high volume.** Users report lag and slow loading when handling 500+ daily emails. Frequent browser refreshes help.
- **Features migrate to higher tiers.** Hiver has historically moved features from lower to higher-priced plans. Verify current plan inclusions before committing.
- **Conversation view forced.** Hiver requires Gmail's conversation view, which some users find painful for tracking individual messages.
- **Search limitations.** Shared inbox search can return imprecise results — use Gmail's native search operators for better filtering.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-gmelius` — Gmelius platform help (Gmail AI collaboration, Meli assistant, Kanban boards, API). Install:
  `npx skills add sales-skills/sales --skill sales-gmelius -a claude-code`
- `/sales-front` — Front platform help (AI-powered shared inbox, omnichannel, Autopilot/Copilot, REST API). Install:
  `npx skills add sales-skills/sales --skill sales-front -a claude-code`
- `/sales-missive` — Missive platform help (collaborative team inbox, internal threads, co-drafting, multi-channel). Install:
  `npx skills add sales-skills/sales --skill sales-missive -a claude-code`
- `/sales-helpdesk-selection` — Compare help desk platforms (Zendesk, Freshdesk, Intercom, Help Scout, and more). Install:
  `npx skills add sales-skills/sales --skill sales-helpdesk-selection -a claude-code`
- `/sales-zendesk` — Zendesk platform help (ticketing, Help Center, AI agents, API). Install:
  `npx skills add sales-skills/sales --skill sales-zendesk -a claude-code`
- `/sales-live-chat` — Live chat strategy across tools
- `/sales-chatbot` — Chatbot marketing and conversational automation
- `/sales-customer-feedback` — Customer feedback, NPS, CSAT, VoC
- `/sales-integration` — Connect help desk to CRM and other tools
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Setting up shared inbox for a support team
**User says**: "We're a 10-person SaaS team on Google Workspace. We want to set up support@company.com as a shared inbox with assignment and SLAs."
**Skill does**:
1. Reads platform guide for setup steps
2. Recommends Lite plan ($19/user/mo) since they need SLAs and automations (not available on Free)
3. Walks through: create shared mailbox → invite agents → set up round-robin assignment → configure SLA rules
4. Notes that collision detection prevents two agents from replying to the same ticket
5. Suggests enabling the customer portal for self-service
**Result**: Step-by-step shared inbox setup with plan recommendation

### Example 2: Connecting Hiver to Salesforce via Zapier
**User says**: "How do I sync Hiver conversations to Salesforce automatically?"
**Skill does**:
1. Reads platform guide for Zapier triggers and integration patterns
2. Explains Hiver has 10 Zapier triggers (new inbound conversation, conversation updated, CSAT rating, etc.)
3. Provides recipe: "New Inbound Conversation" trigger → Zapier → create Salesforce Case with subject, assignee, and tags
4. Notes that direct API integration requires Pro plan ($49/user/mo) and provides a cURL example for listing conversations
5. Warns that Hiver doesn't have a Make integration — Zapier is the primary iPaaS option
**Result**: Working Zapier recipe with API alternative for Pro users

### Example 3: Hiver performance issues with high volume
**User says**: "Hiver keeps freezing when we're processing our morning email queue. We get about 400 emails before 10am."
**Skill does**:
1. Acknowledges this is a known issue — Hiver can lag with high-volume inboxes
2. Recommends: reduce Chrome extensions, dedicate a browser profile to Hiver, close other Gmail tabs
3. Suggests enabling auto-assignment to distribute load across agents automatically
4. Notes that periodic browser refreshes (every 1-2 hours during peak) help
5. If the problem persists, recommends evaluating Front or Freshdesk for higher-volume needs
**Result**: Practical performance fixes with escalation path

## Troubleshooting

### Hiver is slow or laggy during peak hours
**Symptom**: Sidebar takes seconds to load, email assignments are delayed, browser becomes unresponsive with Hiver active
**Cause**: Hiver runs as a Gmail extension — performance depends on browser resources. High email volume (300+ emails/day) strains the sidebar.
**Solution**: 1) Reduce other Chrome extensions. 2) Use a dedicated Chrome profile for support work. 3) Clear browser cache weekly. 4) Refresh the browser tab every 1-2 hours during peak. 5) If using Free plan, upgrade to Lite for workflow automations that reduce manual processing.

### Emails not appearing after assignment
**Symptom**: An agent is assigned a conversation but can't see it in their view, or assigned emails disappear from the shared inbox
**Cause**: Gmail filters or labels may be interfering with Hiver's assignment. The conversation might be in a different status (closed, pending) than the agent's current view filter.
**Solution**: 1) Check the agent's view filters — ensure they're showing "Open" status conversations. 2) Verify no Gmail filters are moving emails before Hiver processes them. 3) Check if collision detection moved the conversation. 4) Try refreshing the browser — Hiver sync can lag 10-30 seconds.

### Automation rules not triggering
**Symptom**: Workflow automations (auto-assignment, auto-tagging, status changes) don't fire on new conversations
**Cause**: Automations require Lite plan ($19/user/mo) minimum. Automation conditions may be too narrow (all conditions must match). Round-robin requires agents to be set as "available."
**Solution**: 1) Verify you're on Lite plan or above. 2) Check automation conditions — test with a broader condition first, then narrow. 3) For round-robin, check agent availability status. 4) Check if the conversation was created before the automation was enabled (automations don't apply retroactively).
