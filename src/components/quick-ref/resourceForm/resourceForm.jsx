import React, { Component } from "react";
import Joi from "joi-browser";

class ResourceForm extends Component {
  state = {
    data: {
      title: "",
      description: "",
      file: "",
      tagInput: "",
    },
    errors: {},
    fileToUpload: "",
    tags: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().max(1024).label("Description"),
    file: Joi.string().required().label("File"),
    tagInput: Joi.string().max(64).label("Tag"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.data.file);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  // fileChangeHandler = (event) => {
  //   this.setState({ file: event.target.files[0] });
  // };

  fileChangeHandler = (event) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) errors[event.currentTarget.name] = errorMessage;
    else delete errors[event.currentTarget.name];

    const data = { ...this.state.data };
    data[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ data, errors });
    this.setState({ file: event.target.files[0] });
  };

  renderFileInput = () => {};

  render() {
    let { data, errors } = this.state;

    return (
      <div>
        <h1>Resource Editor</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              id="title"
              className="form-control"
              value={data.title}
              onChange={this.handleChange}
            />
            {errors.title && (
              <div className="alert alert-danger">{errors.title}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <input
              name="description"
              id="description"
              className="form-control"
              value={data.description}
              onChange={this.handleChange}
            />
            {errors.description && (
              <div className="alert alert-danger">{errors.description}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <br></br>
            <input type="file" name="file" onChange={this.fileChangeHandler} />
            {errors.file && (
              <div className="alert alert-danger">{errors.file}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="tagInput">Tags (optional)</label>
            <input
              name="tagInput"
              id="tagInput"
              className="form-control"
              value={data.tagInput}
              onChange={this.handleChange}
            />
            {errors.tagInput && (
              <div className="alert alert-danger">{errors.tagInput}</div>
            )}
          </div>
          <button
            disabled={this.validate()}
            className={
              this.validate() ? "btn btn-primary" : "btn btn-secondary"
            }
          >
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default ResourceForm;
