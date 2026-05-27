# Devta Platform Reference

## Overview

Devta is an AI Networking Agent that proactively builds your presence in Reddit, LinkedIn, and Upwork communities. Unlike keyword monitoring tools that wait for mentions, Devta's agent goes out and participates — commenting, engaging, and nurturing conversations in your voice. Targeted at freelancers, consultants, and founders who build businesses on trust and reputation.

## Capabilities & automation surface

| Module | What it does | Automation surface |
|---|---|---|
| **AI Networking Agent** | Automated community engagement — reads trending topics, browses discussions, leaves comments in your voice, nurtures threads to DMs | UI-only — runs through your browser session |
| **Persona System** | Define your professional background, expertise, voice, and communication style for authentic agent behavior | UI-only |
| **Human-in-the-Loop View** | Live view of agent activity — see it scroll, click links, type letter-by-letter. Stop and reset instantly if it makes a mistake | UI-only |
| **Draft Posts** | AI scans trending topics, researches on Google and Reddit Answers, picks strongest angle, drafts posts ready to publish | UI-only |
| **DM Nurturing** | Identifies people who showed interest in comments, initiates DMs as natural conversation continuations | UI-only |
| **Project Planning** | Generates client-ready blueprints with scope, timeline, cost, architecture diagrams at devta.so/@you/project-name | UI-only |
| **Project Assistant** | Built-in assistant that knows project context — drafts updates, answers client questions, handles change requests | UI-only |

## Pricing, limits & plan gates

<!-- Best-effort from research — verify against current pricing page -->

Devta uses a **credit-based pay-as-you-go model**, not monthly subscription tiers.

| Item | Details |
|---|---|
| **Top-up cost** | $49 per top-up |
| **Networking minutes** | ~189 minutes of AI Networking per $49 top-up |
| **Project plans** | ~20 plans per $49 top-up |
| **Free trial** | Available (details unspecified) |
| **Platforms** | Reddit, LinkedIn, Upwork |

**Key limits:**
- Credits are consumed per minute of agent runtime (networking) or per plan generated (project planning)
- No monthly quotas or resets — credits last until used
- Each session consumes credits based on duration, not number of comments
- No tier-gated features — all capabilities available to all users

## Integrations

| Integration | Type | Direction | Notes |
|---|---|---|---|
| **REST API** | Not available | — | No public API |
| **Webhooks** | Not available | — | No webhook support |
| **Zapier** | Not available | — | No Zapier integration |
| **Make** | Not available | — | No Make integration |
| **MCP** | Not available | — | No MCP server |
| **CRM sync** | Not available | — | No CRM connectors |

**No programmatic interface exists.** Devta is entirely UI-driven. All interactions happen through the web interface with the live agent view. There is no way to export engagement data, sync leads to a CRM, or trigger external workflows.

**Workaround:** Manually track engaged leads in a spreadsheet or CRM. Copy conversation details from Devta's activity log to your pipeline tool.

## Data model

Devta doesn't expose a formal data model. Based on the UI, the agent workflow produces:

```json
<!-- Constructed from UI observation — verify against live product -->
{
  "persona": {
    "name": "Your Name",
    "background": "SaaS founder, 8 years in project management tools",
    "expertise": ["project management", "productivity", "B2B SaaS"],
    "communication_style": "Helpful, technical but accessible, uses specific examples"
  },
  "session": {
    "platform": "reddit",
    "duration_minutes": 45,
    "credits_consumed": "proportional to duration",
    "communities_visited": ["r/projectmanagement", "r/SaaS", "r/startups"],
    "comments_posted": 8,
    "dms_initiated": 2,
    "status": "completed | stopped | error"
  },
  "project_plan": {
    "public_url": "https://devta.so/@yourname/project-name",
    "sections": ["scope", "timeline", "cost", "architecture"],
    "includes_diagrams": true
  }
}
```

## Quick-start recipes

### Recipe 1: Set up your first Reddit networking session

**Trigger:** You want Devta to start building your presence in Reddit communities.

**Steps:**
1. Sign up at devta.so and complete onboarding
2. Set up your Persona:
   - Name: Your real name
   - Background: Your professional history (specific roles, years, domains)
   - Expertise: 3-5 specific topics you're knowledgeable about
   - Communication style: How you naturally write (formal/casual, technical depth, typical openers)
3. Select target subreddits (start with 2-3)
4. Add custom instructions for the session (optional: focus on specific topics)
5. Start the agent and watch via live view
6. Monitor for the first 15 minutes — stop and adjust if comments miss the mark

**Gotchas:**
- Your Reddit account should have 2+ weeks of manual activity and positive karma before running the agent
- Start with a 30-minute session to validate quality before longer runs
- The agent reads your recent comment history to calibrate — make sure you have some manual comments in your target communities first

### Recipe 2: Use Draft Posts for consistent visibility

**Trigger:** You want to maintain a regular posting cadence without spending networking credits on browsing.

**Steps:**
1. Open the Draft Posts feature in the Networking Agent
2. Add custom instructions: specify your niche, what topics resonate with your audience
3. The agent scans trending topics in your target communities
4. It researches using Google and Reddit Answers for the strongest angle
5. Review the drafted post — edit for your voice and add personal anecdotes
6. Publish manually (Devta prepares the draft, you approve and post)

**Gotchas:**
- Draft Posts consume fewer credits than live networking sessions
- Always add personal experience to AI-drafted posts — pure AI content gets detected and downvoted on Reddit
- Post at peak activity times (weekday mornings US time for most subreddits)

### Recipe 3: Nurture Reddit threads into DM conversations

**Trigger:** You've been engaging in communities and want to move interested people toward a call or signup.

**Steps:**
1. Let the Networking Agent engage in threads naturally first (commenting, answering questions)
2. The agent identifies people who showed real interest (asked follow-up questions, engaged with your comments)
3. It initiates DMs as natural continuations — referencing the thread conversation
4. Monitor DMs via live view to ensure quality and appropriate timing
5. Take over manually when the conversation gets to booking a call or discussing specifics

**Gotchas:**
- Don't DM people who haven't engaged with you first — Reddit flags unsolicited DMs
- The agent's DM quality depends heavily on the Persona setup
- Some subreddits have rules against promotional DMs — check community guidelines first

## Integration patterns

### Manual export pattern

Since Devta has no API or webhook support, the only integration approach is manual:

```
Devta (live agent view)
  → Review engagement log in UI
    → Manually copy high-value leads to CRM
      → Track conversations and follow-ups externally
```

**Optimizing manual workflow:**
1. After each session, review the agent's activity log
2. Identify high-value conversations (people who asked questions, showed interest)
3. Add these contacts to your CRM with context (subreddit, thread topic, conversation summary)
4. Set follow-up reminders in your CRM
5. Continue conversations manually outside Devta

### Combining Devta with monitoring tools

Devta is proactive (builds presence) while monitoring tools are reactive (alerts for keywords). They complement each other:

```
Monitoring (Syften/KeyMentions/RedShip)
  → Alerts when someone asks about your domain
    → You respond directly (reactive)

Devta (Networking Agent)
  → Builds your reputation in communities over time
    → People think of you before they even post (proactive)
```

**Recommended pairing:**
- Use Syften or RedShip for keyword monitoring (alerts when someone mentions your product category)
- Use Devta for ongoing presence building (so people already know you when they have a need)
- The two approaches reinforce each other — monitoring catches immediate opportunities, Devta builds long-term trust
