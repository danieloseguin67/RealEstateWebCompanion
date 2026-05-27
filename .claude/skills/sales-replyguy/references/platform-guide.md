# ReplyGuy Platform Reference

## Overview

ReplyGuy monitors keywords across Twitter/X, Reddit, and LinkedIn, then uses AI to draft contextually relevant replies that naturally mention your product. Semi-manual on Reddit/LinkedIn (you copy-paste); fully automated on Twitter. Target audience: SaaS founders, indie hackers, and small teams wanting organic mention generation without hiring a VA.

## Capabilities & automation surface

| Capability | Description | Automation level |
|---|---|---|
| Keyword monitoring | Tracks keywords across Twitter, Reddit, LinkedIn | UI-only (no API) |
| AI post selection | Identifies high-quality, recent, relevant posts | UI-only |
| Reply generation | Drafts contextual replies mentioning your product | UI-only |
| Twitter auto-reply | Publishes replies automatically from your account | Fully automated |
| Reddit reply | Generates reply text; user must manually post | Semi-manual (UI-only) |
| LinkedIn reply | Generates reply text; user must manually post | Semi-manual (UI-only) |
| Analytics | Google Analytics, Facebook Pixel, LinkedIn Insight Tag | Tracking pixels only |
| Chrome extension | Inline reply insertion for Gmail/LinkedIn | Browser extension |

**No API. No webhooks. No Zapier/Make. No MCP server.** The entire platform is UI-driven.

## Pricing, limits & plan gates

| Plan | Monthly | Annual (per mo) | Keywords | Replies/mo | Projects | Platforms |
|------|---------|-----------------|----------|-----------|----------|-----------|
| Pro | $49 | ~$28 | 10 | 100 | 1 | Twitter, Reddit, LinkedIn |
| Business | $99 | ~$57 | 25 | 300 | 5 | Twitter, Reddit, LinkedIn |
| Enterprise | $199 | ~$115 | 100 | 1,000 | Unlimited | Twitter, Reddit, LinkedIn |
| Agency | $499 | ~$289 | 1,000 | 5,000 | Unlimited | Twitter, Reddit, LinkedIn |

- ~42% discount on annual billing
- Free trial available (no duration specified)
- All plans include all platforms — no feature gating by tier
- Reply limits are hard caps — no overage, no rollover
- Enterprise tier marked as "POPULAR"

## Platform-specific behavior

### Twitter/X
- **Auto-reply mode**: AI selects posts, generates reply, publishes automatically
- **Manual mode**: AI generates reply, user reviews and publishes
- Reply status: "Ready to publish" → "Replied" (auto or manual)
- Higher tolerance for promotional replies (lower ban risk than Reddit)

### Reddit
- **Semi-manual only**: AI finds threads, generates reply text
- User must: copy text → navigate to Reddit → paste → submit → mark as published in ReplyGuy
- Reddit's spam detection is aggressive — repeated similar replies trigger bans
- ReplyGuy reportedly received cease-and-desist from Reddit legal (2024)

### LinkedIn
- **Semi-manual only**: Same workflow as Reddit
- Lower ban risk than Reddit but LinkedIn also flags repetitive promotional comments

## Safety guidelines

### Account protection best practices

1. **Use aged accounts** — new accounts posting promotional content get flagged immediately
2. **Mix organic content** — for every ReplyGuy reply, post 3-5 genuine organic comments
3. **Edit substantially** — never post AI drafts verbatim; rewrite to sound natural
4. **Limit frequency** — max 2-3 promotional replies per day per account
5. **Vary language** — don't use the same product mention phrasing repeatedly
6. **Space out timing** — don't post 3 replies within 10 minutes; spread across the day

### Ban risk by platform (from research)

| Platform | Ban risk | Recovery |
|---|---|---|
| Twitter/X | Medium (auto-reply) | Appeal via Twitter support; usually reversible |
| Reddit | High (even semi-manual) | Permanent — create new account, rebuild karma |
| LinkedIn | Low-Medium | Appeal via LinkedIn; usually reversible |

## Keyword strategy

### High-conversion keyword patterns
- "recommend a [category]" — buying intent
- "best [category] for [use case]" — comparison shopping
- "alternative to [competitor]" — switching intent
- "[competitor] pricing" — price sensitivity
- "anyone tried [category]" — social proof seeking

### Keywords to avoid
- Single generic words ("CRM", "email") — too broad, irrelevant matches
- Your own brand name — you're already in those threads
- Competitor names alone — contextually inappropriate unless thread asks for alternatives

## Integrations

**No programmatic integrations exist.** The only "integrations" are:
- Google Analytics pixel (track dashboard visits)
- Facebook Pixel (retargeting)
- LinkedIn Insight Tag (audience tracking)
- Crisp (live chat support widget)
- Lemon Squeezy (payment processing + affiliate program)

**Workarounds for automation:**
- Manual CSV export is not available
- No way to trigger workflows from new mentions
- Screenshot/copy-paste is the only data extraction method
- For programmatic Reddit monitoring, use Octolens, RedShip, or Syften instead

## Comparison with alternatives

| Feature | ReplyGuy | KeyMentions | ThreadRadar | RedShip |
|---|---|---|---|---|
| Platforms | Twitter, Reddit, LinkedIn | Reddit only | Reddit, Quora | Reddit only |
| Auto-publish | Twitter only | Yes (Reddit) | No (manual) | No (manual, auto DMs) |
| AI reply drafts | Yes | Yes | Yes | Yes |
| API/webhooks | No | No | No | Yes (REST + webhooks) |
| Free tier | No (trial only) | Yes (3 keywords) | No (7-day trial) | No |
| Starting price | $49/mo | Free / $29/mo | $19.95/mo | $19/mo |
| Ban risk | High (Twitter auto) | High (auto-publish) | Low (manual only) | Medium (auto DMs) |
| Analytics | None | Virality filter | None | Relevance scoring (0-100) |

## Data model

No API exists — no data model to document. All interactions are through the web UI.

<!-- No public API — cannot provide endpoint documentation or JSON shapes -->

## Business context

- **Founded**: ~2023
- **Sold**: September 2024 for 6 figures (original founders exited)
- **Users**: 7,829+ businesses claimed
- **Support**: Crisp live chat
- **Payment**: Lemon Squeezy
