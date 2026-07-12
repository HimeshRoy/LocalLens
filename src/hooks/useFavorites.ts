import { useQuery } from "@tanstack/react-query";
import { favoriteApi } from "../api/favorite.api";

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],

    queryFn: favoriteApi.getMine,

    staleTime: 1000 * 60 * 5,
  });
};
