# Moosend Platform Reference

## Overview

Moosend is a budget email marketing platform offering drag-and-drop campaigns, visual automation workflows, landing pages, subscription forms, segmentation, and AI-powered ecommerce product recommendations. Acquired by Sitecore in 2021. Best for small teams and solopreneurs who need affordable unlimited-send email marketing with solid automation. Pro plan starts at $7/mo (annual) for 500 subscribers.

## Capabilities & automation surface

| Capability | Access | Notes |
|---|---|---|
| Email campaigns (broadcasts) | API + UI | Drag-and-drop editor, A/B testing (subject, content, sender), scheduling |
| Automation workflows | UI-only (trigger via API subscriber events) | Visual builder, 30+ pre-built recipes, triggers: subscribe, open, click, cart abandon, date-based |
| Mailing lists | API + UI | Create, manage, import/export subscribers |
| Subscriber management | API + UI | Add, update, remove, bulk operations, custom fields |
| Segmentation | API + UI | Behavioral + demographic, conditional splits in automations |
| Landing pages | UI-only | Drag-and-drop builder, templates, custom domains |
| Subscription forms | UI-only | Pop-ups, inline, floating, full-page |
| Ecommerce AI recommendations | UI-only (requires tracking JS) | Cross-sell, upsell, weather-based, recently viewed |
| Transactional email | API | SMTP relay or API sends |
| Reporting & analytics | API + UI | Campaign stats, automation stats, subscriber activity |
| Website tracking | JS snippet | Tracks page views, cart events, purchases for automation triggers |

## Pricing, limits & plan gates

| Plan | Price | Subscribers | Sends | Key features |
|---|---|---|---|---|
| **30-day trial** | Free | Up to 1,000 | Unlimited | Full feature access |
| **Pro** | $7/mo (annual) / $9/mo (monthly) | 500 base (scales with list size) | Unlimited | Campaigns, automations, landing pages, forms, transactional SMTP, API |
| **Moosend+** | Custom | Custom | Unlimited | Dedicated IP, priority support, custom reporting |
| **Enterprise** | Custom | Custom | Unlimited | SSO/SAML, migration services, SLA, dedicated CSM |

Pricing scales by subscriber count on Pro:
- 500 subs: $7/mo
- 2,500 subs: ~$16/mo
- 5,000 subs: ~$24/mo
- 10,000 subs: ~$44/mo
- 25,000 subs: ~$100/mo
- 50,000 subs: ~$180/mo

<!-- Pricing is approximate — verify against moosend.com/pricing -->

**Plan gates:**
- Landing pages: Pro+ only (included in trial)
- Transactional SMTP: Pro+ only
- Dedicated IP: Moosend+ only
- SSO/SAML: Enterprise only
- API access: All plans including trial

## Integrations

**Native connectors** (data flows bidirectionally where noted):
- **Ecommerce**: WooCommerce, Shopify, Magento, BigCommerce, PrestaShop, OpenCart, Ecwid, Zen Cart → subscriber sync, purchase events, cart abandonment
- **CRM**: Salesforce, HubSpot, Zoho → contact sync
- **CMS**: WordPress plugin
- **Zapier**: Triggers (New Subscriber, Unsubscribed) + Actions (Add Subscriber, Remove Subscriber, Send Campaign)
- **Make (Integromat)**: Multiple modules available
- **Custom**: REST API v3, webhooks via automation (HTTP POST action in workflow)

## Data model

### Mailing List

```json
{
  "ID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "Name": "Newsletter Subscribers",
  "ActiveMemberCount": 1250,
  "BouncedMemberCount": 15,
  "RemovedMemberCount": 42,
  "UnsubscribedMemberCount": 38,
  "Status": 0,
  "CreatedBy": "user@example.com",
  "CreatedOn": "/Date(1609459200000+0200)/",
  "UpdatedBy": "user@example.com",
  "UpdatedOn": "/Date(1640995200000+0200)/"
}
```

### Subscriber

```json
{
  "ID": "a1b2c3d4-subscriber-guid",
  "Name": "Jane Doe",
  "Email": "jane@example.com",
  "CreatedOn": "/Date(1609459200000+0200)/",
  "UnsubscribedOn": null,
  "SubscribeType": 1,
  "CustomFields": [
    "Company=Acme Inc",
    "Plan=Pro"
  ],
  "RemovedOn": null,
  "Tags": ["vip", "ecommerce"]
}
```
<!-- Constructed from docs — verify against live API -->

### Campaign

```json
{
  "ID": "campaign-guid-here",
  "Name": "May Newsletter",
  "Subject": "Your May update is here",
  "SenderEmail": "news@example.com",
  "Status": 3,
  "MailingListID": "list-guid-here",
  "TotalSent": 1200,
  "TotalOpens": 320,
  "UniqueOpens": 280,
  "TotalClicks": 95,
  "UniqueClicks": 78,
  "TotalBounces": 5,
  "TotalUnsubscribes": 3,
  "TotalComplaints": 0,
  "CreatedOn": "/Date(1715817600000+0200)/",
  "DeliveredOn": "/Date(1715904000000+0200)/"
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: Create a mailing list and add a subscriber

**Trigger**: New user signs up on your app
**Steps**: Create list → Add subscriber with custom fields

```bash
# Create a mailing list
curl -X POST "https://api.moosend.com/v3/lists/create.json?apikey=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"Name": "App Signups", "ConfirmationPage": "", "RedirectAfterUnsubscribePage": ""}'

