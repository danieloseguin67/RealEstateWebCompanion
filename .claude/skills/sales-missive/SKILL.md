---
name: sales-missive
description: "Missive platform help — collaborative team inbox merging email, SMS, WhatsApp, Instagram, live chat into a shared workspace with internal threads, collaborative drafting, task management, and rules-based automations ($14-36/user/mo). Use when setting up Missive shared inboxes for a team, Missive search not finding old emails or conversations, team can't see assigned emails or archiving affects everyone, connecting Missive to a CRM or other tools via API or Zapier, comparing Missive to Front or Hiver or Help Scout for shared inbox, or choosing between Missive Starter/Productive/Business plans. Do NOT use for comparing help desk platforms broadly (use /sales-helpdesk-selection). Do NOT use for contact center or CCaaS selection (use /sales-ccaas-selection)."
argument-hint: "[describe what you need help with in Missive]"
license: MIT
version: 1.0.0
tags: [sales, shared-inbox, team-email, collaboration, platform]
github: "https://github.com/missive"
---

# Missive Platform Help

Helps with Missive — a collaborative team inbox that merges email, SMS, WhatsApp, Instagram, Messenger, and live chat into a shared workspace. Teams collaborate with internal threads, co-draft emails before sending, convert emails to tasks, and automate workflows with rules.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What are you trying to do with Missive?**
   - A) Set up shared inboxes and team spaces for the first time
   - B) Fix search, assignment, or automation issues
   - C) Connect Missive to CRM or other tools (API, Zapier, webhooks)
   - D) Configure collaborative drafting or internal threads
   - E) Compare Missive to other shared inbox tools
   - F) Something else — describe it

2. **How many team members?**
   - A) 1-5 (micro team — Starter plan fits)
   - B) 6-50 (growing team — Productive plan fits)
   - C) 50+ (scaling — Business plan fits)

3. **Which plan are you on (or considering)?**
   - A) Starter ($14/user/mo) — up to 5 users, email/SMS/social, team spaces
   - B) Productive ($24/user/mo) — up to 50 users, integrations, API, automations, basic analytics
   - C) Business ($36/user/mo) — unlimited users, SSO/SAML, IP restriction, advanced analytics
   - D) Not sure / evaluating

**Skip-ahead rule**: if the user's prompt already provides enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Comparing shared inbox / help desk platforms broadly | `/sales-helpdesk-selection {question}` |
| Contact center / CCaaS selection | `/sales-ccaas-selection {question}` |
| Live chat strategy across tools | `/sales-live-chat {question}` |
| Connecting tools via Zapier/Make/API pipelines | `/sales-integration {question}` |

For Missive-specific questions, continue to Step 3.

## Step 3 — Missive platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API endpoints, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

