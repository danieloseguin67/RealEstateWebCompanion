# GetAccept Platform Reference

## Overview

GetAccept (getaccept.com) is an AI-powered digital sales room platform that combines proposals, e-signatures, contract management, CPQ, and buyer engagement tracking. Founded 2015, headquartered in San Francisco. 5,000+ customers, 4.6/5 G2 rating (1,233+ reviews). SOC 2 certified, GDPR/CCPA compliant, eIDAS qualified signature support.

## Capabilities & automation surface

### Digital Sales Room — API-accessible (Professional+)
Centralized buyer-facing hub for organizing deals with shared stakeholder access. Includes mutual action plans, content library, and personalized content assembly.

### Proposals & Quotes — API-accessible
AI-assisted branded document generation. Merge fields for dynamic content. Edit-after-send (Professional+). Pricing tables with currency/locale configuration.

### Electronic Signatures — API-accessible
GDPR/CCPA compliant. eIDAS AdES and QES support. eID verification for Nordic countries (Sweden, Denmark, Norway, Finland — Professional+). SMS verification. Biometric signing. Signing order configuration.

### Contract Management — API-accessible
Contract lifecycle management with start/end dates, renewal reminders, and seal/stamp application. Conditional content assembly (Enterprise only).

### CPQ (Configure Price Quote) — UI-only (Enterprise)
Product library with pricing configuration. 3-product library on Professional, unlimited on Enterprise.

### Sales Content Management — UI-only
Personalized content creation at scale. Templates and content library on all plans.

### Tracking & Analytics — API-accessible (events endpoint)
Real-time buyer engagement insights. Document timeline shows who viewed what and when. Sales dashboard and reporting on Professional+.

### GetAccept AI — UI-only (Professional+)
Meeting summaries, business case builder, native AI editor, smart content suggestions, knowledge base.

### Communication Templates — API-accessible
Email and messaging templates with language support. Automated reminders for unsigned documents.

## Pricing, limits & plan gates

| Feature | eSign ($25/user/mo) | Professional ($49/user/mo) | Enterprise (custom) |
|---|---|---|---|
| Max users | 5 | Unlimited (min 5) | Unlimited |
| Billing | Monthly or annual | Annual only | Custom |
| E-signatures | Unlimited | Unlimited | Unlimited |
| In-app editor | Basic (text, images) | Full suite | Full suite |
| Digital Sales Rooms | No | Yes | Yes |
| Mutual Action Plans | No | Yes | Yes |
| GetAccept AI | No | Yes | Yes |
| Edit-after-send | No | Yes | Yes |
| CRM integrations | No | Yes | Premium |
| Zapier/Make | No | Yes | Yes |
| API access | No | No | Read (included), Read/Write (add-on) |
| CPQ / product library | No | 3 products | Unlimited |
| SSO | No | No | Yes |
| eID verification | No | Yes (Nordic) | Yes |
| Reporting/analytics | No | Yes | Yes |
| Custom data fields | Limited | Limited | Unlimited |

## Integrations

### Native CRM connectors (Professional+)
- **Salesforce**: Bidirectional sync — create/send documents from Salesforce, status updates back to opportunity. Premium features on Enterprise.
- **HubSpot**: Send documents from deals, status syncs back. Via HubSpot Marketplace app.
- **Pipedrive**: Send from deals, activity logging.
- **Microsoft Dynamics**: Document sending and status sync.
- **SuperOffice**: Native integration.

### Other native integrations
- **Gong**: Call intelligence connection
- **Salesloft**: Engagement platform integration
- **Slack**: Notifications for document events
- **Google Drive**: File attachment source
- **Chargebee**: Subscription management

### Zapier (Professional+)
**Triggers**: Document Created, Document Sent, Document Viewed, Document Reviewed, Document Signed
**Actions**: Create Contact, Create Document

### Make (Professional+)
15 modules across 4 categories:
- **Documents**: Watch Created/Sent/Reviewed/Signed, Search, List Recipients, Get Details, Download, Create, Create from Template, Delete
- **Files**: Upload a File
- **Contacts**: Create a Contact
- **Other**: Make an API Call

## Data model

### Document
```json
{
  "id": "doc_abc123",
  "name": "Proposal for Acme Corp",
  "status": "sent",
  "value": 25000,
  "created_at": "2026-01-15T10:30:00Z",
  "recipients": [
    {
      "id": "rec_xyz789",
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane@acme.com",
      "role": "signer"
    }
  ],
  "custom_data": [
    {
      "id": "cd_001",
      "key": "deal_stage",
      "value": "negotiation",
      "type": "string"
    }
  ],
  "external_id": "SF-OPP-12345"
}
```
<!-- Constructed from docs — verify against live API -->

**Document status values**: `draft`, `sent`, `viewed`, `reviewed`, `signed`, `rejected`, `recalled`

**Recipient roles**: `signer`, `internalApprover`, `externalApprover`, `cc`

