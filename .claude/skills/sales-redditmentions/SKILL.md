---
name: sales-redditmentions
description: "RedditMentions platform help — budget Reddit keyword monitoring with email digests and Slack alerts, scans every 30 minutes. Use when RedditMentions alerts are too noisy and you need to narrow down keywords or subreddits, you're not sure which subreddits to monitor for your niche, daily email digests aren't arriving or have wrong timing, Slack integration isn't sending notifications to your channel, you hit the 5-keyword limit on Standard and need to decide whether Pro is worth it, you want to compare RedditMentions vs other Reddit monitoring tools, or you're looking for the cheapest Reddit mention alert after GummySearch shut down. Do NOT use for social listening strategy across tools (use /sales-social-listening) or choosing between Reddit monitoring platforms (use /sales-social-listening)."
argument-hint: "[describe what you need help with in RedditMentions — e.g., 'too many irrelevant alerts']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, reddit, platform]
---

# RedditMentions Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Setting up monitoring (choosing keywords, subreddits)
   - B) Email digest configuration (timing, frequency)
   - C) Slack integration setup
   - D) Reducing noise / irrelevant matches
   - E) Plan limits and upgrade decision
   - F) Something else — describe it

2. **Which plan are you on?**
   - A) Free Preview (testing before trial)
   - B) Standard (5 keywords, 5 subreddits, €4.49/mo)
   - C) Pro (15 keywords, 15 subreddits, €9.49/mo)

3. **What's your goal?**
   - A) Brand monitoring (track mentions of my product)
   - B) Lead generation (find people asking for solutions)
   - C) Competitor monitoring
   - D) Customer research / market trends

**If the user's request already provides context, skip to Step 2.**

## Step 2 — Route or answer directly

- Multi-platform monitoring (not just Reddit) → `/sales-social-listening [question]`
- Reddit monitoring with API/webhooks/MCP access → `/sales-octolens [question]`
- Reddit monitoring with AI comment generation → `/sales-keymentions [question]`
- Reddit + Quora monitoring with AI reply drafts → `/sales-threadradar [question]`
- Reddit monitoring with competitive intelligence → `/sales-threadlytics [question]`
- Social listening tool comparison → `/sales-social-listening which tool should I pick`

Otherwise, answer directly from the platform reference below.

## Step 3 — RedditMentions platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, keyword strategy, Slack setup, and notification configuration.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation:

1. **Keyword strategy** — use multi-word phrases matching buying intent, not single generic words
2. **Subreddit selection** — pick subreddits where your audience actually asks questions
3. **Negative keywords** — filter out common false positives (e.g., exclude "minecraft" if monitoring "server")
4. **Notification timing** — set daily digest for a time when you can actually act on matches

If you discover a gotcha or tip not covered in `references/learnings.md`, append it there.

## Gotchas

*Best-effort from research — review these, especially items about plan limits and monitoring frequency.*

- **30-minute scan interval means you'll miss fast threads.** If a post goes viral and dies within 20 minutes, you might not catch it. For faster alerts, Syften offers sub-minute Reddit latency.
- **No API, no webhooks, no automation.** You cannot export data, trigger workflows, or connect to CRM. If you need programmatic access, use Octolens or Syften instead.
- **Keyword/subreddit limits are hard caps.** Standard allows 5/5 only — no overage. Choose carefully or upgrade to Pro (15/15) for €9.49/mo.
- **7-day match history only.** After 7 days, matches disappear from the dashboard. No archive, no export. Screenshot or save anything important.
- **No sentiment or scoring.** Every match is treated equally — you manually decide relevance. Higher-priced tools like Octolens or Reddinbox offer AI relevance scoring.
- **Reddit-only.** Does not monitor X, HN, LinkedIn, or any other platform. Pair with another tool if needed.
- **Forward-looking only.** No historical backfill — monitoring starts from when you create keywords.

## Related skills

- `/sales-social-listening` — Social listening strategy across all platforms — tool comparison, monitoring setup, competitive intel, crisis detection
- `/sales-keymentions` — KeyMentions platform help — Reddit monitoring with AI comment generation and auto-publish
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring with 500M+ indexed conversations, Share of Voice
- `/sales-octolens` — Octolens platform help — developer-first social listening with API/MCP on all plans
- `/sales-syften` — Syften platform help — fast community monitoring across 15+ platforms with API/webhooks
- `/sales-threadradar` — ThreadRadar platform help — Reddit + Quora monitoring with AI reply drafts
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Set up monitoring for a new SaaS launch
**User says**: "I just launched a task management app and want to know when people on Reddit ask for recommendations"
**Skill does**:
1. Reads platform guide for keyword strategy
2. Suggests keywords: "task management recommendation", "best task app", "looking for task manager", competitor names
3. Recommends subreddits: r/productivity, r/SaaS, r/smallbusiness, r/Entrepreneur
4. Advises using negative keywords to exclude gaming/unrelated contexts
**Result**: Monitoring configured to catch buying-intent threads

### Example 2: Slack integration not working
**User says**: "I connected Slack but I'm not getting any notifications"
**Skill does**:
1. Reads platform guide troubleshooting
2. Checks common causes: wrong channel selected, OAuth permissions incomplete, no matches yet (tool only sends when matches exist)
3. Suggests: verify OAuth connection in settings, check that keywords have actual matches in dashboard, try a broader keyword temporarily to confirm delivery works
**Result**: Slack notifications debugged

### Example 3: Standard plan feels too restrictive
**User says**: "I'm on Standard but 5 keywords isn't enough — is Pro worth it?"
**Skill does**:
1. Reads platform guide pricing section
2. Compares: Standard €4.49/mo (5/5) vs Pro €9.49/mo (15/15)
3. Offers alternatives: consolidate keywords using broader phrases, drop low-value subreddits, or consider Syften (€19.95/mo, 3 filters) or KeyMentions (free tier, 3 keywords) if budget allows more features
**Result**: Clear upgrade decision with alternatives considered

## Troubleshooting

### Daily email not arriving
**Symptom**: Signed up and configured keywords but no daily email received
**Cause**: Zero matches (no email sent if nothing matched), email in spam folder, or wrong send time configured
**Solution**: Check the dashboard for matches first — if matches exist but no email arrives, check spam/promotions folder. Verify the configured send time in settings. Add hello@redditmentions.com to your contacts. If still nothing after 48 hours with confirmed dashboard matches, contact support.

### Too many irrelevant mentions
**Symptom**: Getting notified about threads that have nothing to do with your product
**Cause**: Keywords are too broad (single words match everything) or subreddits are too general
**Solution**: Use multi-word phrases ("best CRM for freelancers" not "CRM"). Add negative keywords for common false positives. Switch from r/technology (too broad) to niche subreddits where your audience actually posts. Review and adjust weekly.

### Matches disappearing from dashboard
**Symptom**: Matches you saw earlier are gone
**Cause**: 7-day retention limit — matches older than 7 days are permanently deleted
**Solution**: This is by design, not a bug. If you need to preserve matches, copy them immediately or set up Slack integration for a persistent record. There is no export or archive feature. Consider Octolens or Syften if you need longer data retention.