# Add a subscriber (replace LIST_ID with the ID from the response above)
curl -X POST "https://api.moosend.com/v3/subscribers/LIST_ID/subscribe.json?apikey=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Jane Doe",
    "Email": "jane@example.com",
    "HasExternalDoubleOptIn": false,
    "CustomFields": ["Company=Acme Inc", "Plan=Pro"]
  }'
```

```python
import requests

API_KEY = "YOUR_API_KEY"
BASE = "https://api.moosend.com/v3"

# Create mailing list
resp = requests.post(
    f"{BASE}/lists/create.json",
    params={"apikey": API_KEY},
    json={"Name": "App Signups"}
)
list_id = resp.json()["Context"]
print(f"Created list: {list_id}")

# Add subscriber
resp = requests.post(
    f"{BASE}/subscribers/{list_id}/subscribe.json",
    params={"apikey": API_KEY},
    json={
        "Name": "Jane Doe",
        "Email": "jane@example.com",
        "CustomFields": ["Company=Acme Inc", "Plan=Pro"]
    }
)
print(resp.json())
```

**Gotcha**: Custom field keys must match exactly what's configured in Moosend (case-sensitive).

### Recipe 2: Send a campaign and check stats

**Trigger**: Weekly newsletter ready to send
**Steps**: Create draft → Send → Poll for stats

```bash
# Get all mailing lists to find the target list ID
curl "https://api.moosend.com/v3/lists.json?apikey=YOUR_API_KEY"

# Get all campaigns (to check existing drafts)
curl "https://api.moosend.com/v3/campaigns.json?apikey=YOUR_API_KEY&Page=1&PageSize=10"

# Send a draft campaign (replace CAMPAIGN_ID)
curl -X POST "https://api.moosend.com/v3/campaigns/CAMPAIGN_ID/send.json?apikey=YOUR_API_KEY"

# Get campaign stats after sending
curl "https://api.moosend.com/v3/campaigns/CAMPAIGN_ID/stats.json?apikey=YOUR_API_KEY"
```

```python
import requests
import time

API_KEY = "YOUR_API_KEY"
BASE = "https://api.moosend.com/v3"

# Send a draft campaign
campaign_id = "YOUR_CAMPAIGN_ID"
resp = requests.post(
    f"{BASE}/campaigns/{campaign_id}/send.json",
    params={"apikey": API_KEY}
)
print(f"Send status: {resp.json()}")

# Wait, then fetch stats
time.sleep(60)
stats = requests.get(
    f"{BASE}/campaigns/{campaign_id}/stats.json",
    params={"apikey": API_KEY}
)
data = stats.json()["Context"]
print(f"Sent: {data['TotalSent']}, Opens: {data['UniqueOpens']}, Clicks: {data['UniqueClicks']}")
```

### Recipe 3: Unsubscribe inactive subscribers in bulk

**Trigger**: Quarterly list cleanup
**Steps**: Get subscribers → Filter inactive → Unsubscribe

```python
import requests

API_KEY = "YOUR_API_KEY"
BASE = "https://api.moosend.com/v3"
LIST_ID = "YOUR_LIST_ID"

# Get unsubscribed/bounced members for cleanup reporting
resp = requests.get(
    f"{BASE}/lists/{LIST_ID}/subscribers/Subscribed.json",
    params={"apikey": API_KEY, "Page": 1, "PageSize": 500}
)
subscribers = resp.json()["Context"]["Subscribers"]

# Unsubscribe specific emails
emails_to_remove = ["inactive1@example.com", "inactive2@example.com"]
for email in emails_to_remove:
    resp = requests.post(
        f"{BASE}/subscribers/{LIST_ID}/unsubscribe.json",
        params={"apikey": API_KEY},
        json={"Email": email}
    )
    print(f"Unsubscribed {email}: {resp.status_code}")
```

**Gotcha**: Pagination is 1-based (`Page=1`). The response includes `Paging.TotalPageCount` to know when to stop.

## Integration patterns

### CRM sync (e.g., HubSpot → Moosend)

1. **Webhook approach**: Set up a HubSpot workflow that fires a webhook on contact property change → hit Moosend subscribe API
2. **Zapier approach**: HubSpot trigger (New Contact) → Moosend action (Add Subscriber)
3. **Batch sync**: Nightly script pulls HubSpot contacts via API, upserts into Moosend mailing list via subscribe endpoint (existing emails are updated, not duplicated)

**Conflict resolution**: Moosend treats the mailing list as the source of truth for subscription status. If a contact unsubscribes in Moosend, re-subscribing them via API requires `HasExternalDoubleOptIn: true` or they won't be re-added.

### Webhook listener (automation HTTP action)

Moosend doesn't have traditional webhook subscriptions. Instead, use automation workflows with an **HTTP POST** action step:

1. Create an automation with a trigger (e.g., "Subscriber added to list")
2. Add an action: **Send HTTP request**
3. Configure: POST to your endpoint, JSON body with merge tags (subscriber email, name, custom fields)
4. No HMAC signing — validate by checking the sender IP or including a shared secret in the payload

### Ecommerce tracking setup

1. Install the Moosend website tracking snippet (from Settings > General > Website Tracking)
2. Add the ecommerce tracking JS to product pages, cart, and checkout
3. Map product events: `mootrack('product', { url, name, price, image })`
4. Cart events fire automatically after product tracking is configured
5. Purchase events: `mootrack('purchase', { orderId, revenue, products: [...] })`
