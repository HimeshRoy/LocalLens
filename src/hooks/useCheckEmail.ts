import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useCheckEmail = (email: string) => {
  return useQuery({
    queryKey: ["check-email", email],

    queryFn: () => authApi.checkEmail(email),

    enabled: email.trim().length > 5,

    staleTime: 1000 * 60,
  });
};