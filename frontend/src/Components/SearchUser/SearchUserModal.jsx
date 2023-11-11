import { useRef, useState } from "react";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import SearchUserInput from "./SearchUserInput";
import SearchUserResult from "./SearchUserResult";
import ButtonSecondary from "../../ui/ButtonSecondary";
import Input from "../../ui/Input";
import { useCreateGroupChat } from "../Chats/useCreateGroupChat";
import { useUser } from "../Authentication/useUser";
import SpinnerSmall from "../../ui/SpinnerSmall";

const StyledModal = styled.div`
  background-color: ${(props) => props.colors.grey.light};
  width: 60rem;
  max-width: 95%;
  margin: 6rem auto;
  position: relative;
  font-size: 1.6rem;
  padding: 3rem;
  border-radius: 0.5rem;

  @media (max-width: 400px) {
    padding: 1.5rem;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0rem;
  max-height: 8rem;
  overflow-y: auto;
`;

const User = styled(Box)`
  list-style: none;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  gap: 1rem;
  width: fit-content;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 5rem;
`;

const SearchUserModal = ({ open, onClose, createGroup = false }) => {
  const {
    user: { user },
  } = useUser();
  const [searchedUsers, setSearchedUsers] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isUsersSelected, setIsUsersSelected] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const groupNameInputRef = useRef();
  const { createGroup: createGroupFnc, isLoading } = useCreateGroupChat();

  const { palette } = useTheme();

  const handleUserClick = (userId) => {
    const newUsers = selectedUsers.filter((usr) => usr._id !== userId);
    setSelectedUsers(newUsers);
  };

  const handleSelectUser = () => {
    setIsUsersSelected((prev) => !prev);
  };

  const handleCreateGroup = () => {
    const groupName = groupNameInputRef.current.value || user.name + "'s group";
    const users = selectedUsers.map((usr) => usr._id);
    createGroupFnc(
      { users, groupName, image },
      {
        onSuccess: () => {
          onClose();
          setSelectedUsers([]);
          setIsUsersSelected(false);
          setImage(null);
        },
      }
    );
  };

  const handleGroupImage = (e) => {
    const file = e.target.files[0];

    // If file is not an image
    if (!file.type.startsWith("image")) {
      return setImageError(true);
    }
    setImageError(false);
    setImage(file);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModal colors={palette}>
        {!isUsersSelected && (
          <SearchUserInput setSearchedUsers={setSearchedUsers} />
        )}
        {createGroup && (
          <>
            {" "}
            <List>
              {selectedUsers?.map((user) => (
                <User
                  component="li"
                  key={user._id}
                  bgcolor="primary.main"
                  color="grey.dark"
                >
                  <span>{user.name}</span>
                  <span onClick={() => handleUserClick(user._id)}>
                    <CloseOutlinedIcon
                      sx={{
                        cursor: "pointer",
                        fontSize: "1.3rem",
                        marginTop: "2px",
                      }}
                    />
                  </span>
                </User>
              ))}
            </List>
            {isUsersSelected && (
              <Stack gap="1rem" mb="2rem">
                <Input placeholder="Type group name" ref={groupNameInputRef} />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleGroupImage}
                />
                {imageError && (
                  <Typography color="red" fontSize="1rem" variant="p">
                    Selected file is not an Image, please select an image!
                  </Typography>
                )}
              </Stack>
            )}
            <Stack direction="row" gap="2rem">
              {selectedUsers.length > 1 && (
                <ButtonSecondary onClick={handleSelectUser}>
                  {isUsersSelected ? "select more users" : " Select Users"}
                </ButtonSecondary>
              )}
              {isUsersSelected && (
                <ButtonSecondary
                  disabled={isLoading}
                  onClick={handleCreateGroup}
                >
                  {isLoading ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <SpinnerSmall />
                      Creating group
                    </Box>
                  ) : (
                    "Create group"
                  )}
                </ButtonSecondary>
              )}
            </Stack>
          </>
        )}

        {!isUsersSelected && (
          <SearchUserResult
            searchedUsers={searchedUsers}
            onCloseModal={onClose}
            createGroup={createGroup}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
      </StyledModal>
    </Modal>
  );
};

export default SearchUserModal;
