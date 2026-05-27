# 11x.ai Platform Reference

## Overview

11x.ai provides AI "digital workers" for revenue operations — Alice (AI SDR for multi-channel outbound) and Mike/Julian (AI phone agent for inbound calls). Enterprise-focused, ~$5K/mo minimum with annual contracts. Backed by a16z and Benchmark. Notable controversy: TechCrunch investigation into customer list inflation, reported gross retention below 50%. Best for enterprise teams with budget who need autonomous multi-channel outbound including phone; consider cheaper alternatives (AiSDR, Salesforge) if email+LinkedIn is sufficient.

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| **Alice (AI SDR)** | Multi-channel outbound: email, LinkedIn, SMS, WhatsApp. AI-personalized sequences with follow-up | UI + API |
| **Mike/Julian (AI Phone Agent)** | Inbound call handling, 24/7 qualification, objection handling, meeting booking within 20 seconds | UI + API + Browser SDK |
| **Prospect Database** | 400M+ verified contacts with real-time search and signal detection | UI + API |
| **Website Visitor Tracking** | Identify companies visiting your site for trigger-based outreach | UI |
| **Signal & Trigger Detection** | Monitor job changes, funding, hiring patterns, tech stack changes | UI |
| **Deep Research Automation** | AI researches each prospect individually before outreach | UI (via Alice) |
| **Sequence Builder** | Multi-channel sequence with playbook support | UI |
| **Smart Reply** | AI reads and responds to prospect replies | UI |
| **Lead Routing** | Intelligent routing of qualified leads to the right rep | UI |
| **Analytics** | Campaign performance, deliverability metrics, call analytics | UI |
| **Deliverability Monitoring** | Mailbox health, domain reputation, sending reputation | UI |
| **Number Management** | Phone number rotation and spam detection for Mike/Julian | UI |
| **CRM Integration** | Bi-directional sync with Salesforce, HubSpot, Zoho via Ampersand OAuth | Native + API |
| **Slack Integration** | Notifications and updates in Slack channels | Native |

## Pricing, limits & plan gates

*Best-effort from third-party reports — 11x does not publish pricing. Verify with their sales team.*

| Metric | Estimated entry tier | Expanded tier |
|---|---|---|
| Monthly cost | ~$5,000 | $6,500-$8,500 |
| Annual cost | ~$60,000 | $78,000-$102,000+ |
| Contacts/month | ~3,000 | 5,000-7,500 |
| Emails/month | ~15,000 | Scales with contacts |
| Cost per contact | ~$1.67 | Varies |
| Contract | Annual (required) | Annual |
| Channels | Email + LinkedIn | Email + LinkedIn + SMS + WhatsApp |

