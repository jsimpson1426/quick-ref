import React, { Component } from "react";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagination.sass";

class Pagination extends Component {
  state = {};
  render() {
    let { itemCount, pageSize, onPageChange, currentPage, className, ...rest } =
      this.props;
    let numOfPages = _.ceil(itemCount / pageSize);
    if (numOfPages === 1) return null;
    let pageRange = _.range(1, numOfPages + 1);

    console.log(currentPage);

    return (
      <nav
        className={className ? className + " nums" : className}
        aria-label="Page navigation example"
        {...rest}
      >
        <ul className="pagination">
          {pageRange.map((number) => (
            <li key={number} className="page-item">
              <a
                key={number}
                onClick={() => onPageChange(number)}
                className={
                  currentPage === number ? "page-link active" : "page-link"
                }
                href="# "
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
