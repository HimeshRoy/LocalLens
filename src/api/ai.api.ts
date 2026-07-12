import api from "./axios";
import type { ApiResponse } from "../types/api.types";
import type { Place } from "../types/place.types";

export interface AIResponse {
  conversationId: string;

  question: string;

  answer: string;

  places: Place[];
}

export const aiApi = {
  chat: async (
    message: string,
    conversationId?: string,
  ) => {
    const response = await api.post<ApiResponse<AIResponse>>(
      "/ai/chat",
      {
        message,
        conversationId,
      },
    );

    return response.data;
  },
};