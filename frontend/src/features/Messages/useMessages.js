import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getMessages } from "../../services/apiMessages";

export const useMessages = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat-id") || null;
  const {
    data: messages,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getMessages(chatId),
    queryKey: ["messages", chatId],
    onError: (err) => toast.error(err.message),
  });

  return { messages: messages?.messages, isLoading, error };
};
