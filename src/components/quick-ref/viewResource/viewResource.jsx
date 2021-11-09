import React, { Component } from "react";
import _ from "lodash";
import { getResource } from "../../../services/api/resources";
import { capitalize } from './../../../utils/capitalize';
import { pictureFileTypes, videoFileTypes, determineFileType } from '../../../utils/files';
import { apiEndpoint } from '../../../services/api/config.json';
import "./viewResource.sass";

const endPoint = apiEndpoint + "/uploads";

class ViewResource extends Component {
  state = {
    title: "",
    description: "",
    filename: "",
    tags: [],
    fileType: ""
  };

  async componentDidMount() {
    const resourceId = this.props.match.params.id;

    const response = await getResource(resourceId);
    const resource = response.data;
    if (!resource) return this.props.history.replace("/");

    this.initializeView(resource);
  }

  initializeView = (resource) => {
    const title = resource.title;
    const description = resource.description;
    const filename = resource.filename;
    const tags = resource.tags ? [...resource.tags] : [];
    const fileType = determineFileType(resource.filename);
    this.setState({ title, description, filename, tags,fileType});
  };

  renderFile = () => {
    //if the filename is a pdf
    if(("." + this.state.fileType) === '.pdf'){
      return(
        <div className="content"><iframe title="PDF Reader" src={`${endPoint}/${this.state.filename}`}></iframe></div>
        );
    } 
    //if the filename is a picture
    else if (_.includes(pictureFileTypes,"." + this.state.fileType)){
      return (
        <img src={`${endPoint}/${this.state.filename}`} alt={this.state.filename} />
      );
    }
    //if the filename is a video
    else if (_.includes(videoFileTypes,"." + this.state.fileType)){
      return(
        <div className="content"><video controls><source src={`${endPoint}/${this.state.filename}`} type={`video/${this.state.fileType}`} /></video></div>
      );
    }
    else {
      return(
        <a href={`${endPoint}/${this.state.filename}`}>Download</a>
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
