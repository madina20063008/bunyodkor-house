import React, { useRef, useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  getContact,
  getSocialMedia,
  addToWaitlist,
} from "../services/dataService"; // Adjust import path
import { ContactInfo, Media, Waitlist } from "../services/data.types"; // Adjust import path

interface ContactProps {
  lang: "en" | "ru" | "uz" | "ar" | "zh";
}

export function Contact({ lang }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [contactData, setContactData] = useState<ContactInfo | null>(null);
  const [socialMedia, setSocialMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    theme: "general",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both contact and social media data
        const [contactData, socialMediaData] = await Promise.all([
          getContact(),
          getSocialMedia(),
        ]);

        // Set contact data
        if (contactData && contactData.length > 0) {
          setContactData(contactData[0]);
        }

        // Set social media data
        setSocialMedia(socialMediaData || []);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load contact information");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const translations = {
    en: {
      title: "Contact Us",
      subtitle: "Ready to answer all your questions",
      name: "Your Name",
      phone: "Phone",
      email: "Email",
      message: "Message",
      inquiryType: "Inquiry Type",
      design: "Design",
      purchase: "Purchase Ready-Made Home",
      general: "General Question",
      send: "Send Message",
      address: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      workingHours: "Working Hours",
      socialMedia: "Follow Us on Social Media",
      loading: "Loading contact information...",
      error: "Error loading contact information",
      formSuccess: "Message sent successfully!",
      formError: "Error sending message",
      sending: "Sending...",
    },
    ru: {
      title: "Свяжитесь с нами",
      subtitle: "Готовы ответить на все ваши вопросы",
      name: "Ваше имя",
      phone: "Телефон",
      email: "Email",
      message: "Сообщение",
      inquiryType: "Тип запроса",
      design: "Проектирование",
      purchase: "Покупка готового дома",
      general: "Общий вопрос",
      send: "Отправить сообщение",
      address: "Адрес",
      phoneLabel: "Телефон",
      emailLabel: "Email",
      workingHours: "Время работы",
      socialMedia: "Мы в социальных сетях",
      loading: "Загрузка контактной информации...",
      error: "Ошибка загрузки контактной информации",
      formSuccess: "Сообщение отправлено успешно!",
      formError: "Ошибка при отправке сообщения",
      sending: "Отправка...",
    },
    uz: {
      title: "Biz bilan bog'laning",
      subtitle: "Barcha savollaringizga javob berishga tayyormiz",
      name: "Ismingiz",
      phone: "Telefon",
      email: "Elektron pochta",
      message: "Xabar",
      inquiryType: "So'rov turi",
      design: "Loyihalash",
      purchase: "Tayyor uy sotib olish",
      general: "Umumiy savol",
      send: "Xabar yuborish",
      address: "Manzil",
      phoneLabel: "Telefon",
      emailLabel: "Elektron pochta",
      workingHours: "Ish vaqti",
      socialMedia: "Biz ijtimoiy tarmoqlarda",
      loading: "Kontakt ma'lumotlari yuklanmoqda...",
      error: "Kontakt ma'lumotlarini yuklashda xatolik",
      formSuccess: "Xabar muvaffaqiyatli yuborildi!",
      formError: "Xabarni yuborishda xatolik",
      sending: "Yuborilmoqda...",
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "جاهزون للإجابة على جميع أسئلتكم",
      name: "اسمك",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      inquiryType: "نوع الاستفسار",
      design: "التصميم",
      purchase: "شراء منزل جاهز",
      general: "سؤال عام",
      send: "إرسال الرسالة",
      address: "العنوان",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      workingHours: "ساعات العمل",
      socialMedia: "نحن في وسائل التواصل الاجتماعي",
      loading: "جاري تحميل معلومات الاتصال...",
      error: "خطأ في تحميل معلومات الاتصال",
      formSuccess: "تم إرسال الرسالة بنجاح!",
      formError: "خطأ في إرسال الرسالة",
      sending: "جاري الإرسال...",
    },
    zh: {
      title: "联系我们",
      subtitle: "随时回答您的所有问题",
      name: "您的姓名",
      phone: "电话",
      email: "电子邮箱",
      message: "留言",
      inquiryType: "咨询类型",
      design: "设计",
      purchase: "购买现房",
      general: "一般问题",
      send: "发送消息",
      address: "地址",
      phoneLabel: "电话",
      emailLabel: "电子邮箱",
      workingHours: "工作时间",
      socialMedia: "我们在社交媒体上",
      loading: "正在加载联系信息...",
      error: "加载联系信息时出错",
      formSuccess: "消息发送成功！",
      formError: "发送消息时出错",
      sending: "发送中...",
    },
  };

  const t = translations[lang];

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      theme: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      // Convert phone number to number (as per your API interface)
      const waitlistData: Waitlist = {
        ...formData,
        phone_number: parseInt(formData.phone_number.replace(/\D/g, "")) || 0,
      };

      await addToWaitlist(waitlistData);

      setFormSuccess(true);
      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        theme: "general",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setFormSuccess(false), 5000);
    } catch (err) {
      console.error("Failed to submit form:", err);
      setFormError(t.formError);
    } finally {
      setFormLoading(false);
    }
  };

  // Fallback data in case API fails
  const fallbackData = {
    address:
      lang === "ru"
        ? "г. Ташкент, ул. Амира Темура, 123"
        : lang === "uz"
        ? "Toshkent sh., Amir Temur ko'chasi, 123"
        : lang === "ar"
        ? "طشقند، شارع أمير تيمور، 123"
        : "塔什干市，阿米尔·帖木儿街123号",
    phone: "+998 71 123 45 67",
    email: "info@fayzlixonadonlar.uz",
    workTime:
      lang === "ru"
        ? "Пн-Пт: 9:00 - 18:00, Сб: 9:00 - 14:00"
        : lang === "uz"
        ? "Du-Ju: 9:00 - 18:00, Sh: 9:00 - 14:00"
        : lang === "ar"
        ? "الاثنين-الجمعة: 9:00 - 18:00، السبت: 9:00 - 14:00"
        : "周一至周五：9:00 - 18:00，周六：9:00 - 14:00",
  };

  if (loading) {
    return (
      <section id="contacts" className="py-20 bg-muted" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-muted-foreground">{t.loading}</div>
        </div>
      </section>
    );
  }

  if (error && !contactData) {
    return (
      <section id="contacts" className="py-20 bg-muted" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-lg text-destructive">{t.error}</div>
        </div>
      </section>
    );
  }

  // Use API data or fallback data
  const displayData = contactData || {
    full_address: fallbackData.address,
    phone_number: fallbackData.phone,
    email: fallbackData.email,
    work_time: fallbackData.workTime,
  };

  return (
    <section id="contacts" className="py-20 bg-muted" ref={ref}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            {formSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
              >
                {t.formSuccess}
              </motion.div>
            )}

            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
              >
                {formError}
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="full_name">{t.name}</Label>
                <Input
                  id="full_name"
                  placeholder={t.name}
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="phone_number">{t.phone}</Label>
                <Input
                  id="phone_number"
                  placeholder="+998 XX XXX XX XX"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="theme">{t.inquiryType}</Label>
                <Select
                  value={formData.theme}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder={t.general} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">{t.design}</SelectItem>
                    <SelectItem value="purchase">{t.purchase}</SelectItem>
                    <SelectItem value="general">{t.general}</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.7 }}
              >
                <Label htmlFor="message">{t.message}</Label>
                <Textarea
                  id="message"
                  placeholder={t.message}
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.8 }}
                whileHover={{ scale: formLoading ? 1 : 1.02 }}
                whileTap={{ scale: formLoading ? 1 : 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={formLoading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {formLoading ? t.sending : t.send}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4 mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <MapPin className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="mb-2">{t.address}</h3>
                  <p className="text-muted-foreground">
                    {displayData.full_address}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4 mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Phone className="w-6 h-6 text-secondary" />
                </motion.div>
                <div>
                  <h3 className="mb-2">{t.phoneLabel}</h3>
                  <p className="text-muted-foreground">
                    {displayData.phone_number}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4 mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Mail className="w-6 h-6 text-accent" />
                </motion.div>
                <div>
                  <h3 className="mb-2">{t.emailLabel}</h3>
                  <p className="text-muted-foreground">{displayData.email}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.7 }}
                className="border-t border-border pt-6"
              >
                <h3 className="mb-2">{t.workingHours}</h3>
                <p className="text-muted-foreground">{displayData.work_time}</p>
              </motion.div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl"
            >
              <h3 className="mb-4">{t.socialMedia}</h3>
              <div className="flex gap-4">
                {socialMedia.map((media) => (
                  <motion.a
                    key={media.id}
                    href={media.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    title={media.name}
                  >
                    <img
                      src={media.image}
                      alt={media.name}
                      className="w-10 h-10 object-contain rounded-[50%]"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
