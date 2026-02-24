import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { ApartmentFilters, FilterValues } from "./ApartmentFilters";
import { getAllHomes, searchHomes } from "../services/dataService";
import type { ReadyHome } from "../services/data.types";
import { Button } from "./ui/button";
import { Home, Loader2, Heart, Key } from "lucide-react";
import React from "react";
import {
  getHomeImage,
  getHomeName,
  getYearFromDate,
} from "../utils/homeHelpers";
import No_img from "../assets/no-image-svg.svg";

interface ApartmentFinderSectionProps {
  lang:"en" | "ru" | "uz" | "ar" | "zh";
}

const translations = {
  en: {
    preview: "Results Preview",
    noResults: "No apartments found. Try changing your filters.",
    area: "m²",
    sum: "UZS",
    pricePerSqm: "per m²",
    viewDetails: "View Details",
    viewAllCatalog: "View Full Catalog",
    showingResults: "Showing first results",
    rooms: "rooms",
    loading: "Loading...",
    error: "Error loading data",
    searchError: "Search error",
    apartmentNumber: "Apartment Number",
    completionYear: "Completion Year",
    project: "Project",
    learnMore: "Learn More",
  },
  ru: {
    preview: "Предпросмотр результатов",
    noResults: "Квартиры не найдены. Попробуйте изменить фильтры.",
    area: "м²",
    sum: "сум",
    pricePerSqm: "за м²",
    viewDetails: "Подробнее",
    viewAllCatalog: "Посмотреть весь каталог",
    showingResults: "Показано первых результатов",
    rooms: "комнат",
    loading: "Загрузка...",
    error: "Ошибка при загрузке данных",
    searchError: "Ошибка при поиске",
    apartmentNumber: "Номер квартиры",
    completionYear: "Год сдачи",
    project: "Проект",
    learnMore: "Узнать больше",
  },
  uz: {
    preview: "Natijalarni oldindan ko'rish",
    noResults: "Kvartiralar topilmadi. Filtrlarni o'zgartirib ko'ring.",
    area: "m²",
    sum: "so'm",
    pricePerSqm: "m² uchun",
    viewDetails: "Batafsil",
    viewAllCatalog: "Barcha katalogni ko'rish",
    showingResults: "Birinchi natijalar ko'rsatilmoqda",
    rooms: "xona",
    loading: "Yuklanmoqda...",
    error: "Ma'lumotlarni yuklashda xatolik",
    searchError: "Qidiruvda xatolik",
    apartmentNumber: "Kvartira raqami",
    completionYear: "Topshirish yili",
    project: "Loyiha",
    learnMore: "Batafsil ma'lumot",
  },
  ar: {
    preview: "معاينة النتائج",
    noResults: "لم يتم العثور على شقق. حاول تغيير المرشحات.",
    area: "م²",
    sum: "سوم",
    pricePerSqm: "للمتر المربع",
    viewDetails: "التفاصيل",
    viewAllCatalog: "عرض الكتالوج الكامل",
    showingResults: "عرض النتائج الأولى",
    rooms: "غرف",
    loading: "جاري التحميل...",
    error: "خطأ في تحميل البيانات",
    searchError: "خطأ في البحث",
    apartmentNumber: "رقم الشقة",
    completionYear: "سنة التسليم",
    project: "المشروع",
    learnMore: "معرفة المزيد",
  },
  zh: {
    preview: "预览结果",
    noResults: "未找到公寓。请尝试更改过滤器。",
    area: "平方米",
    sum: "苏姆",
    pricePerSqm: "每平方米",
    viewDetails: "详情",
    viewAllCatalog: "查看完整目录",
    showingResults: "显示前几个结果",
    rooms: "房间",
    loading: "加载中...",
    error: "加载数据时出错",
    searchError: "搜索时出错",
    apartmentNumber: "公寓号码",
    completionYear: "竣工年份",
    project: "项目",
    learnMore: "了解更多",
  },
};

// Optimized ApartmentCard Component
interface ApartmentCardProps {
  home: ReadyHome;
  lang: ApartmentFinderSectionProps["lang"];
  onCardClick: (homeId: number) => void;
  t: typeof translations.ru;
}

