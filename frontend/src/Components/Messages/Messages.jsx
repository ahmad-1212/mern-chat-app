import { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import SingleMessage from "./SingleMessage";
import { useMessages } from "./useMessages";
import FullPageLoading from "../../ui/FullPageLoading";
import SendMessage from "./SendMessage";
import { socket } from "../../socket";

const MessageBox = styled.ul`
  height: 100%;
  overflow-y: auto;

  & > div::-webkit-scrollbar {
    width: 0;
  }

  & li:first-of-type {
    margin-top: 2rem;
  }
`;

const Messages = () => {
  const queryClient = useQueryClient();
  const { messages, isLoading } = useMessages();
  const [chatMessages, setChatMessages] = useState(messages);
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat-id");

  useEffect(() => {
    if (!messages) return;
    setChatMessages(messages);
  }, [messages, setChatMessages]);

  // Listen for event if someone send message
  useEffect(() => {
    socket.on("receive-message", (message) => {
      if (chatId !== message.chat._id) return;
      queryClient.invalidateQueries(["messages", chatId]);
    });
  }, [queryClient, chatId]);

  if (isLoading) return <FullPageLoading />;

  return (
    <>
      {!isLoading && (
        <MessageBox>
          {chatMessages && chatMessages.length !== 0 ? (
            <ScrollableFeed forceScroll={true}>
              {chatMessages?.map((message) => (
                <SingleMessage key={message._id} message={message} />
              ))}
            </ScrollableFeed>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" fontWeight={500}>
                No messages yet!
              </Typography>
            </Box>
          )}
        </MessageBox>
      )}
      {isLoading && <FullPageLoading />}
      <SendMessage setChatMessages={setChatMessages} />
    </>
  );
};

export default Messages;
