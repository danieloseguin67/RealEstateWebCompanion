# Hiver Platform Reference

## Overview

Hiver is a Gmail-native help desk that adds shared inboxes, ticketing, live chat, WhatsApp, voice, and AI capabilities directly inside Gmail. Built for small to mid-size teams on Google Workspace who want help desk functionality without learning a new tool. Primary differentiator: zero learning curve — agents work inside their existing Gmail interface.

## Capabilities & automation surface

| Capability | Description | Surface |
|---|---|---|
| **Shared Inboxes** | Manage team emails (support@, info@) with assignment, tags, status tracking | UI + API (Pro) + Zapier |
| **Conversations** | Ticket-based conversation tracking with assignment, notes, collision detection | API-accessible (Pro) |
| **Workflow Automations** | Rule-based automation: auto-assign, auto-tag, status change, round-robin | UI-only (Lite+) |
| **SLA Management** | First response and resolution SLAs with breach notifications | UI + Zapier triggers |
| **Live Chat** | Website chat widget with visitor info, canned responses | UI-only (Free+) |
| **WhatsApp** | WhatsApp Business integration for customer messaging | UI-only (Free+) |
| **Voice** | Phone support channel | UI-only (Free+) |
| **SMS** | SMS support channel | UI-only |
| **Knowledge Base** | Self-service FAQ and help articles | UI-only (Free+) |
| **Customer Portal** | Customers can track their tickets | UI-only (Lite+) |
| **CSAT Survey** | Post-resolution satisfaction surveys | UI + Zapier trigger (Pro+) |
| **Chatbots** | Automated chat flows for common questions | UI-only (Pro+) |
| **AI Copilot** | AI-drafted replies, tone adjustment, summarization | UI-only ($20/user/mo add-on) |
| **AI Agents** | Automated FAQ responses, ticket routing by category/urgency | UI-only ($20/user/mo add-on) |
| **AI Insights** | Bottleneck analysis, issue prediction | UI-only ($20/user/mo add-on) |
| **Analytics** | Conversation metrics, team performance, custom reports | UI-only (Lite+ for basic, Growth+ for custom) |
| **Internal Notes** | @mention teammates on conversations without customer seeing | UI-only (Free+) |
| **Draft Sharing** | Share email drafts for review before sending | UI-only (Free+) |
| **Collision Detection** | Prevents two agents from replying to the same conversation | UI-only (Free+) |
| **Custom Fields** | Add structured data to conversations | UI-only (Lite+) |
| **Approval Workflows** | Multi-step approval chains | UI-only (Lite+) |
| **API Actions in Automations** | Make HTTP API calls from automation rules (Feb 2026) | Automation engine (Pro+) |

## Pricing, limits & plan gates

| Feature | Free | Lite $19 | Growth $29 | Pro $49 | Elite (custom) |
|---|---|---|---|---|---|
| Shared inboxes | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| Users | Unlimited | Per user | Per user | Per user | Per user |
| Live chat | Yes | Yes | Yes | Yes | Yes |
| WhatsApp & Voice | Yes | Yes | Yes | Yes | Yes |
| Knowledge base | Yes | Yes | Yes | Yes | Yes |
| Slack integration | Yes | Yes | Yes | Yes | Yes |
| Customer portal | - | Yes | Yes | Yes | Yes |
| Workflow automations | - | Yes | Yes | Yes | Yes |
| Round-robin assignment | - | Yes | Yes | Yes | Yes |
| SLAs | - | Yes | Yes | Yes | Yes |
| Custom fields | - | Yes | Yes | Yes | Yes |
| Approval workflows | - | Yes | Yes | Yes | Yes |
| Basic analytics | - | Yes | Yes | Yes | Yes |
| Essential integrations | - | Yes | Yes | Yes | Yes |
| Team performance analytics | - | - | Yes | Yes | Yes |
| Custom reports | - | - | Yes | Yes | Yes |
| Advanced integrations | - | - | Yes | Yes | Yes |
| Chatbots | - | - | - | Yes | Yes |
| CSAT survey | - | - | - | Yes | Yes |
| Business hours | - | - | - | Yes | Yes |
| Advanced analytics | - | - | - | Yes | Yes |
| Scheduled data exports | - | - | - | Yes | Yes |
| **API access** | - | - | - | **Yes** | Yes |
| Skill-based routing | - | - | - | - | Yes |
| Custom roles | - | - | - | - | Yes |
| HIPAA compliance | - | - | - | - | Yes |
| SSO | - | - | - | - | Yes |

**AI add-on**: $20/user/mo on any plan. Includes AI Compose, Summarizer, Auto-Tagging, Sentiment Analysis, Suggested Responses, Thank You Detector, Ask AI, Extract.

**Nonprofit discount**: Available — contact Hiver sales.

**Trial**: 7-day free trial of Elite plan (no credit card required).

All prices are annual billing. Monthly billing available at higher rates.

## Integrations

| Integration | Direction | Plan required | Notes |
|---|---|---|---|
| **Salesforce** | Bidirectional | Growth+ | Sync contacts and conversation data |
| **Jira** | Bidirectional | Growth+ | Create Jira issues from conversations |
| **Slack** | Read/Write | Free+ | Notifications, assignment alerts |
| **Okta** | Read | Elite | SSO |
| **QuickBooks** | Read | Growth+ | Customer financial context |
| **Zapier** | Read (triggers) | Lite+ | 10 triggers, actions via Hiver API |
| **REST API** | Full CRUD | Pro+ ($49) | Inbox and conversation management |
| **Automation API calls** | Write | Pro+ | HTTP calls from automation rules (Feb 2026) |

