<!-- Source: https://apidocs.vistasocial.com/ (JS-rendered — partial info from support articles and Zapier/Make docs) -->
<!-- Source: https://support.vistasocial.com/hc/en-us/articles/32993061787035-Vista-Social-API -->

# Vista Social API Reference

## Status

API docs at apidocs.vistasocial.com are JS-rendered and could not be fetched directly. This reference is compiled from support articles, Zapier/Make module documentation, and search results. Verify against the live API docs.

## Overview

Vista Social API provides external access to owned social profile data for powering dashboards and automating reporting. The API is a **paid add-on** (pricing not public) — separate from the Zapier/Make integrations which are included on Advanced+ plans.

## Authentication

- **Method**: API key
- **Location**: Settings → Account Settings → Integrations in Vista Social dashboard
- **Header**: Not documented in fetchable sources — likely `Authorization: Bearer {api_key}` or custom header

```bash
# Example (verify auth header format against live docs)
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.vistasocial.com/v1/profiles
```

## Known endpoints

Based on support articles and Zapier/Make module reverse-engineering:

| Category | Capability | Source |
|---|---|---|
| **Profile data** | Get owned social profile metrics (matches Social Media Performance report) | API |
| **Post data** | Get published post metrics (matches Post Performance Report) | API |
| **Comment data** | Get comment details and metadata | API |
| **Schedule posts** | Create/schedule posts to connected profiles | API + Zapier/Make |
| **Ideas** | Create ideas | Zapier/Make |
| **Notes** | Create notes | Zapier/Make |
| **Profile groups** | Create/edit profile groups | Zapier/Make (PREMIUM) |
| **Team** | Invite team members, edit team members | Zapier/Make |
| **Inbox** | Get inbox items (comments, messages) | Zapier (PREMIUM) |
| **Metrics** | Get daily profile metrics | Zapier (PREMIUM) |
| **Post metrics** | Get published post metrics | Zapier (PREMIUM) |
| **Reply** | Reply to comments, messages, reviews, mentions | Zapier (PREMIUM) |

## Pagination

Not documented in fetchable sources. Based on typical REST API patterns, likely offset-based or cursor-based pagination.

## Rate limits

- **Zapier/Make**: 60 requests/minute (3,600/hour)
- **Direct API**: Not documented — likely similar or higher

## Data not available via API

- Paid/Ad Account data — not exposed
- X/Twitter data — excluded from API
- Social listening data — not exposed via API
- DM automation data — UI-only
- Employee advocacy data — UI-only

## iPaaS surface (primary programmatic interface)

For most users, **Zapier/Make/n8n are the primary programmatic interface** since the API is a paid add-on.

### Zapier (7 triggers, 11 actions)

**Triggers:**
1. `post_failed` — Post Failed to Publish
2. `draft_created` — New Draft Is Created
3. `internal_comment` — New Internal Post Comment
4. `post_scheduled` — New Post Is Scheduled
5. `post_published` — New Post Is Published
6. `post_rejected` — Post Has Been Rejected
7. `post_review` — Post Needs to Be Reviewed

**Actions:**
1. `create_idea` — Create a new idea
2. `create_note` — Create a new note
3. `schedule_post` — Schedule a new post
4. `create_internal_comment` — Create internal post comment
5. `create_profile_group` — Create profile group (PREMIUM)
6. `edit_profile_group` — Edit profile group (PREMIUM)
7. `invite_team_member` — Invite team member
8. `reply` — Reply to comment/message/review/mention (PREMIUM)
9. `get_daily_metrics` — Get daily profile metrics (PREMIUM)
10. `get_inbox` — Get inbox items (PREMIUM)
11. `get_post_metrics` — Get post metrics (PREMIUM)

### Make (12 modules)

**Actions:**
1. Create a New Idea
2. Create a New Internal Post Comment
3. Create a New Note
4. Create a New Profile Group (PREMIUM)
5. Delete Scheduled Post
6. Edit Profile Group (PREMIUM)
7. Edit Team Member
8. Get Profile Groups
9. Schedule a New Post
10. Update Scheduled Post

**Trigger:**
11. Watch Scheduled Posts

**Utility:**
12. Make an API Call (custom endpoint access)

## Gaps

- Full API endpoint reference (paths, parameters, response schemas) — JS-rendered docs
- Auth header format — not confirmed
- Direct API rate limits — not documented
- Webhook support — not found (no outbound webhooks documented)
- Pagination pattern — not documented
- Error response format — not documented
- API add-on pricing — not public
