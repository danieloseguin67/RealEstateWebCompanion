<!-- Source: https://api.getaccept.com/v1 via https://github.com/getaccept/openapi -->

# GetAccept API Reference

## Base URL

`https://api.getaccept.com/v1`

All requests over SSL. All request and response bodies encoded in JSON.

## Authentication

Token-based Bearer authentication via `/auth` endpoint.

```bash
curl -X POST https://api.getaccept.com/v1/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your-password",
    "client_id": "optional-client-id",
    "entity_id": "optional-entity-id"
  }'
```

Response:
```json
{
  "access_token": "eyJ...",
  "expires_in": 86400
}
```

Use the token as: `Authorization: Bearer {access_token}`

**Plan gate**: API read access included with Enterprise. Read/write is an Enterprise add-on.

## Endpoints

### Authentication
| Method | Path | Description |
|---|---|---|
| POST | `/auth` | Token-based authentication |

### Attachments
| Method | Path | Description |
|---|---|---|
| GET | `/attachments` | List available attachments |

### Communication Templates
| Method | Path | Description |
|---|---|---|
| GET | `/communication-templates` | List templates (pagination, status filtering) |
| POST | `/communication-templates` | Create template (language support) |
| GET | `/communication-templates/{id}` | Get specific template |
| PUT | `/communication-templates/{id}` | Update template |

### Contacts
| Method | Path | Description |
|---|---|---|
| GET | `/contacts` | List contacts (filtering, sorting, search) |
| POST | `/contacts` | Create contact |
| DELETE | `/contacts/{id}` | Delete contact (restricted if linked to active/signed docs) |

### Custom Data
| Method | Path | Description |
|---|---|---|
| GET | `/custom-data/entity` | Get entity custom data configuration |
| POST | `/custom-data/entity` | Add custom property (string, number, boolean) |
| DELETE | `/custom-data/entity/{key}` | Remove custom property |

### Documents
| Method | Path | Description |
|---|---|---|
| GET | `/documents` | List documents (filter by status: draft, sent, viewed, reviewed, signed, rejected, recalled) |
| POST | `/documents` | Create and send document with recipients, attachments, pricing tables |
| GET | `/documents/{id}` | Get document details (optional: attachments, pages, statistics) |
| PUT | `/documents/{id}` | Update document (tags, value, dates, external ID) |
| DELETE | `/documents/{id}` | Delete document |
| GET | `/documents/external/{externalId}` | Get document by external identifier |

### Document Sub-resources
| Method | Path | Description |
|---|---|---|
| GET | `/documents/{id}/attachments` | List document attachments |
| POST | `/documents/{id}/attachments/{attachId}/upload` | Upload file to attachment |
| GET | `/documents/{id}/comments` | Get chat comments |
| POST | `/documents/{id}/comments` | Add comment (optional position data) |
| GET | `/documents/{id}/custom-data` | List custom properties (pagination) |
| POST | `/documents/{id}/custom-data` | Add property to document |
| GET | `/documents/{id}/custom-data/{cdId}` | Get specific property |
| PUT | `/documents/{id}/custom-data/{cdId}` | Update property value |
| DELETE | `/documents/{id}/custom-data/{cdId}` | Delete property |
| GET | `/documents/{id}/download` | Download as PDF, base64, or URL (10-min access window) |
| GET | `/documents/{id}/events` | Get activity timeline |
| POST | `/documents/{id}/expiration` | Update expiration (optional recipient notification) |
| GET | `/documents/{id}/fields` | Extract form fields (optional resolution) |
| POST | `/documents/{id}/recipients/{recId}/send` | Resend to specific recipient |
| POST | `/documents/{id}/seal` | Apply company seal |

## Pagination

List endpoints support pagination via query parameters. Exact pattern not fully documented in accessible sources — check OpenAPI spec at `github.com/getaccept/openapi` for details.

## Rate Limits

Not publicly documented. Monitor response headers for rate limit indicators.

## Error Responses

Standard HTTP status codes. Error body format:
```json
{
  "error": "error_type",
  "message": "Human-readable description"
}
```
<!-- Constructed from conventions — verify against live API -->

## Webhooks

GetAccept supports webhooks via Zapier triggers (Professional+):
- Document Created
- Document Sent
- Document Viewed (first view by recipient)
- Document Reviewed
- Document Signed (all parties)

Native webhook endpoint documentation not publicly accessible. Use Zapier or Make for event-driven workflows.

## Gaps

- Webhook payload schemas not publicly documented (use Zapier/Make instead)
- Rate limit details not available
- Pagination pattern details require checking OpenAPI spec
- Full request/response examples for all endpoints require Enterprise API access to test
