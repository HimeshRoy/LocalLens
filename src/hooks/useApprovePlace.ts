import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { adminApi } from "../api/admin.api";

export const useApprovePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.approvePlace(id),

    onSuccess: () => {
      toast.success("Place approved successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-places"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-place"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to approve place",
      );
    },
  });
};