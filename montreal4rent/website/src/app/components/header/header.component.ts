import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService, Language } from '../../services/language.service';
import { EmailService } from '../../services/email.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header
      class="header"
      id="top-menu-bar"
      tabindex="-1"
      [attr.aria-label]="currentLanguage === 'fr' ? 'Barre de menu principale' : 'Top menu bar'"
    >
      <div class="container">
        <div class="header-content" [class.french-layout]="currentLanguage === 'fr'">
          <!-- Logo -->
          <div class="logo">
            <a routerLink="/" class="logo-link" aria-label="Montreal4Rent - Go to home page" (click)="onNavActivated()">
              <h1 aria-label="Montreal4Rent">Montreal4Rent</h1>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="desktop-nav" role="navigation" aria-label="Main navigation">
            <ul class="nav-list" role="menubar">
              
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="currentLanguage === 'fr' ? '/appartements' : '/apartments'" 
                  routerLinkActive="active"
                  (click)="onNavActivated()"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Voir tous les appartements' : 'View all apartments'"
                >{{ currentLanguage === 'fr' ? 'Appartements' : 'Apartments' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="currentLanguage === 'fr' ? '/suites-meublées' : '/furnished-suites'" 
                  routerLinkActive="active"
                  (click)="onNavActivated()"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Voir les appartements entièrement meublés' : 'View fully furnished apartments'"
                >{{ currentLanguage === 'fr' ? 'Entièrement Meublés' : 'Fully Furnished' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="currentLanguage === 'fr' ? '/condos-à-louer' : '/condo-rentals'" 
                  routerLinkActive="active"
                  (click)="onNavActivated()"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Voir les condos à louer' : 'View condo rentals'"
                >{{ currentLanguage === 'fr' ? 'Condos à Louer' : 'Condo Rentals' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="'/property-owners'" 
                  routerLinkActive="active"
                  (click)="onNavActivated()"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Information pour les propriétaires' : 'Information for property owners'"
                >{{ currentLanguage === 'fr' ? 'Propriétaires' : 'Property Owners' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="'/contact'" 
                  routerLinkActive="active"
                  (click)="onNavActivated()"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Contactez-nous' : 'Contact us'"
                >{{ currentLanguage === 'fr' ? 'Contactez-Nous' : 'Contact Us' }}</a>
              </li>
            </ul>
          </nav>

          <!-- Right Side Actions -->
          <div class="header-actions">
            <div class="header-top-actions">
              <!-- Language Switcher (Side by Side) -->
              <div class="language-switcher" role="group" aria-label="Language selection">
                <button 
                  class="lang-btn" 
                  [class.active]="currentLanguage === 'fr'"
                  (click)="setLanguage('fr')"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Français sélectionné' : 'Changer la langue en français'"
                  [attr.aria-pressed]="currentLanguage === 'fr'"
                  type="button"
                >
                  FR
                </button>
                <button 
                  class="lang-btn" 
                  [class.active]="currentLanguage === 'en'"
                  (click)="setLanguage('en')"
                  [attr.aria-label]="currentLanguage === 'en' ? 'English selected' : 'Switch language to English'"
                  [attr.aria-pressed]="currentLanguage === 'en'"
                  type="button"
                >
                  EN
                </button>
              </div>

              <!-- Mobile Menu Button - Shows on tablet and mobile only -->
              <button 
                class="mobile-menu-btn"
                (click)="toggleMobileMenu()"
                [attr.aria-expanded]="showMobileMenu"
                [attr.aria-label]="showMobileMenu ? (currentLanguage === 'fr' ? 'Fermer le menu principal' : 'Close main menu') : (currentLanguage === 'fr' ? 'Ouvrir le menu principal' : 'Open main menu')"
                type="button"
              >
                <i class="fas" [class.fa-bars]="!showMobileMenu" [class.fa-times]="showMobileMenu" aria-hidden="true"></i>
              </button>
            </div>

            <!-- Book Tour Button -->
            <button 
              class="book-tour-btn" 
              (click)="openBookingModal()"
              [attr.aria-label]="currentLanguage === 'fr' ? 'Réserver une visite guidée' : 'Book a tour of an apartment'"
              type="button"
            >
              {{ t.navigation?.bookTour }}
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div 
          class="mobile-menu" 
          [class.show]="showMobileMenu" 
          *ngIf="showMobileMenu"
          [attr.aria-hidden]="!showMobileMenu"
        >
          <nav class="mobile-nav" role="navigation" [attr.aria-label]="currentLanguage === 'fr' ? 'Navigation mobile' : 'Mobile navigation'">
            <ul class="mobile-nav-list" role="menu">
              
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="currentLanguage === 'fr' ? '/appartements' : '/apartments'" 
                  (click)="onNavActivated(); closeMobileMenu()" 
                  routerLinkActive="active"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Voir tous les appartements' : 'View all apartments'"
                >{{ currentLanguage === 'fr' ? 'Appartements' : 'Apartments' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="currentLanguage === 'fr' ? '/suites-meublées' : '/furnished-suites'" 
                  (click)="onNavActivated(); closeMobileMenu()" 
                  routerLinkActive="active"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Voir les appartements entièrement meublés' : 'View fully furnished apartments'"
                >{{ currentLanguage === 'fr' ? 'Entièrement Meublés' : 'Fully Furnished' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="currentLanguage === 'fr' ? '/condos-à-louer' : '/condo-rentals'" 
                  (click)="onNavActivated(); closeMobileMenu()" 
                  routerLinkActive="active"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Voir les condos à louer' : 'View condo rentals'"
                >{{ currentLanguage === 'fr' ? 'Condos à Louer' : 'Condo Rentals' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="'/property-owners'" 
                  (click)="onNavActivated(); closeMobileMenu()" 
                  routerLinkActive="active"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Information pour les propriétaires' : 'Information for property owners'"
                >{{ currentLanguage === 'fr' ? 'Propriétaires' : 'Property Owners' }}</a>
              </li>
              <li role="none">
                <a 
                  role="menuitem"
                  [routerLink]="'/contact'" 
                  (click)="onNavActivated(); closeMobileMenu()" 
                  routerLinkActive="active"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Contactez-nous' : 'Contact us'"
                >{{ currentLanguage === 'fr' ? 'Contactez-Nous' : 'Contact Us' }}</a>
              </li>
              <li role="none" class="mobile-menu-divider">
                <button 
                  type="button"
                  role="menuitem"
                  class="mobile-menu-a11y-btn"
                  (click)="onA11yBadgeClick(); closeMobileMenu()"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Accessibilité — guide lecteur écran' : 'Accessibility — screen reader guide'"
                >
                  <i class="fas fa-universal-access" aria-hidden="true"></i>
                  {{ currentLanguage === 'fr' ? 'Accessibilité' : 'Accessibility' }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div 
        class="mobile-menu-overlay" 
        *ngIf="showMobileMenu"
        (click)="closeMobileMenu()"
        aria-hidden="true"
      ></div>

      <!-- Booking Modal -->
      <div 
        class="booking-modal-overlay" 
        *ngIf="showBookingModal" 
        (click)="closeBookingModal()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="currentLanguage === 'fr' ? 'Formulaire de réservation de visite' : 'Tour booking form'"
      >
        <div class="booking-modal" (click)="$event.stopPropagation()" role="document">
          <div class="modal-header">
            <h3 id="booking-modal-title">{{ t.navigation?.bookTour }}</h3>
            <button 
              class="modal-close" 
              (click)="closeBookingModal()"
              [attr.aria-label]="currentLanguage === 'fr' ? 'Fermer le formulaire' : 'Close form'"
              type="button"
            >
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <form class="booking-form" (ngSubmit)="submitBookingForm()" #bookingFormRef="ngForm" aria-labelledby="booking-modal-title">
              <div class="form-group">
                <label for="booking-name">{{ currentLanguage === 'fr' ? 'Nom complet' : 'Full Name' }} *</label>
                <input 
                  type="text" 
                  id="booking-name" 
                  name="name"
                  [(ngModel)]="bookingForm.name" 
                  class="form-control" 
                  required
                  #nameField="ngModel"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Nom complet, requis' : 'Full name, required'"
                  [attr.aria-required]="true"
                  placeholder="{{ currentLanguage === 'fr' ? 'Votre nom complet' : 'Your full name' }}"
                >
              </div>
              
              <div class="form-group">
                <label for="booking-email">{{ currentLanguage === 'fr' ? 'Courriel' : 'Email' }} *</label>
                <input 
                  type="email" 
                  id="booking-email" 
                  name="email"
                  [(ngModel)]="bookingForm.email" 
                  class="form-control" 
                  required
                  #emailField="ngModel"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Adresse courriel, requis' : 'Email address, required'"
                  [attr.aria-required]="true"
                  placeholder="{{ currentLanguage === 'fr' ? 'votre@email.com' : 'your@email.com' }}"
                >
              </div>
              
              <div class="form-group">
                <label for="booking-phone">{{ currentLanguage === 'fr' ? 'Téléphone' : 'Phone Number' }} *</label>
                <input 
                  type="tel" 
                  id="booking-phone" 
                  name="phone"
                  [(ngModel)]="bookingForm.phone" 
                  class="form-control" 
                  required
                  #phoneField="ngModel"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Numéro de téléphone, requis' : 'Phone number, required'"
                  [attr.aria-required]="true"
                  placeholder="{{ currentLanguage === 'fr' ? '(514) 123-4567' : '(514) 123-4567' }}"
                >
              </div>
              
              <div class="form-group">
                <label for="booking-message">{{ currentLanguage === 'fr' ? 'Message' : 'Message' }}</label>
                <textarea 
                  id="booking-message" 
                  name="message"
                  [(ngModel)]="bookingForm.message" 
                  class="form-control" 
                  rows="4"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Message optionnel' : 'Optional message'"
                  placeholder="{{ currentLanguage === 'fr' ? 'Décrivez vos besoins et préférences...' : 'Describe your needs and preferences...' }}"
                ></textarea>
              </div>
              
              <div *ngIf="bookingSuccess" class="alert alert-success" role="status" aria-live="polite">
                {{ bookingSuccess }}
              </div>

              <div *ngIf="bookingError" class="alert alert-error" role="alert" aria-live="assertive">
                {{ bookingError }}
              </div>
              
              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn btn-outline" 
                  (click)="closeBookingModal()"
                  [attr.aria-label]="currentLanguage === 'fr' ? 'Annuler et fermer le formulaire' : 'Cancel and close form'"
                >
                  {{ currentLanguage === 'fr' ? 'Annuler' : 'Cancel' }}
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  [disabled]="!bookingFormRef.form.valid || sendingBooking"
                  [attr.aria-label]="sendingBooking ? (currentLanguage === 'fr' ? 'Envoi en cours' : 'Sending') : (currentLanguage === 'fr' ? 'Envoyer le formulaire de réservation' : 'Send booking form')"
                >
                  <i class="fas fa-paper-plane" aria-hidden="true"></i>
                  {{ sendingBooking ? (currentLanguage === 'fr' ? 'Envoi en cours...' : 'Sending...') : (currentLanguage === 'fr' ? 'Envoyer un courriel' : 'Send Email') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMobileMenu = false;
  showLanguageDropdown = false;
  showBookingModal = false;
  currentLanguage: Language = 'fr';
  t: any = {};
  
  bookingForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  
  sendingBooking = false;
  bookingSuccess = '';
  bookingError = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private languageService: LanguageService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => this.currentLanguage = lang);

    this.languageService.getCurrentTranslations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => this.t = translations);
    
    // Listen for booking modal events from other components
    window.addEventListener('openBookingModal', () => {
      this.openBookingModal();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Remove the event listener
    window.removeEventListener('openBookingModal', () => {
      this.openBookingModal();
    });
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.showMobileMenu ? 'hidden' : 'auto';
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
    document.body.style.overflow = 'auto';
  }

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

  setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.showLanguageDropdown = false;
  }

  openBookingModal(): void {
    this.showBookingModal = true;
    this.closeMobileMenu();
    document.body.style.overflow = 'hidden';
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    document.body.style.overflow = 'auto';
  }

  submitBookingForm(): void {
    this.bookingSuccess = '';
    this.bookingError = '';

    // Check if all required fields are filled
    if (!this.bookingForm.name || !this.bookingForm.email || !this.bookingForm.phone) {
      this.bookingError = this.currentLanguage === 'fr' 
        ? 'Veuillez remplir tous les champs obligatoires.'
        : 'Please fill in all required fields.';
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.bookingForm.email)) {
      this.bookingError = this.currentLanguage === 'fr' 
        ? 'Veuillez entrer une adresse courriel valide.'
        : 'Please enter a valid email address.';
      return;
    }
    
    this.sendingBooking = true;

    // Prepare email details
    const subject = this.currentLanguage === 'fr' 
      ? 'Demande de visite - Montreal4Rent'
      : 'Book a Tour - Montreal4Rent';
    
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${this.currentLanguage === 'fr' ? 'Nouvelle demande de visite' : 'New Tour Request'}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${this.bookingForm.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${this.bookingForm.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${this.bookingForm.phone}</td>
          </tr>
        </table>
        ${this.bookingForm.message ? `
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #007bff;">
          <h3 style="margin-top: 0; color: #333;">${this.currentLanguage === 'fr' ? 'Message' : 'Message'}:</h3>
          <p style="white-space: pre-wrap; color: #555;">${this.bookingForm.message}</p>
        </div>` : ''}
      </div>
    `;
    
    // Send email via backend PHP service
    this.emailService.sendEmail(
      this.bookingForm.email,
      'info@montreal4rent.com',
      subject,
      emailBody,
      'book-tour',
      this.bookingForm.name
    ).subscribe({
      next: (success) => {
        this.sendingBooking = false;
        if (success) {
          this.bookingSuccess = this.currentLanguage === 'fr'
            ? 'Votre demande a été envoyée avec succès!'
            : 'Your tour request has been sent successfully!';
          setTimeout(() => {
            this.bookingForm = { name: '', email: '', phone: '', message: '' };
            this.closeBookingModal();
          }, 2000);
        } else {
          this.bookingError = this.currentLanguage === 'fr'
            ? 'Erreur lors de l\'envoi. Veuillez réessayer.'
            : 'Error sending request. Please try again.';
        }
      },
      error: (err) => {
        this.sendingBooking = false;
        this.bookingError = this.currentLanguage === 'fr'
          ? 'Erreur lors de l\'envoi. Veuillez réessayer.'
          : 'Error sending request. Please try again.';
        console.error('Booking email error:', err);
      }
    });
  }

  bookTour(): void {
    this.openBookingModal();
  }

  onNavActivated(): void {
    // When a page is selected from the menu (Enter/click), move focus into
    // page content after the route change so screen readers can read down.
    sessionStorage['focusContentAfterNav'] = '1';
  }

  onA11yBadgeClick(): void {
    window.dispatchEvent(new CustomEvent('openA11yModal'));
  }
}