import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import Chats from "../../features/Chats/Chats";

const StyledSidebare = styled.aside`
  padding: 3rem 2rem 0;
  gap: 1rem;
  max-height: calc(100vh - 8.5rem);
  overflow: hidden;
  background-color: ${(props) => props.colors.grey.light};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content auto;
`;

const Sidebare = () => {
  const { palette } = useTheme();

  return (
    <StyledSidebare colors={palette}>
      <Chats />
    </StyledSidebare>
  );
};

export default Sidebare;
