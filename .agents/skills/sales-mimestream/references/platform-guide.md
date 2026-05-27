# Mimestream Platform Reference

## Overview

Native macOS email client built exclusively for Gmail by Neil Jhaveri (former Apple Mail engineer, 7+ years at Apple). Uses the Gmail API directly — not IMAP — for native label, category, alias, and search support. Privacy-focused: tokens stored in macOS Keychain, no intermediary sync servers, tracking prevention blocks 75+ services. Mac-only, Gmail-only, no AI features.

## Capabilities & automation surface

| Capability | Description | Surface |
|---|---|---|
| Gmail label management | Full label support with color-coding and visibility settings | UI-only |
| Gmail categories | Inbox Categories (Primary, Social, Promotions, Updates, Forums) | UI-only |
| Server-side Gmail filters | Create and manage Gmail filters from within Mimestream | UI-only |
| Gmail search | Full Gmail search operators via the Gmail API | UI-only |
| Multi-account unified inbox | Multiple Gmail/Workspace accounts in one view | UI-only |
| Email templates | Customizable templates with variable placeholders | UI-only |
| Markdown compose | Markdown formatting and code blocks in email body | UI-only |
| Mentions | @mention contacts within emails | UI-only |
| Snooze | Schedule emails to reappear at a later time (Labs feature) | UI-only |
| Undo Send | Recall sent email within configurable window (Cmd+Z) | UI-only |
| Send and Archive | Single action to send reply and archive thread (Shift+Cmd+Return) | UI-only |
| Tracking Prevention | Blocks tracking pixels from 75+ services | UI-only |
| Calendar invitations | Respond to calendar invites (Google Calendar + Apple Calendar) | UI-only |
| Vacation responder | Configure Gmail vacation auto-reply | UI-only |
| Aliases | Compose and send from Gmail aliases | UI-only |
| Dark mode reformatting | Reformats HTML emails for readability in dark mode | UI-only |
| Focus Filters | macOS Focus Mode integration for distraction management | UI-only |
| Multiple windows | Open threads/compose in separate windows | UI-only |
| Menu bar extra | Quick access from macOS menu bar | UI-only |
| Image markup | Annotate images inline using macOS Markup | UI-only |
| Continuity Camera | Insert photos from iPhone camera directly | UI-only |

**No public API. No webhooks. No Zapier. No Make. No MCP server. No programmatic interface.**

The only automation surface is macOS Accessibility API (for scripting tools like Hammerspoon or Keyboard Maestro) and potentially AppleScript if supported — but Mimestream does not document AppleScript support.

## Pricing, limits & plan gates

| Plan | Price | What's included |
|---|---|---|
| Free trial | 14 days, no credit card | Full functionality |
| Individual | $49.99/yr or $4.99/mo | All features, family sharing (household), up to 5 devices |
| Group | $49.99/seat/yr or $4.99/seat/mo | All Individual features + centralized billing, 2-50 seats |
| Enterprise | Contact sales@mimestream.com | Quantities above 10,000 |

- **No free tier** — trial only
- **Not on the Mac App Store** — direct download only
- **30-day refund** on annual plans; monthly plans non-refundable but cancellable anytime
- **No education discount** documented
- All features available on all paid plans — no plan-gated features beyond the Individual/Group split

## Integrations

Mimestream has minimal integration surface:

- **Google Calendar**: Respond to calendar invitations, view event details
- **Apple Calendar**: Alternative calendar for invitation responses
- **macOS system**: Notifications, Focus Filters, Continuity Camera, Share Sheet, Markup
- **Hookmark**: Deep linking support for reference management

No CRM connectors. No Zapier triggers/actions. No Make modules. No webhooks. No iPaaS integration of any kind.

**Workaround for automation**: Since Mimestream uses the Gmail API, any automation you need can be built directly against the Gmail API itself (not through Mimestream). Mimestream is a read/write client — changes made via the Gmail API are reflected in Mimestream automatically.

## Data model

Mimestream mirrors Gmail's data model:

```json
// Gmail Thread (as seen in Mimestream)
{
  "thread_id": "18f2a3b4c5d6e7f8",
  "subject": "Q2 pipeline review",
  "labels": ["INBOX", "IMPORTANT", "Label_42"],
  "categories": ["primary"],
  "messages": [
    {
      "message_id": "18f2a3b4c5d6e7f8",
      "from": "alice@example.com",
      "to": ["bob@example.com"],
      "date": "2026-05-01T10:30:00Z",
      "snippet": "Let's review the pipeline numbers...",
      "is_read": true,
      "is_starred": false,
      "attachments": [
        {"filename": "pipeline.xlsx", "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "size": 45678}
      ]
    }
  ]
}
```
<!-- Constructed from Gmail API docs — Mimestream mirrors this model but has no API of its own -->

Local storage: SQLite database in `~/Library/Containers/com.mimestream.Mimestream`. OAuth tokens in macOS Keychain.

## Privacy & security model

This is Mimestream's primary differentiator — worth understanding in detail:

- **No intermediary servers**: OAuth 2.0 tokens go directly from your device to Google. Mimestream servers never see your email, credentials, or tokens.
- **Token storage**: OAuth refresh tokens stored in macOS Keychain (system password required for access)
- **Local data**: Email metadata cached in local SQLite database within app sandbox. Attachments stored locally on filesystem. Enable FileVault for disk encryption.
- **Push notifications**: Two options:
  - **IMAP IDLE**: Direct connection to Gmail, no intermediary. More immediate but uses more battery.
  - **Private Push** (Labs): Uses Google Cloud Pub/Sub. Mimestream receives only opaque history IDs — not email content. Does not require storing OAuth credentials on Mimestream servers.
