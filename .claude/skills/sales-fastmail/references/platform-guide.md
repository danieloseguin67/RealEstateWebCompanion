# Fastmail Platform Reference

## Overview

Fastmail is an independent, privacy-respecting email service founded in 1999 (Melbourne, Australia). No ads, no data mining. Paid-only model. Develops and champions the JMAP open standard (RFC 8620/8621). 20+ years of operation, not owned by any tech giant. Integrated email, calendar, contacts, and file storage.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Email** | Full-featured email with search, snooze, scheduled send, undo send, offline mode, message pinning | JMAP API, IMAP, POP, SMTP, Web UI, mobile apps |
| **Masked Email** | Generate disposable aliases to protect real address. Integrates with 1Password and Bitwarden. | JMAP API (MaskedEmail/get, MaskedEmail/set), UI |
| **Calendar** | Calendar with event tracking, Google Calendar/iCloud sync | CalDAV, UI (JMAP planned) |
| **Contacts** | Contact management with groups | JMAP API, CardDAV, UI |
| **Files** | File storage (10-50 GB depending on plan) | WebDAV, UI |
| **Custom domains** | Use your own domain for email | UI setup, DNS configuration |
| **Spy pixel blocking** | Blocks tracking pixels in received emails | Automatic (UI setting) |
| **Rules & filters** | Server-side email rules for sorting, forwarding, auto-reply | UI, Sieve scripting |
| **VIP notifications** | Only get notified for emails from VIP contacts | UI setting |
| **Import/migration** | Import from Gmail, Outlook, Yahoo, or any IMAP provider | UI wizard |

**Summary: Full JMAP API for mail and contacts. CalDAV/WebDAV for calendar/files. OAuth 2.0 with PKCE. CORS-enabled. Community MCP server available.**

## Pricing, limits & plan gates

> *Prices as of research date (May 2026, EUR). Fastmail raised prices ~40% in late 2025.*

### Individual & Family

| Plan | Price (monthly) | Price (annual) | Storage | Key features |
|---|---|---|---|---|
| Individual | €6/mo | €5/mo | 60 GB (50 mail + 10 files) | Custom domains, Masked Email, scheduled send, snooze, offline |
| Duo | €10/mo | €8/mo | 120 GB (60 per person) | 2 people, shared calendars and address books |
| Family | €14/mo | €11/mo | 360 GB (60 per person) | Up to 6 people, family calendars |

### Business

| Plan | Price (monthly) | Price (annual) | Storage | Key features |
|---|---|---|---|---|
| Basic | €4/user/mo | €3/user/mo | 6 GB (5 mail + 1 files) | Shared email addresses, calendars, company address book |
| Standard | €6/user/mo | €5/user/mo | 60 GB (50 mail + 10 files) | Custom domains, scheduled send, snooze, third-party app support |
| Professional | €10/user/mo | €9/user/mo | 150 GB (100 mail + 50 files) | Email retention archive for legal compliance |

All plans: 30-day free trial, 24/7 support, encryption, spam blocking, offline access, JMAP.

## JMAP API quick-start

### 1. Get an API token

Settings → Privacy & Security → Manage API tokens → Create new token. Select scopes needed.

### 2. Discover your session

```bash
curl -s -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.fastmail.com/jmap/session | python3 -m json.tool
```

Response includes `apiUrl`, `uploadUrl`, `downloadUrl`, account IDs, and capabilities.

### 3. Query emails (find IDs)

```bash
curl -s -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "$(jq -r '.apiUrl' session.json)" \
  -d '{
    "using": ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
    "methodCalls": [
      ["Email/query", {
        "accountId": "ACCOUNT_ID",
        "filter": {"from": "someone@example.com"},
        "sort": [{"property": "receivedAt", "isAscending": false}],
        "limit": 10
      }, "a"]
    ]
  }'
```

### 4. Fetch email details (using result references)

```bash
curl -s -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "$(jq -r '.apiUrl' session.json)" \
  -d '{
    "using": ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
    "methodCalls": [
      ["Email/query", {
        "accountId": "ACCOUNT_ID",
        "filter": {"from": "someone@example.com"},
        "limit": 5
      }, "a"],
      ["Email/get", {
        "accountId": "ACCOUNT_ID",
        "#ids": {"resultOf": "a", "name": "Email/query", "path": "/ids"},
        "properties": ["id", "subject", "from", "receivedAt", "preview"]
      }, "b"]
    ]
  }'
```

### 5. Send an email

```bash
curl -s -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "$API_URL" \
  -d '{
    "using": [
      "urn:ietf:params:jmap:core",
      "urn:ietf:params:jmap:mail",
      "urn:ietf:params:jmap:submission"
    ],
    "methodCalls": [
      ["Email/set", {
        "accountId": "ACCOUNT_ID",
        "create": {
          "draft1": {
            "mailboxIds": {"DRAFTS_MAILBOX_ID": true},
            "from": [{"email": "you@yourdomain.com"}],
            "to": [{"email": "recipient@example.com"}],
            "subject": "Hello from JMAP",
            "textBody": [{"partId": "body", "type": "text/plain"}],
            "bodyValues": {"body": {"value": "This email was sent via the JMAP API."}}
          }
        }
      }, "a"],
      ["EmailSubmission/set", {
        "accountId": "ACCOUNT_ID",
        "create": {
          "sub1": {
            "#emailId": {"resultOf": "a", "name": "Email/set", "path": "/created/draft1/id"},
            "envelope": {
              "mailFrom": {"email": "you@yourdomain.com"},
              "rcptTo": [{"email": "recipient@example.com"}]
            }
          }
        }
      }, "b"]
    ]
  }'
```

