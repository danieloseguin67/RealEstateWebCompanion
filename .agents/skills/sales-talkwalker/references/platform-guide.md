# Talkwalker Platform Reference

## Overview

Talkwalker is an enterprise social listening and consumer intelligence platform, acquired by Hootsuite in April 2024. It monitors 150M+ websites plus social channels, offering AI-powered sentiment analysis, image/video recognition for visual brand tracking, and real-time streaming. Best for global brands needing visual analytics, multi-language monitoring, and deep consumer intelligence. Hootsuite Listening is now powered by Talkwalker.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| **Social Listening** | Monitor brand/competitor/industry conversations across social, news, blogs, forums | API-accessible (Search API, Streaming API) |
| **Media Monitoring** | Track traditional + digital media coverage, print, broadcast | API-accessible (Search API) |
| **Social Benchmarking** | Share of Voice, competitive metrics, industry benchmarks | API-accessible (Summary API, Histogram API) |
| **Audience Insights** | Consumer behavior, conversation clusters, demographics | UI-only |
| **Customer Feedback** | Aggregate and analyze customer opinions from reviews and social | API-accessible (Search API with source_type filter) |
| **Blue Silk AI** | Generative AI insights, peak detection, forecasting | UI-only (Yeti Agent is UI-only) |
| **Image Recognition** | Logo, object, and scene detection in images | API-accessible (Image API v2) |
| **LLM Insights** | Monitor brand mentions in AI assistant responses | UI-only |
| **Topic Management** | Create and manage monitoring topics/queries | API-accessible (Topic API) |
| **Source Panels** | Configure and manage source filters | API-accessible (Source panels API) |
| **Document Modification** | Update tags, sentiment, or delete documents | API-accessible (Modify documents API) |
| **Dashboards & Reports** | Visual dashboards, scheduled reports, IQ Apps | UI-only |

## Pricing, limits & plan gates

Talkwalker does not publish pricing. All plans require sales engagement and annual contracts.

| Feature | Core | Analyze | Business |
|---|---|---|---|
| Social listening & media monitoring | Yes | Yes | Yes |
| Blue Silk AI + AI Agent | Yes | Yes | Yes |
| LLM Insights | Yes | Yes | Yes |
| Custom dashboards & reports | Yes | Yes | Yes |
| Unlimited users | Yes | Yes | Yes |
| Non-sampled results volume | Base | 2x Core | 6x Core |
| Topics, filters, channels | Base | +25 over Core | 3x Analyze |
| Historical data | Standard | Standard | Extended |
| AI Agent questions | Standard | Standard | Expanded |
| Workspaces & governance | Standard | Standard | Expanded |

**Estimated pricing** (from third-party sources, not confirmed):
- ~$9,000-12,000/year (Core equivalent)
- ~$15,000-20,000/year (Analyze equivalent)
- ~$26,000+/year (Business equivalent)
- Enterprise/custom quotes available for larger deployments

**API access** requires contacting sales for a token — it is not self-serve. The `demo` token is testing-only (cats/dogs queries, no social data).

**API rate limits:**

| API | Rate limit |
|---|---|
| Search (quicksearch, outside project) | 240 calls/min |
| Search (inside project) | 60 calls/min |
| Histogram (outside project) | 60 calls/min |
| Histogram (inside project) | 30 calls/min |
| Document Import | 120 calls/min |
| Image Detection | 300 calls/min |

**API credit costs:**
- Search: 1 credit per result, minimum 10 per call
- Summaries: 20 credits each (requires hpp > 100)
- Twitter export: limited to 1.5M docs/month/account

## Integrations

| Integration | Direction | Notes |
|---|---|---|
| **Hootsuite** | Bidirectional | Native — Talkwalker powers Hootsuite Listening |
| **Zapier** | Read (triggers) | 8,000+ app connections listed on Zapier |
| **Cyclr** | Bidirectional | Low-code embedded integration connector |
| **Slack/Teams** | Push (alerts) | Alert delivery channels |
| **REST API** | Read/Write | Full programmatic access with access token |
| **Make** | Not available | No native Make modules found |
| **MCP** | Not available | No MCP server |

## Data model

### Document (mention/result)

<!-- Source: https://developer.talkwalker.com/docs/talkwalker-documents/fields -->

```json
{
  "url": "https://example.com/article",
  "published": 1714500000000,
  "title": "Brand X launches new product",
  "content": "Full article text up to 50,000 characters...",
  "lang": "en",
  "sentiment": 3,
  "reach": 15000,
  "engagement": 450,
  "rating": 8,
  "source_type": ["NEWS"],
  "post_type": ["TEXT"],
  "noise_level": 15,
  "word_count": 342,
  "tags_customer": ["campaign:q2-launch"],
  "tags_marking": ["reviewed"],
  "matched_query": "\"Brand X\" AND launch",
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "detections": [
        {"type": "logo", "confidence": 0.95, "position": {"top": 10, "left": 20, "right": 150, "bottom": 80}}
      ]
    }
  ]
}
```
<!-- Constructed from docs — verify against live API -->

**Key fields:**
- `sentiment`: integer -5 to 5 (negative to positive)
- `reach`: estimated audience size (>0)
- `engagement`: interaction count (>0)
- `noise_level`: 0-100 (higher = more likely noise)
- `source_type`: NEWS, BLOG, FORUM, TWITTER, FACEBOOK, INSTAGRAM, etc.
- `post_type`: TEXT, IMAGE, VIDEO (defaults to TEXT)
- `tags_customer`: user/project-defined hierarchical tags
- `tags_marking`: manual user labels
- `tags_internal`: system-generated labels (read-only)

