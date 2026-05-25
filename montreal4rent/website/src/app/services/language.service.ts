import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export type Language = 'fr' | 'en';

export interface TranslationContent {
  fr: any;
  en: any;
}

export interface TranslationData {
  content: TranslationContent;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('fr'); // French as default
  private translationsSubject = new BehaviorSubject<any>({});
  
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  public translations$ = this.translationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTranslations();
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('montreal4rent-language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  private loadTranslations(): void {
    this.http.get<TranslationData>('assets/data/translations.json').subscribe({
      next: (data) => {
        this.translationsSubject.next(data.content);
        this.updateDocumentLanguage(this.currentLanguageSubject.value);
      },
      error: (error) => console.error('Error loading translations:', error)
    });
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('montreal4rent-language', language);
    this.updateDocumentLanguage(language);
  }

  private updateDocumentLanguage(language: Language): void {
    document.documentElement.lang = language;
  }

  getTranslation(key: string): Observable<string> {
    return this.translations$.pipe(
      map(translations => {
        const currentLang = this.currentLanguageSubject.value;
        const keys = key.split('.');
        let translation = translations[currentLang];
        
        for (const k of keys) {
          if (translation && translation[k] !== undefined) {
            translation = translation[k];
          } else {
            return key; // Return key if translation not found
          }
        }
        
        return translation;
      })
    );
  }

  getTranslationSync(key: string): string {
    const translations = this.translationsSubject.value;
    const currentLang = this.currentLanguageSubject.value;
    const keys = key.split('.');
    let translation = translations[currentLang];
    
    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return translation;
  }

  getCurrentTranslations(): Observable<any> {
    return combineLatest([this.currentLanguage$, this.translations$]).pipe(
      map(([lang, translations]) => translations[lang] || {})
    );
  }
}