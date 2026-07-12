import { useQuery } from "@tanstack/react-query";
import { locationApi } from "../api/location.api";

export const useSearchLocation = (query: string) => {
  return useQuery({
    queryKey: ["location-search", query],

    queryFn: () => locationApi.search(query),

    enabled: query.trim().length >= 2,

    staleTime: 1000 * 60 * 5,
  });
};