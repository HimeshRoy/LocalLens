import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
    staleTime: 1000 * 60 * 10,
  });
};