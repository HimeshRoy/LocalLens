import MainLayout from "../layouts/MainLayout";
import FeedCard from "../components/feed/FeedCard";
import { useLocationStore } from "../store/location.store";
import { useFeed } from "../hooks/useFeed";
import FeedSkeleton from "../components/feed/FeedSkeleton";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const { latitude, longitude } = useLocationStore();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed(latitude ?? undefined, longitude ?? undefined);

  const places = data?.pages.flatMap((page: any) => page.data.items) ?? [];
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <FeedSkeleton key={index} />
          ))}
        </div>
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
        {places.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl">📍</div>

            <h2 className="mt-4 text-xl font-semibold">Nothing nearby yet</h2>

            <p className="mt-2 max-w-sm text-zinc-500">
              We couldn't find any places within 80 km of your location.
            </p>
          </div>
        ) : (
          places.map((place: any) => <FeedCard key={place.id} place={place} />)
        )}
        {isFetchingNextPage && <FeedSkeleton />}

        <div ref={loadMoreRef} className="h-10" />
      </div>
    </MainLayout>
  );
};

export default HomePage;
