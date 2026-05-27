# Swan Platform Reference

## Overview

Swan is an AI GTM Engineer that converts natural language prompts into autonomous go-to-market workflows. Founded in 2024 by a 3-person team, it raised $6M (Link Ventures) and grew to 200+ customers. Positioned as a Clay alternative that consolidates enrichment, automation, and execution in one platform — no code, no flowcharts, just plain English prompts.

**Website**: https://getswan.com
**API Base URL**: `https://api.orchestra.inc/v1`
**API Docs**: https://swan.mintlify.app/

## Capabilities & automation surface

| Capability | Available | Access method |
|---|---|---|
| Natural language workflow builder | Yes | UI |
| Website visitor identification | Yes | UI (via RB2B/other integrations) |
| Contact/account enrichment | Yes | UI + API |
| Company research | Yes | UI + API |
| Person research | Yes | UI + API |
| Intent signal monitoring | Yes | UI |
| Lead qualification (ICP scoring) | Yes | UI |
| LinkedIn outreach sequences | Yes | UI |
| Email sequence automation | Yes | UI |
| CRM automation (HubSpot) | Yes | UI |
| Pipeline health monitoring | Yes | UI |
| Slack copilot | Yes | UI |
| Exclusion list management | Yes | UI + API |
| Pre-built AI agents | Yes | UI (6 agents) |
| Workflow creation via API | No | — |
| Webhooks | No | — |
| Zapier / Make | No | — |
| MCP server | No | — |

## Pricing, limits & plan gates

- **$240/month**: 4,000 credits, unlimited users, unlimited agents, unlimited LinkedIn senders
- **Credit model**: 1 credit per action (research, enrichment, CRM update, message, notification)
- **Credit rollover**: Unused credits roll over up to 2x your monthly allocation
- **Free trial**: 14 days
- **Additional credits**: Purchasable to upgrade plan
- **No per-user pricing**: Unlimited users included
- **API access**: Included in the plan

## Pre-built AI agents

| Agent | Name | What it does |
|---|---|---|
| Owly | LinkedIn Intent Outbound | Detects LinkedIn engagement → enriches → researches context → drafts personalized messages → sends connection requests |
| Doggo | Lookalike Outbound | Analyzes closed-won deals → finds similar companies → identifies buying committees → launches multi-channel campaigns |
| Zebro | Closed Lost Analysis | Analyzes loss reasons → extracts competitor intelligence → identifies process improvements → shares team insights |
| Craby | Meeting Prep | Researches contacts pre-call → reviews engagement history → generates talking points → briefs sales reps |
| Penguini | Pipeline Health | Monitors for stale deals → flags missing next steps → identifies at-risk opportunities → suggests recovery actions |
| Gatto | Website Visitors | Deanonymizes visitors → qualifies against ICP → routes to reps → launches personalized outreach |

## Integrations

**CRM**: HubSpot (deepest), Salesforce, Pipedrive, Attio
**Sales engagement**: Salesloft, Outreach
**Data providers**: Apollo, ZoomInfo, 6sense, RB2B
**Communication**: LinkedIn, Email, Slack
**Other**: Gong, Marketo, ActiveCampaign

## Data model

### Company research response
<!-- Source: https://swan.mintlify.app/ -->
```json
{
  "answerText": "Yes, Acme Corp uses HubSpot for their CRM",
  "answerNumber": null,
  "details": "Based on their job postings and technology stack analysis...",
  "sources": [
    {"url": "https://example.com/source1", "title": "Acme Corp careers"}
  ],
  "confidence": 8
}
```

### Person research response (enriched)
<!-- Source: https://swan.mintlify.app/ -->
```json
{
  "answerText": "Jane is the VP of Sales at Acme Corp",
  "answerNumber": null,
  "details": "She has been in this role since March 2024...",
  "sources": [
    {"url": "https://linkedin.com/in/jane", "title": "Jane Doe LinkedIn"}
  ],
  "confidence": 9,
  "person": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@acme.com",
    "phone": "+1-555-0100",
    "linkedinUrl": "https://linkedin.com/in/jane",
    "jobTitle": "VP of Sales",
    "country": "US",
    "city": "San Francisco",
    "jobStartDate": "2024-03-01",
    "companyName": "Acme Corp",
    "companyWebsite": "https://acme.com",
    "companyLinkedinUrl": "https://linkedin.com/company/acme"
  }
}
```

## API reference

**Auth**: API key via `x-api-key` header
**Base URL**: `https://api.orchestra.inc/v1`

### POST /research/company

Research a company using AI. Requires either `website` OR `name` + `location`.

```bash
curl -X POST https://api.orchestra.inc/v1/research/company \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Does this company use HubSpot?",
    "responseType": "BOOL",
    "company": {
      "website": "https://acme.com"
    }
  }'
```

```python
import requests

resp = requests.post(
    "https://api.orchestra.inc/v1/research/company",
    headers={"x-api-key": "YOUR_API_KEY", "Content-Type": "application/json"},
    json={
        "question": "What is this company's estimated headcount?",
        "responseType": "NUMBER",
        "company": {"website": "https://acme.com"}
    }
)
data = resp.json()
print(f"Answer: {data['answerNumber']} (confidence: {data['confidence']}/10)")
```

