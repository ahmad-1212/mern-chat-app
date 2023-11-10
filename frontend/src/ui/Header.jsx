import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";

import HeaderMenu from "./HeaderMenu";
import HeaderNotification from "./HeaderNotification";
import SearchUser from "../Components/SearchUser/SearchUser";
import { useScreen } from "../hooks/useScreen";

const StyledHeader = styled(Stack)`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
`;

const Header = () => {
  const { palette } = useTheme();
  const { screen } = useScreen();
  return (
    <StyledHeader
      component="header"
      direction="row"
      alignItems="center"
      px={screen < 600 ? "1rem" : "3rem"}
      justifyContent="space-between"
      fontSize="1.6rem"
      backgroundColor={palette.grey.main}
    >
      <SearchUser />
      <HeaderNotification />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
