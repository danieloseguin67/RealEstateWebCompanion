# Proton Mail Platform Reference

## Overview

Proton Mail is a privacy-first encrypted email service based in Switzerland (Plan-les-Ouates, Geneva). End-to-end encryption and zero-access architecture mean Proton cannot read your emails. 100M+ users, 50K+ businesses. Open-source clients, independently audited. Part of the Proton ecosystem (Calendar, Drive, VPN, Pass, Wallet).

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Email (encrypted)** | Send/receive E2E-encrypted email. Password-protected emails to non-Proton users with expiration. | UI-only (web, mobile, desktop via Bridge) |
| **Hide-my-Email aliases** | Generate disposable email aliases to protect real address. 10 on Plus, unlimited on Unlimited. Powered by SimpleLogin (acquired by Proton). | UI-only |
| **Proton Mail Bridge** | Local app that provides IMAP/SMTP access for desktop clients (Thunderbird, Apple Mail, classic Outlook). Decrypts on-device. | IMAP/SMTP — Mail Plus+ only |
| **Easy Switch** | One-time import of emails, contacts, calendars from Gmail, Outlook, Yahoo, or any IMAP provider. | UI-only |
| **Scheduled send** | Schedule emails for future delivery. | UI-only |
| **Undo send** | Recall sent emails within a configurable window. | UI-only |
| **Snooze** | Snooze emails to reappear later. | UI-only |
| **PhishGuard** | Flags known phishing attempts, shows link confirmation dialogs. | UI-only |
| **Email tracker blocking** | Blocks spy pixels and tracking URLs in received emails. | UI-only |
| **Proton Calendar** | Encrypted calendar with event scheduling. 3 calendars (Free), 25 (paid). | UI-only |
| **Proton Drive** | Encrypted cloud storage. 5 GB free, shared with mail storage on paid plans. | UI-only |
| **Proton VPN** | VPN service. 1 connection/10 countries (Free), 10 connections/120+ countries (Unlimited). | UI-only |
| **Proton Pass** | Password manager. 2 vaults/10 aliases (Free), 50 vaults/unlimited aliases (Unlimited). | UI-only |
| **Lumo AI** | Privacy-first AI assistant (newer feature, limited details available). | UI-only |
| **Folders & labels** | Organize email. Unlimited on paid plans. | UI-only |

**Summary: Everything is UI-only. No public API, no webhooks, no Zapier/Make/n8n, no MCP server.** The only programmatic interface is IMAP/SMTP through Bridge on paid plans.

## Pricing, limits & plan gates

All prices in EUR, billed annually:

| Plan | Monthly (annual) | Storage | Addresses | Custom Domains | Key limits |
|---|---|---|---|---|---|
| **Free** | €0 | 1 GB | 1 | 0 | 150 msgs/day, 3 calendars, basic search |
| **Mail Plus** | €3.99/mo | 15 GB | 10 | 1 | Bridge access, unlimited folders/labels, 10 aliases |
| **Unlimited** | €9.99/mo | 500 GB | 15 | 3 | Full VPN (10 devices), Drive, Pass, 50 vaults, unlimited aliases |
| **Duo** (2 users) | €14.99/mo | 2 TB shared | 30 | 3 | Everything in Unlimited for 2 users |
| **Family** (6 users) | €23.99/mo | 3 TB shared | 90 | 3 | Everything for 6 users |
| **Visionary** (6 users) | €29.99/mo | 6 TB shared | 100 | 10 | All new services included, 50 wallets |

**Monthly billing available** at higher rates (e.g., Mail Plus €4.99/mo monthly vs €3.99/mo annual).

### Business plans

| Plan | Per user/mo (annual) | Storage | Key features |
|---|---|---|---|
| **Mail Essentials** | ~€6.99 | 15 GB/user | Custom domain, catch-all, multi-user, priority support |
| **Workspace Standard** | ~€12.99 | Varies | Mail + Calendar + Drive for teams |
| **Workspace Premium** | ~€19.99 | Larger | Full suite with advanced admin controls |

### Plan-gated features (developer-relevant)

