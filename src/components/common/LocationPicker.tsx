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
        className="flex w-full items-center gap-3 rounded-2xl p-3 transition hover:bg-zinc-100 bg-zinc-200"
      >
        <MapPin size={20} className=" text-cyan-600"/>

        <span className="font-medium">
          {loading ? "Detecting..." : city || "Unknown"}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 clay rounded-3xl p-5">
          <div>
            <p className="text-sm text-zinc-500">Your Location</p>

            <h3 className="mt-1 text-lg font-semibold">{city || "Unknown"}</h3>
          </div>

          <button
            type="button"
            onClick={async () => {
              await refreshLocation();
              setIsOpen(false);
            }}
            className="mt-5 flex w-full items-center gap-3 rounded-2xl p-3 transition hover:bg-zinc-100"
          >
            <LocateFixed size={18} />

            <span>Use Current Location</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
