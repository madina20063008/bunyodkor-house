import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Home, AlertCircle } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getAllHomes } from "../services/dataService";
import type { ReadyHome } from "../services/data.types";

import React from "react";

interface ReadyHomesProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

// Helper functions to get localized fields
const getHomeName = (
  home: ReadyHome,
  lang: ReadyHomesProps["lang"]
): string => {
  switch (lang) {
    case "en":
      return home.name_en || home.name || "No name";
    case "ru":
      return home.name_ru || home.name || "No name";
    case "uz":
      return home.name_uz || home.name || "No name";
    case "ar":
      return home.name_ar || home.name || "No name";
    case "zh":
      return home.name_zh_hans || home.name || "No name";
    default:
      return home.name || "No name";
  }
};

const getHomeDescription = (
  home: ReadyHome,
  lang: ReadyHomesProps["lang"]
): string => {
  return home.description || "No description available";
};

const getHomeRegion = (
  home: ReadyHome,
  lang: ReadyHomesProps["lang"]
): string => {
  return home.region || "Region not specified";
};

const getHomeType = (
  home: ReadyHome,
  lang: ReadyHomesProps["lang"]
): string => {
  return home.type || "Type not specified";
};

// Helper function to get the main image
const getHomeImage = (home: ReadyHome): string => {
  if (home.images && home.images.length > 0 && home.images[0].image) {
    return home.images[0].image;
  }
  return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80";
};

