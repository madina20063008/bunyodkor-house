import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { getAdvertisementBanner } from "../services/dataService";
import { Banner, ReadyHome } from "../services/data.types";

interface BannerProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function Banner({ lang }: BannerProps) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [banners, _setBanners] = useState<Banner[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [advertisementBanner, setAdvertisementBanner] = useState<ReadyHome[]>(
    []
  );

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const data = await getAdvertisementBanner();
        setAdvertisementBanner(data);
      } catch (err) {
        console.error("Error fetching homes:", err);
      }
    };

    fetchHomes();
  }, []);
  useEffect(() => {
    if (advertisementBanner.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % advertisementBanner.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [advertisementBanner.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % advertisementBanner.length);
  };

  const prevBanner = () => {
    setCurrentBanner(
      (prev) =>
        (prev - 1 + advertisementBanner.length) % advertisementBanner.length
    );
  };

  console.log(advertisementBanner);

  console.log(currentBanner);

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl"
        >
          {/* Banners */}
          <div className="relative h-[400px] md:h-[500px]">
            <AnimatePresence mode="wait">
              {advertisementBanner.length > 0 && (
                <motion.div
                  key={currentBanner}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <img
                    src={advertisementBanner[currentBanner]?.images[0]?.image}
                    alt={
                      lang === "ru"
                        ? advertisementBanner[currentBanner]?.title_ru
                        : lang === "uz"
                        ? advertisementBanner[currentBanner]?.title_uz
                        : lang === "ar"
                        ? advertisementBanner[currentBanner]?.title_ar
                        : lang === "en"
                        ? advertisementBanner[currentBanner]?.title_en
                        : advertisementBanner[currentBanner]?.title_zh_hans
                    }
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-3xl md:text-5xl text-white mb-4 drop-shadow-lg"
                    >
                      {lang === "ru"
                        ? advertisementBanner[currentBanner]?.title_ru
                        : lang === "uz"
                        ? advertisementBanner[currentBanner]?.title_uz
                        : lang === "ar"
                        ? advertisementBanner[currentBanner]?.title_ar
                        : lang === "en"
                        ? advertisementBanner[currentBanner]?.title_en
                        : advertisementBanner[currentBanner]?.title_zh_hans}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-xl md:text-2xl text-white/90 drop-shadow-lg"
                    >
                      {lang === "ru"
                        ? advertisementBanner[currentBanner]?.description_ru
                        : lang === "uz"
                        ? advertisementBanner[currentBanner]?.description_uz
                        : lang === "ar"
                        ? advertisementBanner[currentBanner]?.description_ar
                        : lang === "en"
                        ? advertisementBanner[currentBanner]?.title_en
                        : advertisementBanner[currentBanner]
                            ?.description_zh_hans}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {banners.length > 1 && (
            <>
              <motion.button
                onClick={prevBanner}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm p-3 rounded-full transition-all z-10 shadow-lg"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </motion.button>
              <motion.button
                onClick={nextBanner}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm p-3 rounded-full transition-all z-10 shadow-lg"
                aria-label="Next banner"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </motion.button>
            </>
          )}

          {/* Banner Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {advertisementBanner.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentBanner(index)}
                whileHover={{ scale: 1.2 }}
                className={`h-3 rounded-full transition-all ${
                  index === currentBanner
                    ? "bg-accent w-10"
                    : "bg-white/60 w-3 hover:bg-white/80"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}