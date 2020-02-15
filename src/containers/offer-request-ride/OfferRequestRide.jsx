import React, { Component } from "react";
import {
  Route,
  Switch,
  useHistory,
  NavLink
} from "react-router-dom";
import "./OfferRequestRide.css";
import RoutesList from "../../components/routes-list/RoutesList";
import AvailablePassengers from '../../components/availablePassengers/AvailablePassengers';

class OfferRequestRide extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  render() {
    return (
      <div className="OfferRequestRide">
          <React.Fragment>
          { this.props.recommendations && <div className="Recommendations"></div>}
          <div className="OfferRequest">
            <NavLink className="RequestButton" to={{pathname: "/aventon", state: {pideCola: true}}}>
              <div className="TopButton">
                <span className="TopComment">Pedir cola</span>
              </div>
              <div className="ImageRequestButton">
                <div className="OverButton">
                  <span className="Comment">
                    Solicita una cola para ir a la universidad o para salir de
                    ella
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink className="OfferButton" to={{pathname: "/aventon", state: {pideCola: false}}}>
              <div className="TopButton">
                <span className="TopComment">Dar cola</span>
              </div>
              <div className="ImageOfferButton">
                <div className="OverButton">
                  <span className="Comment">
                    Brinda la ayuda a un compañero, profesor o empleado para ir o
                    salir de la universidad
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
          </React.Fragment>
      </div>
    )    
  }

}

export default OfferRequestRide
