import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logoImage from "../../public/favicon.jpg";
import { getContact } from "../services/dataService"; // Adjust import path
import { ContactInfo } from "../services/data.types"; // Adjust import path

interface FooterProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function Footer({ lang }: FooterProps) {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        const data = await getContact();
        // Assuming the API returns an array, take the first item
        if (data && data.length > 0) {
          setContactData(data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch contact data:", err);
        setError("Failed to load contact information");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);
 const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };
  const translations = {
    en: {
      company: "Company",
      aboutUs: "About Us",
      projects: "Projects",
      contacts: "Contacts",
      services: "Services",
      design: "Design",
      construction: "Construction",
      readyHomes: "Ready Homes",
      investment: "Investment",
      consulting: "Consulting",
      legal: "Legal Information",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      copyright: "© 2025 Bunyodkor House. All rights reserved.",
      address: "Karshi city, Gungon neighborhood, Alisher Navoiy street, house 6",
      phone1: "+998 77 742 49 94",
      phone2: "+998 77 742 48 84",
      email: "info@bunyonkorhouse.uz",
      loading: "Loading contact information...",
    },
    ru: {
      company: "О компании",
      aboutUs: "О нас",
      projects: "Проекты",
      contacts: "Контакты",
      services: "Услуги",
      design: "Проектирование",
      construction: "Строительство",
      readyHomes: "Готовые дома",
      investment: "Инвестиции",
      consulting: "Консультации",
      legal: "Правовая информация",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      copyright: "© 2025 Bunyodkor House. Все права защищены.",
      address: "г. Карши, квартал Гунгон, улица Алишера Навои, дом 6",
      phone1: "+998 77 742 49 94",
      phone2: "+998 77 742 48 84",
      email: "info@bunyonkorhouse.uz",
      loading: "Загрузка контактной информации...",
    },
    uz: {
      company: "Kompaniya haqida",
      aboutUs: "Biz haqimizda",
      projects: "Loyihalar",
      contacts: "Aloqa",
      services: "Xizmatlar",
      design: "Loyihalash",
      construction: "Qurilish",
      readyHomes: "Tayyor uylar",
      investment: "Investitsiyalar",
      consulting: "Konsultatsiyalar",
      legal: "Huquqiy ma'lumot",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
      copyright: "© 2025 Bunyodkor House. Barcha huquqlar himoyalangan.",
      address: "Qarshi shahri, Gungon mahallasi, Alisher Navoiy ko'chasi 6-uy",
      phone1: "+998 77 742 49 94",
      phone2: "+998 77 742 48 84",
      email: "info@bunyonkorhouse.uz",
      loading: "Kontakt ma'lumotlari yuklanmoqda...",
    },
    ar: {
      company: "عن الشركة",
      aboutUs: "من نحن",
      projects: "المشاريع",
      contacts: "الاتصال",
      services: "الخدمات",
      design: "التصميم",
      construction: "البناء",
      readyHomes: "منازل جاهزة",
      investment: "الاستثمارات",
      consulting: "استشارات",
      legal: "المعلومات القانونية",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      copyright: "© 2025 Bunyodkor House. جميع الحقوق محفوظة.",
      address: "طشقند، شارع أمير تيمور، مدينة كرشي حي جونجون شارع عليشر نووي منزل 6",
      phone1: "+998 77 742 49 94",
      phone2: "+998 77 742 48 84",
      email: "info@bunyonkorhouse.uz",
      loading: "جاري تحميل معلومات الاتصال...",
    },
    zh: {
      company: "关于公司",
      aboutUs: "关于我们",
      projects: "项目",
      contacts: "联系方式",
      services: "服务",
      design: "设计",
      construction: "建设",
      readyHomes: "现房",
      investment: "投资",
      consulting: "咨询",
      legal: "法律信息",
      privacy: "隐私政策",
      terms: "使用条款",
      copyright: "© 2025 Bunyodkor House. 版权所有。",
      address: "卡爾希市，Gungon 社區，Alisher Navoiy 街，6 號房",
      phone1: "+998 77 742 49 94",
      phone2: "+998 77 742 48 84",
      email: "info@bunyonkorhouse.uz",
      loading: "正在加载联系信息...",
    },
  };

  const t = translations[lang];

  // Fallback data in case API fails
  const fallbackData = {
    address: t.address,
    phone1: t.phone1,
    phone2: t.phone2,
    email: t.email,
  };

  // Use API data or fallback data
  const displayData = contactData || {
    full_address: fallbackData.address,
    phone_number1: fallbackData.phone1,
    phone_number2: fallbackData.phone2,
    email: fallbackData.email,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <footer className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-white/70">{t.loading}</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoImage}
                alt="Bunyodkor House"
                className="h-[150px] w-auto"
              />
            </div>
            <p className="text-white/70 mb-4">
              {lang === "ru"
                ? "Строим дома мечты в любом регионе Узбекистана с 2014 года."
                : lang === "uz"
                  ? "2014 yildan beri O'zbekistonning istalgan hududida orzu uylarini quramiz."
                  : lang === "en"
                    ? "Since 2014, we have been building dream homes with the help of Uzbekistan."
                    : lang === "ar"
                      ? "نبني منازل الأحلام في أي منطقة في أوزبكستان منذ عام 2014."
                      : "自2014年以来在乌兹别克斯坦任何地区建造梦想之家。"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">{t.company}</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-white transition-colors"
                >
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("our-projects")}
                  className="hover:text-white transition-colors"
                >
                  {t.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contacts")}
                  className="hover:text-white transition-colors"
                >
                  {t.contacts}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4">{t.services}</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {t.design}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("construction")}
                  className="hover:text-white transition-colors"
                >
                  {t.construction}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ready")}
                  className="hover:text-white transition-colors"
                >
                  {t.readyHomes}
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => scrollToSection("inverstment")}
                  className="hover:text-white transition-colors"
                >
                  {t.investment}
                </button>
              </li> */}
              {/* <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {t.consulting}
                </button>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4">{t.contacts}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{displayData.full_address}</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{displayData.phone_number1}</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{displayData.phone_number2}</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{displayData.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">{t.copyright}</p>
            {/* <div className="flex gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">
                {t.privacy}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t.terms}
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
