import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';

import { SearchContext } from '../../App';

import classes from './Search.module.scss';

export default function Search() {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  function onClearSearch() {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 450),
    []
  );

  function onChangeSearch(e) {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  }

  return (
    <div className={classes.root}>
      <i className={classes.iconSearch}>
        <BiSearch />
      </i>
      <input
        ref={inputRef}
        className={classes.input}
        type='text'
        placeholder='Введите название пиццы...'
        value={value}
        onChange={onChangeSearch}
      />
      {value && (
        <i className={classes.iconClear} onClick={onClearSearch}>
          <RxCross1 />
        </i>
      )}
    </div>
  );
}
