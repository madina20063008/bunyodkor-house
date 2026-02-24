import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import React from "react";

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
  lang?: "en" | "ru" | "uz" | "ar" | "zh";
}

export function ImageGallery({
  images,
  initialIndex = 0,
  lang = "ru",
}: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const translations = {
    en: {
      view: "View",
      close: "Close",
      previous: "Previous",
      next: "Next",
    },
    ru: {
      view: "Просмотр",
      close: "Закрыть",
      previous: "Предыдущее",
      next: "Следующее",
    },
    uz: {
      view: "Ko'rish",
      close: "Yopish",
      previous: "Oldingi",
      next: "Keyingi",
    },
    ar: {
      view: "عرض",
      close: "إغلاق",
      previous: "السابق",
      next: "التالي",
    },
    zh: {
      view: "查看",
      close: "关闭",
      previous: "上一个",
      next: "下一个",
    },
  };

  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative h-[350px] rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all bg-muted"
          >
            <ImageWithFallback
              src={image}
              alt={`Interior ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            />

            {/* Overlay with View Button */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Button
                    onClick={() => handleImageClick(index)}
                    size="lg"
                    className="bg-white/95 hover:bg-white text-primary shadow-2xl backdrop-blur-sm gap-2"
                  >
                    <Maximize2 className="w-5 h-5" />
                    <span>{t.view}</span>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {index + 1} / {images.length}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Gallery Viewer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-[101] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors group"
            >
              <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.15 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-[101] px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <p className="text-white">
                {currentIndex + 1} / {images.length}
              </p>
            </motion.div>

            {/* Main Image Container */}
            <div
              className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-[95vw] max-h-[85vh] flex items-center justify-center"
                >
                  <ImageWithFallback
                    src={images[currentIndex]}
                    alt={`Interior ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                {/* Previous Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[101] p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform duration-300" />
                </motion.button>

                {/* Next Button */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[101] p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </>
            )}

            {/* Thumbnail Navigation (for desktop) */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.25 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[101] hidden md:flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      index === currentIndex
                        ? "ring-2 ring-white scale-110 shadow-xl"
                        : "opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
