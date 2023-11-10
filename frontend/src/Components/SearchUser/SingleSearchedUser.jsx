import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useCreateChat } from "../Chats/useCreateChat";
import UserAvatar from "../../ui/UserAvatar";
import FullPageLoading from "../../ui/FullPageLoading";

const SingleUser = styled.li`
  list-style: none;
  padding: 1rem 2rem;
  background-color: ${(props) => props.colors.grey.dark};
  border-radius: 5px;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.colors.primary.main};
    color: ${(props) => props.colors.grey.light};
    transform: translateY(-2px);
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const SingleSearchedUser = ({
  user,
  closeModal,
  createGroup,
  selectedUsers,
  setSelectedUsers,
}) => {
  const { createChat, isLoading } = useCreateChat();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { palette } = useTheme();

  // Function to create a chat
  const handleClick = () => {
    if (!createGroup) {
      createChat(user._id, {
        onSuccess: (data) => {
          searchParams.set("chat-id", data._id);
          setSearchParams(searchParams);
          queryClient.invalidateQueries(["chats"]);
          closeModal();
          toast.success("Chat created successfully!");
        },
        onError: (err) =>
          toast.error(
            err.message ?? "There was an error while creating chat, Try again!"
          ),
      });
    }

    if (createGroup) {
      const isUserExists = selectedUsers.find((usr) => usr._id === user._id);

      if (isUserExists) return;
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  return (
    <>
      {isLoading && <FullPageLoading />}
      <SingleUser onClick={() => handleClick(user._id)} colors={palette}>
        <UserAvatar
          src={user?.photo ?? "/default-user.jpg"}
          width="50px"
          height="50px"
        />
        <Stack>
          <Typography variant="h4" fontWeight={600}>
            {user.name}
          </Typography>
          <Typography variant="h5">{user.email}</Typography>
        </Stack>
      </SingleUser>
    </>
  );
};

export default SingleSearchedUser;
