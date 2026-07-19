import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminApi } from "../api/admin.api";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      adminApi.deleteUser(userId),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete user."
      );
    },
  });
};