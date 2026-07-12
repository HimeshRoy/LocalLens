import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useCheckUsername = (username: string) => {
  return useQuery({
    queryKey: ["check-username", username],

    queryFn: () => authApi.checkUsername(username),

    enabled: username.trim().length >= 3,

    staleTime: 1000 * 60,
  });
};