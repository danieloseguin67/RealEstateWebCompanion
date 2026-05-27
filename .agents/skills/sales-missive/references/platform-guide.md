# Missive Platform Reference

## Overview

Missive is a collaborative team inbox that merges email (Gmail, Outlook, Office 365, iCloud, IMAP), SMS, WhatsApp, Instagram, Messenger, and live chat into a shared workspace. Differentiator: internal threads and collaborative drafting let teams discuss and co-write emails before sending — no forwarding or CC chains. 5,000+ companies use it. Rated 4.7-4.9 across G2 (775 reviews), Capterra (138), Trustpilot (155).

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Team inboxes | Shared email accounts (support@, sales@) visible to the team | UI + API |
| Internal threads | Behind-the-scenes comments on any conversation | UI + API (comments endpoint) |
| Collaborative drafting | Multiple team members edit the same email draft simultaneously | UI only |
| Task management | Convert emails to tasks, assign, set due dates, track status | UI + API |
| Auto-assignment | Round-robin or rule-based assignment to team members | UI (rules) |
| Workload balancing | See each agent's capacity and conversation count | UI only |
| Rules & automations | If-then rules triggered by email events (up to 1,000 on Productive) | UI + webhooks |
| Canned responses | Pre-saved reply templates with variables | UI + API (responses endpoint) |
| Managed signatures | Centrally managed email signatures per team | UI only |
| Calendar integration | View and manage calendars alongside conversations | UI only |
| Contact management | Contact books, groups/organizations, custom fields | UI + API |
| Analytics & reporting | Team performance metrics, response times | UI + API (analytics endpoint) |
| AI assistance | AI-powered editing, requires user's own API keys (OpenAI, etc.) | UI only (BYOK) |
| Live chat | Website chat widget for real-time conversations | UI only |
| SMS/WhatsApp/Instagram/Messenger | Multi-channel inbox alongside email | UI + API (messages endpoint for custom channels) |

## Pricing, limits & plan gates

| Feature | Starter ($14/user/mo) | Productive ($24/user/mo) | Business ($36/user/mo) |
|---|---|---|---|
| Max users | 5 | 50 | Unlimited |
| Team inboxes | Yes | Yes | Yes |
| Shared email/SMS/social | Yes | Yes | Yes |
| Internal threads | Yes | Yes | Yes |
| Collaborative drafting | Yes | Yes | Yes |
| Integrations | No | Yes | Yes |
| Rules & automations | No | Yes (up to 1,000) | Yes |
| API access | No | Yes | Yes |
| Webhooks | No | Yes | Yes |
| Analytics | No | Basic | Advanced |
| SAML/SSO | No | No | Yes |
| IP restriction | No | No | Yes |
| Personalized onboarding | No | No | Yes |

Annual billing gets 20% off. No permanent free plan — 30-day trial only. AI features require your own API keys on any plan.

## Integrations

**Native channels**: Gmail, Outlook.com, Office 365, iCloud, any IMAP provider, SMS, WhatsApp, Instagram, Messenger, live chat

**iPaaS**:
- **Zapier**: Triggers (new message, new comment, conversation assigned) + Actions (create draft, create task, add label). Productive+ plan required.
- **Make**: Full module set for conversations, messages, drafts. Productive+ plan required.
- **n8n**: Community nodes for Missive webhook + REST API integration.

**Native integrations** (Productive+): Google Workspace, Salesforce, HubSpot, Shopify, Asana, Trello, Slack, and 25+ more.

**Data flow**: Missive is primarily a hub — it reads from email providers and messaging channels, allows team collaboration, and can push events outbound via webhooks or Zapier triggers.

## Data model

### Conversation
<!-- Source: https://missiveapp.com/docs/developers/rest-api/endpoints -->
```json
{
  "conversations": {
    "id": "a1b2c3d4-...",
    "subject": "Re: Your order #1234",
    "latest_message_subject": "Re: Your order #1234",
    "messages_count": 5,
    "team": { "id": "team-id", "name": "Support" },
    "assignees": [{ "id": "user-id", "name": "Jane" }],
    "labels": [{ "id": "label-id", "name": "VIP" }],
    "created_at": 1714000000,
    "updated_at": 1714100000,
    "color": null,
    "closed": false,
    "snoozed_until": null,
    "web_url": "https://mail.missiveapp.com/#inbox/conversations/a1b2c3d4-..."
  }
}
```
<!-- Constructed from docs — verify against live API -->

### Contact
```json
{
  "contacts": {
    "id": "contact-id",
    "first_name": "Jane",
    "last_name": "Doe",
    "email_addresses": ["jane@example.com"],
    "phone_numbers": ["+15551234567"],
    "organization": "Acme Inc",
    "contact_book": { "id": "book-id", "name": "Customers" },
    "custom_fields": { "plan": "Enterprise" }
  }
}
```
<!-- Constructed from docs — verify against live API -->

### Draft (for sending emails programmatically)
```json
{
  "drafts": {
    "subject": "Welcome to Acme",
    "body": "<p>Hi Jane, welcome aboard!</p>",
    "from_field": { "address": "support@acme.com" },
    "to_fields": [{ "address": "jane@example.com" }],
    "send": true,
    "send_at": 1714200000,
    "conversation": "conversation-id",
    "team": "team-id",
    "add_assignees": ["user-id"],
    "organization": "org-id"
  }
}
```
<!-- Constructed from docs — verify against live API -->

