import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useMyReviews = (enabled = true) => {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: userApi.getMyReviews,
    enabled,
  });
};