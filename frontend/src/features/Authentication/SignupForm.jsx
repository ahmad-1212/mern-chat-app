import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import isEmail from "validator/lib/isemail";
import { Box } from "@mui/material";

import ButtonSecondary from "../../Components/UI/ButtonSecondary";
import Form from "../../Components/UI/Form";
import Input from "../../Components/UI/Input";
import FormRowVertical from "../../Components/UI/FormRowVertical";
import FormLabel from "../../Components/UI/FormLabel";
import { useSignup } from "./useSignup";
import SpinnerSmall from "../../Components/UI/SpinnerSmall";

const SignupForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { signup, isLoading } = useSignup();
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // To change page from signup to login
  const handlePage = () => {
    searchParams.set("auth", "login");
    setSearchParams(searchParams);
  };

  // Form submit handler
  const onSubmit = ({ name, email, password, confirmPassword }) => {
    signup(
      {
        fullName: name,
        email,
        password,
        passwordConfirm: confirmPassword,
      },
      {
        onError: (err) =>
          setError("email", { type: "email", message: err.message }),
      }
    );
  };

  return (
    <Form gap="2rem" onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical gap="0.6rem" error={errors?.name?.message}>
        <FormLabel id="name">Full Name</FormLabel>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Please provide your name!" })}
          error={errors?.name?.message}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical gap="0.6rem" error={errors?.email?.message}>
        <FormLabel id="email">Email Address</FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is requried!",
            validate: (value) =>
              isEmail(value) || "Please provide a valide email!",
          })}
          error={errors?.email?.message}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical gap="0.6rem" error={errors?.password?.message}>
        <FormLabel id="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password must be at least 8 chars!",
            },
          })}
          error={errors?.password?.message}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical gap="0.6rem" error={errors?.confirmPassword?.message}>
        <FormLabel id="confirmPassword">Confirm Password</FormLabel>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please provide confirm password",
            validate: {
              validate: (value) =>
                getValues().password === value || "Passwords are not the same!",
            },
          })}
          error={errors?.confirmPassword?.message}
          disabled={isLoading}
        />
      </FormRowVertical>

      <Box display="flex" flexDirection="column" gap="6px">
        <ButtonSecondary disabled={isLoading} type="submit">
          {isLoading ? <SpinnerSmall /> : "Sign up"}
        </ButtonSecondary>
        <Box textAlign="center" fontSize="1.4rem">
          Already have an account!{" "}
          <Box
            component="span"
            ml="2px"
            color="secondary.main"
            sx={{ cursor: "pointer" }}
            onClick={handlePage}
          >
            Login
          </Box>
        </Box>
      </Box>
    </Form>
  );
};

export default SignupForm;
