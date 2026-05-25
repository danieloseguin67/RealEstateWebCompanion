import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { CacheBustingService } from '../../services/cache-busting.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="students-page">
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
            <h1>{{ currentLanguage === 'fr' ? 'Logements Étudiants à Montréal' : 'Student Housing in Montreal' }}</h1>
            <p class="hero-description">{{ currentLanguage === 'fr' ? 'Trouvez le logement parfait pour vos études à Montréal. Nos appartements adaptés aux étudiants offrent commodité, confort et communauté.' : 'Find the perfect accommodation for your studies in Montreal. Our student-friendly apartments offer convenience, comfort, and community.' }}</p>
          </div>
        </div>
        <div class="hero-image">
          <img [src]="getImageUrl('study0.jpg')" alt="Studient living" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2>{{ currentLanguage === 'fr' ? 'Parfait pour les Étudiants' : 'Perfect for Students' }}</h2>
          <div class="features-grid">
            <div class="feature-card">
              <img [src]="getImageUrl('study.jpg')" alt="Study area" loading="lazy" decoding="async">
              <h3>{{ currentLanguage === 'fr' ? 'Espaces d\\'Étude' : 'Study-Friendly Spaces' }}</h3>
              <p>{{ currentLanguage === 'fr' ? 'Environnements calmes parfaits pour étudier avec des espaces de travail dédiés.' : 'Quiet environments perfect for studying with dedicated workspace areas.' }}</p>
            </div>
            <div class="feature-card">
              <img [src]="getImageUrl('kitchen.jpg')" alt="All equipped kitchen" loading="lazy" decoding="async">
              <h3>{{ currentLanguage === 'fr' ? 'Cuisines Équipées' : 'Fully Equipped Kitchens' }}</h3>
              <p>{{ currentLanguage === 'fr' ? 'Cuisinez vos propres repas et économisez avec nos installations de cuisine modernes.' : 'Cook your own meals and save money with our modern kitchen facilities.' }}</p>
            </div>
            <div class="feature-card">
              <img [src]="getImageUrl('nearuniversity.jpg')" alt="Univerties near by" loading="lazy" decoding="async">
              <h3>{{ currentLanguage === 'fr' ? 'Près des Universités' : 'Near Universities' }}</h3>
              <p>{{ currentLanguage === 'fr' ? 'Proche de McGill, Concordia et UQAM avec un accès facile au métro.' : 'Close to McGill, Concordia, and UQAM with easy metro access.' }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Amenities Section -->
      <section class="amenities-section">
        <div class="container">
          <h2>{{ currentLanguage === 'fr' ? 'Commodités Étudiantes' : 'Student Amenities' }}</h2>
          <div class="amenities-list">
            <div class="amenity-item">
              <i class="fas fa-wifi"></i>
              <span>{{ currentLanguage === 'fr' ? 'Internet Haute Vitesse' : 'High-Speed Internet' }}</span>
            </div>
            <div class="amenity-item">
              <i class="fas fa-washing-machine"></i>
              <span>{{ currentLanguage === 'fr' ? 'Installations de Lavage' : 'Laundry Facilities' }}</span>
            </div>
            <div class="amenity-item">
              <i class="fas fa-dumbbell"></i>
              <span>{{ currentLanguage === 'fr' ? 'Centre de Fitness' : 'Fitness Center' }}</span>
            </div>
            <div class="amenity-item">
              <i class="fas fa-users"></i>
              <span>{{ currentLanguage === 'fr' ? 'Salles d\\'Étude' : 'Study Rooms' }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  currentLanguage: Language = 'fr';
  private destroy$ = new Subject<void>();

  constructor(private languageService: LanguageService, private cacheBusting: CacheBustingService) {}

  onA11yBadgeClick(): void {
    window.dispatchEvent(new CustomEvent('openA11yModal'));
  }

  getImageUrl(imagePath: string): string {
    return this.cacheBusting.getImageUrl(imagePath);
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => this.currentLanguage = lang);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}