import React, { Component } from 'react';
import Joi from 'joi-browser';
import './registerForm.sass';

class RegisterForm extends Component {
  state = {
    data:{
      email: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/).label("Password")
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
    const errors = { ...this.state.errors };
    console.log(errors);
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  render() {
    
    const {data,errors} = this.state;

    return ( 
    <div className="form-content register">
      <h1><b>Register</b></h1>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            className="form-control"
            value={data.email}
            onChange={this.handleChange}
          />
          {errors.email && (
              <div className="alert alert-danger">{errors.email}</div>
            )}
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
        <div className="alert alert-secondary">Password must contain:
        <ul>
          <li>1 Lowercase Letter</li>
          <li>1 Uppercase Letter</li>
          <li>1 Digit</li>
          <li>1 Special Character (@$!%*?&)</li>
        </ul>
      </div>
        <button
          disabled={this.validate()}
          className={
            !this.validate() ? "btn btn-primary submit" : "btn btn-secondary submit"
          }
        >
          Register
        </button>
      </form>
    </div>
    );
  }
}
 
export default RegisterForm;