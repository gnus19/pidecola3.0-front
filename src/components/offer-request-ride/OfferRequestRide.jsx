import React, { Component } from "react";
import "./OfferRequestRide.css";

class OfferRequestRide extends Component {
  render() {
    return (
      <div className="OfferRequestRide">
        <div className="Recommendations"></div>
        <div className="OfferRequest">
          <button className="RequestButton">
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
          <button className="OfferButton">
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
      </div>
    );
  }
}

export default OfferRequestRide;
