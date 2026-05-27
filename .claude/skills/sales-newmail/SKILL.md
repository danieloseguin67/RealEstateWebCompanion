---
name: sales-newmail
description: "NewMail AI platform help — AI email assistant with voice-trained drafting, priority sorting, task extraction from emails, daily briefings, and scheduling link generation for Gmail/Outlook/Apple Mail (Free preview, Solo $15/mo, Pro $30/mo). Use when setting up NewMail AI for inbox management, AI drafts don't sound like you or miss context, inbox categories keep miscategorizing important emails, comparing NewMail to Superhuman or Shortwave or Fyxer, daily briefings missing key messages, task extraction from emails not capturing the right action items, wondering if NewMail is worth the price vs free Gmail AI, or scheduling links not embedding in replies correctly. Do NOT use for choosing a meeting note-taker (use /sales-note-taker). Do NOT use for AI executive assistant comparison (use /sales-alfred)."
argument-hint: "[describe what you need help with in NewMail AI]"
license: MIT
version: 1.0.0
tags: [sales, email-client, ai-email, productivity, platform]
---

# NewMail AI Platform Help

Helps with everything related to using NewMail AI — an AI email assistant that drafts replies in your voice, prioritizes your inbox, extracts tasks from emails, generates daily briefings, and creates scheduling links. Works with Gmail, Outlook, and Apple Mail. Positions as a more affordable, assistant-like alternative to Superhuman.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated knowledge.

Ask the user:

1. **What are you trying to do with NewMail AI?**
   - A) Set up NewMail AI for the first time
   - B) Improve AI draft quality (tone, accuracy)
   - C) Configure inbox categories or priority sorting
   - D) Set up task extraction or daily briefings
   - E) Configure scheduling link generation
   - F) Compare NewMail AI to alternatives
   - G) Troubleshoot performance issues
   - H) Something else — describe it

2. **Which email provider?**
   - A) Gmail / Google Workspace
   - B) Outlook / Microsoft 365
   - C) Apple Mail

3. **Which plan are you on (or considering)?**
   - A) Free Preview (limited to ~50 emails)
   - B) Solo ($15/mo)
   - C) Pro ($30/mo)
   - D) Enterprise (custom — teams 20-200+)
   - E) Not sure yet

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to another skill, route:
- Choosing a meeting note-taker → "Run: `/sales-note-taker {user's original question}`"
- AI executive assistant comparison → "Run: `/sales-alfred {user's original question}`"
- CRM integration strategy → "Run: `/sales-integration {user's original question}`"
- Meeting scheduling strategy → "Run: `/sales-meeting-scheduler {user's original question}`"

Otherwise, answer directly from the platform reference below.

## Step 3 — NewMail AI platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, plan gates, integrations, and competitive positioning.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

**For improving AI drafts:**
1. Send more emails manually — NewMail learns from your writing style over time
2. Use natural language adjustments: "make this concise" or "sound more friendly"
3. Add FAQ + Links in settings so drafts include relevant resources automatically
4. If tone is consistently off after 2+ weeks, your sent history may not reflect your desired voice

**For inbox categorization issues:**
1. Categories use plain English — be specific when defining them (e.g., "client follow-ups" not "important")
2. Adjust AI assertiveness level in settings (frequent vs minimal prompts)
3. Give it 1-2 weeks to learn your patterns from corrections

**For task extraction issues:**
1. Task extraction works best with clear action items in emails ("please send", "can you review")
2. Vague requests may be missed — the AI prioritizes explicit asks
3. Check extracted tasks daily via the daily briefing to catch and correct misses

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan-gated features and pricing that may change.*

