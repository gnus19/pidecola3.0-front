import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/css/App.css";
import SignPage from "./containers/SignPage";
import HomePage from "./containers/HomePage";

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
          <Route exact path="/home" render={props => <HomePage {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
