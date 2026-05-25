import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService, Apartment, Area, ToggleOption, UnitType } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';
import { CacheBustingService } from '../../services/cache-busting.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-condo-rentals',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe],
  template: `
    <main #pageMain tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>

      <div class="condo-rentals-page">
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
            <h1>{{ currentLanguage === 'fr' ? 'Condos à Louer' : 'Condo Rentals' }}</h1>
            <p class="hero-description">{{ currentLanguage === 'fr' ? 'Découvrez notre collection de condos à Montréal' : 'Browse our condo rentals in Montreal' }}</p>
          </div>
        </div>
        <div class="hero-image">
          <img [src]="getImageUrl('condo.jpg')" alt="Picture of a condo" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>

      <!-- Search Section (same as Apartments) -->
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
                      <label class="form-label">{{ currentLanguage === 'fr' ? 'Quartier' : 'Area' }}</label>
                      <select 
                        class="form-control form-select" 
                        [(ngModel)]="selectedArea"
                        (change)="onFiltersChanged()"
                      >
                        <option value="">{{ currentLanguage === 'fr' ? 'Tous les quartiers' : 'All Areas' }}</option>
                        <option *ngFor="let area of areas" [value]="area.id">
                          {{ currentLanguage === 'fr' ? area.nameFr : area.nameEn }}
                        </option>
                      </select>
                    </div>
                  </div>
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
                        <div class="form-check" *ngFor="let opt of toggles">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            [checked]="selectedToggles.has(opt.toggle_name)"
                            (change)="onToggleChanged(opt.toggle_name, $any($event.target).checked)"
                              (keydown.enter)="$event.preventDefault(); $event.stopPropagation(); $any($event.target).click()"
                              [id]="'toggle-' + opt.toggle_name"
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
                      <label class="form-label">{{ currentLanguage === 'fr' ? 'Trier par' : 'Sort By' }}</label>
                      <select 
                        class="form-control form-select" 
                        [(ngModel)]="sortBy"
                        (change)="onFiltersChanged()"
                      >
                        <option value="price-asc">{{ currentLanguage === 'fr' ? 'Prix ↑' : 'Price ↑' }}</option>
                        <option value="price-desc">{{ currentLanguage === 'fr' ? 'Prix ↓' : 'Price ↓' }}</option>
                      </select>
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

      <!-- Condos Grid -->
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

          <!-- Condos Grid -->
          <div 
            class="apartments-grid" 
            *ngIf="!loading && filteredApartments.length > 0"
            role="list"
            [attr.aria-label]="currentLanguage === 'fr' ? 'Résultats : condos à louer' : 'Search results: condo rentals'"
            aria-live="polite"
            aria-atomic="false"
          >
            <div 
              class="apartment-card card slide-up" 
              *ngFor="let apartment of filteredApartments; trackBy: trackByApartment; let i = index"
              role="listitem"
              tabindex="0"
              [attr.data-apt-id]="apartment.id"
              [attr.aria-label]="(currentLanguage === 'fr' ? apartment.title : apartment.titleEn) + ', ' + getUnitType(apartment) + ', ' + getAreaName(apartment.area) + ', ' + apartment.price + (currentLanguage === 'fr' ? ' $/mois' : ' CAD/month') + (apartment.available ? (currentLanguage === 'fr' ? ', Disponible' : ', Available') : (currentLanguage === 'fr' ? ', Non disponible' : ', Not available'))"
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
                  <button type="button" class="btn btn-primary btn-sm" (click)="openApartment(apartment.id)">
                    {{ currentLanguage === 'fr' ? 'Voir les détails' : 'View Details' }}
                  </button>
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
                  <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{{ getAreaName(apartment.area) }}</span>
                  </div>
                </div>

                <div class="apartment-description" *ngIf="apartment.description || apartment.descriptionEn">
                  <p>{{ truncateDescription(currentLanguage === 'fr' ? apartment.description : apartment.descriptionEn) }}</p>
                </div>

                <div class="apartment-actions">
                  <button
                    type="button"
                    class="btn btn-primary"
                    (click)="openApartment(apartment.id)"
                  >
                    {{ currentLanguage === 'fr' ? 'Voir les détails' : 'View Details' }}
                  </button>
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
            <h3>{{ currentLanguage === 'fr' ? 'Aucun logement trouvé' : 'No listings found' }}</h3>
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
  styleUrls: ['./condo-rentals.component.scss']
})
export class CondoRentalsComponent implements OnInit, OnDestroy {
  apartments: Apartment[] = [];
  filteredApartments: Apartment[] = [];
  areas: Area[] = [];
  toggles: ToggleOption[] = [];
  unitTypes: UnitType[] = [];
  loading = true;
  currentLanguage = 'fr';
  selectedToggles: Set<string> = new Set<string>();
  showFilters = false;

  // Filters
  selectedArea = '';
  selectedBedrooms: string = '';
  sortBy: 'price-asc' | 'price-desc' = 'price-asc';

  liveAnnouncement = '';

  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router,
    private cacheBusting: CacheBustingService
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
  }

  onFiltersChanged(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.apartments.filter(apt => !!apt.condorentals);

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

    this.filteredApartments = this.dataService.sortApartments(filtered, this.sortBy);

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
    this.selectedToggles.clear();
    this.sortBy = 'price-asc';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedArea || this.selectedBedrooms !== '' || this.selectedToggles.size > 0 || this.sortBy !== 'price-asc');
  }

  getAreaName(areaId: string): string {
    const area = this.areas.find(a => a.id === areaId);
    if (!area) return areaId;
    return this.currentLanguage === 'fr' ? area.nameFr : area.nameEn;
  }

  trackByApartment(index: number, apartment: Apartment): string {
    return apartment.id;
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
    // Toggle filtering not applied to results yet
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
    const b = this.getBedrooms(apartment);
    return apartment.unit_type_name || (b === 0 ? 'Studio' : `${b} Bedroom${b > 1 ? 's' : ''}`);
  }

  bookTour(apartment?: Apartment): void {
    const apartmentInfo = apartment 
      ? `\n\nApartment: ${this.currentLanguage === 'fr' ? apartment.title : apartment.titleEn}\nPrice: $${apartment.price} CAD/month\nUnit Type: ${this.getUnitType(apartment)}\nArea: ${this.getAreaName(apartment.area)}`
      : '';
    
    const subject = this.currentLanguage === 'fr' 
      ? 'Demande de visite - Montreal4Rent'
      : 'Book a Tour - Montreal4Rent';
    
    const body = (this.currentLanguage === 'fr'
      ? `Bonjour,\n\nJe souhaite réserver une visite pour:${apartmentInfo}\n\nNom: \nEmail: \nTéléphone: \nMessage: `
      : `Hello,\n\nI would like to book a tour for:${apartmentInfo}\n\nName: \nEmail: \nPhone: \nMessage: `);
    
    const mailtoLink = `mailto:info@montreal4rent.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  truncateDescription(description: string | undefined): string {
    if (!description) return '';
    const maxLength = 150;
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  }

  getImageUrl(imagePath: string): string {
    return this.cacheBusting.getImageUrl(imagePath);
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

  onImageError(event: Event, apartment: any) {
    const img = event.target as HTMLImageElement;
    // Prevent infinite error loop
    if (!img.src.includes('image-not-available')) {
      img.src = this.cacheBusting.getImageUrl('image-not-available.svg');
    }
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

}