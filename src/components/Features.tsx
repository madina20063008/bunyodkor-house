import React from "react";
import { Shield, Car, Baby } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import playground from "../assets/playground.jpg"

interface FeaturesProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function Features({ lang }: FeaturesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const translations = {
    en: {
      title: "Comfort and Security for Your Family",
      subtitle:
        "All our residential complexes are equipped with modern infrastructure",
      security: "24/7 Security",
      securityDesc:
        "Round-the-clock security with video surveillance and access control. Professional security service ensures residents' peace of mind.",
      parking: "Parking Spaces",
      parkingDesc:
        "Spacious parking for residents and guests. Each apartment has an assigned parking space with convenient access to the entrance.",
      playground: "Children's Playgrounds",
      playgroundDesc:
        "Modern play areas with safe surfacing and playground equipment. Playgrounds are located in courtyards protected from traffic.",
      securityFeatures: "Security system includes:",
      securityList: [
        "Perimeter video surveillance",
        "Access control with intercom",
        "24/7 security service",
        "Territory lighting",
      ],
      parkingFeatures: "Parking amenities:",
      parkingList: [
        "Assigned parking for residents",
        "Guest parking",
        "Convenient entry/exit",
        "Well-lit area",
      ],
      playgroundFeatures: "Children's areas include:",
      playgroundList: [
        "Play complexes for different ages",
        "Safe rubber surfacing",
        "Parent relaxation area",
        "Sun protection",
      ],
    },
    ru: {
      title: "Комфорт и безопасность для вашей семьи",
      subtitle: "Все наши жилые комплексы оснащены современной инфраструктурой",
      security: "Безопасность 24/7",
      securityDesc:
        "Круглосуточная охрана с видеонаблюдением и контролем доступа. Профессиональная служба безопасности обеспечивает спокойствие жителей.",
      parking: "Парковочные места",
      parkingDesc:
        "Просторные парковки для жителей и гостей. Каждая квартира имеет закрепленное парковочное место с удобным доступом к подъезду.",
      playground: "Детские площадки",
      playgroundDesc:
        "Современные игровые зоны с безопасным покрытием и игровым оборудованием. Площадки расположены во дворах, защищенных от проезжей части.",
      securityFeatures: "Система безопасности включает:",
      securityList: [
        "Видеонаблюдение по периметру",
        "Контроль доступа с домофоном",
        "Охранная служба 24/7",
        "Освещение территории",
      ],
      parkingFeatures: "Парковочные удобства:",
      parkingList: [
        "Закрепленные места для жильцов",
        "Гостевая парковка",
        "Удобный въезд/выезд",
        "Освещенная территория",
      ],
      playgroundFeatures: "Детские зоны включают:",
      playgroundList: [
        "Игровые комплексы для разных возрастов",
        "Безопасное резиновое покрытие",
        "Зона отдыха для родителей",
        "Защита от солнца",
      ],
    },
    uz: {
      title: "Oilangiz uchun qulaylik va xavfsizlik",
      subtitle:
        "Barcha turar joy majmualarimiz zamonaviy infratuzilma bilan jihozlangan",
      security: "Xavfsizlik 24/7",
      securityDesc:
        "Video kuzatuv va kirish nazorati bilan kunlik qorovullik xizmati. Professional xavfsizlik xizmati aholi tinchligini ta'minlaydi.",
      parking: "Avtoturargoh joylari",
      parkingDesc:
        "Aholi va mehmonlar uchun keng avtoturargohlar. Har bir kvartiraga kirish qulayligi bilan biriktirilgan avtoturargoh joyi beriladi.",
      playground: "Bolalar maydonchasi",
      playgroundDesc:
        "Xavfsiz qoplama va o'yin uskunalari bilan zamonaviy o'yin zonalari. Maydonchalar yo'l qismidan himoyalangan hovlilarda joylashgan.",
      securityFeatures: "Xavfsizlik tizimi o'z ichiga oladi:",
      securityList: [
        "Perimetr bo'ylab videokuzatuv",
        "Domofon bilan kirish nazorati",
        "Qorovullik xizmati 24/7",
        "Hududni yoritish",
      ],
      parkingFeatures: "Avtoturargoh qulayliklari:",
      parkingList: [
        "Aholiga biriktirilgan joylar",
        "Mehmonlar avtoturargoh",
        "Qulay kirish/chiqish",
        "Yoritilgan hudud",
      ],
      playgroundFeatures: "Bolalar zonalari o'z ichiga oladi:",
      playgroundList: [
        "Turli yoshdagi bolalar uchun o'yin majmualari",
        "Xavfsiz rezina qoplama",
        "Ota-onalar uchun dam olish zonasi",
        "Quyoshdan himoya",
      ],
    },
    ar: {
      title: "الراحة والأمان لعائلتك",
      subtitle: "جميع مجمعاتنا السكنية مجهزة بالبنية التحتية الحديثة",
      security: "أمن 24/7",
      securityDesc:
        "حراسة على مدار الساعة مع المراقبة بالفيديو والتحكم في الدخول. توفر خدمة الأمن المحترفة راحة البال للسكان.",
      parking: "أماكن وقوف السيارات",
      parkingDesc:
        "مواقف واسعة للسكان والضيوف. كل شقة لديها مكان مخصص لوقوف السيارات مع سهولة الوصول إلى المدخل.",
      playground: "ملاعب الأطفال",
      playgroundDesc:
        "مناطق لعب حديثة بأرضيات آمنة ومعدات لعب. الملاعب تقع في الساحات المحمية من الطريق.",
      securityFeatures: "يشمل نظام الأمن:",
      securityList: [
        "مراقبة فيديو محيطية",
        "التحكم في الدخول بالاتصال الداخلي",
        "خدمة الأمن 24/7",
        "إضاءة المنطقة",
      ],
      parkingFeatures: "مرافق وقوف السيارات:",
      parkingList: [
        "أماكن مخصصة للسكان",
        "موقف للضيوف",
        "دخول/خروج مريح",
        "منطقة مضاءة",
      ],
      playgroundFeatures: "تشمل مناطق الأطفال:",
      playgroundList: [
        "مجمعات لعب لمختلف الأعمار",
        "أرضية مطاطية آمنة",
        "منطقة استراحة للآباء",
        "حماية من الشمس",
      ],
    },
    zh: {
      title: "为您的家庭提供舒适和安全",
      subtitle: "我们所有的住宅小区都配备现代化基础设施",
      security: "24/7安保",
      securityDesc:
        "配备视频监控和门禁系统的全天候保安。专业保安服务确保居民的安宁。",
      parking: "停车位",
      parkingDesc:
        "为居民和访客提供宽敞的停车场。每套公寓都有固定停车位，方便进入楼门。",
      playground: "儿童游乐场",
      playgroundDesc:
        "配备安全地面和游乐设备的现代游戏区。游乐场位于远离道路的院子里。",
      securityFeatures: "安保系统包括：",
      securityList: [
        "周边视频监控",
        "对讲机门禁系统",
        "24/7保安服务",
        "区域照明",
      ],
      parkingFeatures: "停车便利设施：",
      parkingList: ["居民固定车位", "访客停车场", "便捷进出", "照明区域"],
      playgroundFeatures: "儿童区包括：",
      playgroundList: [
        "不同年龄段的游乐设施",
        "安全橡胶地面",
        "家长休息区",
        "遮阳设施",
      ],
    },
  };

  const t = translations[lang];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="features" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-primary">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-muted p-8 rounded-2xl flex flex-col h-full"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 flex-shrink-0"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl mb-4 text-primary">{t.security}</h3>
            <p className="text-muted-foreground mb-6">{t.securityDesc}</p>
            <div className="space-y-2 mt-auto">
              <p className="text-sm">{t.securityFeatures}</p>
              <ul className="space-y-2">
                {t.securityList.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-muted p-8 rounded-2xl flex flex-col h-full"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 flex-shrink-0"
            >
              <Car className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl mb-4 text-secondary">{t.parking}</h3>
            <p className="text-muted-foreground mb-6">{t.parkingDesc}</p>
            <div className="space-y-2 mt-auto">
              <p className="text-sm">{t.parkingFeatures}</p>
              <ul className="space-y-2">
                {t.parkingList.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-secondary mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-muted p-8 rounded-2xl flex flex-col h-full"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6 flex-shrink-0"
            >
              <Baby className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl mb-4 text-accent">{t.playground}</h3>
            <p className="text-muted-foreground mb-6">{t.playgroundDesc}</p>
            <div className="space-y-2 mt-auto">
              <p className="text-sm">{t.playgroundFeatures}</p>
              <ul className="space-y-2">
                {t.playgroundList.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              src: "https://www.gensecurity.com/hs-fs/hubfs/GenSec_November%20Blog_Apartment%20Security%20System_1.jpg?width=1000&name=GenSec_November%20Blog_Apartment%20Security%20System_1.jpg",
              label: t.security,
            },
            {
              src: "https://thumbs.dreamstime.com/b/underground-parking-garage-modern-apartment-building-interior-underground-car-garage-apartment-building-144762919.jpg",
              label: t.parking,
            },
            {
              src: "https://library.playlsi.com/transform/fec609cc-db3e-4dc4-8c43-41e1aa448420/CA-Rincon-Green-Apartments-014?io=transform:extend,width:1920,height:1080,background:f9f9f9",
              label: t.playground,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white p-6">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
