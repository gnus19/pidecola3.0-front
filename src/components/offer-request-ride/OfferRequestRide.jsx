import React, { Component } from "react";
import "./OfferRequestRide.css";

class OfferRequestRide extends Component {
  render() {
    return (
      <div className="OfferRequestRide">
        <div className="OfferRequest">
          <button className="RequestButton"></button>
          <button className="OfferButton"></button>
        </div>
        <div className="RideLog" style={{ color: "white", fontWeight: "bold" }}>
          *PATROCINADORES/HISTORIAL*
        </div>
      </div>
    );
  }
}

export default OfferRequestRide;
