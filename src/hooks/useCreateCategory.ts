import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCategoryApi } from "../api/admin-category.api";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminCategoryApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-categories"],
      });
    },
  });
};