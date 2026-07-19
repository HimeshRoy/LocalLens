import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCategoryApi } from "../api/admin-category.api";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminCategoryApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-categories"],
      });
    },
  });
};