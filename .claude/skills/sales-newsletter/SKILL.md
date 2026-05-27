---
name: sales-newsletter
description: "Newsletter monetization — paid subscriptions, sponsorships, ad sales, paid recommendations, premium tiers, pricing strategy, subscriber-to-revenue conversion. Use when your newsletter isn't generating revenue, paid subscribers aren't converting, can't find sponsors, unsure how to price a premium tier, or torn between ad-supported and subscription models. Do NOT use for sending email campaigns (use /sales-email-marketing), growing your subscriber list (use /sales-audience-growth), or platform-specific setup (use /sales-kit, /sales-mailchimp, etc.)."
argument-hint: "[describe your newsletter monetization question or goal]"
license: MIT
version: 1.0.0
tags: [sales, newsletter, monetization, sponsorship]
---
# Newsletter Monetization

Help the user monetize their newsletter — paid subscriptions, sponsorships, ad sales, paid recommendations, premium content tiers, and pricing strategy. This skill is tool-agnostic but includes platform-specific guidance.

## Step 1 — Gather context


If `references/learnings.md` exists, read it first for accumulated knowledge.

Ask the user:

1. **What's your current newsletter situation?**
   - A) Haven't launched yet — planning monetization from the start
   - B) Free newsletter — ready to add a revenue stream
   - C) Already monetizing — want to optimize or add revenue streams
   - D) Considering switching monetization models

2. **What monetization model interests you?**
   - A) Paid subscriptions (readers pay for access)
   - B) Sponsorships / ads (brands pay for placement)
   - C) Paid recommendations (earn per subscriber referred)
   - D) Hybrid (mix of the above)
   - E) Not sure — help me decide

3. **Newsletter metrics** (if applicable):
   - Subscriber count (approximate)
   - Open rate
   - Niche / topic
   - Current revenue (if any)

## Step 2 — Strategy and approach

### Monetization models compared

| Model | Best for | Revenue potential | Complexity | Min. subscribers |
|---|---|---|---|---|
| **Paid subscriptions** | Niche expertise, exclusive insights | $5–$50/mo per subscriber | Medium | 500+ engaged |
| **Sponsorships** | Broad or niche audience with high engagement | $25–$100 CPM (cost per 1K opens) | High (sales) | 5,000+ |
| **Paid recommendations** | Any growing newsletter | $1–$5 per subscriber acquired | Low | 1,000+ |
| **Affiliate links** | Product-adjacent content | 5–30% commission per sale | Low | Any size |
| **Premium content** | Freemium — free tier + paid extras | Varies | Medium | 1,000+ |

### Paid subscription strategy

**Pricing tiers**:
- **Free tier**: Keep 80–90% of content free to maintain growth
- **Paid tier**: $5–$15/mo or $50–$150/yr for exclusive content
- **Premium/founding**: $20–$50/mo for community access, direct access, extras

**What to put behind the paywall**:
- Deep analysis, data, original research
- Actionable templates, tools, frameworks
- Community access (Discord, Slack, Q&A)
- Early access to content
- Archive access

**What NOT to paywall**:
- Your core value proposition (the reason people subscribe)
- Timely news or commentary (needs to be shareable)
- Content that drives word-of-mouth growth

**Conversion benchmarks**:
- Free → paid conversion: 5–10% is excellent, 2–5% is typical
- Annual vs monthly: offer 20% discount for annual to reduce churn
- Churn rate: 5–8% monthly is typical for newsletters

### Sponsorship strategy

**Pricing your sponsorships**:
- **CPM model**: $25–$100 per 1,000 opens (niche = higher CPM)
- **Flat rate**: Calculate based on list size × open rate × CPM
- **Example**: 10,000 subscribers × 45% open rate = 4,500 opens → at $50 CPM = $225/issue

**Sponsorship formats**:
- **Primary sponsor**: Full section, highest rate
- **Classified/secondary**: Short blurb, lower rate
- **Native content**: Sponsored deep-dive, premium rate
- **Dedicated send**: Entire email from sponsor (use sparingly)

