import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as singupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password, passwordConfirm }) =>
      singupApi({ fullName, email, password, passwordConfirm }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Signup successfull!");
    },
  });
  return { signup, isLoading };
};
