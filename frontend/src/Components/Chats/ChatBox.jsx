import { useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, IconButton, Typography } from "@mui/material";

import ChatUser from "./ChatUser";
import Messages from "../Messages/Messages";
import { socket } from "../../socket";
import { useChat } from "./useChat";
import { useOnlineUsers } from "../../context/OnlineUsers";
import { useUser } from "../Authentication/useUser";
import { useNotification } from "../../context/Notification";
import { useScreen } from "../../hooks/useScreen";
import { useSidebare } from "../../context/Sidebare";

const StyledChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 2rem 4rem;
  overflow: hidden;
  position: relative;

  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

const ChatBox = () => {
  const navigate = useNavigate();
  const { screen } = useScreen();
  const { setShowSidebare } = useSidebare();
  const { notifications, setNotifications } = useNotification();
  const { chat, isLoading, error } = useChat();
  const {
    user: { user },
  } = useUser();
  const { setChatUsers } = useOnlineUsers();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat-id") || null;

  // for smaller screens to show chats
  const handleClick = () => {
    setShowSidebare(true);
    navigate("/chats");
  };

  // Effect, to listen for user to join chat
  useEffect(() => {
    if (!chatId) return;
    socket.emit("join-chat", chatId);
    return () => {
      socket.emit("left-chat", chatId);
    };
  }, [chatId]);

  // Effect to set users of chat or group chat
  useEffect(() => {
    if (!chat) return;

    const users = chat.users.filter((usr) => usr._id !== user._id);
    setChatUsers(users);
  }, [chat, user, setChatUsers]);

  // Effect to clear all the notification of slected chat if exist one
  useEffect(() => {
    if (!chatId) return;

    const isChatNotExists = notifications.find(
      (not) => not.chat._id === chatId
    );

    // If incase a notification for a selected chat exists than clear that notifications for that chat
    if (isChatNotExists) {
      const filterNot = notifications.filter((not) => not.chat._id !== chatId);

      setNotifications(filterNot);
    }
  }, [notifications, setNotifications, chatId]);

  useEffect(() => {
    if (chatId || screen > 750) return;
    setShowSidebare(true);
  }, [chatId, screen, setShowSidebare]);

  return (
    <>
      {chatId && !error && (
        <StyledChatBox>
          {screen < 750 && (
            <IconButton
              onClick={handleClick}
              sx={{
                fontSize: "2rem",
                position: "absolute",
                top: "2.7rem",
                left: 0,
              }}
            >
              <KeyboardBackspaceIcon fontSize="inherit" />
            </IconButton>
          )}

          {!isLoading && <ChatUser />}
          <Messages />
        </StyledChatBox>
      )}

      {(error || !chatId) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            textTransform="uppercase"
            letterSpacing="2px"
            textAlign="center"
          >
            {error ? error.message : " Select user to start the chatting! 🙂"}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ChatBox;