**Finding sponsors**:
- Direct outreach to brands your audience uses
- Sponsorship marketplaces: Paved (3,000+ publishers, Marketplace + Ad Network), OhMyNewst (400+ newsletters, Spain & LATAM — `/sales-ohmynewst`), Swapstack, Letterhead
- Contextual ad networks: BuySellAds (200+ publishers, managed sales, Carbon Ads for dev/design — `/sales-buysellads`)
- Sponsorship operations: Sponsy (ad inventory calendar, sponsor CRM, customer portals, automated reporting — `/sales-sponsy`)
- Sponsor intelligence: SponsorGap (38K+ brand database with verified contacts, spend trends, competitor monitoring — `/sales-sponsorgap`)
- Sponsor lead lists: SponsorLeads (curated Airtable database of 4,318+ companies actively sponsoring newsletters with decision-maker contacts — `/sales-sponsorleads`)
- Sponsor intelligence with ad creative: Who Sponsors Stuff (8,000+ sponsors across 500+ newsletters, ad screenshots, decision-maker contacts — `/sales-whosponsorsstuff`)
- Sponsor prospecting database: Open Rates (10,000+ active sponsors with decision-maker contacts, niche filtering — `/sales-openrates`)
- Self-serve marketplace: Hecto (transparent pricing, direct creator messaging, indie-focused — `/sales-hecto`)
- Two-sided marketplace: adly.news (verified ESP metrics, bidding/negotiation, campaign recruitment — `/sales-adlynews`)
- AI-powered marketplace: Social Presence (26-point discovery, Ad Library competitor monitoring, managed sales — `/sales-socialpresence`)
- Programmatic ad server: Admailr (automated display/native ad insertion, CPM+CPC revenue, no subscriber minimum, API — `/sales-admailr`)
- API-first ad server infrastructure: Kevel (build your own custom ad platform with Decision API, email ad serving with cache-busting — `/sales-kevel`)
- Enterprise email ad server + SSP: Passendo (programmatic exchange, direct-sold campaigns, 15+ demand partners, CNAME integration — `/sales-passendo`)
- CPC ad network: PostApex (500+ newsletters, 50+ categories, free for publishers, no subscriber minimum — `/sales-postapex`)
- Full-stack ad server: AdButler (managed ad server with self-serve portal, email ad zones, programmatic SSP, REST API + MCP — `/sales-adbutler`)
- Hosted ad server + white-label DSP: Epom (API included on all plans, RTB free for publishers, 40+ analytics metrics, auto-optimization — `/sales-epom`)
- Direct-sold ad manager for local/B2B publishers: Broadstreet (newsletter ad zones, sponsored content tracking, automated PDF reports, WordPress plugin — `/sales-broadstreet`)
- Budget ad server with email ads: AdPlugg (free-$79/mo, WordPress/Ghost plugins, email ad tags on Business plan — `/sales-adplugg`)
- Free open-source self-hosted ad server: Revive Adserver (zero cost, XML-RPC API, email/newsletter zones, geo-targeting — `/sales-revive`)
- Affordable hosted ad server: AdSpeed (email newsletter zones, REST API, sliding-scale pricing from $9.95/mo, MailChimp merge tag support — `/sales-adspeed`)
- Cloud-hosted ad server for ad networks: Adserver.Online (RTB + email + video, multicurrency, competitive pricing at $199/mo for 10M, REST API — `/sales-adserver-online`)
- Feature-rich hosted ad server: AdvertServe (email IMG tags via Code Wizard, video + display + email in one platform, header bidding, white-label, API — `/sales-advertserve`)
- Subscriber enrichment: Megahit (enrich your list with LinkedIn data to find decision-makers who already subscribe — `/sales-megahit`)
- Newsletter discovery: Reletter (search 7M+ newsletters by topic, subscriber count, pull creator contacts — `/sales-reletter`)
- Affiliate → sponsor pipeline: pitch brands whose affiliates already convert

