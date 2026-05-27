# ReddGrow Platform Reference

## Overview

ReddGrow is a Reddit marketing platform focused on AI search visibility (GEO — Generative Engine Optimization). It identifies Reddit threads that AI platforms (ChatGPT, Perplexity, Gemini, Claude, Grok) already cite in their answers, then helps brands add relevant comments to those threads. Target audience: SaaS companies and marketing teams seeking to appear in AI-generated recommendations. 200+ customers.

## Capabilities & automation surface

| Capability | Description | Surface |
|---|---|---|
| AI Visibility Scanning | Scans 220+ countries daily, queries 4+ AI platforms, tracks which Reddit sources get cited, daily visibility reports, geographic variations | UI + email reports |
| Subreddit discovery | AI finds 10-100 relevant subreddits automatically, continuous re-scoring as community relevance shifts | UI-only |
| AI comment drafting | Generates human-sounding, on-brand Reddit comments using product context and thread analysis | UI + Chrome Extension |
| Chrome Extension posting | Drafting overlay directly in Reddit UI, human review before posting (~30 seconds per approved comment) | Chrome Extension |
| Brand monitoring | Alerts for brand/competitor mentions on Reddit across specified domains | UI + email/Slack alerts |
| Karma warmup | Systematic account warmup from 0% to 50% promotional safely, 6-step compliance checklist | UI-only |
| Community management | Subreddit moderation with AI assistance, knowledge base integration for support responses | UI-only |
| Analytics | Engagement tracking, reach metrics, citation growth monitoring, share-of-voice | UI-only |
| Agent API | Reddit intelligence endpoints for AI agent workflows — subreddits, posts, domains, users | API (REST) |
| CLI | Terminal access to Reddit data via `@reddgrow/cli` npm package | CLI |

## Pricing, limits & plan gates

<!-- Best-effort from research — verify current pricing at reddgrow.ai -->

| Feature | Starter ($59/mo) | Growth ($149/mo) | Pro ($299/mo) | Enterprise (custom) |
|---|---|---|---|---|
| Monthly comments | 150 | 450 | 750 | Custom |
| AI prompts | 10 | 100 | 200 | Custom |
| Domains tracked | 1 | 3 | 5 | Custom |
| Subreddits monitored | 10 | 30 | 100 | Custom |
| Campaigns | 1 | 5 | 10 | Custom |
| AI Visibility | Yes | Yes | Yes | Yes |
| Chrome Extension | Yes | Yes | Yes | Yes |
| Brand Monitoring | Yes | Yes | Yes | Yes |
| Unlimited seats | Yes | Yes | Yes | Yes |
| Slack integration | No | Yes | Yes | Yes |

- 20% discount on annual billing
- 14-day free trial available
- API access: available on all plans (credit-based)

**Rate limits (API):** 60 requests/minute, 1,000 requests/hour. Simple lookups cost 1 credit; batch operations cost up to 5 credits.

## Integrations

| Integration | Direction | Plan required | Details |
|---|---|---|---|
| Chrome Extension | Write | All | Post AI-drafted comments directly on Reddit |
| Slack | Push | Growth+ | Brand monitoring alerts and notifications |
| Email alerts | Push | All | Daily visibility reports, brand mention alerts |
| REST API | Read | All | Reddit intelligence data (subreddits, posts, domains, users) |
| CLI | Read | All | Terminal access via `@reddgrow/cli` |

No Zapier, Make, MCP server, webhooks, or native CRM integrations.

## Data model

### Subreddit search result

<!-- Constructed from docs — verify against live API -->

```json
{
  "name": "SaaS",
  "subscribers": 125000,
  "description": "Discussion about SaaS businesses...",
  "relevance_score": 0.87,
  "rules": [
    {"title": "No self-promotion", "description": "..."}
  ]
}
```

### Domain mention

<!-- Constructed from docs — verify against live API -->

```json
{
  "domain": "example.com",
  "mentions": [
    {
      "subreddit": "SaaS",
      "post_title": "Looking for a tool to automate...",
      "post_url": "https://reddit.com/r/SaaS/comments/abc123/...",
      "mentioned_at": "2026-05-08T12:00:00Z"
    }
  ]
}
```

### User profile

<!-- Constructed from docs — verify against live API -->

```json
{
  "username": "example_user",
  "karma": 15230,
  "account_age_days": 1095,
  "post_history": [
    {
      "subreddit": "SaaS",
      "title": "Best CRM for startups?",
      "score": 42
    }
  ]
}
```