**Request fields:**
- `question` (string, required): The question to answer
- `responseType` (string, required): `BOOL`, `TEXT`, `NUMBER`, or `ENUM`
- `responseOptions` (array, optional): For `ENUM` type — list of allowed answers
- `context` (string, optional): Additional context to guide the research
- `company` (object, required): `name`, `website`, `location`, `numEmployees`, `annualRevenue`, `linkedinUrl`

**Response:** `answerText`, `answerNumber`, `details`, `sources[]`, `confidence` (1-10)

### POST /research/person

Research and enrich a person. Requires either `linkedinUrl` OR `firstName` + `lastName` + `company.name`.

```bash
curl -X POST https://api.orchestra.inc/v1/research/person \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is this person'\''s current role and how long have they been there?",
    "responseType": "TEXT",
    "person": {
      "linkedinUrl": "https://linkedin.com/in/janedoe"
    }
  }'
```

**Request fields:**
- `question`, `responseType`, `responseOptions`, `context` — same as company endpoint
- `person` (object, required): `email`, `firstName`, `lastName`, `phone`, `title`, `linkedinUrl`, `company` (nested: `name`, `website`)

**Response:** Same as company + enriched `person` object with `firstName`, `lastName`, `email`, `phone`, `linkedinUrl`, `jobTitle`, `country`, `city`, `jobStartDate`, `companyName`, `companyWebsite`, `companyLinkedinUrl`

### POST /exclusion/company

Add companies to the exclusion list for website visitor ID filtering.

```bash
curl -X POST https://api.orchestra.inc/v1/exclusion/company \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "domainsOrEmails": ["competitor.com", "partner@vendor.com"]
  }'
```

**Request:** `domainsOrEmails` (array, required, max 1,000 entries)
**Response:** `{"addedCount": 2}`

### Error responses

| Code | Meaning |
|---|---|
| 400 | Invalid request format |
| 401 | Missing or invalid API key |
| 500 | Server error |

### Rate limits

Not publicly documented. The API has no stated rate limit in the docs.

## Quick-start recipes

### Recipe 1: Qualify website visitors with Swan + HubSpot

1. Connect your visitor ID tool (RB2B or similar) to Swan
2. Set up the Gatto agent with your ICP prompt:
   > "When a website visitor from a B2B SaaS company with 50-500 employees visits our pricing page, research their company, find the VP of Sales or CRO, enrich their contact info, create a HubSpot contact, and notify #sales in Slack"
3. Swan autonomously: deanonymizes → researches → qualifies → enriches → creates CRM contact → alerts team
4. Each qualified visitor costs ~5 credits (research + enrichment + CRM update + Slack + qualification)

### Recipe 2: Lookalike prospecting from closed-won deals

1. Set up the Doggo agent:
   > "Analyze my last 20 closed-won deals in HubSpot. Find 50 similar companies by industry, size, and technology stack. For each, identify the buying committee (VP Sales, CRO, Head of Revenue). Enrich contacts and add to a HubSpot list called 'Lookalike Prospects'."
2. Swan analyzes patterns → finds similar companies → identifies decision-makers → enriches → populates CRM
3. Review the list before launching outreach sequences

### Recipe 3: Programmatic company research via API

```python
import requests

companies = ["https://acme.com", "https://example.io", "https://startup.co"]
api_key = "YOUR_API_KEY"

for website in companies:
    resp = requests.post(
        "https://api.orchestra.inc/v1/research/company",
        headers={"x-api-key": api_key, "Content-Type": "application/json"},
        json={
            "question": "What CRM does this company use and how many employees do they have?",
            "responseType": "TEXT",
            "company": {"website": website}
        }
    )
    data = resp.json()
    print(f"{website}: {data['answerText']} (confidence: {data['confidence']}/10)")
```

## Integration patterns

**CRM sync (HubSpot):** Swan creates and updates HubSpot contacts/companies automatically as part of workflow execution. No middleware required — native integration handles field mapping, deduplication, and lifecycle stage updates.

**Slack notifications:** Real-time alerts when workflows complete, high-intent leads are identified, or pipeline issues are flagged. Configure per-agent notification channels.

**Data provider orchestration:** Swan connects to Apollo, ZoomInfo, and other enrichment providers through its own aggregation layer. You don't need separate subscriptions to these tools — Swan handles the data fetching using your credits.

## Comparison with alternatives

| Feature | Swan | Clay | Relevvo | Gumloop |
|---|---|---|---|---|
| **Interface** | Natural language | Spreadsheet tables | Dashboard | Visual flowchart |
| **Execution** | Autonomous agents | Manual/triggered | Signal-based | Workflow builder |
| **Enrichment** | Built-in (via credits) | Waterfall providers | Built-in | Built-in (scraping) |
| **Outreach** | LinkedIn + email | Via integrations | Alerts only | Via integrations |
| **CRM integration** | Native (HubSpot primary) | Via webhooks/Zapier | Native | Via Zapier |
| **API** | 3 research endpoints | Full REST API | Limited | No |
| **Pricing** | $240/mo (4K credits) | $149-$800/mo | Contact sales | Free-$99/mo |
| **Best for** | Autonomous GTM execution | Granular data enrichment | Signal monitoring | Visual workflow building |