### Webhook payload
```json
{
  "rule": {
    "id": "rule-id",
    "description": "New inbound email",
    "type": "inbound_message"
  },
  "conversation": {
    "id": "conv-id",
    "subject": "Question about pricing",
    "team": { "id": "team-id", "name": "Sales" },
    "assignees": [],
    "labels": [],
    "messages_count": 1,
    "web_url": "https://mail.missiveapp.com/#inbox/conversations/conv-id"
  },
  "latest_message": {
    "id": "msg-id",
    "subject": "Question about pricing",
    "preview": "Hi, I wanted to ask about...",
    "from_field": { "name": "John", "address": "john@example.com" },
    "delivered_at": 1714000000
  }
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: Send an email via the API

**Use case**: Automated transactional or follow-up emails from your app.

```bash
# Create and send a draft immediately
curl -X POST https://mail.missiveapp.com/v1/drafts \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "drafts": {
      "subject": "Your order has shipped",
      "body": "<p>Hi Jane, your order #1234 has shipped!</p>",
      "from_field": { "address": "support@acme.com" },
      "to_fields": [{ "address": "jane@example.com" }],
      "send": true,
      "organization": "YOUR_ORG_ID"
    }
  }'
```

```python
import requests

resp = requests.post(
    "https://mail.missiveapp.com/v1/drafts",
    headers={
        "Authorization": "Bearer YOUR_API_TOKEN",
        "Content-Type": "application/json",
    },
    json={
        "drafts": {
            "subject": "Your order has shipped",
            "body": "<p>Hi Jane, your order #1234 has shipped!</p>",
            "from_field": {"address": "support@acme.com"},
            "to_fields": [{"address": "jane@example.com"}],
            "send": True,
            "organization": "YOUR_ORG_ID",
        }
    },
)
print(resp.json())
```

**Gotcha**: Set `send: true` to send immediately. Omit it to create a draft that agents can review and send manually.

### Recipe 2: Listen for new emails via webhook

**Use case**: Trigger a CRM update or Slack notification when a new email arrives.

1. In Missive: Settings → Rules → New Rule
2. Trigger: "When a new message is received"
3. Action: Webhook → paste your endpoint URL
4. Missive sends a POST with the conversation and message payload (see webhook schema above)

```python
from flask import Flask, request
import hmac
import hashlib

app = Flask(__name__)
WEBHOOK_SECRET = "your_webhook_secret"

@app.route("/missive-webhook", methods=["POST"])
def handle_webhook():
    # Verify signature
    signature = request.headers.get("X-Hook-Signature", "")
    expected = "sha256=" + hmac.new(
        WEBHOOK_SECRET.encode(), request.data, hashlib.sha256
    ).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return "Invalid signature", 403

    data = request.json
    sender = data["latest_message"]["from_field"]["address"]
    subject = data["conversation"]["subject"]
    print(f"New email from {sender}: {subject}")
    # TODO: create CRM contact, send Slack notification, etc.
    return "OK", 200
```

**Gotcha**: Your endpoint must respond within 15 seconds. For longer processing, acknowledge immediately and process in a background job. Failed requests retry up to 5 times over 8 minutes.

### Recipe 3: List and search conversations

**Use case**: Build a dashboard or sync conversations to an external system.

```bash
# List conversations for a specific team inbox
curl "https://mail.missiveapp.com/v1/conversations?mailbox=MAILBOX_ID&limit=50" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

```python
import requests

resp = requests.get(
    "https://mail.missiveapp.com/v1/conversations",
    headers={"Authorization": "Bearer YOUR_API_TOKEN"},
    params={"mailbox": "MAILBOX_ID", "limit": 50},
)
for conv in resp.json().get("conversations", []):
    print(f"{conv['subject']} — {conv['messages_count']} messages")
```

**Gotcha**: The conversations endpoint requires a `mailbox` filter — you can't list all conversations across all inboxes in one call. Use `GET /v1/organizations` first to find your org ID, then list mailboxes.

## Integration patterns

### CRM sync architecture
- **Trigger**: Webhook rule on new inbound message → POST to your server
- **Extract**: Parse `from_field.address` and `conversation.subject` from webhook payload
- **Upsert**: Call CRM API (HubSpot, Salesforce) to create/update contact
- **Link back**: Use Missive's `PATCH /v1/contacts/:id` to store CRM record ID in custom fields
- **Conflict resolution**: Missive is the source of truth for email metadata; CRM is source of truth for deal/pipeline data

### Zapier recipe patterns
- **New message → CRM contact**: Trigger "New Message" → Action "Create/Update HubSpot Contact"
- **New task → Project management**: Trigger "New Task" → Action "Create Asana/Trello card"
- **Conversation assigned → Slack notification**: Trigger "Conversation Assigned" → Action "Send Slack Message"

### Batch pipeline
- **Pagination**: Use `limit` (max 200) and `offset` params. Default limit is 50.
- **Rate limits**: Not officially documented — implement exponential backoff on 429 responses.
- **Error recovery**: Check HTTP status; retry on 5xx with backoff. Log failed IDs for manual review.
