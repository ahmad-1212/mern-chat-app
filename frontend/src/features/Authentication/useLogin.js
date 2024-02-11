import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ password, email }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Logged in successfull!");
    },
  });

  return { login, isLoading, error };
};
