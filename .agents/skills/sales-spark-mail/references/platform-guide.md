# Spark Mail Platform Reference

## Overview

Spark Mail is a cross-platform AI email client built by Readdle (est. 2007, Ukraine). Differentiator: broad platform support (Mac/Windows/iOS/Android/Apple Watch) with a generous free tier and Smart Inbox categorization. Positioned as the affordable Superhuman alternative with team collaboration features. 19.5M+ downloads, Apple Editors' Choice, 4.8/5 (154K ratings).

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Smart Inbox | Auto-categorizes into Personal, Notifications, Newsletters | UI only |
| Gatekeeper | Screens/blocks unwanted senders, sender approval workflow | UI only |
| Pin contacts | Priority sender highlighting — pinned contacts always surface first | UI only |
| Group by Sender | Bundles emails from the same sender together | UI only |
| Spark +AI writing | AI-powered email composition and editing | UI only (Premium) |
| Email Summary | Instant AI summary of long threads | UI only (Premium) |
| Email Translation | Translate emails across 11 languages | UI only (Premium) |
| AI Assistant | Find, summarize, take action on inbox items via natural language | UI only (Premium) |
| Send Later | Schedule emails for optimal send times | UI only |
| Reminders | Set follow-up reminders on conversations | UI only |
| Mute Threads | Auto-archive future messages in a thread | UI only |
| Done Marker | Mark emails as done without archiving | UI only |
| Set Aside | Temporarily remove from inbox for later | UI only |
| Smart Notifications | Only notify for important emails/contacts | UI only |
| Calendar integration | View calendar alongside email | UI only |
| Meeting Notes | Take notes attached to calendar events | UI only |
| Email Signatures | Create and manage multiple signatures | UI only |
| Team shared drafts | Co-write emails in real-time (Teams plan) | UI only (Teams) |
| Internal comments | Private comments on email threads (Teams plan) | UI only (Teams) |
| Email delegation | Assign email ownership to team members (Teams plan) | UI only (Teams) |
| Progress monitoring | Track delegated email progress (Teams plan) | UI only (Teams) |

**No public API, webhooks, Zapier, Make, or any programmatic interface.** Spark is entirely UI-driven.

## Pricing, limits & plan gates

| Feature | Free | Premium Individual ($59.99/yr) | Premium Teams ($6.99/user/mo) |
|---|---|---|---|
| Smart Inbox | Yes | Yes | Yes |
| Gatekeeper | Yes | Yes | Yes |
| Pin contacts | Yes | Yes | Yes |
| Multi-account | Yes | Yes | Yes |
| Send Later / Reminders | Yes | Yes | Yes |
| AI Writing (Spark +AI) | No | Yes | Yes |
| Email Summary | No | Yes | Yes |
| Email Translation | No | Yes | Yes |
| AI Assistant | No | Yes | Yes |
| Advanced customization | No | Yes | Yes |
| Shared drafts | No | No | Yes |
| Internal comments | No | No | Yes |
| Email delegation | No | No | Yes |
| Progress monitoring | No | No | Yes |
| Priority support | No | Yes | Yes |

Premium Individual works out to ~$5/month. Teams plan is billed per user monthly.

## Email provider support

Gmail, Outlook, iCloud, Exchange, Yahoo, and any IMAP provider. Multi-account support on all plans.

## Platform support

- macOS (native app)
- Windows (native app)
- iOS (iPhone, iPad, Apple Watch)
- Android
- Cross-device sync via Readdle's servers

## Integrations

Spark has no external integrations in the traditional sense (no API, no iPaaS). It integrates with:
- Calendar apps (native calendar view)
- Todoist, Things, Bear, Evernote, OneNote (share emails to these apps)
- iCloud, Google Contacts (contact sources)

**No Zapier, Make, n8n, or any automation platform.**

## AI features detail

Spark's AI is powered by OpenAI (GPT models). It's lighter than Superhuman's or Shortwave's AI:

- **Spark +AI Writing**: Compose emails from a brief prompt, adjust tone/length, or rephrase. Similar to Gmail's Smart Compose but more flexible.
- **Email Summary**: Get a one-paragraph summary of long email threads. Useful for catching up on conversations.
- **Email Translation**: Translate incoming emails or compose in a different language. 11 languages supported.
- **AI Assistant**: Natural language queries against your inbox ("find the email from John about the Q4 report").

**Comparison to competitors:**
- Superhuman: Deeper AI triage (auto-labels, follow-up suggestions, read status insights), faster overall UX
- Shortwave: Stronger AI search (truly natural language), Ghostwriter learns your voice, AI filters for automated sorting
- Spark: Functional AI writing/summarization, but less contextually aware. Better understood as a smart email client with AI features, not an AI-first email tool.

## Privacy & security

- **Server-side processing**: Spark stores email credentials on Readdle's servers (Google Cloud, encrypted) to enable Smart Inbox, push notifications, and cross-device sync
- **GDPR and CCPA compliant**
- **No data selling**: Readdle states they don't sell or share personal data with third parties
- **AI data**: Spark doesn't train AI models on your emails; emails sent to OpenAI for AI features are not retained
- **Encryption**: Data encrypted in transit and at rest
- **Google and Microsoft verified**: OAuth app verified by both platforms

**Privacy tradeoff**: Unlike Apple Mail (fully local processing), Spark processes emails server-side. This enables features like Smart Inbox and cross-device sync but means your email content passes through Readdle's infrastructure. Security-conscious users should evaluate this against their threat model.

## Team collaboration (Teams plan)

- **Shared drafts**: Multiple team members can co-edit an email draft before sending
- **Internal comments**: Add private notes to any email thread — visible to team members only, never sent to external recipients
- **Email delegation**: Assign an email to a specific team member with optional deadline
- **Progress tracking**: See status of delegated emails (pending, in progress, done)
- **Link sharing**: Share an email via link for quick collaboration

Teams features are lighter than dedicated shared inbox tools (Missive, Hiver, Front). Best for teams that need occasional collaboration, not full helpdesk workflows.
