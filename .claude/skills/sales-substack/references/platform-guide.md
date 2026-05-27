# Substack Platform Reference

## Overview

Substack is a newsletter publishing platform that lets creators publish free and paid content with zero upfront cost — Substack takes 10% of paid subscription revenue plus Stripe processing fees. Primary differentiator: built-in discovery network (Substack Network, Notes, Recommendations) that no other newsletter platform matches for organic subscriber growth.

## Capabilities & automation surface

| Capability | Description | Automation surface |
|---|---|---|
| **Publishing** | Rich text editor, scheduling, sections, podcast hosting, custom domains | **UI-only** — no API for creating/managing posts |
| **Paid subscriptions** | Monthly/annual pricing, founding member tier, gift subscriptions, free trials | **UI-only** — Stripe handles payments but no API to manage subscriptions |
| **Notes** | Social feature — short posts, restacks, likes, comments across Substack | **UI-only** |
| **Discovery network** | Cross-publication recommendations, Substack Network, categories | **UI-only** |
| **Subscriber management** | Import/export CSV, subscriber list, email stats | **UI-only** — CSV export is the only data extraction method |
| **Analytics** | Opens, clicks, subscriber growth, revenue, post performance | **UI-only** |
| **Custom domain** | Map your domain to your Substack publication | **UI-only** |
| **Podcast** | Audio hosting built into posts | **UI-only** |
| **RSS feed** | Auto-generated at `{publication}.substack.com/feed` | **Read-only** — consumable by any RSS reader or automation tool |

## Pricing, limits & plan gates

Substack has no tiered plans — everyone gets the same features.

| Item | Cost |
|---|---|
| Publishing (free newsletter) | Free |
| Paid subscriptions enabled | 10% of gross revenue to Substack |
| Stripe processing | ~2.9% + $0.30 per transaction |
| Stripe Billing (recurring) | 0.5% per recurring charge |
| **Effective total take** | **~13-16% of gross revenue** |

**No feature gates** — all publishers get the same editor, analytics, Notes, podcast hosting, and custom domain support. The only cost trigger is enabling paid subscriptions.

**Fee comparison at scale:**
| Annual revenue | Substack fees (~14%) | Beehiiv Scale ($43/mo + Stripe ~3.2%) | Ghost(Pro) Publisher ($29/mo + Stripe ~3.2%) |
|---|---|---|---|
| $5,000/yr | ~$700 | ~$676 | ~$508 |
| $10,000/yr | ~$1,400 | ~$836 | ~$668 |
| $50,000/yr | ~$7,000 | ~$2,116 | ~$1,948 |
| $100,000/yr | ~$14,000 | ~$3,716 | ~$3,548 |

The crossover point where Substack becomes more expensive than alternatives is roughly $5,000-$7,000/yr in revenue.

## Integrations

Substack has **no native integrations** — no Zapier, no Make, no webhooks, no API for publishers.

**Workarounds:**

### Gmail notification → Zapier pipeline
1. Enable "New free subscriber" email notifications in Substack settings
2. In Gmail, create a filter for `from:noreply@substack.com` → apply label "Substack-new-sub"
3. In Zapier: trigger = "New Email Matching Search in Gmail" → filter by label → Formatter to extract subscriber email → Action (add to Kit, Mailchimp, etc.)
4. **Limitation**: Requires Google Workspace account (Gmail.com addresses no longer supported by Zapier as of Feb 2024)

### RSS feed → content syndication
- Feed URL: `https://{publication}.substack.com/feed`
- Use Zapier RSS trigger or Make RSS module to detect new posts
- Syndicate to social media, cross-post to blog, trigger notifications

### CSV export → manual sync
- Settings > Subscribers > Export — downloads CSV with email, subscription status, join date
- Import into any ESP for batch operations

### Unofficial API (reverse-engineered — use at your own risk)

Community-maintained wrappers exist but are not officially supported:

