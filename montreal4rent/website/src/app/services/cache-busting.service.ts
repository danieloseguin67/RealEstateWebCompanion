import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Service to add cache-busting parameters to asset URLs.
 * This ensures users always see the latest images without manually clearing browser cache.
 * 
 * - Development: Uses timestamp to always load fresh images (no caching)
 * - Production: Uses static version that you increment when deploying new images
 */
@Injectable({
  providedIn: 'root'
})
export class CacheBustingService {
  private cacheVersion: string;
  private isProduction: boolean;
  private devTimestamp: string;

  constructor() {
    this.isProduction = environment.production;
    // Use a combination of app version and cache version for unique cache-busting
    this.cacheVersion = environment.cacheVersion || environment.version || '1.0.0';
    // Generate timestamp once at service initialization for development
    // This prevents flickering while still bypassing cache on page refresh
    this.devTimestamp = Date.now().toString();
  }

  /**
   * Adds cache-busting parameter to an image URL
   * @param imagePath - The relative path to the image (e.g., 'apartment-1.jpg' or 'folder/image.jpg')
   * @param prefix - The prefix path (default: 'assets/images/')
   * @returns Full URL with cache-busting parameter
   */
  getImageUrl(imagePath: string | null | undefined, prefix: string = 'assets/images/'): string {
    // Handle null, undefined, or empty string - return placeholder
    if (!imagePath || imagePath.trim() === '') {
      return `${prefix}image-not-available.svg?v=${this.getVersionParam()}`;
    }

    // If imagePath already includes the prefix, don't add it again
    const fullPath = imagePath.startsWith('assets/') ? imagePath : `${prefix}${imagePath}`;
    
    // Add cache-busting parameter
    return `${fullPath}?v=${this.getVersionParam()}`;
  }

  /**
   * Gets the version parameter for cache-busting
   * - In development: returns session timestamp (generated once at startup)
   * - In production: returns static version for controlled cache-busting
   */
  private getVersionParam(): string {
    if (this.isProduction) {
      return this.cacheVersion;
    } else {
      // In development, use the timestamp generated at service initialization
      // This prevents flickering while still getting fresh images on page refresh
      return this.devTimestamp;
    }
  }

  /**
   * Gets the current cache version
   */
  getCacheVersion(): string {
    return this.cacheVersion;
  }
}
