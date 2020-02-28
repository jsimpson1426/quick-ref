import React, { Component } from "react";
import "./App.css";
import Card from "./components/common/card/card";
import NavBar from "./components/common/topNav/navBar";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
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
