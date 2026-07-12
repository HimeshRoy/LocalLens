import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../api/review.api";

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => reviewApi.remove(reviewId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["place-reviews"],
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
