import React from "react";
import "./navBar.sass";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../services/api/auth";

class NavBar extends React.Component {

  state = {
    navToggle: false
  };
  
  onRouteChange = () => {
    this.setState({navToggle: false}); 
  }

  onNavToggle = () => {
    if(!this.state.navToggle){
      this.setState({navToggle: true});
    } else {
      this.setState({navToggle: false});
    }
  }

  render() { 

    return (
      <nav className="topNav">
        <Link className="leftLink" onClick={this.onRouteChange} to="/">
          Quick Ref
        </Link>
        <div className="navToggle" onClick={this.onNavToggle}>
          <div className="hamburger">
            <div className="cylinder"></div>
            <div className="cylinder"></div>
            <div className="cylinder"></div>
          </div>
        </div>
        <div className={this.state.navToggle ? "rightLinks-menu" : "rightLinks-menu-closed"} onClick={this.onNavToggle}></div>
        <div className={this.state.navToggle ? "rightLinks" : "rightLinks-closed"} id="navbarText">
          <ul className={this.state.navToggle ? "navList" : "navList-closed"}>
            <li >
              <Link to="/" onClick={this.onRouteChange}>
                Home
              </Link>
            </li>
            
              {getCurrentUser() && getCurrentUser().isAdmin && <li ><Link to="/addResource" onClick={this.onRouteChange}>Add Resource</Link></li>}
            
            <li >
              {getCurrentUser() ? <Link  to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
 
export default NavBar;


