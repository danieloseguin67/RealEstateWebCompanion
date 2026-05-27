# ReplyDaddy Platform Reference

## Overview

ReplyDaddy (replydaddy.com) is a Reddit marketing co-pilot that uses AI (Claude Sonnet 4) to discover relevant Reddit posts and generate authentic responses. Differentiated by manual-control-first design — it never requests Reddit credentials or posts on your behalf. Available as both a monthly subscription and a lifetime deal with BYOK (Bring Your Own Key) AI model.

## Capabilities & automation surface

| Capability | Access |
|---|---|
| AI post discovery (keyword + brand matching) | UI-only |
| Multi-factor relevance scoring (70% relevance weight) | UI-only |
| Response generation (Claude Sonnet 4) | UI-only |
| Subreddit rule compliance checking | UI-only |
| Post eligibility verification | UI-only |
| Persona-based reply customization | UI-only |
| 90-day marketing plan generator | UI-only |
| Daily engagement habit builder | UI-only |
| Marketing Momentum Tracker | UI-only |
| Multi-project support | UI-only |

**No public API.** No webhooks. No Zapier/Make/MCP integration. No programmatic access. All interaction happens through the web dashboard.

**Workaround for automation:** None documented. If you need CRM integration or automated workflows, consider alternatives with API access (Redreach webhooks, CatchIntent CRM push, Buska API/MCP, ForumScout API Direct).

## Pricing, limits & plan gates

### Subscription Plans

| Feature | Free ($0) | Starter ($99/mo) | Growth ($299/mo) | Scale ($799/mo) |
|---|---|---|---|---|
| Specific feature limits | Unknown | Unknown | Unknown | Unknown |

<!-- Per-plan feature limits are not publicly documented as of research date. The pricing page lists only plan names and prices without per-tier breakdowns. -->

### Lifetime Deal (BYOK)

- **Base cost:** ~$59 one-time (via RocketHub)
- **BYOK model:** User provides own Anthropic or OpenAI API key
- **Additional cost:** $10-50+/month in API token fees depending on usage
- **Per-action cost:** ~$0.01-0.05 per reply draft, plus scanning costs

**Cost comparison at typical usage (30 replies + 10 scans/day):**

| Pricing path | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| LTD + BYOK (~$35/mo API) | $94 | $164 | $269 |
| Starter subscription | $99 | $297 | $594 |
| Reppit AI (flat rate) | $29 | $87 | $174 |
| Subtle AI (cheapest tier) | $20 | $60 | $120 |

The LTD is cost-effective only if monthly API costs stay under ~$40. At higher usage, the LTD + BYOK total can exceed flat-rate competitors.

### Key limits to watch

- **BYOK costs are proportional to usage.** More keywords, more scans, more reply drafts = higher API bills. There's no usage cap — but there's no cost cap either.
- **No free trial mentioned for subscription plans.** The LTD is effectively a trial path.
- **Solo developer risk.** LTD products from solo developers carry abandonment risk — evaluate accordingly.

## Integrations

**None.** ReplyDaddy has no native CRM connectors, no Zapier/Make triggers, no API, no export functionality.

**Data flow:** One-directional — Reddit posts flow into ReplyDaddy's dashboard for review. You manually copy responses and post them on Reddit yourself.

## Data model

No API means no programmatic data model. The conceptual objects:

```json
// Persona (UI object)
{
  "name": "SaaS Founder",
  "background": "Built 3 SaaS products, 10 years in B2B",
  "expertise": ["project management", "remote work", "productivity"],
  "tone": "helpful, conversational, no hard sells"
}
```
<!-- Constructed from UI descriptions — no API exists to verify -->

```json
// Discovered Post (UI object)
{
  "title": "Looking for a simpler project management tool",
  "subreddit": "r/SaaS",
  "url": "https://reddit.com/r/SaaS/...",
  "category": "hot",
  "relevance_score": 0.85,
  "matched_keywords": ["project management tool"],
  "eligible_to_reply": true,
  "rule_compliance": "passes",
  "ai_response_draft": "I switched from Asana to [Product] last year because..."
}
```
<!-- Constructed from UI descriptions — no API exists to verify -->

