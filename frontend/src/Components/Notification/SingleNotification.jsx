import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { useNotification } from "../../context/Notification";
import { useSidebare } from "../../context/Sidebare";
import { useScreen } from "../../hooks/useScreen";

const Notification = styled.li`
  list-style: none;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 4px;

  margin-bottom: 2px;
  cursor: pointer;
  background-color: rgb(216, 227, 239);
  transition: all 0.2s;

  &:hover {
    background-color: #0066d6;
    color: #fff;
    transform: translateY(-1px);
  }
`;

const SingleNotification = ({ notification, closeNotification }) => {
  const [searchParams, setSearchparams] = useSearchParams();
  const { notifications, setNotifications } = useNotification();
  const { setShowSidebare } = useSidebare();
  const { screen } = useScreen();
  const time = new Date(notification.createdAt);
  const hours = `${time.getHours()}`.padStart(2, 0);
  const minutes = `${time.getMinutes()}`.padStart(2, 0);

  // Trim large messaage
  const content =
    notification.content.length > 30
      ? notification.content.slice(0, 25) + "..."
      : notification.content;

  const handleClick = (chatId) => {
    searchParams.set("chat-id", chatId);
    setSearchparams(searchParams);
    closeNotification();

    // Remove that chat notifications
    const filterNoti = notifications.filter((not) => not.chat._id !== chatId);
    setNotifications(filterNoti);

    // For smaller screen to show chatbox or messages of chatS
    if (screen < 750) setShowSidebare(false);
  };

  return (
    <Notification onClick={() => handleClick(notification.chat._id)}>
      <Typography variant="h4" fontWeight={600}>
        {" "}
        {notification.sender.name}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="p" fontSize="1.4rem" fontWeight={500}>
          {content}
        </Typography>
        <Box fontSize="1rem" fontWeight={600} component="span">
          at {hours}:{minutes}
        </Box>
      </Stack>
    </Notification>
  );
};

export default SingleNotification;
