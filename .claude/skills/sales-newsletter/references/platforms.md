# Newsletter Monetization — Platform-Specific Guidance

Platform-specific implementation details for newsletter monetization strategies. Read this file when the user asks about a specific platform's monetization features.

## Contents

- [Kit](#in-kit)
- [Substack](#in-substack)
- [Beehiiv](#in-beehiiv)
- [Ghost](#in-ghost)
- [Paved](#in-paved)
- [Buttondown](#in-buttondown)
- [MailerLite](#in-mailerlite)
- [SparkLoop](#in-sparkloop)
- [Mailchimp](#in-mailchimp)
- [Megahit](#in-megahit)
- [BuySellAds](#in-buysellads)
- [Admailr](#in-admailr)
- [adly.news](#in-adlynews)
- [Passendo](#in-passendo)
- [PostApex](#in-postapex)
- [AdButler](#in-adbutler)
- [Epom](#in-epom)
- [Broadstreet](#in-broadstreet)
- [AdPlugg](#in-adplugg)
- [Revive Adserver](#in-revive-adserver)
- [Adserver.Online](#in-adserver-online)
- [AdvertServe](#in-advertserve)

---

## In Kit
- **Paid newsletters**: Commerce feature — create a subscription product, gate sequences/content behind purchase
- **Paid recommendations**: Creator Recommendations network — set a budget per subscriber, appears on confirmation pages
- **Free recommendations**: Cross-promote with aligned creators at no cost
- **Newsletter referral system** (Pro plan): Reward subscribers who refer friends
- **Subscriber segments**: Create "paid" vs "free" segments to gate content in broadcasts
- **Pricing**: 0.6% Kit transaction fee + Stripe fees on paid subscriptions
- **Setup**: Earn > Products > New subscription product > connect Stripe > create gated content

## In Substack
- **Paid subscriptions**: Built-in paywall with free/paid post toggle
- **Pricing**: 10% Substack fee + Stripe fees
- **Strengths**: Built-in discovery network, simple setup, social features
- **Limitations**: Limited design control, no automation, 10% fee is high at scale

## In Beehiiv
- **Paid subscriptions**: Premium tiers with paywall toggle per post. 0% beehiiv take rate — only Stripe fees (~2.9% + $0.30). Requires Scale plan ($43/mo).
- **Ad Network**: Beehiiv's native ad network matches sponsors to your newsletter automatically. You approve/reject each ad. Revenue depends on list size, niche, and engagement. Requires Scale plan.
- **Boosts**: Earn $1-$3 per subscriber from other newsletters promoting yours (and vice versa). Like Kit's paid recommendations but beehiiv-native. Requires Scale plan.
- **Referral program**: Built-in milestone-based system (like Morning Brew's). Subscribers share a referral link, earn rewards at milestone tiers. Requires Scale plan.
- **Sponsorship storefront**: Self-serve sponsor booking page for direct deals. Requires Max plan ($96/mo).
- **Digital products**: Sell digital downloads directly. Requires Scale plan.
- **Pricing advantage**: 0% platform fee (vs Substack's 10%, Kit's 0.6%). At scale, this saves thousands.
- **Setup**: Settings > Payments > Connect Stripe > Configure premium tiers > Toggle paywall in posts

## In Ghost
- **Paid memberships**: Built-in Stripe integration, tiered access (free/paid/premium), 0% Ghost fee
- **Pricing**: Self-hosted = free (+ hosting + Mailgun costs), Ghost(Pro) from $15/mo but paid subs require Publisher plan ($29/mo)
- **Strengths**: Full website + newsletter in one, no transaction fees, complete data ownership, native email delivery on Ghost(Pro)
- **Limitations**: Mailgun-only for self-hosted email, no digest newsletters (one email per post), Starter plan can't accept payments

## In Paved
- **Marketplace**: List your newsletter for curated sponsor bookings — Paved handles invoices, contracts, and payouts. Requires 5,000+ subscribers and ESP integration for verified badge.
- **Ad Network**: Insert a code snippet in your ESP template for automated CPC-based ads (~$1.45 avg per click). Lower effort, lower CPM than direct Marketplace placements.
- **Booker**: Manage your own direct sponsor relationships through Paved — they handle billing and insertion orders while you keep control of sponsor selection.
- **Radar**: Lead enrichment to identify potential sponsors and do outbound sponsor outreach with data-backed targeting.
- **Pricing**: 30% commission on Marketplace sponsorships. CPM typically $15-$100 depending on niche (B2B/finance at top, general interest at bottom).
- **ESP integrations**: ActiveCampaign, AWeber, Beehiiv, Brevo, Campaign Monitor, Constant Contact, ConvertKit, EmailOctopus, GetResponse, Mailchimp, MailJet, MailerLite, Zoho.
- **Best strategy**: Use both Marketplace (premium placements, 1-2 per issue) and Ad Network (fill remaining inventory) to maximize revenue.

## In Buttondown
- **Paid subscriptions**: Stripe integration with paywall toggle per email. Requires Paid Subscriptions add-on ($9/mo). No Buttondown transaction fee — only Stripe's ~2.9% + $0.30.
- **Pricing models**: Fixed price, pay-what-you-want, or free tier + paid tier. Gift subscriptions supported.
- **Base pricing**: Free (100 subs), Basic $9/mo (1K), Standard $29/mo (5K), Professional $79/mo (10K). Add-ons cost extra.
- **Sponsorships**: No built-in ad network or sponsor marketplace. Use Paved, BuySellAds, or direct outreach. Buttondown's hosted archives support custom HTML blocks for sponsor placements. BuySellAds has a native Buttondown integration (contact Buttondown support to enable).
- **Strengths**: 0% platform fee (vs Substack's 10%), native Markdown editor, excellent REST API (all plans), privacy-first analytics, free concierge migration.
- **Limitations**: No discovery network (unlike Substack or Beehiiv Boosts), no built-in referral program, most features are paid add-ons ($9-$79/mo each), smaller ecosystem.
- **Best for**: Developers, privacy-conscious creators, writers who want Markdown, anyone who wants minimal fees on paid subscriptions.

## In MailerLite
- **Paid newsletter subscriptions**: Built-in Stripe integration for recurring payments. Gate content to paid subscribers vs free. Manage subscriber tiers directly in MailerLite.
- **Pricing**: No MailerLite transaction fee (just Stripe ~2.9% + $0.30). 1 paid subscription product on Free, 3 on Growing Business ($10/mo), unlimited on Advanced ($20/mo).
- **Sponsorships**: Use content blocks and templates for consistent sponsor placement. MailerLite is listed as a supported ESP on Paved (Ad Network + Marketplace).
- **Strengths**: Cheapest option for paid newsletters — no platform fee on subscriptions, just Stripe. Landing pages included for subscriber growth. Simple automation for welcome/onboarding.
- **Limitations**: No built-in referral system (use SparkLoop). No discovery network (unlike Substack or Beehiiv). Basic automation compared to Kit or Beehiiv. No built-in ad network or boost marketplace.
- **Setup**: Account > Billing > Stripe integration > Create subscription product > Set price > Create gated content with subscriber groups

## In SparkLoop
- **Paid recommendations**: Earn $2-$7+ per confirmed subscriber by recommending other newsletters. Post-opt-in placement and in-email widgets. SparkLoop takes 20% commission + 3.5% fees.
- **Free recommendations**: Unpaid cross-promotion with matched newsletters — no cost, drives mutual growth.
- **Referral program** ($2K/year add-on): Subscriber reward system — readers share a referral link and earn rewards at milestones. Automated digital and physical reward fulfillment. Free for Kit Creator Pro users.
- **Partner program** ($2K/month min): Get other newsletters to recommend yours. Set engagement criteria so you only pay for engaged subscribers.
- **Upscribe widget**: Post-opt-in recommendation widget with auto-pilot mode. Full API for custom implementations.
- **Integrations**: Works with 25+ ESPs (Kit, Mailchimp, ActiveCampaign, HubSpot, Klaviyo, MailerLite, Brevo, etc.). Does NOT work with Ghost, Substack, or Flodesk.
- **Best for**: Newsletter operators on any supported ESP who want to monetize via recommendations and/or grow via referral programs. Strongest option for cross-ESP recommendation networks.

## In Mailchimp
- **No native paid newsletter**: Use Stripe + Zapier to manage paid subscribers via tags/groups
- **Sponsorships**: Use content blocks and templates for consistent sponsor placement
- **Strengths**: Strong email design tools, good for ad-supported newsletters
- **Limitations**: Not built for paid subscriptions — requires workarounds

## In Megahit
- **Subscriber enrichment**: Enriches newsletter subscriber emails with LinkedIn data — job titles, employers, LinkedIn profiles. Identifies sponsorship decision-makers already in your audience.
- **Inside-out sponsor discovery**: Unlike SponsorGap or Who Sponsors Stuff (which search external databases), Megahit finds potential sponsors *within* your existing subscriber list. Warm leads with higher reply rates.
- **Auto-enrichment**: New subscribers are automatically enriched upon signup after initial configuration.
- **ESP integrations**: Beehiiv, Kit, Campaign Monitor, EmailOctopus, Ghost, HubSpot, Mailchimp, SendGrid, Substack.
- **Privacy**: Runs on customer-controlled servers — Megahit never stores or accesses your email list.
- **Pricing**: $600 one-time fee. No subscription, no free plan, no trial. Book a demo first.
- **Limitations**: No API, no webhooks, no Zapier/Make. UI-only. Gmail-heavy lists will have lower match rates than work-email lists. Solo founder product.
- **Best for**: B2B newsletter publishers with 5,000+ subscribers who want to monetize by finding warm sponsor leads in their own audience before doing cold outreach.
- **Platform skill**: `/sales-megahit` for enrichment workflows, ESP setup, and comparison with sponsor intelligence tools.

## In BuySellAds
- **Ad network**: Contextual advertising marketplace connecting advertisers with publishers across websites, newsletters, and podcasts. 200+ publishers in the network.
- **Sub-networks**: Carbon Ads (developers/designers), Coin.Network (crypto) — niche-specific inventory with pre-qualified advertisers.
- **Newsletter integration**: Ad Serving API provides JSON endpoint (`srv.buysellads.com/ads/{zonekey}.json`) — fetch ads server-side and insert into ESP templates. Native Buttondown integration available.
- **Publisher commission**: 25% BSA take rate (publisher keeps 75%). Self-serve shopping cart reduces to 15% take rate (publisher keeps 85%).
- **Ad formats**: Display, native, sponsored content, email ads, podcast ads.
- **Managed sales model**: BSA team handles advertiser relationships — three tiers: Premier Partner (end-to-end), Add-On Sales (complement your team), Supplemental Sales (fill unsold inventory).
- **Zapier triggers**: Deal sent, deal won, spot sold — automate notifications to Slack, CRM, etc.
- **Strengths**: Human-curated placements (not purely programmatic), dedicated account management, contextual targeting (content-based not cookie-based), trusted by Shopify/AWS/Slack/MongoDB.
- **Limitations**: No guaranteed fill rate, 25% commission is higher than some alternatives, API key requires contacting account manager, advertiser pricing not transparent.
- **Best for**: Developer/design/crypto publishers with established traffic who want managed ad sales and premium brand partnerships. Not ideal for small newsletters (<10K subscribers) due to low fill rates.
- **Platform skill**: `/sales-buysellads` for API integration, troubleshooting, and platform-specific help.

## In adly.news
- **Two-sided marketplace**: Newsletter advertising marketplace at adly.news connecting publishers with advertisers. Dual discovery — publishers list ad slots, advertisers create campaigns describing their ideal audience.
- **Verified metrics**: Subscriber count, open rate, and CTR are pulled automatically from ESPs (Beehiiv, Kit) and verified. Sponsors see the same data publishers see.
- **Bidding & negotiation**: Advertisers can book at listed prices or make offers. Publishers can accept, reject, or counter. Built-in in-app messaging for coordination.
- **Campaign feature**: Advertisers create campaigns describing target audience and budget. Newsletters browse and apply. Useful for brands that don't know which newsletters exist.
- **Pricing**: Free to join both sides. Commission on transactions (% not publicly disclosed). Ad prices start at ~$50 for smaller newsletters. No minimum budget for advertisers.
- **Payments**: Stripe-powered. Funds held until the ad runs. Automated payouts to publishers.
- **Limitations**: No API, no webhooks, no Zapier/Make. UI-only. Newer/smaller marketplace than Paved or Hecto. Commission rate not transparent.
- **Best for**: Indie publishers who want verified metrics and negotiation flexibility. Advertisers who want to create campaigns and let newsletters come to them.
- **Platform skill**: `/sales-adlynews` for listing setup, campaign creation, and platform-specific help.

## In Admailr
- **Programmatic ad server**: Email-native ad server that automatically inserts display and native ads into newsletters. Patent-pending targeting algorithm matches ads to reader behavior and content context.
- **Revenue model**: CPM + CPC hybrid — earn from both impressions and clicks. Variable rates per ad depending on advertiser bids and audience quality.
- **Ad formats**: Display banners (multiple sizes), native ads, sponsored content. Custom ad sizes supported.
- **No subscriber minimum**: Any newsletter size can join. Best for small-to-mid publishers wanting automated monetization without managing sponsor relationships.
- **ESP integrations**: ActiveCampaign (native partner app), Mailchimp, Constant Contact, AWeber. Integration via HTML ad tag snippet in your ESP template.
- **API**: REST API at api.admailr.com with ~15 endpoints for campaign and banner management. API key auth.
- **Payment**: $100 minimum payout threshold. Monthly on the 20th via PayPal, ACH, or check.
- **Limitations**: No webhooks, no Zapier/Make. Revenue analytics are UI-only (no reporting API). Fill rates may be low for niche or small audiences — use backfill strategy. Native ads only outside US.
- **Best for**: Publishers who want hands-off automated ad revenue without managing sponsor relationships. Complements direct sponsorship tools (Paved, Hecto, Sponsy) for unsold inventory.
- **Platform skill**: `/sales-admailr` for API integration, ESP setup, troubleshooting, and optimization.

## In Social Presence
- **AI-powered marketplace**: Newsletter advertising marketplace at socialpresence.io connecting advertisers with publishers through AI-powered discovery. 5,000+ publishers claimed, 300M+ subscribers.
- **Discovery Dashboard**: 26-point filtering by talking points, audience demographics, and firmographics. AI-matched publisher recommendations for advertisers.
- **Ad Library**: Competitor campaign monitoring — live feed of which brands are sponsoring which newsletters. Useful for positioning and targeting strategy.
- **Ad formats**: Dedicated email (full issue sponsorship), Main Sponsor (prominent placement), Secondary Sponsor (native integration).
- **Managed sales**: Each publisher gets a dedicated category expert who handles advertiser outreach and sales admin.
- **Pricing**: Commission-only — no subscription fees for publishers. Exact commission percentage not publicly disclosed. Advertiser pricing not transparent.
- **Limitations**: No API, no webhooks, no Zapier/Make. UI-only. No G2/Capterra reviews for independent validation.
- **Best for**: Advertisers wanting AI-powered newsletter discovery across a large publisher network. Publishers who want managed sales support rather than self-serve listing.
- **Platform skill**: `/sales-socialpresence` for storefront setup, campaign management, and platform-specific help.

## In Passendo
- **Email ad server + SSP**: Passendo is a full-stack email ad server with a built-in programmatic exchange (SSP). Purpose-built for email since 2016, serving 250M+ monthly ad impressions across 150+ premium international publishers.
- **Priority waterfall**: Automated ad decisioning — guaranteed direct-sold deals fill first, then programmatic exchange demand (15+ partners), then house ads. Maximizes revenue by prioritizing highest-value commitments.
- **Direct-sold campaigns**: Full campaign management — A/B testing, CPM/CPC/CPA models, sponsorship deals with SOV delivery, inclusion/exclusion filters.
- **First-party data targeting**: Cookie-free targeting based on email address and subscriber data. GDPR-compliant.
- **CNAME integration**: All ESP integrations use CNAME DNS records — ad images load from your domain, preserving deliverability.
- **Pricing**: Volume-based CPM tiers with minimum monthly commitment plus one-time onboarding fee. No published prices — custom quotes only.
- **Onboarding**: Not self-serve — Passendo provides dedicated human onboarding (2-4 weeks average). They handle tag setup, CNAME config, and demand partner connections.
- **Limitations**: No Zapier/Make/MCP. API exists but docs not publicly accessible. Image-only creatives (no HTML/CSS customization). Image size upload limits reported.
- **Best for**: Mid-to-large publishers (100K+ monthly opens) wanting managed programmatic email ad serving with premium exchange demand. Too heavy for small newsletters — use Admailr (no minimum) or Paved Ad Network instead.
- **Platform skill**: `/sales-passendo` for ad server setup, fill rate optimization, ESP integration, and platform-specific help.

## In Kevel
- **API-first ad server**: Kevel (formerly Adzerk) is ad server infrastructure — you build your own custom ad platform using their APIs. Server-to-server architecture, not a plug-and-play ad network. Powers Home Depot, PayPal, Lyft. 3B+ daily API requests.
- **Email ad serving**: Serves image-only creatives in newsletters via static HTML tags. No JS/iFrame support in email. Campaign → Flight → Creative hierarchy.
- **Gmail workarounds required**: Gmail caches identical image URLs across recipients (breaks impression counting) and proxies image requests through their own IPs (breaks geo-targeting). Fix: append unique per-subscriber segment to image URL + `?key={userKey}` parameter.
- **Revenue model**: You control pricing — CPM, CPC, CPA, or flat rate. Kevel provides the ad decisioning engine; you set the business terms.
- **Targeting**: Geo, keyword, custom properties, user-level (via UserDB), audience segments (via Kevel Audience). Frequency capping and ad pacing at flight level.
- **Pricing**: Custom only — no published tiers. Based on features + monthly request volume. Free trial available.
- **Integrations**: No native Zapier/Make. SDKs for JavaScript and Ruby. OpenAPI spec available. Full REST API.
- **Best for**: Engineering teams building custom ad platforms for marketplaces, publisher networks, or apps. Overkill for simple newsletter ad monetization — use Admailr or Paved instead.
- **Platform skill**: `/sales-kevel` for API integration, email ad setup, campaign management, and troubleshooting.

## In PostApex
- **CPC ad network**: PostApex is an email newsletter ad network connecting advertisers with 500+ publishers across 50+ categories, reaching 100M+ subscribers. London-based, founded 2022.
- **Ad formats**: Native ads (blend with newsletter content), Affiliate ads (beta — action-based payouts), Programmatic ads (coming soon — not yet available).
- **Revenue model**: CPC-only — publishers earn per click, not per impression. Advertisers set their own CPC bid. PostApex takes a $0.05–$0.30 spread per dollar.
- **Earnings example**: 10K subscribers × 5% CTR × $1.50 avg CPC = $750 per campaign. Smaller newsletters earn proportionally less.
- **Publisher workflow**: Manual — browse approved ads in dashboard, copy tracking links, style into your ESP template. No automated ad insertion.
- **Pricing**: Free for both publishers and advertisers. No platform fees, no signup costs, no withdrawal charges.
- **Payment**: Earnings accumulate in wallet. ~$100 minimum payout threshold (user-reported). Payment schedule and methods not publicly documented.
- **Limitations**: No API, no webhooks, no Zapier/Make/MCP. Completely UI-only. Click underreporting has been reported by users. Support responsiveness varies.
- **Best for**: Small publishers wanting zero-cost entry into newsletter ad revenue with no subscriber minimum. Good for backfill alongside premium sponsors. Not ideal if you need automated ad insertion (use Admailr) or direct sponsor relationships (use Paved/Hecto).
- **Platform skill**: `/sales-postapex` for publisher setup, revenue optimization, troubleshooting, and ad network comparison.

## In AdButler
- **Full-stack ad server**: AdButler is a managed ad server (25+ years, 1,000+ clients) with display, video, mobile, native, and email ad serving, plus a self-serve advertiser portal and programmatic SSP. Independent alternative to Google Ad Manager.
- **Email ad serving**: Create email-type zones, upload image-only creatives, generate zone tags with your ESP's EUID macro, paste into template. Ads can be updated after send (images resolve dynamically from CDN).
- **Self-serve portal**: Let advertisers create, manage, and pay for their own campaigns through a white-labeled portal. Approval workflows, payment processing included.
- **Revenue model**: You set your own pricing — CPM, CPC, flat rate. Direct deals + programmatic auctions + self-serve in one platform.
- **API & MCP**: REST API at `api.adbutler.com/v2/` (Bearer token auth). JSON ad serving API at `servedbyadbutler.com/adserve` (no auth). MCP server for Claude/Cursor (`@adbutler/mcp-server`). PHP and Node.js SDKs.
- **Pricing**: Essentials $179/mo (1M requests, 10 zones), Standard $682/mo (10M requests, 100 zones). API Access and Targeting are paid add-ons. Free trial available.
- **Infrastructure**: 99.99% uptime SLA, sub-100ms response, 300+ global edge locations.
- **Limitations**: API Access is a paid add-on on all base plans. Email zones are image-only. Essentials caps at 10 zones and 10 advertisers. No Zapier/Make. No webhooks documented. UI feels dated (G2 reviewer feedback).
- **Best for**: Mid-to-large publishers wanting a managed ad server with self-serve portal and email ad support without building from scratch. Too expensive for small newsletters — use Admailr (no minimum, free) or PostApex (free CPC network) instead.
- **Platform skill**: `/sales-adbutler` for ad server setup, API integration, MCP server, email ad serving, and troubleshooting.

## In Epom
- **Hosted ad server + white-label DSP**: Epom is a hosted ad server and white-label DSP founded in 2010, serving 350+ clients across 40+ countries. Manages direct and programmatic ad inventory across web, mobile, in-app, and CTV channels.
- **Email ad serving**: Create email-type zones with image-only creatives. Generate ad tags and paste into your ESP template. Ads resolve dynamically from Epom's CDN.
- **Key differentiator**: API access, RTB module, white-labeling, and support are included on all plans — competitors (AdButler, Kevel) charge extra for some of these.
- **Revenue model**: You set pricing — CPC, CPM, CPA. Direct-sold campaigns plus RTB module (free for publishers) for programmatic backfill.
- **API**: REST API included on all plans (HMAC auth). 60+ endpoints for campaigns, advertisers, targeting, analytics, banners, zones. No webhooks or Zapier/Make.
- **Analytics**: 40+ real-time and historical metrics with multidimensional custom reporting. Export to CSV, XLS, PDF, HTML, JSON.
- **Pricing**: Ad server from $250/mo (~$224/mo per 10M impressions). DSP Light $250/mo or 5% spend. 14-day free trial (30M monthly impressions).
- **Limitations**: No self-serve advertiser portal (unlike AdButler). No MCP server. No webhooks. UI is complex for newcomers (800+ features). White-labeling requires premium package.
- **Best for**: Mid-market publishers and ad networks wanting a customizable ad server with API and RTB included in the base price. For self-serve portal, use AdButler. For API-first custom builds, use Kevel. For automated email ads without setup, use Admailr.
- **Platform skill**: `/sales-epom` for ad server setup, API integration, DSP configuration, and troubleshooting.

## In Broadstreet
- **Direct-sold ad manager**: Broadstreet is an ad manager built for local news, regional magazines, and B2B publishers who sell ads directly to advertisers. #1 rated on G2 for local/B2B publisher ad servers. No programmatic/RTB — purely direct-sold.
- **Newsletter ad zones**: Create zones in the Broadstreet dashboard, get static zone code, paste into your ESP template. Supports MailChimp, ActiveCampaign, ConstantContact, HubSpot. Static code method preferred over RSS merge.
- **Gmail cachebusting**: Append ESP-specific merge tags to zone URLs to prevent Gmail from caching the same image for all subscribers. For MailChimp: `?*|CAMPAIGN_UID|**|UNIQID|*`.
- **Position numbering**: When using the same zone multiple times, increment the position: `/click/0`, `/click/1`, `/click/2`. Without this, ads may duplicate.
- **Keyword targeting**: Add `kw=tech,software&skw=true` to zone URLs for content-based ad matching. `skw=true` enables soft matching (non-tagged ads also eligible).
- **Overflow handling**: Add `overflow=0` to show a blank pixel instead of duplicating when a zone has no ad assigned.
- **Sponsored content tracking**: Native click tracking with timestamp and location data on WordPress posts. Broadstreet tracks independently of Google Analytics — advertisers don't need GA access.
- **Automated PDF reports**: Client-ready reports combining web, newsletter, and sponsored content data. Scheduled delivery by email.
- **Pricing**: Manual $299/mo (1-2 users), Automatic $399/mo, Enterprise custom, Premier $2,999/mo. No free plan or trial. Valet service $10 per 15 minutes.
- **Limitations**: No programmatic/RTB (direct-sold only). Newsletter ads are image-only (no JS/dynamic formats). Campaign de-duplication doesn't work in email (requires JS). No Zapier/Make. No webhooks. API docs are JS-rendered.
- **Best for**: Local news, regional magazine, and B2B publishers with direct sales teams who want purpose-built ad management with newsletter integration and automated reporting. For programmatic, use Epom or AdButler. For self-serve advertiser portal, use AdButler.
- **Platform skill**: `/sales-broadstreet` for ad server setup, newsletter zone integration, API usage, WordPress plugin, and troubleshooting.

## In AdPlugg
- **Budget ad server + ad manager**: AdPlugg is a cloud-based ad server with plugins for WordPress, Ghost, Drupal, Joomla, Squarespace, Wix, Weebly, and Blogger. Targets bloggers and small publishers who want simple ad management at low cost.
- **Email newsletter ads**: Available on the Business plan ($79/mo). Create ads in the dashboard, get an Email Tag (static image URL — no JavaScript), paste into Ghost HTML cards or ESP templates. Email Tags work on both your website and in newsletters.
- **Ad formats**: Image ads (Free), plus bar, HTML5, text, dialog, slide-in, interstitial, video (Pro+), plus in-stream video and email ads (Business+).
- **Rotation and scheduling**: All plans include automatic ad rotation across zones and start/end date scheduling.
- **Targeting**: Zone and path targeting on all plans. Open Graph tag targeting on Pro+. Geotargeting, frequency capping, and ad groups on Business+.
- **A/B testing**: Available on Business plan — assign multiple ads to the same zone and AdPlugg automatically splits traffic.
- **Pricing**: Free (100K impressions/mo, image ads only), Pro $10/mo (all web ad formats, downloadable reports), Business $79/mo (email ads, geotargeting, frequency capping, A/B testing, automated reports).
- **Limitations**: No API, no webhooks, no Zapier/Make. All management is through the web dashboard. No programmatic/RTB. No self-serve advertiser portal. No sponsored content tracking. Flash ads listed but deprecated.
- **Best for**: Bloggers and small publishers wanting the cheapest way to manage their own display and email ads. Too basic for mid-large publishers — use AdButler (self-serve portal, API) or Broadstreet (direct-sold, reports) instead.
- **Platform skill**: `/sales-adplugg` for WordPress/Ghost setup, email ad configuration, and troubleshooting.

## In AdSpeed
- **Affordable hosted ad server**: AdSpeed is a hosted ad server established in 2000, serving publishers, advertisers, agencies, and ad networks. Starts at $9.95/mo for 100K impressions with sliding scale pricing. All plans include email newsletter zones and REST API access.
- **Email newsletter ads**: Create an Email/Newsletter zone type. Only image banner ads are supported — no HTML, no rich media. Ad tag is a static `<a>` + `<img>` pair (no JavaScript). Paste into any ESP HTML template.
- **Unique pair matching**: If your ESP supports merge tags (e.g., MailChimp `*|EMAIL_UID|*`), add `&pair=em@{MERGE_TAG}` to both the click URL and image URL. This enables multiple active ads in one zone with per-recipient impression-to-click tracking.
- **Without merge tags**: Keep only one active ad per zone at a time. Switch ads via deactivation or start/end date scheduling.
- **Keyword targeting**: Add `&keywords=brandname` to serve specific ads based on subscriber segment.
- **API**: REST API at `api.adspeed.com` with MD5 signature auth. ~50+ endpoints for zones, ads, campaigns, advertisers, websites, channels, and stats. 600 req/hr, XML responses.
- **Targeting**: Geo, time-of-day, keyword, and competitive/companion positioning. Ad optimization by CTR, revenue, conversion, or eCPM.
- **Pricing**: Premium 100 at $9.95/mo (100K impressions), slider-based scaling. Up to 20% discount with annual prepayment. Add-ons: White Label $60/mo, Ad Network $100/mo. Free 10-day trial, 30-day money-back guarantee.
- **Limitations**: API responses are XML only (no JSON). No webhooks, no Zapier/Make, no MCP server. Email zones only support image banners. Costs grow linearly with impressions.
- **Affiliate program**: $50 flat per referral (90-day retention required).
- **Best for**: Budget-conscious publishers who want hosted ad serving with email newsletter support and API access without managing their own server. For self-hosted free, use Revive. For self-serve advertiser portal, use AdButler. For direct-sold local, use Broadstreet.
- **Platform skill**: `/sales-adspeed` for ad server setup, email zone configuration, API usage, and troubleshooting.

## In Revive Adserver
- **Free open-source ad server**: Revive Adserver is a self-hosted ad serving system (GPL v2+) — zero platform fees, unlimited ad requests, full control over your infrastructure. Formerly OpenX Source.
- **Email/newsletter zones**: Dedicated zone type for email ads. Image-only banners, no JavaScript, no cookies. Click tracking via `ck.php` redirect, impression tracking via image pixel.
- **One-banner limitation**: Only one active banner can serve per email zone by default. For rotating multiple banners, purchase the "Multiple Ads in an Email Zone" plugin from reviveadservermod.com.
- **Email zone tag**: `<a href="{REVIVE_URL}/ck.php?n={ZONE_ID}"><img src="{REVIVE_URL}/avw.php?zoneid={ZONE_ID}&cb={CACHEBUSTER}" /></a>` — works with any ESP that supports raw HTML.
- **Geo-targeting**: Country, region, and city targeting via MaxMind GeoLite2 database (free MaxMind account required for download).
- **Frequency capping**: Limit impressions per visitor per campaign or per session.
- **API**: Built-in XML-RPC v2 API with 80+ methods across 11 services. Manage advertisers, campaigns, banners, zones, and pull statistics programmatically. Third-party REST API plugin available (paid).
- **Pricing**: Free (self-hosted). Hosted edition at revive-adserver.net from $10/mo (1M ad requests) at $0.01 CPM.
- **Limitations**: Self-hosting requires server management (PHP, MySQL, Apache/Nginx). No managed hosting on free tier. No Zapier/Make, no MCP server. PHP version compatibility is strict (v5.x needs PHP 7.x, v6.x needs PHP 8+). Email zones only support image banners.
- **Best for**: Technical publishers and solopreneurs who want full control over ad serving at zero cost and can manage their own server. For managed hosting without ops burden, use AdButler or Epom instead.
- **Platform skill**: `/sales-revive` for installation, email zone setup, API usage, and troubleshooting.

## In Adserver.Online
- **Cloud-hosted ad server for ad networks**: Adserver.Online is an ad tech platform for building ad networks, ad serving, and ad tracking. Supports display, video, native, email, and programmatic (OpenRTB/Prebid) ad serving with multicurrency bidding.
- **Email newsletter ads**: Requires Premium plan ($199/mo). Create a campaign with an image banner, create a zone, select "Email" code type, choose your ESP from the dropdown, copy the generated `<a>` + `<img>` tag into your template.
- **Unique message ID required**: Each email send must include a unique per-message ID via your ESP's merge tag macro. Without it, tracking breaks.
- **Custom attribute targeting**: Append `&attr[zipcode]=foo&attr[tier]=premium` to the image URL for segment-based ad selection in email.
- **API**: REST API v2.4.0 at `api.adsrv.net/v2` with Bearer token auth. Full CRUD for campaigns, ads, zones, sites, users, and stats. 100 req/min rate limit. Premium+ plan required.
- **Pricing**: Starter $49/mo (1M requests, no email/API), Premium $199/mo (10M, email/video/API/RTB), Ultimate $599/mo (50M, Prebid/white-label/SLA). 14-day free trial.
- **Limitations**: No webhooks, no Zapier/Make, no MCP server. Email ads are image-only. No self-serve advertiser portal. No CORS (server-side only).
- **Best for**: Ad network operators and publishers wanting RTB + email + video in one platform at competitive pricing. For self-serve portal, use AdButler. For API-first custom builds, use Kevel. For free self-hosted, use Revive.
- **Platform skill**: `/sales-adserver-online` for ad server setup, email ad configuration, API usage, and troubleshooting.

## In AdvertServe
- **Feature-rich hosted ad server**: AdvertServe is a cloud-hosted ad server operating since 1998, serving 30,000+ sites across 60+ countries. Unified platform for web, mobile, email, and video ad serving. Targets B2B and niche publishers with direct sales teams.
- **Email newsletter ads**: Use the Code Wizard to generate "E-mail" code for Banner zones. Produces a static `<a>` + `<img>` tag pair — no JavaScript. Works with any ESP that supports raw HTML (Mailchimp, ActiveCampaign, etc.).
- **Image-only creatives**: Email ads must use JPEG, GIF, or PNG images. Code-based images and HTML5 creatives are not accepted for email zones.
- **101-tier zone system**: Each zone supports 101 priority tiers (0-100). Assign premium sponsors to high tiers, backfill to low tiers. Header bidding via Prebid.js can fill mid-level tiers programmatically.
- **Targeting**: Geographic (continent to zip code), keyword, contextual (full-text indexing), weather, frequency capping, custom fields (up to 10). Weather targeting is unique among ad servers in this category.
- **Video support**: VAST 2.0/3.0/4.0 and VPAID 2.0 — pre/mid/post-roll, companion banners. Compatible with Brightcove, JW Player, Kaltura, Video.js.
- **API**: REST API with 17 modules (Zones, Campaigns, Advertisers, Media, Reports, Code Wizard, etc.). HTTP GET/POST, JSON or XML responses, secret key auth. No rate limit documented. No webhooks.
- **White-label**: Custom domains and UI branding included on all plans (no extra cost).
- **Pricing**: Single "ONE" plan starting at $299/mo for 2M impressions. Scales to $0.003 CPM at 10B impressions. 45-day free trial. No contracts.
- **Limitations**: No webhooks, no Zapier/Make, no MCP server. Email ads are image-only. Documentation is technical (may be challenging for non-coders). No self-serve advertiser portal (use AdButler for that).
- **Best for**: Mid-to-large publishers needing a feature-rich hosted ad server with video, display, email, header bidding, and white-label in one platform. Too expensive for small publishers — use AdSpeed ($9.95/mo) or Revive (free) instead. For self-serve portal, use AdButler.
- **Platform skill**: `/sales-advertserve` for ad server setup, email ad configuration, API usage, and troubleshooting.
