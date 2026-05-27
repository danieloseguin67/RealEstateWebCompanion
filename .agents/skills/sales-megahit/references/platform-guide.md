# Megahit Platform Guide

## Overview

Megahit is a B2B newsletter subscriber enrichment tool that identifies potential sponsorship leads within your existing subscriber base. Unlike sponsor intelligence tools that search externally (SponsorGap, Who Sponsors Stuff), Megahit works "inside-out" — enriching your subscriber emails with LinkedIn data to surface decision-makers who already read your newsletter.

**Founded by**: Niklas Wenzel (solo developer, Berlin)
**Website**: megahit.app
**Pricing**: $600 one-time fee (no subscription, no free plan, no trial)
**Affiliate program**: Yes (details on website)

## Core capabilities

### Subscriber enrichment
- Enriches email addresses with LinkedIn data: job titles, employers, LinkedIn profiles
- Works across email types including Gmail addresses (though work emails have higher match rates)
- Auto-enriches new subscribers upon signup after initial setup

### Decision-maker filtering
- Filter enriched subscribers by job title, company, industry
- Identify marketers, founders, CEOs, and other sponsorship decision-makers
- Build targeted outreach lists from your own audience

### Privacy architecture
- Runs on customer-controlled servers
- Megahit never accesses or stores your email list directly
- All data processing happens in your infrastructure

## Supported ESPs

| ESP | Supported |
|---|---|
| Beehiiv | Yes |
| Kit (ConvertKit) | Yes |
| Campaign Monitor | Yes |
| EmailOctopus | Yes |
| Ghost | Yes |
| HubSpot | Yes |
| Mailchimp | Yes |
| SendGrid | Yes |
| Substack | Yes |

If your ESP is not listed, export subscribers as CSV and import manually.

## Developer surface

| Surface | Available |
|---|---|
| REST API | No |
| Webhooks | No |
| Zapier / Make | No |
| MCP server | No |
| CLI | No |
| SDK | No |

Megahit is UI-only. No programmatic access to enriched data or operations.

## Workflow: finding sponsors in your subscriber list

### 1. Connect your ESP
Link your newsletter's ESP to Megahit. This allows Megahit to pull your subscriber list for enrichment.

### 2. Run initial enrichment
Megahit processes your existing subscriber emails against LinkedIn data. Expect varying match rates:
- Work emails (.com company domains): highest match rate
- Personal emails (Gmail, Yahoo, Outlook): lower match rate
- Disposable/temporary emails: no matches

### 3. Filter for decision-makers
Use Megahit's filtering to find subscribers with sponsorship-relevant titles:
- **High priority**: Head of Marketing, CMO, VP Marketing, Growth Lead, Brand Manager, Partnerships Manager
- **Medium priority**: CEO, Founder, Co-Founder (at companies that advertise)
- **Context**: Director of Content, Social Media Manager, PR Manager

### 4. Build outreach list
Export filtered contacts and craft personalized pitches. Key advantage: these people already subscribe to your newsletter, so your outreach is warm — mention their readership in your pitch.

### 5. Auto-enrichment
After initial setup, new subscribers are automatically enriched when they sign up. Review new decision-maker signups periodically for fresh sponsor leads.

## How Megahit compares to other sponsor discovery tools

| Tool | Approach | Database | Pricing | API |
|---|---|---|---|---|
| **Megahit** | Inside-out (your subscribers) | Your list enriched with LinkedIn | $600 one-time | No |
| **SponsorGap** | Outside-in (external database) | 38K+ brands | Free tier + paid | Yes |
| **Who Sponsors Stuff** | Outside-in (tracking) | 8,000+ sponsors across 500+ newsletters | Free ~10%, paid tiers | No |
| **Open Rates** | Outside-in (database) | 10,000+ active sponsors | Contact sales | No |
| **SponsorLeads** | Outside-in (curated list) | 4,318+ companies | $97/mo | No (Airtable) |
| **Paved Radar** | Outside-in (lead enrichment) | Paved's network data | Part of Paved | No |

**Best strategy**: Use Megahit for warm leads first (higher reply rates from subscribers who know you), then supplement with outside-in tools (SponsorGap, Who Sponsors Stuff) for cold prospecting at scale.

## Reported results

Per testimonials on megahit.app:
- Sponsors report $25,000–$50,000+ in ad revenue
- 4-figure to 5-figure sponsorship deals attributed to subscriber enrichment
- 80% email reply rates and 70% meeting conversion rates (warm outreach to subscribers)

These are self-reported testimonials — individual results vary significantly by niche, list size, and subscriber quality.

## Limitations

- **No API or automation**: Cannot integrate enriched data into workflows programmatically
- **One-time fee is high for small publishers**: $600 may not pay off for newsletters under 5,000 subscribers
- **No free trial**: Must book a demo to evaluate before purchasing
- **Solo founder product**: Single developer (Niklas Wenzel) handles all development, support, and marketing
- **Enrichment coverage varies**: Gmail-heavy lists will have lower match rates than work-email-heavy lists
- **Limited to 9 ESPs**: Not all email platforms are supported natively
