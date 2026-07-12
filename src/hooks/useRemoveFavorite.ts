import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteApi } from "../api/favorite.api";

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteApi.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });

      queryClient.invalidateQueries({
        queryKey: ["places"],
      });

      queryClient.invalidateQueries({
        queryKey: ["place"],
      });

      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
    },
  });
};