```json
// Project (UI object)
{
  "name": "My SaaS Product",
  "website_url": "https://myproduct.com",
  "brand_knowledge": "Auto-discovered from website scan",
  "keywords": ["project management alternative", "Asana competitor"],
  "target_subreddits": ["r/SaaS", "r/startups", "r/Entrepreneur"]
}
```
<!-- Constructed from UI descriptions — no API exists to verify -->

## Quick-start recipes

### Recipe 1: First project setup

**Goal:** Start discovering Reddit leads for your product.

**Steps:**
1. Sign up at replydaddy.com (or activate LTD via RocketHub)
2. If BYOK: add your Anthropic or OpenAI API key in settings
3. Create a project — enter your website URL. ReplyDaddy's AI scans it to build brand knowledge automatically
4. Configure a persona — define background, expertise, and tone for reply generation
5. Set up keywords:
   - Competitor names: "Asana alternative", "better than Monday"
   - Problem phrases: "looking for project management", "need help organizing"
   - Pain language: "frustrated with [competitor]", "switching from [competitor]"
6. Select target subreddits where your ICP posts (niche communities, not megasubs)
7. Wait for AI to scan hot, rising, and new posts
8. Review discovered posts — check relevance score, read the AI response draft
9. Edit the response to add genuine value, then manually post on Reddit

**Gotchas:**
- Start with 3-5 keywords and expand based on quality of discovered posts
- The AI auto-discovers brand knowledge from your website — review it for accuracy
- Higher relevance scores don't mean buying intent — you still need to filter manually

### Recipe 2: Optimizing persona for authentic responses

**Goal:** Get AI responses that sound like a real person, not a marketer.

**Steps:**
1. Open your persona settings
2. Write background as if describing a real community member: "Full-stack developer who's tried 6 project management tools over 5 years"
3. Set expertise to specific domains, not broad categories: "remote team coordination" not "business"
4. Configure tone: "casual but knowledgeable, shares personal experience, never uses marketing language"
5. Generate a test response and compare against your own writing style
6. Iterate — the persona directly controls response quality

**Gotchas:**
- A well-configured persona is the single biggest lever for response quality
- Don't describe your persona as a marketer — the AI will generate marketing copy
- Review and edit every draft before posting — AI responses need human polish

### Recipe 3: Manual CRM logging workflow (no integration exists)

**Goal:** Track Reddit leads in your CRM despite no export or API.

**Steps:**
1. After posting a ReplyDaddy-suggested response on Reddit, copy the thread URL
2. Create a new contact/lead in your CRM:
   - Source: "Reddit - ReplyDaddy"
   - Notes: subreddit, thread title, your response summary, their original question
3. Add UTM parameters to any product links you share: `?utm_source=reddit&utm_medium=comment&utm_campaign=replydaddy`
4. Set a follow-up reminder (3-7 days) to check:
   - Did they reply to your comment?
   - Did they DM you?
   - Did they visit your product (check UTM in analytics)?
5. Update CRM status: engaged / interested / converted / no response

**Gotchas:**
- This is manual and doesn't scale beyond ~10-15 leads/day
- If CRM integration is critical for your workflow, consider tools with API access: Redreach (webhooks), CatchIntent (CRM push), Buska (REST API + MCP)
- Use a spreadsheet as a lightweight alternative if you don't have a CRM

## Integration patterns

### No native integration exists

ReplyDaddy is fully isolated — no data flows out programmatically. The only integration pattern is manual:

1. **Discover** leads in ReplyDaddy dashboard
2. **Review** relevance score and AI response draft
3. **Edit** response to add genuine value and thread-specific context
4. **Post** manually on Reddit (copy-paste)
5. **Log** the engagement in your CRM manually
6. **Track** results via UTM parameters in your product links

### When to switch tools for integration

If your workflow requires any of these, ReplyDaddy is not the right tool:
- Automated lead export to CRM
- Webhook notifications for new leads
- Programmatic access to discovered posts
- Pipeline integration with outbound sequences
- MCP server for AI agent workflows

Consider: Buska (REST API + MCP), Redreach (webhooks), CatchIntent (CRM push + MCP), ForumScout (API Direct)
