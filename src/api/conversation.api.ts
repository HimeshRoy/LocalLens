import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIMessage {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

export interface ConversationDetails extends Conversation {
  messages: AIMessage[];
}

export const conversationApi = {
  getConversations: async () => {
    const response =
      await api.get<ApiResponse<Conversation[]>>("/ai/conversations");

    return response.data;
  },

  getConversation: async (id: string) => {
    const response = await api.get<ApiResponse<ConversationDetails>>(
      `/ai/conversations/${id}`,
    );

    return response.data;
  },
  deleteConversation: async (id: string) => {
    const response = await api.delete(`/ai/conversations/${id}`);

    return response.data;
  },
};
