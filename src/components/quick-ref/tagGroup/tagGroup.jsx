import React from "react";
import "./tagGroup.sass";

const TagGroup = ({ tags }) => {
  return (
    <div className="tag-container">
      {tags.map((tag) => (
        <div className="tag-content" key={tag}>
          <b>
            {tag}
          </b>
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
