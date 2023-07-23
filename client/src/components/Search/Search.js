import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const Search = ({ setSearchQuery, searchClicked }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Search Jobs"
      variant="outlined"
      placeholder="Search Jobs"
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon className="searchIcon" />
    </IconButton>
  </form>
);

export default Search;
