import React, { Component } from "react";
import {
  Route,
  Switch,
  useHistory
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
            <button className="RequestButton" onClick={() => { this.props.history.push({pathname: '/pedir'}) }}>
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
            </button>
            <button className="OfferButton" onClick={() => { this.props.history.push({pathname: '/ofrecer'}) }}>
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
            </button>
          </div>
          </React.Fragment>
      </div>
    )    
  }

}

export default OfferRequestRide
