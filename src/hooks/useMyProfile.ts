import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: userApi.getMe,
  });
};