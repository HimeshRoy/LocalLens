import { useQuery } from "@tanstack/react-query";
import { verificationRequestApi } from "../api/verification-request.api";

export const useMyVerificationRequests = () => {
  return useQuery({
    queryKey: ["verification-requests"],

    queryFn: verificationRequestApi.getMine,
  });
};