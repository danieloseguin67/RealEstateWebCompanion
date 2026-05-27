---
name: sales-reletter
description: "Reletter platform help — newsletter search engine indexing 7M+ publications with subscriber data, creator contacts, engagement metrics, keyword monitoring, Python SDK, CLI, MCP server, and REST API. Use when you need to find newsletters to sponsor but don't know where to start, want contact info for newsletter creators for PR or partnerships, need to monitor when your brand gets mentioned in newsletters, looking for newsletters in a specific niche with audience size data, want to build a target list of newsletters for sponsorship outreach, or need to search newsletters programmatically via API or MCP. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or newsletter sponsorship marketplace transactions (use /sales-paved)."
argument-hint: "[describe what you need help with in Reletter — newsletter discovery, contact lookup, brand monitoring, API integration]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, sponsorship, discovery, platform]
---

# Reletter Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

1. **What are you trying to do?**
   - A) Find newsletters to sponsor in a specific niche
   - B) Get contact info for newsletter creators (PR, partnerships, cross-promotion)
   - C) Monitor brand/keyword mentions across newsletters
   - D) Research a specific newsletter's audience size and engagement
   - E) Build and export a target list of newsletters
   - F) Use the API, CLI, or MCP server programmatically
   - G) Something else

2. **What's your current setup?**
   - A) Haven't signed up yet — evaluating Reletter
   - B) On the free trial
   - C) Active subscriber — need help with a specific feature
   - D) Using the API or MCP server

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| Problem domain | Route to |
|---|---|
| Newsletter monetization strategy (pricing tiers, paid subs vs ads, revenue models) | Run: `/sales-newsletter {user's question}` |
| Newsletter sponsorship marketplace (buying/selling placements, programmatic ads) | Run: `/sales-paved {user's question}` |
| Email marketing campaigns, automation, segmentation | Run: `/sales-email-marketing {user's question}` |
| Growing newsletter subscriber list | Run: `/sales-audience-growth {user's question}` |
| Social listening / brand monitoring across social media | Run: `/sales-social-listening {user's question}` |

When routing to another skill, provide the exact command.

## Step 3 — Reletter platform reference

**Read `references/platform-guide.md`** for the full platform reference — search capabilities, contact intelligence, list building, monitoring, pricing tiers, API endpoints, Python SDK, CLI, MCP server, and integration recipes.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

You no longer need the platform guide — focus on the user's specific situation.

**For sponsorship prospecting**: Start with topic search + subscriber filter (5K+ minimum for most sponsors). Export to a list, enrich with contacts, then pitch directly or route through Paved for marketplace-mediated deals.

**For PR/partnerships**: Search by topic, filter by engagement, pull creator contacts. Cross-reference with the newsletter's content to personalize outreach.

**For brand monitoring**: Set up keyword alerts for your brand name, product names, and competitors. Review mentions to identify organic coverage opportunities.

**For developers**: Use the Python SDK or MCP server for bulk operations. The API is best for building newsletter discovery into your own tools or automating list building.

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **API is a $59/mo add-on** — it's not included in any base plan. You need a base subscription ($49+) plus the API add-on.
2. **Light plan is very limited** — 100 searches/mo and 3 lists. If you're doing serious sponsorship prospecting, you'll hit the cap quickly.
3. **No Zapier or Make integration** — automation requires the API. There's no iPaaS connector.
4. **Subscriber numbers are estimates** — Reletter indexes public data. Actual subscriber counts may differ from what newsletters self-report or what Reletter calculates.
5. **MCP server requires API key** — `mcp.reletter.com` needs authentication. Set `RELETTER_API_KEY` before connecting.
6. **Contact emails may be stale** — creator contact info is scraped/indexed, not always verified. Validate before bulk outreach.

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy (paid subscriptions, sponsorships, pricing, premium tiers)
- `/sales-paved` — Paved platform help (newsletter sponsorship marketplace, Ad Network, Booker, Radar)
- `/sales-sparkloop` — SparkLoop platform help (referral programs, paid recommendations, partner programs)
- `/sales-audience-growth` — Growing your subscriber list
- `/sales-email-marketing` — Email marketing strategy (campaigns, automation, segmentation)
- `/sales-media-relations` — Media relations and PR outreach
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Finding newsletters to sponsor
**User says**: "I want to find AI newsletters with 10K+ subscribers to sponsor"
**Skill does**: Guides through Reletter topic search with subscriber filters, explains how to evaluate engagement metrics, recommends building a shortlist of 10-15 newsletters, then exporting with contacts for direct outreach or routing to Paved for marketplace deals
**Result**: User has a curated list of target newsletters with contact info and a sponsorship outreach plan

### Example 2: API integration for newsletter discovery
**User says**: "How do I use the Reletter API to search for fintech newsletters and pull their contact info?"
**Skill does**: Shows Python SDK setup (`pip install reletter`), demonstrates `search.publications()` with topic and subscriber filters, shows `contacts.get()` for pulling creator emails, explains pagination with `iter_publications()`, and covers error handling
**Result**: User has working Python code to programmatically discover and contact newsletter creators

### Example 3: Brand monitoring across newsletters
**User says**: "I want to know every time my product gets mentioned in a newsletter"
**Skill does**: Walks through Reletter's keyword alert setup, explains monitoring limits per plan tier, recommends setting alerts for brand name + product name + common misspellings, suggests reviewing mentions weekly for organic PR opportunities
**Result**: User has newsletter brand monitoring configured with alerts

## Troubleshooting

### Search returns too few results
**Symptom**: Searching for a niche topic returns only a handful of newsletters
**Cause**: Search query too specific, or niche genuinely underserved
**Solution**: Broaden the search terms. Try related keywords. Use AI Search for semantic matching instead of exact keyword search. Check if the platform indexes the newsletter platform your targets use.

### Exported contacts are missing emails
**Symptom**: Exported a list but many entries have no contact email
**Cause**: Not all newsletter creators have publicly available email addresses
**Solution**: Check the newsletter's publication page on Reletter for social media links as alternative contact methods. For high-priority targets, look up the creator on LinkedIn or their personal website.

### API returning 429 rate limit errors
**Symptom**: Python SDK raises `RateLimitError` during bulk operations
**Cause**: Exceeded the 5,000 requests/month API quota or hit per-minute rate limits
**Solution**: The SDK has automatic retries with exponential backoff (default 2 retries). For bulk operations, use `iter_publications()` which handles pagination automatically. Monitor usage with `client.account.quota()`. If consistently hitting limits, contact Reletter about higher-volume API access.