- **Tracking Prevention**: Blocks tracking pixels from 75+ known services. Proxies remote images to prevent IP/location leakage.
- **Logging**: On-device only. Logs API method names, email address, server identifiers. Does NOT log subjects, senders, or body content.
- **License activation**: Mimestream servers receive: email address, hashed account addresses, device info, OS/app versions. Nothing else.
- **Compliance**: Google API Services User Data Policy, Apple App Sandbox

## Keyboard shortcuts

Mimestream supports configurable keyboard shortcut sets. Key defaults:

| Action | Shortcut |
|---|---|
| Undo Send | Cmd+Z (after sending) |
| Send and Archive | Shift+Cmd+Return |
| Archive | Backspace or E |
| Star/Unstar | S |
| Snooze | H |
| Reply | R |
| Reply All | A |
| Forward | F |
| Compose | C or Cmd+N |
| Search | / or Cmd+F |
| Go to Inbox | G then I |
| Mark read/unread | Shift+I / Shift+U |

## Multi-account setup

1. **Add accounts**: Settings → Accounts → "+" button → Sign in with Google (OAuth 2.0)
2. **Per-account customization**:
   - Account color (sidebar visual identifier)
   - Notification schedule (e.g., work account 9am-6pm only)
   - Default signature per account
   - Send from aliases
3. **Unified Inbox**: Combines all accounts into one stream. Toggle via sidebar.
4. **Focus Filters**: Tied to macOS Focus modes — e.g., "Work" Focus shows only work accounts, silences personal.

## Quick-start recipes

Since Mimestream has no API, these recipes use the Gmail API directly. Changes made via the Gmail API are reflected in Mimestream automatically.

### Recipe 1: Auto-label incoming emails by sender domain (Gmail API)

Use case: Automatically label emails from key clients so they're organized when you open Mimestream.

```bash
# Create a Gmail filter via the API
curl -X POST "https://gmail.googleapis.com/gmail/v1/users/me/settings/filters" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "criteria": {
      "from": "@bigclient.com"
    },
    "action": {
      "addLabelIds": ["Label_42"],
      "removeLabelIds": ["INBOX"]
    }
  }'
```

```python
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

creds = Credentials.from_authorized_user_file("token.json")
service = build("gmail", "v1", credentials=creds)

filter_body = {
    "criteria": {"from": "@bigclient.com"},
    "action": {
        "addLabelIds": ["Label_42"],
        "removeLabelIds": ["INBOX"]
    }
}
service.users().settings().filters().create(
    userId="me", body=filter_body
).execute()
```

**Gotcha**: Label IDs (like `Label_42`) are opaque — list labels first with `GET /users/me/labels` to find the right ID.

### Recipe 2: Export starred emails to a CRM (Gmail API + webhook)

Use case: Push starred emails (your "hot leads" in Mimestream) to a CRM.

```python
import requests
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

creds = Credentials.from_authorized_user_file("token.json")
service = build("gmail", "v1", credentials=creds)

# List starred messages
results = service.users().messages().list(
    userId="me", q="is:starred", maxResults=50
).execute()

for msg_meta in results.get("messages", []):
    msg = service.users().messages().get(
        userId="me", id=msg_meta["id"], format="metadata",
        metadataHeaders=["From", "Subject", "Date"]
    ).execute()

    headers = {h["name"]: h["value"] for h in msg["payload"]["headers"]}

    # Push to CRM webhook
    requests.post("https://your-crm.com/api/leads", json={
        "email": headers.get("From"),
        "subject": headers.get("Subject"),
        "date": headers.get("Date"),
        "gmail_id": msg["id"]
    })
```

**Gotcha**: Gmail API pagination uses `nextPageToken` — loop until it's absent for complete exports.

### Recipe 3: Monitor inbox with Gmail API push notifications

Use case: Get real-time notifications when new emails arrive, triggering external workflows.

```python
# Set up Gmail push notifications via Pub/Sub
from googleapiclient.discovery import build

service = build("gmail", "v1", credentials=creds)

watch_request = {
    "topicName": "projects/your-project/topics/gmail-notifications",
    "labelIds": ["INBOX"]
}

response = service.users().watch(userId="me", body=watch_request).execute()
print(f"Watch expires: {response['expiration']}")
# Must renew before expiration (typically 7 days)
```

**Gotcha**: Watch must be renewed before `expiration` timestamp. Set up a cron job to renew every 6 days. Pub/Sub sends a notification with `historyId` — you then call `history.list()` to get actual changes.

## Integration patterns

Since Mimestream has no API, all programmatic integration goes through the **Gmail API** directly:

- **Gmail API**: Full REST API at `gmail.googleapis.com/gmail/v1`
  - OAuth 2.0 for auth
  - Scopes: `gmail.readonly`, `gmail.modify`, `gmail.send`, `gmail.labels`, `gmail.settings.basic`
  - Rate limits: 250 quota units/sec/user, varies by endpoint
  - Pub/Sub for push notifications
- **Google Apps Script**: Server-side automation for Gmail (filters, auto-replies, label management)
- **Changes sync bidirectionally**: Anything done via the Gmail API appears in Mimestream within seconds (next sync cycle)

The key insight: Mimestream is a presentation layer over Gmail. Automate at the Gmail layer, and Mimestream reflects the results.
