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
  features: string[];
  featuresEn: string[];
  images: string[];
  toggle_names: string[];
}

export interface Area {
  id: number;
  nameFr: string;
  nameEn: string;
  descriptionEn: string;
  link: string;
}

export interface UnitType {
  unit_type_name: string;
}

export interface Toggle {
  toggle_name: string;
  toggle_image: string;
}
