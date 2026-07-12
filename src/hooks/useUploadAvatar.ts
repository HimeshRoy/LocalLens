import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.uploadAvatar,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};