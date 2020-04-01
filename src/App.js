import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "assets/css/App.css";
import SignPage from "containers/SignPage";
import HomePage from "containers/HomePage";
import Main from "containers/Main";
import Profile from "containers/Profile";
import VehicleDetail from "containers/VehicleDetail";
import DeleteVehicle from "containers/DeleteVehicle";
import Stats from "containers/Stats";
import RoutesList from "containers/RoutesList";
import AvailablePassengers from "./containers/AvailablePassengers";
import WaitOffer from "./containers/WaitOffer";
import AcceptOffer from "./containers/AcceptOffer";

const tokenRequired = (Component, props) => {
  const token = localStorage.getItem("tkauth");
  if (!token) return <Redirect to="/login" />;
  return <Component {...props} />;
};

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
            <Route
              path="/home"
              render={props => tokenRequired(HomePage, props)}
            />
            <Route
              path="/profile"
              render={props => tokenRequired(Profile, props)}
            />
            <Route
              path="/addVehicle"
              render={props => tokenRequired(VehicleDetail, props)}
            />
            <Route
              path="/deleteVehicle"
              render={props => tokenRequired(DeleteVehicle, props)}
            />
            <Route
              path="/stats"
              render={props => tokenRequired(Stats, props)}
            />
            <Route
              path="/ride"
              render={props => tokenRequired(RoutesList, props)}
            />
            <Route
              path="/passengers"
              render={props => tokenRequired(AvailablePassengers, props)}
            />
            <Route
              path="/waitOffer"
              render={props => tokenRequired(WaitOffer, props)}
            />
            <Route
              path="/offer"
              render={props => tokenRequired(AcceptOffer, props)}
            />
          </Main>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
