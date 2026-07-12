import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/place.api";

export const useNearbyPlaces = (
  latitude?: number,
  longitude?: number,
  radius = 80,
) => {
  return useQuery({
    queryKey: ["nearby-places", latitude, longitude, radius],

    queryFn: () => placeApi.getNearby(latitude!, longitude!, radius),

    enabled: latitude != null && longitude != null,
  });
};
