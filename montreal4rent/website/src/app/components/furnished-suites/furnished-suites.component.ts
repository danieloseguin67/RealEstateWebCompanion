import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService, Language } from '../../services/language.service';
import { DataService, Apartment } from '../../services/data.service';
import { CacheBustingService } from '../../services/cache-busting.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-furnished-suites',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe],
  template: `
    <main #pageMain tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>

      <div class="furnished-suites-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <button type="button" class="hero-a11y-badge"
          (click)="onA11yBadgeClick()"
          [attr.aria-label]="currentLanguage === 'fr' ? 'Accessibilité — guide lecteur écran' : 'Accessibility — screen reader guide'"
          [attr.title]="currentLanguage === 'fr' ? 'Accessibilité' : 'Accessibility'">
          <i class="fas fa-universal-access" aria-hidden="true"></i>
          <span aria-hidden="true">Accessible</span>
        </button>
        <div class="hero-content">
          <div class="container">
            <h1>{{ currentLanguage === 'fr' ? 'Suites Meublées' : 'Fully Furnished' }}</h1>
            <p class="hero-description">{{ currentLanguage === 'fr' ? 'Suites entièrement meublées à Montréal.' : 'Fully furnished rentals in Montreal.' }}</p>
          </div>
        </div>
        <div class="hero-image">
          <img [src]="getImageUrl('furnished1.jpg')" alt="Picture of a furnished apartment" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>

      <!-- Search Section (styled like Apartments, limited filters) -->
      <section class="search-section">
        <div class="container">
          <div class="search-card card">
            <div class="card-body">
              <div class="search-header">
                <h2 class="text-center mb-3">{{ currentLanguage === 'fr' ? 'Recherche' : 'Search' }}</h2>
                <div class="text-center mb-3">
                  <button 
                    class="btn btn-filters-toggle" 
                    (click)="toggleFilters()"
                    [attr.aria-expanded]="showFilters"
                    [attr.aria-controls]="'search-filters'"
                    [attr.aria-label]="showFilters ? (currentLanguage === 'fr' ? 'Masquer les filtres de recherche' : 'Hide search filters') : (currentLanguage === 'fr' ? 'Afficher les filtres de recherche' : 'Show search filters')"
                  >
                    <i class="fas" [class.fa-chevron-down]="!showFilters" [class.fa-chevron-up]="showFilters"></i>
                    {{ showFilters ? (currentLanguage === 'fr' ? 'Masquer les filtres' : 'Hide Filters') : (currentLanguage === 'fr' ? 'Afficher les filtres' : 'Show Filters') }}
                  </button>
                </div>
              </div>

              <div 
                class="search-form collapse"
                [class.show]="showFilters"
                id="search-filters"
                role="region"
                [attr.aria-hidden]="!showFilters"
                [attr.inert]="!showFilters ? '' : null"
              >
                <div class="row">
                  <div class="col col-12 col-md-3">
                    <div class="form-group">
                      <label class="form-label">Unit Type</label>
                      <select 
                        class="form-control form-select" 
                        [(ngModel)]="selectedBedrooms"
                        (change)="onFiltersChanged()"
                      >
                        <option value="">All Unit Types</option>
                        <option value="0">Studio</option>
                        <option value="1">1 {{ currentLanguage === 'fr' ? 'chambre' : 'Bedroom' }}</option>
                        <option value="2">2 {{ currentLanguage === 'fr' ? 'chambres' : 'Bedrooms' }}</option>
                        <option value="3">3+ {{ currentLanguage === 'fr' ? 'chambres' : 'Bedrooms' }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col col-12">
                    <div class="form-group">
                      <label class="form-label">Options</label>
                      <div class="options-grid">
                        <div class="form-check" *ngFor="let opt of limitedToggles">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            [checked]="selectedToggles.has(opt)"
                            (change)="onToggleChanged(opt, $any($event.target).checked)"
                            (keydown.enter)="$event.preventDefault(); $event.stopPropagation(); $any($event.target).click()"
                            [id]="'toggle-' + opt"
                          >
                          <label class="form-check-label" [for]="'toggle-' + opt">
                            <span class="me-2">{{ getToggleEmoji(opt) }}</span>{{ opt }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="filter-actions mt-3">
                  <button 
                    class="btn btn-primary"
                    (click)="doSearch()"
                  >
                    <i class="fas fa-search" aria-hidden="true"></i>
                    {{ currentLanguage === 'fr' ? 'Rechercher' : 'Search' }}
                  </button>
                  <button 
                    class="btn btn-outline" 
                    (click)="clearFilters()"
                    *ngIf="hasActiveFilters()"
                  >
                    {{ currentLanguage === 'fr' ? 'Effacer' : 'Clear' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Furnished Grid -->
      <section class="apartments-grid-section">
        <div class="container">
          <!-- Loading State -->
          <div class="text-center" *ngIf="loading">
            <div class="spinner"></div>
            <p>{{ currentLanguage === 'fr' ? 'Chargement...' : 'Loading...' }}</p>
          </div>

          <!-- Results Count -->
          <div class="results-count" *ngIf="!loading && hasActiveFilters() && filteredApartments.length > 0"
            role="status" aria-live="polite" aria-atomic="true">
            <i class="fas fa-check-circle" aria-hidden="true"></i>
            {{ filteredApartments.length }}
            {{ currentLanguage === 'fr'
              ? ('résultat' + (filteredApartments.length > 1 ? 's' : '') + ' trouvé' + (filteredApartments.length > 1 ? 's' : ''))
              : (filteredApartments.length === 1 ? 'listing found' : 'listings found') }}
          </div>

          <!-- Grid -->
          <div 
            class="apartments-grid" 
            *ngIf="!loading && filteredApartments.length > 0"
            role="list"
            [attr.aria-label]="currentLanguage === 'fr' ? 'Résultats : suites meublées' : 'Search results: furnished suites'"
            aria-live="polite"
            aria-atomic="false"
          >
            <div 
              class="apartment-card card slide-up" 
              *ngFor="let apartment of filteredApartments; trackBy: trackByApartment; let i = index"
              role="listitem"
              tabindex="0"
              [attr.data-apt-id]="apartment.id"
              [attr.aria-label]="(currentLanguage === 'fr' ? apartment.title : apartment.titleEn) + ', ' + getUnitType(apartment) + ', ' + (apartment.price) + (currentLanguage === 'fr' ? ' $/mois' : ' CAD/month') + (apartment.available ? (currentLanguage === 'fr' ? ', Disponible' : ', Available') : (currentLanguage === 'fr' ? ', Non disponible' : ', Not available'))"
              (keydown)="onCardKeyDown($event, i)"
              (keydown.enter)="openApartment(apartment.id)"
              (keydown.space)="$event.preventDefault(); openApartment(apartment.id)"
            >
              <div class="apartment-image">
                <img 
                  [src]="getImageUrl(apartment.images[0])" 
                  [alt]="getApartmentImageAlt(apartment)"
                  (error)="onImageError($event, apartment)"
                >
                <div class="apartment-badge" [class.available]="apartment.available">
                  {{ apartment.available ? (currentLanguage === 'fr' ? 'Disponible' : 'Available') : (currentLanguage === 'fr' ? 'Non disponible' : 'Not Available') }}
                </div>
                <div class="apartment-price">{{ apartment.price | currency:'CAD':'symbol':'1.0-0' }}/{{ currentLanguage === 'fr' ? 'mois' : 'month' }}</div>
                <div class="image-overlay">
                  <a class="btn btn-primary btn-sm" [routerLink]="['/appartement', apartment.id]">
                    {{ currentLanguage === 'fr' ? 'Voir les détails' : 'View Details' }}
                  </a>
                </div>
              </div>
              
              <div class="card-body">
                <h3 class="apartment-title">
                  {{ currentLanguage === 'fr' ? apartment.title : apartment.titleEn }}
                </h3>
                
                <div class="apartment-details">
                  <div class="detail-item">
                    <i class="fas fa-bed"></i>
                    <span>{{ getUnitType(apartment) }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-bath"></i>
                    <span>
                      {{ apartment.bathrooms }} 
                      {{ apartment.bathrooms === 1 ? (currentLanguage === 'fr' ? 'salle de bain' : 'bathroom') : (currentLanguage === 'fr' ? 'salles de bain' : 'bathrooms') }}
                    </span>
                  </div>
                  <div class="detail-item" *ngIf="apartment.squareFootage > 0">
                    <i class="fas fa-ruler-combined"></i>
                    <span>{{ apartment.squareFootage }} {{ currentLanguage === 'fr' ? 'pi²' : 'sqft' }}</span>
                  </div>
                </div>

                <div class="apartment-description">
                  <p>{{ currentLanguage === 'fr' ? apartment.description : apartment.descriptionEn }}</p>
                </div>

                <div class="apartment-actions">
                  <a 
                    [routerLink]="['/appartement', apartment.id]" 
                    class="btn btn-primary"
                  >
                    {{ currentLanguage === 'fr' ? 'Voir les détails' : 'View Details' }}
                  </a>
                  <button 
                    class="btn btn-outline"
                    *ngIf="apartment.available"
                    (click)="bookTour(apartment)"
                  >
                    {{ currentLanguage === 'fr' ? 'Réserver une visite' : 'Book a Tour' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div class="no-results text-center" *ngIf="!loading && filteredApartments.length === 0">
            <i class="fas fa-search"></i>
            <h3>{{ currentLanguage === 'fr' ? 'Aucune suite trouvée' : 'No listings found' }}</h3>
            <p>{{ currentLanguage === 'fr' ? "Essayez d'ajuster vos critères de recherche." : 'Try adjusting your search criteria.' }}</p>
            <div class="no-results-actions">
              <button class="btn btn-primary" (click)="openFilters()">
                {{ currentLanguage === 'fr' ? 'Retour aux filtres' : 'Back to Filters' }}
              </button>
              <button class="btn btn-outline" (click)="clearFilters()">
                {{ currentLanguage === 'fr' ? 'Effacer les filtres' : 'Clear Filters' }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </main>
  `,
  styleUrls: ['./furnished-suites.component.scss']
})
export class FurnishedSuitesComponent implements OnInit, OnDestroy {
  currentLanguage: Language = 'fr';
  private destroy$ = new Subject<void>();

