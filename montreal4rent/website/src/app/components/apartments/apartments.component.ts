import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService, Apartment, Area, ToggleOption, UnitType } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';
import { CacheBustingService } from '../../services/cache-busting.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-apartments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe],
  template: `
    <main tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>

      <div class="apartments-page">
      <!-- Hero Section -->
      <section class="hero-section" aria-label="Apartments banner">
        <button type="button" class="hero-a11y-badge"
          (click)="onA11yBadgeClick()"
          [attr.aria-label]="currentLanguage === 'fr' ? 'Accessibilité — guide lecteur écran' : 'Accessibility — screen reader guide'"
          [attr.title]="currentLanguage === 'fr' ? 'Accessibilité' : 'Accessibility'">
          <i class="fas fa-universal-access" aria-hidden="true"></i>
          <span aria-hidden="true">Accessible</span>
        </button>
        <div class="hero-content">
          <div class="container">
            <h1>{{ currentLanguage === 'fr' ? 'Appartements' : 'Apartments' }}</h1>
            <p class="hero-description">{{ currentLanguage === 'fr' ? 'Découvrez notre collection complète d’appartements à Montréal' : 'Discover our full collection of apartments in Montreal' }}</p>
          </div>
        </div>
        <div class="hero-image">
          <img [src]="getImageUrl('unfurnished1.jpg')" alt="Picture of an apartment" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>

      <!-- Search Section (like Home) -->
      <section class="search-section" aria-label="Search and filter apartments">
        <div class="container">
          <div class="search-card card">
            <div class="card-body">
              <div class="search-header">
                <h2 class="text-center mb-3">{{ t.home?.search?.title || (currentLanguage === 'fr' ? 'Rechercher' : 'Search') }}</h2>
                <div class="text-center mb-3">
                  <button 
                    class="btn btn-filters-toggle" 
                    (click)="toggleFilters()"
                    [attr.aria-expanded]="showFilters"
                    [attr.aria-controls]="'search-filters'"
                    [attr.aria-label]="showFilters ? (t.home?.search?.hideFilters || 'Hide search filters') : (t.home?.search?.showFilters || 'Show search filters')"
                  >
                    <i class="fas" [class.fa-chevron-down]="!showFilters" [class.fa-chevron-up]="showFilters"></i>
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
                        [(ngModel)]="selectedUnitType"
                        (change)="onFiltersChanged()"
                        aria-label="Select unit type"
                      >
                        <option value="">All Unit Types</option>
                        <option *ngFor="let unitType of unitTypes" [value]="unitType.unit_type_name">
                          {{ unitType.unit_type_name }}
                        </option>
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
                            <span class="me-2">{{ opt.toggle_image }}</span>{{ opt.toggle_name }}
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
                <div class="filter-actions mt-3">
                  <button 
                    class="btn btn-primary"
                    (click)="doSearch()"
                    aria-label="Apply filters and view results"
                  >
                    <i class="fas fa-search" aria-hidden="true"></i>
                    {{ currentLanguage === 'fr' ? 'Rechercher' : 'Search' }}
                  </button>
                  <button 
                    class="btn btn-outline" 
                    (click)="clearFilters()"
                    *ngIf="hasActiveFilters()"
                    aria-label="Clear all search filters"
                  >
                    {{ t.common?.clear || (currentLanguage === 'fr' ? 'Effacer' : 'Clear') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Apartments Grid -->
      <section class="apartments-grid-section" aria-label="Available apartments">
        <div class="container">
          <!-- Loading State -->
          <div class="text-center" *ngIf="loading" role="status" aria-live="polite">
            <div class="spinner"></div>
            <p>{{ t.common?.loading }}</p>
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

          <!-- Apartments Grid -->
          <div 
            class="apartments-grid" 
            *ngIf="!loading && filteredApartments.length > 0"
            role="region"
            aria-label="Search results"
          >
            <article 
              class="apartment-card card slide-up" 
              *ngFor="let apartment of filteredApartments; trackBy: trackByApartment; let i = index"
              [class.is-selected]="i === focusedCardIndex"
              [attr.data-apt-id]="apartment.id"
            >
              <a
                class="apartment-image-link"
                [routerLink]="[currentLanguage === 'fr' ? '/appartement' : '/apartments', apartment.id]"
                tabindex="-1"
                aria-hidden="true"
                (click)="saveSelectedCard(apartment.id)"
              >
                <span class="sr-only" aria-hidden="true">
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
                  <div class="apartment-badge" [class.available]="apartment.available" role="status"
                    [attr.aria-label]="apartment.available ? (t.common?.available || 'Available') : (t.common?.notAvailable || 'Not available')"
                  >
                    {{ apartment.available ? t.common?.available : t.common?.notAvailable }}
                  </div>
                  <div class="apartment-price"
                    [attr.aria-label]="'Price: ' + (apartment.price | currency:'CAD':'symbol':'1.0-0') + ' per month'"
                  >
                    {{ apartment.price | currency:'CAD':'symbol':'1.0-0' }}/{{ t.common?.month }}
                  </div>
                  <div class="image-overlay" aria-hidden="true">
                    <span class="btn btn-primary btn-sm" aria-hidden="true">
                      {{ t.common?.viewDetails || 'View details' }}
                    </span>
                  </div>
                </div>
              </a>
              
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
                    <dd><span>
                      {{ apartment.bathrooms }} 
                      {{ apartment.bathrooms === 1 ? t.common?.bathroom : t.common?.bathrooms }}
                    </span></dd>
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
                  <span class="feature-badge" [class.furnished]="apartment.furnished">
                    {{ apartment.furnished ? t.common?.furnished : t.common?.unfurnished }}
                  </span>
                </div>

                <div class="apartment-description">
                  <p>{{ currentLanguage === 'fr' ? apartment.description : apartment.descriptionEn }}</p>
                </div>

                <div class="apartment-actions" role="group" aria-label="Apartment actions">
                  <a
                    class="btn btn-primary"
                    [routerLink]="[currentLanguage === 'fr' ? '/appartement' : '/apartments', apartment.id]"
                    [attr.data-apt-id]="apartment.id"
                    [attr.aria-label]="getApartmentCardLabel(apartment)"
                    [attr.tabindex]="i === focusedCardIndex ? 0 : -1"
                    (focus)="focusedCardIndex = i"
                    (click)="saveSelectedCard(apartment.id)"
                    (keydown)="onCardLinkKeyDown($event, i)"
                  >
                    {{ t.common?.viewDetails || 'View details' }}
                  </a>
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
            <h3>{{ currentLanguage === 'fr' ? 'Aucun résultat trouvé' : 'No listings found' }}</h3>
            <p>{{ currentLanguage === 'fr' ? "Essayez d'ajuster vos critères de recherche." : 'Try adjusting your search criteria.' }}</p>
            <div class="no-results-actions">
              <button class="btn btn-primary" (click)="openFilters()" aria-label="Return to search filters">
                {{ currentLanguage === 'fr' ? 'Retour aux filtres' : 'Back to Filters' }}
              </button>
              <button class="btn btn-outline" (click)="clearFilters()" aria-label="Clear all filters and show all apartments">
                {{ currentLanguage === 'fr' ? 'Effacer les filtres' : 'Clear filters' }}
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  `,
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit, OnDestroy {
  apartments: Apartment[] = [];
  filteredApartments: Apartment[] = [];
  areas: Area[] = [];
  toggles: ToggleOption[] = [];
  unitTypes: UnitType[] = [];
  loading = true;
  t: any = {};
  currentLanguage = 'fr';
  selectedToggles: Set<string> = new Set<string>();
  showFilters = false;

  liveAnnouncement = '';
  focusedCardIndex = 0;

  // Filters
  selectedArea = '';
  selectedBedrooms: string = '';
  selectedFurnished: string = '';
  selectedUnitType: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy: 'price-asc' | 'price-desc' = 'price-asc';

  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private cacheBusting: CacheBustingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.subscribeToLanguageChanges();
    this.initQueryParamListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initQueryParamListener(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const area = params.get('area') || '';
        if (area !== this.selectedArea) {
          this.selectedArea = area;
          this.applyFilters();
        }
      });
  }

  private loadData(): void {
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
      .subscribe(areas => this.areas = areas);

    this.dataService.getToggles()
      .pipe(takeUntil(this.destroy$))
      .subscribe(opts => this.toggles = opts);

    this.dataService.getUnitTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(types => this.unitTypes = types);
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
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.apartments];

    // Apply filters
    if (this.selectedArea) {
      filtered = filtered.filter(apt => apt.area === this.selectedArea);
    }

    if (this.selectedBedrooms !== '') {
      const bedrooms = parseInt(this.selectedBedrooms);
      if (bedrooms >= 3) {
        filtered = filtered.filter(apt => this.getBedrooms(apt) >= 3);
      } else {
        filtered = filtered.filter(apt => this.getBedrooms(apt) === bedrooms);
      }
    }

    if (this.selectedFurnished !== '') {
      const furnished = this.selectedFurnished === 'true';
      filtered = filtered.filter(apt => apt.furnished === furnished);
    }

    if (this.selectedUnitType) {
      filtered = filtered.filter(apt => (apt.unit_type_name || '').toLowerCase() === this.selectedUnitType.toLowerCase());
    }

    // Note: toggles selection UI present for parity with Home; not applied to filtering per requirements

    // Apply sorting
    this.filteredApartments = this.dataService.sortApartments(filtered, this.sortBy);

    this.focusedCardIndex = 0;

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

  clearFilters(): void {
    this.selectedArea = '';
    this.selectedBedrooms = '';
    this.selectedFurnished = '';
    this.selectedUnitType = '';
    this.selectedToggles.clear();
    this.minPrice = null;
    this.maxPrice = null;
    this.sortBy = 'price-asc';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.selectedArea || 
      this.selectedBedrooms !== '' || 
      this.selectedFurnished !== '' ||
      this.selectedToggles.size > 0 ||
      this.selectedUnitType !== '' ||
      (this.minPrice !== null && this.minPrice > 0) ||
      (this.maxPrice !== null && this.maxPrice > 0)
    );
  }

  getAreaName(areaId: string): string {
    const area = this.areas.find(a => a.id === areaId);
    if (!area) return areaId;
    return this.currentLanguage === 'fr' ? area.nameFr : area.nameEn;
  }

  trackByApartment(index: number, apartment: Apartment): string {
    return apartment.id;
  }

  trackByToggle(index: number, toggle: ToggleOption): string {
    return `${toggle.toggle_name}-${index}`;
  }

  bookTour(apartment?: Apartment): void {
    // Trigger the header booking modal by dispatching a custom event
    const bookingEvent = new CustomEvent('openBookingModal');
    window.dispatchEvent(bookingEvent);
  }

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
    return apartment.unit_type_name || (this.getBedrooms(apartment) === 0 ? 'Studio' : `${this.getBedrooms(apartment)} Bedroom${this.getBedrooms(apartment) > 1 ? 's' : ''}`);
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

  onToggleChanged(name: string, checked: boolean): void {
    if (checked) {
      this.selectedToggles.add(name);
    } else {
      this.selectedToggles.delete(name);
    }
    // Not applying toggle filtering yet per requirements
  }

  getImageUrl(imagePath: string): string {
    return this.cacheBusting.getImageUrl(imagePath);
  }

  onImageError(event: Event, apartment: any) {
    const img = event.target as HTMLImageElement;
    // Prevent infinite error loop
    if (!img.src.includes('image-not-available')) {
      img.src = this.cacheBusting.getImageUrl('image-not-available.svg');
    }
  }

  onCardLinkKeyDown(event: KeyboardEvent, index: number): void {
    const nav = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!nav.includes(event.key)) return;
    // Prevent immediately and stop propagation
    event.preventDefault();
    event.stopPropagation();
    
    const count = this.filteredApartments.length;
    if (count === 0) return;
    
    // Validate input index is within bounds (safety check for race conditions)
    if (index < 0 || index >= count) {
      index = Math.max(0, Math.min(index, count - 1));
    }
    
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = Math.min(index + 1, count - 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = Math.max(index - 1, 0);
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = count - 1;
    }
    
    // Additional safety check before array access
    if (next < 0 || next >= count) {
      return;
    }
    
    if (next !== index) {
      this.focusedCardIndex = next;
      // Query for the specific apartment's link by ID
      const nextAptId = this.filteredApartments[next].id;
      const nextLink = document.querySelector<HTMLAnchorElement>(`.btn.btn-primary[data-apt-id="${nextAptId}"]`);
      
      if (nextLink) {
        // Explicitly blur current element first for screen readers
        const currentElement = event.currentTarget as HTMLElement;
        currentElement.blur();
        
        // Use requestAnimationFrame to ensure focus happens after blur completes
        requestAnimationFrame(() => {
          nextLink.focus();
          // Force scroll into view for screen reader sync
          nextLink.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        });
      }
    }
  }

  private restoreCardFocus(): void {
    const id = sessionStorage.getItem('lastFocusedApartmentId');
    if (!id) return;
    sessionStorage.removeItem('lastFocusedApartmentId');
    setTimeout(() => {
      const idx = this.filteredApartments.findIndex(a => a.id === id);
      if (idx >= 0) {
        this.focusedCardIndex = idx;
        const link = document.querySelector<HTMLAnchorElement>(`a[data-apt-id="${id}"]`);
        link?.focus();
      }
    }, 100);
  }

  saveSelectedCard(apartmentId: string): void {
    sessionStorage.setItem('lastFocusedApartmentId', apartmentId);
  }

  openApartment(apartmentId: string): void {
    sessionStorage['focusContentAfterNav'] = '1';
    sessionStorage.setItem('lastFocusedApartmentId', apartmentId);
    const basePath = this.currentLanguage === 'fr' ? '/appartement' : '/apartments';
    this.router.navigate([basePath, apartmentId]);
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