- **No public API, no webhooks, no Zapier/Make.** NewMail AI is UI-only — no programmatic access. If you need automation, consider Inbox Zero (REST API) or Superhuman (MCP server).
- **Pricing is inconsistent across sources.** Some pages show $12/mo, $15/mo, or $20/mo for the entry-level paid plan. Verify on the pricing page before purchasing.
- **Free preview is very limited (~50 emails).** Enough to test AI drafting quality but not for real daily use.
- **CRM/Slack integration details are vague.** The website mentions CRM and Slack sync but doesn't document which CRMs or how the sync works. Test during the free preview.
- **Apple Mail support scope is unclear.** Gmail and Outlook are primary; Apple Mail may have limited features compared to the other providers.
- **Enterprise requires custom pricing.** No self-serve plan for teams — you must contact sales for 20+ seats.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-superhuman` — Superhuman email client (keyboard-driven, MCP server, CRM integrations, $25-40/mo). Install:
  `npx skills add sales-skills/sales --skill sales-superhuman -a claude-code`
- `/sales-shortwave` — Shortwave AI-native Gmail client (AI filters, Ghostwriter, MCP consumer, $24-100/mo). Install:
  `npx skills add sales-skills/sales --skill sales-shortwave -a claude-code`
- `/sales-fyxer` — Fyxer AI email assistant (inbox organization, AI drafting, meeting notes, $22.50-50/mo). Install:
  `npx skills add sales-skills/sales --skill sales-fyxer -a claude-code`
- `/sales-spark-mail` — Spark Mail cross-platform AI email client (Smart Inbox, Gatekeeper, free tier). Install:
  `npx skills add sales-skills/sales --skill sales-spark-mail -a claude-code`
- `/sales-sanebox` — SaneBox server-side email filtering (smart folders, any email provider, $7/mo). Install:
  `npx skills add sales-skills/sales --skill sales-sanebox -a claude-code`
- `/sales-inbox-zero` — Inbox Zero open-source AI email assistant (auto-labeling, REST API, self-hostable). Install:
  `npx skills add sales-skills/sales --skill sales-inbox-zero -a claude-code`
- `/sales-alfred` — alfred_ AI executive assistant (email triage, reply drafting, task extraction)
- `/sales-note-taker` — Choose a dedicated AI meeting note-taker. Install:
  `npx skills add sales-skills/sales --skill sales-note-taker -a claude-code`
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Compare NewMail AI to Superhuman
**User says**: "Should I use NewMail AI or Superhuman for managing my sales inbox?"
**Skill does**:
1. Compares: NewMail focuses on AI assistant behavior (task extraction, daily briefings, scheduling links); Superhuman focuses on keyboard speed, Split Inbox, and CRM integrations
2. Notes pricing: NewMail $15-30/mo vs Superhuman $25-40/mo
3. Notes NewMail has no API/MCP; Superhuman has MCP server for Claude Code
4. Notes Superhuman has CRM integrations (Business+); NewMail's CRM integration details are unclear
5. Recommends NewMail if you want an AI assistant that proactively surfaces tasks and drafts; Superhuman if you want speed and developer integrations
**Result**: Clear comparison based on workflow preference and budget

### Example 2: Set up task extraction and daily briefings
**User says**: "How do I get NewMail to extract tasks from my emails and send me a daily summary?"
**Skill does**:
1. Reads platform guide for task extraction and daily briefing details
2. Explains task extraction happens automatically — NewMail scans incoming emails for action items
3. Notes daily briefings include calendar events, extracted tasks, and priority emails each morning
4. Advises: review extracted tasks daily for the first 2 weeks to train accuracy
5. Notes that vague requests ("we should discuss") may not be captured — explicit asks work best
**Result**: User understands task extraction setup and expectations

### Example 3: Troubleshoot AI drafts that sound generic
**User says**: "NewMail drafts all sound the same — they're too formal and don't match how I actually write"
**Skill does**:
1. Explains NewMail learns from sent email history — short history produces generic drafts
2. Suggests sending more emails manually to build training data
3. Notes natural language adjustments: "make this casual" or "use shorter sentences"
4. Adjusts AI assertiveness level in settings if it's overriding user preferences
5. If quality doesn't improve after 2+ weeks, the tool may not fit the user's communication style
**Result**: Specific improvement steps with realistic timeline

## Troubleshooting

### AI drafts don't match your voice
**Symptom**: AI-generated replies are too formal, too casual, or generic
**Cause**: NewMail learns from your sent email history. Short history or inconsistent writing style produces poor drafts.
**Solution**: Send more emails manually to build training data. Use natural language instructions like "make this concise" or "sound more friendly" to guide individual drafts. Give it 2+ weeks of consistent email sending before judging quality.

### Daily briefings missing important emails
**Symptom**: The morning briefing omits emails you consider high-priority
**Cause**: Priority sorting may not have learned your preferences yet, or the sender isn't recognized as important.
**Solution**: Manually mark missed emails as important — NewMail learns from these corrections. Define custom categories in plain English to surface specific email types. Check that the email provider isn't filtering messages before they reach NewMail.

### Inbox categories mislabeling emails
**Symptom**: Client emails ending up in low-priority categories, newsletters marked as urgent
**Cause**: Custom categories use AI interpretation of plain English rules — vague rules produce false positives.
**Solution**: Make category definitions more specific: "Emails from @client-domain.com about project updates" instead of "important client emails." Reduce the number of categories to minimize overlaps. Review and correct mislabeled emails for 1-2 weeks to train the system.
