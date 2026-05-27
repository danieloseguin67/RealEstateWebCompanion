# Gmelius Platform Reference

## Overview

Gmail-native AI email collaboration platform. Meli AI assistant + shared inboxes + Kanban boards + automation rules, all inside Gmail. Swiss-based, privacy-by-design. Serves 10,000+ teams including Grab, Databricks, and Personio.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Meli AI Assistant** | Drafts replies in your tone, sorts/categorizes email, schedules meetings, dispatches to agents, daily summaries | UI-only (no API for Meli directly) |
| **Shared Inboxes** | Real-time collaborative email for team addresses — assignment, notes, @mentions, collision detection | API-accessible (conversations endpoints) |
| **Kanban Boards** | Visual email management — draggable cards, columns, tags, status tracking | API-accessible (boards/columns/cards endpoints) |
| **Automation Rules** | Multi-step if-then workflows — routing, tagging, assignment, SLA timers | UI-only (configure in dashboard, execute server-side) |
| **Email Sequences** | Outbound email sequences with variable personalization | API-accessible (sequences/enrollments endpoints) |
| **SLA Management** | Response/resolution time tracking with breach alerts | UI-only |
| **Analytics** | Response times, volume, workload, team performance | UI-only |
| **Collision Detection** | Prevents two agents from replying to the same email | Automatic — no configuration needed |
| **Email Templates** | Reusable response templates shared across team | UI-only |

## Pricing, limits & plan gates

> *Best-effort — verify current pricing at gmelius.com/pricing*

| Feature | Meli ($19/user/mo) | Growth ($25/user/mo) | Pro ($40/user/mo) | Enterprise (custom) |
|---|---|---|---|---|
| Meli AI Assistant | Yes | Yes | Yes | Yes |
| Shared Inboxes | No | Unlimited | Unlimited | Unlimited |
| Automation Rules | No | Yes | Yes | Yes |
| SLA Management | No | Yes | Yes | Yes |
| API Access | No | Yes | Yes | Yes |
| Webhooks | No | No | Yes | Yes |
| CRM Integrations (HubSpot, Salesforce) | No | No | Yes | Yes |
| Conversations/mo | 5,000 | 10,000 | 100,000 | Unlimited |
| Max users | 5 | 50 | No cap | No cap |
| AI Dispatching Assistant | No | No | Yes | Yes |
| Bespoke AI Assistants | No | No | No | Yes |

**Annual vs monthly billing**: Annual prices shown above. Monthly billing is ~30-80% higher (e.g., Growth $33/user/mo monthly).

**7-day free trial**: Defaults to Growth plan. Pro trial available by emailing sales@gmelius.com.

## Integrations

**Native connectors** (data flow direction):
- Salesforce → bidirectional sync (Pro+)
- HubSpot → bidirectional sync (Pro+)
- Slack → notifications, shared inbox alerts (Growth+)
- Trello → board sync (Growth+)
- Google Workspace → Gmail, Calendar, Meet, Groups, Admin (all plans)

**iPaaS**:
- Zapier — triggers: new conversation, conversation updated, status change. Actions: create card, add note, update status
- Make — similar trigger/action surface
- Relay.app — workflow automation

