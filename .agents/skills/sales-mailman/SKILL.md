---
name: sales-mailman
description: "Mailman platform help — Gmail plugin that batches email delivery into scheduled slots, blocks unknown senders with daily digest, Do Not Disturb mode for deep work, and VIP whitelist for critical messages ($8-10/mo, Gmail only, works with any Gmail client). Use when constant email notifications are killing your focus time, inbox flooded with emails from unknown senders, wanting to batch email delivery instead of getting interrupted all day, comparing Mailman to SaneBox or Superhuman for inbox control, setting up Do Not Disturb periods for deep work blocks, or deciding if Mailman is worth it vs free Gmail filters. Do NOT use for AI email drafting or inbox categorization (use /sales-superhuman or /sales-shortwave). Do NOT use for bulk inbox cleanup or unsubscribing (use /sales-clean-email)."
argument-hint: "[describe what you need help with in Mailman]"
license: MIT
version: 1.0.0
tags: [sales, email-productivity, inbox-management, platform]
---

# Mailman Platform Help

Helps with everything related to using Mailman — a Gmail plugin that reduces email distraction by batching delivery into scheduled slots, blocking unknown senders, and creating email-free Do Not Disturb periods. Works with any Gmail-compatible client (Apple Mail, Spark, Superhuman, Outlook via Gmail). Single plan at $8-10/mo.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated knowledge.

Ask the user:

1. **What are you trying to do with Mailman?**
   - A) Set up Mailman for the first time
   - B) Configure delivery slots or Do Not Disturb
   - C) Set up sender blocking or VIP list
   - D) Compare Mailman to alternatives (SaneBox, Superhuman, etc.)
   - E) Troubleshoot — emails arriving outside delivery slots
   - F) Something else — describe it

2. **Which email client do you use with Gmail?**
   - A) Gmail web
   - B) Apple Mail
   - C) Spark
   - D) Superhuman
   - E) Outlook (via Gmail)
   - F) Other

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to another skill, route:
- AI email drafting or inbox categorization → "Run: `/sales-superhuman {user's original question}`" or "Run: `/sales-shortwave {user's original question}`"
- Bulk inbox cleanup or unsubscribing → "Run: `/sales-clean-email {user's original question}`"
- Server-side email filtering with smart folders → "Run: `/sales-sanebox {user's original question}`"
- AI executive assistant comparison → "Run: `/sales-alfred {user's original question}`"

Otherwise, answer directly from the platform reference below.

## Step 3 — Mailman platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, delivery slot configuration, VIP list setup, and competitive positioning.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

**For setting up delivery slots:**
1. Choose your pattern: hourly intervals, set number of times per day, or specific times
2. Start conservative — try 3x/day delivery (morning, midday, end-of-day)
3. If you miss time-sensitive emails, add those senders to the VIP list
4. Adjust frequency based on your role — customer-facing roles may need more frequent delivery

**For blocking unknown senders:**
1. Mailman automatically holds emails from senders you haven't emailed before
2. Review the daily digest to catch legitimate new contacts
3. Add new important senders/domains to VIP as you discover them
4. Newsletters and notifications are blocked separately — adjust per sender from digest

**For maximizing deep work:**
1. Set Do Not Disturb for your most productive hours (e.g., 9am-12pm)
2. Combine with delivery slots outside DND windows
3. Add VIP senders for truly urgent contacts who should bypass DND
4. Consider pairing with calendar blocking for full focus sessions

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about how Mailman processes email.*

- **Gmail only.** Mailman is a Gmail plugin — it won't work with Outlook, Yahoo, or any non-Gmail provider. It works WITH clients that connect to Gmail (Apple Mail, Spark, etc.) but the underlying account must be Gmail/Google Workspace.
- **Server-side processing.** Mailman processes email server-side, which means it holds and delays your actual email delivery. This is a feature, but be aware your emails are routed through their servers.
- **VIP bypass is essential.** Without a well-configured VIP list, you'll miss urgent emails during DND or between delivery slots. Set this up immediately.
- **Single plan, simple pricing.** $8/mo annual or $10/mo monthly. No feature gates, no upsells. Everything is included.
- **No AI features.** Mailman doesn't draft emails, categorize messages, or provide AI assistance. It's purely about delivery timing and sender filtering. For AI features, use Superhuman, Shortwave, or Fyxer alongside Mailman.
- **Daily digest is critical.** The blocked sender digest is how you discover legitimate new contacts. If you ignore it, you'll miss real messages.
- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Related skills

- `/sales-sanebox` — SaneBox server-side email filtering (smart folders, any email provider, $7/mo). Install:
  `npx skills add sales-skills/sales --skill sales-sanebox -a claude-code`
