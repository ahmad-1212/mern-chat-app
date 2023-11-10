import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUser(),
    queryKey: ["user"],
    retry: false,
  });

  return { user, isLoading, isAuthenticated: user?.authenticated, error };
};
