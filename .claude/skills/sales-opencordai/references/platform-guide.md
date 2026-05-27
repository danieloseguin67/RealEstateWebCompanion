# Opencord AI Platform Reference

## Overview

Opencord AI deploys AI agents that continuously monitor Twitter/X and Reddit for keyword-matched conversations, then generate and post personalized replies to drive engagement and conversion. Target audience: e-commerce, crypto, indie hackers, solopreneurs, and small businesses. Primary differentiator: fully autonomous AI agents with credit-based pricing starting at $0/mo.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| AI Agent Deployment | Configure autonomous agents with keywords, brand context, and target platforms | UI-only |
| Keyword-Based Discovery | Agents scan Twitter/X and Reddit for conversations matching specified keywords | UI-only |
| AI Reply Generation | Crafts personalized replies connecting brand benefits to conversation context | UI-only |
| Trend Monitoring | Tracks keywords, evaluates key opinion leaders, monitors market trends | UI-only |
| Content Creation | Generate social media posts and content with AI assistance | UI-only |
| Browser Automation | All engagement executed via browser automation engine | UI-only |
| Analytics Dashboard | Track engagement metrics and agent performance | UI-only |

**All capabilities are UI-only.** No API, no webhooks, no Zapier/Make integrations, no MCP server. All configuration and monitoring happens in the Opencord AI web dashboard at opencord.ai/app.

## Pricing, limits & plan gates

All pricing best-effort as of research date. Annual billing prices shown — monthly billing is approximately 20% higher. No credit card required for free tier.

| Plan | Price (annual) | Monthly Credits | Approx. Replies/mo | Active Agents | Priority Queue |
|---|---|---|---|---|---|
| Free | $0/mo | 200k | ~8 | 1 | No |
| Basic | $8/mo | 750k | ~30 | 1 | No |
| Plus | $24/mo | 3M | ~150 | 3 | Yes |
| Pro | $48/mo | 6M | ~300 | 5 | Yes |
| Elite | $96/mo | 12M | ~600 | 7 | Yes |

- **Credit system**: Credits are consumed per AI processing cycle — finding opportunities, analyzing context, generating replies. The ~25k credits per reply ratio is approximate and varies with thread complexity.
- **No rollover**: Unused monthly credits do not carry over.
- **All plans include**: Browser automation engine, all agent features. Priority queue (Plus+) means faster processing.
- **30-day free trial**: New users get access to all features.

## Platform coverage

| Platform | Supported | Engagement type |
|---|---|---|
| Twitter/X | Yes | Replies to tweets, trend monitoring |
| Reddit | Yes | Thread replies, subreddit monitoring |
| LinkedIn | Not confirmed | May be limited or unavailable |
| YouTube | Not confirmed | May be limited or unavailable |
| Facebook | Not confirmed | May be limited or unavailable |

<!-- Primary confirmed platforms are Twitter/X and Reddit. Other platforms mentioned on review sites but not confirmed in official materials. -->

## Integrations

**No external integrations.** Opencord AI connects to social platforms via browser automation for posting.

- **No CRM connectors**
- **No webhook outputs**
- **No Zapier triggers/actions**
- **No Make modules**
- **No MCP server**
- **No CSV export documented**

The only data flow is:
- **Inbound**: Browser automation reads social feeds matching keywords
- **Outbound**: Posts replies to matched conversations
- **Analytics**: Dashboard-only — no export mechanism documented

## Agent setup workflow

### 1. Create an AI agent
- Define the agent's purpose (lead generation, brand awareness, community engagement)
- Set target platforms (Twitter/X, Reddit)

### 2. Configure keywords
- Add keywords that describe the problems your product solves
- Use problem-language, not product features (e.g., "struggling with cold email deliverability" not "email warmup tool")
- Start with 5-10 high-intent keywords; expand after validating quality

### 3. Set brand context
- Describe your product/service in the agent's profile
- Define tone and voice (helpful, conversational, not promotional)
- Provide examples of ideal reply style
- Emphasize value-first messaging — mention brand only when naturally relevant

### 4. Launch and monitor
- Agent begins scanning and engaging autonomously
- Monitor credit consumption rate — adjust keywords if burning too fast
- Review engagement metrics in the dashboard
- Refine keywords and brand context based on results

## Competitive positioning

| Feature | Opencord AI | ReplyGuy | Commentions | Devi | ParseStream |
|---|---|---|---|---|---|
| Twitter/X | Yes | Yes (auto-reply) | Yes | Yes | Yes |
| Reddit | Yes | Yes (semi-manual) | No | Yes | Yes |
| LinkedIn | Unconfirmed | Yes | Yes | Yes | Yes |
| YouTube | Unconfirmed | No | Yes | No | No |
| Facebook | Unconfirmed | No | No | Yes (groups) | No |
| Fully autonomous | Yes | Twitter only | Yes | No (Chrome ext) | Yes |
| Pricing model | Credits | Flat monthly | Daily mentions | Monthly | Flat monthly |
| Starting price | $0 (free) | $49/mo | $59/mo | $49.90/mo | $29/mo |
| API | No | No | No | No | No |

### When to choose Opencord AI
- You want a **free tier** to test automated engagement before committing
- Your primary channels are **Twitter/X and Reddit**
- You prefer **fully autonomous** agents (no manual review/posting)
- You're an **indie hacker, solopreneur, or e-commerce brand** on a tight budget
- You want **credit-based pricing** that scales with usage rather than flat fees

### When NOT to choose Opencord AI
- You need **LinkedIn or YouTube** engagement (use Commentions or Devi)
- You need **API access** or integration with CRM/automation tools (no API exists)
- You want **human review before posting** (no approval queue)
- You need **high-volume engagement** (600 replies/mo max even on Elite)
- You want **managed posting** with human-quality replies (use Replymer or ReplyAgent)
