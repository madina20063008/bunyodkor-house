

import { useParams, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Home,
  Building2,
  Calendar,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageGallery } from "./ImageGallery";
import { getHomeDetail, getBasementProperties } from "../services/dataService";
import type { ReadyHome, Property } from "../services/data.types";
import {
  getHomeImage,
  getHomeName,
  getHomeDescription,
  getHomeRegion,
  getFloorPlanImage,
  getMasterPlanImage,
  getInteriorPhotos,
  getYearBuilt,
} from "../utils/homeHelpers";

interface HomeDetailsPageProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

const translations = {
  en: {
    details: "Property Details",
    overview: "Overview",
    floorPlan: "Floor Plan",
    masterPlan: "Master Plan",
    gallery: "Gallery",
    area: "Area",
    rooms: "Rooms",
    floor: "Floor",
    yearBuilt: "Year Built",
    pricePerSqm: "Price per m²",
    totalPrice: "Total Price",
    region: "Region",
    propertyType: "Property Type",
    apartment: "Apartment",
    villa: "Villa",
    cottage: "Cottage",
    townhouse: "Townhouse",
    description: "Description",
    features: "Features",
    security247: "24/7 Security",
    parking: "Parking",
    playground: "Playground",
    elevator: "Elevator",
    balcony: "Balcony",
    garden: "Garden",
    requestViewing: "Schedule Viewing",
    buyNow: "Buy Now",
    contactManager: "Contact Manager",
    noFloorPlan: "Floor plan coming soon",
    noMasterPlan: "Master plan coming soon",
    noGallery: "Interior photos coming soon",
    sum: "UZS",
    backToHome: "Back to Home",
    loading: "Loading...",
    notFound: "Home not found",
    basement: "Basement Floor",
    noBasement: "Basement facilities not available",
    includingBasement: "including basement floor",
    homeOnly: "home only",
    withBasement: "with basement floor",
    basementPricePerSqm: "Basement per m²",
    prev: "Previous",
    next: "Next",
    of: "of",
  },
  ru: {
    details: "Детали недвижимости",
    overview: "Обзор",
    floorPlan: "План этажа",
    masterPlan: "Генплан",
    gallery: "Галерея",
    area: "Площадь",
    rooms: "Комнаты",
    floor: "Этаж",
    yearBuilt: "Год постройки",
    pricePerSqm: "Цена за м²",
    totalPrice: "Общая цена",
    region: "Регион",
    propertyType: "Тип недвижимости",
    apartment: "Квартира",
    villa: "Вилла",
    cottage: "Коттедж",
    townhouse: "Таунхаус",
    description: "Описание",
    features: "Особенности",
    security247: "24/7 Охрана",
    parking: "Парковка",
    playground: "Детская площадка",
    elevator: "Лифт",
    balcony: "Балкон",
    garden: "Сад",
    requestViewing: "Записаться на просмотр",
    buyNow: "Купить сейчас",
    contactManager: "Связаться с менеджером",
    noFloorPlan: "План этажа скоро будет доступен",
    noMasterPlan: "Генплан скоро будет доступен",
    noGallery: "Фотографии интерьера скоро появятся",
    sum: "сум",
    backToHome: "Вернуться на главную",
    loading: "Загрузка...",
    notFound: "Дом не найден",
    basement: "Цокольный этаж",
    noBasement: "Цокольные помещения не доступны",
    includingBasement: "включая цокольный этаж",
    homeOnly: "только дом",
    withBasement: "с цокольным этажом",
    basementPricePerSqm: "Цокольный этаж за м²",
    prev: "Назад",
    next: "Вперед",
    of: "из",
  },
  uz: {
    details: "Ko'chmas mulk tafsilotlari",
    overview: "Umumiy ma'lumot",
    floorPlan: "Qavat rejasi",
    masterPlan: "Bosh reja",
    gallery: "Galereya",
    area: "Maydon",
    rooms: "Xonalar",
    floor: "Qavat",
    yearBuilt: "Qurilgan yili",
    pricePerSqm: "m² narxi",
    totalPrice: "Umumiy narx",
    region: "Hudud",
    propertyType: "Mulk turi",
    apartment: "Kvartira",
    villa: "Villa",
    cottage: "Kottej",
    townhouse: "Taunxaus",
    description: "Tavsif",
    features: "Xususiyatlar",
    security247: "24/7 Qorovullik",
    parking: "Avtoturargoh",
    playground: "Bolalar maydonchasi",
    elevator: "Lift",
    balcony: "Balkon",
    garden: "Bog'",
    requestViewing: "Ko'rishga yozilish",
    buyNow: "Hozir sotib olish",
    contactManager: "Menejer bilan bog'lanish",
    noFloorPlan: "Qavat rejasi tez orada mavjud bo'ladi",
    noMasterPlan: "Bosh reja tez orada mavjud bo'ladi",
    noGallery: "Interer fotosuratlari tez orada paydo bo'ladi",
    sum: "so'm",
    backToHome: "Bosh sahifaga qaytish",
    loading: "Yuklanmoqda...",
    notFound: "Uy topilmadi",
    basement: "Podyezd qavati",
    noBasement: "Podyezd xonalari mavjud emas",
    includingBasement: "podyezd qavatini hisobga olgan holda",
    homeOnly: "faqat uy",
    withBasement: "podyezd qavati bilan",
    basementPricePerSqm: "Podyezd qavati m² narxi",
    prev: "Oldingi",
    next: "Keyingi",
    of: "dan",
  },
  ar: {
    details: "تفاصيل العقار",
    overview: "نظرة عامة",
    floorPlan: "مخطط الطابق",
    masterPlan: "المخطط العام",
    gallery: "المعرض",
    area: "المساحة",
    rooms: "الغرف",
    floor: "الطابق",
    yearBuilt: "سنة البناء",
    pricePerSqm: "السعر للمتر المربع",
    totalPrice: "السعر الإجمالي",
    region: "المنطقة",
    propertyType: "نوع العقار",
    apartment: "شقة",
    villa: "فيلا",
    cottage: "كوخ",
    townhouse: "تاون هاوس",
    description: "الوصف",
    features: "المميزات",
    security247: "أمن 24/7",
    parking: "موقف سيارات",
    playground: "ملعب أطفال",
    elevator: "مصعد",
    balcony: "شرفة",
    garden: "حديقة",
    requestViewing: "حجز موعد للمشاهدة",
    buyNow: "الشراء الآن",
    contactManager: "الاتصال بالمدير",
    noFloorPlan: "مخطط الطابق متاح قريباً",
    noMasterPlan: "المخطط العام متاح قريباً",
    noGallery: "صور التصميم الداخلي متاحة قريباً",
    sum: "سوم",
    backToHome: "العودة إلى الصفحة الرئيسية",
    loading: "جاري التحميل...",
    notFound: "لم يتم العثور على المنزل",
    basement: "الطابق السفلي",
    noBasement: "الغرف السفلية غير متوفرة",
    includingBasement: "بما في ذلك الطابق السفلي",
    homeOnly: "المنزل فقط",
    withBasement: "مع الطابق السفلي",
    basementPricePerSqm: "السعر للمتر المربع للطابق السفلي",
    prev: "السابق",
    next: "التالي",
    of: "من",
  },
  zh: {
    details: "房产详情",
    overview: "概览",
    floorPlan: "平面图",
    masterPlan: "总平面图",
    gallery: "图库",
    area: "面积",
    rooms: "房间",
    floor: "楼层",
    yearBuilt: "建成年份",
    pricePerSqm: "每平方米价格",
    totalPrice: "总价",
    region: "地区",
    propertyType: "房产类型",
    apartment: "公寓",
    villa: "别墅",
    cottage: "小屋",
    townhouse: "联排别墅",
    description: "描述",
    features: "特点",
    security247: "24/7保安",
    parking: "停车场",
    playground: "儿童游乐场",
    elevator: "电梯",
    balcony: "阳台",
    garden: "花园",
    requestViewing: "预约看房",
    buyNow: "立即购买",
    contactManager: "联系经理",
    noFloorPlan: "平面图即将推出",
    noMasterPlan: "总平面图即将推出",
    noGallery: "室内照片即将推出",
    sum: "苏姆",
    backToHome: "返回主页",
    loading: "加载中...",
    notFound: "未找到房屋",
    basement: "地下室",
    noBasement: "地下室不可用",
    includingBasement: "包括地下室",
    homeOnly: "仅房屋",
    withBasement: "含地下室",
    basementPricePerSqm: "地下室每平方米价格",
    prev: "上一张",
    next: "下一张",
    of: "共",
  },
};

