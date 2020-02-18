import React, { Component } from "react";
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'

import { Route, NavLink } from "react-router-dom";
import "../assets/css/RoutesList.css";
import DropDownList from "../components/dropDownList/DropDownList";

class RoutesList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="offer-request-content container-fluid">
        <React.Fragment>
          {/*{this.props.recommendations && (
            <div className="Recommendations"></div>
		  )}*/}
          <div className="pidecola-message">
            Pide Cola USB te recuerda no utilizar tu telefono celular al
            conducir.
          </div>
          {this.props.location.state.pideCola && (
            <div className="carta">
              <DropDownList htmlFor="vehicle" id="vehicle"></DropDownList>
            </div>
          )}
          <div className="carta">
            <div className="separador">
              <DropDownList htmlFor="direction" id="direction"></DropDownList>
              <DropDownList htmlFor="route" id="route"></DropDownList>
            </div>
          </div>
        </React.Fragment>
        <NavLink className="SearchButton" to="/pasajeros">
          BUSCAR
        </NavLink>
      </div>
    );
  }
}

export default RoutesList;
