import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { adminApi } from "../api/admin.api";

export const useApproveVerificationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      adminApi.approveVerificationRequest(id),

    onSuccess: () => {
      toast.success("Verification request approved.");

      queryClient.invalidateQueries({
        queryKey: ["admin-verification-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-verification-request"],
      });

      queryClient.invalidateQueries({
        queryKey: ["verification-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to approve verification request."
      );
    },
  });
};