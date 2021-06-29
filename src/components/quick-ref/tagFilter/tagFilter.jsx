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
          <b>
            <span onClick={() => onTagDelete(tag)}> x </span>
            <div>{ellipsize(_.capitalize(tag),12)}</div>
          </b>
        </div>
      ))}
      <div className="tagFilter-content clear">
        <b>
          <span onClick={onClearFilters}> x </span>
          <div>Clear</div>
        </b>
      </div>
    </div>
 );
  
}
 
export default TagFilter;