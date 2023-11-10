import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

import SingleNotification from "./SingleNotification";
import { useNotification } from "../../context/Notification";

const StyledNotification = styled(Box)`
  font-size: 1.6rem;
  height: 23rem;
  width: 30rem;
  overflow-y: auto;
  padding: 3px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Notification = ({ closeNotification }) => {
  const { notifications } = useNotification();

  return (
    <StyledNotification component="ul" bgcolor="grey.main">
      {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) => (
          <SingleNotification
            key={notification._id}
            notification={notification}
            closeNotification={closeNotification}
          />
        ))}

      {!notifications ||
        (notifications.length === 0 && (
          <Typography
            variant="h3"
            fontWeight={500}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            No Notifications!
          </Typography>
        ))}
    </StyledNotification>
  );
};

export default Notification;
