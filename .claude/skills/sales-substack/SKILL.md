---
name: sales-substack
description: "Substack platform help — newsletter publishing, paid subscriptions, Notes social features, discovery network, custom domains, podcast hosting, subscriber management, and migration. Use when Substack's 10% fee is eating into revenue, posts aren't ranking on Google, you can't automate because there's no API or Zapier, paid subscribers aren't converting, unsure whether to stay on Substack or migrate to Ghost/Beehiiv, email design is too limited, or you need help setting up paid tiers and founding member pricing. Do NOT use for general newsletter monetization strategy (use /sales-newsletter) or growing your subscriber list (use /sales-audience-growth)."
argument-hint: "[describe what you need help with in Substack]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, publishing, monetization, platform]
github: "https://github.com/substackinc"
---

# Substack Platform Help

## Step 1 — Gather context

If `references/learnings.md` exists, read it first for accumulated platform knowledge.

Ask the user:

1. **What area of Substack do you need help with?**
   - A) Publishing — editor, scheduling, sections, podcast
   - B) Monetization — paid subscriptions, pricing, founding members
   - C) Growth — discovery network, Notes, recommendations, referrals
   - D) Migration — moving to or from Substack
   - E) Automation / integration — connecting Substack to other tools
   - F) Design / branding — custom domain, styling, embeds
   - G) Something else — describe it

2. **What's your current situation?**
   - A) Haven't launched yet — evaluating Substack
   - B) Free newsletter — considering adding paid tier
   - C) Already have paid subscribers — optimizing
   - D) Want to leave Substack — considering alternatives

Skip-ahead rule: if the user's prompt already contains enough context, skip to Step 2.

## Step 2 — Route or answer directly

