# Listmonk Platform Reference

## Overview

Listmonk is a free, open-source (AGPLv3), self-hosted newsletter and mailing list manager written in Go with a PostgreSQL backend. Ships as a single binary or Docker image. Designed for developers who want full control over their email infrastructure without SaaS fees — handles millions of subscribers with multi-threaded, multi-SMTP email queues.

## Capabilities & automation surface

| Capability | Description | Automation surface |
|---|---|---|
| **Subscriber management** | Import/export CSV, custom JSON attributes, search with SQL expressions, blocklisting | **API-accessible** — full CRUD + batch operations |
| **Mailing lists** | Public/private, single/double opt-in, tags, per-list roles | **API-accessible** — full CRUD |
| **Campaigns** | Draft, schedule, send; A/B content; archive to public page | **API-accessible** — create, update, status change, analytics |
| **Templates** | Go `html/template` engine with 100+ functions, WYSIWYG + code editor | **API-accessible** — CRUD on templates |
| **Transactional email** | API-driven messages using predefined templates with custom data | **API-accessible** — POST /api/tx |
| **Bounce processing** | Inbound webhook receivers for SES (SNS), SendGrid, Postmark | **Webhook-accessible** (inbound only) |
| **Analytics** | Opens, clicks, bounces, link tracking, campaign stats | **API-accessible** — GET endpoints |
| **Media library** | Upload images/attachments, local or S3-compatible storage | **API-accessible** |
| **Multi-SMTP** | Multiple SMTP providers with round-robin and rate limiting | **Config file** (config.toml) |
| **Messengers** | Extensible HTTP webhook messengers for SMS, WhatsApp, FCM | **Config file** + webhook |
| **Authentication** | OIDC SSO, role-based permissions, granular API tokens | **Admin UI** |

## Pricing, limits & plan gates

Listmonk is free with no feature gates. All features are available to everyone.

| Cost component | Typical cost |
|---|---|
| Listmonk software | Free (AGPLv3) |
| VPS hosting (1GB RAM) | $5-10/mo (DigitalOcean, Hetzner, etc.) |
| PostgreSQL | Included on VPS or managed ($5-15/mo) |
| SMTP provider (SES) | $0.10 per 1,000 emails |
| SMTP provider (Mailgun) | $0.80 per 1,000 emails (Flex plan) |
| SMTP provider (Postmark) | $1.25 per 1,000 emails |
| Domain | $10-15/yr |
| **Total for 10K subscribers, 4 campaigns/mo** | **~$10-25/mo** |

**Comparison with managed alternatives:**
| Subscribers | Listmonk + SES | MailerLite | Beehiiv | Buttondown |
|---|---|---|---|---|
| 1,000 | ~$6/mo | Free | Free | $9/mo |
| 5,000 | ~$8/mo | $32/mo | Free | $29/mo |
| 10,000 | ~$10/mo | $47/mo | $43/mo (Scale) | $79/mo |
| 50,000 | ~$25/mo | $139/mo | $43/mo (Scale) | $79/mo |
| 100,000 | ~$45/mo | $289/mo | $86/mo (Max) | Custom |

Listmonk is dramatically cheaper at scale, but you pay with setup time and maintenance responsibility.

## Integrations

### SMTP providers (configure in config.toml or Admin UI)
- **Amazon SES** — cheapest at scale, requires bounce/complaint SNS setup
- **Mailgun** — easy setup, webhook bounce processing
- **Postmark** — best deliverability, webhook bounce processing
- **SendGrid** — common, event webhook for bounces
- **Any SMTP server** — including self-hosted Postal, Haraka, etc.

### iPaaS / automation
- **n8n** — community node: `n8n-nodes-listmonk` (GitHub: wiesinghilker/n8n-nodes-listmonk)
- **MCP server** — `listmonk-mcp` (GitHub: rhnvrm/listmonk-mcp) for AI agent access
- **Terraform** — `terraform-provider-listmonk` for infrastructure-as-code subscriber/list management
- **No native Zapier or Make integration** — use the REST API directly or n8n as middleware

### CMS integrations
- **WordPress/WooCommerce** — community plugin: `integration-listmonk-wordpress-plugin`
- **Ghost** — community bridge: `auto-newsletter-listmonk`
- **Frappe** — `frappe_listmonk`
- **Nuxt.js** — `nuxt-listmonk`

