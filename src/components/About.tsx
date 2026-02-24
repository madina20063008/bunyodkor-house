import { Building2, Shield, Users } from "lucide-react";
import React, { useState, useEffect } from "react";
import { getAbout } from "../services/dataService"; // Adjust import path
import { About } from "../services/data.types"; // Adjust import path

interface AboutProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function About({ lang }: AboutProps) {
  const [aboutData, setAboutData] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const data = await getAbout();
        // Assuming the API returns an array, take the first item
        if (data && data.length > 0) {
          setAboutData(data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch about data:", err);
        setError("Failed to load about information");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const translations = {
    en: {
      title: "About Company",
      experienceDesc: "years of construction experience",
      projectsDesc: "completed projects",
      guaranteeDesc: "quality guarantee",
      advantage1: "Eco-friendly materials",
      advantage1Desc: "Adapted to hot climate conditions",
      advantage2: "Modern technologies",
      advantage2Desc: "Energy efficiency and comfort",
      advantage3: "Individual approach",
      advantage3Desc: "Considering Uzbek traditions",
      loading: "Loading company information...",
      error: "Error loading company information",
    },
    ru: {
      title: "О компании",
      experienceDesc: "опыта в строительстве",
      projectsDesc: "сданных объектов",
      guaranteeDesc: "гарантия качества",
      advantage1: "Экологичные материалы",
      advantage1Desc: "Адаптированные к жаркому климату",
      advantage2: "Современные технологии",
      advantage2Desc: "Энергоэффективность и комфорт",
      advantage3: "Индивидуальный подход",
      advantage3Desc: "С учетом узбекских традиций",
      loading: "Загрузка информации о компании...",
      error: "Ошибка загрузки информации о компании",
    },
    uz: {
      title: "Kompaniya haqida",
      experienceDesc: "qurilish tajribasi",
      projectsDesc: "topshirilgan ob'yektlar",
      guaranteeDesc: "sifat kafolati",
      advantage1: "Ekologik toza materiallar",
      advantage1Desc: "Issiq iqlimga moslashtirilgan",
      advantage2: "Zamonaviy texnologiyalar",
      advantage2Desc: "Energiya tejamkorligi va qulaylik",
      advantage3: "Individual yondashuv",
      advantage3Desc: "O'zbek an'analarini hisobga olgan holda",
      loading: "Kompaniya ma'lumotlari yuklanmoqda...",
      error: "Kompaniya ma'lumotlarini yuklashda xatolik",
    },
    ar: {
      title: "عن الشركة",
      experienceDesc: "خبرة في البناء",
      projectsDesc: "مشاريع منجزة",
      guaranteeDesc: "ضمان الجودة",
      advantage1: "مواد صديقة للبيئة",
      advantage1Desc: "متكيفة مع المناخ الحار",
      advantage2: "تقنيات حديثة",
      advantage2Desc: "كفاءة الطاقة والراحة",
      advantage3: "نهج فردي",
      advantage3Desc: "مع مراعاة التقاليد الأوزبكية",
      loading: "جاري تحميل معلومات الشركة...",
      error: "خطأ في تحميل معلومات الشركة",
    },
    zh: {
      title: "关于我们",
      experienceDesc: "建筑经验",
      projectsDesc: "已完成项目",
      guaranteeDesc: "质量保证",
      advantage1: "环保材料",
      advantage1Desc: "适应炎热气候",
      advantage2: "现代技术",
      advantage2Desc: "节能舒适",
      advantage3: "个性化方法",
      advantage3Desc: "考虑乌兹别克传统",
      loading: "正在加载公司信息...",
      error: "加载公司信息时出错",
    },
  };

  const t = translations[lang];

  // Get description in correct language
  const getDescription = () => {
    if (!aboutData) return "";

    switch (lang) {
      case "en":
        return aboutData.description_en || aboutData.description;
      case "ru":
        return aboutData.description_ru || aboutData.description;
      case "uz":
        return aboutData.description_uz || aboutData.description;
      case "ar":
        return aboutData.description_ar || aboutData.description;
      case "zh":
        return aboutData.description_zh_hans || aboutData.description;
      default:
        return aboutData.description;
    }
  };

  // Get stats from API or use fallback
  const getExperience = () => {
    return aboutData?.experience;
  };

  const getProjects = () => {
    return aboutData?.ourobjects;
  };

  const getGuarantee = () => {
    return aboutData?.guarantee;
  };

  if (loading) {
    return (
      <section id="about" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-muted-foreground">{t.loading}</div>
        </div>
      </section>
    );
  }

  if (error && !aboutData) {
    return (
      <section id="about" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-destructive">{t.error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-primary">{t.title}</h2>
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
            {getDescription()}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm">
            <div className="text-4xl md:text-5xl text-primary mb-2">
              {getExperience()}
            </div>
            <p className="text-muted-foreground">{t.experienceDesc}</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-sm">
            <div className="text-4xl md:text-5xl text-secondary mb-2">
              {getProjects()}
            </div>
            <p className="text-muted-foreground">{t.projectsDesc}</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-sm">
            <div className="text-4xl md:text-5xl text-accent mb-2">
              {getGuarantee()}
            </div>
            <p className="text-muted-foreground">{t.guaranteeDesc}</p>
          </div>
        </div>

        {/* Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl mb-2">{t.advantage1}</h3>
            <p className="text-muted-foreground">{t.advantage1Desc}</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl mb-2">{t.advantage2}</h3>
            <p className="text-muted-foreground">{t.advantage2Desc}</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl mb-2">{t.advantage3}</h3>
            <p className="text-muted-foreground">{t.advantage3Desc}</p>
          </div>
        </div>

        {/* Team Photo */}
        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1684497404598-6e844dff9cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtJTIwd29ya2Vyc3xlbnwxfHx8fDE3NjA2NzM5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team"
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
