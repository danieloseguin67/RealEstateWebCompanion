import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CacheBustingService } from '../../services/cache-busting.service';

@Component({
  selector: 'app-property-owners',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>

      <div class="property-owners-page">
      <!-- Hero Section -->
      <section
        class="hero-section"
        role="region"
        tabindex="0"
        aria-label="Property Owners banner. High-Performance Leasing for Multi-Residential Properties. Specializing in high-volume rentals, new construction, and value-add assets."
      >
        <button type="button" class="hero-a11y-badge"
          (click)="onA11yBadgeClick()"
          aria-label="Accessibility — how to use a screen reader"
          title="Accessibility">
          <i class="fas fa-universal-access" aria-hidden="true"></i>
          <span aria-hidden="true">Accessible</span>
        </button>
        <div class="hero-content">
          <div class="container">
            <h1 id="property-owners-hero-title">Property Owners</h1>
              <p class="hero-description">High-Performance Leasing for Multi-Residential Properties</p>
              <p class="hero-subtitle">Specializing in high-volume rentals, new construction, and value-add assets.</p>
          </div>
        </div>
        <div class="hero-image">
          <img [src]="getImageUrl('property-rental-owners.jpg')" alt="Picture of property owners signing an agreement" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>

      <!-- Services Section -->
      <section class="services-section">
        <div class="container">
          <div class="services-grid">
            <div
              class="service-card"
              role="group"
              tabindex="0"
              aria-labelledby="service-leasing-title"
              aria-describedby="service-leasing-desc"
            >
              <h3 id="service-leasing-title">Leasing</h3>
              <p id="service-leasing-desc">Professional leasing processes designed to minimize vacancy and maximize rent.</p>
            </div>
            <div
              class="service-card"
              role="group"
              tabindex="0"
              aria-labelledby="service-eval-title"
              aria-describedby="service-eval-desc"
            >
              <h3 id="service-eval-title">Property Evaluation & Market Positioning</h3>
              <p class="sr-only" id="service-eval-desc">
                On-site evaluation of rent-ready condition with clear recommendations on repairs and cleaning. Pricing analysis. Comparable research. Promotion structuring. Ongoing feedback from showings. Market response used to refine pricing. Fully furnished versus unfurnished marketing strategies.
              </p>
              <ul>
                <li>On-site evaluation of rent-ready condition with clear recommendations on repairs & cleaning</li>
                <li>Pricing analysis</li>
                <li>Comparable research</li>
                <li>Promotion structuring</li>
                <li>Ongoing feedback from showings</li>
                <li>Market response used to refine pricing</li>
                <li>Fully furnished VS Unfurnished marketing strategies</li>
              </ul>
            </div>
            <div
              class="service-card"
              role="group"
              tabindex="0"
              aria-labelledby="service-marketing-title"
              aria-describedby="service-marketing-desc"
            >
              <h3 id="service-marketing-title">Marketing</h3>
              <p id="service-marketing-desc">Targeted marketing campaigns, high-quality listings, and lead management.</p>
            </div>
          </div>

          
        </div>
      </section>

      <!-- Bottom Showcase Image -->
      <section class="showcase-section">
        <div class="container">
          <img 
            [src]="getImageUrl('montrealdowntown.jpg')" 
            loading="lazy"
            decoding="async"
            alt="Montreal condo high-rise" 
            class="showcase-image"
          >
        </div>
      </section>
    </div>
    </main>
  `,
  styleUrls: ['./property-owners.component.scss']
})
export class PropertyOwnersComponent {
  liveAnnouncement = '';

  constructor(private cacheBusting: CacheBustingService) {}

  onA11yBadgeClick(): void {
    window.dispatchEvent(new CustomEvent('openA11yModal'));
  }

  getImageUrl(imagePath: string): string {
    return this.cacheBusting.getImageUrl(imagePath);
  }
}
