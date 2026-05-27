# Subtle AI Platform Reference

## Overview

Subtle AI (usesubtle.com) is a Reddit lead generation tool designed for SaaS founders. It automatically discovers relevant Reddit posts matching your keywords and subreddits, generates contextual AI responses, and provides a browser extension for engagement — with mandatory human review before posting.

## Capabilities & automation surface

| Capability | Access |
|---|---|
| Post discovery (keyword + subreddit scanning) | UI-only |
| AI response generation | UI-only |
| Campaign management (create, configure, pause) | UI-only |
| Browser extension (view posts, draft responses) | Browser extension |
| Analytics (responses generated, posts found) | UI-only |
| Team management (agency plans only) | UI-only |

**No public API.** No webhooks. No Zapier/Make/MCP integration. No programmatic access. All interaction happens through the web dashboard or browser extension.

**Workaround for automation:** None documented. If you need CRM integration or automated workflows, consider alternatives with API access (Redreach, RedShip, ForumScout, Syften, CatchIntent).

## Pricing, limits & plan gates

### Individual Plans

| Feature | Subtle AI ($20/mo) | Plus ($50/mo) | Pro ($120/mo) |
|---|---|---|---|
| Active campaigns | 1 | 3 | 10 |
| Keywords per campaign | 10 | 15 | 20 |
| Subreddits per campaign | 10 | 15 | 20 |
| Daily posts discovered | 70 | 140 | 250 |
| Monthly AI responses | 300 | 1,000 | 3,000 |
| Browser extension | Yes | Yes | Yes |
| Annual pricing | $200/yr | $500/yr | $1,200/yr |

Annual billing = 2 months free (pay for 10, get 12).

### Agency Plans

| Feature | Starter ($250/mo) | Growth ($750/mo) | Enterprise ($1,000/mo) |
|---|---|---|---|
| Team members | 3 | 10 | 30 |
| Active campaigns | 25 | 75 | 100 |
| Keywords per campaign | 20 | 20 | 20 |
| Subreddits per campaign | 20 | 20 | 20 |
| Daily golden posts/campaign | 50 | 50 | 50 |
| Daily total posts/campaign | 200 | 200 | 200 |
| Monthly AI generations | 10,000 | 30,000 | 50,000 |
| Team permissions | No | Yes | Yes |
| Dedicated account manager | No | No | Yes |
| Annual pricing | $2,500/yr | $7,500/yr | $10,000/yr |

### Key limits to watch

- **Response quota is the real gate.** Daily post discovery limits are generous, but monthly response generation (300/1,000/3,000) is what you'll hit first.
- **No rollover.** Unused responses don't carry over month-to-month.
- **7-day free trial.** Full access, no credit card required. Good for validating lead quality.

## Integrations

**None.** Subtle has no native CRM connectors, no Zapier/Make triggers, no API, no export functionality documented. Leads and responses stay within the Subtle ecosystem.

**Data flow:** One-directional — Reddit posts flow into Subtle's dashboard for review. You manually copy responses and post them on Reddit yourself.

## Data model

No API means no programmatic data model. The conceptual objects:

```json
// Campaign (UI object)
{
  "name": "My SaaS Product",
  "description": "Project management tool for remote teams...",
  "keywords": ["project management alternative", "Asana competitor", "team collaboration tool"],
  "subreddits": ["r/SaaS", "r/startups", "r/Entrepreneur", "r/projectmanagement"],
  "status": "active"
}
```
<!-- Constructed from UI descriptions — no API exists to verify -->

```json
// Discovered Post (UI object)
{
  "title": "Looking for a simpler project management tool",
  "subreddit": "r/SaaS",
  "url": "https://reddit.com/r/SaaS/...",
  "matched_keywords": ["project management tool"],
  "ai_response": "I've been using [Product] for exactly this...",
  "status": "pending_review"
}
```
<!-- Constructed from UI descriptions — no API exists to verify -->

## Quick-start recipes

### Recipe 1: First campaign setup (SaaS founder)

**Goal:** Start discovering Reddit leads for your SaaS product.

**Steps:**
1. Sign up at usesubtle.com (7-day free trial, no CC)
2. Create a campaign — enter your product URL and a description focused on problems you solve
3. Add 5-8 buying-intent keywords:
   - Competitor names: "Asana alternative", "better than Monday"
   - Problem phrases: "looking for project management", "need help organizing team"
   - Pain language: "frustrated with [competitor]", "switching from [competitor]"
4. Select 5-8 targeted subreddits where your ICP posts (not giant subreddits like r/AskReddit)
5. Wait 24 hours for initial post discovery
6. Review discovered posts — for each one, read the AI response suggestion
7. Edit the response to be genuinely helpful (add thread-specific context), then post manually via Reddit or browser extension

**Gotchas:**
- Start with fewer keywords and expand based on results
- Responses require your approval — budget 15-30 minutes daily for review
- Don't post Subtle's AI response verbatim — always personalize

### Recipe 2: Optimizing keyword targeting (reducing noise)

**Goal:** Get fewer, higher-quality post matches.

**Steps:**
1. Review your last 20 discovered posts — categorize as "would engage" vs "irrelevant"
2. Identify which keywords produced irrelevant results
3. Replace broad keywords with intent-rich phrases:
   - Bad: "CRM" → Good: "looking for a CRM", "CRM for small team"
   - Bad: "email marketing" → Good: "switching email tools", "Mailchimp alternative"
4. Remove subreddits that consistently produce off-topic matches
5. Add competitor names and "vs" searches: "HubSpot vs", "alternative to Notion"
6. Monitor for 3-5 days and repeat the audit

**Gotchas:**
- Competitor name keywords often produce the highest-intent results
- Question-format keywords ("how do I...", "what's the best...") signal active problem-solving
- Subreddits with <10K members often have higher-intent posts than million-member defaults

### Recipe 3: Agency multi-client management

**Goal:** Manage Reddit campaigns for multiple clients from one dashboard.

**Steps:**
1. Upgrade to Agency Starter ($250/mo) or higher
2. Create separate campaigns per client — each gets its own keywords, subreddits, and product context
3. Assign team members to specific client campaigns
4. Set up a daily review cadence: review AI responses per client, approve/edit/skip
5. Track per-campaign metrics: responses generated, posts discovered, engagement quality
6. Report monthly: "X posts discovered, Y responses sent, Z conversations started"

**Gotchas:**
- Agency Starter has no team permissions — all 3 members see all campaigns
- Growth plan ($750/mo) adds permissions for client-specific access
- 4-hour support SLA available on all agency plans

## Integration patterns

### No native integration exists

Since Subtle has no API, webhooks, or iPaaS support, the only integration pattern is manual:

1. **Discover** leads in Subtle dashboard
2. **Engage** on Reddit manually (copy response, edit, post)
3. **Log** the conversation in your CRM manually
4. **Track** results via UTM parameters in your product links

### Workaround: Manual CRM logging

After posting a Subtle-suggested response on Reddit:
1. Copy the Reddit thread URL
2. Create a lead/contact in your CRM with source = "Reddit - Subtle AI"
3. Add notes: subreddit, thread title, your response, their reply
4. Set a follow-up reminder to check if they DM'd or visited your product

This is manual and doesn't scale — if CRM integration is critical, consider tools with API access (Redreach webhooks, CatchIntent CRM push, Buska API).
