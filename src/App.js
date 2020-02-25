import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";

import "assets/css/App.css";
import SignPage from "containers/SignPage";
import HomePage from "containers/HomePage";
import Main from "containers/Main";
import Profile from "containers/Profile";
import RoutesList from "containers/RoutesList";
import AvailablePassengers from "./containers/AvailablePassengers";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/login"
            render={props => <SignPage {...props} />}
          />
          <Route
            exact
            path="/register"
            render={props => <SignPage {...props} />}
          />
          <Redirect exact from="/" to="/login" />
          <Main>
            <Route path="/home" render={props => <HomePage {...props} />} />
            <Route
              path="/aventon"
              render={props => <RoutesList {...props} />}
            />
            <Route
              path="/pasajeros"
              render={props => <AvailablePassengers {...props} />}
            />
            <Route path="/profile" render={props => <Profile {...props} />} />
          </Main>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
