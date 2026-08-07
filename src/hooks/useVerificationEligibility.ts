import { useQuery } from "@tanstack/react-query";
import { verificationRequestApi } from "../api/verification-request.api";

export const useVerificationEligibility = () => {
  return useQuery({
    queryKey: ["verification-eligibility"],

    queryFn: verificationRequestApi.getEligibility,
  });
};