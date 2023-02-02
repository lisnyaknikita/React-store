import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, search, currentPage, categoryId, sortType } = params;
    const pizzas = await axios.get(
      `https://63cff232109824043789b00f.mockapi.io/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortType.replace('-', '')}&order=${order}${search}`
    );
    return pizzas.data;
  }
);

const initialState = {
  pizzas: [],
  status: 'loading'
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
        state.status = 'loading'
        state.pizzas = []
      },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.pizzas = action.payload
        state.status = 'succes'
    },
    [fetchPizzas.rejected]: (state, action) => {
        state.status = 'error'
        state.pizzas = []
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
