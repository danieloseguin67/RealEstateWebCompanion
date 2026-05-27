# Konnect Insights Platform Reference

## Overview

Konnect Insights is an omnichannel customer experience management (CXM) platform that unifies social listening, social CRM, analytics, publishing, and crisis management into a single workspace. Target audience: mid-market brands and agencies managing customer interactions across 30+ channels. Primary differentiator: affordable unified CXM (starting $29/user/mo) with native CRM connectors (Salesforce, HubSpot, Zoho, Freshworks, 50+ tools).

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Social Listening** | Brand monitoring, competitor tracking, sentiment analysis, trend detection | API-accessible (REST), Zapier triggers |
| **Social CRM / Unified Inbox** | Ticketing across 30+ channels (social, email, WhatsApp, app reviews) | API-accessible (Create Ticket action), Zapier |
| **Social Analytics** | AI/ML/NLP-powered dashboards, BI tools, custom reports | API-accessible (read), Zapier triggers |
| **Social Publishing** | Content calendar, scheduling, automated publishing | UI-only (no API/Zapier for publishing) |
| **Crisis Management** | Real-time alerts, volume spike detection, escalation workflows | Webhook-accessible (via Zapier) |
| **Surveys** | Customer feedback collection | UI-only |
| **Response Management** | SLA tracking, auto-assignment, priority routing | API-accessible (ticket CRUD) |

## Pricing, limits & plan gates

| Plan | Price | Key features | API/Integration access |
|---|---|---|---|
| **Getting Started** | ~$29/user/mo | Basic response management, manual workflows | No Zapier, no API |
| **Startup** | ~$99/mo | Social listening, analytics, basic dashboards | Limited — no Zapier |
| **Standard** | Custom | Full listening + analytics + publishing | Native integrations |
| **Standard Plus** | Custom | All features + advanced workflows | Native integrations |
| **All-in-one / Enterprise** | Custom | Everything + API + Zapier + Fivetran | Full API + Zapier + Fivetran |

**Plan gates:**
- Zapier integration requires "All-in-one" plan
- REST API access requires "All-in-one" plan
- Fivetran connector available on enterprise plans
- Native CRM connectors (Salesforce, HubSpot) available on Standard+

**Volume-based pricing:** Costs scale with mention volume and number of social profiles connected. Lower conversation volume = lower price.

**Trial:** Advanced plan features for trial duration. Contact for Enterprise trial.

## Integrations

### Native connectors (bidirectional)
- **Salesforce** — Salesforce AppExchange app, maps social tickets to Cases/Contacts
- **HubSpot** — ticket and contact sync
- **Zoho CRM** — contact and ticket creation
- **Freshworks (Freshdesk)** — Freshworks Marketplace integration, ticket push
- **Microsoft Teams** — alert delivery, ticket notifications
- **Zoom** — meeting scheduling from tickets
- **Exotel** — telephony integration for voice tickets
- **Shopify** — e-commerce customer context in unified inbox

### iPaaS
- **Zapier** — 7 triggers + 1 action (All-in-one plan required)
- **Fivetran** — data connector for BI/warehouse sync (enterprise)

### Zapier triggers & actions

**Triggers:**
1. Get Groups — fires when new group created (no required fields)
2. Get Topics — fires when new topic created (requires: GroupId)
3. Get Clusters — fires when new cluster created (requires: Group Id)
4. Get Messages by Topic — fires when new tickets in topic (requires: Group Id, Topic Id; optional: Since Date, Until Date, Sort Order, Limit)
5. Get Messages by Cluster — fires when new ticket in cluster (requires: Group Id, Cluster Id)
6. Get Messages by Profile — fires when new ticket linked to profile (requires: Group Id, Profile Id)
7. Get Profiles — fires when new profile created (requires: Group Id)

**Actions:**
1. Create Ticket — creates a ticket (requires: Group Id, Profile Id, Message, Email Id, Contact Number)

## Data model

### Key objects

**Group** — top-level container for a brand or client workspace
```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "group_abc123",
  "name": "Acme Corp",
  "created_at": "2024-01-15T10:00:00Z"
}
```

