---
name: sales-keymentions
description: "KeyMentions platform help — Reddit keyword monitoring with AI comment generation and auto-publish for lead generation. Use when KeyMentions keyword alerts are returning too much noise from low-traffic threads, auto-published comments are getting removed or flagged as spam, mention quota is filling up before the month ends, you want to find viral Reddit threads before they peak, your Reddit account got shadowbanned after using auto-publish, you need to set up monitoring for a competitor brand on Reddit, or you're looking for a GummySearch replacement after it shut down. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in KeyMentions — e.g., 'my auto-published comments keep getting removed']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# KeyMentions Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up keyword monitoring (choosing keywords, filters)
   - B) AI comment generation (quality, relevance, tone)
   - C) Auto-publish issues (comments removed, account banned)
   - D) Finding viral threads / "Reddit Time-Traveling"
   - E) Managing mention quota / plan limits
   - F) Multi-project setup
   - G) Something else — describe it

2. **Which plan are you on?**
   - A) Free (3 keywords, 30 mentions/mo, 3 auto-publish)
   - B) Starter (3 keywords, 300 mentions/mo, 30 auto-publish)
   - C) Pro (12 keywords, 2,400 mentions/mo, 100 auto-publish)
   - D) Agency (35 keywords, 10K mentions/mo, 400 auto-publish)

3. **What's your goal?**
   - A) Brand monitoring (track mentions of my brand/product)
   - B) Lead generation (find people asking for solutions I offer)
   - C) Competitor monitoring (track what people say about competitors)
   - D) Content ideas (find trending topics in my niche)

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit) → `/sales-social-listening [question]`
- Reddit monitoring with API/webhooks/MCP access → `/sales-octolens [question]`
- Reddit-specific monitoring with competitive intelligence → `/sales-threadlytics [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — KeyMentions platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, keyword strategy, auto-publish safety, and Reddit account protection.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword setup** — choose keywords that match buying intent, not just brand names
2. **Auto-publish safety** — never exceed 10% self-promotion ratio, vary comment style
3. **Virality filter** — use it to avoid wasting quota on dead threads
4. **Account protection** — warm up accounts, use natural posting patterns, don't auto-publish from day one

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about Reddit's anti-spam enforcement that changes frequently.*

- **Auto-publish is the #1 ban risk.** Reddit wiped ~70% of automated accounts in 2025. Never auto-publish from a new or low-karma account. Warm up manually for 2-4 weeks first.
- **The 10% rule is real.** Reddit flags accounts where >10% of activity is self-promotional. If you only use KeyMentions for commenting, your ratio will be 100% promotional. Mix in genuine engagement manually.
- **Mention limits are hard caps.** Once you hit your monthly mention limit, monitoring stops until next billing cycle. No overage option — must upgrade.
- **No API or integrations.** KeyMentions is UI-only. You cannot export data, set up webhooks, or connect to CRM/Slack. If you need programmatic access, use Octolens or Syften instead.
- **Reddit-only.** Does not monitor any other platform. If you need X, LinkedIn, HN, or news coverage, pair with another tool.
- **AI comments need heavy editing.** Auto-generated comments often sound generic. Moderators and users can spot AI-written replies. Always review and personalize before publishing.
- **Virality filter can be too aggressive.** On narrow keywords, the traffic filter may suppress relevant but low-volume threads. Test with it off first.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring with 500M+ indexed conversations, Share of Voice, SERP tracking
- `/sales-octolens` — Octolens platform help — developer-first social listening with Reddit + GitHub + HN + API/MCP on all plans
- `/sales-awario` — Awario platform help — budget social listening with Boolean search and Awario Leads social selling
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up Reddit monitoring for a SaaS product
**User says**: "I launched a project management tool and want to find Reddit threads where people ask for recommendations"
**Skill does**:
1. Reads platform guide for keyword strategy
2. Suggests keywords: "project management recommendation", "best project management tool", "looking for project management", competitor names
3. Recommends enabling virality filter to focus on active threads
4. Warns about auto-publish risks and suggests manual review first
**Result**: Monitoring configured with intent-based keywords

### Example 2: Auto-published comments getting removed
**User says**: "My auto-published comments keep getting deleted by moderators"
**Skill does**:
1. Reads platform guide troubleshooting section
2. Identifies likely causes: generic AI tone, too promotional, posting too frequently in one subreddit
3. Recommends: disable auto-publish, review AI suggestions, personalize before posting, check subreddit self-promotion rules
4. Suggests spacing comments across subreddits and mixing genuine engagement
**Result**: Clear action plan to avoid further removals

### Example 3: Mention quota running out mid-month
**User says**: "I'm on the Starter plan and running out of mentions by week 2"
**Skill does**:
1. Reads platform guide pricing section
2. Identifies the 300 mention/mo limit on Starter
3. Suggests: narrow keywords (more specific = fewer matches), use virality filter to skip low-traffic threads, consider upgrading to Pro (2,400 mentions/mo, $79/mo)
4. Notes that broad keywords like "CRM" will burn quota fast — use "best CRM for small team" instead
**Result**: Quota optimization strategy or clear upgrade path

## Troubleshooting

### Auto-published comments getting shadowbanned
**Symptom**: Comments appear in your account but get no upvotes/replies, or show as [removed] in incognito
**Cause**: Reddit's spam detection flagged the account due to automated behavior patterns (identical formatting, link ratio, posting cadence)
**Solution**: Stop auto-publishing immediately. Post manually for 2-4 weeks with genuine engagement (no links). Check shadowban status at reddit.com/appeals. If banned, start fresh with a new account and never auto-publish until you have 500+ karma and 30+ days of natural activity.

### Keywords returning irrelevant mentions
**Symptom**: Getting notifications for threads that have nothing to do with your product or niche
**Cause**: Keywords are too generic (e.g., "marketing" matches everything) or lack context
**Solution**: Use multi-word phrases that match buying intent ("best email tool for startups" not "email"). Add competitor names as keywords. Enable the virality filter to skip low-engagement posts. Review and adjust keywords weekly for the first month.

### AI-generated comments sound robotic
**Symptom**: Comments get downvoted or users call them out as AI/bot content
**Cause**: AI comment generator produces generic, slightly promotional responses that experienced Redditors recognize instantly
**Solution**: Never publish AI comments verbatim. Use them as a starting draft, then: (1) add a personal anecdote or opinion, (2) reference specific details from the thread, (3) remove any "As someone who..." or "I've found that..." AI patterns, (4) match the subreddit's tone (casual vs. technical). If you can't personalize, don't post.
