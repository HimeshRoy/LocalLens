import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi } from "../api/place.api";

export const useDeletePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeApi.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-places"],
      });
    },
  });
};