**Not included in base pricing:**
- Phone dialer for outbound calls (Alice doesn't call) — need Orum, Nooks, or ConnectAndSell ($200-500/mo extra)
- Website visitor identification — unclear if included or add-on
- Custom enterprise features require negotiation

**Competitive pricing context:**
| Platform | Starting price | Contacts/mo | Channels |
|---|---|---|---|
| 11x.ai | ~$5,000/mo | ~3,000 | Email, LinkedIn, SMS, WhatsApp + phone (inbound) |
| AiSDR | $900/mo | ~1,200 messages | Email, LinkedIn |
| Salesforge (Agent Frank) | $499/mo | ~1,000 | Email only |
| Artisan (Ava) | Quote-based | 1,000-5,400+ | Email, LinkedIn |
| Reply.io (Jason AI) | Included with plans | Per-plan limits | Email, LinkedIn, calls, SMS |

**Enterprise compliance:** SOC-2 Type 2 certified, end-to-end encryption.

## Integrations

| Integration | Direction | Details |
|---|---|---|
| **Salesforce** | Bidirectional | Via Ampersand OAuth. Schedule calls, push call objects, write extracted data back to records. |
| **HubSpot** | Bidirectional | Via Ampersand OAuth. Same capabilities as Salesforce. |
| **Zoho CRM** | Bidirectional | Via Ampersand OAuth. Same capabilities as Salesforce. |
| **Slack** | 11x → Slack | Notifications on meetings booked, qualified leads, campaign updates. |
| **G2** | G2 → 11x | Intent signals from G2 buyer activity. |
| **API** | Bidirectional | One API across Alice and Julian. Trigger outbound, inbound, and meeting booking from any system. Push data in, pull outreach/transcripts/outcomes out. |
| **Webhooks** | 11x → External | Real-time event notifications. |

**No Zapier or Make modules documented.** Use the API for custom automation.

## API surface

### General API

11x provides one unified API across Alice and Julian digital workers.

**Capabilities:**
- Trigger outbound sequences from external events
- Push prospect data, product data, proprietary context
- Pull outreach records, call transcripts, research, replies, outcomes
- Webhook subscriptions for real-time events

**Limitations:** Full API docs are not publicly accessible. Contact 11x for developer documentation.

### Browser SDK (Mike/Julian)

For embedding the phone agent in web applications:

**Client endpoint:**
```
https://api.prod.centralus.az.sindarin.tech/PersonaClientPublicV2?apikey=<YOUR_11X_KEY>
```

**Authentication:** API key (passed in URL and init config)

**Configuration:**
```javascript
const personaClient = new PersonaClient();
await personaClient.init({
  personaId: "your-mike-agent-id",    // Required
  userId: "optional-user-id",
  personaName: "Mike",
  details: {
    companyName: "Acme Corp",
    productInfo: "Custom context for the agent"
  }
});
```

**Methods:**
- `personaClient.init(config)` — Start session
- `personaClient.pause()` — Suspend
- `personaClient.resume()` — Resume
- `personaClient.end()` — Terminate

**Events:**
- `messages_update` — Fired on message changes
- `state_updated` — Fired on state modifications
- `action` — Fired on agent actions

```javascript
personaClient.on('messages_update', (messages) => {
  console.log('New messages:', messages);
});
```

### CRM Integration (via Ampersand)

**Auth:** OAuth (Salesforce, HubSpot, Zoho)

**Required fields:**
- `Agent Identifier` — Text/dropdown uniquely identifying each Mike agent
- `Phone Number` — Must conform to **E.164 format** for multi-country routing

**Optional fields:**
- **Context Fields** (Custom Input Variables) — Pass prospect info to agent before calls
- **Update Fields** (Extracted Variables) — Write call outcomes back to CRM records

**Configuration:**
- Instant Scheduling toggle — bypass agent scheduling windows
- Deduplication — configurable time buffer prevents duplicate calls
- Activity Description — customizes Call object notes
- CRM Request Logs — view sync history at `/integration-settings`

**Best practice:** Create a dedicated "11x user" account in your CRM for activity attribution rather than having activities attributed to individual reps.

<!-- Source: https://docs.11x.ai, https://www.11x.ai/platform/integrations/api, https://docs.11x.ai/integrations/mike-crm-integration -->

## Data model

```json
// Prospect (target contact)
{
  "id": "prospect_abc123",
  "email": "jane.doe@acmecorp.com",
  "phone": "+14155551234",
  "first_name": "Jane",
  "last_name": "Doe",
  "company": "Acme Corp",
  "title": "VP Engineering",
  "signals": ["recent_funding", "hiring_engineers"],
  "research": {
    "company_news": "Series B raised $50M...",
    "tech_stack": ["AWS", "Snowflake", "Salesforce"],
    "job_postings": ["Senior SRE", "Staff Engineer"]
  }
}
```
<!-- Constructed from docs — verify against live API -->

```json
// Call outcome (Mike/Julian)
{
  "call_id": "call_xyz789",
  "prospect_id": "prospect_abc123",
  "agent_identifier": "mike-sales-01",
  "duration_seconds": 180,
  "outcome": "qualified",
  "extracted_data": {
    "budget_confirmed": true,
    "timeline": "Q3 2026",
    "next_steps": "Schedule demo with AE"
  },
  "transcript_url": "https://api.11x.ai/calls/xyz789/transcript",
  "recorded_at": "2026-05-01T14:30:00Z"
}
```
<!-- Constructed from docs — verify against live API -->

## Known controversies and risks

**Transparency is critical when evaluating 11x.** The skill should present these facts so users can make informed decisions:

1. **TechCrunch investigation (2025):** Reported that 11x may have inflated customer metrics while claiming $10M+ ARR. The investigation raised questions about the gap between claimed and actual customer counts.

2. **Gross retention reportedly below 50%.** Multiple third-party sources report most customers churn within 3-12 months. This is well below healthy SaaS benchmarks (90-120% net retention).

3. **Annual contract lock-in.** Users report difficulty exiting contracts even when the tool underperforms. Auto-renewal clauses and limited cancellation windows have been recurring complaints.

4. **Mixed reviews.** Polarized — some verified G2 reviews are positive, while long-form community posts (Medium, Reddit-style) describe zero results from high-volume campaigns.

**Recommendation for evaluators:** Request a paid proof-of-concept (not just a demo) with a defined success metric before committing to an annual contract. Ask for 3+ customer references in your industry and company size. Negotiate a cancellation clause tied to performance benchmarks.

## Quick-start recipes

### Recipe 1: Configure Alice for targeted outbound

**Trigger:** New 11x customer setting up first campaign

1. Define ICP: title, seniority, industry, company size, technology signals
2. Configure AI Strategist with rich context:
   - Exact problem you solve
   - For which persona
   - With what measurable result
   - 2-3 customer case studies with metrics
   - Competitive differentiators
3. Set channels: start with email only, add LinkedIn after email proves effective
4. Set daily volume: start low (50-100 emails/day), ramp over 2-4 weeks
5. Monitor first 500 sends for personalization quality — if generic, feed more context

**Gotcha:** Don't blast 3,000 contacts on day one. Ramp gradually or risk deliverability issues.

### Recipe 2: Set up Mike phone agent with Salesforce

**Trigger:** Want inbound call handling connected to CRM

1. Navigate to `/integration-settings` in 11x dashboard
2. Connect Salesforce via Ampersand OAuth
3. Map required fields:
   - `Agent Identifier` → custom text field on Contact/Lead
   - `Phone Number` → standard phone field (ensure E.164 format)
4. Configure optional context fields to pass prospect data to Mike before calls
5. Configure update fields for Mike to write qualification data back to records
6. Enable deduplication with a time buffer (e.g., 7 days)
7. Create a dedicated "11x" user in Salesforce for activity attribution
8. Test with internal calls before going live

**Gotcha:** Phone numbers MUST be E.164 format (+14155551234, not (415) 555-1234). Non-conforming numbers will fail silently.

### Recipe 3: Evaluate 11x ROI before committing

**Trigger:** Comparing 11x against alternatives

Calculate your cost-per-meeting benchmark:
```
Monthly cost: ~$5,000
Expected meetings/month: 15-30 (at 0.5-1% conversion on 3,000 contacts)
Cost per meeting: $167-$333

Compare to:
- AiSDR at $900/mo: cost per meeting ~$75-$300 (fewer contacts but similar conversion)
- Human SDR at $5,000/mo loaded cost: cost per meeting ~$200-$500 (but handles phone + complex deals)
- Salesforge Agent Frank at $499/mo: cost per meeting ~$50-$250 (email only)
```

**Decision framework:**
- If you need phone agent + email + LinkedIn + high volume → 11x may be justified
- If email + LinkedIn is sufficient → AiSDR or Salesforge at 80-90% lower cost
- If complex deals need human touch → hire an SDR and use AI tools to augment, not replace
