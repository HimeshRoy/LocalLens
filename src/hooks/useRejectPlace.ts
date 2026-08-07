import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { adminApi } from "../api/admin.api";

export const useRejectPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.rejectPlace(id),

    onSuccess: () => {
      toast.success("Place rejected successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-places"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-place"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to reject place",
      );
    },
  });
};