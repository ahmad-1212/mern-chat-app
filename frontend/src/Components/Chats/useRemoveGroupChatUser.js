import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGroupChatUser } from "../../services/apiChats";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export const useRemoveGroupChatUser = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const chtId = searchParams.get("chat-id");

  const { mutate: removeUser, isLoading } = useMutation({
    mutationFn: ({ userId, chatId }) => removeGroupChatUser(userId, chatId),
    onSuccess: () => {
      queryClient.invalidateQueries(["chat", chtId]);
      toast.success("User successfully removed from group!");
    },
    onError: (err) =>
      toast.error(
        err.message ??
          "Something went wrong while removing user, please try again!"
      ),
  });
  return { removeUser, isLoading };
};
