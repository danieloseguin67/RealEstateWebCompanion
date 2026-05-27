# Bazzly Platform Reference

## Overview

Bazzly is an AI-powered Reddit lead generation tool that monitors subreddits 24/7, identifies high-intent users, drafts contextual messages, and sends outreach (DMs and replies) via a Chrome extension running through the user's own Reddit account. Designed for solo founders and small teams wanting Reddit customer acquisition without manual scanning.

## Capabilities & automation surface

| Capability | How it works | Access |
|---|---|---|
| **Reddit monitoring** | Scans configured subreddits continuously, ~4-minute discovery latency | UI-only |
| **AI intent scoring** | Scores leads 0-100% based on post context and buying signals | UI-only |
| **AI message drafting** | Generates contextual DMs and replies based on product description and thread context | UI-only |
| **Chrome extension sending** | Sends approved messages through user's own Reddit account and browser session | Chrome extension |
| **Reply Boost** | Smart upvotes to push comments higher in thread visibility | UI-only |
| **DM automation** | Sends personalized direct messages to identified leads (manual approval required) | Chrome extension |
| **Analytics dashboard** | Tracks leads found, messages sent, responses, and conversions | UI-only |
| **Subreddit configuration** | Select/exclude subreddits, set targeting criteria | UI-only |

**No API, no webhooks, no Zapier, no MCP.** Entirely UI + Chrome extension. No programmatic data export.

## Pricing, limits & plan gates

*Best-effort — verify current pricing at bazzly.ai*

| Feature | Starter $19/mo | Growth $39/mo | Elite $99/mo |
|---|---|---|---|
| Leads/month | 200 | Unlimited | Unlimited |
| Subreddits | 4 | 6 | Unlimited |
| AI credits | 20 | 200 | Unlimited |
| Reply Boosts | 1 | 2 | 4 |
| Priority support | No | No | Yes |

- **30% discount** for annual billing
- **7-day free trial** available
- No free plan

### Credit costs

| Action | Credit cost | Notes |
|---|---|---|
| AI draft generation | 0.1 | Cheapest — use for screening |
| Upvote (Reply Boost) | 0.2 | Per vote, limited by Reply Boost count |
| Comment via high-karma account | 10 | Most expensive — reserve for highest-intent leads |

**Credit strategy**: Generate AI drafts first (0.1 credits) to evaluate lead quality before committing 10 credits to post a comment. This screening step can save 50-80% of wasted credits.

## How the Chrome extension works

1. Install the Bazzly Chrome extension from the Chrome Web Store
2. Log in with your Bazzly account
3. The extension runs through your own Reddit session — Bazzly never stores your Reddit credentials
4. When you approve a message in the dashboard, the extension posts it through your browser as if you typed it
5. Daily sending limits are configurable to avoid spam detection
6. All messages require manual approval before sending

**Safety model**: Because messages are sent through your real browser session and Reddit account, Reddit sees normal browser activity, not API bot traffic. This reduces (but does not eliminate) ban risk.

## Message optimization

### Improving AI draft quality

1. **Product context**: Provide detailed, specific product description. Include: what problem you solve, who you solve it for, key differentiators, and proof points (numbers, testimonials)
2. **Tone guidance**: Specify whether replies should be casual, technical, founder-story, or resource-sharing
3. **Edit every draft**: Treat AI output as a starting point. Add personal context, remove generic phrases, and ensure the reply genuinely answers the thread's question
4. **Vary styles**: Don't use the same reply format everywhere. Mix:
   - Direct answer + subtle mention
   - Personal experience story
   - Resource/tool recommendation (your product among others)
   - Question that shows expertise + follow-up with solution

### Avoiding spam signals

- Never post the same message template in multiple threads
- Lead with value — answer the question before mentioning your product
- Don't mention your product in every reply — some threads deserve pure value
- Vary reply length (2 sentences to 2 paragraphs)
- Engage in follow-up comments when people respond — don't just drop a link and leave
- Limit to 3-5 posts per day from a single account

## Account safety

### Ban risk factors

| Risk level | Action | Mitigation |
|---|---|---|
| **Low** | AI draft generation, manual posting via Chrome extension | Review every message, vary content |
| **Medium** | DM automation with manual approval | Limit daily DMs, personalize each one |
| **High** | Reply Boost (smart upvotes) | Vote manipulation violates Reddit TOS — use very sparingly |
| **High** | High-volume posting (10+/day from one account) | Keep under 5 genuine replies per day |

### If your account gets warned

1. **Stop all automated activity immediately** — pause Bazzly
2. Wait 2-4 weeks before any engagement from the warned account
3. Resume with manual-only posting, no DMs, no Reply Boost
4. Consider creating a separate Reddit account for Bazzly outreach (keep your main account clean)
5. Reduce daily volume and increase personalization

## Integrations

**None.** Bazzly is a closed-loop tool with no data export, API, webhook, Zapier, or Make support. Lead data stays in the Bazzly dashboard. If you need to track leads in a CRM, manually export or copy data.

**Workaround for CRM tracking**: Manually tag leads in your CRM when you send a Bazzly message. Use a simple spreadsheet as an interim bridge: Reddit username, thread URL, message sent, response status, conversion.

## Comparison with similar tools

| Feature | Bazzly | KeyMentions | RedShip | ReplyGuy |
|---|---|---|---|---|
| **Platforms** | Reddit only | Reddit only | Reddit only | Twitter, Reddit, LinkedIn |
| **Intent scoring** | Yes (0-100%) | No | Yes (0-100) | No |
| **AI reply drafts** | Yes | Yes | Yes | Yes |
| **Auto-publish** | No (manual approval via Chrome) | Yes (auto-publish to Reddit) | No (manual, + auto DMs) | Yes (Twitter auto, Reddit/LinkedIn manual) |
| **Upvote boost** | Yes (Reply Boost) | No | No | No |
| **DM automation** | Yes (manual approval) | No | Yes (auto DMs) | No |
| **API/webhooks** | No | No | Yes (REST + webhooks) | No |
| **Starting price** | $19/mo | Free (3 keywords) | $19/mo | $49/mo |
| **Best for** | Founders wanting intent-scored leads + manual control | Founders wanting auto-publish to Reddit | Developers wanting API access + SEO post discovery | Teams wanting multi-platform reply generation |
