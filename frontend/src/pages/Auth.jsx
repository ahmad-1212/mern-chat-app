import { useEffect } from "react";
import LoginForm from "../features/Authentication/LoginForm";
import SignupForm from "../features/Authentication/SignupForm";
import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoginPage = searchParams.get("auth") === "login";
  const isSignupPage = searchParams.get("auth") === "signup";

  useEffect(() => {
    if ((!isLoginPage, !isSignupPage)) {
      searchParams.set("auth", "login");
      setSearchParams(searchParams);
    }
  }, [isLoginPage, isSignupPage, searchParams, setSearchParams]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      component="main"
      sx={{
        width: "100%",
        height: "100dvh",
        overflowY: "auto",
        padding: "3rem 0rem",
        background:
          "linear-gradient(113deg, #0066D6 1.52%, rgba(0, 102, 214, 0.50) 96.52%)",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="3.5rem"
        padding="5rem 4rem"
        bgcolor="grey.main"
        borderRadius="0.5rem"
        sx={{
          width: "40rem",
          boxShadow: "0 5px 24px rgba(0,0,0,0.1)",
        }}
      >
        <Typography textAlign="center" variant="h3" fontWeight={600}>
          {isLoginPage
            ? "Login to your Account!"
            : "Signup to create an Account!"}
        </Typography>

        {isLoginPage && <LoginForm />}
        {isSignupPage && <SignupForm />}
      </Box>
    </Stack>
  );
};

export default Login;
