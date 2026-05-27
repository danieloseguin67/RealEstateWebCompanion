---
name: sales-social-listening
description: "Social listening and brand monitoring strategy — monitoring, Boolean queries, sentiment, competitive intel, crisis detection, AI visibility monitoring, LLM brand mentions. Platform comparison (Meltwater, Brandwatch, Talkwalker, Brand24, Awario, Mentionlytics, BrandMentions, YouScan, Vista Social, Socialhose, Konnect Insights, Sprout Social, Mention, Hootsuite, BrandJet, Influencity), monitoring setup (keywords, sources, alerts), sentiment analysis, competitive benchmarking (share of voice), crisis detection (real-time alerts, escalation), consumer insights, and reporting. Use when you don't know what people are saying about your brand, competitors are getting mentioned more than you, negative sentiment is spiking and you need to understand why, you're missing PR crises until it's too late, you can't tell if your brand shows up in AI/LLM answers, or you need to pick the right social listening tool. Do NOT use for platform-specific config (use /sales-meltwater), influencer discovery (use /sales-influencer-marketing), social media publishing/scheduling, or SEO keyword research (use /sales-semrush)."
argument-hint: "[describe your social listening question — e.g., 'how do I track competitor mentions' or 'which social listening tool should I use']"
license: MIT
version: 1.0.0
tags: [sales, social-listening, brand-monitoring, media-intelligence, strategy]
---
# Social Listening & Brand Monitoring Strategy

Helps the user plan and execute social listening programs — from choosing the right tool and setting up monitoring through sentiment analysis, competitive intelligence, crisis detection, and reporting.

## Step 1 — Gather context


If `references/learnings.md` exists, read it first for accumulated knowledge.

Ask the user:

1. **What do you need help with?**
   - A) Choosing a social listening tool
   - B) Setting up brand monitoring (keywords, sources, alerts)
   - C) Competitive intelligence / share of voice
   - D) Sentiment analysis and brand health tracking
   - E) Crisis detection and real-time alerts
   - F) Consumer insights and trend analysis
   - G) Reporting and stakeholder communication
   - H) Something else — describe it

2. **What's your primary use case?**
   - A) PR / Communications — tracking media coverage and brand perception
   - B) Marketing — understanding audience sentiment and campaign impact
   - C) Sales / Competitive intel — monitoring competitors and market signals
   - D) Product — tracking feature requests, complaints, and user feedback
   - E) Executive / C-suite — brand health dashboards and crisis alerts
   - F) Agency — managing monitoring for multiple clients

3. **Current setup?**
   - A) No monitoring in place yet
   - B) Manual monitoring (Google Alerts, manual social checks)
   - C) Using a tool — which one?
   - D) Evaluating tools / switching platforms

4. **Budget range?**
   - A) Free / minimal (under $100/mo)
   - B) Mid-market ($100-1,000/mo)
   - C) Enterprise ($1,000+/mo)
   - D) Not sure yet

**If the user's request already provides most of this context, skip directly to the relevant step.** Lead with your best-effort answer using reasonable assumptions (stated explicitly), then ask only the most critical 1-2 clarifying questions at the end.

## Step 2 — Route or answer directly