### Contact
```json
{
  "email": "jane@acme.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "company_name": "Acme Corp",
  "phone": "+1-555-0100",
  "mobile": "+1-555-0101",
  "title": "VP Sales",
  "note": "Met at SaaStr 2026"
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: Create and send a document via API

**Trigger**: New deal reaches "Proposal" stage in CRM
**Steps**: Authenticate → Create document with recipients → Track status

```bash
# 1. Authenticate
curl -X POST https://api.getaccept.com/v1/auth \
  -H "Content-Type: application/json" \
  -d '{"email": "you@company.com", "password": "your-password"}'
# Returns: {"access_token": "eyJ...", "expires_in": 86400}

# 2. Create and send document
curl -X POST https://api.getaccept.com/v1/documents \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Proposal for Acme Corp",
    "file_url": "https://your-server.com/proposal.pdf",
    "is_automatic_sending": true,
    "recipients": [
      {
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane@acme.com",
        "role": "signer"
      }
    ],
    "custom_fields": [
      {"name": "deal_value", "value": "$25,000"},
      {"name": "company_name", "value": "Acme Corp"}
    ]
  }'
```

```python
import requests

# Authenticate
auth = requests.post("https://api.getaccept.com/v1/auth", json={
    "email": "you@company.com",
    "password": "your-password"
})
token = auth.json()["access_token"]

# Create and send document
doc = requests.post(
    "https://api.getaccept.com/v1/documents",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "name": "Proposal for Acme Corp",
        "file_url": "https://your-server.com/proposal.pdf",
        "is_automatic_sending": True,
        "recipients": [
            {"first_name": "Jane", "last_name": "Smith",
             "email": "jane@acme.com", "role": "signer"}
        ],
        "custom_fields": [
            {"name": "deal_value", "value": "$25,000"},
            {"name": "company_name", "value": "Acme Corp"}
        ]
    }
)
print(doc.json()["id"])
```

**Gotcha**: API access requires Enterprise plan. On Professional, use Zapier/Make instead.

### Recipe 2: Track document engagement

**Trigger**: Want to know when a proposal is viewed/signed
**Steps**: List document events → Parse engagement timeline

```bash
# Get document events (activity timeline)
curl -X GET "https://api.getaccept.com/v1/documents/DOC_ID/events" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Download signed document as PDF
curl -X GET "https://api.getaccept.com/v1/documents/DOC_ID/download?format=pdf" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Gotcha**: Download URLs expire after 10 minutes. Request a fresh URL each time.

### Recipe 3: Zapier automation (Professional plan)

**Trigger**: Document Signed in GetAccept
**Steps**: Update CRM deal stage → Notify Slack → Create follow-up task

Zapier setup:
1. Trigger: GetAccept → Document Signed
2. Action 1: HubSpot → Update Deal (stage = "Closed Won")
3. Action 2: Slack → Send Channel Message
4. Action 3: HubSpot → Create Task (onboarding kickoff)

## Integration patterns

### CRM sync architecture
- **Direction**: Bidirectional — create documents from CRM deals, status flows back
- **Field mapping**: Map GetAccept document status to CRM deal stages (sent → proposal, signed → closed won, rejected → closed lost)
- **Conflict resolution**: GetAccept is source of truth for document status; CRM is source of truth for deal metadata
- **Sync frequency**: Real-time via native integrations; event-driven via Zapier triggers

### Zapier event-driven pattern
- Use "Document Signed" trigger to update CRM deal stage
- Use "Document Viewed" trigger to create follow-up tasks
- Use "Document Created" trigger to log activity in CRM
- Chain with filters to only act on documents matching specific criteria (by name, value, or custom field)

## Comparison with alternatives

| Feature | GetAccept | PandaDoc | Proposify | Qwilr |
|---|---|---|---|---|
| **Type** | Full DSR + e-sign | Document automation + e-sign | Proposal-focused | Interactive web proposals |
| **Digital Sales Room** | Yes (Professional+) | No (documents only) | No | Yes (deal rooms) |
| **E-Signature** | Native (eIDAS QES) | Native | Native | Via integrations |
| **CPQ** | Yes (Enterprise) | Yes | No | Quote blocks |
| **AI features** | Meeting summaries, smart content | AI assistant | No | No |
| **CRM integrations** | SF, HubSpot, Pipedrive, Dynamics | SF, HubSpot, Pipedrive, Zoho | SF, HubSpot, Pipedrive | SF, HubSpot |
| **API** | REST (Enterprise) | REST (all plans) | REST (Team+) | REST (all plans) |
| **Starting price** | $25/user/mo | $35/user/mo | $19/user/mo | $35/user/mo |
| **G2 rating** | 4.6 (1,233 reviews) | 4.7 (2,700+ reviews) | 4.6 (1,000 reviews) | 4.5 (700+ reviews) |
| **Best for** | Full-cycle deal management | Document-heavy workflows | Proposal design | Interactive web proposals |
