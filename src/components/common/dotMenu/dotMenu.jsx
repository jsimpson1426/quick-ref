import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dotMenu.css";

const DotMenu = ({ listItems, className }) => {
  return (
    <a
      type="button"
      href
      id="dropdownMenu2"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <FontAwesomeIcon
        className={className ? "menu-dots " + className : "menu-dots"}
        icon={faEllipsisH}
        size="large"
      />
    </a>
  );
};

export default DotMenu;
