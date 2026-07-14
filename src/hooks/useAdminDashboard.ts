import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],

    queryFn: adminApi.getDashboard,

    staleTime: 1000 * 60,
  });
};