import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";

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
        <FontAwesomeIcon
          className="menu-dots"
          icon={faEllipsisH}
          size="large"
        />
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
