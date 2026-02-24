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
import logoImage from "figma:asset/a8a43a26e65999af3c44a75491176e4c425dc9f1.png";

interface HeaderProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
  setLang: (lang: "en" | "ru" | "uz" | "ar" | "zh") => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false); // Add this state

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

  // Add this function to handle callback button click
  const handleCallbackClick = () => {
    // Option 1: Scroll to contact form
    scrollToSection("contacts");
    
    // Option 2: Show a callback modal
    // setShowCallbackModal(true);
    
    // Option 3: Open phone app (for mobile)
    // window.location.href = "tel:+998711234567";
    
    // Option 4: Navigate to callback page
    // navigate("/callback-request");
    
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
                  alt="Fayzli Xonadonlar"
                  className="h-11 w-[200px] md:w-auto cursor-pointer"
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
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.catalog}
              </button>
              <button
                onClick={() => scrollToSection("construction")}
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.construction}
              </button>
              <button
                onClick={() => scrollToSection("regions")}
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.regions}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.about}
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-sm text-foreground hover:text-primary transition-colors"
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
                <SelectTrigger className="w-[140px] h-9">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="uz">O'zbek</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
              
              {/* UPDATED BUTTON WITH onClick HANDLER */}
              <Button 
                onClick={handleCallbackClick}
                className="bg-accent text-accent-foreground hover:bg-accent/90 h-9 text-sm"
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
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6 " />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <nav className="flex flex-col px-4 py-4 gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.home}
              </button>
              <button
                onClick={() => {
                  navigate("/catalog");
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.catalog}
              </button>
              <button
                onClick={() => scrollToSection("construction")}
                className="text-left text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.construction}
              </button>
              <button
                onClick={() => scrollToSection("ready")}
                className="text-left text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.ready}
              </button>
              <button
                onClick={() => scrollToSection("regions")}
                className="text-left text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.regions}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.about}
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-left text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.contacts}
              </button>

              <Select
                value={lang}
                onValueChange={(value: string) =>
                  setLang(value as "en" | "ru" | "uz" | "ar" | "zh")
                }
              >
                <SelectTrigger className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="uz">O'zbek</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>

              {/* UPDATED MOBILE BUTTON */}
              <Button 
                onClick={handleCallbackClick}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t.callBack}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Optional: Add a callback modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {t.callBack} {/* Will show "Request a Callback" in English */}
            </h3>
            <p className="mb-4">We'll call you back within 15 minutes.</p>
            {/* Add form fields here */}
            <button 
              onClick={() => setShowCallbackModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}