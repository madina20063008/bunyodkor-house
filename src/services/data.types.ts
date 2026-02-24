export interface Image {
  id: number;
  image: string;
}

export interface ReadyHome {
  id: number;
  buildingBlock: string;
  qualities: string;
  qualities_uz: string;
  qualities_en: string;
  qualities_ru: string;
  qualities_zh_hans: string;
  qualities_ar: string;
  home_number: string;
  entrance: number;
  totalprice: number;
  totalarea: string;
  status: string;
  status_uz: string;
  status_en: string;
  status_ru: string;
  status_zh_hans: string;
  status_ar: string;
  title: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  title_zh_hans: string;
  title_ar: string;
  name: string;
  name_uz: string;
  name_en: string;
  name_ru: string;
  name_zh_hans: string;
  name_ar: string;
  price: string;
  pricePerSqm: string;
  area: string;
  rooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: string;
  description: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  description_zh_hans: string;
  description_ar: string;
  type: string;
  type_uz: string;
  type_en: string;
  type_ru: string;
  type_zh_hans: string;
  type_ar: string;
  region: string;
  region_uz: string;
  region_en: string;
  region_ru: string;
  region_zh_hans: string;
  region_ar: string;
  images: Image[];
  floorplan: Image[];
  masterplan: Image[];
  interiorphotos: Image[];
  interior_photos: Image[];
}

export interface CommonImage {
  id: number;
  image: string;
}

export interface Commonhouse {
  id: number;
  title: string;
  title_en?: string;
  title_uz?: string;
  title_ru?: string;
  title_zh_hans?: string;
  title_ar?: string;
  description: string;
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_zh_hans?: string;
  description_ar?: string;
  handover: string;
  country: string;
  region: string;
  district: string;
  street: string;
  house: string;
  latitude: number;
  longitude: number;
  commonadvimage: CommonImage[];
  commonmainimage: CommonImage[];
}

export interface LocalizedText {
  uz?: string;
  en?: string;
  ru?: string;
  zh_hans?: string;
  ar?: string;
}

export interface LocalizedNumber {
  uz?: number;
  en?: number;
  ru?: number;
  zh_hans?: number;
  ar?: number;
}

export interface ProjectStats {
  id: number;
  commonhouse: number;
  description: string;
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
  description_zh_hans?: string;
  description_ar?: string;
  blocks: number;
  apartments: number;
  apartments_uz?: number;
  apartments_en?: number;
  apartments_ru?: number;
  apartments_zh_hans?: number;
  apartments_ar?: number;
  phases: number;
  projectarea: string;
  images: CommonImage[];
}

export interface InProgress {
  id: number;
  title: string;
  title_en: string;
  title_uz: string;
  title_ru: string;
  title_zh_hans: string;
  title_ar: string;
  description: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  description_zh_hans: string;
  description_ar: string;
  address: string;
  progress: string;
  stage: string;
  stage_en: string;
  stage_uz: string;
  stage_ru: string;
  stage_zh_hans: string;
  stage_ar: string;
  overdate: string; // ISO date string
  latitude: number;
  longitude: number;
  images: Image[];
}

export interface Homepage {
  id: number;
  title: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  title_zh_hans: string;
  title_ar: string;
  description: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  description_zh_hans: string;
  description_ar: string;
  images: Image[];
}

export interface Review {
  id: number;
  rating: number;
  text: string;
  text_uz: string;
  text_en: string;
  text_ru: string;
  text_zh_hans: string;
  text_ar: string;
  full_name: string;
  address: string;
  image: string;
}

export interface ContactInfo {
  id: number;
  full_address: string;
  longitude: string;
  latitude: number;
  phone_number: number;
  email: string;
  work_time: string;
}

export interface About {
  id: number;
  description: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  description_zh_hans: string;
  description_ar: string;
  experience: string;
  ourobjects: string;
  guarantee: string;
}

export interface Media {
  id: number;
  name: string;
  image: string;
  link: string;
}

export interface Waitlist {
  full_name: string;
  email: string; 
  phone_number: number; 
  theme: string;
  message: string;
}

export interface Banner {
  id: number;
  title: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  title_zh_hans: string;
  title_ar: string;
  description: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  description_zh_hans: string;
  description_ar: string;
  images: Image[];
}

export interface Property {
  id: number;
  home: number;
  area: string; // Very large decimal number as string
  price: string; // Very large decimal number as string  
  pricePerSqm: string; // Very large decimal number as string
  images: Image[];
}