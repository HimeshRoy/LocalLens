import { useQuery } from "@tanstack/react-query";
import { conversationApi } from "../api/conversation.api";

export const useConversation = (id?: string) => {
  return useQuery({
    queryKey: ["ai-conversation", id],
    queryFn: () => conversationApi.getConversation(id!),
    enabled: !!id,
  });
};
