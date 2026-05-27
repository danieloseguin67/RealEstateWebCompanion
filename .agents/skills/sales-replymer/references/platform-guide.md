# Replymer Platform Reference

## Overview

Replymer is a managed reply marketing service that monitors Reddit and X (Twitter) 24/7 for relevant conversations and publishes human-written replies recommending your product. The key differentiator is human-written, human-reviewed replies — not AI-only automation. Target audience: B2B SaaS companies, solo founders, and agencies seeking organic social selling without managing their own accounts.

## Capabilities & automation surface

| Capability | Description | Surface |
|---|---|---|
| 24/7 keyword monitoring | Scans Reddit and X for conversations matching configured keywords | API (GET /mentions) + UI |
| Human-written replies | Professional writers craft brand-voice-matched responses | UI (managed by Replymer team) |
| Internal review | Every reply reviewed by a human before publication | Automatic (Replymer-managed) |
| Negative keywords | Exclude irrelevant mentions using negative keyword lists | API (CRUD) + UI |
| SEO Replies | Targets Reddit posts ranking in Google's top 10 for configured keywords | API (GET /seo-replies, /seo-keywords) + UI |
| Google position tracking | Tracks which Google search positions your SEO Reply posts hold | UI + API |
| Project management | Create and manage multiple monitoring projects | API (full CRUD) + UI |
| Analytics & reporting | Mentions found, replies published, reply rate, keyword performance | API (GET /stats) + UI |
| Team management | Assign projects to team members | UI-only (Scale+ plans) |

## Pricing, limits & plan gates

<!-- Best-effort from research — verify current pricing at replymer.com/pricing -->

| Plan | Price | Replies/mo | Keywords | API rate limit | Team mgmt |
|---|---|---|---|---|---|
| **Free Trial** | $0 | Limited | Limited | 100/hr | No |
| **Starter** | $99/mo | 30 | 15 | 500/hr | No |
| **Growth** | $199/mo | 100 | 50 | 1,000/hr | No |
| **Scale** | $399/mo | 300 | Unlimited | Unlimited | Yes |
| **Scale Plus** | $999/mo | 750 | Unlimited | Unlimited | Yes |
| **Scale Elite** | $1,999/mo | 1,500 | Unlimited | Unlimited | Yes |

- Free trial available, no credit card required
- 7-day refund guarantee
- No annual contracts — month-to-month billing
- Yearly billing available (discount amount not published)
- Unused replies do NOT roll over

## Integrations

| Integration | Direction | Details |
|---|---|---|
| REST API | Read/Write | Full CRUD for projects, keywords, mentions, replies, analytics |
| Reddit | Write (managed) | Replies posted via Replymer's established accounts |
| X (Twitter) | Write (managed) | Replies posted via managed accounts |
| Email notifications | Read | Alert notifications for new mentions and replies |

No Zapier, Make, MCP, webhooks, or native CRM integrations.

## Data model

### Project

```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "proj_abc123",
  "title": "My SaaS Product",
  "domain": "example.com",
  "status": "active",
  "keywords": ["best CRM for startups", "CRM recommendation"],
  "negative_keywords": ["enterprise", "salesforce"],
  "created_at": "2026-01-15T10:00:00Z"
}
```

### Mention

```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "mnt_xyz789",
  "project_id": "proj_abc123",
  "source": "reddit",
  "keyword": "best CRM for startups",
  "url": "https://reddit.com/r/startups/comments/...",
  "status": "pending",
  "created_at": "2026-01-16T14:30:00Z"
}
```

### Reply

```json
<!-- Constructed from docs — verify against live API -->
{
  "id": "rpl_def456",
  "mention_id": "mnt_xyz789",
  "project_id": "proj_abc123",
  "content": "I've been using Example CRM for about 6 months...",
  "source": "reddit",
  "status": "published",
  "published_at": "2026-01-16T15:00:00Z"
}
```

## Quick-start recipes

### Recipe 1: Create a project and add keywords via API

**Use case**: Programmatically set up monitoring for a new product launch.

