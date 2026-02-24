import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { getInProgress } from "../services/dataService";
import { InProgress } from "../services/data.types";

interface UnderConstructionProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="h-3 bg-gray-200 rounded mb-1 w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-200 rounded mb-1 w-16"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="h-10 bg-gray-300 rounded mt-auto"></div>
      </div>
    </div>
  );
}

export function UnderConstruction({ lang }: UnderConstructionProps) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [constructionProjects, setConstructionProjects] = useState<
    InProgress[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Add timeout to prevent hanging requests
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        );

        const projectsPromise = getInProgress();

        const projects = await Promise.race([projectsPromise, timeoutPromise]);
        setConstructionProjects(projects);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch construction projects:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load construction projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const translations = {
    en: {
      title: "Projects in Progress",
      subtitle: "Track the Construction Progress of Your Future Homes",
      progress: "Progress",
      deadline: "Deadline",
      stage: "Current Stage",
      invest: "Invest in Construction",
      loading: "Loading projects...",
      error: "Error loading projects",
      retry: "Try Again",
    },
    ru: {
      title: "Объекты в работе",
      subtitle: "Следите за прогрессом строительства ваших будущих домов",
      progress: "Прогресс",
      deadline: "Срок сдачи",
      stage: "Текущий этап",
      invest: "Инвестировать в строительство",
      loading: "Загрузка проектов...",
      error: "Ошибка загрузки проектов",
      retry: "Попробовать снова",
    },
    uz: {
      title: "Qurilish jarayonidagi ob'yektlar",
      subtitle: "Kelajakdagi uylaringizning qurilish jarayonini kuzatib boring",
      progress: "Taraqqiyot",
      deadline: "Topshirish muddati",
      stage: "Hozirgi bosqich",
      invest: "Qurilishga investitsiya qilish",
      loading: "Loyihalar yuklanmoqda...",
      error: "Loyihalarni yuklashda xatolik",
      retry: "Qayta urinish",
    },
    ar: {
      title: "المشاريع قيد التنفيذ",
      subtitle: "تابع تقدم بناء منازل المستقبل",
      progress: "التقدم",
      deadline: "موعد التسليم",
      stage: "المرحلة الحالية",
      invest: "الاستثمار في البناء",
      loading: "جاري تحميل المشاريع...",
      error: "خطأ في تحميل المشاريع",
      retry: "إعادة المحاولة",
    },
    zh: {
      title: "在建项目",
      subtitle: "跟踪您未来家园的建设进度",
      progress: "进度",
      deadline: "交付日期",
      stage: "当前阶段",
      invest: "投资建设",
      loading: "正在加载项目...",
      error: "加载项目时出错",
      retry: "重试",
    },
  };

  const t = translations[lang];

  const formatDeadline = (deadline: string) => {
    try {
      const date = new Date(deadline);
      const months =
        lang === "ru"
          ? [
              "Янв",
              "Фев",
              "Мар",
              "Апр",
              "Май",
              "Июн",
              "Июл",
              "Авг",
              "Сен",
              "Окт",
              "Ноя",
              "Дек",
            ]
          : lang === "uz"
          ? [
              "Yan",
              "Fev",
              "Mar",
              "Apr",
              "May",
              "Iyun",
              "Iyul",
              "Avg",
              "Sen",
              "Okt",
              "Noy",
              "Dek",
            ]
          : lang === "ar"
          ? [
              "يناير",
              "فبراير",
              "مارس",
              "أبريل",
              "مايو",
              "يونيو",
              "يوليو",
              "أغسطس",
              "سبتمبر",
              "أكتوبر",
              "نوفمبر",
              "ديسمبر",
            ]
          : [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ];

      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${month} ${year}`;
    } catch {
      return deadline;
    }
  };

  const getProjectName = (project: InProgress) => {
    switch (lang) {
      case "ru":
        return project.title_ru || project.title;
      case "uz":
        return project.title_uz || project.title;
      case "ar":
        return project.title_ar || project.title;
      case "zh":
        return project.title_zh_hans || project.title;
      default:
        return project.title;
    }
  };

  const getProjectStage = (project: InProgress) => {
    switch (lang) {
      case "ru":
        return project.stage_ru || project.stage;
      case "uz":
        return project.stage_uz || project.stage;
      case "ar":
        return project.stage_ar || project.stage;
      case "zh":
        return project.stage_zh_hans || project.stage;
      default:
        return project.stage;
    }
  };

  const getProjectImage = (project: InProgress) => {
    return project.images && project.images.length > 0
      ? project.images[0].image
      : "https://images.unsplash.com/photo-1593786267440-550458cc882a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHVuZGVyJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2MDY5MzU5NHww&ixlib=rb-4.1.0&q=80&w=1080";
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      fetchProjects();
    }, 100);
  };

  const fetchProjects = async () => {
    try {
      const projects = await getInProgress();
      setConstructionProjects(projects);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch construction projects:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load construction projects"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="construction" className="py-20 bg-muted" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="construction" className="py-20 bg-muted" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-destructive mb-4">{t.error}</div>
          <Button
            onClick={retryFetch}
            className="bg-primary hover:bg-primary/90"
          >
            {t.retry}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="construction" className="py-20 bg-muted" ref={ref}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {constructionProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="relative overflow-hidden group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={getProjectImage(project)}
                  alt={getProjectName(project)}
                  className="w-full h-64 object-cover"
                  loading="lazy" // Add lazy loading for images
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full"
                >
                  <span className="text-primary">{project.progress}%</span>
                </motion.div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl mb-2">{getProjectName(project)}</h3>
                <p className="text-muted-foreground mb-4">{project.address}</p>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>{t.progress}</span>
                    <span className="text-primary">{project.progress}%</span>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    style={{ transformOrigin: "left" }}
                  >
                    <Progress
                      value={parseInt(project.progress) || 0}
                      className="h-2"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {t.deadline}
                    </p>
                    <p>{formatDeadline(project.overdate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {t.stage}
                    </p>
                    <p className="leading-snug">{getProjectStage(project)}</p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto"
                >
                  <Button
                    onClick={() =>
                      navigate("/investment", { state: { project } })
                    }
                    className="w-full bg-secondary hover:bg-secondary/90"
                  >
                    {t.invest}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
