import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IPizza } from '../../@types/types';

import axios from 'axios';

export type SearchPizzaParams = {
  order: string;
  search: string;
  currentPage: string | number;
  categoryId: number;
  sortType: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams) => {
    const { order, search, currentPage, categoryId, sortType } = params;
    const pizzas = await axios.get<IPizza[]>(
      `https://63cff232109824043789b00f.mockapi.io/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortType.replace('-', '')}&order=${order}${search}`
    );
    return pizzas.data as IPizza[];
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

interface IPizzasState {
  pizzas: IPizza[];
  status: Status;
}

const initialState: IPizzasState = {
  pizzas: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IPizza[]>) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCES;
      state.pizzas = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
