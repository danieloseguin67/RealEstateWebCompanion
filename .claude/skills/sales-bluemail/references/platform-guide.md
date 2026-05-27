# BlueMail Platform Reference

## Overview

BlueMail is a free, cross-platform email and calendar app by Blix Inc. It manages unlimited email accounts from Gmail, Outlook, Exchange, iCloud, Yahoo, and any IMAP/POP3 provider in a single unified inbox. Available on Windows, macOS, Linux, Android, and iOS. GemAI (Plus plan) adds AI-powered email composition, summarization, and smart replies. Team and Enterprise plans add collaboration features, SSO, and S/MIME encryption.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Unified Inbox | View all accounts in one stream or switch individually | UI-only |
| Email Clustering | Auto-groups emails by People, Groups, Services | UI-only |
| People Toggle | Sender-centric inbox view — tap avatar to see all emails from that sender | UI-only |
| Later Board | Snooze/defer emails for later — acts as lightweight task management | UI-only |
| GemAI | AI email writing, summarization, smart replies (OpenAI-powered) | UI-only, Plus plan+ |
| Integrated Calendar | Day/Agenda views, event invites, reminders, auto-syncs with email accounts | UI-only |
| Dark Mode | System or manual dark theme toggle | UI-only |
| Email Snooze | Temporarily remove email from inbox, returns at scheduled time | UI-only |
| Custom Swipe Actions | Configure left/right swipe gestures per action (archive, delete, snooze, etc.) | UI-only |
| Quick Filters | Filter inbox by unread, starred, attachments | UI-only |
| Rich Text Signatures | HTML signatures per account | UI-only |
| Read Receipts | Request read confirmation (recipient must accept) | UI-only |
| Team Messaging | Real-time chat between team members within BlueMail | UI-only, Team plan+ |
| Shared Mailboxes | Team members share access to group email addresses | UI-only, Team plan+ |
| Workflow Comments | Comment on emails visible to team members | UI-only, Team plan+ |
| GoldCheck | Verified domain badge for business accounts | UI-only, Team plan+ |
| BlueCheck | Individual identity verification badge | UI-only, Team plan+ |
| SSO/Identity Provider | SAML/OIDC single sign-on | UI-only, Enterprise |
| S/MIME | Certificate-based email encryption and signing | UI-only, Enterprise |
| Adaptive MFA | Multi-factor authentication with risk-based prompts | UI-only, Enterprise |
| Corporate Dashboard | Policy management, device management, configuration controls | UI-only, Enterprise |

**No public API. No webhooks. No Zapier/Make/n8n integration. No MCP server.** BlueMail cannot be automated or integrated programmatically. All functionality is UI-only.

## Pricing, limits & plan gates

<!-- Best-effort from multiple sources — prices vary slightly between sources, verify on bluemail.me/pricing -->

| Plan | Price | Key features |
|---|---|---|
| Standard | Free | Unlimited accounts, unified inbox, clustering, calendar, Later Board, People Toggle, custom swipe, dark mode |
| Plus | ~$4-5/user/mo | Everything in Standard + GemAI AI writing/summarization, themes, email backup (desktop), priority support |
| Team | ~$12/user/mo | Everything in Plus + shared mailboxes, team messaging, workflow comments, GoldCheck, BlueCheck (1/seat), custom domain, subscription/billing control |
| Enterprise | Custom | Everything in Team + SSO/Identity Provider, S/MIME, adaptive MFA, corporate dashboard, policy/device management |

**Plan-gated features to know:**
- GemAI (AI) requires Plus ($5/mo) — free users get no AI features
- Team collaboration (shared mailboxes, messaging, comments) requires Team ($12/mo)
- S/MIME encryption requires Enterprise
- SSO requires Enterprise
- Email backup (desktop) requires Plus+

**No free trial mentioned** — the free tier IS the trial since it's genuinely functional.

## Integrations

BlueMail has **no programmatic integration surface**:
- No REST API or GraphQL API
- No webhooks (inbound or outbound)
- No Zapier triggers or actions
- No Make (Integromat) modules
- No n8n nodes
- No MCP server
- No browser extension

**Email provider support:**
- Gmail / Google Workspace (IMAP, OAuth)
- Outlook / Office 365 / Exchange (EWS, ActiveSync)
- iCloud Mail
- Yahoo Mail
- Any IMAP provider
- Any POP3 provider

**Calendar support:**
- Google Calendar (CalDAV)
- Outlook/Exchange Calendar (EWS)
- iCloud Calendar (CalDAV)
- Any CalDAV-compatible calendar

## Data model

BlueMail is a client application — it doesn't have its own data model exposed via API. Emails, contacts, and calendar events live on the connected providers' servers (Gmail, Exchange, etc.). BlueMail reads and displays them.

Key internal concepts:
- **Clusters**: Automatic grouping of emails by sender type (People = individuals, Groups = mailing lists/CCs, Services = automated/transactional)
- **Later Board**: Deferred emails with a reminder timestamp — acts as an email-to-task conversion
- **People Toggle**: Aggregated view of all emails by sender avatar
- **GoldCheck/BlueCheck**: Visual trust badges (domain-verified / individual-verified)

## Quick-start recipes

Since BlueMail has no API, recipes are UI-based workflows:

### Recipe 1: Tame a 5-account inbox with Clustering

1. Add all accounts: Settings → Add Account → auto-detect for Gmail/Outlook, manual for IMAP
2. Enable Unified Inbox: Settings → Unified → toggle on
3. Clustering auto-activates — emails group into People, Groups, Services
4. Tap any cluster to see all emails from that sender/group stacked together
5. Use People Toggle (tap the people icon) to switch to sender-centric view
6. Pin important senders to always see them at the top

### Recipe 2: Use Later Board for email-to-task management

1. Swipe right on an email (or long-press → Later)
2. Pick a time: Later Today, This Evening, Tomorrow, Next Week, or custom date/time
3. Email disappears from inbox, reappears at the scheduled time
4. Open Later Board (sidebar → Later) to see all deferred emails
5. Process deferred emails when they resurface — reply, archive, or defer again

### Recipe 3: Set up GemAI for faster email replies (Plus plan)

1. Upgrade to Plus plan in Settings → Subscription
2. Open any email → tap Reply
3. GemAI icon appears in the compose toolbar
4. Tap GemAI → choose: Compose, Reply, Summarize
5. For replies: GemAI reads the email thread and generates a contextual response
6. Edit the draft as needed → Send
7. GemAI works best for short professional replies — edit longer/complex responses manually

## Integration patterns

**No programmatic integration is possible.** If you need to automate email workflows, consider:

- **SaneBox** ($7/mo) for server-side AI filtering that works with any client including BlueMail
- **Zapier Email Parser** to extract data from forwarded emails
- **IFTTT** with Gmail/Outlook triggers (works at the provider level, independent of BlueMail)
- **Switching to a client with API access**: Superhuman (MCP server), Shortwave (MCP consumer), or Missive (REST API)

For team automation needs (auto-assign, ticket routing, SLA tracking), BlueMail is not the right tool — consider Missive, Front, or Hiver instead.
