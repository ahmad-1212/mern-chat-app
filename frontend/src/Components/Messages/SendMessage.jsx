import { useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "../Authentication/useUser";
import { useSendMessage } from "./useSendMessage";
import { socket } from "../../socket";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 3px;
  width: 85%;
  font-size: 1.6rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

let typingTimeout;

const SendMessage = ({ setChatMessages }) => {
  const queryClient = useQueryClient();
  const {
    user: { user },
  } = useUser();

  const { sendMessage } = useSendMessage();

  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();

  const { palette } = useTheme();

  const chatId = searchParams.get("chat-id");

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("stop-typing", chatId);

    setChatMessages((prev) => [
      ...prev,
      {
        _id: Date.now(),
        content: message,
        sender: {
          _id: user._id,
        },
      },
    ]);
    sendMessage(message, {
      onSuccess: (data) => {
        socket.emit("send-message", data.message, user._id);
        setChatMessages((prev) => [...prev, data.message]);
        queryClient.invalidateQueries(["chats"]);
      },
    });

    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);

    // Fire typing event
    socket.emit("typing", chatId, user.name);

    // Fire stop typing event after some time
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stop-typing", chatId);
    }, 3000);
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <Input
        value={message}
        onChange={handleChange}
        placeholder="Send message by typing..."
        colors={palette}
      />
      <Box>
        <IconButton onClick={handleSendMessage} disabled={!message}>
          <SendIcon sx={{ fontSize: "2.5rem" }} color="secondary" />
        </IconButton>
      </Box>
    </Form>
  );
};

export default SendMessage;