export function ReadyHomes({ lang }: ReadyHomesProps) {
  const navigate = useNavigate();
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [homes, setHomes] = useState<ReadyHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Fetch homes from API
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        setLoading(true);
        console.log("🔄 Starting to fetch homes...");
        const data = await getAllHomes();

        console.log("✅ API data received:", data?.length, "items");

        // Log first home to check structure
        if (data && data.length > 0) {
          console.log("🔍 First home structure:", data[0]);
          console.log("🔍 Home keys:", Object.keys(data[0]));
        }

        setHomes(data || []);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching homes:", err);
        setError("Failed to load homes");
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  const translations = {
    en: {
      title: "Ready Homes",
      subtitle: "Fully Ready-to-Move-In Homes",
      allRegions: "All Regions",
      allTypes: "All Types",
      villa: "Villa",
      cottage: "Cottage",
      townhouse: "Townhouse",
      apartment: "Apartment",
      area: "m²",
      pricePerSqm: "per m²",
      sum: "UZS",
      buyHome: "Buy Home",
      viewCatalog: "View Full Catalog",
      loading: "Loading...",
      error: "Error loading data",
      noHomes: "No Homes Found",
      showingResults: "Showing results",
    },
    ru: {
      title: "Готовые дома",
      subtitle: "Полностью готовые к заселению дома",
      allRegions: "Все регионы",
      allTypes: "Все типы",
      villa: "Вилла",
      cottage: "Коттедж",
      townhouse: "Таунхаус",
      apartment: "Квартира",
      area: "м²",
      pricePerSqm: "за м²",
      sum: "сум",
      buyHome: "Купить дом",
      viewCatalog: "Посмотреть весь каталог",
      loading: "Загрузка...",
      error: "Ошибка при загрузке данных",
      noHomes: "Дома не найдены",
      showingResults: "Показано результатов",
    },
    uz: {
      title: "Tayyor uylar",
      subtitle: "Yashashga to'liq tayyor uylar",
      allRegions: "Barcha hududlar",
      allTypes: "Barcha turlar",
      villa: "Villa",
      cottage: "Kottej",
      townhouse: "Taunxaus",
      apartment: "Kvartira",
      area: "m²",
      pricePerSqm: "m² uchun",
      sum: "so'm",
      buyHome: "Uy sotib olish",
      viewCatalog: "Barcha katalogni ko'rish",
      loading: "Yuklanmoqda...",
      error: "Ma'lumotlarni yuklashda xatolik",
      noHomes: "Uylar topilmadi",
      showingResults: "ko'rsatilmoqda",
    },
    ar: {
      title: "منازل جاهزة",
      subtitle: "منازل جاهزة تماماً للسكن",
      allRegions: "جميع المناطق",
      allTypes: "جميع الأنواع",
      villa: "فيلا",
      cottage: "كوخ",
      townhouse: "تاون هاوس",
      apartment: "شقة",
      area: "م²",
      pricePerSqm: "للمتر المربع",
      sum: "سوم",
      buyHome: "شراء منزل",
      viewCatalog: "عرض الكتالوج الكامل",
      loading: "جاري التحميل...",
      error: "خطأ في تحميل البيانات",
      noHomes: "لم يتم العثور على منازل",
      showingResults: "عرض النتائج",
    },
    zh: {
      title: "现房",
      subtitle: "可立即入住的现房",
      allRegions: "所有地区",
      allTypes: "所有类型",
      villa: "别墅",
      cottage: "小屋",
      townhouse: "联排别墅",
      apartment: "公寓",
      area: "平方米",
      pricePerSqm: "每平方米",
      sum: "苏姆",
      buyHome: "购买房屋",
      viewCatalog: "查看完整目录",
      loading: "加载中...",
      error: "加载数据时出错",
      noHomes: "未找到房屋",
      showingResults: "显示结果",
    },
  };

  const t = translations[lang];

  // Get unique regions for filter
  const uniqueRegions = Array.from(
    new Set(
      homes
        .map((home) => home.region)
        .filter((region) => region && region.trim() !== "")
    )
  );

  // SIMPLIFIED FILTERING - Show all homes initially
  const filteredHomes = homes.filter((home) => {
    const regionMatch = regionFilter === "all" || home.region === regionFilter;
    const typeMatch = typeFilter === "all" || home.type === typeFilter;
    return regionMatch && typeMatch;
  });

  console.log("🎯 FILTERING DEBUG:");
  console.log("   Total homes:", homes.length);
  console.log("   Filtered homes:", filteredHomes.length);
  console.log("   Region filter:", regionFilter);
  console.log("   Type filter:", typeFilter);
  console.log("   Unique regions:", uniqueRegions);

  const formatPrice = (price: string | number): string => {
    try {
      if (!price) return "0";
      const priceNum = typeof price === "string" ? parseFloat(price) : price;
      if (isNaN(priceNum)) return "0";

      if (priceNum >= 1000000) {
        return (priceNum / 1000000).toFixed(1).replace(/\.0$/, "");
      }

      return new Intl.NumberFormat("ru-RU").format(priceNum);
    } catch {
      return "0";
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src =
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80";
  };

  if (loading) {
    return (
      <section id="ready" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <div className="text-lg">{t.loading}</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="ready" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-red-500 text-lg mb-4">{t.error}</div>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90"
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="ready" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Debug info */}
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>DEBUG:</strong> Loaded {homes.length} homes, showing{" "}
            {filteredHomes.length} after filters
          </div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-primary">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder={t.allRegions} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allRegions}</SelectItem>
              {uniqueRegions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder={t.allTypes} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allTypes}</SelectItem>
              <SelectItem value="apartment">{t.apartment}</SelectItem>
              <SelectItem value="villa">{t.villa}</SelectItem>
              <SelectItem value="cottage">{t.cottage}</SelectItem>
              <SelectItem value="townhouse">{t.townhouse}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {filteredHomes.length === 0
              ? t.noHomes
              : `${t.showingResults}: ${filteredHomes.length}`}
          </p>
        </div>

        {/* Home Cards - SHOW ALL FILTERED HOMES */}
        {filteredHomes.length === 0 ? (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">{t.noHomes}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomes.map((home, index) => (
              <motion.div
                key={home.id}
                initial={{
                  // opacity: 0,
                  y: 50,
                }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : {
                        // opacity: 0,
                        y: 50,
                      }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={getHomeImage(home)}
                    alt={getHomeName(home, lang)}
                    className="w-full h-64 object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {getHomeRegion(home, lang)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {getHomeName(home, lang)}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-start gap-1">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{getHomeDescription(home, lang)}</span>
                  </p>
                  <div className="mb-6 flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium">
                        {home.area} {t.area}
                      </span>
                      <span className="text-sm text-gray-500">
                        {home.pricePerSqm} {t.sum} {t.pricePerSqm}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(home.price)} {t.sum}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => navigate(`/home/${home.id}`)}
                  >
                    {t.buyHome}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View Full Catalog Button */}
        {filteredHomes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => navigate("/catalog")}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
            >
              {t.viewCatalog}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
