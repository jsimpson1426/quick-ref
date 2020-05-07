import React from "react";
import "./navBar.sass";
import { Link } from "react-router-dom";

const NavBar = ({ navBrand, leftLinks, rightLinks, className, ...rest }) => {
  return (
    <nav className="navbar navbar-expand-lg topNav">
      <Link className="navbar-brand navText" to="/">
        Quick Ref
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link navText" to="/manageResource/new">
              Add Resource
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link navText" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
