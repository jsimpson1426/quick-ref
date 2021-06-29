import React from 'react';
import './filterMenu.sass';

const FilterMenu = ({filterList, className}) => {
  return ( 
    <div
      className={
      className
        ? className + " filterMenu-container"
        : "filterMenu-container"
    }>
      {filterList.map((filterItem) => (
        <React.Fragment key={filterItem.label}>
        
          <label htmlFor={filterItem.label}>{filterItem.label}:</label>
          <select name={filterItem.label} value={filterItem.value} id={filterItem.label} onChange={(e) => filterItem.onChange(e.currentTarget.value)}>
            <option value="" defaultValue>--</option>
            {filterItem.options.map((optionItem) => (
              <option key={optionItem.value} value={optionItem.value}>{optionItem.text}</option>
            ))}
          </select>
        
        </React.Fragment>
      ))}
    </div> 
  );
}
 
export default FilterMenu;