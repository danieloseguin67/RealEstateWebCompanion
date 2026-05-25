import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService, Apartment, Area, ToggleOption } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';
import { CacheBustingService } from '../../services/cache-busting.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe],
  template: `
    <main tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>

      <div class="home-page">

    <!-- Hero Section -->
    <section class="hero-section" aria-label="Welcome banner">
      <button
        type="button"
        class="hero-a11y-badge"
        (click)="onA11yBadgeClick()"
        [attr.aria-label]="currentLanguage === 'fr' ? 'Accessibilité — guide lecteur écran' : 'Accessibility — screen reader guide'"
        [attr.title]="currentLanguage === 'fr' ? 'Accessibilité' : 'Accessibility'"
      >
        <i class="fas fa-universal-access" aria-hidden="true"></i>
        <span aria-hidden="true">{{ currentLanguage === 'fr' ? 'Accessible' : 'Accessible' }}</span>
      </button>
      <div class="hero-content">
        <div class="container">
          <h1>
            {{ t.home?.hero?.titleTop || t.home?.hero?.title }}
            <span *ngIf="t.home?.hero?.titleBottom"> {{ t.home?.hero?.titleBottom }}</span>
          </h1>
          <p class="hero-description">{{ t.home?.hero?.subtitle }}</p>
        </div>
      </div>
      <div class="hero-image" aria-hidden="true">
        <img
          [src]="getImageUrl('montrealwithtrees.jpg')"
          alt="Picture of Montreal skyline with trees in foreground"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        >
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section" aria-label="Search and filter apartments">
      <div class="container">
        <div class="search-card card">
          <div class="card-body">
            <div class="search-header">
              <h2 class="text-center mb-3">{{ t.home?.search?.title }}</h2>
              <div class="text-center mb-3">
                <button 
                  class="btn btn-filters-toggle" 
                  #filtersToggleBtn
                  (click)="toggleFilters()"
                  [attr.aria-expanded]="showFilters"
                  [attr.aria-controls]="'search-filters'"
                  [attr.aria-label]="showFilters ? (t.home?.search?.hideFilters || 'Hide search filters') : (t.home?.search?.showFilters || 'Show search filters')"
                >
                  <i class="fas" [class.fa-chevron-down]="!showFilters" [class.fa-chevron-up]="showFilters" aria-hidden="true"></i>
                  {{ showFilters ? (t.home?.search?.hideFilters || 'Hide Filters') : (t.home?.search?.showFilters || 'Show Filters') }}
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
                    <label class="form-label" for="area-select">{{ t.home?.search?.area }}</label>
                    <select 
                      id="area-select"
                      class="form-control form-select" 
                      [(ngModel)]="selectedArea"
                      (change)="onFiltersChanged()"
                      aria-label="Select neighborhood or area"
                    >
                      <option value="">{{ t.home?.search?.allAreas }}</option>
                      <option *ngFor="let area of areas" [value]="area.id">
                        {{ currentLanguage === 'fr' ? area.nameFr : area.nameEn }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col col-12 col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="unit-type-select">Unit Type</label>
                    <select 
                      id="unit-type-select"
                      class="form-control form-select" 
                      [(ngModel)]="selectedBedrooms"
                      (change)="onFiltersChanged()"
                      aria-label="Select number of bedrooms"
                    >
                      <option value="">All Unit Types</option>
                      <option value="0">Studio</option>
                      <option value="1">1 {{ t.common?.bedroom }}</option>
                      <option value="2">2 {{ t.common?.bedrooms }}</option>
                      <option value="3">3+ {{ t.common?.bedrooms }}</option>
                    </select>
                  </div>
                </div>
                <div class="col col-12">
                  <div class="form-group">
                    <label class="form-label" id="options-label">Options</label>
                    <div class="options-grid" role="group" aria-labelledby="options-label">
                      <div class="form-check" *ngFor="let opt of toggles">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          [checked]="selectedToggles.has(opt.toggle_name)"
                          (change)="onToggleChanged(opt.toggle_name, $any($event.target).checked)"
                          (keydown.enter)="$event.preventDefault(); $event.stopPropagation(); $any($event.target).click()"
                          [id]="'toggle-' + opt.toggle_name"
                          [attr.aria-label]="opt.toggle_name"
                        >
                        <label class="form-check-label" [for]="'toggle-' + opt.toggle_name">
                          <span class="me-2" aria-hidden="true">{{ opt.toggle_image }}</span>{{ opt.toggle_name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-12 col-md-3">
                  <div class="form-group">
                    <label class="form-label" for="sort-select">{{ t.home?.search?.sortBy }}</label>
                    <select 
                      id="sort-select"
                      class="form-control form-select" 
                      [(ngModel)]="sortBy"
                      (change)="onFiltersChanged()"
                      aria-label="Sort apartments by price"
                    >
                      <option value="price-asc">{{ t.home?.search?.priceAsc }}</option>
                      <option value="price-desc">{{ t.home?.search?.priceDesc }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <button 
                  class="btn btn-outline" 
                  (click)="clearFilters()"
                  *ngIf="hasActiveFilters()"
                  aria-label="Clear all search filters"
                >
                  {{ t.common?.clear }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Apartments -->
    <section class="apartments-grid-section" aria-label="Available apartments">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 #featuredHeading tabindex="-1">{{ t.home?.featured?.title }}</h2>
          <p class="section-subtitle" *ngIf="loading">{{ t.home?.featured?.subtitle }}</p>
          <p class="section-subtitle listings-count" *ngIf="!loading" aria-hidden="true">
            <strong>{{ filteredApartments.length }}</strong>
            {{ currentLanguage === 'fr'
              ? ('logement' + (filteredApartments.length > 1 ? 's' : '') + ' disponible' + (filteredApartments.length > 1 ? 's' : ''))
              : ('listing' + (filteredApartments.length > 1 ? 's' : '') + ' found') }}
          </p>
        </div>

        <!-- Loading State -->
        <div class="text-center" *ngIf="loading" role="status" aria-live="polite">
          <div class="spinner" aria-hidden="true"></div>
          <p>{{ t.common?.loading }}</p>
        </div>

        <!-- Apartments Grid -->
        <div 
          class="apartments-grid" 
          *ngIf="!loading && filteredApartments.length > 0"
          role="list"
          aria-label="Search results"
          aria-live="polite"
          aria-atomic="false"
        >
          <article 
            class="apartment-card card slide-up" 
            *ngFor="let apartment of filteredApartments; trackBy: trackByApartment; let i = index"
            role="listitem"
            tabindex="0"
            [attr.data-apt-id]="apartment.id"
            [attr.aria-label]="getApartmentCardLabel(apartment)"
            (keydown)="onCardKeyDown($event, i)"
            (keydown.enter)="openApartment(apartment.id)"
            (keydown.space)="$event.preventDefault(); openApartment(apartment.id)"
          >
            <button 
              type="button"
              class="apartment-image-link"
              (click)="openApartment(apartment.id)"
            >
              <span class="sr-only">
                {{ (t.common?.viewDetails || 'View details') + ': ' + (currentLanguage === 'fr' ? apartment.title : apartment.titleEn) }}
              </span>
              <div class="apartment-image">
                <img 
                  [src]="getImageUrl(apartment.images[0])" 
                  [alt]="getApartmentImageAlt(apartment)"
                  loading="lazy"
                  decoding="async"
                  (error)="onImageError($event, apartment)"
                >

                <div class="image-overlay" aria-hidden="true">
                  <span class="btn btn-primary btn-sm" aria-hidden="true">
                    {{ t.common?.viewDetails || 'View details' }}
                  </span>
                </div>
                
                <div 
                  class="apartment-badge" 
                  [class.available]="apartment.available"
                  role="status"
                  [attr.aria-label]="apartment.available ? (t.common?.available || 'Available') : (t.common?.notAvailable || 'Not available')"
                >
                  {{ apartment.available ? t.common?.available : t.common?.notAvailable }}
                </div>
                <div 
                  class="apartment-price"
                  [attr.aria-label]="'Price: ' + (apartment.price | currency:'CAD':'symbol':'1.0-0') + ' per month'"
                >
                  {{ apartment.price | currency:'CAD':'symbol':'1.0-0' }}/{{ t.common?.month }}
                </div>
              </div>
            </button>
            
            <div class="card-body">
              <h3 class="apartment-title">
                {{ currentLanguage === 'fr' ? apartment.title : apartment.titleEn }}
              </h3>
              
              <dl class="apartment-details" aria-label="Apartment specifications">
                <div class="detail-item">
                  <dt class="sr-only">Bedrooms</dt>
                  <i class="fas fa-bed" aria-hidden="true"></i>
                  <dd><span>{{ getUnitType(apartment) }}</span></dd>
                </div>
                <div class="detail-item">
                  <dt class="sr-only">Bathrooms</dt>
                  <i class="fas fa-bath" aria-hidden="true"></i>
                  <dd>
                    <span>
                      {{ apartment.bathrooms }} 
                      {{ apartment.bathrooms === 1 ? t.common?.bathroom : t.common?.bathrooms }}
                    </span>
                  </dd>
                </div>
                <div class="detail-item" *ngIf="apartment.squareFootage > 0">
                  <dt class="sr-only">Square footage</dt>
                  <i class="fas fa-ruler-combined" aria-hidden="true"></i>
                  <dd><span>{{ apartment.squareFootage }} {{ t.common?.sqft }}</span></dd>
                </div>
                <div class="detail-item">
                  <dt class="sr-only">Location</dt>
                  <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <dd><span>{{ getAreaName(apartment.area) }}</span></dd>
                </div>
              </dl>

              <div class="apartment-features" aria-label="Furnishing status">
                <span 
                  class="feature-badge" 
                  [class.furnished]="apartment.furnished"
                  role="status"
                >
                  {{ apartment.furnished ? t.common?.furnished : t.common?.unfurnished }}
                </span>
              </div>

              <div class="apartment-description">
                <p>{{ currentLanguage === 'fr' ? apartment.description : apartment.descriptionEn }}</p>
              </div>

              <div class="apartment-actions" role="group" aria-label="Apartment actions">
                <button
                  type="button"
                  class="btn btn-primary"
                  (click)="openApartment(apartment.id)"
                  [attr.aria-label]="'View details for ' + (currentLanguage === 'fr' ? apartment.title : apartment.titleEn)"
                >
                  {{ t.common?.viewDetails }}
                </button>
                <button 
                  class="btn btn-outline"
                  *ngIf="apartment.available"
                  (click)="bookTour(apartment)"
                  [attr.aria-label]="'Book a tour for ' + (currentLanguage === 'fr' ? apartment.title : apartment.titleEn)"
                >
                  {{ t.common?.bookNow }}
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- No Results -->
        <div 
          class="no-results text-center" 
          *ngIf="!loading && filteredApartments.length === 0"
          role="status"
          aria-live="polite"
        >
          <i class="fas fa-search" aria-hidden="true"></i>
          <h3>Aucun résultat trouvé</h3>
          <p>Essayez d'ajuster vos critères de recherche.</p>
          <button 
            class="btn btn-primary" 
            (click)="clearFilters()"
            aria-label="Clear all filters and show all apartments"
          >
            Effacer les filtres
          </button>
        </div>
      </div>
    </section>

    <!-- About Agent Section -->
    <section class="about-agent" aria-label="Contact information">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-12 col-lg-8">
            <div class="agent-content text-center">
              <h2>{{ t.home?.aboutAgent?.title }}</h2>
              <h3 class="agent-subtitle">{{ t.home?.aboutAgent?.subtitle }}</h3>
              <div class="agent-actions" role="group" aria-label="Contact actions">
                <a 
                  routerLink="/contact" 
                  class="btn btn-primary"
                  aria-label="Go to contact page"
                >
                  {{ t.home?.aboutAgent?.contactButton }}
                </a>
                <button 
                  class="btn btn-outline" 
                  (click)="bookTour()"
                  aria-label="Book a tour of an apartment"
                >
                  {{ t.navigation?.bookTour }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
    </main>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('filtersToggleBtn') filtersToggleBtnRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('featuredHeading') featuredHeadingRef!: ElementRef<HTMLHeadingElement>;

  apartments: Apartment[] = [];
  filteredApartments: Apartment[] = [];
  areas: Area[] = [];
  toggles: ToggleOption[] = [];
  selectedToggles: Set<string> = new Set<string>();
  loading = true;
  t: any = {};
  currentLanguage = 'fr';

  liveAnnouncement = '';

  // Filters
  selectedArea = '';
  selectedBedrooms: string = '';
  sortBy: 'price-asc' | 'price-desc' = 'price-asc';
  showFilters = false; // Start with filters collapsed

  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private languageService: LanguageService,
    private cacheBusting: CacheBustingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.subscribeToLanguageChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    // Load all apartments (no default filtering on homepage)
    this.dataService.getApartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(apartments => {
        this.apartments = apartments;
        this.applyFilters();
        this.loading = false;
        this.restoreCardFocus();
      });

    this.dataService.getAreas()
      .pipe(takeUntil(this.destroy$))
      .subscribe(areas => {
        console.log('Loaded areas:', areas);
        this.areas = areas;
      });

    this.dataService.getToggles()
      .pipe(takeUntil(this.destroy$))
      .subscribe(opts => {
        this.toggles = opts || [];
      });
  }

  private subscribeToLanguageChanges(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => this.currentLanguage = lang);

    this.languageService.getCurrentTranslations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => this.t = translations);
  }

  onFiltersChanged(): void {
    console.log('Filters changed. Selected area:', this.selectedArea);
    this.applyFilters();
    // Move focus after Angular has updated the DOM
    setTimeout(() => {
      if (this.filteredApartments.length === 0) {
        // No results — return focus to the filter button so reader announces it
        this.showFilters = true;
        this.filtersToggleBtnRef?.nativeElement?.focus();
      } else {
        // Results found — move focus to the heading so reader reads count then lets user tab through cards
        this.featuredHeadingRef?.nativeElement?.focus();
      }
    }, 50);
  }

  private applyFilters(): void {
    let filtered = [...this.apartments];

    // Apply filters
    if (this.selectedArea) {
      const selectedAreaLower = this.selectedArea.toLowerCase();
      filtered = filtered.filter(apt => apt.area.toLowerCase() === selectedAreaLower);
    }

    if (this.selectedBedrooms !== '') {
      const bedrooms = parseInt(this.selectedBedrooms);
      if (bedrooms >= 3) {
        filtered = filtered.filter(apt => this.getBedrooms(apt) >= 3);
      } else {
        filtered = filtered.filter(apt => this.getBedrooms(apt) === bedrooms);
      }
    }

    // Apply sorting
    this.filteredApartments = this.dataService.sortApartments(filtered, this.sortBy);

    // Update sr-only live region
    if (!this.loading) {
      const count = this.filteredApartments.length;
      this.liveAnnouncement = count === 0
        ? (this.currentLanguage === 'fr' ? 'Aucun logement trouvé.' : 'No listings found.')
        : (this.currentLanguage === 'fr'
            ? `${count} logement${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''}.`
            : `${count} listing${count > 1 ? 's' : ''} found.`);
    }
  }

  clearFilters(): void {
    this.selectedArea = '';
    this.selectedBedrooms = '';
    this.sortBy = 'price-asc';
    this.selectedToggles.clear();
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedArea || this.selectedBedrooms !== '' || this.selectedToggles.size > 0);
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

  getAreaName(areaId: string): string {
    const idLower = areaId.toLowerCase();
    const area = this.areas.find(a => a.id.toLowerCase() === idLower || a.name === areaId);
    if (!area) return areaId;
    return this.currentLanguage === 'fr' ? area.nameFr : area.nameEn;
  }

  trackByApartment(index: number, apartment: Apartment): string {
    return apartment.id;
  }

  bookTour(apartment?: Apartment): void {
    // Trigger the header booking modal by dispatching a custom event
    const bookingEvent = new CustomEvent('openBookingModal');
    window.dispatchEvent(bookingEvent);
  }

  onCardKeyDown(event: KeyboardEvent, index: number): void {
    // Only fire when the card wrapper itself has focus, not a child element
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

  onToggleChanged(name: string, checked: boolean): void {
    if (checked) {
      this.selectedToggles.add(name);
    } else {
      this.selectedToggles.delete(name);
    }
    // Not applying toggle filtering yet per requirements
  }

  private getBedrooms(apartment: Apartment): number {
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
    if (apartment.unit_type_name) return apartment.unit_type_name;
    return b === 0 ? 'Studio' : `${b} ${b === 1 ? (this.t.common?.bedroom || 'Bedroom') : (this.t.common?.bedrooms || 'Bedrooms')}`;
  }

  getImageUrl(imagePath: string): string {
    return this.cacheBusting.getImageUrl(imagePath);
  }

  onImageError(event: Event, apartment: any) {
    const img = event.target as HTMLImageElement;
    // Prevent infinite error loop
    if (!img.src.includes('image-not-available.svg')) {
      img.src = this.cacheBusting.getImageUrl('image-not-available.svg');
    }
  }

  getApartmentCardLabel(apartment: Apartment): string {
    const title = this.currentLanguage === 'fr' ? apartment.title : apartment.titleEn;
    const unitType = this.getUnitType(apartment);
    const area = this.getAreaName(apartment.area);
    const price = apartment.price;
    const status = apartment.available ? 
      (this.t.common?.available || 'Available') : 
      (this.t.common?.notAvailable || 'Not available');
    
    return `${title}, ${unitType}, ${apartment.bathrooms} ${apartment.bathrooms === 1 ? 'bathroom' : 'bathrooms'}, ${apartment.squareFootage} square feet, ${area}, ${price} dollars per month, ${status}`;
  }

  getApartmentImageAlt(apartment: Apartment): string {
    const title = this.currentLanguage === 'fr' ? apartment.title : apartment.titleEn;
    const unitType = this.getUnitType(apartment);
    const area = this.getAreaName(apartment.area);
    const price = apartment.price;
    return this.currentLanguage === 'fr'
      ? `Photo de ${title} — ${unitType}, ${area}, ${price} $/mois`
      : `Photo of ${title} — ${unitType}, ${area}, $${price}/month`;
  }

}