<!-- Source: https://intercom.help/mentionlytics/en/articles/13544091-the-mentionlytics-api-v2 -->
<!-- Source: https://intercom.help/mentionlytics/en/articles/3746407-mentionlytics-api-parameters-fields -->
<!-- Source: https://intercom.help/mentionlytics/en/articles/2767566-the-mentionlytics-api -->

# Mentionlytics API Reference

## Overview

- **API version:** v2 (v1 deprecated)
- **Type:** REST, read-only
- **Base URL (v1, deprecated):** `https://app.mentionlytics.com/api/`
- **Base URL (v2):** `https://api.mentionlytics.com/v2/` (full docs at `https://api.mentionlytics.com/v2/docs`, requires auth)
- **Auth:** Dual-token system (Bearer + Refresh tokens)
- **Rate limit:** 100 requests/minute
- **Plan requirement:** Pro ($399/mo), Agency ($599/mo), or Enterprise ($950/mo)

## Authentication

### Getting tokens

1. Log in to Mentionlytics dashboard
2. Navigate to Settings > API / Access Tokens (v2) or Settings > User Setup > Get API Token (v1)
3. Copy Bearer Token and Refresh Token

### Using tokens

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://api.mentionlytics.com/v2/mentions"
```

### Token refresh

Bearer tokens expire after **1 hour**. Use the Refresh Token to get a new Bearer Token:

```bash
curl -X POST "https://api.mentionlytics.com/v2/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "YOUR_REFRESH_TOKEN"}'
```
<!-- Constructed from docs — verify against live API -->

## Endpoints

### GET /api/mentions

Retrieve detailed mention data.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| startDate | YYYYMMDD | No | First date of period (default: 7 days ago) |
| endDate | YYYYMMDD | No | Last date of period (default: today) |
| sentiment | string | No | Filter: `negative`, `positive`, `neutral` |
| page_no | integer | No | Page number, 0-indexed (default: 0) |
| per_page | integer | No | Results per page (default: 20, max: 10,000) |
| channels | URL-encoded array | No | Channel filter: `%5B1,2,3,4,5,7,99%5D` |
| commtracks | string | No | `all`, `brandmonitoring`, `competitors`, `leads` |
| country | string | No | 2-letter ISO country code (e.g., `US`, `GB`) |
| language | string | No | 2-letter language code (e.g., `en`, `es`) |
| ordering | string | No | `date` (default), `rank`, `engagement` |
| results_after | integer | No | Cursor-style pagination (prevents duplicates) |

**Response fields:**

| Field | Description |
|---|---|
| id | Mention ID |
| uid | Unique ID |
| ftext / body | Mention text content |
| body_html | HTML version of mention |
| mchannel | Channel name (e.g., "Twitter") |
| mchannel_id | Channel ID (see channel ID table) |
| profile_name | Author display name |
| screen_name | Author username/handle |
| profile_image_url | Author avatar URL |
| followers_count | Author's follower count |
| followers_at_post | Followers at time of posting |
| mEngagement | Engagement score |
| mRank | Relevance/authority rank |
| sentiment_text | `positive`, `negative`, `neutral` |
| emotion | Detected emotion (e.g., `joy`, `anger`) |
| pub_date | Publication date (YYYYMMDD) |
| pub_datetime | Publication datetime (ISO 8601) |
| campaign | Keyword tracker name |
| campaign_id | Keyword tracker ID |
| commtrack | Tracker type (`brandmonitoring`, `competitors`) |
| total_count | Total matching mentions |

### GET /api/aggregation

Retrieve aggregated metrics for a date range.

**Parameters:** Same as /api/mentions (startDate, endDate, channels, commtracks, country, language)

**Response fields:**

| Field | Description |
|---|---|
| mentions | Object: `{web, social, total}` |
| reach | Followers grouped by channel ID |
| unique_reach | Unique profile followers per channel |
| sentiment | Object: `{positive, negative, neutral}` |
| engagement.likes | Sum of likes and thumbs ups |
| engagement.comments | Comment count |
| engagement.shares | Sum of shares and retweets |
| engagement.views | View count |
| engagement.reviews_average | Average review rating |
| engagement.web_shares_on_social | Web content shared on social |

### GET /api/mentioners

Retrieve social profiles and pages that mentioned your keywords.

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| startDate | YYYYMMDD | 7 days ago | Start date |
| endDate | YYYYMMDD | today | End date |
| ordering | string | reach | `mentions`, `engagement`, `reach` |
| sortDesc | boolean | true | Sort descending |
| per_page | integer | 25 | Results per page (max: 500) |

**Response fields:**

| Field | Description |
|---|---|
| id, uu_id | Profile identifiers |
| name, screen_name | Display name and handle |
| description | Profile bio |
| country, lang_detected | Location and language |
| channel | Social platform |
| link | Profile URL |
| verified | Verification status |
| rank, global_rank | Authority scores |
| engagement_sum | Total engagement generated |
| followers_count | Follower count |
| mentions_count | Number of mentions of your keywords |
| neg_count, pos_count, neu_count | Sentiment breakdown |

### GET /api/top-keywords

Retrieve frequently occurring words and hashtags in your mentions.

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| ordering | string | mentions | `mentions`, `engagement`, `reach` |
| resultsLimit | integer | 100 | Max keywords to return |
| onlyHashtags | boolean | false | Return hashtags only |
| adjacentWords | integer | 0 | Phrase length: 1, 2, or 3 words (0 = mixed) |
| ignoreMainKeyword | boolean | true | Exclude your tracked keyword |

**Response fields:**

| Field | Description |
|---|---|
| keyword | The word, hashtag, or phrase |
| weight | Relevance weight |
| total_mentions | Mention count |
| total_engagement | Engagement count |
| total_reach | Reach count |
| total_positive, total_negative | Sentiment counts |
| top_country_code | Most common country |
| top_sentiment | Dominant sentiment |
| adjacentWords | Related phrases |

### GET /api/demographics/owned-media

Retrieve gender and age demographics of your audience.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| filterGenderByAge | string | Age bracket: `13-17`, `18-24`, `25-34`, `35-44`, `45-54`, `55-65`, `65+` |
| filterAgeByGender | string | `male`, `female`, `unspecified` |

**Response fields:**

| Field | Description |
|---|---|
| genders | Object: `{male, female, unspecified}` |
| ages | Object: `{13-17, 18-24, 25-34, 35-44, 45-54, 55-65, 65+}` |

### GET /api/top-countries

Retrieve country-based statistics.

**Parameters:** ordering (`mentions`/`engagement`/`reach`), sortDesc, usRestriction

**Response fields:** country_code, total_mentions, total_engagement, total_reach, total_positive, total_negative

### GET /api/top-languages

Retrieve language-based statistics.

**Parameters:** ordering (`mentions`/`engagement`/`reach`), sortDesc, usRestriction

**Response fields:** language_code, total_mentions, total_engagement, total_reach, total_positive, total_negative

## Channel ID Reference

| ID | Channel |
|---|---|
| 1 | Web (news, blogs) |
| 2 | Twitter/X |
| 3 | Facebook |
| 4 | YouTube |
| 5 | Instagram |
| 7 | Reviews |
| 99 | Others (Reddit, forums, etc.) |

## Rate Limits

- **100 requests per minute** across all endpoints
- No documented rate limit headers — implement client-side throttling
- Recommended: max 1 request/second with exponential backoff on errors

## Pagination

Two approaches:
1. **Offset-based:** `page_no=0&per_page=50`, increment page_no
2. **Cursor-based:** Use `results_after` parameter with the last mention's numeric ID — prevents duplicates when new mentions arrive between page fetches

## Known Limitations

- **Read-only** — no endpoints for creating keywords, updating mentions, or managing alerts
- **X/Twitter data restricted** — platform-imposed limitations may cause discrepancies between UI and API
- **LinkedIn data restricted** — same as above
- **Web News data** — may differ from dashboard due to platform restrictions
- **v1 deprecated** — still functional but won't receive updates. Use v2 for new integrations.

## Gaps

- Full v2 endpoint documentation requires authenticated access to `https://api.mentionlytics.com/v2/docs`
- Exact rate limit response headers unknown
- Refresh token expiration TTL not documented
- Error response format not documented (assumed standard HTTP status codes)
- Webhook/callback support: none documented
