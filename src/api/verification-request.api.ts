import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface VerificationRequest {
  id: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  createdAt: string;
  updatedAt: string;
}

export interface VerificationEligibility {
  isVerified: boolean;
  alreadyApplied: boolean;

  approvedPlaces: number;
  reviewsCount: number;

  requiredPlaces: number;
  requiredReviews: number;

  eligible: boolean;
}

export const verificationRequestApi = {
  create: async () => {
    const { data } = await api.post("/verification-requests");

    return data;
  },

  getMine: async () => {
    const { data } = await api.get<ApiResponse<VerificationRequest[]>>(
      "/verification-requests/my",
    );

    return data;
  },

  getEligibility: async () => {
    const { data } = await api.get("/verification-requests/eligibility");

    return data;
  },
};
