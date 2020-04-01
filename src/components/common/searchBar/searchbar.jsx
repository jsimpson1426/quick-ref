import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchbar.sass";

const SearchBar = ({ searchValue, onChange }) => {
  return (
    <div className="input-group mb-3 m-4 sb">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-describedby="button-addon2"
        searchValue={searchValue}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBar;
