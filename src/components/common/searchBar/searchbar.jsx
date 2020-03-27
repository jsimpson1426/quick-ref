import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchbar.sass";

const SearchBar = () => {
  return (
    <div className="input-group mb-3 m-4 sb">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-describedby="button-addon2"
      />
      <div className="input-group-append">
        <button className="btn btn-primary" type="button" id="button-addon2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
