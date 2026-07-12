import { useMutation } from "@tanstack/react-query";
import { aiApi } from "../api/ai.api";

export const useAIChat = () => {
  return useMutation({
    mutationFn: ({
      message,
      conversationId,
    }: {
      message: string;
      conversationId?: string;
    }) => aiApi.chat(message, conversationId),
  });
};