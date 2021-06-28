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
    sortValue: "",
    tagFilter: [],
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
    this.setState({ searchValue, currentPage: 1});
  };

  handleSortChange = (value) => {
    this.setState({ sortValue: value, currentPage: 1 });
  };

  handleTagAdd = (value) => {
    if(this.state.tagFilter.length >=5)
      return window.alert('The limit on Tag Filters are 5. Please remove or clear filters to add more.');

    if(_.includes(this.state.tagFilter, value))
      return;
    
    let tagFilter = [];
    if(this.state.tagFilter.length === 0)
      tagFilter = [value];
    else{
      tagFilter = [...this.state.tagFilter];
      tagFilter.push(value);
    }

    this.setState({ tagFilter, currentPage: 1 });
  };

  handleTagRemove = (value) => {
    if(!_.includes(this.state.tagFilter, value))
      return;
    
    let tagFilter = [];
    if(!(this.state.tagFilter.length <= 1)){
      tagFilter = [...this.state.tagFilter];
      let removalPosition = _.indexOf(tagFilter, value);
      tagFilter.splice(removalPosition , 1);
    }

    this.setState({ tagFilter, currentPage: 1 });
  };

  handleClear = () => {
    this.setState({
      currentPage: 1,
      searchValue: "",
      sortValue: "",
      tagFilter: [],
    });
    
  };

  handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this resource?")){
      let cards = [...this.state.cards];
      cards = cards.filter((card) => card._id !== id);
      this.setState({ cards });
    }
  };

  renderEdit = (id) => {
    return <Link to={`/manageResource/${id}`}>Edit</Link>;
  };

  renderDelete = (id) => {
    return (
      <div className="dropdown-delete" onClick={() => this.handleDelete(id)}>
        Delete
      </div>
    );
  };

  render() {
    const { cards, pageSize, currentPage, sortValue } = this.state;

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

    const cardOptions = [
      { key: "Edit", content: this.renderEdit },
      { key: "Delete", content: this.renderDelete },
    ];

    const filters = [
      {value: sortValue, label: "Sort", options: ["Ascending","Descending"], onChange: this.handleSortChange}
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
                onTagAdd={this.handleTagAdd}
                onTagDelete={this.handleTagRemove}
                onClearFilters={this.handleClear}
                filters={filters}
                tagFilter={this.state.tagFilter}
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
