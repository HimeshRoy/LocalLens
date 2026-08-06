import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { adminApi } from "../api/admin.api";

export const useRejectVerificationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      adminApi.rejectVerificationRequest(id),

    onSuccess: () => {
      toast.success("Verification request rejected.");

      queryClient.invalidateQueries({
        queryKey: ["admin-verification-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-verification-request"],
      });

      queryClient.invalidateQueries({
        queryKey: ["verification-requests"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to reject verification request."
      );
    },
  });
};