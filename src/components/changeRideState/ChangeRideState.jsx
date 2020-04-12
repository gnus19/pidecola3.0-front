import React, { Component } from "react";

class ChangeRideState extends Component {
  render() {
    return (
      <div className="stateButtons">
        <div className="enCamino">EN CAMINO</div>
        <div className="accidentado">ACCIDENTADO</div>
        <div className="finalizada">FINALIZADA</div>
      </div>
    );
  }
}

export default ChangeRideState;
