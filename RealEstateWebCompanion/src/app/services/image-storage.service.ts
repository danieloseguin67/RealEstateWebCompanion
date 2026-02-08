import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  
  constructor() { }

  /**
   * Saves image files by converting them to downloadable format
   * and providing instructions for manual placement
   */
  async saveImageFile(file: File): Promise<{ filename: string, dataUrl: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const dataUrl = e.target.result;
        const filename = this.sanitizeFilename(file.name);
        
        // Store in sessionStorage for preview purposes
        const storageKey = `img_${filename}`;
        try {
          sessionStorage.setItem(storageKey, dataUrl);
        } catch (error) {
          console.warn('SessionStorage full, image preview may not work:', error);
        }
        
        resolve({ filename, dataUrl });
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(file);
    });
  }

  /**
   * Sanitizes filename to be safe for storage
   */
  private sanitizeFilename(filename: string): string {
    // Remove spaces and special characters, keep extension
    const extension = filename.substring(filename.lastIndexOf('.'));
    const name = filename.substring(0, filename.lastIndexOf('.'));
    const sanitized = name.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
    return `${sanitized}${extension}`;
  }

  /**
   * Gets image URL - checks sessionStorage first, then falls back to assets
   */
  getImageUrl(filename: string): string {
    const storageKey = `img_${filename}`;
    const stored = sessionStorage.getItem(storageKey);
    
    if (stored) {
      return stored;
    }
    
    // Default to assets folder
    return `/assets/images/${filename}`;
  }

  /**
   * Downloads a file to the user's computer
   * User will need to manually move it to assets/images folder
   */
  downloadImageFile(dataUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Exports all images associated with apartments
   * Creates a downloadable zip-like structure (multiple downloads)
   */
  async exportAllImages(imageFilenames: string[]): Promise<void> {
    const instructions = `
INSTRUCTIONS FOR IMAGE SETUP:
==============================

The following images have been uploaded:
${imageFilenames.map(f => `- ${f}`).join('\n')}

To use these images in your application:

1. The filenames have been saved to apartments.json
2. You need to manually download the images (they were triggered for download)
3. Move the downloaded images to: RealEstateWebCompanion/src/assets/images/
4. Rebuild your Angular application if it's running

The application will then load these images from /assets/images/[filename]
    `.trim();

    console.log(instructions);
    alert(instructions);
  }

  /**
   * Batch save multiple image files
   */
  async saveMultipleImages(files: FileList): Promise<Array<{ filename: string, dataUrl: string }>> {
    const promises: Promise<{ filename: string, dataUrl: string }>[] = [];
    
    for (let i = 0; i < files.length; i++) {
      promises.push(this.saveImageFile(files[i]));
    }
    
    return Promise.all(promises);
  }

  /**
   * Clear cached images from sessionStorage
   */
  clearImageCache(): void {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('img_')) {
        sessionStorage.removeItem(key);
      }
    });
  }
}
