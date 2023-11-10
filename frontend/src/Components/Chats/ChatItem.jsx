import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

import { useUser } from "../Authentication/useUser";
import { useOnlineUsers } from "../../context/OnlineUsers";
import { useSidebare } from "../../context/Sidebare";
import UserAvatar from "../../ui/UserAvatar";

const StyledChatItem = styled.li`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 2rem;
  row-gap: 0.5rem;
  padding: 1rem 3rem;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? props.colors.primary.main : "#fff"};
  color: ${(props) => props.isActive && "#fff"};
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    background-color: ${(props) => props.colors.primary.main};
    color: #fff;
  }

  &:active {
    background-color: ${(props) => props.colors.primary.dark};
  }
`;

const UserImage = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / -1;
`;

const SenderName = styled.p`
  font-size: 16px;
  grid-column: 2 / -1;
  margin: 0;
`;

const LatestMessasge = styled.p`
  font-size: 10px;
  grid-column: 2 / -1;
`;

const ChatItem = ({ chat }) => {
  const { setShowSidebare } = useSidebare();
  const { setChatUsers } = useOnlineUsers();
  const {
    user: { user },
  } = useUser();
  const { palette } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const { _id: chatId, latestMessage, users } = chat;

  // Set chat users
  const chatUsers = users.filter((usr) => usr._id !== user._id);

  // find the the current chat is active or not
  const isActive = searchParams.get("chat-id") === chatId;

  // find the sender if chat is group chat
  const sender =
    latestMessage?.sender === user._id
      ? "You"
      : chatUsers
          ?.find((usr) => usr._id === latestMessage?.sender)
          ?.name?.split(" ")[0];

  // Trim the text if too large
  const latestMessageText =
    latestMessage?.content.length > 35
      ? latestMessage?.content?.slice(0, 35) + "..."
      : latestMessage?.content;

  const handleClick = (chatId) => {
    searchParams.set("chat-id", chatId);
    setSearchParams(searchParams);
    setChatUsers(chatUsers);
    setShowSidebare(false);
  };
  return (
    <StyledChatItem
      colors={palette}
      isActive={isActive}
      onClick={() => handleClick(chatId)}
    >
      <UserImage>
        <UserAvatar
          width="5rem"
          height="5rem"
          src={
            chat.isChatGroup
              ? chat.photo ?? "/default-user.jpg"
              : chatUsers[0]?.photo ?? "/default-user.jpg"
          }
        />
      </UserImage>
      <SenderName>
        {chat?.isChatGroup ? chat?.chatName : chatUsers[0]?.name}
      </SenderName>
      <LatestMessasge>
        {" "}
        {chat?.isChatGroup && latestMessageText && (
          <Box component="span" sx={{ fontWeight: 600, marginRight: "0.5rem" }}>
            {sender}:
          </Box>
        )}{" "}
        {latestMessageText ?? "No message yet!"}
      </LatestMessasge>
    </StyledChatItem>
  );
};

export default ChatItem;
