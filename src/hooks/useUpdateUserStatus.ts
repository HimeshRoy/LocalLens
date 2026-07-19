import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";
import toast from "react-hot-toast";

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      isActive,
    }: {
      userId: string;
      isActive: boolean;
    }) => adminApi.updateUserStatus(userId, isActive),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update user status."
      );
    },
  });
};