### Python example

```python
import requests

TOKEN = "fmu1-your-api-token"
BASE = "https://api.fastmail.com"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

# 1. Get session
session = requests.get(f"{BASE}/jmap/session", headers=HEADERS).json()
api_url = session["apiUrl"]
account_id = session["primaryAccounts"]["urn:ietf:params:jmap:mail"]

# 2. Search emails
resp = requests.post(api_url, headers=HEADERS, json={
    "using": ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
    "methodCalls": [
        ["Email/query", {
            "accountId": account_id,
            "filter": {"text": "invoice"},
            "sort": [{"property": "receivedAt", "isAscending": False}],
            "limit": 10
        }, "a"],
        ["Email/get", {
            "accountId": account_id,
            "#ids": {"resultOf": "a", "name": "Email/query", "path": "/ids"},
            "properties": ["id", "subject", "from", "receivedAt", "preview"]
        }, "b"]
    ]
})
emails = resp.json()["methodResponses"][1][1]["list"]
for e in emails:
    print(f"{e['receivedAt']} — {e['subject']}")
```

## Masked Email

Masked Email creates disposable aliases that forward to your real inbox. Integrated with 1Password and Bitwarden.

### Create via API

```python
resp = requests.post(api_url, headers=HEADERS, json={
    "using": [
        "urn:ietf:params:jmap:core",
        "https://www.fastmail.com/dev/maskedemail"
    ],
    "methodCalls": [
        ["MaskedEmail/set", {
            "accountId": account_id,
            "create": {
                "me1": {
                    "state": "enabled",
                    "forDomain": "example.com",
                    "description": "Shopping site signup",
                    "emailPrefix": "shop"
                }
            }
        }, "a"]
    ]
})
alias = resp.json()["methodResponses"][0][1]["created"]["me1"]
print(f"New alias: {alias['email']}")
```

### Data model

```json
{
  "id": "masked-abc123",
  "email": "shop_xyz@fastmail.com",
  "state": "enabled",
  "forDomain": "example.com",
  "description": "Shopping site signup",
  "url": "",
  "lastMessageAt": "2026-05-01T10:30:00Z",
  "createdAt": "2026-04-15T08:00:00Z",
  "createdBy": "api-token",
  "emailPrefix": "shop"
}
```

States: `pending` → `enabled` → `disabled` → `deleted`. Rate limits apply on creation — returns `rateLimit` SetError.

## MCP server (community)

Repository: `jmhron/FastMailMCP`

### Available tools
1. `configure_fastmail` — set API credentials
2. `list_mailboxes` — all mailboxes with counts and roles
3. `find_mailbox` — locate folder by name or role
4. `get_emails` — retrieve messages from a folder
5. `search_emails` — filter by keyword, sender, subject, date, attachments
6. `get_email_body` — full email content (text or HTML)
7. `send_email` — send with CC/BCC support

### Setup

```bash
# Install
git clone https://github.com/jmhron/FastMailMCP.git
cd FastMailMCP
pip install -r requirements.txt

# Get API token from Fastmail
# Settings → Privacy & Security → Manage API tokens
# Token starts with "fmu1-"
```

Add to Claude Desktop `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "fastmail": {
      "command": "python",
      "args": ["/path/to/FastMailMCP/server.py"],
      "env": {
        "FASTMAIL_API_TOKEN": "fmu1-your-token"
      }
    }
  }
}
```

## Migration from Gmail/Outlook

1. Log into Fastmail → Settings → Migrate
2. Select provider (Gmail, Outlook, Yahoo, or generic IMAP)
3. Authorize access (OAuth for Gmail/Outlook)
4. Select what to import: emails, contacts, calendars
5. Import runs in background — large mailboxes can take hours

**After migration:**
- Set up Gmail forwarding to Fastmail during transition
- Update critical accounts (bank, work) to new address
- Keep Gmail active for 6-12 months to catch stragglers
- DNS: update MX records if using custom domain

## Comparison context

| Feature | Fastmail | Proton Mail | Hey | Gmail |
|---|---|---|---|---|
| E2E encryption | No (TLS + AES at rest) | Yes (zero-access) | No | No |
| API | Full JMAP + IMAP/SMTP | No public API | No public API | Gmail API |
| Custom domains | Yes (all individual plans) | Yes (Mail Plus+) | Yes ($12/user/mo) | Yes (Workspace) |
| AI features | None | None (Lumo nascent) | None (by design) | Gemini integration |
| Price (1 user) | ~$5/mo | ~$4/mo | $99/yr (~$8/mo) | Free / $7/mo Workspace |
| Zapier/Make | No native | No | No | Yes (Gmail) |
| MCP server | Community (FastMailMCP) | No | No | Via Gmail API |
| Masked Email | Yes (1Password/Bitwarden) | Yes (SimpleLogin) | No | No |
| Search quality | Excellent (full-text, instant) | Limited (encryption) | Good (custom) | Excellent |
| Offline | Yes | Limited | No | Yes (Workspace) |

## Affiliate program

Via PartnerStack. $10 per referred paid user. Referred user gets 10% off first year. 90-day cookie, monthly payouts. Also offers reseller program for IT managers managing multiple accounts.

Signup: https://fastmail.partnerstack.com