If the request maps to a platform-specific skill, route:
- Brand24 setup, config, or features → `/sales-brand24 [question]`
- Sprout Social setup, config, or features → `/sales-sproutsocial`
- Brandwatch setup, config, or features → `/sales-brandwatch`
- Meltwater setup, config, or features → `/sales-meltwater`
- Mention setup, config, or features → `/sales-mention [question]`
- Talkwalker setup, config, API, or image recognition → `/sales-talkwalker [question]`
- Mentionlytics setup, config, API, or SIA → `/sales-mentionlytics [question]`
- Awario setup, config, Leads, or Boolean queries → `/sales-awario [question]`
- Threadlytics setup, config, Reddit monitoring → `/sales-threadlytics [question]`
- BrandMentions setup, config, API, or white-label reports → `/sales-brandmentions [question]`
- YouScan setup, config, Visual Insights, API, or webhooks → `/sales-youscan [question]`
- Vista Social setup, config, listening add-on, or integrations → `/sales-vistasocial [question]`
- Octolens setup, config, API, MCP server, or webhooks → `/sales-octolens [question]`
- Socialhose setup, config, webhooks, or monitoring speeds → `/sales-socialhose [question]`
- Xpoz setup, MCP connection, SDK, or social data API → `/sales-xpoz [question]`
- Konnect Insights setup, unified inbox, CRM sync, Zapier, or crisis alerts → `/sales-konnectinsights [question]`
- KeyMentions setup, Reddit keyword monitoring, AI comments, or auto-publish → `/sales-keymentions [question]`
- Syften setup, keyword filters, AI filtering, API, webhooks, or alert routing → `/sales-syften [question]`
- Reddinbox setup, intent scoring, market briefs, or audience research → `/sales-reddinbox [question]`
- PainOnSocial setup, pain point scoring, subreddit selection, or idea validation → `/sales-painonsocial [question]`
- ThreadRadar setup, keyword monitoring, AI replies, or Quora tracking → `/sales-threadradar [question]`
- RedditMentions setup, email digests, Slack alerts, or keyword limits → `/sales-redditmentions [question]`
- RedShip setup, relevance scoring, SEO posts, AI reply drafts, API, or webhooks → `/sales-redship [question]`
- ReplyGuy setup, reply quality, account bans, auto-reply mode, or multi-platform mentions → `/sales-replyguy [question]`
- ParseStream setup, auto-reply safety, AI reply quality, or multi-platform keyword alerts → `/sales-parsestream [question]`
- Bazzly setup, AI message quality, credit optimization, intent scoring, or Chrome extension → `/sales-bazzly [question]`
- Devi setup, Facebook group monitoring, keyword noise, webhook integration, or AI outreach drafts → `/sales-devi [question]`
- Devta setup, Persona configuration, Networking Agent, proactive community engagement, or credit optimization → `/sales-devta [question]`
- Subreddit Signals setup, intent scoring, Comment Builder voice training, lead tokens, or engagement queue → `/sales-subredditsignals [question]`
- Leadlee setup, lead quality scores, AI reply tuning, auto-reply safety, or Chrome extension → `/sales-leadlee [question]`
- Reddily setup, thread analysis, batch processing, credit optimization, or Chrome extension → `/sales-reddily [question]`
- Prems AI setup, intent scoring tuning, AI Pitcher quality, auto-pilot scans, multi-platform monitoring, or webhook setup → `/sales-prems [question]`
- Trend Seeker setup, idea validation scoring, API integration, or idea discovery → `/sales-trendseeker [question]`
- CatchIntent setup, listener tuning, relevance scoring, CRM push, MCP server, or webhooks → `/sales-catchintent [question]`
- Leadverse setup, keyword tuning, lead scoring, AI reply suggestions, or multi-platform lead discovery → `/sales-leadverse [question]`
- ForumScout setup, AI filtering, scouts, competitive intelligence, sentiment, auto-replies, API Direct, or webhooks → `/sales-forumscout [question]`
- Prospy setup, lead scoring tuning, AI reply suggestions, brand monitoring, competitor tracking, or project configuration → `/sales-prospy [question]`
- Buzzabout setup, credit optimization, AI analysis, narrative tracking, synthetic audiences, or competitive research → `/sales-buzzabout [question]`
- F5Bot setup, keyword filtering, hit limits, API, webhooks, RSS/JSON feeds, or AI semantic alerts → `/sales-f5bot [question]`
- KWatch setup, keyword alerts, webhook integration, LinkedIn monitoring, AI sentiment, conversation tracking, or API → `/sales-kwatch [question]`
- Buska setup, intent scoring, ICP matching, Reply Studio, Prospect Finder, API, MCP, or webhooks → `/sales-buska [question]`
- CommunityTracker setup, intent scoring, share of voice, team workflows, API, or webhooks → `/sales-communitytracker [question]`
- Clearcue setup, signal stacking, AI qualification, MCP integration, Audiences, Researcher, or webhooks → `/sales-clearcue [question]`
- MentionDrop setup, keyword context, AI summaries, sentiment, webhooks, or API → `/sales-mentiondrop [question]`
- Redreach setup, keyword discovery, relevance scoring, Google-ranking posts, AI replies, Outbound DMs, or webhooks → `/sales-redreach [question]`
- SocListener setup, Reddit lead discovery, AI comment drafts, DM outreach, or credit optimization → `/sales-soclistener [question]`
- Trigify setup, LinkedIn signal intelligence, AI workflows, competitor engagement tracking, CRM sync, or credit optimization → `/sales-trigify [question]`
- SnitchFeed setup, keyword-level relevance tuning, AI intent tagging, webhook integration, sentiment scoring, or alert configuration → `/sales-snitchfeed [question]`
- ReplyAgent setup, managed account posting, AI comment quality, Google-ranking posts, UTM tracking, or API integration → `/sales-replyagent [question]`
- Replymer setup, human-written replies, SEO Replies, keyword tuning, mention-to-reply rate, or API integration → `/sales-replymer [question]`
- ReddGrow setup, AI Visibility Scanning, GEO strategy, AI comment drafting, Chrome extension posting, karma warmup, or API/CLI integration → `/sales-reddgrow [question]`
- Commentions setup, auto-commenting on LinkedIn/X/YouTube/Quora, brand voice tuning, engagement analytics, or comment quality → `/sales-commentions [question]`
- ReplierAI setup, Reddit monitoring, AI reply quality, Chrome extension, brand voice, or workflow configuration → `/sales-replierai [question]`
- Opencord AI setup, AI agent configuration, credit optimization, keyword targeting, or reply quality → `/sales-opencordai [question]`
- CrowdReply setup, AI search visibility tracking, engagement credits, managed Reddit posting, citation intelligence, or prompt tracking → `/sales-crowdreply [question]`
- Leadmore AI setup, managed account posting, subreddit discovery, lead tracking, cost optimization, or compliance checks → `/sales-leadmore [question]`
- Leado setup, AI lead discovery, opportunity scoring, Karma Builder, Viral Template Library, or compliance → `/sales-leado [question]`
- Subtle AI setup, campaign keywords, AI response quality, subreddit targeting, or browser extension → `/sales-subtle [question]`
- Pluggo setup, Slack alert tuning, AI copilot feedback, community discovery, or reply templates → `/sales-pluggo [question]`
- Reppit AI setup, intent scoring, keyword discovery, AI reply drafts, or subreddit targeting → `/sales-reppit [question]`
- Tydal setup, auto-posting, subreddit targeting limits, scan interval, viral templates, or reply quality → `/sales-tydal [question]`
- mention.click setup, similarity scoring, vectorization, keyword extraction, subreddit targeting, or reply quality → `/sales-mentionclick [question]`
- ReplyDaddy setup, relevance scoring, persona tuning, BYOK API costs, or response quality → `/sales-replydaddy [question]`
- Leedlime setup, credit optimization, AI reply quality, lead management, or Slack/Discord alerts → `/sales-leedlime [question]`
- OpportunAI setup, opportunity scoring, business profile, AI reply quality, or subreddit targeting → `/sales-opportunai [question]`
- SparkToro setup, audience discovery, podcast/channel targeting, or affinity data → `/sales-sparktoro [question]`
- Influencity Monitoring or influencer marketing → `/sales-influencity`
- Influencer discovery or campaign tracking → `/sales-influencer-marketing`
- Email marketing analytics → `/sales-email-marketing`
- SEO keyword research → `/sales-semrush`
- Sales intent signals → `/sales-intent`
- GRIN social listening setup or configuration → `/sales-grin`

