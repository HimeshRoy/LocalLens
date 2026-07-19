import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";

interface UseAdminPlacesParams {
  search?: string;
  categoryId?: string;
  status?: string;
  isVerified?: boolean;
  page?: number;
  limit?: number;
}

export const useAdminPlaces = (
  params: UseAdminPlacesParams,
) => {
  return useQuery({
    queryKey: ["admin-places", params],

    queryFn: () => adminApi.getPlaces(params),

    placeholderData: (previousData) => previousData,
  });
};