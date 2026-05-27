<!-- Source: https://www.fastmail.com/dev/ -->
<!-- Source: https://jmap.io/crash-course/index.html -->
<!-- Source: https://github.com/fastmail/JMAP-Samples -->

# Fastmail API Reference

## Base URL

`https://api.fastmail.com`

## Supported protocols

| Protocol | Use | Direction |
|---|---|---|
| JMAP | Email, contacts, masked email | Read + Write |
| IMAP | Email | Read |
| POP | Email | Read |
| SMTP | Email | Send |
| CardDAV | Contacts | Read + Write |
| CalDAV | Calendar | Read + Write |
| WebDAV | Files | Read + Write |

## Authentication

### API tokens (simplest for personal use)

Generated in Settings → Privacy & Security → Manage API tokens. Tokens start with `fmu1-`.

```
Authorization: Bearer fmu1-your-api-token
```

### App passwords (for non-JMAP protocols)

Created in Settings → Privacy & Security → Manage app passwords. Use with IMAP, SMTP, CardDAV, CalDAV, WebDAV.

### OAuth 2.0 (for production apps)

Authorization Code flow per RFC 6749, PKCE required (RFC 7636).

**Endpoints:**
- Authorization: `https://api.fastmail.com/oauth/authorize`
- Token exchange/refresh: `https://api.fastmail.com/oauth/refresh`
- Revocation: `https://api.fastmail.com/oauth/revoke`

**Authorization request parameters:**
- `client_id` — your app's client ID
- `redirect_uri` — must be HTTPS, private URI scheme (reverse domain, 1+ dot), or `http://localhost/`
- `response_type` — `"code"`
- `scope` — space-separated list of scopes
- `code_challenge` — SHA-256 PKCE challenge
- `code_challenge_method` — `"S256"`
- `state` — opaque random string for CSRF protection

**Authorization response:**
- `code` — authorization code (expires 10 minutes)
- `state` — must match your original state

**Token exchange (POST /oauth/refresh):**
```json
{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE",
  "client_id": "YOUR_CLIENT_ID",
  "redirect_uri": "YOUR_REDIRECT_URI",
  "code_verifier": "YOUR_PKCE_VERIFIER"
}
```

**Response:**
```json
{
  "access_token": "fmu1-...",
  "token_type": "bearer",
  "expires_in": 3600,
  "scope": "urn:ietf:params:jmap:core urn:ietf:params:jmap:mail",
  "refresh_token": "fmr1-..."
}
```

**Refresh (POST /oauth/refresh):**
```json
{
  "grant_type": "refresh_token",
  "refresh_token": "fmr1-..."
}
```
Returns new access_token AND new refresh_token. Old refresh token is invalidated.

**Revocation (POST /oauth/revoke):**
Immediately revokes all tokens associated with the grant.

## OAuth scopes

| Scope | Description |
|---|---|
| `urn:ietf:params:jmap:core` | Required for all JMAP operations |
| `urn:ietf:params:jmap:mail` | Read/write email |
| `urn:ietf:params:jmap:submission` | Send email |
| `urn:ietf:params:jmap:vacationresponse` | Manage vacation auto-replies |
| `urn:ietf:params:jmap:contacts` | Read/write contacts |
| `https://www.fastmail.com/dev/maskedemail` | Create/manage Masked Email aliases |

## JMAP session

Entry point for all JMAP operations. Returns server capabilities, account info, and endpoint URLs.

```
GET https://api.fastmail.com/jmap/session
Authorization: Bearer {token}
```

**Response (key fields):**
```json
{
  "accounts": {
    "u12345": {
      "name": "you@fastmail.com",
      "isPersonal": true,
      "accountCapabilities": {
        "urn:ietf:params:jmap:mail": {},
        "urn:ietf:params:jmap:submission": {},
        "https://www.fastmail.com/dev/maskedemail": {}
      }
    }
  },
  "primaryAccounts": {
    "urn:ietf:params:jmap:mail": "u12345",
    "urn:ietf:params:jmap:submission": "u12345"
  },
  "apiUrl": "https://api.fastmail.com/jmap/api/",
  "uploadUrl": "https://api.fastmail.com/jmap/upload/{accountId}/",
  "downloadUrl": "https://api.fastmail.com/jmap/download/{accountId}/{blobId}/{name}?type={type}",
  "capabilities": {
    "urn:ietf:params:jmap:core": {
      "maxSizeUpload": 50000000,
      "maxConcurrentUpload": 10,
      "maxCallsInRequest": 64,
      "maxObjectsInGet": 1000,
      "maxObjectsInSet": 1000
    }
  },
  "sessionState": "abc123"
}
```

