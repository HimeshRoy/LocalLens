import { ChevronDown, MapPin, LocateFixed } from "lucide-react";
import { useState } from "react";
import type { LocationData } from "../../types/location.types";

interface LocationPickerProps {
  city?: string;
  loading?: boolean;
  refreshLocation: () => Promise<LocationData | null>;
}

const LocationPicker = ({
  city,
  loading,
  refreshLocation,
}: LocationPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 transition active:opacity-50"
      >
        <span className="text-sm font-semibold text-black">
          {loading ? "Detecting..." : city || "Unknown"}
        </span>

        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`text-black transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        // Redesign: Replaced .clay with a clean bg-white, thin border, and standard subtle shadow
        <div className="absolute right-0 mt-3 w-64 bg-white border border-zinc-200 shadow-md rounded-xl p-4 z-50">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-zinc-100">
             <div className="bg-zinc-100 p-2 rounded-full">
               <MapPin size={16} className="text-black" />
             </div>
             <div>
                <p className="text-xs text-zinc-500">Your Location</p>
                <h3 className="text-sm font-semibold text-black">{city || "Unknown"}</h3>
             </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await refreshLocation();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg p-2 transition hover:bg-zinc-50 active:bg-zinc-100 text-black text-sm font-medium"
          >
            <LocateFixed size={18} strokeWidth={1.5} />
            <span>Use Current Location</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;