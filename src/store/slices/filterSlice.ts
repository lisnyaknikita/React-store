import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export type Sort = {
    name: string,
    sort: 'rating' | 'price' | 'name' | '-rating' | '-price' | '-name' | string
}

interface IFilterState {
    searchValue?: string,
    search?: string,
    categoryId: number,
    currentPage: number | string,
    sort?: Sort
    sortType?: Sort
}

const initialState: IFilterState = {
    searchValue: '',
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
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setSort: (state, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<IFilterState>) => {
            state.sort = action.payload.sortType
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)

        }
    },
});

export const selectSort = (state: RootState) => state.filter.sort

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;
