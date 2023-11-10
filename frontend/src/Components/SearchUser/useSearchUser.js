import { useMutation } from "@tanstack/react-query";
import { searchUser as searchUserApi } from "../../services/apiUser";

export const useSearchUser = () => {
  const { mutate: searchUser, isLoading } = useMutation({
    mutationFn: (query) => searchUserApi(query),
  });
  return { searchUser, isLoading };
};
