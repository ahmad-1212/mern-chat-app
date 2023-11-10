import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, Popover } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import Notification from "../Components/Notification/Notification";
import { useNotification } from "../context/Notification";
import { socket } from "../socket";

const NotificationDot = styled.div`
  position: absolute;
  top: 20%;
  left: 55%;
  width: 10px;
  height: 10px;
  border: 1px solid #fff;
  border-radius: 50%;
  background-color: red;
`;

const HeaderNotification = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const { notifications, setNotifications } = useNotification();
  const [searchParams] = useSearchParams();

  const chatId = searchParams.get("chat-id");
  const open = Boolean(anchorElement);
  const id = open ? "notification" : undefined;


  // To set notification of chat which is not open
  useEffect(() => {
    const receiveMessageHandler = (message) => {
      if (chatId !== message.chat._id) {
        setNotifications((prev) => [...prev, message]);
      }
    };

    socket.on("receive-message", receiveMessageHandler);

    return () => {
      // Unsubscribe when the component unmounts
      socket.off("receive-message", receiveMessageHandler);
    };
  }, [chatId, setNotifications]);

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorElement(e.currentTarget)}
        sx={{ marginLeft: "auto", marginRight: "0.5rem", position: "relative" }}
      >
        <NotificationsIcon style={{ fontSize: "2.5rem" }} color="secondary" />
        {notifications && notifications.length > 0 && (
          <NotificationDot className="dot-animate">&nbsp;</NotificationDot>
        )}
      </IconButton>
      <Popover
        id={id}
        open={open}
        onClose={() => setAnchorElement(null)}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Notification closeNotification={() => setAnchorElement(null)} />
      </Popover>
    </>
  );
};

export default HeaderNotification;
