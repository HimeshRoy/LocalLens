import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface VerificationRequest {
  id: string;

  reason?: string;

  documentUrl: string;
  documentPublicId: string;

  selfieUrl?: string;
  selfiePublicId?: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  rejectionReason?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateVerificationRequestPayload {
  reason?: string;

  documentUrl: string;
  documentPublicId: string;

  selfieUrl?: string;
  selfiePublicId?: string;
}

export const verificationRequestApi = {
  create: async (formData: FormData) => {
    const { data } = await api.post("/verification-requests", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  getMine: async () => {
    const { data } = await api.get<ApiResponse<VerificationRequest[]>>(
      "/verification-requests/my",
    );

    return data;
  },
};
