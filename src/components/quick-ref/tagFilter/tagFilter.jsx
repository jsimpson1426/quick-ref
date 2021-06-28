import React from 'react';
import _ from "lodash";
import { ellipsize } from '../../../utils/ellipsize';
import "./tagFilter.sass";

const TagFilter = ({tags,onTagDelete,onClearFilters}) => {
  if(tags.length <= 0 )
    return ( 
      <div className="tagFilter-noTags">
        
      </div>
   );
  
   return ( 
    
    <div className="tagFilter-container">
      {tags.map((tag) => (
        <div key={tag} className="tagFilter-content">
          <span onClick={() => onTagDelete(tag)}>x</span>
          <div>{ellipsize(_.capitalize(tag),12)}</div>
        </div>
      ))}
      <div className="tagFilter-content">
        <span onClick={onClearFilters}>x</span>
        <div>Clear</div>
      </div>
    </div>
 );
  
}
 
export default TagFilter;