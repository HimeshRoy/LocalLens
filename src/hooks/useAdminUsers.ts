import { useQuery } from "@tanstack/react-query";
import {
  adminApi,
  type AdminUsersResponse,
} from "../api/admin.api";
import type { ApiResponse } from "../types/api.types";

interface UseAdminUsersParams {
  search?: string;
  role?: "USER" | "BUSINESS" | "ADMIN";
  status?: "ACTIVE" | "SUSPENDED";
  verified?: "true" | "false";
  page?: number;
  limit?: number;
}

export const useAdminUsers = (
  params?: UseAdminUsersParams
) => {
  return useQuery<ApiResponse<AdminUsersResponse>>({
    queryKey: ["admin-users", params],
    queryFn: () => adminApi.getUsers(params),
  });
};