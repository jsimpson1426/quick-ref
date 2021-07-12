import React, { Component } from "react";
import _ from "lodash";
import { getResource } from "../../../services/mock/resources";
import { capitalize } from './../../../utils/capitalize';
import { pictureFileTypes, videoFileTypes, determineFileType } from '../../../utils/files';
import "./viewResource.sass";

class ViewResource extends Component {
  state = {
    _id: "",
    title: "",
    description: "",
    file: "",
    tags: [],
    fileType: "",
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
    const fileType = determineFileType(resource.file);
    this.setState({ _id, title, description, file, tags,fileType});
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState(numPages);
  };

  renderFile = () => {
    //if the file is a pdf
    if(("." + this.state.fileType) === '.pdf'){
      return(
        <div className="content"><iframe title="PDF Reader" src={`${document.location.origin}/${this.state.file}`}></iframe></div>
        );
    } 
    //if the file is a picture
    else if (_.includes(pictureFileTypes,"." + this.state.fileType)){
      return (
        <img src={`${document.location.origin}/${this.state.file}`} alt={this.state.file} />
      );
    }
    //if the file is a video
    else if (_.includes(videoFileTypes,"." + this.state.fileType)){
      return(
        <div className="content"><video controls><source src={`${document.location.origin}/${this.state.file}`} type={`video/${this.state.fileType}`} /></video></div>
      );
    }
    else {
      return(
        <a href={`${document.location.origin}/${this.state.file}`}>Download</a>
      );
    }
  }

  render() {
    const {title, description,tags} = this.state;

    return (
      <div className="viewResource-container">
        <h1>{title}</h1>
        {tags.map((tag) => (<p key={tag}><b>{capitalize(tag)}</b></p>))}
        <div className="description">{description}</div>
        {this.renderFile()}
      </div>
    );
  }
}

export default ViewResource;
