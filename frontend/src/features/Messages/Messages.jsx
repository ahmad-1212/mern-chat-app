import { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import SingleMessage from "./SingleMessage";
import { useMessages } from "./useMessages";
import FullPageLoading from "../../Components/UI/FullPageLoading";
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
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat-id");

  // Listen for revie-message event
  useEffect(() => {
    socket.on("receive-message", (message) => {
      if (chatId !== message.chat._id) return;
      queryClient.setQueryData(["messages", chatId], (oldData) => {
        return { ...oldData, messages: [...oldData.messages, message] };
      });
    });
  }, [queryClient, chatId]);

  if (isLoading) return <FullPageLoading />;

  return (
    <>
      {!isLoading && (
        <MessageBox>
          {messages && messages.length !== 0 ? (
            <ScrollableFeed forceScroll={true}>
              {messages?.map((message) => (
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
      <SendMessage />
    </>
  );
};

export default Messages;
