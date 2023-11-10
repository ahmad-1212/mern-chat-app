import { useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiUser";

export const useUpdateUser = () => {
  const {
    mutate: updateUser,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (data) => updateUserApi(data),
  });

  return { updateUser, isLoading, error };
};
