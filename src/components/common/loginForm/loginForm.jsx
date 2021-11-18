import Joi from 'joi-browser';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../services/api/auth';
import "./loginForm.sass";


class LoginForm extends Component {
  state = {
    data:{
      email: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    email: Joi.string().min(5).max(32).required().label("Email"),
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

  doSubmit = async () => {
    try {
      const {email, password} = this.state.data;
      await auth.login(email,password);
      const {state} = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400){
        const errors = {...this.state.errors};
        errors.email = error.response.data;
        toast.error(error.response.data);
        this.setState({errors});
      }
    }
    
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
  

  render() {
    
    if(auth.getCurrentUser()){
      return <Redirect to="/" />
    }

    const { data } = this.state;

    return ( 
      <div className="form-content login">
        <h1><b>Login</b></h1>
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