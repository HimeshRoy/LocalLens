import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";

export const useAdminVerificationRequests = () => {
  return useQuery({
    queryKey: ["admin-verification-requests"],

    queryFn: adminApi.getVerificationRequests,
  });
};