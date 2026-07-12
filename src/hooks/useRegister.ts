import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authApi, type RegisterPayload } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export const useRegister = () => {
  const login = useAuthStore((state) => state.login);

  const mutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),

    onSuccess: (response) => {
      login(response.data.user, response.data.token);
    },
  });

  let errorMessage = "";

  if (mutation.error) {
    if (axios.isAxiosError(mutation.error)) {
      errorMessage =
        mutation.error.response?.data?.message ??
        "Something went wrong. Please try again.";
    } else {
      errorMessage = "Something went wrong. Please try again.";
    }
  }

  return {
    ...mutation,
    errorMessage,
  };
};
