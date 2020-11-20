import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./myCard.sass";
import DotMenu from "../dotMenu/dotMenu";
import TagGroup from "../../quick-ref/tagGroup/tagGroup";

const myCard = ({ buttonText, cardData, items, ...rest }) => {
  return (
    <Card {...rest}>
      <Card.Body>
        <DotMenu listItems={items} cardID={cardData._id} className="dot-menu" />
        <Card.Title>{cardData.title}</Card.Title>
        <Card.Text>{cardData.description}</Card.Text>
        <div>
          <p className="m-1">Tags:</p>
          <TagGroup tags={cardData.tags}></TagGroup>
        </div>
        <div className="link-container">
          <Link
            align="left"
            to={`/viewResource/${cardData._id}`}
            className="btn btn-primary"
          >
            {buttonText}
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default myCard;
