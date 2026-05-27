<!-- Source: https://developer.hiverhq.com/hiver-api (JS-rendered — partial info only) -->
<!-- Additional sources: https://help.hiverhq.com/hiver-api/hiver-api, https://zapier.com/apps/hiver/integrations -->

# Hiver API Reference

## Status

API docs are JS-rendered at developer.hiverhq.com and could not be fully fetched. The information below is assembled from search results, help center articles, and Zapier integration data.

## Authentication

- **Method**: API key (Bearer token)
- **Key generation**: Hiver Admin Panel → Developer section
- **Plan requirement**: Pro plan ($49/user/mo) or higher
- **Header**: `Authorization: Bearer YOUR_API_KEY`

## Base URL

<!-- Constructed from docs — verify against live API -->
```
https://api.hiverhq.com/v1/
```

## Known endpoints

### Inboxes

| Method | Path | Description |
|---|---|---|
| GET | `/inboxes` | List all shared inboxes |
| GET | `/inboxes/{inbox_id}` | Get inbox details |
| GET | `/inboxes/{inbox_id}/users` | List users in an inbox |
| GET | `/inboxes/{inbox_id}/users/search` | Search users in an inbox |
| GET | `/inboxes/{inbox_id}/tags` | List tags in an inbox |
| GET | `/inboxes/{inbox_id}/tags/search` | Search tags in an inbox |

### Conversations

| Method | Path | Description |
|---|---|---|
| GET | `/inboxes/{inbox_id}/conversations` | List conversations in an inbox |
| GET | `/inboxes/{inbox_id}/conversations/{conversation_id}` | Get a single conversation |
| PATCH | `/inboxes/{inbox_id}/conversations/{conversation_id}` | Update a conversation (status, assignee, tags) |

### Auth quick-start

```bash
# Simplest GET — list all inboxes
curl -X GET "https://api.hiverhq.com/v1/inboxes" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Webhooks

Hiver does not appear to have native outbound webhooks. However:

1. **Zapier triggers** function as webhook-like event notifications (10 triggers available — see platform-guide.md)
2. **Automation API calls** (Feb 2026): Hiver automations can now make outbound HTTP requests to any HTTPS endpoint with flexible auth (API Key, Bearer Token, Basic Auth, OAuth)

## Zapier surface (10 triggers)

| Trigger | Event |
|---|---|
| New Inbound Conversation | Email arrives in shared mailbox |
| New Outbound Conversation | Agent sends from shared mailbox |
| Conversation Updated | Status, assignee, contact, or tags modified |
| New Email Sent or Received | Any email activity in shared mailbox |
| New Note Created | Internal note added to conversation |
| New CSAT Rating Received | Customer satisfaction response (Pro+) |
| First Response SLA Due Soon | Approaching first response SLA breach |
| First Response SLA Overdue | First response SLA breached |
| Resolution SLA Due Soon | Approaching resolution SLA breach |
| Resolution SLA Overdue | Resolution SLA breached |

**Zapier actions**: Not publicly documented. Likely available via Hiver API through Zapier's "API Request" action on Pro plan.

## Gaps

- **Full endpoint list**: JS-rendered docs could not be fetched. The endpoints above are confirmed from help center and search results, but additional endpoints likely exist.
- **Pagination**: Pattern unknown (cursor vs offset). Test with standard query params.
- **Rate limits**: Not publicly documented. No rate limit headers confirmed.
- **Request/response schemas**: JSON shapes above are constructed from field descriptions — verify against live API.
- **Webhook payloads**: No native webhook payload schema available. Automation API call payloads are user-configured.
- **Error responses**: Shape unknown. Expect standard HTTP status codes (400, 401, 403, 404, 429, 500).
- **SDK**: No official SDK. Use standard HTTP libraries.

## Changelog

- **February 2026**: API Actions added to Automations — make outbound HTTP calls from automation rules with flexible auth.
