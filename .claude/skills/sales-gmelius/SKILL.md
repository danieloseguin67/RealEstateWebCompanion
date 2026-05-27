---
name: sales-gmelius
description: "Gmelius platform help — Gmail-native AI email collaboration with Meli AI assistant, shared inboxes, Kanban boards, automation rules, sequences, and team analytics ($19-$40/user/mo). Use when Gmelius is slow or lagging in Gmail with high email volume, shared inbox emails are not being assigned or automations are not triggering, comparing Gmelius to Hiver or Front for Gmail team collaboration, setting up Meli AI assistant for email drafting and sorting, building integrations with the Gmelius REST API or Zapier, or choosing between Meli/Growth/Pro plans. Do NOT use for comparing help desk platforms broadly (use /sales-helpdesk-selection). Do NOT use for non-Gmail shared inbox needs (use /sales-helpdesk-selection)."
argument-hint: "[describe what you need help with in Gmelius]"
license: MIT
version: 1.0.0
tags: [sales, shared-inbox, email-collaboration, ai-assistant, platform]
github: "https://github.com/gmelius"
---

# Gmelius Platform Help

Helps with Gmelius — a Gmail-native platform where Meli AI and your team collaborate in real time to manage, prioritize, and reply to emails. Swiss-based, privacy-by-design.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What are you trying to do with Gmelius?**
   - A) Set up shared inboxes for team email (support@, billing@)
   - B) Configure Meli AI assistant for email drafting/sorting
   - C) Build automation rules for routing and assignment
   - D) Use Kanban boards for email project management
   - E) Connect Gmelius to CRM or other tools via API/Zapier
   - F) Fix performance or sync issues
   - G) Compare Gmelius to Hiver or Front
   - H) Something else — describe it

2. **Which plan are you on (or considering)?**
   - A) Meli ($19/user/mo) — AI assistant, 5K conversations/mo, max 5 users
   - B) Growth ($25/user/mo) — shared inboxes, automations, API, max 50 users
   - C) Pro ($40/user/mo) — CRM integrations, webhooks, 100K conversations/mo
   - D) Enterprise (custom) — unlimited, bespoke AI
   - E) Free trial / not sure

3. **Team size?**
   - A) Solo / 1-3 people
   - B) 4-15 people
   - C) 16-50 people
   - D) 50+

**If the user's request already provides most of this context, skip directly to the relevant step.**

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Comparing help desk platforms broadly | `/sales-helpdesk-selection {question}` |
| Non-Gmail shared inbox (Outlook, standalone) | `/sales-helpdesk-selection {question}` |
| Connecting tools via Zapier/Make/API pipelines | `/sales-integration {question}` |
| Outbound email sequences strategy | `/sales-cadence {question}` |
| Customer feedback / CSAT strategy | `/sales-customer-feedback {question}` |

For Gmelius-specific questions, continue to Step 3.

## Step 3 — Gmelius platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API endpoints, integration recipes, and code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

- For **slow performance**: Reduce Chrome extensions, use a dedicated Chrome profile, refresh browser every 1-2 hours during peak. High-volume inboxes (500+ emails/day) are a known pain point.
- For **plan selection**: Meli ($19) for solo AI assistant. Growth ($25) for team shared inboxes and automations. Pro ($40) only if you need CRM integrations, webhooks, or 100K+ conversations.
- For **automation setup**: Start with simple rules (one condition → one action), then layer complexity. Test with broad conditions first, then narrow. All conditions must match for a rule to fire.
- For **API integration**: Growth plan minimum. OAuth 2.0 + PKCE auth. Start with board/conversation endpoints — lowest complexity.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and pricing that may be outdated.*

- **Gmail-only.** No Outlook support (waitlisted). If any team member uses Outlook, Gmelius won't work — look at Front, Help Scout, or Freshdesk.
- **API requires Growth+ ($25/user/mo).** Meli plan has no API access. Webhooks require Pro ($40/user/mo).
- **Conversation bundling.** Emails with the same sender and subject bundle into one conversation — comments in the Gmelius pane won't be assigned to individual emails within the bundle.
- **Mobile app limitations.** Mobile experience is significantly more limited than desktop — no full automation management, limited Kanban functionality.
- **Meli plan caps at 5 users.** Growth caps at 50. If your team is larger, you need Pro or Enterprise.
- **Performance degrades at high volume.** G2 reviews report 10+ second email load times during peak periods. Browser-extension architecture means performance depends on Chrome resources.

## Related skills