const ApartmentCard = React.memo<ApartmentCardProps>(
  ({ home, lang, onCardClick, t }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Memoized values
    const completionYear = useMemo(
      () => getYearFromDate(home.yearBuilt) || new Date().getFullYear(),
      [home.yearBuilt]
    );

    const areaNumber = useMemo(() => parseFloat(home.area) || 0, [home.area]);
    const homeName = useMemo(() => getHomeName(home, lang), [home, lang]);
    const imageUrl = useMemo(() => getHomeImage(home), [home]);

    const handleSaveClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSaved((prev) => !prev);
    }, []);

    const handleLearnMoreClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onCardClick(home.id);
      },
      [onCardClick, home.id]
    );

    const handleImageError = useCallback(() => {
      setImageError(true);
    }, []);

    return (
      <div
        className="relative rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200 bg-white cursor-pointer"
        style={{ marginTop: "30px" }}
        onClick={() => onCardClick(home.id)}
      >
        <button
          aria-label="Save apartment"
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-600 transition-colors duration-200"
          onClick={handleSaveClick}
        >
          <Heart
            size={20}
            fill={isSaved ? "#dc2626" : "none"}
            color={isSaved ? "#dc2626" : "currentColor"}
          />
        </button>

        <div className="w-full bg-gray-50">
          <div
            style={{
              overflow: "hidden",
              height: "250px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={home?.images.length > 0 ? home?.images[0]?.image : No_img}
              alt={homeName}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "contain",
              }}
              className="mx-auto hover:scale-105 transition-transform"
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        </div>

        <div className="p-6 space-y-2 text-sm">
          <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
            <span className="text-gray-500">{t.apartmentNumber}</span>
            <span className="font-semibold text-blue-900">
              {home.home_number || home.id}
            </span>
          </div>

          <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
            <span className="text-gray-500">Area</span>
            <span className="font-semibold text-blue-900">
              {areaNumber} {t.area}
            </span>
          </div>

          <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
            <span className="text-gray-500">{t.rooms}</span>
            <span className="font-semibold text-blue-900">{home.rooms}</span>
          </div>

          <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
            <span className="text-gray-500">Floor</span>
            <span className="font-semibold text-blue-900">
              {home.floor}/{home.totalFloors || home.floor}
            </span>
          </div>

          <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
            <span className="text-gray-500">{t.completionYear}</span>
            <span className="font-semibold text-blue-900">
              {completionYear}
            </span>
          </div>

          <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
            <span className="text-gray-500">{t.project}</span>
            <span className="font-semibold text-yellow-600 truncate ml-2 max-w-[120px]">
              {homeName}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-900 bg-white text-gray-900 font-semibold rounded-full py-2 transition-colors duration-300 hover:bg-yellow-600 hover:text-white hover:border-yellow-500"
            onClick={handleLearnMoreClick}
          >
            <Key size={18} />
            {t.learnMore}
          </button>
        </div>
      </div>
    );
  }
);

ApartmentCard.displayName = "ApartmentCard";

