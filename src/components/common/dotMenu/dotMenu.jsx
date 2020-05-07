import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dotMenu.sass";

const DotMenu = ({ listItems, menuDirection, cardID, ...rest }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FontAwesomeIcon className="menu-dots" icon={faEllipsisH} size="lg" />
    </a>
  ));

  return (
    <Dropdown alignRight {...rest}>
      <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
      <Dropdown.Menu>
        {listItems.map((item) => (
          <div className="dropdown-item" key={item.key}>
            {item.content(cardID)}
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DotMenu;
