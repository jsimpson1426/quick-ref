import React from "react";
import "./tagGroup.sass";
import _ from "lodash";
import { ellipsize } from "../../../utils/ellipsize";

const TagGroup = ({ tags, onTagAdd }) => {
  return (
    <div className="tag-container">
      {tags.map((tag) => (
        <div className="tag-content" key={tag}>
          <div onClick={(e) => onTagAdd((tag))}>
            <b>
              {ellipsize(_.capitalize(tag),12)}
            </b>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
