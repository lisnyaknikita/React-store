import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../store/slices/filterSlice';

import classes from './Search.module.scss';

export default function Search() {
  const dispatch = useDispatch()
  // const searchValue = useSelector(state=> state.filter.searchValue)

  const [value, setValue] = useState('');
  // const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  function onClearSearch() {
    dispatch(setSearchValue(''))
    // setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 450),
    []
  );

  function onChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
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
