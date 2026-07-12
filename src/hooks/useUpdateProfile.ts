import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateMe,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["public-profile"],
      });
    },
  });
};
