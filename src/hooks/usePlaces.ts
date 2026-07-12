import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/place.api";
import type { ApiResponse } from "../types/api.types";
import type { Place } from "../types/place.types";

export const usePlaces = (search = "") => {
  return useQuery<ApiResponse<Place[]>>({
    queryKey: ["places", search],

    queryFn: () => placeApi.getAll(search),

    staleTime: 1000 * 60 * 5,
  });
};
