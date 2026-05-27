# PainOnSocial Platform Reference

## Overview

PainOnSocial is an AI-powered Reddit pain point discovery tool that scans communities to find, score, and rank validated business problems. Built for solo founders and product teams doing idea validation. Primary differentiator: frequency/severity scoring of pain points with evidence (real quotes + permalinks), not just keyword monitoring.

## Capabilities & automation surface

| Capability | Description | Access |
|---|---|---|
| Pain Point Scanning | AI analysis of Reddit communities for problems | UI-only |
| Frequency/Severity Scoring | 0-100 ranking of pain points by how often and how intensely they're discussed | UI-only |
| Evidence Linking | Direct Reddit quotes, permalinks, upvote counts per finding | UI-only |
| AI Solution Generation | Actionable product/service ideas per pain point | UI-only |
| Target Audience Analysis | Demographics, behaviors, willingness to pay | UI-only |
| Community Browser | 800+ profession-based subreddit recommendations | UI-only |
| Company-specific Discovery | Find subreddits where a specific company is discussed | UI-only |
| PDF Export | Startup idea reports (Professional only) | UI-only |

**No API, no webhooks, no Zapier, no MCP.** Entirely browser-based. No programmatic access.

## Pricing, limits & plan gates

| Feature | Starter ($19/mo) | Professional ($49/mo) |
|---|---|---|
| Daily scans | 5 | 15 |
| Subreddits per scan | 2 | 5 |
| AI solution ideas per pain point | 2 | 10 |
| Evidence pieces per finding | Up to 10 | Up to 20-25 |
| PDF export | No | Yes |
| Pain Universe access | Limited | Unlimited |
| Priority support | No | Yes |

- **7-day free trial** on signup (no CC required based on research)
- **Daily limits reset every 24 hours** — unused scans don't roll over
- No annual discount mentioned
- No enterprise tier documented

## Integrations

**None.** PainOnSocial has no native integrations, no API, no webhooks, no Zapier/Make triggers, and no export beyond PDF (Professional only).

**Workaround options:**
- Copy/paste evidence quotes and pain point summaries manually
- Use PDF export (Professional) as a shareable artifact
- Screenshot or manual transcription for downstream tools

## Data model

PainOnSocial doesn't expose a data model via API. Based on the UI, the core objects are:

```json
// Pain Point (UI representation)
{
  "title": "Freelancers struggle to track time across multiple clients",
  "frequency_score": 82,
  "severity_score": 74,
  "evidence": [
    {
      "quote": "I spend 30 minutes every day just reconciling my time tracking across 3 tools",
      "subreddit": "r/freelance",
      "permalink": "https://reddit.com/r/freelance/comments/abc123/...",
      "upvotes": 47
    }
  ],
  "solutions": [
    "Unified time tracker with automatic client switching based on active app/window"
  ],
  "target_audience": {
    "who": "Freelance developers and designers managing 3+ clients",
    "willingness_to_pay": "Medium-High"
  }
}
```
<!-- Constructed from UI observation — no API exists to verify -->

## Community selection strategy

### Using the built-in browser

PainOnSocial offers 800+ profession-based community recommendations. Approach:

1. **Start with your ICP's profession** — use the profession browser to find where they hang out
2. **Add product-adjacent communities** — subreddits about the tool category you're entering (e.g., r/CRM, r/projectmanagement)
3. **Include complaint-heavy communities** — subreddits where people vent (r/sysadmin, r/cscareerquestions, r/freelance)
4. **Avoid mega-subreddits** — r/AskReddit, r/technology, r/business are too broad for actionable pain points

### Manual discovery (supplement PainOnSocial's browser)

1. Search Reddit for your topic → note which subreddits appear
2. Check subreddit sidebars for "Related communities"
3. Use `reddit.com/subreddits/search?q={topic}` for discovery
4. Verify activity: aim for subreddits with 10K-500K members (enough volume, not too generic)

## Scan workflow best practices

### Recipe 1: Initial idea validation scan

**Goal:** Discover if your problem space has real, frequent pain points

1. Select 2 subreddits matching your ICP (e.g., r/freelance + r/freelanceWriters)
2. Set timeframe to 30 days (balance of recency and volume)
3. Run scan
4. Sort results by frequency score — ignore anything below 50
5. For top 3 pain points, click evidence links and verify the quotes are genuinely frustrated (not just discussion)
6. Run a second scan with different subreddits to triangulate

### Recipe 2: Competitive gap analysis

**Goal:** Find problems competitors don't solve well

1. Identify subreddits where your competitor is discussed (use Company Discovery)
2. Scan those communities (30-90 day timeframe for sufficient volume)
3. Look for pain points that mention the competitor by name — these are unmet needs
4. Cross-reference with competitor feature pages to confirm they don't address it

### Recipe 3: Feature prioritization for existing product

**Goal:** Decide what to build next based on user pain

1. Scan subreddits where your users hang out (product-specific + profession-specific)
2. Set timeframe to 7 days for freshest complaints
3. Filter for pain points that relate to your product's domain
4. Compare severity scores to prioritize high-severity over high-frequency
5. Repeat weekly to track trend changes

## PainOnSocial vs alternatives

| Tool | Focus | Platforms | Pricing | Automation |
|---|---|---|---|---|
| **PainOnSocial** | Pain point scoring + idea generation | Reddit only | $19-49/mo | None (UI-only) |
| **Reddinbox** | Audience intelligence + intent scoring | Reddit, X, Bluesky, HN, YouTube, Facebook | $39-149/mo | None (UI-only) |
| **SparkToro** | Audience behavior (what they consume) | Social + web (aggregate data) | $50-300/mo | None (CSV export only) |
| **Threadlytics** | Reddit monitoring + competitive SOV | Reddit only | $15-79/mo | None (Enterprise API only) |
| **KeyMentions** | Reddit monitoring + auto-reply | Reddit only | Free-$79/mo | None (UI-only) |
| **Syften** | Keyword alerting + API access | 15+ platforms | €20-100/mo | API + webhooks + Zapier |

### When to choose PainOnSocial

- You're at the "what should I build" stage — need scored, ranked problems, not just mentions
- Your research is Reddit-focused (your audience lives there)
- You want AI solution brainstorming alongside discovery
- Budget is tight ($19/mo is cheaper than most alternatives)
- You don't need automation or integrations — manual research is fine

### When to choose something else

- **Need multi-platform coverage** → Reddinbox or Syften
- **Need ongoing monitoring/alerts** → Syften, Octolens, or Brand24
- **Need to respond to threads** → KeyMentions
- **Need API access for pipelines** → Syften or Octolens
- **Need audience demographics, not pain points** → SparkToro
