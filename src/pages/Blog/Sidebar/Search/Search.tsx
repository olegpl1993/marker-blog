import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";

function Search() {
  const [, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleOnClickSearch = () => {
    setSearchParams({ search: searchInput });
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleOnClickSearch();
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.title}>Пошук постів</div>
      <div className={styles.inputBox}>
        <div className={styles.inputRow}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            placeholder="Знайти"
            value={searchInput}
            onChange={handleChangeSearchInput}
            onKeyDown={handleOnKeyDown}
            InputProps={{ sx: { paddingRight: "55px" } }}
          />

          <IconButton
            onClick={handleOnClickSearch}
            sx={{ position: "absolute", right: "0" }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Search;
