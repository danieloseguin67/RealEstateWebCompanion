# Front Platform Reference

## Overview

Front is an AI-powered customer operations platform that combines shared inbox, omnichannel support, and AI automation. It handles email, SMS, chat, social, and WhatsApp in a unified workspace with assignments, comments, SLAs, and a full REST API. Targets mid-market to enterprise support, operations, and account management teams. Founded 2013, 9,000+ customers.

## Capabilities & automation surface

| Capability | Description | Automation surface |
|---|---|---|
| Shared Inbox | Shared email addresses with assignments, comments, internal notes | API-accessible (Core API) |
| Omnichannel | Email + SMS + chat + social + WhatsApp in one inbox | API-accessible (Channels API) |
| Conversations | Threaded conversations with status (open/archived/trashed) | API-accessible |
| Contacts | Contact profiles with conversation history | API-accessible |
| Tags | Categorization for routing and reporting | API-accessible |
| Rules | If/then automation rules (assignment, tagging, SLA, notification) | UI-only (triggered by rules, but rule config is UI) |
| Autopilot | AI that resolves routine requests end-to-end | UI-only |
| Copilot | AI agent assistant — draft suggestions, context summaries | UI-only (add-on $20/seat, included Enterprise) |
| Smart QA | Automated 100% conversation quality scoring | UI-only (add-on $20/seat, included Enterprise) |
| Smart CSAT | AI-predicted satisfaction scores without surveys | UI-only (add-on $10/seat, included Enterprise) |
| Ticketing | Ticket workflows with status, priority, SLA tracking | API-accessible |
| Knowledge Base | No-code public knowledge base with AI search | API-accessible (Knowledge Base API) |
| Live Chat | Chat widget for website | API-accessible (Chat Widget SDK) |
| Analytics | Team performance, response time, resolution metrics | API-accessible (Analytics API) |
| Webhooks | Real-time event notifications for conversation/message/tag events | Webhook-accessible |
| Plugin SDK | Custom side-panel apps embedded in Front UI | SDK-accessible |
| Connectors | No-code API calls to external systems within conversations | UI-only |

## Pricing, limits & plan gates

| Feature | Starter ($25/seat/mo annual) | Professional ($65/seat/mo annual) | Enterprise ($105/seat/mo annual) |
|---|---|---|---|
| Max seats | 10 | 50 | Unlimited |
| Channels | Single channel type | Omnichannel | Omnichannel |
| Automation rules | Up to 10 | Up to 20 | Unlimited |
| Analytics | Basic | Advanced | Advanced |
| SSO / SCIM | No | Yes | Yes |
| Knowledge base | Public, no-code | Public, no-code | Multi-language |
| Custom roles | No | No | Yes |
| Copilot | Add-on $20/seat | Add-on $20/seat | Included |
| Smart QA | Add-on $20/seat | Add-on $20/seat | Included |
| Smart CSAT | Add-on $10/seat | Add-on $10/seat | Included |
| API rate limit | 50 rpm | 100 rpm | 200 rpm |
| Monthly billing | $35/seat | $85/seat | Annual only |

**Free trial**: 14 days with Professional features, no credit card required.

**Add-on bundles**: Smart QA + Smart CSAT bundle = $25/seat/mo.

## Integrations

- **Native CRM**: Salesforce, HubSpot (bidirectional — sync contacts, log conversations)
- **Communication**: Twilio (SMS), WhatsApp Business, Facebook Messenger, Instagram, Twitter/X
- **Collaboration**: Slack, Microsoft Teams, Asana, Jira, Trello, Monday.com
- **E-commerce**: Shopify (order lookup in conversations)
- **Knowledge**: Guru, Notion, Confluence
- **Phone/Voice**: Aircall, Dialpad, RingCentral (no native telephony)
- **iPaaS**: Zapier, Make — triggers for new conversations, messages, tags; actions for creating/updating conversations and contacts
- **Total**: 160+ integrations in Front's app ecosystem
- **API direction**: Core API provides full read/write to all entities. Channels API enables custom inbound/outbound channels.

## Data model

### Conversation
```json
{
  "id": "cnv_abc123",
  "subject": "Order #1234 issue",
  "status": "unassigned",
  "assignee": {
    "id": "tea_abc123",
    "email": "agent@company.com"
  },
  "recipient": {
    "handle": "customer@example.com",
    "role": "to"
  },
  "tags": [
    {"id": "tag_abc123", "name": "urgent"}
  ],
  "last_message": {
    "id": "msg_abc123",
    "body": "I need help with my order",
    "created_at": 1454453901.012
  },
  "created_at": 1454453901.012,
  "is_private": false,
  "_links": {
    "self": "https://api2.frontapp.com/conversations/cnv_abc123",
    "related": {
      "messages": "https://api2.frontapp.com/conversations/cnv_abc123/messages",
      "comments": "https://api2.frontapp.com/conversations/cnv_abc123/comments"
    }
  }
}
```
<!-- Constructed from docs — verify against live API -->

### Contact
```json
{
  "id": "crd_abc123",
  "name": "Jane Smith",
  "description": "VIP customer",
  "handles": [
    {"handle": "jane@example.com", "source": "email"},
    {"handle": "+1555123456", "source": "phone"}
  ],
  "groups": [
    {"id": "grp_abc123", "name": "VIP Customers"}
  ],
  "custom_fields": {
    "company": "Acme Corp",
    "plan": "Enterprise"
  },
  "_links": {
    "self": "https://api2.frontapp.com/contacts/crd_abc123",
    "related": {
      "conversations": "https://api2.frontapp.com/contacts/crd_abc123/conversations"
    }
  }
}
```
<!-- Constructed from docs — verify against live API -->

