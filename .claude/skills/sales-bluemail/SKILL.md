---
name: sales-bluemail
description: "BlueMail platform help — free cross-platform email and calendar app with unified inbox, GemAI AI writing/summarization, email clustering, Later Board task deferral, team collaboration, works with Gmail/Outlook/Exchange/iCloud/Yahoo/IMAP on Windows/Mac/Linux/Android/iOS (Free, Plus ~$5/mo, Team ~$12/mo, Enterprise custom). Use when setting up BlueMail with multiple email accounts or migrating from another client, BlueMail running slow or laggy with many accounts, emails not syncing or sent items stuck, GemAI drafts not generating or Plus plan required, choosing between BlueMail free vs Plus vs Team plans, comparing BlueMail to Spark Mail or eM Client or Superhuman, BlueMail email clustering not grouping correctly, or BlueMail calendar not showing events. Do NOT use for comparing AI email assistants broadly (use /sales-do). Do NOT use for team shared inbox with ticketing (use /sales-hiver or /sales-missive)."
argument-hint: "[describe what you need help with in BlueMail]"
license: MIT
version: 1.0.0
tags: [sales, email-client, ai-email, productivity, platform]
github: "https://github.com/bluemail-pro"
---

# BlueMail Platform Help

Helps with BlueMail — a free, cross-platform email and calendar app by Blix Inc. Unified inbox manages unlimited accounts (Gmail, Outlook, Exchange, iCloud, Yahoo, any IMAP/POP3) across Windows, macOS, Linux, Android, and iOS. GemAI provides AI-powered writing, summarization, and reply assistance. Clustering auto-groups emails by People, Groups, and Services. Later Board defers emails for task management. Team and Enterprise plans add collaboration, SSO, and S/MIME.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What are you trying to do with BlueMail?**
   - A) Set up BlueMail or migrate from another email client
   - B) Fix sync, performance, or crash issues
   - C) Use GemAI for email writing/summarization
   - D) Configure Clustering, Later Board, or People Toggle
   - E) Set up team collaboration or enterprise features
   - F) Compare BlueMail to other email clients
   - G) Something else — describe it

2. **Which platform(s)?**
   - A) Windows / Mac / Linux
   - B) Android / iOS
   - C) Cross-platform (multiple devices)

3. **Which plan are you on (or considering)?**
   - A) Standard (Free) — unlimited accounts, unified inbox, calendar, clustering
   - B) Plus (~$5/user/mo) — GemAI, themes, email backup, priority support
   - C) Team (~$12/user/mo) — GoldCheck, BlueCheck, custom domain, collaboration
   - D) Enterprise (custom) — SSO, S/MIME, MFA, identity provider integration
   - E) Not sure / evaluating

**Skip-ahead rule**: if the user's prompt already provides enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Comparing AI email clients broadly | `/sales-do {question}` |
| Team shared inbox with ticketing/SLAs | `/sales-missive {question}` or `/sales-hiver {question}` |
| Server-side email filtering without switching clients | `/sales-sanebox {question}` |
| Bulk inbox cleanup and newsletter unsubscribe | `/sales-clean-email {question}` |
| Connecting tools via API/webhooks/Zapier | Note: BlueMail has no public API or iPaaS integration |

For BlueMail-specific questions, continue to Step 3.

## Step 3 — BlueMail platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, clustering setup, GemAI features, team collaboration, and integration details.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

- For **setup/migration**: Add accounts via Settings → Add Account. BlueMail auto-detects IMAP/Exchange settings for major providers. For migration from Outlook or Thunderbird, add the same accounts — mail syncs from the server.
- For **performance**: Reduce connected accounts if running 8+. Disable push notifications for low-priority accounts. On Linux, the Snap version has known attachment issues — try the Flatpak or .deb package instead.
- For **GemAI**: Requires Plus plan ($5/mo). Works for composing, summarizing, and replying. Best for short-form emails — for long complex replies, use as a starting draft and edit.
- For **plan selection**: Free is genuinely useful (unlimited accounts, clustering, calendar). Plus ($5/mo) only if you want GemAI. Team ($12/mo) for shared mailboxes and domain branding. Enterprise for SSO/S/MIME compliance.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features that may be outdated.*

