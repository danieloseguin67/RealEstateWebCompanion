# Commentions Platform Reference

## Overview

Commentions automates brand mention placement in social media comments. It scans for high-engagement posts matching your keywords on LinkedIn, X (Twitter), YouTube, and Quora, then generates and posts human-like comments that subtly mention your brand. Target audience: founders, personal brands, SaaS companies, crypto projects, freelancers, content creators.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Post Discovery | Scans thousands of daily posts to find high-engagement threads matching keywords | UI-only |
| AI Comment Generation | Creates unique comments matching brand voice with rotating phrasing/tone | UI-only |
| Auto-Posting | Posts comments autonomously across connected platforms | UI-only |
| Analytics Dashboard | Tracks impressions, engagement, reach, and CTR per comment | UI-only |
| Brand Profiles | Configure multiple brand voices and tones | UI-only |
| Workflow Management | Create targeting workflows with keywords and platform selection | UI-only |

**All capabilities are UI-only.** No API, no webhooks, no Zapier/Make integrations, no MCP server. All configuration and monitoring happens in the Commentions web dashboard.

## Pricing, limits & plan gates

All pricing best-effort as of research date. Plans differ only by daily mention volume — all features are identical across tiers.

| Plan | Monthly | Annual (20% off) | Daily mentions | Monthly mentions |
|---|---|---|---|---|
| Starter | $59/mo | $39/mo ($472/yr) | 20 | ~600 |
| Growth | $99/mo | $66/mo ($792/yr) | 80 | ~2,400 |
| Dominate | $149/mo | $99/mo ($1,192/yr) | 160 | ~4,800 |

- **Free trial**: 240 brand mentions (no payment required)
- **No rollover**: Unused daily mentions do not carry over
- **Unlimited brand profiles**: All plans
- **Unlimited connected accounts**: All plans
- **No feature gating**: Analytics, multi-platform, all comment features available on every plan

## Platform coverage

| Platform | Supported | Comment type |
|---|---|---|
| LinkedIn | Yes | Post comments |
| X (Twitter) | Yes | Replies to tweets |
| YouTube | Yes | Video comments |
| Quora | Yes | Answer/comment responses |
| Reddit | No | Not supported |
| Instagram | No | Not supported |
| Facebook | No | Not supported |
| TikTok | No | Not supported |

## Integrations

**No external integrations.** Commentions connects to social platforms via OAuth for posting. There are no CRM connectors, no webhook outputs, no Zapier triggers/actions, no Make modules.

The only data flow is:
- **Inbound**: OAuth connections to LinkedIn, X, YouTube, Quora for reading posts
- **Outbound**: Posts comments to those same platforms
- **No export**: Analytics data is dashboard-only — no CSV export or API access documented

## Onboarding workflow

### 1. Connect social accounts
One-click OAuth for each platform. Connect all accounts you want to post from.

### 2. Create brand profile
- Describe your business/product
- Set tone and voice (conversational, professional, witty, etc.)
- Provide examples of ideal comment style
- Multiple brand profiles supported for different products/personas

### 3. Configure workflow
- Select target platforms
- Add keywords (niche-relevant, problem-focused)
- Set daily mention volume
- Launch — Commentions handles discovery, generation, and posting

## Safety & compliance

Commentions claims zero account bans across all users. Safety measures include:
- **Random posting delays**: Non-detectable timing patterns
- **Tone variation**: Every comment is unique with rotating phrasing
- **API-compliant posting**: No browser extensions, no scraping
- **Platform rules compliance**: Comments designed to add value, not just promote

**Caveat**: LinkedIn actively restricts automation. While Commentions claims compliance, LinkedIn's terms prohibit automated posting. Account risk exists regardless of tool claims. Monitor account health.

## Competitive positioning

| Feature | Commentions | ReplyGuy | ParseStream | PowerIn |
|---|---|---|---|---|
| LinkedIn | Yes | Yes | Yes | Yes (primary) |
| X/Twitter | Yes | Yes (auto-reply) | Yes | Limited |
| YouTube | Yes | No | No | No |
| Quora | Yes | No | Yes | No |
| Reddit | No | Yes | Yes | No |
| Auto-posting | Full | Twitter only | Yes | Yes |
| API | No | No | No | No |
| Approx. pricing | $59-149/mo | $49/mo | $29-79/mo | $15-50/mo |

## Analytics

The dashboard tracks:
- **Impressions**: How many people saw the comment
- **Engagement**: Likes, replies to the comment
- **Reach**: Extended visibility from engagement
- **CTR**: Click-through to website (when brand URL included)
- **Per-comment breakdown**: Performance of individual comments
- **Per-keyword breakdown**: Which keywords generate the most engagement

<!-- No API access to analytics — dashboard only -->
