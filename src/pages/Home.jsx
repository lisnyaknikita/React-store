import React, { useState, useEffect, useContext } from "react";

import Categories from "../components/Categories";
import MyLoader from "../components/MyLoader";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isPizzasLoading, setisPizzasLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "rating",
  });

  const {searchValue} = useContext(SearchContext)

  async function fetchPizzas() {
    const order = sortType.sort.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    try {
      setisPizzasLoading(true);
      const pizzas = await axios.get(
        `https://63cff232109824043789b00f.mockapi.io/items?page=${currentPage}&limit=4${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType.sort.replace("-", "")}&order=${order}${search}`
      );
      setPizzas(pizzas.data);
      setisPizzasLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzasFIlter = pizzas.map((pizza) => (
    <PizzaBlock key={pizza.id} pizza={pizza} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort sortType={sortType} onClickSortType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isPizzasLoading
          ? [...new Array(6)].map((_, i) => <MyLoader key={i} />)
          : pizzasFIlter}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}