### Webhook Event
```json
{
  "id": "evt_abc123",
  "type": "message",
  "emitted_at": 1454453901.012,
  "conversation": {
    "id": "cnv_abc123",
    "subject": "Order issue"
  },
  "source": {
    "_meta": {
      "type": "rule"
    }
  },
  "target": {
    "_meta": {
      "type": "message"
    },
    "data": {
      "id": "msg_abc123",
      "body": "Customer message content"
    }
  }
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: List conversations assigned to a teammate (cURL + Python)

**Trigger**: You want to pull all open conversations for a specific agent.

```bash
# List conversations for teammate tea_abc123
curl -s "https://api2.frontapp.com/teammates/tea_abc123/conversations?q[statuses][]=unassigned&q[statuses][]=assigned&limit=50" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Accept: application/json"
```

```python
import requests

BASE = "https://api2.frontapp.com"
HEADERS = {"Authorization": "Bearer YOUR_API_TOKEN", "Accept": "application/json"}

def get_teammate_conversations(teammate_id):
    url = f"{BASE}/teammates/{teammate_id}/conversations"
    params = {"q[statuses][]": ["unassigned", "assigned"], "limit": 50}
    results = []
    while url:
        resp = requests.get(url, headers=HEADERS, params=params)
        resp.raise_for_status()
        data = resp.json()
        results.extend(data.get("_results", []))
        url = data.get("_pagination", {}).get("next")
        params = None  # next URL includes params
    return results
```

**Gotchas**: Rate limit is per-company. If multiple integrations run simultaneously, they share the same 50/100/200 rpm pool.

### Recipe 2: Create a draft reply on a conversation

**Trigger**: You want to auto-draft a reply to a customer conversation.

```bash
curl -X POST "https://api2.frontapp.com/conversations/cnv_abc123/drafts" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "body": "Hi Jane, thanks for reaching out. Let me look into this for you.",
    "channel_id": "cha_abc123"
  }'
```

```python
import requests

BASE = "https://api2.frontapp.com"
HEADERS = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "Content-Type": "application/json",
}

def create_draft(conversation_id, body, channel_id):
    url = f"{BASE}/conversations/{conversation_id}/drafts"
    payload = {"body": body, "channel_id": channel_id}
    resp = requests.post(url, headers=HEADERS, json=payload)
    resp.raise_for_status()
    return resp.json()
```

**Gotchas**: Draft creation requires write permission on the token. The draft appears in the agent's Front UI for review before sending.

### Recipe 3: Listen for new inbound messages via webhook

**Trigger**: You want real-time notifications when customers send messages.

1. Create an Application webhook in Front Developer Portal
2. Set the webhook URL to your server endpoint
3. Front sends POST requests with event payloads

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/front-webhook", methods=["POST"])
def handle_webhook():
    event = request.get_json()
    event_type = event.get("type")

    if event_type == "message":
        conversation = event.get("conversation", {})
        message = event.get("target", {}).get("data", {})
        print(f"New message in {conversation.get('id')}: {message.get('body', '')[:100]}")
        # Process: sync to CRM, trigger alert, create ticket in external system

    return jsonify({"status": "ok"}), 200
```

**Gotchas**: Application webhooks require your server to be ready at configuration time. Rule webhooks are easier for testing — they can send event previews that you fetch via API. Mass actions (bulk status changes, inbox migrations) don't trigger webhooks.

## Integration patterns

### CRM sync (Salesforce / HubSpot)

**Native integration** (Professional+): Front has built-in Salesforce and HubSpot connectors that sync contacts and log conversation activity bidirectionally. Configure in Settings → Integrations.

**Custom API sync**: For deeper control:
1. Set up application webhook listening for `conversation` and `message` events
2. On new conversation: look up contact in CRM by email handle
3. Log conversation summary as CRM activity/note
4. On conversation close: update CRM deal stage or create task

**Conflict resolution**: Front is the system of record for conversations; CRM is the system of record for deals and pipeline. Avoid bidirectional field sync on the same properties.

### Webhook listener patterns

- **Application webhooks**: Recommended for production — deliver full event payloads, shared inbox scope
- **Rule webhooks**: Better for testing — can send event preview (lighter payload) with option to fetch full event via API
- **Retry behavior**: Front retries failed webhook deliveries (exact retry policy not publicly documented — implement idempotency with event IDs)
- **Mass actions excluded**: Batch operations (inbox migration, bulk status changes, historical imports) do not trigger webhooks

### Batch pipeline patterns

- **Pagination**: Cursor-based with `page_token`. Default 50, max 100 per page. Always follow `_pagination.next` URL.
- **Rate limiting**: Check `x-ratelimit-remaining` header. When 0, wait until `x-ratelimit-reset` timestamp. Burst allowance = 50% of plan limit, replenishes after 10 minutes.
- **Error recovery**: 429 responses include `retry-after` header (seconds). Implement exponential backoff. The `x-front-tier` header tells you which specific limit was hit.
- **Tier-specific limits**: Analytics exports = 1 req/sec. Conversation/channel/teammate endpoints = 5 req/resource/sec. Search = 40% of global limit.