### Image detection response

<!-- Source: https://developer.talkwalker.com/docs/overview/image-api -->

```json
{
  "result_image": {
    "height": 600,
    "width": 800,
    "detections": [
      {
        "type": "logo",
        "id": "tw-img-12345",
        "confidence": 0.92,
        "position": {
          "top": 50,
          "left": 100,
          "right": 250,
          "bottom": 130
        }
      }
    ]
  }
}
```
<!-- Constructed from docs — verify against live API -->

## Quick-start recipes

### Recipe 1: Search for brand mentions (cURL + Python)

Search for mentions outside a project (quicksearch — blogs, forums, news only):

**cURL:**
```bash
curl 'https://api.talkwalker.com/api/v1/search/results?access_token=YOUR_TOKEN&q="Your Brand" AND launch&hpp=50&sort_by=engagement&sort_order=desc&time_range=7d&pretty=true'
```

**Python:**
```python
import requests

BASE = "https://api.talkwalker.com/api/v1"
TOKEN = "YOUR_TOKEN"

params = {
    "access_token": TOKEN,
    "q": '"Your Brand" AND launch',
    "hpp": 50,
    "sort_by": "engagement",
    "sort_order": "desc",
    "time_range": "7d",
}

resp = requests.get(f"{BASE}/search/results", params=params)
data = resp.json()

for result in data.get("result_mentions", {}).get("data", []):
    print(f"[{result['sentiment']}] {result['title']}")
    print(f"  URL: {result['url']}")
    print(f"  Engagement: {result['engagement']}")
```

**Gotchas:**
- Quicksearch returns blogs/forums/news only — no social media
- Max 500 results per call, offset+hpp capped at 500
- Costs 1 credit per result (min 10 credits per call)

### Recipe 2: Detect logos in an image

**cURL:**
```bash
curl 'https://api.talkwalker.com/api/v2/detect/images/logo?access_token=YOUR_TOKEN&image_url=https://example.com/photo.jpg'
```

**Python:**
```python
import requests

resp = requests.get(
    "https://api.talkwalker.com/api/v2/detect/images/logo",
    params={
        "access_token": "YOUR_TOKEN",
        "image_url": "https://example.com/photo.jpg",
    },
)

for detection in resp.json().get("result_image", {}).get("detections", []):
    print(f"Logo: {detection['id']} (confidence: {detection['confidence']:.0%})")
    print(f"  Position: {detection['position']}")
```

**Gotchas:**
- Image URL prefixes must be whitelisted by Talkwalker support — contact them first
- Rate limit: 300 calls/min
- Use `detect` param to filter for specific image IDs if you know what to look for
- Also supports `object` and `scene` detection types

### Recipe 3: Stream real-time mentions

**cURL:**
```bash
# Create a stream with rules
curl -X PUT 'https://api.talkwalker.com/api/v3/stream/s/my-brand-stream?access_token=YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"rules": [{"q": "\"Your Brand\"", "lang": "en"}]}'

# Connect to stream
curl 'https://api.talkwalker.com/api/v3/stream/s/my-brand-stream/results?access_token=YOUR_TOKEN'
```

**Python:**
```python
import requests
import json

BASE = "https://api.talkwalker.com/api/v3"
TOKEN = "YOUR_TOKEN"
STREAM_ID = "my-brand-stream"

# Create stream
requests.put(
    f"{BASE}/stream/s/{STREAM_ID}",
    params={"access_token": TOKEN},
    json={"rules": [{"q": '"Your Brand"', "lang": "en"}]},
)

# Connect and consume (persistent connection)
with requests.get(
    f"{BASE}/stream/s/{STREAM_ID}/results",
    params={"access_token": TOKEN},
    stream=True,
) as resp:
    for line in resp.iter_lines():
        if line:
            chunk = json.loads(line)
            if chunk.get("chunk_type") == "CT_RESULT":
                for mention in chunk.get("data", []):
                    print(f"New mention: {mention['title']}")
```

**Gotchas:**
- Rules support up to 50 operands each
- Manual tag updates don't transmit through streams
- Results arrive in crawler-found order, not chronological
- Each result costs 1 credit regardless of matched rule count
- Implement reconnection logic — streams can drop

## Integration patterns

### Batch export to data warehouse

1. Use project-scoped Search API: `/api/v1/search/p/{project_id}/results`
2. Paginate with `offset` + `hpp` (max hpp=500, offset+hpp <= 10,000)
3. Use `time_range` to scope to last 24 hours for daily batch
4. Parse `published` (millisecond timestamp) for partitioning
5. Watch for export restrictions: FB/IG aggregated only, Twitter ID+author+sentiment only

### Zapier integration

Talkwalker connects to Zapier for triggering workflows based on mentions. Use Zapier triggers to push alerts to Slack, CRM records, or spreadsheets. Note that the Zapier integration may not expose the full API surface — for complex pipelines, use the REST API directly.

### CRM sync pattern

1. Use Search API with topic filters to find high-intent mentions
2. Filter by sentiment (positive + neutral) and engagement thresholds
3. Extract author info and URL
4. Create/update CRM records via CRM API (HubSpot, Salesforce)
5. Tag processed mentions via Modify documents API to avoid duplicates