- **Bridge (IMAP/SMTP)**: Mail Plus+ only. Free users cannot use desktop clients.
- **Custom domains**: Mail Plus (1), Unlimited (3), Visionary (10). Free = none.
- **Hide-my-Email aliases**: 10 on Plus, unlimited on Unlimited+.
- **Search message content**: Available on paid plans with local index building.

## Integrations

**Native integrations: None.** Proton is deliberately isolated for privacy.

**Workarounds:**
- **IMAP/SMTP via Bridge**: Connect to Thunderbird, Apple Mail, classic Outlook, eM Client. Bridge decrypts locally. Ports: IMAP 1143, SMTP 1025, STARTTLS.
- **Forwarding rules**: Forward copies of emails from Proton to another provider connected to your CRM/automation tools. Loses E2E encryption once forwarded.
- **SaneBox**: Works with Proton Mail — SaneBox processes email server-side before Proton's encryption (works on the IMAP layer via Bridge).
- **Clean Email**: Works with Proton via IMAP through Bridge on paid plans.

**Not supported:** Zapier, Make, n8n, Pipedream, IFTTT, any iPaaS. No Zapier triggers, no actions, no webhooks.

## Data model

No public API means no formal data model. For reference, the community Go library (`github.com/ProtonMail/go-proton-api`) implements these internal objects:

<!-- Constructed from open-source Go library — these are internal objects, not a public API contract -->

```json
// Message object (internal)
{
  "ID": "abc123...",
  "Subject": "Meeting tomorrow",
  "Sender": {"Address": "alice@proton.me", "Name": "Alice"},
  "ToList": [{"Address": "bob@example.com", "Name": "Bob"}],
  "Time": 1714834800,
  "NumAttachments": 1,
  "Flags": 1,
  "LabelIDs": ["0", "5"],
  "Body": "-----BEGIN PGP MESSAGE-----\n..."
}
```

```json
// Label object (internal)
{
  "ID": "custom-label-id",
  "Name": "Clients",
  "Color": "#7272a7",
  "Type": 1,
  "Path": "Clients"
}
```

**Note:** Message bodies are PGP-encrypted. Decryption requires the user's private key, which is only available client-side. This is why server-side search and API access are fundamentally limited.

## Quick-start recipes

Since Proton has no public API, these recipes use Bridge IMAP/SMTP for the limited automation that IS possible.

### Recipe 1: Send email via Proton Mail Bridge (Python)

**Use case:** Send automated emails from your Proton address using a script.

**Prerequisites:** Mail Plus+ plan, Bridge running, Bridge-generated app password.

```python
import smtplib
from email.mime.text import MIMEText

# Bridge SMTP settings
SMTP_HOST = "127.0.0.1"
SMTP_PORT = 1025
# Use the password from Bridge > Account > Mailbox password (NOT your Proton password)
USERNAME = "your-email@proton.me"
PASSWORD = "bridge-generated-password"

msg = MIMEText("Hello from Proton Mail via Bridge!")
msg["Subject"] = "Test from automation"
msg["From"] = USERNAME
msg["To"] = "recipient@example.com"

with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
    server.starttls()
    server.login(USERNAME, PASSWORD)
    server.send_message(msg)
    print("Sent successfully")
```

**Gotchas:**
- Bridge must be running on the same machine
- Use the Bridge-generated password, not your Proton account password
- STARTTLS on port 1025, not SSL/TLS
- Rate limits apply (Proton may throttle high-volume sending)

### Recipe 2: Fetch unread emails via Bridge IMAP (Python)

**Use case:** Monitor Proton inbox from a script (e.g., process incoming orders).

```python
import imaplib

IMAP_HOST = "127.0.0.1"
IMAP_PORT = 1143
USERNAME = "your-email@proton.me"
PASSWORD = "bridge-generated-password"

mail = imaplib.IMAP4(IMAP_HOST, IMAP_PORT)
mail.starttls()
mail.login(USERNAME, PASSWORD)
mail.select("INBOX")

status, messages = mail.search(None, "UNSEEN")
unread_ids = messages[0].split()
print(f"Unread emails: {len(unread_ids)}")

for uid in unread_ids[:5]:  # Process first 5
    status, data = mail.fetch(uid, "(RFC822)")
    raw_email = data[0][1]
    print(f"Email {uid}: {len(raw_email)} bytes")

mail.logout()
```

