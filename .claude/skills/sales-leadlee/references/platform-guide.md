# Leadlee Platform Reference

## Overview

Leadlee is a budget Reddit lead generation tool that monitors subreddits 24/7, identifies high-intent prospects using AI quality scoring, and generates contextual reply drafts. Cheapest Reddit lead gen with AI replies at $12/mo. Chrome extension + web UI only — no API, no webhooks, no iPaaS integrations.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Lead discovery** | Scans Reddit 24/7 for threads matching your product description, assigns quality scores | UI-only — no API, no webhooks, no exports |
| **AI reply generation** | Generates contextual reply drafts that mention your product naturally | UI-only — click to generate, edit, then post |
| **Auto-reply (beta)** | One-click automated reply posting to Reddit threads | UI-only — beta feature, no scheduling or API trigger |
| **Product tracking** | Configure multiple products/URLs for Leadlee to monitor (1/3/10 depending on plan) | UI-only |
| **Analytics dashboard** | Lead performance metrics, time-based filtering, quality score tracking | UI-only — no data export API |
| **Chrome extension** | Browser-based access to lead discovery and reply tools | Chrome extension only |

**No public API.** No REST API, no webhooks, no Zapier/Make/n8n triggers or actions, no MCP server. All interaction is through the web UI and Chrome extension. Data cannot be exported programmatically.

## Pricing, limits & plan gates

| Feature | Free | Pro ($12/mo) | Pro Plus ($29/mo) |
|---|---|---|---|
| **Leads** | 15 total (lifetime cap) | Unlimited | Unlimited |
| **Products** | 1 | 3 | 10 |
| **AI replies** | Limited | Unlimited | Unlimited |
| **Auto-reply (beta)** | No | Yes | Yes |
| **Viral post templates** | No | Yes | Yes |
| **Full analytics** | No (basic only) | Yes | Yes |
| **Real-time updates** | No | Yes | Yes |

**Key limits:**
- Free tier: 15 leads total, not per month — this is a trial, not a sustainable plan
- Product slots: hard limit per plan (1/3/10) — each product is a separate monitoring stream with its own URL and description
- No overage billing — you hit the cap and stop getting leads (Free) or can't add more products (Pro/Pro Plus)

**Coming soon (announced, not yet available):**
- Generate and schedule Reddit posts (Pro plans)

## Integrations

**None.** Leadlee has no native integrations, no Zapier/Make/n8n connectors, no webhooks, no API. The only way to get data out is manual copy-paste or screenshots.

**Workarounds:**
- Copy lead URLs manually into your CRM
- Use browser automation tools (if you must) to scrape the Leadlee dashboard — but this is fragile and unsupported
- Screenshot analytics for reporting

## Data model

Leadlee's data model is simple — there's no API so these are conceptual objects from the UI:

**Product** (the thing Leadlee monitors for)
<!-- Constructed from UI — verify against live product -->
```json
{
  "name": "My SaaS Tool",
  "url": "https://example.com",
  "description": "AI-powered project management for remote teams",
  "status": "active"
}
```

**Lead** (a Reddit thread Leadlee found)
<!-- Constructed from UI — verify against live product -->
```json
{
  "thread_title": "Looking for a tool to manage remote team projects",
  "subreddit": "r/remotework",
  "quality_score": 85,
  "status": "new",
  "discovered_at": "2026-05-06T14:30:00Z",
  "reddit_url": "https://reddit.com/r/remotework/comments/...",
  "ai_reply_draft": "I've been using [Product] for this exact use case..."
}
```

**AI Reply** (generated response draft)
<!-- Constructed from UI — verify against live product -->
```json
{
  "lead_id": "...",
  "draft_text": "Great question! I faced the same challenge...",
  "status": "draft",
  "posted": false
}
```

## Quick-start recipes

### Recipe 1: Set up your first product monitoring

**Goal:** Get Leadlee finding leads for your product within 5 minutes.

**Steps:**
1. Sign up at leadlee.co (free tier, no credit card)
2. Enter your product URL — Leadlee's AI analyzes your website
3. Review the AI-generated product description — edit to be specific about the problem you solve
4. Leadlee starts scanning Reddit immediately
5. Check back in 1-2 hours for initial leads

**Tips:**
- Be specific in your product description: "AI invoice automation for freelancers" beats "business tool"
- Focus on the problem you solve, not features
- The first batch of leads calibrates Leadlee's AI — review quality scores and note which threshold works for you

### Recipe 2: Safe manual reply workflow

**Goal:** Use Leadlee's AI drafts without risking your Reddit account.

**Steps:**
1. Open Leadlee dashboard → filter leads by quality score (start with 70+)
2. Click a lead to see the Reddit thread
3. Read the full thread — understand what the person actually needs
4. Click "Generate Reply" to get an AI draft
5. **Edit heavily**: Remove generic praise, add specific details from the thread, make it genuinely helpful
6. Open the Reddit thread in a new tab
7. Post your edited reply manually through Reddit's UI
8. Mark the lead as "contacted" in Leadlee

**Safety rules:**
- Never post AI drafts verbatim — Reddit users detect and downvote canned responses
- Limit to 2-3 replies per day across different subreddits
- Follow the 10:1 rule: 10 genuine comments for every 1 that mentions your product
- Space replies at least 30 minutes apart
- Build karma in target subreddits through genuine participation first

### Recipe 3: Multi-product monitoring (Pro/Pro Plus)

**Goal:** Monitor different products or product angles simultaneously.

**Steps:**
1. Upgrade to Pro ($12/mo for 3 products) or Pro Plus ($29/mo for 10)
2. Add each product with a different URL and description
3. Use different angles for the same product to catch different intent signals:
   - Product A: "Invoice automation for freelancers" (targets freelancer subreddits)
   - Product B: "Automated billing for agencies" (targets agency subreddits)
   - Product C: "QuickBooks alternative" (targets people comparing tools)
4. Compare lead quality and volume across products to see which positioning resonates

## Integration patterns

Since Leadlee has no API, webhooks, or iPaaS connectors, integration is entirely manual:

**Manual CRM sync:**
1. When you find a quality lead in Leadlee, open your CRM
2. Create a new contact/lead with the Reddit username and thread URL
3. Note the quality score and subreddit as custom fields
4. Track your reply status and any follow-up conversations

**Reporting:**
- Use Leadlee's built-in analytics for lead volume and quality trends
- For deeper analysis, manually log leads in a spreadsheet with columns: date, subreddit, quality score, thread URL, reply posted (y/n), response received (y/n), converted (y/n)
- This manual tracking is the only way to measure ROI since Leadlee has no data export
