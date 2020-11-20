import React, { Component } from "react";

class ViewResource extends Component {
  state = { _id: "" };

  render() {
    return <h1>{"Resource ID: " + this.props.match.params.id}</h1>;
  }
}

export default ViewResource;