**No Make integration.** No native Make/Integromat modules. Workaround: use Zapier or direct API calls from Pro plan.

**No MCP server.** No Model Context Protocol support.

## Data model

### Inbox
<!-- Constructed from docs — verify against live API -->
```json
{
  "id": "inbox_abc123",
  "name": "support@company.com",
  "users": [
    {
      "id": "user_xyz789",
      "email": "agent@company.com",
      "role": "agent"
    }
  ],
  "tags": [
    {
      "id": "tag_001",
      "name": "urgent"
    }
  ]
}
```

### Conversation
<!-- Constructed from docs — verify against live API -->
```json
{
  "id": "conv_def456",
  "inbox_id": "inbox_abc123",
  "subject": "Order #1234 issue",
  "status": "open",
  "assignee": {
    "id": "user_xyz789",
    "email": "agent@company.com"
  },
  "tags": ["urgent", "billing"],
  "contact": {
    "email": "customer@example.com",
    "name": "Jane Doe"
  },
  "created_at": "2026-04-20T10:30:00Z",
  "updated_at": "2026-04-20T11:15:00Z",
  "sla": {
    "first_response_due": "2026-04-20T11:30:00Z",
    "resolution_due": "2026-04-21T10:30:00Z",
    "breached": false
  }
}
```

### Zapier triggers

| Trigger | Description | Use case |
|---|---|---|
| New Inbound Conversation | Fires when a new email arrives in a shared mailbox | Create CRM record, notify Slack |
| New Outbound Conversation | Fires when an agent sends a new conversation from shared mailbox | Log outbound in CRM |
| Conversation Updated | Fires when status, assignee, contact, or tags change | Sync status to CRM |
| New Email Sent or Received | Fires on any email activity in shared mailbox | Activity logging |
| New Note Created | Fires when an internal note is added | Notify in Slack channel |
| New CSAT Rating Received | Fires on CSAT response (Pro+) | Track satisfaction in dashboard |
| First Response SLA Due Soon | Fires before SLA breach | Alert manager |
| First Response SLA Overdue | Fires after SLA breach | Escalation workflow |
| Resolution SLA Due Soon | Fires before resolution SLA breach | Priority alert |
| Resolution SLA Overdue | Fires after resolution SLA breach | Escalation workflow |

## Quick-start recipes

### Recipe 1: New support ticket to Slack notification (Zapier)

**Trigger**: New Inbound Conversation in Hiver
**Steps**: Extract subject, sender, and assigned agent → post to Slack channel

Zapier setup:
1. Trigger: Hiver → "New Inbound Conversation"
2. Select your shared inbox
3. Action: Slack → "Send Channel Message"
4. Map fields: Channel = #support, Message = "New ticket from {{contact_email}}: {{subject}} — assigned to {{assignee}}"

### Recipe 2: List conversations via API (Pro plan)

**Use case**: Pull all open conversations from a shared inbox for reporting or CRM sync.

```bash
# List conversations in a shared inbox
curl -X GET "https://api.hiverhq.com/v1/inboxes/{inbox_id}/conversations?status=open" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

```python
import requests

API_KEY = "YOUR_API_KEY"
INBOX_ID = "inbox_abc123"

response = requests.get(
    f"https://api.hiverhq.com/v1/inboxes/{INBOX_ID}/conversations",
    params={"status": "open"},
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
)

conversations = response.json()
for conv in conversations.get("data", []):
    print(f"{conv['subject']} — {conv['status']} — {conv.get('assignee', {}).get('email', 'unassigned')}")
```

<!-- Constructed from docs — verify against live API. Base URL and exact response shape may differ. -->

**Gotcha**: API access requires Pro plan ($49/user/mo). Generate API key from Hiver Admin → Developer section.

### Recipe 3: SLA breach escalation to manager (Zapier)

**Trigger**: First Response SLA Overdue
**Steps**: When SLA breaches, auto-assign to manager and notify via email

Zapier setup:
1. Trigger: Hiver �� "First Response SLA Overdue"
2. Select your shared inbox
3. Action 1: Gmail → "Send Email" to manager with conversation details
4. Action 2: Slack → "Send Direct Message" to on-call lead

## Integration patterns

### CRM sync (Zapier-based)
- **Field mapping**: Hiver conversation fields (subject, tags, status, assignee) → CRM case/ticket fields
- **Sync frequency**: Real-time via Zapier triggers
- **Conflict resolution**: Hiver is source-of-truth for support conversations; CRM is source-of-truth for contact/account data
- **Limitations**: No bidirectional real-time sync — CRM updates don't push back to Hiver via Zapier

### Webhook listener pattern (Pro plan)
As of Feb 2026, Hiver automations can make outbound HTTP API calls:
1. Configure automation rule in Hiver (e.g., "when conversation tagged 'escalation'")
2. Set action to "Make API call" with your webhook endpoint URL
3. Choose auth method (API Key, Bearer Token, Basic Auth, or OAuth)
4. Map Hiver conversation data to request body

### Batch pipeline (API, Pro plan)
- **Pagination**: Unknown — API docs JS-rendered. Test with standard offset/limit or cursor params.
- **Rate limits**: Not publicly documented. Start conservative (1 req/sec) and increase.
- **Error recovery**: Implement exponential backoff for 429/5xx responses.
