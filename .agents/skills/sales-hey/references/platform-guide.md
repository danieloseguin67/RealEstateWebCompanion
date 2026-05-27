# Hey Platform Reference

## Overview

Hey is a paid email service by 37signals (makers of Basecamp) that reimagines email workflow with rigid organizational buckets, aggressive sender screening, and privacy-first defaults. No AI, no API, no automation — by design. Target audience: privacy-conscious professionals who want email to be less stressful and are willing to adopt an opinionated workflow.

## Capabilities & automation surface

| Capability | Description | Automation |
|---|---|---|
| The Screener | New senders land here for approve/reject before reaching Imbox | UI-only |
| Imbox | Primary inbox for approved important senders | UI-only |
| The Feed | Newsletters/long-reads displayed as browsable feed | UI-only |
| Paper Trail | Auto-sorts receipts, confirmations, notifications | UI-only |
| Reply Later | Queue emails you've read but aren't ready to respond to | UI-only |
| Set Aside | Pin reference emails for quick access | UI-only |
| Spy Pixel Blocking | Blocks tracking pixels by default, shows which emails contained trackers | UI-only |
| Calendar | Basic calendar integration (not a full calendar app) | UI-only |
| Undo Send | Brief window to unsend | UI-only |
| Schedule Send | Send emails at a specific time | UI-only |
| Email Templates | Basic templates for common responses | UI-only |

**No public API. No webhooks. No Zapier/Make modules. No MCP server. No IMAP/POP access.** Hey is a closed ecosystem. The only external data flow is standard email send/receive via SMTP.

## Pricing, limits & plan gates

| Plan | Price | What you get |
|---|---|---|
| Personal | $99/year | @hey.com address, all features, 100GB storage |
| Premium addresses | $349-999/year | 2-3 character @hey.com addresses |
| HEY for Domains | $12/user/month | Custom domain, all features per user |
| Families | $179/year | Up to 5 family members |

**Plan gates:**
- Custom domain requires HEY for Domains ($12/user/mo) — NOT available on Personal
- No free tier — only a 14-day trial (personal) or 30-day trial (Domains)
- All features are available on all paid plans — no feature gating between tiers
- 100GB storage included on all plans

**No API rate limits** — there's no API to rate-limit.

## Integrations

**Native integrations: None.** Hey deliberately avoids third-party integrations.

**Data flow:**
- Inbound: Standard SMTP — any email sent to your @hey.com or custom domain address arrives normally
- Outbound: Standard SMTP — emails send normally to any address
- No bidirectional sync with CRMs, project tools, or calendars
- No import from other email providers (biggest complaint)
- Data export available on account closure

**Workaround for automation needs:**
1. Set up auto-forwarding from Hey to another email service that HAS API access
2. Use the forwarded copy as your automation trigger in Zapier/Make/etc.
3. This only works for inbound — you cannot automate sending FROM Hey

## Data model

Not applicable — no API means no programmatic data model. All interaction is through the web/native app UI.

## Workflow comparison

<!-- Constructed from reviews and comparison articles — verify against current Hey interface -->

| Feature | Hey | Superhuman | Shortwave | Fastmail |
|---|---|---|---|---|
| AI drafting | No (by design) | Yes (AI Write) | Yes (Ghostwriter) | No |
| Spam approach | Screener (approve senders) | Standard filters | AI classification | Standard + rules |
| Newsletter handling | The Feed (separate view) | Split Inbox | AI label | Folders + rules |
| API/automation | None | MCP server | MCP consumer | JMAP API |
| Privacy | Pixel blocking default | Read receipts (sender) | Standard | No tracking |
| Price | $99/yr | $300-480/yr | $84-288/yr | $30-90/yr |
| Works with Gmail | No (separate service) | Yes (Gmail/Outlook) | Yes (Gmail only) | No (separate service) |
| Custom domain | $12/user/mo | Included (Business) | Included (paid) | Included |
| Keyboard shortcuts | Basic | Extensive (core UX) | Good | Good |

## Who Hey is for (and who it isn't)

**Good fit:**
- Privacy-conscious professionals who hate tracking pixels
- People drowning in unwanted email (Screener eliminates it)
- Newsletter addicts who want them separate from real mail (The Feed)
- Users who find inbox-zero stressful and want a calmer philosophy
- 37signals/Basecamp users who trust the company

**Bad fit:**
- Anyone who needs AI email features (drafting, triage, smart categorization)
- Developers/GTM engineers who need API access or automation
- Teams needing shared inbox or collaboration
- People with large existing email archives they can't leave behind
- Users who rely on advanced search operators
- Anyone uncomfortable committing to a paid email address they'll lose if they cancel

## Migration guidance

**Moving TO Hey:**
1. You cannot import old emails. Accept this upfront.
2. Set up forwarding from your old email to your new @hey.com address
3. Update important accounts with your new address gradually
4. Keep old email service active for at least 6 months for stragglers
5. The Screener will require active attention for the first 2-4 weeks as new senders appear

**Moving FROM Hey:**
1. Hey offers data export — download before cancelling
2. Set up forwarding to your new email address
3. Update accounts that use your @hey.com address
4. Once subscription lapses, @hey.com address stops receiving email
5. Consider Fastmail or Proton Mail if privacy matters but you want more flexibility

## Quick-start recipes

Not applicable — no API or automation surface. All workflows are UI-driven.

**UI workflow tips:**

**Recipe 1: Zero-maintenance newsletter management**
1. When a newsletter first arrives → it lands in The Screener
2. Approve it but assign to "The Feed" (not Imbox)
3. All future emails from that sender go to Feed
4. Browse Feed casually — no notification pressure, open-by-default display

**Recipe 2: Receipt organization for expense reporting**
1. When a receipt/confirmation arrives → it lands in The Screener
2. Approve it and assign to "Paper Trail"
3. All future transactional emails from that sender auto-sort to Paper Trail
4. At month-end, open Paper Trail for a clean chronological list of all receipts

**Recipe 3: VIP-only notifications**
1. By default, no new sender can reach your Imbox without approval
2. Only approve senders you genuinely want in your Imbox
3. Result: notifications/badges only fire for approved-sender Imbox emails
4. Feed and Paper Trail don't generate notifications

## Integration patterns

Not applicable — no programmatic integration surface exists.

**Only viable pattern for external systems:**
- Forward Hey emails to a Gmail/Outlook account → use that account's API/Zapier triggers
- This loses the Hey organizational structure (Imbox/Feed/Paper Trail context is not forwarded)
- You cannot send FROM Hey programmatically — all sending is manual UI
