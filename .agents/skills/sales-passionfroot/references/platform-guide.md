# Passionfroot Platform Reference

## Overview

Passionfroot is an AI-powered creator marketing platform for B2B brands. It combines creator discovery, campaign management, storefront booking, bulk payments, and cross-platform analytics. Originally a creator storefront tool, it pivoted to serve brand marketing teams running creator-led GTM campaigns. Key customers include Replit, Figma, HubSpot, ElevenLabs, Intercom, and Framer.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Zest AI Agent** | Generates GTM strategies from prompts, ICP-matched creator recommendations, personalized campaign briefs | UI-only |
| **Creator Discovery** | Search creators across Twitter/X, LinkedIn, YouTube, Instagram, TikTok, Beehiiv, Substack | UI-only |
| **Campaign Management** | Centralized action center — deadline tracking, approvals, real-time status, brief generation | UI-only |
| **Creator Storefronts** | Creators build booking pages, set pricing, manage inbound brand requests | UI-only |
| **Analytics** | Cross-platform performance tracking — reach, engagement, spend, ROI per creator/platform/format | UI-only |
| **FrootWallet** | Compliant bulk creator payments — single onboarding, no individual vendor approvals | UI-only |
| **Partner Network** | Ad network matching brands to creators, auto-surfacing opportunities | UI-only |

**No API, no webhooks, no Zapier/Make integration, no MCP server.** All interaction is through the web dashboard.

## Pricing model

### For creators
- **Free to use** — no monthly fees, no setup costs
- **0% commission on self-sourced deals** (storefront bookings, creator-sent proposals) — brands pay a 5% partner fee instead
- **15% commission on network-sourced deals** (Discovery matches, Ad Network, Partner Network) — includes Stripe's 2.9% processing
- Deals tagged with "PF badge" indicate network-sourced (15% commission applies)
- Must keep payments on-platform for network deals to maintain Discovery ranking

### For brands/partners
- **5% partner fee** on organic/self-sourced deals where creators connected directly
- **Network deals** — pricing not publicly disclosed beyond the creator's 15% commission. Contact sales.
- Notable B2B customers suggest enterprise pricing is available

### Commission examples
| Deal source | Deal value | Creator payout | Passionfroot take |
|---|---|---|---|
| Creator's storefront | $1,000 | $1,000 (0%) | $50 from brand (5%) |
| Discovery / Ad Network | $1,000 | $850 (85%) | $150 (15%, includes Stripe) |

## Supported platforms

Passionfroot supports creator content across:
- **Social**: Twitter/X, LinkedIn, YouTube, Instagram, TikTok
- **Newsletters**: Beehiiv, Substack
- **Analytics**: Cross-platform performance tracking for all of the above

## Data model

Passionfroot has no API, so there are no formal data objects. Conceptual model based on the platform:

### Creator profile
<!-- Constructed from platform descriptions — no API exists -->
```json
{
  "name": "Alex Chen",
  "platforms": ["twitter", "linkedin", "substack"],
  "niche": "developer tools",
  "audience_size": {
    "twitter": 45000,
    "linkedin": 12000,
    "substack": 8000
  },
  "avg_engagement_rate": "3.2%",
  "storefront_url": "https://passionfroot.me/alexchen",
  "pricing": {
    "twitter_thread": 500,
    "linkedin_post": 400,
    "newsletter_primary": 800
  },
  "currency": "USD"
}
```

### Campaign
<!-- Constructed from platform descriptions — no API exists -->
```json
{
  "brand": "Acme Dev Tools",
  "status": "active",
  "creators": [
    {
      "name": "Alex Chen",
      "platform": "twitter",
      "content_type": "thread",
      "brief_status": "approved",
      "deadline": "2026-06-15",
      "fee": 500,
      "metrics": {
        "impressions": 85000,
        "engagement": 2700,
        "clicks": 420
      }
    }
  ],
  "total_spend": 2500,
  "total_reach": 250000,
  "campaign_roi": "3.2x"
}
```

## Integration patterns

### No programmatic integration available

Passionfroot is entirely UI-driven. For teams needing automation:

**Workaround options:**
1. **Manual tracking + CRM** — export campaign data and track in your CRM (HubSpot, Salesforce) manually
2. **UTM tracking** — use UTM parameters on creator links to track attribution in your analytics platform (GA4, Mixpanel)
3. **Pair with Sponsy** — for newsletter sponsorship inventory management alongside Passionfroot campaigns (`/sales-sponsy`)

### When to pair with other tools

| Need | Tool | Why |
|---|---|---|
| Pure discovery (250M+ profiles) | Modash (`/sales-modash`) | Broader creator database than Passionfroot's network |
| E-commerce / Shopify gifting | GRIN (`/sales-grin`) | Deep Shopify integration, affiliate tracking |
| Newsletter sponsor operations | Sponsy (`/sales-sponsy`) | Ad inventory calendar, ESP reporting integration |
| Audience intelligence | SparkToro (`/sales-sparktoro`) | Understand what your audience reads/follows |

## Referral programs

### Creator Referral Program
- Earn 5% of everything referred brands book and spend on other creators on Passionfroot
- No cap documented on total earnings

### Partner Referral Program
- Earn 5% of referred brand's total ad spend up to $200,000
- Maximum payout: $10,000 per referred sponsor
- Example: 4 referred partners × $200K spend each = $40,000 earned
- Email referrals to partnerships@passionfroot.me

## Competitive positioning

| Feature | Passionfroot | GRIN | Aspire | Modash | Collabstr |
|---|---|---|---|---|---|
| Focus | B2B creator GTM | E-commerce | E-commerce | Discovery | Marketplace |
| AI agent | Zest (GTM briefs) | Gia (discovery) | None | None | None |
| Creator storefronts | Yes | No | No | No | Marketplace listings |
| Newsletter support | Beehiiv, Substack | No | No | No | No |
| Bulk payments | FrootWallet | Built-in | Built-in | No | Escrow |
| API | None | No public API | No public API | API available | No |
| Pricing | Free + commission | ~$2,200/mo | Custom (annual) | $199/mo | $299/mo |
| Best for | B2B SaaS GTM | E-commerce brands | E-commerce + UGC | Pure discovery | Quick marketplace |
