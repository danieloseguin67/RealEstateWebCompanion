---
name: sales-hi-ai
description: "hi ai platform help — AI customer service email reply generator that connects to Gmail/Outlook/SMTP and drafts replies using ChatGPT, Claude, Gemini, or DeepSeek with brand voice training, Google Sheets customer data lookup, and order tracking (Free 3 emails/day, Pro $25/mo). Use when setting up hi ai for customer support email automation, AI-generated replies don't match your brand voice or tone, connecting Google Sheets as a customer database for AI replies, choosing which AI model to use in hi ai for best results, comparing hi ai to Fyxer or other AI email assistants, or wondering if hi ai stores your emails or customer data. Do NOT use for comparing AI email assistants broadly (use /sales-do to find the right comparison). Do NOT use for team shared inbox setup (use /sales-missive or /sales-hiver)."
argument-hint: "[describe what you need help with in hi ai]"
license: MIT
version: 1.0.0
tags: [sales, ai-email, customer-service, platform]
---

# hi ai Platform Help

Helps with hi ai — an AI email assistant that generates customer service replies in ~3 seconds. Connects to Gmail, Outlook, or SMTP and lets you choose between ChatGPT, Claude, Gemini, or DeepSeek for reply generation. Integrates with Google Sheets for real-time customer/product data lookup. Privacy-first: AI only reads emails you select, zero permanent storage.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What are you trying to do with hi ai?**
   - A) Set up hi ai for the first time (connect email, configure AI)
   - B) Improve AI reply quality (brand voice, tone, accuracy)
   - C) Connect customer data (Google Sheets, Excel, tracking)
   - D) Compare hi ai to other AI email assistants
   - E) Something else — describe it

2. **Which email provider?**
   - A) Gmail
   - B) Outlook
   - C) SMTP/other

3. **Which plan are you on (or considering)?**
   - A) Free — 3 AI emails/day, 1 account
   - B) Pro ($25/mo or $20/mo annual) — unlimited emails, 5 accounts
   - C) Enterprise (custom) — up to 50 accounts
   - D) Not sure / evaluating

**Skip-ahead rule**: if the user's prompt already provides enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Comparing AI email assistants broadly | `/sales-do {question}` |
| Team shared inbox with collaboration | `/sales-missive {question}` or `/sales-hiver {question}` |
| Connecting tools via Zapier/Make/API pipelines | Note: hi ai has no public API or iPaaS integration |

For hi ai-specific questions, continue to Step 3.

## Step 3 — hi ai platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, AI model comparison, Google Sheets setup, and brand voice training.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

- For **brand voice issues**: Use the fine-tuning feature to train the AI on your past replies. Provide 10-20 example responses that represent your ideal tone. Adjust the system prompt for each AI model.
- For **data lookup**: Connect Google Sheets with customer info (name, order ID, plan, etc.). The AI pulls from this in real-time when generating replies. Keep columns clean and consistently named.
- For **AI model selection**: Start with Claude or ChatGPT for nuanced customer service. Gemini works well for factual/data-heavy replies. DeepSeek is the budget option for simpler queries.
- For **plan selection**: Free tier (3/day) is enough to test. Pro ($25/mo) once you're handling 5+ support emails daily.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

- **No public API.** hi ai is UI-only — no REST API, webhooks, Zapier, or Make integration. You cannot automate it programmatically.
- **Free tier is very limited.** 3 emails/day and 1 account. Enough to test, not to run support.
- **AI model quality varies.** Different models handle different email types better. Test with your actual support emails before committing.
- **Google Sheets is the only data source.** No native CRM integration (Salesforce, HubSpot). Customer data must be in Sheets/Excel format.
- **Selective AI access is a feature, not a bug.** The AI only reads emails you explicitly select — it won't auto-triage your inbox like Fyxer or Superhuman.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-fyxer` — Fyxer AI platform help (autonomous inbox management, calendar integration). Install:
  `npx skills add sales-skills/sales --skill sales-fyxer -a claude-code`
- `/sales-superhuman` — Superhuman platform help (keyboard-driven email client, AI triage). Install:
  `npx skills add sales-skills/sales --skill sales-superhuman -a claude-code`
- `/sales-shortwave` — Shortwave platform help (AI-first email client for Gmail). Install:
  `npx skills add sales-skills/sales --skill sales-shortwave -a claude-code`
- `/sales-missive` — Missive platform help (collaborative team inbox, internal threads). Install:
  `npx skills add sales-skills/sales --skill sales-missive -a claude-code`
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Setting up hi ai for an e-commerce support inbox
**User says**: "I run a Shopify store and get 30+ support emails a day about orders, returns, and product questions. How do I set up hi ai?"
**Skill does**: Reads platform guide. Recommends Pro plan ($25/mo) for unlimited emails. Walks through: connect Gmail → create Google Sheet with order data (order ID, customer email, status, tracking) → configure brand voice with 10-20 example replies → select Claude or ChatGPT as the AI model → test with real support emails before going live. Notes that hi ai can integrate with tracking APIs for shipment status.

### Example 2: AI replies sound too generic
**User says**: "The AI responses hi ai generates are too formal and don't sound like our brand. We're casual and friendly."
**Skill does**: Explains brand voice fine-tuning: 1) Go to settings and update the system prompt to describe your tone ("casual, friendly, use first names, add emoji occasionally"). 2) Provide 10-20 example replies from your sent folder that capture your ideal voice. 3) Test across different email types (order inquiry vs complaint vs return). 4) Try different AI models — Claude tends to match casual tones better than default ChatGPT.

### Example 3: Connecting Google Sheets for customer data
**User says**: "I want hi ai to automatically pull customer information when it generates a reply. How do I set up the Google Sheets connection?"
**Skill does**: Reads platform guide for data integration setup. Explains: 1) Create a Google Sheet with columns: customer email, name, plan/tier, order history, notes. 2) Connect the sheet in hi ai settings. 3) When generating a reply, the AI matches the sender's email to lookup their record. 4) Keep data updated — stale data leads to wrong replies. Notes that Google Sheets integration is available on all plans including Free.

## Troubleshooting

### AI replies are inaccurate or hallucinate customer details
**Symptom**: The AI generates replies with wrong order numbers, incorrect product names, or fabricated information
**Cause**: The AI model is filling in gaps when it doesn't have real data. Google Sheets may not be connected or may have stale/incomplete data.
**Solution**: 1) Verify Google Sheets connection is active and data is current. 2) Check that column headers match what hi ai expects. 3) Always review AI-generated replies before sending — never auto-send. 4) If hallucinations persist, try switching AI models (Claude tends to be more conservative about fabricating details).

### Brand voice doesn't stick across different email types
**Symptom**: AI matches your tone for simple replies but reverts to formal/generic for complex ones
**Cause**: The fine-tuning examples may all be similar types. Complex emails trigger the model's default behavior.
**Solution**: 1) Add diverse example replies — include complaint responses, refund confirmations, escalation emails, not just simple acknowledgments. 2) Update the system prompt with explicit tone rules ("Never use 'Dear valued customer', always use first name"). 3) Test with 5 different email categories and refine.

### Free tier hitting daily limit too quickly
**Symptom**: Running out of the 3 free emails before the day is done
**Cause**: Free plan is designed for testing, not production use
**Solution**: 1) If handling 5+ support emails daily, upgrade to Pro ($25/mo or $20/mo annual). 2) Prioritize which emails get AI assistance — save the 3 free replies for complex emails, handle simple ones manually. 3) Use the free email tools (subject line generator, email improver) for emails you draft yourself.