- For **search issues**: Use Gmail-style search operators within Missive. Clear filters before searching. Search by sender email address instead of name for more reliable results.
- For **assignment/archiving confusion**: Archiving in a shared inbox archives for all members. Use "Close" status instead to mark conversations as resolved without removing from others' views.
- For **plan selection**: Start with Starter ($14) for up to 5 users. Upgrade to Productive ($24) when you need API access, automations, or 6+ users. Business ($36) only for SSO/SAML or 50+ users.
- For **onboarding**: Expect 2-3 days for basic setup, up to 2 weeks to tune rules and permissions for a 15+ person team.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No permanent free plan.** Only a 30-day trial — no free tier like Hiver or Freshdesk. Smallest paid plan is Starter at $14/user/mo.
- **API requires Productive plan ($24/user/mo).** Starter users cannot use the REST API or webhooks — must upgrade or use Zapier (also Productive+).
- **Search is the weakest feature.** Users consistently report search not finding old messages, especially when searching by numbers or partial terms. Clear all filters before searching.
- **Archiving affects the whole team.** Unlike personal email, archiving a shared inbox conversation removes it from everyone's view, not just yours. Use status changes instead.
- **Only account owner can manage aliases.** Admins cannot add email aliases — only the account owner has this permission.
- **Steep learning curve for teams.** Basic setup takes 2-3 days, but tuning rules, permissions, and workflows for a 15+ person team takes closer to 2 weeks.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-hiver` — Hiver platform help (Gmail-native shared inbox, AI copilot, SLAs). Install:
  `npx skills add sales-skills/sales --skill sales-hiver -a claude-code`
- `/sales-gmelius` — Gmelius platform help (Gmail AI collaboration, Meli assistant, Kanban boards). Install:
  `npx skills add sales-skills/sales --skill sales-gmelius -a claude-code`
- `/sales-helpdesk-selection` — Compare help desk platforms (Zendesk, Freshdesk, Intercom, Help Scout, and more). Install:
  `npx skills add sales-skills/sales --skill sales-helpdesk-selection -a claude-code`
- `/sales-front` — Front platform help (AI-powered shared inbox, omnichannel, Autopilot/Copilot, REST API). Install:
  `npx skills add sales-skills/sales --skill sales-front -a claude-code`
- `/sales-integration` — Connect tools via Zapier/Make/API pipelines
- `/sales-live-chat` — Live chat strategy across tools
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Setting up shared inbox for a support team
**User says**: "We're an 8-person SaaS team. We want to set up support@company.com and sales@company.com as shared inboxes with auto-assignment."
**Skill does**: Reads platform guide. Recommends Productive plan ($24/user/mo) since they need 8 users (exceeds Starter's 5-user limit) and automations. Walks through: create organization → add shared email accounts → create team spaces → set up auto-assignment rules → configure internal thread workflows. Notes that collaborative drafting lets agents co-write replies before sending.

### Example 2: Syncing Missive conversations to HubSpot via API
**User says**: "How do I automatically create HubSpot contacts when we get new conversations in Missive?"
**Skill does**: Reads platform guide for API endpoints and webhook setup. Provides two paths: 1) Zapier recipe using "New message" trigger → HubSpot "Create Contact" action, 2) Webhook approach: create a Rule with webhook action → POST to your server → call HubSpot API. Includes cURL example for listing conversations. Notes API requires Productive plan.

### Example 3: Search not finding messages
**User says**: "I'm searching for an email from last month but Missive can't find it. I know it exists because I can see it in Gmail."
**Skill does**: Acknowledges search limitations as a known issue. Recommends: 1) Clear all active filters and search again. 2) Search by exact sender email address instead of name. 3) Try narrowing with date range. 4) As a workaround, use Gmail's native search to find the message, then locate it in Missive by subject line. Notes this is the most common Missive complaint on G2.

## Troubleshooting

### Search not finding conversations or messages
**Symptom**: Searching for a conversation returns no results even though the email exists
**Cause**: Missive's search is its weakest feature (95+ G2 mentions). It doesn't reliably match partial terms, numbers, or old messages — especially with active filters.
**Solution**: 1) Clear all filters before searching. 2) Search by exact sender email address. 3) Use Gmail/Outlook native search as a fallback to find the message, then locate in Missive by subject. 4) Report persistent search issues to Missive support — they've been improving this.

### Steep learning curve during team onboarding
**Symptom**: New team members struggle with Missive's interface, rules, and collaboration features
**Cause**: Missive combines email, chat, tasks, and automations in one tool — more complex than a basic email client. Basic setup takes 2 days, but team-wide tuning takes up to 2 weeks.
**Solution**: 1) Start with just shared inboxes and internal threads — don't enable automations on day one. 2) Roll out features incrementally: week 1 shared inbox → week 2 assignments → week 3 rules → week 4 integrations. 3) Use Missive's onboarding resources and customer stories for team training. 4) Business plan includes personalized team onboarding.

### Conversations disappearing after archiving
**Symptom**: An agent archives a conversation and it vanishes from other team members' views
**Cause**: In shared inboxes, archiving removes the conversation for everyone — unlike personal email where archiving is per-user.
**Solution**: 1) Use "Close" status instead of archive to mark conversations as resolved. 2) Set up team conventions: archive = permanently done, close = resolved but accessible. 3) Closed conversations remain searchable and can be reopened. 4) Consider using labels/tags to organize instead of archiving.
