import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apartment, UnitType, Toggle, SeoPage, Area, ApartmentImage } from '../models/data.models';

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

export interface SupportRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private readonly localFallbackApiBases = ['http://localhost:5079/api', 'http://localhost:6003/api'];

  constructor(private http: HttpClient) {}

  getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.baseUrl}/apartments`).pipe(
      catchError(() => this.http.get<Apartment[]>('assets/data/apartments.json'))
    );
  }

  getUnitTypes(): Observable<UnitType[]> {
    const normalize = (unitTypes: any[]): UnitType[] =>
      unitTypes.map(u => ({
        id: u.id ?? u.Id ?? 0,
        unitTypeNameEn:
          u.unitTypeNameEn ??
          u.unit_type_name_en ??
          u.UnitTypeNameEn ??
          u.unit_type_name ??
          u.unitTypeName ??
          u.UnitTypeName ??
          '',
        unitTypeNameFr: u.unitTypeNameFr ?? u.unit_type_name_fr ?? u.UnitTypeNameFr ?? '',
      }));

    // Support both API route conventions used across environments.
    return this.http.get<any[]>(`${this.baseUrl}/unittypes`).pipe(
      map(normalize),
      catchError(() => this.http.get<any[]>(`${this.baseUrl}/unitype`).pipe(
        map(normalize),
        catchError(() => this.http.get<any[]>('assets/data/unitTypes.json').pipe(map(normalize)))
      ))
    );
  }

  createUnitType(unitType: UnitType): Observable<UnitType> {
    return this.http.post<UnitType>(`${this.baseUrl}/unittypes`, unitType);
  }

  updateUnitType(id: number, unitType: UnitType): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/unittypes/${id}`, unitType);
  }

  deleteUnitType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/unittypes/${id}`);
  }

  getFeatures(): Observable<Toggle[]> {
    // Normalize the response to handle both snake_case (new API with [JsonPropertyName])
    // and camelCase (older builds without explicit naming attributes).
    const normalize = (features: any[]): Toggle[] =>
      features.map(f => ({
        id:           f.id           ?? f.Id           ?? 0,
        toggle_name:  f.toggle_name  ?? f.toggleName   ?? f.ToggleName  ?? '',
        french_name:  f.french_name  ?? f.frenchName   ?? f.FrenchName  ?? '',
        english_name: f.english_name ?? f.englishName  ?? f.EnglishName ?? '',
        toggle_image: f.toggle_image ?? f.toggleImage  ?? f.ToggleImage ?? '',
      }));

    return this.http.get<any[]>(`${this.baseUrl}/features`).pipe(
      map(normalize),
      catchError(() => this.http.get<any[]>('assets/data/toggles.json').pipe(map(normalize)))
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

  sendSupportEmail(request: SupportRequest): Observable<void> {
    const primary = `${this.baseUrl}/support/email`;
    const fallbackEndpoints = this.localFallbackApiBases
      .map(base => `${base}/support/email`)
      .filter(endpoint => endpoint !== primary);

    return this.postSupportEmailWithFallback([primary, ...fallbackEndpoints], request);
  }

  private postSupportEmailWithFallback(endpoints: string[], request: SupportRequest): Observable<void> {
    const [current, ...rest] = endpoints;

    return this.http.post<void>(current, request).pipe(
      catchError(err => {
        if (rest.length === 0) {
          throw err;
        }

        // Retry alternate local API endpoints on connection/CORS/not found failures.
        if (err?.status === 0 || err?.status === 404 || err?.status === 405) {
          return this.postSupportEmailWithFallback(rest, request);
        }

        throw err;
      })
    );
  }

  getSeoPages(): Observable<SeoPage[]> {
    return this.http.get<SeoPage[]>(`${this.baseUrl}/seo`).pipe(
      catchError(() => this.http.get<SeoPage[]>('assets/data/seo.json'))
    );
  }

  discoverPages(url: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/seo/discover`, { params: { url } });
  }

  createSeoPage(page: SeoPage): Observable<SeoPage> {
    return this.http.post<SeoPage>(`${this.baseUrl}/seo`, page);
  }

  updateSeoPage(id: string, page: SeoPage): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/seo/${id}`, page);
  }

  deleteSeoPage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/seo/${id}`);
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseUrl}/areas`);
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${this.baseUrl}/areas`, area);
  }

  updateArea(areaId: number, area: Area): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/areas/${areaId}`, area);
  }

  deleteArea(areaId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/areas/${areaId}`);
  }

  getFeatureById(id: number): Observable<Toggle> {
    return this.http.get<any>(`${this.baseUrl}/features/${id}`).pipe(
      map(f => ({
        id:           f.id           ?? 0,
        toggle_name:  f.toggle_name  ?? f.toggleName  ?? '',
        french_name:  f.french_name  ?? f.frenchName  ?? '',
        english_name: f.english_name ?? f.englishName ?? '',
        toggle_image: f.toggle_image ?? f.toggleImage ?? '',
      }))
    );
  }

  createFeature(toggle: Toggle): Observable<Toggle> {
    return this.http.post<any>(`${this.baseUrl}/features`, toggle).pipe(
      map(f => ({
        id:           f.id           ?? 0,
        toggle_name:  f.toggle_name  ?? '',
        french_name:  f.french_name  ?? '',
        english_name: f.english_name ?? '',
        toggle_image: f.toggle_image ?? '',
      }))
    );
  }

  updateFeature(id: number, toggle: Toggle): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/features/${id}`, toggle);
  }

  deleteFeature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/features/${id}`);
  }

  getApartmentById(apartmentId: string): Observable<Apartment> {
    return this.http.get<Apartment>(`${this.baseUrl}/apartments/${apartmentId}`);
  }

  createApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(`${this.baseUrl}/apartments`, this.toApartmentApiPayload(apartment));
  }

  updateApartment(id: string, apartment: Apartment): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/apartments/${id}`, this.toApartmentApiPayload(apartment));
  }

  deleteApartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/apartments/${id}`);
  }

  getApartmentImages(apartmentId: string): Observable<ApartmentImage[]> {
    return this.http.get<ApartmentImage[]>(`${this.baseUrl}/ApartmentImages/apartment/${apartmentId}`);
  }

  createApartmentImage(image: Partial<ApartmentImage>): Observable<ApartmentImage> {
    return this.http.post<ApartmentImage>(`${this.baseUrl}/ApartmentImages`, image);
  }

  uploadApartmentImageFiles(apartmentId: string, files: FileList | File[]): Observable<ApartmentImage[]> {
    const formData = new FormData();
    const fileArray = files instanceof FileList ? Array.from(files) : files;
    fileArray.forEach(f => formData.append('files', f, f.name));
    return this.http.post<ApartmentImage[]>(`${this.baseUrl}/ApartmentImages/upload/${apartmentId}`, formData);
  }

  updateApartmentImage(imageId: number, image: Partial<ApartmentImage>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/ApartmentImages/${imageId}`, image);
  }

  deleteApartmentImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ApartmentImages/${imageId}`);
  }

  /**
   * Compatibility payload: supports both snake_case and camelCase API contracts.
   * This prevents silent data loss when frontend and backend are on different versions.
   */
  private toApartmentApiPayload(apartment: Apartment): Record<string, unknown> {
    const featureIds = apartment.feature_ids ?? [];
    const images = apartment.images ?? [];

    return {
      ...apartment,
      // New API contract
      unit_type_name: apartment.unit_type_name,
      feature_ids: featureIds,
      images,
      // Backward-compatible aliases
      unitTypeName: apartment.unit_type_name,
      featureIds,
    };
  }
}
