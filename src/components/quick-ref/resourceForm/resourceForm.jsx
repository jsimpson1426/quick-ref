import React, { Component } from "react";
import Joi from "joi-browser";

class ResourceForm extends Component {
  state = {
    data: {
      file: null,
    },
    errors: {},
    selectedFile: null,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.data.file);
  };

  fileChangeHandler = (event) => {
    let data = { ...this.state.data };
    data.file = event.target.files[0];
    this.setState({ data: data });
  };

  isValid = () => {
    if (!this.state.data.file) {
      return false;
    }
    return true;
  };

  renderFileInput = () => {};

  render() {
    return (
      <div>
        <h1>Resource Editor</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <br></br>
            <input type="file" name="file" onChange={this.fileChangeHandler} />
          </div>
          <button
            disabled={!this.isValid()}
            className={this.isValid() ? "btn btn-primary" : "btn btn-secondary"}
          >
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default ResourceForm;
