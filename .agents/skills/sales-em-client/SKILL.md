---
name: sales-em-client
description: "eM Client platform help — cross-platform desktop email client with calendar, tasks, contacts, PGP/S/MIME encryption, AI writing assistance, message translation, mass mail, and tracking pixel blocking. Works with Gmail, Outlook, Exchange, iCloud, Yahoo, and any IMAP provider on Windows, macOS, Android, and iOS (Free 2 accounts, Personal ~$30/yr, Business ~$40/device/yr, one-time purchase available). Use when setting up eM Client with multiple email accounts or migrating from Outlook or Thunderbird, eM Client running slow or crashing or emails taking forever to load, calendar not syncing between eM Client and Google or Exchange, eM Client search not finding emails you know exist, choosing between eM Client free vs Personal vs Business plans, or configuring PGP encryption or S/MIME in eM Client. Do NOT use for comparing AI email assistants broadly (use /sales-do). Do NOT use for team shared inbox with ticketing (use /sales-hiver or /sales-missive)."
argument-hint: "[describe what you need help with in eM Client]"
license: MIT
version: 1.0.0
tags: [sales, email-client, productivity, platform]
github: "https://github.com/niclas-nicemedia"
---

# eM Client Platform Help

Helps with eM Client — a cross-platform desktop email client (Windows, macOS, Android, iOS) that replaces Outlook and Thunderbird. Offers unified inbox with calendar, tasks, contacts, notes, and chat. Supports PGP/S/MIME encryption, AI writing assistance, message translation, mass mail, snooze, send later, and tracking pixel blocking. Works with Gmail, Outlook, Exchange, iCloud, Yahoo, Google Workspace, Office 365, and any IMAP provider. 4M+ users, trusted by 100K+ businesses.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What are you trying to do with eM Client?**
   - A) Set up eM Client or migrate from another client (Outlook, Thunderbird, Apple Mail)
   - B) Fix performance, sync, or crash issues
   - C) Configure encryption (PGP or S/MIME)
   - D) Use AI features (writing, translation)
   - E) Compare eM Client to other email clients
   - F) Something else — describe it

2. **Which platform(s)?**
   - A) Windows
   - B) macOS
   - C) Android / iOS
   - D) Cross-platform (multiple devices)

3. **Which plan are you on (or considering)?**
   - A) Free — 2 accounts, limited features
   - B) Personal (€29.95/yr or €39.95 one-time) — unlimited accounts, AI, full features
   - C) Business (€39.95/device/yr or €54.95 one-time) — commercial use, license manager
   - D) Not sure / evaluating

**Skip-ahead rule**: if the user's prompt already provides enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Comparing AI email clients broadly | `/sales-do {question}` |
| Team shared inbox with ticketing/SLAs | `/sales-missive {question}` or `/sales-hiver {question}` |
| Server-side email filtering without switching clients | `/sales-sanebox {question}` |
| Bulk inbox cleanup and newsletter unsubscribe | `/sales-clean-email {question}` |
| Connecting tools via API/webhooks/Zapier | Note: eM Client has no public API or iPaaS integration |

For eM Client-specific questions, continue to Step 3.

## Step 3 — eM Client platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, migration guides, encryption setup, AI features, and integration details.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

- For **migration**: Use eM Client's built-in import from Outlook PST, Thunderbird profiles, or Apple Mail. Calendar and contacts transfer automatically for Exchange/Google accounts.
- For **performance**: Database corruption is common — run database repair from Menu → Operations → Database. Reduce the number of synced accounts if running 5+.
- For **encryption**: PGP requires importing your keyring. S/MIME certificates must be installed per account. Both work on Personal and Business plans.
- For **plan selection**: Free is good for light personal use (2 accounts max). Personal (€29.95/yr) unlocks everything for individuals. Business (€39.95/device/yr) adds license management for teams. One-time purchase is best value if you plan to use it long-term.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features that may be outdated.*

