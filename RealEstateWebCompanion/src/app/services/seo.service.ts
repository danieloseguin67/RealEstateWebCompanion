import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SeoPage } from '../models/data.models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private seoPagesSubject = new BehaviorSubject<SeoPage[]>([]);
  seoPages$ = this.seoPagesSubject.asObservable();
  private websiteUrlKey = 'websiteUrl';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.loadSeoPages();
  }

  loadSeoPages(): void {
    const stored = this.storageService.getItem<SeoPage[]>('seoPages');
    if (stored) {
      this.seoPagesSubject.next(stored);
    } else {
      // Try to load from assets/data/seo.json, fallback to empty array
      this.http.get<SeoPage[]>('assets/data/seo.json').subscribe({
        next: (data) => {
          this.seoPagesSubject.next(data);
          this.storageService.setItem('seoPages', data);
        },
        error: () => {
          // If file doesn't exist, initialize with empty array
          this.seoPagesSubject.next([]);
        }
      });
    }
  }

  updateSeoPages(pages: SeoPage[]): void {
    this.seoPagesSubject.next(pages);
    this.storageService.setItem('seoPages', pages);
  }

  getSeoPages(): SeoPage[] {
    return this.seoPagesSubject.value;
  }

  setWebsiteUrl(url: string): void {
    this.storageService.setItem(this.websiteUrlKey, url);
  }

  getWebsiteUrl(): string | null {
    return this.storageService.getItem<string>(this.websiteUrlKey);
  }

  generateSitemap(): string {
    const pages = this.seoPagesSubject.value;
    const baseUrl = this.getWebsiteUrl() || window.location.origin;
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    pages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${page.pageUrl}</loc>\n`;
      
      if (page.lastModified) {
        sitemap += `    <lastmod>${page.lastModified}</lastmod>\n`;
      }
      
      if (page.changeFrequency) {
        sitemap += `    <changefreq>${page.changeFrequency}</changefreq>\n`;
      }
      
      if (page.priority !== undefined) {
        sitemap += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
      }
      
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    return sitemap;
  }

  downloadSitemap(): void {
    if (!this.getWebsiteUrl()) {
      alert('Please set your website URL first by using the "Preload All Pages" feature.');
      return;
    }
    const sitemap = this.generateSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
