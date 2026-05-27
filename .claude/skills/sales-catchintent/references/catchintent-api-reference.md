<!-- Source: https://catchintent.com/docs/getting-started/ , https://catchintent.com/docs/getting-started/quick-start/ , https://www.pulsemcp.com/servers/catchintent -->

# CatchIntent API & Integration Reference

## No Traditional REST API

CatchIntent does not expose a traditional REST API with documented endpoints. Programmatic access is provided through:

1. **MCP Server** (primary) — OAuth-based, compatible with Claude, Cursor, ChatGPT, and MCP-compatible tools
2. **Webhooks** (Pro+ plans) — push signal data to external endpoints on new signal events
3. **Native CRM integrations** (Pro+ plans) — one-click push to HubSpot, Pipedrive, Close, Lemlist, Instantly, Apollo

## MCP Server

**Authentication**: OAuth flow (browser-based, no API key required)

**GitHub**: https://github.com/CatchIntent/skills

**Capabilities** (based on PulseMCP listing):
- Query signals with natural language
- Manage listeners
- Access lead enrichment data
- Pipeline management

**Compatible clients**: Claude Desktop, Cursor, ChatGPT (with MCP support), any MCP-compatible tool

**Plan availability**: All plans (Basic, Pro, Enterprise)

**Setup**:
1. Add CatchIntent MCP server to your MCP client configuration
2. Complete OAuth flow in browser when prompted
3. Query naturally — no endpoint construction needed

## Webhooks (Pro+ only)

**Trigger**: New signal captured by a listener

**Delivery**: HTTP POST to configured endpoint URL

**Payload schema**: Not formally documented. Based on the signal data model, expect:
<!-- Constructed from docs — verify against live API -->
```json
{
  "event": "signal.created",
  "signal": {
    "signal_id": "sig_abc123",
    "platform": "reddit",
    "source_url": "https://reddit.com/r/...",
    "content": "...",
    "relevance_score": 87,
    "intent_type": "buying",
    "surfacing_rationale": "...",
    "author": { "username": "...", "platform_profile_url": "..." },
    "enrichment": {
      "email": "...",
      "linkedin_url": "...",
      "company": "...",
      "icp_score": 82,
      "warmth_score": "high"
    },
    "listener_id": "lst_xyz789",
    "created_at": "2026-05-06T14:30:00Z"
  }
}
```

**Configuration**: Set webhook URL in Settings > Integrations > Webhooks

**Retry behavior**: Unknown — test and monitor for delivery reliability

## Native CRM Integrations (Pro+ only)

| CRM/Tool | Integration type | Notes |
|---|---|---|
| HubSpot | Push leads | Creates contacts with signal context |
| Pipedrive | Push leads | Creates deals/contacts |
| Close | Push leads | Creates leads |
| Lemlist | Push to sequences | Adds leads to email sequences |
| Instantly | Push to campaigns | Adds leads to cold email campaigns |
| Apollo | Push leads | Adds to Apollo lists |

All CRM integrations are one-click manual push from the CatchIntent dashboard, not continuous auto-sync. For automated sync, use webhooks.

## Gaps

- No REST API endpoint documentation exists
- Webhook payload schema is not formally documented (constructed above from signal data model)
- MCP server tool list and parameters not publicly documented
- Rate limits not documented
- No pagination pattern (no API)
- No error response schema
- Webhook retry/failure behavior unknown
