import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
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
const MapClickListener = ({
  onMapClick,
}: {
  onMapClick: (pos: [number, number]) => void;
}) => {
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

const LocationPickerMap = ({
  onSelectLocation,
  onCancel,
}: LocationPickerMapProps) => {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;
  const [mapSearchQuery, setMapSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [latInput, setLatInput] = useState("");
  const [lngInput, setLngInput] = useState("");

  const {
    latitude: userLat,
    longitude: userLng,
    refreshLocation,
  } = useLocation();
  const [detectedCenter, setDetectedCenter] = useState<[number, number] | null>(
    null,
  );

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

  const handleMapSearch = async () => {
    if (!mapSearchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await locationApi.search(mapSearchQuery);
      const results = res.data || res;
      if (results && results.length > 0) {
        const firstResult = results[0];
        const lat = parseFloat(firstResult.latitude || firstResult.lat);
        const lng = parseFloat(firstResult.longitude || firstResult.lon);

        setMarkerPos([lat, lng]);
        setDetectedCenter([lat, lng]);
      } else {
        toast.error("No locations found on the map.");
      }
    } catch (error) {
      toast.error("Search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleApplyCoordinates = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);

    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      setMarkerPos([lat, lng]);
      setDetectedCenter([lat, lng]);
    } else {
      toast.error("Please enter valid numbers for latitude and longitude.");
    }
  };

  const handleConfirm = async () => {
    if (!markerPos) return;

    setLoading(true);
    try {
      const [lat, lng] = markerPos;

      const addressData = await locationApi.reverseGeocode(lat, lng);

      const displayName = [
        addressData.city,
        addressData.state,
        addressData.country,
      ]
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
      <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
        <p className="text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-wider">
          Jump to a specific area
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              placeholder="Search area..."
              value={mapSearchQuery}
              onChange={(e) => setMapSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMapSearch()}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleMapSearch}
              disabled={isSearching}
              className="bg-blue-100 text-blue-700 px-4 rounded-xl text-sm font-medium hover:bg-blue-200 transition disabled:opacity-50 whitespace-nowrap"
            >
              {isSearching ? "..." : "Search"}
            </button>
          </div>
          <div className="flex flex-1 gap-2">
            <input
              type="number"
              placeholder="Lat"
              value={latInput}
              onChange={(e) => setLatInput(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Lng"
              value={lngInput}
              onChange={(e) => setLngInput(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleApplyCoordinates}
              className="bg-zinc-200 text-zinc-800 px-4 rounded-xl text-sm font-medium hover:bg-zinc-300 transition whitespace-nowrap"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm font-medium text-zinc-600">
        Click anywhere on the map below to move the pin manually.
      </p>

      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-zinc-200 z-0 shadow-sm">
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
