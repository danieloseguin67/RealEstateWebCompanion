# CrowdReply Platform Reference

## Overview

CrowdReply is an AI search visibility platform with a managed engagement engine. It tracks how AI models (ChatGPT, Perplexity, Gemini, Claude, and others) cite and recommend brands, then lets users engage on the sources AI pulls from — primarily Reddit, Quora, and Facebook — through "trusted community profiles" (managed accounts). Targets e-commerce brands, SaaS companies, and agencies. 5,000+ brands claimed, 16 G2 reviews (4.9/5).

**Primary differentiator:** Combines AI search visibility tracking (a monitoring function) with managed Reddit engagement (an execution function) in one platform. Most competitors do one or the other.

## Capabilities & automation surface

### AI Search Visibility Tracking — UI-only (Growth+ for API)
- **Prompt tracking**: Monitor which prompts trigger brand mentions across AI models
- **Visibility scoring**: Aggregate visibility score across tracked prompts
- **Citation source intelligence**: See which domains AI cites for your category
- **Competitor benchmarking**: Track competitor visibility alongside your own
- **Model coverage**: Starter tracks 2 AI models, Growth 4, Enterprise all 7

### Social Listening — UI-only
- **Keyword monitoring**: Track keywords across Reddit, Quora, Facebook
- **Real-time alerts**: Email and Slack notifications for relevant conversations
- **Keyword limits**: 20 (Starter), 75 (Growth), 200 (Enterprise)

### Engagement Engine — UI-only (credit-based)
- **Managed account posting**: Post comments and threads via CrowdReply's "trusted community profiles" — established, karma-bearing Reddit accounts
- **Platform coverage**: Reddit (primary), Quora, Facebook
- **Content generation**: AI-assisted comment drafting
- **Credit system**: All engagement costs credits; different costs by action and account karma level
- **Credit refund**: Comments removed by moderators are refunded

### Reporting — UI-only
- **Shareable reports**: Stakeholder-facing reports with citation and engagement ROI data
- **Engagement tracking**: Track which comments stay live and drive engagement

## Pricing, limits & plan gates

<!-- Prices from crowdreply.io/pricing — best-effort, verify current rates -->

| Feature | Starter $99/mo | Growth $299/mo | Enterprise $499+/mo |
|---|---|---|---|
| Brands tracked | 1 | 3 | 10 |
| Team members | 2 | Unlimited | Unlimited |
| AI search prompts | 20 | 75 | 200 |
| Social listening keywords | 20 | 75 | 200 |
| AI models tracked | 2 | 4 | All 7 |
| API access | No | Yes | Yes |
| Engagement credits/mo | $50 | $200 | $300 |
| Dedicated account manager | No | No | Yes |
| Reddit comment cost | $10/comment | $8/comment | $7/comment |
| Reddit thread cost | $25/thread | $20/thread | $15/thread |

**Engagement credit costs by account karma:**
- Low-karma comments: 25-40 credits
- Mid-karma comments: 50-75 credits
- High-karma comments: 100+ credits

**Trial**: 7-day free trial with full platform access (excluding engagement credits). No credit card required.

**Guarantee**: 30-day money-back guarantee on paid subscriptions.

**Realistic monthly volumes at each tier:**
- Starter ($50 credits): ~5-7 mid-tier comments OR 2 threads
- Growth ($200 credits): ~20-25 mid-tier comments OR 8-10 threads
- Enterprise ($300 credits): ~35-40 mid-tier comments OR 15-20 threads
- Additional credits can be purchased within the dashboard

## Integrations

- **Slack**: Alert notifications (all plans)
- **Email**: Alert notifications (all plans)
- **API**: Growth+ plans only — no public documentation available
- **Zapier**: Not available
- **Make**: Not available
- **MCP**: Not available
- **Webhooks**: Not documented

## Data model

No public API documentation is available. The platform's data model is only accessible through the UI dashboard.

**Key objects (inferred from UI):**
- **Brand**: A tracked brand with associated keywords and prompts
- **Prompt**: An AI search prompt being tracked for brand mentions
- **Mention**: A social media mention matching a keyword
- **Engagement**: A comment or thread posted via managed accounts, with status tracking (live, removed, refunded)
- **Citation Source**: A domain that AI models cite for the brand's category

<!-- No API docs available — data model inferred from product description. Verify against actual dashboard. -->

## Quick-start recipes

### Recipe 1: Set up AI visibility baseline

**Goal:** Establish your brand's AI visibility score and identify where competitors appear but you don't.

**Steps:**
1. Add your brand in the dashboard
2. Add 2-3 top competitors
3. Create 10-15 prompts users might ask about your category:
   - "What is the best [category] tool?"
   - "Compare [your brand] vs [competitor]"
   - "[Your brand] review"
   - "Alternatives to [competitor]"
   - "Best [category] for [use case]"
4. Select AI models to track (at least ChatGPT and Perplexity)
5. Run initial scan and document baseline scores
6. Set weekly review cadence

**Gotchas:**
- Start with prompts where competitors already appear — these are your quickest wins
- Don't spread prompts too thin — 10 focused prompts beat 20 generic ones
- Starter plan limits you to 2 models; prioritize ChatGPT and Perplexity

### Recipe 2: Maximize engagement credit ROI

**Goal:** Get the most value from monthly engagement credits.

**Steps:**
1. Review citation source intelligence — identify which Reddit threads AI actually cites
2. Use social listening to find question threads in relevant subreddits
3. Prioritize threads that:
   - Are recent (within 7 days)
   - Have 5+ upvotes (signals genuine interest)
   - Are in subreddits with 10K-100K members (sweet spot — active but not over-moderated)
   - Ask for recommendations or comparisons
4. Request mid-tier karma comments ($50-75 credits) — best cost-to-survival ratio
5. Monitor comment survival after 48 hours
6. Request credit refunds for any removed comments

**Gotchas:**
- Avoid mega-subreddits (r/technology, r/AskReddit) — heavy moderation, comments get buried
- High-karma comments cost 2x+ but don't necessarily survive longer
- Threads already ranking on Google have lasting SEO value even if the subreddit is smaller

### Recipe 3: Connect AI visibility to engagement strategy

**Goal:** Use citation source intelligence to guide where you engage.

**Steps:**
1. In AI visibility, check which domains are cited for your category's top prompts
2. Cross-reference with social listening — are there conversations on those domains you can engage in?
3. Prioritize engagement on platforms/threads that AI models actively cite
4. After engagement, re-run visibility scans on the same prompts after 2-4 weeks
5. Track whether your visibility score improves for prompts where you engaged on cited sources

**Gotchas:**
- Retrieval-based models (Perplexity) update fast — you may see impact in days
- Training-based models (ChatGPT, Claude) take months to reflect new content
- Not all Reddit engagement will influence AI visibility — only threads that AI actively retrieves

## Integration patterns

### Reporting workflow (all plans)
CrowdReply's shareable reports can be used for stakeholder communication. Export or share links to:
- AI visibility score trends over time
- Citation source coverage
- Engagement ROI (comments posted vs. survived vs. engagement generated)
- Competitor benchmarking

### API integration (Growth+ only)
No public API documentation is available. Contact CrowdReply support for:
- API endpoint documentation
- Authentication method
- Rate limits
- Available endpoints

**Workaround for Starter plan (no API):**
- Use Slack alerts as a trigger for downstream automation (e.g., Slack → Zapier → CRM)
- Use shareable report links for dashboard embedding
- Manual export of data for external analysis
