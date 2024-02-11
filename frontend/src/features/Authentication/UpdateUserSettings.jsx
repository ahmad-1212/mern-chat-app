import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { useUser } from "../Authentication/useUser";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isemail";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useUpdateUser } from "./useUpdateUser";
import ButtonSecondary from "../../Components/UI/ButtonSecondary";
import SpinnerSmall from "../../Components/UI/SpinnerSmall";
import FormRowVertical from "../../Components/UI/FormRowVertical";
import Form from "../../Components/UI/Form";
import Input from "../../Components/UI/Input";

const Img = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
`;

const Label = styled.label`
  position: absolute;
  font-size: 1.6rem;
  bottom: 1rem;
  right: -1rem;
  display: flex;
  align-items: center;
  background-color: rgb(227, 227, 227, 0.6);
  backdrop-filter: blur(3px);
  border-radius: 5px;
  padding: 0px 5px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const EditUser = ({ setUpdateUser }) => {
  const queryClient = useQueryClient();
  const {
    user: { user },
  } = useUser();
  const { updateUser, isLoading } = useUpdateUser();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Check if the file is image or not
    if (!file.type.startsWith("image")) return setImageError(true);

    // Create url from selected image to show it
    const url = URL.createObjectURL(file);
    setImage(url);
    setImageFile(file);
  };

  // Form submit handler
  const onSubmit = ({ name, email }) => {
    if (user.name.toLowerCase() === "guest") {
      return toast.error("You are not allowed to change guest user data!");
    }
    const data = {
      name,
      email,
    };

    // If image exists set photo in data
    if (image) {
      data.photo = imageFile;
    }

    // User update function
    updateUser(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        setUpdateUser(false);
        toast.success("Data updated successfull!");
      },
      onError: (err) =>
        toast.err(
          err.message ??
            "There was an error while updating your data, please try again!"
        ),
    });
  };

  return (
    <Form style={{ marginTop: "1.6rem" }} onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical error={errors?.name?.message}>
        <Input
          id="name"
          {...register("name", {
            required: "Please provide your name",
          })}
          error={errors?.name?.message}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.email?.message}>
        <Input
          id="email"
          {...register("email", {
            required: "Please provide your email",
            validate: {
              validate: (value) =>
                isEmail(value) || "Please provide a valide email!",
            },
          })}
          error={errors?.email?.message}
        />
      </FormRowVertical>
      <Box mx="auto" width="15rem" height="15rem" position="relative">
        <Img src={image ?? user.photo} />
        <Label htmlFor="image">
          <EditIcon fontSize="inherit" sx={{ marginRight: "5px" }} />
          <span>Edit</span>
        </Label>
        <Input
          accept="image/*"
          id="image"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </Box>
      {imageError && (
        <Typography variant="p" fontSize="1rem" textAlign="center" color="red">
          The file you provided is not an image
        </Typography>
      )}
      <ButtonSecondary disabled={isLoading} type="submit">
        {isLoading ? <SpinnerSmall /> : "Update settings"}
      </ButtonSecondary>
    </Form>
  );
};

export default EditUser;
