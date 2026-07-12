import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../api/review.api";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.create,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["place-reviews", variables.placeId],
      });

      queryClient.invalidateQueries({
        queryKey: ["place"],
      });

      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
    },
  });
};
