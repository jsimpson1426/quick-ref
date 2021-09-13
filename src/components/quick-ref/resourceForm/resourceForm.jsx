import React, { Component } from "react";
import Joi from "joi-browser";
import FormData from "form-data";
import { getResource, saveResource } from "../../../services/mock/resources";
import "./resourceForm.sass";


class ResourceForm extends Component {
  state = {
    data: {
      title: "",
      description: "",
      file: "",
      tagInput: "",
    },
    errors: {},
    tags: [],
    tagsErrors: "",
    fileToUpload: ""
  };

  

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().allow("").max(1024).label("Description"),
    file: Joi.string().required(),
    tagInput: Joi.string().allow("").optional().max(32).regex(/^(?!\s)[0-9a-zA-Z]+$/, "No Spaces Allowed - Only Alphanumeric Values").label("Tag"),
  };

  componentDidMount() {
    const resourceId = this.props.match.params.id;
    if (resourceId === "new") return;

    const resource = getResource(resourceId);
    if (!resource) return this.props.history.replace("/");

    this.initializeView(resource);
  }

  initializeView = (resource) => {
    let data = { ...this.state.data };
    data._id = resource._id;
    data.title = resource.title;
    data.description = resource.description;
    data.file = resource.file;
    const tags = resource.tags ? [...resource.tags] : [];
    this.setState({ data, tags });
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

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  doSubmit = () => {
    let form = new FormData();

    form.append('title', this.state.data.title);
    form.append('description', this.state.data.description);
    form.append('tags', JSON.stringify(this.state.tags));
    form.append('file', this.state.fileToUpload);

    saveResource(form);

    this.props.history.push('/');
  };

  handleChange = ({ currentTarget: input }) => {
    const tagsErrors = "";
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors, tagsErrors });
  };

  fileChangeHandler = (event) => {
    const tagsErrors = "";
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) errors[event.currentTarget.name] = errorMessage;
    else delete errors[event.currentTarget.name];

    const data = { ...this.state.data };
    data["file"] = event.target.files[0].name;

    this.setState({
      data,
      errors,
      tagsErrors,
      fileToUpload: event.target.files[0]
    });
  };

  tagHandler = () => {
    let data = { ...this.state.data };
    let tags = this.state.tags ? [...this.state.tags] : [];
    let tagsErrors = "";
    if (!data.tagInput) {
      tagsErrors = "You may not submit an empty tag.";
    } else if (tags.find((tag) => tag === data.tagInput.toLowerCase())) {
      tagsErrors = "New tags must be unique.";
    } else if (tags.length >= 5) {
      tagsErrors = "The max number of tags is five.";
    } else {
      tags.push(data.tagInput.toLowerCase());
      data.tagInput = "";
    }
    this.setState({ data, tags, tagsErrors });
  };

  handleDelete = (value) => {
    let startTags = this.state.tags ? [...this.state.tags] : [];
    if (!startTags) return;
    const tags = startTags.filter((tag) => tag !== value);
    this.setState({ tags });
  };

  renderTags = () => {
    const tags = this.state.tags;
    if (!tags) return;

    return (
      <div>
        {tags.map((tag) => (
          <span
            className="badge badge-primary m-2"
            key={tag}
            onClick={() => this.handleDelete(tag)}
          >
            <b>x</b> {tag}
          </span>
        ))}
      </div>
    );
  };

  handleEnterTag = (event) => {
    if(event.code === 'Enter'){
        this.tagHandler();
    }
  }

  handleEnterSubmit = (event) => {
    if(event.code === 'Enter'){
        this.handleSubmit();
    }
  }

  renderFileInput = () => {};

  render() {
    let { data, errors } = this.state;

    return (
      <div className="form-content">
        <h1><b>Resource Editor</b></h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              id="title"
              className="form-control"
              value={data.title}
              onChange={this.handleChange}
              onKeyUp={this.handleEnter}
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
              onKeyUp={this.handleEnter}
            />
            {errors.description && (
              <div className="alert alert-danger">{errors.description}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="file" className="form-file-label">Upload File</label>
            <br></br>
            <input
              type="file"
              name="file"
              className="inputfile"
              onChange={this.fileChangeHandler}
              onKeyUp={this.handleEnter}
            />
            {errors.file && (
              <div className="alert alert-danger">{errors.file}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="tagInput">Tags (optional)</label>
            <div className="input-group">
              <input
                name="tagInput"
                id="tagInput"
                className="form-control"
                value={data.tagInput}
                onChange={this.handleChange}
                onKeyUp={this.handleEnterTag}
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={errors.tagInput}
                  onClick={this.tagHandler}
                >
                  Add Tag
                </button>
              </div>
            </div>
            {errors.tagInput && (
              <div className="alert alert-danger">{errors.tagInput}</div>
            )}
            {this.renderTags()}
            {this.state.tagsErrors && (
              <div className="alert alert-danger">{this.state.tagsErrors}</div>
            )}
          </div>
          <button
            disabled={this.validate()}
            className={
              !this.validate() ? "btn btn-primary submit" : "btn btn-secondary submit"
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
