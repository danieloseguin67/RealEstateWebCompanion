<!-- Source: https://moosendapp.docs.apiary.io/ and https://github.com/moosend/phpwrapper -->
# Moosend API Reference

## Overview

REST API v3 at `https://api.moosend.com/v3/`. Authentication via API key as query parameter (`?apikey=YOUR_KEY`). JSON request/response bodies. No webhook subscription endpoint — use automation workflows with HTTP POST actions instead.

## Authentication

API key passed as a query parameter on every request:

```bash
curl "https://api.moosend.com/v3/lists.json?apikey=YOUR_API_KEY"
```

Find your API key: Moosend dashboard > Settings > API Key.

**Important**: The key goes in the URL query string, NOT in an Authorization header.

## Endpoints by category

### Campaigns API (~20 methods)

| Method | Path | Description |
|---|---|---|
| GET | `/v3/campaigns.json` | Get all campaigns (paginated) |
| GET | `/v3/campaigns/{id}/view.json` | Get campaign details |
| POST | `/v3/campaigns/create.json` | Create a draft campaign |
| PUT | `/v3/campaigns/{id}/update.json` | Update a draft campaign |
| DELETE | `/v3/campaigns/{id}/delete.json` | Delete a campaign |
| POST | `/v3/campaigns/{id}/clone.json` | Clone a campaign |
| POST | `/v3/campaigns/{id}/send.json` | Send a campaign |
| POST | `/v3/campaigns/{id}/send_test.json` | Send a test email |
| GET | `/v3/campaigns/{id}/stats.json` | Get campaign statistics |
| GET | `/v3/campaigns/{id}/stats/{type}.json` | Get activity by type (Sent, Opened, Clicked, Bounced, etc.) |
| GET | `/v3/campaigns/{id}/stats/links.json` | Get link click activity |

### Mailing Lists API (~10 methods)

| Method | Path | Description |
|---|---|---|
| GET | `/v3/lists.json` | Get all mailing lists (paginated) |
| GET | `/v3/lists/{id}/details.json` | Get list details with statistics |
| POST | `/v3/lists/create.json` | Create a mailing list |
| PUT | `/v3/lists/{id}/update.json` | Update a mailing list |
| DELETE | `/v3/lists/{id}/delete.json` | Delete a mailing list |
| POST | `/v3/lists/{id}/custom_fields/create.json` | Add a custom field to a list |
| PUT | `/v3/lists/{id}/custom_fields/{field_id}/update.json` | Update a custom field |
| DELETE | `/v3/lists/{id}/custom_fields/{field_id}/delete.json` | Delete a custom field |

### Subscribers API (~12 methods)

| Method | Path | Description |
|---|---|---|
| GET | `/v3/subscribers/{list_id}/view.json?Email={email}` | Get subscriber by email |
| GET | `/v3/subscribers/{list_id}/{subscriber_id}/view.json` | Get subscriber by ID |
| GET | `/v3/lists/{list_id}/subscribers/{status}.json` | Get subscribers by status (Subscribed, Unsubscribed, Bounced, Removed) |
| POST | `/v3/subscribers/{list_id}/subscribe.json` | Add a subscriber |
| POST | `/v3/subscribers/{list_id}/subscribe_many.json` | Add multiple subscribers |
| POST | `/v3/subscribers/{list_id}/unsubscribe.json` | Unsubscribe a member |
| POST | `/v3/subscribers/{list_id}/remove.json` | Remove a member |
| POST | `/v3/subscribers/{list_id}/remove_many.json` | Remove multiple members |
| PUT | `/v3/subscribers/{list_id}/update/{subscriber_id}.json` | Update subscriber |

### Segments API (~8 methods)

| Method | Path | Description |
|---|---|---|
| GET | `/v3/lists/{list_id}/segments.json` | Get all segments for a list |
| GET | `/v3/lists/{list_id}/segments/{segment_id}.json` | Get segment details |
| GET | `/v3/lists/{list_id}/segments/{segment_id}/subscribers.json` | Get subscribers in a segment |
| POST | `/v3/lists/{list_id}/segments/create.json` | Create a segment |
| PUT | `/v3/lists/{list_id}/segments/{segment_id}/update.json` | Update a segment |
| DELETE | `/v3/lists/{list_id}/segments/{segment_id}/delete.json` | Delete a segment |
| POST | `/v3/lists/{list_id}/segments/{segment_id}/criteria/add.json` | Add criteria to segment |
| PUT | `/v3/lists/{list_id}/segments/{segment_id}/criteria/{criteria_id}/update.json` | Update criteria |
| DELETE | `/v3/lists/{list_id}/segments/{segment_id}/criteria/{criteria_id}/delete.json` | Delete criteria |

## Pagination

Page-based pagination (1-indexed):

```
GET /v3/lists.json?apikey=KEY&Page=1&PageSize=100
```

Response includes:
```json
{
  "Code": 0,
  "Error": null,
  "Context": { ... },
  "Paging": {
    "PageSize": 100,
    "CurrentPage": 1,
    "TotalPageCount": 3,
    "TotalResults": 250
  }
}
```

Default PageSize: 10. Max PageSize: 500.

## Error responses

All responses use the same envelope:

```json
{
  "Code": 1,
  "Error": "Invalid API key",
  "Context": null
}
```

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Error (check Error field) |

HTTP status codes follow standard REST conventions (200, 400, 401, 404, 429, 500).

## Rate limits

Not publicly documented. If you receive 429 responses, implement exponential backoff starting at 1 second.

## SDKs

| Language | Repository | Notes |
|---|---|---|
| PHP | github.com/moosend/phpwrapper | Most complete — covers all 4 API categories |
| Java | github.com/moosend/javawrapper | Full API coverage |
| .NET | github.com/moosend/dotnetwrapper | Full API coverage |
| Python | No official SDK | Use `requests` library directly |
| JavaScript | No official SDK | Use `fetch` or `axios` directly |

## Gaps

- Full API documentation at apiary.io is JS-rendered — endpoint details captured from PHP SDK README
- Webhook payload schemas not documented (Moosend uses automation HTTP POST actions instead of traditional webhooks)
- Rate limit specifics (requests per minute/hour) not publicly documented
- Transactional email SMTP settings documented in dashboard only, not in API docs
- Automation API (create/manage automations programmatically) does not appear to exist — automations are UI-only
