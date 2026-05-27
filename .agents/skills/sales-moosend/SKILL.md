---
name: sales-moosend
description: "Moosend platform help — email marketing with drag-and-drop campaigns, automation workflows, landing pages, subscription forms, segmentation, and ecommerce AI product recommendations. Use when Moosend automation workflows aren't triggering on the right event, campaign open rates dropped after switching to Moosend, landing pages aren't converting or forms aren't capturing leads, ecommerce product recommendations aren't showing relevant items, subscriber segments aren't updating or conditional splits behave unexpectedly, Moosend API calls to campaigns or mailing lists are returning errors, or you're migrating to Moosend from Mailchimp or another ESP. Do NOT use for cross-platform email marketing strategy (use /sales-email-marketing), cross-platform deliverability (use /sales-deliverability), or newsletter monetization strategy (use /sales-newsletter)."
argument-hint: "[describe your Moosend question — e.g., 'automation not triggering on cart abandonment' or 'API to create a mailing list']"
license: MIT
version: 1.0.0
tags: [sales, email-marketing, platform]
github: "https://github.com/moosend"
---

# Moosend Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What are you trying to do?**
   - A) Set up or fix an email campaign (broadcast)
   - B) Build or debug an automation workflow
   - C) Create or optimize a landing page or form
   - D) Manage subscribers, segments, or mailing lists
   - E) Integrate Moosend with another tool (API, Zapier, ecommerce)
   - F) Migrate to Moosend from another ESP
   - G) Other — describe it

2. **What Moosend plan are you on?**
   - 30-day trial, Pro ($7/mo), Moosend+ (custom), Enterprise (custom)

3. **What's your list size and sending pattern?**
   - Approximate subscriber count
   - Send frequency (daily, weekly, monthly)

**Skip-ahead rule**: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| General email marketing strategy | `/sales-email-marketing [question]` |
| SPF/DKIM/DMARC or domain warm-up | `/sales-deliverability [question]` |
| Newsletter monetization | `/sales-newsletter [question]` |
| Growing subscriber list | `/sales-audience-growth [question]` |
| Connecting Moosend to a CRM | `/sales-integration [question]` |
| SMS marketing | `/sales-sms-marketing [question]` |

When routing, provide the exact command: "This is a {domain} question — run: `/sales-{skill} {user's original question}`"

If the question is Moosend-specific, continue to Step 3.

## Step 3 — Moosend platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation. Reasonable defaults:

- **New to Moosend**: Start with a mailing list, import subscribers, create a campaign, then build automations
- **Migration**: Export from old ESP, import via CSV, rebuild automations using Moosend's visual workflow builder
- **API integration**: Use the v3 REST API with API key as query param — start with list/subscriber endpoints
- **Ecommerce**: Connect your store, enable product recommendations, set up cart abandonment automation

If you discover a gotcha or workaround not in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **API key goes in the query string, not a header.** Every Moosend API call appends `?apikey=YOUR_KEY` to the URL. If you put it in an Authorization header, you'll get 401s.
2. **No free plan — only a 30-day trial.** After the trial expires, you must subscribe to Pro or higher. Unlike Mailchimp or MailerLite, there's no permanent free tier.
3. **Landing pages and forms are Pro-only.** The trial includes them, but they disappear if you don't convert to a paid plan.
4. **Automation triggers can't be changed after creation.** If you pick the wrong trigger event, you have to recreate the entire automation from scratch.
5. **Product recommendations require ecommerce tracking JS.** The AI recommendations won't populate unless you've installed the Moosend website tracking snippet on your store.
6. **Moosend was acquired by Sitecore in 2021.** Enterprise features may be gated behind Sitecore bundles. The standalone Pro plan remains available for small teams.

## Related skills

- `/sales-email-marketing` — Cross-platform email marketing strategy (broadcasts, sequences, segmentation, automation)
- `/sales-deliverability` — SPF, DKIM, DMARC, domain warm-up, and inbox placement
- `/sales-audience-growth` — Growing your email list (lead magnets, forms, referral programs)
- `/sales-newsletter` — Newsletter monetization (paid subscriptions, sponsorships)
- `/sales-integration` — Connecting tools to CRMs and other systems
- `/sales-sms-marketing` — SMS marketing strategy and compliance
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Cart abandonment automation not sending
**User**: "I set up a cart abandonment automation in Moosend but nobody's receiving the emails even though I see abandoned carts in my Shopify."

**What the skill does**: Checks whether the Moosend website tracking JS is installed on the Shopify store, verifies the automation trigger is set to "Cart abandoned" (not "Product viewed"), confirms the delay timing, and ensures the mailing list connected to the automation has the right subscribers. Walks through the ecommerce integration setup in Moosend.

### Example 2: Bulk subscriber import via API
**User**: "How do I use the Moosend API to import 50,000 subscribers from a CSV into a new mailing list?"

**What the skill does**: Reads `references/platform-guide.md` for the API recipes. Shows how to create a mailing list via `POST /v3/lists/create.json`, then use `POST /v3/subscribers/{list_id}/subscribe.json` for individual adds or the bulk import endpoint. Includes Python code with rate limiting and error handling.

### Example 3: Comparing Moosend to MailerLite
**User**: "Should I use Moosend or MailerLite for my 5,000-subscriber newsletter?"

**What the skill does**: Reads the platform guide for Moosend's pricing and capabilities, then compares key differences: Moosend Pro at $7/mo (500 subs, scales by list size) vs MailerLite's free plan (1,000 subs). Notes Moosend's unlimited sends on all plans vs MailerLite's 12,000/mo free limit. Highlights Moosend's ecommerce AI recommendations as a differentiator, MailerLite's free tier advantage for bootstrapping.

## Troubleshooting

### "My Moosend automation isn't triggering"
- Verify the trigger event matches what you expect (e.g., "Subscription to list" vs "Any campaign opened")
- Check that the mailing list connected to the automation actually has subscribers
- Ensure the automation is set to **Active** (draft automations don't fire)
- If using ecommerce triggers (cart abandoned, product purchased), verify the Moosend tracking JS is installed and firing events
- Automation triggers cannot be changed after creation — if the trigger is wrong, recreate the automation

### "Moosend API returns 401 or empty responses"
- API key must be a query parameter: `?apikey=YOUR_KEY`, not in the Authorization header
- Check that the API key hasn't been regenerated (old keys stop working immediately)
- For campaign endpoints, the mailing list ID must be valid — use `GET /v3/lists.json?apikey=KEY` to list all mailing lists first
- Rate limits aren't publicly documented — if you're hitting 429s, add a 1-second delay between calls

### "Subscribers not importing or segments not updating"
- CSV imports require at minimum an email column — Moosend auto-maps if the header is "Email"
- Custom fields must be created in Moosend before importing data that references them
- Segments update in near-real-time but can lag a few minutes for large lists
- Duplicate emails within the same mailing list are silently ignored — check if subscribers already exist
