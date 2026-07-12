import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../api/review.api";

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      rating,
      comment,
    }: {
      reviewId: string;
      rating?: number;
      comment?: string;
    }) =>
      reviewApi.update(reviewId, {
        rating,
        comment,
      }),

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
