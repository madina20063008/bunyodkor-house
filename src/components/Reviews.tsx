import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { getReviews } from "../services/dataService"; // Adjust import path as needed
import { Review } from "../services/data.types"; // Adjust import path as needed

interface ReviewsProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function Reviews({ lang }: ReviewsProps) {
  const [currentReview, setCurrentReview] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const translations = {
    en: {
      title: "Customer Reviews",
      subtitle: "Over 300 Happy Families Across Uzbekistan",
      loading: "Loading reviews...",
      error: "Error loading reviews",
    },
    ru: {
      title: "Отзывы наших клиентов",
      subtitle: "Более 300 довольных семей по всему Узбекистану",
      loading: "Загрузка отзывов...",
      error: "Ошибка загрузки отзывов",
    },
    uz: {
      title: "Mijozlarimizning fikrlari",
      subtitle: "Butun O'zbekiston bo'yicha 300 dan ortiq mamnun oila",
      loading: "Sharhlar yuklanmoqda...",
      error: "Sharhlarni yuklashda xatolik",
    },
    ar: {
      title: "آراء عملائنا",
      subtitle: "أكثر من 300 عائلة راضية في جميع أنحاء أوزبكستان",
      loading: "جاري تحميل التقييمات...",
      error: "خطأ في تحميل التقييمات",
    },
    zh: {
      title: "客户评价",
      subtitle: "乌兹别克斯坦各地超过300个满意家庭",
      loading: "正在加载评价...",
      error: "加载评价时出错",
    },
  };

  const t = translations[lang];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await getReviews();
        setReviews(reviewsData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getReviewText = (review: Review) => {
    switch (lang) {
      case "en":
        return review.text_en || review.text;
      case "ru":
        return review.text_ru || review.text;
      case "uz":
        return review.text_uz || review.text;
      case "ar":
        return review.text_ar || review.text;
      case "zh":
        return review.text_zh_hans || review.text;
      default:
        return review.text;
    }
  };

  const getReviewName = (review: Review) => {
    return review.full_name;
  };

  const getReviewLocation = (review: Review) => {
    return review.address;
  };

  const getReviewImage = (review: Review) => {
    return (
      review.image ||
      "https://images.unsplash.com/photo-1513807016779-d51c0c026263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMGhvbWV8ZW58MXx8fHwxNzYwNjgxOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    );
  };

  if (loading) {
    return (
      <section className="py-20 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-muted-foreground">{t.loading}</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-destructive">{t.error}</div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-20 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-muted-foreground">
            No reviews available
          </div>
        </div>
      </section>
    );
  }

  const currentReviewData = reviews[currentReview];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-primary">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Review Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 min-h-[400px] flex flex-col justify-between"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-1 mb-6"
                >
                  {[...Array(currentReviewData.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="w-6 h-6 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl mb-8 italic"
                >
                  {getReviewText(currentReviewData)}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={getReviewImage(currentReviewData)}
                  alt={getReviewName(currentReviewData)}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">
                    {getReviewName(currentReviewData)}
                  </h4>
                  <p className="text-muted-foreground">
                    {getReviewLocation(currentReviewData)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {reviews.length > 1 && (
            <>
              <motion.button
                onClick={prevReview}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 md:-translate-x-16 bg-white shadow-lg hover:shadow-xl p-2 md:p-3 rounded-full transition-all z-10"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </motion.button>
              <motion.button
                onClick={nextReview}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-16 bg-white shadow-lg hover:shadow-xl p-2 md:p-3 rounded-full transition-all z-10"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </motion.button>
            </>
          )}

          {/* Indicators */}
          {reviews.length > 1 && (
            <div className="flex gap-2 justify-center mt-8">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`h-3 rounded-full transition-all ${
                    index === currentReview ? "bg-primary w-8" : "bg-border w-3"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
