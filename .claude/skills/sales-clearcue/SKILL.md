---
name: sales-clearcue
description: "Clearcue platform help — GTM signal engine for real-time buyer intent detection across LinkedIn, X, Reddit, news, jobs, podcasts, and events with signal stacking, AI qualification, dynamic audiences, MCP server for Claude/AI assistants, webhooks. Use when Clearcue signals are surfacing too many false positives and you need to tune AI qualification sensitivity, signal stacking logic isn't combining signals the way you expected, you want to connect Clearcue to Claude Code via MCP for automated lead workflows, webhook notifications aren't firing to your endpoint on the Pro plan, CRM integration requires Scale plan and you need workarounds on lower tiers, Audiences aren't matching the ICP you described in natural language, Researcher talking points feel generic for your prospects, or you're comparing Clearcue vs Octolens vs Buska vs CatchIntent vs Trigify for intent-based prospecting. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between social listening platforms (use /sales-social-listening)."
argument-hint: "[describe your Clearcue question — e.g., 'signal stacking not working' or 'how to set up MCP with Claude']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, intent-data, platform]
---

# Clearcue Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up signals (keyword + behavior monitoring)
   - B) Signal stacking (combining multiple signals for intent scoring)
   - C) Audiences (ICP definition and dynamic lists)
   - D) Researcher (AI profile analysis and talking points)
   - E) MCP integration with Claude or other AI assistants
   - F) Webhooks / CRM integration / data export
   - G) Comparing Clearcue vs alternatives
   - H) Something else — describe it

2. **Which plan are you on?**
   - A) Starter (€79/mo, 7 signals)
   - B) Pro (€199/mo, 25 signals, webhooks)
   - C) Scale (€439/mo, 75 signals, CRM)
   - D) Enterprise
   - E) Free trial / evaluating

**Skip-ahead rule:** if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

If the request maps to a strategy skill, route:
- Social listening strategy or tool comparison → `/sales-social-listening [question]`
- Buyer intent strategy or signal prioritization → `/sales-intent [question]`
- Contact enrichment beyond Clearcue → `/sales-enrich [question]`
- CRM integration strategy → `/sales-integration [question]`
- Outbound cadence or sequences → `/sales-cadence [question]`

When routing, provide the exact command: "This is a {problem domain} question — run: `/sales-{skill} {user's original question}`"

Otherwise, answer directly using the platform reference.

## Step 3 — Clearcue platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, MCP setup, integration recipes, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Signal setup** — design signal queries, configure AI qualification sensitivity, build signal stacks
2. **MCP workflows** — connect to Claude Code, query signals, automate lead workflows
3. **Audience building** — write natural language ICP descriptions, tune precision filters
4. **Integration** — webhook setup, CRM sync patterns, HeyReach/Lemlist/Instantly pipelines
5. **Optimization** — reduce false positives, maximize signal-to-noise ratio

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **CRM integrations are Scale-only (€439/mo).** HubSpot, Salesforce, and Pipedrive native connectors require the Scale plan. On Starter/Pro, use webhooks (Pro+) or CSV export as workarounds.
- **MCP is available on request, not automatic.** Contact Clearcue support to enable MCP access. Uses personal access tokens for authentication — not OAuth.
- **Webhooks are Pro+ only.** Starter plan users can only export via CSV or use Slack notifications — no programmatic data push.
- **Company AI qualification is Pro+ only.** Starter plan signals do keyword matching only without company-level AI filtering, which means more noise.
- **Signal limits are per active signal, not per mention.** 7 signals on Starter means 7 monitoring queries, not 7 results. Each signal can return unlimited leads.
- **First signals take 24-48 hours.** Don't expect instant results after setup — Clearcue needs time to scan and index.
- **No public REST API.** MCP is the only programmatic query interface. For push-based workflows, use webhooks.
- **No Zapier/Make support.** All automation runs through webhooks, MCP, or native integrations.

## Related skills

- `/sales-social-listening` — Social listening strategy — tool comparison, monitoring setup, sentiment, competitive intel, crisis detection
- `/sales-intent` — Buying intent signals and account prioritization
- `/sales-octolens` — Octolens — developer-first social listening, MCP server, REST API
- `/sales-buska` — Buska — AI social listening for lead gen, intent scoring, MCP server, REST API
- `/sales-catchintent` — CatchIntent — AI intent detection, MCP server, webhooks, CRM integrations
- `/sales-communitytracker` — CommunityTracker — community intelligence for GTM teams, intent scoring, REST API
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up signal stacking for competitor interest
**User says**: "I want to track prospects who engage with competitor content on LinkedIn AND are hiring for roles my product supports"
**Skill does**:
1. Reads platform guide for signal stacking setup
2. Explains AND/OR logic and Person vs Company mode
3. Walks through creating two signals (competitor engagement + hiring) and combining them
4. Recommends AI qualification sensitivity tuning to reduce noise
**Result**: Signal stack configured to surface high-intent prospects showing multiple buying indicators

### Example 2: Connect Clearcue to Claude Code via MCP
**User says**: "How do I set up the MCP integration so I can query Clearcue signals from Claude?"
**Skill does**:
1. Reads platform guide for MCP setup steps
2. Explains personal access token authentication
3. Shows example queries: lead retrieval, cross-analysis, ICP matching
4. Suggests workflow: Clearcue signals → Claude Code analysis → outreach draft
**Result**: MCP connected and user can query intent signals from Claude

### Example 3: Webhook pipeline to outreach tool
**User says**: "I want Clearcue signals to automatically feed into my Lemlist campaigns"
**Skill does**:
1. Confirms user is on Pro+ plan (webhook required)
2. Reads platform guide for webhook setup
3. Designs pipeline: Clearcue webhook → middleware (Clay/n8n) → Lemlist
4. Notes that direct Lemlist integration may exist via native connectors
**Result**: Automated pipeline from intent signals to outreach sequences

## Troubleshooting

### Signals returning too many false positives
**Symptom**: Dashboard full of irrelevant leads that don't match your ICP
**Cause**: AI qualification sensitivity too low, or keyword-only matching on Starter plan
**Solution**: If on Pro+, enable Company AI qualification and increase sensitivity. Add negative keywords to exclude noise. Use signal stacking to require multiple indicators before surfacing a lead. Consider upgrading from Starter if keyword-only matching is too noisy.

### MCP not connecting or returning empty results
**Symptom**: Claude Code can't reach Clearcue data or queries return nothing
**Cause**: MCP not enabled on account, or personal access token expired/misconfigured
**Solution**: Contact Clearcue support to verify MCP is enabled. Regenerate your personal access token and update Claude Code settings. Test with a simple query like "Show me recent signals from Clearcue." Verify you have active signals with results in the Clearcue dashboard first.

### Webhook notifications not arriving
**Symptom**: Configured webhooks on Pro plan but endpoint never receives data
**Cause**: Wrong endpoint URL, firewall blocking, or signal has no new results
**Solution**: Verify your endpoint URL is publicly accessible and returns 200 on POST. Check Clearcue's webhook delivery logs (if available). Verify the signal is actively generating results in the dashboard. Test with a simpler endpoint (like webhook.site) to isolate the issue.
