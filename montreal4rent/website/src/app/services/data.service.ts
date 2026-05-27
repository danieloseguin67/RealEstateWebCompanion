import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Apartment {
  id: string;
  title: string;
  titleEn: string;
  type?: string;
  bedrooms?: number;
  unit_type_name?: string;
  bathrooms: number;
  squareFootage: number;
  price: number;
  area: string;
  furnished: boolean;
  roomtorent?: boolean;
  condorentals?: boolean;
  available: boolean;
  features: string[];
  featuresEn: string[];
  images: string[];
  description: string;
  descriptionEn: string;
}

export interface Area {
  id: string;
  name: string;
  nameFr: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  link?: string;
}

export interface ApartmentData {
  apartments: Apartment[];
}

export interface AreaData {
  areas: Area[];
}

export interface ToggleOption {
  toggle_name: string;
  toggle_image: string;
}

export interface UnitType {
  unit_type_name: string;
  rooms?: number;
}

export interface Preferences {
  area_link: string;
  phone_number: string;
  email: string;
}

interface ApartmentApiDto {
  id: string;
  title: string;
  titleEn: string;
  unit_type_name: string;
  bathrooms: number;
  squareFootage: number;
  price: number;
  area: string;
  furnished: boolean;
  roomtorent: boolean;
  condorentals: boolean;
  available: boolean;
  description: string;
  descriptionEn: string;
  feature_ids: number[];
  images: string[];
}

interface AreaApiDto {
  id: number;
  name: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  link: string;
}

interface FeatureApiDto {
  id: number;
  toggle_image: string;
  french_name: string;
  english_name: string;
}

interface UnitTypeApiDto {
  id: number;
  unitTypeNameEn: string;
  unitTypeNameFr: string;
}

interface PreferencesApiDto {
  area_link: string;
  phone_number: string;
  email: string;
  googledrive: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiBaseUrl = '/api';
  private apartmentsSubject = new BehaviorSubject<Apartment[]>([]);
  private areasSubject = new BehaviorSubject<Area[]>([]);
  
  public apartments$ = this.apartmentsSubject.asObservable();
  public areas$ = this.areasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
      apartments: this.http.get<ApartmentApiDto[]>(`${this.apiBaseUrl}/apartments`),
      areas: this.http.get<AreaApiDto[]>(`${this.apiBaseUrl}/areas`),
      features: this.http.get<FeatureApiDto[]>(`${this.apiBaseUrl}/features`)
    }).pipe(
      map(({ apartments, areas, features }) => ({
        apartments: apartments.map(apartment => this.mapApartmentFromApi(apartment, features)),
        areas: areas.map(area => this.mapAreaFromApi(area))
      }))
    ).subscribe({
      next: (data) => {
        this.apartmentsSubject.next(data.apartments);
        this.areasSubject.next(data.areas);
      },
      error: (error) => console.error('Error loading API data:', error)
    });
  }

  getApartments(): Observable<Apartment[]> {
    return this.apartments$;
  }

  getApartment(id: string): Observable<Apartment | undefined> {
    return this.apartments$.pipe(
      map(apartments => apartments.find(apt => apt.id === id))
    );
  }

  getAreas(): Observable<Area[]> {
    return this.areas$;
  }

  getArea(id: string): Observable<Area | undefined> {
    return this.areas$.pipe(
      map(areas => areas.find(area => area.id === id))
    );
  }

  getApartmentsByArea(areaId: string): Observable<Apartment[]> {
    return this.apartments$.pipe(
      map(apartments => apartments.filter(apt => apt.area === areaId))
    );
  }

  getFeaturedApartments(limit: number = 6): Observable<Apartment[]> {
    return this.apartments$.pipe(
      map(apartments => apartments.filter(apt => apt.available).slice(0, limit))
    );
  }

  searchApartments(filters: {
    area?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    furnished?: boolean;
  }): Observable<Apartment[]> {
    return this.apartments$.pipe(
      map(apartments => {
        return apartments.filter(apt => {
          if (filters.area && apt.area !== filters.area) return false;
          if (filters.minPrice && apt.price < filters.minPrice) return false;
          if (filters.maxPrice && apt.price > filters.maxPrice) return false;
          if (filters.bedrooms !== undefined && apt.bedrooms !== filters.bedrooms) return false;
          if (filters.furnished !== undefined && apt.furnished !== filters.furnished) return false;
          return true;
        });
      })
    );
  }

  sortApartments(apartments: Apartment[], sortBy: 'price-asc' | 'price-desc'): Apartment[] {
    return [...apartments].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  getToggles(): Observable<ToggleOption[]> {
    return this.http.get<FeatureApiDto[]>(`${this.apiBaseUrl}/features`).pipe(
      map(features => features.map(feature => this.mapToggleFromApi(feature)))
    );
  }

  getUnitTypes(): Observable<UnitType[]> {
    return this.http.get<UnitTypeApiDto[]>(`${this.apiBaseUrl}/unittypes`).pipe(
      map(unitTypes => unitTypes.map(unitType => this.mapUnitTypeFromApi(unitType)))
    );
  }

  getPreferences(): Observable<Preferences> {
    return this.http.get<PreferencesApiDto>(`${this.apiBaseUrl}/preferences`).pipe(
      map(preferences => this.mapPreferencesFromApi(preferences))
    );
  }

  private mapApartmentFromApi(apartment: ApartmentApiDto, features: FeatureApiDto[]): Apartment {
    const resolvedFeatures = apartment.feature_ids
      .map(featureId => features.find(feature => feature.id === featureId))
      .filter((feature): feature is FeatureApiDto => Boolean(feature));

    return {
      id: apartment.id,
      title: apartment.title,
      titleEn: apartment.titleEn,
      unit_type_name: apartment.unit_type_name,
      bathrooms: apartment.bathrooms,
      squareFootage: apartment.squareFootage,
      price: apartment.price,
      area: apartment.area,
      furnished: apartment.furnished,
      roomtorent: apartment.roomtorent,
      condorentals: apartment.condorentals,
      available: apartment.available,
      features: resolvedFeatures.map(feature => feature.french_name),
      featuresEn: resolvedFeatures.map(feature => feature.english_name),
      images: apartment.images,
      description: apartment.description,
      descriptionEn: apartment.descriptionEn,
    };
  }

  private mapAreaFromApi(area: AreaApiDto): Area {
    return {
      id: String(area.id),
      name: area.name,
      nameFr: area.nameFr,
      nameEn: area.nameEn,
      description: area.descriptionFr,
      descriptionEn: area.descriptionEn,
      link: area.link,
    };
  }

  private mapToggleFromApi(feature: FeatureApiDto): ToggleOption {
    return {
      toggle_name: feature.english_name,
      toggle_image: feature.toggle_image,
    };
  }

  private mapUnitTypeFromApi(unitType: UnitTypeApiDto): UnitType {
    const unitTypeName = unitType.unitTypeNameEn;

    return {
      unit_type_name: unitTypeName,
      rooms: this.inferRoomsFromUnitType(unitTypeName),
    };
  }

  private mapPreferencesFromApi(preferences: PreferencesApiDto): Preferences {
    return {
      area_link: preferences.area_link,
      phone_number: preferences.phone_number,
      email: preferences.email,
    };
  }

  private inferRoomsFromUnitType(unitTypeName: string): number {
    const normalizedName = unitTypeName.toLowerCase();

    if (normalizedName.includes('studio')) {
      return 1;
    }

    const match = normalizedName.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  }
}