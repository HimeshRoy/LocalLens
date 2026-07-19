import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCategoryApi } from "../api/admin-category.api";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        description: string;
        icon: string;
        isActive: boolean;
      };
    }) => adminCategoryApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-categories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-category", variables.id],
      });
    },
  });
};