**Python:** `pip install substack-api` ([GitHub](https://github.com/NHagar/substack_api))
**TypeScript:** `npm install substack-api` ([GitHub](https://github.com/jakub-k-slys/substack-api), [Docs](https://substack-api.readthedocs.io/))

These use reverse-engineered endpoints and may break without notice.

## Data model

Substack has no official API, so the data model below is based on the unofficial/reverse-engineered endpoints.

### Publication search
<!-- Source: https://www.substackexplorer.com/api-docs -->
```
GET https://substack.com/api/v1/publication/search?query=tech&page=0&limit=10

Headers:
  User-Agent: Mozilla/5.0
  Accept: application/json
  Origin: https://substack.com
  Referer: https://substack.com/discover
```

<!-- Constructed from docs — verify against live API -->
```json
{
  "publications": [
    {
      "id": 123456,
      "name": "Tech Newsletter",
      "subdomain": "technews",
      "custom_domain": "technews.com",
      "author_name": "Jane Doe",
      "description": "Weekly tech analysis",
      "subscriber_count_estimate": "10K-50K",
      "logo_url": "https://substackcdn.com/image/...",
      "hero_image": "https://substackcdn.com/image/..."
    }
  ],
  "page": 0,
  "total": 42
}
```

### Post data
```
GET https://{publication}.substack.com/api/v1/posts/{post_slug}

Headers:
  Accept: application/json
  User-Agent: Mozilla/5.0
```

<!-- Constructed from docs — verify against live API -->
```json
{
  "id": 789012,
  "title": "Welcome Post",
  "slug": "welcome-post",
  "subtitle": "Getting started",
  "post_date": "2026-01-15T10:00:00.000Z",
  "type": "newsletter",
  "audience": "everyone",
  "body_html": "<p>Post content...</p>",
  "word_count": 1200,
  "reactions": {"heart": 45},
  "comment_count": 12,
  "canonical_url": "https://technews.substack.com/p/welcome-post"
}
```

### RSS feed
```
GET https://{publication}.substack.com/feed
```
Standard RSS 2.0 feed with title, description, pubDate, link, and full content in `<content:encoded>`.

## Quick-start recipes

### Recipe 1: Sync new Substack subscribers to Kit via Gmail + Zapier

**Use case:** Automatically add every new Substack subscriber to your Kit email list for advanced automation.

**Prerequisites:** Google Workspace email, Zapier account, Kit account

**Steps:**
1. In Substack: Settings > Notifications > enable "New free subscriber" emails
2. In Gmail: Create filter `from:noreply@substack.com subject:"new free subscriber"` → Apply label `substack-new-sub`
3. In Zapier: New Zap
   - Trigger: Gmail > New Email Matching Search > `label:substack-new-sub`
   - Action: Formatter > Extract Pattern > extract email from body
   - Action: Kit > Add Subscriber to Form > map extracted email

**Gotcha:** Zapier Gmail trigger requires Google Workspace (not personal Gmail). If you only have personal Gmail, use Make.com instead (still supports personal accounts).

### Recipe 2: Monitor Substack post performance with Python

**Use case:** Pull post metrics for a dashboard or analytics pipeline.

```bash
pip install substack-api
```

```python
# WARNING: Uses unofficial API — may break without notice
import requests

PUBLICATION = "your-publication"
SLUG = "your-post-slug"

url = f"https://{PUBLICATION}.substack.com/api/v1/posts/{SLUG}"
headers = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0"
}

resp = requests.get(url, headers=headers)
post = resp.json()

print(f"Title: {post['title']}")
print(f"Words: {post.get('word_count', 'N/A')}")
print(f"Comments: {post.get('comment_count', 0)}")
print(f"Reactions: {post.get('reactions', {})}")
```

**Gotcha:** These endpoints are undocumented and rate-limited. Implement delays between requests and cache results. Substack may block aggressive scraping.

### Recipe 3: Cross-post Substack content to your blog via RSS

**Use case:** Automatically republish Substack posts on your own blog for SEO benefits.

```python
import feedparser

feed = feedparser.parse("https://your-publication.substack.com/feed")

for entry in feed.entries[:5]:
    print(f"Title: {entry.title}")
    print(f"Published: {entry.published}")
    print(f"Link: {entry.link}")
    # entry.content[0].value contains full HTML
    # Set canonical URL to Substack original to avoid duplicate content penalty
```

**Gotcha:** Always set the canonical URL on your blog post to point back to the Substack original, or vice versa. Publishing identical content on two URLs without canonical tags hurts SEO for both.

## Integration patterns

### Content syndication architecture
```
Substack (publish) → RSS feed → Zapier/Make RSS trigger
                                     ├── WordPress (create draft with canonical → Substack)
                                     ├── Twitter/X (share link)
                                     ├── LinkedIn (share link)
                                     └── Slack/Discord (notify channel)
```

### Subscriber sync architecture
```
Substack (new subscriber) → Email notification → Gmail filter → Zapier
                                                                  ├── Kit (add subscriber + tag "substack")
                                                                  ├── Google Sheet (log)
                                                                  └── Slack (notify #growth channel)
```

### Migration paths

**Substack → Ghost:**
- Export subscribers as CSV from Substack Settings > Subscribers
- In Ghost Admin: Members > Import > upload CSV
- Content: Use Ghost's official Substack importer (Settings > Migration > Import content from Substack)
- Redirect: Set up 301 redirects from Substack custom domain to Ghost

**Substack → Beehiiv:**
- Export subscribers as CSV from Substack
- In Beehiiv: Audience > Import > upload CSV
- Content: Beehiiv has a Substack import tool (Settings > Import)
- Note: Paid subscribers need manual Stripe migration — coordinate with both platforms' support

**Substack → Buttondown:**
- Export subscribers as CSV
- Buttondown offers free concierge migration — email support
- Content: Manual copy or use Buttondown's import tools
