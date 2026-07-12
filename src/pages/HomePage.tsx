import MainLayout from "../layouts/MainLayout";
import FeedCard from "../components/feed/FeedCard";
import { useNearbyPlaces } from "../hooks/useNearbyPlaces";
import { useLocationStore } from "../store/location.store";
import { useFeed } from "../hooks/useFeed";

const HomePage = () => {
  const { latitude, longitude } = useLocationStore();
  const { data, isLoading, error } = useFeed(
    latitude ?? undefined,
    longitude ?? undefined,
  );

  if (isLoading) {
    return (
      <MainLayout>
        <div className="p-4">Loading...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-4">Something went wrong.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {data?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl">📍</div>

            <h2 className="mt-4 text-xl font-semibold">Nothing nearby yet</h2>

            <p className="mt-2 max-w-sm text-zinc-500">
              We couldn't find any places within 80 km of your location.
            </p>
          </div>
        ) : (
          data?.data.map((place: any) =>  <FeedCard key={place.id} place={place} />)
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
