<!-- Source: https://clearcue.ai/changelog, https://clearcue.ai/blog/clearcue-claude-code-lead-gen-workflow -->

# Clearcue API Reference

## No Public REST API

Clearcue does not offer a public REST API. The primary programmatic interfaces are:

1. **MCP (Model Context Protocol)** — query and create signals, manage audiences, run Researcher
2. **Webhooks (Pro+)** — receive push notifications for new signal matches
3. **Native connectors** — direct integrations with CRM and outreach tools

## MCP Server

### Authentication
- **Method:** Personal access token (PAT)
- **Setup:** Contact Clearcue support to enable MCP access, then configure in your AI tool's settings
- **Token management:** Generated in Clearcue dashboard (rotation/expiry not documented)

### Supported AI tools
Claude Code, Claude Desktop, ChatGPT, Perplexity, Cursor

### Capabilities
| Action | Description |
|---|---|
| Query signals | Retrieve signal results with filters (date, type, person/company) |
| Create signals | Define new monitoring signals via natural language |
| Manage tags | Add/remove tags on leads directly from AI conversations |
| Query audiences | Filter and retrieve audience matches |
| Run Researcher | Get AI profile analysis on individual prospects |
| Access templates | Browse and use pre-configured signal templates |

### Response format
MCP returns data in markdown or CSV format. Configurable per query. Responses include `person_id` and `company_id` fields for cross-referencing.

### Example queries
```
"Show me recent signals from Clearcue"
"Show leads who engaged with competitor content this week"
"Create a signal tracking people who engage with [Competitor] posts"
"Cross-reference people interacting with both my and competitor content"
"Latest post engagers matching my Audience filters"
"What industries/roles are most common in 3-week engagement?"
"Tag these leads as 'warm-competitor'"
```

## Webhooks (Pro+ only)

### Setup
Configure webhook URL in Clearcue dashboard. Webhooks fire on:
- New lead detected matching a signal
- Signal stack threshold reached
- Engagement data received from integrated tools (e.g., HeyReach)

### Payload
<!-- Webhook payload schema not publicly documented -->
No public payload schema documented. Test with webhook.site to capture sample payloads.

### Retry behavior
Not documented. Build idempotent endpoints as a precaution.

## Native integrations

### CRM (Scale+ only)
- HubSpot, Salesforce, Pipedrive — bidirectional sync
- Push leads → CRM contacts/deals
- Pull CRM data → Clearcue audience enrichment

### Outreach tools (all plans with native connector)
- Salesloft, Outreach, HeyReach, Lemlist, Instantly, Clay
- Push: send Clearcue lists to campaigns
- Pull (HeyReach only): engagement data flows back as signals

### Notifications (all plans)
- Slack: real-time signal notifications to channels
- Email: digest or real-time alerts

## Gaps

- No REST API endpoints documented — MCP is the only query interface
- Webhook payload schema not publicly available
- MCP rate limits not documented
- Token rotation/expiry for PAT not documented
- No OpenAPI/Swagger spec available
- No Zapier/Make support
- No GitHub organization found
