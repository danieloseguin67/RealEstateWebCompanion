# SparkToro Platform Reference

## Overview

SparkToro is an audience intelligence tool founded by Rand Fishkin (Moz creator). It reveals where target audiences spend their attention online — which websites they visit, podcasts they listen to, YouTube channels they watch, subreddits they follow, and social accounts they engage with. Designed for marketers, content strategists, and agencies who need to discover distribution channels based on real audience behavior rather than guesswork.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| **Audience search** | Query by topic, hashtag, website, social account, or audience description. Returns demographic data, content consumption patterns, and affinity scores. | UI-only |
| **Demographics** | Age, gender, job titles, skills, education, employment data (Business+) | UI-only |
| **Social network analysis** | Which social networks the audience uses and at what rates vs. general population | UI-only |
| **Search keyword intelligence** | Keywords the audience searches on Google/Bing, trending terms | UI-only |
| **Content consumption mapping** | Top websites, podcasts, YouTube channels, subreddits the audience follows | UI-only |
| **Reddit tab** | Subreddit subscriptions and Reddit post content for the searched audience | UI-only |
| **Social accounts followed** | Social profiles the audience most follows across platforms | UI-only |
| **Interest mapping** | Topics of interest and AI tool usage patterns | UI-only |
| **Custom imports** | Upload your own audience data for analysis (Personal+) | UI-only |
| **Saved lists** | Save and organize audience research results (Personal+) | UI-only |
| **CSV export** | Export results to CSV for offline analysis (Personal+) | UI-only |
| **White-label reports** | Branded reports for client delivery (Agency only) | UI-only |
| **AI-informed advice** | AI-generated actionable suggestions based on results (Business+) | UI-only |
| **REST API** | Coming soon — on waitlist | Not yet available |
| **MCP server** | Coming soon — on waitlist | Not yet available |

**Key limitation:** Everything is UI-only today. No API, no webhooks, no Zapier/Make, no CRM connectors. The API and MCP server are in development but not yet launched.

## Pricing, limits & plan gates

| Feature | Free | Personal ($50/mo) | Business ($150/mo) | Agency ($300/mo) |
|---|---|---|---|---|
| Monthly reports | 5 | 50 | 500 | Unlimited* |
| Users | 1 | 1 | Up to 10 | Up to 100 |
| Top website results | 5 | 50 | 150 | 300 |
| Search keywords | -- | Top 50 | Top 150 | Top 300 |
| Social accounts | -- | Top 50 | Top 150 | Top 300 |
| Podcasts | -- | Top 10 | Top 150 | Top 300 |
| YouTube channels | -- | Top 10 | Top 150 | Top 300 |
| Reddit results | -- | Top 10 | Top 150 | Top 300 |
| Demographics | Basic (gender, age) | Limited | Full | Full |
| Employment/education data | -- | -- | Yes | Yes |
| Skills & interests | -- | -- | Yes | Yes |
| Email & social contacts | -- | -- | Yes | Yes |
| CSV exports | -- | Yes | Yes | Yes (up to 5,000 keywords) |
| AI-informed advice | -- | -- | Yes | Yes |
| Custom imports | -- | Yes | Yes | Yes |
| Unlimited lists | -- | Yes | Yes | Yes |
| White labeling | -- | -- | -- | Yes |

*\*Unlimited excludes programmatic/automated queries — accounts associated with automation may be suspended.*

**No refunds** for partial use. Monthly or annual billing, switch anytime with pro-rating. Cancel online, no phone required.

## Integrations

**Current state: no integrations.** SparkToro operates in complete isolation:

- No CRM connectors (Salesforce, HubSpot, etc.)
- No Zapier/Make/n8n
- No webhooks
- No API (coming soon, on waitlist)
- No MCP server (coming soon, on waitlist)

**Data extraction options:**
- **CSV export** (Personal+) — download website lists, social accounts, podcasts, YouTube channels, keywords
- **Manual copy-paste** — for Free plan users
- **Screenshots/PDF** — for white-label reports (Agency only)

## Data model

SparkToro doesn't expose a public API, so there's no formal data model. However, a report query returns these data objects:

<!-- Constructed from UI observations — verify against live API when available -->

