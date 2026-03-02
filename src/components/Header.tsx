import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import logoImage from "../../public/favicon.jpg";

interface HeaderProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
  setLang: (lang: "en" | "ru" | "uz" | "ar" | "zh") => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  const translations = {
    en: {
      home: "Home",
      catalog: "Catalog",
      construction: "Under Construction",
      ready: "Ready Homes",
      regions: "Regions",
      about: "About Company",
      contacts: "Contacts",
      callBack: "Request a Callback",
    },
    ru: {
      home: "Главная",
      catalog: "Каталог",
      construction: "Строящиеся",
      ready: "Готовые дома",
      regions: "Регионы",
      about: "О компании",
      contacts: "Контакты",
      callBack: "Заказать звонок",
    },
    uz: {
      home: "Bosh sahifa",
      catalog: "Katalog",
      construction: "Qurilish jarayonida",
      ready: "Tayyor uylar",
      regions: "Hududlar",
      about: "Kompaniya haqida",
      contacts: "Aloqa",
      callBack: "Qo'ng'iroq buyurtma qilish",
    },
    ar: {
      home: "الرئيسية",
      catalog: "الكتالوج",
      construction: "قيد الإنشاء",
      ready: "منازل جاهزة",
      regions: "المناطق",
      about: "عن الشركة",
      contacts: "اتصل بنا",
      callBack: "اطلب مكالمة",
    },
    zh: {
      home: "主页",
      catalog: "目录",
      construction: "在建项目",
      ready: "现房",
      regions: "地区",
      about: "关于我们",
      contacts: "联系方式",
      callBack: "预约电话",
    },
  };

  const t = translations[lang];

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

  const handleCallbackClick = () => {
    scrollToSection("contacts");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3"
              >
                <img
                  src={logoImage}
                  alt="Bunyodkor House"
                  className="h-[70px] w-[100px] md:w-auto cursor-pointer"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => {
                  navigate("/catalog");
                  setMobileMenuOpen(false);
                }}
                className="text-sm text-foreground hover:text-blue-600 transition-colors"
              >
                {t.catalog}
              </button>
              <button
                onClick={() => scrollToSection("construction")}
                className="text-sm text-foreground hover:text-blue-600 transition-colors"
              >
                {t.construction}
              </button>
              <button
                onClick={() => scrollToSection("regions")}
                className="text-sm text-foreground hover:text-blue-600 transition-colors"
              >
                {t.regions}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-foreground hover:text-blue-600 transition-colors"
              >
                {t.about}
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-sm text-foreground hover:text-blue-600 transition-colors"
              >
                {t.contacts}
              </button>
            </nav>

            {/* Language Switcher & CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Select
                value={lang}
                onValueChange={(value: string) =>
                  setLang(value as "en" | "ru" | "uz" | "ar" | "zh")
                }
              >
                <SelectTrigger className="w-[140px] h-9 border-gray-300 focus:ring-2 focus:ring-[#0F2B4B] focus:border-[#0F2B4B] data-[state=open]:border-[#0F2B4B] data-[state=open]:ring-2 data-[state=open]:ring-[#0F2B4B]">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-gray-200 shadow-lg">
                  <SelectItem value="ru" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">Русский</SelectItem>
                  <SelectItem value="uz" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">O'zbek</SelectItem>
                  <SelectItem value="en" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">English</SelectItem>
                  <SelectItem value="ar" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">العربية</SelectItem>
                  <SelectItem value="zh" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">中文</SelectItem>
                </SelectContent>
              </Select>

              {/* Callback Button with Warm Terracotta */}
              <Button
                onClick={handleCallbackClick}
                className="bg-[#C2410C] text-white hover:bg-[#9A3412] h-9 text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t.callBack}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col px-4 py-4 gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-sm text-foreground hover:text-[#0F2B4B] transition-colors py-2"
              >
                {t.home}
              </button>
              <button
                onClick={() => {
                  navigate("/catalog");
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm text-foreground hover:text-[#0F2B4B] transition-colors py-2"
              >
                {t.catalog}
              </button>
              <button
                onClick={() => scrollToSection("construction")}
                className="text-left text-sm text-foreground hover:text-[#0F2B4B] transition-colors py-2"
              >
                {t.construction}
              </button>
              <button
                onClick={() => scrollToSection("ready")}
                className="text-left text-sm text-foreground hover:text-[#0F2B4B] transition-colors py-2"
              >
                {t.ready}
              </button>
              <button
                onClick={() => scrollToSection("regions")}
                className="text-left text-sm text-foreground hover:text-[#0F2B4B] transition-colors py-2"
              >
                {t.regions}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-sm text-foreground hover:text-[#0F2B4B] transition-colors py-2"
              >
                {t.about}
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-left text-sm text-foreground hover:text-[#0F2B4B] transition-colors py-2"
              >
                {t.contacts}
              </button>

              <Select
                value={lang}
                onValueChange={(value: string) =>
                  setLang(value as "en" | "ru" | "uz" | "ar" | "zh")
                }
              >
                <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-[#0F2B4B] focus:border-[#0F2B4B] data-[state=open]:border-v data-[state=open]:ring-2 data-[state=open]:ring-[#0F2B4B]">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-gray-200 shadow-lg">
                  <SelectItem value="ru" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">Русский</SelectItem>
                  <SelectItem value="uz" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">O'zbek</SelectItem>
                  <SelectItem value="en" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">English</SelectItem>
                  <SelectItem value="ar" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">العربية</SelectItem>
                  <SelectItem value="zh" className="focus:bg-blue-50 focus:text-[#0F2B4B] data-[highlighted]:bg-blue-50 data-[highlighted]:text-[#0F2B4B]">中文</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Callback Button with Warm Terracotta */}
              <Button
                onClick={handleCallbackClick}
                className="w-full bg-[#C2410C] text-white hover:bg-[#9A3412] transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t.callBack}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Callback Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              {t.callBack}
            </h3>
            <p className="mb-4 text-gray-600">We'll call you back within 15 minutes.</p>
            {/* Add form fields here */}
            <button
              onClick={() => setShowCallbackModal(false)}
              className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}