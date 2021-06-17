import React, { Component } from "react";
import _ from "lodash";
import { Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/common/navBar/navBar";
import { getResources } from "./services/mock/resources";
import { paginate } from "./utils/paginate";
import "./App.sass";
import ContentList from "./components/quick-ref/contentList/contentList";
import ResourceForm from "./components/quick-ref/resourceForm/resourceForm";
import ViewResource from "./components/quick-ref/viewResource/viewResource";

class App extends Component {
  state = {
    cards: [],
    pageSize: 6,
    currentPage: 1,
    searchValue: "",
  };

  componentDidMount() {
    this.setState({ cards: getResources() });
  }

  handlePageChange = (page) => {
    const max = _.ceil(this.state.cards.length / this.state.pageSize);

    if(page <= 1) page = 1;
    if(page >= max) page = max;

    this.setState({ currentPage: page });
  };

  handleSearchChange = (value) => {
    const str = _.escapeRegExp(value);
    const searchValue = new RegExp(str, "gi");
    this.setState({ searchValue, currentPage: 1 });
  };

  handleDelete = (id) => {
    let cards = [...this.state.cards];
    cards = cards.filter((card) => card._id !== id);
    this.setState({ cards });
  };

  renderEdit = (id) => {
    return <Link to={`/manageResource/${id}`}>Edit</Link>;
  };

  renderDelete = (id) => {
    return (
      <button className="btn btn-primary" onClick={() => this.handleDelete(id)}>
        Delete
      </button>
    );
  };

  render() {
    const { cards, pageSize, currentPage } = this.state;

    const filteredCards = cards.filter((item) => {
      return item.title.match(this.state.searchValue);
    });

    const leftLinks = [];

    const rightLinks = [
      {
        id: "add",
        content: <div className="navText">Add Resource</div>,
      },
      { id: "logout", content: <div className="navText">Logout</div> },
    ];

    const pageOfCards = paginate(filteredCards, currentPage, pageSize);

    let cardOptions = [
      { key: "Edit", content: this.renderEdit },
      { key: "Delete", content: this.renderDelete },
    ];

    return (
      <div className="App">
        <NavBar
          navBrand={<div className="navText">Quick-Ref</div>}
          leftLinks={leftLinks}
          rightLinks={rightLinks}
        ></NavBar>
        <Switch>
          <Route
            path="/manageResource/:id"
            render={(props) => <ResourceForm {...props} />}
          />
          <Route
            path="/viewResource/:id"
            render={(props) => <ViewResource {...props} />}
          />
          <Route
            path="/"
            render={(props) => (
              <ContentList
                searchValue={this.state.searchValue}
                onChange={this.handleSearchChange}
                cardList={pageOfCards}
                cardItems={cardOptions}
                currentPage={currentPage}
                itemCount={filteredCards.length}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