- `/sales-superhuman` — Superhuman email client (keyboard-driven, AI drafting, MCP server, $25-40/mo). Install:
  `npx skills add sales-skills/sales --skill sales-superhuman -a claude-code`
- `/sales-shortwave` — Shortwave AI-native Gmail client (AI filters, Ghostwriter, $24-100/mo). Install:
  `npx skills add sales-skills/sales --skill sales-shortwave -a claude-code`
- `/sales-newmail` — NewMail AI email assistant (voice-trained drafting, task extraction, daily briefings, $15-30/mo). Install:
  `npx skills add sales-skills/sales --skill sales-newmail -a claude-code`
- `/sales-clean-email` — Clean Email inbox cleanup (bulk actions, Auto Clean rules, Unsubscriber, $29.99/yr). Install:
  `npx skills add sales-skills/sales --skill sales-clean-email -a claude-code`
- `/sales-inbox-zero` — Inbox Zero open-source AI email assistant (auto-labeling, REST API, self-hostable). Install:
  `npx skills add sales-skills/sales --skill sales-inbox-zero -a claude-code`
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: Set up Mailman for focused deep work as a solopreneur
**User says**: "I'm a founder and email notifications destroy my morning focus. How do I set up Mailman to only deliver emails at lunch and end of day?"
**Skill does**:
1. Reads platform guide for delivery slot configuration
2. Recommends setting delivery slots to 12pm and 5pm only
3. Explains Do Not Disturb mode for 8am-12pm as extra protection
4. Advises setting up VIP list for co-founder, investors, and key clients
5. Notes that the 21-day free trial is enough to test if the pattern works
**Result**: User has a clear 2-slot delivery schedule with VIP bypass for critical contacts

### Example 2: Compare Mailman to SaneBox for inbox management
**User says**: "Should I use Mailman or SaneBox? I use Gmail and just want fewer distractions."
**Skill does**:
1. Reads platform guide comparison section
2. Explains: Mailman controls WHEN emails arrive (batching, DND); SaneBox controls WHAT you see (AI sorting into smart folders)
3. Notes pricing: Mailman $8/mo vs SaneBox $7/mo — similar price
4. Notes Mailman is Gmail-only; SaneBox works with any email provider
5. Suggests Mailman if the core problem is constant interruptions; SaneBox if the problem is too many unimportant emails mixed with important ones
6. Notes they can be used together — SaneBox sorts, Mailman batches delivery
**Result**: Clear comparison with recommendation that they complement each other

### Example 3: Can I automate Mailman or integrate it with my CRM?
**User says**: "Can I connect Mailman to my CRM or use it with Zapier?"
**Skill does**:
1. States clearly that Mailman has no public API, no webhooks, and no Zapier/Make integration
2. Explains Mailman is a simple Gmail plugin focused on delivery timing — it doesn't touch email content or metadata
3. Suggests alternatives with automation: Inbox Zero (REST API), Superhuman (MCP server), or SaneBox (basic Zapier integration)
4. Notes that Mailman can coexist with other tools since it only controls delivery timing
**Result**: User understands Mailman's limits and knows alternatives for automation needs

## Troubleshooting

### Emails arriving outside delivery slots
**Symptom**: Some emails arrive immediately instead of being held until the next delivery slot
**Cause**: The sender is on your VIP list, or the email matches a VIP keyword/domain. Mailman deliberately bypasses batching for VIP contacts.
**Solution**: Check your VIP list for overly broad entries (e.g., an entire domain like @gmail.com). Remove or narrow VIP rules. If the sender isn't on VIP, check that Mailman is still active in your Gmail settings — the plugin may have been disconnected.

### Missing important emails from new contacts
**Symptom**: A client or prospect emailed you but you never saw it
**Cause**: Mailman blocks emails from senders you haven't emailed before. The message went to the daily blocked digest which you may have missed.
**Solution**: Review the daily digest every day — this is essential. Add the sender to your VIP list immediately. For proactive prevention, add expected new contact domains to VIP before they email you (e.g., before a meeting with a new company, add their domain).

### Daily digest is overwhelming with blocked emails
**Symptom**: The blocked sender digest has 50+ emails and it's hard to find real messages
**Cause**: Many newsletters, notifications, and unknown senders are being collected. This is Mailman working as intended, but the digest volume makes triage difficult.
**Solution**: From the digest, mark legitimate senders as "always allow" to reduce future digest volume. Unsubscribe from newsletters you don't read (use Clean Email's Unsubscriber for bulk cleanup). Over 2-3 weeks, the digest should shrink as your VIP list grows and unwanted senders are pruned.