  liveAnnouncement = '';

  apartments: Apartment[] = [];
  filteredApartments: Apartment[] = [];
  loading = true;
  showFilters = false;

  // Filters
  selectedBedrooms: string = '';
  selectedToggles: Set<string> = new Set<string>();
  limitedToggles: string[] = ['Pet Friendly', 'Parking Available'];

  constructor(private languageService: LanguageService, private dataService: DataService, private cacheBusting: CacheBustingService, private router: Router) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => this.currentLanguage = lang);

    this.dataService.getApartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(apartments => {
        this.apartments = apartments;
        this.applyFilters();
        this.loading = false;
        this.restoreCardFocus();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onA11yBadgeClick(): void {
    window.dispatchEvent(new CustomEvent('openA11yModal'));
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    if (!this.showFilters) {
      this.liveAnnouncement = this.currentLanguage === 'fr'
        ? 'Filtres masqués. Appuyez sur Tab pour parcourir les annonces.'
        : 'Filters hidden. Tab to browse listings.';
    } else {
      this.liveAnnouncement = this.currentLanguage === 'fr'
        ? 'Filtres affichés.'
        : 'Filters shown.';
    }
  }

  doSearch(): void {
    this.applyFilters();
    this.showFilters = false;
    setTimeout(() => {
      document.querySelector('.results-count, .apartments-grid, .no-results')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  openFilters(): void {
    this.showFilters = true;
    setTimeout(() => {
      document.querySelector('.search-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  onFiltersChanged(): void {
    this.applyFilters();
  }

  onToggleChanged(name: string, checked: boolean): void {
    if (checked) this.selectedToggles.add(name); else this.selectedToggles.delete(name);
    // Toggles not applied to filtering per requirements
  }

  clearFilters(): void {
    this.selectedBedrooms = '';
    this.selectedToggles.clear();
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedBedrooms !== '' || this.selectedToggles.size > 0);
  }

  private applyFilters(): void {
    // Start with furnished only
    let filtered = this.apartments.filter(apt => !!apt.furnished);

    // Unit type filter
    if (this.selectedBedrooms !== '') {
      const bedrooms = parseInt(this.selectedBedrooms);
      if (bedrooms >= 3) {
        filtered = filtered.filter(apt => this.getBedrooms(apt) >= 3);
      } else {
        filtered = filtered.filter(apt => this.getBedrooms(apt) === bedrooms);
      }
    }

    this.filteredApartments = filtered;

    // Announce results to screen readers
    const count = this.filteredApartments.length;
    if (this.hasActiveFilters()) {
      this.liveAnnouncement = count === 0
        ? (this.currentLanguage === 'fr' ? 'Aucun résultat trouvé.' : 'No listings found.')
        : (this.currentLanguage === 'fr'
            ? `${count} résultat${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}.`
            : `${count} listing${count > 1 ? 's' : ''} found.`);
    } else {
      this.liveAnnouncement = '';
    }
  }

  trackByApartment(index: number, apartment: Apartment): string { return apartment.id; }

  getBedrooms(apartment: Apartment): number {
    if (typeof apartment.bedrooms === 'number') return apartment.bedrooms;
    const name = (apartment.unit_type_name || '').toLowerCase();
    if (name.includes('studio')) return 0;
    if (name.startsWith('1')) return 1;
    if (name.startsWith('2')) return 2;
    if (name.startsWith('3')) return 3;
    const m = name.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }

  getUnitType(apartment: Apartment): string {
    const b = this.getBedrooms(apartment);
    return apartment.unit_type_name || (b === 0 ? 'Studio' : `${b} Bedroom${b > 1 ? 's' : ''}`);
  }

  getToggleEmoji(name: string): string {
    switch (name) {
      case 'Pet Friendly': return '🐾';
      case 'Parking Available': return '🚗';
      default: return '';
    }
  }

  bookTour(apartment?: Apartment): void {
    // Trigger the header booking modal by dispatching a custom event
    const bookingEvent = new CustomEvent('openBookingModal');
    window.dispatchEvent(bookingEvent);
  }

  getImageUrl(imagePath: string): string {
    return this.cacheBusting.getImageUrl(imagePath);
  }

  getApartmentImageAlt(apartment: Apartment): string {
    const title = this.currentLanguage === 'fr' ? apartment.title : apartment.titleEn;
    const unitType = this.getUnitType(apartment);
    const price = apartment.price;
    return this.currentLanguage === 'fr'
      ? `Photo de ${title} — ${unitType}, ${price} $/mois`
      : `Photo of ${title} — ${unitType}, $${price}/month`;
  }

  onCardKeyDown(event: KeyboardEvent, index: number): void {
    if (event.target !== event.currentTarget) return;
    const nav = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!nav.includes(event.key)) return;
    const grid = (event.currentTarget as HTMLElement).closest('[role="list"]') as HTMLElement;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-apt-id]'));
    if (cards.length === 0) return;
    let targetIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      targetIndex = Math.min(index + 1, cards.length - 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      targetIndex = Math.max(index - 1, 0);
    } else if (event.key === 'Home') {
      targetIndex = 0;
    } else if (event.key === 'End') {
      targetIndex = cards.length - 1;
    }
    if (targetIndex !== index) {
      event.preventDefault();
      cards[targetIndex].focus();
    }
  }

  private restoreCardFocus(): void {
    const id = sessionStorage.getItem('lastFocusedApartmentId');
    if (!id) return;
    sessionStorage.removeItem('lastFocusedApartmentId');
    setTimeout(() => {
      const card = document.querySelector<HTMLElement>(`[data-apt-id="${id}"]`);
      card?.focus();
    }, 100);
  }

  openApartment(apartmentId: string): void {
    sessionStorage['focusContentAfterNav'] = '1';
    sessionStorage.setItem('lastFocusedApartmentId', apartmentId);
    const basePath = this.currentLanguage === 'fr' ? '/appartement' : '/apartments';
    this.router.navigate([basePath, apartmentId]);
  }

  onImageError(event: Event, apartment: any) {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('image-not-available')) {
      img.src = this.cacheBusting.getImageUrl('image-not-available.svg');
    }
  }

}