export function ApartmentFinderSection({ lang }: ApartmentFinderSectionProps) {
  const navigate = useNavigate();
  const t = translations[lang];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [homes, setHomes] = useState<ReadyHome[]>([]);
  const [filteredHomes, setFilteredHomes] = useState<ReadyHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterValues>({
    propertyType: "apartment",
    rooms: [],
    floorRange: [-1, 52],
    projects: "all",
    areaRange: [10, 360],
    completionYear: [],
  });

  // Fetch all homes on initial load
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        setLoading(true);
        const data = await getAllHomes();
        setHomes(data);
        setFilteredHomes(data);
        setError(null);
      } catch (err) {
        setError(t.error);
        console.error("Error fetching homes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, [t.error]);

  // Search homes when filters change
  useEffect(() => {
    const searchWithFilters = async () => {
      try {
        setSearchLoading(true);

        // Prepare search parameters
        const searchParams: any = {};

        // Only add filters that have values
        if (filters.projects && filters.projects !== "all") {
          searchParams.projectName = filters.projects;
        }

        if (filters.rooms.length > 0) {
          const hasFourPlus = filters.rooms.includes(4);
          const regularRooms = filters.rooms.filter((room) => room !== 4);

          if (regularRooms.length > 0) {
            searchParams.rooms = regularRooms[0];
          }
        }

        if (filters.floorRange[0] !== -1 || filters.floorRange[1] !== 52) {
          searchParams.floorFrom = filters.floorRange[0];
          searchParams.floorTo = filters.floorRange[1];
        }

        if (filters.areaRange[0] !== 10 || filters.areaRange[1] !== 360) {
          searchParams.areaFrom = filters.areaRange[0];
          searchParams.areaTo = filters.areaRange[1];
        }

        if (filters.completionYear.length > 0) {
          searchParams.overDate = filters.completionYear[0].toString();
        }

        // If no filters are applied, use all homes
        if (Object.keys(searchParams).length === 0) {
          setFilteredHomes(homes);
        } else {
          // Make API search call
          console.log(searchParams);

          const searchResults = await searchHomes(searchParams);
          console.log(searchResults);

          setFilteredHomes(searchResults);
        }

        setError(null);
      } catch (err) {
        console.error("Error searching homes:", err);
        // Fallback to client-side filtering if search fails
        filterHomesClientSide();
      } finally {
        setSearchLoading(false);
      }
    };

    const filterHomesClientSide = () => {
      const filtered = homes.filter((home) => {
        // Property type filter
        if (
          filters.propertyType !== "apartment" &&
          home.type !== filters.propertyType
        ) {
          return false;
        }

        // Projects filter
        if (filters.projects !== "all" && home.name !== filters.projects) {
          return false;
        }

        // Rooms filter
        if (filters.rooms.length > 0) {
          const hasFourPlus = filters.rooms.includes(4);
          const roomMatch =
            filters.rooms.includes(home.rooms) ||
            (hasFourPlus && home.rooms >= 4);
          if (!roomMatch) return false;
        }

        // Floor range filter
        if (
          home.floor < filters.floorRange[0] ||
          home.floor > filters.floorRange[1]
        ) {
          return false;
        }

        // Area range filter
        const areaNum = parseFloat(home.area);
        if (areaNum < filters.areaRange[0] || areaNum > filters.areaRange[1]) {
          return false;
        }

        // Completion year filter
        const yearBuilt = getYearFromDate(home.yearBuilt);
        if (
          filters.completionYear.length > 0 &&
          yearBuilt &&
          !filters.completionYear.includes(yearBuilt)
        ) {
          return false;
        }

        return true;
      });

      setFilteredHomes(filtered);
    };

    if (homes.length > 0) {
      searchWithFilters();
    }
  }, [filters, homes]);

  const previewHomes = useMemo(
    () => filteredHomes.slice(0, 3),
    [filteredHomes]
  );

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  const handleCardClick = useCallback(
    (homeId: number) => {
      navigate(`/home/${homeId}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <section className="py-20 bg-gray-50" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#526C6C] mx-auto mb-4" />
            <div className="text-lg text-gray-600">{t.loading}</div>
          </div>
        </div>
      </section>
    );
  }

  if (error && homes.length === 0) {
    return (
      <section className="py-20 bg-gray-50" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Filters Component */}
          <ApartmentFilters
            lang={lang}
            onFilterChange={handleFilterChange}
            totalResults={filteredHomes.length}
          />

          {/* Preview Results */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#526C6C] text-xl font-semibold">
                {t.preview}
              </h3>
              {filteredHomes.length > 3 && (
                <p className="text-gray-600">
                  {t.showingResults} {previewHomes.length} /{" "}
                  {filteredHomes.length}
                </p>
              )}
            </div>

            {searchLoading ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Loader2 className="w-8 h-8 animate-spin text-[#526C6C] mx-auto mb-4" />
                <p className="text-gray-500">{t.loading}</p>
              </div>
            ) : previewHomes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t.noResults}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {previewHomes.map((home, index) => (
                  <motion.div
                    key={home.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ApartmentCard
                      home={home}
                      lang={lang}
                      onCardClick={handleCardClick}
                      t={t}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* View All Catalog Button */}

            {filteredHomes.length > 0 && !searchLoading && (
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-[#C8A961] hover:bg-[#b39851] text-white px-12 py-6 text-lg font-semibold transition-colors duration-200 rounded-full"
                  onClick={() => navigate("/catalog")}
                >
                  {t.viewAllCatalog}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
