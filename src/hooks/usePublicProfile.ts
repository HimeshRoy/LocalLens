import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const usePublicProfile = (username: string) => {
  return useQuery({
    queryKey: ["public-profile", username],
    queryFn: () => userApi.getPublicProfile(username),
    enabled: !!username,
  });
};