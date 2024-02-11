import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { createMessage } from "../../services/apiMessages";

export const useSendMessage = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat-id");
  const queryClient = useQueryClient();
  const {
    mutate: sendMessage,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (message) => createMessage(message, chatId),
    onSuccess: () => queryClient.invalidateQueries(["messages", chatId]),
    onError: (err) =>
      toast.error(
        err.message ?? "Something went wrong while sending message, try again!"
      ),
  });

  return { sendMessage, isLoading, error };
};