**Topic** — monitoring query within a group (brand keywords, competitor keywords, etc.)
```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "topic_def456",
  "group_id": "group_abc123",
  "name": "Brand Mentions",
  "keywords": ["acme", "acme corp", "@acmecorp"],
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Cluster** — grouped subset of mentions within a topic (e.g., by theme or sentiment)
```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "cluster_ghi789",
  "group_id": "group_abc123",
  "topic_id": "topic_def456",
  "name": "Product Complaints",
  "mention_count": 45
}
```

**Message/Ticket** — individual mention or customer interaction
```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "msg_jkl012",
  "group_id": "group_abc123",
  "topic_id": "topic_def456",
  "profile_id": "profile_mno345",
  "message": "Your product keeps crashing on my phone",
  "channel": "twitter",
  "sentiment": "negative",
  "priority": "high",
  "status": "open",
  "assigned_to": "agent@company.com",
  "created_at": "2024-03-10T14:22:00Z"
}
```

**Profile** — customer/contact profile aggregated across channels
```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "profile_mno345",
  "group_id": "group_abc123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "channels": ["twitter", "email", "whatsapp"],
  "ticket_count": 12
}
```

## Quick-start recipes

### Recipe 1: Forward negative mentions to Slack via Zapier

**Trigger:** Get Messages by Topic (filtered to your brand monitoring topic)
**Steps:**
1. Create Zapier Zap with "Konnect Insights — Get Messages by Topic" trigger
2. Add Filter: only continue if sentiment = "negative"
3. Add Slack action: send message to #brand-alerts channel

**Zapier setup:**
- Group Id: your brand's group ID (find in Konnect Insights URL)
- Topic Id: your brand monitoring topic ID
- Since Date: leave blank for continuous polling
- Limit: 10 (Zapier polls every 1-15 min depending on plan)

### Recipe 2: Create Salesforce Case from social mention via Zapier

**Trigger:** Get Messages by Topic
**Steps:**
1. Trigger: Konnect Insights → Get Messages by Topic
2. Filter: sentiment = "negative" AND priority = "high"
3. Action: Salesforce → Create Record (Case)

**Field mapping:**
```
Salesforce Case.Subject = "Social: " + Konnect Insights Message (truncated 80 chars)
Salesforce Case.Description = Konnect Insights Message (full)
Salesforce Case.Origin = "Social Media"
Salesforce Case.Priority = "High"
Salesforce Case.Contact = lookup by Konnect Insights Profile Email
```

### Recipe 3: Create a ticket via REST API

**Auth:** API Key (account token + user token from API Details page)

```bash
curl -X POST "https://api.konnectinsights.com/v1/tickets" \
  -H "Authorization: Bearer YOUR_ACCOUNT_TOKEN" \
  -H "X-User-Token: YOUR_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "group_id": "group_abc123",
    "profile_id": "profile_mno345",
    "message": "Customer reported billing issue via phone",
    "email_id": "customer@example.com",
    "contact_number": "+1234567890"
  }'
```

<!-- Constructed from docs — verify against live API -->

```python
import requests

headers = {
    "Authorization": "Bearer YOUR_ACCOUNT_TOKEN",
    "X-User-Token": "YOUR_USER_TOKEN",
    "Content-Type": "application/json"
}

payload = {
    "group_id": "group_abc123",
    "profile_id": "profile_mno345",
    "message": "Customer reported billing issue via phone",
    "email_id": "customer@example.com",
    "contact_number": "+1234567890"
}

response = requests.post(
    "https://api.konnectinsights.com/v1/tickets",
    headers=headers,
    json=payload
)
print(response.json())
```

**Gotcha:** The exact API base URL and endpoint paths are not fully documented publicly. The developer portal (developer.konnectinsights.com) requires JavaScript. The Zapier integration is the most reliable programmatic interface for most use cases.

## Integration patterns

### CRM sync (Salesforce native)
- Install from Salesforce AppExchange
- Maps: Konnect Insights Tickets → Salesforce Cases, Profiles → Contacts
- Sync direction: bidirectional (ticket updates reflect in both)
- Conflict resolution: last-write-wins based on timestamp

### Zapier polling pattern
- Zapier polls Konnect Insights triggers every 1-15 minutes (based on Zapier plan)
- No webhook push from Konnect Insights to Zapier — it's pull-based
- Use "Since Date" parameter to avoid duplicate processing
- Zapier deduplicates by message ID automatically

### Fivetran warehouse sync
- Available for enterprise plans
- Syncs mention data, analytics, and ticket history to your data warehouse
- Use for custom BI dashboards in Looker, Tableau, or Power BI
