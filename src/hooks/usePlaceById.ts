import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/place.api";

export const usePlaceById = (id: string) => {
  return useQuery({
    queryKey: ["place", id],
    queryFn: () => placeApi.getById(id),
    enabled: !!id,
  });
};