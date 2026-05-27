# eM Client Platform Reference

## Overview

eM Client is a cross-platform desktop email client that positions itself as a full replacement for Microsoft Outlook and Mozilla Thunderbird. Built by a Czech company (eM Client s.r.o., formerly IC Solutions), it offers unified email, calendar, tasks, contacts, notes, and chat in a single app. Works with virtually any email provider via IMAP/SMTP, Exchange/EWS, and Google APIs. 4M+ users across 100K+ businesses.

Primary differentiator: One-time purchase option (no subscription required), native PGP/S/MIME encryption, and full-featured free tier for non-commercial use.

## Capabilities & automation surface

| Capability | Details | Automation surface |
|---|---|---|
| **Email management** | Multi-account unified inbox, conversations/thread view, snooze, send later, undo send, mass mail, email notes, attachments view, quick actions | **UI-only** — no API, webhooks, or iPaaS |
| **Calendar** | CalDAV (Google), EWS (Exchange), iCal. Event creation, recurring events, reminders, timezone handling | **UI-only** |
| **Tasks** | Google Tasks sync (basic, no subtasks), Exchange tasks, local tasks | **UI-only** |
| **Contacts** | CardDAV, Exchange, Google Contacts, LDAP directory. Contact management, groups, deduplication | **UI-only** |
| **Notes** | Local notes, not synced to external services | **UI-only** |
| **Chat** | Teams, Slack, Rocket.Chat integration (Personal+ plans) | **UI-only** |
| **PGP encryption** | Generate/import PGP keys, encrypt/decrypt/sign emails. Available on all plans including free | **UI-only** |
| **S/MIME encryption** | Certificate-based encryption and signing | **UI-only** |
| **AI assistant** | AI-powered writing suggestions, email composition help (Personal+ plans, powered by ChatGPT) | **UI-only** |
| **Message translation** | Automatic translation of incoming emails (Personal+ plans) | **UI-only** |
| **Tracking pixel blocking** | Blocks remote tracking images in emails (Personal+ plans) | **UI-only** |
| **Inbox categories** | Gmail-style inbox categories (Personal+ plans) | **UI-only** |
| **Rules/filters** | Email rules for auto-sorting, moving, flagging | **UI-only** — rules engine is local, not scriptable |
| **Import/export** | Import from Outlook (PST), Thunderbird, Apple Mail. Export to EML/ICS/VCF | **UI-only** |
| **Backup** | Built-in backup/restore of all data | **UI-only** |
| **Deduplicator** | Find and remove duplicate contacts, events, and emails | **UI-only** |

**No public API.** Users have repeatedly requested API/SDK access on the forum and Sleekplan, but eM Client has not announced plans for one. The only programmatic workaround is interacting with the underlying email account via IMAP/SMTP directly (bypassing eM Client entirely).

## Pricing, limits & plan gates

All prices in EUR. USD prices on the website are approximate conversions.

| Feature | Free | Personal (€29.95/yr or €39.95 one-time) | Business (€39.95/device/yr or €54.95 one-time) |
|---|---|---|---|
| Email accounts | 2 | Unlimited | Unlimited |
| Commercial use | No | Individual only | Yes |
| Devices | 1 | 3 | Per-device license |
| Support | Forum only | VIP Support | VIP Support |
| Thread view | No | Yes | Yes |
| Snooze / Send later / Undo send | No | Yes | Yes |
| Mass mail | No | Yes | Yes |
| AI assistant | No | Yes | Yes |
| Message translation | No | Yes | Yes |
| Tracking pixel blocking | No | Yes | Yes |
| Gmail inbox categories | No | Yes | Yes |
| Teams/Slack/Rocket.Chat | No | Yes | Yes |
| Quick actions | No | Yes | Yes |
| Email notes | No | Yes | Yes |
| Notes module | No | Yes | Yes |
| License manager | No | No | Yes |
| PGP / S/MIME encryption | Yes | Yes | Yes |
| Calendar / Tasks / Contacts | Yes | Yes | Yes |
| Email rules | Yes | Yes | Yes |
| Backup / Deduplicator | Yes | Yes | Yes |

**One-time vs subscription:** One-time purchase includes lifetime upgrades within the purchased major version. Upgrading to a new major version (e.g., v9 to v10) requires a new purchase. Subscription always includes the latest version.

**NGO/education discount:** 30% off for schools, universities, and NGOs.

**Mobile apps:** Android and iOS apps are free for all users regardless of license tier.

**30-day free trial** of all paid features. 30-day money-back guarantee on purchases.

## Integrations

eM Client has **no API, no webhooks, and no iPaaS (Zapier/Make) support.** Integration is limited to:

| Integration type | Details |
|---|---|
| **Email protocols** | IMAP/SMTP, Exchange (EWS/ActiveSync), Google API, CalDAV/CardDAV |
| **Chat** | Microsoft Teams, Slack, Rocket.Chat (Personal+ plans) |
| **Online meetings** | Zoom, Google Meet, Microsoft Teams links in calendar events |
| **Cloud storage** | OneDrive, Google Drive attachment links |
| **Directory** | LDAP for corporate contact directories |
| **Import sources** | Microsoft Outlook (PST), Thunderbird, Apple Mail, CSV contacts, ICS calendar |

