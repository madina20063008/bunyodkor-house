import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Maximize, DollarSign } from "lucide-react";
import { motion, useInView } from "motion/react";
import { ApartmentFilters, FilterValues } from "./ApartmentFilters";
import { getAllHomes } from "../services/dataService";
import type { ReadyHome } from "../services/data.types";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import {
  getHomeImage,
  getHomeName,
  getHomeRegion,
  getYearBuilt,
} from "../utils/homeHelpers";

interface ApartmentCatalogPageProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

const translations = {
  en: {
    title: "Property Catalog",
    subtitle: "Find your perfect home",
    area: "m²",
    price: "UZS",
    pricePerSqm: "UZS/m²",
    viewDetails: "View Details",
    noResults: "No results found for your query",
    tryAdjustFilters: "Try adjusting your filter parameters",
    rooms: "rooms",
    floor: "floor",
    loading: "Loading...",
    error: "Error loading data",
  },
  ru: {
    title: "Каталог недвижимости",
    subtitle: "Найдите свой идеальный дом",
    area: "м²",
    price: "сум",
    pricePerSqm: "сум/м²",
    viewDetails: "Подробнее",
    noResults: "По вашему запросу ничего не найдено",
    tryAdjustFilters: "Попробуйте изменить параметры фильтрации",
    rooms: "комн.",
    floor: "этаж",
    loading: "Загрузка...",
    error: "Ошибка при загрузке данных",
  },
  uz: {
    title: "Ko'chmas mulk katalogi",
    subtitle: "O'z ideal uyingizni toping",
    area: "m²",
    price: "so'm",
    pricePerSqm: "so'm/m²",
    viewDetails: "Batafsil",
    noResults: "So'rovingiz bo'yicha hech narsa topilmadi",
    tryAdjustFilters: "Filtr parametrlarini o'zgartirishga harakat qiling",
    rooms: "xona",
    floor: "qavat",
    loading: "Yuklanmoqda...",
    error: "Ma'lumotlarni yuklashda xatolik",
  },
  ar: {
    title: "كتالوج العقارات",
    subtitle: "اعثر على منزلك المثالي",
    area: "م²",
    price: "سوم",
    pricePerSqm: "سوم/م²",
    viewDetails: "التفاصيل",
    noResults: "لم يتم العثور على نتائج لطلبك",
    tryAdjustFilters: "حاول تعديل معايير التصفية",
    rooms: "غرفة",
    floor: "طابق",
    loading: "جاري التحميل...",
    error: "خطأ في تحميل البيانات",
  },
  zh: {
    title: "房地产目录",
    subtitle: "找到您的理想家园",
    area: "平方米",
    price: "索姆",
    pricePerSqm: "索姆/平方米",
    viewDetails: "详情",
    noResults: "未找到符合您请求的结果",
    tryAdjustFilters: "尝试调整过滤器参数",
    rooms: "房间",
    floor: "楼层",
    loading: "加载中...",
    error: "加载数据时出错",
  },
};

