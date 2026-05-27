---
name: sales-getaccept
description: "GetAccept platform help — AI-powered digital sales room with proposals, e-signatures, contract management, CPQ, mutual action plans, and buyer engagement tracking. Use when your proposals aren't getting viewed or signed, digital sales room setup isn't working, e-signature workflow is broken, CRM integration with GetAccept isn't syncing deals, contract templates are inflexible and force duplicating documents, or GetAccept API calls are failing. Do NOT use for general proposal writing strategy (use /sales-proposal-page) or comparing digital sales room platforms (describe your need to /sales-do)."
argument-hint: "[describe your GetAccept question or digital sales room goal]"
license: MIT
version: 1.0.0
tags: [sales, proposal, deal-room, esignature, platform]
github: "https://github.com/getaccept"
---

# GetAccept Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Create and send proposals or quotes
   - B) Set up a digital sales room for a complex deal
   - C) Configure e-signature workflows
   - D) Manage contracts (lifecycle, renewals)
   - E) Integrate GetAccept with my CRM
   - F) Use the GetAccept API to automate document workflows
   - G) Compare GetAccept to alternatives

2. **Which plan are you on?**
   - A) eSign ($25/user/mo)
   - B) Professional ($49/user/mo)
   - C) Enterprise (custom)
   - D) Free trial / not sure

3. **What CRM do you use?** (Salesforce, HubSpot, Pipedrive, MS Dynamics, other, none)

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| General proposal writing strategy (not GetAccept-specific) | `/sales-proposal-page [question]` |
| Deal room strategy across platforms | `/sales-deal-room [question]` |
| CRM integration strategy | `/sales-integration [question]` |
| E-signature API comparison | Describe your need to `/sales-do` |

If the question is GetAccept-specific, continue to Step 3.

## Step 3 — GetAccept platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, API recipes, integration patterns.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **Sending proposals**: Use templates with merge fields for speed. Professional plan unlocks AI-assisted generation and edit-after-send. Track engagement to time follow-ups.
- **Digital sales rooms**: Organize by stakeholder role — executive summary, technical docs, pricing, mutual action plan. Use tracking to see which stakeholders are engaged.
- **E-signature setup**: Configure signing order, eID verification (Nordic countries), and automated reminders. For API-driven signing, use the `POST /documents` endpoint.
- **CRM integration**: Professional plan required. Map GetAccept document status to CRM deal stages. Zapier triggers can bridge gaps for custom workflows.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Can't edit uploaded documents in-place**: If you spot a mistake in an uploaded PDF, you must re-upload the entire file. Use GetAccept's in-app editor instead of uploading pre-built documents to avoid this.
2. **API is plan-gated**: API read access requires Enterprise plan. Full read/write API access is an Enterprise add-on. Professional plan only gets Zapier/Make integration.
3. **Conditional templates not supported**: You can't build one template with conditional sections. Instead, you must duplicate contracts for minor variations. Use the API with merge fields as a workaround.
4. **CRM integrations require Professional+**: eSign plan has no CRM connectivity. Premium CRM integrations (advanced Salesforce features) require Enterprise.
5. **CPQ is Enterprise-only**: Configure Price Quote with unlimited product library is locked to the highest tier. Professional plan gets a 3-product library.
6. **Deal rooms require Professional+**: Digital sales rooms, mutual action plans, and sales dashboards are not available on the eSign plan.

## Related skills

- `/sales-proposal-page` — Write and structure a proposal page (Qwilr-specific but transferable strategy)
- `/sales-deal-room` — Design a digital sales room for complex deals (Qwilr-specific)
- `/sales-proposal-template` — Design reusable proposal templates
- `/sales-proposal-analytics` — Track engagement signals after sending proposals
- `/sales-integration` — Connect tools to CRM (Zapier, Make, webhooks, API pipelines)
- `/sales-seismic` — Seismic platform help including Digital Sales Rooms and content management
- `/sales-allego` — Allego platform help for sales content and enablement
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Setting up a digital sales room
**User says**: "I need to create a deal room in GetAccept for an enterprise deal with 5 stakeholders"
**Skill does**: Walks through creating a deal room on Professional/Enterprise plan, organizing content by stakeholder role, configuring mutual action plans, and setting up engagement tracking per recipient
**Result**: User has a structured digital sales room with role-based content and tracking

### Example 2: Automating document creation via API
**User says**: "How do I use the GetAccept API to automatically create and send contracts from my CRM?"
**Skill does**: Provides the POST /documents endpoint with auth setup, shows how to create a document with recipients and merge fields, explains webhook/Zapier triggers for document events (signed, viewed, reviewed)
**Result**: User has a working API integration that auto-generates contracts from CRM data

### Example 3: CRM integration not syncing
**User says**: "GetAccept documents aren't syncing back to our HubSpot deals after signing"
**Skill does**: Checks plan tier (requires Professional+), verifies HubSpot integration setup, identifies common sync issues (field mapping, document status mapping), suggests Zapier as fallback for custom workflows
**Result**: User has a working bidirectional sync between GetAccept and HubSpot

## Troubleshooting

### Documents not being viewed by recipients
**Symptom**: Sent proposals show no view activity in tracking
**Cause**: Emails may be landing in spam, or recipients aren't opening the links
**Solution**: Check delivery status in GetAccept. Use the engagement video and automated reminders features. Verify your sending domain is authenticated. Consider sending via CRM integration for better deliverability.

### Template editing too restrictive
**Symptom**: Can't make simple changes to templates without recreating them
**Cause**: GetAccept's in-app editor has limitations vs dedicated document editors. Uploaded PDFs can't be edited at all.
**Solution**: Build templates in GetAccept's native editor instead of uploading PDFs. Use merge fields (custom data) for variable content. For complex conditional logic, use the API to assemble documents programmatically from template sections.

### Zapier triggers not firing for document events
**Symptom**: Set up Zapier automation but it doesn't trigger when documents are signed/viewed
**Cause**: Zapier integration requires Professional plan or above. Free trial may not include Zapier access.
**Solution**: Verify your plan includes Zapier access. Check that the correct trigger is selected (Created, Sent, Viewed, Reviewed, Signed). Test with a new document to rule out retroactive trigger issues.
