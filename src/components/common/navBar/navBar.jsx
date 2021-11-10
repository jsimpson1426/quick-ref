import React from "react";
import "./navBar.sass";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../services/api/auth";

const NavBar = ({ navToggle, onNavToggle, onRouteChange, ...rest }) => {
  return (
    <nav className="topNav">
      <Link className="leftLink" onClick={onRouteChange} to="/">
        Quick Ref
      </Link>
      <div className="navToggle" onClick={onNavToggle}>
        <div className="hamburger">
          <div className="cylinder"></div>
          <div className="cylinder"></div>
          <div className="cylinder"></div>
        </div>
      </div>
      <div className={navToggle ? "rightLinks-menu" : "rightLinks-menu-closed"}></div>
      <div className={navToggle ? "rightLinks" : "rightLinks-closed"} id="navbarText">
        <ul className="navList">
          <li >
            <Link to="/" onClick={onRouteChange}>
              Home
            </Link>
          </li>
          <li >
            <Link to="/manageResource/new" onClick={onRouteChange}>
              Add Resource
            </Link>
          </li>
          <li >
            {getCurrentUser() ? <Link  to="/logout">Logout</Link> : <Link  to="/login">Login</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
