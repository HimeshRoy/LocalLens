import { useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationApi } from "../api/conversation.api";

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: conversationApi.deleteConversation,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ai-conversations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ai-conversation"],
      });
    },
  });
};