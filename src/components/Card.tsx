import React from "react";
import { Heart, Key } from "lucide-react";

interface ApartmentCardProps {
  image: string;
  number: number;
  area: number;
  rooms: number;
  floor: number;
  completionYear: number;
  project: string;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  image,
  number,
  area,
  rooms,
  floor,
  completionYear,
  project,
}) => {
  return (
    <div
      className="relative rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200"
      style={{ marginTop: "30px" }}
    >
      <button
        aria-label="Save apartment"
        className="absolute top-4 right-4 text-gray-400 hover:text-blue-600"
      >
        <Heart size={20} />
      </button>

      <div className="w-full bg-gray-50">
        <img
          src={image}
          alt={`Apartment ${number} floor plan`}
          style={{
            width: "300px",
            height: "250px",
            objectFit: "cover",
            
          }}
          className="w-full object-contain mx-auto"
        />
      </div>

      <div className="p-6 space-y-2 text-sm">
        <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
          <span className="text-gray-500">Apartment number</span>
          <span className="font-semibold text-blue-900">{number}</span>
        </div>

        <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
          <span className="text-gray-500">Area</span>
          <span className="font-semibold text-blue-900">{area} м²</span>
        </div>

        <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
          <span className="text-gray-500">Rooms</span>
          <span className="font-semibold text-blue-900">{rooms}</span>
        </div>

        <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
          <span className="text-gray-500">Floor</span>
          <span className="font-semibold text-blue-900">{floor}</span>
        </div>

        <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
          <span className="text-gray-500">Completion year</span>
          <span className="font-semibold text-blue-900">{completionYear}</span>
        </div>

        <div className="flex justify-between border-b border-dotted border-gray-200 pb-1">
          <span className="text-gray-500">Project</span>
          <span className="font-semibold text-yellow-600">{project}</span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-900 bg-white text-gray-900 font-semibold rounded-full py-2 transition-colors duration-300 hover:bg-yellow-600 hover:text-white hover:border-yellow-500">
          <Key size={18} />
          Learn more
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;
