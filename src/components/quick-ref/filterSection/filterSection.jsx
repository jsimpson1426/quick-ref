import React from 'react';
import FilterMenu from '../../common/filterMenu/filterMenu';
import TagFilter from '../tagFilter/tagFilter';
import './filterSection.sass';

const FilterSection = ({filters,tagFilter,onTagDelete,onClearFilters}) => {
  return ( 
  <div className="filterSection-container">
    <FilterMenu filterList={filters}></FilterMenu>
    <TagFilter tags={tagFilter} onTagDelete={onTagDelete} onClearFilters={onClearFilters}></TagFilter>
  </div> 
  );
}
 
export default FilterSection;