- `/sales-hiver` — Hiver platform help (Gmail-native help desk, AI copilot, SLAs). Install:
  `npx skills add sales-skills/sales --skill sales-hiver -a claude-code`
- `/sales-front` — Front platform help (AI-powered shared inbox, omnichannel, Autopilot/Copilot, REST API). Install:
  `npx skills add sales-skills/sales --skill sales-front -a claude-code`
- `/sales-missive` — Missive platform help (collaborative team inbox, internal threads, co-drafting, multi-channel). Install:
  `npx skills add sales-skills/sales --skill sales-missive -a claude-code`
- `/sales-helpdesk-selection` — Compare help desk platforms (Zendesk, Freshdesk, Intercom, Help Scout, and more). Install:
  `npx skills add sales-skills/sales --skill sales-helpdesk-selection -a claude-code`
- `/sales-integration` — Connect tools via Zapier/Make/API pipelines
- `/sales-cadence` — Outbound email sequences strategy
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Setting up shared inbox with automations
**User says**: "We're a 12-person team on Google Workspace. We want to set up support@company.com as a shared inbox with auto-assignment and SLA tracking."
**Skill does**:
1. Reads platform guide for setup steps and plan requirements
2. Recommends Growth plan ($25/user/mo) — shared inboxes, automations, and SLAs included
3. Walks through: create shared inbox → invite agents → set up round-robin assignment → configure SLA rules with breach alerts
4. Notes collision detection prevents duplicate replies
5. Suggests starting with simple routing rules before building complex multi-step automations
**Result**: Step-by-step shared inbox setup with plan recommendation

### Example 2: Syncing Gmelius conversations to HubSpot via API
**User says**: "How do I automatically create HubSpot contacts when new conversations arrive in our Gmelius shared inbox?"
**Skill does**:
1. Reads platform guide for API endpoints and webhook events
2. Explains two paths: Zapier (Growth plan) or direct API + webhooks (Pro plan)
3. Provides Zapier recipe: Gmelius "New Conversation" trigger → HubSpot "Create Contact" action
4. For API path: set up webhook for conversation events → POST to HubSpot API
5. Notes that native HubSpot integration requires Pro plan ($40/user/mo)
**Result**: Working integration recipe with both Zapier and API approaches

### Example 3: Gmelius extremely slow loading emails
**User says**: "Gmelius takes 10+ seconds to load emails and our sidebar freezes during the morning rush."
**Skill does**:
1. Acknowledges this is a known issue — Gmelius runs as a Chrome extension, so performance depends on browser resources
2. Recommends: dedicated Chrome profile for email work, disable other extensions, clear browser cache
3. Suggests auto-assignment to distribute load so agents aren't all viewing the same queue
4. Notes periodic browser refreshes every 1-2 hours during peak help
5. If problem persists, recommends evaluating Hiver (also Gmail-native) or Front (standalone) for comparison
**Result**: Practical performance fixes with escalation path

## Troubleshooting

### Gmelius is extremely slow or laggy in Gmail
**Symptom**: Sidebar takes 10+ seconds to load, email interactions lag, browser becomes unresponsive with Gmelius active
**Cause**: Gmelius runs as a Gmail Chrome extension — performance depends on browser resources. High email volume (500+ emails/day) strains the extension.
**Solution**: 1) Use a dedicated Chrome profile with minimal extensions. 2) Clear browser cache weekly. 3) Refresh the Gmail tab every 1-2 hours during peak. 4) Check if other Chrome extensions conflict. 5) If persistent, contact Gmelius support — they may have server-side optimizations for your account.

### Automation rules not triggering on new conversations
**Symptom**: Rules for auto-assignment, tagging, or routing don't fire when new emails arrive
**Cause**: Automations require Growth plan minimum. All conditions in a rule must match (AND logic). Round-robin requires agents to be set as "available."
**Solution**: 1) Verify you're on Growth or Pro plan. 2) Test with a single broad condition first, then layer more conditions. 3) Check agent availability status for round-robin. 4) Rules don't apply retroactively — only new conversations after rule creation.

### Emails bundling incorrectly into one conversation
**Symptom**: Separate emails from the same sender with similar subjects merge into a single conversation, mixing up team comments and assignments
**Cause**: Gmelius inherits Gmail's conversation threading — same sender + same subject = same thread.
**Solution**: 1) Ask senders to use unique subject lines (not always feasible). 2) Use tags instead of notes to track per-email context within a bundle. 3) For critical workflows, consider using email status changes to mark individual messages within a conversation. 4) This is a Gmail architecture limitation, not a Gmelius bug.
