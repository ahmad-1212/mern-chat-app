import { useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import UserAvatar from "../../ui/UserAvatar";
import { useOnlineUsers } from "../../context/OnlineUsers";
import { useRemoveGroupChatUser } from "./useRemoveGroupChatUser";

const ListItem = styled.li`
  width: 100%;
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 5rem max-content 1fr;
  column-gap: 2rem;
`;

const Btn = styled(Button)`
  border: 1px solid red;
  padding: 0.5rem 1rem;
  background-color: rgb(255, 0, 0, 0.4);
  border-radius: 5px;
  font-size: 1rem;
  color: #000;

  &:disabled {
    cursor: not-allowed;

    &:hover {
      background-color: rgb(255, 0, 0, 0.4);
    }
  }
`;

const ChatGroupDetailsItem = ({ user, chat, you = false, isAdmin = false }) => {
  const { onlineUsers } = useOnlineUsers();
  const [showRemove, setShowRemove] = useState(false);
  const { removeUser, isLoading } = useRemoveGroupChatUser();

  // Check if user is online or not
  const isUserOnline = onlineUsers.find((usr) => usr.userId === user._id);

  const handleRemoveUser = () => {
    removeUser({ userId: user._id, chatId: chat._id });
  };

  return (
    <ListItem>
      <Box
        width="5rem"
        height="5rem"
        className={isUserOnline ? "user-online" : ""}
      >
        <UserAvatar src={user.photo} width="4rem" height="4rem" />
      </Box>
      <div>
        <Typography variant="h5" fontSize="1.2rem" fontWeight={600}>
          {you ? "You" : user.name}
        </Typography>
        <Typography variant="h6" fontWeight={500}>
          {user.email}
        </Typography>
        {user._id === chat.groupAdmin && (
          <Typography variant="h6" fontSize="1rem" fontWeight={500}>
            admin
          </Typography>
        )}
        {isUserOnline && (
          <Typography variant="h6" fontSize="0.8rem" fontWeight={600}>
            online
          </Typography>
        )}
      </div>
      {isAdmin && !showRemove && (
        <IconButton
          onClick={() => setShowRemove(true)}
          sx={{
            marginLeft: "auto",
            fontSize: "1.6rem",
            color: "red",
            alignSelf: "start",
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
      {showRemove && (
        <Box sx={{ gridColumn: "1 / -1" }}>
          <Stack direction="row" justifyContent="end" gap="0.5rem">
            <Btn onClick={() => setShowRemove(false)}>Cancel</Btn>
            <Btn onClick={handleRemoveUser} disabled={isLoading}>
              {isLoading ? "Removing user" : "Remove user"}{" "}
            </Btn>
          </Stack>
        </Box>
      )}
    </ListItem>
  );
};

export default ChatGroupDetailsItem;
