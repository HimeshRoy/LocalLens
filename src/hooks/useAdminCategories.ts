import { useQuery } from "@tanstack/react-query";
import { adminCategoryApi } from "../api/admin-category.api";

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: adminCategoryApi.getAll,
  });
};