### Community SDKs (not officially supported)
- **Python:** `pip install listmonk` (mikeckennedy/listmonk) or `pip install listmonk-api` (Knuckles-Team/listmonk-api)
- **PHP:** `listmonk-php-client`, `php-listmonk`, `listmonk-laravel`
- **Go:** `go-listmonk`
- **Node.js:** `listmonk-nodejs-api`
- **TypeScript/Bun:** `@maloma/listmonk`
- **Java/Kotlin:** `listmonk-japi`
- **Crystal:** `listmonk-crystal`

## Data model

### Subscriber
```json
{
  "id": 1,
  "created_at": "2024-01-15T10:00:00.000000+00:00",
  "updated_at": "2024-01-15T10:00:00.000000+00:00",
  "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "user@example.com",
  "name": "Jane Doe",
  "attribs": {
    "company": "Acme Inc",
    "plan": "pro",
    "signup_source": "landing_page"
  },
  "status": "enabled",
  "lists": [
    {
      "subscription_status": "confirmed",
      "id": 1,
      "uuid": "list-uuid-here",
      "name": "Weekly Newsletter",
      "type": "public",
      "optin": "double"
    }
  ]
}
```

### List
```json
{
  "id": 1,
  "created_at": "2024-01-01T00:00:00.000000+00:00",
  "updated_at": "2024-01-01T00:00:00.000000+00:00",
  "uuid": "list-uuid-here",
  "name": "Weekly Newsletter",
  "type": "public",
  "optin": "double",
  "tags": ["newsletter", "weekly"],
  "description": "Our weekly product updates",
  "subscriber_count": 5000,
  "status": "active"
}
```

### Campaign
<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 1,
  "created_at": "2024-03-01T09:00:00.000000+00:00",
  "updated_at": "2024-03-01T09:00:00.000000+00:00",
  "uuid": "campaign-uuid-here",
  "name": "March Newsletter",
  "subject": "What's new in March",
  "from_email": "newsletter@example.com",
  "status": "draft",
  "type": "regular",
  "tags": ["monthly"],
  "template_id": 1,
  "lists": [{"id": 1}],
  "body": "<p>Hello {{ .Subscriber.Name }}!</p>",
  "content_type": "richtext",
  "send_at": "2024-03-15T09:00:00.000000+00:00",
  "started_at": null,
  "to_send": 5000,
  "sent": 0
}
```

## Quick-start recipes

### Recipe 1: Add a subscriber to a list via API

**Use case:** Automatically subscribe users from your web app when they sign up.

```bash
curl -u "api_user:your-api-token" \
  -H "Content-Type: application/json" \
  -X POST "http://your-listmonk:9000/api/subscribers" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "status": "enabled",
    "lists": [1],
    "attribs": {"source": "web_signup", "plan": "free"},
    "preconfirm_subscriptions": true
  }'
```

```python
import requests

LISTMONK_URL = "http://your-listmonk:9000"
API_USER = "api_user"
API_TOKEN = "your-api-token"

resp = requests.post(
    f"{LISTMONK_URL}/api/subscribers",
    auth=(API_USER, API_TOKEN),
    json={
        "email": "newuser@example.com",
        "name": "New User",
        "status": "enabled",
        "lists": [1],
        "attribs": {"source": "web_signup", "plan": "free"},
        "preconfirm_subscriptions": True
    }
)
print(resp.json())
# {"data": {"id": 123, "email": "newuser@example.com", ...}}
```

**Gotcha:** If `preconfirm_subscriptions` is `false` (default), the subscriber gets a confirmation email. Set to `true` only when you've already verified consent (e.g., your own signup form with double opt-in).

### Recipe 2: Send a transactional email (order confirmation, password reset)

**Use case:** Send a templated transactional email from your app.

First create a transactional template in Listmonk Admin → Templates (note the template ID).

```bash
curl -u "api_user:your-api-token" \
  -H "Content-Type: application/json" \
  -X POST "http://your-listmonk:9000/api/tx" \
  -d '{
    "subscriber_email": "customer@example.com",
    "template_id": 2,
    "data": {
      "order_id": "ORD-1234",
      "items": ["Widget A", "Widget B"],
      "total": "$49.99"
    },
    "content_type": "html"
  }'
```

```python
import requests

