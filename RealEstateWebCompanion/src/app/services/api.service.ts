import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apartment, UnitType, Toggle, SeoPage, Area, ApartmentFeature, ApartmentImage } from '../models/data.models';

export interface AppVersion {
  version: string;
  appName: string;
  author: string;
  company: string;
  copyright: string;
  'update date'?: string;
}

export interface Customer {
  customerId: string;
  customerName: string;
  customerEmail: string;
  userId: string;
  password: string;
}

export interface Preferences {
  googledrive: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.baseUrl}/apartments`).pipe(
      catchError(() => this.http.get<Apartment[]>('assets/data/apartments.json'))
    );
  }

  getUnitTypes(): Observable<UnitType[]> {
    return this.http.get<UnitType[]>(`${this.baseUrl}/unittypes`).pipe(
      catchError(() => this.http.get<UnitType[]>('assets/data/unitTypes.json'))
    );
  }

  getFeatures(): Observable<Toggle[]> {
    return this.http.get<Toggle[]>(`${this.baseUrl}/features`).pipe(
      catchError(() => this.http.get<Toggle[]>('assets/data/toggles.json'))
    );
  }

  getAppVersion(): Observable<AppVersion> {
    return this.http.get<AppVersion>(`${this.baseUrl}/appversion`).pipe(
      catchError(() => this.http.get<AppVersion>('assets/data/appversion.json'))
    );
  }

  getCustomers(): Observable<{ customers: Customer[] }> {
    return this.http.get<{ customers: Customer[] }>(`${this.baseUrl}/customer`).pipe(
      catchError(() => this.http.get<{ customers: Customer[] }>('assets/data/customer.json'))
    );
  }

  getPreferences(): Observable<Preferences> {
    return this.http.get<Preferences>(`${this.baseUrl}/preferences`).pipe(
      catchError(() => this.http.get<Preferences>('assets/data/preferences.json'))
    );
  }

  getSeoPages(): Observable<SeoPage[]> {
    return this.http.get<SeoPage[]>(`${this.baseUrl}/seo`).pipe(
      catchError(() => this.http.get<SeoPage[]>('assets/data/seo.json'))
    );
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseUrl}/areas`);
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${this.baseUrl}/areas`, area);
  }

  updateArea(areaId: string, area: Area): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/areas/${areaId}`, area);
  }

  deleteArea(areaId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/areas/${areaId}`);
  }

  getApartmentById(apartmentId: string): Observable<Apartment> {
    return this.http.get<Apartment>(`${this.baseUrl}/apartments/${apartmentId}`);
  }

  createApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(`${this.baseUrl}/apartments`, apartment);
  }

  getApartmentFeatures(apartmentId: string): Observable<ApartmentFeature[]> {
    return this.http.get<ApartmentFeature[]>(`${this.baseUrl}/ApartmentFeatures/apartment/${apartmentId}`);
  }

  createApartmentFeature(feature: Partial<ApartmentFeature>): Observable<ApartmentFeature> {
    return this.http.post<ApartmentFeature>(`${this.baseUrl}/ApartmentFeatures`, feature);
  }

  updateApartmentFeature(featureId: number, feature: Partial<ApartmentFeature>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/ApartmentFeatures/${featureId}`, feature);
  }

  deleteApartmentFeature(featureId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ApartmentFeatures/${featureId}`);
  }

  getApartmentImages(apartmentId: string): Observable<ApartmentImage[]> {
    return this.http.get<ApartmentImage[]>(`${this.baseUrl}/ApartmentImages/apartment/${apartmentId}`);
  }

  createApartmentImage(image: Partial<ApartmentImage>): Observable<ApartmentImage> {
    return this.http.post<ApartmentImage>(`${this.baseUrl}/ApartmentImages`, image);
  }

  updateApartmentImage(imageId: number, image: Partial<ApartmentImage>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/ApartmentImages/${imageId}`, image);
  }

  deleteApartmentImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ApartmentImages/${imageId}`);
  }
}
