import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ButtonSecondary from "../../Components/UI/ButtonSecondary";
import SearchUserModal from "./SearchUserModal";

const SearchUser = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ButtonSecondary onClick={() => setOpenModal(true)} icon={<SearchIcon />}>
        Search User
      </ButtonSecondary>
      <SearchUserModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default SearchUser;
