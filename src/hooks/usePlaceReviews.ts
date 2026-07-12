import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "../api/review.api";

export const usePlaceReviews = (placeId?: string) => {
  return useQuery({
    queryKey: ["place-reviews", placeId],

    queryFn: () => reviewApi.getPlaceReviews(placeId!),

    enabled: !!placeId,

    staleTime: 1000 * 60,
  });
};
