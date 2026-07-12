import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authApi, type LoginPayload } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),

    onSuccess: (response) => {
      login(response.data.user, response.data.token);
    },
  });

  let errorMessage = "";

  if (mutation.error) {
    if (axios.isAxiosError(mutation.error)) {
      errorMessage =
        mutation.error.response?.data?.message ??
        "Something went wrong. Check your password or username";
    } else {
      errorMessage = "Something when wrong. Check your password or username";
    }
  }

  return {
    ...mutation,
    errorMessage,
  };
};