Otherwise, answer directly from the strategy knowledge below.

## Step 3 — Social listening strategy reference

**Read `references/platform-guide.md`** for detailed platform comparison, monitoring setup, Boolean query guidance, sentiment analysis, competitive intelligence, crisis detection, consumer insights, and reporting frameworks.

*You no longer need the platform guide details — focus on the user's specific situation.*

## Step 4 — Actionable guidance

Based on the user's specific question:

1. **Tool selection** — recommend the best tool for their use case, budget, and team
2. **Monitoring setup** — design keyword strategy, configure sources, set up alerts
3. **Competitive analysis** — build competitor tracking, measure share of voice
4. **Crisis plan** — configure detection, design escalation workflow
5. **Reporting** — design dashboards and reports for their stakeholders

## Gotchas

*Best-effort from research — review these, especially items about pricing and capabilities that may change.*

- **Enterprise tools lock you into annual contracts.** Meltwater, Brandwatch, and Talkwalker all require annual commitments with non-transparent pricing. Budget $6K-50K+/year. Negotiate hard before signing and clarify cancellation terms.
- **Sentiment analysis has a ceiling.** No tool exceeds ~85% accuracy on English text. Plan for manual review of high-impact mentions. Non-English, sarcasm, and industry jargon degrade accuracy further.
- **More sources ≠ better monitoring.** Noisy monitoring is worse than no monitoring. Start narrow, validate results, then expand. A focused query with 100 relevant mentions beats a broad one with 10,000 noisy ones.
- **Free tools have severe limitations.** Google Alerts and free tiers miss most social mentions, have no sentiment analysis, and provide no historical data. They're fine for awareness, not for strategic intelligence.
- **Social platform data access is shrinking.** X/Twitter, Reddit, and Meta regularly restrict API access. Tools that are official data partners (Meltwater is a Reddit data partner) have more reliable access. Check which platforms your tool can actually monitor.
- **ROI is hard to prove directly.** Social listening ROI is often indirect (faster crisis response, better content strategy, competitive awareness). Don't promise direct revenue attribution from listening alone.

