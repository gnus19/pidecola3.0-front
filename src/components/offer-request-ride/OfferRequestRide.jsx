import React, { Component } from "react";
import "./OfferRequestRide.css";

class OfferRequestRide extends Component {
  render() {
    return (
      <div className="OfferRequestRide">
        <div className="Recommendations"></div>
        <div className="OfferRequest">
          <button className="RequestButton">
            <span className="Mensaje">
              Solicita una cola para ir a la Universidad o para salir de ella.
            </span>
          </button>
          <button className="OfferButton">
            <span className="Mensaje">
              Brinda la cola a un compañero, profesor o empleado para ir o salir
              de la Universidad.
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default OfferRequestRide;
