import React from "react";
import "./navBar.sass";
import { Link } from "react-router-dom";

const NavBar = ({ navToggle, onNavToggle, ...rest }) => {
  // return (
  //   <nav className="navbar navbar-expand-lg topNav">
  //     <Link className="navbar-brand navText" to="/">
  //       Quick Ref
  //     </Link>
  //     <button
  //       className="navbar-toggler"
  //       type="button"
  //     >
  //       <span className="navbar-toggler-icon"></span>
  //     </button>
  //     <div className="collapse navbar-collapse" id="navbarText">
  //       <ul className="navbar-nav mr-auto"></ul>
  //       <ul className="navbar-nav">
  //         <li className="nav-item">
  //           <Link className="nav-link navText" to="/manageResource/new">
  //             Add Resource
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link navText" to="/logout">
  //             Logout
  //           </Link>
  //         </li>
  //       </ul>
  //     </div>
  //   </nav>
  // );
  return (
    <nav className={navToggle ? "topNav open" : "topNav"}>
      <Link className="leftLink" to="/">
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
            <Link  to="/manageResource/new">
              Add Resource
            </Link>
          </li>
          <li >
            <Link  to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
