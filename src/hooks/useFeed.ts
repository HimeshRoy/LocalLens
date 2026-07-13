import { useInfiniteQuery } from "@tanstack/react-query";
import { feedApi } from "../api/feed.api";

export const useFeed = (
  latitude?: number,
  longitude?: number,
) => {
  return useInfiniteQuery({
    queryKey: ["feed", latitude, longitude],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      feedApi.getFeed(latitude, longitude, pageParam),

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data.hasMore) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
};