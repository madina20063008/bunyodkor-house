import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import MapLeaflet from "./MapLeaflet";
import API from "../services/api";

interface RegionsProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

interface Location {
  id: number;
  latitude: number;
  longitude: number;
  address_uz: string;
  address_ru?: string;
  address_en?: string;
  address_zh_hans?: string;
  address_ar?: string;
  description?: string | null;
  description_uz: string;
  description_en: string;
  description_ru?: string;
  description_ar?: string;
  description_zh_hans?: string;
}

export function Regions({ lang }: RegionsProps) {
  const [mapLeaflet, setMapLeaflet] = useState<Location[]>([]);

  // Real location coordinates from your Google Maps embed
  const realLocation: Location = {
    id: 1,
    latitude: 38.8151,
    longitude: 65.7152,
    address_uz: "Bunyodkor House",
    address_ru: "Bunyodkor House",
    address_ar: "Bunyodkor House",
    address_en: "Bunyodkor House",
    address_zh_hans: "Bunyodkor House",
    description_uz: "Asosiy ofis va loyiha joylashuvi",
    description_ru: "Главный офис и место проекта",
    description_en: "Head office and project location",
    description_ar: "المكتب الرئيسي وموقع المشروع",
    description_zh_hans: "主要办公室和项目地点",
  };

  const translations = {
    en: {
      title: "Regions We Serve",
      subtitle: "We Build Homes in 12+ Regions of Uzbekistan",
      description:
        "From Tashkent to Karakalpakstan — quality housing in every corner of the country. Our specialists consider local climate features, traditions, and preferences of residents in each region.",
      projects: "projects",
      mapTitle: "Interactive Map of Uzbekistan",
      mapDesc:
        "In the actual version, there will be a map with region markers here",
    },
    ru: {
      title: "Регионы присутствия",
      subtitle: "Мы строим дома в 12+ регионах Узбекистана",
      description:
        "От Ташкента до Каракалпакстана — качественное жилье в каждом уголке страны. Наши специалисты учитывают особенности местного климата, традиции и предпочтения жителей каждого региона.",
      projects: "проектов",
      mapTitle: "Интерактивная карта Узбекистана",
      mapDesc: "В реальной версии здесь будет карта с метками регионов",
    },
    uz: {
      title: "Faoliyat hududlari",
      subtitle: "O'zbekistonning 12+ hududida uylar quramiz",
      description:
        "Toshkentdan Qoraqalpog'istongacha — mamlakatning har bir burchagida sifatli uy-joy. Mutaxassislarimiz mahalliy iqlim xususiyatlarini, an'analarni va har bir hudud aholisining afzalliklarini hisobga oladilar.",
      projects: "loyiha",
      mapTitle: "O'zbekistonning interaktiv xaritasi",
      mapDesc:
        "Haqiqiy versiyada bu yerda viloyatlar belgilari bilan xarita bo'ladi",
    },
    ar: {
      title: "مناطق التواجد",
      subtitle: "نبني المنازل في أكثر من 12 منطقة في أوزبكستان",
      description:
        "من طشقند إلى قراقالباقستان - سكن عالي الجودة في كل ركن من أركان البلاد. يأخذ متخصصونا في الاعتبار خصائص المناخ المحلي والتقاليد وتفضيلات سكان كل منطقة.",
      projects: "مشاريع",
      mapTitle: "خريطة أوزبكستان التفاعلية",
      mapDesc: "في النسخة الحقيقية ستكون هنا خريطة مع علامات المناطق",
    },
    zh: {
      title: "业务地区",
      subtitle: "我们在乌兹别克斯坦12+个地区建造房屋",
      description:
        "从塔什干到卡拉卡尔帕克斯坦 - 全国各地的优质住房。我们的专家考虑当地气候特点、传统和每个地区居民的喜好。",
      projects: "项目",
      mapTitle: "乌兹别克斯坦互动地图",
      mapDesc: "在实际版本中，这里将显示带有地区标记的地图",
    },
  };

  useEffect(() => {
    const getMapLeaflet = async () => {
      try {
        let { data } = await API.get("/utils/location/");
        // Add real location to the API data or use it as fallback
        const locations = data && data.length > 0 ? data : [realLocation];
        setMapLeaflet(locations);
      } catch (error) {
        console.error("❌ API Error:", error);
        // Fallback to real location if API fails
        setMapLeaflet([realLocation]);
      }
    };
    getMapLeaflet();
  }, []);

  const t = translations[lang];

  const getRegionName = (
    en: string,
    ru: string,
    uz: string,
    ar: string,
    zh: string,
  ) => {
    switch (lang) {
      case "en":
        return en || "";
      case "ru":
        return ru || "";
      case "uz":
        return uz || "";
      case "ar":
        return ar || "";
      case "zh":
        return zh || "";
    }
  };

  return (
    <section id="regions" className="py-20 bg-muted relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-primary">{t.title}</h2>
          <p className="text-xl text-muted-foreground mb-6">{t.subtitle}</p>
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
            {t.description}
          </p>
        </div>

        {/* Map Container - Lower z-index */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg relative z-0">
          <div className="text-center mb-4 relative z-10">
            <h3 className="text-xl font-semibold text-primary">{t.mapTitle}</h3>
          </div>
          <div className="relative z-0">
            <MapLeaflet mapLeaflet={mapLeaflet} />
          </div>
        </div>

        {/* Regions Grid - Higher z-index to appear above map if needed */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-20">
          {mapLeaflet.map((el) => (
            <div
              key={el?.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-1 font-semibold">
                    {getRegionName(
                      el?.address_en || "",
                      el?.address_ru || "",
                      el?.address_uz || "",
                      el?.address_ar || "",
                      el?.address_zh_hans || "",
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getRegionName(
                      el?.description_en || "",
                      el?.description_ru || "",
                      el?.description_uz || "",
                      el?.description_ar || "",
                      el?.description_zh_hans || "",
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    📍 {el.latitude.toFixed(4)}, {el.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}