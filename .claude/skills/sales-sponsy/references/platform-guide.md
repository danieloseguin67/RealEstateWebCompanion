# Sponsy Platform Reference

## Overview

Sponsy is an all-in-one sponsorship operations platform for newsletter operators. It replaces spreadsheets and email chains with a unified system for ad inventory management, sponsor relationship tracking, asset collection, and automated performance reporting. Target audience: newsletter operators managing 5+ direct sponsors across one or more publications.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Ad Inventory Calendar** | Visual calendar of ad slots across publications — booked, available, pending. Bulk slot creation, drag-and-drop swapping. | Zapier (New Slot, Update Slot, Delete Slot triggers + Create/Update Slot actions). API (undocumented). |
| **Sponsor CRM** | Track advertiser relationships, historical performance, LTV, communication history. | Zapier (New Customer trigger + Create/Update/Find Customer actions). API (undocumented). |
| **Customer Portal** | Branded portals where sponsors submit creative assets, approve placements, and view performance. Built-in approval workflows. | UI-only — no Zapier triggers for asset submission or approval events. |
| **Ad Reports** | Auto-pulls open/click metrics from connected ESPs. One-click report generation. Scheduled report distribution to sponsors. | ESP integration (pull metrics). UI-only for report generation and scheduling. |
| **Automations** | Asset due reminders, status update triggers, custom workflow automation. | UI-only (Scale plan). No Zapier triggers for automation events. |
| **Deals** | Pipeline for tracking sponsorship opportunities from lead to close. | Scale plan only. UI-only — not exposed via Zapier. |
| **Storefronts** | Public-facing booking pages where potential sponsors can view available inventory and request placements. | UI-only. |
| **Payments** | Stripe integration for invoicing and payment collection. | Stripe-managed. |
| **Slack** | Notifications for slot updates, customer activity. | Native Slack integration. |

## Pricing, limits & plan gates

| Feature | Growth ($79/mo) | Scale ($109/mo) | Custom (contact) |
|---|---|---|---|
| Ads per month | 15 | 15 | 100+ |
| Publications | 10 | 10 | Custom |
| Seats | 15 | 15 | Custom |
| CRM | Yes | Yes | Yes |
| Customer Portal | Yes | Yes | Yes |
| Storefronts | Yes | Yes | Yes |
| ESP Integrations | Yes | Yes | Yes |
| Zapier | Yes | Yes | Yes |
| API | Yes | Yes | Yes |
| Deals | No | Yes | Yes |
| Advanced Analytics | No | Yes | Yes |
| Automations | No | Yes | Yes |
| User Roles & Permissions | No | Yes | Yes |
| HubSpot Integration | No | No | Yes |
| Priority Support | No | No | Yes |
| Concierge Onboarding | No | Yes | Yes |

All plans: 7-day free trial, no credit card required, cancel anytime.

**Rate limits**: Not publicly documented for either API or Zapier.

## Integrations

### ESP integrations (18 — reporting data pull)

beehiiv, Mailchimp, Kit, Campaign Monitor, Ghost, EmailOctopus, ActiveCampaign, Sailthru, Omeda, Customer.io, MailerLite, PostUp, Constant Contact, Iterable, SendGrid, Klaviyo, Brevo, Delivra

Data flow: **Read-only from ESP → Sponsy**. Sponsy pulls open/click metrics from the ESP for ad performance reports. It does NOT send emails or manage ESP subscribers.

### CRM

HubSpot — **Custom plan only**. Syncs customer/deal data between Sponsy and HubSpot. For Growth/Scale plans, use Zapier as a workaround.

### Payments

Stripe — invoicing and payment collection for sponsorship deals.

### Notifications

Slack — real-time notifications for key events.

### Automation

Zapier — primary iPaaS surface. No Make or n8n integration.

### Chrome Extension

Browser extension for quick access to Sponsy features from anywhere.

## Data model

Sponsy's core objects based on Zapier trigger/action schema:

### Customer (Sponsor)
<!-- Constructed from Zapier actions — verify against live API -->
```json
{
  "id": "cust_abc123",
  "name": "Acme Corp",
  "email": "sponsor@acme.com",
  "company": "Acme Corp",
  "notes": "Q2 campaign focus on developer tools",
  "created_at": "2026-01-15T10:00:00Z"
}
```

### Slot (Ad Placement)
<!-- Constructed from Zapier actions — verify against live API -->
```json
{
  "id": "slot_xyz789",
  "publication_id": "pub_def456",
  "customer_id": "cust_abc123",
  "date": "2026-02-01",
  "status": "booked",
  "type": "primary_sponsor",
  "price": 250.00,
  "notes": "Full section placement",
  "created_at": "2026-01-20T14:30:00Z"
}
```

