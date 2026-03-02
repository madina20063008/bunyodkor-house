import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  getAllCommonhouse,
  getCommonhouseAbout,
} from "../services/dataService";
import { Commonhouse, ProjectStats } from "../services/data.types";

interface OurProjectsDetailProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

const translations = {
  en: {
    backToProjects: "Back to Projects",
    ongoingSales: "Sales Ongoing",
    aboutProject: "ABOUT PROJECT",
    blocks: "Blocks",
    apartments: "Apartments",
    phases: "Phases",
    projectArea: "m², project area",
    loading: "Loading project details...",
    error: "Failed to load project details.",
    notFound: "Project not found.",
    address: "Address",
    handover: "Handover",
    class: "Class",
    business: "Business",
    premium: "Premium",
    toBeAnnounced: "To be announced",
    addressNotSpecified: "Address not specified",
  },
  ru: {
    backToProjects: "Назад к проектам",
    ongoingSales: "Идут Продажи",
    aboutProject: "О ПРОЕКТЕ",
    blocks: "Блоков",
    apartments: "Квартир",
    phases: "Фаз",
    projectArea: "м², площадь проекта",
    loading: "Загрузка деталей проекта...",
    error: "Не удалось загрузить детали проекта.",
    notFound: "Проект не найден.",
    address: "Адрес",
    handover: "Сдача",
    class: "Класс",
    business: "Бизнес",
    premium: "Премиум",
    toBeAnnounced: "Будет объявлено",
    addressNotSpecified: "Адрес не указан",
  },
  uz: {
    backToProjects: "Loyihalarga qaytish",
    ongoingSales: "Sotuv Davom Etmoqda",
    aboutProject: "LOYIHA HAQIDA",
    blocks: "Bloklar",
    apartments: "Kvartiralar",
    phases: "Bosqichlar",
    projectArea: "m², loyiha maydoni",
    loading: "Loyiha tafsilotlari yuklanmoqda...",
    error: "Loyiha tafsilotlarini yuklab bo'lmadi.",
    notFound: "Loyiha topilmadi.",
    address: "Manzil",
    handover: "Topshirish",
    class: "Sinf",
    business: "Biznes",
    premium: "Premium",
    toBeAnnounced: "E'lon qilinadi",
    addressNotSpecified: "Manzil ko'rsatilmagan",
  },
  zh: {
    backToProjects: "返回项目",
    ongoingSales: "销售中",
    aboutProject: "关于项目",
    blocks: "区块",
    apartments: "公寓",
    phases: "阶段",
    projectArea: "m², 项目面积",
    loading: "正在加载项目详情...",
    error: "加载项目详情失败。",
    notFound: "未找到项目。",
    address: "地址",
    handover: "交付时间",
    class: "等级",
    business: "商务",
    premium: "高级",
    toBeAnnounced: "待公布",
    addressNotSpecified: "地址未指定",
  },
  ar: {
    backToProjects: "العودة إلى المشاريع",
    ongoingSales: "مبيعات مستمرة",
    aboutProject: "حول المشروع",
    blocks: "كتل",
    apartments: "شقق",
    phases: "مراحل",
    projectArea: "م²، مساحة المشروع",
    loading: "جاري تحميل تفاصيل المشروع...",
    error: "فشل في تحميل تفاصيل المشروع.",
    notFound: "المشروع غير موجود.",
    address: "عنوان",
    handover: "التسليم",
    class: "فئة",
    business: "أعمال",
    premium: "متميز",
    toBeAnnounced: "سيتم الإعلان",
    addressNotSpecified: "العنوان غير محدد",
  },
};

