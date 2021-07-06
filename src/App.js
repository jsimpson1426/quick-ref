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
import LoginForm from "./components/common/loginForm/loginForm";

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

  //This function controls change of pagination
  handlePageChange = (page) => {
    const max = _.ceil(this.state.cards.length / this.state.pageSize);

    if(page <= 1) page = 1;
    if(page >= max) page = max;

    this.setState({ currentPage: page });
  };

  //This function controls when a character is added or removed
  //the page is reset on any search change
  //the search value will be case insensitive and will be a global match (see RegExp docs for details)
  handleSearchChange = (value) => {
    const str = _.escapeRegExp(value);
    const searchValue = new RegExp(str, "gi");
    this.setState({ searchValue, currentPage: 1});
  };

  //This function is identical to handleSearchChange except for resetting the sortValue and tagFilter
  //this is used when the search yields no results. If the page is blank, all filters are reset when the search is cleared.
  handleSearchChangeReset = (value) => {
    const str = _.escapeRegExp(value);
    const searchValue = new RegExp(str, "gi");
    this.setState({ searchValue, currentPage: 1, sortValue: "", tagFilter: []});
  };

  //This function simply handles the sortValue and resets the page to 1
  handleSortChange = (value) => {
    this.setState({ sortValue: value, currentPage: 1 });
  };

  //This function appends tags to the tagFilters
  //with a max of 5
  //and resets the page to 1
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

  //This function splices out the target tag in the tagFilters
  //and resets the page to 1
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

  //This function resets all filters and resets the page to 1
  handleClear = () => {
    this.setState({
      currentPage: 1,
      sortValue: "",
      tagFilter: [],
    });
    
  };

  //This function deletes a card.
  handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this resource?")){
      let cards = [...this.state.cards];
      cards = cards.filter((card) => card._id !== id);
      this.setState({ cards });
    }
  };

  //This function renders a Link Component to manage a resource by id
  renderEdit = (id) => {
    return <Link to={`/manageResource/${id}`}>Edit</Link>;
  };

  //This function renders a div that handles deletes given a resource id
  renderDelete = (id) => {
    return (
      <div className="dropdown-delete" onClick={() => this.handleDelete(id)}>
        Delete
      </div>
    );
  };

  render() {
    const { cards, pageSize, currentPage, sortValue, tagFilter,searchValue } = this.state;

    //filter cards by searchValue
    let filteredCards = cards.filter((item) => {
      return item.title.match(searchValue);
    });

    //if there are tags in the tagFilter array
    //filter out each card that does not contain all tags in the TagFilter array
    if(tagFilter.length){
      tagFilter.forEach((tag, index) => {
        if(filteredCards.length){
          filteredCards = filteredCards.filter((item) => {
            return _.includes(item.tags,tag);
          });
        }
      })
    }

    //if we have a sortValue
    //sort the titles based on the sort value ('asc' or 'desc')
    if(sortValue){
      filteredCards = _.orderBy(filteredCards,["title"],[sortValue]);
    }
    
    //leftLinks and rightLinks for the navBar
    const leftLinks = [];

    const rightLinks = [
      {
        id: "add",
        content: <div className="navText">Add Resource</div>,
      },
      { id: "logout", content: <div className="navText">Logout</div> },
    ];

    //generates the page that we see based on which page we are on and what the max number of cards per page is
    const pageOfCards = paginate(filteredCards, currentPage, pageSize);

    //defining content for dotMenu on each card
    const cardOptions = [
      { key: "Edit", content: this.renderEdit },
      { key: "Delete", content: this.renderDelete },
    ];

    //defining the filters to pass to the props for our filter menu
    const filters = [
      {value: sortValue, label: "Sort", options: [{value: 'asc',text: 'Ascending'},{value: 'desc',text: 'Descending'}], onChange: this.handleSortChange}
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
            path="/login"
            render={(props) => <LoginForm {...props} />}
          />
          <Route
            path="/"
            render={(props) => (
              <ContentList
                searchValue={searchValue}
                onChange={this.handleSearchChange}
                onChangeReset={this.handleSearchChangeReset}
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
                tagFilter={tagFilter}
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