- **GemAI requires Plus plan.** Free users cannot access AI writing, summarization, or smart replies. This is the main upgrade driver.
- **No public API.** No REST API, webhooks, Zapier, Make, or any programmatic interface. Cannot be automated or integrated with external tools.
- **Support is slow.** Multiple reviewers report no response to bug reports, even for paid accounts. Rely on community forums and workarounds rather than official support.
- **Linux Snap version has attachment issues.** The Snap package can't access files outside its sandbox — file picker shows squares instead of files. Use Flatpak or .deb instead.
- **Updates can break things.** Several users report that updates cause UI glitches, wrong emails displaying, or complete unusability. Pin your version if stability matters.
- **Performance degrades with many accounts.** Users with 5+ accounts report lag, slow search, and high CPU/RAM usage. Search is particularly resource-intensive.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-spark-mail` — Spark Mail cross-platform AI email client (Smart Inbox, Gatekeeper, team collaboration, Free/$5/$6.99). Install:
  `npx skills add sales-skills/sales --skill sales-spark-mail -a claude-code`
- `/sales-em-client` — eM Client desktop email client (cross-platform, PGP encryption, calendar/tasks, Free/~€30yr/~€40 one-time). Install:
  `npx skills add sales-skills/sales --skill sales-em-client -a claude-code`
- `/sales-superhuman` — Superhuman email client (fastest keyboard workflow, MCP server, AI triage, $25-40/mo). Install:
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

### Example 1: Setting up BlueMail with 5 email accounts
**User says**: "I have 3 Gmail accounts, 1 Outlook, and 1 custom domain IMAP. Can BlueMail handle all of them?"
**Skill does**: Reads platform guide. Confirms BlueMail supports unlimited accounts on all plans including Free. Walks through: 1) Add each account via Settings → Add Account. 2) Gmail and Outlook auto-detect settings. 3) For custom IMAP, enter server/port manually. 4) Use Unified Inbox to see all in one view, or switch between accounts. 5) Enable Clustering to auto-sort by People/Groups/Services across all accounts. Warns about potential lag with 5+ accounts.

### Example 2: Comparing BlueMail to Spark Mail for cross-platform use
**User says**: "I use Mac and Android. Should I pick BlueMail or Spark Mail?"
**Skill does**: Reads platform guide comparison notes. Compares: BlueMail runs on Mac/Windows/Linux/Android/iOS with a generous free tier (unlimited accounts, clustering, calendar). Spark runs on Mac/Windows/Android/iOS with Smart Inbox and Gatekeeper free, but AI features cost $5/mo. BlueMail's GemAI is also $5/mo. Key differences: Spark has smarter inbox categorization and Gatekeeper sender screening; BlueMail has Linux support, Later Board for task deferral, and email clustering by sender type. Neither has an API. Recommends trying both free tiers since the paid prices are nearly identical.

### Example 3: BlueMail email sync broken
**User says**: "BlueMail on my Android shows different emails than on my Mac. Sent items from my phone don't appear on desktop."
**Skill does**: Reads platform guide troubleshooting. Explains: 1) Force sync by pulling down on inbox (mobile) or refreshing (desktop). 2) Check that both devices use the same BlueMail account login, not separate local-only setups. 3) For IMAP accounts, verify the sent folder path matches on both devices (Settings → Account → Folders → Sent). 4) If using POP3, switch to IMAP — POP3 doesn't sync sent items. 5) Try removing and re-adding the problem account. Notes this is one of the most common complaints — persistent issues may require contacting support, though response times are slow.

## Troubleshooting

### BlueMail is slow — laggy with many accounts
**Symptom**: App takes seconds to open, search is sluggish, high CPU/RAM usage, freezing when switching between accounts
**Cause**: BlueMail's search indexer and sync engine consume significant resources with 5+ accounts or large mailboxes (10K+ emails).
**Solution**: 1) Reduce the number of connected accounts — consider grouping low-priority accounts into a single forwarding address. 2) Disable push notifications for less important accounts (Settings → Account → Notifications). 3) On desktop, close and reopen BlueMail to clear memory. 4) On Linux, switch from Snap to Flatpak or .deb package for better performance. 5) Clear the app cache: Settings → Storage → Clear Cache (mobile).

### Emails not syncing across devices
**Symptom**: Read/sent/deleted actions on one device don't appear on another, or new emails arrive on one device but not others
**Cause**: POP3 accounts don't sync across devices. IMAP accounts can have folder mapping mismatches. BlueMail's server-side sync can hit conflicts.
**Solution**: 1) Verify the account uses IMAP, not POP3 (Settings → Account → check protocol). Switch to IMAP if possible. 2) Check sent folder mapping — both devices must use the same server folder (Settings → Account → Folders). 3) Force sync on each device. 4) Remove and re-add the account if sync remains broken. 5) Ensure background data is enabled (Android: Settings → Apps → BlueMail → allow background data).

### Attachments not working (Linux)
**Symptom**: File picker shows squares instead of files, or attachments fail to send — particularly on Linux
**Cause**: The Snap package runs in a sandbox that restricts file system access. This is a known Snap limitation, not a BlueMail bug.
**Solution**: 1) Use the Flatpak version instead: install from Flathub. 2) Or download the .deb package from bluemail.me. 3) On Android, if attachments fail randomly, check that BlueMail has storage permissions enabled. 4) For persistent attachment failures on any platform, try compressing large files before attaching.
