import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import UserAvatar from "../../ui/UserAvatar";
import { socket } from "../../socket";
import { useOnlineUsers } from "../../context/OnlineUsers";
import { useChat } from "./useChat";
import ChatGroupDetails from "./ChatGroupDetails";

const ChatUser = () => {
  const { onlineUsers, chatUsers } = useOnlineUsers();
  const [typing, setTyping] = useState(false);
  const [typingUserName, setTypingUserName] = useState(null);
  const { chat } = useChat();

  // If chat is single not a group chat than show if user online or not
  const isOnline =
    chatUsers &&
    chatUsers.length === 1 &&
    onlineUsers?.find((user) => user.userId === chatUsers[0]?._id);

  // Effect to listen for typing and stop typing event from server
  useEffect(() => {
    socket.on("typing", (userName) => {
      setTyping(true);
      setTypingUserName(userName);
    });
    socket.on("stop-typing", () => setTyping(false));

    return () => {
      socket.off("typing", () => setTyping(true));
      socket.off("stop-typing", () => setTyping(false));
    };
  }, []);

  return (
    <>
      <Box
        bgcolor="rgba(255,255,255,0.8)"
        py="0.5rem"
        px="3rem"
        mx="auto"
        sx={{ width: { xs: "fit-content", sm: "30rem" } }}
      >
        <Stack direction="row" gap="3rem" alignItems="center">
          <Box width="5rem" height="5rem">
            <UserAvatar
              width="5rem"
              height="5rem"
              src={
                !chat.isChatGroup
                  ? chatUsers?.at(0).photo ?? "/default-user.jpg"
                  : chat.photo ?? "/default-user.jpg"
              }
            />
          </Box>
          <div>
            <Typography fontWeight={500} variant="h4" mb="0.3rem">
              {chat?.isChatGroup
                ? chat.chatName
                : chatUsers?.at(0).name ?? "user name"}
            </Typography>

            {/*  if chat is group chat than take that user who is typing else simply write typing */}
            <Typography variant="h6">
              {typing
                ? chat?.isChatGroup
                  ? `${typingUserName.split(" ")[0]} is typing...`
                  : "typing..."
                : isOnline
                ? "Online"
                : ""}
            </Typography>
          </div>

          {/* if chat is group chat than show details button  */}
          {chat?.isChatGroup && <ChatGroupDetails />}
        </Stack>
      </Box>
    </>
  );
};

export default ChatUser;
