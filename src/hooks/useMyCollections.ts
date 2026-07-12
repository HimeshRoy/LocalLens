import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useMyCollections = (enabled = true) => {
  return useQuery({
    queryKey: ["my-collections"],
    queryFn: userApi.getMyCollections,
    enabled,
  });
};