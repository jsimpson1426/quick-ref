import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dotMenu.sass";

const DotMenu = ({ listItems, menuDirection, cardID, ...rest }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <div className="dots">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
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