**MCP**: No native MCP server. Available via Zapier MCP (connects AI assistants to Gmelius actions through Zapier's dynamic MCP URL).

## Data model

### Conversation

```json
{
  "id": "conv_abc123",
  "subject": "Re: Billing question",
  "from": {"email": "customer@example.com", "name": "Jane Doe"},
  "assignee": {"email": "agent@company.com", "name": "Bob Smith"},
  "status": "open",
  "tags": [{"id": "tag_1", "name": "billing"}],
  "shared_folder_id": "sf_xyz789",
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-01-15T11:45:00Z"
}
```
<!-- Constructed from docs — verify against live API -->

### Board Card

```json
{
  "id": "card_def456",
  "title": "Follow up with Acme Corp",
  "column_id": "col_abc",
  "assignee": {"email": "agent@company.com"},
  "tags": [{"id": "tag_2", "name": "high-priority"}],
  "due_date": "2026-02-01T00:00:00Z",
  "status": "in_progress"
}
```
<!-- Constructed from docs — verify against live API -->

### Sequence

```json
{
  "id": "seq_ghi789",
  "name": "Onboarding follow-up",
  "steps": 3,
  "enrolled_count": 45,
  "status": "active"
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: List conversations in a shared inbox (cURL + Python)

**Use case**: Pull all open conversations from a shared inbox for a daily report.

**cURL**:
```bash
curl -X GET "https://api.gmelius.com/public/v2/auth/shared-folders/{folder_id}/conversations" \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json"
```

**Python**:
```python
import requests

BASE_URL = "https://api.gmelius.com/public/v2"
headers = {"Authorization": f"Bearer {access_token}"}

# List conversations in a shared folder
resp = requests.get(
    f"{BASE_URL}/auth/shared-folders/{folder_id}/conversations",
    headers=headers
)
conversations = resp.json()["data"]
for conv in conversations:
    print(f"{conv['subject']} — assigned to {conv.get('assignee', {}).get('name', 'unassigned')}")
```

### Recipe 2: Enroll a contact in a sequence

**Use case**: Auto-enroll a new lead in an onboarding email sequence after CRM deal creation.

**cURL**:
```bash
curl -X POST "https://api.gmelius.com/public/v2/auth/sequences/{sequence_id}/enrollments" \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"email": "lead@example.com", "variables": {"first_name": "Jane", "company": "Acme"}}'
```

**Python**:
```python
resp = requests.post(
    f"{BASE_URL}/auth/sequences/{sequence_id}/enrollments",
    headers=headers,
    json={
        "email": "lead@example.com",
        "variables": {"first_name": "Jane", "company": "Acme"}
    }
)
print(resp.json())  # {"meta": {"status": 200, "code": "Ok"}, "data": {...}}
```

### Recipe 3: Create a Kanban card from a webhook event

**Use case**: When a high-priority conversation arrives, automatically create a Kanban card for project tracking.

**cURL** (create card):
```bash
curl -X POST "https://api.gmelius.com/public/v2/auth/boards/{board_id}/columns/{column_id}/cards" \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"title": "Urgent: Billing escalation from Acme", "assignee_email": "manager@company.com"}'
```

**Webhook setup** (Pro plan required):
```bash
curl -X POST "https://api.gmelius.com/public/v2/auth/webhooks" \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-server.com/gmelius-webhook", "events": ["conversation.created"]}'
```

## Integration patterns

### CRM sync (Pro plan)
- Native HubSpot/Salesforce connectors handle bidirectional sync
- For other CRMs: use Zapier trigger "Conversation Updated" → CRM action
- Field mapping: conversation subject → ticket title, assignee → CRM owner, tags → custom fields
- Sync frequency: near real-time via webhooks (Pro) or polling via Zapier (Growth)

### Webhook listener (Pro plan)
- Register webhooks via API: `POST /auth/webhooks` with target URL and event types
- Events include conversation created/updated, status changes, assignment changes
- Verify webhook authenticity by checking source IP or implementing HMAC verification
- Implement retry logic — Gmelius webhooks may retry on 5xx responses

### Batch pipeline
- Pagination: `limit` (default 50) + `from` parameter for offset
- Rate limits: not publicly documented — implement exponential backoff on 429 responses
- Token expiry: access tokens expire after 1 hour; refresh tokens valid 60 days (renew at 30-day mark)

## Authentication reference

**OAuth 2.0 + PKCE flow**:
1. Redirect user to: `https://gmelius.io/oauth/authorize?client_id={id}&redirect_uri={uri}&code_challenge={challenge}&scope={scopes}`
2. Exchange code: `POST https://api.gmelius.com/public/v2/token`
3. Use `Authorization: Bearer {access_token}` header on all API calls
4. Refresh before expiry: access tokens last 1 hour, refresh tokens last 60 days

**Key scopes**:
- `conversations/read` — read shared folder conversations
- `conversations/metadata` — assign, tag, update status
- `conversations/insert` — reply, draft
- `boards/read` — read boards
- `boards/modify` — create/update boards, columns, cards
- `sequences/enroll` — manage sequence enrollments
- `offline_access` — background token refresh
