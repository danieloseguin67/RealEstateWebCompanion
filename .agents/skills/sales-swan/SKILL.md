---
name: sales-swan
description: "Swan platform help — AI GTM Engineer that turns natural language prompts into autonomous workflows for lead research, enrichment, qualification, outbound sequences, CRM automation, and pipeline monitoring. Use when your GTM workflows take days to build across Clay, Zapier, and HubSpot, credits are depleting too fast on Swan, website visitor identification isn't qualifying leads correctly, LinkedIn or email sequences built by Swan aren't performing, or you want to automate pipeline health monitoring and deal alerts via Slack. Do NOT use for general enrichment strategy across tools (use /sales-enrich), outbound cadence strategy (use /sales-cadence), or CRM selection (use /sales-crm-selection)."
argument-hint: "[describe your Swan workflow, agent, or automation question]"
license: MIT
version: 1.0.0
tags: [sales, gtm, automation, enrichment, ai-agent, platform]
---

# Swan Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Build a GTM workflow (lead research, enrichment, qualification, outreach)
   - B) Set up website visitor identification and routing
   - C) Configure LinkedIn or email outbound sequences
   - D) Monitor pipeline health or deal alerts
   - E) Integrate Swan with my CRM or other tools
   - F) Troubleshoot an existing Swan agent or workflow
   - G) Compare Swan to Clay or other GTM automation tools

2. **What tools are you already using?**
   - CRM (HubSpot, Salesforce, Pipedrive, Attio)
   - Data providers (Apollo, ZoomInfo, Cognism)
   - Outreach (Salesloft, Outreach, Lemlist)

3. **Team size and credit usage**: approximate monthly actions

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| General enrichment strategy across multiple tools | `/sales-enrich [question]` |
| Outbound cadence strategy (not Swan-specific) | `/sales-cadence [question]` |
| Website visitor identification strategy | `/sales-intent [question]` |
| Lead scoring strategy across platforms | `/sales-lead-score [question]` |
| Revenue forecasting methodology | `/sales-forecast [question]` |
| CRM selection (HubSpot vs Salesforce vs others) | `/sales-crm-selection [question]` |
| Connecting tools via middleware (Zapier/Make) | `/sales-integration [question]` |
| Prospect list building strategy | `/sales-prospect-list [question]` |

If the question is Swan-specific, continue to Step 3.

## Step 3 — Swan platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, API, pre-built agents, integration recipes, and code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

- **First workflow**: Start with a pre-built agent (Gatto for visitor ID, Owly for LinkedIn intent). Describe your ICP clearly — Swan's quality depends on precise ICP definitions.
- **Credit optimization**: Each action costs 1 credit regardless of complexity. Batch research operations and set qualification thresholds to avoid wasting credits on low-fit leads.
- **CRM integration**: Swan works best with HubSpot (deepest integration). For Salesforce, expect more configuration. Always map Swan fields to CRM properties before launching workflows.
- **Choosing Swan vs Clay**: Swan is prompt-to-pipeline (describe what you want, it executes). Clay is a spreadsheet-like enrichment workbench (you build tables and chain providers). Swan for teams wanting autonomous execution; Clay for teams wanting granular data control.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **Credits deplete fast with heavy usage**: Each action (research, enrichment, CRM update, message) costs 1 credit. A workflow with 5 steps processing 100 leads = 500 credits. Monitor usage and set thresholds.
2. **Not built primarily for cold outreach**: Swan automates full GTM workflows — it's not a dedicated cold email tool. For high-volume cold outreach, dedicated tools like Smartlead or Lemlist may perform better.
3. **ICP quality determines output quality**: Swan's AI agents reason based on your ICP definition. Vague ICPs produce vague qualification. Invest time in precise ICP criteria.
4. **API is limited to 3 research endpoints**: The API supports company research, person research, and exclusion list management. Workflow creation/management is UI-only.
5. **HubSpot is the primary CRM integration**: Salesforce, Pipedrive, and Attio are supported but HubSpot has the deepest integration. Expect more setup for non-HubSpot CRMs.
6. **3-person team, 2024 startup**: Swan is a small startup. Evaluate support responsiveness and feature roadmap stability.

## Related skills

- `/sales-clay` — Clay enrichment and workflow platform (spreadsheet-based data enrichment, waterfall providers)
- `/sales-enrich` — Contact enrichment strategy across tools
- `/sales-intent` — Buyer intent and website visitor identification strategy
- `/sales-prospect-list` — Prospect list building strategy
- `/sales-cadence` — Outbound sequence strategy
- `/sales-forecast` — Revenue forecasting and deal health
- `/sales-lead-score` — Lead scoring and routing strategy
- `/sales-integration` — Tool integration strategy (CRM sync, middleware, API pipelines)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Building a website visitor workflow
**User says**: "I want Swan to identify website visitors, qualify them against my ICP, and route hot leads to my sales team in Slack"
**Skill does**: Walks through setting up the Gatto agent — configuring visitor ID, ICP qualification rules, Slack notification channels, and HubSpot contact creation for qualified leads
**Result**: User has an autonomous workflow that deanonymizes visitors, qualifies them, and alerts sales reps in real-time

### Example 2: Using the Swan API for enrichment
**User says**: "How do I use the Swan API to research a company and get structured data back?"
**Skill does**: Shows the `POST /research/company` endpoint with auth headers, request body with question/responseType fields, and example cURL + Python code. Explains confidence scoring and source attribution.
**Result**: User can programmatically query Swan for company intelligence from their own backend

### Example 3: Swan vs Clay comparison
**User says**: "Should I use Swan or Clay for my GTM workflows?"
**Skill does**: Compares Swan's prompt-to-pipeline autonomous execution vs Clay's spreadsheet-based enrichment workbench. Swan consolidates enrichment + automation + execution; Clay gives granular data control with waterfall enrichment. Recommends Swan for teams wanting autonomous agents, Clay for teams wanting manual data manipulation.
**Result**: User picks the right GTM automation platform for their workflow style

## Troubleshooting

### Credits running out too fast
**Symptom**: Monthly credit allocation exhausted mid-month
**Cause**: Each action costs 1 credit — multi-step workflows processing large lead volumes consume credits rapidly
**Solution**: Add qualification gates early in workflows to filter out low-fit leads before expensive enrichment/outreach steps. Use the exclusion API to filter out known non-ICP companies from visitor ID. Monitor credit usage in the dashboard and set alerts.

### Agent producing low-quality leads
**Symptom**: Swan agent qualifies leads that don't match your actual ICP
**Cause**: ICP definition is too vague or missing key criteria
**Solution**: Be specific in your ICP prompt — include company size ranges, industries, technologies used, job titles, and negative criteria (who to exclude). Test with a small batch first and refine before scaling.

### Workflow not triggering on intent signals
**Symptom**: Swan isn't acting on website visits or LinkedIn engagement
**Cause**: Visitor ID integration not configured correctly, or intent signal thresholds too high
**Solution**: Verify RB2B or other visitor ID tool is connected and sending data. Check that your workflow's trigger conditions match the signal types you're receiving. Start with broad triggers and narrow down.
