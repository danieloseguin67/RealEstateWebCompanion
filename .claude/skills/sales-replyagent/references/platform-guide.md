# ReplyAgent Platform Reference

## Overview

ReplyAgent.ai is a Reddit marketing automation platform that monitors subreddits for high-intent conversations, generates AI comments, and posts them using professionally managed Reddit accounts. The key differentiator is managed accounts — users never risk their own Reddit accounts getting banned. Target audience: SaaS and B2B companies seeking Reddit lead generation and brand awareness.

**Not to be confused with** replyagent.com (a separate white-label CRM product).

## Capabilities & automation surface

| Capability | Description | Surface |
|---|---|---|
| Subreddit monitoring | 24/7 monitoring of target subreddits for relevant conversations | UI + API (Import) |
| AI comment generation | Contextual, human-like comments based on product description and thread context | UI + API (Import triggers generation) |
| Managed account posting | Posts via pre-warmed Reddit accounts with established karma/history | UI-only (managed by ReplyAgent) |
| Google-ranking post detection | Identifies Reddit posts that rank on Google search results | UI-only |
| Manual approval workflow | Review and approve/edit AI drafts before posting | UI + API (Approve) |
| UTM tracking | Attach UTM parameters to track conversions from Reddit engagement | UI-only (configuration) |
| Daily email digests | Curated post recommendations delivered via email | UI-only (email delivery) |
| Anti-spam protections | Rate limiting (max 5 comments/account/day), smart timing during peak hours | Automatic |

## Pricing, limits & plan gates

<!-- Best-effort from research — verify current pricing at replyagent.ai -->

| Item | Details |
|---|---|
| **Pricing model** | Pay-per-post (not subscription) |
| **Comment cost** | $3 per successfully posted comment |
| **Post cost** | $6 per post |
| **Free trial** | $10 in credits (no expiration, no credit card required) |
| **Warranty** | 30-day warranty — full refund if comment removed within 30 days |
| **Enterprise** | Custom pricing with volume discounts, dedicated success manager, custom AI training |
| **Rate limits** | Max 5 comments per managed account per day |

**Monthly cost estimation:**
- Light usage (5 comments/day): ~$450/month
- Moderate (10 comments/day): ~$900/month
- Heavy (20 comments/day): ~$1,800/month

## Integrations

| Integration | Direction | Details |
|---|---|---|
| Reddit (via managed accounts) | Write | Comments posted through ReplyAgent's account network |
| Email digests | Read | Daily curated post recommendations |
| UTM / Google Analytics | Read | Track conversions from Reddit engagement |
| REST API | Read/Write | Import posts, approve comments, list comments |

No Zapier, Make, MCP, or native CRM integrations.

## Data model

### Comment (preview state)

<!-- Constructed from docs — verify against live API -->

```json
{
  "id": "comment_abc123",
  "product_id": "prod_xyz",
  "reddit_url": "https://reddit.com/r/SaaS/comments/abc123/title",
  "status": "preview",
  "generated_text": "Based on what you're describing, you might want to look at...",
  "subreddit": "SaaS",
  "thread_title": "Looking for a tool to automate Reddit marketing",
  "created_at": "2026-05-08T12:00:00Z"
}
```

### Comment (posted state)

<!-- Constructed from docs — verify against live API -->

```json
{
  "id": "comment_abc123",
  "status": "posted",
  "posted_at": "2026-05-08T14:00:00Z",
  "reddit_comment_url": "https://reddit.com/r/SaaS/comments/abc123/title/def456",
  "utm_url": "https://yoursite.com?utm_source=reddit&utm_medium=comment&utm_campaign=replyagent"
}
```

## Quick-start recipes

### Recipe 1: Import a batch of Reddit posts for comment generation

**Trigger:** You found relevant Reddit posts through your own monitoring and want ReplyAgent to generate comments for them.

**cURL:**
```bash
curl -X POST https://www.replyagent.ai/api/import \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "YOUR_PRODUCT_ID",
    "urls": [
      "https://reddit.com/r/SaaS/comments/abc123/looking-for-tool",
      "https://reddit.com/r/startups/comments/def456/need-recommendation"
    ]
  }'
```

**Python:**
```python
import requests

API_KEY = "YOUR_API_KEY"
PRODUCT_ID = "YOUR_PRODUCT_ID"

resp = requests.post(
    "https://www.replyagent.ai/api/import",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "product_id": PRODUCT_ID,
        "urls": [
            "https://reddit.com/r/SaaS/comments/abc123/looking-for-tool",
            "https://reddit.com/r/startups/comments/def456/need-recommendation",
        ],
    },
)
print(resp.json())
```

**Gotchas:** URLs must be Reddit post permalinks, not comment URLs. Posts appear in "preview" state — you still need to approve them before ReplyAgent posts the comment.

### Recipe 2: Approve a preview comment for posting

**Trigger:** You reviewed a generated comment in the dashboard or via API and want to approve it for posting.

**cURL:**
```bash
curl -X POST https://www.replyagent.ai/api/approve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "YOUR_PRODUCT_ID",
    "comment_id": "comment_abc123"
  }'
```

**Python:**
```python
resp = requests.post(
    "https://www.replyagent.ai/api/approve",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "product_id": PRODUCT_ID,
        "comment_id": "comment_abc123",
    },
)
print(resp.json())  # Comment queued for posting via managed account
```

**Gotchas:** Approved comments are posted by managed accounts on ReplyAgent's schedule (smart timing during peak US hours). You cannot choose the exact posting time.

### Recipe 3: List comments and filter by status

**cURL:**
```bash
curl https://www.replyagent.ai/api/comments?product_id=YOUR_PRODUCT_ID&status=posted \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Python:**
```python
resp = requests.get(
    "https://www.replyagent.ai/api/comments",
    headers={"Authorization": f"Bearer {API_KEY}"},
    params={"product_id": PRODUCT_ID, "status": "posted"},
)
for comment in resp.json().get("comments", []):
    print(f"{comment['subreddit']}: {comment['status']}")
```

## Integration patterns

### Custom monitoring → ReplyAgent pipeline

Use a dedicated monitoring tool (Octolens, Syften, CatchIntent) to find relevant Reddit posts, then push them to ReplyAgent via the Import endpoint for managed posting:

1. **Monitor** — tool of choice finds high-intent posts
2. **Filter** — your code scores/filters for relevance
3. **Import** — POST to ReplyAgent's Import endpoint
4. **Review** — check AI-generated comments in dashboard or via API
5. **Approve** — POST to Approve endpoint
6. **Track** — monitor UTM-tagged traffic in Google Analytics

### Handling the 30-day warranty

Track which comments get removed within 30 days. ReplyAgent automatically refunds credits for removed posts. Monitor your credit balance to reconcile. If removal rate exceeds 50%, review your subreddit targeting and comment quality.
