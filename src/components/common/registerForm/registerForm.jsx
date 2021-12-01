import React, { Component } from 'react';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { registerUser } from '../../../services/api/register';
import './registerForm.sass';
import auth from '../../../services/api/auth';

class RegisterForm extends Component {
  state = {
    data:{
      email: "",
      password: "",
      passwordCheck: ""
    },
    errors: {}
  }

  checkPassword = (value, helpers) => {
    if (value !== this.state.data.password)
      return helpers.message('Passwords do not match.');

    return value;
  }

  schema = {
    email: Joi.string()
    .email({ tlds: {allow: false} })
    .required()
    .label("Email"),
    password: Joi.string()
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/)
    .label("Password"),
    passwordCheck: Joi.custom(this.checkPassword,"Check Password").label('Password Check')
    //.error(new Error('Passwords do not match.')).ref('password')
  };

  joiSchema = Joi.object(this.schema);

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.joiSchema.validate(this.state.data, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    const { error } = schema.validate(obj);
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
    try{
      const {email, password} = this.state.data;
      const response = await registerUser({email, password});
      console.log(response);
      console.log(response.headers['x-auth-token']);
      auth.loginWithJWT(response.headers['x-auth-token']);
      const {state} = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error){
      if(error.response && error.response.status === 400){
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
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
        <div className="form-group">
          <label htmlFor="passwordCheck">Re-type Password</label>
          <input
            name="passwordCheck"
            id="passwordCheck"
            type="password"
            className="form-control"
            value={data.passwordCheck}
            onChange={this.handleChange}
          />
        </div>
        {errors.passwordCheck && (
              <div className="alert alert-danger">{errors.passwordCheck}</div>
            )}
        <div className="alert alert-secondary">Password must at least 8 characters long and contain:
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