```json
{
  "query": {
    "type": "audience_description",
    "value": "people interested in project management for freelancers"
  },
  "demographics": {
    "gender": {"male": 0.42, "female": 0.55, "other": 0.03},
    "age_ranges": {"18-24": 0.08, "25-34": 0.31, "35-44": 0.29, "45-54": 0.19, "55+": 0.13},
    "top_job_titles": ["Project Manager", "Freelance Consultant", "Operations Manager"],
    "top_skills": ["Project Management", "Agile", "Scrum"]
  },
  "websites": [
    {"domain": "asana.com", "affinity_score": 12.5, "audience_overlap_pct": 0.34}
  ],
  "podcasts": [
    {"name": "The Freelance Way", "affinity_score": 8.2}
  ],
  "youtube_channels": [
    {"name": "Keep Productive", "affinity_score": 6.7}
  ],
  "subreddits": [
    {"name": "r/freelance", "affinity_score": 15.1}
  ],
  "social_accounts": [
    {"handle": "@asabordeaux", "platform": "twitter", "affinity_score": 4.3}
  ],
  "search_keywords": [
    {"keyword": "best project management app", "search_volume": "high"}
  ]
}
```

**Affinity score** = how much more likely this audience is to follow/visit this source vs. the general population. Higher = more distinctive to this audience.

## Quick-start recipes

### Recipe 1: Find podcast sponsorship targets

**Trigger:** You want to sponsor podcasts that reach your target buyers.

**Steps:**
1. Go to SparkToro and enter an audience description (e.g., "SaaS founders interested in sales automation")
2. Click the **Podcasts** tab
3. Sort by affinity score (highest = most audience-specific)
4. Export to CSV (requires Personal+ plan)

**Manual workflow (no API available):**
```
1. Run query in SparkToro UI
2. Export podcast CSV
3. Open CSV → filter by affinity_score > 5.0
4. Research each podcast's sponsorship rates (manually)
5. Build outreach list in your CRM (manual entry or CSV import to CRM)
```

**Gotchas:**
- Podcast results capped at 10 on Personal, 150 on Business, 300 on Agency
- Affinity scores can be misleading for very small audiences — cross-reference with actual podcast download numbers
- SparkToro doesn't show podcast download counts or sponsorship rates — you'll need to research those separately

### Recipe 2: Build a content distribution plan

**Trigger:** You want to know where to publish content to reach a specific audience.

**Steps:**
1. Search for your target audience (e.g., "DevOps engineers")
2. Check the **Websites** tab for high-affinity publications to pitch guest posts
3. Check the **YouTube Channels** tab for collaboration or ad placement targets
4. Check the **Subreddits** tab for communities to engage in organically
5. Check **Search Keywords** for SEO content ideas

**Actionable output:**
```
Content distribution plan:
- Guest post targets: [top 5 websites by affinity]
- YouTube collaboration: [top 3 channels by affinity]
- Community engagement: [top 5 subreddits by affinity]
- SEO content topics: [top 10 keywords by search volume]
```

### Recipe 3: Competitive audience comparison

**Trigger:** You want to understand how your competitor's audience differs from yours.

**Steps:**
1. Search for your brand's audience (e.g., "people who follow @yourbrand")
2. Export the results as CSV
3. Search for your competitor's audience (e.g., "people who follow @competitor")
4. Export the results as CSV
5. Compare the two CSVs to find overlap and differences

**Key comparison points:**
- Which websites/podcasts/channels appear in one audience but not the other = differentiation opportunities
- Overlap in subreddits = communities where both brands compete for attention
- Demographic differences = potential positioning angles

**Gotchas:**
- Each search burns a report from your quota (2 reports for one comparison)
- Social account searches only work if the account has enough followers for SparkToro's data threshold

## Integration patterns

### CSV-to-CRM pipeline (manual)

Since SparkToro has no API, the only integration pattern is manual CSV:

1. Run your SparkToro query
2. Export to CSV (Personal+ required)
3. Clean and transform the CSV (remove low-affinity results, add notes)
4. Import into your CRM or spreadsheet

### Future API/MCP integration

SparkToro has announced a REST API and MCP server on their waitlist page. When available, this will enable:
- Programmatic audience queries
- Integration with Claude, Cursor, and other MCP-compatible tools
- Automated audience research pipelines

Monitor the waitlist at sparktoro.com/api for availability.

## SparkToro vs alternatives

| Dimension | SparkToro | Reddinbox | Brandwatch |
|---|---|---|---|
| **What it shows** | What audiences follow/consume (channels, podcasts, websites) | What audiences say (pain points, conversations, intent) | What people say about brands (mentions, sentiment) |
| **Best for** | Channel discovery, ad targeting, partnership identification | Idea validation, pain point discovery, market research | Brand monitoring, crisis detection, competitive intelligence |
| **Data type** | Consumption patterns (follows, visits) | Conversation-level text (posts, comments) | Mention-level text (posts, comments, articles) |
| **Pricing** | $50-300/mo | $39-65/mo | Enterprise (custom) |
| **API** | Coming soon | No | Yes (REST) |
| **Key gap** | Doesn't capture what people say, only what they follow | Doesn't show content consumption patterns | Not designed for audience discovery |