## JMAP request format

All JMAP calls are POST to the `apiUrl` from the session response.

```json
{
  "using": ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
  "methodCalls": [
    ["MethodName", { "accountId": "...", ...args }, "callId"]
  ]
}
```

**Response:**
```json
{
  "methodResponses": [
    ["MethodName", { ...result }, "callId"]
  ],
  "sessionState": "abc123"
}
```

## Result references

Chain method calls in a single request without multiple round trips:

```json
["Email/get", {
  "accountId": "u12345",
  "#ids": {
    "resultOf": "a",
    "name": "Email/query",
    "path": "/ids"
  },
  "properties": ["id", "subject", "from", "receivedAt"]
}, "b"]
```

`#parameterName` tells the server to substitute the value from a previous method's result using a JSON Pointer path.

## Core mail methods

### Email/query
Find email IDs matching criteria.

**Filter properties:** `inMailbox`, `inMailboxOtherThan`, `before`, `after`, `minSize`, `maxSize`, `from`, `to`, `cc`, `bcc`, `subject`, `body`, `text` (searches all), `hasKeyword`, `notKeyword`, `hasAttachment`

**Sort properties:** `receivedAt`, `sentAt`, `size`, `from`, `to`, `subject`

### Email/get
Fetch email properties by ID.

**Key properties:** `id`, `blobId`, `threadId`, `mailboxIds`, `keywords`, `size`, `receivedAt`, `from`, `to`, `cc`, `bcc`, `replyTo`, `subject`, `sentAt`, `preview`, `textBody`, `htmlBody`, `attachments`, `bodyValues`

### Email/set
Create, update, or destroy emails.

### Email/changes
Get changes since a given state (for sync).

### Email/queryChanges
Get changes to a query result since a given state.

### EmailSubmission/set
Submit an email for delivery (sending).

### Mailbox/get, Mailbox/query, Mailbox/set
Manage mailboxes/folders.

### Thread/get
Get email threads.

### Identity/get
Get sender identities.

## Masked Email methods

**Capability:** `https://www.fastmail.com/dev/maskedemail`

### MaskedEmail/get
Retrieve masked email aliases.

### MaskedEmail/set
Create, update, or delete masked email aliases.

**Create properties:**
- `state` — `"pending"`, `"enabled"`, `"disabled"`, `"deleted"`
- `forDomain` — domain this alias is for (tracking)
- `description` — human-readable note
- `url` — associated URL
- `emailPrefix` — custom prefix (a-z, 0-9, underscore, max 64 chars, create-only)

**Server-set properties (immutable):**
- `id`, `email`, `createdAt`, `createdBy`

**Server-set (read-only):**
- `lastMessageAt`

**Rate limits apply** on MaskedEmail creation. Returns standard JMAP `rateLimit` SetError type.

## Push notifications

JMAP supports two push mechanisms:

### EventSource (SSE)
Connect to the EventSource endpoint from the session. Receives real-time state change notifications for all types. One persistent HTTP connection covers all mailboxes.

### WebPush (RFC 8030)
Register a push subscription for mobile-compatible notifications. No permanent connection required. Server pushes state changes to your push endpoint.

## CORS

JMAP APIs are CORS-enabled, allowing direct browser-to-API calls from web applications.

## Rate limits

Rate limits are enforced but specific numbers are not publicly documented. The `rateLimit` error type is returned when limits are exceeded. Implement exponential backoff for automated clients.

## Redirect URI requirements

- HTTPS on a claimed domain
- Private URI scheme (reverse domain notation with at least 1 dot)
- `http://localhost/` (arbitrary port allowed, `127.0.0.1` or `::1` substitutable)
- No fragments or path traversal

## Official resources

- API documentation: https://www.fastmail.com/dev/
- JMAP specification: https://jmap.io/
- JMAP crash course: https://jmap.io/crash-course/index.html
- Sample code (Python, JS, Perl, Lua): https://github.com/fastmail/JMAP-Samples
- RFC 8620 (JMAP core): https://www.rfc-editor.org/rfc/rfc8620
- RFC 8621 (JMAP mail): https://www.rfc-editor.org/rfc/rfc8621
- Community MCP server: https://github.com/jmhron/FastMailMCP
