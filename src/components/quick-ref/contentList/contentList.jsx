import React from "react";
import SearchBar from "../../common/searchBar/searchbar";
import CardCollection from "../../common/cardCollection/cardCollection";
import Pagination from "../../common/pagination/pagination"
import FilterSection from "../filterSection/filterSection";

const ContentList = ({
    searchvalue,
    onChange,
    onChangeReset,
    cardList,
    cardItems,
    currentPage,
    itemCount,
    pageSize,
    onPageChange,
    filters,
    onTagAdd,
    onClearFilters,
    onTagDelete,
    tagFilter
  }) => {
    if (cardList.length === 0)
      return (
        <div className="body-container">
          <SearchBar searchvalue={searchvalue} onChange={onChangeReset} />
          <h1>No resources currently available.</h1>
        </div>
      );

    return (
      <div className="body-container">
        <SearchBar searchvalue={searchvalue} onChange={onChange} />
        <FilterSection filters={filters} tagFilter={tagFilter} onClearFilters={onClearFilters} onTagDelete={onTagDelete}></FilterSection>
        <CardCollection
          cardList={cardList}
          cardItems={cardItems}
          onTagAdd={onTagAdd}
        ></CardCollection>
        <Pagination
          className="pagination"
          currentPage={currentPage}
          itemCount={itemCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
        ></Pagination>
      </div>
    );
};

export default ContentList;
