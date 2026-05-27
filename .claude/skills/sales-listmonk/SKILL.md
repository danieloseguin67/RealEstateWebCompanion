---
name: sales-listmonk
description: "Listmonk platform help — open-source self-hosted newsletter and mailing list manager with full REST API, multi-SMTP queues, transactional email, Go templates, and PostgreSQL backend. Use when Listmonk emails aren't sending and SMTP test always shows success, campaigns stop midway due to SES throttling, bounce processing isn't working, you need help setting up Listmonk with AWS SES or another SMTP provider, STARTTLS configuration errors, transactional email API isn't delivering, or you want to automate subscriber management via the API. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or growing your subscriber list (use /sales-audience-growth)."
argument-hint: "[describe what you need help with in Listmonk]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, open-source, self-hosted, platform]
---

# Listmonk Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Listmonk do you need help with?**
   - A) Setup — installing, configuring SMTP, Docker, database
   - B) Campaigns — creating, scheduling, sending, templates
   - C) Subscribers — importing, managing lists, segmentation
   - D) Transactional email — API-driven messages, templates
   - E) Deliverability — bounce processing, SES throttling, SMTP errors
   - F) API / automation — integrating with other tools, SDKs
   - G) Something else — describe it

2. **What's your hosting setup?**
   - A) Docker (self-managed)
   - B) Single binary on a VPS
   - C) Managed hosting (Railway, PikaPod, Elestio, etc.)
   - D) Haven't set up yet — planning

3. **What SMTP provider are you using?**
   - A) Amazon SES
   - B) Mailgun
   - C) Postmark
   - D) SendGrid
   - E) Self-hosted (Postal, etc.)
   - F) Other / haven't decided

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization (paid subscriptions, sponsorships) | `/sales-newsletter [question]` |
| Growing subscriber list strategy | `/sales-audience-growth [question]` |
| Email deliverability strategy (SPF/DKIM/DMARC) | `/sales-deliverability [question]` |
| Transactional email strategy (not Listmonk-specific) | `/sales-transactional-email [question]` |
| Choosing between Listmonk and managed ESPs | Handle here — use platform-guide.md comparison |

If the question is Listmonk-specific, continue to Step 3.

## Step 3 — Listmonk platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, SMTP setup, data model, API recipes, integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation. Listmonk is developer-first — assume comfort with Docker, config files, and APIs.

**Decision framework — self-hosted vs managed:**
- Self-hosted (Listmonk) if: you want full data ownership, need to send at scale cheaply, are comfortable with Docker/PostgreSQL, and don't need paid subscription management
- Managed (Beehiiv, Ghost, etc.) if: you want paid newsletters with Stripe, need a built-in discovery network, or don't want to manage infrastructure

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about SMTP configuration and rate limiting that may vary by provider.*

1. **SMTP test always shows success** — Listmonk's SMTP connection test only checks connectivity, not authentication. A successful test does NOT mean your credentials are correct. Send a real test campaign to verify.
2. **SES throttling kills campaigns** — New SES accounts have low sending limits (1-14 emails/sec). Listmonk's default throughput exceeds this. Configure `max_msg_retries` and sliding window rate limits in Settings > Performance to match your SES quota.
3. **No outbound webhooks** — Listmonk does not push events (new subscriber, campaign sent) to external URLs. For real-time sync, poll the API or use database triggers.
4. **No paid subscription support** — Listmonk has no Stripe integration or paywall features. For paid newsletters, pair with a payment processor and manage access via list membership through the API.
5. **Bounce processing requires SMTP provider setup** — Configure SES SNS topics, SendGrid Event Webhooks, or Postmark webhooks to POST bounces to Listmonk's bounce endpoint. Without this, your sender reputation degrades silently.
6. **Go templates, not Handlebars** — If you're coming from Mailchimp or SendGrid, the templating syntax is completely different. Use `{{ .Subscriber.Name }}`, not `{{subscriber.name}}`.
7. **Single binary = single point of failure** — No built-in HA or clustering. For production, run behind a reverse proxy with health checks and automated restarts.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy — paid subscriptions, sponsorships, ad sales, premium tiers
- `/sales-audience-growth` — Growing your subscriber list — lead magnets, cross-promotion, referral programs
- `/sales-deliverability` — Email deliverability — SPF, DKIM, DMARC, inbox placement
- `/sales-transactional-email` — Transactional email strategy — provider selection, API, templates
- `/sales-mailgun` — Mailgun platform help (common SMTP provider for Listmonk)
- `/sales-postmark` — Postmark platform help (common SMTP provider for Listmonk)
- `/sales-sendgrid` — SendGrid platform help (common SMTP provider for Listmonk)
- `/sales-ghost` — Ghost platform help — alternative self-hosted newsletter with memberships
- `/sales-beehiiv` — Beehiiv platform help — managed newsletter alternative
- `/sales-buttondown` — Buttondown platform help — managed newsletter with API
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: SES throttling fix
**User says**: "My Listmonk campaign sent 2,000 of 5,000 emails then stopped — I'm using SES"
**Skill does**: Reads platform-guide.md for SES throttling guidance, explains that new SES accounts have low per-second limits, shows how to configure Listmonk's sliding window rate limiter to match SES quota, recommends requesting SES production access for higher limits
**Result**: Campaign resumes with correct rate limiting, no more throttling drops

### Example 2: Automate subscriber sync via API
**User says**: "How do I add subscribers to Listmonk from my Next.js app when they sign up?"
**Skill does**: Reads platform-guide.md API recipes, provides working code for POST /api/subscribers with BasicAuth, shows how to assign to a list and trigger double opt-in, mentions the public subscription endpoint as an alternative
**Result**: Working API integration with code examples in both cURL and Python/JS

### Example 3: Bounce processing setup
**User says**: "My bounce rate is climbing and I think Listmonk isn't processing bounces from SES"
**Skill does**: Reads platform-guide.md for bounce processing architecture, walks through SES SNS topic → HTTPS subscription → Listmonk bounce endpoint setup, explains bounce action configuration (soft bounce threshold, blocklist on hard bounce)
**Result**: Automated bounce processing configured, sender reputation protected

## Troubleshooting

### Emails not sending — SMTP test passes but campaigns fail
**Symptom**: SMTP connection test shows success, but campaigns show 0 sent or error in logs
**Cause**: SMTP test only checks connectivity (port reachable), not authentication or sending permissions
**Solution**: Check Listmonk logs (`docker logs listmonk`) for actual SMTP errors. Verify credentials by sending a test campaign to yourself. Common causes: wrong port (use 587 for STARTTLS, 465 for SSL), incorrect auth method, SES sandbox mode (can only send to verified emails).

### Campaign stops midway — SES throttling
**Symptom**: Campaign finishes with far fewer emails sent than subscribers, logs show "messages exceeded for the window"
**Cause**: Listmonk's default throughput exceeds your SES sending rate limit
**Solution**: In Settings > Performance, set sliding window rate to match your SES quota. For new SES accounts, start with 1 email/second. Request SES production access to increase limits. Monitor SES dashboard for throttling metrics.

### STARTTLS error — "530 Must issue a STARTTLS command first"
**Symptom**: SMTP configuration fails with STARTTLS error
**Cause**: SMTP settings mismatch — using wrong TLS mode for the port
**Solution**: For port 587, set `auth_protocol` to `login` and enable STARTTLS. For port 465, use implicit TLS (SSL). In config.toml SMTP section, ensure `tls_type` matches your port: `STARTTLS` for 587, `TLS` for 465, `none` for 25.
