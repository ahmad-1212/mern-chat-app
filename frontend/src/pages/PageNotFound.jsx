import { Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

import ButtonSecondary from "../ui/ButtonSecondary";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1, { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
        marginTop: "20rem",
      }}
    >
      <Typography variant="h1" fontWeight={700}>
        Page you are looking for is Not Found!
      </Typography>
      <ButtonSecondary onClick={handleClick} icon={<KeyboardBackspaceIcon />}>
        back to home page
      </ButtonSecondary>
    </Box>
  );
};

export default PageNotFound;
