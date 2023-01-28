import React from "react";
import ReactPaginate from "react-paginate";

import classes from './Pagination.module.scss'

export default function Pagination({currentPage, onChangePage}) {
  return (
    <>
      <ReactPaginate
        className={classes.pagination}
        breakLabel="..."
        nextLabel=" > "
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel=" < "
        renderOnZeroPageCount={null}
      />
    </>
  );
}
