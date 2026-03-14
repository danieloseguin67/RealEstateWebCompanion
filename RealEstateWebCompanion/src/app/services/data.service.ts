import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apartment, Area, UnitType, Toggle } from '../models/data.models';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apartmentsSubject = new BehaviorSubject<Apartment[]>([]);
  private areasSubject = new BehaviorSubject<Area[]>([]);
  private unitTypesSubject = new BehaviorSubject<UnitType[]>([]);
  private togglesSubject = new BehaviorSubject<Toggle[]>([]);

  apartments$ = this.apartmentsSubject.asObservable();
  areas$ = this.areasSubject.asObservable();
  unitTypes$ = this.unitTypesSubject.asObservable();
  toggles$ = this.togglesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadApartments();
    this.loadAreas();
    this.loadUnitTypes();
    this.loadToggles();
  }

  loadApartments(): void {
    const stored = this.storageService.getItem<Apartment[]>('apartments');
    if (stored) {
      this.apartmentsSubject.next(stored);
    } else {
      this.apiService.getApartments().subscribe(data => {
        this.apartmentsSubject.next(data);
        this.storageService.setItem('apartments', data);
      });
    }
  }

  loadAreas(): void {
    const stored = this.storageService.getItem<Area[]>('areas');
    if (stored) {
      this.areasSubject.next(stored);
    } else {
      this.apiService.getAreas().subscribe(data => {
        this.areasSubject.next(data);
        this.storageService.setItem('areas', data);
      });
    }
  }

  loadUnitTypes(): void {
    const stored = this.storageService.getItem<UnitType[]>('unitTypes');
    if (stored) {
      this.unitTypesSubject.next(stored);
    } else {
      this.apiService.getUnitTypes().subscribe(data => {
        this.unitTypesSubject.next(data);
        this.storageService.setItem('unitTypes', data);
      });
    }
  }

  loadToggles(): void {
    const stored = this.storageService.getItem<Toggle[]>('toggles');
    if (stored) {
      this.togglesSubject.next(stored);
    } else {
      this.apiService.getFeatures().subscribe(data => {
        this.togglesSubject.next(data);
        this.storageService.setItem('toggles', data);
      });
    }
  }

  updateApartments(apartments: Apartment[]): void {
    this.apartmentsSubject.next(apartments);
    this.storageService.setItem('apartments', apartments);
  }

  updateAreas(areas: Area[]): void {
    this.areasSubject.next(areas);
    this.storageService.setItem('areas', areas);
  }

  updateUnitTypes(unitTypes: UnitType[]): void {
    this.unitTypesSubject.next(unitTypes);
    this.storageService.setItem('unitTypes', unitTypes);
  }

  updateToggles(toggles: Toggle[]): void {
    this.togglesSubject.next(toggles);
    this.storageService.setItem('toggles', toggles);
  }

  getAllData(): { apartments: Apartment[], areas: Area[], unitTypes: UnitType[], toggles: Toggle[] } {
    return {
      apartments: this.apartmentsSubject.value,
      areas: this.areasSubject.value,
      unitTypes: this.unitTypesSubject.value,
      toggles: this.togglesSubject.value
    };
  }

  importData(data: any): void {
    if (data.apartments) {
      this.updateApartments(data.apartments);
    }
    if (data.areas) {
      this.updateAreas(data.areas);
    }
    if (data.unitTypes) {
      this.updateUnitTypes(data.unitTypes);
    }
    if (data.toggles) {
      this.updateToggles(data.toggles);
    }
  }

  resetApartmentsToDefault(): void {
    this.storageService.removeItem('apartments');
    this.apiService.getApartments().subscribe(data => {
      this.apartmentsSubject.next(data);
      this.storageService.setItem('apartments', data);
    });
  }
}
