---
name: sales-sponsy
description: "Sponsy platform help — newsletter sponsorship operations with ad inventory calendar, sponsor CRM, advertiser portals, automated reporting, and workflow automation. Use when managing newsletter sponsorships in spreadsheets is unsustainable, sponsor asset collection is chaotic and manual, ad performance reports take too long to generate, you need a visual calendar of which ad slots are booked vs available, sponsors aren't renewing because they don't see results, or Zapier triggers for Sponsy slots aren't firing. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or finding new sponsors to pitch (use /sales-sponsorgap or /sales-paved)."
argument-hint: "[describe your Sponsy question or sponsorship ops problem]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, platform]
github: "https://github.com/getsponsy"
---

# Sponsy Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What's your Sponsy situation?**
   - A) Evaluating Sponsy — haven't signed up yet
   - B) Setting up Sponsy — configuring publications, slots, or integrations
   - C) Using Sponsy — troubleshooting or optimizing workflows
   - D) Integrating Sponsy — Zapier, API, or ESP connections

2. **Which Sponsy plan are you on (or considering)?**
   - A) Growth ($79/mo — CRM, portal, ESP integrations, Zapier, API)
   - B) Scale ($109/mo — +deals, automations, analytics, roles)
   - C) Custom (100+ ads/mo, HubSpot integration)
   - D) Not sure yet

3. **What's your primary challenge?**
   - A) Setting up ad inventory and slot management
   - B) Getting sponsors to submit assets on time
   - C) Generating and distributing ad performance reports
   - D) Connecting Sponsy to my ESP or CRM
   - E) Something else (describe)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (pricing, models) | `/sales-newsletter [question]` |
| Finding sponsors to pitch | `/sales-sponsorgap [question]` or `/sales-paved [question]` |
| Sponsor lead databases | `/sales-sponsorleads [question]` |
| Newsletter discovery for buyers | `/sales-reletter [question]` |
| Email marketing strategy | `/sales-email-marketing [question]` |
| General tool integration | `/sales-integration [question]` |

If the question is Sponsy-specific, continue to Step 3.

## Step 3 — Sponsy platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration recipes, Zapier triggers/actions.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Evaluating**: Compare Sponsy to spreadsheet workflows and alternatives (Paved Booker, beehiiv storefront). Key factor: if managing 5+ sponsors across multiple pubs, Sponsy pays for itself in time saved.
- **Setting up**: Start with 1 publication, configure ESP integration for reporting, create customer portal before inviting first sponsor.
- **Optimizing**: Use automations (Scale plan) for asset reminders and status updates. Set up scheduled reports to send automatically to sponsors.
- **Integrating**: Zapier is the primary automation path. API exists but is undocumented publicly — contact Sponsy for API access.

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Automations are Scale-only ($109/mo)** — Growth plan has CRM, portal, and reporting but no workflow automations. If you need asset due reminders or status triggers, you need Scale or Zapier workarounds on Growth.
2. **HubSpot integration is Custom-only** — Growth and Scale plans cannot natively sync with HubSpot. Use Zapier as a workaround (New Customer trigger → HubSpot Create Contact action).
3. **15 ads/month cap on Growth and Scale** — both standard plans cap at 15 ads/month. If you run more, you need the Custom plan with volume-based pricing.
4. **No Make integration** — only Zapier is supported for iPaaS automation. No Make modules or webhook endpoints documented.
5. **API exists but is undocumented** — listed as a Growth plan feature, but no public API docs. Contact Sponsy directly for API access and documentation.
6. **ESP integration is for reporting only** — Sponsy pulls metrics from your ESP for ad reports. It doesn't send emails or manage subscribers.
7. **sponsy.co redirects to getsponsy.com** — the original domain redirects; all current resources are at getsponsy.com.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (pricing, models, platform-specific guidance)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts)
- `/sales-reletter` — Reletter newsletter search engine (7M+ publications, subscriber data, creator contacts)
- `/sales-paved` — Paved newsletter sponsorship marketplace (Ad Network, Booker, Radar)
- `/sales-beehiiv` — Beehiiv platform help (includes sponsorship storefront feature)
- `/sales-integration` — Tool integration strategy (Zapier, Make, webhooks, API pipelines)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Evaluating Sponsy for multi-publication workflow
**User says**: "I run 3 newsletters and manage sponsors in a Google Sheet. It's getting chaotic — should I use Sponsy?"
**Skill does**: Reads platform guide, compares Sponsy's multi-publication calendar and sponsor CRM to spreadsheet workflows, highlights Growth plan covers 10 publications at $79/mo, notes the customer portal eliminates email-based asset collection
**Result**: User understands whether Sponsy fits their scale and gets a setup plan

### Example 2: Setting up Zapier automation for sponsor onboarding
**User says**: "How do I automatically add new Sponsy customers to my HubSpot CRM via Zapier?"
**Skill does**: Reads platform guide Zapier section, walks through New Customer trigger → HubSpot Create Contact action, notes HubSpot native integration requires Custom plan
**Result**: User has a working Zapier automation connecting Sponsy to HubSpot

### Example 3: Sponsor reports not showing ESP data
**User says**: "I connected my beehiiv account to Sponsy but the ad reports are showing zero opens"
**Skill does**: Checks ESP integration troubleshooting in platform guide, verifies the beehiiv API connection is authorized, checks that slot dates match published issue dates
**Result**: User identifies the mismatch and fixes reporting

## Troubleshooting

### ESP metrics not appearing in ad reports
**Symptom**: Connected ESP but ad reports show zero opens/clicks
**Cause**: ESP API connection may not be authorized, or slot dates don't align with actual send dates in the ESP
**Solution**: Re-authorize the ESP connection in Sponsy settings. Ensure slot dates in the ad inventory calendar match actual newsletter send dates. Check that the ESP supports the specific metrics Sponsy pulls (opens, clicks).

### Sponsors not receiving customer portal invites
**Symptom**: Created a customer and shared the portal link, but the sponsor says they can't access it
**Cause**: Portal link may be misconfigured or the sponsor's email doesn't match the customer record
**Solution**: Verify the customer email in Sponsy matches the sponsor's email. Resend the portal invitation. If using a custom domain for the storefront, verify DNS is correctly configured.

### Zapier triggers not firing for new slots
**Symptom**: Created a Zapier zap with "New Slot" trigger but nothing happens when you create slots in Sponsy
**Cause**: Zapier connection may have expired or the trigger test didn't register the event
**Solution**: Re-connect Sponsy in Zapier (disconnect and re-authorize). Create a test slot after reconnecting to verify the trigger fires. Check Zapier's Task History for errors.
