# hi ai Platform Reference

## Overview

hi ai is an AI customer service email reply generator for solopreneurs and small teams. Connects to Gmail, Outlook, or SMTP and uses your choice of ChatGPT, Claude, Gemini, or DeepSeek to draft replies in your brand voice. Integrates with Google Sheets for real-time customer data lookup. Privacy-first: zero permanent email storage, AI only reads emails you select. SOC 2 Type II, GDPR ready.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| AI email reply generation | Generates customer service replies in ~3 seconds | UI only |
| AI model selection | Choose ChatGPT, Claude, Gemini, or DeepSeek per reply | UI only |
| Brand voice training | Fine-tune AI on your writing style with example replies | UI only |
| System prompt customization | Custom instructions per AI model for tone/rules | UI only |
| Google Sheets integration | Connect spreadsheets as live customer/product databases | UI only |
| Excel integration | Same as Sheets, for Excel files | UI only |
| Order tracking | Integrates with tracking APIs for shipment status in replies | UI only |
| Multi-account management | Manage multiple email accounts (up to 5 Pro, 50 Enterprise) | UI only |
| Email templates | Pre-built response structures for common inquiry types | UI only |
| Multi-language support | 11 languages: EN, ES, FR, DE, ZH, JA, HI, IT, PT, RU, AR | UI only |
| Free tools | Email Writer, Voice to Email, Email Improver, Subject Line Generator | Web (free) |

**No public API, webhooks, Zapier, Make, or any programmatic interface.** hi ai is entirely UI-driven.

## Pricing, limits & plan gates

| Feature | Free ($0) | Pro ($25/mo or $20/mo annual) | Enterprise (custom) |
|---|---|---|---|
| AI emails per day | 3 | Unlimited | Unlimited |
| Email accounts | 1 | 5 | Up to 50 |
| Google Sheets/Excel | Yes | Yes | Yes |
| AI model selection | Yes | Yes | Yes |
| Brand voice training | Yes | Yes | Yes |
| Custom system prompts | Yes | Yes | Yes |
| Order tracking | Basic | Full | Full |
| Priority support | No | Yes | Yes |
| Team features | No | No | Yes |

Early access pricing: Pro at $10/mo for first month.

## Integrations

**Email providers**: Gmail, Outlook, SMTP (any provider)

**Data sources**: Google Sheets, Excel (connected as live databases)

**Tracking**: Integrates with shipping/tracking APIs for order status

**No iPaaS**: No Zapier, Make, n8n, or any automation platform integration. No public API. No webhooks.

## Data model

hi ai does not expose a public API, so there are no API data models to document.

**Internal concepts:**
- **Account**: An email provider connection (Gmail/Outlook/SMTP)
- **Sheet connection**: A linked Google Sheet or Excel file used as a customer database
- **System prompt**: Per-model instructions that control reply tone and rules
- **Fine-tuning examples**: Past replies used to train brand voice

## Quick-start recipes

Since hi ai has no API, these recipes describe UI-based setup workflows.

### Recipe 1: Set up for e-commerce support

1. **Connect email**: Sign in → connect your Gmail or Outlook support inbox via OAuth
2. **Create customer data sheet**: In Google Sheets, create columns:
   - `customer_email` | `name` | `order_id` | `order_status` | `product` | `tracking_number`
3. **Link sheet**: In hi ai settings → Data Sources → connect the Google Sheet
4. **Configure brand voice**: Go to AI Settings → add 10-20 example replies from your sent folder
5. **Set system prompt**: "You are a friendly e-commerce support agent for [Brand]. Use customer's first name. Be concise. If order data is available, reference their specific order. Never promise refunds without verification."
6. **Test**: Select an email → click "Generate reply" → review → edit if needed → send

### Recipe 2: Train brand voice from scratch

1. **Collect examples**: Export 15-20 of your best support replies covering:
   - Simple acknowledgments (3-5)
   - Order/status inquiries (3-5)
   - Complaint/escalation responses (3-5)
   - Return/refund confirmations (3-5)
2. **Upload examples**: AI Settings → Fine-tuning → paste each example
3. **Write system prompt**: Include specific rules:
   - Tone descriptors ("casual", "empathetic", "direct")
   - Words to avoid ("Dear valued customer", "inconvenience")
   - Format rules ("keep replies under 150 words", "always end with a question")
4. **Test across models**: Try the same email with ChatGPT, Claude, and Gemini to see which best matches your voice
5. **Iterate**: Refine examples and system prompt based on test results

### Recipe 3: Multi-account setup for a small team

1. **Upgrade to Pro** ($25/mo) for up to 5 accounts, or Enterprise for 50
2. **Connect each inbox**: Add support@, sales@, returns@, etc.
3. **Create per-inbox system prompts**: Each inbox gets different tone rules
   - Support: empathetic, solution-focused
   - Sales: persuasive, benefit-driven
   - Returns: efficient, policy-aware
4. **Share data sources**: All accounts can reference the same Google Sheet
5. **Assign accounts**: On Enterprise, assign team members to specific inboxes

## Integration patterns

**No API integration possible.** hi ai is a UI-only tool. For teams needing programmatic email automation, consider:
- Missive (REST API + webhooks + Zapier) for team inbox with developer surface
- Superhuman or Shortwave for AI email with broader feature sets
- Custom GPT/Claude integration via Gmail API for full programmatic control

## Security & compliance

- SOC 2 Type II compliant
- GDPR ready
- Zero permanent email storage — emails loaded on-demand from provider
- Selective AI access — AI only reads emails you explicitly choose
- End-to-end encryption for credentials
- Google and Microsoft verified OAuth app
- Independently audited
