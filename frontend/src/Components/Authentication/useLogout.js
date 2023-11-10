import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogout = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: logout,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      query.removeQueries();
      navigate("/auth", { replace: true });
      toast.success("Logged out successfull!");
    },
  });

  return { logout, isLoading, error };
};
