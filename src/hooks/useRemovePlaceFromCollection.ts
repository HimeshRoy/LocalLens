import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";

export const useRemovePlaceFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collectionId,
      placeId,
    }: {
      collectionId: string;
      placeId: string;
    }) =>
      collectionApi.removePlace(
        collectionId,
        placeId,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collection", variables.collectionId],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-collections"],
      });
    },
  });
};