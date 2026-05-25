import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';
import { EmailService } from '../../services/email.service';
import { CacheBustingService } from '../../services/cache-busting.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main #pageMain tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>

      <div class="contact-page">
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
            <h1>{{ currentLanguage === 'fr' ? 'Contactez-Nous' : 'Contact Us' }}</h1>
            <p class="hero-description">{{ currentLanguage === 'fr' ? 'Nous sommes là pour vous aider à trouver votre prochain chez-vous à Montréal.' : 'We are here to help you find your next home in Montreal.' }}</p>
          </div>
        </div>
        <div class="hero-image">
          <img [src]="getImageUrl('contactusbanner.jpg')" alt="Image of a person pointing at his screen to show how to contact us" loading="eager" fetchpriority="high" decoding="async">
        </div>
      </section>

      <!-- Contact Form Section -->
      <section class="contact-form-section">

        <div class="container">

          <div class="form-header">
            <h2>{{ translations.form.header }}</h2>
            <p>{{ translations.form.subheader }}</p>
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="alert alert-success" style="padding: 15px; margin: 20px 0; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 4px;">
            {{ successMessage }}
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="alert alert-error" style="padding: 15px; margin: 20px 0; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px;">
            {{ errorMessage }}
          </div>
          
          <!-- add move in date formgroup here -->
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>

            <div class="form-group">
              <label for="moveInDate">{{ translations.form.moveInDate }} *</label>
              <input 
                type="date" 
                id="moveInDate" 
                formControlName="moveInDate"
                [class.invalid]="contactForm.get('moveInDate')?.invalid && (contactForm.get('moveInDate')?.touched || contactForm.get('moveInDate')?.dirty)">
              <div class="error-message" *ngIf="contactForm.get('moveInDate')?.invalid && (contactForm.get('moveInDate')?.touched || contactForm.get('moveInDate')?.dirty)">
                <span *ngIf="contactForm.get('moveInDate')?.errors?.['required']">
                  {{ translations.form.moveInDateRequired }}
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="Name">{{ translations.form.name }} *</label>
              <input 
                type="text" 
                id="Name"
                formControlName="Name"
                maxlength="256"
                [class.invalid]="contactForm.get('Name')?.invalid && (contactForm.get('Name')?.touched || contactForm.get('Name')?.dirty)">
              <div class="error-message" *ngIf="contactForm.get('Name')?.invalid && (contactForm.get('Name')?.touched || contactForm.get('Name')?.dirty)"> 
                <span *ngIf="contactForm.get('Name')?.errors?.['required']">
                  {{ translations.form.nameRequired }}
                </span>
                <span *ngIf="contactForm.get('Name')?.errors?.['minlength']">
                  {{ translations.form.nameMinLength }}
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="email">{{ translations.form.email }} *</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                maxlength="256"
                [class.invalid]="contactForm.get('email')?.invalid && (contactForm.get('email')?.touched || contactForm.get('email')?.dirty)">
              <div class="error-message" *ngIf="contactForm.get('email')?.invalid && (contactForm.get('email')?.touched || contactForm.get('email')?.dirty)">
                <span *ngIf="contactForm.get('email')?.errors?.['required']">
                  {{ translations.form.emailRequired }}
                </span>
                <span *ngIf="contactForm.get('email')?.errors?.['email']">
                  {{ translations.form.emailInvalid }}
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="phone">{{ translations.form.phone }} *</label>
              <input
                type="tel"
                id="phone"
                formControlName="phone"
                [class.invalid]="contactForm.get('phone')?.invalid && (contactForm.get('phone')?.touched || contactForm.get('phone')?.dirty)">
              <div class="error-message" *ngIf="contactForm.get('phone')?.invalid && (contactForm.get('phone')?.touched || contactForm.get('phone')?.dirty)">
                <span *ngIf="contactForm.get('phone')?.errors?.['required']">
                  {{ translations.form.phoneRequired }}
                </span>
                <span *ngIf="contactForm.get('phone')?.errors?.['pattern']">
                  {{ translations.form.phoneInvalid }}
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="maxBudget">{{ translations.form.maxBudget }} *</label>
              <input
                type="number"
                id="maxBudget"
                formControlName="maxBudget"
                [class.invalid]="contactForm.get('maxBudget')?.invalid && (contactForm.get('maxBudget')?.touched || contactForm.get('maxBudget')?.dirty)">
              <div class="error-message" *ngIf="contactForm.get('maxBudget')?.invalid && (contactForm.get('maxBudget')?.touched || contactForm.get('maxBudget')?.dirty)">
                <span *ngIf="contactForm.get('maxBudget')?.errors?.['required']">
                  {{ translations.form.maxBudgetRequired }}
                </span>
                <span *ngIf="contactForm.get('maxBudget')?.errors?.['min']">
                  {{ translations.form.maxBudgetMin }}
                </span>
              </div>
            </div>  

            <div class="form-group">
              <label for="unitType">{{ translations.form.unitType }} *</label>
              <select 
                id="unitType"
                formControlName="unitType"
                [class.invalid]="contactForm.get('unitType')?.invalid && (contactForm.get('unitType')?.touched || contactForm.get('unitType')?.dirty)">
                <option value="">{{ translations.form.selectUnitType }}</option>
                <option value="studio">{{ translations.form.studio }}</option>
                <option value="1_bedroom">{{ translations.form['1bedroom'] }}</option>
                <option value="2_bedrooms">{{ translations.form['2bedrooms'] }}</option>  
                <option value="3_bedrooms">{{ translations.form['3bedrooms'] }}</option>
              </select>
              <div class="error-message" *ngIf="contactForm.get('unitType')?.invalid && (contactForm.get('unitType')?.touched || contactForm.get('unitType')?.dirty)">
                <span *ngIf="contactForm.get('unitType')?.errors?.['required']">
                  {{ translations.form.unitTypeRequired }}
                </span>
              </div>
            </div>

            <div class="form-group">
              <div class="form-label-column">
                <label for="message">{{ translations.form.message }}</label>
              </div>
              <div class="form-input-column">
                <textarea 
                  id="message"
                  formControlName="message"
                  rows="8"
                  [class.invalid]="contactForm.get('message')?.invalid && (contactForm.get('message')?.touched || contactForm.get('message')?.dirty)">
                </textarea>   
              </div>
            </div>

            <div class="form-actions">
              <button 
                type="submit" 
                class="send-email-btn"
                [disabled]="contactForm.invalid || sending">
                <i class="fas fa-paper-plane"></i>
                {{ sending ? (currentLanguage === 'fr' ? 'Envoi en cours...' : 'Sending...') : translations.form.submitRequest }}
              </button>
            </div>

            </form>

        </div>

      </section>

      </div>
    </main>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  currentLanguage: Language = 'fr';
  contactForm: FormGroup;
  private destroy$ = new Subject<void>();
  sending = false;
  successMessage = '';
  errorMessage = '';

  liveAnnouncement = '';

  translations: any = {
    form: {
      header: '',
      subheader: '',
      moveInDate: '',
      moveInDateRequired: '',
      name: '',
      nameRequired: '',
      nameMinLength: '',
      email: '',
      emailRequired: '',
      emailInvalid: '',
      phone: '',
      phoneRequired: '',
      phoneInvalid: '',
      maxBudget: '',
      maxBudgetRequired: '',
      maxBudgetMin: '',
      unitType: '',
      unitTypeRequired: '',
      selectUnitType: '',
      studio: '',
      '1bedroom': '',
      '2bedrooms': '',
      '3bedrooms': '',
      message: '',
      submitRequest: ''
    }
  };

  private static readonly TRANSLATIONS = {
    fr: {
      form: {
        header: 'Envoyez-nous un message',
        subheader: 'Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.',
        moveInDate: 'Date d\'emménagement',
        moveInDateRequired: 'La date d\'emménagement est requise.',
        name: 'Nom complet',
        nameRequired: 'Le nom est requis.',
        nameMinLength: 'Le nom doit contenir au moins 2 caractères.',
        email: 'Email',
        emailRequired: 'L\'email est requis.',
        emailInvalid: 'Veuillez entrer une adresse email valide.',
        phone: 'Numéro de téléphone',
        phoneRequired: 'Le numéro de téléphone est requis.',
        phoneInvalid: 'Veuillez entrer un numéro de téléphone valide.',
        maxBudget: 'Budget maximum (CAD)',
        maxBudgetRequired: 'Le budget maximum est requis.',
        maxBudgetMin: 'Le budget doit être supérieur à 0.',
        unitType: 'Type d\'unité',
        unitTypeRequired: 'Le type d\'unité est requis.',
        selectUnitType: 'Sélectionner le type d\'unité',
        studio: 'Studio',
        '1bedroom': '1 chambre',
        '2bedrooms': '2 chambres',
        '3bedrooms': '3 chambres',
        message: 'Message',
        submitRequest: 'Envoyer un courriel'
      }
    },
    en: {
      form: {
        header: 'Send us a message',
        subheader: 'Fill out the form below and we will get back to you quickly.',
        moveInDate: 'Move-in Date',
        moveInDateRequired: 'Move-in date is required.',
        name: 'Name',
        nameRequired: 'Name is required.',
        nameMinLength: 'Name must be at least 2 characters long.',
        email: 'Email',
        emailRequired: 'Email is required.',
        emailInvalid: 'Please enter a valid email address.',
        phone: 'Phone Number',
        phoneRequired: 'Phone number is required.',
        phoneInvalid: 'Please enter a valid phone number.',
        maxBudget: 'Max Budget (CAD)',
        maxBudgetRequired: 'Max budget is required.',
        maxBudgetMin: 'Budget must be greater than 0.',
        unitType: 'Unit Type',
        unitTypeRequired: 'Unit type is required.',
        selectUnitType: 'Select Unit Type',
        studio: 'Studio',
        '1bedroom': '1 Bedroom',
        '2bedrooms': '2 Bedrooms',
        '3bedrooms': '3 Bedrooms',
        message: 'Message',
        submitRequest: 'Send Email'
      }
    }
  };

  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private emailService: EmailService,
    private cacheBusting: CacheBustingService
  ) {
    this.contactForm = this.formBuilder.group({
      moveInDate: ['', Validators.required],
      Name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      maxBudget: ['', [Validators.required, Validators.min(1)]],
      unitType: ['', Validators.required],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
        this.setTranslations(lang);
      });
    this.setTranslations(this.currentLanguage);
  }

  setTranslations(lang: Language) {
    const t = ContactComponent.TRANSLATIONS[lang] || ContactComponent.TRANSLATIONS['en'];
    this.translations.form.header = t.form.header;
    this.translations.form.subheader = t.form.subheader;
    this.translations.form.moveInDate = t.form.moveInDate;
    this.translations.form.moveInDateRequired = t.form.moveInDateRequired;
    this.translations.form.name = t.form.name;
    this.translations.form.nameRequired = t.form.nameRequired;
    this.translations.form.nameMinLength = t.form.nameMinLength;
    this.translations.form.email = t.form.email;
    this.translations.form.emailRequired = t.form.emailRequired;
    this.translations.form.emailInvalid = t.form.emailInvalid;
    this.translations.form.phone = t.form.phone;
    this.translations.form.phoneRequired = t.form.phoneRequired;
    this.translations.form.phoneInvalid = t.form.phoneInvalid;
    this.translations.form.maxBudget = t.form.maxBudget;
    this.translations.form.maxBudgetRequired = t.form.maxBudgetRequired;
    this.translations.form.maxBudgetMin = t.form.maxBudgetMin;
    this.translations.form.unitType = t.form.unitType;
    this.translations.form.unitTypeRequired = t.form.unitTypeRequired;
    this.translations.form.selectUnitType = t.form.selectUnitType;
    this.translations.form.studio = t.form.studio;
    this.translations.form['1bedroom'] = t.form['1bedroom'];
    this.translations.form['2bedrooms'] = t.form['2bedrooms'];
    this.translations.form['3bedrooms'] = t.form['3bedrooms'];
    this.translations.form.message = t.form.message;
    this.translations.form.submitRequest = t.form.submitRequest;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.sending = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      // Get form values
      const formData = this.contactForm.value;
      
      // Get unit type label
      const unitTypeLabels: {[key: string]: string} = {
        'studio': this.translations.form.studio,
        '1_bedroom': this.translations.form['1bedroom'],
        '2_bedrooms': this.translations.form['2bedrooms'],
        '3_bedrooms': this.translations.form['3bedrooms']
      };
      const unitTypeLabel = unitTypeLabels[formData.unitType] || formData.unitType;
      
      // Create HTML email body
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Montreal4Rent - Rental Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Move-in Date:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.moveInDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.Name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Max Budget:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${formData.maxBudget} CAD</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Unit Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unitTypeLabel}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #007bff;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; color: #555;">${formData.message || 'No additional message'}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This inquiry was submitted via the Montreal4Rent contact form.</p>
        </div>
      `;

      const subject = `Montreal4Rent - Rental Inquiry from ${formData.Name}`;

      // Send email via backend PHP service
      this.emailService.sendEmail(
        formData.email,
        'info@montreal4rent.com',
        subject,
        emailBody,
        'contact',
        formData.Name
      ).subscribe({
        next: (success: boolean) => {
          this.sending = false;
          if (success) {
            this.successMessage = this.currentLanguage === 'fr' 
              ? 'Votre message a été envoyé avec succès! Nous vous répondrons bientôt.' 
              : 'Your message has been sent successfully! We will get back to you soon.';
            this.contactForm.reset();
            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Redirect to home page after 3 seconds
            setTimeout(() => this.router.navigate(['/']), 3000);
          } else {
            this.errorMessage = this.currentLanguage === 'fr'
              ? 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.'
              : 'There was an error sending your message. Please try again later.';
          }
        },
        error: (err: any) => {
          this.sending = false;
          this.errorMessage = this.currentLanguage === 'fr'
            ? 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.'
            : 'There was an error sending your message. Please try again later.';
          console.error('Email send error:', err);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  onA11yBadgeClick(): void {
    window.dispatchEvent(new CustomEvent('openA11yModal'));
  }

  getImageUrl(imagePath: string): string {
    return this.cacheBusting.getImageUrl(imagePath);
  }
}