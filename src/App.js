import React, { Component } from "react";
import Card from "./components/common/card/card";
import NavBar from "./components/common/navBar/navBar";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    let leftLinks = [
      {
        id: "search",
        content: <div className="navText">Search</div>
      },
      {
        id: "add",
        content: <div className="navText">Add Resource</div>
      }
    ];

    let rightLinks = [
      { id: "logout", content: <div className="navText">Logout</div> }
    ];

    return (
      <div className="App">
        <NavBar
          navBrand={<div className="navText">Quick-Ref</div>}
          leftLinks={leftLinks}
          rightLinks={rightLinks}
        ></NavBar>
        <Card
          buttonText="View Material"
          title="Title One"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget"
          buttonLink="#"
          className="m-2 card-obj"
        />
      </div>
    );
  }
}

export default App;
