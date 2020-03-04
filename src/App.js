import React, { Component } from "react";
import NavBar from "./components/common/navBar/navBar";
import CardCollection from "./components/common/cardCollection/cardCollection";
import "./App.sass";

class App extends Component {
  state = {
    cards: [
      {
        title: "Title One",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      },
      {
        title: "Title Two",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      },
      {
        title: "Title Three",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      },

      {
        title: "Title Four",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      },
      {
        title: "Title Five",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      },
      {
        title: "Title Six",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      },

      {
        title: "Title Seven",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      },
      {
        title: "Title Eight",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
        buttonLink: "#",
        buttonText: "View Material"
      }
    ]
  };
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
        <CardCollection cardList={this.state.cards}></CardCollection>
      </div>
    );
  }
}

export default App;