export function HomeDetailsPage({ lang }: HomeDetailsPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [home, setHome] = useState<ReadyHome | null>(null);
  const [basementProperties, setBasementProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const t = translations[lang];

  // Get basement properties for the current home
  const currentHomeBasementProperties = useMemo(() => {
    if (!home || !basementProperties.length) return [];
    return basementProperties.filter((property) => property.home === home.id);
  }, [home, basementProperties]);

  // Calculate total basement area
  const totalBasementArea = useMemo(() => {
    return currentHomeBasementProperties.reduce((total, property) => {
      const propertyArea = typeof property.area === "string"
        ? parseFloat(property.area)
        : property.area || 0;
      return total + propertyArea;
    }, 0);
  }, [currentHomeBasementProperties]);

  // Get basement price per square meter (average if multiple basement properties)
  const basementPricePerSqm = useMemo(() => {
    if (currentHomeBasementProperties.length === 0) return 0;
    
    const totalPricePerSqm = currentHomeBasementProperties.reduce((sum, property) => {
      const pricePerSqm = typeof property.pricePerSqm === "string"
        ? parseFloat(property.pricePerSqm)
        : property.pricePerSqm || 0;
      return sum + pricePerSqm;
    }, 0);
    
    return totalPricePerSqm / currentHomeBasementProperties.length;
  }, [currentHomeBasementProperties]);

  // Calculate total price with the formula: (home price per m² × area) + (basement price per m² × basement area)
  const totalPriceWithBasement = useMemo(() => {
    if (!home) return 0;

    // Get home price per square meter
    const homePricePerSqm = typeof home.pricePerSqm === "string" 
      ? parseFloat(home.pricePerSqm) 
      : home.pricePerSqm || 0;
    
    // Get home area
    const homeArea = typeof home.area === "string" 
      ? parseFloat(home.area) 
      : home.area || 0;
    
    // Calculate home total price
    const homeTotalPrice = homePricePerSqm * homeArea;
    
    // Calculate basement total price
    const basementTotalPrice = basementPricePerSqm * totalBasementArea;
    
    return homeTotalPrice + basementTotalPrice;
  }, [home, basementPricePerSqm, totalBasementArea]);

  // Get all home images
  const homeImages = useMemo(() => {
    if (!home) return [];
    const images = [];
    
    // Main home image
    const mainImage = getHomeImage(home);
    if (mainImage) images.push(mainImage);
    
    // Interior photos
    const interiorPhotos = home.interior_photos || [];
    if (Array.isArray(interiorPhotos)) {
      interiorPhotos.forEach(photo => {
        if (photo && typeof photo === 'object' && photo.image) {
          images.push(photo.image);
        } else if (typeof photo === 'string') {
          images.push(photo);
        }
      });
    }
    
    return images.filter(Boolean);
  }, [home]);

  // Get all basement images
  const basementImages = useMemo(() => {
    const images: string[] = [];
    
    currentHomeBasementProperties.forEach(property => {
      if (property.images && Array.isArray(property.images)) {
        property.images.forEach(img => {
          if (img && typeof img === 'object' && img.image) {
            images.push(img.image);
          } else if (typeof img === 'string') {
            images.push(img);
          }
        });
      }
    });
    
    return images.filter(Boolean);
  }, [currentHomeBasementProperties]);

  // Combine all images (home + basement)
  const allImages = useMemo(() => {
    return [...homeImages, ...basementImages];
  }, [homeImages, basementImages]);

  // Memoized helper functions with fallbacks
  const homeName = useMemo(
    () => (home ? getHomeName(home, lang) : t.notFound),
    [home, lang, t]
  );

  const homeDescription = useMemo(
    () => (home ? getHomeDescription(home, lang) : t.description),
    [home, lang, t]
  );

  const homeRegion = useMemo(
    () => (home ? getHomeRegion(home, lang) : t.region),
    [home, lang, t]
  );

  const floorPlanImage = useMemo(
    () => (home ? getFloorPlanImage(home) : ""),
    [home]
  );

  const masterPlanImage = useMemo(
    () => (home ? getMasterPlanImage(home) : ""),
    [home]
  );

  const interiorPhotosList = useMemo(
    () => (home ? getInteriorPhotos(home) : []),
    [home]
  );

  // Fetch home details and basement properties
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError(t.notFound);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(`🔄 Fetching home details for ID: ${id}`);
        const [homeDetail, basementData] = await Promise.all([
          getHomeDetail(Number(id)),
          getBasementProperties(),
        ]);

        console.log("✅ Home detail received:", homeDetail);
        console.log("✅ Basement properties received:", basementData);

        if (homeDetail) {
          setHome(homeDetail);
          setBasementProperties(basementData);
        } else {
          setError(t.notFound);
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("Failed to load home details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, t]);

  const getTypeLabel = useCallback(
    (type: string) => {
      switch (type) {
        case "apartment":
          return t.apartment;
        case "villa":
          return t.villa;
        case "cottage":
          return t.cottage;
        case "townhouse":
          return t.townhouse;
        default:
          return type;
      }
    },
    [t]
  );

  const formatPrice = useCallback((price: string | number) => {
    if (!price) return "0";
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    return (priceNum / 1000000).toFixed(0);
  }, []);

  const formatPricePerSqm = useCallback((pricePerSqm: string | number) => {
    if (!pricePerSqm) return "0";
    const priceNum =
      typeof pricePerSqm === "string" ? parseFloat(pricePerSqm) : pricePerSqm;
    return (priceNum / 1000).toFixed(0);
  }, []);

  // Safe value getters with fallbacks
  const getSafeValue = useCallback((value: any, fallback: string = "-") => {
    return value ?? fallback;
  }, []);

  // Slider navigation
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [allImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  }, [allImages.length]);

  // Auto slide (optional)
  useEffect(() => {
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [allImages.length, nextSlide]);

  // Helper function to get images from basement property
  const getBasementPropertyImages = useCallback((property: Property) => {
    if (!property.images || property.images.length === 0) {
      return ["/placeholder-image.jpg"];
    }

    return property.images.map((img) => {
      if (typeof img === "object" && img !== null) {
        return img.image || "/placeholder-image.jpg";
      }
      return img;
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">{t.loading}</div>
        </div>
      </div>
    );
  }

  if (error || !home) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">{error || t.notFound}</h1>
          <Button onClick={() => navigate("/")}>{t.backToHome}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4">{homeName}</h1>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground px-4 py-2"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {homeRegion}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {getTypeLabel(home.type)}
            </Badge>
            {currentHomeBasementProperties.length > 0 && (
              <Badge variant="default" className="px-4 py-2 bg-green-600">
                <Plus className="w-3 h-3 mr-1" />
                {t.basement}
              </Badge>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex w-full max-w-3xl mx-auto mb-8 h-14 overflow-x-auto scrollbar-hide">
            <TabsTrigger value="overview" className="flex-shrink-0 px-4">
              {t.overview}
            </TabsTrigger>
            <TabsTrigger value="floorplan" className="flex-shrink-0 px-4">
              {t.floorPlan}
            </TabsTrigger>
            <TabsTrigger value="masterplan" className="flex-shrink-0 px-4">
              {t.masterPlan}
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex-shrink-0 px-4">
              {t.gallery}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 xl:grid-cols-5 gap-10 max-w-[2000px] mx-auto"
            >
              {/* Image Slider */}
              <div className="xl:col-span-3">
                {/* Slider Container */}
                <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-white">
                  {allImages.length > 0 ? (
                    <>
                      {/* Current Image */}
                      <motion.div
                        key={currentSlideIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <ImageWithFallback
                          src={allImages[currentSlideIndex]}
                          alt={`${homeName} - Image ${currentSlideIndex + 1}`}
                          fallbackSrc="/placeholder-image.jpg"
                          className="w-full h-full object-contain"
                        />
                      </motion.div>

                      {/* Navigation Buttons */}
                      {allImages.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </Button>
                        </>
                      )}

                      {/* Slide Indicator */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {allImages.slice(0, 10).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlideIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentSlideIndex
                                ? "bg-primary scale-125"
                                : "bg-white/50 hover:bg-white/70"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Image Counter */}
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentSlideIndex + 1} {t.of} {allImages.length}
                      </div>

                      {/* Image Type Badge */}
                      {currentSlideIndex >= homeImages.length && (
                        <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                          {t.basement}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                        <p className="text-xl text-muted-foreground">
                          No images available
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {allImages.slice(0, 8).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlideIndex(index)}
                        className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                          index === currentSlideIndex
                            ? "ring-2 ring-primary ring-offset-2"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fallbackSrc="/placeholder-image.jpg"
                          className="w-full h-full object-cover"
                        />
                        {index >= homeImages.length && (
                          <div className="absolute top-1 left-1">
                            <Badge className="bg-green-600 text-white text-xs px-1 py-0">
                              {t.basement}
                            </Badge>
                          </div>
                        )}
                        {index === 7 && allImages.length > 8 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold">
                              +{allImages.length - 8}
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price and Specs Section */}
              <div className="xl:col-span-2 space-y-6">
                {/* Price Section */}
                <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-8 rounded-2xl shadow-lg">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">
                          {t.totalPrice}
                        </p>
                        {currentHomeBasementProperties.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {t.withBasement}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Show total price */}
                      <p className="text-5xl text-primary mb-4">
                        {formatPrice(totalPriceWithBasement)} млн {t.sum}
                      </p>
                      
                      {/* Show the calculation formula */}
                      {currentHomeBasementProperties.length > 0 && (
                        <div className="mt-4 space-y-3 bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            {t.totalPrice} {t.withBasement.toLowerCase()}:
                          </p>
                          
                          {/* Calculation line 1: Home price */}
                          <div className="flex items-center  text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {formatPricePerSqm(getSafeValue(home.pricePerSqm, "0"))}k {t.sum}
                              </span>
                            </div>
                            <span className="mx-2">×</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{getSafeValue(home.area)} m²</span>
                            </div>
                            <span className="mx-2">=</span>
                            <span className="font-medium text-primary">
                              {formatPrice(
                                (typeof home.pricePerSqm === "string" ? parseFloat(home.pricePerSqm) : home.pricePerSqm || 0) *
                                (typeof home.area === "string" ? parseFloat(home.area) : home.area || 0)
                              )} млн {t.sum}
                            </span>
                          </div>
                          
                          
                          {/* Calculation line 2: Basement price */}
                          <div className="flex items-center text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-green-600">
                                {formatPricePerSqm(basementPricePerSqm)}k {t.sum}
                              </span>
                            </div>
                            <span className="mx-2">×</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{totalBasementArea.toFixed(1)} m²</span>
                            </div>
                            <span className="mx-2">=</span>
                            <span className="font-medium text-green-600">
                              {formatPrice(
                                basementPricePerSqm * totalBasementArea
                              )} млн {t.sum}
                            </span>
                          </div>
                          
                          <Separator className="my-2" />
                          
                          {/* Total calculation */}
                          <div className="flex items-center text-sm font-semibold">
                            <span>{t.totalPrice}:</span>
                            <span className="text-lg text-primary pl-4">
                              {formatPrice(totalPriceWithBasement)} млн {t.sum}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <Separator />

                    {/* Home Price Per Square Meter */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.pricePerSqm} {t.homeOnly.toLowerCase()}
                      </p>
                      <p className="text-2xl text-secondary">
                        {formatPricePerSqm(getSafeValue(home.pricePerSqm, "0"))}k {t.sum}
                      </p>
                    </div>

                    {/* Basement Price Per Square Meter */}
                    {currentHomeBasementProperties.length > 0 &&
                      basementPricePerSqm > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {t.basementPricePerSqm}
                          </p>
                          <p className="text-2xl text-green-600">
                            {formatPricePerSqm(basementPricePerSqm)}k {t.sum}
                          </p>
                        </div>
                      )}
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <Ruler className="w-8 h-8 text-primary mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">
                      {t.area}
                    </p>
                    <p className="text-2xl">{getSafeValue(home.area)} м²</p>
                  </div>
                  {home.rooms && (
                    <div className="bg-muted p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <Home className="w-8 h-8 text-primary mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.rooms}
                      </p>
                      <p className="text-2xl">{getSafeValue(home.rooms)}</p>
                    </div>
                  )}
                  {home.floor && (
                    <div className="bg-muted p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <Building2 className="w-8 h-8 text-primary mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.floor}
                      </p>
                      <p className="text-2xl">
                        {getSafeValue(home.floor)}/
                        {getSafeValue(home.totalFloors)}
                      </p>
                    </div>
                  )}
                  {home.yearBuilt && (
                    <div className="bg-muted p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <Calendar className="w-8 h-8 text-primary mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.yearBuilt}
                      </p>
                      <p className="text-2xl">
                        {getYearBuilt(getSafeValue(home.yearBuilt))}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-muted/50 p-6 rounded-xl">
                  <h3 className="mb-3 text-xl">{t.description}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {homeDescription}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="mb-4 text-xl">{t.features}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      t.security247,
                      t.parking,
                      t.playground,
                      t.balcony,
                      t.garden,
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-3 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-3 pt-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 h-14 text-lg"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    {t.requestViewing}
                  </Button>
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-lg"
                  >
                    {t.buyNow}
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    {t.contactManager}
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Floor Plan Tab */}
          <TabsContent value="floorplan" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-[1800px] mx-auto"
            >
              <h3 className="text-2xl">{t.floorPlan}</h3>
              {floorPlanImage ? (
                <div className="relative bg-muted rounded-2xl overflow-hidden shadow-xl p-8">
                  <div className="flex items-center justify-center min-h-[800px]">
                    <ImageWithFallback
                      src={floorPlanImage}
                      alt="Floor Plan"
                      fallbackSrc="/placeholder-image.jpg"
                      className="max-w-full max-h-[800px] object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-[500px] bg-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl text-muted-foreground">
                      {t.noFloorPlan}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Master Plan Tab */}
          <TabsContent value="masterplan" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-[1800px] mx-auto"
            >
              <h3 className="text-2xl">{t.masterPlan}</h3>
              {masterPlanImage ? (
                <div className="relative bg-muted rounded-2xl overflow-hidden shadow-xl p-8">
                  <div className="flex items-center justify-center min-h-[800px]">
                    <ImageWithFallback
                      src={masterPlanImage}
                      alt="Master Plan"
                      fallbackSrc="/placeholder-image.jpg"
                      className="max-w-full max-h-[800px] object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-[500px] bg-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl text-muted-foreground">
                      {t.noMasterPlan}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-[2000px] mx-auto"
            >
              <h3 className="text-2xl">{t.gallery}</h3>
              {interiorPhotosList.length > 0 ? (
                <ImageGallery images={interiorPhotosList} lang={lang} />
              ) : (
                <div className="h-[500px] bg-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl text-muted-foreground">
                      {t.noGallery}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}