**Sponsorship rate card elements**:
- List size, open rate, click-through rate
- Audience demographics and niche
- Placement options with pricing
- Testimonials from past sponsors
- Minimum commitment (1 issue, 4-issue package, etc.)

### Paid recommendations strategy

- **How it works**: Other newsletters pay you $1–$5+ per new subscriber you refer
- **Where it appears**: After opt-in confirmation, in welcome emails, or as inline recommendations
- **Key metric**: Recommendation conversion rate (how many of your subscribers also opt in to recommended newsletters)
- **Risk**: Over-recommending dilutes trust — curate carefully and be selective

## Step 3 — Platform-specific guidance

**Read `references/platforms.md`** for detailed platform-specific monetization guidance — covers Kit, Substack, Beehiiv, Ghost, Paved, Buttondown, MailerLite, SparkLoop, Mailchimp, Megahit, BuySellAds, Admailr, Social Presence, adly.news, Passendo, Kevel, PostApex, AdButler, Epom, Broadstreet, AdPlugg, Revive Adserver, AdSpeed, Adserver.Online, and AdvertServe.

Answer the user's question using only the relevant platform section. Don't dump the full reference.


## Step 4 — Actionable guidance

### Launch checklist for paid subscriptions
1. **Define your paid value prop** — what do paid subscribers get that free don't?
2. **Set pricing** — start at $5–$10/mo, offer annual at 20% discount
3. **Create 4–8 weeks of premium content backlog** before launching
4. **Announce to free list** — tease premium content, explain what's changing
5. **Offer founding member pricing** — 30–50% discount for early adopters, locked in
6. **Track conversion rate** — aim for 2–5% free-to-paid within first month
7. **Iterate on content mix** — survey paid subscribers on what they value most

### Launch checklist for sponsorships
1. **Build a media kit** — audience size, demographics, engagement rates, past sponsor results
2. **Set your rate** — start conservative, raise as demand grows
3. **Create sponsor guidelines** — format, word count, link limits, disclosure requirements
4. **Start with 1 sponsor per issue** — don't over-commercialize early
5. **Track click-through rates** per sponsor — report back to build relationships
6. **Offer package deals** — 4-issue commitment at 10–15% discount

### Revenue calculator

```
Paid subscriptions:
  Subscribers × conversion rate × monthly price × 12 = annual revenue
  Example: 5,000 × 5% × $10/mo × 12 = $30,000/yr

Sponsorships:
  Issues/month × opens per issue × CPM / 1000 × 12 = annual revenue
  Example: 4/mo × 4,500 opens × $50 CPM / 1000 × 12 = $10,800/yr

Paid recommendations:
  New subscribers/month × recommendation conversion × payout × 12
  Example: 500/mo × 30% × $2 × 12 = $3,600/yr
```

## Gotchas

1. **Don't paywall your growth engine** — if your best content is behind a paywall, you lose word-of-mouth growth. Keep your core insight free; paywall the depth, data, and community.

2. **Sponsorship CPM varies wildly by niche** — B2B/finance newsletters command $50–$100+ CPM; general interest may get $10–$25. Don't assume average CPM applies to your niche.

3. **Platform fees add up** — Substack takes 10%, Kit takes 0.6% + Stripe ~2.9%. At scale, the difference is thousands of dollars. Factor platform fees into your pricing.

4. **Paid recommendations can hurt trust** — recommending low-quality newsletters for money erodes subscriber trust. Vet every recommendation as if you're personally endorsing it.

5. **Annual plans reduce churn significantly** — monthly subscribers churn at 5–8%/mo; annual subscribers effectively churn at 1–2%/mo. Push annual plans with meaningful discounts.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Before recommending a specific platform skill

This skill covers a strategy domain across many platforms. **Before pointing the user to any specific platform skill** (any `/sales-{platform}` listed in `## Related skills`, e.g., `/sales-mailshake`, `/sales-klaviyo`, `/sales-apollo`), read that platform skill's actual `SKILL.md` first. The 1-line description in `## Related skills` is enough to *identify* a candidate — it's not enough to *commit* to it or to write a prompt that invokes it well.

