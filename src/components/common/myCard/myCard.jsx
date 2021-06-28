import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myCard.sass";
import DotMenu from "../dotMenu/dotMenu";
import TagGroup from "../../quick-ref/tagGroup/tagGroup";
import { ellipsize } from './../../../utils/ellipsize';

const myCard = ({ buttonText, cardData, items, className, onTagAdd, ...rest }) => {
  return (
    <div className={className ? className + " myCard" : className} {...rest}>
      <div className="header">
        <DotMenu listItems={items} cardID={cardData._id} className="dot-menu" />
        <h4 className="myCard-title">{ellipsize(cardData.title,20)}</h4>
      </div>
      <div className="myCard-body">
        
        <div className="myCard-text">{ellipsize(cardData.description,150)}</div>
      </div>
      <div className="myCard-tagBlock">
        <p>Tags:</p>
        <TagGroup tags={cardData.tags} onTagAdd={onTagAdd} ></TagGroup>
      </div>
      <div className="link-container">
          <Link
            align="left"
            to={`/viewResource/${cardData._id}`}
          >
            {buttonText}
          </Link>
        </div>
    </div>
  );
};

export default myCard;
