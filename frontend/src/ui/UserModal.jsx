import styled from "@emotion/styled";
import {
  Box,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../Components/Authentication/useUser";
import UserAvatar from "./UserAvatar";
import ButtonSecondary from "./ButtonSecondary";
import { useTheme } from "@emotion/react";
import { useLogout } from "../Components/Authentication/useLogout";
import SpinnerSmall from "./SpinnerSmall";
import EditIcon from "@mui/icons-material/Edit";
import UpdateUserSettings from "../Components/Authentication/UpdateUserSettings";
import { useState } from "react";

const StyledModal = styled.div`
  background-color: ${(props) => props.colors.grey.light};
  width: 45rem;
  max-width: 95%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  padding: 2rem 2.6rem;
  border-radius: 0.5rem;
`;

const UserModal = ({ open, handleClose }) => {
  const [updateUser, setUpdateUser] = useState(false);
  const {
    user: { user },
  } = useUser();
  const { logout, isLoading } = useLogout();

  const { palette } = useTheme();

  const handleClick = () => {
    handleClose();
    setUpdateUser(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModal colors={palette}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={handleClick}>
            <CloseIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
        {!updateUser && (
          <Box>
            <Box
              display="flex"
              gap="1rem"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h3" textAlign="center">
                {user?.name}
              </Typography>
              <Tooltip title="Edit" sx={{ fontSize: "2rem", width: "5rem" }}>
                <IconButton
                  sx={{ fontSize: "1.6rem" }}
                  onClick={() => setUpdateUser(true)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
            <Stack direction="row" justifyContent="center" my="1.6rem">
              <UserAvatar
                width="15rem"
                height="15rem"
                src={user?.photo ?? "default-user.jpg"}
              />
            </Stack>
            <Typography variant="h4" textAlign="center">
              <Box component="span" fontWeight={600}>
                Email:
              </Box>{" "}
              {user?.email}
            </Typography>
            <Stack mt="3rem">
              <ButtonSecondary onClick={logout} disabled={isLoading}>
                {isLoading ? <SpinnerSmall /> : "logout"}
              </ButtonSecondary>
            </Stack>
          </Box>
        )}
        {updateUser && <UpdateUserSettings setUpdateUser={setUpdateUser} />}
      </StyledModal>
    </Modal>
  );
};

export default UserModal;