- **Free tier is limited.** Only 2 email accounts, no snooze, no mass mail, no AI, no send later, no tracking pixel blocking, no Teams/Slack integration. Most useful features are paid-only.
- **No public API.** No REST API, webhooks, Zapier, Make, or any programmatic interface. Cannot be automated. Users have requested this on the forum — it's a known gap.
- **Performance degrades with large mailboxes.** Users with 10K+ emails report slow loading, forwarding delays, and occasional crashes. Database repair helps.
- **One-time purchase vs subscription.** One-time licenses include lifetime upgrades to the version purchased, but NOT upgrades to future major versions (e.g., v9 → v10 requires new purchase).
- **Calendar sync quirks.** Google Tasks and subtasks are not fully supported. Exchange calendar sync can lag or miss recurring event updates.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-bluemail` — BlueMail cross-platform email client (free unified inbox, GemAI AI writing, clustering, Later Board, Free/$5/$12/Enterprise). Install:
  `npx skills add sales-skills/sales --skill sales-bluemail -a claude-code`
- `/sales-spark-mail` — Spark Mail cross-platform AI email client (Smart Inbox, Gatekeeper, team collaboration, Free/$5/$6.99). Install:
  `npx skills add sales-skills/sales --skill sales-spark-mail -a claude-code`
- `/sales-superhuman` — Superhuman email client (fastest keyboard workflow, MCP server, AI triage, $30/mo). Install:
  `npx skills add sales-skills/sales --skill sales-superhuman -a claude-code`
- `/sales-shortwave` — Shortwave AI-native Gmail client (AI filters, Ghostwriter, MCP consumer, $7-14/mo). Install:
  `npx skills add sales-skills/sales --skill sales-shortwave -a claude-code`
- `/sales-mimestream` — Mimestream native macOS Gmail client (Gmail API-powered, tracking prevention, no AI, $50/yr). Install:
  `npx skills add sales-skills/sales --skill sales-mimestream -a claude-code`
- `/sales-airmail` — Airmail Apple-exclusive email client (customizable actions, AppleScript automation, Privacy Mode, Free/$49yr). Install:
  `npx skills add sales-skills/sales --skill sales-airmail -a claude-code`
- `/sales-sanebox` — SaneBox server-side email filtering (smart folders, any provider, $7/mo). Install:
  `npx skills add sales-skills/sales --skill sales-sanebox -a claude-code`
- `/sales-clean-email` — Clean Email inbox cleanup (bulk actions, Auto Clean, True Unsubscriber). Install:
  `npx skills add sales-skills/sales --skill sales-clean-email -a claude-code`
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Migrating from Outlook to eM Client
**User says**: "I'm moving from Outlook to eM Client. How do I transfer everything — emails, calendar, contacts?"
**Skill does**: Reads platform guide migration section. Walks through: 1) Export from Outlook as PST file (or use auto-import if Outlook is installed). 2) In eM Client, go to Menu → File → Import → Microsoft Outlook. 3) Select the PST file. 4) Calendar events and contacts transfer automatically for Exchange/Google accounts. 5) For local-only Outlook data, import the PST which includes all folders. Notes: eM Client supports the same account types as Outlook, so most transitions are seamless.

### Example 2: eM Client is slow and freezing
**User says**: "eM Client takes 10+ seconds to open emails and sometimes freezes completely. What can I do?"
**Skill does**: Reads platform guide troubleshooting section. Recommends: 1) Run database repair: Menu → Operations → Database → Repair. 2) Check total mailbox size — if 10K+ emails, consider archiving old mail. 3) Disable conversation/thread view if enabled (known performance drag). 4) Update to latest version. 5) On Windows, check if antivirus is scanning eM Client's database folder. 6) As last resort, export settings, uninstall, reinstall, re-import.

### Example 3: Setting up PGP encryption for secure email
**User says**: "I need to set up PGP encryption in eM Client. How does it work?"
**Skill does**: Reads platform guide encryption section. Explains: 1) eM Client supports both PGP and S/MIME natively. 2) For PGP: go to Menu → Settings → Signing and Encryption → select your account → generate or import your PGP key pair. 3) Import recipients' public keys. 4) When composing, click the lock icon to encrypt. 5) Notes: PGP is available on all plans including free. S/MIME requires installing certificates per account. Both require the recipient to also have encryption set up.

## Troubleshooting

### eM Client is slow — emails take a long time to load
**Symptom**: Opening emails takes 5-10+ seconds, forwarding takes minutes, warnings about actions taking a long time
**Cause**: Database corruption or bloat from large mailboxes. Antivirus scanning the database folder can also cause slowness.
**Solution**: 1) Run database repair: Menu → Operations → Database → Repair. 2) If repair doesn't help, compact the database: Menu → Operations → Database → Compact. 3) Archive emails older than 6 months to reduce active mailbox size. 4) Exclude eM Client's data folder from antivirus real-time scanning. 5) On Windows, check Task Manager for high CPU — eM Client's search indexer can spike during initial sync.

### Calendar not syncing with Google or Exchange
**Symptom**: Events created in eM Client don't appear in Google Calendar (or vice versa), recurring events show wrong times, or Google Tasks don't sync
**Cause**: eM Client uses CalDAV for Google and EWS/ActiveSync for Exchange. Google Tasks and subtasks are not fully supported. Timezone handling can cause recurring event drift.
**Solution**: 1) Force sync: Menu → Operations → Send and Receive All. 2) Check account settings — ensure CalDAV is enabled for Google. 3) For recurring events with wrong times, delete and recreate the event. 4) Google Tasks: eM Client syncs basic tasks but not subtasks — this is a known limitation. 5) For Exchange, ensure EWS endpoint is correct (IT admin may need to provide this).

### Crashes during startup or after update
**Symptom**: eM Client crashes on launch, shows a white screen, or crashes after updating to a new version
**Cause**: Database corruption after interrupted sync or failed update. Incompatible add-ons or system-level conflicts.
**Solution**: 1) Try running eM Client as administrator (Windows). 2) Delete the corrupt database: close eM Client, navigate to `%appdata%\eM Client` (Windows) or `~/Library/Application Support/eM Client` (Mac), rename the `mail_data.dat` file to force a fresh sync. 3) If a specific update caused the crash, check `forum.emclient.com` for known issues with that version. 4) Reinstall if nothing else works — your mail remains safe on the server.
