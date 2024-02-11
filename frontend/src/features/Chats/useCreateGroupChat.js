import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGroupChat } from "../../services/apiChats";

export const useCreateGroupChat = () => {
  const queryClient = useQueryClient();
  const { mutate: createGroup, isLoading } = useMutation({
    mutationFn: (data) => createGroupChat(data),
    onSuccess: () => {
      toast.success("Group successfully created!");
      queryClient.invalidateQueries(["chats"]);
    },
    onError: (err) =>
      toast.error(err.message ?? "Something went wrong, please try again!"),
  });

  return { createGroup, isLoading };
};
