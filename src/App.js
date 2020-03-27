import React, { Component } from "react";
import NavBar from "./components/common/navBar/navBar";
import CardCollection from "./components/common/cardCollection/cardCollection";
import getResources from "./services/mock/resources";
import Pagination from "./components/common/pagination/pagination";
import SearchBar from "./components/common/searchBar/searchbar";
import { paginate } from "./utils/paginate";
import "./App.sass";

class App extends Component {
  state = {
    cards: [],
    pageSize: 6,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ cards: getResources() });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { cards, pageSize, currentPage } = this.state;

    const leftLinks = [
      {
        id: "search",
        content: <div className="navText">Search</div>
      },
      {
        id: "add",
        content: <div className="navText">Add Resource</div>
      }
    ];

    const rightLinks = [
      { id: "logout", content: <div className="navText">Logout</div> }
    ];

    const pageOfCards = paginate(cards, currentPage, pageSize);

    return (
      <div className="App">
        <NavBar
          navBrand={<div className="navText">Quick-Ref</div>}
          leftLinks={leftLinks}
          rightLinks={rightLinks}
        ></NavBar>
        <div className="body-container">
          <SearchBar />
          <CardCollection cardList={pageOfCards}></CardCollection>
          <Pagination
            className="pagination"
            currentPage={currentPage}
            itemCount={cards.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default App;
