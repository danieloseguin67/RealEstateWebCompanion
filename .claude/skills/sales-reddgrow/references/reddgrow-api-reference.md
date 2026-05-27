<!-- Source: https://docs.reddgrow.ai/docs -->

# ReddGrow API Reference

## Authentication

All requests require an API key passed in the `x-api-key` header. Keys are prefixed with `rg_` and created at **Settings > API Keys** in the ReddGrow dashboard (app.reddgrow.ai).

```bash
curl -H "x-api-key: rg_your_key_here" https://api.reddgrow.ai/agent/me
```

## Base URL

```
https://api.reddgrow.ai
```

## Rate limits

- **60 requests per minute**
- **1,000 requests per hour**
- Simple lookups cost 1 credit; batch operations cost up to 5 credits

**Retry strategy:** If you receive a 429 response, wait and retry after the period indicated. Use exponential backoff starting at 1 second.

## Endpoints

### Account

| Method | Path | Description | Credits |
|---|---|---|---|
| GET | `/agent/me` | Verify API key and check credit balance | 1 |

### Subreddits

| Method | Path | Description | Credits |
|---|---|---|---|
| GET | `/agent/subreddits/search` | Search subreddits by keyword | 1 |
| GET | `/agent/subreddits/{name}/rules` | Get posting rules for a subreddit | 1 |
| GET | `/agent/subreddits/{name}/posts` | Read post feed from a subreddit | 1-5 |
| GET | `/agent/subreddits/{name}/check-url` | Check if a URL was posted to a subreddit | 1 |

### Posts

| Method | Path | Description | Credits |
|---|---|---|---|
| GET | `/agent/posts/search` | Search all posts by keyword | 1-5 |

### Domains

| Method | Path | Description | Credits |
|---|---|---|---|
| GET | `/agent/domains/{domain}/mentions` | Track domain mentions across Reddit | 1-5 |

### Users

| Method | Path | Description | Credits |
|---|---|---|---|
| GET | `/agent/users/{username}` | Look up user profile, karma, post history | 1 |

## Request/response examples

### GET /agent/me

```bash
curl -H "x-api-key: rg_abc123" https://api.reddgrow.ai/agent/me
```

<!-- Constructed from docs — verify against live API -->

```json
{
  "authenticated": true,
  "credits_remaining": 850,
  "plan": "growth"
}
```

### GET /agent/subreddits/search?q=project+management

```bash
curl -H "x-api-key: rg_abc123" \
  "https://api.reddgrow.ai/agent/subreddits/search?q=project+management"
```

<!-- Constructed from docs — verify against live API -->

```json
[
  {
    "name": "projectmanagement",
    "subscribers": 98000,
    "relevance_score": 0.92
  },
  {
    "name": "SaaS",
    "subscribers": 125000,
    "relevance_score": 0.74
  }
]
```

### GET /agent/domains/{domain}/mentions

```bash
curl -H "x-api-key: rg_abc123" \
  "https://api.reddgrow.ai/agent/domains/yourdomain.com/mentions"
```

<!-- Constructed from docs — verify against live API -->

```json
{
  "domain": "yourdomain.com",
  "mentions": [
    {
      "subreddit": "SaaS",
      "post_title": "Looking for a project management tool",
      "post_url": "https://reddit.com/r/SaaS/comments/abc123/...",
      "mentioned_at": "2026-05-08T12:00:00Z"
    }
  ]
}
```

### GET /agent/users/{username}

```bash
curl -H "x-api-key: rg_abc123" \
  "https://api.reddgrow.ai/agent/users/example_user"
```

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

## CLI Reference

Install the CLI globally:

```bash
npm install -g @reddgrow/cli
```

### Commands

| Command | Description |
|---|---|
| `reddgrow auth login` | Authenticate with your API key |
| `reddgrow domains {domain} mentions` | Track domain mentions |
| `reddgrow posts search "{query}"` | Search Reddit posts |
| `reddgrow subreddits search "{query}"` | Search subreddits |
| `reddgrow subreddits {name} rules` | Get subreddit rules |
| `reddgrow subreddits {name} posts` | Read subreddit post feed |
| `reddgrow subreddits check-url --subreddit {name} --url {url}` | Check if URL was posted |
| `reddgrow users {username}` | Look up a user |

## Gaps

- Full request/response schemas not available (API docs are partially JS-rendered)
- Pagination pattern not documented — unclear if cursor, offset, or page-based
- Error response format not documented
- Webhook support not found — API appears read-only with no push capability
- Credit consumption rules beyond "1 for simple, up to 5 for batch" not detailed
