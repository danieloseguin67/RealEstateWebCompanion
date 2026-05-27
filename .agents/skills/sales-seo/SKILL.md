---
name: sales-seo
description: "SEO strategy — tool-agnostic framework for keyword research, technical audits, link building, content optimization, local SEO, schema markup, and AI visibility. Coordinates Semrush, Ahrefs, Moz, SE Ranking, Yoast, Rank Math, and free tools into a prioritized workflow. Use when organic traffic is flat or declining and you don't know where to start, choosing between Semrush and Ahrefs and cheaper alternatives for keyword research, running your first technical SEO audit on a new site, building backlinks as a solopreneur without a budget, WordPress SEO plugin selection between Yoast and Rank Math and AIOSEO, local SEO setup for a small business with Google Business Profile, or figuring out which SEO tasks to prioritize with limited time. Do NOT use for Semrush-specific features or API (use /sales-semrush). Do NOT use for Yoast plugin configuration (use /sales-yoast)."
argument-hint: "[describe your SEO question or situation]"
license: MIT
version: 1.0.0
tags: [sales, seo, marketing, strategy]
---

# SEO Strategy

Helps with SEO decisions that span tools and sub-domains — which tool to pick, which tasks to prioritize, and how to build an SEO workflow as a solopreneur or small team.

## Step 1 — Gather context

If `references/learnings.md` exists, read it first.

Ask the user:

1. **What's your SEO situation?**
   - A) Starting from zero — new site, no SEO yet
   - B) Organic traffic is flat or declining — need to diagnose
   - C) Choosing SEO tools — need help picking
   - D) Specific sub-domain — keyword research, technical audit, link building, local SEO, schema, or content optimization
   - E) WordPress SEO plugin selection
   - F) Something else — describe it

2. **What kind of site?**
   - A) SaaS / web app
   - B) Content site / blog
   - C) Local business
   - D) E-commerce (Shopify, WooCommerce)
   - E) Portfolio / landing page

3. **Monthly SEO budget?**
   - A) $0 — free tools only
   - B) Under $50/mo
   - C) $50-150/mo
   - D) $150+/mo

**If the user's prompt already provides context, skip to the relevant step.**

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Semrush features, API, MCP, or configuration | `/sales-semrush {question}` |
| Yoast plugin setup, scores, schema, or REST API | `/sales-yoast {question}` |
| AI visibility / LLM citation tracking | `/sales-ai-visibility {question}` |
| Launch directory backlinks | `/sales-launch-directory {question}` |
| Directory submission services | `/sales-directory-submission {question}` |

For cross-tool SEO strategy, continue to Step 3.

## Step 3 — SEO reference

**Read `references/platforms.md`** for tool comparison tables, pricing, and "when to pick" guidance by budget tier.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

**SEO priority framework (for solopreneurs with limited time):**

1. **Week 1-2: Foundation** — Google Search Console setup, fix crawl errors, submit sitemap, install SEO plugin (Rank Math free or Yoast free), set up rank tracking for 10-20 target keywords
2. **Week 3-4: Keyword research** — Find 20-30 low-competition keywords (KD < 20, volume > 100). Use free tools first (GSC, Ubersuggest free tier, AnswerThePublic). Upgrade to paid only if you need competitor data.
3. **Month 2: Content** — Publish 4-8 pages targeting your keyword list. Focus on search intent match over keyword density. One well-researched 2000-word article beats five thin posts.
4. **Month 3: Technical** — Run a site audit (Semrush, Ahrefs Webmaster Tools, or Screaming Frog free). Fix: broken links, redirect chains, missing meta descriptions, slow pages (Core Web Vitals).
5. **Ongoing: Links** — Build links through directory submissions, guest posts, and HARO/Connectively responses. Quality over quantity — 5 relevant DA 40+ links beat 50 spammy ones.
6. **Monthly: Monitor** — Check GSC for position changes, crawl errors, and index coverage. Adjust keyword targets based on what's moving.

**WordPress plugin decision:**
- **Rank Math Free** — best value: 5 focus keywords, redirects, schema, GSC integration, all free
- **Yoast Premium** — best for beginners who want guided setup and don't mind paying per site
- **AIOSEO** — best for agencies: 100 sites on Elite plan ($299.50/yr)
- **SEOPress** — developer favorite: clean code, no upsells, $49/yr unlimited sites

**Tool budget tiers:**
- **$0/mo**: Google Search Console + Rank Math + Ubersuggest free + Ahrefs Webmaster Tools
- **$30-50/mo**: Mangools ($29/mo) or Ubersuggest ($29/mo) — good for keyword research + rank tracking
- **$50-100/mo**: SE Ranking ($55/mo) — best value all-in-one with AI features
- **$130-200/mo**: Ahrefs ($129/mo) for backlinks or Semrush ($140/mo) for all-in-one + content + API

If you discover something not covered, append to `references/learnings.md`.

## Gotchas

> *Best-effort from research — review these, especially pricing which changes frequently.*

