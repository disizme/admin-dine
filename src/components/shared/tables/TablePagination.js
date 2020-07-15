import React from 'react';
import {CardBody, Pagination, PaginationItem, PaginationLink} from "reactstrap";

const TablePagination = (props) => {
  let {to, from, total, currentPage, lastPage, name, changePage} = props;


  let pages = [];
  if (from) {
    let pageFront = currentPage;
    let pageLast = lastPage;
    let end = pageFront + 2;
    let start = pageFront - 2;
    if (pageLast - pageFront === 0) start -= 2;
    else if (pageLast - pageFront === 1) start -= 1;

    for (let i = start; i <= end; i++) {
      if (i < 1) {
        end++;
        continue;
      }
      if (i > pageLast) break;
      pages.push(i);
    }
    console.log("pages", pages)
  }


  let pagination = pages.map((page) => {
    if (page === currentPage) {
      return (<PaginationItem active onClick={() => changePage(page)}>
        <PaginationLink tag="button">{page}</PaginationLink>
      </PaginationItem>);
    }
    return (<PaginationItem onClick={() => changePage(page)}><PaginationLink
      tag="button">{page}</PaginationLink></PaginationItem>);
  });
  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <div>
        {(to - from + 1) <= total &&
          <div className="dataTables_info" aria-live="polite">
            Showing {from} to {to} of {total} {name}
          </div>
        }
      </div>
      <Pagination style={{marginBottom:"0px"}}>
        <PaginationItem disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}><PaginationLink
          previous tag="button">Prev</PaginationLink></PaginationItem>
        {pagination}
        <PaginationItem disabled={currentPage === lastPage} onClick={() => changePage(currentPage + 1)}><PaginationLink
          next tag="button">Next</PaginationLink></PaginationItem>
      </Pagination>
    </div>

  );
}

export default TablePagination;
