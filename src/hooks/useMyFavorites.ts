import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useMyFavorites = () => {
  return useQuery({
    queryKey: ["my-favorites"],
    queryFn: userApi.getMyFavorites,
  });
};