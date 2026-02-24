
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers - using import instead of require
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface Location {
  id: number;
  latitude: number;
  longitude: number;
  address_uz: string;
  address_ru?: string;
  address_en?: string;
  address_zh_hans?: string;
  address_ar?: string;
  description_uz: string;
  description_en: string;
  description_ru?: string;
  description_ar?: string;
  description_zh_hans?: string;
}

interface MapLeafletProps {
  mapLeaflet: Location[];
}

export default function MapLeaflet({ mapLeaflet }: MapLeafletProps) {
  // Default to the real location if no data
  const center: [number, number] = mapLeaflet.length > 0 
    ? [mapLeaflet[0].latitude, mapLeaflet[0].longitude]
    : [38.8151, 65.7152]; // Real coordinates

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapLeaflet.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{location.address_uz}</h3>
                <p className="text-sm mt-1">{location.description_uz}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}