- **Don't buy tools before you have content.** SEO tools show you what to fix, but you need pages to fix first. Start with free tools until you have 20+ indexed pages.
- **Keyword difficulty is relative to YOUR domain.** A KD of 20 is "easy" for an established site but still hard for a brand-new domain with DA 0. New sites should target KD < 10.
- **Traffic estimates from tools are estimates.** Semrush, Ahrefs, and SE Ranking all model traffic — they can be 50-200% off for niche sites. Use them for relative comparison, not absolute numbers.
- **AI search is changing SEO.** Zero-click answers and LLM citations mean traditional ranking isn't the only game. Track AI visibility alongside traditional rankings. Add `llms.txt` to your root directory.
- **Free trials auto-renew.** Both Semrush and Ahrefs charge immediately after trial ends. Set a calendar reminder.

## Related skills

- `/sales-semrush` — Semrush platform help (keyword research, site audits, rank tracking, API, MCP). Install:
  `npx skills add sales-skills/sales --skill sales-semrush -a claude-code`
- `/sales-yoast` — Yoast SEO plugin help (WordPress/Shopify, schema, readability scores). Install:
  `npx skills add sales-skills/sales --skill sales-yoast -a claude-code`
- `/sales-ai-visibility` — AI visibility monitoring (LLM citations, AI search presence). Install:
  `npx skills add sales-skills/sales --skill sales-ai-visibility -a claude-code`
- `/sales-launch-directory` — Launch directory backlink strategy. Install:
  `npx skills add sales-skills/sales --skill sales-launch-directory -a claude-code`
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install:
  `npx skills add sales-skills/sales --skill sales-do -a claude-code`

## Examples

### Example 1: New SaaS founder starting SEO from zero
**User says**: "I just launched my SaaS app. I have zero organic traffic. Where do I start with SEO?"
**Skill does**:
1. Recommends the priority framework: GSC setup → SEO plugin → keyword research → content → technical audit → links
2. Suggests free tool stack to start: Google Search Console + Rank Math + Ubersuggest free tier
3. Advises finding 20-30 low-KD keywords and publishing content before investing in paid tools
4. Notes that backlinks from launch directories are a quick win — routes to `/sales-launch-directory`
**Result**: Prioritized action plan with free tools, no overwhelm

### Example 2: Choosing between Semrush and cheaper alternatives
**User says**: "Semrush is $140/mo and that's steep for me. What are good cheaper alternatives?"
**Skill does**:
1. Reads platforms reference for budget-tier comparison
2. Recommends by budget: Mangools ($29/mo) for basic keyword research, SE Ranking ($55/mo) for best-value all-in-one, Ahrefs ($129/mo) if backlinks are the priority
3. Notes Ahrefs Webmaster Tools is free for your own site (site audit + backlink data)
4. Suggests starting with GSC + Ubersuggest free and upgrading only when you hit limits
**Result**: Budget-matched tool recommendation with free alternatives

### Example 3: WordPress plugin selection
**User says**: "Should I use Yoast or Rank Math? I'm building a WooCommerce store."
**Skill does**:
1. Reads platforms reference for WordPress plugin comparison
2. Compares: Rank Math free gives 5 focus keywords, redirects, schema, GSC integration — all free. Yoast charges for redirects and limits to 1 keyword on free.
3. For WooCommerce: Rank Math has WooCommerce SEO integration on free tier; Yoast requires the $79/yr WooCommerce SEO add-on
4. Notes AIOSEO is also strong for WooCommerce with better product schema handling
5. Recommends Rank Math Free for budget-conscious WooCommerce stores
**Result**: Clear plugin recommendation with WooCommerce-specific reasoning

## Troubleshooting

### Organic traffic dropped suddenly
**Symptom**: Google Search Console shows a sharp traffic decline over 1-2 weeks
**Cause**: Could be algorithm update, manual penalty, technical issue (robots.txt blocking, noindex tags), or seasonal drop.
**Solution**: Check GSC for manual actions first. Then check Index Coverage for new errors. Compare the timing to known Google algorithm updates (search "Google algorithm update [month] [year]"). If it's a specific page group, check for accidental noindex tags or canonical URL changes. If it's site-wide, run a technical audit.

### Site not getting indexed despite submitting sitemap
**Symptom**: Pages submitted to Google Search Console but showing as "Discovered - currently not indexed" or "Crawled - currently not indexed"
**Cause**: Google is choosing not to index low-quality or thin pages. New domains with little authority take longer. Duplicate content or canonical issues can prevent indexing.
**Solution**: Focus on publishing unique, in-depth content (1500+ words). Build a few quality backlinks to signal authority. Check for duplicate content issues. Ensure pages are linked from your navigation or other indexed pages. Be patient — new sites can take 2-4 weeks per page.

### Spending money on tools but traffic isn't growing
**Symptom**: Paying $100+/mo for SEO tools, running reports, but organic traffic stays flat
**Cause**: Tools show data but don't create results. Common trap: running audits and researching keywords without publishing content or building links. Analysis paralysis.
**Solution**: For every hour spent in SEO tools, spend 3 hours creating content or building links. Set a rule: no new tool subscriptions until you've published 20 pages targeting researched keywords. Track output (pages published, links built) alongside input (tool reports run).
