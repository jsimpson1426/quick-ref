import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
import DotMenu from "../dotMenu/dotMenu";

const Card = ({
  buttonText,
  buttonLink,
  description,
  title,
  className,
  ...rest
}) => {
  return (
    <div className={className ? "card " + className : "card"} {...rest}>
      <div className="card-body">
        <DotMenu className="dot-menu" />
        <h5 className="card-title title-left" align="left">
          {title}
        </h5>
        <p className="card-text">{description}</p>
        <div className="link-container">
          <a align="left" href={buttonLink} className="btn btn-primary">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
