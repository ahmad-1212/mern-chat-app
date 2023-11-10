import { useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

import SpinnerSmall from "../../ui/SpinnerSmall";
import { useSearchUser } from "./useSearchUser";

const StyledInput = styled.input`
  border: none;
  outline: none;
  border: 3px solid ${(props) => props.colors.secondary.main};

  width: 100%;
  background-color: inherit;

  font-size: 1.8rem;
  font-family: inherit;
  padding: 0.8rem 1.8rem;
  padding-left: 4rem;
  color: inherit;
  border-radius: 5px;
  transition: all 0.2s;

  &::placeholder {
    opacity: 0.5;
    color: inherit;
    font-size: inherit;
  }
`;

let timer;

const SearchUserInput = ({ setSearchedUsers }) => {
  const { searchUser, isLoading } = useSearchUser();
  const { palette } = useTheme();
  const inputRef = useRef();

  const handleChange = (e) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      searchUser(e.target.value, {
        onSuccess: (data) => setSearchedUsers(data),
      });
    }, 300);
  };

  // To focus the input as search user modal opens
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Stack position="relative" width="100%">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          fontSize: "2.5rem",
        }}
      >
        {!isLoading ? (
          <SearchSharpIcon fontSize="inherit" color="secondary" />
        ) : (
          <SpinnerSmall />
        )}
      </Box>
      <StyledInput
        ref={inputRef}
        onChange={handleChange}
        placeholder="Search with name or email"
        colors={palette}
      />
    </Stack>
  );
};

export default SearchUserInput;