**Workaround for automation:** Since eM Client has no API, automation must happen at the email provider level. Use Gmail API, Microsoft Graph API, or IMAP directly to read/write emails that eM Client will then display.

## Data model

eM Client stores data in a local SQLite database. Key objects:

**Email message** (synced from server via IMAP/EWS/Google API):
```
<!-- Constructed from docs — verify against live data -->
- Account (email address, provider type, server settings)
- Folder (Inbox, Sent, Drafts, custom folders)
- Message (subject, from, to, cc, bcc, date, body, attachments, flags, tags)
- Conversation (thread grouping by subject/references header)
```

**Calendar event** (synced via CalDAV/EWS):
```
- Calendar (name, account, color)
- Event (title, start, end, location, recurrence, reminders, attendees)
```

**Contact** (synced via CardDAV/EWS/Google):
```
- Contact group (address book, account)
- Contact (name, emails, phones, addresses, company, notes, photo)
```

**Task** (synced via Google Tasks/EWS):
```
- Task list (name, account)
- Task (title, due date, priority, status, notes)
```

No JSON API exists — these objects are only accessible through the eM Client UI or the underlying email provider's API.

## Quick-start recipes

Since eM Client has no API, these recipes use the underlying email provider's API (Gmail/Microsoft Graph) for automation, with eM Client as the display layer.

### Recipe 1: Auto-tag emails in Gmail that eM Client displays

**Use case:** You want to auto-label incoming emails by sender domain so eM Client shows them organized.

**Approach:** Use Gmail API to apply labels that eM Client syncs.

```bash
# Create a Gmail label
curl -X POST "https://gmail.googleapis.com/gmail/v1/users/me/labels" \
  -H "Authorization: Bearer $GMAIL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "VIP-Clients", "labelListVisibility": "labelShow", "messageListVisibility": "show"}'
```

```python
# Apply label to messages matching a query
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

creds = Credentials.from_authorized_user_file("token.json")
service = build("gmail", "v1", credentials=creds)

# Find emails from specific domain
results = service.users().messages().list(
    userId="me", q="from:@importantclient.com"
).execute()

label_id = "Label_123"  # from label creation response
for msg in results.get("messages", []):
    service.users().messages().modify(
        userId="me", id=msg["id"],
        body={"addLabelIds": [label_id]}
    ).execute()
```

**In eM Client:** The "VIP-Clients" label appears as a folder. Emails auto-organize as the Gmail API applies labels.

### Recipe 2: Bulk export contacts from eM Client for CRM import

**Use case:** Export contacts from eM Client to import into a CRM like Attio or HubSpot.

1. In eM Client: go to Contacts → select all → Menu → File → Export → CSV
2. Map fields: eM Client exports First Name, Last Name, Email, Phone, Company, Notes
3. Import the CSV into your CRM

```python
# Clean and prepare eM Client CSV export for CRM import
import csv

with open("emclient_contacts.csv") as f:
    reader = csv.DictReader(f)
    contacts = []
    for row in reader:
        if row.get("E-mail Address"):
            contacts.append({
                "name": f"{row.get('First Name', '')} {row.get('Last Name', '')}".strip(),
                "email": row["E-mail Address"],
                "company": row.get("Company", ""),
                "phone": row.get("Business Phone", row.get("Mobile Phone", ""))
            })

# Now upload to CRM via its API
```

### Recipe 3: Monitor eM Client email via IMAP for automation

**Use case:** Trigger actions when specific emails arrive (since eM Client has no webhooks).

```python
# Poll IMAP for new emails that eM Client also displays
import imaplib
import email

mail = imaplib.IMAP4_SSL("imap.gmail.com")
mail.login("you@gmail.com", "app-password")
mail.select("INBOX")

# Search for unseen emails from a specific sender
status, data = mail.search(None, '(UNSEEN FROM "client@example.com")')
for num in data[0].split():
    status, msg_data = mail.fetch(num, "(RFC822)")
    msg = email.message_from_bytes(msg_data[0][1])
    print(f"New email: {msg['subject']}")
    # Trigger your automation here
```

**Gotcha:** Both eM Client and your IMAP script see the same mailbox. If your script marks emails as read, eM Client will also show them as read.

## Integration patterns

### Migration from Outlook
1. Export Outlook data as PST: File → Open & Export → Import/Export → Export to a file → Outlook Data File (.pst)
2. In eM Client: Menu → File → Import → Microsoft Outlook → select PST file
3. eM Client imports all emails, calendar events, contacts, and tasks
4. For Exchange accounts: just add the Exchange account in eM Client — data syncs from server

### Migration from Thunderbird
1. In eM Client: Menu → File → Import → Mozilla Thunderbird
2. eM Client detects Thunderbird's profile automatically
3. Imports all emails, contacts, and account settings
4. Calendar: export from Thunderbird as ICS, import in eM Client

### Multi-device setup
- Windows/Mac: install eM Client, add accounts. Each device syncs from the server independently.
- Mobile (Android/iOS): free apps, same account credentials. All devices stay in sync via the email server.
- eM Client does NOT have its own sync service — sync happens at the email provider level (Gmail, Exchange, IMAP).
