
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCommonhouse } from '../services/dataService'; 
import { Commonhouse } from '../services/data.types'; 

interface PropertyCardProps {
  image: string;
  title: string;
  className: string;
  classLabel: string;
  address: string;
  handover: string;
  link: string;
  id: string; 
  commonhouseId?: number;
}

interface OurProjectsProps {
  lang: 'en' | 'ru' | 'uz' | 'zh' | 'ar';
}

const translations = {
  en: {
    ourProjects: "Our Projects",
    class: "Class",
    address: "Address",
    handover: "Handover",
    business: "Business",
    premium: "Premium",
    ongoingSales: "Ongoing Sales",
    loading: "Loading projects...",
    noProjects: "No projects found.",
    error: "Failed to load projects. Please try again later.",
    addressNotSpecified: "Address not specified",
    toBeAnnounced: "To be announced"
  },
  ru: {
    ourProjects: "Наши Проекты",
    class: "Класс",
    address: "Адрес",
    handover: "Сдача",
    business: "Бизнес",
    premium: "Премиум",
    ongoingSales: "Идут Продажи",
    loading: "Загрузка проектов...",
    noProjects: "Проекты не найдены.",
    error: "Не удалось загрузить проекты. Пожалуйста, попробуйте позже.",
    addressNotSpecified: "Адрес не указан",
    toBeAnnounced: "Будет объявлено"
  },
  uz: {
    ourProjects: "Bizning Loyihalar",
    class: "Sinf",
    address: "Manzil",
    handover: "Topshirish",
    business: "Biznes",
    premium: "Premium",
    ongoingSales: "Sotuv Davom Etmoqda",
    loading: "Loyihalar yuklanmoqda...",
    noProjects: "Loyihalar topilmadi.",
    error: "Loyihalarni yuklab bo'lmadi. Iltimos, keyinroq urinib ko'ring.",
    addressNotSpecified: "Manzil ko'rsatilmagan",
    toBeAnnounced: "E'lon qilinadi"
  },
  zh: {
    ourProjects: "我们的项目",
    class: "等级",
    address: "地址",
    handover: "交付时间",
    business: "商务",
    premium: "高级",
    ongoingSales: "销售中",
    loading: "正在加载项目...",
    noProjects: "未找到项目。",
    error: "加载项目失败。请稍后再试。",
    addressNotSpecified: "地址未指定",
    toBeAnnounced: "待公布"
  },
  ar: {
    ourProjects: "مشاريعنا",
    class: "فئة",
    address: "عنوان",
    handover: "التسليم",
    business: "أعمال",
    premium: "متميز",
    ongoingSales: "مبيعات مستمرة",
    loading: "جاري تحميل المشاريع...",
    noProjects: "لم يتم العثور على مشاريع.",
    error: "فشل في تحميل المشاريع. يرجى المحاولة مرة أخرى لاحقًا.",
    addressNotSpecified: "العنوان غير محدد",
    toBeAnnounced: "سيتم الإعلان"
  }
};

const PropertyCard: React.FC<PropertyCardProps & { lang: 'en' | 'ru' | 'uz' | 'zh' | 'ar' }> = ({
  image,
  title,
  classLabel,
  address,
  handover,
  id,
  lang
}) => {
  const navigate = useNavigate();
  const t = translations[lang];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/project/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="flex group cursor-pointer"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Ongoing Sales Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-amber-700 bg-opacity-90 text-white px-5 py-2 rounded-full text-sm font-medium">
              {t.ongoingSales}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-full bg-cover bg-gray-50">
          {/* Title */}
          <h2 className="text-amber-600 text-2xl font-serif mb-4 tracking-wide">
            {title}
          </h2>

          {/* Class */}
          <div className="mb-3">
            <span className="text-gray-500 text-sm">{t.class}: </span>
            <span className="text-gray-800 font-medium">{classLabel}</span>
          </div>

          {/* Address */}
          <div className="mb-3">
            <span className="text-gray-500 text-sm">{t.address}: </span>
            <span className="text-gray-800">{address}</span>
          </div>

          {/* Handover */}
          <div>
            <span className="text-gray-500 text-sm">{t.handover}: </span>
            <span className="text-gray-800 font-medium">{handover}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurProjects: React.FC<OurProjectsProps> = ({ lang }) => {
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const t = translations[lang];

  // Helper function to get localized field
  const getLocalizedField = (house: Commonhouse, field: 'title' | 'description'): string => {
    const fieldMap = {
      title: {
        en: house.title_en,
        ru: house.title_ru,
        uz: house.title_uz,
        zh: house.title_zh_hans,
        ar: house.title_ar
      },
      description: {
        en: house.description_en,
        ru: house.description_ru,
        uz: house.description_uz,
        zh: house.description_zh_hans,
        ar: house.description_ar
      }
    };

    const localizedValue = fieldMap[field][lang];
    return localizedValue && localizedValue !== 'string' ? localizedValue : house[field];
  };

  // Helper function to get localized class label
  const getLocalizedClassLabel = (className: string): string => {
    if (className === 'business') return t.business;
    if (className === 'premium') return t.premium;
    return className;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const commonhouses: Commonhouse[] = await getAllCommonhouse();
        
        console.log('Raw API Response:', commonhouses);

        // Filter out placeholder/empty data and transform API data
        const transformedProperties: PropertyCardProps[] = commonhouses
          .filter(house => {
            // Filter out items that have placeholder data like "string"
            const hasRealTitle = house?.title && house.title !== 'string';
            const hasRealDescription = house?.description && house.description !== 'string';
            
            // Include items that have either real title or real description
            return hasRealTitle || hasRealDescription;
          })
          .map((house, index) => {
            // Get localized title
            const titleText = getLocalizedField(house, 'title');
            
            // Safely generate ID with fallbacks
            const id = titleText.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            
            // Use the first commonmainimage or commonadvimage or fallback
            const image = house?.commonmainimage?.[0]?.image || 
                         house?.commonadvimage?.[0]?.image || 
                         `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&${index}`;
            
            // Safely build address from location fields (these might also need localization in the future)
            const addressParts = [
              house?.street && house.street !== 'string' ? house.street : null,
              house?.house && house.house !== 'string' ? house.house : null,
              house?.district && house.district !== 'string' ? house.district : null,
              house?.region && house.region !== 'string' ? house.region : null
            ].filter(Boolean);
            
            const address = addressParts.length > 0 
              ? addressParts.join(', ')
              : t.addressNotSpecified;
            
            // Determine class based on some logic
            const titleForClass = titleText.toUpperCase();
            const className = titleForClass.includes('RESIDENCE') || titleForClass.includes('BUSINESS') 
              ? 'business' 
              : 'premium';
            const classLabel = getLocalizedClassLabel(className);

            // Safely get handover date
            const handover = house?.handover && house.handover !== 'string' 
              ? house.handover 
              : t.toBeAnnounced;

            return {
              id: id,
              image: image,
              title: titleText,
              className: className,
              classLabel: classLabel,
              address: address,
              handover: handover,
              link: `https://mbc.uz/en/project/${id}`
            };
          });

        console.log('Transformed properties:', transformedProperties);
        setProperties(transformedProperties);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [lang, t]); // Re-fetch when language changes

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-4 text-primary">
            {t.ourProjects}
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">{t.loading}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-4 text-primary">
            {t.ourProjects}
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl mb-12 text-primary">
          {t.ourProjects}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={property.id || index} {...property} lang={lang} />
          ))}
        </div>
        {properties.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            {t.noProjects}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurProjects;