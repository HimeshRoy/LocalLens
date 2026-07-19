import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { adminApi } from "../api/admin.api";

export const useAdminUpdatePlaceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminApi.updatePlaceStatus(id, isActive),

    onSuccess: () => {
      toast.success("Place status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-places"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-place"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update place status",
      );
    },
  });
};
