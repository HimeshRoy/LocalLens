import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useMyPlaces = (enabled = true) => {
  return useQuery({
    queryKey: ["my-places"],
    queryFn: userApi.getMyPlaces,
    enabled,
  });
};