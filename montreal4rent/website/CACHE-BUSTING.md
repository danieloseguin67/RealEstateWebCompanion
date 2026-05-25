# Image Cache-Busting Implementation

## Overview
Automatic cache-busting has been implemented for all images in the Montreal4Rent application. This ensures users always see the latest images without needing to manually clear their browser cache.

### Development vs Production Behavior

**Development Mode (localhost):**
- Images use a **session timestamp** (generated once when app starts)
- Timestamp stays the same during a session (no flickering!)
- Changes on page refresh/reload - you see updated images
- **No browser caching** - fresh images on every reload
- Perfect for testing and development

**Production Mode (live site):**
- Images use a static version parameter (e.g., `?v=1.0.0`)
- Version only changes when you increment it
- Browsers cache images efficiently
- Users get fresh images when you deploy updates

## How It Works
All image URLs now automatically include a version parameter (e.g., `?v=1.0.0`) that forces browsers to reload images when the version changes.

## When Deploying New Images

### Simple Method: Update Cache Version
When you upload new images and want users to see them immediately, simply increment the `cacheVersion` in your environment files:

**Production** (`website/src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: './data',
  version: '1.0.0',
  cacheVersion: '1.0.1'  // ← Increment this!
};
```

**Development** (`website/src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: '../../data',
  version: '1.0.0',
  cacheVersion: '1.0.1'  // ← Increment this!
};
```

### Version Numbering Suggestions
- **Minor image updates**: 1.0.0 → 1.0.1
- **Multiple image updates**: 1.0.0 → 1.1.0
- **Complete image refresh**: 1.0.0 → 2.0.0
- **Using dates**: 2026.02.20 (YYYY.MM.DD format)

## Testing

### Testing in Development (localhost)
When running `npm start`:
1. Images will have a session timestamp: `image.jpg?v=1708473600000`
2. Timestamp is generated once when the app starts (prevents flickering)
3. Timestamp changes when you stop and restart the dev server
4. Browser won't cache images between sessions
5. **Refresh the page (F5 or Ctrl+R)** to see new/updated images
6. Check browser Network tab (F12 → Network) to see timestamp parameters

### Testing in Production
After updating the cache version and redeploying:
1. Visit your website
2. Check the browser Network tab (F12 → Network)
3. Look at image URLs - they should include `?v=[new-version]`
4. Images will be freshly loaded from the server

## Technical Details

### Files Modified
- Created: `website/src/app/services/cache-busting.service.ts`
- Updated environment files with `cacheVersion` property
- Updated all components that display images:
  - home.component.ts
  - apartments.component.ts
  - apartment-detail.component.ts
  - furnished-suites.component.ts
  - unfurnished-suites.component.ts
  - condo-rentals.component.ts
  - rooms-for-rent.component.ts
  - students.component.ts
  - contact.component.ts
  - property-owners.component.ts

### How Components Use It
All components now inject the `CacheBustingService` and use a `getImageUrl()` method:

```typescript
constructor(private cacheBusting: CacheBustingService) {}

getImageUrl(imagePath: string): string {
  return this.cacheBusting.getImageUrl(imagePath);
}
```

In templates:
```html
<!-- Before -->
<img [src]="'assets/images/' + imageName" alt="...">

<!-- After -->
<img [src]="getImageUrl(imageName)" alt="...">
```

## Benefits
✅ **Development**: Images always load fresh - no cache frustration!  
✅ **Production**: Users always see the latest images  
✅ No need for users to clear browser cache  
✅ Simple version update process  
✅ Works across all browsers  
✅ Automatic fallback to placeholder images  
✅ No changes needed to existing image files  

## Example URLs

**Development Mode (localhost:4200):**
```
http://localhost:4200/assets/images/apartment1.jpg?v=1708473625847
http://localhost:4200/assets/images/apartment1.jpg?v=1708473626102
                                                      ↑ Different timestamp!
```

**Production Mode (live site):**
```
https://yoursite.com/assets/images/apartment1.jpg?v=1.0.0
https://yoursite.com/assets/images/apartment1.jpg?v=1.0.1
                                                   ↑ Updated version!
```  

## Deployment Workflow
1. Upload new/updated images to `website/src/assets/images/`
2. Increment `cacheVersion` in both environment files
3. Build the production version: `npm run build:prod`
4. Deploy the built files
5. Users will automatically receive the new images on next visit

## Notes
- The cache version is independent of the app version
- You can update images without changing the app version
- Browser will cache the new images with the new version parameter
- Old cached images are automatically ignored