- **Self-improving**: If you discover something not covered here, append it to `references/learnings.md` with today's date.

## Before recommending a specific platform skill

This skill covers a strategy domain across many platforms. **Before pointing the user to any specific platform skill** (any `/sales-{platform}` listed in `## Related skills`, e.g., `/sales-mailshake`, `/sales-klaviyo`, `/sales-apollo`), read that platform skill's actual `SKILL.md` first. The 1-line description in `## Related skills` is enough to *identify* a candidate — it's not enough to *commit* to it or to write a prompt that invokes it well.

**How to read it:**
- If `~/.claude/skills/{skill-name}/SKILL.md` exists locally, `Read` it.
- For `sales-*` skills, `WebFetch` directly from this repo: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/{skill-name}/SKILL.md` — e.g., for `sales-mailshake`: `https://raw.githubusercontent.com/sales-skills/sales/main/skills/sales-mailshake/SKILL.md`.
- For non-`sales-*` skills (third-party), look up `{org}/{repo}` in `~/.claude/skills/sales-do/references/skill-sources.md` if installed and fetch the same `skills/{skill-name}/SKILL.md` path under that repo.

**After reading,** ground your recommendation in something concrete from the SKILL.md (its scope, a sub-flow, its `argument-hint` shape, or a "Do NOT use for..." negative trigger). Align any generated invocation with the platform skill's `argument-hint`. If the platform skill turns out not to fit the user's situation, swap to another or handle the question here directly rather than recommending a poor fit.

## Related skills

