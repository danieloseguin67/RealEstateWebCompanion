import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { DataService, Area, Preferences } from '../../services/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="row">
            <!-- Company Info -->
            <div class="col col-12 col-md-4">
              <div class="footer-section">
                <div class="footer-logo">
                  <h3>Montreal4Rent</h3>
                </div>
                <div class="footer-description" *ngIf="currentLanguage === 'fr'">
                  <p>
                    <strong>Contactez un agent de location</strong><br>
                    Pour plus d'informations ou pour planifier une visite:<br>
                    📞 {{ phoneNumber }}<br>
                    📧 {{ email }}
                  </p>
                </div>
                <div class="footer-description" *ngIf="currentLanguage === 'en'">
                  <p>
                    <strong>Contact a Leasing Agent</strong><br>
                    For more information or to schedule a visit:<br>
                    📞 {{ phoneNumber }}<br>
                    📧 {{ email }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Areas Served -->
            <div class="col col-12 col-md-4">
              <div class="footer-section">
                <h4>{{ t.footer?.areas }}</h4>
                <ul class="areas-list">
                  <li *ngFor="let area of areas">
                    <a *ngIf="areaLinksEnabled" [href]="area.link" target="_blank" rel="noopener">
                      {{ currentLanguage === 'fr' ? area.nameFr : area.nameEn }}
                    </a>
                    <span *ngIf="!areaLinksEnabled">
                      {{ currentLanguage === 'fr' ? area.nameFr : area.nameEn }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="row align-items-center">
            <div class="col col-12 col-md-6">
              <p class="copyright">
                © {{ currentYear }} Montreal4Rent. {{ t.footer?.rights }}. | 
                {{ currentLanguage === 'fr' ? 'Site développé par' : 'Site developed by' }} 
                <a href="https://daniel.seguin.dev" target="_blank" rel="noopener" class="dev-link">SeguinDev</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  areas: Area[] = [];
  t: any = {};
  currentLanguage = 'fr';
  currentYear = new Date().getFullYear();
  areaLinksEnabled = false;
  phoneNumber = '';
  email = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private languageService: LanguageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.subscribeToLanguageChanges();
    this.loadAreas();
    this.loadPreferences();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToLanguageChanges(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => this.currentLanguage = lang);

    this.languageService.getCurrentTranslations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => this.t = translations);
  }

  private loadAreas(): void {
    this.dataService.getAreas()
      .pipe(takeUntil(this.destroy$))
      .subscribe(areas => this.areas = areas);
  }

  private loadPreferences(): void {
    this.dataService.getPreferences()
      .pipe(takeUntil(this.destroy$))
      .subscribe(preferences => {
        this.areaLinksEnabled = preferences.area_link === 'on';
        this.phoneNumber = preferences.phone_number || '';
        this.email = preferences.email || '';
      });
  }
}