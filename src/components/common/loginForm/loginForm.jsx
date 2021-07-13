import Joi from 'joi-browser';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./loginForm.sass";


class LoginForm extends Component {
  state = {
    data:{
      username: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string().min(5).max(32).required().label("Username"),
    password: Joi.string().required().label("Password")
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
    let dataToSend = {};
    dataToSend._id = this.state.data._id;
    dataToSend.title = this.state.data.title;
    dataToSend.description = this.state.data.description;
    dataToSend.file = this.state.data.file;
    dataToSend.tags = this.state.tags;
    dataToSend.fileToUpload = this.state.fileToUpload;

    this.props.history.push("/");
  };

  handleChange = ({ currentTarget: input }) => {
    console.log(input);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  

  render() {
    
    const { data } = this.state;

    // const dropdownData= {
    //   label: "System Role:",
    //   name: "systemRole",
    //   value: data.systemRole,
    //   options: [
    //     {text: "Administrator (CRUD ops)", value: 'admin'},
    //     {text: "User (View Only)", value: 'user'}
    //   ]
    // }

    return ( 
      <div className="form-content login">
        <h1><b>Login</b></h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              className="form-control"
              value={data.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="form-control"
              value={data.password}
              onChange={this.handleChange}
            />
          </div>
          {/* <Dropdown className="form-group" data={dropdownData} onChange={this.handleChange} isFormControlled={true}/>
          {errors.systemRole && (
              <div className="alert alert-danger">{errors.systemRole}</div>
            )} */}
          <button
            disabled={this.validate()}
            className={
              !this.validate() ? "btn btn-primary submit" : "btn btn-secondary submit"
            }
          >
            Login
          </button>
          <p>Do you need an account? Click here to <Link to="/register">Register</Link>.</p>
        </form>
      </div>
     );
  }
}
 
export default LoginForm;