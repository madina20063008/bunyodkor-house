import { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import React from "react";
import { getCommonHouse } from "../services/dataService";
import { ReadyHome } from "../services/data.types";
interface ApartmentFiltersProps {
  lang:"en" | "ru" | "uz" | "ar" | "zh";
  onFilterChange: (filters: FilterValues) => void;
  totalResults: number;
}

export interface FilterValues {
  propertyType: string;
  rooms: number[];
  floorRange: [number, number];
  projects: string;
  areaRange: [number, number];
  completionYear: number[];
}

const translations = {
  en: {
    title: "CHOOSE YOUR PERFECT APARTMENT",
    apartments: "Apartments",
    rooms: "Rooms",
    floor: "Floor",
    allProjects: "All Projects",
    area: "Area, m²",
    completionDate: "Completion Date",
    clearFilters: "Clear Filters",
    found: "Options Found",
    from: "from",
    to: "to",
    anyFloor: "Any Floor",
  },
  ru: {
    title: "ВЫБЕРИ СВОЮ ИДЕАЛЬНУЮ КВАРТИРУ",
    apartments: "Квартиры",
    rooms: "Комнат",
    floor: "Этаж",
    allProjects: "Все проекты",
    area: "Площадь, м²",
    completionDate: "Срок сдачи",
    clearFilters: "Очистить фильтр",
    found: "Найдено вариантов",
    from: "от",
    to: "до",
    anyFloor: "Любой этаж",
  },
  uz: {
    title: "O'Z IDEAL KVARTIRANGIZNI TANLANG",
    apartments: "Kvartiralar",
    rooms: "Xonalar",
    floor: "Qavat",
    allProjects: "Barcha loyihalar",
    area: "Maydon, m²",
    completionDate: "Topshirish muddati",
    clearFilters: "Filterni tozalash",
    found: "Topilgan variantlar",
    from: "dan",
    to: "gacha",
    anyFloor: "Har qanday qavat",
  },
  ar: {
    title: "اختر شقتك المثالية",
    apartments: "الشقق",
    rooms: "الغرف",
    floor: "الطابق",
    allProjects: "جميع المشاريع",
    area: "المساحة، م²",
    completionDate: "تاريخ التسليم",
    clearFilters: "مسح المرشح",
    found: "تم العثور على",
    from: "من",
    to: "إلى",
    anyFloor: "أي طابق",
  },
  zh: {
    title: "选择您的理想公寓",
    apartments: "公寓",
    rooms: "房间",
    floor: "楼层",
    allProjects: "所有项目",
    area: "面积，m²",
    completionDate: "交付日期",
    clearFilters: "清除过滤器",
    found: "找到选项",
    from: "从",
    to: "到",
    anyFloor: "任何楼层",
  },
};

// Mock projects data - API dan kelgan loyihalar ro'yxati
// const projectOptions = [
//   { value: "all", label: "allProjects" },
//   { value: "FAYZLI XONADONLAR", label: "FAYZLI XONADONLAR" },
//   { value: "Fayzli uy kitob", label: "Fayzli uy kitob" },
//   { value: "Fayzli uy shahrisabz", label: "Fayzli uy shahrisabz" },
//   { value: "Fayzli uy gurlan", label: "Fayzli uy gurlan" },
// ];

export function ApartmentFilters({
  lang,
  onFilterChange,
  totalResults,
}: ApartmentFiltersProps) {
  const t = translations[lang];

  const [filters, setFilters] = useState<FilterValues>({
    propertyType: "apartment",
    rooms: [],
    floorRange: [-1, 52], // -1 means any floor
    projects: "all",
    areaRange: [10, 360],
    completionYear: [],
  });
  const [commonHouse, setCommonHouse] = useState<ReadyHome[]>([]);

  const roomOptions = [1, 2, 3, "4+"];
  const yearOptions = [2025, 2026, 2027, 2028];

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const data = await getCommonHouse();
        setCommonHouse(data);
      } catch (err) {
        console.error("Error fetching homes:", err);
      }
    };

    fetchHomes();
  }, []);

  const newOpt = [
    { value: "all", label: "allProjects" },
    // { value: "FAYZLI XONADONLAR", label: "FAYZLI XONADONLAR" },
    // { value: "Fayzli uy kitob", label: "Fayzli uy kitob" },
    // { value: "Fayzli uy shahrisabz", label: "Fayzli uy shahrisabz" },
    // { value: "Fayzli uy gurlan", label: "Fayzli uy gurlan" },
  ];

  console.log(commonHouse);
  let commonHse = commonHouse.map((el) => ({
    value: el?.title,
    label: el?.title,
  }));
  console.log(commonHse);

  // const projectOptions = [
  //   { value: "all", label: "allProjects" },
  //   { value: "FAYZLI XONADONLAR", label: "FAYZLI XONADONLAR" },
  //   { value: "Fayzli uy kitob", label: "Fayzli uy kitob" },
  //   { value: "Fayzli uy shahrisabz", label: "Fayzli uy shahrisabz" },
  //   { value: "Fayzli uy gurlan", label: "Fayzli uy gurlan" },
  // ];

  let projectOptions = [...newOpt, ...commonHse];
  console.log(projectOptions);

  // Format floor display value
  const formatFloorValue = (value: number) => {
    return value === -1 ? t.anyFloor : value.toString();
  };

  const handleRoomToggle = (room: number | string) => {
    const roomValue = room === "4+" ? 4 : Number(room);
    const newRooms = filters.rooms.includes(roomValue)
      ? filters.rooms.filter((r) => r !== roomValue)
      : [...filters.rooms, roomValue];

    const newFilters = { ...filters, rooms: newRooms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleYearToggle = (year: number) => {
    const newYears = filters.completionYear.includes(year)
      ? filters.completionYear.filter((y) => y !== year)
      : [...filters.completionYear, year];

    const newFilters = { ...filters, completionYear: newYears };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFloorRangeChange = (value: number[]) => {
    const newFilters = { ...filters, floorRange: value as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAreaRangeChange = (value: number[]) => {
    const newFilters = { ...filters, areaRange: value as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleProjectsChange = (value: string) => {
    const newFilters = { ...filters, projects: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterValues = {
      propertyType: "apartment",
      rooms: [],
      floorRange: [-1, 52],
      projects: "all",
      areaRange: [10, 360],
      completionYear: [],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Get localized project label
  const getProjectLabel = (project: (typeof projectOptions)[0]) => {
    if (project.value === "all") {
      return t.allProjects;
    }
    return project.label;
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-8">
        {/* Title */}
        <h2 className="text-[#C8A961] text-2xl font-bold mb-8 text-center">
          {t.title}
        </h2>

        {/* Main Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Property Type - Currently showing Apartments with count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-[#526C6C] text-white rounded-full px-6 py-3">
              <span className="font-medium">{t.apartments}</span>
              <div className="bg-white text-[#526C6C] rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-bold">5</span>
              </div>
            </div>
          </div>

          {/* Rooms Filter */}
          <div className="space-y-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t.rooms}
            </label>
            <div className="flex gap-2 flex-wrap">
              {roomOptions.map((room) => {
                const roomValue = room === "4+" ? 4 : Number(room);
                const isActive = filters.rooms.includes(roomValue);
                return (
                  <button
                    key={room}
                    onClick={() => handleRoomToggle(room)}
                    className={`flex-1 min-w-[60px] py-3 rounded-full border-2 transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-[#526C6C] text-white border-[#526C6C] shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#526C6C] hover:text-[#526C6C]"
                    }`}
                  >
                    {room}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Filter */}
          <div className="space-y-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t.allProjects}
            </label>
            <Select
              value={filters.projects}
              onValueChange={handleProjectsChange}
            >
              <SelectTrigger className="w-full border-2 border-gray-300 rounded-full py-3 px-4 hover:border-[#526C6C] transition-colors">
                <SelectValue>
                  {getProjectLabel(
                    projectOptions.find((p) => p.value === filters.projects)!
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-gray-200">
                {projectOptions.map((project) => (
                  <SelectItem
                    key={project.value}
                    value={project.value}
                    className="py-3 px-4 hover:bg-gray-50 cursor-pointer"
                  >
                    {getProjectLabel(project)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Filter */}
          <div className="space-y-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t.area}
            </label>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>
                  {t.from} {filters.areaRange[0]}
                </span>
                <span>
                  {t.to} {filters.areaRange[1]}
                </span>
              </div>
              <Slider
                value={filters.areaRange}
                onValueChange={handleAreaRangeChange}
                min={10}
                max={360}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Floor Range and Completion Date */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Floor Range */}
          <div className="space-y-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t.floor}
            </label>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>
                  {t.from} {formatFloorValue(filters.floorRange[0])}
                </span>
                <span>
                  {t.to} {formatFloorValue(filters.floorRange[1])}
                </span>
              </div>
              <Slider
                value={filters.floorRange}
                onValueChange={handleFloorRangeChange}
                min={-1}
                max={52}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Completion Date */}
          <div className="space-y-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t.completionDate}
            </label>
            <div className="flex gap-2 flex-wrap">
              {yearOptions.map((year) => {
                const isActive = filters.completionYear.includes(year);
                return (
                  <button
                    key={year}
                    onClick={() => handleYearToggle(year)}
                    className={`flex-1 min-w-[80px] py-3 rounded-full border-2 transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-[#C8A961] text-white border-[#C8A961] shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#C8A961] hover:text-[#C8A961]"
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-gray-600 hover:text-[#526C6C] hover:bg-gray-50 px-6 py-2 rounded-full transition-colors duration-200 font-medium"
          >
            {t.clearFilters} ×
          </Button>

          <div className="bg-[#526C6C] text-white px-8 py-3 rounded-full font-semibold shadow-md">
            {t.found}: {totalResults}
          </div>
        </div>
      </div>
    </div>
  );
}
