# Airmail Platform Reference

## Overview

Airmail is an Apple-exclusive email client (Mac, iOS, iPadOS, watchOS, visionOS) focused on deep customization and privacy. It supports Gmail, Exchange, Outlook, iCloud, Yahoo, IMAP, and POP3. Apple Design Award winner (Airmail 3). Developed by Bloop S.r.l. (Italy).

## Capabilities & automation surface

| Capability | Description | Automation surface |
|---|---|---|
| Multi-account inbox | Unified or per-account views for Gmail, Exchange, Outlook, iCloud, IMAP, POP3 | UI-only |
| Smart Inbox | Auto-filters newsletters and distractions | UI-only |
| Custom Actions | Chain multiple steps (label + forward + archive) into one-tap operations | UI-only (but triggered via swipe/shortcut) |
| Swipe actions | Configurable swipe gestures on message list | UI-only |
| Send Later | Schedule email delivery for optimal timing | UI-only |
| Snooze | Temporarily hide emails until a set time | UI-only |
| Templates | Reusable email templates and per-account signatures | UI-only |
| S/MIME & GPG | End-to-end encryption via S/MIME certificates or GPGTools | UI-only |
| Privacy Mode | Local-only data processing, tracking pixel blocking | UI-only |
| AppleScript | Full scripting on Mac — send, search, move, label messages | **AppleScript-accessible (Mac only)** |
| Siri Shortcuts | iOS automation — send email, open inbox, search | **Siri Shortcuts-accessible (iOS only)** |
| URL schemes | Deep linking to compose, search, and view operations | **URL scheme-accessible (all platforms)** |
| Plugin framework | Objective-C plugin bundles for crypto, styling, notifications, translation, templates | **Plugin API (Mac only, stale)** |
| Keyboard shortcuts | Customizable keyboard shortcuts (Mac) | UI-only |
| Touch Bar | Mac Touch Bar integration | UI-only |
| Apple Watch | Voice replies, notification actions, quick glance | UI-only |

## Pricing, limits & plan gates

| Feature | Free | Pro (~$9/mo or ~$49/yr) |
|---|---|---|
| Accounts | 1 | Unlimited |
| Push notifications | No | Yes |
| Custom Actions | No | Yes |
| Send Later | No | Yes |
| Snooze | No | Yes |
| Custom signatures | Limited | Per-account |
| Smart Folders | No | Yes |
| iCloud sync | No | Yes |

All pricing is through the Apple App Store. Prices vary by region. Family Sharing supported. No web app, no team/business plan (Airmail for Business was a separate product with minimal traction).

**Important**: Airmail switched from one-time purchase (~$10) to subscription model. Existing one-time purchasers lost Pro features unless they subscribe. This caused significant user backlash.

## Integrations

Airmail integrates with third-party apps through its action system (not API-level):

**Task managers**: Todoist, OmniFocus, Things, GoodTask, 2Do, Fantastical
**Calendar**: Fantastical, Apple Calendar
**Cloud storage**: Dropbox, OneDrive, Google Drive (for attachments)
**Notes**: Bear, DEVONthink, Evernote
**Read later**: Instapaper, Pocket, Readwise

**Explicitly NOT supported**: Grammarly, Slack, Salesforce, Recall, Boomerang, OneNote, Daylite, Zapier, Make, n8n.

Data flow is one-directional: Airmail → target app (e.g., "Send to Todoist" creates a task). No apps can push data into Airmail.

## Data model

Airmail has no REST API, so there's no formal data model. For AppleScript automation, the key objects are:

```applescript
-- AppleScript object hierarchy (Mac only)
tell application "Airmail 5"
    -- Account objects
    accounts -- list of configured email accounts

    -- Message operations (via scripting dictionary)
    make new outgoing message with properties {
        sender: "user@example.com",
        subject: "Subject line",
        content: "Email body",
        address: "recipient@example.com"
    }
    send theMessage
end tell
```

<!-- Constructed from community documentation — verify against Airmail's actual AppleScript dictionary -->

For Siri Shortcuts, Airmail exposes actions:
- **Send Email**: compose and send with parameters (to, subject, body, account)
- **Open Inbox**: launch Airmail to a specific account's inbox
- **Search**: open Airmail with a search query pre-filled

For URL schemes:
```
airmail://compose?to=user@example.com&subject=Hello&plainBody=Body+text
airmail://search?query=from:client@example.com
```

## Quick-start recipes

### Recipe 1: Send a daily summary email via AppleScript + launchd

**Use case**: Automatically send a templated daily standup email every morning at 9am.

```applescript
-- daily-standup.scpt
tell application "Airmail 5"
    set theDate to (current date) as string
    make new outgoing message with properties {
        sender: "me@example.com",
        subject: "Daily standup — " & theDate,
        content: "What I did yesterday:\n- \n\nWhat I'm doing today:\n- \n\nBlockers:\n- None",
        address: "team@example.com"
    }
    send result
end tell
```

Schedule with launchd:
```xml
<!-- ~/Library/LaunchAgents/com.airmail.standup.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.airmail.standup</string>
    <key>ProgramArguments</key>
    <array>
        <string>osascript</string>
        <string>/Users/you/Scripts/daily-standup.scpt</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
</dict>
</plist>
```

**Gotcha**: Airmail must be running for AppleScript to work. Add `open -a "Airmail 5"` before the osascript call if needed.

### Recipe 2: iOS Shortcut — quick lead capture to CRM

**Use case**: Siri Shortcut that forwards the current email to your CRM intake address with a "Lead" tag.

1. Open iOS Shortcuts app → Create Shortcut
2. Add "Send Email with Airmail" action
3. Set To: `crm-intake@company.com`
4. Set Subject: `[Lead] ` + Ask Each Time (or clipboard)
5. Set Body: Ask Each Time
6. Assign to a back-tap gesture or widget

**Gotcha**: Siri Shortcuts can compose but require user to tap Send (no fully automated send on iOS due to Apple restrictions).

### Recipe 3: URL scheme — compose from a web app or CLI

**Use case**: Open Airmail compose window pre-filled from a terminal command or web link.

```bash
# macOS terminal — open compose window
open "airmail://compose?to=prospect@company.com&subject=Following%20up&plainBody=Hi%2C%20wanted%20to%20follow%20up..."
```

```python
# Python — open Airmail compose on Mac
import subprocess
import urllib.parse

to = "prospect@company.com"
subject = urllib.parse.quote("Following up on our call")
body = urllib.parse.quote("Hi, wanted to check in about the proposal.")
url = f"airmail://compose?to={to}&subject={subject}&plainBody={body}"
subprocess.run(["open", url])
```

**Gotcha**: URL schemes only work when Airmail is installed and set as the default mail client. The `plainBody` parameter uses URL encoding.

## Integration patterns

### AppleScript automation patterns (Mac)

Airmail's AppleScript support enables:
- **Scheduled sending**: Combine with launchd or cron for timed emails
- **Batch operations**: Loop through recipients to send personalized emails
- **Search and extract**: Query inbox for specific emails and process results
- **Integration bridge**: Use AppleScript to read email → pass data to another tool via shell commands

Limitations: No way to read message bodies via AppleScript (can compose and send, but cannot programmatically read inbox contents). For inbox reading, use the email provider's API directly (Gmail API, Microsoft Graph, IMAP).

### Plugin development

The Airmail Plugin Framework (AMPF) is an Objective-C framework on GitHub:
- **Repo**: `github.com/Airmail/AirmailPlugIn-Framework`
- **Language**: Objective-C (no Swift support)
- **APIs**: AMPCrypto, AMPMessageStyle, AMPNotify, AMPTranslate, AMPCustomTemplates, AMPGpg
- **Install path**: `~/Library/Containers/it.bloop.airmail/Data/Library/Application Support/Airmail/General/Plugins`
- **Status**: Stale — last significant commits were years ago. Sample plugins exist for Campaign Monitor, MailChimp, Wunderlist, Todoist.

### Alternative automation approaches

Since Airmail lacks a REST API:
1. **Use the email provider's API directly** — Gmail API, Microsoft Graph, or IMAP libraries can do everything Airmail does, headlessly
2. **Use SaneBox** alongside Airmail — SaneBox filters server-side, works with any client
3. **Use Apple Shortcuts app** — chain Airmail actions with other apps (Reminders, Notes, Slack)
4. **Use Keyboard Maestro or Raycast** — macro tools can automate Airmail's UI on Mac
