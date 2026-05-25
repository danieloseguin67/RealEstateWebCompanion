export interface Apartment {
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

export interface Area {
  id: string;
  name: string;
  nameFr: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  link: string;
}

export interface UnitType {
  unit_type_name: string;
}

export interface Toggle {
  id: number;
  toggle_name: string;
  french_name: string;
  english_name: string;
  toggle_image: string;
}

export interface SeoPage {
  id: string;
  pageName: string;
  pageUrl: string;
  title: string;
  metaName: string;
  metaDescription: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface ApartmentImage {
  id: number;
  apartmentId: string;
  fileName: string;
}
