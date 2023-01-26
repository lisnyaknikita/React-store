import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

import { SearchContext } from "../../App";

import classes from "./Search.module.scss";

export default function Search() {
  const {searchValue, setSearchValue} = useContext(SearchContext);

  return (
    <div className={classes.root}>
      <i className={classes.iconSearch}>
        <BiSearch />
      </i>
      <input
        className={classes.input}
        type="text"
        placeholder="Введите название пиццы..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <i className={classes.iconClear} onClick={() => setSearchValue("")}>
          <RxCross1 />
        </i>
      )}
    </div>
  );
}
