# SocListener Platform Reference

## Overview

SocListener is a Reddit lead generation tool that uses AI to match your product description against Reddit thread context — not just keywords. It monitors subreddits, identifies threads where people describe problems your product solves, and generates personalized comment and DM drafts. Target audience: solopreneurs, indie hackers, and small teams doing Reddit-based lead gen.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Lead discovery** | Scans Reddit for threads matching your product description using AI context analysis (not just keyword matching) | UI-only — no API, no webhooks |
| **AI comment generation** | Generates personalized comment drafts with your product link based on thread context | UI-only — click to generate, edit, then post manually |
| **DM outreach** | Generates personalized DM drafts for direct Reddit user outreach | UI-only — must send DMs manually through Reddit |
| **Product configuration** | Describe your product/business so AI can match relevant threads | UI-only |

**No public API.** No REST API, no webhooks, no Zapier/Make/n8n triggers or actions, no MCP server. All interaction is through the web UI at app.sociallisteningtool.com. Data cannot be exported programmatically.

## Pricing, limits & plan gates

Exact pricing is not publicly documented — SocListener uses a credit-based model. What is known:

| Feature | Free | Paid (details behind signup wall) |
|---|---|---|
| **Signup** | Free, no credit card required | Credit purchase or plan upgrade |
| **Searches** | Limited credits | More credits per plan |
| **AI comments** | Limited | More per plan |
| **Products** | Unknown limit | Unknown limit |

**Key limits:**
- Credit-based consumption — each search and comment generation consumes credits
- When credits run out, you must purchase additional credits or upgrade
- No public pricing page — you see plan options after signing up

## Integrations

**None.** SocListener has no native integrations, no Zapier/Make connectors, no webhooks, no API.

**Workarounds:**
- Copy lead URLs manually into your CRM
- Manually track leads in a spreadsheet (Reddit URL, subreddit, reply status, outcome)
- Screenshot AI-generated comments for team review before posting

## Data model

SocListener's data model is simple — no API, so these are conceptual objects from the UI:

**Product** (your business that SocListener monitors for)
<!-- Constructed from UI — verify against live product -->
```json
{
  "business_description": "AI-powered invoicing tool for freelancers",
  "status": "active"
}
```

**Lead** (a Reddit thread SocListener found)
<!-- Constructed from UI — verify against live product -->
```json
{
  "thread_title": "Any recommendations for invoicing tools?",
  "subreddit": "r/freelance",
  "reddit_url": "https://reddit.com/r/freelance/comments/...",
  "ai_comment_draft": "I've been using [Product] for this exact use case...",
  "discovered_at": "2026-05-08T10:00:00Z"
}
```

## Quick-start recipes

### Recipe 1: Set up your first product and find leads

**Goal:** Get SocListener finding Reddit leads within 5 minutes.

**Steps:**
1. Sign up at sociallisteningtool.com (free, no credit card)
2. Describe your business — focus on the problem you solve, not features
3. Click "Search" and let the AI scan Reddit
4. Review returned threads — look for ones where someone is actively asking for help
5. Generate a personalized comment for the most relevant thread
6. **Edit the draft heavily** — add thread-specific context
7. Post manually through Reddit

**Tips:**
- Write your business description in customer language: "helps freelancers send invoices faster" beats "automated invoicing SaaS platform"
- Focus on threads where someone asks a question — not threads where someone is venting or already solved their problem
- Read the entire thread before commenting — your reply should add value to the conversation

### Recipe 2: Safe Reddit engagement workflow

**Goal:** Use SocListener without risking your Reddit account.

**Steps:**
1. **Before using SocListener:** Build Reddit karma for 2-3 weeks through genuine participation
2. Find leads in SocListener → filter mentally for genuine buying intent
3. Generate AI comment → **never post as-is**
4. Edit: remove generic phrases, reference specific details from the thread, make it genuinely helpful
5. Post through Reddit's UI (not through any automation)
6. Limit: 2-3 product-mentioning replies per day max, spaced 30+ minutes apart
7. For every promotional comment, make 10 genuinely helpful non-promotional comments

**Key safety rules:**
- New Reddit accounts posting product links = instant flag
- Same link posted across multiple subreddits = spam detection
- Generic AI-sounding replies = community downvotes and mod removal
- 89% of startup marketing accounts get banned within 30 days — the 10:1 ratio is survival, not optional

### Recipe 3: Manual CRM tracking (no API workaround)

**Goal:** Track SocListener leads in your CRM since there's no integration.

**Steps:**
1. Create a simple spreadsheet or CRM view with columns: Date, Subreddit, Thread URL, Intent Level (high/medium/low), Reply Posted (y/n), Response Received (y/n), Converted (y/n)
2. When SocListener surfaces a lead, log it immediately
3. After posting a reply, update the row
4. Review weekly: which subreddits produce the best leads? What reply style gets responses?
5. Use this data to refine your SocListener product description and focus your credits

## Integration patterns

Since SocListener has no API or webhooks, all integration is manual:

**CRM sync:** Manual copy-paste of Reddit URLs and lead details into your CRM.

**Team workflow:** Share the SocListener login or screenshot leads for team review. Assign subreddits to team members to avoid duplicate replies.

**Reporting:** Manual tracking in spreadsheets. No data export, no analytics API.
