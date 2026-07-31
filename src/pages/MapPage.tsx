import MainLayout from "../layouts/MainLayout";
import PlacesMap from "../components/map/PlacesMap";
import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/place.api";

const MapPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-places"],
    queryFn: () => placeApi.getAll(),
  });

  const places = data?.data || [];

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-3 pb-15 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Explore the Map</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Discover amazing places added by the LocalLens community.
            </p>
          </div>
        </div>
        <div className="h-[60vh] w-full relative z-0 overflow-hidden rounded-3xl shadow-sm border border-zinc-200">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center bg-zinc-50">
              <span className="text-zinc-500 font-medium animate-pulse">Loading map...</span>
            </div>
          ) : (
            <PlacesMap places={places} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MapPage;