import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { locationApi } from "../../api/location.api";
import { toast } from "react-toastify";
import { useLocation } from "../../hooks/useLocation";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapClickListener = ({ onMapClick }: { onMapClick: (pos: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const MapCenterUpdater = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
};

interface LocationPickerMapProps {
  onSelectLocation: (location: any) => void;
  onCancel: () => void;
}

const LocationPickerMap = ({ onSelectLocation, onCancel }: LocationPickerMapProps) => {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;
  const { latitude: userLat, longitude: userLng, refreshLocation } = useLocation();
  const [detectedCenter, setDetectedCenter] = useState<[number, number] | null>(null);
  useEffect(() => {
    const detectLocation = async () => {
      if (userLat && userLng) {
        setMarkerPos([userLat, userLng]);
        setDetectedCenter([userLat, userLng]);
      } else {
        const loc = await refreshLocation();
        if (loc) {
          setMarkerPos([loc.latitude, loc.longitude]);
          setDetectedCenter([loc.latitude, loc.longitude]);
        }
      }
    };
    detectLocation();
  }, [userLat, userLng]);

  const handleConfirm = async () => {
    if (!markerPos) return;
    
    setLoading(true);
    try {
      const [lat, lng] = markerPos;
      const addressData = await locationApi.reverseGeocode(lat, lng);
      const displayName = [addressData.city, addressData.state, addressData.country]
        .filter(Boolean)
        .join(", ");

      onSelectLocation({
        displayName: displayName || "Pinned Location",
        city: addressData.city || "Unknown City",
        state: addressData.state || "Unknown State",
        country: addressData.country || "Unknown Country",
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      toast.error("Failed to get address for this location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-600">
          We pinned your current location. Click anywhere else to move the pin.
        </p>
      </div>

      <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-zinc-200 z-0 shadow-sm">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={4}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
            url={`https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LOCATIONIQ_TOKEN}`}
            subdomains={["a", "b", "c"]}
          />
          <MapCenterUpdater center={detectedCenter} />
          <MapClickListener onMapClick={setMarkerPos} />
          {markerPos && <Marker position={markerPos} />}
        </MapContainer>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-zinc-200 px-5 py-2 font-medium transition hover:bg-zinc-100"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!markerPos || loading}
          onClick={handleConfirm}
          className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:bg-zinc-300 disabled:cursor-not-allowed"
        >
          {loading ? "Confirming..." : "Confirm Location"}
        </button>
      </div>
    </div>
  );
};

export default LocationPickerMap;