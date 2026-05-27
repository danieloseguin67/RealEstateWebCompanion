# OhMyNewst Platform Reference

## Overview

OhMyNewst is a newsletter sponsorship marketplace focused on Spain and Latin America. It connects advertisers with 400+ newsletters across 50+ content categories, positioning itself as an alternative to Meta Ads and Google Ads for reaching targeted audiences through email. Zero platform fee for advertisers; newsletters pay a ~15% commission on sponsorship revenue.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **Newsletter Marketplace** | Browse and discover 400+ newsletters across 50+ categories with audience data | UI-only |
| **Campaign Management** | Centralized dashboard for managing multiple newsletter sponsorships | UI-only |
| **Sponsor Communication** | Built-in chat/messaging between advertisers and newsletter creators | UI-only |
| **Payments** | Unified billing across multiple newsletters. Stripe, bank transfer, Bizum. | UI-only |
| **Performance Analytics** | Campaign results tracking per newsletter — opens, clicks, CTR | UI-only |
| **Newsletter Listing** | Creators register their newsletter, set pricing, and receive sponsor requests | UI-only |

**No API, no webhooks, no Zapier/Make integration, no MCP server.** All interaction is through the web dashboard.

## Pricing model

### For advertisers
- **Zero platform fee** — advertisers pay only the newsletter's listed sponsorship price
- Per-newsletter pricing varies by subscriber count, engagement, and placement type
- Typical range: **€220–€3,100+** per placement
- Placement types: top position, middle, bottom (pricing varies)
- Package deals available (e.g., 3-issue campaigns)

### For newsletter creators
- **Free to join** — no upfront costs
- OhMyNewst takes approximately **15% commission** on sponsorship revenue
- Creators set their own base pricing
- Pay-per-display model (flat rate per issue, not CPC/CPA)

### Example pricing (from marketplace)
| Newsletter | Subscribers | Sponsorship price | Campaign (3 issues) |
|---|---|---|---|
| Small niche newsletter | ~5,000 | ~€220 | ~€600 |
| Mid-size vertical | ~25,000 | ~€800 | ~€2,100 |
| Large multi-vertical | ~100,000+ | ~€1,500+ | ~€3,100+ |

<!-- Prices are approximate from marketplace listings — verify current rates on ohmynewst.com -->

## Newsletter categories

50+ categories including:
- Technology & SaaS
- Marketing & Growth
- Finance & Investing
- eCommerce
- Startup & Entrepreneurship
- Design & Creativity
- Health & Wellness
- Education
- Food & Lifestyle
- News & Current Affairs

**Market focus**: Primarily Spain and Latin America. Some international newsletters available but the platform's strength is Spanish-language audiences.

## Data model

OhMyNewst has no API, so there are no formal data objects. The conceptual model based on the marketplace UI:

### Newsletter listing
<!-- Constructed from UI observations — no API exists -->
```json
{
  "name": "Tech Weekly España",
  "category": "Technology",
  "subscribers": 25000,
  "open_rate": "42%",
  "language": "Spanish",
  "market": "Spain",
  "sponsorship_price": 800,
  "currency": "EUR",
  "placement_options": ["top", "middle", "bottom"],
  "description": "Weekly tech news for Spanish developers"
}
```

### Sponsorship campaign
<!-- Constructed from UI observations — no API exists -->
```json
{
  "advertiser": "Acme SaaS",
  "newsletter": "Tech Weekly España",
  "placement": "top",
  "issues": 3,
  "total_price": 2100,
  "currency": "EUR",
  "status": "active",
  "metrics": {
    "opens": 10500,
    "clicks": 315,
    "ctr": "3.0%"
  }
}
```

## Integration patterns

### No programmatic integration available

OhMyNewst is entirely UI-driven. For newsletter operators who need automation:

**Workaround options:**
1. **Manual export + spreadsheet** — track campaigns in a separate spreadsheet or CRM, manually updating from OhMyNewst dashboard
2. **Use Sponsy alongside OhMyNewst** — manage OhMyNewst-sourced sponsors in Sponsy (`/sales-sponsy`) for inventory tracking and reporting
3. **Zapier Email Parser** — if OhMyNewst sends email notifications for new sponsor requests, use Zapier's Email Parser to trigger downstream workflows (unverified)

### When to pair with other tools

| Need | Tool | Why |
|---|---|---|
| Sponsor CRM & inventory | Sponsy (`/sales-sponsy`) | Track all sponsors (OhMyNewst + direct) in one calendar |
| US/global marketplace | Paved (`/sales-paved`) | OhMyNewst is Spain/LATAM; Paved covers US/global |
| Sponsor intelligence | SponsorGap (`/sales-sponsorgap`) | Find brands sponsoring competitor newsletters |
| Programmatic ads | Paved Ad Network, beehiiv Ad Network | Auto-fill unsold inventory with CPC-based ads |

## Partner program

- **Commission**: 5% of referred advertiser campaigns for 12 months (equivalent to 33% of OhMyNewst's earnings on those campaigns)
- **Cookie duration**: 60 days
- **Tracking**: Real-time dashboard with visits, leads, conversions, and payments
- **Promotion channels**: Social media, email, blog, SEO content (no paid search with brand name)
- **Application**: Sign up at ohmynewst.com, approval required

## Competitive positioning

| Feature | OhMyNewst | Paved | beehiiv Ad Network |
|---|---|---|---|
| Market focus | Spain & LATAM | US / Global | beehiiv publishers only |
| Newsletter count | 400+ | 3,000+ | beehiiv-hosted only |
| Advertiser fee | Zero | Zero | Varies |
| Publisher commission | ~15% | 30% | Built into ad rates |
| Pricing model | Fixed per-display | Fixed + CPC | CPC |
| API/automation | None | Zapier, API | API |
| Ad insertion | Manual by creator | Manual or programmatic | Automatic |
| Payment methods | Stripe, bank transfer, Bizum | Stripe | Stripe |