```bash
# Create a project
curl -X POST https://replymer.com/api/v1/projects \
  -H "X-API-Key: rply_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My SaaS Product",
    "domain": "mysaas.com"
  }'

# Add keywords to the project
curl -X POST https://replymer.com/api/v1/projects/proj_abc123/keywords \
  -H "X-API-Key: rply_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["best project management tool", "Trello alternative", "task management for teams"]
  }'

# Add negative keywords to filter noise
curl -X POST https://replymer.com/api/v1/projects/proj_abc123/negative-keywords \
  -H "X-API-Key: rply_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["enterprise", "free", "open source"]
  }'
```

```python
import requests

API_KEY = "rply_your_api_key_here"
BASE = "https://replymer.com/api/v1"
headers = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

# Create project
project = requests.post(f"{BASE}/projects", headers=headers, json={
    "title": "My SaaS Product",
    "domain": "mysaas.com"
}).json()

project_id = project["data"]["id"]

# Add keywords
requests.post(f"{BASE}/projects/{project_id}/keywords", headers=headers, json={
    "keywords": ["best project management tool", "Trello alternative"]
})
```

**Gotcha**: Keyword count is capped by plan — Starter allows 15 total across all projects.

### Recipe 2: Poll mentions and track reply performance

**Use case**: Build a custom dashboard that tracks mention volume and reply conversion rates.

```bash
# Get mentions for a project (with filters)
curl "https://replymer.com/api/v1/projects/proj_abc123/mentions?status=pending&source=reddit" \
  -H "X-API-Key: rply_your_api_key_here"

# Get published replies
curl "https://replymer.com/api/v1/projects/proj_abc123/replies" \
  -H "X-API-Key: rply_your_api_key_here"

# Get project stats for last 30 days
curl "https://replymer.com/api/v1/projects/proj_abc123/stats?period=30" \
  -H "X-API-Key: rply_your_api_key_here"
```

```python
import requests

API_KEY = "rply_your_api_key_here"
BASE = "https://replymer.com/api/v1"
headers = {"X-API-Key": API_KEY}

# Fetch 30-day stats
stats = requests.get(
    f"{BASE}/projects/proj_abc123/stats",
    headers=headers,
    params={"period": 30}
).json()

print(f"Mentions found: {stats['data']['mentions_found']}")
print(f"Replies published: {stats['data']['replies_published']}")
print(f"Reply rate: {stats['data']['reply_rate']}%")
```

**Gotcha**: No webhooks — you must poll. Respect rate limits (500/hr Starter, 1,000/hr Growth).

### Recipe 3: Manage SEO keywords and track Google rankings

**Use case**: Monitor which Reddit posts rank in Google for your target keywords.

```bash
# Add SEO keywords
curl -X POST https://replymer.com/api/v1/projects/proj_abc123/seo-keywords \
  -H "X-API-Key: rply_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["best CRM 2026", "CRM for small business"]
  }'

# Get SEO replies with Google ranking data
curl "https://replymer.com/api/v1/projects/proj_abc123/seo-replies" \
  -H "X-API-Key: rply_your_api_key_here"
```

**Gotcha**: SEO Replies is a separate feature from regular monitoring — you need separate SEO keywords.

## Integration patterns

### Polling pattern for mentions

Since Replymer has no webhooks, use a polling pattern:

1. Poll `GET /projects/:id/mentions?status=pending` every 15-60 minutes
2. Process new mentions (log, alert, or route to internal tools)
3. Track `mention_id` to avoid reprocessing
4. Respect rate limits — add exponential backoff on 429 responses

### Multi-project analytics aggregation

For agencies managing multiple clients:

1. `GET /projects` to list all active projects
2. For each project, `GET /projects/:id/stats?period=30`
3. Aggregate into a unified reporting dashboard
4. Use project metadata (title, domain) to segment by client

### Error handling

All errors follow the shape:
```json
{
  "success": false,
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Try again in 42 seconds."
}
```

Common error codes: `unauthorized` (401), `forbidden` (403), `not_found` (404), `bad_request` (400), `rate_limit_exceeded` (429), `plan_limit` (403), `internal_error` (500).