**Gotchas:**
- IMAP4 (not IMAP4_SSL) with STARTTLS on port 1143
- Bridge decrypts messages locally before serving via IMAP
- Large mailboxes may take time to sync on first connection

### Recipe 3: Forward Proton emails to a webhook (workaround)

**Use case:** Get Proton emails into your CRM or automation tool despite no native integrations.

**Architecture:** Proton → Bridge IMAP → Python poller → webhook POST

```python
import imaplib
import email
import requests
import time
import json

IMAP_HOST = "127.0.0.1"
IMAP_PORT = 1143
USERNAME = "your-email@proton.me"
PASSWORD = "bridge-generated-password"
WEBHOOK_URL = "https://your-webhook-endpoint.com/incoming"

def poll_and_forward():
    mail = imaplib.IMAP4(IMAP_HOST, IMAP_PORT)
    mail.starttls()
    mail.login(USERNAME, PASSWORD)
    mail.select("INBOX")

    status, messages = mail.search(None, "UNSEEN")
    for uid in messages[0].split():
        status, data = mail.fetch(uid, "(RFC822)")
        msg = email.message_from_bytes(data[0][1])
        payload = {
            "from": msg["From"],
            "to": msg["To"],
            "subject": msg["Subject"],
            "date": msg["Date"],
            "body": msg.get_payload(decode=True).decode("utf-8", errors="replace")
            if not msg.is_multipart()
            else "multipart — parse separately",
        }
        requests.post(WEBHOOK_URL, json=payload)
        print(f"Forwarded: {msg['Subject']}")
    mail.logout()

# Poll every 60 seconds
while True:
    poll_and_forward()
    time.sleep(60)
```

**Gotchas:**
- This breaks E2E encryption — decrypted content leaves your machine via webhook
- Bridge must be running continuously on a machine you control
- Not a replacement for native webhooks — it's polling, not push
- Consider running as a systemd service or cron job for reliability

## Integration patterns

### Desktop client setup via Bridge

1. Install Proton Mail Bridge from proton.me/mail/bridge
2. Sign in with your Proton account
3. Bridge generates a unique mailbox password — use THIS in your email client
4. Configure email client:
   - IMAP: `127.0.0.1:1143` with STARTTLS
   - SMTP: `127.0.0.1:1025` with STARTTLS
   - Username: your full Proton email address
   - Password: Bridge-generated password

**Compatible clients:** Thunderbird, Apple Mail, classic Outlook (not "new" Outlook), eM Client, Evolution, KMail.

**Incompatible:** New Outlook for Windows, most mobile apps (use Proton's mobile app instead).

### Migration from Gmail

1. Log into Proton web app → Settings → Import via Easy Switch
2. Connect Gmail via OAuth (read-only access)
3. Choose what to import: emails, contacts, calendars
4. Import runs server-side — large mailboxes may take hours/days
5. Set up Gmail forwarding to Proton for the transition period
6. Update accounts that use your Gmail address

**Warning:** Easy Switch is a one-time import. New Gmail emails after import are NOT synced. Set up forwarding separately.

## Proton Mail vs competitors (quick reference)

| Feature | Proton Mail | Tuta | Fastmail | Hey |
|---|---|---|---|---|
| E2E encryption | Yes (PGP-based) | Yes (AES/RSA, quantum-safe) | No (TLS in transit only) | No |
| Subject line encryption | No | Yes | No | No |
| API | No public API | No public API | JMAP API (full) | No API |
| IMAP access | Via Bridge (paid) | No | Native IMAP | No |
| Search quality | Limited (encrypted) | Limited (encrypted) | Excellent | Basic |
| AI features | Lumo (nascent) | None | None | None (anti-AI) |
| Free tier | 1 GB / 1 address | 1 GB / 1 address | None | None |
| Custom domain | $4/mo+ | $3/mo+ | $5/mo+ | $12/user/mo |
| Zapier/Make | No | No | Fastmail has limited | No |
| Mobile apps | Yes (all platforms) | Yes (all platforms) | Yes (all platforms) | Yes (all platforms) |
| Open source | Yes (clients) | Yes (clients) | No | No |
