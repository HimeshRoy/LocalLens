import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: userApi.getMe,
  });