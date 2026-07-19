import { useQuery } from "@tanstack/react-query";
import { adminCategoryApi } from "../api/admin-category.api";

export const useAdminCategory = (id?: string) => {
  return useQuery({
    queryKey: ["admin-category", id],
    queryFn: () => adminCategoryApi.getById(id!),
    enabled: !!id,
  });
};