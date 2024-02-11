import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isemail";
import { Box } from "@mui/material";

import ButtonSecondary from "../../Components/UI/ButtonSecondary";
import Form from "../../Components/UI/Form";
import Input from "../../Components/UI/Input";
import FormRowVertical from "../../Components/UI/FormRowVertical";
import FormLabel from "../../Components/UI/FormLabel";
import { useLogin } from "./useLogin";
import SpinnerSmall from "../../Components/UI/SpinnerSmall";

const LoginForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  // To change from login to signup page
  const handlePage = () => {
    searchParams.set("auth", "signup");
    setSearchParams(searchParams);
  };

  const handleGuestCredentials = () => {
    setValue("email", "guest@example.com");
    setValue("password", "test1234");
  };

  // Form submit handler
  const onSubmit = ({ email, password }) => {
    login(
      { email, password },
      {
        onError: (err) => {
          setError("email", { message: err.message });
          setError("password", { message: true });
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical error={errors?.email?.message}>
        <FormLabel id="email">Email Address</FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Please provide an email!",
            validate: {
              validate: (value) =>
                isEmail(value) || "Please provide a valide email!",
            },
          })}
          error={errors?.email?.message}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.password?.message}>
        <FormLabel id="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Please provide a password!",
          })}
          error={errors?.password?.message}
          disabled={isLoading}
        />
      </FormRowVertical>

      <Box display="flex" flexDirection="column" gap="6px">
        <ButtonSecondary disabled={isLoading} type="submit">
          {" "}
          {isLoading ? <SpinnerSmall /> : "Login"}
        </ButtonSecondary>
        <ButtonSecondary onClick={handleGuestCredentials}>
          Get guest credentials
        </ButtonSecondary>
        <Box textAlign="center" fontSize="1.4rem">
          Don't have an account!{" "}
          <Box
            component="span"
            ml="2px"
            color="secondary.main"
            sx={{ cursor: "pointer" }}
            onClick={handlePage}
          >
            Sign up
          </Box>
        </Box>
      </Box>
    </Form>
  );
};

export default LoginForm;
