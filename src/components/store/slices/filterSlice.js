import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sort: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action)=>{
      state.sort = action.payload.sortType
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)

    }
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
