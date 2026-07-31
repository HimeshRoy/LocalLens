import LocationPicker from "./LocationPicker";
import type { LocationData } from "../../types/location.types";

interface NavbarProps {
  city?: string;
  loading?: boolean;
  refreshLocation: () => Promise<LocationData | null>;
}

const Navbar = ({ city, loading, refreshLocation }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 h-[72px] bg-white">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4 md:justify-end">
        <h1 className="text-2xl font-bold tracking-tight text-blue-700 md:hidden">
           <a href="/">
            LocalLens
            </a>
        </h1>

        <LocationPicker
          city={city}
          loading={loading}
          refreshLocation={refreshLocation}
        />
      </div>
    </header>
  );
};

export default Navbar;
