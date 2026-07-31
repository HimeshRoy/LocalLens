import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useLocation } from "../../hooks/useLocation";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface DirectionsMapProps {
  destinationLat: number;
  destinationLng: number;
  destinationName: string;
}

const DirectionsMap = ({ destinationLat, destinationLng, destinationName }: DirectionsMapProps) => {
  const { latitude: userLat, longitude: userLng, loading: locationLoading, refreshLocation } = useLocation();
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);

  const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;
  useEffect(() => {
    if (!userLat || !userLng) {
      refreshLocation();
    }
  }, [userLat, userLng]);
  useEffect(() => {
    if (userLat && userLng && destinationLat && destinationLng) {
      const fetchRoute = async () => {
        setLoadingRoute(true);
        try {
          const res = await axios.get(
            `https://us1.locationiq.com/v1/directions/driving/${userLng},${userLat};${destinationLng},${destinationLat}?key=${LOCATIONIQ_TOKEN}&geometries=geojson`
          );
          const coords = res.data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);
          setRouteCoords(coords);
        } catch (error) {
          console.error("Failed to fetch route", error);
        } finally {
          setLoadingRoute(false);
        }
      };
      fetchRoute();
    }
  }, [userLat, userLng, destinationLat, destinationLng]);

  if (locationLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm">
        <span className="animate-pulse font-medium text-zinc-500">Detecting your location...</span>
      </div>
    );
  }

  if (!userLat || !userLng) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm">
        <span className="font-medium text-zinc-500">Please enable location access to see directions.</span>
      </div>
    );
  }

  const centerLat = (userLat + destinationLat) / 2;
  const centerLng = (userLng + destinationLng) / 2;

  return (
    <div className="relative z-0 h-96 w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-sm">
      {loadingRoute && (
        <div className="absolute left-1/2 top-4 z-[1000] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-md">
          Calculating Route...
        </div>
      )}
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={12}
        scrollWheelZoom={true}
        className="z-0 h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://locationiq.com/?ref=maps">LocationIQ</a>'
          url={`https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LOCATIONIQ_TOKEN}`}
          subdomains={["a", "b", "c"]}
        />
        <Marker position={[userLat, userLng]}>
          <Popup>You are here</Popup>
        </Marker>
        <Marker position={[destinationLat, destinationLng]}>
          <Popup>{destinationName}</Popup>
        </Marker>
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="#2563eb" weight={5} opacity={0.8} />
        )}
      </MapContainer>
    </div>
  );
};

export default DirectionsMap;