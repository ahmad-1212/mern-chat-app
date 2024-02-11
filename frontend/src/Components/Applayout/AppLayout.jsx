import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";

import { useScreen } from "../../hooks/useScreen";
import { useSidebare } from "../../context/Sidebare";
import Header from "../Header/Header";
import Sidebare from "../Sidebare/Sidebare";

const StyledAppLayout = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: grid;

  grid-template-columns: 40rem 1fr;
  grid-template-rows: 7rem 1fr;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 35rem 1fr;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  width: 100%;
  max-height: calc(100dvh - 7rem);

  background-color: ${(props) => props.colors.secondary.light};
`;

const AppLayout = () => {
  const { screen } = useScreen();
  const { showSidebare } = useSidebare();
  const { palette } = useTheme();

  return (
    <StyledAppLayout>
      <Header />
      {screen < 750 ? showSidebare && <Sidebare /> : <Sidebare />}
      {screen < 750 ? (
        !showSidebare && (
          <Main colors={palette}>
            <Outlet />
          </Main>
        )
      ) : (
        <Main colors={palette}>
          <Outlet />{" "}
        </Main>
      )}
    </StyledAppLayout>
  );
};

export default AppLayout;
