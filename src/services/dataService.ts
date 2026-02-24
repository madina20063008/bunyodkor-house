// src/services/dataService.ts
import API from "./api";
import type { Property, ReadyHome } from "./data.types";
import type { Commonhouse } from "./data.types";
import type { ProjectStats } from "./data.types";
import type { InProgress } from "./data.types";
import type { Homepage } from "./data.types";
import type { Review } from "./data.types";
import type { ContactInfo } from "./data.types";
import type { About } from "./data.types";
import type { Media } from "./data.types";
import type { Waitlist } from "./data.types";
import type { Banner } from "./data.types";

export const getAllHomes = async (): Promise<ReadyHome[]> => {
  try {
    console.log("🔄 Making API call to /home/all/");
    const res = await API.get("/home/all/");
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const getAllCommonhouse = async (): Promise<Commonhouse[]> => {
  try {
    console.log('🔄 Making API call to /home/commonhouse/');
    const res = await API.get("/home/commonhouse/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ Number of homes received:', res.data.length);
    console.log("✅ API Response status:", res.status);
    console.log("✅ Number of homes received:", res.data.length);
    return res.data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};

export const getCommonHouse = async (): Promise<ReadyHome[]> => {
  try {
    const res = await API.get("/home/commonhouse/");
    console.log(res?.data);

    return res.data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};

export const getAdvertisementBanner = async (): Promise<ReadyHome[]> => {
  try {
    const res = await API.get("/utils/advertisementbanner/");
    console.log(res?.data);

    return res.data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};

export const getHomeDetail = async (id: number): Promise<ReadyHome> => {
  try {
    console.log(`🔄 Making API call to /home/detail/${id}/`);
    const res = await API.get(`/home/detail/${id}/`);
    console.log("✅ Home detail response status:", res.status);
    console.log("✅ Home detail received:", res.data);
    return res.data;
  } catch (error) {
    console.error(`❌ Home detail API Error for ID ${id}:`, error);
    throw error;
  }
};

export const searchHomes = async (searchParams: any): Promise<ReadyHome[]> => {
  try {
    console.log("🔍 Making search request with params:", searchParams);
    const res = await API.post("/utils/home/search/", searchParams);
    console.log('✅ Search response status:', res.status);
    console.log('✅ Number of search results:', res.data.length);
  return res.data;
  } catch (error) {
    console.error('❌ Search API Error:', error);
    throw error;
  }
};

export const getCommonhouseAbout = async (): Promise<ProjectStats[]> => {
  try {
    console.log('🔄 Making API call to /home/commonhouse/about/');
    const res = await API.get("/home/commonhouse/about/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    console.log("✅ Search response status:", res.status);
    console.log("✅ Number of search results:", res.data.length);
    return res.data;
  } catch (error) {
    console.error("❌ Search API Error:", error);
    throw error;
  }
};

export const getInProgress = async (): Promise<InProgress[]> => {
  try {
    console.log('🔄 Making API call to /home/inprogress/');
    const res = await API.get("/home/inprogress/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const getHomepage = async (): Promise<Homepage[]> => {
  try {
    console.log('🔄 Making API call to /utils/homepage/');
    const res = await API.get("/utils/homepage/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const getReviews = async (): Promise<Review[]> => {
  try {
    console.log('🔄 Making API call to /utils/reviews/');
    const res = await API.get("/utils/reviews/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};
export const getContact = async (): Promise<ContactInfo[]> => {
  try {
    console.log('🔄 Making API call to /utils/contacts/');
    const res = await API.get("/utils/contacts/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const getAbout = async (): Promise<About[]> => {
  try {
    console.log('🔄 Making API call to /utils/aboutcompany/');
    const res = await API.get("/utils/aboutcompany/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const getSocialMedia = async (): Promise<Media[]> => {
  try {
    console.log('🔄 Making API call to /utils/social-media/');
    const res = await API.get("/utils/social-media/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const addToWaitlist = async (waitlistData: Waitlist): Promise<Waitlist> => {
  try {
    console.log('🔄 Making API call to /utils/waitlist/');
    const res = await API.post("/utils/waitlist/", waitlistData);
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const getBanners = async (): Promise<Banner[]> => {
  try {
    console.log('🔄 Making API call to /utils/advertisementbanner/');
    const res = await API.get("/utils/advertisementbanner/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const getBasementProperties = async (): Promise<Property[]> => {
  try {
    console.log('🔄 Making API call to /home/basement/');
    const res = await API.get("/home/basement/");
    console.log('✅ API Response status:', res.status);
    console.log('✅ Number of basement properties received:', res.data.length);
    console.log('✅ API Response data:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};