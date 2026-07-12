import { useQuery } from "@tanstack/react-query";
import { feedApi } from "../api/feed.api";

export const useFeed = (
  latitude?: number,
  longitude?: number,
) => {
  return useQuery({
    queryKey: ["feed", latitude, longitude],

    queryFn: () =>
      feedApi.getFeed(latitude, longitude),
  });
};