import MainLayout from "../layouts/MainLayout";
import FeedCard from "../components/feed/FeedCard";
import { useLocationStore } from "../store/location.store";
import { useFeed } from "../hooks/useFeed";
import FeedSkeleton from "../components/feed/FeedSkeleton";
import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
        <div className="min-h-full flex-col justify-center items-center">
          <DotLottieReact
            src="https://lottie.host/fc82f83d-44b6-4942-bddd-20cc5106afc7/wpq7VZV2s8.lottie"
            loop
            autoplay
          />
          <p className="text-center">Something went wrong.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {places.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl">
              <DotLottieReact
                src="https://lottie.host/aed8d2ec-c0ff-4852-acbd-df55e35881fe/cjqdGIiW26.lottie"
                loop
                autoplay
              />
            </div>

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
