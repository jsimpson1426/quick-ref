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

    console.log(pageRange);

    return (
      <nav
        className={className ? className + " nums" : className}
        aria-label="Page navigation example"
        {...rest}
      >
        <ul className="pagination">
          <li className="page-item">
              <div
                onClick={() => onPageChange(currentPage - 1)}
                className="page-link"
              >
                &lt;
              </div>
            </li>
          {pageRange.map((number) => (
            <li key={number} className="page-item">
              <div
                key={number}
                onClick={() => onPageChange(number)}
                className={
                  currentPage === number ? "page-link page-active" : "page-link"
                }
              >
                {number}
              </div>
            </li>
          ))}
          <li className="page-item">
              <div
                onClick={() => onPageChange(currentPage + 1)}
                className="page-link"
              >
                &gt;
              </div>
            </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
