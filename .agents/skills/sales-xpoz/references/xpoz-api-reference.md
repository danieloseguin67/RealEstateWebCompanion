<!-- Source: https://github.com/xpozpublic/xpoz-mcp, https://www.xpoz.ai/social-data-api/, https://www.xpoz.ai/social-listening-api/ -->

# Xpoz API Reference

## Access methods

Xpoz exposes social data through three interfaces:

1. **MCP Server** (primary) — remote Model Context Protocol server at `https://mcp.xpoz.ai/mcp`
2. **TypeScript SDK** — `@xpoz/xpoz` on npm
3. **Python SDK** — `xpoz` on PyPI

There is no traditional REST API with documented HTTP endpoints. The MCP server IS the API — clients connect via streamable HTTP and call tools by name.

## Authentication

### MCP (OAuth 2.1)
- No API key needed
- Google OAuth triggered on first connection
- Single auth covers all platforms

### SDK (API Key)
- Obtain free key at `xpoz.ai/get-token` (no credit card)
- Pass as environment variable `XPOZ_API_KEY`
- Same key works for all platforms and tools

## MCP Server Configuration

```json
{
  "mcpServers": {
    "xpoz": {
      "type": "streamable-http",
      "url": "https://mcp.xpoz.ai/mcp"
    }
  }
}
```

Compatible with: Claude Desktop, Claude Code, Cursor, Windsurf, Cline, OpenAI Codex, ChatGPT.

## Tools (MCP endpoints)

### Twitter/X — 14 tools

| Tool | Description | Key parameters |
|---|---|---|
| `searchTwitterUsers` | Search users by name/bio | keywords, limit |
| `getTwitterUser` | Get user profile | username |
| `getTwitterUsersByKeywords` | Find users by topic | keywords, limit |
| `getTwitterUserConnections` | Followers/following | username, type |
| `getTwitterPostsByKeywords` | Search posts | keywords, limit, date_from, date_to |
| `getTwitterPostsByAuthor` | User's posts | username, limit |
| `getTwitterPostsByIds` | Fetch by ID | ids[] |
| `getTwitterPostComments` | Replies to post | post_id, limit |
| `getTwitterPostRetweets` | Retweet details | post_id, limit |
| `getTwitterPostQuotes` | Quote tweets | post_id, limit |
| `getTwitterPostInteractingUsers` | Engagers | post_id |
| `countTweets` | Count matching tweets | keywords, date_from, date_to |
| `checkOperationStatus` | Poll async ops | operation_id |
| `cancelOperation` | Cancel export | operation_id |

### Instagram — 9 tools

User search, profile retrieval, keyword-based user discovery, post search, connection retrieval, comment access, interaction analytics.

### Reddit �� 6 tools

User search, profile retrieval, keyword-based user discovery, post/comment search with subreddit and thread context.

### TikTok — coming soon

Listed but not fully available.

## Common parameters

| Parameter | Type | Description |
|---|---|---|
| `keywords` | string | Search terms (natural language or quoted phrases) |
| `limit` | number | Max results to return |
| `date_from` | string | Start date filter (ISO 8601) |
| `date_to` | string | End date filter (ISO 8601) |
| `forceLatest` | boolean | Bypass cache for fresh data |
| `sort_by` | string | Sort order (e.g., "recent", "engagement") |

## Pagination

Server-side pagination. For MCP, handled automatically. For SDKs, use the `limit` parameter — server returns paginated chunks. Exact cursor/offset mechanism not publicly documented.

## Rate limits

Not publicly documented. The MCP server handles rate limiting internally. SDK users should implement reasonable delays (1-2 seconds between requests recommended).

## Async operations (CSV export)

Large data exports run asynchronously:

1. Initiate export (returns `operation_id`)
2. Poll `checkOperationStatus` with the `operation_id`
3. When status is "completed", retrieve the result URL
4. Download CSV (up to 500K rows)

Use `cancelOperation` to abort a running export.

## Error handling

Not publicly documented. Expected patterns:
- OAuth failures → re-authenticate
- Rate limit exceeded → back off and retry
- Invalid parameters → error message in response
- Operation timeout → cancel and retry with smaller scope

## SDKs

### TypeScript

```typescript
import { XpozClient } from '@xpoz/xpoz';

const client = new XpozClient({ apiKey: process.env.XPOZ_API_KEY });
await client.connect();

const results = await client.twitter.searchPosts({
  keywords: 'your brand',
  limit: 100
});

console.log(results.data.length);
await client.close();
```

### Python

```python
from xpoz import XpozClient

client = XpozClient(api_key=os.environ["XPOZ_API_KEY"])
results = client.twitter.search_posts(keywords="your brand", limit=100)
print(len(results.data))
```

## Gaps

- No publicly documented REST API endpoints (HTTP method + path format)
- Rate limit numbers not published
- Pagination cursor/offset mechanism not documented
- Error response schema not documented
- Webhook/push notifications: none — pull only
- TikTok tool specifications not available (coming soon)
- Instagram and Reddit tool parameter details not individually documented
