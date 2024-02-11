import styled from "@emotion/styled";
import { Box } from "@mui/material";
import SingleSearchedUser from "./SingleSearchedUser";

const List = styled.ul`
  width: 100%;
  min-height: 20rem;
  max-height: 25rem;
  padding: 1rem 0rem;
  overflow-y: auto;
`;

const StyledBox = styled(Box)`
  width: 100%;
  font-weight: 600;
  font-size: 2.4rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchUserResult = ({
  searchedUsers,
  onCloseModal,
  createGroup,
  selectedUsers,
  setSelectedUsers,
}) => {
  return (
    <>
      {searchedUsers && searchedUsers.length > 0 && (
        <>
          <Box my="1.3rem" fontWeight={600}>
            Search Result:
          </Box>
          <List>
            {searchedUsers.map((user) => (
              <SingleSearchedUser
                user={user}
                key={user._id}
                closeModal={onCloseModal}
                createGroup={createGroup}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
            ))}
          </List>
        </>
      )}

      {searchedUsers && searchedUsers.length === 0 && (
        <StyledBox>No users were found!</StyledBox>
      )}

      {!searchedUsers && (
        <StyledBox>Search a user to start chatting...</StyledBox>
      )}
    </>
  );
};

export default SearchUserResult;
