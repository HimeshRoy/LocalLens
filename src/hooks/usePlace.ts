import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/place.api";

export const usePlace = (slug?: string) => {
  return useQuery({
    queryKey: ["place", slug],

    queryFn: () => placeApi.getBySlug(slug!),

    enabled: !!slug,

    staleTime: 1000 * 60 * 5,
  });
};