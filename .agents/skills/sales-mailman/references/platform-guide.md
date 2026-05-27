# Mailman Platform Reference

## Overview

Mailman is a Gmail plugin that reduces email distraction by batching delivery into scheduled time slots, blocking unknown senders, and creating email-free Do Not Disturb periods. It's not an email client — it works server-side with your existing Gmail account and any Gmail-compatible client. Positions as a simpler, cheaper alternative to Superhuman ($8/mo vs $30/mo) focused solely on email timing control.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Delivery Slots | Batch email delivery at hourly intervals, set number of times per day, or specific times | UI-only |
| Do Not Disturb | Hold back all emails during preset time windows | UI-only |
| Unknown Sender Blocking | Auto-block emails from senders you haven't emailed before | UI-only |
| Newsletter/Notification Blocking | Separately filter newsletters and notification emails | UI-only |
| Daily Digest | Summary of blocked emails for review and sender management | UI-only |
| VIP List | Whitelist senders, domains, or keywords to bypass all filters | UI-only |
| Additional Inboxes | Add multiple Gmail accounts at discounted rates | UI-only |

**No public API. No webhooks. No Zapier/Make integrations. No MCP server.** All features are UI-only — configured through the Mailman dashboard at app.mailmanhq.com.

## Pricing, limits & plan gates

<!-- Best-effort — single-tier pricing, verify at mailmanhq.com/pricing -->

| Plan | Price | Notes |
|---|---|---|
| Free Trial | $0 for 21 days | Full features, no credit card required |
| Standard (annual) | $8/mo | All features included |
| Standard (monthly) | $10/mo | All features included |

**No feature gates.** Single-tier pricing means every paying user gets every feature. Additional inboxes available at discounted rates (exact discount not documented).

**No usage limits documented** — the service handles your entire Gmail inbox regardless of volume.

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| Gmail / Google Workspace | Server-side processing | Required — Mailman only works with Gmail accounts |
| Any Gmail client | Compatible | Apple Mail, Spark, Mailbird, Polymail, Superhuman, Outlook (via Gmail), Thunderbird |

**Mailman is not an email client.** It's a server-side layer that sits between Gmail and your inbox. Your email client doesn't know Mailman exists — it just receives emails on Mailman's schedule instead of in real-time.

**Can coexist with other tools:** Because Mailman only controls delivery timing, it works alongside SaneBox (sorting), Clean Email (cleanup), or AI email clients (Superhuman, Shortwave). There are no conflicts.

## Data model

Mailman has no public API, so there are no documented data objects. The platform works with standard Gmail concepts:

**Key internal concepts:**
- **Delivery Slots** — scheduled times when held-back emails are released to your inbox
- **DND Windows** — time periods when all incoming email is held
- **VIP List** — whitelist entries (sender email, domain, or keyword) that bypass all blocking
- **Blocked Digest** — daily email summarizing all blocked messages with per-sender allow/block controls
- **Additional Inboxes** — extra Gmail accounts managed under the same Mailman subscription

## Quick-start recipes

Since Mailman has no API, these are UI configuration recipes:

### Recipe 1: Solopreneur deep work setup
**Goal:** Check email only 2x/day for maximum focus time

1. Sign up at mailmanhq.com (21-day free trial)
2. Connect your Gmail account
3. Set Delivery Slots: 12:00 PM and 5:00 PM
4. Set Do Not Disturb: 8:00 AM to 12:00 PM
5. Add VIP entries:
   - Key client domains (e.g., @bigclient.com)
   - Your team members' email addresses
   - Keywords like "urgent" or "invoice"
6. Review the daily digest each evening to catch new legitimate contacts

**Gotcha:** The first week will feel uncomfortable. You'll worry about missing something. Check VIP settings are correct and trust the process — most emails don't need immediate response.

### Recipe 2: Sales team email hygiene
**Goal:** Reduce notification noise while keeping prospect emails flowing

1. Connect each team member's Gmail account
2. Set Delivery Slots: every 2 hours (9am, 11am, 1pm, 3pm, 5pm)
3. Add VIP entries:
   - CRM notification domains (e.g., @salesforce.com, @hubspot.com)
   - All prospect domains from active deals
   - Keywords: "meeting", "contract", "proposal", "demo"
4. Block: newsletters, marketing emails, social notifications
5. Review blocked digest each morning to catch cold inbound from new prospects

**Gotcha:** New prospect emails will be blocked by default since you haven't emailed them before. The daily digest is your safety net — review it religiously, especially during high-volume prospecting periods.

### Recipe 3: Combining Mailman with SaneBox
**Goal:** Sort AND batch emails for maximum inbox control

1. Set up SaneBox first — it sorts emails into smart folders (SaneLater, SaneNews, etc.)
2. Set up Mailman second — it controls when sorted emails arrive
3. SaneBox handles WHAT you see; Mailman handles WHEN you see it
4. VIP list in Mailman should mirror SaneBox's "always important" senders
5. Result: important emails arrive at delivery slot times, unimportant emails get sorted AND delayed

**Gotcha:** Both services process email server-side. This adds two intermediary layers between Gmail and your inbox. If either service has an outage, email delivery is affected.

## Competitive positioning

| Feature | Mailman | SaneBox | Superhuman | Shortwave |
|---|---|---|---|---|
| Price | $8-10/mo | $7-36/mo | $25-40/mo | $24-100/mo |
| Core approach | Delivery timing | AI sorting | Speed + AI | AI-native client |
| Email batching | Yes (core feature) | Yes (SaneDoNotDisturb) | No | No |
| Unknown sender blocking | Yes | No | No | No |
| AI categorization | No | Yes (smart folders) | Yes (Split Inbox) | Yes (AI filters) |
| AI drafting | No | No | Yes | Yes (Ghostwriter) |
| Email provider | Gmail only | Any provider | Gmail + Outlook | Gmail only |
| API/automation | None | Basic Zapier | MCP server | MCP consumer |
| Free trial | 21 days | 14 days | None | 14 days |

**When to recommend Mailman over alternatives:**
- User's core problem is constant interruptions, not email volume or content
- Budget-conscious — $8/mo is the cheapest option
- Wants to keep their existing email client unchanged
- Pairs well with other tools (SaneBox, Clean Email) since it only controls timing
