<!-- Source: https://information.broadstreetads.com/api-documentation/ and https://github.com/broadstreetads/broadstreet-api-php -->

# Broadstreet API Reference

## Authentication

Broadstreet uses access token authentication. Obtain your token from:
https://my.broadstreetads.com/access-token

Pass the token in API requests (exact header format not documented in public sources — the PHP SDK accepts it as a constructor parameter).

**PHP SDK auth:**
```php
$client = new Broadstreet('YOUR_ACCESS_TOKEN');
```

## Base URL

`https://api.broadstreetads.com/v1/` (inferred from docs URL structure and SDK patterns)

Full interactive API documentation is available at:
https://api.broadstreetads.com/docs/v1/

**Note**: The API docs page is JS-rendered and cannot be fetched programmatically. Access it in a browser for the complete endpoint reference.

## Known Endpoints

### From PHP SDK

| Method | Description | Parameters |
|--------|-------------|------------|
| `createAdvertisement()` | Create a new advertisement | `$network_id`, `$advertiser_id`, `$name`, `$type`, `$options` |

**Advertisement types**: `image`, `text`, and others (full list in API docs)

**Example — Create image advertisement:**
```php
$ad = $client->createAdvertisement(
    $network_id,
    $advertiser_id,
    'New Ad!',
    'image',
    array(
        'image_url' => 'https://cdn.example.com/banner.jpg',
        'click_url' => 'https://advertiser.com/landing'
    )
);
echo $ad->html;  // Ready-to-use HTML snippet
echo $ad->id;    // Advertisement ID
```

### Ad Serving (Zone Tags)

**Base URL for ad serving:**
- Click URL: `https://ad.broadstreetads.com/zone/{ZONE_ID}/click/{POSITION}`
- Image URL: `https://ad.broadstreetads.com/zone/{ZONE_ID}/image/{POSITION}`

**Parameters (appended as query strings):**

| Parameter | Description |
|-----------|-------------|
| `ds=true` | Daily shuffle — randomize ad rotation daily |
| `seed={id}` | Per-user shuffle — vary by subscriber while maintaining consistency |
| `kw=keyword1,keyword2` | Keyword targeting |
| `skw=true` | Soft keywords — non-tagged ads also eligible |
| `overflow=0` | Show blank pixel when zone is empty (instead of duplicating) |

**Position numbering**: When using the same zone multiple times in one page/email, increment the position number: `/click/0`, `/click/1`, `/click/2`, etc.

## SDKs

| SDK | Language | Repository |
|-----|----------|------------|
| broadstreet-api-php | PHP | https://github.com/broadstreetads/broadstreet-api-php |
| broadstreet-ruby | Ruby | https://github.com/broadstreetads/broadstreet-ruby |

## WordPress Plugin

- **Plugin**: https://wordpress.org/plugins/broadstreet/
- **Source**: https://github.com/broadstreetads/broadstreet-wp
- Handles zone placement, ad display, and sponsored content tracking

## Gaps

The following information could not be determined from public sources:

- **Full endpoint list** — API docs at api.broadstreetads.com/docs/v1/ are JS-rendered and unfetchable. Only `createAdvertisement()` is documented in the PHP SDK README.
- **Request/response format** — JSON assumed from SDK patterns but not confirmed for all endpoints
- **Pagination** — pattern unknown
- **Rate limits** — not documented
- **Webhooks** — none documented
- **Reporting API endpoints** — likely exist (for automated reports) but not publicly documented
- **Zone management endpoints** — likely exist but not publicly documented
- **Advertiser management endpoints** — likely exist but not publicly documented

For complete API documentation, access https://api.broadstreetads.com/docs/v1/ in a browser or contact Broadstreet support.
