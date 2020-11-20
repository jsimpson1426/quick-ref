import React from "react";

const TagGroup = ({ tags }) => {
  return (
    <div>
      {tags.map((tag) => (
        <span className="badge badge-primary m-1" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagGroup;
