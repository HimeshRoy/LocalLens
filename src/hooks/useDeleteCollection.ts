import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectionApi.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-collections"],
      });
    },
  });
};