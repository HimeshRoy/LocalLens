import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { adminApi } from "../api/admin.api";

export const useAdminVerifyPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isVerified }: { id: string; isVerified: boolean }) =>
      adminApi.verifyPlace(id, isVerified),

    onSuccess: () => {
      toast.success("Place verification updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-places"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-place"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update place verification",
      );
    },
  });
};
