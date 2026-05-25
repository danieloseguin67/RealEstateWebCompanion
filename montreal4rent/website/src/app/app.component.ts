import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanguageService } from './services/language.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  template: `
    <app-header></app-header>
    <div class="main-content" id="app-main-content" tabindex="-1" role="main">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>

    <!-- ── Accessibility info modal ─────────────────────────────────────── -->
    <div
      *ngIf="showA11yModal"
      class="a11y-modal-overlay"
      (click)="closeA11yModal()"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
      aria-describedby="a11y-modal-desc"
    >
      <div class="a11y-modal-dialog" (click)="$event.stopPropagation()">

        <div class="a11y-modal-header">
          <h2 id="a11y-modal-title">
            <i class="fas fa-universal-access" aria-hidden="true"></i>
            {{ lang === 'fr' ? 'Accessibilité — Guide lecteur écran' : 'Accessibility — Screen Reader Guide' }}
          </h2>
          <button type="button" class="a11y-modal-close" (click)="closeA11yModal()"
            [attr.aria-label]="lang === 'fr' ? 'Fermer' : 'Close'">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div class="a11y-modal-body" id="a11y-modal-desc">
          <p class="a11y-modal-intro">
            {{ lang === 'fr'
              ? 'Ce site est entièrement accessible aux personnes aveugles et malvoyantes. Suivez les instructions ci-dessous pour activer un lecteur écran sur votre appareil.'
              : 'This website is fully accessible for blind and visually impaired users. Follow the instructions below to enable a screen reader on your device.' }}
          </p>

          <!-- Desktop -->
          <div class="a11y-platform">
            <h3><i class="fas fa-desktop" aria-hidden="true"></i>
              {{ lang === 'fr' ? 'Ordinateur de bureau' : 'Desktop' }}
            </h3>
            <ul>
              <li *ngIf="lang !== 'fr'">
                <strong>NVDA (Windows, free):</strong>
                Press <span class="a11y-modal-kbd">Ctrl</span> + <span class="a11y-modal-kbd">Alt</span> + <span class="a11y-modal-kbd">N</span> to start.
                Download at <a href="https://www.nvaccess.org" target="_blank" rel="noopener noreferrer">nvaccess.org</a>
              </li>
              <li *ngIf="lang === 'fr'">
                <strong>NVDA (Windows, gratuit)&nbsp;:</strong>
                Appuyez sur <span class="a11y-modal-kbd">Ctrl</span> + <span class="a11y-modal-kbd">Alt</span> + <span class="a11y-modal-kbd">N</span> pour démarrer.
                Télécharger sur <a href="https://www.nvaccess.org" target="_blank" rel="noopener noreferrer">nvaccess.org</a>
              </li>
              <li *ngIf="lang !== 'fr'">
                <strong>VoiceOver (Mac):</strong>
                Press <span class="a11y-modal-kbd">⌘</span> + <span class="a11y-modal-kbd">F5</span>, or triple-press Touch ID / Power button.
              </li>
              <li *ngIf="lang === 'fr'">
                <strong>VoiceOver (Mac)&nbsp;:</strong>
                Appuyez sur <span class="a11y-modal-kbd">⌘</span> + <span class="a11y-modal-kbd">F5</span>, ou triple-cliquez sur Touch ID / bouton d'alimentation.
              </li>
              <li *ngIf="lang !== 'fr'">
                <strong>Narrator (Windows):</strong>
                Press <span class="a11y-modal-kbd">⊞ Win</span> + <span class="a11y-modal-kbd">Ctrl</span> + <span class="a11y-modal-kbd">Enter</span>.
              </li>
              <li *ngIf="lang === 'fr'">
                <strong>Narrateur (Windows)&nbsp;:</strong>
                Appuyez sur <span class="a11y-modal-kbd">⊞ Win</span> + <span class="a11y-modal-kbd">Ctrl</span> + <span class="a11y-modal-kbd">Entrée</span>.
              </li>
            </ul>
          </div>

          <!-- Tablet -->
          <div class="a11y-platform">
            <h3><i class="fas fa-tablet-alt" aria-hidden="true"></i>
              {{ lang === 'fr' ? 'Tablette' : 'Tablet' }}
            </h3>
            <ul>
              <li *ngIf="lang !== 'fr'">
                <strong>iPad (VoiceOver):</strong>
                Settings → Accessibility → VoiceOver → toggle ON.
                Or triple-click the Home / Side button (enable shortcut first in Accessibility settings).
              </li>
              <li *ngIf="lang === 'fr'">
                <strong>iPad (VoiceOver)&nbsp;:</strong>
                Réglages → Accessibilité → VoiceOver → activer.
                Ou triple-cliquez sur le bouton Accueil / latéral (activez d'abord le raccourci dans les réglages Accessibilité).
              </li>
              <li *ngIf="lang !== 'fr'">
                <strong>Android tablet (TalkBack):</strong>
                Settings → Accessibility → TalkBack → toggle ON.
                Or say <em>"Hey Google, turn on TalkBack"</em>.
              </li>
              <li *ngIf="lang === 'fr'">
                <strong>Tablette Android (TalkBack)&nbsp;:</strong>
                Paramètres → Accessibilité → TalkBack → activer.
                Ou dites <em>« Dis Google, active TalkBack »</em>.
              </li>
            </ul>
          </div>

          <!-- Mobile -->
          <div class="a11y-platform">
            <h3><i class="fas fa-mobile-alt" aria-hidden="true"></i>
              {{ lang === 'fr' ? 'Téléphone mobile' : 'Mobile Phone' }}
            </h3>
            <ul>
              <li *ngIf="lang !== 'fr'">
                <strong>iPhone (VoiceOver):</strong>
                Settings → Accessibility → VoiceOver → toggle ON.
                Or triple-click the Side / Home button.
              </li>
              <li *ngIf="lang === 'fr'">
                <strong>iPhone (VoiceOver)&nbsp;:</strong>
                Réglages → Accessibilité → VoiceOver → activer.
                Ou triple-cliquez sur le bouton latéral / Accueil.
              </li>
              <li *ngIf="lang !== 'fr'">
                <strong>Android (TalkBack):</strong>
                Settings → Accessibility → TalkBack → toggle ON.
                Or hold both volume keys for 3 seconds.
              </li>
              <li *ngIf="lang === 'fr'">
                <strong>Android (TalkBack)&nbsp;:</strong>
                Paramètres → Accessibilité → TalkBack → activer.
                Ou maintenez les deux touches de volume pendant 3 secondes.
              </li>
            </ul>
          </div>

          <p class="a11y-modal-tip">
            <i class="fas fa-lightbulb" aria-hidden="true"></i>
            <span *ngIf="lang !== 'fr'">
              <strong>Tip:</strong> Use <span class="a11y-modal-kbd">Tab</span> to move between elements,
              <span class="a11y-modal-kbd">Enter</span> to activate,
              <span class="a11y-modal-kbd">Arrow keys</span> to browse listings, and
              <span class="a11y-modal-kbd">Esc</span> to close this dialog.
            </span>
            <span *ngIf="lang === 'fr'">
              <strong>Astuce&nbsp;:</strong> Utilisez <span class="a11y-modal-kbd">Tab</span> pour naviguer,
              <span class="a11y-modal-kbd">Entrée</span> pour activer,
              les <span class="a11y-modal-kbd">touches fléchées</span> pour parcourir les annonces, et
              <span class="a11y-modal-kbd">Échap</span> pour fermer cette fenêtre.
            </span>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
      max-width: 100vw;
    }
    
    .main-content {
      min-height: calc(100vh - 80px - 200px); // Account for header and footer
      padding-top: 80px; // Account for fixed header
      width: 100%;
      overflow-x: hidden;
      max-width: 100%;
      box-sizing: border-box;
      
      @media (max-width: 767.98px) {
        padding-top: 110px; // Account for taller mobile header
      }
      
      @media (max-width: 374.98px) {
        padding-top: 115px; // Account for even taller tiny screen header
      }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'montreal4rent';
  showA11yModal = false;
  lang = 'fr';

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private languageService: LanguageService) {}

  @HostListener('window:openA11yModal')
  openA11yModal(): void {
    this.showA11yModal = true;
    setTimeout(() => {
      const closeBtn = document.querySelector<HTMLElement>('.a11y-modal-close');
      closeBtn?.focus();
    }, 50);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showA11yModal) this.closeA11yModal();
  }

  closeA11yModal(): void {
    this.showA11yModal = false;
  }

  ngOnInit() {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(l => this.lang = l);

    // Handle GitHub Pages SPA redirect
    const redirect = sessionStorage['redirect'];
    delete sessionStorage['redirect'];
    if (redirect && redirect !== location.href) {
      // Get base href from document
      const baseHref = document.getElementsByTagName('base')[0]?.href || location.origin + '/';
      const path = redirect.replace(baseHref, '');
      this.router.navigateByUrl('/' + path);
    }

    // On every navigation, focus the top menu bar so screen readers
    // start at the header consistently (instead of the browser URL).
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const focusContentAfterNav = sessionStorage['focusContentAfterNav'] === '1';
        delete sessionStorage['focusContentAfterNav'];
        setTimeout(() => {
          if (focusContentAfterNav) {
            const contentMain = document.querySelector('.main-content main[tabindex="-1"], .main-content main') as HTMLElement | null;
            (contentMain ?? document.getElementById('app-main-content'))?.focus();
            return;
          }

          document.getElementById('top-menu-bar')?.focus();
        }, 0);
      });

    // Initial focus on first load.
    setTimeout(() => {
      document.getElementById('top-menu-bar')?.focus();
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}