export function ApartmentCatalogPage({ lang }: ApartmentCatalogPageProps) {
  const t = translations[lang];
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [homes, setHomes] = useState<ReadyHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterValues>({
    propertyType: "apartment",
    rooms: [],
    floorRange: [-1, 52],
    projects: "all",
    areaRange: [10, 360],
    completionYear: [],
  });

  // Fetch homes from API
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        setLoading(true);
        const data = await getAllHomes();
        setHomes(data);
        setError(null);
      } catch (err) {
        setError("Failed to load homes");
        console.error("Error fetching homes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  // Memoized helper functions
  const getMemoizedHomeImage = useCallback(
    (home: ReadyHome) => getHomeImage(home),
    []
  );

  const getMemoizedHomeName = useCallback(
    (home: ReadyHome) => getHomeName(home, lang),
    [lang]
  );

  const getMemoizedHomeRegion = useCallback(
    (home: ReadyHome) => getHomeRegion(home, lang),
    [lang]
  );

  // Filter apartments based on current filter values
  const filteredApartments = useMemo(() => {
    if (!homes.length) return [];

    return homes.filter((home) => {
      // Property type filter
      if (
        filters.propertyType !== "apartment" &&
        home.type !== filters.propertyType
      ) {
        return false;
      }

      // Filter by rooms
      if (filters.rooms.length > 0) {
        // If room is 4+, include all apartments with 4 or more rooms
        const maxSelectedRoom = Math.max(...filters.rooms);
        if (filters.rooms.includes(4)) {
          // 4+ selected, include all with 4 or more
          if (home.rooms < 4) {
            // Also check if specific room count is selected
            if (!filters.rooms.includes(home.rooms)) {
              return false;
            }
          }
        } else {
          if (!filters.rooms.includes(home.rooms)) {
            return false;
          }
        }
      }

      // Filter by floor range
      if (
        home.floor < filters.floorRange[0] ||
        home.floor > filters.floorRange[1]
      ) {
        return false;
      }

      // Filter by area range - convert string to number
      const areaNum = parseFloat(home.area);
      if (areaNum < filters.areaRange[0] || areaNum > filters.areaRange[1]) {
        return false;
      }

      // Filter by completion year - extract year from date string
      if (filters.completionYear.length > 0) {
        const yearBuilt = getYearBuilt(home.yearBuilt);
        if (!filters.completionYear.includes(yearBuilt)) {
          return false;
        }
      }

      return true;
    });
  }, [homes, filters]);

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  const formatPrice = useCallback((price: string | number) => {
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("ru-RU").format(priceNum);
  }, []);

  const formatPricePerSqm = useCallback((pricePerSqm: string | number) => {
    const priceNum =
      typeof pricePerSqm === "string" ? parseFloat(pricePerSqm) : pricePerSqm;
    return new Intl.NumberFormat("ru-RU").format(priceNum);
  }, []);

  console.log(homes);
  console.log(filters);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-[#526C6C] to-[#3d5252] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-[#C8A961] mb-4">{t.title}</h1>
            <p className="text-xl text-gray-100">{t.subtitle}</p>
          </div>
        </section>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-lg text-gray-600">{t.loading}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-[#526C6C] to-[#3d5252] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-[#C8A961] mb-4">{t.title}</h1>
            <p className="text-xl text-gray-100">{t.subtitle}</p>
          </div>
        </section>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-red-500 text-lg">{t.error}</div>
        </div>
      </div>
    );
  }

  console.log(filteredApartments.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#526C6C] to-[#3d5252] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-[#C8A961] mb-4">{t.title}</h1>
            <p className="text-xl text-gray-100">{t.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <ApartmentFilters
            lang={lang}
            onFilterChange={handleFilterChange}
            totalResults={filteredApartments.length}
          />
        </div>
      </section>

      {/* Results Section */}
      <section ref={ref} className="py-12">
        <div className="container mx-auto px-4">
          {filteredApartments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 mb-4">
                <Maximize className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-gray-600 mb-2">{t.noResults}</h3>
              <p className="text-gray-500">{t.tryAdjustFilters}</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApartments.map((home, index) => (
                <motion.div
                  key={home.id}
                  initial={{ y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      style={{
                        overflow: "hidden",
                        height: "250px",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <img
                        src={getMemoizedHomeImage(home)}
                        alt={getMemoizedHomeName(home)}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-[#C8A961] text-white px-3 py-1 rounded-full text-sm">
                      {getYearBuilt(home.yearBuilt)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="mb-3 line-clamp-2">
                      {getMemoizedHomeName(home)}
                    </h3>

                    {/* Property Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-[#526C6C]" />
                        <span className="text-sm">
                          {getMemoizedHomeRegion(home)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Maximize className="w-4 h-4 mr-1 text-[#526C6C]" />
                          <span>
                            {home.area} {t.area}
                          </span>
                        </div>
                        <div>
                          {home.rooms} {t.rooms}
                        </div>
                        <div>
                          {home.floor} {t.floor}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-baseline gap-2">
                        <DollarSign className="w-5 h-5 text-[#C8A961]" />
                        <span className="text-[#526C6C]">
                          {formatPrice(home.price)}
                        </span>
                        <span className="text-gray-500 text-sm">{t.price}</span>
                      </div>
                      <div className="text-sm text-gray-500 ml-7">
                        {formatPricePerSqm(home.pricePerSqm)} {t.pricePerSqm}
                      </div>
                    </div>

                    {/* Button */}
                    <div className="mt-auto">
                      <Button
                        onClick={() => navigate(`/home/${home.id}`)}
                        className="w-full bg-[#526C6C] hover:bg-[#3d5252] text-white"
                      >
                        {t.viewDetails}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
