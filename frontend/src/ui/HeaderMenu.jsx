import { useState } from "react";
import { Button, Typography } from "@mui/material";

import UserAvatar from "./UserAvatar";
import { useUser } from "../Components/Authentication/useUser";
import UserModal from "./UserModal";

const HeaderMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    user: { user },
  } = useUser();
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        variant="none"
        sx={{ gap: "1rem", padding: { xs: "1rem", md: "1rem 2rem" } }}
      >
        <UserAvatar
          width="4rem"
          height="4rem"
          src={user?.photo ?? "/default-user.jpg"}
        />
        <Typography variant="h4" fontWeight={500}>
          {user?.name.split(" ")[0]}
        </Typography>
      </Button>
      <UserModal open={openModal} handleClose={() => setOpenModal(false)} />
    </>
  );
};

export default HeaderMenu;
