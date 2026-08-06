import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";

export const useAdminVerificationRequest = (
  id?: string,
) => {
  return useQuery({
    queryKey: ["admin-verification-request", id],

    queryFn: () =>
      adminApi.getVerificationRequestById(id!),

    enabled: !!id,
  });
};