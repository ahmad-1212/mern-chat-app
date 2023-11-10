import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/Authentication/useUser";
import FullPageLoading from "./FullPageLoading";
import { useEffect } from "react";

const ProtectedRoute = ({ children, authPage = false }) => {
  const { isAuthenticated, isLoading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    // when application opens and user is not authenticated navigate to auth page to authenticate
    if (!isLoading && !isAuthenticated && !authPage) navigate("/auth");

    // If application open and user already authenticated navigate to chat page
    if (isAuthenticated && !isLoading && authPage) navigate("/chats");
  }, [isLoading, isAuthenticated, navigate, authPage]);

  if (isLoading) return <FullPageLoading />;

  if ((isAuthenticated && !authPage) || (!isAuthenticated && authPage))
    return children;
};

export default ProtectedRoute;
