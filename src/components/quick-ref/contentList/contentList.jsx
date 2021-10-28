import React, { Component } from 'react';
import _ from "lodash";
import { Link } from 'react-router-dom';
import SearchBar from "../../common/searchBar/searchbar";
import CardCollection from "../../common/cardCollection/cardCollection";
import Pagination from "../../common/pagination/pagination";
import FilterSection from "../filterSection/filterSection";
import {paginate} from "../../../utils/paginate";
import { getResources } from "../../../services/api/resources";

class ContentList extends Component{

  state = {
    cards: [],
    pageSize: 6,
    currentPage: 1,
    searchValue: "",
    sortValue: "",
    tagFilter: [],
    navToggle: false
  };

  async componentDidMount() {
    const resources = await getResources();
    const cards = resources.data;
    this.setState({ cards});
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

  handleNavToggle = () => {
    this.setState({navToggle: !this.state.navToggle});
  }

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

    if (pageOfCards.length === 0){
      return (
        <div className="body-container">
          <SearchBar searchvalue={this.state.searchvalue} onChange={this.handleSearchChangeReset} />
          <h1>No resources currently available.</h1>
        </div>
      );
    }

    return (
      <div className="body-container">
        <SearchBar searchvalue={this.state.searchvalue} onChange={this.handleSearchChange} />
        <FilterSection filters={filters} tagFilter={tagFilter} onClearFilters={this.handleClear} onTagDelete={this.handleTagRemove}></FilterSection>
        <CardCollection
          cardList={pageOfCards}
          cardItems={cardOptions}
          onTagAdd={this.handleTagAdd}
        ></CardCollection>
        <Pagination
          className="pagination"
          currentPage={currentPage}
          itemCount={filteredCards.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        ></Pagination>
      </div>
    );
  }
};

export default ContentList;
