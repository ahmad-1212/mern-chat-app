import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getChat } from "../../services/apiChats";

export const useChat = () => {
  const [searchParams] = useSearchParams();

  const chatId = searchParams.get("chat-id") || null;

  const {
    data: chat,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getChat(chatId),
    queryKey: ["chat", chatId],
    enabled: chatId !== null,
  });

  return { chat, isLoading, error };
};
