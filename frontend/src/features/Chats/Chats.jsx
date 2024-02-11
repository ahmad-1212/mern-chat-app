import { useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useTheme } from "@emotion/react";

import ChatItem from "./ChatItem";
import { useChats } from "./useChats";
import SpinnerSmall from "../../Components/UI/SpinnerSmall";
import SearchUserModal from "../SearchUser/SearchUserModal";

const StyledChats = styled.ul`
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  font-size: 1.4rem;
  outline: none;
  border: none;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.colors.grey.dark};
  color: inherit;
  text-transform: capitalize;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d5d2d2;
  }
`;

const Chats = () => {
  const { chats, isLoading } = useChats();
  const { palette } = useTheme();
  const [openModal, setOpenModal] = useState(false);

  if (isLoading)
    return (
      <Loading>
        <SpinnerSmall />
      </Loading>
    );

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb="2.5rem"
      >
        <Typography fontWeight={600} variant="h2">
          My Chats
        </Typography>
        <StyledButton colors={palette} onClick={() => setOpenModal(true)}>
          <span>New group chat</span> <AddOutlinedIcon fontSize="inherit" />
        </StyledButton>
        <SearchUserModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          createGroup={true}
        />
      </Stack>
      <StyledChats>
        {chats?.map((chat) => (
          <ChatItem key={chat._id} chat={chat} />
        ))}
        {!chats ||
          (chats.length === 0 && (
            <Box sx={{ textAlign: "center", mt: "6rem" }}>
              <Typography variant="h3" fontWeight={400}>
                No chats are found!
              </Typography>
            </Box>
          ))}
      </StyledChats>
    </>
  );
};

export default Chats;
