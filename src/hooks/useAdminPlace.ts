import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";

export const useAdminPlace = (id?: string) => {
  return useQuery({
    queryKey: ["admin-place", id],

    queryFn: () => adminApi.getPlaceById(id!),

    enabled: !!id,
  });
};
