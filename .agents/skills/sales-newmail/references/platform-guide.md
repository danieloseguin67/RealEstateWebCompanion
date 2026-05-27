# NewMail AI Platform Reference

## Overview

NewMail AI is an AI email assistant that drafts replies in your voice, prioritizes inbox messages, extracts tasks from emails, generates daily briefings, and creates scheduling links. Works with Gmail, Outlook, and Apple Mail. Positions as a more affordable alternative to Superhuman ($15-30/mo vs $25-40/mo), emphasizing proactive AI assistance over keyboard speed.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| AI Drafting | Generates personalized replies learning from your sent email style | UI-only |
| Priority Sorting | Ranks emails by user-defined priorities, surfaces critical messages | UI-only |
| Custom Categories | User-defined inbox categories in plain English | UI-only |
| Task Extraction | Automatically pulls action items from email content | UI-only |
| Daily Briefings | Morning summary: calendar + tasks + important messages | UI-only |
| Scheduling Links | Generates availability links directly from email replies | UI-only |
| FAQ + Links | Embeds relevant resources and FAQ answers in drafted replies | UI-only |
| Follow-up Suggestions | Nudges for non-responses after configurable time | UI-only |

**No public API. No webhooks. No Zapier/Make integrations. No MCP server.** All features are UI-only — no programmatic access.

## Pricing, limits & plan gates

<!-- Best-effort from multiple sources — pricing conflicts exist. Verify at newmail.ai/pricing -->

| Plan | Price | Key features |
|---|---|---|
| Free Preview | $0 | Full features, ~50 emails, no credit card required |
| Solo | $15/mo | AI drafting, priority sorting, task extraction, scheduling, daily briefings |
| Pro | $30/mo | Advanced features (details unclear from public sources) |
| Enterprise | Custom | Teams 20-200+, team context, personal voice per user, KPI dashboard, SSO, ZDR/DPA, account management |

**Plan gate concerns:**
- Free Preview is time-limited (2 weeks per some sources) and email-limited (~50)
- Difference between Solo and Pro is not clearly documented — test during free preview
- Enterprise requires contacting sales — no self-serve team plan

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| Gmail | Bidirectional | Primary supported provider |
| Outlook | Bidirectional | Primary supported provider |
| Apple Mail | Bidirectional | Support scope may be limited vs Gmail/Outlook |
| CRM (unspecified) | Unclear | Website mentions CRM sync but doesn't name specific CRMs |
| Slack | Unclear | Website mentions Slack sync for extracted tasks |
| Task managers | Unclear | Website mentions task manager sync — no specifics |

**Integration warning:** CRM, Slack, and task manager integrations are mentioned on the website but lack documentation. Test these during the free preview to confirm they work with your specific tools.

## Data model

NewMail AI has no public API, so there are no documented data objects or JSON schemas. The platform works with standard email objects (messages, threads, contacts) from your email provider.

**Key internal concepts:**
- **Priority levels** — AI-assigned importance ranking based on user-defined rules
- **Categories** — User-defined labels using plain English descriptions
- **Tasks** — Action items extracted from email content with due dates
- **Briefings** — Automated daily summaries combining calendar, tasks, and priority emails

## Quick-start recipes

Since NewMail has no API, these are UI workflow recipes:

### Recipe 1: Set up voice-trained AI drafting
1. Connect your Gmail/Outlook account (30 seconds)
2. NewMail scans your sent emails to learn your writing style (60 seconds)
3. Open any email and view the AI-generated draft
4. Adjust with natural language: "make this more casual" or "add a call to action"
5. Send or continue editing

**Gotcha:** Quality improves over time — expect generic drafts for the first 1-2 weeks until enough sent history is analyzed.

### Recipe 2: Configure custom inbox categories
1. Go to Settings → Categories
2. Define categories in plain English, e.g.:
   - "Client follow-ups from @company.com"
   - "Invoices and billing"
   - "Newsletter subscriptions"
3. NewMail sorts incoming emails into these categories automatically
4. Manually correct mislabeled emails to train the system

**Gotcha:** Vague categories like "important" will over-match. Be specific about senders, domains, or keywords.

### Recipe 3: Set up daily briefings with task extraction
1. Enable daily briefings in Settings
2. Each morning, NewMail sends a briefing to your inbox with:
   - Today's calendar events
   - Extracted tasks from recent emails
   - Priority messages that need attention
3. Review extracted tasks — correct any misses to improve accuracy
4. Use follow-up suggestions to nudge non-responses

**Gotcha:** Task extraction works best with explicit action items ("please review the contract by Friday"). Vague references ("we should discuss this soon") may not be captured.

## Integration patterns

### No API — workaround options

NewMail AI has no public API, webhooks, or iPaaS connectors. If you need programmatic email management:

- **Inbox Zero** (getinboxzero.com) — open-source, REST API + CLI, self-hostable
- **Superhuman** (superhuman.com) — MCP server for Claude Code/ChatGPT integration (Business plan $33+/mo)
- **Shortwave** (shortwave.com) — MCP consumer (connects TO external tools)

### CRM sync (claimed but undocumented)

NewMail claims CRM integration but doesn't document which CRMs or sync behavior. Test during free preview:
1. Check Settings → Integrations after connecting your email
2. Look for CRM connector options
3. If no CRM option appears, the integration may be Enterprise-only or not yet available

## Competitive positioning

| Feature | NewMail AI | Superhuman | Shortwave | Fyxer |
|---|---|---|---|---|
| Price | $15-30/mo | $25-40/mo | $24-100/mo | $22.50-50/mo |
| AI Drafting | Voice-trained | AI Write (Grammarly) | Ghostwriter | Voice-trained |
| Task Extraction | Yes | No | No | No |
| Daily Briefings | Yes | No | No | No |
| Scheduling Links | Embedded in replies | Share Availability | No | No |
| Meeting Notes | No | No | No | Yes |
| API/MCP | None | MCP server | MCP consumer | None |
| Providers | Gmail, Outlook, Apple Mail | Gmail, Outlook | Gmail only | Gmail, Outlook |
| CRM Integration | Claimed (undocumented) | Salesforce, HubSpot, Pipedrive | None | None |
| Privacy | Zero data retention | Standard | Standard | SOC 2, ISO 27001 |
