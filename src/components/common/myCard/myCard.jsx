import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./myCard.sass";
import DotMenu from "../dotMenu/dotMenu";

const myCard = ({ buttonText, buttonLink, description, title, ...rest }) => {
  let items = [
    { text: "Text 1", url: "#" },
    { text: "Text 2", url: "#" },
    { text: "Text 3", url: "#" }
  ];

  return (
    <Card {...rest}>
      <Card.Body>
        <DotMenu listItems={items} className="dot-menu" />
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="link-container">
          <a align="left" href={buttonLink} className="btn btn-primary">
            {buttonText}
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default myCard;