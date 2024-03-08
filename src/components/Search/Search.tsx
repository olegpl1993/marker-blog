import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Search(props: Props) {
  const { setIsOpen } = props;
  const [, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ search: searchInput });
    setIsOpen && setIsOpen(false);
  };

  const handleOnKeyDownEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={styles.search}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        placeholder="Знайти"
        value={searchInput}
        onChange={handleChangeSearchInput}
        onKeyDown={handleOnKeyDownEnter}
        InputProps={{ sx: { paddingRight: "55px" } }}
      />

      <IconButton
        onClick={handleSearch}
        sx={{ position: "absolute", right: "0" }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default Search;