### Publication
<!-- Constructed from Zapier triggers — verify against live API -->
```json
{
  "id": "pub_def456",
  "name": "Dev Weekly",
  "description": "Weekly developer newsletter",
  "created_at": "2025-06-01T08:00:00Z"
}
```

**Relationships**: A Publication has many Slots. A Customer has many Slots. A Slot belongs to one Publication and one Customer.

## Zapier triggers & actions

### Triggers

| Trigger | Fires when... |
|---|---|
| New Customer | A new customer/sponsor is created in Sponsy |
| New Slot | A new ad slot is created |
| Update Slot | An existing slot is modified (status change, date change, etc.) |
| New Publication | A new publication is created |
| Delete Slot | A slot is removed |

### Actions

| Action | Does... |
|---|---|
| Create Customer | Creates a new customer record |
| Update Customer | Updates an existing customer |
| Find a Customer | Searches for a customer by name or email |
| Create Slot | Creates a new ad slot for a publication |
| Update Slot | Updates an existing slot |
| Find a Slot | Searches for a slot |
| Fetch Slot | Retrieves a specific slot by publication ID + slot ID |

## Quick-start recipes

### Recipe 1: Sync new Sponsy sponsors to HubSpot (Zapier)

**Use case**: You're on Growth/Scale plan and need sponsors in HubSpot without the Custom plan.

**Trigger**: Sponsy → New Customer
**Action**: HubSpot → Create Contact

Zapier setup:
1. Create a new Zap
2. Trigger: Sponsy → New Customer
3. Action: HubSpot → Create Contact
4. Map fields:
   - Email → Customer email
   - First Name → Customer name (split if needed)
   - Company → Customer company
   - Lead Source → "Sponsy"
5. Test and enable

**Gotcha**: Zapier's Sponsy integration doesn't expose customer tags or custom fields. You'll need to add HubSpot-specific enrichment in a second Zapier step if needed.

### Recipe 2: Slack notification when a slot is booked

**Use case**: Get instant team alerts when sponsors book new placements.

**Trigger**: Sponsy → New Slot
**Filter**: Slot status = "booked" (if available in trigger data)
**Action**: Slack → Send Channel Message

Message template:
```
New sponsorship booked!
Sponsor: {{customer_name}}
Publication: {{publication_name}}
Date: {{slot_date}}
Type: {{slot_type}}
Price: ${{slot_price}}
```

### Recipe 3: Auto-create a slot when a HubSpot deal closes

**Use case**: When a sponsor deal closes in HubSpot, automatically create the ad slot in Sponsy.

**Trigger**: HubSpot → Deal Stage Change (to "Closed Won")
**Action**: Sponsy → Create Slot

Map fields:
- Publication ID → from deal custom property
- Customer → Find Customer by email, or Create Customer first
- Date → from deal close date or custom property
- Price → from deal amount

**Gotcha**: You need the Sponsy publication ID. Look it up in Sponsy first, then store it as a HubSpot deal custom property for this automation to work.

## Integration patterns

### ESP reporting pipeline

Sponsy connects to your ESP to pull email performance data. The integration is read-only — Sponsy fetches opens, clicks, and related metrics per issue/campaign to populate ad reports.

**Setup pattern**:
1. In Sponsy → Integrations → select your ESP
2. Authorize via OAuth (most ESPs) or API key
3. Map Sponsy publications to ESP lists/campaigns
4. Sponsy auto-pulls metrics after each send

**Conflict handling**: Sponsy reads ESP data as source of truth. If metrics differ from what you see in the ESP dashboard, check the metric sync timing — Sponsy may pull data before final metrics stabilize (some ESPs update open/click counts for 24-48 hours after send).

### Zapier automation patterns

**Bi-directional CRM sync**: Use Sponsy's Find Customer + Update Customer actions paired with CRM triggers to keep both systems in sync. Be careful of update loops — add a filter step to check if the update originated from the other system.

**Multi-step workflows**: Chain Sponsy triggers with multiple actions:
- New Slot → Create Google Calendar event + Send Slack notification + Update CRM deal stage
- Update Slot (status → "completed") → Trigger ad report generation (manual step) + Send follow-up email via CRM

### API (undocumented)

The API is listed as a Growth plan feature but has no public documentation. If you need programmatic access:
1. Contact Sponsy at support@getsponsy.com
2. Request API documentation and credentials
3. Note: the Zapier integration suggests RESTful endpoints exist for customers, slots, and publications

## Partner program

Sponsy offers a partner program with 30% commission for 12 months on referred customers. Apply at getsponsy.com/partners.
