import React from "react";
import SearchBar from "../../common/searchBar/searchbar";
import CardCollection from "../../common/cardCollection/cardCollection";
import Pagination from "../../common/pagination/pagination";

const ContentList = ({
  searchvalue,
  onChange,
  cardList,
  cardItems,
  currentPage,
  itemCount,
  pageSize,
  onPageChange,
}) => {
  if (cardList.length === 0)
    return (
      <div className="body-container">
        <SearchBar searchvalue={searchvalue} onChange={onChange} />
        <h1>No resources currently available.</h1>
      </div>
    );

  return (
    <div className="body-container">
      <SearchBar searchvalue={searchvalue} onChange={onChange} />
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
