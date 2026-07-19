import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminApi } from "../api/admin.api";

export const useUpdateUserVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      isVerified,
    }: {
      userId: string;
      isVerified: boolean;
    }) =>
      adminApi.updateUserVerification(
        userId,
        isVerified,
      ),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update verification."
      );
    },
  });
};