resp = requests.post(
    f"{LISTMONK_URL}/api/tx",
    auth=(API_USER, API_TOKEN),
    json={
        "subscriber_email": "customer@example.com",
        "template_id": 2,
        "data": {
            "order_id": "ORD-1234",
            "items": ["Widget A", "Widget B"],
            "total": "$49.99"
        },
        "content_type": "html"
    }
)
print(resp.json())
# {"data": true}
```

**Gotcha:** By default, `subscriber_mode` is `"default"` — the recipient must exist as a subscriber. Use `"external"` mode with `subscriber_emails` array to send to anyone without creating a subscriber record.

### Recipe 3: Create and send a campaign via API

**Use case:** Programmatically create and schedule a campaign (e.g., from a CI/CD pipeline or content management system).

```bash
# Step 1: Create the campaign
curl -u "api_user:your-api-token" \
  -H "Content-Type: application/json" \
  -X POST "http://your-listmonk:9000/api/campaigns" \
  -d '{
    "name": "Weekly Digest - March 15",
    "subject": "This Week in Tech",
    "lists": [1],
    "from_email": "newsletter@example.com",
    "type": "regular",
    "content_type": "richtext",
    "body": "<h1>Weekly Digest</h1><p>Hello {{ .Subscriber.Name }}!</p>",
    "template_id": 1,
    "tags": ["weekly", "digest"]
  }'
# Returns: {"data": {"id": 42, ...}}

# Step 2: Start the campaign
curl -u "api_user:your-api-token" \
  -H "Content-Type: application/json" \
  -X PUT "http://your-listmonk:9000/api/campaigns/42/status" \
  -d '{"status": "running"}'
```

```python
import requests

# Create campaign
campaign = requests.post(
    f"{LISTMONK_URL}/api/campaigns",
    auth=(API_USER, API_TOKEN),
    json={
        "name": "Weekly Digest - March 15",
        "subject": "This Week in Tech",
        "lists": [1],
        "from_email": "newsletter@example.com",
        "type": "regular",
        "content_type": "richtext",
        "body": "<h1>Weekly Digest</h1><p>Hello {{ .Subscriber.Name }}!</p>",
        "template_id": 1,
        "tags": ["weekly", "digest"]
    }
).json()

campaign_id = campaign["data"]["id"]

# Start campaign
requests.put(
    f"{LISTMONK_URL}/api/campaigns/{campaign_id}/status",
    auth=(API_USER, API_TOKEN),
    json={"status": "running"}
)
```

**Gotcha:** Campaign status transitions are strict: `draft` → `running` or `draft` → `scheduled`. You cannot go directly from `draft` to `cancelled`. A running campaign can be `paused` then `cancelled`.

## Integration patterns

### SMTP configuration (config.toml)
```toml
[smtp.1]
enabled = true
host = "email-smtp.us-east-1.amazonaws.com"
port = 587
auth_protocol = "login"
username = "AKIA..."
password = "your-ses-smtp-password"
tls_type = "STARTTLS"
max_conns = 10
max_msg_retries = 3
idle_timeout = "15s"

# Rate limiting to match SES quota
[smtp.1.email_headers]

# For multiple providers, add [smtp.2], [smtp.3], etc.
```

### SES bounce processing architecture
```
Listmonk → SES (send email)
SES → SNS Topic (bounce/complaint notification)
SNS → HTTPS Subscription → https://your-listmonk:9000/webhooks/service/ses
Listmonk processes bounce → blocklists subscriber (hard bounce) or increments count (soft bounce)
```

**Setup steps:**
1. In SES: Configuration Set → Event Destinations → SNS Topic for Bounces + Complaints
2. In SNS: Create subscription → Protocol: HTTPS → Endpoint: `https://your-listmonk/webhooks/service/ses`
3. SNS sends confirmation request → Listmonk auto-confirms
4. In Listmonk Admin: Settings → Bounces → configure soft bounce threshold and blocklist actions

### Subscriber sync architecture (web app → Listmonk)
```
Your App (user signs up) → POST /api/subscribers (with list IDs + attributes)
                         → Listmonk creates subscriber + triggers opt-in email
User confirms → Listmonk marks subscription as confirmed
Your App (user upgrades) → PUT /api/subscribers/{id} (update attribs: plan=pro)
Your App (user cancels)  → PUT /api/subscribers/lists (action: "unsubscribe")
```

### Content pipeline (CMS → Listmonk)
```
Ghost/WordPress (new post published)
  → Webhook or RSS trigger
  → n8n / custom script
  → POST /api/campaigns (create campaign with post content)
  → PUT /api/campaigns/{id}/status (start sending)
```