**How to read it:**
- If `~/.claude/skills/{skill-name}/SKILL.md` exists locally, `Read` it.
- For `sales-*` skills, `WebFetch` directly from this repo: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/{skill-name}/SKILL.md` — e.g., for `sales-mailshake`: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/sales-mailshake/SKILL.md`.
- For non-`sales-*` skills (third-party), look up `{org}/{repo}` in `~/.claude/skills/sales-do/references/skill-sources.md` if installed and fetch the same `skills/{skill-name}/SKILL.md` path under that repo.

**After reading,** ground your recommendation in something concrete from the SKILL.md (its scope, a sub-flow, its `argument-hint` shape, or a "Do NOT use for..." negative trigger). Align any generated invocation with the platform skill's `argument-hint`. If the platform skill turns out not to fit the user's situation, swap to another or handle the question here directly rather than recommending a poor fit.

## Related skills

- `/sales-sponsy` — Sponsy platform help (sponsorship operations — ad inventory, sponsor CRM, customer portals, reporting)
- `/sales-ohmynewst` — OhMyNewst platform help (newsletter sponsorship marketplace for Spain & LATAM, 400+ newsletters)
- `/sales-sparkloop` — SparkLoop platform help (referral programs, paid recommendations, partner programs, cross-promotion)
- `/sales-paved` — Paved platform help (newsletter sponsorship marketplace, Ad Network, Booker, Radar)
- `/sales-sponsorgap` — SponsorGap sponsor intelligence (38K+ brands, verified contacts, competitor monitoring, spend trends, API)
- `/sales-sponsorleads` — SponsorLeads sponsor lead lists (4,318+ companies, decision-maker contacts, Airtable database)
- `/sales-reletter` — Reletter platform help (newsletter search engine, 7M+ publications, subscriber data, creator contacts, API)
- `/sales-passionfroot` — Passionfroot platform help (AI-powered creator marketing for B2B, Zest AI agent, storefronts, FrootWallet payments)
- `/sales-whosponsorsstuff` — Who Sponsors Stuff sponsor intelligence (8,000+ sponsors, ad creative screenshots, decision-maker contacts, email alerts)
- `/sales-openrates` — Open Rates sponsor prospecting database (10,000+ active sponsors, decision-maker contacts, niche filtering)
- `/sales-hecto` — Hecto newsletter advertising marketplace (self-serve, transparent pricing, direct creator messaging)
- `/sales-adlynews` — adly.news newsletter advertising marketplace (verified ESP metrics, bidding/negotiation, campaign recruitment)
- `/sales-buysellads` — BuySellAds contextual advertising marketplace (managed ad sales, Carbon Ads, Ad Serving API, newsletter integration)
- `/sales-admailr` — Admailr programmatic email ad server (automated ad insertion, CPM+CPC, campaign API, no subscriber minimum)
- `/sales-socialpresence` — Social Presence AI-powered newsletter advertising marketplace (discovery dashboard, Ad Library, managed sales, publisher storefronts)
- `/sales-megahit` — Megahit subscriber enrichment (LinkedIn data enrichment to find sponsors in your subscriber list)
- `/sales-email-marketing` — Email marketing strategy (sending campaigns, automation, segmentation)
- `/sales-audience-growth` — Growing your subscriber list (lead magnets, cross-promotion, referrals)
- `/sales-digital-products` — Selling digital products (ebooks, courses, templates)
- `/sales-mailerlite` — MailerLite platform help (paid newsletters, digital products)
- `/sales-kit` — Kit platform help (Kit-specific setup and configuration)
- `/sales-mailchimp` — Mailchimp platform help
- `/sales-buttondown` — Buttondown platform help (newsletter publishing, paid subscriptions, Markdown, API, CLI)
- `/sales-substack` — Substack platform help (publishing, paid subscriptions, Notes, discovery network, custom domains, migration)
- `/sales-listmonk` — Listmonk platform help (open-source self-hosted newsletter, multi-SMTP, transactional email, REST API)
- `/sales-ghost` — Ghost platform help (publishing, newsletters, memberships, Stripe, Mailgun, API, migration)
- `/sales-beehiiv` — Beehiiv platform help (publishing, growth, monetization, ad network, API)
- `/sales-postapex` — PostApex newsletter ad network (500+ publishers, CPC revenue, free for publishers, no subscriber minimum)
- `/sales-passendo` — Passendo email ad server + SSP (programmatic exchange, direct-sold campaigns, 15+ demand partners, CNAME integration)
- `/sales-kevel` — Kevel API-first ad server infrastructure (build custom ad platforms, email ad serving, Decision API)
- `/sales-adbutler` — AdButler full-stack ad server (managed dashboard, self-serve portal, email ad zones, REST API + MCP)
- `/sales-epom` — Epom hosted ad server + white-label DSP (API included, RTB free for publishers, 40+ analytics metrics, auto-optimization)
- `/sales-broadstreet` — Broadstreet ad manager for local/B2B publishers (newsletter ad zones, sponsored content tracking, automated reports, WordPress plugin)
- `/sales-adplugg` — AdPlugg budget ad server (free-$79/mo, WordPress/Ghost plugins, email ad tags, rotation, scheduling)
- `/sales-revive` — Revive Adserver open-source self-hosted ad server (free, XML-RPC API, email/newsletter zones, geo-targeting)
- `/sales-adspeed` — AdSpeed affordable hosted ad server (email newsletter zones, REST API, sliding-scale pricing from $9.95/mo)
- `/sales-adserver-online` — Adserver.Online cloud-hosted ad server (RTB + email + video, multicurrency, REST API v2, from $199/mo)
- `/sales-advertserve` — AdvertServe hosted ad server (email IMG tags, video + display, header bidding, white-label, 17-module API, from $299/mo)
- `/sales-content` — Sales content management (creating compelling content)
- `/sales-checkout` — Checkout optimization (payment flows, upsells)
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: First-time monetization
**User says**: "I have 3,000 newsletter subscribers and want to start making money from it"
**Skill does**: Assesses niche and engagement, recommends starting with paid recommendations (low effort, immediate revenue) + sponsorships (higher revenue), provides rate card template and recommendation setup steps
**Result**: User launches with 2 revenue streams and a clear path to paid subscriptions at 5K+ subscribers