- `/sales-brand24` — Brand24 platform help — social listening, sentiment analysis, Storm Alerts, MCP server, Share of Voice
- `/sales-sproutsocial` — Sprout Social platform help — Publishing, Smart Inbox, Analytics, Listening, Influencer, Advocacy, API
- `/sales-brandwatch` — Brandwatch platform help — Consumer Intelligence, Social Media Management, Influence, API
- `/sales-meltwater` — Meltwater platform help — monitoring, media relations, API, integrations
- `/sales-social-media-management` — Social media management strategy — publishing, scheduling, engagement, tool comparison
- `/sales-employee-advocacy` — Employee advocacy strategy — content curation, gamification, compliance
- `/sales-intent` — Buying intent signals and prioritization from monitoring data
- `/sales-influencity` — Influencity platform help — Monitoring module for brand tracking and competitor analysis
- `/sales-influencer-marketing` — Influencer discovery and campaign tracking
- `/sales-content` — Sales content management and strategy
- `/sales-mention` — Mention platform help — real-time media monitoring, brand mention tracking, sentiment analysis, REST API
- `/sales-awario` — Awario platform help — budget social listening, Boolean search, Awario Leads social selling, Reddit monitoring, REST API
- `/sales-talkwalker` — Talkwalker platform help — enterprise social listening, image recognition, Blue Silk AI, Streaming API
- `/sales-mentionlytics` — Mentionlytics platform help — mid-market social listening, SIA AI advisor, all features on every plan, REST API (Pro+)
- `/sales-brandjet` — BrandJet AI platform help — outreach, brand intelligence, AI monitoring
- `/sales-grin` — GRIN platform help — includes social listening with hashtag monitoring and brand mention alerts
- `/sales-threadlytics` — Threadlytics platform help — Reddit-specific monitoring, keyword tracking, sentiment, Share of Voice, opportunity scoring
- `/sales-brandmentions` — BrandMentions platform help — emotion AI sentiment, competitor intelligence, Share of Voice, white-label reports, REST API (Enterprise only)
- `/sales-youscan` — YouScan platform help — AI visual analytics (logo/scene/object detection in images), Insights Copilot AI agent, social listening, webhooks, REST API (Unlimited only)
- `/sales-vistasocial` — Vista Social platform help — all-in-one social media management with publishing (15+ networks), unified inbox, analytics, social listening add-on, review management, Zapier/Make
- `/sales-octolens` — Octolens platform help — developer-first social listening (Reddit, GitHub, HN, X, LinkedIn, Bluesky, Stack Overflow, DEV.to), AI relevance scoring, MCP server for Claude/Cursor, REST API, webhooks
- `/sales-socialhose` — Socialhose platform help — social listening with transparent pricing, no annual contracts, flexible monitoring speeds (daily/high-frequency/crisis), webhooks (Pro+)
- `/sales-xpoz` — Xpoz platform help — social data API and MCP server for AI agents, 1.5B+ indexed posts across Twitter/X, Instagram, TikTok, Reddit, TypeScript/Python SDKs, free tier
- `/sales-konnectinsights` — Konnect Insights platform help — omnichannel CXM, social listening, unified inbox (30+ channels), publishing, Zapier, REST API, native CRM connectors
- `/sales-keymentions` — KeyMentions platform help — Reddit keyword monitoring with AI comment generation and auto-publish for lead generation
- `/sales-syften` — Syften platform help — AI-filtered keyword monitoring across Reddit, HN, X, Bluesky, GitHub, Dev.to, 15+ community platforms, sub-minute Reddit alerts, Boolean search, REST API, webhooks (PRO)
- `/sales-reddinbox` — Reddinbox platform help — AI audience intelligence across Reddit, X, Bluesky, HN, YouTube, Facebook, natural language queries, intent scoring, market briefs
- `/sales-sparktoro` — SparkToro platform help — audience intelligence revealing where audiences spend attention (websites, podcasts, YouTube channels, subreddits, social accounts), persona development, channel discovery
- `/sales-painonsocial` — PainOnSocial platform help — AI-scored Reddit pain point discovery for idea validation, frequency/severity ranking, evidence quotes, solution generation
- `/sales-threadradar` — ThreadRadar platform help — Reddit + Quora keyword monitoring with AI-drafted replies for engagement and lead generation
- `/sales-redditmentions` — RedditMentions platform help — cheapest Reddit keyword monitoring (€4.49/mo), email digests + Slack alerts, no API
- `/sales-redship` — RedShip platform help — AI-scored Reddit monitoring with SEO post discovery, relevance scoring (0-100), REST API + webhooks on all plans, $19/mo
- `/sales-replyguy` — ReplyGuy platform help — AI reply generation across Twitter, Reddit, LinkedIn with keyword monitoring and auto-reply (Twitter) or semi-manual (Reddit/LinkedIn)
- `/sales-parsestream` — ParseStream platform help — multi-platform keyword monitoring (Reddit, X, LinkedIn, Quora, HN) with AI reply drafts and auto-reply, ~$29-79/mo, no API
- `/sales-bazzly` — Bazzly platform help — AI-powered Reddit lead generation with intent scoring, contextual DM/reply drafting, Chrome extension, Reply Boost, $19-99/mo, no API
- `/sales-devi` — Devi AI platform help — Chrome extension for social media lead monitoring across Facebook groups, LinkedIn, X, Reddit, WhatsApp, Telegram with AI buying intent detection and outreach drafts
- `/sales-devta` — Devta platform help — AI Networking Agent for proactive community engagement on Reddit, LinkedIn, Upwork with Persona-based authentic commenting, DM nurturing, Draft Posts, credit-based pricing
- `/sales-subredditsignals` — Subreddit Signals — Reddit lead generation with 7-dimension buyer intent classification, AI Comment Builder with voice training, Engagement Queue
- `/sales-leadlee` — Leadlee — cheapest Reddit lead generation with AI replies ($12/mo), quality scoring, Chrome extension, auto-reply beta
- `/sales-reddily` — Reddily — AI-powered Reddit thread analysis for market research with sentiment, pain points, feature requests, competitor mentions, batch processing, Chrome extension
- `/sales-trendseeker` — Trend Seeker — Reddit-based business idea discovery and validation with evidence scoring, demand signals, public REST API
- `/sales-catchintent` — CatchIntent — AI-powered intent detection across Reddit, X, HN, Bluesky with relevance scoring, lead enrichment, CRM integrations, MCP server, webhooks
- `/sales-leadverse` — Leadverse — AI-powered lead discovery across Reddit, X, LinkedIn with keyword tracking, lead scoring, AI reply suggestions, $19-39/mo, no API
- `/sales-prems` — Prems AI — multi-platform lead generation across 15 platforms with AI intent scoring (0-100), personalized reply drafts, auto-pilot, webhooks
- `/sales-forumscout` — ForumScout — AI social listening across 10M+ forums, Reddit, X, LinkedIn, YouTube, Instagram, Bluesky, HN, Facebook with natural language AI filtering, $19-129/mo, API/MCP via apidirect.io
- `/sales-prospy` — Prospy — AI social listening and lead generation across Twitter/X, Reddit, Bluesky, HN with AI lead scoring, brand monitoring, competitor tracking, $24/mo, no API
- `/sales-buzzabout` — Buzzabout — AI-powered social media intelligence analyzing conversations across Reddit, TikTok, YouTube, Instagram, LinkedIn, X for audience insights, sentiment, trends, competitive research, $49/mo
- `/sales-f5bot` — F5Bot platform help — free Reddit/HN/Lobsters keyword monitoring, 200 free keywords, email alerts, REST API + webhooks (Ultra), RSS/JSON feeds (Power+), AI semantic alerts (Ultra)
- `/sales-kwatch` — KWatch.io platform help — multi-platform keyword monitoring (Reddit, HN, X, LinkedIn, Facebook, YouTube), AI sentiment, Slack/webhook alerts, REST API (Business+)
- `/sales-buska` — Buska platform help — AI social listening for lead gen across 30+ platforms, buying intent scoring (0-100), ICP matching, Reply Studio, REST API, MCP server, webhooks
- `/sales-mentiondrop` — MentionDrop platform help — budget web+Reddit monitoring with AI summaries, sentiment, relevance scoring, read-only REST API, webhooks, Slack
- `/sales-communitytracker` — CommunityTracker platform help — community intelligence for GTM teams, high-intent buyer signals across Reddit/Slack/Discord/LinkedIn/X/GitHub/HN, intent scoring, share of voice, team workflows, REST API, webhooks
- `/sales-clearcue` — Clearcue platform help — GTM signal engine for real-time buyer intent across LinkedIn, X, Reddit, news, jobs, events with signal stacking, AI qualification, MCP server, webhooks
- `/sales-redreach` — Redreach platform help — AI-powered Reddit lead generation with keyword auto-discovery, Google-ranking post detection, AI reply suggestions, Chrome extension DM automation, webhook alerts
- `/sales-soclistener` — SocListener — Reddit lead gen with AI context matching, personalized comment/DM drafting, credit-based pricing
- `/sales-trigify` — Trigify — AI agent-powered LinkedIn signal intelligence with custom AI workflows, CRM integrations, outreach sequencing
- `/sales-snitchfeed` — SnitchFeed — intent-based social listening for startups across Reddit, X, LinkedIn, Bluesky with AI relevance scoring, intent tagging, webhooks (Pro+)
- `/sales-replyagent` — ReplyAgent — Reddit marketing automation with managed account posting, AI comment generation, Google-ranking post detection, UTM tracking, minimal REST API
- `/sales-replymer` — Replymer — managed Reddit/X reply marketing with human-written replies, SEO Replies, REST API, $99-1,999/mo
- `/sales-reddgrow` — ReddGrow — Reddit marketing for AI search visibility (GEO) with AI Visibility Scanning, AI comment drafting, Chrome extension, REST API, CLI
- `/sales-commentions` — Commentions — automated brand mention commenting across LinkedIn, X, YouTube, Quora with AI comment generation, post discovery, engagement analytics
- `/sales-replierai` — ReplierAI — AI-powered Reddit monitoring and reply tool with Chrome extension, brand voice customization, sentiment analysis, $10-50/mo
- `/sales-opencordai` — Opencord AI — AI agent-powered social engagement on Twitter/X and Reddit with autonomous reply generation, credit-based pricing, $0-96/mo
- `/sales-crowdreply` — CrowdReply — AI search visibility tracking + managed Reddit/Quora/Facebook engagement via trusted community profiles, $99-499+/mo
- `/sales-leadmore` — Leadmore AI — safe Reddit marketing via managed high-karma accounts, subreddit discovery, lead tracking, pay-per-post ($4/comment, $7/post)
- `/sales-leado` — Leado — AI-powered Reddit lead generation with buying intent scoring (0-100), AI reply drafts, Karma Builder, Viral Template Library, $0-29.99/mo
- `/sales-subtle` — Subtle AI — Reddit lead generation for SaaS with campaign-based post discovery, AI response generation, browser extension, $20-120/mo, no API
- `/sales-replydaddy` — ReplyDaddy — Reddit marketing co-pilot with AI post discovery, relevance scoring, response generation, BYOK AI model, $0-799/mo or ~$59 LTD + API costs, no API
- `/sales-leedlime` — Leedlime — AI-powered Reddit lead generation with intent scoring, lead management dashboard, credit-based pay-per-lead pricing ($0.09-0.20/lead), Slack/Discord alerts, no API
- `/sales-opportunai` — OpportunAI — AI-powered Reddit lead generation with opportunity scoring, sentiment analysis, business profile analysis, free tier + $29/mo, no API
- `/sales-pluggo` — Pluggo — AI-powered multi-platform social listening (Reddit, X, HN, Bluesky, Facebook, LinkedIn) with Slack-delivered opportunities, AI copilot, $0-41.58/mo, no API
- `/sales-reppit` — Reppit AI — Reddit-only lead generation with AI keyword discovery from product URL, 0-100 buying intent scoring, AI reply drafts, manual posting only, ~$25-29/mo, no API
- `/sales-tydal` — Tydal — AI-powered Reddit lead generation with auto-posting, 50+ viral templates, intent scoring, 5-subreddit limit, 48h scan interval, $29/mo, no API
- `/sales-mentionclick` — mention.click — AI-powered Reddit intelligence with semantic vectorization, 0-10 similarity scoring, auto-keyword extraction, 5-min scan intervals, $99/mo, no confirmed API
- `/sales-ai-visibility` — AI visibility monitoring — track what LLMs say about your brand
- `/sales-do` — Not sure which skill to use? The router matches any sales objective to the right skill. Install: `npx skills add sales-skills/sales --skill sales-do`

