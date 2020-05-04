import React from "react";
import SearchBar from "../../common/searchBar/searchbar";
import CardCollection from "../../common/cardCollection/cardCollection";
import Pagination from "../../common/pagination/pagination";

const ContentList = ({
  searchValue,
  onChange,
  cardList,
  cardItems,
  currentPage,
  itemCount,
  pageSize,
  onPageChange,
}) => {
  return (
    <div className="body-container">
      <SearchBar searchValue={searchValue} onChange={onChange} />
      <CardCollection
        cardList={cardList}
        cardItems={cardItems}
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