### Example 2: Paid subscription launch
**User says**: "I want to launch a $10/month paid tier for my finance newsletter"
**Skill does**: Helps define free vs paid content split, recommends founding member pricing, creates launch timeline with pre-launch content backlog, suggests annual pricing at $100/yr
**Result**: User has a launch plan with pricing, content strategy, and promotion sequence

### Example 3: Sponsorship pricing
**User says**: "How much should I charge for newsletter sponsorships? I have 8,000 subscribers with 42% open rate"
**Skill does**: Calculates 3,360 opens per issue, applies niche-appropriate CPM, recommends starting rate of $150–$250/issue, provides rate card template with package deals
**Result**: User has a defensible sponsorship rate with a professional media kit outline

## Troubleshooting

### Low free-to-paid conversion
**Symptom**: Launched paid tier but conversion is under 1%
**Cause**: Paid value prop isn't differentiated enough from free, or audience hasn't been warmed up
**Solution**: Survey free subscribers on what they'd pay for. Tease premium content in free issues for 2–4 weeks before pushing the upgrade. Consider a free trial period.

### Sponsors not renewing
**Symptom**: Sponsors buy one issue but don't come back
**Cause**: Click-through rates are low, or no post-campaign reporting provided
**Solution**: Send sponsors a performance report after each placement (opens, clicks, CTR). Offer A/B testing on ad copy. Ask for feedback on what would make them renew.

### Revenue plateaued
**Symptom**: Newsletter revenue hasn't grown in months despite growing subscriber count
**Cause**: Single revenue stream maxed out, or pricing hasn't been updated
**Solution**: Add a second revenue stream (if only sponsorships, add paid tier; if only subscriptions, add recommendations). Raise prices 10–20% — most newsletters underprice. Launch an annual plan if only offering monthly.