| If the question is about... | Route to... |
|---|---|
| Newsletter monetization strategy (not Substack-specific) | `/sales-newsletter [question]` |
| Growing subscriber list | `/sales-audience-growth [question]` |
| Email deliverability / SPF / DKIM | `/sales-deliverability [question]` |
| Migrating to Ghost | `/sales-ghost migrate from Substack` |
| Migrating to Beehiiv | `/sales-beehiiv migrate from Substack` |
| Migrating to Buttondown | `/sales-buttondown migrate from Substack` |
| SEO strategy beyond Substack | `/sales-seo [question]` |
| Sponsorship marketplace | `/sales-paved [question]` |
| Referral programs (SparkLoop doesn't support Substack) | Handle here — explain workarounds |

If the question is Substack-specific, continue to Step 3.

## Step 3 — Substack platform reference

**Read `references/platform-guide.md`** for the full platform reference — capabilities, pricing, data model, integration workarounds, code examples.

Answer the user's question using only the relevant section. Don't dump the full reference.

## Step 4 — Actionable guidance

Focus on the user's specific situation using what you know about Substack's strengths and constraints.

**Stay-or-go framework:**
- Stay if: audience is small (<5K), you value simplicity, discovery network matters, you don't need automation or design control
- Migrate if: revenue exceeds ~$1K/mo (10% fee becomes expensive), you need SEO, you need API/automation, you need full branding control
- Hybrid: use Substack for discovery + free content, pipe subscribers to a dedicated ESP for monetization

If you discover a gotcha, workaround, or tip not covered in `references/learnings.md`, append it there.

## Gotchas

> *Best-effort from research — review these, especially items about plan-gated features and integration gotchas that may be outdated.*

1. **10% fee compounds with Stripe** — total take is ~13-16% of gross revenue (10% Substack + 2.9% + $0.30 Stripe + 0.5% Stripe Billing). At $10K/yr revenue, that's ~$1,300-$1,600 in fees.
2. **No official API for publishers** — you cannot programmatically manage posts, subscribers, or analytics. The "Developer API" only queries public profiles by LinkedIn handle.
3. **No native Zapier or Make integration** — automation requires Gmail-based workarounds (parse Substack notification emails).
4. **SEO is structurally weak** — no meta description control, no schema markup, limited URL structure, no sitemap customization. Posts struggle to rank for competitive keywords.
5. **SparkLoop doesn't support Substack** — you cannot use SparkLoop referral programs or paid recommendations.
6. **No email design control** — templates are fixed. You cannot change layout, fonts, or add custom HTML blocks for sponsor placements.
7. **Annual pricing lock-in** — founding member discounts are permanent. Set them carefully because you cannot raise the price for existing founding members.
8. **Custom domain limitations** — you can use a custom domain for your publication, but emails still come from Substack's domain (not your own).

## Related skills

- `/sales-newsletter` — Newsletter monetization strategy — paid subscriptions, sponsorships, ad sales, premium tiers, pricing
- `/sales-audience-growth` — Growing your subscriber list — lead magnets, cross-promotion, referral programs
- `/sales-ghost` — Ghost platform help — publishing, newsletters, memberships, Stripe, API, migration
- `/sales-beehiiv` — Beehiiv platform help — publishing, growth, monetization, ad network, API
- `/sales-buttondown` — Buttondown platform help — newsletter publishing, paid subscriptions, Markdown, API
- `/sales-kit` — Kit platform help — email marketing, automations, Commerce, Creator Recommendations
- `/sales-paved` — Paved — newsletter sponsorship marketplace, Ad Network
- `/sales-sparkloop` — SparkLoop — newsletter referral programs, paid recommendations (note: does NOT support Substack)
- `/sales-deliverability` — Email deliverability — SPF, DKIM, DMARC, inbox placement
- `/sales-seo` — SEO strategy — keyword research, technical audits, content optimization
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Fee analysis
**User says**: "I'm making $2K/month on Substack — should I switch to Ghost or Beehiiv?"
**Skill does**: Calculates current fee impact (~$260-$320/mo lost to fees), compares Ghost (0% fee, self-hosted or $29/mo Ghost(Pro)) and Beehiiv (0% fee, Scale plan $43/mo), weighs migration risk vs savings
**Result**: Clear cost comparison with migration recommendation based on user's technical comfort

### Example 2: Automation workaround
**User says**: "How do I automatically add my Substack subscribers to Kit?"
**Skill does**: Reads platform-guide.md for integration workarounds, explains Gmail notification parsing + Zapier method, notes the Google Workspace requirement, suggests RSS feed alternative for content sync
**Result**: Working automation pipeline despite Substack's lack of native integrations

### Example 3: SEO improvement
**User says**: "My Substack articles get zero Google traffic"
**Skill does**: Explains Substack's structural SEO limitations, recommends custom domain setup, suggests cross-posting strategy (publish on Substack for discovery, canonical version on own blog for SEO), provides meta title optimization tips within Substack's constraints
**Result**: Actionable SEO strategy that works within Substack's limitations

## Troubleshooting

### Paid subscribers not converting
**Symptom**: Free-to-paid conversion rate below 1%
**Cause**: Paid value proposition not differentiated enough, or paywall placed on wrong content
**Solution**: Keep core insights free (shareable for growth). Paywall depth — original research, templates, data, community access. Tease premium content in free posts for 2-4 weeks before launching paid tier. Offer founding member pricing (30-50% off) to early adopters.

### Emails landing in spam or promotions tab
**Symptom**: Subscribers report not receiving posts, or posts end up in Gmail Promotions tab
**Cause**: Substack's shared sending infrastructure, too many links in posts, promotional language in subject lines
**Solution**: Ask subscribers to move your email to Primary tab and add to contacts. Reduce links per post (heavy linking is a spam signal). Avoid "free," "discount," "limited time" in subject lines. Substack handles SPF/DKIM — you cannot configure these yourself.

### Discovery network not driving growth
**Symptom**: Recommendations and Notes aren't bringing new subscribers
**Cause**: Not actively participating in Notes, not using cross-recommendations, publication not categorized well
**Solution**: Post 3-5 Notes per week engaging with other writers. Enable recommendations and actively recommend aligned publications (they often reciprocate). Ensure your publication has clear categories and a compelling About page. Restack popular posts from writers in your niche.
