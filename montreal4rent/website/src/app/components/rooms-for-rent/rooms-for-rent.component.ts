import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';
import { Subject, takeUntil } from 'rxjs';
import { DataService, Apartment, Area } from '../../services/data.service';
import { CacheBustingService } from '../../services/cache-busting.service';

@Component({
  selector: 'app-rooms-for-rent',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <main tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>

      <div class="rooms-for-rent-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <button type="button" class="hero-a11y-badge"
          (click)="onA11yBadgeClick()"
          [attr.aria-label]="currentLanguage === 'fr' ? 'Accessibilité — guide lecteur écran' : 'Accessibility — screen reader guide'"
          [attr.title]="currentLanguage === 'fr' ? 'Accessibilité' : 'Accessibility'">
          <i class="fas fa-universal-access" aria-hidden="true"></i>
          <span aria-hidden="true">Accessible</span>
        </button>
        <div class="hero-image">
          <img [src]="getImageUrl('rentaroom.jpg')" alt="Picture of a cozy room rental space" loading="eager" fetchpriority="high" decoding="async">
        </div>
        <div class="hero-content">
          <div class="container">
            <div class="hero-text">
              <h1>{{ currentLanguage === 'fr' ? 'Chambres à Louer' : 'Rooms for Rent' }}</h1>
              <p class="hero-description">
                {{ currentLanguage === 'fr' 
                  ? 'Chambres à louer à Montréal — pour étudiants uniquement.' 
                  : 'Rooms for rent in Montreal — for students only.' }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Rooms Listings (no filters) -->
      <section class="apartments-grid-section">
        <div class="container">
          <!-- Loading State -->
          <div class="text-center" *ngIf="loading">
            <div class="spinner"></div>
            <p>{{ t.common?.loading || (currentLanguage === 'fr' ? 'Chargement...' : 'Loading...') }}</p>
          </div>

          <!-- Rooms Grid -->
          <div 
            class="apartments-grid" 
            *ngIf="!loading && roomApartments.length > 0"
            role="list"
            [attr.aria-label]="currentLanguage === 'fr' ? 'Chambres à louer disponibles' : 'Available rooms for rent'"
            aria-live="polite"
            aria-atomic="false"
          >
            <div 
              class="apartment-card card slide-up" 
              *ngFor="let apartment of roomApartments; trackBy: trackByApartment; let i = index"
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
                  decoding="async"
                  (error)="onImageError($event, apartment)"
                >
                <div class="apartment-badge" [class.available]="apartment.available">
                  {{ apartment.available ? (t.common?.available || (currentLanguage === 'fr' ? 'Disponible' : 'Available')) : (t.common?.notAvailable || (currentLanguage === 'fr' ? 'Non disponible' : 'Not Available')) }}
                </div>
                <div class="apartment-price">{{ apartment.price | currency:'CAD':'symbol':'1.0-0' }}/{{ t.common?.month || (currentLanguage === 'fr' ? 'mois' : 'month') }}</div>
                <div class="image-overlay">
                  <button type="button" class="btn btn-primary btn-sm" (click)="openApartment(apartment.id)">
                    {{ t.common?.viewDetails || (currentLanguage === 'fr' ? 'Voir détails' : 'View Details') }}
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
                      {{ apartment.bathrooms === 1 ? (t.common?.bathroom || (currentLanguage === 'fr' ? 'salle de bain' : 'bathroom')) : (t.common?.bathrooms || (currentLanguage === 'fr' ? 'salles de bain' : 'bathrooms')) }}
                    </span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>{{ apartment.squareFootage }} {{ t.common?.sqft || 'sqft' }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{{ getAreaName(apartment.area) }}</span>
                  </div>
                </div>

                <div class="apartment-features">
                  <span class="feature-badge" [class.furnished]="apartment.furnished">
                    {{ apartment.furnished ? (t.common?.furnished || (currentLanguage === 'fr' ? 'Meublé' : 'Furnished')) : (t.common?.unfurnished || (currentLanguage === 'fr' ? 'Non meublé' : 'Unfurnished')) }}
                  </span>
                </div>

                <div class="apartment-description">
                  <p>{{ currentLanguage === 'fr' ? apartment.description : apartment.descriptionEn }}</p>
                </div>

                <div class="apartment-actions">
                  <button
                    type="button"
                    class="btn btn-primary"
                    (click)="openApartment(apartment.id)"
                  >
                    {{ t.common?.viewDetails || (currentLanguage === 'fr' ? 'Voir détails' : 'View Details') }}
                  </button>
                  <button 
                    class="btn btn-outline"
                    *ngIf="apartment.available"
                    (click)="bookTour(apartment)"
                  >
                    {{ t.common?.bookNow || (currentLanguage === 'fr' ? 'Réserver' : 'Book Now') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div class="no-results text-center" *ngIf="!loading && roomApartments.length === 0">
            <i class="fas fa-search"></i>
            <h3>{{ currentLanguage === 'fr' ? 'Aucun résultat' : 'No results' }}</h3>
            <p>{{ currentLanguage === 'fr' ? 'Aucune chambre à louer trouvée.' : 'No rooms for rent found.' }}</p>
          </div>
        </div>
      </section>
      </div>
    </main>
  `,
  styleUrls: ['./rooms-for-rent.component.scss']
})
export class RoomsForRentComponent implements OnInit, OnDestroy {
  currentLanguage: Language = 'fr';
  private destroy$ = new Subject<void>();

  liveAnnouncement = '';

  // Rooms listing state
  apartments: Apartment[] = [];
  roomApartments: Apartment[] = [];
  areas: Area[] = [];
  loading = true;
  t: any = {};

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private dataService: DataService,
    private cacheBusting: CacheBustingService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => this.currentLanguage = language);

    this.languageService.getCurrentTranslations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => this.t = translations);

    // Load apartments and filter for rooms only
    this.dataService.getApartments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(apartments => {
        this.apartments = apartments;
        this.roomApartments = apartments.filter(a => this.isRoomForRent(a));
        this.loading = false;
        this.restoreCardFocus();
      });

    // Load areas for display names
    this.dataService.getAreas()
      .pipe(takeUntil(this.destroy$))
      .subscribe(areas => this.areas = areas);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Helpers reused from apartments page for consistent display
  getAreaName(areaId: string): string {
    const area = this.areas.find(a => a.id === areaId);
    if (!area) return areaId;
    return this.currentLanguage === 'fr' ? area.nameFr : area.nameEn;
  }

  onA11yBadgeClick(): void {
    window.dispatchEvent(new CustomEvent('openA11yModal'));
  }

  trackByApartment(index: number, apartment: Apartment): string {
    return apartment.id;
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

  private isRoomForRent(apartment: Apartment): boolean {
    const v: unknown = (apartment as any).roomtorent ?? (apartment as any).roomToRent;
    if (typeof v === 'boolean') return v;
    if (typeof v === 'string') return v.toLowerCase() === 'true';
    return false;
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

}