## Examples

### Example 1: Choose a social listening tool
**User says**: "I'm a PR manager at a mid-size SaaS company. I need to monitor our brand mentions across news and social. Budget is around $500/mo."
**Skill does**:
1. Evaluates budget constraint against platform pricing
2. Recommends Brand24 ($79/mo) for affordable monitoring with decent coverage, or Mention ($41/mo) for simpler needs
3. Notes that enterprise tools (Meltwater, Brandwatch) are out of budget range
4. Suggests trial periods to test coverage quality for their specific industry
**Result**: Clear recommendation matched to budget and use case

### Example 2: Set up competitive monitoring
**User says**: "I want to track how our brand is performing vs. three competitors in terms of online mentions and sentiment"
**Skill does**:
1. Designs monitoring queries for each brand (including name variations)
2. Sets up share of voice tracking across matched channels
3. Configures sentiment comparison dashboard
4. Creates a monthly competitive report template
**Result**: Competitive intelligence program ready to run

### Example 3: Build a crisis detection system
**User says**: "We need early warning if something negative goes viral about our company"
**Skill does**:
1. Defines crisis keyword combinations (brand + negative terms)
2. Configures real-time alerts with volume spike thresholds
3. Designs escalation workflow (detect → assess → escalate → respond → monitor)
4. Sets up a crisis dashboard with real-time metrics
**Result**: Crisis detection system with automated alerts and escalation plan

