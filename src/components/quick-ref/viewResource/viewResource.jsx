import React, { Component } from "react";
import { getResource } from "../../../services/mock/resources";
import { Document, Page} from "react-pdf";

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
    const {title, file, tags, handleLoadSuccess, pageNumber} = this.state;

    console.log("https://pim-resources.coleparmer.com/instruction-manual/20001-71.pdf");

    return (
      <div className="viewResource-container">
        <h1>{title}</h1>
        <div>
          {tags.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
        <Document
          file={"https://pim-resources.coleparmer.com/instruction-manual/20001-71.pdf"}
          onLoadSuccess={handleLoadSuccess}
        >
          <Page pageNumber={pageNumber}/>
        </Document>

      </div>
    );
  }
}

export default ViewResource;
