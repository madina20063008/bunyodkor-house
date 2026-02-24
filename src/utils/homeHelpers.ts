import type { ReadyHome } from "../services/data.types";
import No_img from "../assets/no-image-svg.svg";
// Image cache
const imageCache = new Map<string, string>();

export const getHomeImage = (home: ReadyHome): string => {
  if (!home) return No_img;

  const cacheKey = `image-${home.id}`;

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  const imageUrl = home.images?.[0]?.image;

  if (imageUrl && isValidImageUrl(imageUrl)) {
    imageCache.set(cacheKey, imageUrl);
    return imageUrl;
  }

  return No_img;
};

const isValidImageUrl = (url: string): boolean => {
  return (
    !url.includes("placeholder") &&
    (url.startsWith("http") || url.startsWith("/"))
  );
};

export const getHomeName = (home: ReadyHome, lang: string): string => {
  if (!home) return "";

  const nameMap: Record<string, string> = {
    ru: home.name_ru || home.name,
    uz: home.name_uz || home.name,
    ar: home.name_ar || home.name,
    zh: home.name_zh_hans || home.name,
  };

  return nameMap[lang] || home.name;
};

export const getHomeDescription = (home: ReadyHome, lang: string): string => {
  if (!home) return "";

  const descMap: Record<string, string> = {
    ru: home.description_ru || home.description,
    uz: home.description_uz || home.description,
    ar: home.description_ar || home.description,
    zh: home.description_zh_hans || home.description,
  };

  return descMap[lang] || home.description;
};

export const getHomeRegion = (home: ReadyHome, lang: string): string => {
  if (!home) return "";

  const regionMap: Record<string, string> = {
    ru: home.region_ru || home.region,
    uz: home.region_uz || home.region,
    ar: home.region_ar || home.region,
    zh: home.region_zh_hans || home.region,
  };

  return regionMap[lang] || home.region;
};

export const getFloorPlanImage = (home: ReadyHome): string => {
  return home.floorplan && home.floorplan.length > 0
    ? home.floorplan[0].image
    : "";
};

export const getMasterPlanImage = (home: ReadyHome): string => {
  return home.masterplan && home.masterplan.length > 0
    ? home.masterplan[0].image
    : "";
};

export const getInteriorPhotos = (home: ReadyHome): string[] => {
  return home.interiorphotos && home.interiorphotos.length > 0
    ? home.interiorphotos.map((photo) => photo.image)
    : [];
};

export const getYearFromDate = (dateString: string | null): number | null => {
  if (!dateString) return null;
  try {
    return new Date(dateString).getFullYear();
  } catch {
    return null;
  }
};

export const getYearBuilt = (yearBuilt: string): number => {
  return yearBuilt
    ? new Date(yearBuilt).getFullYear()
    : new Date().getFullYear();
};
