import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminApi } from "../api/admin.api";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      role,
    }: {
      userId: string;
      role: "USER" | "BUSINESS" | "ADMIN";
    }) =>
      adminApi.updateUserRole(
        userId,
        role,
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
          "Failed to update user role."
      );
    },
  });
};