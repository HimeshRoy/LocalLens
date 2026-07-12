import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../api/search.api";

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],

    queryFn: () => searchApi.searchPlaces(query),

    enabled: query.trim().length > 0,

    staleTime: 1000 * 60 * 5,
  });
};