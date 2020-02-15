import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from "react-router-dom";

import "assets/css/App.css";
import SignPage from "containers/SignPage";
import HomePage from "containers/HomePage";
import Main from 'containers/Main';
import OfferRequestRide from "./components/offer-request-ride/OfferRequestRide";


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
          <Main>
            <Route 
              path="/home" 
              render={props => <OfferRequestRide {...props} />} 
            />
          </Main>
          <Redirect 
            exact 
            from="/" 
            to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
