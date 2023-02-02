import React from "react";
import ReactPaginate from "react-paginate";

import classes from './Pagination.module.scss'

interface IPaginationProps {
  currentPage: number,
  onChangePage: (number: number) => void
}


export default function Pagination({currentPage, onChangePage}: IPaginationProps) {
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
