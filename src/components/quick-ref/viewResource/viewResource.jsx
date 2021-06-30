import React, { Component } from "react";
import { getResource } from "../../../services/mock/resources";
import { Document, Page} from "react-pdf";
import "./viewResource.sass";
import { capitalize } from './../../../utils/capitalize';

class ViewResource extends Component {
  state = {
    _id: "",
    title: "",
    description: "",
    file: "",
    tags: [],
    fileType: "other",
    pageNumber: 1,
    numPages: null
  };

  componentDidMount() {
    const resourceId = this.props.match.params.id;

    const resource = getResource(resourceId);
    if (!resource) return this.props.history.replace("/");

    this.initializeView(resource);
  }

  initializeView = (resource) => {
    const _id = resource._id;
    const title = resource.title;
    const description = resource.description;
    const file = resource.file;
    const tags = resource.tags ? [...resource.tags] : [];
    const fileType = this.determineFileType(resource.file);
    this.setState({ _id, title, description, file, tags,fileType});
  };

  determineFileType = (fileName) => {
    return fileName.split(".")[1];
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState(numPages);
  };

  render() {
    const {title, description, file, tags, handleLoadSuccess, pageNumber} = this.state;

    return (
      <div className="viewResource-container">
        <h1>Title: {title}</h1>
        <br></br>
        <h5><b>Description</b>: <br></br>{description}</h5>
        <br></br>
        {<div>
          <h5>Tags:</h5>
          <br></br>
          {tags.map((tag) => (
            <p key={tag}><b>{capitalize(tag)}</b></p>
          ))}
        </div>}

      </div>
    );
  }
}

export default ViewResource;
