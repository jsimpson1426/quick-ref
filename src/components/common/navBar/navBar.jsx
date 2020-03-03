import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navBar.sass";

const NavBar = ({ navBrand, leftLinks, rightLinks, className, ...rest }) => {
  return (
    <Navbar
      collapseOnSelect
      className={className ? className + " topNav" : "topNav"}
      expand="md"
      {...rest}
    >
      <Navbar.Brand className="navText" href="#home">
        {navBrand}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {leftLinks.map(link => (
            <Nav.Link className="navText" href={link.href} key={link.id}>
              {link.content}
            </Nav.Link>
          ))}
        </Nav>
        <Nav>
          {rightLinks.map(link => (
            <Nav.Link href={link.href} key={link.id}>
              {link.content}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
