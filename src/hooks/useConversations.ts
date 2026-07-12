import { useQuery } from "@tanstack/react-query";
import { conversationApi } from "../api/conversation.api";

export const useConversations = () => {
  return useQuery({
    queryKey: ["ai-conversations"],
    queryFn: conversationApi.getConversations,
  });
};