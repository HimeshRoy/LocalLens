import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collectionId,
      payload,
    }: {
      collectionId: string;
      payload: {
        name?: string;
        emoji?: string;
        description?: string;
        isPrivate?: boolean;
      };
    }) => collectionApi.update(collectionId, payload),

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