<!-- Source: https://youscan.docs.apiary.io/ (JS-rendered — partial info from GitHub wrapper + knowledge base articles) -->

# YouScan API Reference

## Gaps

Full API docs are hosted at https://youscan.docs.apiary.io/ but are JS-rendered and could not be fully fetched. This reference is reconstructed from:
- GitHub wrapper: https://github.com/bzdvdn/youscan-wrapper
- Knowledge base: https://help.youscan.io/en/articles/2754452-how-to-use-youscan-api
- API gist: https://gist.github.com/0266db79615b2adcfb12d9a352444033

## Base URL

```
https://api.youscan.io/api/external
```

## Authentication

API key passed as query parameter on every request:

```
?apikey=YOUR_API_KEY
```

- Keys are generated in My Settings → API Key → Create
- Keys are shown once at creation — copy immediately
- Keys are scoped to the user — API returns only topics that user can access
- API access requires Unlimited plan (paid add-on)

```bash
# Quick auth test
curl "https://api.youscan.io/api/external/themes?apikey=YOUR_API_KEY"
```

## Endpoints

### Topics

| Method | Path | Description | Auth required |
|---|---|---|---|
| GET | `/themes` | List all monitoring topics | Yes |

**Response:**
```json
{
  "themes": [
    { "id": 41541, "name": "Coca-cola" },
    { "id": 41542, "name": "Pepsi" }
  ]
}
```

### Tags

| Method | Path | Description | Auth required |
|---|---|---|---|
| GET | `/themes/{topicId}/tags` | List tags for a topic | Yes |
| POST | `/themes/{topicId}/tags` | Create a tag | Yes |

**Create tag params:** `name` (string), `note` (string), `color` (string)

### Mentions

| Method | Path | Description | Auth required |
|---|---|---|---|
| GET | `/themes/{topicId}/mentions` | List mentions with filters | Yes |

**Query parameters:**
- `from` (yyyy-MM-dd) — start date (required)
- `to` (yyyy-MM-dd) — end date (required)
- `sentiment` — filter by sentiment
- `exclude_sentiment` — exclude sentiment
- `sources` — filter by source
- `exclude_sources` — exclude sources
- `tags` — filter by tag
- `exclude_tags` — exclude tags
- `auto_categories` — filter by auto-category
- `exclude_auto_categories` — exclude auto-categories
- `starred` — filter starred mentions
- `tagged` — filter tagged mentions
- `processed` — filter processed mentions
- `deleted` — filter deleted mentions
- `spam` — filter spam mentions
- `size` — page size
- `skip` — offset for pagination
- `order_by` — sort order

### Statistics

All statistics endpoints require `apikey`, `from`, and `to` parameters.

| Method | Path | Description |
|---|---|---|
| GET | `/themes/{topicId}/statistics/sentiments` | Sentiment breakdown (positive/neutral/negative counts) |
| GET | `/themes/{topicId}/statistics/tags` | Tag distribution |
| GET | `/themes/{topicId}/statistics/words` | Word cloud data |
| GET | `/themes/{topicId}/statistics/regions/sentiments` | Sentiment by region |
| GET | `/themes/{topicId}/statistics/sources/sentiments` | Sentiment by source |
| GET | `/themes/{topicId}/statistics/sources/regions/sentiments` | Source × region sentiment matrix |
| GET | `/themes/{topicId}/statistics/histogram` | Mention volume over time |
| GET | `/themes/{topicId}/statistics/trends` | Trend data |
| GET | `/themes/{topicId}/statistics/genders` | Gender distribution |
| GET | `/themes/{topicId}/statistics/ages` | Age distribution |
| GET | `/themes/{topicId}/statistics/links` | Top shared links |
| GET | `/themes/{topicId}/statistics/authors` | Top authors |
| GET | `/themes/{topicId}/statistics/publicationPlaces` | Publication places |

**Example sentiment response:**
```json
{
  "sentiments": [
    { "name": "positive", "count": 48 },
    { "name": "neutral", "count": 119 },
    { "name": "negative", "count": 25 }
  ]
}
```

## Pagination

Offset-based using `skip` and `size` parameters on the mentions endpoint:

```bash
# First page (50 results)
curl "https://api.youscan.io/api/external/themes/41541/mentions?apikey=KEY&from=2026-04-01&to=2026-04-30&size=50&skip=0"

# Second page
curl "https://api.youscan.io/api/external/themes/41541/mentions?apikey=KEY&from=2026-04-01&to=2026-04-30&size=50&skip=50"
```

## Rate limits

Not publicly documented. Implement exponential backoff on HTTP 429 responses:

```python
import time
import requests

def api_get(url, params, max_retries=5):
    for attempt in range(max_retries):
        resp = requests.get(url, params=params)
        if resp.status_code == 429:
            wait = 2 ** attempt
            time.sleep(wait)
            continue
        resp.raise_for_status()
        return resp.json()
    raise Exception("Max retries exceeded")
```

## Webhooks

Webhooks are configured per-topic and send mention data via HTTP POST.

**Setup:** Topic Settings → Integrations → Add Webhook → enter callback URL

**Auth:** Basic Auth via URL: `https://user:password@example.com/callback`

**Payload fields:**
- `topicId`, `topicName`, `mentionId`, `sourceName`
- `title`, `text`, `url`, `published`, `addedAt`
- `sentiment`, `language`, `postType`, `resourceType`, `spam`
- `likes`, `reposts`, `comments`, `engagement`
- `tags`, `imageUrl`
- `country`, `region`, `city`
- `author` (url, name, nickname, avatarUrl, subscribers)
- `channel` (url, name, avatarUrl, subscribers)
- `postId`, `parentPostId`, `discussionId`

**Trigger methods:**
- Automatic via Rules (filter by sentiment, source, tag, etc.)
- Manual send from mention stream

**Data restrictions:** Reddit (URL + metrics only), Twitter/X (no text/URLs/author), Quora (not available).

## Image Recognition API

YouScan also offers a separate Image Recognition API (https://youscanimagerecognition.docs.apiary.io/) for standalone image analysis. Documentation is JS-rendered — details not fully available. Contact YouScan for access.
