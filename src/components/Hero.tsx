import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { getHomepage } from "../services/dataService";
import { Homepage } from "../services/data.types";

interface HeroProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function Hero({ lang }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homepageData, setHomepageData] = useState<Homepage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        const data = await getHomepage();
        if (data && data.length > 0) {
          setHomepageData(data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch homepage data:", err);
        setError("Failed to load homepage data");
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  const translations = {
    en: {
      cta1: "View Ready Homes",
      cta2: "Contact Manager",
    },
    ru: {
      cta1: "Посмотреть готовые дома",
      cta2: "Связаться с менеджером",
    },
    uz: {
      cta1: "Tayyor uylarni ko'rish",
      cta2: "Menejer bilan bog'lanish",
    },
    ar: {
      cta1: "عرض المنازل الجاهزة",
      cta2: "اتصل بالمدير",
    },
    zh: {
      cta1: "查看现房",
      cta2: "联系经理",
    },
  };

  // Get translated content from API
  const getTitle = () => {
    if (!homepageData) return "";

    switch (lang) {
      case "ru":
        return homepageData.title_ru || homepageData.title;
      case "uz":
        return homepageData.title_uz || homepageData.title;
      case "ar":
        return homepageData.title_ar || homepageData.title;
      case "zh":
        return homepageData.title_zh_hans || homepageData.title;
      default:
        return homepageData.title;
    }
  };

  const getSubtitle = () => {
    if (!homepageData) return "";

    switch (lang) {
      case "ru":
        return homepageData.description_ru || homepageData.description;
      case "uz":
        return homepageData.description_uz || homepageData.description;
      case "ar":
        return homepageData.description_ar || homepageData.description;
      case "zh":
        return homepageData.description_zh_hans || homepageData.description;
      default:
        return homepageData.description;
    }
  };

  const t = translations[lang];

  // Get hero images from API or use fallback
  const heroImages = homepageData?.images?.map((img) => img.image) || [
    "https://frankfurt.apollo.olxcdn.com/v1/files/594bevalo7zc3-UZ/image;s=3840x2160",
    "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-hmelnitskiy-yugo-zapadnyy-kamenetskaya-ulitsa__297774585xl.jpg"
  ];

  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section
        id="home"
        className="relative h-screen mt-16 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  if (error && heroImages.length === 0) {
    return (
      <section
        id="home"
        className="relative h-screen mt-16 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-lg text-destructive">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen mt-16">
      {/* Slider - Positioned behind everything with lower z-index */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      

      {/* Navigation Arrows - Positioned above New Year picture */}
      {heroImages.length > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all z-40 pointer-events-auto"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all z-40 pointer-events-auto"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </>
      )}

      {/* Content - Positioned above New Year picture */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            {getTitle()}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            {getSubtitle()}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("ready")}
                className="bg-primary hover:bg-primary/90"
              >
                {t.cta1}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("contacts")}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {t.cta2}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators - Positioned above New Year picture */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              className={`h-3 rounded-full transition-all pointer-events-auto ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 w-3"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}