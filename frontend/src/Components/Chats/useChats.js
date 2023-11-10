import { useQuery } from "@tanstack/react-query";
import { getChats } from "../../services/apiChats";

export const useChats = () => {
  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    queryFn: getChats,
    queryKey: ["chats"],
  });

  return { chats, isLoading, error };
};
