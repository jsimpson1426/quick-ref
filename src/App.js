import React, { Component } from "react";
import NavBar from "./components/common/navBar/navBar";
import CardDeck from "react-bootstrap/CardDeck";
import MyCard from "./components/common/myCard/myCard";
import "./App.sass";

class App extends Component {
  state = {
    cards: [
      [
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
        }
      ],
      [
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
        }
      ],
      [
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
        },
        {
          title: "Title Nine",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget",
          buttonLink: "#",
          buttonText: "View Material"
        }
      ]
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
        <CardDeck className="cards">
          {this.state.cards.map(cardRow => (
            <React.Fragment>
              <MyCard
                buttonText={cardRow[0].buttonText}
                title={cardRow[0].title}
                description={cardRow[0].description}
                buttonLink={cardRow[0].buttonLink}
                className="card-obj"
              />
              <MyCard
                buttonText={cardRow[1].buttonText}
                title={cardRow[1].title}
                description={cardRow[1].description}
                buttonLink={cardRow[1].buttonLink}
                className="card-obj"
              />
              <MyCard
                buttonText={cardRow[2].buttonText}
                title={cardRow[2].title}
                description={cardRow[2].description}
                buttonLink={cardRow[2].buttonLink}
                className="card-obj"
              />
            </React.Fragment>
          ))}
        </CardDeck>
      </div>
    );
  }
}

export default App;
