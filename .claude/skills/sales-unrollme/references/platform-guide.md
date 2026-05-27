# Unroll.me Platform Reference

## Overview

Unroll.me is a free inbox management tool that identifies newsletter and promotional email subscriptions and lets you unsubscribe in one click or consolidate them into a daily digest (Rollup). Owned by NielsenIQ — monetized by scanning full email content and selling anonymized purchase/transaction data. Not available in the EU.

## Capabilities & automation surface

| Capability | What it does | Access |
|---|---|---|
| **Subscription Discovery** | Scans inbox to identify all newsletter/promotional email senders, displays them in a dashboard | UI-only |
| **One-Click Unsubscribe** | Sends unsubscribe requests on your behalf (follows links, sends emails) | UI-only |
| **Rollup Digest** | Consolidates selected newsletters into a single daily email at a chosen time | UI-only |
| **Multi-Account** | Connect and manage multiple email accounts from one dashboard | UI-only |
| **Subscription List** | View all subscriptions with options: Unsubscribe, Add to Rollup, or Keep in Inbox | UI-only |

**Developer surface: None.** No public API, no webhooks, no Zapier/Make integration, no MCP server. Unroll.me is entirely a consumer UI tool.

## Pricing, limits & plan gates

**Completely free.** No paid tiers, no premium features. The service is funded by NielsenIQ's data monetization business.

- No account limits on free tier
- No rate limits on unsubscribes
- No feature gates between tiers (there's only one tier)
- Revenue comes from scanning email content and selling anonymized market research

## Email provider support

| Provider | Auth method | Notes |
|---|---|---|
| Gmail / Google Workspace | OAuth2 | Primary supported provider |
| Outlook / Microsoft 365 | OAuth2 | Supported |
| Yahoo | OAuth2 | Supported |
| AOL | OAuth2 | Supported |
| Apple iCloud | OAuth2 / app password | Supported |
| IMAP (generic) | Not supported | No IMAP login option |

**Platform apps:**
- Web app (any browser)
- iOS app
- Android app
- No desktop app

## Privacy & data practices

This is the most important section for users evaluating Unroll.me.

**What Unroll.me accesses:**
- Full email content (bodies, not just headers/metadata)
- Purchase receipts, transaction confirmations, shipping notifications
- Subscription and newsletter metadata

**What NielsenIQ does with it:**
- Extracts purchase/transaction data from emails
- Anonymizes and aggregates the data
- Sells it to corporate clients as market research intelligence
- Example: In 2017, Lyft ride receipts from Unroll.me users were sold to Uber for competitive intelligence

**Regulatory history:**
- **2017**: New York Times exposed that Unroll.me sold Lyft receipt data to Uber
- **2019**: FTC settlement for deceptive privacy practices — required better disclosure
- **2018**: Deleted all EU user accounts — could not comply with GDPR requirements
- Post-settlement, the data practices continue but with more transparent disclosure

**What you cannot opt out of:**
- You can opt out of the "Measurement Panel" program
- You cannot opt out of baseline email scanning while using the service
- There is no way to use Unroll.me without granting ongoing inbox access

**Comparison of privacy approaches:**

| Tool | What it reads | Sells data? | GDPR-compliant? |
|---|---|---|---|
| Unroll.me | Full email content | Yes (NielsenIQ) | No (banned in EU) |
| Clean Email | Headers only (sender, subject, date, size) | No | Yes |
| SaneBox | Metadata only (sender, subject, date) | No | Yes |
| Inbox Zero | Full email (for AI features) | No (open-source) | Yes (SOC 2 Type 2) |
| InboxPurge | Processes locally in browser | No | Yes |
| Leave Me Alone | Headers for unsubscribe detection | No | Yes |

## Key features detail

### Unsubscribe

When you tap "Unsubscribe" on a sender:
1. Unroll.me identifies the unsubscribe mechanism (List-Unsubscribe header, in-email link, or email-based request)
2. Sends the appropriate unsubscribe request
3. Filters future emails from that sender

**Limitations:**
- 48-hour to 7-day grace period for most mailing lists
- Some senders ignore unsubscribe requests (non-CAN-SPAM-compliant)
- No block/filter fallback if unsubscribe fails (unlike Clean Email's True Unsubscriber)
- Cannot unsubscribe from transactional emails (order confirmations, etc.)

### Rollup Digest

When you add a sender to Rollup:
1. Future emails from that sender are intercepted
2. Combined into a single daily digest email
3. Delivered at your chosen time
4. Individual emails are still accessible by clicking through

**Configuration:**
- Set delivery time in Rollup settings
- Choose which subscriptions go into the Rollup
- Decisions can be changed at any time (switch between Unsubscribe/Rollup/Keep)

## Comparison with alternatives

| Feature | Unroll.me | Clean Email | SaneBox | Inbox Zero |
|---|---|---|---|---|
| **Primary function** | Unsubscribe + digest | Bulk cleanup + rules | AI triage + folders | AI labels + rules + drafts |
| **Pricing** | Free | $29.99/yr | $84/yr (Snack) | $216/yr (Starter) |
| **Email providers** | Gmail/Outlook/Yahoo/AOL/iCloud | Any (OAuth/IMAP) | Any (IMAP) | Gmail/Outlook |
| **Reads email bodies** | Yes | No (headers only) | No (metadata only) | Yes (for AI) |
| **Sells data** | Yes (NielsenIQ) | No | No | No (open-source) |
| **EU available** | No | Yes | Yes | Yes |
| **Bulk cleanup** | No | Yes | No | Yes (archive/delete) |
| **Auto rules** | No | Yes (Auto Clean) | Yes (smart folders) | Yes (plain-English) |
| **Block fallback** | No | Yes (True Unsubscriber) | Yes (SaneBlackHole) | Yes (cold email blocker) |
| **API** | None | None | None | REST API + CLI |
| **Best for** | Quick free unsubscribe (privacy trade-off) | Backlog cleanup + ongoing rules | Ongoing triage (any provider) | Developer automation |

## Migration from Unroll.me

### To Clean Email
1. Sign up at clean.email — $29.99/yr, free trial for 1,000 emails
2. Connect the same email account(s)
3. Use Unsubscriber to re-process your subscriptions
4. Set up Auto Clean rules to replicate Rollup behavior (move newsletters to a label, review daily)
5. Enable Screener to quarantine new unknown senders
6. Revoke Unroll.me's access in your email provider's connected apps

### To SaneBox
1. Sign up at sanebox.com — 14-day free trial
2. SaneBox creates smart folders via IMAP — newsletters go to SaneNews
3. SaneBlackHole replaces unsubscribe (drag unwanted senders in)
4. Daily digest email summarizes what was filtered
5. Revoke Unroll.me's access

### To Leave Me Alone
1. Sign up at leavemealone.com — pay-per-use credits
2. Scan inbox for subscriptions
3. Unsubscribe from unwanted senders (real unsubscribe requests, not just filtering)
4. No data monetization, no ongoing inbox access after scan
5. Revoke Unroll.me's access
