import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "assets/css/App.css";
import SignPage from "containers/SignPage";
import HomePage from "containers/HomePage";
import Main from "containers/Main";
import Profile from "containers/Profile";
import VehicleDetail from "containers/VehicleDetail";
import RoutesList from "containers/RoutesList";
import AvailablePassengers from "./containers/AvailablePassengers";

const tokenRequired = (Component, props) => {
  const token = localStorage.getItem('tkauth')
  if(!token) return <Redirect to="/login" />
  return <Component {...props}/>
}

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
              path="/aventon"
              render={props => tokenRequired(RoutesList, props)}  
            />}
            />
            <Route
              path="/pasajeros"
              render={props => tokenRequired(AvailablePassengers, props)}  
            />}
            />
            <Route 
              path="/profile" 
              render={props => tokenRequired(Profile, props)}  
            />
            <Route 
              path="/add_vehicle" 
              render={props => tokenRequired(VehicleDetail, props)}  
            />
          </Main>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
