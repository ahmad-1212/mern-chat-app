import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import UserAvatar from "../../ui/UserAvatar";
import { useUser } from "../Authentication/useUser";

const StyledMessage = styled.li`
  max-width: 100%;
  display: flex;
  align-items: start;
  justify-content: ${(props) => props.me && "flex-end"};
  gap: 1.5rem;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  padding: 0.6rem 1.6rem;
  max-width: 50rem;
  color: #fff;
  margin-top: 0.4rem;
  overflow-wrap: break-word;
  border-radius: ${(props) =>
    props.me ? "1rem 0rem 1rem 1rem" : "0rem 1rem 1rem 1rem"};

  background-color: ${(props) =>
    props.me ? props.colors.primary.main : props.colors.secondary.main};

  @media (max-width: 900px) {
    max-width: 30rem;
  }
`;

const Messages = ({ message }) => {
  const {
    user: { user },
  } = useUser();
  const { palette } = useTheme();
  const { sender, content } = message;

  return (
    <StyledMessage me={sender._id === user._id}>
      {sender._id !== user._id && (
        <UserAvatar
          width="4rem"
          height="4rem"
          src={sender.photo ?? "/default-user.jpg"}
        />
      )}
      <Text colors={palette} me={sender._id === user._id}>
        {content}
      </Text>
    </StyledMessage>
  );
};

export default Messages;