## Troubleshooting

### Monitoring returns too much noise
**Symptom**: Thousands of irrelevant mentions drowning out real brand conversations
**Cause**: Queries are too broad, missing NOT exclusions, or source filters are too wide
**Solution**: Review the top 50 mentions. Identify recurring false positive patterns (common words, unrelated companies with similar names, spam domains). Add NOT exclusions for each pattern. Narrow source filters. Consider using NEAR/n proximity operators if your tool supports them.

### Missing important mentions
**Symptom**: You find out about brand mentions from colleagues or customers, not from your monitoring tool
**Cause**: Queries are too narrow, missing name variations, or platform coverage gaps
**Solution**: Audit your keyword list — add misspellings, abbreviations, nicknames, hashtags, and executive names. Check which social platforms your tool actually monitors (some don't cover TikTok, Reddit, or forums). Consider adding a second tool for gap coverage.

### Stakeholders don't find reports useful
**Symptom**: Executives or team members ignore your social listening reports
**Cause**: Reports show data without actionable insights, or metrics don't connect to business outcomes
**Solution**: Lead with insights and recommendations, not raw numbers. Connect metrics to business outcomes (e.g., "negative sentiment spiked 40% after the pricing change — here's what customers are saying"). Tailor report depth to audience — executives want 1-page summaries, marketing wants detailed analysis.
