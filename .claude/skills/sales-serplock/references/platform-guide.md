# Serplock Platform Reference

## Overview

Serplock is an AI search visibility platform that helps brands track and optimize their presence in LLM-generated answers. It combines prompt ranking, brand perception monitoring, knowledge graph mapping, and AI content generation into a single workflow. Targets mid-market B2B brands doing Answer Engine Optimization (AEO).

## Capabilities & automation surface

| Module | What it does | Access |
|---|---|---|
| **Prompt Rank** | Tracks brand mentions, citations, and competition across LLM prompts (ChatGPT, Perplexity, Gemini, Claude) | UI-only |
| **Brand Wiki** | Monitors how LLMs perceive and position your brand, surfaces inconsistencies across models | UI-only |
| **Topic Graph** | Maps brand knowledge graph and entity relationships, identifies topical authority gaps | UI-only |
| **Content Engineering** | Generates content from AI agents trained on brand style guides, formatting rules, and ingested brand knowledge | UI-only |
| **Reddit Mentions** | Tracks brand conversations on Reddit with alerts, AI analysis, and response tools | UI-only (add-on) |
| **Bot Analytics** | Tracks AI bot traffic to your site (which bots, how often, what they crawl) | UI-only (Pro+ only) |

**No public API, no webhooks, no Zapier/Make integrations, no MCP server.** All interaction is through the web UI. Content export is manual.

## Pricing, limits & plan gates

| Feature | Startup ($49/mo) | Growth ($99/mo) | Pro ($199/mo) | Enterprise ($299/mo) |
|---|---|---|---|---|
| Tracked prompts | 35 | 100 | 200 | 300 |
| AI articles/mo | 5 | 15 | 30 | 60 |
| Entity discovery | Up to 10 | Up to 25 | Up to 40 | Unlimited |
| Knowledge Graph | Yes | Yes | Yes | Yes |
| Brand Wiki | Yes | Yes | Yes | Yes |
| Visibility tracking | Yes | Yes | Yes | Yes |
| Serplock Insights | Yes | Yes | Yes | Yes |
| Brand styleguide | Yes | Yes | Yes | Yes |
| Bot Analytics | No | No | Yes (10K bot traffic) | Yes (30K bot traffic) |

**Add-ons:**
- Reddit Mentions: from $20/mo (on top of base plan)
- Additional article generation credits: available separately
- Custom agency plans: for multi-brand management
- Done-for-you (DFY) services: from $500/mo

**Free trial available** — no free tier mentioned.

## Workflow

Serplock follows a four-step workflow:

1. **Strategize** — Discover LLM-first topics using Topic Graph and entity mapping
2. **Track** — Monitor LLM referral traffic and prompt rankings via Prompt Rank
3. **Optimize** — Measure content uniqueness, fix technical issues, address Brand Wiki inconsistencies
4. **Generate** — Create and export content using Content Engineering agents

## Key concepts

- **Answer Engine Optimization (AEO)** — optimizing content to appear in AI-generated answers rather than traditional search results
- **Prompt Rank** — Serplock's metric for how often and where your brand appears when LLMs answer tracked prompts
- **Topical Authority** — building comprehensive entity coverage in a domain so LLMs recognize your brand as authoritative
- **Brand entity clarity** — ensuring consistent naming, structured data, and entity relationships across web presence

## Integration patterns

Since Serplock has no API or webhook surface, integration options are limited:

- **Manual export** — Content Engineering output can be copy-pasted or exported manually to your CMS
- **Insight export** — Brand Wiki and Prompt Rank data can be screenshotted or manually compiled for reports
- **Complementary tools** — Pair with Semrush (SEO data), Ahrefs (backlink data), or dedicated monitoring tools for a complete stack

## When to choose Serplock

**Choose Serplock when:**
- You want visibility tracking AND content generation AND entity mapping in one tool
- You're doing Answer Engine Optimization as a primary strategy
- You need to understand and correct how LLMs perceive your brand
- Budget is $49-299/mo for AI visibility

**Choose alternatives when:**
- You only need AI mention monitoring → Otterly.ai (~$49/mo, broader model coverage)
- You already have Semrush → use Semrush AI Visibility Toolkit (included in plan)
- You already have Ahrefs → use Ahrefs Brand Radar (included in plan)
- You need API access or automation → Serplock has none
- Budget is under $49/mo → manual monitoring with prompt templates (see /sales-ai-visibility)
