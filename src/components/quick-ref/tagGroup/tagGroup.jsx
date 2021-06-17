import React from "react";
import "./tagGroup.sass";
import _ from "lodash";

const TagGroup = ({ tags }) => {
  return (
    <div className="tag-container">
      {tags.map((tag) => (
        <div className="tag-content" key={tag}>
          <b>
            {_.capitalize(tag)}
          </b>
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
