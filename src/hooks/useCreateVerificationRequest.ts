import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  verificationRequestApi,
} from "../api/verification-request.api";

export const useCreateVerificationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
  verificationRequestApi.create(),
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["verification-requests"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to submit verification request.",
      );
    },
  });
};
