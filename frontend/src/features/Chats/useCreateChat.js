import { useMutation } from "@tanstack/react-query";
import { createChat as createChatApi } from "../../services/apiChats";

export const useCreateChat = () => {
  const {
    mutate: createChat,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createChatApi,
  });

  return { createChat, isLoading, error };
};
