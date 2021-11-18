import React, { Component } from "react";
import { Switch, Route} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute/protectedRoute";
import NavBar from "./components/common/navBar/navBar";
import ContentList from "./components/quick-ref/contentList/contentList";
import ResourceForm from "./components/quick-ref/resourceForm/resourceForm";
import ViewResource from "./components/quick-ref/viewResource/viewResource";
import LoginForm from "./components/common/loginForm/loginForm";
import RegisterForm from "./components/common/registerForm/registerForm";
import Logout from "./components/quick-ref/logout/logout";

import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./App.sass";
import { getCurrentUser } from "./services/api/auth";

class App extends Component {
  state = {
    user: null
  };

  async componentDidMount() {
    const user = await getCurrentUser();
    this.setState({ user });
  }

  handleRoute = () => {
    this.setState({navToggle: false});
  }

  handleToast = (message) => {
    toast(message);
  }

  render() {

    return (
      <div className="App">
        <ToastContainer />
        <NavBar
          navToggle={this.state.navToggle}
          onNavToggle={this.handleNavToggle}
          onRouteChange={this.handleRoute}
        ></NavBar>
        <Switch>
          <ProtectedRoute
            path="/manageResource/:id"
            render={(props) => <ResourceForm {...props} />}
          />
          <ProtectedRoute
            path="/viewResource/:id"
            render={(props) => <ViewResource {...props} />}
          />
          <Route
            path="/login"
            render={(props) => <LoginForm {...props} />}
          />
          <Route
            path="/logout"
            render={(props) => <Logout {...props} />}
          />
          <Route
            path="/register"
            render={(props) => <RegisterForm {...props} />}
          />
          <ProtectedRoute
            path="/"
            render={(props) => <ContentList {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
