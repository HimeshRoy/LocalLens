import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { adminApi } from "../api/admin.api";

export const useAdminDeletePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      adminApi.deletePlace(id),

    onSuccess: () => {
      toast.success("Place deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-places"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete place"
      );
    },
  });
};