## Quick-start recipes

### Recipe 1: Monitor your domain mentions on Reddit

**Trigger:** Scheduled (daily cron)
**Steps:** Call the domain mentions endpoint, filter for new mentions, send to Slack

```bash
# Check domain mentions
curl -s -H "x-api-key: rg_your_key_here" \
  "https://api.reddgrow.ai/agent/domains/yourdomain.com/mentions" \
  | jq '.mentions[] | {subreddit, post_title, post_url}'
```

```python
import requests

API_KEY = "rg_your_key_here"
DOMAIN = "yourdomain.com"

resp = requests.get(
    f"https://api.reddgrow.ai/agent/domains/{DOMAIN}/mentions",
    headers={"x-api-key": API_KEY}
)
mentions = resp.json().get("mentions", [])
for m in mentions:
    print(f"r/{m['subreddit']}: {m['post_title']}")
    print(f"  {m['post_url']}")
```

**Gotcha:** Rate limit is 60 req/min. For daily monitoring, a single call per domain is sufficient.

### Recipe 2: Find relevant subreddits for your product

**Trigger:** One-time setup or periodic review
**Steps:** Search for subreddits by keyword, review rules, add to monitoring

```bash
# Search subreddits by keyword
curl -s -H "x-api-key: rg_your_key_here" \
  "https://api.reddgrow.ai/agent/subreddits/search?q=project+management" \
  | jq '.[] | {name, subscribers, relevance_score}'

# Check a subreddit's posting rules before engaging
curl -s -H "x-api-key: rg_your_key_here" \
  "https://api.reddgrow.ai/agent/subreddits/SaaS/rules" \
  | jq '.rules[] | {title, description}'
```

```python
import requests

API_KEY = "rg_your_key_here"

# Search for relevant subreddits
resp = requests.get(
    "https://api.reddgrow.ai/agent/subreddits/search",
    params={"q": "project management"},
    headers={"x-api-key": API_KEY}
)
for sub in resp.json():
    print(f"r/{sub['name']} ({sub['subscribers']} subscribers) — relevance: {sub['relevance_score']}")

# Check rules before engaging
rules_resp = requests.get(
    "https://api.reddgrow.ai/agent/subreddits/SaaS/rules",
    headers={"x-api-key": API_KEY}
)
for rule in rules_resp.json().get("rules", []):
    print(f"Rule: {rule['title']}")
```

**Gotcha:** Always check subreddit rules before adding to monitoring. Subreddits with strict no-promotion rules will get your comments removed.

### Recipe 3: Search Reddit posts by keyword (via CLI)

**Trigger:** Ad-hoc research or pipeline input
**Steps:** Install CLI, authenticate, search posts

```bash
# Install the CLI
npm install -g @reddgrow/cli

# Authenticate
reddgrow auth login

# Search posts
reddgrow posts search "best CRM for startups"

# Check if a URL was already posted to a subreddit
reddgrow subreddits check-url --subreddit SaaS --url "https://yourdomain.com/blog/crm-guide"
```

**Gotcha:** CLI uses the same credit system as the API. Each operation costs 1-5 credits depending on complexity.

## Integration patterns

### AI agent workflow

ReddGrow's API is designed for AI agent consumption. Typical pattern:

1. **Discover** — `GET /agent/subreddits/search` to find relevant communities
2. **Monitor** — `GET /agent/domains/{domain}/mentions` to track brand mentions
3. **Research** — `GET /agent/subreddits/{name}/posts` to read post feeds
4. **Validate** — `GET /agent/subreddits/{name}/check-url` to check if content was already shared
5. **Enrich** — `GET /agent/users/{username}` to understand who's posting

Feed results into your AI agent for analysis, then use the Chrome extension for human-reviewed posting.

### GEO (Generative Engine Optimization) workflow

1. **Scan** — AI Visibility Scanning identifies Reddit posts that AI platforms cite
2. **Match** — Filter by relevance to your brand; benchmark against competitors
3. **Draft** — AI generates contextual comments based on your product context
4. **Post** — Human reviews and posts via Chrome extension (~30 seconds per comment)
5. **Track** — Monitor citation count and share-of-voice growth over time

**Key insight:** Focus on threads AI platforms *already* cite rather than creating new threads. Existing citations indicate the thread has retrieval authority.
