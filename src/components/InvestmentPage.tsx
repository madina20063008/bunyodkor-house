import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  TrendingUp,
  Shield,
  Clock,
  Users,
  CheckCircle2,
  DollarSign,
  Building2,
  FileText,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import React from "react";

interface InvestmentPageProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function InvestmentPage({ lang }: InvestmentPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state?.project;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
    message: "",
  });

  const translations = {
    en: {
      title: "Construction Investment",
      subtitle: "Reliable Real Estate Investments in Uzbekistan",
      backToMain: "Back to Projects",
      selectedProject: "Selected Project",
      whyInvest: "Why Invest With Us",
      investmentTypes: "Investment Types",
      howItWorks: "How It Works",
      guarantees: "Our Guarantees",
      contactForm: "Contact Us",

      // Benefits
      highReturn: "High Return on Investment",
      highReturnDesc: "Expected return of 15% to 25% annually",
      legalSupport: "Legal Protection",
      legalSupportDesc: "Full legal support for the transaction",
      transparency: "Transparency",
      transparencyDesc: "Regular construction progress reports",
      experience: "Work Experience",
      experienceDesc: "Over 10 years of successful project implementation",

      // Investment Types
      fullInvestment: "Full Financing",
      fullInvestmentDesc:
        "Investment in an entire property with maximum return",
      partialInvestment: "Equity Participation",
      partialInvestmentDesc: "Investment in property share from $10,000",
      landInvestment: "Land Investment",
      landInvestmentDesc: "Purchase of land plots for development",

      // Process Steps
      step1: "Step 1: Consultation",
      step1Desc: "Discussion of project details and investment terms",
      step2: "Step 2: Documentation",
      step2Desc: "Preparation and signing of investment agreement",
      step3: "Step 3: Investment",
      step3Desc: "Transfer of funds to project account",
      step4: "Step 4: Monitoring",
      step4Desc: "Receiving regular construction progress reports",
      step5: "Step 5: Profit",
      step5Desc: "Receiving income after construction completion",

      // Guarantees
      guarantee1: "State registration of all contracts",
      guarantee2: "Investment insurance through leading companies",
      guarantee3: "Investment refund in case of force majeure",
      guarantee4: "Company buyback of property at market value",
      guarantee5: "Legal support at all stages",
      guarantee6: "Transparent reporting system",

      // Form
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      emailAddress: "Email Address",
      investmentAmount: "Desired Investment Amount (USD)",
      additionalInfo: "Additional Information",
      sendRequest: "Send Application",
      formSuccess:
        "Your application has been sent successfully! We will contact you shortly.",

      // Contact Info
      contactInfo: "Contact Information",
      ourOffice: "Our Office",
      officeAddress: "45 Mustaqillik Street, Qarshi",
      workingHours: "Working Hours",
      workingTime: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",

      // Stats
      completedProjects: "Completed Projects",
      totalInvestors: "Total Investors",
      avgReturn: "Average Return",
      investedAmount: "Invested Amount",
    },
    ru: {
      title: "Инвестиции в строительство",
      subtitle: "Надежные инвестиции в недвижимость Узбекистана",
      backToMain: "Назад к проектам",
      selectedProject: "Выбранный проект",
      whyInvest: "Почему стоит инвестировать с нами",
      investmentTypes: "Типы инвестиций",
      howItWorks: "Как это работает",
      guarantees: "Наши гарантии",
      contactForm: "Свяжитесь с нами",

      // Benefits
      highReturn: "Высокая доходность",
      highReturnDesc: "Ожидаемая доходность от 15% до 25% годовых",
      legalSupport: "Юридическая защита",
      legalSupportDesc: "Полное юридическое сопровождение сделки",
      transparency: "Прозрачность",
      transparencyDesc: "Регулярная отчетность о ходе строительства",
      experience: "Опыт работы",
      experienceDesc: "Более 10 лет успешной реализации проектов",

      // Investment Types
      fullInvestment: "Полное финансирование",
      fullInvestmentDesc:
        "Инвестирование в целый объект с максимальной доходностью",
      partialInvestment: "Долевое участие",
      partialInvestmentDesc: "Инвестирование в долю объекта от 10 000 USD",
      landInvestment: "Инвестиции в землю",
      landInvestmentDesc: "Покупка земельных участков под застройку",

      // Process Steps
      step1: "Шаг 1: Консультация",
      step1Desc: "Обсуждение деталей проекта и условий инвестирования",
      step2: "Шаг 2: Документы",
      step2Desc: "Подготовка и подписание инвестиционного договора",
      step3: "Шаг 3: Инвестирование",
      step3Desc: "Перевод средств на счет проекта",
      step4: "Шаг 4: Контроль",
      step4Desc: "Получение регулярных отчетов о ходе строительства",
      step5: "Шаг 5: Прибыль",
      step5Desc: "Получение дохода после завершения строительства",

      // Guarantees
      guarantee1: "Государственная регистрация всех договоров",
      guarantee2: "Страхование инвестиций через ведущие компании",
      guarantee3: "Возврат инвестиций в случае форс-мажора",
      guarantee4: "Выкуп объекта компанией по рыночной стоимости",
      guarantee5: "Юридическое сопровождение на всех этапах",
      guarantee6: "Прозрачная система отчетности",

      // Form
      fullName: "Полное имя",
      phoneNumber: "Номер телефона",
      emailAddress: "Email адрес",
      investmentAmount: "Желаемая сумма инвестиций (USD)",
      additionalInfo: "Дополнительная информация",
      sendRequest: "Отправить заявку",
      formSuccess:
        "Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",

      // Contact Info
      contactInfo: "Контактная информация",
      ourOffice: "Наш офис",
      officeAddress: "г. Карши, ул. Мустакиллик, дом 45",
      workingHours: "Время работы",
      workingTime: "Пн-Пт: 9:00 - 18:00, Сб: 9:00 - 14:00",

      // Stats
      completedProjects: "Завершенных проектов",
      totalInvestors: "Общее число инвесторов",
      avgReturn: "Средняя доходность",
      investedAmount: "Инвестировано",
    },
    uz: {
      title: "Qurilishga investitsiya",
      subtitle: "O'zbekiston ko'chmas mulkiga ishonchli investitsiyalar",
      backToMain: "Loyihalarga qaytish",
      selectedProject: "Tanlangan loyiha",
      whyInvest: "Nima uchun biz bilan investitsiya qilish kerak",
      investmentTypes: "Investitsiya turlari",
      howItWorks: "Qanday ishlaydi",
      guarantees: "Bizning kafolatlarimiz",
      contactForm: "Biz bilan bog'laning",

      highReturn: "Yuqori daromad",
      highReturnDesc: "Yiliga 15% dan 25% gacha kutilayotgan daromad",
      legalSupport: "Yuridik himoya",
      legalSupportDesc: "Bitimning to'liq yuridik qo'llab-quvvatlash",
      transparency: "Shaffoflik",
      transparencyDesc: "Qurilish jarayoni haqida muntazam hisobotlar",
      experience: "Ish tajribasi",
      experienceDesc:
        "10 yildan ortiq loyihalarni muvaffaqiyatli amalga oshirish",

      fullInvestment: "To'liq moliyalashtirish",
      fullInvestmentDesc: "Maksimal daromad bilan butun ob'ektga investitsiya",
      partialInvestment: "Ulushli ishtirok",
      partialInvestmentDesc: "10 000 USD dan ob'ekt ulushiga investitsiya",
      landInvestment: "Yerga investitsiya",
      landInvestmentDesc: "Qurilish uchun yer uchastkalarini sotib olish",

      step1: "Qadam 1: Konsultatsiya",
      step1Desc:
        "Loyiha tafsilotlari va investitsiya shartlarini muhokama qilish",
      step2: "Qadam 2: Hujjatlar",
      step2Desc: "Investitsiya shartnomasini tayyorlash va imzolash",
      step3: "Qadam 3: Investitsiya",
      step3Desc: "Mablag'larni loyiha hisobiga o'tkazish",
      step4: "Qadam 4: Nazorat",
      step4Desc: "Qurilish jarayoni haqida muntazam hisobotlarni olish",
      step5: "Qadam 5: Foyda",
      step5Desc: "Qurilish tugagandan keyin daromad olish",

      guarantee1: "Barcha shartnomalarning davlat ro'yxatidan o'tishi",
      guarantee2: "Investitsiyalarni yetakchi kompaniyalar orqali sug'urtalash",
      guarantee3: "Fors-major holatida investitsiyalarni qaytarish",
      guarantee4: "Kompaniya tomonidan ob'ektni bozor qiymatida sotib olish",
      guarantee5: "Barcha bosqichlarda yuridik qo'llab-quvvatlash",
      guarantee6: "Shaffof hisobot tizimi",

      fullName: "To'liq ism",
      phoneNumber: "Telefon raqami",
      emailAddress: "Email manzil",
      investmentAmount: "Investitsiya summasi (USD)",
      additionalInfo: "Qo'shimcha ma'lumot",
      sendRequest: "So'rov yuborish",
      formSuccess:
        "Sizning so'rovingiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",

      contactInfo: "Kontakt ma'lumotlari",
      ourOffice: "Bizning ofis",
      officeAddress: "Qarshi sh., Mustaqillik ko'chasi, 45-uy",
      workingHours: "Ish vaqti",
      workingTime: "Du-Ju: 9:00 - 18:00, Sh: 9:00 - 14:00",

      completedProjects: "Yakunlangan loyihalar",
      totalInvestors: "Jami investorlar",
      avgReturn: "O'rtacha daromad",
      investedAmount: "Investitsiya qilingan",
    },
    ar: {
      title: "الاستثمار في البناء",
      subtitle: "استثمارات موثوقة في العقارات الأوزبكية",
      backToMain: "العودة إلى المشاريع",
      selectedProject: "المشروع المختار",
      whyInvest: "لماذا تستثمر معنا",
      investmentTypes: "أنواع الاستثمار",
      howItWorks: "كيف يعمل",
      guarantees: "ضماناتنا",
      contactForm: "اتصل بنا",

      highReturn: "عائد مرتفع",
      highReturnDesc: "عائد متوقع من 15٪ إلى 25٪ سنويًا",
      legalSupport: "الحماية القانونية",
      legalSupportDesc: "دعم قانوني كامل للصفقة",
      transparency: "الشفافية",
      transparencyDesc: "تقارير منتظمة عن تقدم البناء",
      experience: "خبرة العمل",
      experienceDesc: "أكثر من 10 سنوات من التنفيذ الناجح للمشاريع",

      fullInvestment: "التمويل الكامل",
      fullInvestmentDesc: "الاستثمار في العقار بأكمله بأقصى عائد",
      partialInvestment: "المشاركة الجزئية",
      partialInvestmentDesc: "الاستثمار في حصة من العقار من 10,000 دولار",
      landInvestment: "الاستثمار في الأراضي",
      landInvestmentDesc: "شراء قطع أراضي للتطوير",

      step1: "الخطوة 1: الاستشارة",
      step1Desc: "مناقشة تفاصيل المشروع وشروط الاستثمار",
      step2: "الخطوة 2: الوثائق",
      step2Desc: "إعداد وتوقيع عقد الاستثمار",
      step3: "الخطوة 3: الاستثمار",
      step3Desc: "تحويل الأموال إلى حساب المشروع",
      step4: "الخطوة 4: المراقبة",
      step4Desc: "تلقي تقارير منتظمة عن تقدم البناء",
      step5: "الخطوة 5: الربح",
      step5Desc: "الحصول على الدخل بعد الانتهاء من البناء",

      guarantee1: "التسجيل الحكومي لجميع العقود",
      guarantee2: "تأمين الاستثمارات من خلال الشركات الرائدة",
      guarantee3: "إرجاع الاستثمارات في حالة القوة القاهرة",
      guarantee4: "شراء العقار من قبل الشركة بسعر السوق",
      guarantee5: "الدعم القانوني في جميع المراحل",
      guarantee6: "نظام تقارير شفاف",

      fullName: "الاسم الكامل",
      phoneNumber: "رقم الهاتف",
      emailAddress: "عنوان البريد الإلكتروني",
      investmentAmount: "مبلغ الاستثمار المطلوب (USD)",
      additionalInfo: "معلومات إضافية",
      sendRequest: "إرسال الطلب",
      formSuccess: "تم إرسال طلبك بنجاح! سنتصل بك قريبًا.",

      contactInfo: "معلومات الاتصال",
      ourOffice: "مكتبنا",
      officeAddress: "مدينة كارشي، شارع مستقلليك، المبنى 45",
      workingHours: "ساعات العمل",
      workingTime: "الإثنين-الجمعة: 9:00 - 18:00، السبت: 9:00 - 14:00",

      completedProjects: "المشاريع المكتملة",
      totalInvestors: "إجمالي المستثمرين",
      avgReturn: "متوسط ​​العائد",
      investedAmount: "المبلغ المستثمر",
    },
    zh: {
      title: "建设投资",
      subtitle: "乌兹别克斯坦房地产的可靠投资",
      backToMain: "返回项目",
      selectedProject: "选定项目",
      whyInvest: "为什么与我们投资",
      investmentTypes: "投资类型",
      howItWorks: "如何运作",
      guarantees: "我们的保证",
      contactForm: "联系我们",

      highReturn: "高回报",
      highReturnDesc: "预期年回报率为15%至25%",
      legalSupport: "法律保护",
      legalSupportDesc: "交易的全面法律支持",
      transparency: "透明度",
      transparencyDesc: "定期报告施工进度",
      experience: "工作经验",
      experienceDesc: "成功实施项目超过10年",

      fullInvestment: "全额融资",
      fullInvestmentDesc: "投资整个房产以获得最大回报",
      partialInvestment: "部分参与",
      partialInvestmentDesc: "从10,000美元起投资房产份额",
      landInvestment: "土地投资",
      landInvestmentDesc: "购买待开发土地",

      step1: "第1步：咨询",
      step1Desc: "讨论项目细节和投资条件",
      step2: "第2步：文件",
      step2Desc: "准备和签署投资合同",
      step3: "第3步：投资",
      step3Desc: "将资金转入项目账户",
      step4: "第4步：监控",
      step4Desc: "接收定期的施工进度报告",
      step5: "第5步：收益",
      step5Desc: "在施工完成后获得收入",

      guarantee1: "所有合同的国家注册",
      guarantee2: "通过领先公司进行投资保险",
      guarantee3: "在不可抗力情况下退还投资",
      guarantee4: "公司以市场价格购买房产",
      guarantee5: "所有阶段的法律支持",
      guarantee6: "透明的报告系统",

      fullName: "全名",
      phoneNumber: "电话号码",
      emailAddress: "电子邮件地址",
      investmentAmount: "期望投资金额 (USD)",
      additionalInfo: "附加信息",
      sendRequest: "发送请求",
      formSuccess: "您的请求已成功发送！我们会尽快与您联系。",

      contactInfo: "联系信息",
      ourOffice: "我们的办公室",
      officeAddress: "卡尔希市，穆斯塔克利克街，45号楼",
      workingHours: "工作时间",
      workingTime: "周一至周五：9:00 - 18:00，周六：9:00 - 14:00",

      completedProjects: "已完成项目",
      totalInvestors: "投资者总数",
      avgReturn: "平均回报",
      investedAmount: "已投资金额",
    },
  };

  const t = translations[lang];

  const benefits = [
    { icon: TrendingUp, title: t.highReturn, desc: t.highReturnDesc },
    { icon: Shield, title: t.legalSupport, desc: t.legalSupportDesc },
    { icon: Clock, title: t.transparency, desc: t.transparencyDesc },
    { icon: Users, title: t.experience, desc: t.experienceDesc },
  ];

  const investmentTypes = [
    { icon: Building2, title: t.fullInvestment, desc: t.fullInvestmentDesc },
    { icon: Users, title: t.partialInvestment, desc: t.partialInvestmentDesc },
    { icon: MapPin, title: t.landInvestment, desc: t.landInvestmentDesc },
  ];

  const steps = [
    { title: t.step1, desc: t.step1Desc },
    { title: t.step2, desc: t.step2Desc },
    { title: t.step3, desc: t.step3Desc },
    { title: t.step4, desc: t.step4Desc },
    { title: t.step5, desc: t.step5Desc },
  ];

  const guarantees = [
    t.guarantee1,
    t.guarantee2,
    t.guarantee3,
    t.guarantee4,
    t.guarantee5,
    t.guarantee6,
  ];

  const stats = [
    { value: "45+", label: t.completedProjects },
    { value: "320+", label: t.totalInvestors },
    { value: "22%", label: t.avgReturn },
    { value: "$12M+", label: t.investedAmount },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Investment request submitted:", formData);
    toast.success(t.formSuccess);
    setFormData({
      name: "",
      phone: "",
      email: "",
      amount: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758755791004-5e8126116cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwNzY1NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Investment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 text-white hover:text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              {t.backToMain}
            </Button>

            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
              {t.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">{t.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Selected Project Banner */}
      {projectData && (
        <section className="bg-accent/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-base px-4 py-2">
                {t.selectedProject}
              </Badge>
              <span className="text-lg">
                {lang === "ru" ? projectData.nameRu : projectData.nameUz}
              </span>
              <span className="ml-auto text-accent">
                {projectData.progress}% {t.progress}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-center mb-12 text-primary"
          >
            {t.whyInvest}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-shadow flex flex-col">
                    <Icon className="w-12 h-12 text-accent mb-4 flex-shrink-0" />
                    <h3 className="text-xl mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground flex-grow">
                      {benefit.desc}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-center mb-12 text-primary"
          >
            {t.investmentTypes}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {investmentTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="p-8 h-full text-center hover:shadow-xl transition-shadow flex flex-col items-center justify-start">
                    <Icon className="w-16 h-16 text-accent mb-6 flex-shrink-0" />
                    <h3 className="text-2xl mb-4">{type.title}</h3>
                    <p className="text-muted-foreground">{type.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-center mb-12 text-primary"
          >
            {t.howItWorks}
          </motion.h2>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-xl transition-shadow">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-center mb-12 text-primary"
          >
            {t.guarantees}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="p-6 h-full hover:shadow-xl transition-shadow flex">
                  <div className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{guarantee}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl mb-6 text-primary">{t.contactForm}</h2>
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2">{t.fullName}</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t.fullName}
                    />
                  </div>

                  <div>
                    <label className="block mb-2">{t.phoneNumber}</label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+998 XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">{t.emailAddress}</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">{t.investmentAmount}</label>
                    <Input
                      required
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      placeholder="10000"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">{t.additionalInfo}</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      placeholder={t.additionalInfo}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {t.sendRequest}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl mb-6 text-primary">{t.contactInfo}</h2>
              </div>

              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="mb-2">{t.ourOffice}</h3>
                      <p className="text-muted-foreground">{t.officeAddress}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="mb-2">{t.phoneNumber}</h3>
                      <p className="text-muted-foreground">+998 91 234 56 78</p>
                      <p className="text-muted-foreground">+998 93 345 67 89</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="mb-2">Email</h3>
                      <p className="text-muted-foreground">
                        info@trustprosper.uz
                      </p>
                      <p className="text-muted-foreground">
                        invest@trustprosper.uz
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="mb-2">{t.workingHours}</h3>
                      <p className="text-muted-foreground">{t.workingTime}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Partnership Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758599543157-bc1a94fec33c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2MDY5NzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Partnership"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
