import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../components/store/slices/filterSlice';

import Categories from '../components/Categories';
import MyLoader from '../components/MyLoader';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { sortBy } from '../components/Sort';
import Pagination from '../components/Pagination/Pagination';

import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../App';
import { fetchPizzas } from '../components/store/slices/pizzasSlice';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { pizzas, status } = useSelector((state) => state.pizza);

  // const [isPizzasLoading, setisPizzasLoading] = useState(false);

  const { searchValue } = useContext(SearchContext);

  async function getPizzas() {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        order,
        search,
        currentPage,
        categoryId,
        sortType,
      })
    );
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = sortBy.find((obj) => obj.sort === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sortType,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const pizzasFIlter =
    pizzas &&
    pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);

  function onClickCategory(id) {
    dispatch(setCategoryId(id));
  }

  function onChangePage(number) {
    dispatch(setCurrentPage(number));
  }

  return (
    <>
      <div className='content__top'>
        <Categories
          categoryId={categoryId}
          onClickCategory={(id) => onClickCategory(id)}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <h2>Error</h2>
      ) : (
        <div className='content__items'>
          {status === 'loading'
            ? [...new Array(4)].map((_, i) => <MyLoader key={i} />)
            : pizzasFIlter}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}