const OurProjectsDetail: React.FC<OurProjectsDetailProps> = ({ lang }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Commonhouse | null>(null);
  const [projectStats, setProjectStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];

  // Helper function to get localized field from Commonhouse
  const getLocalizedField = (
    house: Commonhouse,
    field: "title" | "description",
  ): string => {
    const fieldMap = {
      title: {
        en: house.title_en,
        ru: house.title_ru,
        uz: house.title_uz,
        zh: house.title_zh_hans,
        ar: house.title_ar,
      },
      description: {
        en: house.description_en,
        ru: house.description_ru,
        uz: house.description_uz,
        zh: house.description_zh_hans,
        ar: house.description_ar,
      },
    };

    const localizedValue = fieldMap[field][lang];
    return localizedValue &&
      localizedValue !== "string" &&
      localizedValue.trim() !== ""
      ? localizedValue
      : house[field];
  };

  // Helper function to get localized description from ProjectStats
  const getLocalizedStatsDescription = (stats: ProjectStats): string => {
    const descriptionMap = {
      en: stats.description_en,
      ru: stats.description_ru,
      uz: stats.description_uz,
      zh: stats.description_zh_hans,
      ar: stats.description_ar,
    };

    const localizedDescription = descriptionMap[lang];
    return localizedDescription &&
      localizedDescription !== "string" &&
      localizedDescription.trim() !== ""
      ? localizedDescription
      : stats.description;
  };

  // Helper function to get localized apartments count from ProjectStats
  const getLocalizedApartments = (stats: ProjectStats): number => {
    const apartmentsMap = {
      en: stats.apartments_en,
      ru: stats.apartments_ru,
      uz: stats.apartments_uz,
      zh: stats.apartments_zh_hans,
      ar: stats.apartments_ar,
    };

    const localizedApartments = apartmentsMap[lang];
    // Check if localized value exists and is a valid number
    return localizedApartments !== undefined &&
      localizedApartments !== null &&
      !isNaN(localizedApartments)
      ? localizedApartments
      : stats.apartments;
  };

  // Helper function to get localized class label
  const getLocalizedClassLabel = (className: string): string => {
    if (className === "business") return t.business;
    if (className === "premium") return t.premium;
    return className;
  };

  // Helper function to build address
  const buildAddress = (house: Commonhouse): string => {
    const addressParts = [
      house?.street && house.street !== "string" ? house.street : null,
      house?.house && house.house !== "string" ? house.house : null,
      house?.district && house.district !== "string" ? house.district : null,
      house?.region && house.region !== "string" ? house.region : null,
    ].filter(Boolean);

    return addressParts.length > 0
      ? addressParts.join(", ")
      : t.addressNotSpecified;
  };

  // Helper function to generate ID from title (same as in OurProjects component)
  const generateIdFromTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Helper function to format handover date
  const formatHandoverDate = (handover: string): string => {
    if (!handover || handover === "string") return t.toBeAnnounced;

    // Check if it's a quarter format like "4th Quarter 2027"
    const quarterMatch = handover.match(
      /(\d+)(?:st|nd|rd|th) Quarter (\d{4})/i,
    );
    if (quarterMatch) {
      const quarter = quarterMatch[1];
      const year = quarterMatch[2];
      return `${quarter} квартал ${year}`;
    }

    return handover;
  };

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!projectId) {
        setError(t.notFound);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("🔄 Starting to fetch project details...");

        // Fetch all projects and stats
        const [allProjects, allStats] = await Promise.all([
          getAllCommonhouse(),
          getCommonhouseAbout(),
        ]);

        console.log("📦 All projects:", allProjects);
        console.log("📊 All stats:", allStats);
        console.log("🔍 Looking for project ID:", projectId);

        // Find the project by matching the generated ID
        const foundProject = allProjects.find((project) => {
          const title = getLocalizedField(project, "title");
          const generatedId = generateIdFromTitle(title);
          console.log(
            `🔍 Comparing project: "${generatedId}" with "${projectId}"`,
          );
          return generatedId === projectId;
        });

        console.log("✅ Found project:", foundProject);

        if (foundProject) {
          setProject(foundProject);

          // Find the corresponding stats for this project using commonhouse ID
          const foundStats = allStats.find((stats) => {
            console.log(
              `📊 Comparing stats: stats.commonhouse=${stats.commonhouse} with project.id=${foundProject.id}`,
            );
            return stats.commonhouse === foundProject.id;
          });

          console.log("✅ Found stats:", foundStats);

          if (foundStats) {
            console.log("📈 Stats details:", {
              blocks: foundStats.blocks,
              apartments: foundStats.apartments,
              phases: foundStats.phases,
              projectArea: foundStats.projectarea,
              localizedApartments: getLocalizedApartments(foundStats),
            });
          }

          setProjectStats(foundStats || null);
        } else {
          console.log("❌ Project not found");
          setError(t.notFound);
        }
      } catch (err) {
        console.error("❌ Error fetching project details:", err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId, lang, t]);

  const handleBackClick = () => {
    console.log("🔙 Back button clicked");
    console.log("📍 Current projectId:", projectId);
    console.log("🔄 Navigating to home page...");

    // Try with different navigation options
    navigate("/", { replace: true });

    // Alternatively, try window.location as a fallback
    // window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-gray-600">{t.loading}</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-lg text-red-600 mb-4">{error || t.notFound}</div>
        <button
          type="button"
          onClick={handleBackClick}
          className="flex items-center gap-2 hover:text-gray-300 transition cursor-pointer relative z-50"
          style={{ position: "relative", zIndex: 1000 }}
        >
          <ArrowLeft size={20} />
          {t.backToProjects}
        </button>
      </div>
    );
  }

  const title = getLocalizedField(project, "title");
  const description = getLocalizedField(project, "description");
  const heroImage =
    project?.commonmainimage?.[0]?.image ||
    project?.commonadvimage?.[0]?.image ||
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80";
  const aboutImage = project?.commonadvimage?.[0]?.image || heroImage;
  const address = buildAddress(project);
  const handover = formatHandoverDate(project?.handover);

  // Determine class based on title (same logic as in OurProjects)
  const titleForClass = title.toUpperCase();
  const className =
    titleForClass.includes("RESIDENCE") || titleForClass.includes("BUSINESS")
      ? "business"
      : "premium";
  const classLabel = getLocalizedClassLabel(className);

  // Get stats data from API with fallbacks - ensure we're using the actual stats data
  const stats = {
    blocks: projectStats?.blocks ?? 0,
    apartments: projectStats ? getLocalizedApartments(projectStats) : 0,
    phases: projectStats?.phases ?? 1,
    area: projectStats?.projectarea ?? "0",
  };

  console.log("🎯 Final stats to display:", stats);

  const displayDescription = projectStats
    ? getLocalizedStatsDescription(projectStats)
    : description;

  return (
    <div className="min-h-screen bg-white ">
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Background overlay - LOWEST z-index */}
        <div
          className="absolute inset-0 bg-black bg-opacity-30"
          style={{ zIndex: 1 }}
        ></div>

        {/* Navigation - HIGHEST z-index */}
        <nav
          className="relative z-50 flex items-center justify-between px-8 text-white pt-20"
          style={{ zIndex: 100 }}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBackClick}
              className="text-[14px] md:text-[18px] flex items-center gap-2 hover:text-gray-300 transition cursor-pointer relative"
              style={{ zIndex: 101 }}
            >
              <ArrowLeft size={20} />
              {t.backToProjects}
            </button>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-full">
            <span className="text-sm font-medium text-black">
              {t.ongoingSales}
            </span>
          </div>
        </nav>

        {/* Hero content - MIDDLE z-index */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 10 }}
        >
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-serif tracking-wider mb-4">
              {title.split(" ")[0]}
            </h1>
            <p className="text-xl md:text-3xl font-light tracking-widest">
              {title.split(" ").slice(1).join(" ")}
            </p>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[#0F2B4B] opacity-95"></div>

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="container mx-auto px-8 relative z-10 mt-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-2xl md:text-5xl font-serif text-amber-100 mb-8 tracking-wide">
                {t.aboutProject}
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-gray-300">{t.class}: </span>
                  <span className="text-amber-100 font-medium">
                    {classLabel}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">{t.address}: </span>
                  <span className="text-amber-100">{address}</span>
                </div>
                <div>
                  <span className="text-gray-300">{t.handover}: </span>
                  <span className="text-amber-100 font-medium">{handover}</span>
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed mb-12">
                <p>{displayDescription}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-amber-100 mb-2">
                    {stats.blocks}
                  </div>
                  <div className="text-[14px] md:text-sm text-gray-300">
                    {t.blocks}
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-amber-100 mb-2">
                    {stats.apartments}
                  </div>
                  <div className="text-[14px] md:text-sm text-gray-300">
                    {t.apartments}
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-amber-100 mb-2">
                    {stats.phases}
                  </div>
                  <div className="text-[14px] md:text-sm text-gray-300">
                    {t.phases}
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl font-bold text-amber-100 mb-2">
                    {stats.area}
                  </div>
                  <div className="text-[14px] md:text-sm text-gray-300">
                    {t.projectArea}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={aboutImage}
                alt={`${title} Aerial View`}
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurProjectsDetail;
