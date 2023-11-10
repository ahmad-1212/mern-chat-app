import { useState } from "react";
import { Box, IconButton, Menu } from "@mui/material";
import styled from "@emotion/styled";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useOnlineUsers } from "../../context/OnlineUsers";
import { useUser } from "../Authentication/useUser";
import { useChat } from "./useChat";
import ChatGroupDetailsItem from "./ChatGroupDetailsItem";

const List = styled(Box)`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  width: 30rem;
  max-height: 25rem;
`;

const ChatGroupDetails = () => {
  const {
    user: { user },
  } = useUser();
  const { chat } = useChat();
  const [anchorEl, setAnchorEl] = useState(null);
  const { chatUsers } = useOnlineUsers();
  const open = Boolean(anchorEl);
  const isAdmin = chat?.groupAdmin === user?._id;
  return (
    <>
      <IconButton
        sx={{ marginLeft: "auto", fontSize: "2rem" }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <List component="ul">
          <ChatGroupDetailsItem user={user} chat={chat} you={true} />
          {chatUsers?.map((usr) => (
            <ChatGroupDetailsItem
              key={usr._id}
              user={usr}
              chat={chat}
              isAdmin={isAdmin}
            />
          ))}
        </List>
      </Menu>
    </>
  );
};

export default ChatGroupDetails;
