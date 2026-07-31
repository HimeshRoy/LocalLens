import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
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

interface PlacesMapProps {
  places: any[];
  centerLat?: number;
  centerLng?: number;
}

const PlacesMap = ({ places, centerLat = 20.5937, centerLng = 78.9629 }: PlacesMapProps) => {
  const LOCATIONIQ_TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN;

  return (
    <div className="h-full w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-sm z-0">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://locationiq.com/?ref=maps">LocationIQ</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={`https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LOCATIONIQ_TOKEN}`}
          subdomains={["a", "b", "c"]}
          maxZoom={18}
        />

        {places.map((place) => (
          <Marker key={place.id} position={[place.latitude, place.longitude]}>
            <Popup className="custom-popup">
              <div className="flex flex-col gap-2 p-1 min-w-[150px]">
                <img 
                  src={place.coverImage || "https://placehold.co/400x300?text=Place"} 
                  alt={place.name} 
                  className="w-full h-24 object-cover rounded-xl"
                />
                <h3 className="font-bold text-black text-sm">{place.name}</h3>
                <p className="text-xs text-zinc-500">{place.city}</p>
                <Link 
                  to={`/places/${place.slug}`}
                  className="bg-blue-600 text-white text-center text-xs font-semibold py-2 rounded-lg mt-1"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PlacesMap;